import { getServiceNavigation, serviceUi } from './serviceContent.js';

export const SITE_URL = 'https://noon-sprachdienst.de';

export const COMPANY = {
  name: 'NOON. Sprachdienst',
  email: 'info@noon-sprachdienst.de',
  telephone: '+4916095627666',
  hours: 'Montag bis Samstag, telefonisch 24/7 erreichbar',
  foundingDate: '2019',
};

export const SEO_LANGUAGES = {
  de: { html: 'de-DE', label: 'Deutsch', prefix: '/de' },
  en: { html: 'en', label: 'English', prefix: '/en' },
  ar: { html: 'ar', label: 'العربية', prefix: '/ar' },
  tr: { html: 'tr', label: 'Türkçe', prefix: '/tr' },
  ru: { html: 'ru', label: 'Русский', prefix: '/ru' },
  fr: { html: 'fr', label: 'Français', prefix: '/fr' },
  uk: { html: 'uk', label: 'Українська', prefix: '/uk' },
};

export const LOCATIONS = [
  { slug: 'osnabrueck', city: 'Osnabrück', street: 'Paul-Oeser-Straße 1', postalCode: '49074', image: 'osnabrueck.jpg', hq: true },
  { slug: 'stuttgart', city: 'Stuttgart', street: 'Friedrichstraße 15', postalCode: '70174', image: 'stuttgart.jpg' },
  { slug: 'berlin', city: 'Berlin', street: 'Potsdamerstr. 63, App. 908', postalCode: '10785', image: 'berlin.jpg' },
  { slug: 'bielefeld', city: 'Bielefeld', street: 'Teichstraße 24', postalCode: '33615', image: 'bielefeld.jpg' },
  { slug: 'mainz', city: 'Mainz', street: 'Richard-Wagner-Straße 13', postalCode: '55118', image: 'mainz.jpg' },
  { slug: 'kiel', city: 'Kiel', street: 'Bothwellstraße 25', postalCode: '24143', image: 'kiel.jpg' },
];

const deFaqs = {
  certified: [
    ['Werden beglaubigte Übersetzungen von Behörden akzeptiert?', 'Ja. Unsere beglaubigten Übersetzungen werden von beeidigten Übersetzern erstellt und sind für Behörden, Standesämter, Gerichte, Hochschulen und Notariate geeignet.'],
    ['Kann ich Dokumente per WhatsApp senden?', 'Ja. Ein gut lesbares Foto oder ein Scan reicht meistens für die Angebotserstellung. Wir sagen Ihnen vorab, ob ein Original benötigt wird.'],
    ['Wie schnell ist eine beglaubigte Übersetzung fertig?', 'Viele Standarddokumente sind in wenigen Werktagen fertig. Für eilige Fälle prüfen wir Express-Bearbeitung innerhalb von 24 Stunden.'],
  ],
  interpreting: [
    ['Für welche Termine bieten Sie Dolmetscher an?', 'Wir organisieren Dolmetscher für Behörden, Standesamt, Notar, Gericht, Kliniken, Unternehmen, Konferenzen sowie Video- und Telefontermine.'],
    ['Welche Informationen benötigen Sie für eine Anfrage?', 'Wir benötigen Ort, Datum, Uhrzeit, Sprache, Thema des Termins und ob ein beeidigter Dolmetscher erforderlich ist.'],
    ['Sind kurzfristige Termine möglich?', 'Je nach Sprache und Ort prüfen wir kurzfristige Verfügbarkeit. Video- oder Telefondolmetschen kann bei sehr kurzfristigen Anfragen helfen.'],
  ],
  specialist: [
    ['Welche Fachgebiete übersetzen Sie?', 'Wir übersetzen Fachtexte aus Recht, Medizin, Dentalmedizin, Wirtschaft, Technik, Pharma, IT, Chemie, Biowissenschaften, Literatur und Industrie.'],
    ['Wie wird die Qualität gesichert?', 'Je nach Auftrag arbeiten wir mit Fachübersetzern, Terminologieprüfung und Vier-Augen-Prinzip.'],
    ['Wie wird der Preis berechnet?', 'Der Preis hängt von Fachgebiet, Umfang, Sprachkombination, Format und Lieferzeit ab. Sie erhalten vorab ein kostenloses Angebot.'],
  ],
};

const coreServicesDe = [
  {
    key: 'certified-translations',
    path: '/de/beglaubigte-uebersetzungen',
    kind: 'service',
    lang: 'de',
    group: 'certified-translations',
    eyebrow: 'Beglaubigte Übersetzungen',
    title: 'Beglaubigte Übersetzungen für Behörden, Gerichte und Standesämter.',
    description: 'Beglaubigte Übersetzungen von beeidigten Übersetzern: Urkunden, Zeugnisse, Führerscheine und amtliche Dokumente. Digital anfragen oder in sechs deutschen Städten abholen.',
    intro: 'Für offizielle Zwecke erhalten Sie eine vollständige, gestempelte Übersetzung von öffentlich bestellten und beeidigten Übersetzerinnen und Übersetzern. Senden Sie uns ein gut lesbares Foto oder einen Scan. Wir prüfen Ihre Unterlagen und erstellen ein transparentes Festpreisangebot.',
    highlights: ['Amtlich anerkannt', 'Express-Service möglich', 'PDF, Post oder Abholung'],
    sections: [
      ['Welche Dokumente übersetzen wir?', 'Wir übersetzen unter anderem Geburtsurkunden, Heiratsurkunden, Führerscheine, Zeugnisse, Diplome, Meldebescheinigungen, Gerichtsbeschlüsse, notarielle Unterlagen und weitere Dokumente für deutsche Behörden.'],
      ['Persönlich oder digital anfragen', 'Ihre Anfrage können Sie bequem per WhatsApp, E-Mail oder Webformular senden. Das Original wird nur benötigt, wenn die empfangende Stelle es ausdrücklich verlangt. Die fertige Übersetzung erhalten Sie digital, per Post oder zur Abholung in einem unserer Standorte.'],
      ['Beeidigte Fachkräfte und klare Abläufe', 'Wir informieren Sie vorab über Preis, Bearbeitungszeit und Lieferweg. Für eilige Fälle prüfen wir eine Express-Bearbeitung innerhalb von 24 Stunden.'],
    ],
    faqs: deFaqs.certified,
    serviceType: 'Beglaubigte Übersetzung',
    cta: 'Kostenloses Angebot anfordern',
  },
  {
    key: 'interpreting',
    path: '/de/dolmetschen',
    kind: 'service',
    lang: 'de',
    group: 'interpreting',
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
    faqs: deFaqs.interpreting,
    serviceType: 'Dolmetschen',
    cta: 'Kostenlose Dolmetscheranfrage',
  },
  {
    key: 'specialist-translations',
    path: '/de/fachuebersetzungen',
    kind: 'service',
    lang: 'de',
    group: 'specialist-translations',
    eyebrow: 'Fachübersetzungen',
    title: 'Fachübersetzungen mit präziser Terminologie.',
    description: 'Professionelle Fachübersetzungen für Medizin, Recht, Wirtschaft, Technik, Pharma, IT, Chemie und Industrie. Terminologisch konsistent und fachlich geprüft.',
    intro: 'Fachtexte benötigen sprachliche Sicherheit und Verständnis für den jeweiligen Einsatzbereich. Unsere spezialisierten Übersetzer übertragen Terminologie, Ton und Inhalt verlässlich in die gewünschte Sprache.',
    highlights: ['ISO 17100', 'Vier-Augen-Prinzip', '190+ Sprachen'],
    sections: [
      ['Fachwissen für anspruchsvolle Inhalte', 'Wir bearbeiten Texte aus Medizin und Dentalmedizin, Recht, Wirtschaft und Finanzen, Ingenieurwesen, Pharmazeutik, IT und Software, Chemie und Biowissenschaften sowie Industrie und Produktion.'],
      ['Passend für Zielgruppe und Einsatzbereich', 'Eine gute Fachübersetzung berücksichtigt Fachsprache, Normen, Zielgruppe und Verwendungszweck. Auf Wunsch erstellen wir Terminologielisten für wiederkehrende Inhalte und mehrsprachige Projekte.'],
      ['Kostenlose Anfrage mit klarer Einschätzung', 'Senden Sie uns Ihre Unterlagen oder eine kurze Projektbeschreibung. Sie erhalten Informationen zu Preis, Lieferzeit und Ablauf, bevor Sie sich entscheiden.'],
    ],
    faqs: deFaqs.specialist,
    serviceType: 'Fachübersetzung',
    cta: 'Kostenlose Fachübersetzungsanfrage',
  },
];

