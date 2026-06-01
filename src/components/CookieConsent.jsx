import { useState, useEffect } from 'react';
import { COOKIE_KEY, setConsent } from '../lib/analytics.js';
import { useI18n } from '../hooks/useI18n.jsx';

const COPY = {
  de: {
    aria: 'Cookie-Einstellungen', title: 'Cookies & Datenschutz',
    intro: 'Wir verwenden Cookies, um unsere Website zu verbessern und die Nutzung zu analysieren.',
    imprint: 'Impressum', privacy: 'Datenschutz', terms: 'AGB',
    essential: 'Essentielle Cookies', essentialDesc: 'Notwendig für die Grundfunktionen der Website.',
    always: 'Immer aktiv', analytics: 'Analyse-Cookies',
    analyticsDesc: 'Helfen uns zu verstehen, wie Besucher die Website nutzen.',
    less: 'Weniger', details: 'Details', essentialOnly: 'Nur essentielle',
    save: 'Auswahl speichern', acceptAll: 'Alle akzeptieren',
  },
  en: {
    aria: 'Cookie settings', title: 'Cookies & privacy',
    intro: 'We use cookies to improve our website and analyse how it is used.',
    imprint: 'Legal notice', privacy: 'Privacy', terms: 'Terms',
    essential: 'Essential cookies', essentialDesc: 'Required for the website’s core functions.',
    always: 'Always active', analytics: 'Analytics cookies',
    analyticsDesc: 'Help us understand how visitors use the website.',
    less: 'Show less', details: 'Details', essentialOnly: 'Essential only',
    save: 'Save selection', acceptAll: 'Accept all',
  },
  ar: {
    aria: 'إعدادات ملفات الارتباط', title: 'ملفات الارتباط والخصوصية',
    intro: 'نستخدم ملفات الارتباط لتحسين موقعنا وتحليل طريقة استخدامه.',
    imprint: 'الإفصاح القانوني', privacy: 'الخصوصية', terms: 'الشروط',
    essential: 'ملفات الارتباط الأساسية', essentialDesc: 'ضرورية للوظائف الأساسية للموقع.',
    always: 'نشطة دائما', analytics: 'ملفات التحليل',
    analyticsDesc: 'تساعدنا على فهم كيفية استخدام الزوار للموقع.',
    less: 'عرض أقل', details: 'التفاصيل', essentialOnly: 'الأساسية فقط',
    save: 'حفظ الاختيار', acceptAll: 'قبول الكل',
  },
  tr: {
    aria: 'Çerez ayarları', title: 'Çerezler ve gizlilik',
    intro: 'Web sitemizi iyileştirmek ve kullanımını analiz etmek için çerezler kullanıyoruz.',
    imprint: 'Künye', privacy: 'Gizlilik', terms: 'Koşullar',
    essential: 'Zorunlu çerezler', essentialDesc: 'Web sitesinin temel işlevleri için gereklidir.',
    always: 'Her zaman etkin', analytics: 'Analiz çerezleri',
    analyticsDesc: 'Ziyaretçilerin web sitesini nasıl kullandığını anlamamıza yardımcı olur.',
    less: 'Daha az', details: 'Ayrıntılar', essentialOnly: 'Yalnızca zorunlu',
    save: 'Seçimi kaydet', acceptAll: 'Tümünü kabul et',
  },
  ru: {
    aria: 'Настройки файлов cookie', title: 'Файлы cookie и конфиденциальность',
    intro: 'Мы используем файлы cookie, чтобы улучшать сайт и анализировать его использование.',
    imprint: 'Юридическая информация', privacy: 'Конфиденциальность', terms: 'Условия',
    essential: 'Необходимые файлы cookie', essentialDesc: 'Нужны для основных функций сайта.',
    always: 'Всегда активны', analytics: 'Аналитические файлы cookie',
    analyticsDesc: 'Помогают понять, как посетители используют сайт.',
    less: 'Скрыть', details: 'Подробнее', essentialOnly: 'Только необходимые',
    save: 'Сохранить выбор', acceptAll: 'Принять все',
  },
  fr: {
    aria: 'Paramètres des cookies', title: 'Cookies et confidentialité',
    intro: 'Nous utilisons des cookies pour améliorer notre site et analyser son utilisation.',
    imprint: 'Mentions légales', privacy: 'Confidentialité', terms: 'CGV',
    essential: 'Cookies essentiels', essentialDesc: 'Nécessaires aux fonctions de base du site.',
    always: 'Toujours actifs', analytics: 'Cookies analytiques',
    analyticsDesc: 'Nous aident à comprendre comment les visiteurs utilisent le site.',
    less: 'Réduire', details: 'Détails', essentialOnly: 'Essentiels uniquement',
    save: 'Enregistrer le choix', acceptAll: 'Tout accepter',
  },
  uk: {
    aria: 'Налаштування файлів cookie', title: 'Файли cookie та конфіденційність',
    intro: 'Ми використовуємо файли cookie, щоб покращувати сайт і аналізувати його використання.',
    imprint: 'Юридична інформація', privacy: 'Конфіденційність', terms: 'Умови',
    essential: 'Необхідні файли cookie', essentialDesc: 'Потрібні для основних функцій сайту.',
    always: 'Завжди активні', analytics: 'Аналітичні файли cookie',
    analyticsDesc: 'Допомагають зрозуміти, як відвідувачі використовують сайт.',
    less: 'Згорнути', details: 'Докладніше', essentialOnly: 'Лише необхідні',
    save: 'Зберегти вибір', acceptAll: 'Прийняти всі',
  },
};

