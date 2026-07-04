import { useI18n } from '../hooks/useI18n';
import { CONTACT } from '../config/contact.js';

const openLegal = (page) =>
  window.dispatchEvent(new CustomEvent('openLegal', { detail: page }));

export default function Footer() {
  const { t } = useI18n();
  const careerMail = `mailto:${CONTACT.email}?subject=Karriere%20bei%20NOON`;

  return (
    <footer>
      <div className="container">

        {/* Top grid: brand + 3 link columns */}
        <div className="foot-top">

          {/* Brand column */}
          <div className="foot-col foot-about">
            <div className="foot-brand">
              <img src="/assets/logo2.webp" alt="Noon Sprachdienst" width="300" height="204" />
            </div>
            <p>{t('foot.about')}</p>
            <div className="foot-contact-col">
              <a href={CONTACT.phones[0].href} className="foot-contact-row">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 9.93a19.79 19.79 0 01-3.07-8.67A2 2 0 012.88 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                {CONTACT.phones[0].label}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="foot-contact-row">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                {CONTACT.email}
              </a>
              <span className="foot-hours">{t('foot.hours')}</span>
            </div>
          </div>

          {/* Leistungen */}
          <div className="foot-col">
            <h5>{t('foot.services')}</h5>
            <ul>
              <li><a href="/leistungen">{t('pricing.card1.name')}</a></li>
              <li><a href="/leistungen">{t('foot.fach')}</a></li>
              <li><a href="/leistungen">{t('foot.dolm')}</a></li>
              <li><a href="/leistungen">{t('foot.job')}</a></li>
              <li><a href="/leistungen">{t('foot.lang')}</a></li>
            </ul>
          </div>

          {/* Standorte */}
          <div className="foot-col">
            <h5>{t('foot.locations')}</h5>
            <ul>
              <li><a href="/#branches">Osnabrück</a></li>
              <li><a href="/#branches">Stuttgart</a></li>
              <li><a href="/#branches">Berlin</a></li>
              <li><a href="/#branches">Bielefeld</a></li>
              <li><a href="/#branches">Mainz</a></li>
              <li><a href="/#branches">Kiel</a></li>
            </ul>
          </div>

          {/* Unternehmen */}
          <div className="foot-col">
            <h5>{t('foot.company')}</h5>
            <ul>
              <li><a href="/#hero">{t('foot.about_link')}</a></li>
              <li><a href={careerMail}>{t('foot.career')}</a></li>
              <li>
                <button type="button" className="foot-legal-link" onClick={() => window.dispatchEvent(new Event('openCookieSettings'))}>
                  {t('foot.press')}
                </button>
              </li>
              <li>
                <button type="button" className="foot-legal-link" onClick={() => openLegal('datenschutz')}>
                  {t('foot.privacy')}
                </button>
              </li>
              <li>
                <button type="button" className="foot-legal-link" onClick={() => openLegal('impressum')}>
                  {t('foot.imprint')}
                </button>
              </li>
              <li>
                <button type="button" className="foot-legal-link" onClick={() => openLegal('agb')}>
                  {t('foot.agb')}
                </button>
              </li>
              <li>
                <button type="button" className="foot-legal-link" onClick={() => window.dispatchEvent(new Event('openCookieSettings'))}>
                  {t('foot.cookies')}
                </button>
              </li>
              <li><a href="/angebot#contact">{t('foot.contact')}</a></li>
            </ul>
          </div>

        </div>

        {/* Social icons bar */}
        <div className="foot-social-row">
          <div className="socials">
            <a href="#" aria-label="Twitter / X">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 5.8a8.5 8.5 0 01-2.4.7 4.2 4.2 0 001.9-2.3 8.4 8.4 0 01-2.7 1A4.2 4.2 0 0011.4 9a11.9 11.9 0 01-8.6-4.4 4.2 4.2 0 001.3 5.6 4.2 4.2 0 01-1.9-.5v.1a4.2 4.2 0 003.4 4.1 4.2 4.2 0 01-1.9.1 4.2 4.2 0 004 2.9A8.4 8.4 0 012 18.6a11.9 11.9 0 006.4 1.9c7.7 0 11.9-6.4 11.9-11.9v-.5A8.5 8.5 0 0022 5.8z"/>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20 3H4a1 1 0 00-1 1v16a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1zM8.3 18.3H5.7V9.7h2.6v8.6zM7 8.6a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm11.3 9.7h-2.6V14c0-1 0-2.2-1.3-2.2-1.4 0-1.6 1-1.6 2.1v4.4h-2.6V9.7H13v1.2c.4-.7 1.3-1.4 2.6-1.4 2.7 0 3.2 1.8 3.2 4.1v4.7z"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2 0 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c0-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1zM12 0C8.7 0 8.3 0 7 .1 5.7.1 4.9.3 4.1.6c-.8.3-1.5.7-2.2 1.4C1.2 2.7.8 3.3.6 4.1.3 4.9.1 5.7.1 7 0 8.3 0 8.7 0 12s0 3.7.1 5c.1 1.3.3 2.1.6 2.9.3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.6.5 2.9.6C8.3 24 8.7 24 12 24s3.7 0 5-.1c1.3-.1 2.1-.3 2.9-.6.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.6.6-2.9.1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.3-2.1-.6-2.9-.3-.8-.7-1.5-1.4-2.2-.7-.7-1.4-1.1-2.2-1.4-.8-.3-1.6-.5-2.9-.6C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zm0 10.2a4 4 0 110-8 4 4 0 010 8zm6.4-10.4a1.4 1.4 0 100-2.8 1.4 1.4 0 000 2.8z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Big wordmark */}
        <div className="foot-wordmark" aria-hidden="true">
          <span style={{ color: 'black' }}>NOON</span><span className="dot">.</span>
        </div>

        <div className="foot-bottom">
          <div>© {new Date().getFullYear()} Noon Sprachdienst</div>
          <div className="foot-bottom-links">
            <button type="button" className="foot-legal-link foot-legal-link--sm" onClick={() => openLegal('impressum')}>{t('foot.imprint')}</button>
            <span>·</span>
            <button type="button" className="foot-legal-link foot-legal-link--sm" onClick={() => openLegal('datenschutz')}>{t('foot.privacy')}</button>
            <span>·</span>
            <button type="button" className="foot-legal-link foot-legal-link--sm" onClick={() => openLegal('agb')}>{t('foot.agb')}</button>
            <span>·</span>
            <a href="https://3assem0.github.io/MyPortflio/" target="_blank" rel="noopener noreferrer" className="foot-legal-link foot-legal-link--sm">Built by 3A</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