const documentPagesDe = [
  {
    slug: 'fuehrerschein-uebersetzung',
    group: 'driving-license-translation',
    eyebrow: 'Führerschein Übersetzung',
    title: 'Führerschein beglaubigt übersetzen lassen.',
    description: 'Beglaubigte Führerschein-Übersetzung für deutsche Behörden, Fahrerlaubnisstellen und Umschreibung. Kostenloses Festpreisangebot anfordern.',
    intro: 'Wenn ein ausländischer Führerschein für eine deutsche Behörde, Fahrerlaubnisstelle oder Umschreibung benötigt wird, muss die Übersetzung korrekt, vollständig und amtlich verwertbar sein. NOON prüft Ihr Dokument und erstellt ein transparentes Angebot.',
    highlights: ['Für Behörden', 'Viele Herkunftsländer', 'Digital anfragen'],
    sections: [
      ['Für welche Fälle ist die Übersetzung geeignet?', 'Die Übersetzung kann für Fahrerlaubnisstellen, Anerkennung, Umschreibung, Versicherungen oder weitere offizielle Zwecke benötigt werden. Wir prüfen, ob eine beglaubigte Übersetzung sinnvoll ist.'],
      ['Ablauf', 'Senden Sie ein Foto oder einen Scan des Führerscheins. Wir prüfen Sprache, Lesbarkeit und Umfang und nennen Ihnen Preis, Lieferzeit und Ausgabeform.'],
      ['Sprachen', 'Wir bearbeiten Führerscheine unter anderem aus dem Arabischen, Türkischen, Ukrainischen, Russischen, Englischen, Französischen und vielen weiteren Sprachen.'],
    ],
    faqs: [
      ['Reicht ein Foto des Führerscheins?', 'Für die Angebotserstellung reicht meistens ein gut lesbares Foto oder ein Scan.'],
      ['Ist die Übersetzung beglaubigt?', 'Ja, wenn eine beglaubigte Übersetzung beauftragt wird, erfolgt sie durch beeidigte Übersetzer.'],
    ],
    serviceType: 'Führerschein Übersetzung',
  },
  {
    slug: 'heiratsurkunde-uebersetzung',
    group: 'marriage-certificate-translation',
    eyebrow: 'Heiratsurkunde Übersetzung',
    title: 'Heiratsurkunde beglaubigt übersetzen lassen.',
    description: 'Beglaubigte Übersetzung von Heiratsurkunden für Standesamt, Behörden, Visum, Familienzusammenführung und offizielle Verfahren.',
    intro: 'Heiratsurkunden werden häufig für Standesämter, Ausländerbehörden, Visumverfahren, Familienzusammenführung oder Namensänderungen benötigt. Wir übersetzen Ihre Urkunde vollständig und nachvollziehbar für offizielle Zwecke.',
    highlights: ['Für Standesamt', 'Beeidigte Übersetzer', 'Express möglich'],
    sections: [
      ['Typische Verwendungszwecke', 'Die Übersetzung wird oft für Standesamt, Ausländerbehörde, Einbürgerung, Familienzusammenführung, Gerichte oder internationale Behörden benötigt.'],
      ['Was wir benötigen', 'Senden Sie eine gut lesbare Kopie oder ein Foto der gesamten Urkunde inklusive Stempel, Randvermerken und Rückseite, falls vorhanden.'],
      ['Klare Lieferung', 'Sie erhalten vorab ein Angebot mit Preis und Lieferzeit. Die fertige Übersetzung kann digital, per Post oder zur Abholung bereitgestellt werden.'],
    ],
    faqs: [
      ['Muss die Heiratsurkunde vollständig übersetzt werden?', 'Ja, für offizielle Zwecke werden in der Regel alle sichtbaren Angaben, Stempel und Vermerke übersetzt.'],
      ['Kann ich die Urkunde per WhatsApp senden?', 'Ja, ein gut lesbares Foto reicht für die Angebotsprüfung meistens aus.'],
    ],
    serviceType: 'Heiratsurkunde Übersetzung',
  },
  {
    slug: 'geburtsurkunde-uebersetzung',
    group: 'birth-certificate-translation',
    eyebrow: 'Geburtsurkunde Übersetzung',
    title: 'Geburtsurkunde beglaubigt übersetzen lassen.',
    description: 'Beglaubigte Übersetzung von Geburtsurkunden für Behörden, Standesamt, Schule, Universität, Einbürgerung und Familienverfahren.',
    intro: 'Geburtsurkunden werden in Deutschland häufig für Behörden, Standesämter, Schulen, Universitäten, Einbürgerung oder Familienverfahren benötigt. Wir erstellen eine beglaubigte Übersetzung für Ihren konkreten Zweck.',
    highlights: ['Amtlich verwertbar', 'Viele Sprachen', 'Schnelle Prüfung'],
    sections: [
      ['Für Behörden und offizielle Verfahren', 'Wir übersetzen Geburtsurkunden mit allen relevanten Angaben, Stempeln und Randvermerken für den Einsatz bei deutschen Stellen.'],
      ['Einfach anfragen', 'Senden Sie die Urkunde digital. Wir prüfen Lesbarkeit, Sprache und Umfang und teilen Ihnen Preis und Lieferzeit mit.'],
      ['Auch für Familienunterlagen', 'Wenn mehrere Dokumente zusammen benötigt werden, zum Beispiel Heiratsurkunde, Geburtsurkunden und Meldeunterlagen, erstellen wir ein gemeinsames Angebot.'],
    ],
    faqs: [
      ['Welche Sprachen übersetzen Sie?', 'Wir bearbeiten Geburtsurkunden in über 190 Sprachen, darunter Arabisch, Türkisch, Ukrainisch, Russisch, Englisch und Französisch.'],
      ['Wie bekomme ich die fertige Übersetzung?', 'Je nach Bedarf digital, per Post oder zur Abholung an einem Standort.'],
    ],
    serviceType: 'Geburtsurkunde Übersetzung',
  },
  {
    slug: 'zeugnis-uebersetzung',
    group: 'certificate-translation',
    eyebrow: 'Zeugnis Übersetzung',
    title: 'Zeugnisse und Diplome beglaubigt übersetzen lassen.',
    description: 'Beglaubigte Zeugnisübersetzung für Schule, Universität, Anerkennung, Bewerbung und Behörden. Fachgerecht und vollständig.',
    intro: 'Zeugnisse, Diplome, Schulunterlagen und akademische Nachweise müssen für Bewerbungen, Anerkennung, Schule oder Universität präzise übertragen werden. Wir achten auf Noten, Fächer, Stempel und institutionelle Angaben.',
    highlights: ['Schule & Uni', 'Anerkennung', 'Bewerbung'],
    sections: [
      ['Für Bildung und Anerkennung', 'Wir übersetzen Schulzeugnisse, Diplome, Abschlussurkunden, Transcripts, Studiennachweise und weitere Bildungsunterlagen.'],
      ['Fachlich präzise', 'Notensysteme, Fachbezeichnungen und institutionelle Angaben werden sorgfältig übertragen. Bei Bedarf prüfen wir Hinweise für den Zielzweck.'],
      ['Mehrere Dokumente zusammen', 'Wenn mehrere Zeugnisse oder Anlagen vorhanden sind, senden Sie alles gemeinsam. Sie erhalten ein transparentes Gesamtangebot.'],
    ],
    faqs: [
      ['Ist die Übersetzung für Universitäten geeignet?', 'Ja, sofern die Universität eine beglaubigte Übersetzung akzeptiert. Bitte teilen Sie uns die Zielstelle mit.'],
      ['Können mehrere Zeugnisse zusammen beauftragt werden?', 'Ja, mehrere Dokumente können gemeinsam geprüft und kalkuliert werden.'],
    ],
    serviceType: 'Zeugnis Übersetzung',
  },
  {
    slug: 'standesamt-dolmetscher',
    group: 'registry-office-interpreter',
    eyebrow: 'Standesamt-Dolmetscher',
    title: 'Dolmetscher für Standesamt und Trauung anfragen.',
    description: 'Standesamt-Dolmetscher für Eheschließung, Anmeldung der Ehe und offizielle Termine. Vor Ort, zuverlässig und passend zur Sprachkombination.',
    intro: 'Für Termine beim Standesamt ist eine klare und verlässliche Verdolmetschung besonders wichtig. Wir prüfen passende Dolmetscher für Anmeldung der Eheschließung, Trauung und weitere standesamtliche Termine.',
    highlights: ['Trauung', 'Anmeldung der Ehe', 'Viele Sprachen'],
    sections: [
      ['Wann wird ein Dolmetscher benötigt?', 'Ein Dolmetscher kann erforderlich sein, wenn eine beteiligte Person den Termin nicht ausreichend auf Deutsch versteht oder das Standesamt dies verlangt.'],
      ['Was wir für die Anfrage benötigen', 'Bitte senden Sie Stadt, Standesamt, Datum, Uhrzeit, Sprachkombination und ob eine beeidigte Person erforderlich ist.'],
      ['Auch mit Übersetzung von Unterlagen', 'Wenn zusätzlich Urkunden, Ehefähigkeitszeugnisse oder weitere Dokumente übersetzt werden müssen, können wir beides gemeinsam prüfen.'],
    ],
    faqs: [
      ['Kann der Dolmetscher kurzfristig organisiert werden?', 'Je nach Sprache, Stadt und Termin prüfen wir kurzfristige Verfügbarkeit.'],
      ['Bieten Sie auch Urkundenübersetzungen für das Standesamt an?', 'Ja, wir können auch die benötigten Dokumente beglaubigt übersetzen.'],
    ],
    serviceType: 'Standesamt-Dolmetscher',
  },
  {
    slug: 'notardolmetscher',
    group: 'notary-interpreter',
    eyebrow: 'Notardolmetscher',
    title: 'Dolmetscher für notarielle Termine.',
    description: 'Notardolmetscher für Kaufvertrag, Vollmacht, Ehevertrag, Gesellschaftsgründung und notarielle Beurkundung anfragen.',
    intro: 'Notarielle Termine erfordern hohe sprachliche Genauigkeit. Wir organisieren Dolmetscher für Beurkundungen, Vollmachten, Verträge, Gesellschaftsgründungen und weitere notarielle Vorgänge.',
    highlights: ['Notartermine', 'Verträge', 'Vertraulich'],
    sections: [
      ['Für welche Termine?', 'Typische Fälle sind Kaufverträge, Vollmachten, Eheverträge, Erklärungen, Unternehmensgründungen und weitere notarielle Beurkundungen.'],
      ['Informationen für die Anfrage', 'Bitte nennen Sie Notariat, Datum, Uhrzeit, Sprachkombination, Thema und ob Unterlagen vorab geprüft werden können.'],
      ['Genauigkeit und Vertraulichkeit', 'Bei rechtlich relevanten Terminen achten wir auf zuverlässige Kommunikation, Diskretion und passende fachliche Erfahrung.'],
    ],
    faqs: [
      ['Muss der Dolmetscher beeidigt sein?', 'Das hängt vom Notariat und Vorgang ab. Bitte klären Sie die Anforderung vorab oder teilen Sie uns die Vorgabe mit.'],
      ['Können Verträge vorher übersetzt werden?', 'Ja, Vertrags- oder Vollmachtstexte können separat als Fachübersetzung geprüft werden.'],
    ],
    serviceType: 'Notardolmetscher',
  },
  {
    slug: 'gerichtsdolmetscher',
    group: 'court-interpreter',
    eyebrow: 'Gerichtsdolmetscher',
    title: 'Dolmetscher für Gerichtstermine anfragen.',
    description: 'Gerichtsdolmetscher und beeidigte Dolmetscher für gerichtliche Termine, Anhörungen und anwaltliche Vorbereitung.',
    intro: 'Bei Gerichtsterminen ist präzise Verdolmetschung entscheidend. Wir prüfen passende Dolmetscher für gerichtliche Termine, Anhörungen, anwaltliche Besprechungen und behördliche Verfahren.',
    highlights: ['Gerichte', 'Anhörungen', 'Beeidigte Dolmetscher'],
    sections: [
      ['Für gerichtliche und rechtliche Termine', 'Wir unterstützen bei der Organisation geeigneter Dolmetscher für Gerichte, Kanzleien, Behörden und vorbereitende Gespräche.'],
      ['Was wir benötigen', 'Bitte senden Sie Datum, Uhrzeit, Ort, Akten- oder Themenhinweis, Sprachkombination und ob eine Beeidigung erforderlich ist.'],
      ['Auch juristische Übersetzungen', 'Wenn Urteile, Beschlüsse, Verträge oder anwaltliche Schreiben übersetzt werden müssen, können wir dies separat anbieten.'],
    ],
    faqs: [
      ['Organisieren Sie beeidigte Dolmetscher?', 'Ja, wenn für den Termin eine beeidigte Person erforderlich ist, prüfen wir passende Verfügbarkeit.'],
      ['Kann ich auch eine schriftliche Übersetzung beauftragen?', 'Ja, juristische Dokumente können als Fachübersetzung oder beglaubigte Übersetzung geprüft werden.'],
    ],
    serviceType: 'Gerichtsdolmetscher',
  },
].map((page) => ({
  ...page,
  path: `/de/${page.slug}`,
  kind: 'service',
  lang: 'de',
  cta: page.serviceType.includes('Dolmetscher') ? 'Kostenlose Dolmetscheranfrage' : 'Kostenloses Angebot anfordern',
}));

