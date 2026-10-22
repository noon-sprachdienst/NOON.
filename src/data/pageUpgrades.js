// Hand-written German copy that replaces the short generic text of existing pages
// (PAGE_UPGRADES, keyed by page path) plus new German pages built around search terms
// that had no page of their own (NEW_PAGES_DE). Keywords come from Search Console
// (6 months to 08.10.2026). Facts: see contentLinks.js; authorities are named in
// general terms only, the requirements are always set by the receiving office.
import {
  DELIVERY_SECTION, DOCUMENT_LINKS, FAQ_DIGITAL, FAQ_PRICE, FAQ_SPEED,
  INTERPRETER_LINKS, LANGUAGE_LINKS, LANGUAGES_TEXT, OFFICE_LINKS,
} from './contentLinks.js';

const UPDATED = '2026-10-22';
const CERTIFIED_LINK = { href: '/de/beglaubigte-uebersetzungen/', label: 'Beglaubigte Übersetzungen im Überblick' };
const COURT_LINK = { href: '/de/gerichtsdolmetscher/', label: 'Gerichtsdolmetscher' };
const STANDESAMT_LINK = { href: '/de/beglaubigte-uebersetzung-standesamt/', label: 'Übersetzungen fürs Standesamt' };
const AUSLAENDER_LINK = { href: '/de/beglaubigte-uebersetzung-auslaenderbehoerde/', label: 'Übersetzungen für die Ausländerbehörde' };
const EXPRESS_LINK = { href: '/de/express-uebersetzung/', label: 'Express-Übersetzung am selben Tag' };
const MORE_DOCUMENT_LINKS = [
  { href: '/de/scheidungsurteil-uebersetzung/', label: 'Scheidungsurteil übersetzen' },
  { href: '/de/ledigkeitsbescheinigung-uebersetzung/', label: 'Ledigkeitsbescheinigung übersetzen' },
  { href: '/de/fuehrungszeugnis-uebersetzung/', label: 'Führungszeugnis übersetzen' },
  { href: '/de/vollmacht-uebersetzung/', label: 'Vollmacht übersetzen' },
  { href: '/de/arbeitszeugnis-uebersetzung/', label: 'Arbeitszeugnis übersetzen' },
];

// ---------------------------------------------------------------- service-area cities
// No office in these cities: no address, no opening hours – digital handling and
// interpreters arranged on site, by video or by phone.
function cityPage({ city, region, intro, description, authorities, focus, nearby, faqs }) {
  return {
    updated: UPDATED,
    description,
    intro,
    highlights: ['Ermächtigte Übersetzer', 'Komplett digital', 'Express am selben Tag'],
    sections: [
      [`Beglaubigte Übersetzungen für ${city}`, `Für ${city} arbeiten wir vollständig digital: Sie senden uns Ihr Dokument als Foto oder Scan per WhatsApp, E-Mail oder Webformular, erhalten vorab einen Festpreis und bekommen die beglaubigte Übersetzung als PDF und auf Wunsch per Post. Ein Besuch in einem unserer Büros ist nicht nötig. Die Übersetzungen fertigen in Deutschland ermächtigte Übersetzer an – sie werden von Behörden, Gerichten und Hochschulen in ${city}, in ${region} und bundesweit akzeptiert.`,
        [...DOCUMENT_LINKS, CERTIFIED_LINK]],
      [`Für diese Stellen in ${city} übersetzen wir häufig`, `${authorities}\n\nWelche Dokumente im Einzelfall nötig sind, legt die jeweilige Stelle fest. Senden Sie uns gern deren Liste – wir nennen Ihnen vorab einen Festpreis.`],
      focus,
      [`Dolmetscher für Termine in ${city}`, `Für Termine bei Behörde, Standesamt, Notar oder Gericht in ${city} organisieren wir passende Dolmetscher – vor Ort oder, wenn es schnell gehen muss, per Video oder Telefon. Für Gerichtstermine setzen wir auf Wunsch beeidigte Dolmetscher ein. Bitte nennen Sie uns Datum, Uhrzeit, Ort, Sprache und Anlass.`,
        INTERPRETER_LINKS],
      ['Sprachen', LANGUAGES_TEXT, LANGUAGE_LINKS],
      DELIVERY_SECTION,
      ['Unsere Büros', `Persönliche Termine bieten wir nach Vereinbarung in unseren Büros an. ${nearby}`, OFFICE_LINKS],
    ],
    faqs: [
      [`Werden Ihre Übersetzungen von Behörden in ${city} anerkannt?`, `Ja. Beglaubigte Übersetzungen von in Deutschland ermächtigten Übersetzern werden von Behörden, Standesämtern, Gerichten und Hochschulen in ${city} und bundesweit akzeptiert.`],
      [`Muss ich für die Übersetzung in ein Büro kommen?`, 'Nein. Der gesamte Ablauf – Anfrage, Angebot, Übersetzung und Versand – funktioniert online. Die Übersetzung erhalten Sie als PDF und auf Wunsch per Post.'],
      ...faqs,
      FAQ_SPEED,
      FAQ_PRICE,
    ],
  };
}

const CITIES = {
  '/de/standorte/frankfurt-am-main': cityPage({
    city: 'Frankfurt am Main',
    region: 'Hessen',
    description: 'Übersetzungsbüro Frankfurt: beglaubigte Übersetzungen und beeidigte Dolmetscher für Arabisch, Türkisch, Französisch und alle Sprachen – Express möglich.',
    intro: 'Beglaubigte Übersetzungen und Dolmetscher für Frankfurt am Main: Geburtsurkunden, Heiratsurkunden und Zeugnisse übersetzen unsere ermächtigten Übersetzer komplett digital – für Dolmetschtermine in Frankfurt organisieren wir beeidigte Dolmetscher, unter anderem für Arabisch, Türkisch und Französisch.',
    authorities: '• Ausländerbehörde Frankfurt: Aufenthaltstitel, Familiennachzug und Einbürgerung\n• Standesämter: Anmeldung der Eheschließung, Geburtsbeurkundung und Namenserklärungen\n• Goethe-Universität und Frankfurt University of Applied Sciences: Zeugnisse und Diplome für Bewerbung und Anerkennung\n• Amtsgericht, Landgericht und Oberlandesgericht Frankfurt: Urteile, Beschlüsse und Vollmachten\n• Unternehmen und Banken: Verträge, Handelsregisterauszüge und Geschäftsunterlagen',
    focus: ['Arabisch-, Türkisch- und Französisch-Dolmetscher für Frankfurt', 'Besonders oft fragen Kundinnen und Kunden aus Frankfurt nach Arabisch-Dolmetschern – unsere Dolmetscher decken den syrischen, sudanesischen, libyschen, marokkanischen, algerischen und ägyptischen Dialekt ab. Ebenso häufig sind Türkisch, Französisch und Persisch (Farsi und Dari). Für Gerichtstermine und Beurkundungen stellen wir beeidigte bzw. vereidigte Dolmetscher.',
      [{ href: '/de/sprachen/arabisch/', label: 'Arabisch Dolmetscher' }, { href: '/de/sprachen/tuerkisch/', label: 'Türkisch Dolmetscher' }, { href: '/de/sprachen/franzoesisch/', label: 'Französisch Dolmetscher' }, COURT_LINK]],
    nearby: 'Unser nächstgelegenes Büro ist Mainz in der Richard-Wagner-Straße 13.',
    faqs: [['Bieten Sie beeidigte Dolmetscher für Arabisch in Frankfurt an?', 'Ja. Wir organisieren beeidigte Dolmetscher für Arabisch – einschließlich der gängigen Dialekte – sowie für alle weiteren Sprachen, etwa für Gericht, Standesamt oder Notar.']],
  }),
  '/de/standorte/dortmund': cityPage({
    city: 'Dortmund',
    region: 'Nordrhein-Westfalen',
    description: 'Übersetzungen Dortmund: beglaubigte Übersetzungen, Fachübersetzungen und Dolmetscher für Dortmund und das Ruhrgebiet – digital, Express am selben Tag.',
    intro: 'Beglaubigte Übersetzungen, Fachübersetzungen und Dolmetscher für Dortmund und das Ruhrgebiet: Urkunden, Zeugnisse und Verträge übersetzen unsere ermächtigten Übersetzer komplett digital, Dolmetscher für Ihre Termine in Dortmund organisieren wir vor Ort, per Video oder Telefon.',
    authorities: '• Ausländerbehörde der Stadt Dortmund: Aufenthaltstitel, Familiennachzug und Einbürgerung\n• Standesamt Dortmund: Anmeldung der Eheschließung, Geburtsbeurkundung\n• TU Dortmund und Fachhochschule Dortmund: Zeugnisse und Diplome\n• Amtsgericht und Landgericht Dortmund: Urteile, Beschlüsse und Vollmachten\n• Jobcenter und Familienkasse: Nachweise und Urkunden',
    focus: ['Fachübersetzungen für Unternehmen in Dortmund', 'Neben beglaubigten Urkunden übersetzen wir für Unternehmen aus Dortmund und dem Ruhrgebiet Verträge, technische Unterlagen, medizinische Berichte und Geschäftskorrespondenz – nach dem Vier-Augen-Prinzip und vertraulich. Fachtexte beginnen ab 0,12 Euro pro Wort.',
      [{ href: '/de/fachuebersetzungen/', label: 'Fachübersetzungen' }, { href: '/de/fachuebersetzungen/recht/', label: 'Juristische Übersetzungen' }, { href: '/de/fachuebersetzungen/ingenieurwesen/', label: 'Technische Übersetzungen' }]],
    nearby: 'Unsere nächstgelegenen Büros sind Bielefeld und Osnabrück.',
    faqs: [['Betreuen Sie auch Bochum, Essen und Gelsenkirchen?', 'Ja. Kundinnen und Kunden aus dem gesamten Ruhrgebiet senden ihre Dokumente digital und erhalten die Übersetzung per E-Mail und auf Wunsch per Post.']],
  }),
  '/de/standorte/koeln': cityPage({
    city: 'Köln',
    region: 'Nordrhein-Westfalen',
    description: 'Übersetzungsbüro Köln: beglaubigte Übersetzungen von Urkunden, Zeugnissen und Führerscheinen sowie Dolmetscher für Köln, Bonn und Neuss – digital.',
    intro: 'Beglaubigte Übersetzungen und Dolmetscher für Köln, Bonn, Neuss und Leverkusen: Urkunden, Zeugnisse und Führerscheine übersetzen unsere ermächtigten Übersetzer komplett digital, Dolmetscher für Ihre Termine in Köln organisieren wir vor Ort, per Video oder Telefon.',
    authorities: '• Ausländerbehörde der Stadt Köln: Aufenthaltstitel, Familiennachzug und Einbürgerung\n• Standesamt Köln: Anmeldung der Eheschließung, Geburtsbeurkundung und Namenserklärungen\n• Universität zu Köln und TH Köln: Zeugnisse und Diplome für Bewerbung und Anerkennung\n• Amtsgericht, Landgericht und Oberlandesgericht Köln: Urteile, Beschlüsse und Vollmachten\n• Führerscheinstelle: Übersetzung ausländischer Führerscheine für die Umschreibung',
    focus: ['Köln, Bonn und das Rheinland', 'Wir betreuen Köln und die Region – etwa Bonn, Neuss, Leverkusen und Bergisch Gladbach – vollständig digital. Besonders oft übersetzen wir für Kölner Kundinnen und Kunden Geburts- und Heiratsurkunden für das Standesamt, Zeugnisse für Universität und Anerkennung sowie Führerscheine für die Umschreibung.',
      [STANDESAMT_LINK, { href: '/de/zeugnis-uebersetzung/', label: 'Zeugnisse übersetzen' }, { href: '/de/fuehrerschein-uebersetzung/', label: 'Führerschein übersetzen' }]],
    nearby: 'Unsere nächstgelegenen Büros sind Mainz und Bielefeld.',
    faqs: [['Betreuen Sie auch Bonn, Neuss und Leverkusen?', 'Ja. Wir betreuen das gesamte Rheinland digital; die Übersetzung erhalten Sie per E-Mail und auf Wunsch per Post.']],
  }),
  '/de/standorte/duesseldorf': cityPage({
    city: 'Düsseldorf',
    region: 'Nordrhein-Westfalen',
    description: 'Übersetzungsbüro Düsseldorf: beglaubigte Übersetzungen und Fachübersetzungen für Behörden, Gerichte und Unternehmen sowie Dolmetscher – digital.',
    intro: 'Beglaubigte Übersetzungen, Fachübersetzungen und Dolmetscher für Düsseldorf: Urkunden und Zeugnisse übersetzen unsere ermächtigten Übersetzer komplett digital, für Unternehmen übersetzen wir Verträge und Geschäftsunterlagen, und für Ihre Termine organisieren wir Dolmetscher.',
    authorities: '• Ausländerbehörde der Landeshauptstadt Düsseldorf: Aufenthaltstitel, Familiennachzug und Einbürgerung\n• Standesamt Düsseldorf: Anmeldung der Eheschließung, Geburtsbeurkundung\n• Heinrich-Heine-Universität und Hochschule Düsseldorf: Zeugnisse und Diplome\n• Amtsgericht, Landgericht und Oberlandesgericht Düsseldorf: Urteile, Beschlüsse und Vollmachten\n• Unternehmen: Verträge, Handelsregisterauszüge und Geschäftskorrespondenz',
    focus: ['Für Unternehmen in Düsseldorf', 'Für Unternehmen in der Landeshauptstadt übersetzen wir Verträge, Satzungen, Handelsregisterauszüge, Jahresabschlüsse und Geschäftskorrespondenz – auf Wunsch beglaubigt und immer vertraulich. Für Verhandlungen und Beurkundungen organisieren wir Dolmetscher.',
      [{ href: '/de/fachuebersetzungen/wirtschaft-finanzen/', label: 'Wirtschaft und Finanzen' }, { href: '/de/fachuebersetzungen/recht/', label: 'Juristische Übersetzungen' }, { href: '/de/dolmetschen/notardolmetscher/', label: 'Notardolmetscher' }]],
    nearby: 'Unsere nächstgelegenen Büros sind Bielefeld und Mainz.',
    faqs: [['Übersetzen Sie auch Handelsregisterauszüge und Verträge?', 'Ja, als Fachübersetzung oder als beglaubigte Übersetzung – zum Beispiel für Notar, Bank oder Behörde.']],
  }),
  '/de/standorte/muenchen': cityPage({
    city: 'München',
    region: 'Bayern',
    description: 'Übersetzungsbüro München: beglaubigte Übersetzungen für KVR, Standesamt und Hochschulen sowie Dolmetscher – komplett digital, Express am selben Tag.',
    intro: 'Beglaubigte Übersetzungen und Dolmetscher für München: Urkunden, Zeugnisse und Führerscheine übersetzen unsere ermächtigten Übersetzer komplett digital – für Kreisverwaltungsreferat, Standesamt, Hochschulen und Gerichte. Dolmetscher für Ihre Termine organisieren wir vor Ort, per Video oder Telefon.',
    authorities: '• Kreisverwaltungsreferat (KVR) mit Ausländerbehörde und Fahrerlaubnisbehörde: Aufenthaltstitel, Einbürgerung und Umschreibung ausländischer Führerscheine\n• Standesamt München: Anmeldung der Eheschließung, Geburtsbeurkundung\n• LMU, TU München und Hochschule München: Zeugnisse und Diplome für Bewerbung und Anerkennung\n• Amtsgericht und Landgericht München: Urteile, Beschlüsse und Vollmachten',
    focus: ['Führerschein-Umschreibung in München', 'Wer mit einem Führerschein aus einem Nicht-EU-Staat nach München zieht, braucht für die Umschreibung meist eine Übersetzung. Wir übersetzen Führerscheine aus allen Sprachen beglaubigt – oft schon am selben Tag.',
      [{ href: '/de/fuehrerschein-uebersetzung/', label: 'Führerschein übersetzen' }, EXPRESS_LINK]],
    nearby: 'Unser nächstgelegenes Büro ist Stuttgart in der Friedrichstraße 15.',
    faqs: [['Akzeptiert das KVR Ihre Übersetzungen?', 'Unsere Übersetzungen stammen von in Deutschland ermächtigten Übersetzern und werden von Behörden bundesweit akzeptiert. Welche Unterlagen das KVR im Einzelfall verlangt, entnehmen Sie bitte dessen Hinweisen.']],
  }),
  '/de/standorte/bremen': cityPage({
    city: 'Bremen',
    region: 'Bremen',
    description: 'Übersetzungsbüro Bremen: beglaubigte Übersetzungen für Migrationsamt, Standesamt und Gericht sowie beeidigte Dolmetscher – Express am selben Tag.',
    intro: 'Beglaubigte Übersetzungen und beeidigte Dolmetscher für Bremen und Bremerhaven: Urkunden, Zeugnisse und Gerichtsunterlagen übersetzen unsere ermächtigten Übersetzer komplett digital, Dolmetscher für Ihre Termine in Bremen organisieren wir vor Ort, per Video oder Telefon.',
    authorities: '• Migrationsamt (Ausländerbehörde) Bremen: Aufenthaltstitel, Familiennachzug und Einbürgerung\n• Standesämter in Bremen und Bremerhaven: Anmeldung der Eheschließung, Geburtsbeurkundung\n• Universität Bremen und Hochschule Bremen: Zeugnisse und Diplome\n• Amtsgericht, Landgericht und Hanseatisches Oberlandesgericht Bremen: Urteile, Beschlüsse und Vollmachten',
    focus: ['Beeidigte Dolmetscher für Bremen', 'Für Gerichtstermine, Vernehmungen und Beurkundungen in Bremen stellen wir beeidigte Dolmetscher – in allen Sprachen. Für kurzfristige Termine ist auch Video- oder Telefondolmetschen möglich, sofern die Stelle zustimmt.',
      [COURT_LINK, { href: '/de/dolmetschen/beeidigte-dolmetscher/', label: 'Beeidigte Dolmetscher' }]],
    nearby: 'Unsere nächstgelegenen Büros sind Osnabrück und Kiel.',
    faqs: [['Betreuen Sie auch Bremerhaven und Oldenburg?', 'Ja. Kundinnen und Kunden aus Bremerhaven, Oldenburg und dem Umland senden ihre Dokumente digital und erhalten die Übersetzung per E-Mail und auf Wunsch per Post.']],
  }),
  '/de/standorte/nuernberg': cityPage({
    city: 'Nürnberg',
    region: 'Bayern',
    description: 'Übersetzungsbüro Nürnberg: beglaubigte Übersetzungen für Ausländerbehörde, Standesamt und Gericht sowie Dolmetscher für Nürnberg, Fürth und Erlangen.',
    intro: 'Beglaubigte Übersetzungen und Dolmetscher für Nürnberg, Fürth und Erlangen: Urkunden, Zeugnisse und Führerscheine übersetzen unsere ermächtigten Übersetzer komplett digital, Dolmetscher für Ihre Termine organisieren wir vor Ort, per Video oder Telefon.',
    authorities: '• Ausländerbehörde der Stadt Nürnberg: Aufenthaltstitel, Familiennachzug und Einbürgerung\n• Standesamt Nürnberg: Anmeldung der Eheschließung, Geburtsbeurkundung\n• Friedrich-Alexander-Universität Erlangen-Nürnberg und Technische Hochschule Nürnberg: Zeugnisse und Diplome\n• Amtsgericht, Landgericht und Oberlandesgericht Nürnberg: Urteile, Beschlüsse und Vollmachten\n• Bundesamt für Migration und Flüchtlinge mit Sitz in Nürnberg: Urkunden und Nachweise',
    focus: ['Nürnberg, Fürth und Erlangen', 'Wir betreuen die gesamte Metropolregion Nürnberg digital. Für Unternehmen in der Region übersetzen wir zusätzlich Verträge, technische Dokumentation und Geschäftsunterlagen.',
      [{ href: '/de/fachuebersetzungen/', label: 'Fachübersetzungen' }]],
    nearby: 'Unser nächstgelegenes Büro ist Stuttgart in der Friedrichstraße 15.',
    faqs: [['Betreuen Sie auch Fürth und Erlangen?', 'Ja. Die gesamte Metropolregion Nürnberg betreuen wir digital; die Übersetzung erhalten Sie per E-Mail und auf Wunsch per Post.']],
  }),
};

