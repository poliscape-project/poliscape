/**
 * analyze-issue.js
 * GitHub Issueに投稿された「事実誤認・公的データ報告」をAI（Gemini API）で自動分析し、
 * 検証レポートと修正DiffをIssueに自動返信するスクリプト
 */

const fs = require('fs');
const path = require('path');

const POLICIES_DIR = path.join(__dirname, '../src/data/policies');

async function main() {
  const isLocal = process.argv.includes('--local');

  let issueNumber, issueTitle, issueBody, repo, githubToken, geminiApiKey;

  if (isLocal) {
    const localIndex = process.argv.indexOf('--local');
    const policyId = process.argv[localIndex + 1] || 'defense-tax-hike';
    const comment = process.argv[localIndex + 2] || '防衛費が年43兆円と書かれていますが、5年間の総額枠が43兆円であり、年次は約8〜9兆円です。一次情報: 防衛省 防衛力整備計画';

    issueNumber = 'TEST-LOCAL';
    issueTitle = `[事実誤認報告] ${policyId}`;
    issueBody = `### 1. 対象の政策\n${policyId}\n\n### 2. 指摘箇所と現在の記述\nキャッチコピーに「年43兆円」とある\n\n### 3. 正しい数値・内容\n${comment}\n\n### 4. 根拠となる公的データ・一次情報\nhttps://www.mod.go.jp/`;
    geminiApiKey = process.env.GEMINI_API_KEY;
  } else {
    issueNumber = process.env.ISSUE_NUMBER;
    issueTitle = process.env.ISSUE_TITLE || '';
    issueBody = process.env.ISSUE_BODY || '';
    repo = process.env.GITHUB_REPOSITORY;
    githubToken = process.env.GITHUB_TOKEN;
    geminiApiKey = process.env.GEMINI_API_KEY;
  }

  console.log(`🚀 [AI Fact-Checker] Issue #${issueNumber} の分析を開始します...`);

  if (!isLocal && (!repo || !githubToken)) {
    console.error('❌ GITHUB_REPOSITORY または GITHUB_TOKEN が設定されていません。');
    process.exit(1);
  }

  // 1. APIキーがない場合の案内
  if (!geminiApiKey) {
    const noKeyMsg = `⚠️ **PoliScape Bot**: \`GEMINI_API_KEY\` が設定されていないため、AIによる自動分析をスキップしました。\n\nリポジトリの **Settings > Secrets and variables > Actions** に \`GEMINI_API_KEY\` を登録すると、自動ファクトチェック機能が有効化されます。`;
    console.log(noKeyMsg);
    if (!isLocal) {
      await postIssueComment(repo, issueNumber, githubToken, noKeyMsg);
    }
    return;
  }

  // 2. Issue本文から情報の抽出
  const extracted = parseIssueBody(issueBody, issueTitle);
  console.log('📋 抽出された情報:', extracted);

  // 3. 該当の政策JSONを特定
  const matchedPolicy = findMatchedPolicy(extracted.targetPolicy || issueTitle);
  if (!matchedPolicy) {
    const notFoundMsg = `🤖 **PoliScape AI Fact-Checker**\n\n対象となる政策データ（\`${extracted.targetPolicy || issueTitle}\`）を特定できませんでした。\n政策IDまたは正式な政策タイトルを記載してください。`;
    if (!isLocal) {
      await postIssueComment(repo, issueNumber, githubToken, notFoundMsg);
    } else {
      console.log(notFoundMsg);
    }
    return;
  }

  console.log(`🎯 照合された政策データ: ${matchedPolicy.file} (${matchedPolicy.data.title})`);

  // 4. Gemini API による分析
  const report = await callGeminiAnalysis(geminiApiKey, matchedPolicy, extracted);

  const finalComment = `🤖 **PoliScape AI Fact-Checker 分析レポート**\n\n市民・読者からのご指摘内容をAIが分析しました。管理者が確認し、順次反映対応を行います。\n\n---\n\n${report}\n\n---\n*Powered by Gemini & PoliScape CI/CD Automation*`;

  if (isLocal) {
    console.log('\n=== 生成された分析レポート ===\n');
    console.log(finalComment);
  } else {
    await postIssueComment(repo, issueNumber, githubToken, finalComment);
    console.log(`✅ Issue #${issueNumber} に分析レポートを投稿しました！`);
  }
}

// Issue本文をパースするヘルパー
function parseIssueBody(body, title) {
  const getSection = (headingRegex) => {
    const regex = new RegExp(`###\\s*\\d*\\.?\\s*${headingRegex}[^\\n]*\\n+([\\s\\S]*?)(?=###|$)`, 'i');
    const match = body.match(regex);
    return match ? match[1].trim() : '';
  };

  const targetPolicy = getSection('対象の政策') || title.replace(/^\[[^\]]+\]\s*/, '').trim();
  const currentText = getSection('指摘箇所|現在の記述');
  const suggestedText = getSection('正しい数値|内容|修正案');
  const sources = getSection('根拠|公的データ|一次情報');
  const notes = getSection('補足|備考');

  return { targetPolicy, currentText, suggestedText, sources, notes };
}

