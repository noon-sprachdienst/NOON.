import crypto from 'node:crypto';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';

// Uploaded customer documents live in Firebase Storage under uploads/<date>/<id>/<name>.
// The bucket deletes them after 30 days (lifecycle rule), they are never public:
// the browser uploads with a short-lived signed URL and the office downloads through
// /api/contact/file, which checks an HMAC before issuing a short-lived read URL.

export const UPLOAD_PREFIX = 'uploads/';
export const MAX_FILE_BYTES = 50 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 100 * 1024 * 1024;
export const MAX_UPLOAD_FILES = 10;
const PATH_PATTERN = /^uploads\/\d{4}-\d{2}-\d{2}\/[0-9a-f-]{36}\/[A-Za-z0-9._-]{1,120}$/;

export function storageConfigured() {
  return Boolean(process.env.FIREBASE_STORAGE_BUCKET && process.env.FIREBASE_PROJECT_ID
    && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY);
}

export function getBucket() {
  if (!storageConfigured()) throw new Error('Firebase Storage is not configured.');
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
  }
  return getStorage().bucket(process.env.FIREBASE_STORAGE_BUCKET);
}

export function safeFileName(name) {
  const clean = String(name || 'datei')
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Za-z0-9._-]+/g, '_').replace(/_+/g, '_').replace(/^[._]+/, '');
  return (clean || 'datei').slice(-120);
}

export function newUploadPath(name) {
  const day = new Date().toISOString().slice(0, 10);
  return `${UPLOAD_PREFIX}${day}/${crypto.randomUUID()}/${safeFileName(name)}`;
}

export function isUploadPath(path) {
  return typeof path === 'string' && PATH_PATTERN.test(path);
}

function linkSecret() {
  return process.env.UPLOAD_LINK_SECRET || process.env.ADMIN_SESSION_SECRET || process.env.FIREBASE_PRIVATE_KEY;
}

export function signPath(path) {
  return crypto.createHmac('sha256', linkSecret()).update(path).digest('hex').slice(0, 32);
}

export function verifyPath(path, signature) {
  if (!isUploadPath(path) || typeof signature !== 'string' || signature.length !== 32) return false;
  const expected = signPath(path);
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}
