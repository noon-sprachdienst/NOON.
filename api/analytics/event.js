import { Timestamp } from 'firebase-admin/firestore';
import { getDatabase } from '../_lib/firebase.js';
import { cleanPath, cleanReferrer, cleanText, readJson, sendJson } from '../_lib/http.js';
import { getClientIp, rateLimit } from '../_lib/rateLimit.js';

const ALLOWED_EVENTS = new Set(['page_view', 'page_leave', 'cta_click', 'consent_withdrawn']);
const ALLOWED_DEVICES = new Set(['desktop', 'tablet', 'mobile']);

export default async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed.' });

  const limit = rateLimit(`event:${getClientIp(req)}`, { limit: 120, windowMs: 60 * 1000 });
  if (!limit.allowed) {
    res.setHeader('Retry-After', String(limit.retryAfter));
    return sendJson(res, 429, { error: 'Too many requests.' });
  }

  const origin = req.headers.origin;
  if (origin) {
    try {
      if (new URL(origin).host !== req.headers.host) {
        return sendJson(res, 403, { error: 'Cross-origin analytics events are not accepted.' });
      }
    } catch {
      return sendJson(res, 403, { error: 'Invalid event origin.' });
    }
  }

  try {
    const body = await readJson(req);
    const type = cleanText(body.type, 32);
    if (!ALLOWED_EVENTS.has(type)) return sendJson(res, 400, { error: 'Unsupported event.' });

    const now = Date.now();
    const record = {
      type,
      createdAt: now,
      ts: now,
      expireAt: Timestamp.fromMillis(now + 90 * 24 * 60 * 60 * 1000),
      sessionId: cleanText(body.sessionId, 64),
      path: cleanPath(body.path),
      referrer: cleanReferrer(body.referrer),
      siteLanguage: cleanText(body.siteLanguage, 8),
      browserLanguage: cleanText(body.browserLanguage, 16),
      device: ALLOWED_DEVICES.has(body.device) ? body.device : 'desktop',
      browser: cleanText(body.browser, 32),
      os: cleanText(body.os, 32),
      country: cleanText(req.headers['x-vercel-ip-country'], 2) || 'XX',
      city: cleanText(req.headers['x-vercel-ip-city'], 80),
      durationSeconds: Math.max(0, Math.min(Number(body.durationSeconds) || 0, 86400)),
      action: cleanText(body.action, 48),
      campaign: cleanText(body.campaign, 80),
    };

    if (!record.sessionId) return sendJson(res, 400, { error: 'Missing anonymous session.' });

    await getDatabase().collection('analyticsEvents').add(record);
    return sendJson(res, 202, { ok: true });
  } catch (error) {
    console.error('analytics event error', error);
    return sendJson(res, 503, { error: 'Analytics service unavailable.' });
  }
}
