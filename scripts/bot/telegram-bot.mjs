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
const TELEGRAM_BOT_TOKEN = env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
const GEMINI_API_KEY = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

if (!TELEGRAM_BOT_TOKEN) {
  console.error('❌ TELEGRAM_BOT_TOKEN が .env.local に設定されていません。');
  process.exit(1);
}

const TG_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

// メモリ管理
const conversationHistory = new Map();
const pendingPolicyDrafts = new Map();
const pendingPolicyEdits = new Map(); // { id, original, modified, step }

// Telegram メソッド呼び出し
async function tgCall(method, body = {}) {
  try {
    const res = await fetch(`${TG_API}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return await res.json();
  } catch (e) {
    console.error(`Telegram API (${method}) エラー:`, e.message);
    return null;
  }
}

// メッセージ送信ヘルパー (HTML形式)
async function sendMessage(chatId, htmlText, extra = {}) {
  return await tgCall('sendMessage', {
    chat_id: chatId,
    text: htmlText,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
    ...extra,
  });
}

// コールバック応答ヘルパー
async function answerCallback(callbackQueryId, text = '') {
  return await tgCall('answerCallbackQuery', {
    callback_query_id: callbackQueryId,
    text,
  });
}

// HTMLエスケープ
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Git pull 同期
async function syncLatestGit() {
  try {
    await execAsync('git pull origin main', { cwd: rootDir });
  } catch (e) {
    console.warn('⚠️ git pull 警告:', e.message?.slice(0, 80));
  }
}
setInterval(syncLatestGit, 10 * 60 * 1000);

// アイデア記録＆Git push
async function recordIdea(ideaText) {
  const ideasPath = path.join(rootDir, 'docs/IDEAS.md');
  const now = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
  const row = `| 💡 | **${ideaText.replace(/\|/g, '')}** | Telegramから登録 (${now}) |\n`;
  let content = fs.existsSync(ideasPath) ? fs.readFileSync(ideasPath, 'utf8') : '# Ideas\n\n|:---:|:---|:---|\n';
  const header = '|:---:|:---|:---|';
  const idx = content.indexOf(header);
  if (idx !== -1) {
    content = content.slice(0, idx + header.length) + '\n' + row + content.slice(idx + header.length);
  } else {
    content += `\n- 💡 **${ideaText}** (Telegram登録: ${now})\n`;
  }
  fs.writeFileSync(ideasPath, content, 'utf8');

  try {
    await execAsync(`git add docs/IDEAS.md && git commit -m "docs: add idea from Telegram: ${ideaText.slice(0, 30)}" && git push origin main`, { cwd: rootDir });
    return `💡 アイデア「<b>${escapeHtml(ideaText)}</b>」を <code>docs/IDEAS.md</code> に記録して GitHub に push しました！🚀`;
  } catch (e) {
    return `💡 アイデアをローカルに記録しました（Git: ${escapeHtml(e.message.slice(0, 60))}）`;
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
        if (results.length >= 5) break;
      }
    } catch {}
  }
  return results;
}

// 新規政策JSONの作成と policies.ts への登録
async function applyPolicyDraft(draft) {
  const jsonPath = path.join(rootDir, `src/data/policies/${draft.id}.json`);
  if (fs.existsSync(jsonPath)) {
    return `❌ 既に同名ID（<code>${draft.id}</code>）の政策が存在します。`;
  }

  // 1. JSONファイルを書き出し
  fs.writeFileSync(jsonPath, JSON.stringify(draft, null, 2), 'utf8');

  // 2. src/lib/policies.ts に登録
  const policiesTsPath = path.join(rootDir, 'src/lib/policies.ts');
  let tsContent = fs.readFileSync(policiesTsPath, 'utf8');
  const varName = draft.id.replace(/-([a-z0-9])/g, (_, g) => g.toUpperCase()) + 'Data';
  const importStatement = `import ${varName} from "@/data/policies/${draft.id}.json";\n`;

  const firstImportIdx = tsContent.indexOf('import ');
  tsContent = tsContent.slice(0, firstImportIdx) + importStatement + tsContent.slice(firstImportIdx);

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
    `git add src/data/policies/${draft.id}.json src/lib/policies.ts && git commit -m "feat(policy): add ${draft.title} (${draft.id}) via Telegram" && git push origin main`,
    { cwd: rootDir }
  );

  const totalPolicies = fs.readdirSync(path.join(rootDir, 'src/data/policies')).filter(f => f.endsWith('.json')).length;

  return `🎉 <b>政策ページを新規作成し、GitHubにプッシュしました！</b>

📄 <b>【${escapeHtml(draft.title)}】</b>
・ID: <code>${draft.id}</code>
・カテゴリ: ${escapeHtml(draft.categoryLabel)}
・総政策数: <b>${totalPolicies} 件</b>に増加！🚀

Vercelの自動ビルド＆デプロイが開始されました。
👉 <a href="https://poliscape.vercel.app/policies/${draft.id}">本番プレビュー</a>`;
}

// Gemini API 呼び出し
async function callGeminiRaw(payload) {
  if (!GEMINI_API_KEY) return null;
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

// 既存政策の修正をAI生成
async function generatePolicyEdit(original, instruction) {
  const prompt = `以下は日本の政策カタログ「PoliScape」に登録されている政策のJSON（一部）です。
ユーザーの修正指示に従い、修正後のJSON全体を出力してください。

【現在のデータ】
${JSON.stringify(original, null, 2)}

【ユーザーの修正指示】
${instruction}

【出力ルール】
- 必ず純粋な有効なJSON形式のみで出力してください（Markdownコードブロック不要）
- 修正指示に関係するフィールドのみ変更し、他のフィールドは元のまま維持してください
- id は絶対に変更しないでください`;

  const jsonStr = await callGeminiRaw({
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: 'あなたは政策データの編集アシスタントです。指示通りにJSONを修正し、JSONのみを出力してください。' }] },
  });

  if (!jsonStr) return null;
  const cleanJson = jsonStr.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();
  try {
    const parsed = JSON.parse(cleanJson);
    parsed.id = original.id; // id は絶対に変更させない
    return parsed;
  } catch (e) {
    console.error('Edit JSON parse failed:', e.message);
    return null;
  }
}

// 政策修正の適用＆Push
async function applyPolicyEdit(editData) {
  const jsonPath = path.join(rootDir, `src/data/policies/${editData.id}.json`);
  if (!fs.existsSync(jsonPath)) {
    return `❌ ファイルが見つかりません: <code>${editData.id}.json</code>`;
  }

  editData.modified.lastUpdated = new Date().toISOString().split('T')[0];
  fs.writeFileSync(jsonPath, JSON.stringify(editData.modified, null, 2), 'utf8');

  try {
    await execAsync(
      `git add src/data/policies/${editData.id}.json && git commit -m "fix(policy): update ${editData.modified.title || editData.id} via Telegram" && git push origin main`,
      { cwd: rootDir }
    );
    return `✅ <b>政策データを修正してGitHubにプッシュしました！</b>

📄 <b>【${escapeHtml(editData.modified.title)}】</b>
・ID: <code>${editData.id}</code>

Vercelの自動ビルド＆デプロイが開始されました。
👉 <a href="https://poliscape.vercel.app/policies/${editData.id}">本番プレビュー</a>`;
  } catch (e) {
    return `⚠️ ローカルに保存しましたがGit pushに失敗: ${escapeHtml(e.message.slice(0, 80))}`;
  }
}

// 修正箇所のdiff表示を生成
function generateDiffSummary(original, modified) {
  const diffs = [];
  const checkFields = ['title', 'catchphrase', 'categoryLabel', 'status', 'statusLabel', 'effectiveDate'];
  for (const f of checkFields) {
    if (original[f] !== modified[f] && modified[f] !== undefined) {
      diffs.push(`• <b>${f}</b>: ${escapeHtml(String(original[f]))} → ${escapeHtml(String(modified[f]))}`);
    }
  }
  // summary
  if (JSON.stringify(original.summary) !== JSON.stringify(modified.summary)) {
    diffs.push('• <b>summary</b> (要約): 変更あり');
  }
  // background
  if (JSON.stringify(original.background) !== JSON.stringify(modified.background)) {
    diffs.push('• <b>background</b> (背景): 変更あり');
  }
  // perspectives
  if (JSON.stringify(original.perspectives) !== JSON.stringify(modified.perspectives)) {
    diffs.push('• <b>perspectives</b> (メリット/課題): 変更あり');
  }
  // timeline
  if (JSON.stringify(original.timeline) !== JSON.stringify(modified.timeline)) {
    diffs.push('• <b>timeline</b> (タイムライン): 変更あり');
  }
  // sources
  if (JSON.stringify(original.sources) !== JSON.stringify(modified.sources)) {
    diffs.push('• <b>sources</b> (情報源): 変更あり');
  }
  // badges
  if (JSON.stringify(original.badges) !== JSON.stringify(modified.badges)) {
    diffs.push('• <b>badges</b> (バッジ): 変更あり');
  }
  if (diffs.length === 0) diffs.push('（差分なし）');
  return diffs.join('\n');
}

// メッセージハンドラー
async function handleIncomingMessage(msg) {
  const chatId = msg.chat.id;
  const text = msg.text?.trim() || '';

  // 画像受信時
  if (msg.photo && msg.photo.length > 0) {
    await sendMessage(chatId, '🖼️ 画像を受信しました！画像共有機能は順次拡張予定です。');
    return;
  }

  if (!text) return;

  await syncLatestGit();

  // /start または /help
  if (text === '/start' || text === '/help') {
    const helpMsg = `👋 <b>PoliScape Dev Console (Telegram)</b> へようこそ！

デスクトップPC常駐サーバーと直接接続されています。

<b>【利用可能なコマンド】</b>
• <code>/status</code> - サイト・リポジトリの稼働状況
• <code>/search &lt;キーワード&gt;</code> - 登録済み政策を検索
• <code>政策追加: &lt;テーマ&gt;</code> - 新規政策ドラフトをAI生成
• <code>/edit &lt;キーワード&gt;</code> - 既存政策データを修正
• <code>アイデア: &lt;メモ&gt;</code> - <code>docs/IDEAS.md</code> に記録＆Push
• その他、何でも自由に話しかけてください！`;
    await sendMessage(chatId, helpMsg);
    return;
  }

  // ステータス確認 (/status または「ステータス」)
  if (text === '/status' || text === 'ステータス' || text.toLowerCase() === 'status') {
    try {
      const { stdout: gitLog } = await execAsync('git log -1 --oneline', { cwd: rootDir });
      const policiesCount = fs.readdirSync(path.join(rootDir, 'src/data/policies')).filter(f => f.endsWith('.json')).length;
      const statusMsg = `📊 <b>【PoliScape 現在のステータス】</b>

🟢 <b>サイト:</b> <a href="https://poliscape.vercel.app">poliscape.vercel.app</a> (正常稼働中)
📦 <b>登録政策数:</b> <code>${policiesCount}</code> 件
🕒 <b>最新コミット:</b> <code>${escapeHtml(gitLog.trim())}</code>
🖥️ <b>常駐サーバー:</b> Windows PC (Telegram Long-Polling)

いつでも指示をどうぞ！`;
      await sendMessage(chatId, statusMsg);
    } catch (e) {
      await sendMessage(chatId, `❌ ステータス取得エラー: ${escapeHtml(e.message)}`);
    }
    return;
  }

  // 政策検索 (/search または「検索:」)
  if (text.startsWith('/search') || text.startsWith('検索:') || text.startsWith('検索：')) {
    const kw = text.replace(/^(\/search|検索[：:])\s*/, '').trim();
    if (!kw) {
      await sendMessage(chatId, '🔍 検索キーワードを入力してください。(例: <code>/search 給付金</code>)');
      return;
    }
    const results = searchPolicies(kw);
    if (results.length === 0) {
      await sendMessage(chatId, `🔍 「<b>${escapeHtml(kw)}</b>」に一致する政策は見つかりませんでした。`);
    } else {
      let reply = `🔍 <b>「${escapeHtml(kw)}」の検索結果 (${results.length}件):</b>\n\n`;
      for (const p of results) {
        reply += `• <b>${escapeHtml(p.title)}</b> (<code>${p.id}</code>)\n  └ <i>${escapeHtml(p.catchphrase || '')}</i>\n  👉 <a href="https://poliscape.vercel.app/policies/${p.id}">ページを開く</a>\n\n`;
      }
      await sendMessage(chatId, reply);
    }
    return;
  }

  // 政策修正 (/edit または「政策修正:」)
  if (text.startsWith('/edit') || text.startsWith('政策修正:') || text.startsWith('政策修正：')) {
    const kw = text.replace(/^(\/edit|政策修正[：:])\s*/, '').trim();
    if (!kw) {
      await sendMessage(chatId, '✏️ 修正したい政策のキーワードを入力してください。\n(例: <code>/edit 年金</code> または <code>政策修正: 児童手当</code>)');
      return;
    }
    const results = searchPolicies(kw);
    if (results.length === 0) {
      await sendMessage(chatId, `🔍 「<b>${escapeHtml(kw)}</b>」に一致する政策が見つかりませんでした。`);
    } else {
      const buttons = results.map(p => ([{
        text: `✏️ ${p.title}`,
        callback_data: `edit_select_${p.id}`.slice(0, 64),
      }]));
      await sendMessage(chatId, `✏️ <b>修正する政策を選んでください:</b>`, {
        reply_markup: { inline_keyboard: buttons },
      });
    }
    return;
  }

  // 修正指示の待ち受け中（edit_select 後のテキスト入力）
  const editSession = pendingPolicyEdits.get(chatId);
  if (editSession && editSession.step === 'awaiting_instruction') {
    await sendMessage(chatId, `⏳ AI が修正内容を反映中... (約10秒)`);
    const modified = await generatePolicyEdit(editSession.original, text);
    if (modified) {
      editSession.modified = modified;
      editSession.step = 'awaiting_confirm';
      pendingPolicyEdits.set(chatId, editSession);

      const diffText = generateDiffSummary(editSession.original, modified);
      const confirmMsg = `📝 <b>【修正プレビュー】</b>

📄 <b>${escapeHtml(modified.title)}</b> (<code>${editSession.id}</code>)

<b>変更箇所:</b>
${diffText}

この修正を適用してGitHubにプッシュしますか？`;
      await sendMessage(chatId, confirmMsg, {
        reply_markup: {
          inline_keyboard: [[
            { text: '✅ 適用＆Push', callback_data: 'apply_edit' },
            { text: '❌ キャンセル', callback_data: 'cancel_edit' },
          ]],
        },
      });
    } else {
      await sendMessage(chatId, '❌ 修正の生成に失敗しました。もう一度指示を送ってみてください。');
    }
    return;
  }

  // 政策追加リクエスト
  const isPolicyAdd =
    text.startsWith('/policy') ||
    text.startsWith('政策追加:') ||
    text.startsWith('政策追加：') ||
    text.includes('政策を追加') ||
    text.includes('政策ページ作');

  if (isPolicyAdd) {
    const topic = text
      .replace(/^(\/policy|政策追加[：:])\s*/, '')
      .replace(/の?政策(ページ)?を?(追加|作).*$/, '')
      .trim();

    if (topic.length >= 2) {
      await sendMessage(chatId, `⏳ 「<b>${escapeHtml(topic)}</b>」の政策データをAI設計・生成中... (約10〜15秒)`);
      const draft = await generatePolicyJson(topic);
      if (draft && draft.title && draft.summary?.standard) {
        pendingPolicyDrafts.set(chatId, draft);

        const draftMsg = `📝 <b>【政策ページの下書きを作成しました！】</b>

📌 <b>タイトル:</b> ${escapeHtml(draft.title)}
🏷️ <b>カテゴリ:</b> ${escapeHtml(draft.categoryLabel)} (<code>${draft.category}</code>)
⚖️ <b>ステータス:</b> ${escapeHtml(draft.statusLabel)}

<b>【3行要約】</b>
1. ${escapeHtml(draft.summary.standard[0])}
2. ${escapeHtml(draft.summary.standard[1])}
3. ${escapeHtml(draft.summary.standard[2])}

<b>【主なメリット】</b>
・${escapeHtml(draft.perspectives?.benefits?.[0]?.title || '負担軽減')}
<b>【主な課題】</b>
・${escapeHtml(draft.perspectives?.challenges?.[0]?.title || '財源確保')}

この内容で政策JSONを作成し、GitHubにプッシュ（本番デプロイ）しますか？`;

        // インラインキーボード（ボタン）を添付！
        const keyboard = {
          inline_keyboard: [
            [
              { text: '🚀 作成＆Pushする', callback_data: 'apply_draft' },
              { text: '❌ キャンセル', callback_data: 'cancel_draft' },
            ],
          ],
        };
        await sendMessage(chatId, draftMsg, { reply_markup: keyboard });
        return;
      } else {
        await sendMessage(chatId, '❌ ドラフトの生成に失敗しました。もう一度試すかテーマを変えてみてください。');
        return;
      }
    }
  }

  // アイデア登録
  if (
    text.startsWith('/idea') ||
    text.startsWith('アイデア:') ||
    text.startsWith('アイデア：') ||
    text.includes('アイデアに追加') ||
    text.includes('アイデアにメモ')
  ) {
    const cleanIdea = text.replace(/^(\/idea|アイデア[：:]|アイディア[：:])\s*/, '').replace(/を?アイデアに(追加|メモ).*$/, '').trim();
    if (cleanIdea.length > 2) {
      const res = await recordIdea(cleanIdea);
      await sendMessage(chatId, res);
      return;
    }
  }

  // 通常のAI対話（Gemini）
  let history = conversationHistory.get(chatId) || [];
  history.push({ role: 'user', parts: [{ text }] });
  if (history.length > 10) history = history.slice(-10);
  conversationHistory.set(chatId, history);

  const systemInstruction = `あなたはPoliScape専属AIエンジニア（共同開発者）です。開発者のTelegramから話しかけられています。

【PoliScapeとは】
公的データと客観的事実で知る、日本の政策カタログ（https://poliscape.vercel.app）。
Next.js 16 + Tailwind CSS v4 で構築。500件の政策データ（JSONファイル）、53件の根拠法、51個のシミュレーター、11カテゴリ。
GitHub main へのpushでVercelに自動デプロイされる。

【あなた（このBot）ができること ※既に実装済み】
このTelegram Botは以下のコマンドで政策データを直接操作できます：
・「政策追加: 〇〇」→ AIが政策JSONを自動生成し、ボタン確認後にGitHubへpush。Vercel自動デプロイで本番反映。
・「/edit 〇〇」→ 既存の政策データを検索→選択→自然言語で修正指示→ボタン確認後にpush。
・「/search 〇〇」→ 500件の政策を全文検索。
・「アイデア: 〇〇」→ docs/IDEAS.md に追記してpush。
・「/status」→ 登録政策数・最新コミット・サーバー状態を表示。
これらは全て実装済みで、DBはJSONファイル（src/data/policies/*.json）をGitで管理する方式です。Supabase等の外部DBは使っていません。

【マルチデバイス開発体制】
・スマホ（このTelegram）: 政策追加・修正・アイデア記録・ブレスト
・デスクトップPC（24時間常駐）: Bot常駐サーバー、Git自動pull/push
・ノートPC（メイン開発）: UI改修・レイアウト変更など画面を見ながらの作業

【回答ルール】
・頼れる相棒として、自然で親しみやすい日本語で回答する
・上記のBot機能を活用するよう適切にガイドする（例: 政策追加の仕方を聞かれたら「政策追加: 〇〇」と送ってくださいと案内）
・HTMLタグ (<b>, <i>, <code>, <pre>) を使って見やすく装飾してOK
・既に実装済みの機能を「これから作りましょう」と提案しない`;

  const reply = await callGeminiRaw({
    contents: history,
    systemInstruction: { parts: [{ text: systemInstruction }] },
  });

  if (reply) {
    history.push({ role: 'model', parts: [{ text: reply }] });
    conversationHistory.set(chatId, history);
    await sendMessage(chatId, escapeHtml(reply));
  } else {
    await sendMessage(chatId, '申し訳ありません、応答の生成中にエラーが発生しました。');
  }
}

// コールバッククエリ（インラインボタンタップ）ハンドラー
async function handleCallbackQuery(cb) {
  const chatId = cb.message.chat.id;
  const data = cb.data;
  const cbId = cb.id;

  if (data === 'apply_draft') {
    const draft = pendingPolicyDrafts.get(chatId);
    if (!draft) {
      await answerCallback(cbId, '保留中のドラフトが見つかりません。');
      return;
    }
    await answerCallback(cbId, '🚀 政策作成＆Push中...');
    await sendMessage(chatId, '⏳ 政策JSONを作成してGitHubにプッシュ中...');
    try {
      const result = await applyPolicyDraft(draft);
      pendingPolicyDrafts.delete(chatId);
      await sendMessage(chatId, result);
    } catch (e) {
      await sendMessage(chatId, `❌ 作成エラー: ${escapeHtml(e.message)}`);
    }
  } else if (data === 'cancel_draft') {
    pendingPolicyDrafts.delete(chatId);
    await answerCallback(cbId, 'キャンセルしました');
    await sendMessage(chatId, '👌 ドラフトをキャンセルしました！');
  } else if (data.startsWith('edit_select_')) {
    // 政策修正: 対象政策の選択
    const policyId = data.replace('edit_select_', '');
    const jsonPath = path.join(rootDir, `src/data/policies/${policyId}.json`);
    if (!fs.existsSync(jsonPath)) {
      await answerCallback(cbId, '政策ファイルが見つかりません');
      return;
    }
    const original = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    pendingPolicyEdits.set(chatId, { id: policyId, original, modified: null, step: 'awaiting_instruction' });
    await answerCallback(cbId, '政策を選択しました');

    const currentInfo = `✏️ <b>【${escapeHtml(original.title)}】を修正します</b>

📌 ID: <code>${policyId}</code>
🏷️ カテゴリ: ${escapeHtml(original.categoryLabel || '')}
⚖️ ステータス: ${escapeHtml(original.statusLabel || '')}

<b>現在の3行要約:</b>
1. ${escapeHtml(original.summary?.standard?.[0] || '')}
2. ${escapeHtml(original.summary?.standard?.[1] || '')}
3. ${escapeHtml(original.summary?.standard?.[2] || '')}

<b>どのように修正しますか？</b>
自然な日本語で指示してください。
(例: 「要約の1行目を〜に変更して」「ステータスを成立済みに変更」「タイムラインに2025年4月施行を追加」)`;

    await sendMessage(chatId, currentInfo, {
      reply_markup: {
        inline_keyboard: [[{ text: '❌ やめる', callback_data: 'cancel_edit' }]],
      },
    });
  } else if (data === 'apply_edit') {
    // 政策修正: 適用＆Push
    const editData = pendingPolicyEdits.get(chatId);
    if (!editData || !editData.modified) {
      await answerCallback(cbId, '保留中の修正が見つかりません');
      return;
    }
    await answerCallback(cbId, '✅ 修正を適用中...');
    await sendMessage(chatId, '⏳ 政策データを修正してGitHubにプッシュ中...');
    try {
      const result = await applyPolicyEdit(editData);
      pendingPolicyEdits.delete(chatId);
      await sendMessage(chatId, result);
    } catch (e) {
      await sendMessage(chatId, `❌ 修正エラー: ${escapeHtml(e.message)}`);
    }
  } else if (data === 'cancel_edit') {
    pendingPolicyEdits.delete(chatId);
    await answerCallback(cbId, 'キャンセルしました');
    await sendMessage(chatId, '👌 修正をキャンセルしました！');
  }
}

// Telegram ロングポーリングループ
let lastUpdateId = 0;

async function startPolling() {
  console.log('🟢 PoliScape Telegram Bot is polling for updates...');

  while (true) {
    try {
      const url = `${TG_API}/getUpdates?offset=${lastUpdateId + 1}&timeout=30`;
      const res = await fetch(url);
      if (!res.ok) {
        await new Promise(r => setTimeout(r, 5000));
        continue;
      }
      const data = await res.json();
      if (data.ok && Array.isArray(data.result)) {
        for (const update of data.result) {
          lastUpdateId = Math.max(lastUpdateId, update.update_id);

          if (update.message) {
            console.log(`📩 [Telegram] ${update.message.from?.first_name}: ${update.message.text || '[media]'}`);
            handleIncomingMessage(update.message).catch(e => console.error('Msg handle error:', e));
          } else if (update.callback_query) {
            console.log(`🔘 [Telegram Button] ${update.callback_query.data}`);
            handleCallbackQuery(update.callback_query).catch(e => console.error('Cb handle error:', e));
          }
        }
      }
    } catch (e) {
      console.warn('Polling error:', e.message);
      await new Promise(r => setTimeout(r, 3000));
    }
  }
}

startPolling();