const documentI18n = {
  en: {
    prefix: '/en',
    slugs: {
      'driving-license-translation': 'driving-license-translation',
      'marriage-certificate-translation': 'marriage-certificate-translation',
      'birth-certificate-translation': 'birth-certificate-translation',
      'certificate-translation': 'diploma-certificate-translation',
      'registry-office-interpreter': 'registry-office-interpreter',
      'notary-interpreter': 'notary-interpreter',
      'court-interpreter': 'court-interpreter',
    },
    titles: {
      'driving-license-translation': ['Driving licence translation', 'Certified driving licence translations for German authorities.'],
      'marriage-certificate-translation': ['Marriage certificate translation', 'Certified marriage certificate translations for registry offices and authorities.'],
      'birth-certificate-translation': ['Birth certificate translation', 'Certified birth certificate translations for official use in Germany.'],
      'certificate-translation': ['Diploma and certificate translation', 'Certified translations of diplomas, school certificates and academic records.'],
      'registry-office-interpreter': ['Registry office interpreter', 'Interpreters for registry office appointments and marriage ceremonies.'],
      'notary-interpreter': ['Notary interpreter', 'Interpreters for notary appointments, contracts and powers of attorney.'],
      'court-interpreter': ['Court interpreter', 'Interpreters for court appointments and legal proceedings.'],
    },
    intro: 'Send us your document or appointment details. NOON checks the language, purpose and deadline, then prepares a clear quote before you decide.',
    sections: [['What we need', 'Please send a readable scan, photo or appointment information including city, date, language pair and purpose.'], ['How it works', 'We review the request, confirm price and delivery time, and organize the suitable translation or interpreter service.']],
    highlights: ['Official use', 'Fast quote', 'Personal support'],
    cta: 'Request a free quote',
    descTail: 'NOON supports customers in Germany personally, digitally and in several languages.',
    faq: [['Can I send documents online?', 'Yes. A readable scan or photo is usually enough for the quote.'], ['Do you support several languages?', 'Yes. NOON supports many common and less common language combinations.']],
  },
  ar: {
    prefix: '/ar',
    slugs: {
      'driving-license-translation': 'driving-license-translation',
      'marriage-certificate-translation': 'marriage-certificate-translation',
      'birth-certificate-translation': 'birth-certificate-translation',
      'certificate-translation': 'certificate-translation',
      'registry-office-interpreter': 'registry-office-interpreter',
      'notary-interpreter': 'notary-interpreter',
      'court-interpreter': 'court-interpreter',
    },
    titles: {
      'driving-license-translation': ['ترجمة رخصة القيادة', 'ترجمة معتمدة لرخص القيادة للجهات الألمانية.'],
      'marriage-certificate-translation': ['ترجمة شهادة الزواج', 'ترجمة معتمدة لشهادات الزواج للدوائر والجهات الرسمية.'],
      'birth-certificate-translation': ['ترجمة شهادة الميلاد', 'ترجمة معتمدة لشهادات الميلاد للاستخدام الرسمي في ألمانيا.'],
      'certificate-translation': ['ترجمة الشهادات الدراسية', 'ترجمة معتمدة للشهادات والدبلومات والسجلات الدراسية.'],
      'registry-office-interpreter': ['مترجم Standesamt', 'مترجمون لمواعيد Standesamt والزواج الرسمي.'],
      'notary-interpreter': ['مترجم كاتب العدل', 'مترجمون لمواعيد الكاتب العدل والعقود والوكالات.'],
      'court-interpreter': ['مترجم المحكمة', 'مترجمون لمواعيد المحاكم والإجراءات القانونية.'],
    },
    intro: 'أرسل لنا المستند أو بيانات الموعد. يراجع فريق NOON اللغة والغرض والمدة المطلوبة ثم يرسل عرضا واضحا قبل بدء العمل.',
    sections: [['ما نحتاجه', 'يرجى إرسال صورة أو ملف واضح، أو بيانات الموعد مثل المدينة والتاريخ واللغة والغرض.'], ['طريقة العمل', 'نراجع الطلب ونوضح السعر والمدة ثم ننظم خدمة الترجمة أو المترجم المناسب.']],
    highlights: ['استخدام رسمي', 'عرض سريع', 'دعم شخصي'],
    cta: 'اطلب عرضا مجانيا',
    descTail: 'يدعم NOON العملاء في ألمانيا شخصيا ورقميا وبعدة لغات.',
    faq: [['هل يمكن إرسال المستندات أونلاين؟', 'نعم، غالبا تكفي صورة أو نسخة واضحة لإعداد العرض.'], ['هل تدعمون لغات متعددة؟', 'نعم، يدعم NOON العديد من اللغات الشائعة والنادرة.']],
  },
  tr: {
    prefix: '/tr',
    slugs: {
      'driving-license-translation': 'ehliyet-tercumesi',
      'marriage-certificate-translation': 'evlilik-belgesi-tercumesi',
      'birth-certificate-translation': 'dogum-belgesi-tercumesi',
      'certificate-translation': 'diploma-sertifika-tercumesi',
      'registry-office-interpreter': 'nikah-dairesi-tercumani',
      'notary-interpreter': 'noter-tercumani',
      'court-interpreter': 'mahkeme-tercumani',
    },
    titles: {
      'driving-license-translation': ['Ehliyet tercümesi', 'Alman kurumları için yeminli ehliyet tercümesi.'],
      'marriage-certificate-translation': ['Evlilik belgesi tercümesi', 'Resmi kurumlar ve nikah dairesi için yeminli evlilik belgesi tercümesi.'],
      'birth-certificate-translation': ['Doğum belgesi tercümesi', 'Almanya’da resmi kullanım için yeminli doğum belgesi tercümesi.'],
      'certificate-translation': ['Diploma ve sertifika tercümesi', 'Diploma, okul belgesi ve akademik kayıtlar için yeminli tercüme.'],
      'registry-office-interpreter': ['Nikah dairesi tercümanı', 'Nikah dairesi randevuları ve resmi nikah için tercüman.'],
      'notary-interpreter': ['Noter tercümanı', 'Noter randevuları, sözleşmeler ve vekaletnameler için tercüman.'],
      'court-interpreter': ['Mahkeme tercümanı', 'Mahkeme randevuları ve hukuki işlemler için tercüman.'],
    },
    intro: 'Belgenizi veya randevu bilgilerinizi gönderin. NOON dili, kullanım amacını ve teslim süresini kontrol ederek net bir teklif hazırlar.',
    sections: [['Neye ihtiyacımız var?', 'Okunabilir bir tarama, fotoğraf veya şehir, tarih, dil çifti ve amaç bilgisi gönderin.'], ['Süreç', 'Talebi kontrol eder, fiyat ve teslim süresini onaylar, uygun çeviri veya tercüman hizmetini organize ederiz.']],
    highlights: ['Resmi kullanım', 'Hızlı teklif', 'Kişisel destek'],
    cta: 'Ücretsiz teklif iste',
    descTail: 'NOON, Almanya’daki müşterilere şahsen, dijital ve çok dilli destek sağlar.',
    faq: [['Belgeleri online gönderebilir miyim?', 'Evet. Teklif için çoğu zaman okunabilir bir tarama veya fotoğraf yeterlidir.'], ['Birden fazla dil destekleniyor mu?', 'Evet. NOON birçok yaygın ve nadir dil kombinasyonunu destekler.']],
  },
  ru: {
    prefix: '/ru',
    slugs: {
      'driving-license-translation': 'perevod-voditelskogo-udostovereniya',
      'marriage-certificate-translation': 'perevod-svidetelstva-o-brake',
      'birth-certificate-translation': 'perevod-svidetelstva-o-rozhdenii',
      'certificate-translation': 'perevod-diploma-i-attestata',
      'registry-office-interpreter': 'perevodchik-zags',
      'notary-interpreter': 'perevodchik-notarius',
      'court-interpreter': 'sudebnyj-perevodchik',
    },
    titles: {
      'driving-license-translation': ['Перевод водительского удостоверения', 'Заверенный перевод водительских прав для немецких ведомств.'],
      'marriage-certificate-translation': ['Перевод свидетельства о браке', 'Заверенный перевод свидетельства о браке для официальных целей.'],
      'birth-certificate-translation': ['Перевод свидетельства о рождении', 'Заверенный перевод свидетельства о рождении для Германии.'],
      'certificate-translation': ['Перевод дипломов и аттестатов', 'Заверенные переводы дипломов, аттестатов и учебных документов.'],
      'registry-office-interpreter': ['Переводчик для ЗАГСа', 'Устный переводчик для регистрации брака и встреч в Standesamt.'],
      'notary-interpreter': ['Переводчик у нотариуса', 'Переводчики для нотариальных встреч, договоров и доверенностей.'],
      'court-interpreter': ['Судебный переводчик', 'Переводчики для судебных заседаний и юридических процедур.'],
    },
    intro: 'Отправьте документ или данные встречи. NOON проверит язык, цель и срок, затем подготовит понятное предложение.',
    sections: [['Что нужно отправить', 'Пришлите читаемый скан, фото или данные встречи: город, дату, языковую пару и цель.'], ['Как проходит работа', 'Мы проверяем запрос, подтверждаем цену и срок и организуем подходящий перевод или устного переводчика.']],
    highlights: ['Официальное использование', 'Быстрое предложение', 'Личная поддержка'],
    cta: 'Отправить запрос',
    descTail: 'NOON поддерживает клиентов в Германии лично, онлайн и на нескольких языках.',
    faq: [['Можно отправить документы онлайн?', 'Да, для предложения обычно достаточно читаемого скана или фото.'], ['Поддерживаются разные языки?', 'Да, NOON работает со многими распространенными и редкими языковыми парами.']],
  },
  fr: {
    prefix: '/fr',
    slugs: {
      'driving-license-translation': 'traduction-permis-de-conduire',
      'marriage-certificate-translation': 'traduction-acte-de-mariage',
      'birth-certificate-translation': 'traduction-acte-de-naissance',
      'certificate-translation': 'traduction-diplome-certificat',
      'registry-office-interpreter': 'interprete-etat-civil',
      'notary-interpreter': 'interprete-notaire',
      'court-interpreter': 'interprete-tribunal',
    },
    titles: {
      'driving-license-translation': ['Traduction de permis de conduire', 'Traduction certifiée de permis de conduire pour les autorités allemandes.'],
      'marriage-certificate-translation': ['Traduction d’acte de mariage', 'Traduction certifiée d’acte de mariage pour usages officiels.'],
      'birth-certificate-translation': ['Traduction d’acte de naissance', 'Traduction certifiée d’acte de naissance pour l’Allemagne.'],
      'certificate-translation': ['Traduction de diplômes et certificats', 'Traductions certifiées de diplômes, certificats scolaires et dossiers académiques.'],
      'registry-office-interpreter': ['Interprète pour l’état civil', 'Interprètes pour rendez-vous à l’état civil et mariage officiel.'],
      'notary-interpreter': ['Interprète notarial', 'Interprètes pour rendez-vous chez le notaire, contrats et procurations.'],
      'court-interpreter': ['Interprète au tribunal', 'Interprètes pour audiences et procédures juridiques.'],
    },
    intro: 'Envoyez votre document ou les détails du rendez-vous. NOON vérifie la langue, l’objectif et le délai, puis prépare un devis clair.',
    sections: [['Ce dont nous avons besoin', 'Envoyez un scan lisible, une photo ou les informations du rendez-vous: ville, date, combinaison linguistique et objectif.'], ['Déroulement', 'Nous vérifions la demande, confirmons le prix et le délai, puis organisons la traduction ou l’interprète adapté.']],
    highlights: ['Usage officiel', 'Devis rapide', 'Conseil personnalisé'],
    cta: 'Demander un devis gratuit',
    descTail: 'NOON accompagne les clients en Allemagne personnellement, en ligne et en plusieurs langues.',
    faq: [['Puis-je envoyer les documents en ligne?', 'Oui, un scan ou une photo lisible suffit généralement pour le devis.'], ['Travaillez-vous dans plusieurs langues?', 'Oui, NOON prend en charge de nombreuses combinaisons linguistiques courantes et rares.']],
  },
  uk: {
    prefix: '/uk',
    slugs: {
      'driving-license-translation': 'pereklad-vodijskogo-posvidchennya',
      'marriage-certificate-translation': 'pereklad-svidotstva-pro-shlyub',
      'birth-certificate-translation': 'pereklad-svidotstva-pro-narodzhennya',
      'certificate-translation': 'pereklad-dyploma-svidotstva',
      'registry-office-interpreter': 'perekladach-standesamt',
      'notary-interpreter': 'perekladach-notarius',
      'court-interpreter': 'sudovyi-perekladach',
    },
    titles: {
      'driving-license-translation': ['Переклад водійського посвідчення', 'Засвідчений переклад водійських прав для німецьких органів.'],
      'marriage-certificate-translation': ['Переклад свідоцтва про шлюб', 'Засвідчений переклад свідоцтва про шлюб для офіційного використання.'],
      'birth-certificate-translation': ['Переклад свідоцтва про народження', 'Засвідчений переклад свідоцтва про народження для Німеччини.'],
      'certificate-translation': ['Переклад дипломів і сертифікатів', 'Засвідчені переклади дипломів, шкільних документів та академічних довідок.'],
      'registry-office-interpreter': ['Перекладач для Standesamt', 'Усний перекладач для реєстрації шлюбу та зустрічей у Standesamt.'],
      'notary-interpreter': ['Перекладач у нотаріуса', 'Перекладачі для нотаріальних зустрічей, договорів і доручень.'],
      'court-interpreter': ['Судовий перекладач', 'Перекладачі для судових засідань і юридичних процедур.'],
    },
    intro: 'Надішліть документ або дані зустрічі. NOON перевірить мову, мету та термін і підготує зрозумілу пропозицію.',
    sections: [['Що потрібно надіслати', 'Надішліть читабельний скан, фото або дані зустрічі: місто, дату, мовну пару та мету.'], ['Як це працює', 'Ми перевіряємо запит, підтверджуємо ціну й термін та організовуємо відповідний переклад або усного перекладача.']],
    highlights: ['Офіційне використання', 'Швидка пропозиція', 'Особиста підтримка'],
    cta: 'Надіслати запит',
    descTail: 'NOON підтримує клієнтів у Німеччині особисто, онлайн і кількома мовами.',
    faq: [['Чи можна надіслати документи онлайн?', 'Так, для пропозиції зазвичай достатньо читабельного скану або фото.'], ['Чи підтримуєте кілька мов?', 'Так, NOON підтримує багато поширених і рідкісних мовних пар.']],
  },
};

