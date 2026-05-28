import { useEffect, useState } from 'react';
import { useI18n } from '../hooks/useI18n';
import { getServiceNavigation, serviceUi } from '../data/serviceContent';

const SIDE_LABELS = {
  de: { interpreting: 'Dolmetschen', translation: 'Beglaubigte Übersetzungen', specialist: 'Fachübersetzung', faq: 'FAQ' },
  en: { interpreting: 'Interpreting', translation: 'Translation', specialist: 'Specialist translation', faq: 'FAQ' },
  ar: { interpreting: 'ترجمة فورية', translation: 'ترجمة', specialist: 'ترجمة متخصصة', faq: 'الأسئلة الشائعة' },
  tr: { interpreting: 'Tercümanlık', translation: 'Çeviri', specialist: 'Uzman çeviri', faq: 'SSS' },
  ru: { interpreting: 'Устный перевод', translation: 'Перевод', specialist: 'Профильный перевод', faq: 'FAQ' },
  fr: { interpreting: 'Interprétation', translation: 'Traduction', specialist: 'Traduction spécialisée', faq: 'FAQ' },
  uk: { interpreting: 'Усний переклад', translation: 'Переклад', specialist: 'Фаховий переклад', faq: 'FAQ' },
};

export default function Services() {
  const { t, lang } = useI18n();
  const navItems = getServiceNavigation(lang);
  const interpretingItems = navItems.filter((item) => item.group === 'interpreting');
  const translationItem = navItems.find((item) => item.group === 'translation');
  const specialtyItems = navItems.filter((item) => item.group === 'specialist');
  const ui = serviceUi[lang] || serviceUi.de;
  const side = SIDE_LABELS[lang] || SIDE_LABELS.de;
  const [activeId, setActiveId] = useState(navItems[0]?.id);
  const active = navItems.find((item) => item.id === activeId) || navItems[0];
  const activeParagraphs = active?.paragraphs || [active?.text].filter(Boolean);

  const listKeys = ['li1', 'li2', 'li3', 'li4', 'li5', 'li6'];
  const tagKeys  = ['tag1', 'tag2', 'tag3', 'tag4'];

  useEffect(() => {
    setActiveId(navItems[0]?.id);
  }, [lang]);

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

        <div className="specialties" id="fachuebersetzungen">
          <div className="section-head specialties-head">
            <h2 data-reveal="">{ui.title}</h2>
            <p data-reveal="" style={{ '--ri': 1 }}>
              {ui.sub}
            </p>
          </div>

          <div className="specialty-layout" data-reveal="" style={{ '--ri': 0 }}>
            <aside className="specialty-sidebar" aria-label="Fachübersetzungen Navigation">
              <button
                type="button"
                className={`specialty-side-row specialty-side-row--strong${active?.id === interpretingItems[0]?.id ? ' active' : ''}`}
                onClick={() => setActiveId(interpretingItems[0]?.id)}
                aria-pressed={active?.id === interpretingItems[0]?.id}
              >
                {side.interpreting} <span aria-hidden="true">›</span>
              </button>
              {interpretingItems.length > 1 && (
                <div className="specialty-side-subnav">
                  {interpretingItems.slice(1).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`specialty-side-row specialty-side-row--sub${active?.id === item.id ? ' active' : ''}`}
                      onClick={() => setActiveId(item.id)}
                      aria-pressed={active?.id === item.id}
                    >
                      {item.label} <span aria-hidden="true">›</span>
                    </button>
                  ))}
                </div>
              )}
              <button
                type="button"
                className={`specialty-side-row specialty-side-row--strong${active?.id === translationItem?.id ? ' active' : ''}`}
                onClick={() => setActiveId(translationItem?.id)}
                aria-pressed={active?.id === translationItem?.id}
              >
                {side.translation} <span aria-hidden="true">›</span>
              </button>
              <div className="specialty-side-row specialty-side-row--active specialty-side-row--strong">
                {side.specialist} <span aria-hidden="true">›</span>
              </div>
              <div className="specialty-side-subnav">
                {specialtyItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`specialty-side-row specialty-side-row--sub${active?.id === item.id ? ' active' : ''}`}
                    onClick={() => setActiveId(item.id)}
                    aria-pressed={active?.id === item.id}
                  >
                    {item.label} <span aria-hidden="true">›</span>
                  </button>
                ))}
              </div>
              <a href="#faq" className="specialty-side-row specialty-side-row--strong">
                {side.faq} <span aria-hidden="true">›</span>
              </a>
            </aside>

            <article className="specialty-detail" id={active?.id}>
              <div className="specialty-kicker">{active?.kicker || ui.kicker}</div>
              <h3>{active?.title}</h3>
              <p className="specialty-lead">{activeParagraphs[0]}</p>
              <div className="specialty-rule" aria-hidden="true" />
              {activeParagraphs.slice(1).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <ul>
                {active?.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
              <a href="#contact" className="btn btn-secondary btn-sm">
                {active?.cta} <span className="arrow">→</span>
              </a>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