// ---------------------------------------------------------------- documents
function documentPage({ description, intro, highlights, uses, details, languages, related, faqs }) {
  return {
    updated: UPDATED,
    description,
    intro,
    highlights,
    sections: [
      ...uses,
      details,
      ['Sprachen', `${languages} ${LANGUAGES_TEXT}`, LANGUAGE_LINKS],
      DELIVERY_SECTION,
      ['Weitere Dokumente und Standorte', 'Wir übersetzen alle Urkunden und Nachweise beglaubigt – digital für ganz Deutschland oder nach Terminvereinbarung in unseren Büros in Osnabrück, Stuttgart, Berlin, Bielefeld, Mainz und Kiel.', [...related, ...OFFICE_LINKS]],
    ],
    faqs: [...faqs, FAQ_DIGITAL, FAQ_SPEED, FAQ_PRICE],
  };
}

const DOCUMENTS = {
  '/de/fuehrerschein-uebersetzung': documentPage({
    description: 'Führerschein übersetzen lassen: beglaubigte Übersetzung für die Umschreibung bei der Fahrerlaubnisbehörde – ab 39 €, Express am selben Tag.',
    intro: 'Sie möchten Ihren ausländischen Führerschein in einen deutschen umschreiben lassen? Dafür verlangt die Fahrerlaubnisbehörde in der Regel eine Übersetzung. Unsere ermächtigten Übersetzer übersetzen Führerscheine aus allen Sprachen beglaubigt – digital, zum Festpreis und auf Wunsch am selben Tag.',
    highlights: ['Für die Umschreibung', 'Alle Sprachen', 'Express am selben Tag'],
    uses: [
      ['Wann brauche ich eine Übersetzung meines Führerscheins?', 'Wer seinen Wohnsitz nach Deutschland verlegt, darf mit einem Führerschein aus einem Nicht-EU-Staat in der Regel noch sechs Monate fahren. Danach muss er umgeschrieben werden. Für den Antrag verlangt die Fahrerlaubnisbehörde meist eine Übersetzung des Führerscheins – vor allem, wenn er nicht in lateinischer Schrift oder nicht auf Deutsch ausgestellt ist.\n\nTypische Anlässe:\n• Umschreibung in einen deutschen Führerschein\n• Vorlage bei Arbeitgeber, Versicherung oder Mietwagenfirma\n• Anerkennung von Fahrerlaubnisklassen'],
    ],
    details: ['Was wir übersetzen', 'Wir übersetzen den Führerschein vollständig: Vorder- und Rückseite, Fahrerlaubnisklassen, Ausstellungs- und Gültigkeitsdaten, Beschränkungen, Stempel und Vermerke. Namen schreiben wir so, wie sie im Reisepass oder Aufenthaltstitel stehen, damit die Angaben übereinstimmen. Die Übersetzung trägt Stempel, Unterschrift und Bestätigungsvermerk des ermächtigten Übersetzers.', [{ href: '/de/standorte/muenchen/', label: 'Führerschein-Umschreibung München' }]],
    languages: 'Häufig übersetzen wir Führerscheine aus Syrien, dem Irak, dem Iran, Afghanistan, der Türkei, der Ukraine und den Maghreb-Staaten.',
    related: [{ href: '/de/geburtsurkunde-uebersetzung/', label: 'Geburtsurkunde übersetzen' }, AUSLAENDER_LINK],
    faqs: [
      ['Reicht ein Foto des Führerscheins?', 'Ja, für das Angebot und meist auch für die Übersetzung reicht ein gut lesbares Foto oder ein Scan von Vorder- und Rückseite.'],
      ['Akzeptiert die Fahrerlaubnisbehörde Ihre Übersetzung?', 'Unsere Übersetzungen stammen von in Deutschland ermächtigten Übersetzern. Welche Form Ihre Fahrerlaubnisbehörde verlangt, steht in deren Hinweisen – senden Sie sie uns gern mit.'],
    ],
  }),
  '/de/geburtsurkunde-uebersetzung': documentPage({
    description: 'Geburtsurkunde übersetzen lassen: beglaubigte Übersetzung für Standesamt, Ausländerbehörde und Einbürgerung – ab 39 €, Express am selben Tag.',
    intro: 'Für Heirat, Einbürgerung, Familiennachzug oder die Geburtsbeurkundung Ihres Kindes brauchen Sie die Geburtsurkunde oft als beglaubigte Übersetzung. Unsere ermächtigten Übersetzer übersetzen Geburtsurkunden aus allen Sprachen – digital, zum Festpreis und auf Wunsch am selben Tag.',
    highlights: ['Für Standesamt und Behörden', 'Alle Sprachen', 'Express am selben Tag'],
    uses: [
      ['Wofür brauche ich eine übersetzte Geburtsurkunde?', '• Anmeldung der Eheschließung beim Standesamt\n• Einbürgerung und Aufenthaltstitel bei der Ausländerbehörde\n• Familiennachzug\n• Geburtsbeurkundung Ihres Kindes in Deutschland\n• Namenserklärungen, Rentenversicherung und Familienkasse\n\nManche Stellen akzeptieren mehrsprachige internationale Geburtsurkunden ohne Übersetzung. Ob das bei Ihnen gilt, entscheidet die jeweilige Stelle.',
        [STANDESAMT_LINK, AUSLAENDER_LINK]],
    ],
    details: ['Was wir übersetzen', 'Wir übersetzen die Geburtsurkunde vollständig – einschließlich Randvermerken, Stempeln, Siegeln und Beglaubigungen. Namen und Orte übertragen wir einheitlich und, wenn Sie uns Reisepass oder Aufenthaltstitel nennen, in derselben Schreibweise. Die Übersetzung trägt Stempel, Unterschrift und Bestätigungsvermerk des ermächtigten Übersetzers und gibt an, ob sie vom Original oder von einer Kopie angefertigt wurde.'],
    languages: 'Besonders häufig übersetzen wir Geburtsurkunden aus dem Arabischen, Persischen, Türkischen und Ukrainischen.',
    related: [{ href: '/de/heiratsurkunde-uebersetzung/', label: 'Heiratsurkunde übersetzen' }, { href: '/de/dolmetschen/standesamt-dolmetscher/', label: 'Dolmetscher fürs Standesamt' }],
    faqs: [
      ['Muss ich das Original schicken?', 'Nein, in der Regel nicht. Ein gut lesbarer Scan oder ein Foto reicht. Die Übersetzung vermerkt, ob sie vom Original oder von einer Kopie angefertigt wurde.'],
      ['Brauche ich eine Apostille oder Legalisation?', 'Ob die Urkunde selbst zusätzlich eine Apostille oder Legalisation braucht, entscheidet die Stelle, die sie verlangt. Das klären Sie bitte vorab mit Standesamt oder Behörde.'],
    ],
  }),
  '/de/heiratsurkunde-uebersetzung': documentPage({
    description: 'Heiratsurkunde übersetzen lassen: beglaubigte Übersetzung für Familiennachzug, Einbürgerung und Standesamt – ab 39 €, Express am selben Tag.',
    intro: 'Für Familiennachzug, Einbürgerung, die Namensführung oder die Anerkennung Ihrer Ehe in Deutschland brauchen Sie die Heiratsurkunde meist als beglaubigte Übersetzung. Unsere ermächtigten Übersetzer übersetzen Heiratsurkunden aus allen Sprachen – digital, zum Festpreis und auf Wunsch am selben Tag.',
    highlights: ['Für Familiennachzug', 'Alle Sprachen', 'Express am selben Tag'],
    uses: [
      ['Wofür brauche ich eine übersetzte Heiratsurkunde?', '• Familiennachzug und Aufenthaltstitel bei der Ausländerbehörde oder Botschaft\n• Einbürgerung\n• Namensänderung und Eintragung beim Standesamt\n• Anmeldung, Steuer, Krankenkasse und Familienkasse\n• Scheidung oder Erbangelegenheiten vor Gericht'],
    ],
    details: ['Was wir übersetzen', 'Wir übersetzen die Heiratsurkunde vollständig – auch Ehevertragsangaben, Zeugen, Randvermerke, Stempel und Beglaubigungen. Bei islamischen Eheverträgen und Urkunden religiöser Stellen achten wir auf die genaue Wiedergabe der Angaben. Namen übertragen wir in der Schreibweise Ihres Reisepasses. Die Übersetzung trägt Stempel, Unterschrift und Bestätigungsvermerk des ermächtigten Übersetzers.'],
    languages: 'Besonders häufig übersetzen wir Heiratsurkunden und Eheverträge aus dem Arabischen, Persischen, Türkischen und Ukrainischen.',
    related: [{ href: '/de/geburtsurkunde-uebersetzung/', label: 'Geburtsurkunde übersetzen' }, { href: '/de/scheidungsurteil-uebersetzung/', label: 'Scheidungsurteil übersetzen' }, STANDESAMT_LINK, AUSLAENDER_LINK],
    faqs: [
      ['Übersetzen Sie auch islamische Eheverträge?', 'Ja. Eheverträge und Heiratsurkunden aus arabischsprachigen Ländern, dem Iran und Afghanistan übersetzen wir vollständig und beglaubigt.'],
      ['Muss ich das Original schicken?', 'Nein, in der Regel nicht. Ein gut lesbarer Scan oder ein Foto reicht für Angebot und Übersetzung.'],
    ],
  }),
  '/de/zeugnis-uebersetzung': documentPage({
    description: 'Zeugnis übersetzen lassen: Schulzeugnis, Diplom und Transcript beglaubigt für Anerkennung, Studium und Bewerbung – ab 39 €, Express am selben Tag.',
    intro: 'Für die Anerkennung Ihres Abschlusses, eine Bewerbung an Hochschule oder Arbeitgeber oder einen Antrag bei Behörden brauchen Sie Ihre Zeugnisse meist als beglaubigte Übersetzung. Unsere ermächtigten Übersetzer übersetzen Schul- und Hochschulzeugnisse, Diplome, Fächer- und Notenübersichten sowie Arbeitszeugnisse aus allen Sprachen.',
    highlights: ['Für Anerkennung und Studium', 'Alle Sprachen', 'Express am selben Tag'],
    uses: [
      ['Wofür brauche ich übersetzte Zeugnisse?', '• Anerkennung ausländischer Schul-, Hochschul- und Berufsabschlüsse\n• Bewerbung an Hochschulen in Deutschland\n• Bewerbung bei Arbeitgebern – auch Arbeitszeugnisse und Referenzschreiben\n• Aufenthaltstitel für Fachkräfte und Blaue Karte EU\n• Approbation und Berufserlaubnis in Gesundheitsberufen'],
    ],
    details: ['Was wir übersetzen', 'Wir übersetzen Abschlusszeugnisse, Diplome, Bachelor- und Masterurkunden, Transcripts of Records, Fächer- und Notenübersichten, Ausbildungsnachweise und Arbeitszeugnisse – vollständig mit Stempeln, Siegeln und Beglaubigungen. Noten geben wir so wieder, wie sie im Original stehen; eine Umrechnung in deutsche Noten nimmt die Anerkennungsstelle vor. Bei mehreren Dokumenten erhalten Sie ein Gesamtangebot.'],
    languages: 'Besonders häufig übersetzen wir Zeugnisse aus dem Arabischen, Persischen, Türkischen, Ukrainischen und Englischen.',
    related: [AUSLAENDER_LINK, { href: '/de/arbeitszeugnis-uebersetzung/', label: 'Arbeitszeugnis übersetzen' }, { href: '/de/standorte/stuttgart/', label: 'Übersetzungen Stuttgart' }],
    faqs: [
      ['Übersetzen Sie auch Arbeitszeugnisse ins Deutsche?', 'Ja. Arbeitszeugnisse, Referenzschreiben und Arbeitsverträge übersetzen wir – auf Wunsch beglaubigt – zum Beispiel für Bewerbung oder Anerkennung.'],
      ['Ich habe mehrere Zeugnisse – wird das teurer?', 'Sie erhalten ein Gesamtangebot für alle Dokumente. Senden Sie uns einfach alle Seiten auf einmal.'],
    ],
  }),
};

