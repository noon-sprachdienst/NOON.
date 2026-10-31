import crypto from 'node:crypto';

// Access token for Google APIs from the same service account the site already
// uses for Firebase (FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY), signed as a
// JWT so no extra package is needed. Tokens are cached until shortly before expiry.
const tokens = new Map();

export function serviceAccountEmail() {
  return process.env.FIREBASE_CLIENT_EMAIL || '';
}

export async function getAccessToken(scope) {
  const cached = tokens.get(scope);
  if (cached && cached.expires > Date.now() + 60_000) return cached.token;

  const clientEmail = serviceAccountEmail();
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (!clientEmail || !privateKey) throw Object.assign(new Error('Service account is not configured.'), { code: 'not_configured' });

  const now = Math.floor(Date.now() / 1000);
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
  const unsigned = `${encode({ alg: 'RS256', typ: 'JWT' })}.${encode({
    iss: clientEmail, scope, aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600,
  })}`;
  const signature = crypto.createSign('RSA-SHA256').update(unsigned).sign(privateKey, 'base64url');

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${signature}`,
    }),
  });
  const data = await response.json();
  if (!response.ok) throw Object.assign(new Error(data.error_description || 'Token request failed.'), { code: 'token_failed' });

  tokens.set(scope, { token: data.access_token, expires: Date.now() + data.expires_in * 1000 });
  return data.access_token;
}