const localizedDocumentPages = Object.entries(documentI18n).flatMap(([lang, copy]) => (
  documentPagesDe.map((base) => {
    const [eyebrow, title] = copy.titles[base.group];
    return {
      path: `${copy.prefix}/${copy.slugs[base.group]}`,
      kind: 'service',
      lang,
      group: base.group,
      eyebrow,
      title,
      description: `${title} ${copy.descTail}`,
      intro: copy.intro,
      highlights: copy.highlights,
      sections: copy.sections,
      faqs: copy.faq,
      serviceType: eyebrow,
      cta: copy.cta,
    };
  })
));

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
  lang: 'de',
  group: `location-${location.slug}`,
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
  faqs: [
    [`Kann ich in ${location.city} persönlich vorbeikommen?`, 'Bitte vereinbaren Sie vorab einen Termin, damit wir Ihre Unterlagen und Sprachkombination passend vorbereiten können.'],
    ['Kann ich Dokumente auch digital senden?', 'Ja, Sie können Dokumente per WhatsApp, E-Mail oder Formular senden und erhalten vorab ein Angebot.'],
  ],
  cta: 'Kostenloses Angebot anfordern',
}));

const locationI18n = {
  en: { prefix: '/en/locations', label: 'Translation office', title: 'Certified translations and interpreting in {city}.', intro: 'NOON supports private customers, companies and institutions in {city} with certified translations, specialist translations and interpreter requests.', services: 'Services in {city}', local: 'Local support', sections: [['Digital or personal request', 'Send documents by WhatsApp, email or the form. For in-person support, please arrange an appointment first.'], ['Translations and interpreting', 'We support official documents, specialist texts, authorities, registry offices, notaries, clinics and business appointments.']], highlights: ['Local branch', 'Digital requests', 'Personal support'], cta: 'Request a free quote', faq: [['Can I send documents online?', 'Yes. You can send readable scans or photos by WhatsApp, email or form.'], ['Do I need an appointment?', 'For in-person support, please arrange an appointment first.']] },
  ar: { prefix: '/ar/locations', label: 'مكتب ترجمة', title: 'ترجمات معتمدة وترجمة فورية في {city}.', intro: 'يدعم NOON العملاء والأفراد والشركات في {city} بالترجمات المعتمدة والمتخصصة وطلبات المترجمين الفوريين.', services: 'الخدمات في {city}', local: 'دعم محلي', sections: [['طلب رقمي أو شخصي', 'يمكنك إرسال المستندات عبر واتساب أو البريد أو النموذج. للحضور الشخصي يرجى حجز موعد مسبق.'], ['ترجمة ومستندات ومواعيد', 'ندعم الوثائق الرسمية والنصوص المتخصصة ومواعيد الدوائر وStandesamt والكاتب العدل والعيادات والشركات.']], highlights: ['فرع محلي', 'طلبات رقمية', 'دعم شخصي'], cta: 'اطلب عرضا مجانيا', faq: [['هل يمكن إرسال المستندات أونلاين؟', 'نعم، يمكن إرسال صور أو ملفات واضحة عبر واتساب أو البريد أو النموذج.'], ['هل أحتاج إلى موعد؟', 'للحضور الشخصي يرجى حجز موعد مسبق.']] },
  tr: { prefix: '/tr/subeler', label: 'Çeviri bürosu', title: '{city} yeminli çeviri ve tercümanlık.', intro: 'NOON, {city} şehrinde özel müşterilere, şirketlere ve kurumlara yeminli çeviri, uzmanlık çevirisi ve tercüman taleplerinde destek verir.', services: '{city} hizmetleri', local: 'Yerel destek', sections: [['Dijital veya şahsen talep', 'Belgeleri WhatsApp, e-posta veya form ile gönderebilirsiniz. Şahsen destek için lütfen önceden randevu alın.'], ['Çeviri ve tercümanlık', 'Resmi belgeler, uzmanlık metinleri, kurumlar, nikah dairesi, noter, klinik ve iş görüşmeleri için destek sağlıyoruz.']], highlights: ['Yerel şube', 'Dijital talep', 'Kişisel destek'], cta: 'Ücretsiz teklif iste', faq: [['Belgeleri online gönderebilir miyim?', 'Evet, okunabilir fotoğraf veya taramaları WhatsApp, e-posta veya form ile gönderebilirsiniz.'], ['Randevu gerekli mi?', 'Şahsen destek için lütfen önceden randevu alın.']] },
  ru: { prefix: '/ru/filialy', label: 'Бюро переводов', title: 'Заверенные переводы и устный перевод в {city}.', intro: 'NOON поддерживает частных клиентов, компании и учреждения в {city}: заверенные переводы, специализированные переводы и устные переводчики.', services: 'Услуги в {city}', local: 'Местная поддержка', sections: [['Онлайн или лично', 'Отправьте документы через WhatsApp, email или форму. Для личного визита сначала согласуйте встречу.'], ['Переводы и устные переводчики', 'Мы поддерживаем официальные документы, специализированные тексты, ведомства, Standesamt, нотариусов, клиники и деловые встречи.']], highlights: ['Местный филиал', 'Онлайн-запрос', 'Личная поддержка'], cta: 'Отправить запрос', faq: [['Можно отправить документы онлайн?', 'Да, читаемые сканы или фото можно отправить через WhatsApp, email или форму.'], ['Нужна ли запись?', 'Для личного визита, пожалуйста, заранее согласуйте встречу.']] },
  fr: { prefix: '/fr/agences', label: 'Bureau de traduction', title: 'Traductions certifiées et interprétariat à {city}.', intro: 'NOON accompagne les particuliers, entreprises et institutions à {city} pour les traductions certifiées, spécialisées et demandes d’interprètes.', services: 'Services à {city}', local: 'Accompagnement local', sections: [['Demande en ligne ou sur place', 'Envoyez vos documents par WhatsApp, e-mail ou formulaire. Pour une visite sur place, prenez rendez-vous à l’avance.'], ['Traduction et interprétariat', 'Nous accompagnons les documents officiels, textes spécialisés, administrations, état civil, notaires, cliniques et rendez-vous professionnels.']], highlights: ['Agence locale', 'Demande numérique', 'Conseil personnalisé'], cta: 'Demander un devis gratuit', faq: [['Puis-je envoyer les documents en ligne?', 'Oui, vous pouvez envoyer des scans ou photos lisibles par WhatsApp, e-mail ou formulaire.'], ['Faut-il prendre rendez-vous?', 'Pour une visite sur place, veuillez prendre rendez-vous à l’avance.']] },
  uk: { prefix: '/uk/filiji', label: 'Бюро перекладів', title: 'Засвідчені переклади та усний переклад у {city}.', intro: 'NOON підтримує приватних клієнтів, компанії та установи в {city}: засвідчені переклади, спеціалізовані переклади та усні перекладачі.', services: 'Послуги в {city}', local: 'Місцева підтримка', sections: [['Онлайн або особисто', 'Надішліть документи через WhatsApp, email або форму. Для особистого візиту спочатку узгодьте зустріч.'], ['Письмовий та усний переклад', 'Ми підтримуємо офіційні документи, спеціалізовані тексти, установи, Standesamt, нотаріусів, клініки та ділові зустрічі.']], highlights: ['Місцева філія', 'Онлайн-запит', 'Особиста підтримка'], cta: 'Надіслати запит', faq: [['Чи можна надіслати документи онлайн?', 'Так, читабельні скани або фото можна надіслати через WhatsApp, email або форму.'], ['Чи потрібен запис?', 'Для особистого візиту, будь ласка, заздалегідь узгодьте зустріч.']] },
};

