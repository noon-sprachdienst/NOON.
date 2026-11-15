// Nürnberg landing pages (SEO plan Nov 2026, phase 3). No office in Nürnberg: pages describe
// digital handling and name the Stuttgart office for personal appointments.
// Bavaria: translators are "öffentlich bestellt und beeidigt", notaries are full-time notaries.
import {
  APOSTILLE_LINK, CITY, DOCUMENT_LINKS, FAQ_DIGITAL, INTERPRETING_STEPS, NOTARY_GUIDE_LINK, ORDER_STEPS,
  digitalSection, interpretingPriceSection, translationPriceSection, withMore,
} from './shared.js';

const C = CITY.nuernberg;
const L = (slug, label) => ({ href: `/de/standorte/nuernberg/${slug}/`, label });
const D = (slug, label) => ({ href: `/de/${slug}/`, label });

export const NUERNBERG_LINKS = [
  L('beglaubigte-uebersetzung', 'Beglaubigte Übersetzung Nürnberg'),
  L('dolmetscher', 'Dolmetscher Nürnberg'),
  L('gerichtsdolmetscher', 'Gerichtsdolmetscher Nürnberg'),
  L('dolmetscher-notar', 'Dolmetscher beim Notar in Nürnberg'),
  L('fachuebersetzungen', 'Fachübersetzungen Nürnberg'),
  L('tuerkisch', 'Türkisch-Deutsch Nürnberg'),
  L('russisch', 'Russisch-Deutsch Nürnberg'),
  L('rumaenisch', 'Rumänisch-Deutsch Nürnberg'),
];
const LANG_PAGES = NUERNBERG_LINKS.slice(5);

const DIGITAL_TRANSLATION = 'Ob Südstadt, Gostenhof, Langwasser oder Fürth: Sie schicken Ihr Dokument als Foto oder Scan, bekommen den Festpreis und erhalten die beglaubigte Übersetzung als PDF und per Post.';
const DIGITAL_INTERPRETING = 'Unsere Dolmetscher kommen zu Ihrem Termin in Nürnberg, Fürth, Erlangen oder Schwabach. Kurze Gespräche dolmetschen wir per Video oder Telefon.';

export const NUERNBERG_HUB = {
  sections: [['Alle Leistungen in Nürnberg', 'Für die in Nürnberg am häufigsten gefragten Leistungen und Sprachen haben wir eigene Seiten mit Details, Preisen und typischen Terminen:', NUERNBERG_LINKS]],
};

