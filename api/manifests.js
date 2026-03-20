/**
 * GET /api/manifests — public JSON for dashboard maintenance checks (Vercel serverless).
 * JSON files are statically imported so they are included in the function bundle.
 * Optional env overrides (full JSON strings): BVS_VERCEL_MANIFEST_JSON,
 * BVS_FIREBASE_MANIFEST_JSON, BVS_RUNTIME_CHECK_JSON
 */
import vercelBundled from '../data/vercel-deployment-manifest.json' with { type: 'json' };
import firebaseBundled from '../data/firebase-hosting-manifest.json' with { type: 'json' };
import runtimeBundled from '../data/latest-runtime-check.json' with { type: 'json' };

function parseEnvJson(name) {
  const raw = process.env[name];
  if (!raw || typeof raw !== 'string') return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.warn('[bvs manifests] invalid JSON in', name, e.message);
    return null;
  }
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') {return res.status(204).end();}
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, OPTIONS');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const vercel = parseEnvJson('BVS_VERCEL_MANIFEST_JSON') || vercelBundled;
  const firebase = parseEnvJson('BVS_FIREBASE_MANIFEST_JSON') || firebaseBundled;
  const runtime = parseEnvJson('BVS_RUNTIME_CHECK_JSON') || runtimeBundled;

  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60, stale-while-revalidate=120');

  return res.status(200).json({
    ok: true,
    source: 'api/manifests',
    generatedAt: new Date().toISOString(),
    vercel,
    firebase,
    runtime,
  });
}