function withCity(text, city) {
  return text.replaceAll('{city}', city);
}

const localizedLocationPages = Object.entries(locationI18n).flatMap(([lang, copy]) => (
  LOCATIONS.map((location) => ({
    path: `${copy.prefix}/${location.slug}`,
    kind: 'location',
    lang,
    group: `location-${location.slug}`,
    location,
    eyebrow: `${copy.label} ${location.city}`,
    title: withCity(copy.title, location.city),
    description: `${withCity(copy.title, location.city)} ${location.street}, ${location.postalCode} ${location.city}.`,
    intro: withCity(copy.intro, location.city),
    highlights: copy.highlights,
    sections: [
      [withCity(copy.local, location.city), `${location.street}, ${location.postalCode} ${location.city}. ${withCity(copy.sections[0][1], location.city)}`],
      [withCity(copy.services, location.city), withCity(copy.sections[1][1], location.city)],
    ],
    faqs: copy.faq,
    cta: copy.cta,
  }))
));

const multilingualBase = {
  en: {
    certified: {
      path: '/en/certified-translations',
      group: 'certified-translations',
      eyebrow: 'Certified translations',
      title: 'Certified translations for German authorities and official use.',
      description: 'Certified translations of certificates, licences, diplomas and official documents by sworn translators in Germany.',
      intro: 'Send us a clear scan or photo of your document. NOON checks the language, purpose and delivery needs, then prepares a transparent fixed-price quote.',
      sections: [['Official documents', 'We translate birth certificates, marriage certificates, driving licences, diplomas, court documents and other official records.'], ['Digital or personal service', 'You can send documents by WhatsApp, email or the website form. Finished translations can be delivered digitally, by post or collected at a branch.']],
      highlights: ['Sworn translators', 'Official use', 'Fast quote'],
      serviceType: 'Certified translation',
      cta: 'Request a free quote',
    },
    interpreting: {
      path: '/en/interpreting',
      group: 'interpreting',
      eyebrow: 'Interpreting',
      title: 'Professional interpreters for appointments across Germany.',
      description: 'Interpreters for authorities, registry offices, notaries, courts, clinics and companies, on site, by video or by phone.',
      intro: 'We help organize qualified interpreters for official, medical, legal and business appointments in Germany.',
      sections: [['For important appointments', 'Tell us the city, date, time, language pair and topic. We check suitable interpreter availability.'], ['Flexible formats', 'On-site, video and telephone interpreting are available depending on the language and appointment type.']],
      highlights: ['On site or online', '190+ languages', 'Fast support'],
      serviceType: 'Interpreting',
      cta: 'Request an interpreter',
    },
    specialist: {
      path: '/en/specialist-translations',
      group: 'specialist-translations',
      eyebrow: 'Specialist translations',
      title: 'Specialist translations with precise terminology.',
      description: 'Professional specialist translations for medicine, law, finance, engineering, pharma, IT, chemistry and industry.',
      intro: 'Specialist texts require language accuracy and subject knowledge. Our translators adapt terminology, tone and content to the target use.',
      sections: [['Fields of expertise', 'We translate specialist content for law, medicine and dentistry, finance, engineering, pharma, IT, chemistry, life sciences and industry.'], ['Clear project process', 'Send your files or project description and receive information about price, delivery time and workflow.']],
      highlights: ['ISO 17100', 'Terminology', '190+ languages'],
      serviceType: 'Specialist translation',
      cta: 'Request a free specialist quote',
    },
  },
  ar: {
    certified: {
      path: '/ar/translated-certified-documents',
      group: 'certified-translations',
      eyebrow: 'ترجمات معتمدة',
      title: 'ترجمات معتمدة للدوائر والجهات الرسمية في ألمانيا.',
      description: 'ترجمة معتمدة للوثائق والشهادات ورخص القيادة والمستندات الرسمية من مترجمين محلفين في ألمانيا.',
      intro: 'أرسل لنا صورة واضحة أو ملفا للمستند. نراجع اللغة والغرض والمدة المطلوبة ثم نرسل لك عرض سعر واضحا.',
      sections: [['وثائق رسمية', 'نترجم شهادات الميلاد والزواج ورخص القيادة والشهادات الدراسية والمستندات القضائية وغيرها من الوثائق الرسمية.'], ['خدمة رقمية أو شخصية', 'يمكنك إرسال المستندات عبر واتساب أو البريد أو النموذج، واستلام الترجمة رقميا أو بالبريد أو من أحد الفروع.']],
      highlights: ['مترجمون محلفون', 'للجهات الرسمية', 'عرض سريع'],
      serviceType: 'ترجمة معتمدة',
      cta: 'اطلب عرضا مجانيا',
    },
    interpreting: {
      path: '/ar/interpreting-services',
      group: 'interpreting',
      eyebrow: 'ترجمة فورية',
      title: 'مترجمون فوريون للمواعيد المهمة في ألمانيا.',
      description: 'مترجمون فوريون للدوائر الحكومية، Standesamt، الكاتب العدل، المحاكم، العيادات والشركات.',
      intro: 'نساعدك في تنظيم مترجم فوري مناسب للمواعيد الرسمية والطبية والقانونية والتجارية في ألمانيا.',
      sections: [['للمواعيد المهمة', 'أرسل المدينة والتاريخ والوقت واللغة وموضوع الموعد، وسنراجع توفر مترجم مناسب.'], ['حضوري أو عن بعد', 'نوفر الترجمة حضوريا أو عبر الفيديو أو الهاتف حسب اللغة ونوع الموعد.']],
      highlights: ['حضوري أو أونلاين', 'أكثر من 190 لغة', 'دعم سريع'],
      serviceType: 'ترجمة فورية',
      cta: 'اطلب مترجما فوريا',
    },
    specialist: {
      path: '/ar/specialist-translations',
      group: 'specialist-translations',
      eyebrow: 'ترجمات متخصصة',
      title: 'ترجمات متخصصة بدقة اصطلاحية.',
      description: 'ترجمات متخصصة للطب والقانون والمال والهندسة والصيدلة وتقنية المعلومات والكيمياء والصناعة.',
      intro: 'النصوص المتخصصة تحتاج إلى دقة لغوية ومعرفة بالمجال. ينقل مترجمونا المصطلحات والنبرة والمحتوى بما يناسب الغرض النهائي.',
      sections: [['مجالات تخصص', 'نترجم في القانون والطب وطب الأسنان والمال والهندسة والصيدلة وتقنية المعلومات والكيمياء وعلوم الحياة والصناعة.'], ['عملية واضحة', 'أرسل الملفات أو وصف المشروع لتحصل على معلومات السعر والمدة وآلية العمل.']],
      highlights: ['ISO 17100', 'مصطلحات دقيقة', '190+ لغة'],
      serviceType: 'ترجمة متخصصة',
      cta: 'اطلب عرضا مجانيا',
    },
  },
  tr: {
    certified: {
      path: '/tr/yeminli-tercume',
      group: 'certified-translations',
      eyebrow: 'Yeminli çeviri',
      title: 'Alman kurumları için yeminli belge çevirileri.',
      description: 'Belgeler, sertifikalar, ehliyetler ve resmi evraklar için Almanya’da yeminli çeviri hizmeti.',
      intro: 'Belgenizin net bir fotoğrafını veya taramasını gönderin. NOON dili, kullanım amacını ve teslim süresini kontrol ederek size net bir teklif sunar.',
      sections: [['Resmi belgeler', 'Doğum belgesi, evlilik belgesi, ehliyet, diploma, mahkeme evrakları ve diğer resmi belgeleri çeviriyoruz.'], ['Dijital veya şahsen', 'Belgeleri WhatsApp, e-posta veya form ile gönderebilirsiniz. Teslimat dijital, posta veya şubeden olabilir.']],
      highlights: ['Yeminli çevirmenler', 'Resmi kullanım', 'Hızlı teklif'],
      serviceType: 'Yeminli çeviri',
      cta: 'Ücretsiz teklif iste',
    },
    interpreting: {
      path: '/tr/tercumanlik',
      group: 'interpreting',
      eyebrow: 'Tercümanlık',
      title: 'Almanya genelinde randevular için profesyonel tercümanlar.',
      description: 'Resmi kurumlar, nikah dairesi, noter, mahkeme, klinik ve şirketler için tercümanlık.',
      intro: 'Resmi, tıbbi, hukuki ve ticari randevular için uygun tercüman organize etmenize yardımcı oluyoruz.',
      sections: [['Önemli randevular', 'Şehir, tarih, saat, dil çifti ve konu bilgisini gönderin; uygun tercüman müsaitliğini kontrol edelim.'], ['Esnek formatlar', 'Dile ve randevu türüne göre yüz yüze, video veya telefon tercümanlığı mümkündür.']],
      highlights: ['Yerinde veya online', '190+ dil', 'Hızlı destek'],
      serviceType: 'Tercümanlık',
      cta: 'Ücretsiz tercüman talebi',
    },
    specialist: {
      path: '/tr/uzmanlik-cevirileri',
      group: 'specialist-translations',
      eyebrow: 'Uzmanlık çevirileri',
      title: 'Terminolojisi doğru uzmanlık çevirileri.',
      description: 'Tıp, hukuk, finans, mühendislik, ilaç, IT, kimya ve endüstri için profesyonel uzmanlık çevirileri.',
      intro: 'Uzmanlık metinleri dil doğruluğu ve alan bilgisi gerektirir. Çevirmenlerimiz terminolojiyi ve içeriği kullanım amacına göre aktarır.',
      sections: [['Uzmanlık alanları', 'Hukuk, tıp, diş hekimliği, finans, mühendislik, ilaç, IT, kimya, yaşam bilimleri ve endüstri metinleri çeviriyoruz.'], ['Net proje süreci', 'Dosyalarınızı veya proje açıklamasını gönderin; fiyat, teslim süresi ve süreç bilgisi alın.']],
      highlights: ['ISO 17100', 'Terminoloji', '190+ dil'],
      serviceType: 'Uzmanlık çevirisi',
      cta: 'Ücretsiz teklif iste',
    },
  },
};