const BASE_PAGES = [
  {
    slug: 'beglaubigte-uebersetzung',
    eyebrow: 'Beglaubigte Übersetzung Nürnberg',
    title: 'Beglaubigte Übersetzungen in Nürnberg – für Amt, Standesamt und Hochschule.',
    metaTitle: 'Beglaubigte Übersetzung Nürnberg – ab 39 € | Noon',
    description: 'Beglaubigte Übersetzung in Nürnberg für Ausländerbehörde, Standesamt, Gericht, FAU und TH Nürnberg – zugelassene Übersetzer, ab 39 € pro Dokument.',
    intro: 'Für die Ausländerbehörde, das Standesamt, die Gerichte in Nürnberg und Fürth oder die Hochschulen der Region brauchen Sie ausländische Dokumente als beglaubigte Übersetzung. Unsere zugelassenen Übersetzer übersetzen Ihre Urkunden vollständig und bestätigen die Richtigkeit mit Unterschrift und Stempel – digital für die ganze Metropolregion.',
    highlights: ['Zugelassene Übersetzer', 'Ab 39 € pro Dokument', 'Express am selben Tag'],
    sections: [
      ['Für diese Stellen in Nürnberg', '• Ausländerbehörde Nürnberg: Aufenthalt, Familiennachzug, Einbürgerung\n• Standesamt Nürnberg: Eheschließung, Geburtsbeurkundung, Namenserklärungen\n• Amtsgericht Nürnberg, Landgericht Nürnberg-Fürth: Urteile, Beschlüsse, Erbscheine\n• FAU Erlangen-Nürnberg und TH Nürnberg: Zeugnisse und Diplome\n• Fahrerlaubnisbehörde: ausländische Führerscheine\n• Agentur für Arbeit und Jobcenter: Nachweise und Abschlüsse\n\nWelche Unterlagen nötig sind, legt die jeweilige Stelle fest – mit ihrer Liste nennen wir Ihnen einen Festpreis für alles.',
        DOCUMENT_LINKS],
      ['„Öffentlich bestellt und beeidigt“ – was heißt das?', 'In Bayern heißen Übersetzer, die beglaubigte Übersetzungen anfertigen dürfen, öffentlich bestellt und beeidigt; in anderen Bundesländern ermächtigt oder vereidigt. Gemeint ist dasselbe: Die Justiz hat den Übersetzer für seine Sprache zugelassen. Seine Übersetzungen werden bundesweit anerkannt – egal, in welchem Bundesland er zugelassen ist.',
        [NOTARY_GUIDE_LINK]],
      ['Apostille in Mittelfranken', 'Braucht eine deutsche Urkunde aus Nürnberg eine Apostille, ist für Urkunden von Behörden wie dem Standesamt in Bayern in der Regel die Regierung des jeweiligen Bezirks zuständig, für Nürnberg also die Regierung von Mittelfranken; für gerichtliche und notarielle Urkunden meist der Präsident des Landgerichts. Prüfen Sie Zuständigkeit und Gebühren vorher bei der Stelle. Die Übersetzung fertigen wir danach an, damit die Apostille mit übersetzt wird.',
        [APOSTILLE_LINK]],
      ['Was wir übersetzen', 'Das ganze Dokument: Text, Stempel, Siegel, Randvermerke und Apostille. Namen schreiben wir wie im Reisepass. Besonders oft übersetzen wir in Nürnberg aus dem Türkischen, Russischen, Rumänischen, Griechischen, Kroatischen und Ukrainischen.',
        LANG_PAGES],
      translationPriceSection('Nürnberg'),
      ORDER_STEPS,
      digitalSection(C, DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Was kostet eine beglaubigte Übersetzung in Nürnberg?', 'Standarddokumente beginnen ab 39 € pro Dokument. Den Festpreis erhalten Sie vorab und kostenlos.'],
      ['Werden Ihre Übersetzungen in Bayern anerkannt?', 'Ja. Beglaubigte Übersetzungen zugelassener Übersetzer werden bundesweit anerkannt – auch von Behörden in Nürnberg und Fürth.'],
      ['Wie schnell geht es?', 'In der Regel 2–3 Werktage, im Express am selben Tag – meist innerhalb von 4–5 Stunden.'],
      ['Haben Sie ein Büro in Nürnberg?', 'Nein. Aufträge laufen digital; persönliche Termine bieten wir nach Vereinbarung in Stuttgart an.'],
      FAQ_DIGITAL,
    ],
    serviceType: 'Beglaubigte Übersetzung',
  },
  {
    slug: 'dolmetscher',
    eyebrow: 'Dolmetscher Nürnberg',
    title: 'Dolmetscher in Nürnberg – für Behörde, Messe und Unternehmen.',
    metaTitle: 'Dolmetscher Nürnberg – vor Ort & per Video | Noon',
    description: 'Dolmetscher in Nürnberg, Fürth und Erlangen für Behörden, Standesamt, Notar, Gericht, Klinik und Messe – vor Ort, per Video oder Telefon, ab 85 € pro Stunde.',
    intro: 'In Nürnberg dolmetschen wir für Familien, Unternehmen und Behörden: beim Gespräch in der Ausländerbehörde, bei der Trauung im Standesamt, beim Notar, im Klinikum, auf Fachmessen und bei Schulungen in Industriebetrieben der Region.',
    highlights: ['Nürnberg, Fürth, Erlangen', 'Video & Telefon', 'Ab 85 € pro Stunde'],
    sections: [
      ['Einsätze in der Metropolregion', '• Ausländerbehörde, Jobcenter, Jugendamt\n• Standesamt: Anmeldung der Eheschließung und Trauung\n• Notar, Amtsgericht, Landgericht Nürnberg-Fürth\n• Kliniken und Praxen in Nürnberg, Fürth und Erlangen\n• Schulen und Kitas\n• Industrie: Werksführungen, Audits, Schulungen, Betriebsversammlungen\n• Messe Nürnberg: Standgespräche, Kundentermine, Fachforen',
        [L('gerichtsdolmetscher', 'Gerichtsdolmetscher Nürnberg'), L('dolmetscher-notar', 'Dolmetscher Notar Nürnberg'), { href: '/de/dolmetschen/dolmetscher-arzt/', label: 'Dolmetscher beim Arzt' }]],
      ['Messe und Industrie', 'Auf internationalen Fachmessen in Nürnberg begleiten unsere Dolmetscher Aussteller und Besucher bei Kundengesprächen und Verhandlungen. Für Industriebetriebe dolmetschen wir bei Audits, Werksabnahmen und Schulungen mit Partnern aus dem Ausland – nach Vorbereitung mit Ihren Unterlagen und Fachbegriffen.',
        [{ href: '/de/dolmetschen/simultandolmetscher/', label: 'Simultandolmetscher' }]],
      ['Sprachen', 'Häufig gefragt sind Türkisch, Russisch, Ukrainisch, Rumänisch, Griechisch, Kroatisch, Serbisch, Arabisch, Persisch, Englisch, Italienisch und Französisch. Nennen Sie uns bei der Anfrage auch das Herkunftsland Ihrer Gesprächspartner.',
        LANG_PAGES],
      interpretingPriceSection('Nürnberg'),
      INTERPRETING_STEPS,
      digitalSection(C, DIGITAL_INTERPRETING),
    ],
    faqs: [
      ['Was kostet ein Dolmetscher in Nürnberg?', 'Ab 85 € pro Stunde. Den Festpreis nennen wir vorab, sobald wir Ort, Dauer und Sprache kennen.'],
      ['Kommen Sie auch nach Erlangen und Fürth?', 'Ja, wir stellen Dolmetscher in der gesamten Metropolregion.'],
      ['Stellen Sie Dolmetscher für Messen?', 'Ja, tageweise oder für einzelne Termine – vor Ort am Stand.'],
      ['Wann ist Video- oder Telefondolmetschen sinnvoll?', 'Für kurze Gespräche mit Behörden, Praxen oder Geschäftspartnern. Für Gericht, Notar und Standesamt empfehlen wir einen Dolmetscher vor Ort.'],
      ['Brauche ich einen beeidigten Dolmetscher?', 'Für Gericht, Notar und oft das Standesamt ja; für Arzt, Schule oder Betrieb meist nicht.'],
    ],
    serviceType: 'Dolmetschen',
  },
  {
    slug: 'gerichtsdolmetscher',
    eyebrow: 'Gerichtsdolmetscher Nürnberg',
    title: 'Gerichtsdolmetscher und beeidigte Dolmetscher in Nürnberg.',
    metaTitle: 'Gerichtsdolmetscher Nürnberg – beeidigt | Noon',
    description: 'Gerichtsdolmetscher in Nürnberg: allgemein beeidigte Dolmetscher für Amtsgericht, Landgericht Nürnberg-Fürth, Kanzlei und Polizei – Urteile auch beglaubigt.',
    intro: 'Am Justizgebäude in der Fürther Straße, am Amtsgericht und an den Fachgerichten in Nürnberg wird regelmäßig mit Beteiligten verhandelt, die kein ausreichendes Deutsch sprechen. Wir stellen allgemein beeidigte Dolmetscher für Kanzleien, Betroffene und private Termine und übersetzen Verfahrensunterlagen beglaubigt.',
    highlights: ['Allgemein beeidigt', 'Straf-, Zivil- und Familienrecht', 'Vertraulich'],
    sections: [
      ['Beeidigte Dolmetscher in Bayern', 'In Bayern werden Dolmetscher von den Präsidentinnen und Präsidenten der Landgerichte allgemein beeidigt und in die gemeinsame Datenbank der Justiz eingetragen. Wer so beeidigt ist, muss nicht vor jedem Einsatz neu vereidigt werden und ist durch den Eid zu treuer und gewissenhafter Übertragung verpflichtet.'],
      ['Wann wir direkt gebucht werden', 'Für die Hauptverhandlung im Strafverfahren lädt das Gericht den Dolmetscher meist selbst. Kanzleien, Betroffene und Angehörige buchen uns für Mandantengespräche, die Vorbereitung auf den Termin, Gutachtertermine und Gespräche außerhalb des Gerichtssaals.',
        [{ href: '/de/gerichtsdolmetscher/', label: 'Gerichtsdolmetscher bundesweit' }]],
      ['Unterlagen für das Verfahren', 'Wir übersetzen Urteile, Beschlüsse, Ladungen, Anklageschriften, Gutachten und Vollmachten beglaubigt – ins Deutsche und aus dem Deutschen. Für Familienverfahren auch Heirats- und Geburtsurkunden sowie ausländische Scheidungsurteile.',
        [{ href: '/de/fachuebersetzungen/recht/', label: 'Juristische Übersetzungen' }, D('scheidungsurteil-uebersetzung', 'Scheidungsurteil übersetzen')]],
      interpretingPriceSection('Nürnberg'),
      INTERPRETING_STEPS,
      digitalSection(C, DIGITAL_INTERPRETING),
    ],
    faqs: [
      ['Welche Sprachen bieten Sie für Nürnberger Gerichte?', 'Unter anderem Türkisch, Russisch, Ukrainisch, Rumänisch, Griechisch, Kroatisch, Serbisch, Arabisch und Persisch.'],
      ['Übersetzen Sie Urteile beglaubigt?', 'Ja, auch im Express.'],
      ['Sind Ihre Dolmetscher zur Verschwiegenheit verpflichtet?', 'Ja, beeidigte Dolmetscher zusätzlich durch ihren Eid.'],
      ['Kann ich den Dolmetscher für ein Anwaltsgespräch buchen?', 'Ja, vor Ort in der Kanzlei, per Video oder Telefon.'],
    ],
    serviceType: 'Gerichtsdolmetscher',
  },
  {
    slug: 'dolmetscher-notar',
    eyebrow: 'Dolmetscher Notar Nürnberg',
    title: 'Dolmetscher für Notartermine in Nürnberg.',
    metaTitle: 'Dolmetscher Notar Nürnberg – beeidigt | Noon',
    description: 'Dolmetscher beim Notar in Nürnberg: beeidigte Dolmetscher für Immobilienkauf, Vollmacht, Testament und GmbH-Gründung – Urkunde auf Wunsch auch schriftlich.',
    intro: 'Wenn Sie in Nürnberg oder Fürth eine Wohnung kaufen, eine Vollmacht erteilen oder eine Gesellschaft gründen und nicht ausreichend Deutsch sprechen, wird die Urkunde beim Notar mündlich für Sie übersetzt. Wir stellen allgemein beeidigte Dolmetscher und übersetzen die Urkunde danach auf Wunsch schriftlich.',
    highlights: ['Allgemein beeidigt', 'Für Beurkundungen', 'Urkunde auch schriftlich'],
    sections: [
      ['Notare in Bayern', 'In Bayern sind Notarinnen und Notare hauptberuflich tätig. Spricht ein Beteiligter nicht ausreichend Deutsch, muss ihm die Niederschrift übersetzt werden (§ 16 Beurkundungsgesetz). Allgemein beeidigte Dolmetscher müssen dafür nicht eigens vereidigt werden – deshalb setzen wir sie für Beurkundungen standardmäßig ein.',
        [NOTARY_GUIDE_LINK, { href: '/de/dolmetschen/notardolmetscher/', label: 'Notardolmetscher bundesweit' }]],
      ['Typische Termine', '• Kauf einer Eigentumswohnung oder eines Hauses\n• Grundschuldbestellung\n• Testament, Erbvertrag, Erbscheinsantrag\n• Vorsorge- und Generalvollmacht\n• Gründung einer GmbH, Gesellschafterbeschlüsse\n• Ehevertrag'],
      ['Vorbereitung', 'Senden Sie uns den Entwurf der Urkunde einige Tage vorher. So bereitet sich der Dolmetscher auf Fachbegriffe vor und der Termin bleibt im Zeitplan. Ausländische Unterlagen für das Notariat – etwa Vollmachten oder Registerauszüge – übersetzen wir vorab beglaubigt.',
        [D('vollmacht-uebersetzung', 'Vollmacht übersetzen'), D('handelsregisterauszug-uebersetzung', 'Handelsregisterauszug übersetzen'), APOSTILLE_LINK]],
      interpretingPriceSection('Nürnberg'),
      digitalSection(C, DIGITAL_INTERPRETING),
    ],
    faqs: [
      ['Muss der Dolmetscher beim Notar beeidigt sein?', 'Ist er nicht allgemein beeidigt, muss ihn der Notar vereidigen, sofern die Beteiligten nicht verzichten. Wir stellen deshalb allgemein beeidigte Dolmetscher.'],
      ['Wie lange dauert der Termin?', 'Meist ein bis zwei Stunden. Den Festpreis nennen wir vorab.'],
      ['Darf ein Verwandter dolmetschen?', 'Das entscheidet der Notar; bei Immobilienverträgen wird meist ein unabhängiger Dolmetscher bevorzugt.'],
      ['Übersetzen Sie die Urkunde auch schriftlich?', 'Ja, beglaubigt – zum Beispiel für die Verwendung im Ausland.'],
      ['Gibt es Notardolmetscher für Russisch und Türkisch?', 'Ja, beide gehören in Nürnberg zu den häufigsten Sprachen beim Notar.'],
    ],
    serviceType: 'Notardolmetscher',
  },
  {
    slug: 'fachuebersetzungen',
    eyebrow: 'Fachübersetzungen Nürnberg',
    title: 'Fachübersetzungen für Industrie, Medizintechnik und Handel in Nürnberg.',
    metaTitle: 'Fachübersetzungen Nürnberg – ab 0,12 €/Wort | Noon',
    description: 'Fachübersetzungen in Nürnberg: Technik, Medizintechnik, Recht, IT und Marketing – Fachübersetzer mit Terminologie und zweiter Prüfung, ab 0,12 € pro Wort.',
    intro: 'Die Metropolregion Nürnberg lebt von Maschinenbau, Elektrotechnik, Medizintechnik, Energie, IT und Handel. Für Unternehmen, Kanzleien und Kliniken übersetzen unsere Fachübersetzer technische, juristische und medizinische Texte – mit gepflegter Terminologie und einer zweiten Prüfung vor der Lieferung.',
    highlights: ['Technik und Medizintechnik', 'Zweite Prüfung', 'Ab 0,12 € pro Wort'],
    sections: [
      ['Fachgebiete', '• Technik: Betriebsanleitungen, Wartungshandbücher, Spezifikationen, Prüfberichte\n• Medizintechnik: Gebrauchsanweisungen, Etiketten, Studien und technische Dokumentation\n• Recht: Verträge, AGB, Lieferbedingungen, Gesellschaftsunterlagen\n• IT: Software, Hilfetexte, Websites\n• Marketing und Handel: Kataloge, Produkttexte, Messeunterlagen',
        [{ href: '/de/fachuebersetzungen/ingenieurwesen/', label: 'Technische Übersetzungen' }, { href: '/de/fachuebersetzungen/medizinische-dentalmedizin/', label: 'Medizinische Übersetzungen' }, { href: '/de/fachuebersetzungen/recht/', label: 'Juristische Übersetzungen' }, { href: '/de/fachuebersetzungen/it-software/', label: 'IT-Übersetzungen' }]],
      ['Technische Dokumentation richtig übersetzt', 'Bei Betriebsanleitungen und Sicherheitshinweisen zählt jedes Wort: Warnhinweise müssen eindeutig, Bezeichnungen über alle Handbücher einheitlich sein. Wir übernehmen Ihre Terminologie, arbeiten mit Translation-Memory und liefern im Format Ihrer Vorlage – so bleiben Folgeversionen konsistent.'],
      ['Für wen wir arbeiten', 'Für Hersteller und Zulieferer, Medizintechnik-Unternehmen, Handels- und Spielwarenunternehmen, Kanzleien, Kliniken sowie Institute der Hochschulen in Nürnberg und Erlangen.'],
      ['Preise', 'Fachübersetzungen beginnen ab 0,12 € pro Wort. Den Festpreis nennen wir nach Sichtung des Textes – abhängig von Fachgebiet, Umfang, Sprachen und Termin.',
        [{ href: '/de/fachuebersetzungen/', label: 'Alle Fachgebiete' }]],
      digitalSection(C, 'Dateien senden Sie per E-Mail oder Webformular, gern mit Glossar; Sie erhalten die Übersetzung im Originalformat.'),
    ],
    faqs: [
      ['Was kostet eine Fachübersetzung in Nürnberg?', 'Ab 0,12 € pro Wort. Den Festpreis nennen wir nach Sichtung.'],
      ['Übersetzen Sie Betriebsanleitungen in mehrere Sprachen?', 'Ja, auch mehrere Sprachen parallel mit gemeinsamer Terminologie.'],
      ['Arbeiten Sie mit Translation-Memory?', 'Ja, damit Folgeversionen und wiederkehrende Passagen einheitlich bleiben.'],
      ['Unterschreiben Sie eine Vertraulichkeitsvereinbarung?', 'Ja, gern vor Beginn des Auftrags.'],
    ],
    serviceType: 'Fachübersetzung',
  },
  {
    slug: 'tuerkisch',
    eyebrow: 'Türkisch Übersetzer Nürnberg',
    title: 'Türkisch-Deutsch in Nürnberg: beglaubigte Übersetzungen und Dolmetscher.',
    metaTitle: 'Türkisch Übersetzer Nürnberg – beglaubigt | Noon',
    description: 'Türkisch Übersetzer in Nürnberg: beglaubigte Übersetzungen Türkisch–Deutsch für Standesamt, Ausländerbehörde und Gericht, Dokumente für die Türkei – ab 39 €.',
    intro: 'Die türkischsprachige Gemeinschaft ist in Nürnberg und Fürth seit Jahrzehnten zu Hause – etwa in Gostenhof, der Südstadt und St. Leonhard. Wir übersetzen türkische Dokumente beglaubigt ins Deutsche, deutsche Dokumente für die Türkei ins Türkische und stellen Türkisch-Dolmetscher für Termine in der Region.',
    highlights: ['In beide Richtungen', 'Für Standesamt und Gericht', 'Dolmetscher, auf Wunsch beeidigt'],
    sections: [
      ['Häufige Dokumente', '• Nüfus-Registerauszüge und internationale Personenstandsauszüge\n• Heiratsurkunden und Scheidungsurteile\n• Führerscheine, Zeugnisse, Diplome\n• Vollmachten, Erbbescheinigungen, Grundbuchauszüge\n• Rentenunterlagen der SGK',
        [D('scheidungsurteil-uebersetzung', 'Scheidungsurteil übersetzen'), D('fuehrerschein-uebersetzung', 'Führerschein übersetzen')]],
      ['Heiraten in Nürnberg', 'Für die Anmeldung der Eheschließung verlangt das Standesamt von türkischen Staatsangehörigen meist einen aktuellen Registerauszug und weitere Nachweise. Akzeptiert das Standesamt den mehrsprachigen internationalen Auszug, entfällt für dieses Dokument die Übersetzung. Für alles andere übersetzen wir beglaubigt und stellen auf Wunsch einen Dolmetscher für Anmeldung und Trauung.',
        [{ href: '/de/ratgeber/heiraten-in-deutschland-als-auslaender/', label: 'Heiraten in Deutschland als Ausländer' }]],
      ['Für die Türkei', 'Deutsche Urkunden, Urteile und Vollmachten übersetzen wir beglaubigt ins Türkische. Die Türkei ist Mitglied des Haager Apostilleübereinkommens; öffentliche deutsche Urkunden brauchen dort deshalb meist eine Apostille.',
        [APOSTILLE_LINK, { href: '/de/sprachen/tuerkisch/', label: 'Türkisch bundesweit' }]],
      ['Türkisch-Dolmetscher', 'Für Notar, Standesamt, Gericht, Behörden und Arzttermine in Nürnberg, Fürth und Erlangen stellen wir Türkisch-Dolmetscher – auf Wunsch allgemein beeidigt.',
        [L('dolmetscher', 'Dolmetscher Nürnberg')]],
      translationPriceSection('Nürnberg'),
      digitalSection(C, DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Was kostet eine Türkisch-Übersetzung in Nürnberg?', 'Standarddokumente beginnen ab 39 €. Den Festpreis nennen wir vorab.'],
      ['Übersetzen Sie Dokumente aus e-Devlet?', 'Ja, mit Barcode und Prüfvermerk.'],
      ['Werden türkische Sonderzeichen übernommen?', 'Ja, Namen schreiben wir genau wie im Reisepass.'],
    ],
    serviceType: 'Türkisch Übersetzung',
  },
  {
    slug: 'russisch',
    eyebrow: 'Russisch Übersetzer Nürnberg',
    title: 'Russisch-Deutsch in Nürnberg: Übersetzer und Dolmetscher.',
    metaTitle: 'Russisch Übersetzer Nürnberg – beglaubigt | Noon',
    description: 'Russisch Übersetzer in Nürnberg: beglaubigte Übersetzungen Russisch–Deutsch für Standesamt, Rente, Anerkennung und Gericht, Dolmetscher – ab 39 €.',
    intro: 'In Nürnberg und Fürth leben viele Spätaussiedlerfamilien und Menschen aus Russland, Kasachstan, der Ukraine und weiteren Nachfolgestaaten der Sowjetunion. Wir übersetzen russischsprachige Urkunden, Arbeitsbücher und Diplome beglaubigt ins Deutsche, deutsche Dokumente ins Russische und stellen Russisch-Dolmetscher.',
    highlights: ['Spätaussiedler und Fachkräfte', 'Arbeitsbücher und Diplome', 'Namen wie im Pass'],
    sections: [
      ['Dokumente für Rente und Spätaussiedlerverfahren', 'Für die Deutsche Rentenversicherung und Verfahren beim Bundesverwaltungsamt werden oft ältere Dokumente gebraucht: Arbeitsbücher, Geburts- und Heiratsurkunden aus sowjetischer Zeit, Bescheinigungen über Ausbildung und Wehrdienst. Wir übersetzen sie vollständig, auch handschriftliche Einträge, soweit lesbar.'],
      ['Diplome für die Anerkennung', 'Für die Anerkennung in Bayern übersetzen wir Diplome mit Anlage, Studienbücher und Berufsnachweise mit allen Fächern, Stunden und Noten – zum Beispiel für Ingenieurinnen, Ärzte, Lehrkräfte oder Pflegekräfte.',
        [{ href: '/de/ratgeber/anerkennung-auslaendischer-abschluesse/', label: 'Anerkennung ausländischer Abschlüsse' }, D('diplom-uebersetzung', 'Diplom übersetzen')]],
      ['Namen aus dem Kyrillischen', 'Für kyrillische Namen gibt es mehrere Umschriften. Wir übernehmen die Schreibweise aus Ihrem Reisepass oder einer deutschen Urkunde und verwenden sie in allen Dokumenten gleich – auch bei Vatersnamen und geänderten Familiennamen.'],
      ['Russisch-Dolmetscher', 'Für Notar, Standesamt, Gericht, Ärzte und Behörden in Nürnberg, Fürth und Erlangen stellen wir Russisch-Dolmetscher – vor Ort oder per Video, auf Wunsch beeidigt.',
        [L('dolmetscher-notar', 'Dolmetscher Notar Nürnberg'), { href: '/de/sprachen/russisch/', label: 'Russisch bundesweit' }]],
      translationPriceSection('Nürnberg'),
      digitalSection(C, DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Übersetzen Sie Arbeitsbücher für die Rentenversicherung?', 'Ja, vollständig und beglaubigt.'],
      ['Übersetzen Sie Urkunden aus Kasachstan?', 'Ja, auch zweisprachige Urkunden auf Kasachisch und Russisch.'],
      ['Was kostet eine Russisch-Übersetzung in Nürnberg?', 'Standarddokumente beginnen ab 39 €; Diplome mit Anlage nach Umfang.'],
    ],
    serviceType: 'Russisch Übersetzung',
  },
  {
    slug: 'rumaenisch',
    eyebrow: 'Rumänisch Übersetzer Nürnberg',
    title: 'Rumänisch-Deutsch in Nürnberg: beglaubigte Übersetzungen und Dolmetscher.',
    metaTitle: 'Rumänisch Übersetzer Nürnberg – beglaubigt | Noon',
    description: 'Rumänisch Übersetzer in Nürnberg: beglaubigte Übersetzungen von Urkunden, Abschlüssen und Bescheinigungen für Familienkasse und Arbeitgeber – ab 39 €.',
    intro: 'Viele Fachkräfte aus Rumänien arbeiten in Industrie, Handwerk, Pflege und Logistik der Metropolregion Nürnberg. Für Familie, Arbeit und Behörden übersetzen wir rumänische Dokumente beglaubigt ins Deutsche, deutsche Dokumente ins Rumänische und stellen Dolmetscher.',
    highlights: ['Industrie, Handwerk, Pflege', 'Für Familienkasse und Arbeitgeber', 'In beide Richtungen'],
    sections: [
      ['Für Arbeitgeber und Anerkennung', 'Gesellenbriefe, Berufszeugnisse, Diplome mit Fächerübersicht, Arbeitsbescheinigungen und Führerscheine übersetzen wir für Arbeitgeber, Kammern und Anerkennungsstellen. Bei Handwerksberufen ist häufig die Handwerkskammer zuständig – fragen Sie dort nach der Liste der Unterlagen.',
        [{ href: '/de/ratgeber/anerkennung-auslaendischer-abschluesse/', label: 'Anerkennung ausländischer Abschlüsse' }]],
      ['Familie und Familienkasse', 'Geburtsurkunden der Kinder, Heiratsurkunden und Schulbescheinigungen übersetzen wir für Familienkasse und Standesamt – mit einheitlicher Schreibweise aller Namen, einschließlich ă, â, î, ș und ț.',
        [D('geburtsurkunde-uebersetzung', 'Geburtsurkunde übersetzen')]],
      ['Deutsche Dokumente für Rumänien', 'Wird eine in Nürnberg ausgestellte Geburts- oder Heiratsurkunde in Rumänien gebraucht, prüfen Sie zuerst, ob ein mehrsprachiges EU-Formular reicht. Verlangt die rumänische Stelle eine Übersetzung, übersetzen wir die Urkunde beglaubigt ins Rumänische.',
        [{ href: '/de/sprachen/rumaenisch/', label: 'Rumänisch bundesweit' }]],
      ['Rumänisch-Dolmetscher', 'Für Behörden, Ärzte, Schulen, Arbeitgeber, Notar und Gericht stellen wir Rumänisch-Dolmetscher – vor Ort oder per Video.',
        [L('dolmetscher', 'Dolmetscher Nürnberg')]],
      translationPriceSection('Nürnberg'),
      digitalSection(C, DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Übersetzen Sie Gesellenbriefe für die Handwerkskammer?', 'Ja, mit allen Angaben zu Ausbildung und Prüfung – beglaubigt.'],
      ['Was kostet eine Rumänisch-Übersetzung in Nürnberg?', 'Standarddokumente beginnen ab 39 €. Den Festpreis nennen wir vorab.'],
      ['Wie schnell geht es?', 'Meist 2–3 Werktage, im Express am selben Tag.'],
    ],
    serviceType: 'Rumänisch Übersetzung',
  },
];

// Second pass (audit minimum of 400 words): page-specific sections and FAQs.
const MORE = {
  dolmetscher: {
    sections: [['Agentur für Arbeit und Jobcenter', 'Für Beratungsgespräche, Eingliederungsvereinbarungen und Termine rund um die Anerkennung von Abschlüssen stellen wir Dolmetscher – vor Ort in Nürnberg oder per Video. Fragen Sie vorab bei Ihrer Stelle nach, ob sie selbst einen Dolmetscher organisiert.']],
    faqs: [['Gibt es Dolmetscher für Griechisch und Kroatisch?', 'Ja, beide Sprachen sind in Nürnberg gefragt – vor Ort, per Video oder Telefon.']],
  },
  gerichtsdolmetscher: {
    sections: [
      ['Kontext hilft', 'Teilen Sie uns – soweit Sie dürfen – Verfahrensart, Namen der Beteiligten und zentrale Schriftstücke vorab mit. So stellt sich der Dolmetscher auf Fachbegriffe ein. Für ganztägige Termine planen wir Pausen oder einen zweiten Dolmetscher.'],
      ['Familiensachen', 'Bei Scheidung, Sorgerecht und Umgang dolmetschen wir nach Absprache und übersetzen Heiratsurkunden, Geburtsurkunden der Kinder und ausländische Urteile beglaubigt.'],
    ],
    faqs: [['Kann der Dolmetscher auch zur Polizei kommen?', 'Für Vernehmungen lädt die Polizei meist selbst einen Dolmetscher. Für Gespräche mit Ihrer Verteidigung buchen Sie uns direkt.']],
  },
  'dolmetscher-notar': {
    sections: [
      ['Eigentum in Nürnberg und Fürth', 'Beim Erwerb einer Immobilie werden der Kaufvertrag und die Grundschuld der Bank oft an verschiedenen Tagen beurkundet. Wir können beide Termine mit derselben Dolmetscherin oder demselben Dolmetscher besetzen. Möchten Sie die Urkunden später in Ihrer Sprache haben, etwa für Angehörige im Ausland, fertigen wir eine schriftliche Übersetzung an.'],
      ['Ausländische Unterlagen', 'Fehlt dem Notariat noch eine ausländische Vollmacht, eine Heiratsurkunde für den Güterstand oder ein Registerauszug, übersetzen wir sie beglaubigt – im Express am selben Tag.'],
    ],
    faqs: [['Kann der Dolmetscher per Video zugeschaltet werden?', 'Ob das zulässig ist, entscheidet der Notar; bei Beurkundungen ist ein Dolmetscher vor Ort üblich.']],
  },
  fachuebersetzungen: {
    sections: [
      ['Spielwaren, Handel und Konsumgüter', 'Für Hersteller und Händler übersetzen wir Produktbeschreibungen, Verpackungstexte, Sicherheitshinweise, Kataloge und Online-Shops – mit Rücksicht auf Zeichenbegrenzungen und Zielmarkt.'],
      ['Energie und Elektrotechnik', 'Datenblätter, Beschriftungen von Schaltplänen, Prüfprotokolle und Schulungsunterlagen übersetzen wir mit einheitlicher Terminologie – auch in mehrere Sprachen gleichzeitig.'],
      ['Medizintechnik: Sorgfalt bei jedem Begriff', 'Gebrauchsanweisungen und Etiketten für Medizinprodukte müssen eindeutig sein. Wir arbeiten mit Ihren freigegebenen Terminologielisten, kennzeichnen Rückfragen im Text und liefern im Format Ihrer Vorlage. Die regulatorische Freigabe bleibt bei Ihrem Haus.'],
      ['Ablauf', '1. Dateien und Glossar senden.\n2. Festpreis und Liefertermin erhalten.\n3. Übersetzung durch einen Fachübersetzer, Prüfung durch eine zweite Person.\n4. Lieferung im Originalformat, auf Wunsch beglaubigt.'],
    ],
    faqs: [
      ['Wie schnell ist eine Fachübersetzung fertig?', 'Je nach Umfang; den verbindlichen Liefertermin nennen wir im Angebot.'],
      ['Übersetzen Sie Normen und Prüfberichte?', 'Ja, mit der in Ihrer Branche üblichen Terminologie.'],
      ['Können wir ein eigenes Glossar mitgeben?', 'Ja, gern – wir übernehmen Ihre Begriffe und pflegen das Glossar weiter.'],
      ['Übersetzen Sie Präsentationen für Messen?', 'Ja, Folien, Flyer und Standtexte – im Originalformat und rechtzeitig vor Messebeginn.'],
      ['In welche Sprachen übersetzen Sie?', 'In alle gängigen europäischen Sprachen und viele weitere – fragen Sie nach Ihrer Kombination.'],
    ],
  },
  tuerkisch: {
    sections: [
      ['Rente und Erbe', 'Wer in der Türkei und in Deutschland gearbeitet hat, braucht für die Rente häufig Versicherungsverläufe und Bescheide aus beiden Ländern in der jeweils anderen Sprache. Bei Erbfällen mit Vermögen in der Türkei werden deutsche Erbscheine und Sterbeurkunden auf Türkisch und türkische Erbbescheinigungen auf Deutsch gebraucht. Wir übersetzen beides beglaubigt.'],
      ['Führerschein', 'Türkische Führerscheine übersetzen wir für die Umschreibung bei der Fahrerlaubnisbehörde Nürnberg – vollständig mit allen Klassen, Daten und Stempeln.',
        [D('fuehrerschein-uebersetzung', 'Führerschein übersetzen')]],
    ],
    faqs: [
      ['Übersetzen Sie Dokumente für türkische Behörden?', 'Ja, deutsche Urkunden, Urteile und Vollmachten – beglaubigt ins Türkische, auf Wunsch mit Apostille auf dem Original.'],
      ['Wie schnell geht es?', 'Meist 2–3 Werktage, im Express am selben Tag.'],
    ],
  },
  russisch: {
    sections: [
      ['Heiraten in Nürnberg', 'Für die Anmeldung der Eheschließung verlangt das Standesamt Nürnberg je nach Staatsangehörigkeit Geburtsurkunden, Nachweise zum Familienstand und bei früheren Ehen Scheidungsurteile. Russischsprachige Urkunden übersetzen wir beglaubigt und stellen auf Wunsch einen Dolmetscher für Anmeldung und Trauung.',
        [D('ehefaehigkeitszeugnis-uebersetzung', 'Ehefähigkeitszeugnis übersetzen')]],
      ['Deutsche Dokumente auf Russisch', 'Geburtsurkunden in Deutschland geborener Kinder, Heiratsurkunden, Vollmachten und Zeugnisse übersetzen wir beglaubigt ins Russische – zum Beispiel für Behörden in Kasachstan. Ob zusätzlich eine Apostille nötig ist, entscheidet das Zielland.'],
    ],
    faqs: [['Übersetzen Sie auch ukrainische Dokumente?', 'Ja, Ukrainisch und Russisch übersetzen wir gleichermaßen.']],
  },
  rumaenisch: {
    sections: [
      ['Kind in Nürnberg geboren', 'Wird ein Kind rumänischer Eltern in Nürnberg geboren, soll die Geburt meist auch in Rumänien eingetragen werden. Dafür wird die deutsche Geburtsurkunde häufig in rumänischer Übersetzung verlangt. Welche Unterlagen genau nötig sind, erfahren Sie beim rumänischen Konsulat – wir übersetzen sie beglaubigt ins Rumänische.'],
      ['Pflege und Gesundheit', 'Für Pflegefachkräfte und Ärztinnen aus Rumänien übersetzen wir Diplome, Fächerübersichten, Praktikumsnachweise und Bescheinigungen über die Berufszulassung. Für EU-Abschlüsse in der Pflege gibt es häufig ein vereinfachtes Anerkennungsverfahren – die genaue Liste nennt die zuständige Stelle in Bayern.'],
    ],
    faqs: [
      ['Übersetzen Sie Arbeitsverträge ins Rumänische?', 'Ja, damit neue Mitarbeitende ihre Vertragsbedingungen verstehen – als Fachübersetzung oder beglaubigt.'],
      ['Dolmetschen Sie per Video?', 'Ja, für kurze Gespräche mit Ämtern, Schulen oder Praxen.'],
    ],
  },
};

export const NUERNBERG_PAGES = withMore(BASE_PAGES, MORE);
