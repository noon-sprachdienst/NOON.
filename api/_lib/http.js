import crypto from 'node:crypto';

const COOKIE_NAME = 'noon_admin_session';
const SESSION_SECONDS = 60 * 60 * 12;

export function sendJson(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return req.body ? JSON.parse(req.body) : {};

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

export function cleanText(value, max = 120) {
  return typeof value === 'string'
    ? value.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, max)
    : '';
}

export function cleanPath(value) {
  const path = cleanText(value, 180);
  return path.startsWith('/') ? path.split('?')[0].split('#')[0] || '/' : '/';
}

export function cleanReferrer(value) {
  const referrer = cleanText(value, 300);
  if (!referrer) return 'direct';
  try {
    return new URL(referrer).hostname.replace(/^www\./, '').slice(0, 100) || 'direct';
  } catch {
    return 'direct';
  }
}

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET;
}

function sign(value) {
  return crypto.createHmac('sha256', getSecret()).update(value).digest('base64url');
}

export function safeEqual(value, expected) {
  if (!value || !expected) return false;
  const left = Buffer.from(String(value));
  const right = Buffer.from(String(expected));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

export function createSessionCookie() {
  if (!getSecret()) throw new Error('Admin session secret is not configured.');
  const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const payload = Buffer.from(JSON.stringify({ expires })).toString('base64url');
  return `${COOKIE_NAME}=${payload}.${sign(payload)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_SECONDS}`;
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

export function isAdminRequest(req) {
  if (!getSecret()) return false;
  const cookies = Object.fromEntries(
    (req.headers.cookie || '')
      .split(';')
      .map((part) => part.trim().split('='))
      .filter(([key, value]) => key && value)
  );
  const token = cookies[COOKIE_NAME];
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature || !safeEqual(signature, sign(payload))) return false;
  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')).expires > Date.now() / 1000;
  } catch {
    return false;
  }
}
