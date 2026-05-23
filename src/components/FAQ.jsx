import { useState } from 'react';
import { useI18n } from '../hooks/useI18n';

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'];

export default function FAQ() {
  const { t } = useI18n();
  const [open, setOpen] = useState('q1');

  const toggle = (key) => setOpen((prev) => (prev === key ? null : key));

  return (
    <section className="faq" id="faq" aria-labelledby="faq-heading">
      <div className="container">
        <div className="section-head">
          <h2 id="faq-heading" data-reveal="">{t('faq.title')}</h2>
        </div>
        <div className="wrap" role="list">
          {FAQ_KEYS.map((key, i) => {
            const isOpen = open === key;
            return (
              /* Outer div owns data-reveal — React never touches its className */
              <div key={key} data-reveal="" style={{ '--ri': i }} role="listitem">
                <div className={`faq-item${isOpen ? ' open' : ''}`}>
                  <button
                    type="button"
                    className="faq-q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${key}`}
                    onClick={() => toggle(key)}
                  >
                    <span>{t(`faq.${key}`)}</span>
                    <span className="plus" aria-hidden="true" />
                  </button>
                  <div
                    id={`faq-a-${key}`}
                    className="faq-a"
                    role="region"
                    aria-hidden={!isOpen}
                  >
                    <p>{t(`faq.a${key.slice(1)}`)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
