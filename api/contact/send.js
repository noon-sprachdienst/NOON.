import nodemailer from 'nodemailer';
import { cleanMultiline, cleanText, readJson, sendJson } from '../_lib/http.js';
import { getClientIp, rateLimit } from '../_lib/rateLimit.js';
import { getBucket, isUploadPath, MAX_TOTAL_BYTES, MAX_UPLOAD_FILES, signPath, storageConfigured } from '../_lib/storage.js';
import { getStore, publishedFormConfig, REQUESTS } from '../_lib/cmsStore.js';
import { deliveryOf, isFileAllowed, SITE_LANGS, textIn } from '../../src/data/formSchema.js';

// German service names for the office e-mail when no settings are published.
const SERVICE_NAMES = { translation: 'Übersetzung', interpreting: 'Dolmetschen', appointment: 'Termin', application: 'Bewerbung' };
// Services of the quote form. Only these use the after-sending settings of the CMS; the
// application and appointment forms keep their standard recipient, subject and no auto-reply.
const QUOTE_SERVICES = ['translation', 'interpreting'];
// German date for custom date fields (the browser sends 2026-12-01).
const germanDate = (value) => (/^\d{4}-\d{2}-\d{2}$/.test(value) ? value.split('-').reverse().join('.') : value);
const DEFAULT_SUBJECT = 'Neue Website-Anfrage: {service}';
const DEFAULT_SENDER = 'NOON Website Anfrage';
const DAY = 24 * 60 * 60 * 1000;

const ALLOWED_FILE_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
]);
const FILE_TYPES_BY_EXTENSION = {
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.heic': 'image/heic',
};
const MAX_FILES = 6;
// Vercel accepts request bodies up to 4.5 MB and base64 adds a third: 3 MB of files fit.
const MAX_TOTAL_FILE_BYTES = 3 * 1024 * 1024;
function validateOrigin(req) {
  if (!req.headers.origin) return true;
  try {
    return new URL(req.headers.origin).host === req.headers.host;
  } catch {
    return false;
  }
}

function cleanEmail(value) {
  const email = cleanText(value, 160);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : '';
}

