import HowContact from '../components/HowContact.jsx';
import { CONTACT } from '../config/contact.js';
import { LOCATIONS, SEO_PAGES } from '../data/seoPages.js';
import { getServiceNavigation } from '../data/serviceContent.js';
import { RichServicePanel, VISUAL_COPY } from '../components/Services.jsx';

const UI = {
  de: {
    home: 'Startseite',
    services: 'Leistungen',
    locations: 'Standorte',
    quote: 'Kostenloses Angebot anfordern',
    reachable: 'Persönlich erreichbar.',
    hours: 'Mo – Sa · 24/7 telefonisch erreichbar',
    faq: 'Häufige Fragen',
    mapAlt: 'Karte des Standorts',
    hubLink: 'Alle Fachübersetzungen im Überblick',
  },
  en: {
    home: 'Home',
    services: 'Services',
    locations: 'Locations',
    quote: 'Request a free quote',
    reachable: 'Personally available.',
    hours: 'Mon – Sat · reachable by phone 24/7',
    faq: 'Frequently asked questions',
    mapAlt: 'Map of the branch',
    hubLink: 'See all specialist translation services',
  },
  ar: {
    home: 'الرئيسية',
    services: 'الخدمات',
    locations: 'الفروع',
    quote: 'اطلب عرضا مجانيا',
    reachable: 'تواصل شخصي وسريع.',
    hours: 'الإثنين – السبت · متاحون هاتفيا 24/7',
    faq: 'أسئلة شائعة',
    mapAlt: 'خريطة الفرع',
    hubLink: 'عرض جميع الترجمات المتخصصة',
  },
  tr: {
    home: 'Ana sayfa',
    services: 'Hizmetler',
    locations: 'Şubeler',
    quote: 'Ücretsiz teklif iste',
    reachable: 'Kişisel destek.',
    hours: 'Pzt – Cmt · telefonla 24/7 ulaşılabilir',
    faq: 'Sık sorulan sorular',
    mapAlt: 'Şube haritası',
    hubLink: 'Tüm uzman çevirileri görüntüle',
  },
  ru: {
    home: 'Главная',
    services: 'Услуги',
    locations: 'Филиалы',
    quote: 'Отправить запрос',
    reachable: 'Личная поддержка.',
    hours: 'Пн – Сб · по телефону 24/7',
    faq: 'Частые вопросы',
    mapAlt: 'Карта филиала',
    hubLink: 'Все профильные переводы',
  },
  fr: {
    home: 'Accueil',
    services: 'Services',
    locations: 'Agences',
    quote: 'Demander un devis gratuit',
    reachable: 'Conseil personnalisé.',
    hours: 'Lun – Sam · joignables par téléphone 24/7',
    faq: 'Questions fréquentes',
    mapAlt: 'Carte de l’agence',
    hubLink: 'Voir toutes les traductions spécialisées',
  },
  uk: {
    home: 'Головна',
    services: 'Послуги',
    locations: 'Філії',
    quote: 'Надіслати запит',
    reachable: 'Особиста підтримка.',
    hours: 'Пн – Сб · телефоном 24/7',
    faq: 'Поширені питання',
    mapAlt: 'Карта філії',
    hubLink: 'Переглянути всі фахові переклади',
  },
};

export default function SeoLanding({ page }) {
  const isLocation = page.kind === 'location';
  const copy = UI[page.lang] || UI.de;
  const relatedServices = getServiceNavigation(page.lang)
    .map((service) => SEO_PAGES.find((item) => (
      item.kind === 'service'
      && item.lang === page.lang
      && item.serviceNavId === service.id
    )))
    .filter(Boolean);
  const getLocationHref = (slug) => (
    SEO_PAGES.find((item) => item.kind === 'location' && item.lang === page.lang && item.location?.slug === slug)?.path
    || `/de/standorte/${slug}`
  );
  const servicesHref = page.lang === 'de' ? '/leistungen' : `/${page.lang}/leistungen`;
  const activeService = !isLocation
    ? getServiceNavigation(page.lang).find((item) => item.id === page.serviceNavId)
    : null;
  const isSpecialistDetail = !isLocation && page.serviceGroup === 'specialist' && !!activeService;

  return (
    <div className="seo-page">
      <section className="seo-hero">
        <div className="container seo-hero-grid">
          <div>
            <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
              <a href="/">{copy.home}</a>
              <span>/</span>
              <a href={isLocation ? '/#branches' : servicesHref}>{isLocation ? copy.locations : copy.services}</a>
              <span>/</span>
              <strong>{page.eyebrow}</strong>
            </nav>
            <div className="seo-eyebrow">{page.eyebrow}</div>
            <h1>{page.title}</h1>
            <p>{page.intro}</p>
            <div className="seo-actions">
              <a href="#contact" className="btn btn-primary">{page.cta || copy.quote} <span className="arrow">→</span></a>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">WhatsApp</a>
            </div>
          </div>
          <aside className="seo-quick-card">
            <span>NOON. Sprachdienst</span>
            <h2>{copy.reachable}</h2>
            <a href={CONTACT.phones[0].href}>{CONTACT.phones[0].label}</a>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <small>{copy.hours}</small>
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
            {isSpecialistDetail ? (
              <>
                <RichServicePanel
                  active={activeService}
                  visualCopy={VISUAL_COPY[page.lang] || VISUAL_COPY.de}
                  lang={page.lang}
                />
                <div className="seo-hub-link">
                  <a href={servicesHref}>{copy.hubLink} <span className="arrow">→</span></a>
                </div>
              </>
            ) : (
              page.sections.map(([title, text]) => (
                <section className="seo-copy-block" key={title}>
                  <h2>{title}</h2>
                  <p>{text}</p>
                </section>
              ))
            )}
            {!!page.faqs?.length && (
              <section className="seo-copy-block">
                <h2>{copy.faq}</h2>
                <div className="seo-faq-list">
                  {page.faqs.map(([question, answer]) => (
                    <details key={question}>
                      <summary>{question}</summary>
                      <p>{answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </article>
          <aside className="seo-related">
            {isLocation && !page.serviceArea && (
              <>
                <img src={`/assets/maps/${page.location.image}`} alt={`${copy.mapAlt} ${page.location.city}`} loading="lazy" decoding="async" />
                <h3>{page.location.street}</h3>
                <p>{page.location.postalCode} {page.location.city}</p>
              </>
            )}
            <h3>{isLocation ? copy.services : copy.locations}</h3>
            <div className="seo-link-list">
              {(isLocation ? relatedServices : LOCATIONS).map((item) => {
                const href = isLocation ? item.path : getLocationHref(item.slug);
                const label = isLocation ? (item.serviceType || item.eyebrow) : item.city;
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
