import { useI18n } from '../hooks/useI18n';
import { CONTACT } from '../config/contact.js';

const MARQUEE_ITEMS = [
  { text: 'Arabisch → Deutsch', icon: '🇩🇪' },
  { text: 'Türkisch → Deutsch', icon: '🇩🇪' },
  { text: 'Russisch → Deutsch', icon: '🇩🇪' },
  { text: 'Englisch → Deutsch', icon: '🇩🇪' },
  { text: 'Ukrainisch → Deutsch', icon: '🇩🇪' },
  { text: 'Persisch → Deutsch', icon: '🇩🇪' },
  { text: 'Tigrinya → Deutsch', icon: '🇩🇪' },
  { text: 'Polnisch → Deutsch', icon: '🇩🇪' },
  { text: 'Dari → Deutsch', icon: '🇩🇪' },
];

export default function Closing() {
  const { t } = useI18n();

  // Duplicate for seamless loop
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section className="closing" aria-labelledby="closing-heading">
      <div className="container">
        <h2 id="closing-heading" data-reveal="">{t('closing.title')}</h2>
        <p data-reveal="" style={{ '--ri': 1 }}>{t('closing.sub')}</p>
        <div className="ctas" data-reveal="" style={{ '--ri': 2 }}>
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.824 11.824 0 013.48 8.413c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24z"/>
            </svg>
            {t('contact.wa')}
          </a>
          <a href="#pricing" className="btn btn-secondary">
            {t('closing.cta2')} <span className="arrow">→</span>
          </a>
        </div>
      </div>

      {/* Marquee band */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {items.map((item, i) => (
            <span key={i} className="marquee-item">
              <span className="ic-sq">{item.icon}</span>
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
