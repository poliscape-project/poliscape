/**
 * check-facts.js
 * 政策データ（src/data/policies/*.json）の数値整合性・マクロ経済境界値・自己矛盾を自動検証する安全装置スクリプト
 */

const fs = require('fs');
const path = require('path');

const POLICIES_DIR = path.join(__dirname, '../src/data/policies');

if (!fs.existsSync(POLICIES_DIR)) {
  console.error(`❌ Policies directory not found: ${POLICIES_DIR}`);
  process.exit(1);
}

const files = fs.readdirSync(POLICIES_DIR).filter(f => f.endsWith('.json'));
console.log(`🔍 [Fact-Checker] ${files.length} 件の政策データを検査中...`);

let errorCount = 0;
let warningCount = 0;

files.forEach(file => {
  const filePath = path.join(POLICIES_DIR, file);
  const rawContent = fs.readFileSync(filePath, 'utf8');
  let policy;

  try {
    policy = JSON.parse(rawContent);
  } catch (e) {
    console.error(`❌ [JSON Parse Error] ${file}: 不正なJSON形式です`);
    errorCount++;
    return;
  }

  // 1. 必須フィールドの存在チェック
  const requiredFields = ['id', 'title', 'catchphrase', 'category', 'summary', 'changes', 'sources'];
  for (const field of requiredFields) {
    if (!policy[field] || (Array.isArray(policy[field]) && policy[field].length === 0)) {
      console.error(`❌ [Missing Field] ${file}: 必須フィールド "${field}" が空または存在しません`);
      errorCount++;
    }
  }

  // 2. マクロ経済・オーダー（桁数）境界値チェック
  // 2-1. 防衛費の単年度規模（GDP比2%でも年約8〜11兆円程度。年15兆円超は異常）
  const defenseAnnualMatch = rawContent.match(/防衛(?:費|予算|関係費)[^。、\n]{0,20}?年(?:間)?(?:約)?(\d+(?:\.\d+)?)\s*兆円/);
  if (defenseAnnualMatch) {
    const val = parseFloat(defenseAnnualMatch[1]);
    if (val > 15) {
      console.error(`❌ [Boundary Error] ${file} (${policy.title}): 防衛費の年額が ${val}兆円 となっています（GDP比2%でも年11〜12兆円が上限）。複数年総額と年次予算を取り違えている可能性があります。`);
      errorCount++;
    }
  }

  // 2-2. 単一政策・単一予算の単年度が100兆円超（日本の一般会計歳出全体でも約110兆円）
  const hugeAnnualMatches = [...rawContent.matchAll(/年(?:間)?(?:約)?(\d+(?:\.\d+)?)\s*兆円/g)];
  for (const m of hugeAnnualMatches) {
    const val = parseFloat(m[1]);
    // 2040年市場規模等の将来市場予想は除外
    const context = rawContent.substring(Math.max(0, m.index - 20), Math.min(rawContent.length, m.index + 30));
    if (val >= 100 && !context.includes('市場') && !context.includes('タンス預金') && !context.includes('2040年') && !context.includes('2030年') && !context.includes('GDP')) {
      console.error(`❌ [Boundary Error] ${file} (${policy.title}): 単年度予算として ${val}兆円 という非現実的な規模が検出されました。文脈: "${context.trim()}"`);
      errorCount++;
    }
  }

  // 2-3. 個人向け給付・負担の異常単位（1人あたりXX億円、1人あたりXX兆円）
  const perPersonExcessive = [...rawContent.matchAll(/(?:1人|一人|世帯)(?:あたり)?[^。、\n]{0,15}?(\d+(?:\.\d+)?)\s*(?:億|兆)円/g)];
  for (const m of perPersonExcessive) {
    const context = rawContent.substring(Math.max(0, m.index - 20), Math.min(rawContent.length, m.index + 30));
    // 「1人あたりGDP」「1人あたり年間250円（総額315億円）」などは除外
    if (!context.includes('GDP') && !context.includes('総額') && !context.includes('予算') && !context.includes('市場')) {
      console.error(`❌ [Unit Mismatch] ${file} (${policy.title}): 個人・世帯単位に対して億・兆円が修飾されています。文脈: "${context.trim()}"`);
      errorCount++;
    }
  }

  // 3. 同一ファイル内での自己矛盾チェック（キャッチコピー vs 本文の数値・期間修飾）
  // 例: キャッチコピーで「年43兆円」と書きながら、本文で「5年間で総額43兆円」「年約8〜9兆円」と書いているようなケース
  const cpTrillionMatches = [...(policy.catchphrase || '').matchAll(/(\d+(?:\.\d+)?)\s*兆円/g)];
  for (const cpm of cpTrillionMatches) {
    const num = cpm[1];
    const cpIsAnnual = /年(?:間)?/.test(policy.catchphrase) && !/(?:[2-9]\d*年|5年|10年)/.test(policy.catchphrase);
    
    // 本文（summary, changes）での同数値の使われ方を検証
    const bodyText = JSON.stringify(policy.summary) + JSON.stringify(policy.changes);
    const bodyMatches = [...bodyText.matchAll(new RegExp(`(\\d+(?:\\.\\d+)?)\\s*兆円`, 'g'))].filter(bm => bm[1] === num);
    
    for (const bm of bodyMatches) {
      const bSnippet = bodyText.substring(Math.max(0, bm.index - 30), Math.min(bodyText.length, bm.index + 30));
      const bodyIsTotal = /(?:総額|5年間|10年間|枠|複数年)/.test(bSnippet);
      const bodyHasDifferentAnnual = /年(?:約)?([0-9.]+)\s*兆円/.test(bodyText) && !bodyText.includes(`年約${num}兆円`) && !bodyText.includes(`年${num}兆円`);

      if (cpIsAnnual && bodyIsTotal && bodyHasDifferentAnnual) {
        console.error(`❌ [Self-Contradiction] ${file} (${policy.title}): キャッチコピーでは「年${num}兆円」と記載されていますが、本文では「総額${num}兆円（年額は別数値）」と自己矛盾しています。`);
        errorCount++;
      }
    }
  }
});

console.log(`\n=============================================`);
console.log(`📊 [Fact-Checker 検査結果] 検査対象: ${files.length} 件`);
console.log(`   エラー: ${errorCount} 件 | 警告: ${warningCount} 件`);
console.log(`=============================================`);

if (errorCount > 0) {
  console.error(`🚨 ファクトチェックで ${errorCount} 件の重大な不整合が検出されました。修正してからコミット・ビルドしてください。`);
  process.exit(1);
} else {
  console.log(`✅ 全ての政策データが数値・単位・境界値テストをクリアしました！\n`);
  process.exit(0);
}
