/**
 * badges.ts から badgeMap を解析し、各政策JSONに badges フィールドを注入するスクリプト
 * 
 * Usage: node scripts/migrate-badges-to-json.mjs
 */
import fs from 'fs';
import path from 'path';

const BADGES_FILE = path.resolve('src/lib/badges.ts');
const POLICIES_DIR = path.resolve('src/data/policies');

// badges.ts を読み込み、badgeMap のオブジェクトリテラルを抽出
const badgesContent = fs.readFileSync(BADGES_FILE, 'utf-8');

// badgeMap の中身（{ ... }）を抽出
const mapMatch = badgesContent.match(/export\s+const\s+badgeMap[^=]*=\s*(\{[\s\S]+\});?\s*$/m);
if (!mapMatch) {
  console.error('ERROR: badgeMap が見つかりません');
  process.exit(1);
}

// オブジェクトリテラルを評価して JS オブジェクトに変換
const objLiteral = mapMatch[1];
let badgeMap;
try {
  badgeMap = new Function('return ' + objLiteral)();
} catch (e) {
  console.error('ERROR: badgeMap の評価に失敗:', e.message);
  process.exit(1);
}

const policyIds = Object.keys(badgeMap);
console.log(`badgeMap から ${policyIds.length} 件のポリシーIDを検出`);

let injected = 0;
let skipped = 0;
let notFound = 0;

for (const id of policyIds) {
  const jsonPath = path.join(POLICIES_DIR, `${id}.json`);
  
  if (!fs.existsSync(jsonPath)) {
    console.warn(`  WARN: ${id}.json が見つかりません`);
    notFound++;
    continue;
  }
  
  const content = fs.readFileSync(jsonPath, 'utf-8');
  let policy;
  try {
    policy = JSON.parse(content);
  } catch (e) {
    console.error(`  ERROR: ${id}.json の解析に失敗: ${e.message}`);
    skipped++;
    continue;
  }
  
  // badges フィールドを注入
  const badges = badgeMap[id].map(b => ({
    text: b.text,
    color: b.color
  }));
  
  policy.badges = badges;
  
  // 書き戻し
  const output = JSON.stringify(policy, null, 2);
  fs.writeFileSync(jsonPath, output + '\n', 'utf-8');
  injected++;
}

console.log(`\n=== 結果 ===`);
console.log(`注入成功: ${injected} 件`);
console.log(`スキップ: ${skipped} 件`);
console.log(`未検出:   ${notFound} 件`);
console.log(`合計:     ${policyIds.length} 件`);
