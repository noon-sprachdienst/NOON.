import { useI18n } from '../hooks/useI18n';
import { HOME_CITY_LINKS, HOME_DOCUMENT_LINKS } from '../data/homeLinks.js';

// German homepage only: the linked pages are German, so other language homepages skip it.
// Reuses the existing link-list style of the landing pages.
export default function PopularLinks() {
  const { lang } = useI18n();
  if (lang !== 'de') return null;

  return (
    <section className="home-links" aria-labelledby="home-links-heading">
      <div className="container">
        <div className="section-head">
          <h2 id="home-links-heading" data-reveal="">Häufig gesucht</h2>
          <p data-reveal="" style={{ '--ri': 1 }}>
            Beglaubigte Übersetzungen der häufigsten Dokumente – und unsere Seiten für Ihre Stadt.
          </p>
        </div>
        <div className="home-links-grid">
          <LinkColumn title="Dokumente übersetzen" links={HOME_DOCUMENT_LINKS} />
          <LinkColumn title="Übersetzer in Ihrer Stadt" links={HOME_CITY_LINKS} />
        </div>
      </div>
    </section>
  );
}

function LinkColumn({ title, links }) {
  return (
    <div className="home-links-col" data-reveal="">
      <h3>{title}</h3>
      <div className="seo-link-list seo-link-list--inline">
        {links.map((link) => <a key={link.href} href={link.href}>{link.label}<span>›</span></a>)}
      </div>
    </div>
  );
}
