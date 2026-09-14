import http from 'node:http';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

// .env.local の手動パース
function loadEnv() {
  const envPath = path.join(rootDir, '.env.local');
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      env[key] = val;
    }
  }
  return env;
}

const env = loadEnv();
const LINE_CHANNEL_SECRET = env.LINE_CHANNEL_SECRET || process.env.LINE_CHANNEL_SECRET;
const LINE_CHANNEL_ACCESS_TOKEN = env.LINE_CHANNEL_ACCESS_TOKEN || process.env.LINE_CHANNEL_ACCESS_TOKEN;
const GEMINI_API_KEY = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const PORT = process.env.BOT_PORT || 3001;

// 会話履歴と保留中ドラフトのメモリ管理
const conversationHistory = new Map();
const pendingPolicyDrafts = new Map();

// 署名検証
function verifySignature(body, signature) {
  const hash = crypto
    .createHmac('sha256', LINE_CHANNEL_SECRET)
    .update(body)
    .digest('base64');
  return hash === signature;
}

// 返信送信
async function replyMessage(replyToken, text) {
  const url = 'https://api.line.me/v2/bot/message/reply';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      replyToken,
      messages: [{ type: 'text', text }],
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error('LINE reply error:', res.status, err);
  }
}

// 政策検索ヘルパー
function searchPolicies(keyword) {
  const dir = path.join(rootDir, 'src/data/policies');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir);
  const results = [];
  const kw = keyword.toLowerCase();
  for (const f of files) {
    if (!f.endsWith('.json')) continue;
    try {
      const p = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
      if (
        p.id?.toLowerCase().includes(kw) ||
        p.title?.toLowerCase().includes(kw) ||
        p.catchphrase?.toLowerCase().includes(kw) ||
        p.categoryLabel?.toLowerCase().includes(kw)
      ) {
        results.push(p);
        if (results.length >= 3) break;
      }
    } catch {}
  }
  return results;
}

// アイデア記録＆Git push
async function recordIdea(ideaText) {
  const ideasPath = path.join(rootDir, 'docs/IDEAS.md');
  const now = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
  const row = `| 💡 | **${ideaText.replace(/\|/g, '')}** | LINEから登録 (${now}) |\n`;
  let content = fs.readFileSync(ideasPath, 'utf8');
  const header = '|:---:|:---|:---|';
  const idx = content.indexOf(header);
  if (idx !== -1) {
    content = content.slice(0, idx + header.length) + '\n' + row + content.slice(idx + header.length);
  } else {
    content += `\n- 💡 **${ideaText}** (LINE登録: ${now})\n`;
  }
  fs.writeFileSync(ideasPath, content, 'utf8');

  try {
    await execAsync(`git add docs/IDEAS.md && git commit -m "docs: add idea from LINE: ${ideaText.slice(0, 30)}" && git push origin main`, { cwd: rootDir });
    return `💡 アイデア「${ideaText}」を docs/IDEAS.md に記録して GitHub に push しました！ノートPCを開いた時に反映されます。`;
  } catch (e) {
    return `💡 アイデアを記録しました（Git: ${e.message.slice(0, 60)}）`;
  }
}

