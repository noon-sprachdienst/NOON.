import { useState } from 'react';
import { useI18n } from '../hooks/useI18n';
import { trackEvent } from '../lib/analytics';
import { CONTACT } from '../config/contact.js';

const STEPS = [
  { num: '01', label: 'how.step1.label', desc: 'how.step1.desc' },
  { num: '02', label: 'how.step2.label', desc: 'how.step2.desc' },
  { num: '03', label: 'how.step3.label', desc: 'how.step3.desc' },
  { num: '04', label: 'how.step4.label', desc: 'how.step4.desc' },
  { num: '05', label: 'how.step5.label', desc: 'how.step5.desc' },
];

const FORM_STATUS = {
  de: { sending: 'Wird gesendet ...', sent: 'Anfrage gesendet', error: 'Senden fehlgeschlagen. Bitte versuchen Sie es erneut.' },
  en: { sending: 'Sending ...', sent: 'Request sent', error: 'Could not send. Please try again.' },
  ar: { sending: 'جارٍ الإرسال ...', sent: 'تم إرسال الطلب', error: 'تعذر الإرسال. يرجى المحاولة مرة أخرى.' },
  tr: { sending: 'Gönderiliyor ...', sent: 'Talep gönderildi', error: 'Gönderilemedi. Lütfen tekrar deneyin.' },
  ru: { sending: 'Отправка ...', sent: 'Запрос отправлен', error: 'Не удалось отправить. Попробуйте еще раз.' },
  fr: { sending: 'Envoi ...', sent: 'Demande envoyée', error: 'Envoi impossible. Veuillez réessayer.' },
  uk: { sending: 'Надсилання ...', sent: 'Запит надіслано', error: 'Не вдалося надіслати. Спробуйте ще раз.' },
};

const FORM_UPLOAD_HINT = {
  de: 'PDF, Word oder Bilder | bis zu 6 Dateien | insgesamt max. 3 MB',
  en: 'PDF, Word or images | up to 6 files | 3 MB total',
  ar: '\u0645\u0644\u0641\u0627\u062a PDF \u0623\u0648 Word \u0623\u0648 \u0635\u0648\u0631 | \u062d\u062a\u0649 6 \u0645\u0644\u0641\u0627\u062a | 3 \u0645\u064a\u063a\u0627\u0628\u0627\u064a\u062a \u0625\u062c\u0645\u0627\u0644\u0627',
  tr: 'PDF, Word veya gorsel | en fazla 6 dosya | toplam 3 MB',
  ru: 'PDF, Word \u0438\u043b\u0438 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f | \u0434\u043e 6 \u0444\u0430\u0439\u043b\u043e\u0432 | \u0432\u0441\u0435\u0433\u043e 3 \u041c\u0411',
  fr: "PDF, Word ou images | jusqu'a 6 fichiers | 3 Mo au total",
  uk: 'PDF, Word \u0430\u0431\u043e \u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u043d\u044f | \u0434\u043e 6 \u0444\u0430\u0439\u043b\u0456\u0432 | \u0437\u0430\u0433\u0430\u043b\u043e\u043c 3 \u041c\u0411',
};

