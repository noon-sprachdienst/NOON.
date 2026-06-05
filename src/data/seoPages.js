export const SITE_URL = 'https://noon-sprachdienst.de';

export const COMPANY = {
  name: 'NOON. Sprachdienst',
  email: 'info@noon-sprachdienst.de',
  telephone: '+4916095627666',
  hours: 'Montag bis Samstag, 10:00 bis 19:00 Uhr',
};

export const LOCATIONS = [
  { slug: 'osnabrueck', city: 'Osnabrück', street: 'Möserstr. 14', postalCode: '49074', image: 'osnabrueck.jpg', hq: true },
  { slug: 'stuttgart', city: 'Stuttgart', street: 'Königstr. 82', postalCode: '70173', image: 'stuttgart.jpg' },
  { slug: 'berlin', city: 'Berlin', street: 'Friedrichstr. 191', postalCode: '10117', image: 'berlin.jpg' },
  { slug: 'bielefeld', city: 'Bielefeld', street: 'Niederwall 21', postalCode: '33602', image: 'bielefeld.jpg' },
  { slug: 'mainz', city: 'Mainz', street: 'Schillerplatz 7', postalCode: '55116', image: 'mainz.jpg' },
  { slug: 'kiel', city: 'Kiel', street: 'Holstenstr. 64', postalCode: '24103', image: 'kiel.jpg' },
];

const servicePages = [
  {
    path: '/de/beglaubigte-uebersetzungen',
    kind: 'service',
    eyebrow: 'Beglaubigte Übersetzungen',
    title: 'Beglaubigte Übersetzungen für Behörden, Gerichte und Standesämter.',
    description: 'Beglaubigte Übersetzungen von beeidigten Übersetzern: Urkunden, Zeugnisse, Führerscheine und amtliche Dokumente. Digital anfragen oder in sechs deutschen Städten abholen.',
    intro: 'Für offizielle Zwecke erhalten Sie eine vollständige, gestempelte Übersetzung von öffentlich bestellten und beeidigten Übersetzerinnen und Übersetzern. Senden Sie uns ein gut lesbares Foto oder einen Scan. Wir prüfen Ihre Unterlagen und erstellen ein transparentes Festpreisangebot.',
    highlights: ['Amtlich anerkannt', 'Express-Service möglich', 'PDF, Post oder Abholung'],
    sections: [
      ['Welche Dokumente übersetzen wir?', 'Wir übersetzen unter anderem Geburts- und Heiratsurkunden, Führerscheine, Zeugnisse, Diplome, Meldebescheinigungen, Gerichtsbeschlüsse, notarielle Unterlagen und weitere Dokumente für deutsche Behörden.'],
      ['Persönlich oder digital anfragen', 'Ihre Anfrage können Sie bequem per WhatsApp, E-Mail oder Webformular senden. Das Original wird nur benötigt, wenn die empfangende Stelle es ausdrücklich verlangt. Die fertige Übersetzung erhalten Sie digital, per Post oder zur Abholung in einem unserer Standorte.'],
      ['Beeidigte Fachkräfte und klare Abläufe', 'Wir informieren Sie vorab über Preis, Bearbeitungszeit und Lieferweg. Für eilige Fälle prüfen wir eine Express-Bearbeitung innerhalb von 24 Stunden.'],
    ],
    serviceType: 'Beglaubigte Übersetzung',
  },
  {
    path: '/de/dolmetschen',
    kind: 'service',
    eyebrow: 'Dolmetschen',
    title: 'Professionelle Dolmetscher für Termine in ganz Deutschland.',
    description: 'Dolmetscher für Behörden, Standesamt, Notar, Gerichte, Kliniken und Unternehmen. Vor Ort, per Video oder telefonisch in über 190 Sprachen.',
    intro: 'Ob Behördentermin, Trauung, notarielle Beurkundung oder Geschäftsgespräch: Wir vermitteln passende Dolmetscherinnen und Dolmetscher für Ihren Anlass und Ihre Sprachkombination.',
    highlights: ['Vor Ort oder online', 'Beeidigte Dolmetscher', 'Über 190 Sprachen'],
    sections: [
      ['Dolmetschen passend zu Ihrem Termin', 'Unser Netzwerk unterstützt Sie bei Terminen mit Behörden, Gerichten, Notariaten, Standesämtern, Kliniken und Unternehmen. Teilen Sie uns Ort, Datum, Sprache und Anlass mit.'],
      ['Auch kurzfristig erreichbar', 'Für viele Sprachen prüfen wir kurzfristige Verfügbarkeit. Video- und Telefondolmetschen sind eine flexible Lösung, wenn schnelle Unterstützung benötigt wird oder eine Anreise nicht sinnvoll ist.'],
      ['Spezialisierte Dolmetscharten', 'Wir organisieren Simultan-, Verhandlungs-, Video-, Telefon-, Standesamt-, Notar- und beeidigte Dolmetscher. Für Konferenzen planen wir auf Wunsch auch geeignete Teams und Technik.'],
    ],
    serviceType: 'Dolmetschen',
  },
  {
    path: '/de/fachuebersetzungen',
    kind: 'service',
    eyebrow: 'Fachübersetzungen',
    title: 'Fachübersetzungen mit präziser Terminologie.',
    description: 'Professionelle Fachübersetzungen für Medizin, Recht, Wirtschaft, Technik, Pharma, IT, Chemie und Industrie. Terminologisch konsistent und fachlich geprüft.',
    intro: 'Fachtexte benötigen sprachliche Sicherheit und Verständnis für den jeweiligen Einsatzbereich. Unsere spezialisierten Übersetzer übertragen Terminologie, Ton und Inhalt verlässlich in die gewünschte Sprache.',
    highlights: ['ISO 17100', 'Vier-Augen-Prinzip', '75+ Sprachen'],
    sections: [
      ['Fachwissen für anspruchsvolle Inhalte', 'Wir bearbeiten Texte aus Medizin und Dentalmedizin, Recht, Wirtschaft und Finanzen, Ingenieurwesen, Pharmazeutik, IT und Software, Chemie und Biowissenschaften sowie Industrie und Produktion.'],
      ['Passend für Zielgruppe und Einsatzbereich', 'Eine gute Fachübersetzung berücksichtigt Fachsprache, Normen, Zielgruppe und Verwendungszweck. Auf Wunsch erstellen wir Terminologielisten für wiederkehrende Inhalte und mehrsprachige Projekte.'],
      ['Kostenlose Anfrage mit klarer Einschätzung', 'Senden Sie uns Ihre Unterlagen oder eine kurze Projektbeschreibung. Sie erhalten Informationen zu Preis, Lieferzeit und Ablauf, bevor Sie sich entscheiden.'],
    ],
    serviceType: 'Fachübersetzung',
  },
];