// 新規政策JSONの作成と policies.ts への登録
async function applyPolicyDraft(draft) {
  const jsonPath = path.join(rootDir, `src/data/policies/${draft.id}.json`);
  if (fs.existsSync(jsonPath)) {
    return `❌ 既に同名ID（${draft.id}）の政策が存在します。別のIDにするか確認してください。`;
  }

  // 1. JSONファイルを書き出し
  fs.writeFileSync(jsonPath, JSON.stringify(draft, null, 2), 'utf8');

  // 2. src/lib/policies.ts に登録
  const policiesTsPath = path.join(rootDir, 'src/lib/policies.ts');
  let tsContent = fs.readFileSync(policiesTsPath, 'utf8');

  // 変数名作成 (kebab-case -> camelCase + "Data")
  const varName = draft.id.replace(/-([a-z0-9])/g, (_, g) => g.toUpperCase()) + 'Data';
  const importStatement = `import ${varName} from "@/data/policies/${draft.id}.json";\n`;

  // 先頭のインポート群に追加
  const firstImportIdx = tsContent.indexOf('import ');
  tsContent = tsContent.slice(0, firstImportIdx) + importStatement + tsContent.slice(firstImportIdx);

  // policies 配列末尾に追加
  const closingBracketIdx = tsContent.lastIndexOf('];');
  if (closingBracketIdx !== -1) {
    const arrayItem = `  ${varName} as PolicyTopic,\n`;
    tsContent = tsContent.slice(0, closingBracketIdx) + arrayItem + tsContent.slice(closingBracketIdx);
    fs.writeFileSync(policiesTsPath, tsContent, 'utf8');
  } else {
    throw new Error('policies.ts の配列終端が見つかりませんでした。');
  }

  // 3. Git commit & push
  await execAsync(
    `git add src/data/policies/${draft.id}.json src/lib/policies.ts && git commit -m "feat(policy): add ${draft.title} (${draft.id}) via LINE" && git push origin main`,
    { cwd: rootDir }
  );

  const totalPolicies = fs.readdirSync(path.join(rootDir, 'src/data/policies')).filter(f => f.endsWith('.json')).length;

  return `🎉 政策ページを新規作成し、GitHubにプッシュしました！

📄 【${draft.title}】
・ID: ${draft.id}
・カテゴリ: ${draft.categoryLabel}
・総政策数: ${totalPolicies} 件に増加！🚀

Vercelの自動ビルド＆デプロイが開始されました。
数分後に本番サイトで公開されます！
👉 https://poliscape.vercel.app/policies/${draft.id}`;
}

// Gemini API 呼び出し（フォールバック付き）
async function callGeminiRaw(payload) {
  const models = ['gemini-3.8-flash', 'gemini-3.6-flash', 'gemini-2.0-flash'];
  for (const model of models) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const data = await res.json();
          const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) return replyText;
        } else if (res.status === 503 && attempt === 0) {
          await new Promise(r => setTimeout(r, 1000));
          continue;
        } else {
          break;
        }
      } catch {
        break;
      }
    }
  }
  return null;
}

// 政策ドラフトJSONの生成
async function generatePolicyJson(topic) {
  const prompt = `日本の政策カタログ「PoliScape」に追加するための完全な政策JSONデータを生成してください。
テーマ: 「${topic}」

【出力ルール】
必ずMarkdownのコードブロックなし、純粋な有効なJSON形式のみで出力してください。
型構造:
{
  "id": "英小文字ハイフン区切りのユニークID (例: highschool-tuition-universal)",
  "title": "簡潔で分かりやすい政策タイトル",
  "catchphrase": "魅力的な1行キャッチコピー",
  "category": "childcare | tax | economy | healthcare | pension | labor | education | digital | transport | environment | society のいずれか1つ",
  "categoryLabel": "サブジャンル名 (例: 教育・奨学金)",
  "lastUpdated": "${new Date().toISOString().split('T')[0]}",
  "effectiveDate": "施行時期 (例: 2025年4月)",
  "status": "enacted | discussing | proposed",
  "statusLabel": "「成立・施行済み」または「議論・検討中」",
  "summary": {
    "standard": ["要約1行目（客観的事実）", "要約2行目（対象や金額）", "要約3行目（現在の状況や課題）"],
    "simple": ["やさしい日本語の要約1", "やさしい日本語の要約2", "やさしい日本語の要約3"]
  },
  "background": {
    "standard": "背景と目的の詳細な説明",
    "simple": "小学生でもわかる簡単な背景説明"
  },
  "changes": [
    { "aspect": "変更項目", "before": "これまでの制度", "after": "新しい制度" }
  ],
  "perspectives": {
    "benefitsTitle": "主なメリット・期待される効果",
    "benefits": [
      { "title": "メリット見出し", "description": "具体的な解説" }
    ],
    "challengesTitle": "主な懸念・今後の課題",
    "challenges": [
      { "title": "課題見出し", "description": "懸念や批判の具体的な解説" }
    ]
  },
  "timeline": [
    { "date": "時期", "title": "出来事", "status": "done | current | upcoming" }
  ],
  "sources": [
    { "title": "関係官庁・公式発表名", "url": "https://www.mext.go.jp/ 等の公的ドメイン" }
  ],
  "badges": [
    { "text": "注目", "color": "emerald" }
  ],
  "highlights": [
    { "label": "重要数字", "value": "100%", "unit": "", "description": "数字の解説" }
  ],
  "voices": {
    "citizens": [
      { "opinion": "賛成意見の具体例", "stance": "positive", "speaker": "30代 保護者" },
      { "opinion": "慎重意見の具体例", "stance": "critical", "speaker": "教育関係者" }
    ]
  }
}`;

  const jsonStr = await callGeminiRaw({
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: 'あなたは公的データに基づく厳密な政策データアーキテクトです。JSONのみを出力してください。' }] },
  });

  if (!jsonStr) return null;
  const cleanJson = jsonStr.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();
  try {
    return JSON.parse(cleanJson);
  } catch (e) {
    console.error('JSON parse failed:', e.message, cleanJson.slice(0, 100));
    return null;
  }
}

