import { useI18n } from '../hooks/useI18n';

export default function Feature2() {
  const { t } = useI18n();

  return (
    <section className="feature-2" id="dolmetschen" aria-labelledby="f2-heading">
      <div className="container">
        <div className="section-head">
          <h2 id="f2-heading" data-reveal="">{t('f2.title')}</h2>
        </div>
        <div className="grid">

          {/* Card 1 — Real-time tracking */}
          <article className="feature-card" data-reveal="" style={{ '--ri': 0 }}>
            <div className="ui-stage">
              <img
                className="illu"
                src="/assets/Timeline-amico.svg"
                alt=""
                aria-hidden="true"
                loading="lazy"
                width="340"
                height="280"
              />
            </div>
            <h3>{t('f2c1.h')}</h3>
            <p>{t('f2c1.p')}</p>
          </article>

          {/* Card 2 — Interpretation */}
          <article className="feature-card" data-reveal="" style={{ '--ri': 1 }}>
            <div className="ui-stage">
              <img
                className="illu"
                src="/assets/Calling-amico.svg"
                alt=""
                aria-hidden="true"
                loading="lazy"
                width="340"
                height="280"
              />
            </div>
            <h3>{t('f2c2.h')}</h3>
            <p>{t('f2c2.p')}</p>
          </article>

        </div>
      </div>
    </section>
  );
}
