/**
 * GET  — load saved portfolio (Bearer session from /api/bvs-auth)
 * POST — save portfolio JSON body
 */
import { getRedis } from '../lib/redis.js';

const REDIS_KEY = 'bvs:portfolio:v1';

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();

  const redis = getRedis();
  if (!redis) {
    return res.status(503).json({
      ok: false,
      error: 'Redis not configured (Upstash REST URL + token).',
    });
  }

  const auth = req.headers.authorization || '';
  const m = auth.match(/^Bearer\s+(.+)$/i);
  const token = m ? m[1].trim() : '';
  if (!token) {
    return res.status(401).json({ ok: false, error: 'Missing Authorization Bearer token' });
  }

  try {
    const valid = await redis.get(`bvs:sess:${token}`);
    if (!valid) {
      return res.status(401).json({ ok: false, error: 'Invalid or expired session — sign in again' });
    }
  } catch (e) {
    console.error('portfolio session', e);
    return res.status(503).json({ ok: false, error: 'Redis read failed' });
  }

  if (req.method === 'GET') {
    try {
      const raw = await redis.get(REDIS_KEY);
      let data = null;
      if (raw != null) data = typeof raw === 'string' ? JSON.parse(raw) : raw;
      return res.status(200).json({ ok: true, data });
    } catch (e) {
      console.error('portfolio get', e);
      return res.status(500).json({ ok: false, error: 'Read failed' });
    }
  }

  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body || 'null');
      } catch {
        return res.status(400).json({ ok: false, error: 'Invalid JSON body' });
      }
    }
    if (!body || typeof body !== 'object') {
      return res.status(400).json({ ok: false, error: 'Expected JSON object' });
    }
    try {
      await redis.set(REDIS_KEY, JSON.stringify(body));
      return res.status(200).json({ ok: true, savedAt: body.savedAt || null });
    } catch (e) {
      console.error('portfolio set', e);
      return res.status(500).json({ ok: false, error: 'Write failed' });
    }
  }

  res.setHeader('Allow', 'GET, POST, OPTIONS');
  return res.status(405).json({ ok: false, error: 'Method not allowed' });
}
