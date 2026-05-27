import { useState } from 'react';
import { useI18n } from '../hooks/useI18n';
import { getFaqs, serviceUi } from '../data/serviceContent';

export default function FAQ() {
  const { lang } = useI18n();
  const faqs = getFaqs(lang);
  const ui = serviceUi[lang] || serviceUi.de;
  const [open, setOpen] = useState(faqs[0].key);

  const toggle = (key) => setOpen((prev) => (prev === key ? null : key));

  return (
    <section className="faq" id="faq" aria-labelledby="faq-heading">
      <div className="container">
        <div className="section-head">
          <h2 id="faq-heading" data-reveal="">{ui.faqTitle}</h2>
          <p data-reveal="" style={{ '--ri': 1 }}>
            {ui.faqSub}
          </p>
        </div>
        <div className="wrap" role="list">
          {faqs.map((item, i) => {
            const isOpen = open === item.key;
            return (
              <div key={item.key} data-reveal="" style={{ '--ri': i % 4 }} role="listitem">
                <div className={`faq-item${isOpen ? ' open' : ''}`}>
                  <button
                    type="button"
                    className="faq-q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${item.key}`}
                    onClick={() => toggle(item.key)}
                  >
                    <span>{item.q}</span>
                    <span className="plus" aria-hidden="true" />
                  </button>
                  <div
                    id={`faq-a-${item.key}`}
                    className="faq-a"
                    role="region"
                    aria-hidden={!isOpen}
                  >
                    <p>{item.a}</p>
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
