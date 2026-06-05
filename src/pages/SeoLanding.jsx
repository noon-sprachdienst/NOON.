import HowContact from '../components/HowContact.jsx';
import { CONTACT } from '../config/contact.js';
import { LOCATIONS, SEO_PAGES } from '../data/seoPages.js';

export default function SeoLanding({ page }) {
  const isLocation = page.kind === 'location';
  const relatedServices = SEO_PAGES.filter((item) => item.kind === 'service');

  return (
    <div className="seo-page">
      <section className="seo-hero">
        <div className="container seo-hero-grid">
          <div>
            <nav className="seo-breadcrumbs" aria-label="Brotkrümelnavigation">
              <a href="/">Startseite</a>
              <span>/</span>
              <a href={isLocation ? '/#branches' : '/leistungen'}>{isLocation ? 'Standorte' : 'Leistungen'}</a>
              <span>/</span>
              <strong>{page.eyebrow}</strong>
            </nav>
            <div className="seo-eyebrow">{page.eyebrow}</div>
            <h1>{page.title}</h1>
            <p>{page.intro}</p>
            <div className="seo-actions">
              <a href="#contact" className="btn btn-primary">Kostenloses Angebot anfordern <span className="arrow">→</span></a>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">WhatsApp</a>
            </div>
          </div>
          <aside className="seo-quick-card">
            <span>NOON. Sprachdienst</span>
            <h2>Persönlich erreichbar.</h2>
            <a href={CONTACT.phones[0].href}>{CONTACT.phones[0].label}</a>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <small>Mo – Sa · 10:00 – 19:00 Uhr</small>
          </aside>
        </div>
      </section>

      <section className="seo-highlight-band" aria-label="Vorteile">
        <div className="container seo-highlights">
          {page.highlights.map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className="seo-content">
        <div className="container seo-content-grid">
          <article>
            {page.sections.map(([title, text]) => (
              <section className="seo-copy-block" key={title}>
                <h2>{title}</h2>
                <p>{text}</p>
              </section>
            ))}
          </article>
          <aside className="seo-related">
            {isLocation && (
              <>
                <img src={`/assets/maps/${page.location.image}`} alt={`Karte des Standorts ${page.location.city}`} loading="lazy" decoding="async" />
                <h3>{page.location.street}</h3>
                <p>{page.location.postalCode} {page.location.city}</p>
              </>
            )}
            <h3>{isLocation ? 'Leistungen' : 'Unsere Standorte'}</h3>
            <div className="seo-link-list">
              {(isLocation ? relatedServices : LOCATIONS).map((item) => {
                const href = isLocation ? item.path : `/de/standorte/${item.slug}`;
                const label = isLocation ? item.eyebrow : item.city;
                return <a key={href} href={href}>{label}<span>›</span></a>;
              })}
            </div>
          </aside>
        </div>
      </section>

      <HowContact />
    </div>
  );
}
