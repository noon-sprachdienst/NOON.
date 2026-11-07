import { createSessionCookie, readJson, safeEqual, sendJson } from '../_lib/http.js';
import { getClientIp, rateLimit } from '../_lib/rateLimit.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed.' });

  const limit = rateLimit(`login:${getClientIp(req)}`, { limit: 10, windowMs: 15 * 60 * 1000 });
  if (!limit.allowed) {
    res.setHeader('Retry-After', String(limit.retryAfter));
    return sendJson(res, 429, { error: 'Too many attempts. Please try again later.' });
  }

  try {
    const { password } = await readJson(req);
    if (!safeEqual(password, process.env.ADMIN_PASSWORD)) {
      return sendJson(res, 401, { error: 'Invalid credentials.' });
    }
    res.setHeader('Set-Cookie', createSessionCookie());
    return sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error('admin login error', error);
    return sendJson(res, 503, { error: 'Admin login is not configured.' });
  }
}

