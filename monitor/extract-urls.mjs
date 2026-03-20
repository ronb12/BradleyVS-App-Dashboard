/**
 * Reads APPS urls from BVS_Dashboard_v2_1.html and writes urls for Playwright smoke tests.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const htmlPath = path.join(root, 'BVS_Dashboard_v2_1.html');
const outPath = path.join(__dirname, 'urls.json');

const html = fs.readFileSync(htmlPath, 'utf8');
const urls = new Set();
const re = /url:"(https:\/\/[^"]+)"/g;
let m;
while ((m = re.exec(html))) {
  urls.add(m[1]);
}

const list = [...urls].sort();
fs.writeFileSync(outPath, JSON.stringify({ generatedFrom: 'BVS_Dashboard_v2_1.html', urls: list }, null, 2));
console.log('Wrote', outPath, list.length, 'URLs');
