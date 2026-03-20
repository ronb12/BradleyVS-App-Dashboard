/**
 * Writes cloud-config.js so the dashboard calls the API on the correct host.
 * - Production: VERCEL_PROJECT_PRODUCTION_URL (stable *.vercel.app)
 * - Preview: VERCEL_URL (this deployment only)
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function normalizeApiBase(urlOrHost) {
  if (!urlOrHost) return '';
  let u = String(urlOrHost).trim().replace(/\/$/, '');
  if (!u) return '';
  if (!/^https?:\/\//i.test(u)) u = `https://${u}`;
  return u;
}

const isProd = process.env.VERCEL_ENV === 'production';
let base = '';
if (isProd && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
  base = normalizeApiBase(process.env.VERCEL_PROJECT_PRODUCTION_URL);
} else if (process.env.VERCEL_URL) {
  base = normalizeApiBase(process.env.VERCEL_URL);
}
const out = `window.BVS_CLOUD_API_BASE=${JSON.stringify(base)};\n`;
writeFileSync(join(root, 'cloud-config.js'), out);
console.log('[bvs] cloud-config.js →', base || '(empty — local build)');
