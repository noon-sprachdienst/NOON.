import { isAdminRequest, sendJson } from '../_lib/http.js';

export default function handler(req, res) {
  if (req.method !== 'GET') return sendJson(res, 405, { error: 'Method not allowed.' });
  return sendJson(res, 200, {
    authenticated: isAdminRequest(req),
    firebaseConfigured: Boolean(
      process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY
    ),
  });
}