export default function CookieConsent({ onConsent }) {
  const { lang, isRTL } = useI18n();
  const copy = COPY[lang] || COPY.de;
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const reopen = () => {
      setAnalytics(localStorage.getItem(COOKIE_KEY) === 'all');
      setDetails(true);
      setVisible(true);
    };
    window.addEventListener('openCookieSettings', reopen);

    if (!localStorage.getItem(COOKIE_KEY)) {
      // Small delay so it doesn't flash on initial render
      const id = setTimeout(() => setVisible(true), 800);
      return () => {
        clearTimeout(id);
        window.removeEventListener('openCookieSettings', reopen);
      };
    }
    return () => window.removeEventListener('openCookieSettings', reopen);
  }, []);

  const saveSelection = () => {
    const value = analytics ? 'all' : 'essential';
    setConsent(value);
    setVisible(false);
    onConsent?.(value);
  };

  const acceptAll = () => {
    setAnalytics(true);
    setConsent('all');
    setVisible(false);
    onConsent?.('all');
  };

  const essential = () => {
    setConsent('essential');
    setVisible(false);
    onConsent?.('essential');
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" dir={isRTL ? 'rtl' : 'ltr'} role="dialog" aria-modal="false" aria-label={copy.aria}>
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
            <strong>{copy.title}</strong>
            <p>{copy.intro}</p>
            <div className="cookie-legal-links">
              <button
                className="cookie-link"
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('openLegal', { detail: 'impressum' }))}
              >
                {copy.imprint}
              </button>
              <span className="cookie-link-sep">·</span>
              <button
                className="cookie-link"
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('openLegal', { detail: 'datenschutz' }))}
              >
                {copy.privacy}
              </button>
              <span className="cookie-link-sep">·</span>
              <button
                className="cookie-link"
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('openLegal', { detail: 'agb' }))}
              >
                {copy.terms}
              </button>
            </div>
          </div>
        </div>

        {details && (
          <div className="cookie-details">
            <div className="cookie-detail-row">
              <div>
                <strong>{copy.essential}</strong>
                <span>{copy.essentialDesc}</span>
              </div>
              <span className="cookie-always">{copy.always}</span>
            </div>
            <div className="cookie-detail-row">
              <div>
                <strong>{copy.analytics}</strong>
                <span>{copy.analyticsDesc}</span>
              </div>
              <label className="cookie-toggle">
                <input
                  type="checkbox"
                  checked={analytics}
                  id="cookie-analytics"
                  onChange={(event) => setAnalytics(event.target.checked)}
                />
                <span className="cookie-toggle-track" />
              </label>
            </div>
          </div>
        )}

        <div className="cookie-actions">
          <button className="cookie-btn-details" type="button" onClick={() => setDetails(!details)}>
            {details ? copy.less : copy.details} ▾
          </button>
          <div className="cookie-btns-right">
            <button className="cookie-btn-ess" type="button" onClick={essential}>
              {copy.essentialOnly}
            </button>
            <button className="cookie-btn-save" type="button" onClick={saveSelection}>
              {copy.save}
            </button>
            <button className="cookie-btn-all" type="button" onClick={acceptAll}>
              {copy.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
