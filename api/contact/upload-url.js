import { readJson, sendJson } from '../_lib/http.js';
import { getClientIp, rateLimit } from '../_lib/rateLimit.js';
import {
  getBucket, MAX_FILE_BYTES, MAX_TOTAL_BYTES, MAX_UPLOAD_FILES, newUploadPath, storageConfigured,
} from '../_lib/storage.js';

// Returns short-lived signed URLs so the browser can upload documents straight to
// Firebase Storage. Large files therefore never pass through this function, which
// Vercel limits to 4.5 MB per request.
const ALLOWED_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif',
]);
const EXTENSION_TYPES = {
  '.pdf': 'application/pdf', '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp',
  '.heic': 'image/heic', '.heif': 'image/heif',
};

function validateOrigin(req) {
  if (!req.headers.origin) return true;
  try {
    return new URL(req.headers.origin).host === req.headers.host;
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed.' });
  if (!validateOrigin(req)) return sendJson(res, 403, { error: 'Invalid request origin.' });
  if (!storageConfigured()) return sendJson(res, 503, { error: 'Uploads unavailable.' });

  const limited = rateLimit(`upload:${getClientIp(req)}`, { limit: 30, windowMs: 10 * 60 * 1000 });
  if (!limited.allowed) return sendJson(res, 429, { error: 'Too many uploads.' });

  try {
    const body = await readJson(req);
    const files = Array.isArray(body.files) ? body.files : [];
    if (!files.length || files.length > MAX_UPLOAD_FILES) return sendJson(res, 400, { error: 'Invalid number of files.' });

    let total = 0;
    const checked = files.map((file) => {
      const name = String(file?.name || '');
      const extension = name.slice(name.lastIndexOf('.')).toLowerCase();
      const type = String(file?.type || '') || EXTENSION_TYPES[extension];
      const size = Number(file?.size);
      if (!EXTENSION_TYPES[extension] || !ALLOWED_TYPES.has(type)) throw Object.assign(new Error('Unsupported file type.'), { statusCode: 400 });
      if (!Number.isFinite(size) || size <= 0 || size > MAX_FILE_BYTES) throw Object.assign(new Error('File too large.'), { statusCode: 413 });
      total += size;
      if (total > MAX_TOTAL_BYTES) throw Object.assign(new Error('Files too large.'), { statusCode: 413 });
      return { name, type };
    });

    const bucket = getBucket();
    const expires = Date.now() + 15 * 60 * 1000;
    const uploads = await Promise.all(checked.map(async ({ name, type }) => {
      const path = newUploadPath(name);
      const [url] = await bucket.file(path).getSignedUrl({ version: 'v4', action: 'write', expires, contentType: type });
      return { path, url, type, name };
    }));
    return sendJson(res, 200, { uploads });
  } catch (error) {
    if (error.statusCode) return sendJson(res, error.statusCode, { error: error.message });
    console.error('upload-url error', error.message);
    return sendJson(res, 503, { error: 'Uploads unavailable.' });
  }
}
