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
    setStatus('sending');
    trackEvent('cta_click', { action: 'quote_form_submit' });
    const data = new FormData(form);
    const file = data.get('file');

    try {
      if (file?.size > 2.5 * 1024 * 1024) throw new Error('File too large.');
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
        file: file?.size ? { name: file.name, type: file.type, content: await readFileAsBase64(file) } : undefined,
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
                <input id="form-file" name="file" type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" />
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
