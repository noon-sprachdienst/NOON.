// German landing pages per language ("Arabisch Übersetzer", "Türkisch Dolmetscher", …).
// They target German searches like "übersetzer arabisch" that no other page covers.
// Only facts confirmed by the client are used here: ermächtigte Übersetzer for every
// language, 2–3 working days standard, same-day express within ~4–5 hours, both
// directions (into and out of German), Farsi and Dari, the Arabic dialects listed.
// Sections are [heading, text, links?]; text lines starting with "• " render as a list.

const HUB_PATH = '/de/sprachen';
const PARENT = { href: `${HUB_PATH}/`, label: 'Sprachen' };
const CTA = 'Kostenloses Angebot anfordern';

const DELIVERY = [
  'Wie lange dauert eine beglaubigte Übersetzung?',
  'Standard: 2–3 Werktage.\nExpress: am selben Tag, in der Regel innerhalb von 4–5 Stunden.\n\nSie erhalten die Übersetzung als PDF per E-Mail und auf Wunsch zusätzlich per Post.',
];

const PROCESS = [
  'So einfach geht’s',
  '1. Dokument senden – Foto oder Scan per WhatsApp, E-Mail oder Webformular.\n2. Festpreis erhalten – Sie bekommen vorab ein kostenloses Angebot.\n3. Übersetzung erhalten – als PDF und auf Wunsch per Post.',
  [{ href: '/preise/', label: 'Preise ansehen' }],
];

const LOCATIONS_SECTION = [
  'Unsere Standorte',
  'Osnabrück, Stuttgart, Berlin, Bielefeld, Mainz und Kiel – Termine vor Ort nach Vereinbarung. Unabhängig vom Wohnort können Sie Ihren Auftrag deutschlandweit komplett digital abwickeln.',
];

const faqAccepted = (language) => [
  'Wird die Übersetzung von deutschen Behörden anerkannt?',
  `Ja. Ihre ${language}-Übersetzung wird von einem ermächtigten Übersetzer angefertigt und beglaubigt. Sie wird von Behörden, Gerichten, Standesämtern und Hochschulen anerkannt.`,
];

const FAQ_ORIGINAL = [
  'Muss ich das Original schicken?',
  'Für das Angebot und meist auch für die Übersetzung reicht ein gut lesbares Foto oder ein Scan. Das Original benötigen wir nur in seltenen Ausnahmefällen.',
];

const FAQ_QUOTE = [
  'Wie schnell bekomme ich ein Angebot?',
  'In der Regel innerhalb weniger Stunden. Senden Sie uns einfach Ihr Dokument per WhatsApp, E-Mail oder Formular.',
];

function interpretingText(language, extra = '') {
  return `Unsere ${language}-Dolmetscher begleiten Sie zum Beispiel:\n• bei der Ausländerbehörde\n• beim Standesamt und bei Ihrer Trauung\n• beim Notar und vor Gericht\n• beim Arzt oder im Krankenhaus\n• bei Geschäftsterminen\n\n${extra}Wenn ein Termin vor Ort nicht möglich ist, dolmetschen wir auch per Video oder Telefon.`;
}

function languagePage({ slug, language, adjective, intro, description, documents, reverse, interpretingExtra = '', special, faqs, highlights }) {
  return {
    path: `${HUB_PATH}/${slug}`,
    kind: 'service',
    serviceGroup: 'language',
    lang: 'de',
    group: `language-${slug}`,
    parent: PARENT,
    eyebrow: `${language} Übersetzer`,
    title: `${language} Übersetzer & Dolmetscher`,
    metaTitle: `${language} Übersetzer & Dolmetscher – beglaubigt | Noon Übersetzungsbüro`,
    description,
    intro,
    highlights: highlights || ['Ermächtigte Übersetzer', 'Festpreis vorab', 'Express am selben Tag'],
    sections: [
      [`Beglaubigte Übersetzungen ${language} – Deutsch`, `${documents}\n\n${reverse}`],
      DELIVERY,
      [`${language} Dolmetscher`, interpretingText(language, interpretingExtra)],
      special,
      PROCESS,
      LOCATIONS_SECTION,
    ],
    faqs: [faqAccepted(language), FAQ_ORIGINAL, ...faqs, FAQ_QUOTE],
    serviceType: `${adjective} Übersetzungen und Dolmetschen`,
    cta: CTA,
  };
}

