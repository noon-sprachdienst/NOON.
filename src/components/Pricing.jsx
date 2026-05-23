import { useI18n } from '../hooks/useI18n';

const CARDS = [
  {
    key: 'card1',
    price: '39€',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    features: ['f1', 'f2', 'f3', 'f4'],
    featured: false,
  },
  {
    key: 'card2',
    price: '0,12€',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    features: ['f1', 'f2', 'f3', 'f4'],
    featured: true,
  },
  {
    key: 'card3',
    price: '85€',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    features: ['f1', 'f2', 'f3', 'f4'],
    featured: false,
  },
];

export default function Pricing() {
  const { t } = useI18n();

  return (
    <section className="pricing" id="pricing" aria-labelledby="pricing-heading">
      <div className="container">
        <div className="section-head">
          <h2 id="pricing-heading" data-reveal="">{t('pricing.title')}</h2>
          <p data-reveal="" style={{ '--ri': 1 }}>{t('pricing.sub')}</p>
        </div>

        <div className="grid">
          {CARDS.map(({ key, price, icon, features, featured }, i) => (
            <article
              key={key}
              className={`price-card${featured ? ' featured' : ''}`}
              data-reveal=""
              style={{ '--ri': i }}
            >
              <div className="price-head">
                <div className="ic">{icon}</div>
                <div className="price-tag">{t(`pricing.${key}.tag`)}</div>
              </div>
              <h3>{t(`pricing.${key}.name`)}</h3>
              <div className="price-from-label">{t('pricing.from')}</div>
              <div className="price-big">{price}</div>
              <div className="price-unit">{t(`pricing.${key}.unit`)}</div>
              <ul>
                {features.map((f) => (
                  <li key={f}>{t(`pricing.${key}.${f}`)}</li>
                ))}
              </ul>
              <a href="#contact" className="btn btn-primary">
                {t(`pricing.${key}.btn`)}
              </a>
            </article>
          ))}
        </div>

        <div className="pricing-note" data-reveal="" style={{ '--ri': 0 }}>
          <p>{t('pricing.note')}</p>
          <a href="#contact" className="btn btn-secondary btn-sm">
            {t('pricing.note.cta')} <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