const FORM_UPLOAD_ERROR = {
  de: {
    size: 'Die ausgewählten Dateien sind größer als 3 MB.',
    count: 'Bitte wählen Sie höchstens 6 Dateien aus.',
    mail: 'Für größere Anhänge senden Sie uns bitte direkt eine E-Mail.',
    action: 'Per E-Mail senden',
  },
  en: {
    size: 'The selected files exceed the 3 MB limit.',
    count: 'Please select no more than 6 files.',
    mail: 'For larger attachments, please send us an email directly.',
    action: 'Send by email',
  },
  ar: {
    size: '\u062d\u062c\u0645 \u0627\u0644\u0645\u0644\u0641\u0627\u062a \u0627\u0644\u0645\u062e\u062a\u0627\u0631\u0629 \u064a\u062a\u062c\u0627\u0648\u0632 \u0627\u0644\u062d\u062f \u0627\u0644\u0645\u0633\u0645\u0648\u062d \u0648\u0647\u0648 3 \u0645\u064a\u063a\u0627\u0628\u0627\u064a\u062a.',
    count: '\u064a\u0631\u062c\u0649 \u0627\u062e\u062a\u064a\u0627\u0631 6 \u0645\u0644\u0641\u0627\u062a \u0643\u062d\u062f \u0623\u0642\u0635\u0649.',
    mail: '\u0644\u0625\u0631\u0633\u0627\u0644 \u0645\u0644\u0641\u0627\u062a \u0623\u0643\u0628\u0631\u060c \u064a\u0631\u062c\u0649 \u0645\u0631\u0627\u0633\u0644\u062a\u0646\u0627 \u0645\u0628\u0627\u0634\u0631\u0629 \u0639\u0628\u0631 \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a.',
    action: '\u0625\u0631\u0633\u0627\u0644 \u0639\u0628\u0631 \u0627\u0644\u0628\u0631\u064a\u062f',
  },
  tr: {
    size: 'Secilen dosyalar 3 MB sinirini asiyor.',
    count: 'Lutfen en fazla 6 dosya secin.',
    mail: 'Daha buyuk ekler icin bize dogrudan e-posta gonderin.',
    action: 'E-posta ile gonder',
  },
  ru: {
    size: '\u0412\u044b\u0431\u0440\u0430\u043d\u043d\u044b\u0435 \u0444\u0430\u0439\u043b\u044b \u043f\u0440\u0435\u0432\u044b\u0448\u0430\u044e\u0442 \u043b\u0438\u043c\u0438\u0442 3 \u041c\u0411.',
    count: '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043d\u0435 \u0431\u043e\u043b\u0435\u0435 6 \u0444\u0430\u0439\u043b\u043e\u0432.',
    mail: '\u0414\u043b\u044f \u0431\u043e\u043b\u0435\u0435 \u043a\u0440\u0443\u043f\u043d\u044b\u0445 \u0432\u043b\u043e\u0436\u0435\u043d\u0438\u0439 \u043d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u043d\u0430\u043c \u043d\u0430\u043f\u0440\u044f\u043c\u0443\u044e.',
    action: '\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u043f\u043e e-mail',
  },
  fr: {
    size: 'Les fichiers sélectionnés dépassent la limite de 3 Mo.',
    count: 'Veuillez sélectionner au maximum 6 fichiers.',
    mail: 'Pour les pièces jointes plus volumineuses, envoyez-nous directement un e-mail.',
    action: 'Envoyer par e-mail',
  },
  uk: {
    size: '\u0412\u0438\u0431\u0440\u0430\u043d\u0456 \u0444\u0430\u0439\u043b\u0438 \u043f\u0435\u0440\u0435\u0432\u0438\u0449\u0443\u044e\u0442\u044c \u043b\u0456\u043c\u0456\u0442 3 \u041c\u0411.',
    count: '\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044c \u043d\u0435 \u0431\u0456\u043b\u044c\u0448\u0435 6 \u0444\u0430\u0439\u043b\u0456\u0432.',
    mail: '\u0414\u043b\u044f \u0431\u0456\u043b\u044c\u0448\u0438\u0445 \u0432\u043a\u043b\u0430\u0434\u0435\u043d\u044c \u043d\u0430\u0434\u0456\u0448\u043b\u0456\u0442\u044c \u043d\u0430\u043c e-mail.',
    action: '\u041d\u0430\u0434\u0456\u0441\u043b\u0430\u0442\u0438 e-mail',
  },
};

