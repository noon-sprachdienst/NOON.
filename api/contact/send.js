import nodemailer from 'nodemailer';
import { readFileSync } from 'node:fs';
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
const LOGO_CID = 'noon-email-logo';
const LOGO_CONTENT = readFileSync(new URL('../../public/assets/logo2.png', import.meta.url));
const SIGNATURE_LINES = [
  'NOON. Dolmetscher und Übersetzungsbüro',
  'Alle Sprachen',
  '',
  'Zentrale:',
  'Möserstr. 14',
  '49074 Osnabrück',
  '',
  'Standorte:',
  'Osnabrück · Stuttgart · Berlin · Bielefeld · Mainz · Kiel',
  'Alle Standorte und Adressen: https://www.noon-sprachdienst.de/#branches',
  '',
  'Mobil: +49 160 956 27 666',
  '       +49 155 607 10 320',
  '',
  'info@noon-sprachdienst.de',
  'www.noon-sprachdienst.de',
  '',
  'Landgericht Hannover 316E2-45/24',
  'Geschäftsführer/in: M. Celik  •  M. Elsharkawei',
  '',
  'Es gelten unsere Allgemeinen Geschäftsbedingungen (AGB) sowie unsere Datenschutzerklärung, die Sie auf unserer Website jederzeit einsehen können. Mit der Beauftragung erkennen Sie diese ausdrücklich an.',
];

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
  if (files.length > MAX_FILES) throw new Error('Too many attachments.');

  let totalBytes = 0;
  return files.map((file) => {
    const name = cleanText(file.name, 120);
    const extension = name.slice(name.lastIndexOf('.')).toLowerCase();
    const contentType = cleanText(file.type, 80) || FILE_TYPES_BY_EXTENSION[extension];
    const content = typeof file.content === 'string' ? file.content : '';
    if (!name || !FILE_TYPES_BY_EXTENSION[extension] || !ALLOWED_FILE_TYPES.has(contentType) || !content) {
      throw new Error('Unsupported attachment.');
    }
    const buffer = Buffer.from(content, 'base64');
    totalBytes += buffer.length;
    if (!buffer.length || totalBytes > MAX_TOTAL_FILE_BYTES) throw new Error('Attachments are too large.');
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

    const firstName = cleanText(body.firstName, 80);
    const lastName = cleanText(body.lastName, 80);
    const email = cleanEmail(body.email);
    if (!firstName || !lastName || !email) {
      return sendJson(res, 400, { error: 'Missing required contact details.' });
    }

    const fields = {
      name: `${firstName} ${lastName}`,
      email,
      phone: cleanText(body.phone, 60) || '-',
      service: cleanText(body.service, 40) || '-',
      sourceLanguage: cleanText(body.sourceLanguage, 80) || '-',
      targetLanguage: cleanText(body.targetLanguage, 80) || '-',
      message: cleanText(body.message, 3000) || '-',
      language: cleanText(body.language, 8) || '-',
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
      replyTo: fields.email,
      subject: `Neue Website-Anfrage: ${fields.service}`,
      text: [
        `Name: ${fields.name}`,
        `E-Mail: ${fields.email}`,
        `Telefon / WhatsApp: ${fields.phone}`,
        `Leistung: ${fields.service}`,
        `Ausgangssprache: ${fields.sourceLanguage}`,
        `Zielsprache: ${fields.targetLanguage}`,
        `Website-Sprache: ${fields.language}`,
        '',
        'Nachricht:',
        fields.message,
        '',
        '---',
        ...SIGNATURE_LINES,
      ].join('\n'),
      html: `
        <div style="font-family:Arial,sans-serif;color:#1a1a1a;font-size:14px;line-height:1.55">
          <p><strong>Neue Website-Anfrage</strong></p>
          <p>
            <strong>Name:</strong> ${escapeHtml(fields.name)}<br>
            <strong>E-Mail:</strong> ${escapeHtml(fields.email)}<br>
            <strong>Telefon / WhatsApp:</strong> ${escapeHtml(fields.phone)}<br>
            <strong>Leistung:</strong> ${escapeHtml(fields.service)}<br>
            <strong>Ausgangssprache:</strong> ${escapeHtml(fields.sourceLanguage)}<br>
            <strong>Zielsprache:</strong> ${escapeHtml(fields.targetLanguage)}<br>
            <strong>Website-Sprache:</strong> ${escapeHtml(fields.language)}
          </p>
          <p><strong>Nachricht:</strong><br>${escapeHtml(fields.message).replace(/\n/g, '<br>')}</p>
          <div style="border-top:1px solid #dddddd;margin-top:24px;padding-top:18px;color:#333333;font-size:13px">
            <img src="cid:${LOGO_CID}" alt="NOON." width="120" style="display:block;width:120px;height:auto;margin:0 0 14px">
            <strong>NOON. Dolmetscher und Übersetzungsbüro</strong><br>
            Alle Sprachen<br><br>
            <strong>Zentrale:</strong><br>
            Möserstr. 14<br>
            49074 Osnabrück<br><br>
            <strong>Standorte:</strong><br>
            Osnabrück · Stuttgart · Berlin · Bielefeld · Mainz · Kiel<br>
            <a href="https://www.noon-sprachdienst.de/#branches" style="color:#333333">Alle Standorte und Adressen ansehen</a><br><br>
            <strong>Mobil:</strong> +49 160 956 27 666<br>
            <span style="padding-left:40px">+49 155 607 10 320</span><br><br>
            <a href="mailto:info@noon-sprachdienst.de" style="color:#333333">info@noon-sprachdienst.de</a><br>
            <a href="https://www.noon-sprachdienst.de" style="color:#333333">www.noon-sprachdienst.de</a><br><br>
            Landgericht Hannover 316E2-45/24<br>
            Geschäftsführer/in: M. Celik &nbsp;•&nbsp; M. Elsharkawei<br><br>
            <span style="color:#666666;font-size:12px">Es gelten unsere Allgemeinen Geschäftsbedingungen (AGB) sowie unsere Datenschutzerklärung, die Sie auf unserer Website jederzeit einsehen können. Mit der Beauftragung erkennen Sie diese ausdrücklich an.</span>
          </div>
        </div>
      `,
      attachments: [
        ...attachments,
        {
          filename: 'noon-logo.png',
          content: LOGO_CONTENT,
          contentType: 'image/png',
          cid: LOGO_CID,
          disposition: 'inline',
        },
      ],
    });

    return sendJson(res, 202, { ok: true });
  } catch (error) {
    console.error('contact form error', error.message);
    return sendJson(res, 503, { error: 'Message delivery unavailable.' });
  }
}
