import { useI18n } from '../hooks/useI18n';
import { AGB, DATENSCHUTZ, ImpressumBody, PAGE_TITLES } from '../components/LegalModal.jsx';

// Standalone legal pages (/impressum/, /datenschutz/, /agb/) with the same content as the footer modal.
export default function LegalPage({ type }) {
  const { lang } = useI18n();
  const titles = PAGE_TITLES[lang] || PAGE_TITLES.de;
  const body = type === 'impressum' ? <ImpressumBody lang={lang} />
    : type === 'datenschutz' ? (DATENSCHUTZ[lang] || DATENSCHUTZ.de)
    : (AGB[lang] || AGB.de);
  return (
    <section className="legal-page" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="wrap">
        <h1>{titles[type]}</h1>
        {body}
      </div>
    </section>
  );
}
