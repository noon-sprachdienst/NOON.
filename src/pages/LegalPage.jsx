import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../hooks/useI18n';
import { AGB, DATENSCHUTZ, ImpressumBody, PAGE_TITLES } from '../components/LegalModal.jsx';
import { LEGAL_INFO } from '../data/legalInfo.js';

const LABELS = {
  de: { home: 'Startseite', updated: 'Stand', contents: 'Inhalt' },
  en: { home: 'Home', updated: 'Last updated', contents: 'Contents' },
  ar: { home: 'الرئيسية', updated: 'آخر تحديث', contents: 'المحتويات' },
  tr: { home: 'Ana sayfa', updated: 'Son güncelleme', contents: 'İçindekiler' },
  ru: { home: 'Главная', updated: 'Обновлено', contents: 'Содержание' },
  fr: { home: 'Accueil', updated: 'Mis à jour', contents: 'Sommaire' },
  uk: { home: 'Головна', updated: 'Оновлено', contents: 'Зміст' },
};
const PAGES = [['impressum', '/impressum/'], ['datenschutz', '/datenschutz/'], ['agb', '/agb/']];

// Standalone legal pages (/impressum/, /datenschutz/, /agb/) with the same content as the footer modal:
// header with breadcrumb and page tabs, a contents list built from the section headings, and the text in a card.
export default function LegalPage({ type }) {
  const { lang } = useI18n();
  const titles = PAGE_TITLES[lang] || PAGE_TITLES.de;
  const l = LABELS[lang] || LABELS.de;
  const cardRef = useRef(null);
  const [sections, setSections] = useState([]);
  const body = type === 'impressum' ? <ImpressumBody lang={lang} />
    : type === 'datenschutz' ? (DATENSCHUTZ[lang] || DATENSCHUTZ.de)
    : (AGB[lang] || AGB.de);

  useEffect(() => {
    const headings = [...(cardRef.current?.querySelectorAll('.legal-body h3') || [])];
    headings.forEach((h, i) => { h.id = `${type}-${i + 1}`; });
    setSections(headings.map((h) => ({ id: h.id, text: h.textContent })));
  }, [type, lang]);

  return (
    <section className="legal-page" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <header className="legal-hero">
        <div className="wrap">
          <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
            <a href={lang === 'de' ? '/' : `/${lang}/`}>{l.home}</a><span aria-hidden="true">/</span><span>{titles[type]}</span>
          </nav>
          <h1>{titles[type]}</h1>
          <p className="legal-meta">{LEGAL_INFO.company} · {l.updated}: <span dir="ltr">{LEGAL_INFO.updated}</span></p>
          <nav className="legal-tabs" aria-label={l.contents}>
            {PAGES.map(([key, href]) => (
              <a key={key} href={href} className={key === type ? 'is-active' : undefined} aria-current={key === type ? 'page' : undefined}>{titles[key]}</a>
            ))}
          </nav>
        </div>
      </header>
      <div className="wrap legal-layout">
        {sections.length > 2 && (
          <aside className="legal-toc">
            <p className="legal-toc-title">{l.contents}</p>
            <ol>
              {sections.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.text}</a></li>)}
            </ol>
          </aside>
        )}
        <article className="legal-card" ref={cardRef}>{body}</article>
      </div>
    </section>
  );
}
