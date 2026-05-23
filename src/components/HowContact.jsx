import { useState } from 'react';
import { useI18n } from '../hooks/useI18n';

const STEPS = [
  { num: '01', label: 'Foto senden',  desc: 'WhatsApp, Mail oder Upload' },
  { num: '02', label: 'Angebot',      desc: 'Festpreis in unter 5 Min.' },
  { num: '03', label: 'Bestätigen',   desc: 'Per Klick oder WhatsApp' },
  { num: '04', label: 'Übersetzen',   desc: 'Beeidigte Profis. ISO 17100.' },
  { num: '05', label: 'Lieferung',    desc: 'Digital, Post oder Abholung' },
];

export default function HowContact() {
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="how-contact" id="contact" aria-labelledby="how-heading">
      <div className="wrap">
        <div className="section-eyebrow">Ablauf &amp; Kontakt</div>
        <h2 id="how-heading" data-reveal="">{t('how.title')}</h2>
        <p className="section-sub" data-reveal="" style={{ '--ri': 1 }}>{t('how.sub')}</p>

        {/* Steps bar */}
        <nav className="steps-bar" aria-label="Prozessschritte" data-reveal="" style={{ '--ri': 0 }}>
          {STEPS.map((step, i) => (
            <div key={step.num} className={`step${i === 0 ? ' active' : ''}`}>
              <div className="step-circle" aria-hidden="true">{step.num}</div>
              <div className="step-label">{step.label}</div>
              <div className="step-desc">{step.desc}</div>
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
                  <div className="info-val">+49 541 80 14 84 00</div>
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
                  <div className="info-val">info@noon-sprachdienst.de</div>
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

            <a
              href="https://wa.me/4916095627666"
              target="_blank"
              rel="noopener noreferrer"
              className="btn wa-btn"
              aria-label="WhatsApp Chat starten"
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
                <input id="form-first" type="text" placeholder="Maria" required autoComplete="given-name" />
              </div>
              <div className="form-field">
                <label htmlFor="form-last">{t('form.lastName')}</label>
                <input id="form-last" type="text" placeholder="Schmidt" required autoComplete="family-name" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="form-email">{t('form.email')}</label>
                <input id="form-email" type="email" placeholder="m.schmidt@email.de" required autoComplete="email" />
              </div>
              <div className="form-field">
                <label htmlFor="form-phone">{t('form.phone')}</label>
                <input id="form-phone" type="tel" placeholder="+49 …" autoComplete="tel" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="form-from">{t('form.from')}</label>
                <select id="form-from">
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
                <select id="form-to">
                  <option>Deutsch</option>
                  <option>Englisch</option>
                  <option>Andere…</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="form-doc">{t('form.doc')}</label>
              <textarea
                id="form-doc"
                placeholder="z.B. Heiratsurkunde aus Damaskus, beglaubigt für das Standesamt …"
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
              {submitted ? '✓ Gesendet' : <><span>{t('form.submit')}</span> <span className="arrow">→</span></>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
