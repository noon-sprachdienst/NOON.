// File uploads shared by the quote form and the application form: the browser uploads straight
// to Firebase Storage with short-lived signed URLs from /api/contact/upload-url, so large files
// never pass through a serverless function (Vercel limits those to 4.5 MB per request).
// The e-mail to the office then contains download links (api/contact/send.js).

// Same limits as the server (api/_lib/storage.js: 10 files, 50 MB each, 100 MB together).
export const STORAGE_LIMITS = { files: 10, perFile: 50 * 1024 * 1024 };

export const UPLOAD_HINT = {
  de: 'PDF, Word oder Bilder | bis zu 10 Dateien | max. 50 MB pro Datei',
  en: 'PDF, Word or images | up to 10 files | max. 50 MB per file',
  ar: 'ملفات PDF أو Word أو صور | حتى 10 ملفات | 50 ميغابايت كحد أقصى لكل ملف',
  tr: 'PDF, Word veya görsel | en fazla 10 dosya | dosya başına en fazla 50 MB',
  ru: 'PDF, Word или изображения | до 10 файлов | до 50 МБ на файл',
  fr: "PDF, Word ou images | jusqu'à 10 fichiers | 50 Mo max. par fichier",
  uk: 'PDF, Word або зображення | до 10 файлів | до 50 МБ на файл',
};

// Uploads the files with signed URLs from /api/contact/upload-url. Returns the stored
// paths, null when storage is not available (the caller then attaches the files to the
// request as before), or throws { status: 413 } when a file is too large.
export async function uploadToStorage(files) {
  const request = () => fetch('/api/contact/upload-url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ files: files.map((file) => ({ name: file.name, type: file.type, size: file.size })) }),
  }).catch(() => null);
  // A cold start or network hiccup can fail the first call: try once more before falling back.
  let response = await request();
  if (!response || response.status === 503) response = await request();
  if (!response || response.status === 404 || response.status === 503) return null;
  if (response.status === 413) throw Object.assign(new Error('Too large'), { status: 413 });
  if (!response.ok) throw new Error('Upload not possible.');
  const { uploads } = await response.json();
  await Promise.all(uploads.map(async (upload, index) => {
    const put = await fetch(upload.url, { method: 'PUT', headers: { 'Content-Type': upload.type }, body: files[index] });
    if (!put.ok) throw new Error('Upload failed.');
  }));
  return uploads.map(({ path, name }) => ({ path, name }));
}