// ---------------------------------------------------------------- interpreting
const INTERPRETING_PRICE = 'Dolmetscheinsätze beginnen ab 85 Euro pro Stunde. Den genauen Festpreis nennen wir Ihnen vorab, sobald wir Termin, Ort, Dauer und Sprache kennen.';
const INTERPRETING = {
  '/de/dolmetschen': {
    updated: UPDATED,
    description: 'Dolmetscher buchen für Behörde, Standesamt, Gericht, Notar und Arzt – beeidigt, alle Sprachen, vor Ort oder per Video, ab 85 € pro Stunde.',
    intro: 'Ob Termin bei der Ausländerbehörde, Trauung im Standesamt, Gerichtsverhandlung oder Geschäftsgespräch: Wir organisieren Dolmetscher für alle Sprachen – vor Ort, per Video oder Telefon. Für Gericht und Notar stellen wir beeidigte Dolmetscher.',
    highlights: ['Beeidigte Dolmetscher', 'Alle Sprachen', 'Vor Ort, Video oder Telefon'],
    sections: [
      ['Für welche Termine?', '• Behörden: Ausländerbehörde, Jobcenter, Bürgeramt\n• Standesamt: Anmeldung der Eheschließung und Trauung\n• Gericht: Verhandlungen, Anhörungen, Vernehmungen und Anwaltsgespräche\n• Notar: Kaufverträge, Vollmachten und Gesellschaftsverträge\n• Arzt und Klinik: Aufklärungsgespräche und Untersuchungen\n• Unternehmen: Verhandlungen, Schulungen und Konferenzen',
        [COURT_LINK, { href: '/de/dolmetschen/standesamt-dolmetscher/', label: 'Standesamt-Dolmetscher' }, { href: '/de/dolmetschen/notardolmetscher/', label: 'Notardolmetscher' }, { href: '/de/dolmetschen/beeidigte-dolmetscher/', label: 'Beeidigte Dolmetscher' }, { href: '/de/dolmetschen/simultandolmetscher/', label: 'Simultandolmetscher' }]],
      ['Vor Ort, per Video oder Telefon', 'Am besten ist ein Dolmetscher vor Ort. Wenn es schnell gehen muss oder der Weg weit ist, dolmetschen wir per Video oder Telefon – vorausgesetzt, die Stelle ist damit einverstanden. Gerichte und Notare legen das im Einzelfall fest.'],
      ['Beeidigt oder nicht beeidigt?', 'Für Gerichte, Notare und viele Standesämter wird ein allgemein beeidigter Dolmetscher verlangt. Für Arzttermine oder Geschäftsgespräche ist das meist nicht nötig. Wir sagen Ihnen vorab, was für Ihren Termin passt.'],
      ['So buchen Sie einen Dolmetscher', 'Senden Sie uns:\n• Datum, Uhrzeit und voraussichtliche Dauer\n• Ort mit Adresse oder Video-/Telefontermin\n• Sprache und gegebenenfalls Dialekt\n• Anlass des Termins\n• ob eine beeidigte Person erforderlich ist\n\nSie erhalten zeitnah eine Bestätigung mit Festpreis.'],
      ['Sprachen', LANGUAGES_TEXT, LANGUAGE_LINKS],
      ['Preise', INTERPRETING_PRICE, [{ href: '/preise/', label: 'Preise ansehen' }]],
      ['Unsere Standorte', 'Dolmetscher organisieren wir deutschlandweit – mit Büros in Osnabrück, Stuttgart, Berlin, Bielefeld, Mainz und Kiel.', OFFICE_LINKS],
    ],
    faqs: [
      ['Wie kurzfristig bekomme ich einen Dolmetscher?', 'Senden Sie uns Ihre Termindaten so früh wie möglich. Kurzfristige Anfragen prüfen wir sofort; je nach Sprache und Ort ist auch ein Einsatz per Video oder Telefon möglich.'],
      ['Dolmetschen Sie auch Dialekte?', 'Ja. Bei Arabisch decken unsere Dolmetscher unter anderem den syrischen, sudanesischen, libyschen, marokkanischen, algerischen und ägyptischen Dialekt ab, bei Persisch Farsi und Dari.'],
      ['Was kostet ein Dolmetscher?', INTERPRETING_PRICE],
      ['Stellen Sie beeidigte Dolmetscher?', 'Ja, für alle Sprachen – zum Beispiel für Gericht, Notar und Standesamt.'],
    ],
  },
  '/de/dolmetschen/beeidigte-dolmetscher': {
    updated: UPDATED,
    description: 'Beeidigte Dolmetscher für Gericht, Notar, Standesamt und Behörden – alle Sprachen, vor Ort oder per Video, Festpreis vorab, ab 85 € pro Stunde.',
    intro: 'Wenn Gericht, Notar oder Standesamt einen beeidigten Dolmetscher verlangen, sind Sie bei uns richtig: Wir stellen allgemein beeidigte Dolmetscher für alle Sprachen – vor Ort oder, wenn die Stelle zustimmt, per Video.',
    highlights: ['Allgemein beeidigt', 'Alle Sprachen', 'Festpreis vorab'],
    sections: [
      ['Was bedeutet „beeidigter Dolmetscher“?', 'Ein allgemein beeidigter Dolmetscher hat vor einem deutschen Gericht oder einer zuständigen Stelle den Eid geleistet, treu und gewissenhaft zu übertragen. Gerichte, Notare und Standesämter verlangen deshalb für viele Termine eine beeidigte Person. Umgangssprachlich spricht man auch von vereidigten Dolmetschern.'],
      ['Wann wird ein beeidigter Dolmetscher verlangt?', '• Gerichtsverhandlungen, Vernehmungen und Anhörungen\n• Beurkundungen beim Notar, etwa Kaufverträge und Vollmachten\n• Anmeldung der Eheschließung und Trauung beim Standesamt – je nach Standesamt\n• Termine bei Behörden, wenn diese es ausdrücklich verlangen\n\nOb eine Beeidigung nötig ist, legt die jeweilige Stelle fest. Fragen Sie im Zweifel dort nach – oder bei uns.',
        [COURT_LINK, { href: '/de/dolmetschen/notardolmetscher/', label: 'Notardolmetscher' }, { href: '/de/dolmetschen/standesamt-dolmetscher/', label: 'Standesamt-Dolmetscher' }]],
      ['So buchen Sie einen beeidigten Dolmetscher', 'Bitte senden Sie uns Datum, Uhrzeit, Dauer, Ort, Sprache und gegebenenfalls Dialekt sowie den Anlass. Sie erhalten zeitnah eine Bestätigung mit Festpreis.'],
      ['Sprachen', LANGUAGES_TEXT, LANGUAGE_LINKS],
      ['Preise', INTERPRETING_PRICE, [{ href: '/preise/', label: 'Preise ansehen' }]],
    ],
    faqs: [
      ['Ist „vereidigt“ dasselbe wie „beeidigt“?', 'Im Alltag werden beide Begriffe gleich verwendet. Gemeint ist ein Dolmetscher, der allgemein beeidigt ist und deshalb vor Gericht, beim Notar und beim Standesamt eingesetzt werden kann.'],
      ['Für welche Sprachen stellen Sie beeidigte Dolmetscher?', 'Für alle Sprachen, die wir anbieten – unter anderem Arabisch mit den gängigen Dialekten, Türkisch, Ukrainisch, Persisch (Farsi und Dari), Englisch, Französisch und Rumänisch.'],
      ['Geht das auch per Video?', 'Ja, wenn die Stelle zustimmt. Gerichte und Notare entscheiden das im Einzelfall.'],
    ],
  },
  '/de/dolmetschen/standesamt-dolmetscher': {
    updated: UPDATED,
    description: 'Dolmetscher fürs Standesamt: Anmeldung der Eheschließung und Trauung – auf Wunsch beeidigt, alle Sprachen, Festpreis vorab, Urkunden gleich mit.',
    intro: 'Wenn eine der beteiligten Personen nicht ausreichend Deutsch versteht, verlangt das Standesamt für die Anmeldung der Eheschließung und für die Trauung in der Regel einen Dolmetscher. Wir organisieren ihn – auf Wunsch beeidigt – und übersetzen auch die nötigen Urkunden.',
    highlights: ['Anmeldung und Trauung', 'Auf Wunsch beeidigt', 'Urkunden gleich mit'],
    sections: [
      ['Wann braucht das Standesamt einen Dolmetscher?', 'Das Standesamt muss sicherstellen, dass alle Beteiligten verstehen, was sie erklären. Spricht eine Person nicht ausreichend Deutsch, wird ein Dolmetscher hinzugezogen – bei der Anmeldung der Eheschließung und bei der Trauung selbst. Manche Standesämter verlangen eine beeidigte Person; fragen Sie bitte vorab bei Ihrem Standesamt nach.'],
      ['Termin und Ablauf', 'Senden Sie uns Datum, Uhrzeit und Ort von Anmeldung oder Trauung sowie die Sprache. Wir bestätigen Ihnen den Dolmetscher und den Festpreis vorab. Am Termin übersetzt der Dolmetscher die Fragen und Erklärungen des Standesbeamten und Ihre Antworten.'],
      ['Die Urkunden gleich mit übersetzen', 'Für die Anmeldung der Eheschließung verlangt das Standesamt meist Geburtsurkunden, Ledigkeitsbescheinigungen oder Ehefähigkeitszeugnisse und gegebenenfalls Scheidungsurteile – oft als beglaubigte Übersetzung. Die übersetzen wir gern gleich mit.',
        [STANDESAMT_LINK, { href: '/de/geburtsurkunde-uebersetzung/', label: 'Geburtsurkunde übersetzen' }, { href: '/de/heiratsurkunde-uebersetzung/', label: 'Heiratsurkunde übersetzen' }]],
      ['Sprachen', LANGUAGES_TEXT, LANGUAGE_LINKS],
      ['Preise', INTERPRETING_PRICE],
    ],
    faqs: [
      ['Muss der Dolmetscher beim Standesamt beeidigt sein?', 'Das legt das jeweilige Standesamt fest. Viele verlangen eine beeidigte Person – wir stellen beeidigte Dolmetscher für alle Sprachen.'],
      ['Darf ein Familienmitglied dolmetschen?', 'Das entscheidet das Standesamt. Häufig wird eine neutrale, oft beeidigte Person verlangt.'],
      ['Übersetzen Sie auch die Urkunden für die Eheschließung?', 'Ja, beglaubigt durch ermächtigte Übersetzer – meist innerhalb von 2–3 Werktagen, im Express am selben Tag.'],
    ],
  },
  '/de/dolmetschen/notardolmetscher': {
    updated: UPDATED,
    description: 'Notardolmetscher für Kaufvertrag, Vollmacht und Testament – beeidigte Dolmetscher für alle Sprachen, Festpreis vorab, auch Übersetzung der Urkunde.',
    intro: 'Versteht eine Person bei der Beurkundung nicht ausreichend Deutsch, muss der Notar einen Dolmetscher hinzuziehen. Wir stellen beeidigte Dolmetscher für alle Sprachen – für Kaufverträge, Vollmachten, Testamente und Gesellschaftsverträge.',
    highlights: ['Beeidigte Dolmetscher', 'Alle Sprachen', 'Festpreis vorab'],
    sections: [
      ['Wann braucht der Notar einen Dolmetscher?', 'Bei einer Beurkundung liest der Notar die Urkunde vor und erklärt sie. Ist eine beteiligte Person der deutschen Sprache nicht hinreichend kundig, wird die Urkunde mündlich übersetzt – durch einen Dolmetscher. Viele Notare verlangen dafür eine beeidigte Person.'],
      ['Typische Beurkundungen', '• Immobilienkaufverträge\n• General- und Vorsorgevollmachten\n• Testamente und Erbverträge\n• Gesellschaftsverträge und Handelsregisteranmeldungen\n• Eheverträge und Scheidungsfolgenvereinbarungen'],
      ['Vorbereitung und schriftliche Übersetzung', 'Damit der Termin reibungslos läuft, kann der Dolmetscher den Entwurf vorab erhalten. Wenn Sie die Urkunde zusätzlich schriftlich in Ihrer Sprache benötigen, übersetzen wir sie als Fachübersetzung oder beglaubigt.',
        [{ href: '/de/fachuebersetzungen/recht/', label: 'Juristische Übersetzungen' }, CERTIFIED_LINK]],
      ['Sprachen', LANGUAGES_TEXT, LANGUAGE_LINKS],
      ['Preise', INTERPRETING_PRICE],
    ],
    faqs: [
      ['Muss der Notardolmetscher beeidigt sein?', 'Das hängt vom Notar und vom Vorgang ab. Viele Notare verlangen eine beeidigte Person – wir stellen beeidigte Dolmetscher für alle Sprachen.'],
      ['Kann der Dolmetscher den Vertrag vorher sehen?', 'Ja, das empfehlen wir sogar. Senden Sie uns den Entwurf vorab, dann kann sich der Dolmetscher vorbereiten.'],
      ['Übersetzen Sie die Urkunde auch schriftlich?', 'Ja, als Fachübersetzung oder als beglaubigte Übersetzung.'],
    ],
  },
  '/de/dolmetschen/simultandolmetscher': {
    updated: UPDATED,
    description: 'Simultan- und Konsekutivdolmetscher für Konferenzen, Schulungen und Verhandlungen – Dolmetscherteams für alle Sprachen, Festpreis nach Anfrage.',
    intro: 'Für Konferenzen, Schulungen, Betriebsversammlungen und Verhandlungen organisieren wir Simultan- und Konsekutivdolmetscher. Wir beraten Sie, welche Form zu Ihrer Veranstaltung passt, und stellen das passende Team zusammen.',
    highlights: ['Konferenzen und Events', 'Dolmetscherteams', 'Festpreis nach Anfrage'],
    sections: [
      ['Simultan oder konsekutiv?', '• Simultandolmetschen: Der Dolmetscher überträgt zeitgleich, meist mit Technik. Ideal für Konferenzen und längere Veranstaltungen mit vielen Zuhörern.\n• Konsekutivdolmetschen: Der Dolmetscher überträgt abschnittsweise nach dem Redner. Ideal für Verhandlungen, Besprechungen und kurze Reden.\n• Flüsterdolmetschen: Simultan, aber leise für ein bis zwei Personen.'],
      ['Warum ein Dolmetscherteam?', 'Simultandolmetschen ist sehr anstrengend. Bei längeren Einsätzen arbeiten deshalb in der Regel zwei Dolmetscher im Wechsel – so bleibt die Qualität über den ganzen Tag gleich hoch.'],
      ['Was wir für ein Angebot brauchen', '• Datum, Uhrzeit und Dauer\n• Ort und Art der Veranstaltung\n• Sprachen und Anzahl der Zuhörer\n• Thema und vorhandene Unterlagen\n• ob Dolmetschtechnik vor Ort vorhanden ist\n\nSie erhalten ein Festpreisangebot. Vorab erhaltene Präsentationen und Redemanuskripte helfen dem Team bei der Vorbereitung.'],
      ['Sprachen', LANGUAGES_TEXT, LANGUAGE_LINKS],
    ],
    faqs: [
      ['Organisieren Sie auch die Dolmetschtechnik?', 'Sprechen Sie uns an: Wir klären im Angebot, welche Technik nötig ist und ob sie vor Ort vorhanden ist.'],
      ['Wie früh sollte ich anfragen?', 'Für Konferenzen und größere Veranstaltungen möglichst einige Wochen vorher, damit das Team sich vorbereiten kann.'],
      ['Geht Simultandolmetschen auch online?', 'Ja, für Videokonferenzen ist Ferndolmetschen möglich. Wir klären die Plattform vorab mit Ihnen.'],
    ],
  },
};