const LANGUAGE_PAGES_BASE = [
  languagePage({
    slug: 'arabisch',
    language: 'Arabisch',
    adjective: 'Arabische',
    description: 'Beglaubigte Arabisch-Übersetzungen durch ermächtigte Übersetzer und Dolmetscher für viele arabische Dialekte. Festpreis vorab, Express am selben Tag.',
    intro: 'Sie benötigen eine beglaubigte Übersetzung aus dem Arabischen oder einen Dolmetscher für einen wichtigen Termin? Wir übersetzen Ihre Dokumente durch ermächtigte Übersetzer – anerkannt von Behörden, Gerichten, Standesämtern und Hochschulen in ganz Deutschland.',
    documents: 'Wir übersetzen offizielle Dokumente aus allen arabischsprachigen Ländern, zum Beispiel:\n• Geburtsurkunde, Heiratsurkunde, Scheidungsurkunde, Sterbeurkunde\n• Familienbuch und Registerauszüge\n• Zeugnisse und Diplome für die Anerkennung in Deutschland\n• Führerschein für die Umschreibung\n• Führungszeugnis und Gerichtsurteile\n• Arbeitszeugnisse, Verträge und Vollmachten',
    reverse: 'Auch Übersetzungen vom Deutschen ins Arabische sind möglich – etwa für Unterlagen, die Sie in einem arabischen Land vorlegen möchten.',
    interpretingExtra: 'Arabisch ist nicht gleich Arabisch: Für ein gutes Gespräch kommt es auf den Dialekt an. Unsere Dolmetscher sprechen unter anderem syrisches, sudanesisches, libysches, marokkanisches, algerisches und ägyptisches Arabisch.\n\n',
    special: [
      'Arabische Namen richtig übertragen',
      'Arabische Namen lassen sich auf verschiedene Weise in lateinische Buchstaben übertragen – zum Beispiel Mohammed, Muhammad oder Mohamed. Damit Ihre Übersetzung zu Ihren anderen Unterlagen passt, übernehmen wir die Schreibweise aus Ihrem Reisepass oder Aufenthaltstitel. Schicken Sie uns dafür einfach eine Kopie mit.',
    ],
    faqs: [
      ['Übersetzen Sie Dokumente aus allen arabischen Ländern?', 'Ja, zum Beispiel aus Syrien, dem Irak, Ägypten, Marokko, Algerien, Tunesien, dem Sudan, Libyen, dem Libanon und allen weiteren arabischsprachigen Ländern.'],
      ['Kann ich einen Dolmetscher für einen bestimmten Dialekt anfragen?', 'Ja. Nennen Sie uns bei der Anfrage den gewünschten Dialekt, dann wählen wir den passenden Dolmetscher aus.'],
    ],
  }),
  languagePage({
    slug: 'englisch',
    language: 'Englisch',
    adjective: 'Englische',
    description: 'Beglaubigte Englisch-Übersetzungen durch ermächtigte Übersetzer – für Behörden, Hochschulen und Arbeitgeber. Festpreis vorab, Express am selben Tag.',
    intro: 'Ob Studium, Beruf oder Behörde: Wir übersetzen Ihre englischen Dokumente beglaubigt ins Deutsche – und Ihre deutschen Unterlagen ins Englische. Alle Übersetzungen werden von ermächtigten Übersetzern angefertigt.',
    documents: 'Wir übersetzen offizielle Dokumente aus allen englischsprachigen Ländern, zum Beispiel:\n• Zeugnisse, Diplome und Transcripts of Records\n• Arbeitszeugnisse und Referenzschreiben\n• Geburtsurkunde, Heiratsurkunde und Scheidungsurteil\n• Führerschein und Führungszeugnis\n• Verträge, Vollmachten und Gerichtsdokumente',
    reverse: 'Besonders häufig übersetzen wir auch vom Deutschen ins Englische – zum Beispiel Zeugnisse und Nachweise für eine Bewerbung, ein Studium oder ein Visum im Ausland.',
    special: [
      'Dokumente aus Großbritannien, den USA und anderen Ländern',
      'Englische Dokumente sehen je nach Herkunftsland sehr unterschiedlich aus – aus Großbritannien, den USA, Kanada, Australien, Indien oder Nigeria. Wir übersetzen sie so, dass Inhalt und Aufbau für deutsche Stellen nachvollziehbar sind. Ob Ihr Dokument zusätzlich eine Apostille aus dem Ausstellungsland benötigt, entscheidet die Stelle, bei der Sie es vorlegen.',
    ],
    faqs: [
      ['Übersetzen Sie auch vom Deutschen ins Englische?', 'Ja. Wir übersetzen in beide Richtungen, zum Beispiel Zeugnisse, Arbeitszeugnisse und Urkunden für eine Bewerbung oder ein Visum im Ausland.'],
    ],
  }),
  languagePage({
    slug: 'tuerkisch',
    language: 'Türkisch',
    adjective: 'Türkische',
    description: 'Beglaubigte Türkisch-Übersetzungen durch ermächtigte Übersetzer und Türkisch-Dolmetscher für Behörde, Standesamt und Gericht. Express am selben Tag.',
    intro: 'Sie benötigen eine beglaubigte Übersetzung aus dem Türkischen oder einen Türkisch-Dolmetscher? Wir übersetzen Ihre Dokumente durch ermächtigte Übersetzer – anerkannt von Behörden, Gerichten und Standesämtern in ganz Deutschland.',
    documents: 'Wir übersetzen offizielle türkische Dokumente, zum Beispiel:\n• Personenstandsregisterauszug (Nüfus kayıt örneği)\n• Geburtsurkunde, Heiratsurkunde und Scheidungsurteil\n• Zeugnisse und Diplome\n• Führerschein für die Umschreibung\n• Gerichtsurteile, Verträge und Vollmachten',
    reverse: 'Auch Übersetzungen vom Deutschen ins Türkische sind möglich – etwa für Unterlagen, die Sie in der Türkei vorlegen möchten.',
    special: [
      'Türkische Namen und Sonderzeichen',
      'Türkische Namen enthalten Buchstaben wie ç, ğ, ı, ö, ş und ü. Wir übernehmen die Schreibweise so, wie sie in Ihren Ausweisdokumenten steht, damit Ihre Übersetzung zu Ihren anderen Unterlagen passt. Ob Ihr Dokument zusätzlich eine Apostille benötigt, entscheidet die Stelle, bei der Sie es vorlegen.',
    ],
    faqs: [
      ['Übersetzen Sie auch vom Deutschen ins Türkische?', 'Ja. Wir übersetzen in beide Richtungen, zum Beispiel Urkunden und Zeugnisse für die Vorlage in der Türkei.'],
    ],
  }),
  languagePage({
    slug: 'franzoesisch',
    language: 'Französisch',
    adjective: 'Französische',
    description: 'Beglaubigte Französisch-Übersetzungen durch ermächtigte Übersetzer – für Dokumente aus Frankreich, Belgien, Nord- und Westafrika. Express am selben Tag.',
    intro: 'Wir übersetzen Ihre französischen Dokumente beglaubigt ins Deutsche – und deutsche Unterlagen ins Französische. Alle Übersetzungen werden von ermächtigten Übersetzern angefertigt und von deutschen Behörden anerkannt.',
    documents: 'Wir übersetzen zum Beispiel:\n• Geburtsurkunde (acte de naissance), Heiratsurkunde und Scheidungsurteil\n• Zeugnisse, Diplome und Notenübersichten\n• Führerschein und Führungszeugnis\n• Arbeitsverträge und Arbeitszeugnisse\n• Gerichtsdokumente und Vollmachten',
    reverse: 'Auch Übersetzungen vom Deutschen ins Französische sind möglich – etwa für Unterlagen, die Sie in Frankreich, Belgien, der Schweiz oder einem anderen französischsprachigen Land vorlegen möchten.',
    special: [
      'Dokumente aus vielen Ländern',
      'Französisch ist Amtssprache in vielen Ländern – von Frankreich, Belgien und der Schweiz bis Marokko, Algerien, Tunesien, Senegal oder Kamerun. Dokumente aus dem Maghreb sind oft zweisprachig auf Französisch und Arabisch. Wir übersetzen beide Sprachen, sodass Sie für solche Unterlagen nur einen Ansprechpartner brauchen.',
    ],
    faqs: [
      ['Mein Dokument ist auf Französisch und Arabisch. Übersetzen Sie beides?', 'Ja. Zweisprachige Dokumente, etwa aus Marokko, Algerien oder Tunesien, übersetzen wir vollständig.'],
    ],
  }),
  languagePage({
    slug: 'ukrainisch',
    language: 'Ukrainisch',
    adjective: 'Ukrainische',
    description: 'Beglaubigte Ukrainisch-Übersetzungen durch ermächtigte Übersetzer und Ukrainisch-Dolmetscher für Behörden in ganz Deutschland. Express am selben Tag.',
    intro: 'Sie benötigen eine beglaubigte Übersetzung aus dem Ukrainischen oder einen Dolmetscher für einen Behördentermin? Wir übersetzen Ihre Dokumente durch ermächtigte Übersetzer – anerkannt von Behörden, Gerichten und Hochschulen in ganz Deutschland.',
    documents: 'Wir übersetzen offizielle ukrainische Dokumente, zum Beispiel:\n• Geburtsurkunde, Heiratsurkunde und Scheidungsurkunde\n• Zeugnisse und Diplome für die Anerkennung in Deutschland\n• Führerschein\n• Arbeitsbuch und Arbeitsnachweise\n• Vollmachten, Verträge und Gerichtsdokumente',
    reverse: 'Auch Übersetzungen vom Deutschen ins Ukrainische sind möglich. Russischsprachige Dokumente übersetzen wir ebenfalls.',
    special: [
      'Namen aus dem Kyrillischen richtig übertragen',
      'Ukrainische Namen werden aus der kyrillischen Schrift in lateinische Buchstaben übertragen – und dabei gibt es oft mehrere Schreibweisen. Damit Ihre Übersetzung zu Ihren anderen Unterlagen passt, übernehmen wir die Schreibweise aus Ihrem Reisepass. Schicken Sie uns dafür einfach eine Kopie mit.',
    ],
    faqs: [
      ['Übersetzen Sie auch russischsprachige Dokumente?', 'Ja. Viele ukrainische Dokumente sind auf Russisch ausgestellt. Auch diese übersetzen wir beglaubigt.'],
    ],
  }),
  languagePage({
    slug: 'persisch',
    language: 'Persisch',
    adjective: 'Persische',
    description: 'Beglaubigte Übersetzungen aus dem Persischen (Farsi und Dari) durch ermächtigte Übersetzer und Dolmetscher. Festpreis vorab, Express am selben Tag.',
    intro: 'Wir übersetzen Ihre Dokumente aus dem Persischen beglaubigt ins Deutsche – sowohl iranisches Farsi als auch afghanisches Dari. Alle Übersetzungen werden von ermächtigten Übersetzern angefertigt.',
    documents: 'Wir übersetzen offizielle Dokumente aus dem Iran und aus Afghanistan, zum Beispiel:\n• Geburtsurkunde und Personalausweis (Shenasnameh, Tazkira)\n• Heiratsurkunde und Scheidungsurkunde\n• Zeugnisse und Diplome für die Anerkennung in Deutschland\n• Führerschein\n• Gerichtsdokumente, Verträge und Vollmachten',
    reverse: 'Auch Übersetzungen vom Deutschen ins Persische sind möglich.',
    interpretingExtra: 'Wir vermitteln Dolmetscher für Farsi und Dari.\n\n',
    special: [
      'Persischer Kalender und Namen',
      'Iranische und afghanische Dokumente verwenden häufig den persischen Sonnenkalender. Damit deutsche Stellen die Daten verstehen, geben wir in der Übersetzung auch das Datum nach dem gregorianischen Kalender an. Namen übertragen wir so, wie sie in Ihrem Reisepass oder Aufenthaltstitel stehen.',
    ],
    faqs: [
      ['Übersetzen Sie Farsi und Dari?', 'Ja. Wir übersetzen Dokumente aus dem Iran (Farsi) und aus Afghanistan (Dari) und vermitteln Dolmetscher für beide Varianten.'],
    ],
    highlights: ['Farsi und Dari', 'Ermächtigte Übersetzer', 'Express am selben Tag'],
  }),
  languagePage({
    slug: 'rumaenisch',
    language: 'Rumänisch',
    adjective: 'Rumänische',
    description: 'Beglaubigte Rumänisch-Übersetzungen durch ermächtigte Übersetzer – für Dokumente aus Rumänien und der Republik Moldau. Express am selben Tag.',
    intro: 'Wir übersetzen Ihre rumänischen Dokumente beglaubigt ins Deutsche – und deutsche Unterlagen ins Rumänische. Alle Übersetzungen werden von ermächtigten Übersetzern angefertigt und von deutschen Behörden anerkannt.',
    documents: 'Wir übersetzen zum Beispiel:\n• Geburtsurkunde (certificat de naștere) und Heiratsurkunde (certificat de căsătorie)\n• Zeugnisse und Diplome\n• Arbeitsverträge und Arbeitsnachweise\n• Gerichtsdokumente und Vollmachten\n• Dokumente aus Rumänien und der Republik Moldau',
    reverse: 'Auch Übersetzungen vom Deutschen ins Rumänische sind möglich – etwa für Unterlagen, die Sie in Rumänien vorlegen möchten.',
    special: [
      'Gut zu wissen für Dokumente aus der EU',
      'Für einige öffentliche Urkunden aus EU-Staaten gibt es mehrsprachige Formulare, mit denen in manchen Fällen keine Übersetzung nötig ist. Ob das für Ihr Dokument gilt, entscheidet die Stelle, bei der Sie es vorlegen. Fragen Sie im Zweifel dort nach – wenn eine Übersetzung verlangt wird, erstellen wir sie schnell und beglaubigt.',
    ],
    faqs: [
      ['Übersetzen Sie auch Dokumente aus der Republik Moldau?', 'Ja. Rumänischsprachige Dokumente aus der Republik Moldau übersetzen wir ebenfalls beglaubigt.'],
    ],
  }),
];

