/**
 * PolicyHighlightCards.tsx から cardDataMap を抽出し、
 * src/lib/highlights.ts を生成するスクリプト
 * 
 * 変換内容:
 * - isSimpleMode ternary → labelSimple / labelStandard に分割
 * - Lucide icon 参照を維持
 * - defaultHighlights ロジックはコンポーネント側に残す
 * 
 * Usage: node scripts/extract-highlights.mjs
 */
import fs from 'fs';
import path from 'path';

const SOURCE = path.resolve('src/components/PolicyHighlightCards.tsx');
const DEST = path.resolve('src/lib/highlights.ts');

const source = fs.readFileSync(SOURCE, 'utf-8');
const lines = source.split('\n');

// === 1. cardDataMap の範囲特定 ===
// 開始: "const cardDataMap: Record<string, any[]> = {"
// 終了: defaultHighlights の直前の "};" 
let mapStart = -1;
let mapEnd = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('cardDataMap:') || lines[i].includes('cardDataMap =') || lines[i].trimStart().startsWith('const cardDataMap')) {
    mapStart = i;
  }
  // defaultHighlights が始まる行を探す
  if (lines[i].includes('const isUnderDiscussion') || lines[i].includes('const defaultHighlights')) {
    // cardDataMap の閉じ括弧はこの行の少し前
    // 逆方向に走査して最初の "};" を見つける
    for (let j = i - 1; j > mapStart; j--) {
      if (lines[j].trim() === '};') {
        mapEnd = j;
        break;
      }
    }
    break;
  }
}

if (mapStart === -1 || mapEnd === -1) {
  console.error('ERROR: cardDataMap の範囲を特定できません');
  console.error(`mapStart: ${mapStart}, mapEnd: ${mapEnd}`);
  process.exit(1);
}

console.log(`cardDataMap: line ${mapStart + 1} to ${mapEnd + 1} (${mapEnd - mapStart + 1} lines)`);

// === 2. cardDataMap の中身を抽出 ===
// 行27 "const cardDataMap: Record<string, any[]> = {" 
// → 中の政策データだけを取得
const mapContent = lines.slice(mapStart, mapEnd + 1).join('\n');

// === 3. import されている Lucide icon を特定 ===
const iconImportLines = [];
let inImportBlock = false;
const importedIcons = new Set();

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('from "lucide-react"') || line.includes("from 'lucide-react'")) {
    // 同じ行にある場合
    inImportBlock = false;
    // この行と前の import 行を抽出
    break;
  }
  if (line.includes('{') && inImportBlock) {
    // import ブロック内の行
  }
}

// Lucide import を一括抽出
const importMatch = source.match(/import\s*\{([^}]+)\}\s*from\s*["']lucide-react["']/s);
let lucideImports = '';
if (importMatch) {
  const icons = importMatch[1].split(',').map(s => s.trim()).filter(Boolean);
  lucideImports = `import {\n  ${icons.join(', ')}\n} from "lucide-react";\nimport type { LucideIcon } from "lucide-react";`;
  icons.forEach(icon => importedIcons.add(icon));
}

// === 4. isSimpleMode ternary 変換 ===
// パターン: someField: isSimpleMode ? "value1" : "value2"
// 変換先: someFieldSimple: "value1", someFieldStandard: "value2"
let convertedCount = 0;

function convertTernaries(content) {
  // パターン1: field: isSimpleMode ? "string" : "string",
  // 日本語文字列を含むため、" の中に「」等が含まれる
  const ternaryRegex = /^(\s+)(\w+):\s*isSimpleMode\s*\?\s*("(?:[^"\\]|\\.)*")\s*:\s*("(?:[^"\\]|\\.)*")(,?)$/gm;
  
  const converted = content.replace(ternaryRegex, (match, indent, field, simpleVal, stdVal, comma) => {
    convertedCount++;
    return `${indent}${field}Simple: ${simpleVal},\n${indent}${field}Standard: ${stdVal}${comma}`;
  });
  
  return converted;
}

let convertedMap = convertTernaries(mapContent);

console.log(`isSimpleMode ternary 変換: ${convertedCount} 箇所`);

// === 5. highlights.ts を生成 ===

// cardDataMap の中身のみを抽出（外側の "const cardDataMap ... = {" と "};" を除く）
// convertedMap は "  const cardDataMap: Record<string, any[]> = { ... };" 全体
// → そのまま使い、型定義を変更する

// 型定義とexport関数を含む出力を構築
const output = `/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 政策ハイライトカードデータ
 * 
 * PolicyHighlightCards.tsx から分離された純粋なデータモジュール。
 * 各政策の注目ポイントカード情報を管理する。
 */

${lucideImports}

export interface HighlightCard {
  labelSimple: string;
  labelStandard: string;
  value: string;
  unit: string;
  oldValue: string;
  description: string;
  badge: string;
  badgeColor: string;
  icon: LucideIcon;
}

${convertedMap}

/**
 * 指定された政策IDのハイライトカードデータを取得する
 * @param policyId 政策ID
 * @param isSimpleMode やさしい日本語モードかどうか
 * @returns ハイライトカード配列、または undefined
 */
export function getHighlightCards(policyId: string, isSimpleMode: boolean): HighlightCard[] | undefined {
  const raw = cardDataMap[policyId];
  if (!raw) return undefined;
  return raw.map((card: any) => ({
    ...card,
    label: isSimpleMode ? card.labelSimple : card.labelStandard,
  }));
}
`;

fs.writeFileSync(DEST, output, 'utf-8');

const destSize = fs.statSync(DEST).size;
console.log(`\\n=== 結果 ===`);
console.log(`出力: ${DEST}`);
console.log(`サイズ: ${(destSize / 1024).toFixed(1)}KB`);
console.log(`変換: ${convertedCount} 箇所の isSimpleMode ternary`);
