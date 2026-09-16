const fs = require('fs');
const path = require('path');

const POLICIES_DIR = path.join(__dirname, '../src/data/policies');
const files = fs.readdirSync(POLICIES_DIR).filter(f => f.endsWith('.json'));

console.log(`[check:duplicates] Scanning ${files.length} policies for potential duplicates...`);

const policies = files.map(f => {
  const p = JSON.parse(fs.readFileSync(path.join(POLICIES_DIR, f), 'utf8'));
  return {
    file: f,
    id: p.id,
    title: p.title || '',
    catchphrase: p.catchphrase || '',
    category: p.category || '',
    sources: p.sources || []
  };
});

// 1. URL重複チェック
const genericUrls = new Set([
  'https://www.digital.go.jp',
  'https://www.soumu.go.jp',
  'https://www.mext.go.jp',
  'https://www.mhlw.go.jp',
  'https://www.meti.go.jp',
  'https://www.mlit.go.jp',
  'https://www.env.go.jp',
  'https://www.mof.go.jp',
  'https://www.cao.go.jp',
  'https://www.cas.go.jp',
  'https://www.kantei.go.jp',
  'https://www.cfa.go.jp',
  'https://www.fsa.go.jp',
  'https://www.caa.go.jp',
  'https://www.jftc.go.jp',
  'https://www.mod.go.jp',
  'https://www.moj.go.jp',
  'https://www.mofa.go.jp',
  'https://www.maff.go.jp',
  'https://www.npa.go.jp',
  'https://www.mext.go.jp/a_menu/ikusei/gakuseishien/1412620.htm'
]);

const urlMap = new Map();
policies.forEach(p => {
  p.sources.forEach(s => {
    if (!s.url) return;
    const clean = s.url.trim().replace(/\/$/, '').toLowerCase();
    if (!urlMap.has(clean)) {
      urlMap.set(clean, []);
    }
    urlMap.get(clean).push({ id: p.id, title: p.title, sourceTitle: s.title });
  });
});

let urlDuplicates = [];
for (const [url, plist] of urlMap.entries()) {
  if (plist.length > 1 && !genericUrls.has(url)) {
    try {
      const u = new URL(url);
      const pathParts = u.pathname.split('/').filter(Boolean);
      if (pathParts.length >= 2) {
        urlDuplicates.push({ url, policies: plist });
      }
    } catch (e) {
      // ignore
    }
  }
}

// 2. タイトル類似度チェック（Jaccard係数）
function getBigrams(str) {
  const s = str.replace(/[\s\(\)（）「」『』【】・、。]/g, '').toLowerCase();
  const bigrams = new Set();
  for (let i = 0; i < s.length - 1; i++) {
    bigrams.add(s.slice(i, i + 2));
  }
  return bigrams;
}

function jaccardSimilarity(setA, setB) {
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }
  return intersection / (setA.size + setB.size - intersection);
}

const titleDuplicates = [];
for (let i = 0; i < policies.length; i++) {
  const bA = getBigrams(policies[i].title);
  for (let j = i + 1; j < policies.length; j++) {
    const bB = getBigrams(policies[j].title);
    const sim = jaccardSimilarity(bA, bB);
    if (sim >= 0.6) {
      titleDuplicates.push({
        policyA: { id: policies[i].id, title: policies[i].title },
        policyB: { id: policies[j].id, title: policies[j].title },
        similarity: (sim * 100).toFixed(1) + '%'
      });
    }
  }
}

console.log(`\n=== 重複検知サマリー ===`);
console.log(`[URL照合] 同一詳細URLを参照している政策グループ: ${urlDuplicates.length} 件`);
console.log(`[タイトル照合] タイトル類似度60%以上の政策ペア: ${titleDuplicates.length} 件`);

if (urlDuplicates.length > 0) {
  console.log(`\n--- 同一詳細URL参照グループ (抜粋10件) ---`);
  urlDuplicates.slice(0, 10).forEach((ud, idx) => {
    console.log(`${idx + 1}. URL: ${ud.url}`);
    ud.policies.forEach(p => console.log(`   └─ [${p.id}] ${p.title}`));
  });
}

if (titleDuplicates.length > 0) {
  console.log(`\n--- 高類似度タイトルペア一覧 ---`);
  titleDuplicates.forEach((td, idx) => {
    console.log(`${idx + 1}. 一致率 ${td.similarity}:`);
    console.log(`   A: [${td.policyA.id}] ${td.policyA.title}`);
    console.log(`   B: [${td.policyB.id}] ${td.policyB.title}`);
  });
}

const criticalDuplicates = titleDuplicates.filter(td => parseFloat(td.similarity) >= 70.0);
if (criticalDuplicates.length > 0) {
  console.log(`\n[WARNING] タイトル一致率70%以上の極めて類似した政策が ${criticalDuplicates.length} 件存在します。`);
}