// ---------------------------------------------------------------- certified translations hub
const CERTIFIED = {
  '/de/beglaubigte-uebersetzungen': {
    updated: UPDATED,
    description: 'Beglaubigte Übersetzung von ermächtigten Übersetzern: Urkunden, Zeugnisse und Führerscheine für alle Behörden – ab 39 €, Express am selben Tag.',
    intro: 'Eine beglaubigte Übersetzung brauchen Sie immer dann, wenn eine Behörde, ein Gericht, ein Standesamt oder eine Hochschule ein fremdsprachiges Dokument offiziell anerkennen soll. Unsere ermächtigten Übersetzer übersetzen Ihre Dokumente aus allen Sprachen – ab 39 Euro pro Dokument, mit Festpreis vorab und auf Wunsch am selben Tag.',
    highlights: ['Ermächtigte Übersetzer', 'Ab 39 € pro Dokument', 'Express am selben Tag'],
    sections: [
      ['Was ist eine beglaubigte Übersetzung?', 'Eine beglaubigte Übersetzung wird von einem in Deutschland ermächtigten (auch: beeidigten oder vereidigten) Übersetzer angefertigt. Er bestätigt mit Stempel, Unterschrift und Bestätigungsvermerk, dass die Übersetzung vollständig und richtig ist. Dadurch wird sie von deutschen Behörden, Gerichten, Standesämtern und Hochschulen als amtliche Übersetzung akzeptiert.'],
      ['Welche Dokumente wir beglaubigt übersetzen', '• Geburts-, Heirats- und Sterbeurkunden\n• Ledigkeitsbescheinigungen, Ehefähigkeitszeugnisse und Scheidungsurteile\n• Führerscheine und Personaldokumente\n• Schul- und Hochschulzeugnisse, Diplome und Transcripts\n• Arbeitszeugnisse und Arbeitsverträge\n• Urteile, Beschlüsse, Verträge und Vollmachten\n• Meldebescheinigungen, Führungszeugnisse und weitere Nachweise',
        [...DOCUMENT_LINKS, ...MORE_DOCUMENT_LINKS]],
      ['Für welche Stellen?', 'Beglaubigte Übersetzungen werden zum Beispiel vom Standesamt bei der Anmeldung der Eheschließung, von der Ausländerbehörde bei Aufenthaltstitel, Familiennachzug und Einbürgerung, von der Fahrerlaubnisbehörde, von Anerkennungsstellen, Hochschulen und Gerichten verlangt.',
        [STANDESAMT_LINK, AUSLAENDER_LINK, COURT_LINK]],
      ['Beglaubigt, notariell beglaubigt oder mit Apostille?', 'Für deutsche Behörden genügt fast immer die beglaubigte Übersetzung durch einen ermächtigten Übersetzer. Eine notariell beglaubigte Übersetzung – bei der ein Notar die Unterschrift des Übersetzers bestätigt – oder eine Apostille wird in der Regel nur verlangt, wenn die Übersetzung im Ausland verwendet werden soll. Was genau nötig ist, legt die empfangende Stelle fest.'],
      ['Vom Original oder von einer Kopie?', 'Für Angebot und Übersetzung reicht meist ein gut lesbarer Scan oder ein Foto. Die Übersetzung vermerkt, ob sie vom Original oder von einer Kopie angefertigt wurde. Das Original benötigen wir nur, wenn die empfangende Stelle es ausdrücklich verlangt.'],
      DELIVERY_SECTION,
      ['Sprachen', LANGUAGES_TEXT, LANGUAGE_LINKS],
      ['Persönlich in unseren Büros', 'Wir arbeiten deutschlandweit digital und bieten persönliche Termine nach Vereinbarung in Osnabrück, Stuttgart, Berlin, Bielefeld, Mainz und Kiel an.', OFFICE_LINKS],
    ],
    faqs: [
      FAQ_PRICE,
      FAQ_SPEED,
      ['Wird die Übersetzung von allen Behörden anerkannt?', 'Beglaubigte Übersetzungen von in Deutschland ermächtigten Übersetzern werden von Behörden, Gerichten, Standesämtern und Hochschulen bundesweit akzeptiert.'],
      ['Brauche ich eine notariell beglaubigte Übersetzung?', 'Für deutsche Behörden in aller Regel nicht. Sie wird meist nur für die Verwendung im Ausland verlangt.'],
      ['Muss ich das Original schicken?', 'Nein, in der Regel nicht. Ein gut lesbarer Scan oder ein Foto reicht.'],
      FAQ_DIGITAL,
      ['Kann ich die Übersetzung in der Nähe abholen?', 'Ja, nach Terminvereinbarung in einem unserer sechs Büros. Die meisten Kunden erhalten die Übersetzung aber bequem als PDF und per Post.'],
    ],
  },
};

// ---------------------------------------------------------------- specialist translations
// The detail pages keep their visual panel; these sections render below it
// (sectionsBelowPanel) and in the prerendered HTML.
const SPECIALIST_PRICE = 'Fachübersetzungen beginnen ab 0,12 Euro pro Wort. Der Festpreis richtet sich nach Fachgebiet, Umfang, Sprachkombination, Format und gewünschter Lieferzeit – Sie erhalten ihn vorab und kostenlos. Die Lieferzeit hängt vom Umfang ab und wird im Angebot verbindlich genannt.';
const SPECIALIST_HUB_LINK = { href: '/de/fachuebersetzungen/', label: 'Alle Fachgebiete' };

function specialistPage({ description, documents, clients, focus, faqs, certified = false }) {
  return {
    updated: UPDATED,
    sectionsBelowPanel: true,
    description,
    sections: [
      ['Typische Dokumente', documents],
      ['Für wen wir übersetzen', clients],
      focus,
      ['Qualität und Vertraulichkeit', 'Fachtexte übersetzen bei uns Übersetzerinnen und Übersetzer mit Erfahrung im jeweiligen Fachgebiet. Je nach Auftrag arbeiten wir mit Terminologieprüfung und Vier-Augen-Prinzip, damit Fachbegriffe im ganzen Dokument einheitlich und korrekt sind. Unsere Übersetzungsprozesse orientieren sich am Standard ISO 17100; wir arbeiten mit CAT-Tools wie SDL Trados und memoQ sowie mit kundenspezifischen Terminologiedatenbanken. Ihre Unterlagen behandeln wir vertraulich und verwenden sie ausschließlich für Ihren Auftrag.'],
      ...(certified ? [['Auf Wunsch beglaubigt', 'Wenn eine Behörde, ein Gericht oder eine Anerkennungsstelle eine amtliche Übersetzung verlangt, fertigen unsere ermächtigten Übersetzer die Fachübersetzung als beglaubigte Übersetzung an – mit Stempel, Unterschrift und Bestätigungsvermerk.', [CERTIFIED_LINK]]] : []),
      ['Preis und Lieferzeit', SPECIALIST_PRICE, [{ href: '/preise/', label: 'Preise ansehen' }, SPECIALIST_HUB_LINK]],
      ['Sprachen', LANGUAGES_TEXT, LANGUAGE_LINKS],
    ],
    faqs: [
      ...faqs,
      ['Was kostet eine Fachübersetzung?', 'Fachübersetzungen beginnen ab 0,12 Euro pro Wort. Den genauen Festpreis nennen wir Ihnen vorab und kostenlos.'],
      ['Wie sende ich meine Unterlagen?', 'Per E-Mail, WhatsApp oder über unser Webformular – gern als Word-, PDF- oder Bilddatei. Bearbeitbare Dateien erleichtern die Übernahme von Layout und Tabellen.'],
    ],
  };
}

const SPECIALIST = {
  '/de/fachuebersetzungen': {
    updated: UPDATED,
    description: 'Fachübersetzung durch Fachübersetzer: Recht, Medizin, Wirtschaft, Technik, IT und mehr – ab 0,12 € pro Wort, Festpreis vorab, auf Wunsch beglaubigt.',
    intro: 'Verträge, Arztberichte, Bilanzen, Bedienungsanleitungen oder Software: Fachtexte brauchen Übersetzer, die das Fachgebiet kennen. Wir übersetzen Fachtexte in allen Sprachen – ab 0,12 Euro pro Wort, mit Festpreis vorab und auf Wunsch als beglaubigte Übersetzung.',
    highlights: ['Fachübersetzer je Fachgebiet', 'Ab 0,12 € pro Wort', 'Auf Wunsch beglaubigt'],
    sections: [
      ['Unsere Fachgebiete', '• Recht: Verträge, Urteile, Vollmachten und Satzungen\n• Medizin und Dentalmedizin: Arztberichte, Befunde und Approbationsunterlagen\n• Wirtschaft und Finanzen: Jahresabschlüsse, Geschäftsberichte und Handelsregisterauszüge\n• Ingenieurwesen: technische Dokumentation, Datenblätter und Anleitungen\n• Pharmazeutik: Beipackzettel, Studienunterlagen und Zulassungsdokumente\n• IT und Software: Benutzeroberflächen, Handbücher und Webseiten\n• Chemie und Biowissenschaften: Sicherheitsdatenblätter und Laborberichte\n• Literatur: Bücher, Sachtexte und kreative Texte',
        [
          { href: '/de/fachuebersetzungen/recht/', label: 'Recht' },
          { href: '/de/fachuebersetzungen/medizinische-dentalmedizin/', label: 'Medizin und Dental' },
          { href: '/de/fachuebersetzungen/wirtschaft-finanzen/', label: 'Wirtschaft und Finanzen' },
          { href: '/de/fachuebersetzungen/ingenieurwesen/', label: 'Ingenieurwesen' },
          { href: '/de/fachuebersetzungen/pharmazeutik/', label: 'Pharmazeutik' },
          { href: '/de/fachuebersetzungen/it-software/', label: 'IT und Software' },
          { href: '/de/fachuebersetzungen/chemie-biowissenschaften/', label: 'Chemie und Biowissenschaften' },
          { href: '/de/fachuebersetzungen/literatur/', label: 'Literatur' },
        ]],
      ['Was ist eine Fachübersetzung?', 'Eine Fachübersetzung überträgt einen Text aus einem bestimmten Fachgebiet – mit der richtigen Terminologie, im passenden Stil und vollständig. Anders als bei allgemeinen Texten kommt es darauf an, dass Fachbegriffe exakt und im ganzen Dokument einheitlich übersetzt werden. Deshalb übersetzen bei uns Übersetzer mit Erfahrung im jeweiligen Fachgebiet.'],
      ['Fachübersetzung oder beglaubigte Übersetzung?', 'Eine Fachübersetzung ist für die fachliche Nutzung gedacht – etwa im Unternehmen, in der Kanzlei oder in der Klinik. Verlangt eine Behörde, ein Gericht oder eine Anerkennungsstelle eine amtliche Übersetzung, fertigen unsere ermächtigten Übersetzer sie zusätzlich als beglaubigte Übersetzung an.', [CERTIFIED_LINK]],
      ['So läuft es ab', '1. Unterlagen senden – per E-Mail, WhatsApp oder Webformular, gern als Word- oder PDF-Datei.\n2. Festpreis und Lieferzeit erhalten – kostenlos und unverbindlich.\n3. Übersetzung erhalten – im Format Ihrer Vorlage, auf Wunsch beglaubigt.'],
      ['Qualität und Vertraulichkeit', 'Je nach Auftrag arbeiten wir mit Terminologieprüfung und Vier-Augen-Prinzip. Unsere Übersetzungsprozesse orientieren sich am Standard ISO 17100; wir arbeiten mit CAT-Tools wie SDL Trados und memoQ sowie mit kundenspezifischen Terminologiedatenbanken. Ihre Unterlagen behandeln wir vertraulich und verwenden sie ausschließlich für Ihren Auftrag.'],
      ['Preise', SPECIALIST_PRICE, [{ href: '/preise/', label: 'Preise ansehen' }]],
      ['Sprachen', LANGUAGES_TEXT, LANGUAGE_LINKS],
      ['Für Unternehmen in ganz Deutschland', 'Wir übersetzen für Unternehmen, Kanzleien, Kliniken und Behörden deutschlandweit – mit Büros in Osnabrück, Stuttgart, Berlin, Bielefeld, Mainz und Kiel.', OFFICE_LINKS],
    ],
    faqs: [
      ['Welche Fachgebiete übersetzen Sie?', 'Recht, Medizin und Dentalmedizin, Wirtschaft und Finanzen, Ingenieurwesen, Pharmazeutik, IT und Software, Chemie und Biowissenschaften sowie Literatur.'],
      ['Was kostet eine Fachübersetzung?', 'Fachübersetzungen beginnen ab 0,12 Euro pro Wort. Den genauen Festpreis nennen wir Ihnen vorab und kostenlos.'],
      ['Kann eine Fachübersetzung beglaubigt werden?', 'Ja. Wenn eine Behörde oder ein Gericht eine amtliche Übersetzung verlangt, fertigen unsere ermächtigten Übersetzer sie als beglaubigte Übersetzung an.'],
      ['Behandeln Sie meine Dokumente vertraulich?', 'Ja. Ihre Unterlagen verwenden wir ausschließlich für Ihren Auftrag.'],
    ],
  },
  '/de/fachuebersetzungen/recht': specialistPage({
    certified: true,
    description: 'Juristische Fachübersetzung: Verträge, Urteile, Vollmachten und Satzungen für Kanzleien, Notare und Unternehmen – auf Wunsch beglaubigt.',
    documents: '• Verträge, AGB und Geheimhaltungsvereinbarungen\n• Urteile, Beschlüsse, Klageschriften und Schriftsätze\n• Vollmachten, notarielle Urkunden und Testamente\n• Satzungen, Gesellschaftsverträge und Handelsregisterauszüge\n• Behördenbescheide und Korrespondenz mit Gerichten',
    clients: 'Wir übersetzen für Anwaltskanzleien, Notariate, Gerichte, Unternehmen, Behörden und Privatpersonen – zum Beispiel für internationale Verträge, grenzüberschreitende Verfahren, Erbschaften oder den Kauf einer Immobilie.',
    focus: ['Rechtssprache präzise übertragen', 'Juristische Begriffe haben in jedem Rechtssystem ihre eigene Bedeutung. Wo es keine direkte Entsprechung gibt, wählen wir die treffendste Übersetzung und ergänzen bei Bedarf den Originalbegriff. So bleibt die Übersetzung nachvollziehbar und rechtlich verwertbar.',
      [{ href: '/de/gerichtsdolmetscher/', label: 'Gerichtsdolmetscher' }, { href: '/de/dolmetschen/notardolmetscher/', label: 'Notardolmetscher' }, { href: '/de/vollmacht-uebersetzung/', label: 'Vollmacht übersetzen' }]],
    faqs: [['Übersetzen Sie auch Urteile beglaubigt?', 'Ja. Urteile, Beschlüsse und weitere Gerichtsdokumente übersetzen unsere ermächtigten Übersetzer auf Wunsch beglaubigt.']],
  }),
  '/de/fachuebersetzungen/medizinische-dentalmedizin': specialistPage({
    certified: true,
    description: 'Medizinische Fachübersetzung: Arztberichte, Befunde und Unterlagen für die Approbation – auch Dentalmedizin, auf Wunsch beglaubigt. Ab 0,12 € pro Wort.',
    documents: '• Arztberichte, Befunde und Entlassungsbriefe\n• Laborwerte, Gutachten und Impfnachweise\n• Unterlagen für Approbation und Berufserlaubnis: Diplome, Fächer- und Stundenübersichten, Praktikumsnachweise\n• zahnmedizinische Befunde, Behandlungspläne und Kostenvoranschläge\n• Patienteninformationen und Fachartikel',
    clients: 'Wir übersetzen für Patientinnen und Patienten, Ärztinnen und Ärzte, Zahnarztpraxen, Kliniken, Pflegeeinrichtungen und Gesundheitsfachkräfte aus dem Ausland, die ihre Abschlüsse in Deutschland anerkennen lassen.',
    focus: ['Für Approbation und Berufsanerkennung', 'Wer als Ärztin, Zahnarzt, Apothekerin oder Pflegefachkraft in Deutschland arbeiten möchte, braucht für die Anerkennung meist beglaubigte Übersetzungen von Diplom, Fächerübersicht und weiteren Nachweisen. Welche Unterlagen genau verlangt werden, legt die zuständige Behörde fest – senden Sie uns gern deren Liste.',
      [{ href: '/de/zeugnis-uebersetzung/', label: 'Zeugnisse übersetzen' }, { href: '/de/fuehrungszeugnis-uebersetzung/', label: 'Führungszeugnis übersetzen' }]],
    faqs: [['Übersetzen Sie Unterlagen für die Approbation?', 'Ja. Diplome, Fächer- und Stundenübersichten, Praktikumsnachweise und weitere Unterlagen übersetzen wir beglaubigt.']],
  }),
  '/de/fachuebersetzungen/wirtschaft-finanzen': specialistPage({
    certified: true,
    description: 'Fachübersetzung Wirtschaft und Finanzen: Jahresabschlüsse, Handelsregisterauszüge, Bankunterlagen und Verträge – vertraulich, ab 0,12 € pro Wort.',
    documents: '• Jahresabschlüsse, Bilanzen und Geschäftsberichte\n• Handelsregisterauszüge und Gesellschafterlisten\n• Kontoauszüge, Gehaltsnachweise und Steuerbescheide\n• Businesspläne, Präsentationen und Ausschreibungen\n• Verträge und Geschäftskorrespondenz',
    clients: 'Wir übersetzen für Unternehmen, Steuerberater, Banken, Investoren und Privatpersonen – etwa für Gründungen, Finanzierungen, Ausschreibungen oder Anträge bei Behörden.',
    focus: ['Zahlen und Begriffe exakt', 'In Finanztexten zählt jede Zahl. Wir übernehmen Zahlenformate, Währungen und Tabellen sorgfältig und übersetzen Fachbegriffe aus Rechnungslegung und Steuerrecht einheitlich.',
      [{ href: '/de/fachuebersetzungen/recht/', label: 'Juristische Übersetzungen' }, { href: '/de/standorte/duesseldorf/', label: 'Übersetzungen Düsseldorf' }]],
    faqs: [['Übersetzen Sie Kontoauszüge und Gehaltsnachweise für Behörden?', 'Ja, auf Wunsch beglaubigt – zum Beispiel für Visum, Aufenthaltstitel oder Familiennachzug.']],
  }),
  '/de/fachuebersetzungen/ingenieurwesen': specialistPage({
    description: 'Technische Übersetzung: Bedienungsanleitungen, technische Dokumentation, Datenblätter und Spezifikationen – einheitlich, ab 0,12 € pro Wort.',
    documents: '• Bedienungs-, Montage- und Wartungsanleitungen\n• technische Dokumentation und Spezifikationen\n• Datenblätter, Prüfberichte und Zertifikate\n• Ausschreibungen und Angebote\n• Sicherheitshinweise und Schulungsunterlagen',
    clients: 'Wir übersetzen für Maschinen- und Anlagenbauer, Zulieferer, Ingenieurbüros, Bauunternehmen und Handelsunternehmen – für Export, Kunden im Ausland und internationale Teams.',
    focus: ['Einheitliche Terminologie', 'Technische Texte wiederholen viele Begriffe. Wir übersetzen sie im ganzen Dokument einheitlich und übernehmen auf Wunsch Ihre vorhandene Terminologie. Tabellen, Maße und Einheiten bleiben vollständig erhalten.'],
    faqs: [['Können Sie unser Layout übernehmen?', 'Ja. Senden Sie uns die Datei möglichst in einem bearbeitbaren Format, dann bleiben Tabellen und Aufbau erhalten.']],
  }),
  '/de/fachuebersetzungen/pharmazeutik': specialistPage({
    description: 'Pharmazeutische Fachübersetzung: Beipackzettel, Fachinformationen, Studien- und Zulassungsunterlagen – präzise Terminologie, ab 0,12 € pro Wort.',
    documents: '• Packungsbeilagen und Fachinformationen\n• Studienprotokolle und Patienteninformationen\n• Zulassungs- und Registrierungsunterlagen\n• Qualitätsdokumente, Analysezertifikate und Prüfberichte\n• Schulungs- und Marketingmaterial',
    clients: 'Wir übersetzen für pharmazeutische Unternehmen, Apotheken, Labore, Großhändler und Agenturen im Gesundheitswesen.',
    focus: ['Präzision bei Wirkstoffen und Dosierungen', 'In pharmazeutischen Texten können Fehler Folgen haben. Wirkstoffbezeichnungen, Dosierungen, Einheiten und Warnhinweise übernehmen wir deshalb besonders sorgfältig und einheitlich.'],
    faqs: [['Übersetzen Sie auch Unterlagen für Apothekerinnen und Apotheker aus dem Ausland?', 'Ja. Diplome und Ausbildungsnachweise für die Anerkennung übersetzen wir beglaubigt.']],
  }),
  '/de/fachuebersetzungen/it-software': specialistPage({
    description: 'IT- und Softwareübersetzung: Benutzeroberflächen, Handbücher, Webseiten und IT-Verträge – einheitliche Terminologie, ab 0,12 € pro Wort.',
    documents: '• Benutzeroberflächen und Apps\n• Handbücher, Hilfetexte und Release Notes\n• Webseiten und Onlineshops\n• Datenschutzerklärungen, Lizenz- und IT-Verträge\n• Schulungs- und Supportunterlagen',
    clients: 'Wir übersetzen für Softwareunternehmen, Start-ups, Agenturen, Onlineshops und IT-Abteilungen.',
    focus: ['Texte, die in die Oberfläche passen', 'Bei Benutzeroberflächen zählt jeder Buchstabe. Wir achten auf Kürze, einheitliche Begriffe und Platzhalter wie Variablen und Formatierungen. Senden Sie uns die Texte gern in der Originaldatei, etwa als Tabelle oder Exportdatei.'],
    faqs: [['Welche Dateiformate können Sie bearbeiten?', 'Am einfachsten sind Word-, Excel- und gängige Exportdateien. Welche Formate für Ihr Projekt passen, klären wir vorab.']],
  }),
  '/de/fachuebersetzungen/chemie-biowissenschaften': specialistPage({
    description: 'Fachübersetzung Chemie und Biowissenschaften: Sicherheitsdatenblätter, Laborberichte, Analysezertifikate und Studien – ab 0,12 € pro Wort.',
    documents: '• Sicherheitsdatenblätter und Produktinformationen\n• Laborberichte und Analysezertifikate\n• wissenschaftliche Artikel und Studien\n• Förder- und Projektanträge\n• Schulungs- und Arbeitsschutzunterlagen',
    clients: 'Wir übersetzen für Chemie- und Laborunternehmen, Forschungseinrichtungen, Hochschulen und Behörden.',
    focus: ['Fachbegriffe, Formeln und Einheiten', 'Chemische Bezeichnungen, Formeln, Einheiten und Gefahrenhinweise übernehmen wir exakt. Fachbegriffe übersetzen wir im ganzen Dokument einheitlich.'],
    faqs: [['Übersetzen Sie wissenschaftliche Artikel?', 'Ja, Artikel, Studien und Projektanträge aus Chemie und Biowissenschaften übersetzen wir fachgerecht.']],
  }),
  '/de/fachuebersetzungen/literatur': specialistPage({
    description: 'Literarische Übersetzung: Bücher, Sachbücher, Gedichte und kreative Texte – stilsicher, mit Gespür für Ton und Rhythmus. Ab 0,12 € pro Wort.',
    documents: '• Romane, Kurzgeschichten und Gedichte\n• Sachbücher und Ratgeber\n• Biografien und Erinnerungen\n• Kinder- und Jugendbücher\n• kreative Texte für Webseiten und Kampagnen',
    clients: 'Wir übersetzen für Autorinnen und Autoren, Verlage, Selfpublisher, Kultureinrichtungen und Agenturen.',
    focus: ['Stil, Ton und Rhythmus', 'Bei literarischen Texten geht es nicht nur um den Inhalt, sondern um Stimme, Ton und Rhythmus. Wir übertragen den Stil des Originals so, dass der Text auch in der Zielsprache wirkt.'],
    faqs: [['Kann ich zuerst eine Probeübersetzung bekommen?', 'Sprechen Sie uns an – bei größeren Projekten klären wir gern vorab, wie wir den Stil Ihres Textes treffen.']],
  }),
};

