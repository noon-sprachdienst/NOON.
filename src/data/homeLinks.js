// "Häufig gesucht" block on the German homepage (SEO plan Nov 2026): visible links from the
// strongest page of the site to the most requested document pages and the city pages.
// Kept as a small static list so the homepage bundle does not pull in the full SEO data.
const doc = (slug, label) => ({ href: `/de/${slug}/`, label });
const city = (slug, name) => ({ href: `/de/standorte/${slug}/`, label: `Übersetzungsbüro ${name}` });

export const HOME_DOCUMENT_LINKS = [
  doc('geburtsurkunde-uebersetzung', 'Geburtsurkunde übersetzen'),
  doc('heiratsurkunde-uebersetzung', 'Heiratsurkunde übersetzen'),
  doc('scheidungsurteil-uebersetzung', 'Scheidungsurteil übersetzen'),
  doc('ledigkeitsbescheinigung-uebersetzung', 'Ledigkeitsbescheinigung übersetzen'),
  doc('fuehrerschein-uebersetzung', 'Führerschein übersetzen'),
  doc('zeugnis-uebersetzung', 'Zeugnis und Abitur übersetzen'),
  doc('diplom-uebersetzung', 'Diplom und Bachelor übersetzen'),
  doc('arbeitszeugnis-uebersetzung', 'Arbeitszeugnis übersetzen'),
  doc('fuehrungszeugnis-uebersetzung', 'Führungszeugnis übersetzen'),
  doc('reisepass-uebersetzung', 'Reisepass übersetzen'),
  doc('finanzdokumente-uebersetzung', 'Kontoauszug und Gehaltsabrechnung'),
  doc('medizinische-dokumente-uebersetzung', 'Arztbrief und Befund übersetzen'),
  { href: '/de/beglaubigte-uebersetzungen/', label: 'Alle beglaubigten Übersetzungen' },
];

export const HOME_CITY_LINKS = [
  city('berlin', 'Berlin'),
  city('stuttgart', 'Stuttgart'),
  city('muenchen', 'München'),
  city('frankfurt-am-main', 'Frankfurt'),
  city('koeln', 'Köln'),
  city('hamburg', 'Hamburg'),
  city('duesseldorf', 'Düsseldorf'),
  city('dortmund', 'Dortmund'),
  city('nuernberg', 'Nürnberg'),
  city('bremen', 'Bremen'),
  city('hannover', 'Hannover'),
  city('leipzig', 'Leipzig'),
  city('essen', 'Essen'),
];