const extraLangs = {
  ru: ['Сертифицированные переводы для официального использования в Германии.', 'Устный перевод для важных встреч в Германии.', 'Специализированные переводы с точной терминологией.'],
  fr: ['Traductions certifiées pour les autorités et usages officiels en Allemagne.', 'Interprètes professionnels pour rendez-vous importants en Allemagne.', 'Traductions spécialisées avec terminologie précise.'],
  uk: ['Засвідчені переклади для офіційного використання в Німеччині.', 'Усний переклад для важливих зустрічей у Німеччині.', 'Спеціалізовані переклади з точною термінологією.'],
};

const extraLangDescriptionTail = {
  ru: 'NOON поддерживает клиентов в Германии лично, онлайн и на нескольких языках.',
  fr: 'NOON accompagne les clients en Allemagne personnellement, en ligne et en plusieurs langues.',
  uk: 'NOON підтримує клієнтів у Німеччині особисто, онлайн і кількома мовами.',
};

const extraLangPaths = {
  ru: ['/ru/zaverennye-perevody', '/ru/ustnyj-perevod', '/ru/specializirovannye-perevody'],
  fr: ['/fr/traductions-certifiees', '/fr/interpretariat', '/fr/traductions-specialisees'],
  uk: ['/uk/zasvidcheni-pereklady', '/uk/usnyi-pereklad', '/uk/spetsializovani-pereklady'],
};

const multilingualPages = [
  ...Object.entries(multilingualBase).flatMap(([lang, pages]) => (
    Object.values(pages).map((page) => ({ ...page, lang }))
  )),
  ...Object.entries(extraLangs).flatMap(([lang, titles]) => {
    const keys = ['certified-translations', 'interpreting', 'specialist-translations'];
    const eyebrows = {
      ru: ['Заверенные переводы', 'Устный перевод', 'Специализированные переводы'],
      fr: ['Traductions certifiées', 'Interprétariat', 'Traductions spécialisées'],
      uk: ['Засвідчені переклади', 'Усний переклад', 'Спеціалізовані переклади'],
    }[lang];
    return keys.map((group, index) => ({
      path: extraLangPaths[lang][index],
      group,
      lang,
      kind: 'service',
      eyebrow: eyebrows[index],
      title: titles[index],
      description: `${titles[index]} ${extraLangDescriptionTail[lang]}`,
      intro: `${titles[index]} Senden Sie Ihre Anfrage mit Dokumenten, Termin oder Projektbeschreibung. Wir prüfen Preis, Lieferzeit und passende Umsetzung.`,
      highlights: index === 1 ? ['Vor Ort oder online', '190+ Sprachen', 'Schnelle Anfrage'] : ['190+ Sprachen', 'Fachlich geprüft', 'Kostenlose Anfrage'],
      sections: [
        ['Service', 'NOON unterstützt private, behördliche und geschäftliche Anliegen mit klaren Abläufen, persönlicher Beratung und mehrsprachigem Team.'],
        ['Anfrage', 'Senden Sie Unterlagen oder Termindaten digital. Sie erhalten vorab eine Einschätzung zu Preis, Lieferzeit und Ablauf.'],
      ],
      serviceType: eyebrows[index],
      cta: lang === 'fr' ? 'Demander un devis gratuit' : lang === 'uk' ? 'Надіслати запит' : 'Отправить запрос',
    }));
  }),
].map((page) => ({
  kind: 'service',
  highlights: ['190+ Sprachen', 'Kostenlose Anfrage', 'Persönliche Beratung'],
  faqs: [],
  ...page,
}));

const servicePathBases = {
  de: { interpreting: '/de/dolmetschen', translation: '/de/beglaubigte-uebersetzungen', specialist: '/de/fachuebersetzungen' },
  en: { interpreting: '/en/interpreting', translation: '/en/certified-translations', specialist: '/en/specialist-translations' },
  ar: { interpreting: '/ar/interpreting-services', translation: '/ar/translated-certified-documents', specialist: '/ar/specialist-translations' },
  tr: { interpreting: '/tr/tercumanlik', translation: '/tr/yeminli-tercume', specialist: '/tr/uzmanlik-cevirileri' },
  ru: { interpreting: '/ru/ustnyj-perevod', translation: '/ru/zaverennye-perevody', specialist: '/ru/specializirovannye-perevody' },
  fr: { interpreting: '/fr/interpretariat', translation: '/fr/traductions-certifiees', specialist: '/fr/traductions-specialisees' },
  uk: { interpreting: '/uk/usnyi-pereklad', translation: '/uk/zasvidcheni-pereklady', specialist: '/uk/spetsializovani-pereklady' },
};

const serviceSlugMap = {
  de: {
    simultandolmetscher: 'simultandolmetscher',
    verhandlungsdolmetscher: 'verhandlungsdolmetscher',
    'video-telefondolmetscher': 'video-und-telefondolmetscher',
    'beeidigte-dolmetscher': 'beeidigte-dolmetscher',
    notardolmetscher: 'notardolmetscher',
    'standesamt-dolmetscher': 'standesamt-dolmetscher',
    'wirtschaft-finanzen': 'wirtschaft-finanzen',
    recht: 'recht',
    ingenieurwesen: 'ingenieurwesen',
    'medizin-dental': 'medizinische-dentalmedizin',
    pharmazeutik: 'pharmazeutik',
    literatur: 'literatur',
    'it-software': 'it-software',
    'chemie-biowissenschaften': 'chemie-biowissenschaften',
    'industrie-produktion': 'industrie-produktion',
  },
  en: {
    simultandolmetscher: 'simultaneous-interpreters',
    verhandlungsdolmetscher: 'negotiation-interpreters',
    'video-telefondolmetscher': 'video-telephone-interpreters',
    'beeidigte-dolmetscher': 'sworn-interpreters',
    notardolmetscher: 'notary-interpreters',
    'standesamt-dolmetscher': 'registry-office-interpreters',
    'wirtschaft-finanzen': 'business-finance',
    recht: 'legal',
    ingenieurwesen: 'engineering',
    'medizin-dental': 'medical-dental',
    pharmazeutik: 'pharmaceuticals',
    literatur: 'literature',
    'it-software': 'it-software',
    'chemie-biowissenschaften': 'chemistry-life-sciences',
    'industrie-produktion': 'industry-production',
  },
  ar: {
    simultandolmetscher: 'simultaneous-interpreters',
    verhandlungsdolmetscher: 'negotiation-interpreters',
    'video-telefondolmetscher': 'video-telephone-interpreters',
    'beeidigte-dolmetscher': 'sworn-interpreters',
    notardolmetscher: 'notary-interpreters',
    'standesamt-dolmetscher': 'registry-office-interpreters',
    'wirtschaft-finanzen': 'business-finance',
    recht: 'legal',
    ingenieurwesen: 'engineering',
    'medizin-dental': 'medical-dental',
    pharmazeutik: 'pharmaceuticals',
    literatur: 'literature',
    'it-software': 'it-software',
    'chemie-biowissenschaften': 'chemistry-life-sciences',
    'industrie-produktion': 'industry-production',
  },
  tr: {
    simultandolmetscher: 'simultane-tercumanlar',
    verhandlungsdolmetscher: 'muzakere-tercumanlari',
    'video-telefondolmetscher': 'video-telefon-tercumanlari',
    'beeidigte-dolmetscher': 'yeminli-tercumanlar',
    notardolmetscher: 'noter-tercumanlari',
    'standesamt-dolmetscher': 'nikah-dairesi-tercumanlari',
    'wirtschaft-finanzen': 'ekonomi-finans',
    recht: 'hukuk',
    ingenieurwesen: 'muhendislik',
    'medizin-dental': 'tip-dis-hekimligi',
    pharmazeutik: 'farmasotik',
    literatur: 'edebiyat',
    'it-software': 'bt-yazilim',
    'chemie-biowissenschaften': 'kimya-yasam-bilimleri',
    'industrie-produktion': 'sanayi-uretim',
  },
  ru: {
    simultandolmetscher: 'sinhronnye-perevodchiki',
    verhandlungsdolmetscher: 'perevodchiki-dlya-peregovorov',
    'video-telefondolmetscher': 'video-telefonnye-perevodchiki',
    'beeidigte-dolmetscher': 'prisyazhnye-ustnye-perevodchiki',
    notardolmetscher: 'notarialnye-perevodchiki',
    'standesamt-dolmetscher': 'perevodchiki-dlya-zagsa',
    'wirtschaft-finanzen': 'biznes-finansy',
    recht: 'pravo',
    ingenieurwesen: 'inzhiniring',
    'medizin-dental': 'medicina-stomatologiya',
    pharmazeutik: 'farmacevtika',
    literatur: 'literatura',
    'it-software': 'it-po',
    'chemie-biowissenschaften': 'himiya-bionauki',
    'industrie-produktion': 'promyshlennost-proizvodstvo',
  },
  fr: {
    simultandolmetscher: 'interpretes-simultanes',
    verhandlungsdolmetscher: 'interpretes-negociation',
    'video-telefondolmetscher': 'interpretes-video-telephone',
    'beeidigte-dolmetscher': 'interpretes-assermentes',
    notardolmetscher: 'interpretes-notaire',
    'standesamt-dolmetscher': 'interpretes-etat-civil',
    'wirtschaft-finanzen': 'economie-finance',
    recht: 'droit',
    ingenieurwesen: 'ingenierie',
    'medizin-dental': 'medecine-dentaire',
    pharmazeutik: 'pharmaceutique',
    literatur: 'litterature',
    'it-software': 'it-logiciels',
    'chemie-biowissenschaften': 'chimie-sciences-vivant',
    'industrie-produktion': 'industrie-production',
  },
  uk: {
    simultandolmetscher: 'synhronni-perekladachi',
    verhandlungsdolmetscher: 'perekladachi-dlya-peregovoriv',
    'video-telefondolmetscher': 'video-telefonni-perekladachi',
    'beeidigte-dolmetscher': 'prysyazhni-usni-perekladachi',
    notardolmetscher: 'notarialni-perekladachi',
    'standesamt-dolmetscher': 'perekladachi-dlya-ratsu',
    'wirtschaft-finanzen': 'biznes-finansy',
    recht: 'pravo',
    ingenieurwesen: 'inzheneriya',
    'medizin-dental': 'medytsyna-stomatologiya',
    pharmazeutik: 'farmatsevtyka',
    literatur: 'literatura',
    'it-software': 'it-pz',
    'chemie-biowissenschaften': 'himiya-bionauky',
    'industrie-produktion': 'promyslovist-vyrobnytstvo',
  },
};