const hubLinks = LANGUAGE_PAGES_BASE.map((page) => ({ href: `${page.path}/`, label: page.title }));

const LANGUAGE_HUB = {
  path: HUB_PATH,
  kind: 'service',
  serviceGroup: 'language',
  lang: 'de',
  group: 'language-hub',
  eyebrow: 'Sprachen',
  title: 'Übersetzungsbüro für alle Sprachen',
  metaTitle: 'Übersetzungsbüro für alle Sprachen – 190+ Sprachen | Noon Übersetzungsbüro',
  description: 'Beglaubigte Übersetzungen und Dolmetscher in über 190 Sprachen – durch ermächtigte Übersetzer. Festpreis vorab, Express am selben Tag.',
  intro: 'Ob Arabisch, Türkisch, Englisch oder eine seltene Sprache: Wir übersetzen Ihre Dokumente in über 190 Sprachen beglaubigt ins Deutsche und aus dem Deutschen – durch ermächtigte Übersetzer, anerkannt von Behörden, Gerichten und Hochschulen.',
  highlights: ['190+ Sprachen', 'Ermächtigte Übersetzer', 'Express am selben Tag'],
  sections: [
    ['Häufig angefragte Sprachen', 'Für diese Sprachen erhalten wir besonders viele Anfragen:', hubLinks],
    ['Alle weiteren Sprachen', 'Ihre Sprache ist nicht dabei? Wir übersetzen und dolmetschen in über 190 Sprachen – für jede Sprache arbeiten wir mit ermächtigten Übersetzern. Senden Sie uns Ihr Dokument, und wir erstellen Ihnen ein kostenloses Angebot.'],
    ['Beglaubigte Übersetzungen in beide Richtungen', 'Wir übersetzen in die deutsche Sprache und aus der deutschen Sprache – zum Beispiel Urkunden für das Standesamt, Zeugnisse für die Anerkennung in Deutschland oder Unterlagen für eine Bewerbung im Ausland.'],
    DELIVERY,
    ['Dolmetscher für jede Sprache', 'Wir vermitteln Dolmetscher für Termine bei Behörden, beim Standesamt, beim Notar, vor Gericht, beim Arzt und für Geschäftstermine. Wenn ein Termin vor Ort nicht möglich ist, dolmetschen wir auch per Video oder Telefon.'],
    PROCESS,
    LOCATIONS_SECTION,
  ],
  faqs: [
    ['Übersetzen Sie wirklich alle Sprachen?', 'Wir übersetzen und dolmetschen in über 190 Sprachen. Nennen Sie uns einfach Ihre Sprache – wir erstellen Ihnen ein kostenloses Angebot.'],
    ['Werden die Übersetzungen von Behörden anerkannt?', 'Ja. Die Übersetzungen werden von ermächtigten Übersetzern angefertigt und beglaubigt und von Behörden, Gerichten, Standesämtern und Hochschulen anerkannt.'],
    FAQ_ORIGINAL,
    FAQ_QUOTE,
  ],
  serviceType: 'Übersetzungen und Dolmetschen in über 190 Sprachen',
  cta: CTA,
};

export const LANGUAGE_HUB_PATH = HUB_PATH;
export const LANGUAGE_PAGES = [LANGUAGE_HUB, ...LANGUAGE_PAGES_BASE];
