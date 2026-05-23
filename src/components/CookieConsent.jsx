import { useState, useEffect } from 'react';

export const COOKIE_KEY = 'noon_cookie';

export default function CookieConsent({ onConsent }) {
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_KEY)) {
      // Small delay so it doesn't flash on initial render
      const id = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(id);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'all');
    setVisible(false);
    onConsent?.('all');
  };

  const essential = () => {
    localStorage.setItem(COOKIE_KEY, 'essential');
    setVisible(false);
    onConsent?.('essential');
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-modal="false" aria-label="Cookie-Einstellungen">
      <div className="cookie-inner">
        <div className="cookie-top">
          <div className="cookie-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10"/>
              <path d="M12 8v4l3 3"/>
              <circle cx="19" cy="5" r="3" fill="currentColor" stroke="none"/>
            </svg>
          </div>
          <div className="cookie-text">
            <strong>Cookies &amp; Datenschutz</strong>
            <p>
              Wir verwenden Cookies, um unsere Website zu verbessern und die Nutzung zu analysieren.
            </p>
            <div className="cookie-legal-links">
              <button
                className="cookie-link"
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('openLegal', { detail: 'impressum' }))}
              >
                Impressum
              </button>
              <span className="cookie-link-sep">·</span>
              <button
                className="cookie-link"
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('openLegal', { detail: 'datenschutz' }))}
              >
                Datenschutz
              </button>
              <span className="cookie-link-sep">·</span>
              <button
                className="cookie-link"
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('openLegal', { detail: 'agb' }))}
              >
                AGB
              </button>
            </div>
          </div>
        </div>

        {details && (
          <div className="cookie-details">
            <div className="cookie-detail-row">
              <div>
                <strong>Essentielle Cookies</strong>
                <span>Notwendig für die Grundfunktionen der Website.</span>
              </div>
              <span className="cookie-always">Immer aktiv</span>
            </div>
            <div className="cookie-detail-row">
              <div>
                <strong>Analyse-Cookies</strong>
                <span>Helfen uns zu verstehen, wie Besucher die Website nutzen.</span>
              </div>
              <label className="cookie-toggle">
                <input type="checkbox" defaultChecked id="cookie-analytics" />
                <span className="cookie-toggle-track" />
              </label>
            </div>
          </div>
        )}

        <div className="cookie-actions">
          <button className="cookie-btn-details" type="button" onClick={() => setDetails(!details)}>
            {details ? 'Weniger' : 'Details'} ▾
          </button>
          <div className="cookie-btns-right">
            <button className="cookie-btn-ess" type="button" onClick={essential}>
              Nur essentielle
            </button>
            <button className="cookie-btn-all" type="button" onClick={accept}>
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
