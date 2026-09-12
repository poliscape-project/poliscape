const fs = require('fs');
const path = require('path');
const filePath = path.resolve('src/lib/highlights.ts');
let c = fs.readFileSync(filePath, 'utf-8');
const before = c.length;
// Remove blank lines between labelSimple and labelStandard lines
// Pattern: labelSimple: "...",\n\n  labelStandard → labelSimple: "...",\n  labelStandard
c = c.replace(/labelSimple: ("[^"]*"),\r?\n\r?\n(\s+labelStandard)/g, 'labelSimple: $1,\n$2');
const after = c.length;
fs.writeFileSync(filePath, c, 'utf-8');
const size = (fs.statSync(filePath).size / 1024).toFixed(1);
console.log(`Cleaned: removed ${before - after} bytes of blank lines`);
console.log(`highlights.ts: ${size}KB`);