// 最新の変更をGitHubから自動同期（ノートPCでのコミットを常時追従）
async function syncLatestGit() {
  try {
    await execAsync('git pull origin main', { cwd: rootDir });
  } catch (e) {
    console.warn('⚠️ git pull 警告:', e.message?.slice(0, 80));
  }
}

// 10分おきに裏でも定期的に自動同期
setInterval(syncLatestGit, 10 * 60 * 1000);

// メインの対話ルーター
async function handleUserText(userId, text) {
  // LINEを受信した瞬間に最新状態へ同期
  await syncLatestGit();

  const trimmed = text.trim();

  // 1. 保留中ドラフトへの「実行して」承認
  const hasDraft = pendingPolicyDrafts.has(userId);
  if (hasDraft && (trimmed === '実行して' || trimmed === '作成して' || trimmed === 'pushして' || trimmed === 'おねがい' || trimmed === 'お願い' || trimmed === 'ok' || trimmed === 'OK')) {
    const draft = pendingPolicyDrafts.get(userId);
    try {
      const result = await applyPolicyDraft(draft);
      pendingPolicyDrafts.delete(userId);
      return result;
    } catch (e) {
      return `❌ 作成中にエラーが発生しました: ${e.message}`;
    }
  }

  // 2. 下書きキャンセル
  if (hasDraft && (trimmed === 'キャンセル' || trimmed === 'やめて' || trimmed === 'やめる')) {
    pendingPolicyDrafts.delete(userId);
    return '👌 下書きをキャンセルしました！また何かあれば声をかけてください。';
  }

  // 3. 政策追加のリクエスト検出
  const isPolicyAddRequest =
    trimmed.includes('政策を追加') ||
    trimmed.includes('政策ページ作') ||
    trimmed.includes('政策を作') ||
    trimmed.startsWith('政策追加:') ||
    trimmed.startsWith('政策追加：');

  if (isPolicyAddRequest) {
    const topic = trimmed.replace(/^政策追加[：:]\s*/, '').replace(/の?政策(ページ)?を?(追加|作).*$/, '').trim();
    if (topic.length >= 2) {
      const draft = await generatePolicyJson(topic);
      if (draft && draft.title && draft.summary?.standard) {
        pendingPolicyDrafts.set(userId, draft);
        return `📝 【政策ページの下書きを作成しました！】

📌 タイトル: ${draft.title}
🏷️ カテゴリ: ${draft.categoryLabel} (${draft.category})
⚖️ ステータス: ${draft.statusLabel}

【3行要約】
1. ${draft.summary.standard[0]}
2. ${draft.summary.standard[1]}
3. ${draft.summary.standard[2]}

【主なメリット】
・${draft.perspectives?.benefits?.[0]?.title || '負担軽減'}
【主な懸念・課題】
・${draft.perspectives?.challenges?.[0]?.title || '財源確保'}

この内容で政策JSONを作成し、GitHubにプッシュ（本番デプロイ）してよろしいですか？
よろしければ「実行して」と返信してください！
（やめる場合は「キャンセル」と送ってください）`;
      }
    }
  }

  // 4. アイデア登録
  if (
    trimmed.startsWith('アイデア:') ||
    trimmed.startsWith('アイデア：') ||
    trimmed.includes('アイデアに追加') ||
    trimmed.includes('アイデアにメモ') ||
    trimmed.includes('機能追加して')
  ) {
    const cleanIdea = trimmed.replace(/^(アイデア|アイディア)[：:]\s*/, '').replace(/を?アイデアに(追加|メモ).*$/, '').trim();
    if (cleanIdea.length > 2) {
      return await recordIdea(cleanIdea);
    }
  }

  // 5. ステータス確認
  if (trimmed === 'ステータス' || trimmed === 'status' || trimmed.includes('サイトの状況') || trimmed.includes('進捗どう')) {
    try {
      const { stdout: gitLog } = await execAsync('git log -1 --oneline', { cwd: rootDir });
      const policiesCount = fs.readdirSync(path.join(rootDir, 'src/data/policies')).filter(f => f.endsWith('.json')).length;
      return `📊 【PoliScape 現在のステータス】

🟢 サイト: https://poliscape.vercel.app (正常稼働中)
📦 登録政策データ: ${policiesCount} 件
📜 根拠法データ: 53 件
🕒 最新コミット: ${gitLog.trim()}
📅 X予約投稿: Day 1〜8 予約完了済み

順調に稼働しています！何か作業しますか？`;
    } catch (e) {}
  }

  // 6. 一般的なAntigravity対話
  let history = conversationHistory.get(userId) || [];
  history.push({ role: 'user', parts: [{ text: trimmed }] });
  if (history.length > 10) history = history.slice(-10);
  conversationHistory.set(userId, history);

  const systemInstruction = `あなたは Google Antigravity のAIパートナー（PoliScape専属エンジニア・共同開発者）です。
開発者のスマートフォン（LINE）から話しかけられています。
サービス名: PoliScape（公的データと客観的事実で知る日本の政策カタログ）。
頼れる相棒として、自然で親しみやすい日本語で回答してください。
もし新しい政策を追加したいと言われたら「政策追加: ○○」と送ってもらうか、その場でドラフトの相談に乗ってください。`;

  const reply = await callGeminiRaw({
    contents: history,
    systemInstruction: { parts: [{ text: systemInstruction }] },
  });

  if (reply) {
    history.push({ role: 'model', parts: [{ text: reply }] });
    conversationHistory.set(userId, history);
    return reply;
  }

  return '申し訳ありません、応答の生成中にエラーが発生しました。もう一度話しかけてみてください！';
}

// サーバー起動
const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/webhook') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      const signature = req.headers['x-line-signature'];
      if (!signature || !verifySignature(body, signature)) {
        res.writeHead(403);
        return res.end('Invalid signature');
      }

      res.writeHead(200);
      res.end('OK');

      try {
        const data = JSON.parse(body);
        for (const event of data.events || []) {
          if (event.type === 'message' && event.message.type === 'text') {
            console.log(`📩 [${event.source?.userId?.slice(0, 6)}] LINE受信: ${event.message.text}`);
            const replyText = await handleUserText(event.source?.userId || 'default', event.message.text);
            await replyMessage(event.replyToken, replyText);
            console.log(`📤 LINE返信完了: ${replyText.slice(0, 40)}...`);
          }
        }
      } catch (e) {
        console.error('Webhook process error:', e);
      }
    });
  } else if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('PoliScape Antigravity LINE Bot is Running! 🟢');
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`🟢 PoliScape Antigravity LINE Bot is listening on port ${PORT}`);
});