function getUploadError(files) {
  if (files.length > 6) return 'upload-count';
  if (files.reduce((total, file) => total + file.size, 0) > 3 * 1024 * 1024) return 'upload-size';
  return '';
}

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] || '');
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function HowContact() {
  const { t, lang } = useI18n();
  const [status, setStatus] = useState('idle');
  const [serviceType, setServiceType] = useState('translation');
  const [startedAt] = useState(() => Date.now());
  const statusCopy = FORM_STATUS[lang] || FORM_STATUS.de;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const files = data.getAll('files').filter((file) => file?.size);
    const uploadError = getUploadError(files);
    if (uploadError) {
      setStatus(uploadError);
      return;
    }
    setStatus('sending');
    trackEvent('cta_click', { action: 'quote_form_submit' });

    try {
      const payload = {
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        phone: data.get('phone'),
        sourceLanguage: data.get('sourceLanguage'),
        targetLanguage: data.get('targetLanguage'),
        message: data.get('message'),
        website: data.get('website'),
        service: serviceType,
        language: lang,
        startedAt,
        files: await Promise.all(files.map(async (file) => ({
          name: file.name,
          type: file.type,
          content: await readFileAsBase64(file),
        }))),
      };
      const response = await fetch('/api/contact/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Delivery failed.');
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="how-contact" id="contact" aria-labelledby="how-heading">
      <div className="wrap">
        <div className="section-eyebrow">{t('how.eyebrow')}</div>
        <h2 id="how-heading" data-reveal="">{t('how.title')}</h2>
        <p className="section-sub" data-reveal="" style={{ '--ri': 1 }}>{t('how.sub')}</p>

        {/* Steps bar */}
        <nav className="steps-bar" aria-label={t('how.eyebrow')} data-reveal="" style={{ '--ri': 0 }}>
          {STEPS.map((step, i) => (
            <div key={step.num} className={`step${i === 0 ? ' active' : ''}`}>
              <div className="step-circle" aria-hidden="true">{step.num}</div>
              <div className="step-label">{t(step.label)}</div>
              <div className="step-desc">{t(step.desc)}</div>
            </div>
          ))}
        </nav>

        {/* Contact + Form grid */}
        <div className="contact-grid">
          {/* Left — contact card */}
          <div className="contact-card" data-reveal="" style={{ '--ri': 0 }}>
            <h3>{t('contact.h3')}</h3>
            <p className="sub">{t('contact.sub')}</p>

            <div className="info-list">
              <div className="info-row">
                <div className="info-ic" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 16.92V21a2 2 0 01-2 2A19 19 0 011 4a2 2 0 012-2h4a2 2 0 012 2 12 12 0 00.7 4 2 2 0 01-.45 2L7 12a16 16 0 006 6l2-1.25a2 2 0 012-.45 12 12 0 004 .7 2 2 0 011 1.92z"/>
                  </svg>
                </div>
                <div>
                  <div className="info-lbl">{t('contact.phone')}</div>
                  <div className="info-val info-val-stack">
                    {CONTACT.phones.map((phone) => <a key={phone.href} href={phone.href}>{phone.label}</a>)}
                  </div>
                </div>
              </div>

              <div className="info-row">
                <div className="info-ic" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 7l9 6 9-6"/>
                    <rect x="3" y="5" width="18" height="14" rx="2"/>
                  </svg>
                </div>
                <div>
                  <div className="info-lbl">{t('contact.email')}</div>
                  <div className="info-val"><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></div>
                </div>
              </div>

              <div className="info-row">
                <div className="info-ic" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 21s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                </div>
                <div>
                  <div className="info-lbl">{t('contact.hq')}</div>
                  <div className="info-val">Möserstr. 14 · Osnabrück</div>
                </div>
              </div>
            </div>

            <div className="contact-hours">{t('foot.hours')}</div>

            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn wa-btn"
              aria-label={t('contact.wa')}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.824 11.824 0 013.48 8.413c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24z"/>
              </svg>
              <span>{t('contact.wa')}</span>
            </a>
          </div>

          {/* Right — form card */}
          <form
            className="contact-card form-card"
            onSubmit={handleSubmit}
            data-reveal=""
            style={{ '--ri': 1 }}
            aria-label={t('form.h3')}
          >
            <h3>{t('form.h3')}</h3>
            <p className="sub">{t('form.sub')}</p>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="form-first">{t('form.firstName')}</label>
                <input id="form-first" name="firstName" type="text" placeholder="Maria" required autoComplete="given-name" />
              </div>
              <div className="form-field">
                <label htmlFor="form-last">{t('form.lastName')}</label>
                <input id="form-last" name="lastName" type="text" placeholder="Schmidt" required autoComplete="family-name" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="form-email">{t('form.email')}</label>
                <input id="form-email" name="email" type="email" placeholder="m.schmidt@email.de" required autoComplete="email" />
              </div>
              <div className="form-field">
                <label htmlFor="form-phone">{t('form.phone')}</label>
                <input id="form-phone" name="phone" type="tel" placeholder="+49 ..." autoComplete="tel" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="form-from">{t('form.from')}</label>
                <select id="form-from" name="sourceLanguage">
                  <option>Arabisch</option>
                  <option>Türkisch</option>
                  <option>Russisch</option>
                  <option>Ukrainisch</option>
                  <option>Englisch</option>
                  <option>Persisch</option>
                  <option>Polnisch</option>
                  <option>Andere…</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="form-to">{t('form.to')}</label>
                <select id="form-to" name="targetLanguage">
                  <option>Deutsch</option>
                  <option>Englisch</option>
                  <option>Andere…</option>
                </select>
              </div>
            </div>

            <div className="service-toggle" role="group" aria-label={t('form.service.label')}>
              <button
                type="button"
                className={`service-choice${serviceType === 'translation' ? ' active' : ''}`}
                onClick={() => setServiceType('translation')}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="5" y="2" width="14" height="20" rx="2"/>
                  <path d="M9 7h6M9 11h6M9 15h4"/>
                </svg>
                {t('service.translation')}
              </button>
              <button
                type="button"
                className={`service-choice${serviceType === 'interpreting' ? ' active' : ''}`}
                onClick={() => setServiceType('interpreting')}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <path d="M12 19v4M8 23h8"/>
                </svg>
                {t('service.interpreting')}
              </button>
            </div>

            {serviceType === 'translation' && (
              <div className="form-field">
                <label htmlFor="form-file">{t('form.file')}</label>
                <input
                  id="form-file"
                  name="files"
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.heic,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png,image/webp,image/heic"
                  multiple
                  onChange={(e) => setStatus(getUploadError([...e.currentTarget.files]))}
                />
                <p className="form-hint">{FORM_UPLOAD_HINT[lang] || FORM_UPLOAD_HINT.de}</p>
              </div>
            )}

            <div className="form-field">
              <label htmlFor="form-doc">{t('form.doc')}</label>
              <textarea
                id="form-doc"
                name="message"
                placeholder="z.B. Heiratsurkunde aus Damaskus, beglaubigt für das Standesamt …"
              />
            </div>

            <input className="form-honeypot" type="text" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" />

            {status === 'error' && <p className="form-feedback form-feedback--error" role="alert">{statusCopy.error}</p>}
            {(status === 'upload-size' || status === 'upload-count') && (
              <p className="form-feedback form-feedback--error" role="alert">
                {FORM_UPLOAD_ERROR[lang]?.[status === 'upload-size' ? 'size' : 'count'] || FORM_UPLOAD_ERROR.de[status === 'upload-size' ? 'size' : 'count']}
                {' '}
                {FORM_UPLOAD_ERROR[lang]?.mail || FORM_UPLOAD_ERROR.de.mail}
                {' '}
                <a href={`mailto:${CONTACT.email}`}>{FORM_UPLOAD_ERROR[lang]?.action || FORM_UPLOAD_ERROR.de.action}</a>
              </p>
            )}
            {status === 'sent' && <p className="form-feedback form-feedback--success" role="status">{statusCopy.sent}</p>}

            <button type="submit" className="btn btn-primary" disabled={status === 'sending'} style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
              {status === 'sending' ? statusCopy.sending : <><span>{t('form.submit')}</span> <span className="arrow">→</span></>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
