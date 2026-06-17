import { useState } from 'react';
import { useI18n } from '../hooks/useI18n';
import { getFaqs, serviceUi } from '../data/serviceContent';

const FAQ_GROUPS = {
  de: [
    { title: 'Fragen zu Übersetzungen', keys: ['cost', 'duration', 'iso'] },
    { title: 'Fragen zu beglaubigten Übersetzungen', keys: ['accepted', 'original', 'delivery'] },
    { title: 'Fragen zu Dolmetscherdiensten', keys: ['request', 'free', 'languages', 'interpreters', 'speed', 'cities'] },
  ],
  en: [
    { title: 'Questions about translations', keys: ['cost', 'duration', 'iso'] },
    { title: 'Questions about certified translations', keys: ['accepted', 'original', 'delivery'] },
    { title: 'Questions about interpreting services', keys: ['request', 'free', 'languages', 'interpreters', 'speed', 'cities'] },
  ],
  ar: [
    { title: 'أسئلة حول الترجمة', keys: ['cost', 'duration', 'iso'] },
    { title: 'أسئلة حول الترجمات المعتمدة', keys: ['accepted', 'original', 'delivery'] },
    { title: 'أسئلة حول خدمات الترجمة الفورية', keys: ['request', 'free', 'languages', 'interpreters', 'speed', 'cities'] },
  ],
  tr: [
    { title: 'Çeviriler hakkında sorular', keys: ['cost', 'duration', 'iso'] },
    { title: 'Yeminli çeviriler hakkında sorular', keys: ['accepted', 'original', 'delivery'] },
    { title: 'Tercümanlık hizmetleri hakkında sorular', keys: ['request', 'free', 'languages', 'interpreters', 'speed', 'cities'] },
  ],
  ru: [
    { title: 'Вопросы о письменных переводах', keys: ['cost', 'duration', 'iso'] },
    { title: 'Вопросы о заверенных переводах', keys: ['accepted', 'original', 'delivery'] },
    { title: 'Вопросы об устном переводе', keys: ['request', 'free', 'languages', 'interpreters', 'speed', 'cities'] },
  ],
  fr: [
    { title: 'Questions sur les traductions', keys: ['cost', 'duration', 'iso'] },
    { title: 'Questions sur les traductions certifiées', keys: ['accepted', 'original', 'delivery'] },
    { title: 'Questions sur les services d’interprétation', keys: ['request', 'free', 'languages', 'interpreters', 'speed', 'cities'] },
  ],
  uk: [
    { title: 'Питання про письмові переклади', keys: ['cost', 'duration', 'iso'] },
    { title: 'Питання про завірені переклади', keys: ['accepted', 'original', 'delivery'] },
    { title: 'Питання про усний переклад', keys: ['request', 'free', 'languages', 'interpreters', 'speed', 'cities'] },
  ],
};

const FAQ_CTA = {
  de: { title: 'Weitere Fragen?', action: 'Frage stellen' },
  en: { title: 'More questions?', action: 'Ask a question' },
  ar: { title: 'هل لديك أسئلة أخرى؟', action: 'اطرح سؤالا' },
  tr: { title: 'Başka sorularınız mı var?', action: 'Soru sor' },
  ru: { title: 'Остались вопросы?', action: 'Задать вопрос' },
  fr: { title: 'D’autres questions ?', action: 'Poser une question' },
  uk: { title: 'Залишилися питання?', action: 'Поставити питання' },
};

const getQuoteHref = (lang) => (lang === 'de' ? '/angebot' : `/${lang}/angebot`);

export default function FAQ() {
  const { lang } = useI18n();
  const faqs = getFaqs(lang);
  const ui = serviceUi[lang] || serviceUi.de;
  const groups = FAQ_GROUPS[lang] || FAQ_GROUPS.de;
  const cta = FAQ_CTA[lang] || FAQ_CTA.de;
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
        <div className="wrap faq-group-wrap">
          {groups.map((group, groupIndex) => (
            <section className="faq-group" key={group.title} aria-labelledby={`faq-group-${groupIndex}`}>
              <h3 id={`faq-group-${groupIndex}`} data-reveal="" style={{ '--ri': groupIndex }}>
                {group.title}
              </h3>
              <div role="list">
                {group.keys.map((key, i) => {
                  const item = faqs.find((faq) => faq.key === key);
                  if (!item) return null;
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
            </section>
          ))}
          <div className="faq-more" data-reveal="">
            <strong>{cta.title}</strong>
            <a href={getQuoteHref(lang)} className="btn btn-primary btn-sm">
              {cta.action} <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