const locationIntros = {
  osnabrueck: 'Unser Hauptstandort in Osnabrück unterstützt Privatkunden, Unternehmen und Einrichtungen bei beglaubigten Übersetzungen, Fachübersetzungen und der Organisation geeigneter Dolmetscher.',
  stuttgart: 'Unser Standort in Stuttgart ist Ihre Anlaufstelle für beglaubigte Übersetzungen, Fachübersetzungen und Dolmetschdienste für private, behördliche und geschäftliche Anliegen.',
  berlin: 'In Berlin unterstützen wir Sie bei amtlichen Übersetzungen, mehrsprachigen Unterlagen und der Vermittlung passender Dolmetscher für wichtige Termine.',
  bielefeld: 'Unser Standort in Bielefeld bietet persönliche Unterstützung für beglaubigte Dokumente, Fachtexte und Dolmetscheranfragen mit transparentem Ablauf.',
  mainz: 'In Mainz beraten wir Sie zu beglaubigten Übersetzungen, professionellen Fachübersetzungen und Dolmetschdiensten für Behörden, Unternehmen und private Termine.',
  kiel: 'Unser Standort in Kiel unterstützt Sie zuverlässig bei amtlich anerkannten Übersetzungen, Fachtexten und der Organisation von Dolmetschern.',
};