// ---------------------------------------------------------------- more service-area cities
const MORE_CITIES = {
  '/de/standorte/hamburg': cityPage({
    city: 'Hamburg',
    region: 'Hamburg',
    description: 'Übersetzungsbüro Hamburg: beglaubigte Übersetzungen für Ausländerbehörde, Standesamt und Gericht sowie Dolmetscher – digital, Express am selben Tag.',
    intro: 'Beglaubigte Übersetzungen und Dolmetscher für Hamburg: Urkunden, Zeugnisse und Führerscheine übersetzen unsere ermächtigten Übersetzer komplett digital, Dolmetscher für Ihre Termine in Hamburg organisieren wir vor Ort, per Video oder Telefon.',
    authorities: '• Amt für Migration (Ausländerbehörde) und Hamburg Welcome Center: Aufenthaltstitel, Familiennachzug und Einbürgerung\n• Standesämter der Hamburger Bezirke: Anmeldung der Eheschließung, Geburtsbeurkundung\n• Universität Hamburg und HAW Hamburg: Zeugnisse und Diplome\n• Amtsgericht, Landgericht und Hanseatisches Oberlandesgericht Hamburg: Urteile, Beschlüsse und Vollmachten\n• Unternehmen aus Handel und Logistik: Verträge und Geschäftsunterlagen',
    focus: ['Für Unternehmen aus Handel und Logistik', 'Für Hamburger Unternehmen übersetzen wir Verträge, Handelsregisterauszüge, Zolldokumente und Geschäftskorrespondenz – auf Wunsch beglaubigt.',
      [{ href: '/de/fachuebersetzungen/wirtschaft-finanzen/', label: 'Wirtschaft und Finanzen' }, { href: '/de/fachuebersetzungen/recht/', label: 'Juristische Übersetzungen' }]],
    nearby: 'Unser nächstgelegenes Büro ist Kiel in der Bothwellstraße 25.',
    faqs: [['Betreuen Sie auch das Hamburger Umland?', 'Ja. Kundinnen und Kunden aus Hamburg und dem Umland senden ihre Dokumente digital und erhalten die Übersetzung per E-Mail und auf Wunsch per Post.']],
  }),
  '/de/standorte/essen': cityPage({
    city: 'Essen',
    region: 'Nordrhein-Westfalen',
    description: 'Übersetzungsbüro Essen: beglaubigte Übersetzungen für Ausländerbehörde, Standesamt und Gericht sowie Dolmetscher im Ruhrgebiet – Express am selben Tag.',
    intro: 'Beglaubigte Übersetzungen und Dolmetscher für Essen und das Ruhrgebiet: Urkunden, Zeugnisse und Führerscheine übersetzen unsere ermächtigten Übersetzer komplett digital, Dolmetscher für Ihre Termine organisieren wir vor Ort, per Video oder Telefon.',
    authorities: '• Ausländerbehörde der Stadt Essen: Aufenthaltstitel, Familiennachzug und Einbürgerung\n• Standesamt Essen: Anmeldung der Eheschließung, Geburtsbeurkundung\n• Universität Duisburg-Essen und Folkwang Universität: Zeugnisse und Diplome\n• Amtsgericht und Landgericht Essen: Urteile, Beschlüsse und Vollmachten',
    focus: ['Essen und das Ruhrgebiet', 'Wir betreuen Essen und die Nachbarstädte – etwa Bochum, Gelsenkirchen, Mülheim an der Ruhr und Oberhausen – vollständig digital.',
      [{ href: '/de/standorte/bochum/', label: 'Übersetzungen Bochum' }, { href: '/de/standorte/dortmund/', label: 'Übersetzungen Dortmund' }, { href: '/de/standorte/duesseldorf/', label: 'Übersetzungen Düsseldorf' }]],
    nearby: 'Unsere nächstgelegenen Büros sind Bielefeld und Osnabrück.',
    faqs: [['Betreuen Sie auch Gelsenkirchen und Mülheim?', 'Ja. Das gesamte Ruhrgebiet betreuen wir digital; die Übersetzung erhalten Sie per E-Mail und auf Wunsch per Post.']],
  }),
  '/de/standorte/bochum': cityPage({
    city: 'Bochum',
    region: 'Nordrhein-Westfalen',
    description: 'Übersetzungsbüro Bochum: beglaubigte Übersetzungen von Urkunden und Zeugnissen sowie Dolmetscher – komplett digital, Express am selben Tag.',
    intro: 'Beglaubigte Übersetzungen und Dolmetscher für Bochum: Urkunden, Zeugnisse und Führerscheine übersetzen unsere ermächtigten Übersetzer komplett digital, Dolmetscher für Ihre Termine organisieren wir vor Ort, per Video oder Telefon.',
    authorities: '• Ausländerbehörde der Stadt Bochum: Aufenthaltstitel, Familiennachzug und Einbürgerung\n• Standesamt Bochum: Anmeldung der Eheschließung, Geburtsbeurkundung\n• Ruhr-Universität Bochum und Hochschule Bochum: Zeugnisse, Diplome und Transcripts\n• Amtsgericht und Landgericht Bochum: Urteile, Beschlüsse und Vollmachten',
    focus: ['Für Studierende in Bochum', 'Für Bewerbungen an der Ruhr-Universität und anderen Hochschulen übersetzen wir Schulzeugnisse, Diplome und Transcripts beglaubigt – oft innerhalb weniger Tage.',
      [{ href: '/de/zeugnis-uebersetzung/', label: 'Zeugnisse übersetzen' }]],
    nearby: 'Unsere nächstgelegenen Büros sind Bielefeld und Osnabrück.',
    faqs: [['Übersetzen Sie Zeugnisse für die Ruhr-Universität?', 'Ja. Zeugnisse, Diplome und Transcripts übersetzen wir beglaubigt für die Bewerbung an Hochschulen.']],
  }),
  '/de/standorte/wuppertal': cityPage({
    city: 'Wuppertal',
    region: 'Nordrhein-Westfalen',
    description: 'Übersetzungsbüro Wuppertal: beglaubigte Übersetzungen für Ausländerbehörde, Standesamt und Gericht sowie Dolmetscher für das Bergische Land – digital.',
    intro: 'Beglaubigte Übersetzungen und Dolmetscher für Wuppertal, Solingen und Remscheid: Urkunden, Zeugnisse und Führerscheine übersetzen unsere ermächtigten Übersetzer komplett digital, Dolmetscher für Ihre Termine organisieren wir vor Ort, per Video oder Telefon.',
    authorities: '• Ausländerbehörde der Stadt Wuppertal: Aufenthaltstitel, Familiennachzug und Einbürgerung\n• Standesamt Wuppertal: Anmeldung der Eheschließung, Geburtsbeurkundung\n• Bergische Universität Wuppertal: Zeugnisse und Diplome\n• Amtsgericht und Landgericht Wuppertal: Urteile, Beschlüsse und Vollmachten',
    focus: ['Wuppertal und das Bergische Land', 'Wir betreuen Wuppertal sowie Solingen, Remscheid und Velbert vollständig digital.',
      [{ href: '/de/standorte/duesseldorf/', label: 'Übersetzungen Düsseldorf' }, { href: '/de/standorte/koeln/', label: 'Übersetzungen Köln' }]],
    nearby: 'Unsere nächstgelegenen Büros sind Bielefeld und Mainz.',
    faqs: [['Betreuen Sie auch Solingen und Remscheid?', 'Ja, das gesamte Bergische Land betreuen wir digital.']],
  }),
  '/de/standorte/hannover': cityPage({
    city: 'Hannover',
    region: 'Niedersachsen',
    description: 'Übersetzungsbüro Hannover: beglaubigte Übersetzungen für Ausländerbehörde, Standesamt, Hochschulen und Gericht sowie Dolmetscher – komplett digital.',
    intro: 'Beglaubigte Übersetzungen und Dolmetscher für die Landeshauptstadt Hannover und die Region: Urkunden, Zeugnisse und Führerscheine übersetzen unsere ermächtigten Übersetzer komplett digital, Dolmetscher für Ihre Termine organisieren wir vor Ort, per Video oder Telefon.',
    authorities: '• Ausländerbehörden der Landeshauptstadt und der Region Hannover: Aufenthaltstitel, Familiennachzug und Einbürgerung\n• Standesamt Hannover: Anmeldung der Eheschließung, Geburtsbeurkundung\n• Leibniz Universität, Medizinische Hochschule und Hochschule Hannover: Zeugnisse, Diplome und Unterlagen für die Approbation\n• Amtsgericht und Landgericht Hannover: Urteile, Beschlüsse und Vollmachten',
    focus: ['Für Gesundheitsberufe', 'Für Ärztinnen, Pflegekräfte und andere Gesundheitsfachkräfte, die ihre Abschlüsse in Niedersachsen anerkennen lassen, übersetzen wir Diplome, Fächerübersichten und Nachweise beglaubigt.',
      [{ href: '/de/fachuebersetzungen/medizinische-dentalmedizin/', label: 'Medizinische Übersetzungen' }, { href: '/de/zeugnis-uebersetzung/', label: 'Zeugnisse übersetzen' }]],
    nearby: 'Unsere nächstgelegenen Büros sind Bielefeld und Osnabrück.',
    faqs: [['Betreuen Sie auch die Region Hannover?', 'Ja. Kundinnen und Kunden aus der gesamten Region senden ihre Dokumente digital und erhalten die Übersetzung per E-Mail und auf Wunsch per Post.']],
  }),
  '/de/standorte/leipzig': cityPage({
    city: 'Leipzig',
    region: 'Sachsen',
    description: 'Übersetzungsbüro Leipzig: beglaubigte Übersetzungen für Ausländerbehörde, Standesamt, Universität und Gericht sowie Dolmetscher – Express möglich.',
    intro: 'Beglaubigte Übersetzungen und Dolmetscher für Leipzig: Urkunden, Zeugnisse und Führerscheine übersetzen unsere ermächtigten Übersetzer komplett digital, Dolmetscher für Ihre Termine organisieren wir vor Ort, per Video oder Telefon.',
    authorities: '• Ausländerbehörde der Stadt Leipzig: Aufenthaltstitel, Familiennachzug und Einbürgerung\n• Standesamt Leipzig: Anmeldung der Eheschließung, Geburtsbeurkundung\n• Universität Leipzig und HTWK Leipzig: Zeugnisse und Diplome\n• Amtsgericht und Landgericht Leipzig: Urteile, Beschlüsse und Vollmachten',
    focus: ['Leipzig und Halle', 'Wir betreuen Leipzig, Halle (Saale) und das Umland vollständig digital – von der Anfrage bis zur Lieferung per E-Mail und Post.',
      [{ href: '/de/standorte/dresden/', label: 'Übersetzungen Dresden' }, { href: '/de/standorte/berlin/', label: 'Übersetzungsbüro Berlin' }]],
    nearby: 'Unser nächstgelegenes Büro ist Berlin in der Potsdamer Straße 63.',
    faqs: [['Betreuen Sie auch Halle?', 'Ja, Halle (Saale) und das Leipziger Umland betreuen wir digital.']],
  }),
  '/de/standorte/dresden': cityPage({
    city: 'Dresden',
    region: 'Sachsen',
    description: 'Übersetzungsbüro Dresden: beglaubigte Übersetzungen für Ausländerbehörde, Standesamt, TU Dresden und Gericht sowie Dolmetscher – Express am selben Tag.',
    intro: 'Beglaubigte Übersetzungen und Dolmetscher für die Landeshauptstadt Dresden: Urkunden, Zeugnisse und Führerscheine übersetzen unsere ermächtigten Übersetzer komplett digital, Dolmetscher für Ihre Termine organisieren wir vor Ort, per Video oder Telefon.',
    authorities: '• Ausländerbehörde der Landeshauptstadt Dresden: Aufenthaltstitel, Familiennachzug und Einbürgerung\n• Standesamt Dresden: Anmeldung der Eheschließung, Geburtsbeurkundung\n• TU Dresden und HTW Dresden: Zeugnisse, Diplome und Transcripts\n• Amtsgericht, Landgericht und Oberlandesgericht Dresden: Urteile, Beschlüsse und Vollmachten',
    focus: ['Für Forschung und Studium', 'Für Bewerbungen an Hochschulen und Forschungseinrichtungen in Dresden übersetzen wir Zeugnisse, Diplome und Transcripts beglaubigt sowie wissenschaftliche Unterlagen als Fachübersetzung.',
      [{ href: '/de/zeugnis-uebersetzung/', label: 'Zeugnisse übersetzen' }, { href: '/de/fachuebersetzungen/chemie-biowissenschaften/', label: 'Wissenschaftliche Übersetzungen' }]],
    nearby: 'Unser nächstgelegenes Büro ist Berlin in der Potsdamer Straße 63.',
    faqs: [['Übersetzen Sie Unterlagen für die TU Dresden?', 'Ja. Zeugnisse, Diplome und Transcripts übersetzen wir beglaubigt für die Bewerbung.']],
  }),
  '/de/standorte/braunschweig': cityPage({
    city: 'Braunschweig',
    region: 'Niedersachsen',
    description: 'Übersetzungsbüro Braunschweig: beglaubigte Übersetzungen für Ausländerbehörde, Standesamt und Gericht, technische Fachübersetzungen und Dolmetscher.',
    intro: 'Beglaubigte Übersetzungen, technische Fachübersetzungen und Dolmetscher für Braunschweig, Wolfsburg und Salzgitter: Urkunden und Zeugnisse übersetzen unsere ermächtigten Übersetzer komplett digital, Dolmetscher für Ihre Termine organisieren wir vor Ort, per Video oder Telefon.',
    authorities: '• Ausländerbehörde der Stadt Braunschweig: Aufenthaltstitel, Familiennachzug und Einbürgerung\n• Standesamt Braunschweig: Anmeldung der Eheschließung, Geburtsbeurkundung\n• TU Braunschweig und Ostfalia Hochschule: Zeugnisse und Diplome\n• Amtsgericht, Landgericht und Oberlandesgericht Braunschweig: Urteile, Beschlüsse und Vollmachten',
    focus: ['Technische Übersetzungen für die Region', 'Für Unternehmen aus Fahrzeugbau, Zulieferindustrie und Forschung in Braunschweig, Wolfsburg und Salzgitter übersetzen wir technische Dokumentation, Spezifikationen und Verträge.',
      [{ href: '/de/fachuebersetzungen/ingenieurwesen/', label: 'Technische Übersetzungen' }]],
    nearby: 'Unsere nächstgelegenen Büros sind Bielefeld und Berlin.',
    faqs: [['Betreuen Sie auch Wolfsburg und Salzgitter?', 'Ja, die gesamte Region betreuen wir digital.']],
  }),
  '/de/standorte/oldenburg': cityPage({
    city: 'Oldenburg',
    region: 'Niedersachsen',
    description: 'Übersetzungsbüro Oldenburg: beglaubigte Übersetzungen für Ausländerbehörde, Standesamt und Gericht sowie Dolmetscher für das Oldenburger Land.',
    intro: 'Beglaubigte Übersetzungen und Dolmetscher für Oldenburg und das Oldenburger Land: Urkunden, Zeugnisse und Führerscheine übersetzen unsere ermächtigten Übersetzer komplett digital, Dolmetscher für Ihre Termine organisieren wir vor Ort, per Video oder Telefon.',
    authorities: '• Ausländerbehörde der Stadt Oldenburg: Aufenthaltstitel, Familiennachzug und Einbürgerung\n• Standesamt Oldenburg: Anmeldung der Eheschließung, Geburtsbeurkundung\n• Carl von Ossietzky Universität und Jade Hochschule: Zeugnisse und Diplome\n• Amtsgericht, Landgericht und Oberlandesgericht Oldenburg: Urteile, Beschlüsse und Vollmachten',
    focus: ['Oldenburg und Umgebung', 'Wir betreuen Oldenburg sowie Delmenhorst, Cloppenburg, Vechta und Wilhelmshaven vollständig digital.',
      [{ href: '/de/standorte/bremen/', label: 'Übersetzungen Bremen' }, { href: '/de/standorte/osnabrueck/', label: 'Übersetzungsbüro Osnabrück' }]],
    nearby: 'Unser nächstgelegenes Büro ist Osnabrück am Rosenplatz 17.',
    faqs: [['Betreuen Sie auch Cloppenburg und Vechta?', 'Ja, das gesamte Oldenburger Land betreuen wir digital.']],
  }),
  '/de/standorte/rheine': cityPage({
    city: 'Rheine',
    region: 'Nordrhein-Westfalen',
    description: 'Übersetzungsbüro Rheine: beglaubigte Übersetzungen von Urkunden, Zeugnissen und Führerscheinen sowie Dolmetscher im Kreis Steinfurt – nah an Osnabrück.',
    intro: 'Beglaubigte Übersetzungen und Dolmetscher für Rheine und den Kreis Steinfurt: Urkunden, Zeugnisse und Führerscheine übersetzen unsere ermächtigten Übersetzer komplett digital – und unser Hauptsitz in Osnabrück ist nicht weit.',
    authorities: '• Ausländerbehörde: Aufenthaltstitel, Familiennachzug und Einbürgerung\n• Standesamt Rheine: Anmeldung der Eheschließung, Geburtsbeurkundung\n• Führerscheinstelle: Umschreibung ausländischer Führerscheine\n• Amtsgericht Rheine: Urteile, Beschlüsse und Vollmachten',
    focus: ['Nah an unserem Hauptsitz', 'Rheine liegt nah an unserem Hauptsitz in Osnabrück. Wenn Sie lieber persönlich vorbeikommen, vereinbaren Sie einen Termin am Rosenplatz 17 – ansonsten erledigen Sie alles bequem digital.',
      [{ href: '/de/standorte/osnabrueck/', label: 'Übersetzungsbüro Osnabrück' }, { href: '/de/standorte/ibbenbueren/', label: 'Übersetzungen Ibbenbüren' }, { href: '/de/standorte/lingen/', label: 'Übersetzungen Lingen' }]],
    nearby: 'Unser nächstgelegenes Büro ist unser Hauptsitz in Osnabrück am Rosenplatz 17.',
    faqs: [['Kann ich in Osnabrück persönlich vorbeikommen?', 'Ja, nach Terminvereinbarung am Rosenplatz 17 in Osnabrück.']],
  }),
  '/de/standorte/lingen': cityPage({
    city: 'Lingen (Ems)',
    region: 'Niedersachsen',
    description: 'Übersetzungsbüro Lingen: beglaubigte Übersetzungen von Urkunden, Zeugnissen und Führerscheinen sowie Dolmetscher für das Emsland – nah an Osnabrück.',
    intro: 'Beglaubigte Übersetzungen und Dolmetscher für Lingen (Ems) und das Emsland: Urkunden, Zeugnisse und Führerscheine übersetzen unsere ermächtigten Übersetzer komplett digital – und unser Hauptsitz in Osnabrück ist nicht weit.',
    authorities: '• Ausländerbehörde: Aufenthaltstitel, Familiennachzug und Einbürgerung\n• Standesamt Lingen: Anmeldung der Eheschließung, Geburtsbeurkundung\n• Hochschule Osnabrück, Campus Lingen: Zeugnisse und Diplome\n• Amtsgericht Lingen: Urteile, Beschlüsse und Vollmachten',
    focus: ['Für Lingen und das Emsland', 'Wir betreuen Lingen sowie Meppen, Nordhorn und Papenburg vollständig digital. Wenn Sie lieber persönlich vorbeikommen, vereinbaren Sie einen Termin in unserem Hauptsitz in Osnabrück.',
      [{ href: '/de/standorte/osnabrueck/', label: 'Übersetzungsbüro Osnabrück' }, { href: '/de/standorte/rheine/', label: 'Übersetzungen Rheine' }]],
    nearby: 'Unser nächstgelegenes Büro ist unser Hauptsitz in Osnabrück am Rosenplatz 17.',
    faqs: [['Betreuen Sie auch Meppen und Nordhorn?', 'Ja, das gesamte Emsland und die Grafschaft Bentheim betreuen wir digital.']],
  }),
  '/de/standorte/ibbenbueren': cityPage({
    city: 'Ibbenbüren',
    region: 'Nordrhein-Westfalen',
    description: 'Übersetzungsbüro Ibbenbüren: beglaubigte Übersetzungen von Urkunden, Zeugnissen und Führerscheinen sowie Dolmetscher – nah an unserem Büro Osnabrück.',
    intro: 'Beglaubigte Übersetzungen und Dolmetscher für Ibbenbüren und das Tecklenburger Land: Urkunden, Zeugnisse und Führerscheine übersetzen unsere ermächtigten Übersetzer komplett digital – und unser Hauptsitz in Osnabrück ist nur wenige Kilometer entfernt.',
    authorities: '• Ausländerbehörde: Aufenthaltstitel, Familiennachzug und Einbürgerung\n• Standesamt Ibbenbüren: Anmeldung der Eheschließung, Geburtsbeurkundung\n• Führerscheinstelle: Umschreibung ausländischer Führerscheine\n• Amtsgericht Ibbenbüren: Urteile, Beschlüsse und Vollmachten',
    focus: ['Nah an unserem Hauptsitz', 'Ibbenbüren liegt direkt vor den Toren Osnabrücks. Wenn Sie lieber persönlich vorbeikommen, vereinbaren Sie einen Termin am Rosenplatz 17 – ansonsten erledigen Sie alles bequem digital.',
      [{ href: '/de/standorte/osnabrueck/', label: 'Übersetzungsbüro Osnabrück' }, { href: '/de/standorte/rheine/', label: 'Übersetzungen Rheine' }]],
    nearby: 'Unser nächstgelegenes Büro ist unser Hauptsitz in Osnabrück am Rosenplatz 17.',
    faqs: [['Kann ich in Osnabrück persönlich vorbeikommen?', 'Ja, nach Terminvereinbarung am Rosenplatz 17 in Osnabrück.']],
  }),
};

