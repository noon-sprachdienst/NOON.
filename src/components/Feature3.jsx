import { useI18n } from '../hooks/useI18n';

export default function Feature3() {
  const { t } = useI18n();

  return (
    <section className="feature-3" aria-labelledby="f3-heading">
      <div className="container">
        <div className="section-head">
          <h2 id="f3-heading" data-reveal="">{t('f3.title')}</h2>
        </div>
        <div className="grid">

          {/* Card 1 — Send / Upload */}
          <article className="feature-card" data-reveal="" style={{ '--ri': 0 }}>
            <div className="ui-stage">
              <img
                className="illu"
                src="https://stories.freepiklabs.com/storage/2489/Upload_Mesa-de-trabajo-1.svg"
                alt=""
                aria-hidden="true"
                loading="lazy"
                width="280"
                height="240"
              />
            </div>
            <h3>{t('f3c1.h')}</h3>
            <p>{t('f3c1.p')}</p>
          </article>

          {/* Card 2 — Instant quote */}
          <article className="feature-card" data-reveal="" style={{ '--ri': 1 }}>
            <div className="ui-stage">
              <img
                className="illu"
                src="https://stories.freepiklabs.com/storage/14389/Invoice_Mesa-de-trabajo-1.svg"
                alt=""
                aria-hidden="true"
                loading="lazy"
                width="280"
                height="240"
              />
            </div>
            <h3>{t('f3c2.h')}</h3>
            <p>{t('f3c2.p')}</p>
          </article>

          {/* Card 3 — Receive translation */}
          <article className="feature-card" data-reveal="" style={{ '--ri': 2 }}>
            <div className="ui-stage">
              <img
                className="illu"
                src="https://stories.freepiklabs.com/storage/2300/Mail-sent-(1)-01.svg"
                alt=""
                aria-hidden="true"
                loading="lazy"
                width="280"
                height="240"
              />
            </div>
            <h3>{t('f3c3.h')}</h3>
            <p>{t('f3c3.p')}</p>
          </article>

        </div>
      </div>
    </section>
  );
}
