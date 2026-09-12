const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src', 'data', 'policies');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

// Main mapping: old category -> new category
const categoryMap = {
  // Stay the same
  childcare: 'childcare',
  healthcare: 'healthcare',
  pension: 'pension',
  tax: 'tax',
  education: 'education',
  economy: 'economy',
  environment: 'environment',
  // Merges
  medical: 'healthcare',
  employment: 'labor',
  labor: 'labor',
  digital: 'digital',
  transport: 'transport',
  traffic: 'transport',
  defense: 'society',
  security: 'society',
  society: 'society',
  living: 'environment',
  governance: 'society',
  social: 'society',
  regional: 'society',
};

// Per-file overrides for borderline cases
const fileOverrides = {
  // social: 子育て系 → childcare
  'child-commissioner-independent-advocacy-body.json': 'childcare',
  'donor-conception-right-to-know-origins.json': 'healthcare',
  // regional: デジタル行政 → digital
  'residence-card-mynumber-card-unification-act.json': 'digital',
  // regional: 住宅系 → environment (住まい・防災系)
  'unmanaged-abandoned-houses-tax-break-removal-enforcement.json': 'environment',
  'aging-condominium-rebuilding-resolution-threshold-easing.json': 'environment',
  // regional: 地域・環境 → environment
  'wild-boar-deer-damage-prevention-gibier-utilization.json': 'environment',
  // regional: 福祉系 → healthcare
  'lonely-death-prevention-housing-support-monitoring.json': 'healthcare',
  'testamentary-substitute-trust-single-elderly-affairs.json': 'healthcare',
};

let changed = 0;
let unchanged = 0;
const stats = {};

for (const file of files) {
  const filePath = path.join(dir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const json = JSON.parse(content);
  const oldCat = json.category;
  
  // Determine new category
  const newCat = fileOverrides[file] || categoryMap[oldCat];
  
  if (!newCat) {
    console.error(`UNKNOWN CATEGORY: ${oldCat} in ${file}`);
    continue;
  }

  // Track stats
  stats[newCat] = (stats[newCat] || 0) + 1;

  if (oldCat !== newCat) {
    json.category = newCat;
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf8');
    changed++;
  } else {
    unchanged++;
  }
}

console.log(`\nMigration complete: ${changed} changed, ${unchanged} unchanged, ${changed + unchanged} total`);
console.log('\nNew category distribution:');
Object.entries(stats).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log(`  ${count.toString().padStart(3)} : ${cat}`);
});