const serviceHeadings = {
  de: ['Details', 'Ablauf', 'Anfrage'],
  en: ['Details', 'Process', 'Request'],
  ar: ['التفاصيل', 'طريقة العمل', 'الطلب'],
  tr: ['Detaylar', 'Süreç', 'Talep'],
  ru: ['Подробности', 'Процесс', 'Запрос'],
  fr: ['Détails', 'Processus', 'Demande'],
  uk: ['Деталі', 'Процес', 'Запит'],
};

const serviceFallbackHighlights = {
  de: ['Kostenlose Anfrage', 'Persönliche Beratung', 'Mehrsprachiges Team'],
  en: ['Free request', 'Personal advice', 'Multilingual team'],
  ar: ['طلب مجاني', 'استشارة شخصية', 'فريق متعدد اللغات'],
  tr: ['Ücretsiz talep', 'Kişisel danışmanlık', 'Çok dilli ekip'],
  ru: ['Бесплатный запрос', 'Личная консультация', 'Многоязычная команда'],
  fr: ['Demande gratuite', 'Conseil personnalisé', 'Équipe multilingue'],
  uk: ['Безкоштовний запит', 'Особиста консультація', 'Багатомовна команда'],
};

const serviceSectionLabels = {
  de: { overview: 'Leistungsdetails', useCases: 'Typische Einsatzbereiche', quality: 'Qualität und Sprachen', process: 'Ablauf und Anfrage' },
  en: { overview: 'Service details', useCases: 'Typical use cases', quality: 'Quality and languages', process: 'Process and request' },
  ar: { overview: 'تفاصيل الخدمة', useCases: 'الاستخدامات الشائعة', quality: 'الجودة واللغات', process: 'طريقة العمل والطلب' },
  tr: { overview: 'Hizmet detayları', useCases: 'Tipik kullanım alanları', quality: 'Kalite ve diller', process: 'Süreç ve talep' },
  ru: { overview: 'Описание услуги', useCases: 'Типичные случаи', quality: 'Качество и языки', process: 'Процесс и запрос' },
  fr: { overview: 'Détails du service', useCases: 'Cas d’utilisation typiques', quality: 'Qualité et langues', process: 'Processus et demande' },
  uk: { overview: 'Деталі послуги', useCases: 'Типові випадки', quality: 'Якість і мови', process: 'Процес і запит' },
};

function getServicePath(lang, item) {
  const base = servicePathBases[lang]?.[item.group] || servicePathBases.de[item.group];
  if (item.id === 'dolmetschen-overview' || item.id === 'beglaubigte-uebersetzungen') return base;
  const slug = serviceSlugMap[lang]?.[item.id] || serviceSlugMap.de[item.id] || item.id;
  return `${base}/${slug}`;
}

function joinParagraphs(items) {
  return items.filter(Boolean).join('\n\n');
}

function buildServiceSections(lang, item, paragraphs) {
  const labels = serviceSectionLabels[lang] || serviceSectionLabels.de;
  const rest = paragraphs.slice(1).filter(Boolean);

  if (rest.length <= 3) {
    const headings = serviceHeadings[lang] || serviceHeadings.de;
    return rest.map((paragraph, index) => [headings[index] || labels.overview, paragraph]);
  }

  if (item.id === 'beglaubigte-uebersetzungen') {
    return [
      [labels.overview, joinParagraphs(rest.slice(0, 1))],
      [labels.useCases, joinParagraphs(rest.slice(1, 8))],
      [labels.quality, joinParagraphs(rest.slice(8, 28))],
      [labels.process, joinParagraphs(rest.slice(28))],
    ].filter(([, text]) => text);
  }

  if (rest.length > 8) {
    const midpoint = Math.ceil(rest.length / 2);
    return [
      [labels.overview, joinParagraphs(rest.slice(0, 2))],
      [labels.useCases, joinParagraphs(rest.slice(2, midpoint))],
      [labels.quality, joinParagraphs(rest.slice(midpoint, -2))],
      [labels.process, joinParagraphs(rest.slice(-2))],
    ].filter(([, text]) => text);
  }

  return [
    [labels.overview, joinParagraphs(rest.slice(0, 2))],
    [labels.useCases, joinParagraphs(rest.slice(2, -1))],
    [labels.process, joinParagraphs(rest.slice(-1))],
  ].filter(([, text]) => text);
}

function toServiceSeoPage(lang, item) {
  const paragraphs = item.paragraphs?.length ? item.paragraphs : [item.text].filter(Boolean);
  return {
    path: getServicePath(lang, item),
    kind: 'service',
    lang,
    group: item.id,
    serviceNavId: item.id,
    serviceGroup: item.group,
    eyebrow: item.label,
    title: item.title,
    metaTitle: `${item.label} | NOON. Sprachdienst`,
    description: `${item.title}. ${paragraphs[0] || ''} Kostenlose Anfrage bei NOON. Sprachdienst in Deutschland.`.replace(/\s+/g, ' ').slice(0, 230),
    intro: paragraphs[0] || item.title,
    highlights: (item.examples?.length ? item.examples : serviceFallbackHighlights[lang] || serviceFallbackHighlights.de).slice(0, 3),
    sections: buildServiceSections(lang, item, paragraphs),
    faqs: [],
    serviceType: item.label,
    cta: item.cta,
  };
}

function makeSpecialistOverviewPage(lang) {
  const ui = serviceUi[lang] || serviceUi.de;
  const specialistItems = getServiceNavigation(lang).filter((item) => item.group === 'specialist');
  return {
    path: servicePathBases[lang]?.specialist || servicePathBases.de.specialist,
    kind: 'service',
    lang,
    group: 'fachuebersetzungen',
    serviceNavId: 'fachuebersetzungen',
    serviceGroup: 'specialist',
    eyebrow: ui.kicker,
    title: ui.title,
    metaTitle: `${ui.title.replace(/\.$/, '')} | NOON. Sprachdienst`,
    description: ui.sub,
    intro: ui.sub,
    highlights: (serviceFallbackHighlights[lang] || serviceFallbackHighlights.de),
    sections: specialistItems.slice(0, 6).map((item) => [item.label, item.paragraphs?.[0] || item.text || item.title]),
    faqs: [],
    serviceType: ui.kicker,
    cta: lang === 'de' ? 'Kostenlose Fachübersetzungsanfrage' : (serviceFallbackHighlights[lang] || serviceFallbackHighlights.de)[0],
  };
}

const generatedServicePages = Object.keys(SEO_LANGUAGES).flatMap((lang) => {
  const pages = getServiceNavigation(lang).map((item) => toServiceSeoPage(lang, item));
  return [
    makeSpecialistOverviewPage(lang),
    ...pages.filter((page) => page.serviceNavId !== 'wirtschaft-finanzen' || page.path !== servicePathBases[lang]?.specialist),
  ];
});

const servicePages = generatedServicePages;

export const PRICE_PAGE = {
  path: '/preise',
  kind: 'service',
  lang: 'de',
  group: 'pricing',
  eyebrow: 'Preise',
  title: 'Startpreise für Übersetzungen und Dolmetschen.',
  metaTitle: 'Preise für Übersetzung und Dolmetschen | NOON. Sprachdienst',
  description: 'Startpreise für beglaubigte Übersetzungen, Fachübersetzungen und Dolmetschen. Kostenloses Festpreisangebot für Ihren individuellen Auftrag anfordern.',
  intro: 'Die angezeigten Preise sind Einstiegspreise für Standardfälle. Der genaue Preis hängt von Dokumenttyp, Umfang, Sprachkombination und gewünschter Lieferzeit ab. Sie erhalten vorab ein kostenloses und transparentes Angebot.',
  highlights: ['Kostenlose Anfrage', 'Transparente Kalkulation', 'Festpreis vor Auftrag'],
  sections: [
    ['Beglaubigte Übersetzungen', 'Standarddokumente beginnen ab 39 Euro pro Dokument. Senden Sie ein Foto oder einen Scan, damit wir Aufwand, Lieferzeit und Preis für Ihre Unterlagen verbindlich einschätzen können.'],
    ['Fachübersetzungen', 'Fachtexte beginnen ab 0,12 Euro pro Wort. Der endgültige Preis richtet sich nach Fachgebiet, Umfang, Sprachkombination und gewünschter Bearbeitungszeit.'],
    ['Dolmetschen', 'Dolmetschdienste beginnen ab 85 Euro pro Stunde. Für ein passendes Angebot benötigen wir Termin, Ort, Sprachkombination und Anlass.'],
  ],
  faqs: [
    ['Sind die Preise verbindlich?', 'Die angezeigten Preise sind Startpreise. Vor Auftrag erhalten Sie ein individuelles Festpreisangebot.'],
    ['Kostet die Anfrage etwas?', 'Nein, die Angebotserstellung ist kostenlos.'],
  ],
  serviceType: 'Sprachdienstleistungen',
  cta: 'Kostenloses Angebot anfordern',
};