function cleanUrl(value) {
  const url = cleanText(value, 500);
  return /^https?:\/\/\S+$/i.test(url) ? url : '';
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getAttachments(files) {
  if (!files?.length) return [];
  if (files.length > MAX_FILES) {
    const error = new Error('Too many attachments.');
    error.statusCode = 400;
    throw error;
  }

  let totalBytes = 0;
  return files.map((file) => {
    const name = cleanText(file.name, 120);
    const extension = name.slice(name.lastIndexOf('.')).toLowerCase();
    const contentType = cleanText(file.type, 80) || FILE_TYPES_BY_EXTENSION[extension];
    const content = typeof file.content === 'string' ? file.content : '';
    if (!name || !FILE_TYPES_BY_EXTENSION[extension] || !ALLOWED_FILE_TYPES.has(contentType) || !content) {
      const error = new Error('Unsupported attachment.');
      error.statusCode = 400;
      error.code = 'file-type';
      throw error;
    }
    const buffer = Buffer.from(content, 'base64');
    totalBytes += buffer.length;
    if (!buffer.length || totalBytes > MAX_TOTAL_FILE_BYTES) {
      const error = new Error('Attachments are too large.');
      error.statusCode = 413;
      throw error;
    }
    return { filename: name, content: buffer, contentType };
  });
}

// Files uploaded to Firebase Storage by the browser: the e-mail gets a download link for
// each file and, while they stay small, the files themselves as attachments.
const MAX_ATTACH_FROM_STORAGE = 10 * 1024 * 1024;

async function getStoredUploads(uploads, siteUrl) {
  if (!Array.isArray(uploads) || !uploads.length) return { links: [], attachments: [] };
  if (!storageConfigured()) throw Object.assign(new Error('Uploads unavailable.'), { statusCode: 400 });
  if (uploads.length > MAX_UPLOAD_FILES) throw Object.assign(new Error('Too many attachments.'), { statusCode: 400 });
  const bucket = getBucket();
  const files = await Promise.all(uploads.map(async (upload) => {
    const path = cleanText(upload?.path, 220);
    if (!isUploadPath(path)) throw Object.assign(new Error('Unsupported attachment.'), { statusCode: 400 });
    const file = bucket.file(path);
    const [metadata] = await file.getMetadata().catch(() => [null]);
    if (!metadata) throw Object.assign(new Error('Attachment missing.'), { statusCode: 400 });
    return { file, path, size: Number(metadata.size) || 0, type: metadata.contentType, name: cleanText(upload?.name, 120) || path.split('/').pop() };
  }));
  const total = files.reduce((sum, f) => sum + f.size, 0);
  if (total > MAX_TOTAL_BYTES) throw Object.assign(new Error('Attachments are too large.'), { statusCode: 413 });
  const links = files.map((f) => ({ name: f.name, size: f.size, url: `${siteUrl}/api/contact/file?p=${encodeURIComponent(f.path)}&s=${signPath(f.path)}` }));
  const attachments = total <= MAX_ATTACH_FROM_STORAGE
    ? await Promise.all(files.map(async (f) => ({ filename: f.name, content: (await f.file.download())[0], contentType: f.type })))
    : [];
  return { links, attachments };
}

// Fields the admin added to the form. Only ids found in the published settings are accepted,
// and the e-mail shows them with their German label.
function customFields(values, config) {
  if (!values || typeof values !== 'object' || !config) return [];
  return config.fields
    .filter((field) => !field.builtin && !field.hidden && Object.prototype.hasOwnProperty.call(values, field.id))
    .map((field) => {
      const raw = values[field.id];
      const text = typeof raw === 'string' ? raw : '';
      let value = field.type === 'textarea' ? cleanMultiline(text, 2000) : cleanText(text, 500);
      if (field.type === 'date') value = germanDate(value);
      if (field.type === 'checkbox') value = value ? 'Ja' : 'Nein';
      if (field.type === 'select') value = textIn(field.options?.find((option) => option.id === value)?.label, 'de');
      return { label: textIn(field.label, 'de') || field.id, value };
    })
    .filter((field) => field.value);
}

// Requests page of the admin: only date, name, service and file links, deleted after the
// number of days set in the admin (7, 14 or 30).
function saveRequest({ name, service, links, driveLink, attached, keepDays }) {
  const now = Date.now();
  return getStore().add(REQUESTS, {
    createdAt: now,
    expireAt: new Date(now + keepDays * DAY),
    name,
    service,
    files: [...links.map((link) => ({ name: link.name, size: link.size, url: link.url })), ...(driveLink ? [{ name: 'Google Drive', size: 0, url: driveLink }] : [])],
    attached,
    status: 'new',
  });
}

// Old entries are removed on every new request as well as whenever the Requests page is
// opened, so the promised period holds even if nobody opens the admin for a while.
async function removeExpiredRequests(keepDays) {
  const store = getStore();
  const cutoff = Date.now() - keepDays * DAY;
  const expired = await store.list(REQUESTS, { where: ['createdAt', '<', cutoff], limit: 100 });
  if (expired.length) await store.deleteMany(REQUESTS, expired.map((entry) => entry.id));
}

const formatMb = (bytes) => `${(bytes / (1024 * 1024)).toFixed(1).replace('.', ',')} MB`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed.' });
  if (!validateOrigin(req)) return sendJson(res, 403, { error: 'Invalid request origin.' });

  // Ten requests per address in ten minutes: real customers never get near it, but it stops
  // the form (and its auto-reply) from being used to send mass mail.
  const limited = rateLimit(`send:${getClientIp(req)}`, { limit: 10, windowMs: 10 * 60 * 1000 });
  if (!limited.allowed) return sendJson(res, 429, { error: 'Too many requests. Please try again later.' });

  let fromHeader = '(not built yet)';
  try {
    const body = await readJson(req);
    if (cleanText(body.website, 80)) return sendJson(res, 202, { ok: true });
    if (Date.now() - Number(body.startedAt || 0) < 1200) {
      return sendJson(res, 400, { error: 'Please try again.' });
    }

    const service = cleanText(body.service, 40) || '-';
    const isAppointment = service === 'appointment';
    const isQuote = QUOTE_SERVICES.includes(service);
    const firstName = cleanText(body.firstName, 80);
    const lastName = cleanText(body.lastName, 80);
    const fullName = cleanText(body.name, 160) || `${firstName} ${lastName}`.trim();
    const email = cleanEmail(body.email);
    const phone = cleanText(body.phone, 60);
    if (isAppointment) {
      if (!fullName || !phone) return sendJson(res, 400, { error: 'Missing required appointment details.' });
    } else if (!firstName || !lastName || !email) {
      return sendJson(res, 400, { error: 'Missing required contact details.' });
    }

    const fields = {
      name: fullName,
      email: email || '-',
      phone: phone || '-',
      service,
      // Applications send all offered languages here, so allow a longer list.
      sourceLanguage: cleanText(body.sourceLanguage, 400) || '-',
      targetLanguage: cleanText(body.targetLanguage, 80) || '-',
      message: cleanMultiline(body.message, 3000) || '-',
      driveLink: cleanUrl(body.driveLink),
      language: cleanText(body.language, 8) || '-',
      appointmentLocation: cleanText(body.appointmentLocation, 120) || '-',
      appointmentTime: cleanText(body.appointmentTime, 80) || '-',
    };
    // What happens after sending is set by the client in the admin (Settings tab).
    const config = await publishedFormConfig();
    const delivery = deliveryOf(config);
    const serviceOption = config?.fields?.find((field) => field.type === 'service')?.options?.find((option) => option.id === service);
    const serviceName = textIn(serviceOption?.label, 'de') || SERVICE_NAMES[service] || service;
    const siteUrl = process.env.SITE_URL || `https://${req.headers.host}`;
    const stored = await getStoredUploads(body.uploads, siteUrl);
    const inlineFiles = getAttachments(Array.isArray(body.files) ? body.files : body.file ? [body.file] : []);
    // Attached files (used when storage is unavailable) follow the CMS file types as well.
    if (isQuote && inlineFiles.some((file) => !isFileAllowed(config, file.filename))) {
      return sendJson(res, 400, { error: 'File type not allowed.', code: 'file-type' });
    }
    const attachments = [...inlineFiles, ...stored.attachments];
    const extra = customFields(body.custom, config);
    // Saved in parallel with the e-mail and never blocks it; if the e-mail fails the request is still listed.
    const saving = Promise.all([
      saveRequest({ name: fields.name, service, links: stored.links, driveLink: fields.driveLink, attached: inlineFiles.length, keepDays: delivery.keepDays })
        .catch((error) => console.error('request save error', error.message)),
      removeExpiredRequests(delivery.keepDays).catch((error) => console.error('request cleanup error', error.message)),
    ]);
    const fileLinksText = stored.links.length
      ? ['', 'Dateien (Download-Link, 30 Tage verfügbar):', ...stored.links.map((l) => `- ${l.name} (${formatMb(l.size)}): ${l.url}`)]
      : [];
    const fileLinksHtml = stored.links.length
      ? `<p><strong>Dateien</strong> (Download-Link, 30 Tage verfügbar):<br>${stored.links.map((l) => `<a href="${escapeHtml(l.url)}">${escapeHtml(l.name)}</a> (${formatMb(l.size)})`).join('<br>')}</p>`
      : '';
    // Standard addresses come from the server; the admin can set other ones per service.
    const standardRecipient = service === 'translation'
      ? (process.env.CONTACT_EMAIL_TRANSLATION || 'uebersetzung@noon-sprachdienst.de')
      : (process.env.CONTACT_EMAIL || 'info@noon-sprachdienst.de');
    const recipients = isQuote && delivery.to?.[service]?.length ? delivery.to[service] : [standardRecipient];
    const recipient = recipients.join(', ');
    const subject = ((isQuote && delivery.subject) || DEFAULT_SUBJECT).replaceAll('{service}', serviceName).replaceAll('{name}', fields.name).replace(/\s+/g, ' ').trim();
    const smtpPort = Number(process.env.SMTP_PORT || 465);

    // SMTP_DEV_LOG=1 is set only by the local dev server (scripts/dev-api.mjs): print instead of sending.
    const devLog = process.env.SMTP_DEV_LOG === '1';
    if (!devLog && (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD)) {
      await saving;
      throw new Error('SMTP is not configured.');
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: process.env.SMTP_SECURE !== 'false',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    });

    const fromAddress = (process.env.SMTP_FROM || process.env.SMTP_USER || '').trim();
    fromHeader = `"${(isQuote && delivery.senderName) || DEFAULT_SENDER}" <${fromAddress}>`;
    const mail = {
      from: fromHeader,
      to: recipient,
      cc: isQuote && delivery.cc.length ? delivery.cc.join(', ') : undefined,
      replyTo: email || undefined,
      subject,
      text: [
        `Name: ${fields.name}`,
        `E-Mail: ${fields.email}`,
        `Telefon / WhatsApp: ${fields.phone}`,
        `Leistung: ${serviceName}`,
        ...(isAppointment ? [
          `Standort: ${fields.appointmentLocation}`,
          `Gewuenschte Uhrzeit: ${fields.appointmentTime}`,
        ] : []),
        ...(service === 'application'
          ? [`Angebotene Sprachen: ${fields.sourceLanguage}`]
          : [`Ausgangssprache: ${fields.sourceLanguage}`, `Zielsprache: ${fields.targetLanguage}`]),
        `Website-Sprache: ${fields.language}`,
        ...extra.map((field) => `${field.label}: ${field.value}`),
        ...(fields.driveLink ? [`Datei-Link (Google Drive): ${fields.driveLink}`] : []),
        ...fileLinksText,
        '',
        'Nachricht:',
        fields.message,
      ].join('\n'),
      html: `
        <div style="font-family:Arial,sans-serif;color:#1a1a1a;font-size:14px;line-height:1.55">
          <p><strong>Neue Website-Anfrage</strong></p>
          <p>
            <strong>Name:</strong> ${escapeHtml(fields.name)}<br>
            <strong>E-Mail:</strong> ${escapeHtml(fields.email)}<br>
            <strong>Telefon / WhatsApp:</strong> ${escapeHtml(fields.phone)}<br>
            <strong>Leistung:</strong> ${escapeHtml(serviceName)}<br>
            ${isAppointment ? `<strong>Standort:</strong> ${escapeHtml(fields.appointmentLocation)}<br>
            <strong>Gewünschte Uhrzeit:</strong> ${escapeHtml(fields.appointmentTime)}<br>` : ''}
            ${service === 'application'
              ? `<strong>Angebotene Sprachen:</strong> ${escapeHtml(fields.sourceLanguage)}<br>`
              : `<strong>Ausgangssprache:</strong> ${escapeHtml(fields.sourceLanguage)}<br>
            <strong>Zielsprache:</strong> ${escapeHtml(fields.targetLanguage)}<br>`}
            <strong>Website-Sprache:</strong> ${escapeHtml(fields.language)}${extra.map((field) => `<br>
            <strong>${escapeHtml(field.label)}:</strong> ${escapeHtml(field.value).replace(/\n/g, '<br>')}`).join('')}${fields.driveLink ? `<br>
            <strong>Datei-Link (Google Drive):</strong> <a href="${escapeHtml(fields.driveLink)}">${escapeHtml(fields.driveLink)}</a>` : ''}
          </p>
          ${fileLinksHtml}
          <p><strong>Nachricht:</strong><br>${escapeHtml(fields.message).replace(/\n/g, '<br>')}</p>
        </div>
      `,
      attachments,
    };
    if (devLog) console.log(`[dev] e-mail to ${recipient}${mail.cc ? ` cc ${mail.cc}` : ''} from ${fromHeader}\nSubject: ${subject}\n${mail.text}`);
    else await transporter.sendMail(mail);

    // Optional confirmation to the customer, in the language of the page. It contains only the
    // texts set in the admin (nothing the visitor typed), so the form cannot carry spam to others.
    if (isQuote && delivery.autoReply.enabled && email) {
      const lang = SITE_LANGS.includes(fields.language) ? fields.language : 'de';
      const phoneLabel = config?.confirmation?.phone || '+49 160 956 27 666';
      const replySubject = textIn(delivery.autoReply.subject, lang) || textIn(config?.confirmation?.title, lang) || 'Noon';
      const replyText = (textIn(delivery.autoReply.text, lang) || textIn(config?.confirmation?.text, lang)).replaceAll('{phone}', phoneLabel);
      const reply = { from: fromHeader, to: email, replyTo: recipients[0], subject: replySubject, text: replyText };
      try {
        if (devLog) console.log(`[dev] auto-reply to ${email}\nSubject: ${replySubject}\n${replyText}`);
        else await transporter.sendMail(reply);
      } catch (error) {
        // The office already has the request; a failed confirmation must not report an error to the visitor.
        console.error('auto-reply error', error.message);
      }
    }
    await saving;

    return sendJson(res, 202, { ok: true });
  } catch (error) {
    console.error('contact form error', error.message, 'fromHeader:', JSON.stringify(fromHeader));
    if (error.statusCode === 400) return sendJson(res, 400, { error: error.message, ...(error.code ? { code: error.code } : {}) });
    if (error.statusCode === 413) return sendJson(res, 413, { error: error.message });
    return sendJson(res, 503, { error: 'Message delivery unavailable.' });
  }
}

