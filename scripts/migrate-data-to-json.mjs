/**
 * migrate-data-to-json.mjs
 * 
 * src/lib/highlights.ts と src/lib/voices.ts からデータを抽出し、
 * 全ての政策JSON（src/data/policies/{id}.json）に highlights と voices をマージする。
 */
import fs from 'fs';
import path from 'path';

const HIGHLIGHTS_FILE = path.resolve('src/lib/highlights.ts');
const VOICES_FILE = path.resolve('src/lib/voices.ts');
const POLICIES_DIR = path.resolve('src/data/policies');

console.log('--- 1. highlights.ts の解析 ---');
const highlightsContent = fs.readFileSync(HIGHLIGHTS_FILE, 'utf-8');

// cardDataMap のオブジェクトリテラル部分を抽出
const hlMapMatch = highlightsContent.match(/const\s+cardDataMap\s*:\s*Record<[^>]+>\s*=\s*(\{[\s\S]+\});\s*$/m);
if (!hlMapMatch) {
  console.error('ERROR: cardDataMap が highlights.ts から抽出できません');
  process.exit(1);
}

// "icon: LucideIconName" を "icon: 'LucideIconName'" に変換
let hlLiteral = hlMapMatch[1];
hlLiteral = hlLiteral.replace(/icon:\s*([A-Za-z0-9_]+)/g, 'icon: "$1"');

let highlightsMap;
try {
  highlightsMap = new Function('return ' + hlLiteral)();
  console.log(`highlightsMap: ${Object.keys(highlightsMap).length} 件の政策ハイライトを取得`);
} catch (e) {
  console.error('ERROR: highlightsMap の評価に失敗:', e.message);
  process.exit(1);
}

console.log('\n--- 2. voices.ts の解析 ---');
const voicesContent = fs.readFileSync(VOICES_FILE, 'utf-8');

// voicesMap のオブジェクトリテラル部分を抽出
const vcMapMatch = voicesContent.match(/const\s+voicesMap\s*:\s*Record<[^>]+>\s*=\s*(\{[\s\S]+\});\s*$/m);
if (!vcMapMatch) {
  console.error('ERROR: voicesMap が voices.ts から抽出できません');
  process.exit(1);
}

let vcLiteral = vcMapMatch[1];
let voicesMap;
try {
  voicesMap = new Function('return ' + vcLiteral)();
  console.log(`voicesMap: ${Object.keys(voicesMap).length} 件の政策ボイスを取得`);
} catch (e) {
  console.error('ERROR: voicesMap の評価に失敗:', e.message);
  process.exit(1);
}

console.log('\n--- 3. 全政策JSONへの注入 ---');
const allPolicyFiles = fs.readdirSync(POLICIES_DIR).filter(f => f.endsWith('.json'));
console.log(`対象JSONファイル: ${allPolicyFiles.length} 件`);

let hlInjected = 0;
let vcInjected = 0;

for (const file of allPolicyFiles) {
  const policyId = file.replace('.json', '');
  const filePath = path.join(POLICIES_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  let policy;
  try {
    policy = JSON.parse(content);
  } catch (e) {
    console.error(`ERROR: ${file} のパースに失敗:`, e.message);
    continue;
  }

  let modified = false;

  // highlights のマージ
  if (highlightsMap[policyId]) {
    policy.highlights = highlightsMap[policyId];
    hlInjected++;
    modified = true;
  }

  // voices のマージ
  if (voicesMap[policyId]) {
    policy.voices = voicesMap[policyId];
    vcInjected++;
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, JSON.stringify(policy, null, 2) + '\n', 'utf-8');
  }
}

console.log(`\n=== 移行完了 ===`);
console.log(`highlights 注入: ${hlInjected} 件 / ${Object.keys(highlightsMap).length} 件中`);
console.log(`voices 注入:     ${vcInjected} 件 / ${Object.keys(voicesMap).length} 件中`);
console.log(`処理したJSON:    ${allPolicyFiles.length} 件`);
