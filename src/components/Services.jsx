import { useI18n } from '../hooks/useI18n';

export default function Services() {
  const { t } = useI18n();

  const listKeys = ['li1', 'li2', 'li3', 'li4', 'li5', 'li6'];
  const tagKeys  = ['tag1', 'tag2', 'tag3', 'tag4'];

  return (
    <section className="services" id="services" aria-labelledby="services-heading">
      <div className="container">
        <div className="section-head">
          <h2 id="services-heading" data-reveal="">{t('services.title')}</h2>
          <p data-reveal="" style={{ '--ri': 1 }}>
            {t('services.sub')}
          </p>
        </div>

        <div className="svc-featured" data-reveal="" style={{ '--ri': 0 }}>
          <div className="svc-feat-left">
            <div className="svc-feat-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="5" y="6" width="14" height="15" rx="1.5"/>
                <path d="M9 3h6v3H9zM12 11v6M9 14h6"/>
              </svg>
            </div>
            <h3>{t('services.feat.h')}</h3>
            <ul className="svc-feat-list">
              {listKeys.map((k) => (
                <li key={k}>
                  <span aria-hidden="true">✓</span>
                  {t(`services.feat.${k}`)}
                </li>
              ))}
            </ul>
            <div className="svc-feat-tags" aria-label="Merkmale">
              {tagKeys.map((k) => (
                <span key={k}>{t(`services.feat.${k}`)}</span>
              ))}
            </div>
          </div>

          <div className="svc-feat-right">
            <div className="svc-feat-visual">
              <img
                src="/assets/Online-Doctor-rafiki.svg"
                alt=""
                aria-hidden="true"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>

            <div className="svc-feat-price">
              <span className="sfc-from">{t('services.feat.from')}</span>
              <span className="sfc-num">0,16€</span>
              <span className="sfc-unit">{t('services.feat.unit')}</span>
            </div>
            <a href="#contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>
              {t('services.feat.cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
