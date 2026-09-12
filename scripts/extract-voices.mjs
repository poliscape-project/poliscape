import fs from 'fs';
import path from 'path';

const SRC_FILE = path.join(process.cwd(), 'src/components/PolicyPerspectives.tsx');
const TARGET_FILE = path.join(process.cwd(), 'src/lib/voices.ts');

const content = fs.readFileSync(SRC_FILE, 'utf-8');

// Find the boundaries of voicesMap
const startIndex = content.indexOf('  const voicesMap: Record');
if (startIndex === -1) {
  console.error("Could not find voicesMap start");
  process.exit(1);
}

const beforeVoicesMap = content.slice(0, startIndex);
let afterMapIndex = content.indexOf('  };\n\n  const voices = voicesMap[policyId]');
if (afterMapIndex === -1) {
    // Try another search
    afterMapIndex = content.indexOf('  };\n\n  const voices = ');
    if (afterMapIndex === -1) {
        afterMapIndex = content.indexOf('  };\n', startIndex + 1000); // 2467 line
    }
}

// Find the exact ending of the voicesMap object
const mapEndString = '  };\n';
let actualEndIndex = content.indexOf(mapEndString, startIndex);
while (actualEndIndex !== -1 && actualEndIndex < content.length) {
    // check if the next line is `  const voices =`
    const nextPart = content.slice(actualEndIndex, actualEndIndex + 100);
    if (nextPart.includes('const voices =')) {
        break;
    }
    actualEndIndex = content.indexOf(mapEndString, actualEndIndex + mapEndString.length);
}

if (actualEndIndex === -1) {
    console.error("Could not find voicesMap end");
    process.exit(1);
}

const mapContent = content.slice(startIndex, actualEndIndex + mapEndString.length);

// We want to transform the content:
// const voicesMap: Record<string, { benefits: any[]; challenges: any[] }> = {
// => const voicesMap: Record<string, VoiceSet> = {
let extractedObjStr = mapContent.replace(/const voicesMap.*\{/, 'const voicesMap: Record<string, VoiceSet> = {');

// We have 2 levels of indentation.
// We need to replace:
// comment: isSimpleMode
//   ? "A"
//   : "B",
// to:
// commentSimple: "A",
// commentStandard: "B",

let replaceCount = 0;
const regex = /comment:\s*isSimpleMode\s*\?\s*("[^"]+")\s*:\s*("[^"]+")/g;
const transformedMapStr = extractedObjStr.replace(regex, (match, simple, standard) => {
    replaceCount++;
    return `commentSimple: ${simple},\n          commentStandard: ${standard}`;
});

const tsCode = `// src/lib/voices.ts
export interface VoiceEntry {
  speaker: string;
  commentStandard: string;
  commentSimple: string;
}

export interface VoiceSet {
  benefits: VoiceEntry[];
  challenges: VoiceEntry[];
}

${transformedMapStr.trim()}

export function getVoices(policyId: string): VoiceSet | undefined {
  return voicesMap[policyId];
}
`;

fs.writeFileSync(TARGET_FILE, tsCode, 'utf-8');

// Now rewrite the source file
const afterVoicesMap = content.slice(actualEndIndex + mapEndString.length);

// Replacement for lines 2469-2478
const voicesLookupRegex = /const voices = voicesMap\[policyId\][\s\S]*?challenges:[\s\S]*?\}\)\),[\s\S]*?\};\n/;
const newVoicesLookup = `const rawVoices = getVoices(policyId);
  const voices = rawVoices ? {
    benefits: rawVoices.benefits.map((v: any) => ({
      speaker: v.speaker,
      comment: isSimpleMode ? v.commentSimple : v.commentStandard
    })),
    challenges: rawVoices.challenges.map((v: any) => ({
      speaker: v.speaker, 
      comment: isSimpleMode ? v.commentSimple : v.commentStandard
    }))
  } : {
    benefits: (benefits || []).slice(0, 2).map((b) => ({
      speaker: b.tag || (isSimpleMode ? "応援する人" : "推進・期待側の声"),
      comment: isSimpleMode ? \`「\${b.simpleDetail || b.summary}」\` : \`「\${b.summary}」\`,
    })),
    challenges: (challenges || []).slice(0, 2).map((c) => ({
      speaker: c.tag || (isSimpleMode ? "心配する人" : "懸念・慎重側の声"),
      comment: isSimpleMode ? \`「\${c.simpleDetail || c.summary}」\` : \`「\${c.summary}」\`,
    })),
  };\n`;

let newAfterVoicesMap = afterVoicesMap.replace(voicesLookupRegex, newVoicesLookup);
if (newAfterVoicesMap === afterVoicesMap) {
    console.log("Warning: could not replace voices lookup with regex. Going manual.");
    // manual replacement based on known exact text
    const oldText = `  const voices = voicesMap[policyId] || {
    benefits: (benefits || []).slice(0, 2).map((b) => ({
      speaker: b.tag || (isSimpleMode ? "応援する人" : "推進・期待側の声"),
      comment: isSimpleMode ? \`「\${b.simpleDetail || b.summary}」\` : \`「\${b.summary}」\`,
    })),
    challenges: (challenges || []).slice(0, 2).map((c) => ({
      speaker: c.tag || (isSimpleMode ? "心配する人" : "懸念・慎重側の声"),
      comment: isSimpleMode ? \`「\${c.simpleDetail || c.summary}」\` : \`「\${c.summary}」\`,
    })),
  };`;
    newAfterVoicesMap = afterVoicesMap.replace(oldText, newVoicesLookup.trim());
}

// Ensure the import is added
const importStr = `import { getVoices } from "@/lib/voices";\n`;

// Find the last import
const lastImportIndex = beforeVoicesMap.lastIndexOf('import ');
const nextLineAfterLastImport = beforeVoicesMap.indexOf('\n', lastImportIndex) + 1;
const beforeImports = beforeVoicesMap.slice(0, nextLineAfterLastImport);
const afterImports = beforeVoicesMap.slice(nextLineAfterLastImport);

const finalContent = beforeImports + importStr + afterImports + newAfterVoicesMap;

fs.writeFileSync(SRC_FILE, finalContent, 'utf-8');

console.log(JSON.stringify({
    replaceCount,
    extractedLength: mapContent.length,
    newLength: finalContent.length,
    oldLength: content.length,
}));
