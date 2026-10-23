import { getBucket, storageConfigured, verifyPath } from '../_lib/storage.js';

// Download link used in the request e-mails: checks the HMAC signature and redirects
// to a read URL that is valid for 10 minutes. Files are deleted after 30 days.
function page(res, status, text) {
  res.status(status).setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex');
  res.end(`<!doctype html><meta charset="utf-8"><title>Noon – Datei</title><p style="font-family:Arial,sans-serif;padding:24px">${text}</p>`);
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return page(res, 405, 'Methode nicht erlaubt.');
  const url = new URL(req.url, 'https://www.noon-sprachdienst.de');
  const path = url.searchParams.get('p') || '';
  const signature = url.searchParams.get('s') || '';
  if (!storageConfigured() || !verifyPath(path, signature)) return page(res, 403, 'Ungültiger Link.');

  try {
    const file = getBucket().file(path);
    const [exists] = await file.exists();
    if (!exists) return page(res, 410, 'Die Datei ist nicht mehr verfügbar. Hochgeladene Dateien werden nach 30 Tagen automatisch gelöscht.');
    const name = path.split('/').pop();
    const [signed] = await file.getSignedUrl({
      version: 'v4', action: 'read', expires: Date.now() + 10 * 60 * 1000,
      responseDisposition: `attachment; filename="${name}"`,
    });
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Robots-Tag', 'noindex');
    res.writeHead(302, { Location: signed });
    return res.end();
  } catch (error) {
    console.error('file link error', error.message);
    return page(res, 503, 'Die Datei kann gerade nicht geladen werden. Bitte später erneut versuchen.');
  }
}
