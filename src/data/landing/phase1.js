// SEO plan Nov 2026, phase 1: deeper content and internal links for the existing pages with
// the most Search Console impressions but positions 15–45 (export of 10.11.2026: certified
// translation, specialist translation, interpreting, documents, authorities, languages).
// Each entry adds sections (inserted before the page's closing section) and FAQs.
// Facts used are the ones already confirmed on the site: ermächtigte Übersetzer and beeidigte
// Dolmetscher, from 39 € per standard document, interpreters from 85 € per hour, specialist
// translation from 0.12 € per word, 2–3 working days, express the same day (about 4–5 hours).

const link = (href, label) => ({ href, label });
const doc = (slug, label) => link(`/de/${slug}/`, label);
const lang = (slug, label) => link(`/de/sprachen/${slug}/`, label);
const city = (slug, label) => link(`/de/standorte/${slug}/`, label);
const interp = (slug, label) => link(`/de/dolmetschen/${slug}/`, label);
const guide = (slug, label) => link(`/de/ratgeber/${slug}/`, label);

export const UPDATED_PHASE1 = '2026-11-10';

const ALL_DOCUMENTS = [
  doc('geburtsurkunde-uebersetzung', 'Geburtsurkunde'),
  doc('heiratsurkunde-uebersetzung', 'Heiratsurkunde'),
  doc('sterbeurkunde-uebersetzung', 'Sterbeurkunde'),
  doc('scheidungsurteil-uebersetzung', 'Scheidungsurteil'),
  doc('ledigkeitsbescheinigung-uebersetzung', 'Ledigkeitsbescheinigung'),
  doc('ehefaehigkeitszeugnis-uebersetzung', 'Ehefähigkeitszeugnis'),
  doc('fuehrerschein-uebersetzung', 'Führerschein'),
  doc('reisepass-uebersetzung', 'Reisepass und Personalausweis'),
  doc('meldebescheinigung-uebersetzung', 'Meldebescheinigung'),
  doc('fuehrungszeugnis-uebersetzung', 'Führungszeugnis'),
  doc('zeugnis-uebersetzung', 'Schulzeugnis und Abitur'),
  doc('diplom-uebersetzung', 'Diplom und Bachelor'),
  doc('arbeitszeugnis-uebersetzung', 'Arbeitszeugnis'),
  doc('vollmacht-uebersetzung', 'Vollmacht'),
  doc('vertrag-uebersetzung', 'Verträge'),
  doc('testament-uebersetzung', 'Testament und Erbschein'),
  doc('handelsregisterauszug-uebersetzung', 'Handelsregisterauszug'),
  doc('finanzdokumente-uebersetzung', 'Kontoauszug, Gehaltsabrechnung, Steuerbescheid'),
  doc('medizinische-dokumente-uebersetzung', 'Arztbrief, Befund, Impfpass'),
];

const PURPOSES = [
  doc('beglaubigte-uebersetzung-standesamt', 'Für das Standesamt'),
  doc('beglaubigte-uebersetzung-auslaenderbehoerde', 'Für die Ausländerbehörde'),
  guide('einbuergerung-dokumente', 'Für die Einbürgerung'),
  guide('familiennachzug-dokumente', 'Für den Familiennachzug'),
  guide('anerkennung-auslaendischer-abschluesse', 'Für die Anerkennung von Abschlüssen'),
  guide('fuehrerschein-umschreiben', 'Für die Führerscheinstelle'),
  link('/de/gerichtsdolmetscher/', 'Für Gericht und Anwalt'),
  doc('apostille', 'Apostille und Legalisation'),
];

const ALL_LANGUAGES = [
  lang('arabisch', 'Arabisch'), lang('tuerkisch', 'Türkisch'), lang('ukrainisch', 'Ukrainisch'), lang('russisch', 'Russisch'),
  lang('persisch', 'Persisch und Dari'), lang('polnisch', 'Polnisch'), lang('rumaenisch', 'Rumänisch'), lang('englisch', 'Englisch'),
  lang('franzoesisch', 'Französisch'), lang('spanisch', 'Spanisch'), lang('italienisch', 'Italienisch'), lang('griechisch', 'Griechisch'),
  lang('serbisch-kroatisch-bosnisch', 'Serbisch, Kroatisch, Bosnisch'), lang('albanisch', 'Albanisch'), lang('kurdisch', 'Kurdisch'),
  lang('bulgarisch', 'Bulgarisch'), lang('chinesisch', 'Chinesisch'), lang('vietnamesisch', 'Vietnamesisch'), lang('tigrinya', 'Tigrinya'),
  link('/de/sprachen/', 'Alle 190+ Sprachen'),
];

const OFFICES = [
  city('osnabrueck', 'Osnabrück'), city('berlin', 'Berlin'), city('stuttgart', 'Stuttgart'),
  city('bielefeld', 'Bielefeld'), city('mainz', 'Mainz'), city('kiel', 'Kiel'),
];

const BIG_CITIES = [
  city('hamburg', 'Hamburg'), city('muenchen', 'München'), city('koeln', 'Köln'), city('frankfurt-am-main', 'Frankfurt am Main'),
  city('duesseldorf', 'Düsseldorf'), city('dortmund', 'Dortmund'), city('nuernberg', 'Nürnberg'), city('bremen', 'Bremen'),
  city('hannover', 'Hannover'), city('leipzig', 'Leipzig'),
];

