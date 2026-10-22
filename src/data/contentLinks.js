// Shared building blocks for the hand-written German landing pages
// (office pages, service-area cities, documents, interpreting, authority pages).
// Only client-confirmed facts: ermächtigte Übersetzer and beeidigte Dolmetscher for
// every language, Arabic dialects, Farsi and Dari, 2–3 Werktage standard,
// Express the same day within about 4–5 hours, prices from the price page.
// Sections are [heading, text, links?]; text lines starting with "• " render as a list.

export const DOCUMENT_LINKS = [
  { href: '/de/geburtsurkunde-uebersetzung/', label: 'Geburtsurkunde übersetzen' },
  { href: '/de/heiratsurkunde-uebersetzung/', label: 'Heiratsurkunde übersetzen' },
  { href: '/de/fuehrerschein-uebersetzung/', label: 'Führerschein übersetzen' },
  { href: '/de/zeugnis-uebersetzung/', label: 'Zeugnisse übersetzen' },
  { href: '/de/beglaubigte-uebersetzung-standesamt/', label: 'Übersetzungen fürs Standesamt' },
  { href: '/de/beglaubigte-uebersetzung-auslaenderbehoerde/', label: 'Übersetzungen für die Ausländerbehörde' },
];

export const LANGUAGE_LINKS = [
  { href: '/de/sprachen/arabisch/', label: 'Arabisch' },
  { href: '/de/sprachen/tuerkisch/', label: 'Türkisch' },
  { href: '/de/sprachen/ukrainisch/', label: 'Ukrainisch' },
  { href: '/de/sprachen/persisch/', label: 'Persisch' },
  { href: '/de/sprachen/englisch/', label: 'Englisch' },
  { href: '/de/sprachen/franzoesisch/', label: 'Französisch' },
  { href: '/de/sprachen/rumaenisch/', label: 'Rumänisch' },
  { href: '/de/sprachen/russisch/', label: 'Russisch' },
  { href: '/de/sprachen/', label: 'Alle Sprachen' },
];

export const INTERPRETER_LINKS = [
  { href: '/de/gerichtsdolmetscher/', label: 'Gerichtsdolmetscher' },
  { href: '/de/dolmetschen/standesamt-dolmetscher/', label: 'Dolmetscher fürs Standesamt' },
  { href: '/de/dolmetschen/', label: 'Dolmetschdienste im Überblick' },
];

export const OFFICE_LINKS = [
  { href: '/de/standorte/osnabrueck/', label: 'Übersetzungsbüro Osnabrück' },
  { href: '/de/standorte/stuttgart/', label: 'Übersetzungsbüro Stuttgart' },
  { href: '/de/standorte/berlin/', label: 'Übersetzungsbüro Berlin' },
  { href: '/de/standorte/bielefeld/', label: 'Übersetzungsbüro Bielefeld' },
  { href: '/de/standorte/mainz/', label: 'Übersetzungsbüro Mainz' },
  { href: '/de/standorte/kiel/', label: 'Übersetzungsbüro Kiel' },
];

export const DELIVERY_SECTION = [
  'Bearbeitungszeit und Ablauf',
  'Standard: 2–3 Werktage.\nExpress: am selben Tag, in der Regel innerhalb von 4–5 Stunden.\n\n1. Dokument senden – Foto oder Scan per WhatsApp, E-Mail oder Webformular.\n2. Festpreis erhalten – Sie bekommen vorab ein kostenloses Angebot.\n3. Übersetzung erhalten – als PDF per E-Mail und auf Wunsch zusätzlich per Post.',
  [{ href: '/preise/', label: 'Preise ansehen' }, { href: '/de/express-uebersetzung/', label: 'Express-Übersetzung' }],
];

export const LANGUAGES_TEXT = 'Unsere ermächtigten Übersetzer und Dolmetscher arbeiten unter anderem in Arabisch (auch syrischer, sudanesischer, libyscher, marokkanischer, algerischer und ägyptischer Dialekt), Türkisch, Ukrainisch, Persisch (Farsi und Dari), Englisch, Französisch, Rumänisch und Russisch – jeweils ins Deutsche und aus dem Deutschen.';

export const FAQ_DIGITAL = ['Kann ich Dokumente auch digital senden?', 'Ja. Ein gut lesbares Foto oder ein Scan per WhatsApp, E-Mail oder Formular reicht für das Angebot und meist auch für die Übersetzung.'];
export const FAQ_SPEED = ['Wie schnell erhalte ich meine beglaubigte Übersetzung?', 'In der Regel innerhalb von 2–3 Werktagen. Im Express-Service ist die Übersetzung am selben Tag fertig, meist innerhalb von 4–5 Stunden.'];
export const FAQ_PRICE = ['Was kostet eine beglaubigte Übersetzung?', 'Standarddokumente beginnen ab 39 Euro pro Dokument. Den genauen Festpreis nennen wir Ihnen vorab und kostenlos, sobald wir Ihr Dokument gesehen haben.'];