// 該当するポリシーJSONを検索
function findMatchedPolicy(query) {
  if (!fs.existsSync(POLICIES_DIR)) return null;
  const files = fs.readdirSync(POLICIES_DIR).filter(f => f.endsWith('.json'));

  const cleanQuery = query.toLowerCase().replace(/[#\s\[\]【】（）()]/g, '');

  // 完全一致チェック (IDまたはファイル名)
  for (const file of files) {
    const id = file.replace('.json', '');
    if (cleanQuery.includes(id) || id.includes(cleanQuery)) {
      const data = JSON.parse(fs.readFileSync(path.join(POLICIES_DIR, file), 'utf8'));
      return { file, data };
    }
  }

  // タイトル部分一致チェック
  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(POLICIES_DIR, file), 'utf8'));
    const cleanTitle = data.title.toLowerCase().replace(/[#\s\[\]【】（）()]/g, '');
    if (cleanQuery.includes(cleanTitle) || cleanTitle.includes(cleanQuery)) {
      return { file, data };
    }
  }

  return null;
}

// Gemini API 呼び出し
async function callGeminiAnalysis(apiKey, matchedPolicy, extracted) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const prompt = `
あなたは公的データに基づくシビックテック「ポリスケープ（PoliScape）」の専属ファクトチェックAIデスクです。
読者・専門家からGitHub Issue経由で届いた「事実誤認・公的データとの乖離の指摘」を、中立・客観的かつ厳密に分析し、検証レポートを作成してください。

【対象の政策データ】
- ファイル名: src/data/policies/${matchedPolicy.file}
- タイトル: ${matchedPolicy.data.title}
- キャッチコピー: ${matchedPolicy.data.catchphrase}
- カテゴリ: ${matchedPolicy.data.categoryLabel}
- 要約: ${JSON.stringify(matchedPolicy.data.summary.standard, null, 2)}
- 変更点: ${JSON.stringify(matchedPolicy.data.changes, null, 2)}
- 登録されている一次情報: ${JSON.stringify(matchedPolicy.data.sources, null, 2)}

【ユーザーからの報告内容】
- 指摘箇所と現在の記述: ${extracted.currentText || '指定なし'}
- 正しい数値・内容（ユーザー修正案）: ${extracted.suggestedText || '指定なし'}
- 提示された公的根拠・一次情報URL: ${extracted.sources || '指定なし'}
- 補足コメント: ${extracted.notes || 'なし'}

以下の項目を含むMarkdown形式でレポートを出力してください：

### 1. 判定結果
次のいずれか1つを太字で明記し、簡潔な理由を1〜2行で述べてください：
- **【妥当（修正推奨）】**: 一次情報と照らして明らかに誤りや混同がある場合
- **【要確認（解釈・表現の調整余地あり）】**: 誤りとは言い切れないが、誤解を生みやすい表現の場合
- **【現状維持推奨（公的データと合致または政治的持論）】**: 既存の記述が公的データに基づいているか、中立的な両論の範疇の場合

### 2. 事実関係の照合・解説
- 提示された一次情報や公的データ（官公庁資料、白書、法律等）に照らし、指摘が正しいかどうかを中立に解説してください。
- 期間単位（年次 vs 複数年総額）、対象者要件、法律の施行時期などの混同がないかを具体的に検証してください。

### 3. 推奨される修正案（Diff）
判定が「妥当」または「要確認」の場合、該当するJSONファイルの修正Diffを提示してください（\`src/data/policies/${matchedPolicy.file}\`）。
JSONのプロパティ（\`catchphrase\` や \`summary\` 等）の修正案をコードブロックで具体的に示してください。

### 4. 運営者への注意事項
- シビックテックとしての中立性・両論併記が損なわれないためのアドバイスや、他コンポーネント（カードやシミュレーター等）への影響があれば簡潔に記載してください。
`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      return `❌ Gemini API エラー (${res.status}): ${errText}`;
    }

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'レポートの生成に失敗しました。';
  } catch (error) {
    return `❌ API通信エラー: ${error.message}`;
  }
}

// GitHub Issueにコメントを投稿
async function postIssueComment(repo, issueNumber, token, body) {
  const url = `https://api.github.com/repos/${repo}/issues/${issueNumber}/comments`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': 'poliscape-fact-check-bot'
    },
    body: JSON.stringify({ body })
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`❌ コメント投稿失敗 (${res.status}): ${errText}`);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