const INTERPRETING = [
  link('/de/gerichtsdolmetscher/', 'Gerichtsdolmetscher'),
  interp('beeidigte-dolmetscher', 'Beeidigte Dolmetscher'),
  interp('notardolmetscher', 'Dolmetscher beim Notar'),
  interp('standesamt-dolmetscher', 'Dolmetscher fürs Standesamt'),
  interp('dolmetscher-hochzeit', 'Dolmetscher für Hochzeit und Trauung'),
  interp('dolmetscher-behoerde', 'Dolmetscher für Behörden und Jobcenter'),
  interp('dolmetscher-arzt', 'Dolmetscher für Arzt und Klinik'),
  interp('dolmetscher-schule', 'Dolmetscher für Schule und Kita'),
  interp('simultandolmetscher', 'Simultan- und Konferenzdolmetscher'),
];

const SPECIALIST = [
  link('/de/fachuebersetzungen/recht/', 'Recht und Verträge'),
  link('/de/fachuebersetzungen/medizinische-dentalmedizin/', 'Medizin und Dentalmedizin'),
  link('/de/fachuebersetzungen/wirtschaft-finanzen/', 'Wirtschaft und Finanzen'),
  link('/de/fachuebersetzungen/ingenieurwesen/', 'Technik und Ingenieurwesen'),
  link('/de/fachuebersetzungen/it-software/', 'IT und Software'),
  link('/de/fachuebersetzungen/pharmazeutik/', 'Pharmazeutik'),
  link('/de/fachuebersetzungen/chemie-biowissenschaften/', 'Chemie und Biowissenschaften'),
  link('/de/fachuebersetzungen/literatur/', 'Literatur und Bücher'),
];

const PRICE_LINK = link('/de/beglaubigte-uebersetzung-kosten/', 'Was kostet eine beglaubigte Übersetzung?');
const QUOTE_LINK = link('/angebot/', 'Kostenloses Angebot anfordern');

const CHECKLIST_TEXT = (what) => `• Ein gut lesbares Foto oder einen Scan ${what} – alle Seiten, auch Rückseiten mit Stempeln oder Vermerken\n• Falls vorhanden: die Apostille oder Legalisation\n• Die Schreibweise der Namen, wie sie in Ihrem Reisepass steht\n• Für welche Stelle die Übersetzung ist und bis wann Sie sie brauchen\n\nDas Original brauchen wir nur, wenn die empfangende Stelle es ausdrücklich verlangt.`;