export const PAGE_UPGRADES = { ...CITIES, ...MORE_CITIES, ...DOCUMENTS, ...INTERPRETING, ...CERTIFIED, ...SPECIALIST };

// ---------------------------------------------------------------- new pages
function newPage(page) {
  return { kind: 'service', lang: 'de', serviceGroup: 'document', updated: UPDATED, ...page, path: `/de/${page.slug}` };
}

function newDocumentPage({ slug, group, eyebrow, title, metaTitle, serviceType, ...content }) {
  return newPage({ slug, group, eyebrow, title, metaTitle, serviceType, ...documentPage(content) });
}

const NEW_DOCUMENT_PAGES = [
  newDocumentPage({
    slug: 'scheidungsurteil-uebersetzung',
    group: 'divorce-decree-translation',
    eyebrow: 'Scheidungsurteil Übersetzung',
    title: 'Scheidungsurteil beglaubigt übersetzen lassen.',
    metaTitle: 'Scheidungsurteil übersetzen lassen – beglaubigt | Noon Übersetzungsbüro',
    serviceType: 'Scheidungsurteil Übersetzung',
    description: 'Scheidungsurteil übersetzen lassen: beglaubigt mit Rechtskraftvermerk für Standesamt, Anerkennung und Einbürgerung – ab 39 €, Express am selben Tag.',
    intro: 'Sie möchten in Deutschland erneut heiraten, Ihre ausländische Scheidung anerkennen lassen oder sich einbürgern lassen? Dann brauchen Sie Ihr Scheidungsurteil meist als beglaubigte Übersetzung. Unsere ermächtigten Übersetzer übersetzen Scheidungsurteile und Scheidungsurkunden aus allen Sprachen – vollständig und mit allen Vermerken.',
    highlights: ['Für Heirat und Anerkennung', 'Mit Rechtskraftvermerk', 'Express am selben Tag'],
    uses: [
      ['Wofür brauche ich ein übersetztes Scheidungsurteil?', '• erneute Eheschließung in Deutschland: Das Standesamt prüft, ob die frühere Ehe wirksam geschieden ist\n• Anerkennung einer ausländischen Scheidung: In vielen Fällen muss sie zusätzlich von der Landesjustizverwaltung anerkannt werden – auch dafür wird das Urteil übersetzt\n• Einbürgerung und Aufenthaltstitel\n• Namensführung, Unterhalt und Erbangelegenheiten\n\nWelche Unterlagen genau nötig sind, legt die jeweilige Stelle fest.',
        [STANDESAMT_LINK, { href: '/de/ledigkeitsbescheinigung-uebersetzung/', label: 'Ledigkeitsbescheinigung übersetzen' }]],
    ],
    details: ['Was wir übersetzen', 'Wir übersetzen das Scheidungsurteil vollständig – einschließlich Begründung, Rechtskraftvermerk, Stempeln und Beglaubigungen. Der Rechtskraftvermerk ist besonders wichtig, weil er zeigt, dass die Scheidung endgültig ist. Auch Scheidungsurkunden von Standesämtern und religiösen Stellen übersetzen wir. Namen übertragen wir in der Schreibweise Ihres Reisepasses.'],
    languages: 'Besonders häufig übersetzen wir Scheidungsurteile aus dem Arabischen, Persischen, Türkischen, Ukrainischen und Russischen.',
    related: [{ href: '/de/heiratsurkunde-uebersetzung/', label: 'Heiratsurkunde übersetzen' }, { href: '/de/fachuebersetzungen/recht/', label: 'Juristische Übersetzungen' }],
    faqs: [
      ['Muss der Rechtskraftvermerk mit übersetzt werden?', 'Ja, wir übersetzen alle Vermerke auf dem Dokument. Der Rechtskraftvermerk zeigt, dass die Scheidung endgültig ist, und wird von Standesämtern meist verlangt.'],
      ['Übersetzen Sie auch religiöse Scheidungsurkunden?', 'Ja. Ob eine religiöse Scheidung in Deutschland anerkannt wird, entscheiden Standesamt bzw. Landesjustizverwaltung – die Übersetzung erstellen wir in jedem Fall vollständig.'],
    ],
  }),
  newDocumentPage({
    slug: 'ledigkeitsbescheinigung-uebersetzung',
    group: 'certificate-of-no-impediment-translation',
    eyebrow: 'Ledigkeitsbescheinigung Übersetzung',
    title: 'Ledigkeitsbescheinigung und Ehefähigkeitszeugnis übersetzen lassen.',
    metaTitle: 'Ledigkeitsbescheinigung übersetzen lassen – beglaubigt | Noon Übersetzungsbüro',
    serviceType: 'Ledigkeitsbescheinigung Übersetzung',
    description: 'Ledigkeitsbescheinigung und Ehefähigkeitszeugnis übersetzen lassen: beglaubigt für die Anmeldung der Eheschließung – ab 39 €, Express am selben Tag.',
    intro: 'Für die Anmeldung der Eheschließung verlangt das Standesamt von ausländischen Verlobten meist einen Nachweis, dass sie ledig sind – etwa eine Ledigkeitsbescheinigung oder ein Ehefähigkeitszeugnis. Unsere ermächtigten Übersetzer übersetzen diese Nachweise aus allen Sprachen beglaubigt, und auch deutsche Bescheinigungen für eine Heirat im Ausland.',
    highlights: ['Für die Heirat', 'In beide Richtungen', 'Express am selben Tag'],
    uses: [
      ['Welche Nachweise sind gemeint?', '• Ledigkeitsbescheinigung bzw. Familienstandsbescheinigung aus dem Herkunftsland\n• Ehefähigkeitszeugnis\n• Bescheinigungen von Botschaften und Konsulaten\n• deutsche Ledigkeits- oder Familienstandsnachweise für eine Heirat im Ausland\n\nViele Standesämter verlangen, dass solche Nachweise nicht zu alt sind – oft höchstens sechs Monate. Klären Sie die Frist bitte vorab mit Ihrem Standesamt.'],
      ['Ohne Ehefähigkeitszeugnis?', 'Stellt Ihr Herkunftsland kein Ehefähigkeitszeugnis aus, kann eine Befreiung durch das Oberlandesgericht beantragt werden. Das Standesamt leitet den Antrag weiter – auch dafür werden Ihre Urkunden in beglaubigter Übersetzung benötigt.',
        [STANDESAMT_LINK, { href: '/de/geburtsurkunde-uebersetzung/', label: 'Geburtsurkunde übersetzen' }, { href: '/de/scheidungsurteil-uebersetzung/', label: 'Scheidungsurteil übersetzen' }]],
    ],
    details: ['Was wir übersetzen', 'Wir übersetzen die Bescheinigung vollständig – mit Ausstellungsdatum, Stempeln, Siegeln und Beglaubigungen. Namen übertragen wir in der Schreibweise Ihres Reisepasses, damit alle Unterlagen für das Standesamt übereinstimmen.'],
    languages: 'Besonders häufig übersetzen wir Ledigkeitsbescheinigungen aus dem Arabischen, Persischen, Türkischen, Ukrainischen und Russischen.',
    related: [{ href: '/de/dolmetschen/standesamt-dolmetscher/', label: 'Dolmetscher fürs Standesamt' }],
    faqs: [
      ['Wie alt darf die Ledigkeitsbescheinigung sein?', 'Das legt Ihr Standesamt fest – häufig höchstens sechs Monate. Lassen Sie die Übersetzung deshalb erst anfertigen, wenn Sie die aktuelle Bescheinigung haben.'],
      ['Übersetzen Sie auch deutsche Bescheinigungen für eine Heirat im Ausland?', 'Ja. Wir übersetzen auch aus dem Deutschen in die Sprache des Landes, in dem Sie heiraten möchten.'],
    ],
  }),
  newDocumentPage({
    slug: 'fuehrungszeugnis-uebersetzung',
    group: 'police-certificate-translation',
    eyebrow: 'Führungszeugnis Übersetzung',
    title: 'Führungszeugnis beglaubigt übersetzen lassen.',
    metaTitle: 'Führungszeugnis übersetzen lassen – beglaubigt | Noon Übersetzungsbüro',
    serviceType: 'Führungszeugnis Übersetzung',
    description: 'Führungszeugnis übersetzen lassen: für Visum und Arbeit im Ausland oder ausländische Polizeizeugnisse für deutsche Behörden – beglaubigt, ab 39 €.',
    intro: 'Ob Sie ein deutsches Führungszeugnis für ein Visum oder eine Stelle im Ausland brauchen oder ein ausländisches Polizeizeugnis für eine deutsche Behörde: Unsere ermächtigten Übersetzer übersetzen Führungszeugnisse in beide Richtungen beglaubigt – schnell und zum Festpreis.',
    highlights: ['In beide Richtungen', 'Für Visum und Anerkennung', 'Express am selben Tag'],
    uses: [
      ['Deutsches Führungszeugnis für das Ausland', 'Für Visum, Aufenthalt, Arbeit, Studium oder Adoption im Ausland verlangen viele Staaten ein deutsches Führungszeugnis in ihrer Landessprache. Häufig wird zusätzlich eine Apostille oder Legalisation verlangt – für das Führungszeugnis stellt sie in der Regel das Bundesamt für Justiz aus. Was genau nötig ist, erfahren Sie bei der Botschaft oder Stelle, die das Dokument verlangt.'],
      ['Ausländisches Polizeizeugnis für Deutschland', 'Deutsche Behörden verlangen ausländische Polizeiliche Führungszeugnisse zum Beispiel für die Anerkennung von Gesundheitsberufen, für bestimmte Aufenthaltstitel oder für Arbeitgeber. Diese Zeugnisse übersetzen wir beglaubigt ins Deutsche.',
        [{ href: '/de/fachuebersetzungen/medizinische-dentalmedizin/', label: 'Unterlagen für die Approbation' }, AUSLAENDER_LINK]],
    ],
    details: ['Was wir übersetzen', 'Wir übersetzen das Führungszeugnis vollständig – mit allen Einträgen, Vermerken, Stempeln und Siegeln. Bei deutschen Führungszeugnissen übernehmen wir die amtlichen Formulierungen so, dass die Stelle im Ausland sie eindeutig versteht.'],
    languages: 'Häufig übersetzen wir Führungszeugnisse ins Englische, Französische, Arabische und Türkische sowie Polizeizeugnisse aus diesen Sprachen ins Deutsche.',
    related: [{ href: '/de/zeugnis-uebersetzung/', label: 'Zeugnisse übersetzen' }],
    faqs: [
      ['Wer stellt die Apostille für das Führungszeugnis aus?', 'Für das deutsche Führungszeugnis in der Regel das Bundesamt für Justiz. Ob Sie eine Apostille brauchen, erfahren Sie bei der Stelle, die das Dokument verlangt.'],
      ['Ist mein Führungszeugnis nach der Übersetzung noch gültig?', 'Viele Stellen akzeptieren Führungszeugnisse nur, wenn sie nicht älter als einige Monate sind. Beantragen Sie es deshalb rechtzeitig – die Übersetzung erstellen wir auf Wunsch am selben Tag.'],
    ],
  }),
  newDocumentPage({
    slug: 'vollmacht-uebersetzung',
    group: 'power-of-attorney-translation',
    eyebrow: 'Vollmacht Übersetzung',
    title: 'Vollmacht beglaubigt übersetzen lassen.',
    metaTitle: 'Vollmacht übersetzen lassen – beglaubigt | Noon Übersetzungsbüro',
    serviceType: 'Vollmacht Übersetzung',
    description: 'Vollmacht übersetzen lassen: General-, Vorsorge- und notarielle Vollmachten für Behörden, Banken und Grundbuch – beglaubigt, ab 39 €, Express möglich.',
    intro: 'Sie möchten jemanden im Ausland mit dem Verkauf einer Immobilie, einer Erbschaft oder einem Behördengang beauftragen – oder eine ausländische Vollmacht in Deutschland verwenden? Unsere ermächtigten Übersetzer übersetzen Vollmachten in beide Richtungen beglaubigt.',
    highlights: ['In beide Richtungen', 'Auch notarielle Vollmachten', 'Express am selben Tag'],
    uses: [
      ['Wofür werden Vollmachten übersetzt?', '• Verkauf oder Kauf einer Immobilie im Heimatland oder in Deutschland\n• Erbschaften und Nachlassangelegenheiten\n• Behördengänge, Bank- und Gerichtsangelegenheiten\n• Vorsorge- und Generalvollmachten\n• Vollmachten für Unternehmen und Geschäftsführer'],
      ['Notar, Apostille und Übersetzung', 'Für die Verwendung im Ausland wird eine Vollmacht häufig vom Notar beglaubigt und mit einer Apostille oder Legalisation versehen. Die beglaubigte Übersetzung umfasst dann auch diese Vermerke. Welche Form das Zielland verlangt, erfahren Sie bei der zuständigen Stelle oder Botschaft. Für die Beurkundung beim Notar stellen wir auf Wunsch auch einen Dolmetscher.',
        [{ href: '/de/dolmetschen/notardolmetscher/', label: 'Notardolmetscher' }, { href: '/de/fachuebersetzungen/recht/', label: 'Juristische Übersetzungen' }]],
    ],
    details: ['Was wir übersetzen', 'Wir übersetzen die Vollmacht vollständig – mit allen Befugnissen, Unterschriftsvermerken, notariellen Beglaubigungen, Apostillen und Stempeln. Juristische Begriffe übertragen wir präzise, damit der Umfang der Vollmacht im Zielland eindeutig ist.'],
    languages: 'Häufig übersetzen wir Vollmachten ins Arabische, Türkische, Persische, Ukrainische und Russische sowie aus diesen Sprachen ins Deutsche.',
    related: [{ href: '/de/scheidungsurteil-uebersetzung/', label: 'Scheidungsurteil übersetzen' }],
    faqs: [
      ['Wird die Apostille mit übersetzt?', 'Ja. Wir übersetzen die Vollmacht einschließlich notarieller Beglaubigung und Apostille, wenn diese auf dem Dokument stehen.'],
      ['Können Sie auch einen Dolmetscher für den Notartermin stellen?', 'Ja, wir stellen beeidigte Dolmetscher für Beurkundungen beim Notar.'],
    ],
  }),
  newDocumentPage({
    slug: 'arbeitszeugnis-uebersetzung',
    group: 'employment-reference-translation',
    eyebrow: 'Arbeitszeugnis Übersetzung',
    title: 'Arbeitszeugnis übersetzen lassen.',
    metaTitle: 'Arbeitszeugnis übersetzen lassen – auch beglaubigt | Noon Übersetzungsbüro',
    serviceType: 'Arbeitszeugnis Übersetzung',
    description: 'Arbeitszeugnis übersetzen lassen: ins Englische für Bewerbungen im Ausland oder ins Deutsche für Anerkennung und Bewerbung – auf Wunsch beglaubigt.',
    intro: 'Für eine Bewerbung im Ausland, die Anerkennung Ihrer Berufserfahrung oder eine Stelle in Deutschland brauchen Sie Ihr Arbeitszeugnis in der passenden Sprache. Wir übersetzen deutsche Arbeitszeugnisse in andere Sprachen und ausländische Arbeitszeugnisse und Referenzschreiben ins Deutsche – auf Wunsch beglaubigt.',
    highlights: ['In beide Richtungen', 'Auf Wunsch beglaubigt', 'Express am selben Tag'],
    uses: [
      ['Wofür brauche ich ein übersetztes Arbeitszeugnis?', '• Bewerbung bei Arbeitgebern im Ausland\n• Bewerbung in Deutschland mit ausländischen Referenzen\n• Anerkennung der Berufserfahrung, etwa bei Gesundheits- und Handwerksberufen\n• Aufenthaltstitel für Fachkräfte und Blaue Karte EU'],
      ['Deutsche Zeugnissprache richtig übertragen', 'Deutsche Arbeitszeugnisse sind wohlwollend formuliert und enthalten oft feste Formulierungen, die eine bestimmte Bewertung ausdrücken. Wir übersetzen sie so, dass die Aussage des Zeugnisses auch im Ausland verstanden wird, ohne den Inhalt zu verändern.'],
    ],
    details: ['Was wir übersetzen', 'Arbeitszeugnisse, Zwischenzeugnisse, Referenzschreiben, Arbeitsbescheinigungen, Arbeitsbücher und Arbeitsverträge – vollständig mit Briefkopf, Unterschriften und Stempeln. Für Behörden fertigen unsere ermächtigten Übersetzer die Übersetzung beglaubigt an.'],
    languages: 'Besonders häufig übersetzen wir Arbeitszeugnisse ins Englische und Referenzschreiben aus dem Englischen, Arabischen, Türkischen, Ukrainischen und Russischen.',
    related: [{ href: '/de/zeugnis-uebersetzung/', label: 'Schul- und Hochschulzeugnisse übersetzen' }, { href: '/de/standorte/stuttgart/', label: 'Übersetzungen Stuttgart' }],
    faqs: [
      ['Muss ein Arbeitszeugnis beglaubigt übersetzt werden?', 'Für Bewerbungen bei Arbeitgebern meist nicht. Für Behörden und Anerkennungsstellen wird häufig eine beglaubigte Übersetzung verlangt – wir erstellen beides.'],
      ['Übersetzen Sie auch Arbeitsbücher?', 'Ja, zum Beispiel Arbeitsbücher aus der Ukraine, Russland und anderen Ländern als Nachweis der Berufserfahrung.'],
    ],
  }),
];