const pricePageCopies = {
  en: {
    path: '/en/pricing',
    eyebrow: 'Pricing',
    title: 'Starting prices for translations and interpreting.',
    description: 'Starting prices for certified translations, specialist translations and interpreting. Request a free fixed-price quote for your project.',
    intro: 'The prices shown are starting prices for standard cases. Your exact fixed price depends on document type, length, language pair and delivery time.',
    sections: [
      ['Certified translations', 'Standard documents start from 39 euro per document. Send a scan or photo so we can confirm scope, delivery time and price.'],
      ['Specialist translations', 'Specialist texts start from 0.12 euro per word. The final price depends on subject area, volume, language pair and deadline.'],
      ['Interpreting', 'Interpreting starts from 85 euro per hour. For a precise offer, we need date, location, language pair and appointment type.'],
    ],
    cta: 'Request a free quote',
  },
  ar: {
    path: '/ar/pricing',
    eyebrow: 'الأسعار',
    title: 'أسعار مبدئية للترجمة والترجمة الفورية.',
    description: 'أسعار مبدئية للترجمات المعتمدة والمتخصصة والترجمة الفورية. اطلب عرض سعر ثابت ومجاني حسب طلبك.',
    intro: 'الأسعار المعروضة هي أسعار بداية للحالات القياسية. السعر النهائي يعتمد على نوع الوثيقة والحجم واللغة ووقت التسليم.',
    sections: [
      ['ترجمات معتمدة', 'تبدأ المستندات القياسية من 39 يورو لكل وثيقة. أرسل صورة أو ملفا واضحا لنراجع السعر والمدة.'],
      ['ترجمات متخصصة', 'تبدأ النصوص المتخصصة من 0,12 يورو لكل كلمة. السعر النهائي يعتمد على المجال والحجم واللغة والموعد المطلوب.'],
      ['ترجمة فورية', 'تبدأ خدمات الترجمة الفورية من 85 يورو في الساعة. نحتاج إلى التاريخ والمكان واللغة ونوع الموعد.'],
    ],
    cta: 'اطلب عرضا مجانيا',
  },
  tr: {
    path: '/tr/fiyatlar',
    eyebrow: 'Fiyatlar',
    title: 'Çeviri ve tercümanlık için başlangıç fiyatları.',
    description: 'Yeminli çeviri, uzmanlık çevirisi ve tercümanlık için başlangıç fiyatları. Ücretsiz sabit fiyat teklifi isteyin.',
    intro: 'Gösterilen fiyatlar standart durumlar için başlangıç fiyatlarıdır. Kesin fiyat belge türüne, hacme, dil çiftine ve teslim süresine bağlıdır.',
    sections: [
      ['Yeminli çeviriler', 'Standart belgeler belge başına 39 eurodan başlar. Kapsam, süre ve fiyatı netleştirmek için fotoğraf veya tarama gönderin.'],
      ['Uzmanlık çevirileri', 'Uzman metinler kelime başına 0,12 eurodan başlar. Fiyat alan, hacim, dil çifti ve teslim süresine göre belirlenir.'],
      ['Tercümanlık', 'Tercümanlık saat başına 85 eurodan başlar. Net teklif için tarih, yer, dil çifti ve randevu türü gerekir.'],
    ],
    cta: 'Ücretsiz teklif iste',
  },
  ru: {
    path: '/ru/ceny',
    eyebrow: 'Цены',
    title: 'Стартовые цены на письменный и устный перевод.',
    description: 'Стартовые цены на заверенные переводы, специализированные переводы и услуги устных переводчиков. Запросите бесплатный фиксированный расчёт.',
    intro: 'Указанные цены являются стартовыми для стандартных случаев. Точная цена зависит от типа документа, объёма, языковой пары и срока.',
    sections: [
      ['Заверенные переводы', 'Стандартные документы начинаются от 39 евро за документ. Отправьте фото или скан для оценки объёма, срока и цены.'],
      ['Специализированные переводы', 'Специализированные тексты начинаются от 0,12 евро за слово. Цена зависит от тематики, объёма, языковой пары и срока.'],
      ['Устный перевод', 'Устный перевод начинается от 85 евро в час. Для точного предложения нужны дата, место, языковая пара и тип встречи.'],
    ],
    cta: 'Запросить расчёт',
  },
  fr: {
    path: '/fr/tarifs',
    eyebrow: 'Tarifs',
    title: 'Prix de départ pour traductions et interprétariat.',
    description: 'Prix de départ pour traductions certifiées, traductions spécialisées et interprétariat. Demandez un devis fixe gratuit.',
    intro: 'Les prix affichés sont des prix de départ pour les cas standards. Le prix exact dépend du type de document, du volume, de la paire de langues et du délai.',
    sections: [
      ['Traductions certifiées', 'Les documents standards commencent à 39 euros par document. Envoyez une photo ou un scan pour confirmer le prix et le délai.'],
      ['Traductions spécialisées', 'Les textes spécialisés commencent à 0,12 euro par mot. Le prix dépend du domaine, du volume, de la paire de langues et du délai.'],
      ['Interprétariat', 'L’interprétariat commence à 85 euros par heure. Pour une offre précise, indiquez date, lieu, langues et type de rendez-vous.'],
    ],
    cta: 'Demander un devis gratuit',
  },
  uk: {
    path: '/uk/tsiny',
    eyebrow: 'Ціни',
    title: 'Стартові ціни на письмовий та усний переклад.',
    description: 'Стартові ціни на засвідчені переклади, спеціалізовані переклади та усний переклад. Запросіть безкоштовну фіксовану пропозицію.',
    intro: 'Показані ціни є стартовими для стандартних випадків. Точна ціна залежить від типу документа, обсягу, мовної пари та терміну.',
    sections: [
      ['Засвідчені переклади', 'Стандартні документи починаються від 39 євро за документ. Надішліть фото або скан для оцінки ціни та терміну.'],
      ['Спеціалізовані переклади', 'Спеціалізовані тексти починаються від 0,12 євро за слово. Ціна залежить від галузі, обсягу, мовної пари та терміну.'],
      ['Усний переклад', 'Усний переклад починається від 85 євро за годину. Для точної пропозиції потрібні дата, місце, мовна пара та тип зустрічі.'],
    ],
    cta: 'Запросити пропозицію',
  },
};

export const PRICE_PAGES = [
  PRICE_PAGE,
  ...Object.entries(pricePageCopies).map(([lang, copy]) => ({
    ...PRICE_PAGE,
    ...copy,
    lang,
    group: 'pricing',
    metaTitle: `${copy.eyebrow} | NOON. Sprachdienst`,
    serviceType: copy.eyebrow,
    highlights: PRICE_PAGE.highlights,
    faqs: [],
  })),
];

export function getPricingPage(path) {
  const normalized = path.replace(/\/+$/, '') || '/';
  return PRICE_PAGES.find((page) => page.path === normalized || (normalized === '/pricing' && page.lang === 'en'));
}

export function getPricingPathForLanguage(lang) {
  return PRICE_PAGES.find((page) => page.lang === lang)?.path || '/preise';
}

export const SEO_PAGES = [...servicePages, ...locationPages, ...localizedLocationPages];
export const SEO_PATHS = SEO_PAGES.map((page) => page.path);

export function getSeoPage(path) {
  const normalized = path.replace(/\/+$/, '') || '/';
  return SEO_PAGES.find((page) => page.path === normalized);
}

export function getCanonicalUrl(path) {
  return `${SITE_URL}${path === '/' ? '/' : `${path}/`}`;
}

export function getLanguageAlternates(page) {
  if (!page?.group) return [];
  return SEO_PAGES
    .filter((item) => item.group === page.group)
    .map((item) => ({ lang: SEO_LANGUAGES[item.lang]?.html || item.lang, href: getCanonicalUrl(item.path) }));
}

export function getSeoPathForLanguage(path, lang) {
  const page = getSeoPage(path);
  if (!page?.group) return null;
  return SEO_PAGES.find((item) => item.group === page.group && item.lang === lang)?.path || null;
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
    foundingDate: COMPANY.foundingDate,
    areaServed: 'DE',
    availableLanguage: ['de', 'en', 'ar', 'tr', 'ru', 'fr', 'uk'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: COMPANY.telephone,
      email: COMPANY.email,
      contactType: 'customer service',
      areaServed: 'DE',
      availableLanguage: ['German', 'English', 'Arabic', 'Turkish', 'Russian', 'French', 'Ukrainian'],
    },
    address: LOCATIONS.map((location) => ({
      '@type': 'PostalAddress',
      streetAddress: location.street,
      postalCode: location.postalCode,
      addressLocality: location.city,
      addressCountry: 'DE',
    })),
    sameAs: [],
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
  const inLanguage = SEO_LANGUAGES[page.lang]?.html || 'de-DE';
  const common = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${getCanonicalUrl(page.path)}#webpage`,
    url: getCanonicalUrl(page.path),
    name: page.title,
    description: page.description,
    inLanguage,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: page.lang === 'de' ? 'Startseite' : 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: page.kind === 'location' ? 'Standorte' : 'Leistungen', item: page.kind === 'location' ? `${SITE_URL}/#branches` : `${SITE_URL}/leistungen` },
      { '@type': 'ListItem', position: 3, name: page.eyebrow, item: getCanonicalUrl(page.path) },
    ],
  };

  const faqSchema = page.faqs?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  } : null;

  if (page.kind === 'location') {
    return [common, breadcrumb, faqSchema, {
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
    }].filter(Boolean);
  }

  if (page.group === 'pricing') {
    return [common, breadcrumb, {
      '@context': 'https://schema.org',
      '@type': 'OfferCatalog',
      name: page.title,
      url: getCanonicalUrl(page.path),
      itemListElement: [
        {
          '@type': 'Offer',
          name: page.sections[0]?.[0] || 'Certified translations',
          priceCurrency: 'EUR',
          price: '39',
          availability: 'https://schema.org/InStock',
          itemOffered: { '@type': 'Service', name: page.sections[0]?.[0] || 'Certified translations', provider: { '@id': `${SITE_URL}/#organization` } },
        },
        {
          '@type': 'Offer',
          name: page.sections[1]?.[0] || 'Specialist translations',
          priceCurrency: 'EUR',
          price: '0.12',
          availability: 'https://schema.org/InStock',
          itemOffered: { '@type': 'Service', name: page.sections[1]?.[0] || 'Specialist translations', provider: { '@id': `${SITE_URL}/#organization` } },
        },
        {
          '@type': 'Offer',
          name: page.sections[2]?.[0] || 'Interpreting',
          priceCurrency: 'EUR',
          price: '85',
          availability: 'https://schema.org/InStock',
          itemOffered: { '@type': 'Service', name: page.sections[2]?.[0] || 'Interpreting', provider: { '@id': `${SITE_URL}/#organization` } },
        },
      ],
    }].filter(Boolean);
  }

  return [common, breadcrumb, faqSchema, {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.serviceType,
    description: page.description,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: 'DE',
    serviceType: page.serviceType,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: getCanonicalUrl(page.path),
      eligibleRegion: { '@type': 'Country', name: 'Germany' },
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${SITE_URL}/angebot/`,
      availableLanguage: ['de', 'en', 'ar', 'tr', 'ru', 'fr', 'uk'],
    },
  }].filter(Boolean);
}
