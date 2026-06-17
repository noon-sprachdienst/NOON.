import nodemailer from 'nodemailer';
import { cleanText, readJson, sendJson } from '../_lib/http.js';

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

export default async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed.' });
  if (!validateOrigin(req)) return sendJson(res, 403, { error: 'Invalid request origin.' });

  try {
    const body = await readJson(req);
    if (cleanText(body.website, 80)) return sendJson(res, 202, { ok: true });
    if (Date.now() - Number(body.startedAt || 0) < 1200) {
      return sendJson(res, 400, { error: 'Please try again.' });
    }

    const service = cleanText(body.service, 40) || '-';
    const isAppointment = service === 'appointment';
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
      sourceLanguage: cleanText(body.sourceLanguage, 80) || '-',
      targetLanguage: cleanText(body.targetLanguage, 80) || '-',
      message: cleanText(body.message, 3000) || '-',
      language: cleanText(body.language, 8) || '-',
      appointmentLocation: cleanText(body.appointmentLocation, 120) || '-',
      appointmentTime: cleanText(body.appointmentTime, 80) || '-',
    };
    const attachments = getAttachments(Array.isArray(body.files) ? body.files : body.file ? [body.file] : []);
    const recipient = process.env.CONTACT_EMAIL || 'info@noon-sprachdienst.de';
    const smtpPort = Number(process.env.SMTP_PORT || 465);

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      throw new Error('SMTP is not configured.');
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: process.env.SMTP_SECURE !== 'false',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    });

    await transporter.sendMail({
      from: `"NOON Website Anfrage" <${process.env.SMTP_USER}>`,
      to: recipient,
      replyTo: email || undefined,
      subject: `Neue Website-Anfrage: ${fields.service}`,
      text: [
        `Name: ${fields.name}`,
        `E-Mail: ${fields.email}`,
        `Telefon / WhatsApp: ${fields.phone}`,
        `Leistung: ${fields.service}`,
        ...(isAppointment ? [
          `Standort: ${fields.appointmentLocation}`,
          `Gewuenschte Uhrzeit: ${fields.appointmentTime}`,
        ] : []),
        `Ausgangssprache: ${fields.sourceLanguage}`,
        `Zielsprache: ${fields.targetLanguage}`,
        `Website-Sprache: ${fields.language}`,
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
            <strong>Leistung:</strong> ${escapeHtml(fields.service)}<br>
            ${isAppointment ? `<strong>Standort:</strong> ${escapeHtml(fields.appointmentLocation)}<br>
            <strong>Gewünschte Uhrzeit:</strong> ${escapeHtml(fields.appointmentTime)}<br>` : ''}
            <strong>Ausgangssprache:</strong> ${escapeHtml(fields.sourceLanguage)}<br>
            <strong>Zielsprache:</strong> ${escapeHtml(fields.targetLanguage)}<br>
            <strong>Website-Sprache:</strong> ${escapeHtml(fields.language)}
          </p>
          <p><strong>Nachricht:</strong><br>${escapeHtml(fields.message).replace(/\n/g, '<br>')}</p>
        </div>
      `,
      attachments,
    });

    return sendJson(res, 202, { ok: true });
  } catch (error) {
    console.error('contact form error', error.message);
    if (error.statusCode === 400) return sendJson(res, 400, { error: error.message });
    if (error.statusCode === 413) return sendJson(res, 413, { error: error.message });
    return sendJson(res, 503, { error: 'Message delivery unavailable.' });
  }
}