export const PHASE1 = {
  '/de/beglaubigte-uebersetzungen': {
    sections: [
      ['Amtlich beglaubigt, vereidigt, ermächtigt – dieselbe Leistung', 'Im Alltag hat die beglaubigte Übersetzung viele Namen: amtlich beglaubigte Übersetzung, Übersetzung von einem vereidigten, beeidigten oder ermächtigten Übersetzer. Gemeint ist immer dasselbe – eine Übersetzung von einem Übersetzer, den die Justiz eines Bundeslandes für seine Sprache zugelassen hat. Welcher Begriff verwendet wird, hängt nur vom Bundesland ab. Die Übersetzung gilt bundesweit, egal in welchem Bundesland der Übersetzer zugelassen ist.\n\nAm Ende der Übersetzung steht der Bestätigungsvermerk: Der Übersetzer bestätigt, dass die Übersetzung vollständig und richtig ist, mit Ort, Datum, Unterschrift und Stempel. Stempel, Siegel, Randvermerke und Unterschriften des Originals werden mit übersetzt oder beschrieben.',
        [link('/de/notar-oder-beglaubigte-uebersetzung/', 'Notar oder beglaubigte Übersetzung?'), doc('apostille', 'Apostille und Legalisation')]],
      ['Alle Dokumente, die wir beglaubigt übersetzen', 'Für die häufigsten Dokumente haben wir eigene Seiten mit Anforderungen, Preisen und typischen Fragen:', ALL_DOCUMENTS],
      ['Für welche Stelle brauchen Sie die Übersetzung?', 'Welche Unterlagen übersetzt werden müssen, legt die jeweilige Stelle fest. Diese Seiten erklären, was Standesamt, Ausländerbehörde, Einbürgerungsbehörde, Anerkennungsstellen und Führerscheinstelle üblicherweise verlangen:', PURPOSES],
      ['Beglaubigte Übersetzung online – oder in Ihrer Nähe', 'Für die meisten Aufträge müssen Sie nirgendwo hinfahren: Sie senden ein Foto oder einen Scan, erhalten den Festpreis und bekommen die beglaubigte Übersetzung als PDF und auf Wunsch per Post. Das funktioniert in ganz Deutschland. Persönliche Termine bieten wir nach Vereinbarung in unseren Büros an; für viele weitere Städte gibt es eigene Seiten.',
        [...OFFICES, ...BIG_CITIES]],
      ['Beglaubigte Übersetzungen in über 190 Sprachen', 'Besonders oft übersetzen wir aus diesen Sprachen ins Deutsche – und aus dem Deutschen in diese Sprachen:', ALL_LANGUAGES],
    ],
    faqs: [
      ['Was bedeutet „beglaubigte Übersetzung“?', 'Eine Übersetzung, deren Vollständigkeit und Richtigkeit ein von der Justiz zugelassener Übersetzer mit Bestätigungsvermerk, Unterschrift und Stempel bestätigt. Deutsche Behörden, Gerichte, Standesämter und Hochschulen erkennen sie als offizielle Übersetzung an.'],
      ['Ist eine amtlich beglaubigte Übersetzung etwas anderes?', 'Nein. „Amtlich beglaubigt“, „beglaubigt“ und „von einem vereidigten Übersetzer“ meinen in der Praxis dieselbe Leistung.'],
      ['Kann ich eine beglaubigte Übersetzung online bestellen?', 'Ja. Sie senden das Dokument per WhatsApp, E-Mail oder Formular, erhalten den Festpreis vorab und bekommen die Übersetzung als PDF und auf Wunsch per Post – bundesweit.'],
      ['Gilt eine Übersetzung aus einem anderen Bundesland?', 'Ja. Beglaubigte Übersetzungen ermächtigter Übersetzer werden bundesweit anerkannt, unabhängig davon, in welchem Bundesland der Übersetzer zugelassen ist.'],
    ],
  },

  '/de/fachuebersetzungen': {
    sections: [
      ['Alle Fachgebiete im Detail', 'Für jedes Fachgebiet erklären wir auf einer eigenen Seite, welche Unterlagen wir übersetzen und worauf es dabei ankommt:', SPECIALIST],
      ['Fachübersetzer statt Generalisten', 'Ein Arztbericht, ein Gesellschaftsvertrag und eine Betriebsanleitung verlangen jeweils anderes Fachwissen. Deshalb geben wir Fachtexte an Übersetzer, die im jeweiligen Gebiet arbeiten. Fachbegriffe werden im ganzen Dokument einheitlich übersetzt; bei wiederkehrenden Aufträgen nutzen wir Ihre Terminologie, damit Begriffe über alle Dokumente hinweg gleich bleiben. Die Übersetzung erhalten Sie im Format Ihrer Vorlage, zum Beispiel als Word-, Excel-, PowerPoint- oder PDF-Datei.'],
      ['Fachübersetzung mit Beglaubigung', 'Verträge, Urteile, Arztberichte oder Handelsregisterauszüge werden oft bei Behörden, Gerichten oder Anerkennungsstellen vorgelegt. Dann fertigen unsere ermächtigten Übersetzer die Fachübersetzung zusätzlich als beglaubigte Übersetzung an – fachlich präzise und amtlich anerkannt in einem Schritt.',
        [link('/de/beglaubigte-uebersetzungen/', 'Beglaubigte Übersetzungen'), doc('vertrag-uebersetzung', 'Verträge übersetzen'), doc('handelsregisterauszug-uebersetzung', 'Handelsregisterauszug übersetzen')]],
      ['Fachübersetzungen in Ihrer Stadt', 'Fachübersetzungen laufen bei uns bundesweit digital. Für Unternehmen in Berlin und Stuttgart haben wir eigene Seiten mit lokalen Beispielen:',
        [link('/de/standorte/berlin/fachuebersetzungen/', 'Fachübersetzungen Berlin'), link('/de/standorte/stuttgart/fachuebersetzungen/', 'Fachübersetzungen Stuttgart'), ...OFFICES.slice(0, 1), ...BIG_CITIES.slice(0, 4)]],
    ],
    faqs: [
      ['Was ist der Unterschied zwischen Fachübersetzung und normaler Übersetzung?', 'Eine Fachübersetzung verlangt Kenntnisse im jeweiligen Fachgebiet und die korrekte Fachterminologie. Allgemeine Texte können auch ohne Spezialwissen übersetzt werden; bei Verträgen, Medizin oder Technik führt das schnell zu Fehlern.'],
      ['Übersetzen Sie auch umfangreiche Dokumentationen?', 'Ja. Den Festpreis und die Lieferzeit nennen wir nach Sichtung der Unterlagen; bei großem Umfang planen wir die Lieferung gemeinsam mit Ihnen.'],
      ['In welche Sprachen übersetzen Sie Fachtexte?', 'In alle gängigen Sprachen – ins Deutsche und aus dem Deutschen. Besonders häufig Englisch, Arabisch, Türkisch, Französisch, Russisch und Ukrainisch.'],
    ],
  },

  '/de/dolmetschen': {
    sections: [
      ['Dolmetscher für jeden Anlass', 'Für die häufigsten Termine haben wir eigene Seiten mit Ablauf, Vorbereitung und typischen Fragen:', INTERPRETING],
      ['Konsekutiv, simultan oder Flüsterdolmetschen?', '• Konsekutivdolmetschen: Der Dolmetscher überträgt abschnittsweise, nachdem gesprochen wurde – typisch bei Behörden, Notar, Standesamt, Arzt und vor Gericht.\n• Simultandolmetschen: Die Übertragung läuft zeitgleich, meist aus einer Kabine mit Kopfhörern – für Konferenzen und Veranstaltungen.\n• Flüsterdolmetschen: Der Dolmetscher sitzt neben ein bis zwei Personen und übersetzt leise und zeitgleich – etwa bei Besprechungen oder Gerichtsverhandlungen.\n\nWelche Form passt, besprechen wir vor dem Termin mit Ihnen.'],
      ['Gut vorbereitet zum Termin', 'Je besser der Dolmetscher vorbereitet ist, desto reibungsloser läuft der Termin. Senden Sie uns vorab, was vorliegt: Einladung oder Aktenzeichen, Vertragsentwurf beim Notar, Namen der Beteiligten und besondere Fachbegriffe. Müssen ausländische Dokumente beim Termin vorgelegt werden, übersetzen wir sie vorher beglaubigt.',
        [link('/de/beglaubigte-uebersetzungen/', 'Beglaubigte Übersetzungen')]],
      ['Dolmetscher in Ihrer Stadt', 'Dolmetscher organisieren wir bundesweit – vor Ort, per Video oder Telefon. Für einige Städte gibt es eigene Seiten:',
        [link('/de/standorte/berlin/dolmetscher/', 'Dolmetscher Berlin'), link('/de/standorte/stuttgart/dolmetscher/', 'Dolmetscher Stuttgart'), ...OFFICES.filter((item) => !/berlin|stuttgart/.test(item.href)), ...BIG_CITIES.slice(0, 6)]],
    ],
    faqs: [
      ['Was ist der Unterschied zwischen Dolmetscher und Übersetzer?', 'Ein Dolmetscher überträgt gesprochene Sprache – im Gespräch, beim Termin oder auf einer Konferenz. Ein Übersetzer überträgt geschriebene Texte, zum Beispiel Urkunden oder Verträge.'],
      ['Kann ich einen Dolmetscher auch für einen kurzen Termin buchen?', 'Ja. Dolmetscheinsätze beginnen ab 85 € pro Stunde; den Festpreis nennen wir vorab. Kurze Gespräche lassen sich oft günstiger per Telefon oder Video dolmetschen.'],
    ],
  },

  '/de/geburtsurkunde-uebersetzung': {
    sections: [
      ['Checkliste: Das brauchen wir von Ihnen', CHECKLIST_TEXT('der Geburtsurkunde oder des Registerauszugs'), [PRICE_LINK, QUOTE_LINK]],
      ['Geburtsurkunden aus vielen Ländern', 'Geburtsurkunden sehen je nach Land sehr unterschiedlich aus: als Urkunde, als Auszug aus dem Personen- oder Familienregister, als Formular in mehreren Sprachen oder als ausgedruckter Online-Auszug. Wir übersetzen alle Formen vollständig – mit Stempeln, Vermerken und gegebenenfalls der Apostille. Besonders häufig kommen bei uns Urkunden aus Syrien, dem Irak, Afghanistan, der Türkei, der Ukraine, dem Iran, Rumänien und Polen an.',
        [link('/de/ratgeber/arabische-geburtsurkunde-uebersetzen/', 'Arabische Geburtsurkunde übersetzen'), lang('tuerkisch', 'Türkisch'), lang('ukrainisch', 'Ukrainisch'), lang('persisch', 'Persisch und Dari')]],
      ['Oft zusammen gebraucht', 'Für Eheschließung, Familiennachzug oder Einbürgerung wird die Geburtsurkunde meist zusammen mit weiteren Dokumenten verlangt. Gemeinsam angefragt ist das in der Regel günstiger:', [doc('heiratsurkunde-uebersetzung', 'Heiratsurkunde'), doc('ledigkeitsbescheinigung-uebersetzung', 'Ledigkeitsbescheinigung'), doc('reisepass-uebersetzung', 'Reisepass'), ...PURPOSES.slice(0, 4)]],
    ],
    faqs: [
      ['Muss die Geburtsurkunde eine Apostille haben?', 'Das hängt vom Ausstellungsland und von der Stelle ab, die die Urkunde verlangt. Hat die Urkunde eine Apostille oder Legalisation, übersetzen wir sie mit.'],
      ['Übersetzen Sie auch Auszüge aus dem Personenstandsregister?', 'Ja, zum Beispiel Familien- und Personenregisterauszüge – vollständig und beglaubigt.'],
    ],
  },

  '/de/heiratsurkunde-uebersetzung': {
    sections: [
      ['Checkliste: Das brauchen wir von Ihnen', CHECKLIST_TEXT('der Heiratsurkunde oder des Heiratsregisterauszugs'), [PRICE_LINK, QUOTE_LINK]],
      ['Wofür die Heiratsurkunde übersetzt wird', '• Familiennachzug und Aufenthaltstitel bei der Ausländerbehörde\n• Nachbeurkundung einer im Ausland geschlossenen Ehe beim Standesamt\n• Namensänderung nach der Heirat\n• Einbürgerung, Elterngeld, Kindergeld und Steuerklasse\n• Scheidungsverfahren vor einem deutschen Gericht',
        [...PURPOSES.slice(0, 4), doc('scheidungsurteil-uebersetzung', 'Scheidungsurteil')]],
      ['Oft zusammen gebraucht', 'Zur Heiratsurkunde werden häufig die Geburtsurkunden beider Partner und ein Ledigkeits- oder Ehefähigkeitsnachweis verlangt:', [doc('geburtsurkunde-uebersetzung', 'Geburtsurkunde'), doc('ledigkeitsbescheinigung-uebersetzung', 'Ledigkeitsbescheinigung'), doc('ehefaehigkeitszeugnis-uebersetzung', 'Ehefähigkeitszeugnis'), guide('heiraten-in-deutschland-als-auslaender', 'Heiraten in Deutschland als Ausländer')]],
    ],
    faqs: [
      ['Übersetzen Sie auch religiöse Eheverträge?', 'Ja. Ob eine religiöse Eheschließung in Deutschland anerkannt wird, entscheidet die Behörde; wir übersetzen das Dokument vollständig und beglaubigt.'],
      ['Wie werden die Namen geschrieben?', 'So, wie sie in Ihren Reisepässen stehen. Damit ordnen Standesamt und Ausländerbehörde die Unterlagen eindeutig zu.'],
    ],
  },

  '/de/zeugnis-uebersetzung': {
    sections: [
      ['Checkliste: Das brauchen wir von Ihnen', CHECKLIST_TEXT('des Zeugnisses mit allen Notenseiten'), [PRICE_LINK, QUOTE_LINK]],
      ['Abitur, Transcript, Notenspiegel', 'Wir übersetzen Schulabschlusszeugnisse und Abiturzeugnisse, Hochschulzeugnisse, Transcripts of Records, Fächer- und Stundenübersichten sowie Ausbildungszeugnisse. Noten und Notensysteme übertragen wir so, wie sie im Original stehen; eine Umrechnung in deutsche Noten nehmen Hochschule oder Anerkennungsstelle selbst vor.',
        [doc('diplom-uebersetzung', 'Diplom und Bachelor'), doc('arbeitszeugnis-uebersetzung', 'Arbeitszeugnis')]],
      ['Für Bewerbung, Studium und Anerkennung', 'Hochschulen, Bewerbungsportale, Arbeitgeber und Anerkennungsstellen verlangen Zeugnisse meist als beglaubigte Übersetzung. Für die Anerkennung von Berufsabschlüssen sind häufig zusätzlich Fächerübersichten und Nachweise über Berufserfahrung nötig.',
        [guide('anerkennung-auslaendischer-abschluesse', 'Anerkennung ausländischer Abschlüsse'), lang('englisch', 'Englisch'), lang('arabisch', 'Arabisch')]],
    ],
    faqs: [
      ['Übersetzen Sie Zeugnisse auch ins Englische?', 'Ja, deutsche Zeugnisse übersetzen wir beglaubigt ins Englische und in andere Sprachen – etwa für Bewerbungen und Studium im Ausland.'],
      ['Rechnen Sie die Noten um?', 'Nein. Die Noten werden so übersetzt, wie sie im Zeugnis stehen. Die Umrechnung übernimmt die Stelle, bei der Sie das Zeugnis einreichen.'],
    ],
  },

  '/de/fuehrerschein-uebersetzung': {
    sections: [
      ['Checkliste: Das brauchen wir von Ihnen', CHECKLIST_TEXT('der Vorder- und Rückseite des Führerscheins'), [PRICE_LINK, QUOTE_LINK]],
      ['Umschreiben, fahren, vorlegen', 'Die beglaubigte Übersetzung des ausländischen Führerscheins wird vor allem für die Umschreibung bei der Fahrerlaubnisbehörde gebraucht, manchmal auch für Polizei, Arbeitgeber oder Versicherung. Welche Übersetzungen die Behörde annimmt und welche Fristen gelten, regelt sie selbst – fragen Sie im Zweifel vorher nach. Unsere Übersetzungen stammen von ermächtigten Übersetzern.',
        [guide('fuehrerschein-umschreiben', 'Ausländischen Führerschein umschreiben'), doc('reisepass-uebersetzung', 'Reisepass')]],
      ['Deutschen Führerschein für das Ausland übersetzen', 'Auch den deutschen Führerschein übersetzen wir beglaubigt – zum Beispiel für Behörden, Arbeitgeber oder Mietwagenfirmen im Ausland. Ob dort zusätzlich ein internationaler Führerschein oder eine Apostille verlangt wird, erfahren Sie bei der Stelle im Zielland.',
        [doc('apostille', 'Apostille und Legalisation')]],
    ],
    faqs: [
      ['Wird die Übersetzung von der Führerscheinstelle akzeptiert?', 'Fahrerlaubnisbehörden verlangen in der Regel die Übersetzung eines ermächtigten Übersetzers. Manche Behörden nennen alternativ weitere Stellen – fragen Sie im Zweifel vorher nach.'],
      ['Muss die Rückseite mit übersetzt werden?', 'Ja, wenn dort Klassen, Daten oder Vermerke stehen. Wir übersetzen den Führerschein vollständig.'],
    ],
  },

  '/de/beglaubigte-uebersetzung-standesamt': {
    sections: [
      ['Typische Unterlagen für das Standesamt', '• Anmeldung der Eheschließung: Geburtsurkunden, Ledigkeitsbescheinigung oder Ehefähigkeitszeugnis, gegebenenfalls Scheidungsurteil oder Sterbeurkunde des früheren Ehepartners\n• Geburt eines Kindes: Heiratsurkunde und Geburtsurkunden der Eltern\n• Nachbeurkundung einer Auslandsehe oder Auslandsgeburt\n• Namenserklärungen und Namensänderungen\n\nWelche Dokumente Ihr Standesamt genau verlangt, teilt es Ihnen mit – senden Sie uns gern die Liste.',
        [doc('geburtsurkunde-uebersetzung', 'Geburtsurkunde'), doc('ledigkeitsbescheinigung-uebersetzung', 'Ledigkeitsbescheinigung'), doc('ehefaehigkeitszeugnis-uebersetzung', 'Ehefähigkeitszeugnis'), doc('scheidungsurteil-uebersetzung', 'Scheidungsurteil'), doc('sterbeurkunde-uebersetzung', 'Sterbeurkunde')]],
      ['Dolmetscher für Anmeldung und Trauung', 'Spricht ein Partner nicht ausreichend Deutsch, verlangt das Standesamt für die Anmeldung der Eheschließung und die Trauung meist einen Dolmetscher. Wir stellen Dolmetscher für alle Sprachen – auf Wunsch beeidigt.',
        [interp('standesamt-dolmetscher', 'Dolmetscher fürs Standesamt'), interp('dolmetscher-hochzeit', 'Dolmetscher für die Trauung')]],
    ],
    faqs: [
      ['Akzeptiert das Standesamt Übersetzungen von Kopien?', 'Viele Standesämter möchten die Originalurkunde sehen; die Übersetzung kann trotzdem von einer Kopie angefertigt werden. Der Bestätigungsvermerk nennt, ob vom Original oder von einer Kopie übersetzt wurde.'],
    ],
  },

  '/de/beglaubigte-uebersetzung-auslaenderbehoerde': {
    sections: [
      ['Typische Unterlagen für die Ausländerbehörde', '• Aufenthaltstitel und Verlängerung: Reisepass, Heirats- und Geburtsurkunden, Arbeitsvertrag, Nachweise über Einkommen\n• Familiennachzug: Heiratsurkunde, Geburtsurkunden der Kinder, Sorgerechtsnachweise\n• Einbürgerung: Geburtsurkunde, Heiratsurkunde, Schul- und Berufsabschlüsse, gegebenenfalls Namensnachweise\n• Blaue Karte und Fachkräfte: Diplome, Arbeitszeugnisse, Arbeitsvertrag\n\nWelche Unterlagen übersetzt werden müssen, legt Ihre Ausländerbehörde fest.',
        [guide('familiennachzug-dokumente', 'Familiennachzug: Dokumente'), guide('einbuergerung-dokumente', 'Einbürgerung: Dokumente'), doc('diplom-uebersetzung', 'Diplom'), doc('arbeitszeugnis-uebersetzung', 'Arbeitszeugnis')]],
      ['Dolmetscher für den Termin', 'Für Gespräche bei der Ausländerbehörde oder dem Jobcenter stellen wir Dolmetscher – vor Ort, per Video oder Telefon.',
        [interp('dolmetscher-behoerde', 'Dolmetscher für Behördengänge')]],
    ],
    faqs: [
      ['Werden Ihre Übersetzungen von jeder Ausländerbehörde anerkannt?', 'Ja. Beglaubigte Übersetzungen ermächtigter Übersetzer werden von Ausländerbehörden bundesweit anerkannt.'],
    ],
  },

  '/de/dolmetschen/notardolmetscher': {
    sections: [
      ['Wann der Notar einen Dolmetscher verlangt', 'Spricht ein Beteiligter nicht ausreichend Deutsch, muss ihm der Inhalt der Urkunde übersetzt werden (§ 16 Beurkundungsgesetz). Der Notar hält das in der Urkunde fest und zieht dafür in der Regel einen allgemein beeidigten Dolmetscher hinzu. Auf Verlangen wird zusätzlich eine schriftliche Übersetzung der Urkunde angefertigt.'],
      ['Typische Notartermine', '• Kauf oder Verkauf einer Immobilie\n• Vollmachten und Vorsorgevollmachten\n• Testamente und Erbverträge\n• GmbH-Gründung, Gesellschafterbeschlüsse und Handelsregisteranmeldungen\n• Eheverträge und Scheidungsfolgenvereinbarungen',
        [doc('vollmacht-uebersetzung', 'Vollmacht übersetzen'), doc('testament-uebersetzung', 'Testament übersetzen'), doc('vertrag-uebersetzung', 'Verträge übersetzen')]],
      ['So bereiten wir den Termin vor', 'Senden Sie uns möglichst früh den Urkundsentwurf des Notariats. Der Dolmetscher liest sich ein, klärt Fachbegriffe und Namen und kann den Text beim Termin sicher übertragen. Braucht der Notar ausländische Dokumente, übersetzen wir sie vorher beglaubigt.',
        [interp('beeidigte-dolmetscher', 'Beeidigte Dolmetscher'), link('/de/standorte/berlin/dolmetscher-notar/', 'Dolmetscher Notar Berlin')]],
    ],
    faqs: [
      ['Muss der Dolmetscher beim Notar beeidigt sein?', 'In der Regel ja. Auf die Vereidigung kann nur verzichtet werden, wenn alle Beteiligten zustimmen (§ 16 BeurkG).'],
      ['Bekomme ich eine schriftliche Übersetzung der Urkunde?', 'Auf Verlangen ja – sie wird der Urkunde beigefügt. Sprechen Sie das am besten schon bei der Terminvereinbarung mit dem Notariat ab.'],
    ],
  },

  '/de/beglaubigte-uebersetzung-kosten': {
    sections: [
      ['Weitere Preise im Überblick', '• Beglaubigte Übersetzung von Standarddokumenten: ab 39 € pro Dokument\n• Fachübersetzung: ab 0,12 € pro Wort\n• Dolmetscher: ab 85 € pro Stunde\n• Lieferung: Standard in 2–3 Werktagen, Express am selben Tag\n\nDen verbindlichen Festpreis nennen wir Ihnen immer vorab und kostenlos.',
        [link('/de/fachuebersetzungen/', 'Fachübersetzungen'), link('/de/dolmetschen/', 'Dolmetscher'), link('/de/express-uebersetzung/', 'Express-Übersetzung')]],
      ['Wer bezahlt die Übersetzung?', 'In der Regel trägt die Person die Kosten, die das Dokument einreichen muss. In manchen Fällen gibt es Unterstützung: Für die Anerkennung ausländischer Berufsabschlüsse kann zum Beispiel der Anerkennungszuschuss des Bundes Kosten für Übersetzungen übernehmen, und Jobcenter oder Arbeitsagentur übernehmen im Einzelfall Kosten, wenn die Übersetzung für eine Bewerbung oder Arbeitsaufnahme nötig ist. Klären Sie das bitte vor dem Auftrag mit der zuständigen Stelle – wir stellen Ihnen gern ein Angebot zur Vorlage aus.',
        [guide('anerkennung-auslaendischer-abschluesse', 'Anerkennung ausländischer Abschlüsse'), QUOTE_LINK]],
    ],
    faqs: [
      ['Gibt es eine beglaubigte Übersetzung kostenlos?', 'Eine kostenlose beglaubigte Übersetzung gibt es nicht. Manche Stellen übernehmen aber im Einzelfall die Kosten – fragen Sie vorher bei Jobcenter, Arbeitsagentur oder Anerkennungsberatung nach.'],
      ['Stellen Sie ein Angebot für das Jobcenter aus?', 'Ja. Sie erhalten von uns ein schriftliches Festpreisangebot, das Sie zur Kostenübernahme vorlegen können.'],
    ],
  },

  '/de/apostille': {
    sections: [
      ['Apostille oder Legalisation – das entscheidet das Ausstellungsland', 'Stammt ein Dokument aus einem Staat, der dem Haager Apostilleübereinkommen beigetreten ist, bestätigt eine Apostille seine Echtheit. Bei Dokumenten aus anderen Staaten ist meist eine Legalisation durch die zuständige Auslandsvertretung nötig. Für viele Urkunden aus EU-Staaten entfällt beides. Ob Ihre Stelle eine Apostille oder Legalisation verlangt, erfahren Sie dort.'],
      ['Erst die Apostille, dann die Übersetzung', 'Die Apostille wird auf dem Originaldokument angebracht. Lassen Sie das Dokument deshalb zuerst mit Apostille versehen und dann übersetzen – so übersetzen wir die Apostille in einem Schritt mit. Wird umgekehrt eine deutsche Übersetzung im Ausland gebraucht, kann es nötig sein, die Übersetzung selbst mit einer Apostille zu versehen; das klären wir gern mit Ihnen.',
        [link('/de/beglaubigte-uebersetzungen/', 'Beglaubigte Übersetzungen'), link('/de/notar-oder-beglaubigte-uebersetzung/', 'Notar oder beglaubigte Übersetzung?')]],
    ],
    faqs: [
      ['Muss die Apostille mit übersetzt werden?', 'Ja, wenn das Dokument eine Apostille trägt, übersetzen wir sie mit – sie gehört zum Dokument.'],
    ],
  },

  '/de/sprachen/arabisch': {
    sections: [
      ['Arabisch-Deutsch beglaubigte Übersetzung: häufige Dokumente', 'Besonders oft übersetzen wir Geburts- und Heiratsurkunden, Familienregisterauszüge, Scheidungsurteile, Schul- und Hochschulzeugnisse, Führerscheine und Gerichtsurteile – aus Syrien, dem Irak, Ägypten, dem Libanon, Jordanien, Marokko, Algerien, Tunesien, Libyen, dem Sudan und den Golfstaaten. Namen übertragen wir so, wie sie im Reisepass stehen, damit alle Unterlagen einheitlich sind.',
        [link('/de/ratgeber/arabische-geburtsurkunde-uebersetzen/', 'Arabische Geburtsurkunde übersetzen'), doc('geburtsurkunde-uebersetzung', 'Geburtsurkunde'), doc('heiratsurkunde-uebersetzung', 'Heiratsurkunde'), doc('zeugnis-uebersetzung', 'Zeugnis')]],
      ['Arabisch-Dolmetscher – auch für Dialekte', 'Unsere Dolmetscher arbeiten auch mit syrischem, irakischem, ägyptischem, sudanesischem, libyschem, marokkanischem und algerischem Arabisch. Nennen Sie uns bei der Buchung die Herkunft der Gesprächspartner, damit wir den passenden Dolmetscher einsetzen.',
        [link('/de/standorte/berlin/arabisch/', 'Arabisch Übersetzer Berlin'), link('/de/standorte/stuttgart/arabisch/', 'Arabisch Übersetzer Stuttgart'), link('/de/dolmetschen/', 'Dolmetscher buchen')]],
    ],
    faqs: [
      ['Übersetzen Sie auch vom Deutschen ins Arabische?', 'Ja, beglaubigt und als Fachübersetzung – zum Beispiel deutsche Urkunden, Zeugnisse oder Verträge für Behörden in arabischsprachigen Ländern.'],
    ],
  },

  '/de/sprachen/tuerkisch': {
    sections: [
      ['Türkisch-Deutsch beglaubigte Übersetzung: häufige Dokumente', 'Besonders oft übersetzen wir Personenstandsregisterauszüge (Nüfus kayıt örneği), Heiratsurkunden und Familienbücher, Scheidungsurteile, Führerscheine, Zeugnisse und Diplome sowie Vollmachten für Immobilien- und Erbschaftsangelegenheiten in der Türkei. Auch über e-Devlet ausgestellte Dokumente übersetzen wir vollständig.',
        [doc('geburtsurkunde-uebersetzung', 'Geburtsurkunde'), doc('scheidungsurteil-uebersetzung', 'Scheidungsurteil'), doc('vollmacht-uebersetzung', 'Vollmacht'), doc('fuehrerschein-uebersetzung', 'Führerschein')]],
      ['Türkisch-Dolmetscher für Notar, Gericht und Behörden', 'Für Notartermine, Gerichtsverhandlungen, Standesamt und Behördengespräche stellen wir Türkisch-Dolmetscher – auf Wunsch beeidigt.',
        [link('/de/standorte/berlin/tuerkisch/', 'Türkisch Übersetzer Berlin'), link('/de/standorte/stuttgart/tuerkisch/', 'Türkisch Übersetzer Stuttgart'), interp('notardolmetscher', 'Dolmetscher beim Notar')]],
    ],
    faqs: [
      ['Übersetzen Sie deutsche Dokumente ins Türkische?', 'Ja, zum Beispiel Urkunden, Vollmachten und Urteile für türkische Behörden, Notare und Gerichte – beglaubigt.'],
    ],
  },

  '/de/sprachen/englisch': {
    sections: [
      ['Englisch-Deutsch beglaubigte Übersetzung: häufige Dokumente', 'Wir übersetzen Urkunden aus dem Vereinigten Königreich, den USA, Kanada, Australien, Indien, Nigeria, Ghana und vielen weiteren Ländern – Birth und Marriage Certificates, Diplomas und Transcripts, Arbeitszeugnisse, Führerscheine und Gerichtsdokumente.',
        [doc('geburtsurkunde-uebersetzung', 'Geburtsurkunde'), doc('diplom-uebersetzung', 'Diplom'), doc('zeugnis-uebersetzung', 'Zeugnis')]],
      ['Deutsche Dokumente beglaubigt ins Englische', 'Für Bewerbungen, Studium, Visa und Auswanderung übersetzen wir deutsche Zeugnisse, Urkunden, Führungszeugnisse, Meldebescheinigungen und Arbeitszeugnisse beglaubigt ins Englische. Ob das Zielland zusätzlich eine Apostille verlangt, klären Sie am besten vorab mit der Stelle dort.',
        [doc('fuehrungszeugnis-uebersetzung', 'Führungszeugnis'), doc('meldebescheinigung-uebersetzung', 'Meldebescheinigung'), doc('apostille', 'Apostille'), link('/de/standorte/stuttgart/englisch/', 'Englisch Übersetzer Stuttgart')]],
    ],
    faqs: [
      ['Wird eine deutsche beglaubigte Übersetzung im Ausland anerkannt?', 'Das entscheidet die Stelle im Zielland. Viele akzeptieren sie direkt, manche verlangen zusätzlich eine Apostille oder eine Übersetzung im eigenen Land.'],
    ],
  },

  '/de/sprachen/franzoesisch': {
    sections: [
      ['Französisch-Deutsch beglaubigte Übersetzung: häufige Dokumente', 'Wir übersetzen Urkunden aus Frankreich, Belgien, der Schweiz, Marokko, Algerien, Tunesien, Kamerun, dem Senegal, der Côte d’Ivoire und der DR Kongo – Actes de naissance und de mariage, Livrets de famille, Jugements, Zeugnisse und Diplome.',
        [doc('geburtsurkunde-uebersetzung', 'Geburtsurkunde'), doc('heiratsurkunde-uebersetzung', 'Heiratsurkunde'), doc('diplom-uebersetzung', 'Diplom')]],
      ['Französisch für Unternehmen', 'Für Unternehmen übersetzen wir Verträge, Ausschreibungsunterlagen, Handelsregisterauszüge und technische Dokumentationen ins Französische und aus dem Französischen.',
        [link('/de/standorte/stuttgart/franzoesisch/', 'Französisch Übersetzer Stuttgart'), link('/de/fachuebersetzungen/', 'Fachübersetzungen')]],
    ],
    faqs: [
      ['Übersetzen Sie Urkunden aus Nordafrika, die zweisprachig Arabisch und Französisch sind?', 'Ja. Wir übersetzen das ganze Dokument, auch wenn es in beiden Sprachen ausgefüllt ist.'],
    ],
  },

  '/de/sprachen/polnisch': {
    sections: [
      ['Polnisch-Deutsch beglaubigte Übersetzung: häufige Dokumente', 'Besonders oft übersetzen wir Geburts- und Heiratsurkunden (odpis aktu), Zeugnisse und Diplome, Arbeitsbescheinigungen, Führerscheine und Unterlagen für die Familienkasse.',
        [doc('geburtsurkunde-uebersetzung', 'Geburtsurkunde'), doc('arbeitszeugnis-uebersetzung', 'Arbeitszeugnis'), link('/de/standorte/kiel/polnisch/', 'Polnisch Übersetzer Kiel')]],
      ['Mehrsprachige EU-Formulare', 'Für viele öffentliche Urkunden aus EU-Staaten gibt es mehrsprachige Formulare, die eine Übersetzung ersparen können. Fragen Sie bei der ausstellenden Stelle in Polen danach, wenn die deutsche Behörde das akzeptiert. Wird trotzdem eine Übersetzung verlangt, übernehmen wir sie.'],
    ],
    faqs: [
      ['Übersetzen Sie Unterlagen für das Kindergeld?', 'Ja, Bescheinigungen und Urkunden für die Familienkasse – beglaubigt und mit einheitlicher Namensschreibweise.'],
    ],
  },

  '/de/sprachen/russisch': {
    sections: [
      ['Russisch-Deutsch beglaubigte Übersetzung: häufige Dokumente', 'Wir übersetzen Urkunden aus Russland, Kasachstan, Belarus, Usbekistan, Kirgisistan, Moldau und den baltischen Staaten – Geburts- und Heiratsurkunden, Scheidungsurkunden, Diplome mit Anlage, Arbeitsbücher und Gerichtsdokumente, etwa für Spätaussiedler, Anerkennung und Standesamt.',
        [doc('diplom-uebersetzung', 'Diplom'), doc('heiratsurkunde-uebersetzung', 'Heiratsurkunde'), link('/de/standorte/berlin/russisch/', 'Russisch Übersetzer Berlin'), link('/de/standorte/stuttgart/russisch/', 'Russisch Übersetzer Stuttgart')]],
      ['Namen in lateinischer Schrift', 'Bei Namen aus dem Kyrillischen gibt es oft mehrere mögliche Schreibweisen. Wir übernehmen die Schreibweise aus Ihrem Reisepass – so passen alle Unterlagen zusammen.',
        [doc('reisepass-uebersetzung', 'Reisepass übersetzen')]],
    ],
    faqs: [
      ['Übersetzen Sie auch ukrainische Dokumente, die auf Russisch ausgestellt sind?', 'Ja. Viele ältere Urkunden aus der Ukraine sind auf Russisch ausgestellt; wir übersetzen sie beglaubigt ins Deutsche.'],
    ],
  },
};
