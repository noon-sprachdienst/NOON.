// Legal details of the business, used by the Impressum (modal and /impressum/ page)
// and by the prerendered legal pages. Plain data so the Node prerender script can import it.
export const LEGAL_INFO = {
  company: 'Noon Dolmetscher & Übersetzungsbüro',
  owner: 'Mohamed Elsharkawei',
  street: 'Rosenplatz 17',
  postalCity: '49074 Osnabrück',
  country: 'Deutschland',
  phone: '+49 160 956 27 666',
  email: 'info@noon-sprachdienst.de',
  vatId: 'DE344454178',
  offices: [
    'Friedrichstraße 15, 70174 Stuttgart',
    'Potsdamer Str. 63, 10785 Berlin',
    'Teichstraße 24, 33615 Bielefeld',
    'Richard-Wagner-Straße 13, 55118 Mainz',
    'Bothwellstraße 25, 24143 Kiel',
  ],
};

// German paths of the standalone legal pages (the content is the same as in the footer modal).
export const LEGAL_PAGES = {
  '/impressum': { key: 'impressum', title: 'Impressum | Noon Übersetzungsbüro', description: 'Impressum von Noon Dolmetscher & Übersetzungsbüro: Anbieter, Inhaber, Anschrift, Kontakt und Umsatzsteuer-Identifikationsnummer.' },
  '/datenschutz': { key: 'datenschutz', title: 'Datenschutzerklärung | Noon Übersetzungsbüro', description: 'Datenschutzerklärung von Noon Dolmetscher & Übersetzungsbüro: welche Daten wir verarbeiten, wofür und welche Rechte Sie haben.' },
  '/agb': { key: 'agb', title: 'AGB | Noon Übersetzungsbüro', description: 'Allgemeine Geschäftsbedingungen von Noon Dolmetscher & Übersetzungsbüro für Übersetzungen und Dolmetscherleistungen.' },
};
