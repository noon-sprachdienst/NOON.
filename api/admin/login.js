import { createSessionCookie, readJson, safeEqual, sendJson } from '../_lib/http.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed.' });

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