export const NEW_PAGES_DE = [
  ...NEW_DOCUMENT_PAGES,
  newPage({
    slug: 'beglaubigte-uebersetzung-standesamt',
    group: 'certified-translation-registry-office',
    eyebrow: 'Übersetzungen fürs Standesamt',
    title: 'Beglaubigte Übersetzungen fürs Standesamt.',
    metaTitle: 'Beglaubigte Übersetzung fürs Standesamt | Noon Übersetzungsbüro',
    description: 'Beglaubigte Übersetzung fürs Standesamt: Geburtsurkunde, Ledigkeitsbescheinigung und Scheidungsurteil zur Heirat – ab 39 €, Express am selben Tag.',
    intro: 'Für die Anmeldung der Eheschließung, die Geburtsbeurkundung Ihres Kindes oder eine Namenserklärung verlangt das Standesamt ausländische Urkunden meist als beglaubigte Übersetzung. Unsere ermächtigten Übersetzer übersetzen alle Urkunden aus allen Sprachen – und auf Wunsch organisieren wir auch den Dolmetscher für den Termin.',
    highlights: ['Alle Urkunden zur Heirat', 'Ermächtigte Übersetzer', 'Dolmetscher gleich mit'],
    sections: [
      ['Urkunden für die Anmeldung der Eheschließung', 'Welche Unterlagen Sie brauchen, hängt von Staatsangehörigkeit, Familienstand und Standesamt ab. Häufig verlangt werden:\n• Geburtsurkunde\n• Ledigkeitsbescheinigung oder Ehefähigkeitszeugnis\n• bei früherer Ehe: Heiratsurkunde und Scheidungsurteil oder Sterbeurkunde\n• bei Kindern: Geburtsurkunden der Kinder\n\nAusländische Urkunden müssen meist beglaubigt übersetzt sein. Kann ein Ehefähigkeitszeugnis nicht beigebracht werden, ist eine Befreiung durch das Oberlandesgericht möglich – auch dafür werden Urkunden übersetzt.',
        [{ href: '/de/geburtsurkunde-uebersetzung/', label: 'Geburtsurkunde übersetzen' }, { href: '/de/ledigkeitsbescheinigung-uebersetzung/', label: 'Ledigkeitsbescheinigung übersetzen' }, { href: '/de/scheidungsurteil-uebersetzung/', label: 'Scheidungsurteil übersetzen' }, { href: '/de/heiratsurkunde-uebersetzung/', label: 'Heiratsurkunde übersetzen' }]],
      ['Geburt, Namenserklärung und Nachbeurkundung', 'Auch für die Geburtsbeurkundung Ihres Kindes, für Namenserklärungen oder die Nachbeurkundung einer im Ausland geschlossenen Ehe oder einer Auslandsgeburt verlangt das Standesamt ausländische Urkunden in beglaubigter Übersetzung.'],
      ['So läuft es ab', '1. Liste des Standesamts besorgen – jedes Standesamt nennt Ihnen die nötigen Urkunden.\n2. Urkunden senden – als Foto oder Scan per WhatsApp, E-Mail oder Webformular.\n3. Festpreis erhalten – für alle Urkunden in einem Angebot.\n4. Übersetzungen erhalten – als PDF und auf Wunsch per Post, in 2–3 Werktagen oder im Express am selben Tag.'],
      ['Dolmetscher für Anmeldung und Trauung', 'Versteht eine der beteiligten Personen nicht ausreichend Deutsch, verlangt das Standesamt einen Dolmetscher – oft eine beeidigte Person. Den organisieren wir gleich mit.',
        [{ href: '/de/dolmetschen/standesamt-dolmetscher/', label: 'Dolmetscher fürs Standesamt' }]],
      ['Sprachen', LANGUAGES_TEXT, LANGUAGE_LINKS],
      DELIVERY_SECTION,
      ['Unsere Büros', 'Digital für ganz Deutschland – persönliche Termine nach Vereinbarung in Osnabrück, Stuttgart, Berlin, Bielefeld, Mainz und Kiel.', OFFICE_LINKS],
    ],
    faqs: [
      ['Akzeptiert das Standesamt Ihre Übersetzungen?', 'Ja. Unsere beglaubigten Übersetzungen stammen von in Deutschland ermächtigten Übersetzern und werden von Standesämtern bundesweit akzeptiert.'],
      ['Welche Urkunden brauche ich für die Heirat?', 'Das legt Ihr Standesamt fest – meist Geburtsurkunde, Ledigkeitsbescheinigung oder Ehefähigkeitszeugnis und gegebenenfalls Scheidungsurteil. Senden Sie uns die Liste, wir übersetzen alles in einem Auftrag.'],
      ['Brauchen die Urkunden eine Apostille?', 'Ob die Urkunde selbst eine Apostille oder Legalisation braucht, entscheidet das Standesamt. Das klären Sie bitte vorab dort.'],
      FAQ_SPEED,
      FAQ_PRICE,
    ],
    serviceType: 'Beglaubigte Übersetzung Standesamt',
  }),
  newPage({
    slug: 'beglaubigte-uebersetzung-auslaenderbehoerde',
    group: 'certified-translation-immigration-office',
    eyebrow: 'Übersetzungen für die Ausländerbehörde',
    title: 'Beglaubigte Übersetzungen für die Ausländerbehörde.',
    metaTitle: 'Beglaubigte Übersetzung für die Ausländerbehörde | Noon Übersetzungsbüro',
    description: 'Beglaubigte Übersetzung für die Ausländerbehörde: Urkunden für Aufenthalt, Familiennachzug und Einbürgerung – ab 39 €, Express am selben Tag.',
    intro: 'Für Aufenthaltstitel, Familiennachzug, Niederlassungserlaubnis oder Einbürgerung verlangt die Ausländerbehörde ausländische Dokumente meist als beglaubigte Übersetzung. Unsere ermächtigten Übersetzer übersetzen Urkunden, Zeugnisse und Nachweise aus allen Sprachen – mit Festpreis vorab und auf Wunsch am selben Tag.',
    highlights: ['Aufenthalt und Einbürgerung', 'Ermächtigte Übersetzer', 'Express am selben Tag'],
    sections: [
      ['Welche Dokumente die Ausländerbehörde oft verlangt', '• Familiennachzug: Heiratsurkunde und Geburtsurkunden der Kinder\n• Einbürgerung: Geburtsurkunde, Heiratsurkunde, Scheidungsurteile und Nachweise zur Namensführung\n• Aufenthaltstitel für Arbeit und Studium: Zeugnisse, Diplome und Arbeitsverträge\n• Niederlassungserlaubnis: Nachweise und Urkunden je nach Einzelfall\n\nWelche Dokumente Sie genau brauchen, steht in der Liste Ihrer Ausländerbehörde.',
        [{ href: '/de/heiratsurkunde-uebersetzung/', label: 'Heiratsurkunde übersetzen' }, { href: '/de/geburtsurkunde-uebersetzung/', label: 'Geburtsurkunde übersetzen' }, { href: '/de/scheidungsurteil-uebersetzung/', label: 'Scheidungsurteil übersetzen' }, { href: '/de/zeugnis-uebersetzung/', label: 'Zeugnisse übersetzen' }, { href: '/de/arbeitszeugnis-uebersetzung/', label: 'Arbeitszeugnis übersetzen' }]],
      ['So läuft es ab', '1. Liste der Ausländerbehörde bereitlegen.\n2. Dokumente senden – als Foto oder Scan per WhatsApp, E-Mail oder Webformular.\n3. Festpreis erhalten – für alle Dokumente in einem Angebot.\n4. Übersetzungen erhalten – als PDF und auf Wunsch per Post. Haben Sie bereits einen Termin, nennen Sie uns das Datum: Im Express ist die Übersetzung am selben Tag fertig.',
        [EXPRESS_LINK]],
      ['Dolmetscher für den Termin', 'Für Vorsprachen bei der Ausländerbehörde organisieren wir auf Wunsch einen Dolmetscher – vor Ort, per Video oder Telefon.',
        [{ href: '/de/dolmetschen/', label: 'Dolmetscher buchen' }]],
      ['Sprachen', LANGUAGES_TEXT, LANGUAGE_LINKS],
      DELIVERY_SECTION,
      ['Ausländerbehörden in unseren Städten', 'Wir übersetzen für Ausländerbehörden in ganz Deutschland – mit Büros in Osnabrück, Stuttgart, Berlin (Landesamt für Einwanderung), Bielefeld, Mainz und Kiel.', OFFICE_LINKS],
    ],
    faqs: [
      ['Akzeptiert die Ausländerbehörde Ihre Übersetzungen?', 'Ja. Beglaubigte Übersetzungen von in Deutschland ermächtigten Übersetzern werden von Ausländerbehörden bundesweit akzeptiert.'],
      ['Mein Termin ist schon bald – geht es schneller?', 'Ja. Im Express ist die Übersetzung am selben Tag fertig, meist innerhalb von 4–5 Stunden.'],
      FAQ_DIGITAL,
      FAQ_PRICE,
    ],
    serviceType: 'Beglaubigte Übersetzung Ausländerbehörde',
  }),
  newPage({
    slug: 'express-uebersetzung',
    group: 'express-translation',
    eyebrow: 'Express-Übersetzung',
    title: 'Beglaubigte Übersetzung im Express – am selben Tag.',
    metaTitle: 'Beglaubigte Übersetzung Express – am selben Tag | Noon Übersetzungsbüro',
    description: 'Beglaubigte Übersetzung sofort: im Express am selben Tag fertig, meist in 4–5 Stunden – Urkunden, Zeugnisse, Führerscheine. Festpreis vorab.',
    intro: 'Termin bei Behörde oder Standesamt schon morgen? Im Express-Service übersetzen unsere ermächtigten Übersetzer Ihr Dokument beglaubigt am selben Tag – meist innerhalb von 4–5 Stunden. Sie erhalten die Übersetzung sofort als PDF und auf Wunsch zusätzlich per Post.',
    highlights: ['Am selben Tag', 'Meist 4–5 Stunden', 'Festpreis vorab'],
    sections: [
      ['So schnell geht es', '• Express: am selben Tag, in der Regel innerhalb von 4–5 Stunden\n• Standard: 2–3 Werktage\n\nDamit es am selben Tag klappt, senden Sie uns Ihr Dokument möglichst früh am Tag. Wir bestätigen Ihnen vorab, ob der Express für Ihr Dokument und Ihre Sprache möglich ist, und nennen den Festpreis.'],
      ['Welche Dokumente im Express?', 'Vor allem Standarddokumente wie Geburts- und Heiratsurkunden, Ledigkeitsbescheinigungen, Führerscheine, Zeugnisse und Meldebescheinigungen. Bei umfangreichen Dokumenten oder seltenen Sprachen nennen wir Ihnen die schnellstmögliche Lieferzeit.',
        DOCUMENT_LINKS],
      ['So bestellen Sie den Express', '1. Dokument senden – Foto oder Scan per WhatsApp, E-Mail oder Webformular, mit dem Hinweis „Express“.\n2. Festpreis und Lieferzeit erhalten.\n3. Übersetzung als PDF am selben Tag erhalten – das Original mit Stempel kommt auf Wunsch per Post.'],
      ['Sprachen', LANGUAGES_TEXT, LANGUAGE_LINKS],
      ['In der Nähe: unsere Büros', 'Persönliche Termine nach Vereinbarung in Osnabrück, Stuttgart, Berlin, Bielefeld, Mainz und Kiel – für den Express ist der digitale Weg aber meist der schnellste.', OFFICE_LINKS],
    ],
    faqs: [
      ['Kann ich eine beglaubigte Übersetzung sofort bekommen?', 'Im Express ist die Übersetzung am selben Tag fertig, meist innerhalb von 4–5 Stunden. Senden Sie uns Ihr Dokument möglichst früh am Tag.'],
      ['Ist die PDF-Übersetzung schon gültig?', 'Viele Stellen akzeptieren für den ersten Termin die PDF; das gestempelte Original erhalten Sie per Post. Ob Ihre Stelle das Original sehen möchte, erfahren Sie dort.'],
      ['Was kostet der Express?', 'Den Festpreis für Ihr Dokument im Express nennen wir Ihnen vorab und kostenlos.'],
      FAQ_DIGITAL,
    ],
    serviceType: 'Express-Übersetzung',
  }),
  newPage({
    slug: 'ueber-uns',
    serviceGroup: 'about',
    group: 'about-us',
    eyebrow: 'Über uns',
    title: 'Über Noon Dolmetscher & Übersetzungsbüro.',
    metaTitle: 'Über uns | Noon Dolmetscher & Übersetzungsbüro',
    description: 'Noon Dolmetscher & Übersetzungsbüro: seit 2019 beglaubigte Übersetzungen und beeidigte Dolmetscher – Hauptsitz Osnabrück und fünf weitere Büros.',
    intro: 'Noon Dolmetscher & Übersetzungsbüro übersetzt und dolmetscht seit 2019 für Privatpersonen, Unternehmen, Behörden und Gerichte in ganz Deutschland. Unser Hauptsitz ist Osnabrück; weitere Büros haben wir in Stuttgart, Berlin, Bielefeld, Mainz und Kiel.',
    highlights: ['Seit 2019', 'Sechs Standorte', 'Ermächtigte Übersetzer'],
    sections: [
      ['Was wir machen', '• Beglaubigte Übersetzungen von Urkunden, Zeugnissen, Führerscheinen und Gerichtsdokumenten\n• Fachübersetzungen für Recht, Medizin, Technik und Wirtschaft\n• Dolmetscher für Behörden, Standesamt, Gericht, Notar, Arzt und Unternehmen – vor Ort, per Video oder Telefon',
        [CERTIFIED_LINK, { href: '/de/fachuebersetzungen/', label: 'Fachübersetzungen' }, { href: '/de/dolmetschen/', label: 'Dolmetschen' }]],
      ['Wer für Sie arbeitet', 'Beglaubigte Übersetzungen fertigen bei uns in Deutschland ermächtigte Übersetzer an, vor Gericht und beim Notar setzen wir beeidigte Dolmetscher ein – in allen Sprachen, die wir anbieten. Bei Arabisch decken unsere Dolmetscher die gängigen Dialekte ab, bei Persisch Farsi und Dari.',
        [COURT_LINK, ...LANGUAGE_LINKS.slice(-1)]],
      ['Unsere Standorte', 'Hauptsitz am Rosenplatz 17 in Osnabrück, weitere Büros in Stuttgart, Berlin, Bielefeld, Mainz und Kiel. Persönliche Termine bieten wir nach Vereinbarung an; den Großteil unserer Aufträge wickeln wir für Kundinnen und Kunden in ganz Deutschland digital ab.', OFFICE_LINKS],
      ['Wie wir arbeiten', '• Festpreis vorab – kostenlos und unverbindlich\n• Standard in 2–3 Werktagen, Express am selben Tag\n• Lieferung als PDF und auf Wunsch per Post\n• vertraulicher Umgang mit Ihren Dokumenten'],
      ['Was Kundinnen und Kunden sagen', 'Unsere Büros sind bei Google mit 4,7 bis 5,0 Sternen bewertet – allein der Hauptsitz in Osnabrück mit 5,0 Sternen bei 92 Bewertungen (Stand Oktober 2026). Besonders oft gelobt werden die schnelle Bearbeitung und die freundliche, unkomplizierte Kommunikation.'],
    ],
    faqs: [
      ['Seit wann gibt es Noon?', 'Noon Dolmetscher & Übersetzungsbüro arbeitet seit 2019 für Kundinnen und Kunden in ganz Deutschland.'],
      ['Wo sind Ihre Büros?', 'In Osnabrück (Hauptsitz), Stuttgart, Berlin, Bielefeld, Mainz und Kiel. Persönliche Termine nach Vereinbarung.'],
      FAQ_DIGITAL,
    ],
    serviceType: 'Übersetzungsbüro',
    parent: { href: '/', label: 'Unternehmen' },
  }),
];

// Pages whose content changed recently: used for <lastmod> in the sitemap.
export const CONTENT_UPDATED = {
  '/de/standorte/berlin': '2026-10-13',
  '/de/standorte/stuttgart': '2026-10-13',
  '/de/gerichtsdolmetscher': '2026-10-15',
  '/de/standorte/osnabrueck': UPDATED,
  '/de/standorte/kiel': UPDATED,
  '/de/standorte/bielefeld': UPDATED,
  '/de/standorte/mainz': UPDATED,
  '/de/sprachen': UPDATED,
  '/de/sprachen/russisch': UPDATED,
};
