/**
 * POST { "password": "plain text" } → { ok, token } (Bearer for /api/portfolio)
 * Requires Upstash Redis on Vercel (Marketplace) → UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN
 * Env: BVS_ADMIN_PASS_HASH_HEX (preferred) or ADMIN_PASS_HASH_HEX — same lowercase SHA-256 hex as
 * ADMIN_PASS_HASH_HEX in BVS_Dashboard_v2_1.html
 */
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { getRedis } from '../lib/redis.js';

function sha256HexUtf8(text) {
  return createHash('sha256').update(text, 'utf8').digest('hex');
}

/** Constant-time compare for hex digests (same length). */
function hexDigestEq(a, b) {
  const x = Buffer.from(String(a).toLowerCase().trim(), 'utf8');
  const y = Buffer.from(String(b).toLowerCase().trim(), 'utf8');
  if (x.length !== y.length) return false;
  return timingSafeEqual(x, y);
}

function getExpectedPassHashHex() {
  const fromEnv =
    process.env.BVS_ADMIN_PASS_HASH_HEX || process.env.ADMIN_PASS_HASH_HEX || '';
  return String(fromEnv).trim();
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const redis = getRedis();
  if (!redis) {
    return res.status(503).json({
      ok: false,
      error:
        'Redis not configured. Vercel → Project → Storage → Create/Link Upstash Redis (REST URL + token env vars).',
    });
  }

  const expected = getExpectedPassHashHex();
  if (!expected) {
    return res.status(503).json({
      ok: false,
      error:
        'Set BVS_ADMIN_PASS_HASH_HEX (or ADMIN_PASS_HASH_HEX) in Vercel → Environment Variables — same hex as ADMIN_PASS_HASH_HEX in BVS_Dashboard_v2_1.html.',
    });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body || '{}');
    } catch {
      return res.status(400).json({ ok: false, error: 'Invalid JSON' });
    }
  }

  const password = body?.password;
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ ok: false, error: 'Missing password' });
  }

  const hex = sha256HexUtf8(password);
  if (!hexDigestEq(hex, expected)) {
    return res.status(401).json({ ok: false, error: 'Invalid password' });
  }

  try {
    const token = randomBytes(32).toString('hex');
    const ttl = 12 * 60 * 60;
    await redis.set(`bvs:sess:${token}`, '1', { ex: ttl });
    return res.status(200).json({ ok: true, token, expiresInSec: ttl });
  } catch (e) {
    console.error('bvs-auth redis', e);
    return res.status(503).json({ ok: false, error: 'Redis write failed' });
  }
}