const locationPages = LOCATIONS.map((location) => ({
  path: `/de/standorte/${location.slug}`,
  kind: 'location',
  location,
  eyebrow: `Übersetzungsbüro ${location.city}`,
  title: `Beglaubigte Übersetzungen und Dolmetschen in ${location.city}.`,
  description: `NOON. Sprachdienst in ${location.city}: beglaubigte Übersetzungen, Fachübersetzungen und Dolmetscher. ${location.street}, ${location.postalCode} ${location.city}.`,
  intro: locationIntros[location.slug],
  highlights: ['Beglaubigte Übersetzungen', 'Dolmetschdienste', 'Persönlich erreichbar'],
  sections: [
    [`Übersetzungsbüro in ${location.city}`, `Besuchen Sie uns nach vorheriger Terminvereinbarung in der ${location.street}, ${location.postalCode} ${location.city}. Alternativ senden Sie Ihre Unterlagen digital per WhatsApp, E-Mail oder Webformular.`],
    ['Beglaubigte Übersetzungen für offizielle Zwecke', 'Wir bearbeiten Urkunden, Zeugnisse, Führerscheine und weitere Dokumente für Behörden, Standesämter, Gerichte, Hochschulen und Notariate. Sie erhalten vorab ein transparentes Angebot.'],
    [`Dolmetscher in ${location.city} anfragen`, `Für Behördentermine, Trauungen, notarielle Angelegenheiten, medizinische Termine und Geschäftsgespräche prüfen wir passende Dolmetscher in ${location.city} und Umgebung.`],
  ],
}));

export const SEO_PAGES = [...servicePages, ...locationPages];
export const PRICE_PAGE = {
  path: '/preise',
  kind: 'service',
  eyebrow: 'Preise',
  title: 'Startpreise für Übersetzungen und Dolmetschen.',
  description: 'Startpreise für beglaubigte Übersetzungen, Fachübersetzungen und Dolmetschen. Kostenloses Festpreisangebot für Ihren individuellen Auftrag anfordern.',
  intro: 'Die angezeigten Preise sind Einstiegspreise für Standardfälle. Der genaue Preis hängt von Dokumenttyp, Umfang, Sprachkombination und gewünschter Lieferzeit ab. Sie erhalten vorab ein kostenloses und transparentes Angebot.',
  highlights: ['Kostenlose Anfrage', 'Transparente Kalkulation', 'Festpreis vor Auftrag'],
  sections: [
    ['Beglaubigte Übersetzungen', 'Standarddokumente beginnen ab 39 Euro pro Dokument. Senden Sie ein Foto oder einen Scan, damit wir Aufwand, Lieferzeit und Preis für Ihre Unterlagen verbindlich einschätzen können.'],
    ['Fachübersetzungen', 'Fachtexte beginnen ab 0,12 Euro pro Wort. Der endgültige Preis richtet sich nach Fachgebiet, Umfang, Sprachkombination und gewünschter Bearbeitungszeit.'],
    ['Dolmetschen', 'Dolmetschdienste beginnen ab 85 Euro pro Stunde. Für ein passendes Angebot benötigen wir Termin, Ort, Sprachkombination und Anlass.'],
  ],
  serviceType: 'Sprachdienstleistungen',
};
export const SEO_PATHS = SEO_PAGES.map((page) => page.path);

export function getSeoPage(path) {
  const normalized = path.replace(/\/+$/, '') || '/';
  return SEO_PAGES.find((page) => page.path === normalized);
}

export function getCanonicalUrl(path) {
  return `${SITE_URL}${path === '/' ? '/' : `${path}/`}`;
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${SITE_URL}/#organization`,
    name: COMPANY.name,
    url: SITE_URL,
    email: COMPANY.email,
    telephone: COMPANY.telephone,
    foundingDate: '2009',
    areaServed: 'DE',
    availableLanguage: ['de', 'en', 'ar', 'tr', 'ru', 'fr', 'uk'],
  };
}

export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: COMPANY.name,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'de-DE',
  };
}

export function getPageSchema(page) {
  const common = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${getCanonicalUrl(page.path)}#webpage`,
    url: getCanonicalUrl(page.path),
    name: page.title,
    description: page.description,
    inLanguage: 'de-DE',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: page.kind === 'location' ? 'Standorte' : 'Leistungen', item: page.kind === 'location' ? `${SITE_URL}/#branches` : `${SITE_URL}/leistungen` },
      { '@type': 'ListItem', position: 3, name: page.eyebrow, item: getCanonicalUrl(page.path) },
    ],
  };

  if (page.kind === 'location') {
    return [common, breadcrumb, {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${getCanonicalUrl(page.path)}#branch`,
      name: `${COMPANY.name} ${page.location.city}`,
      url: getCanonicalUrl(page.path),
      email: COMPANY.email,
      telephone: COMPANY.telephone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: page.location.street,
        postalCode: page.location.postalCode,
        addressLocality: page.location.city,
        addressCountry: 'DE',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '19:00',
      },
      parentOrganization: { '@id': `${SITE_URL}/#organization` },
    }];
  }

  return [common, breadcrumb, {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.serviceType,
    description: page.description,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: 'DE',
    serviceType: page.serviceType,
  }];
}
