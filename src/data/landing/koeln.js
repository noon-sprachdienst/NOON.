// Köln landing pages (SEO plan Nov 2026, phase 3). No office in Köln: pages describe digital
// handling and name the Bielefeld and Mainz offices for personal appointments.
import {
  APOSTILLE_LINK, CITY, DOCUMENT_LINKS, FAQ_DIGITAL, INTERPRETING_STEPS, NOTARY_GUIDE_LINK, ORDER_STEPS,
  digitalSection, interpretingPriceSection, translationPriceSection, withMore,
} from './shared.js';

const C = CITY.koeln;
const L = (slug, label) => ({ href: `/de/standorte/koeln/${slug}/`, label });
const D = (slug, label) => ({ href: `/de/${slug}/`, label });

export const KOELN_LINKS = [
  L('beglaubigte-uebersetzung', 'Beglaubigte Übersetzung Köln'),
  L('dolmetscher', 'Dolmetscher Köln'),
  L('gerichtsdolmetscher', 'Gerichtsdolmetscher Köln'),
  L('dolmetscher-notar', 'Dolmetscher beim Notar in Köln'),
  L('fachuebersetzungen', 'Fachübersetzungen Köln'),
  L('tuerkisch', 'Türkisch-Deutsch Köln'),
  L('arabisch', 'Arabisch-Deutsch Köln'),
  L('polnisch', 'Polnisch-Deutsch Köln'),
];
const LANG_PAGES = KOELN_LINKS.slice(5);

const DIGITAL_TRANSLATION = 'Von Ehrenfeld bis Porz, von Chorweiler bis Rodenkirchen: Sie senden Ihr Dokument als Foto oder Scan, bekommen den Festpreis und erhalten die beglaubigte Übersetzung als PDF und per Post an Ihre Kölner Adresse.';
const DIGITAL_INTERPRETING = 'Unsere Dolmetscher kommen zu Ihrem Termin in Köln und Umgebung – auch nach Leverkusen, Bergisch Gladbach, Hürth oder Bonn. Kurze Gespräche dolmetschen wir per Video oder Telefon.';

export const KOELN_HUB = {
  sections: [['Alle Leistungen in Köln', 'Für die in Köln am häufigsten gefragten Leistungen und Sprachen haben wir eigene Seiten mit Details, Preisen und typischen Terminen:', KOELN_LINKS]],
};

const BASE_PAGES = [
  {
    slug: 'beglaubigte-uebersetzung',
    eyebrow: 'Beglaubigte Übersetzung Köln',
    title: 'Beglaubigte Übersetzungen in Köln – für Amt, Standesamt und Uni.',
    metaTitle: 'Beglaubigte Übersetzung Köln – ab 39 € | Noon',
    description: 'Beglaubigte Übersetzung in Köln für Ausländerbehörde, Standesamt, Gericht und Universität – ermächtigte Übersetzer, ab 39 € pro Dokument, Express möglich.',
    intro: 'Ob Aufenthaltstitel, Hochzeit, Studienplatz oder Führerschein: In Köln verlangen Behörden, Gerichte und Hochschulen ausländische Dokumente als beglaubigte Übersetzung. Unsere in Deutschland ermächtigten Übersetzer übersetzen Ihre Unterlagen vollständig und formgetreu – digital für alle neun Kölner Stadtbezirke.',
    highlights: ['Ermächtigte Übersetzer', 'Ab 39 € pro Dokument', 'Express am selben Tag'],
    sections: [
      ['Für diese Kölner Stellen übersetzen wir', '• Ausländerbehörde der Stadt Köln: Aufenthalt, Familiennachzug, Einbürgerung\n• Standesamt Köln: Anmeldung der Eheschließung, Geburtsbeurkundung, Namenserklärungen\n• Amtsgericht und Landgericht Köln: Urteile, Beschlüsse, Erbscheine\n• Universität zu Köln, TH Köln und Deutsche Sporthochschule: Zeugnisse und Diplome\n• Straßenverkehrsamt: Führerscheine für die Umschreibung\n• Jobcenter und Familienkasse: Nachweise und Bescheinigungen\n\nWelche Unterlagen Sie im Einzelfall brauchen, legt die jeweilige Stelle fest. Senden Sie uns deren Liste, und wir nennen Ihnen einen Festpreis für alle Dokumente.',
        DOCUMENT_LINKS],
      ['Ermächtigt in NRW – anerkannt überall', 'In Nordrhein-Westfalen werden Übersetzer von den Präsidentinnen und Präsidenten der Landgerichte ermächtigt. Ihre beglaubigten Übersetzungen werden von Behörden in Köln und in ganz Deutschland anerkannt – ebenso wie die von Übersetzern aus anderen Bundesländern. Eine zusätzliche notarielle Beglaubigung brauchen deutsche Behörden in der Regel nicht.',
        [NOTARY_GUIDE_LINK, APOSTILLE_LINK]],
      ['Vollständig und formgetreu', 'Wir übersetzen den ganzen Text samt Stempeln, Siegeln, handschriftlichen Vermerken und Apostille. Namen übernehmen wir aus Ihrem Reisepass, damit Ausländerbehörde und Standesamt alle Dokumente derselben Person zuordnen. Am häufigsten übersetzen wir in Köln aus dem Türkischen, Arabischen, Polnischen, Russischen, Ukrainischen und Englischen.',
        LANG_PAGES],
      translationPriceSection('Köln'),
      ORDER_STEPS,
      digitalSection(C, DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Was kostet eine beglaubigte Übersetzung in Köln?', 'Standarddokumente beginnen ab 39 € pro Dokument. Den Festpreis erhalten Sie vorab und kostenlos.'],
      ['Erkennt die Ausländerbehörde Köln Ihre Übersetzungen an?', 'Ja. Beglaubigte Übersetzungen ermächtigter Übersetzer werden von Kölner Behörden und bundesweit anerkannt.'],
      ['Muss ich für die Übersetzung vorbeikommen?', 'Nein. Ein gut lesbares Foto oder ein Scan reicht; die Übersetzung erhalten Sie als PDF und per Post.'],
      ['Wie lange dauert die Übersetzung?', 'Meist 2–3 Werktage. Im Express ist sie am selben Tag fertig, in der Regel innerhalb von 4–5 Stunden.'],
      FAQ_DIGITAL,
    ],
    serviceType: 'Beglaubigte Übersetzung',
  },
  {
    slug: 'dolmetscher',
    eyebrow: 'Dolmetscher Köln',
    title: 'Dolmetscher in Köln – für Amt, Standesamt, Arzt und Messe.',
    metaTitle: 'Dolmetscher Köln – vor Ort & per Video | Noon',
    description: 'Dolmetscher in Köln für Ausländerbehörde, Standesamt, Notar, Gericht, Klinik und Koelnmesse – vor Ort, per Video oder Telefon, ab 85 € pro Stunde.',
    intro: 'Für Termine in ganz Köln stellen wir Dolmetscherinnen und Dolmetscher: bei der Ausländerbehörde, im Standesamt, beim Notar, vor Gericht, in Kliniken und Arztpraxen, in Schulen und auf der Koelnmesse. Je nach Termin kommen sie persönlich oder werden per Video oder Telefon zugeschaltet.',
    highlights: ['Vor Ort in Köln', 'Video & Telefon', 'Ab 85 € pro Stunde'],
    sections: [
      ['Wofür Kölnerinnen und Kölner uns buchen', '• Ämter: Ausländerbehörde, Jobcenter, Jugendamt, Sozialamt\n• Standesamt: Anmeldung der Eheschließung und Trauung\n• Notar: Immobilienkauf, Vollmachten, Testament\n• Justiz: Amtsgericht, Landgericht, Polizei, Anwaltskanzleien\n• Gesundheit: Uniklinik, Krankenhäuser, Praxen, Therapiegespräche\n• Bildung: Elterngespräche in Schulen und Kitas\n• Wirtschaft: Messen, Verhandlungen, Schulungen, Betriebsversammlungen',
        [L('gerichtsdolmetscher', 'Gerichtsdolmetscher Köln'), L('dolmetscher-notar', 'Dolmetscher Notar Köln'), { href: '/de/dolmetschen/dolmetscher-arzt/', label: 'Dolmetscher beim Arzt' }]],
      ['Dolmetschen auf der Koelnmesse', 'Auf großen Fachmessen in Köln treffen Aussteller Kundinnen und Kunden aus aller Welt. Unsere Dolmetscher unterstützen Sie am Stand, bei Kundenterminen und Führungen – meist konsekutiv. Für Fachkonferenzen mit Kabine stellen wir Simultandolmetscher im Team. Senden Sie uns Produktinformationen und Fachbegriffe vorab.',
        [{ href: '/de/dolmetschen/simultandolmetscher/', label: 'Simultandolmetscher' }]],
      ['Sprachen und Dialekte', 'In Köln besonders gefragt: Türkisch und Kurdisch, Arabisch mit verschiedenen Dialekten, Polnisch, Russisch, Ukrainisch, Persisch und Dari, Rumänisch, Bulgarisch, Serbisch, Kroatisch, Bosnisch, Albanisch, Englisch, Französisch, Italienisch und Spanisch. Sagen Sie uns das Herkunftsland – so passt der Dolmetscher auch sprachlich.',
        LANG_PAGES],
      interpretingPriceSection('Köln'),
      INTERPRETING_STEPS,
      digitalSection(C, DIGITAL_INTERPRETING),
    ],
    faqs: [
      ['Was kostet ein Dolmetscher in Köln?', 'Ab 85 € pro Stunde. Den Festpreis für Ihren Termin nennen wir vorab, sobald wir Ort, Dauer und Sprache kennen.'],
      ['Stellen Sie Dolmetscher für Arzttermine in Köln?', 'Ja, vor Ort oder per Video – zum Beispiel für Aufklärungsgespräche oder Befundbesprechungen.'],
      ['Wie kurzfristig ist ein Dolmetscher verfügbar?', 'Je nach Sprache oft innerhalb weniger Tage. Ganz kurzfristig ist Video- oder Telefondolmetschen meist die schnellste Lösung.'],
      ['Wer zahlt den Dolmetscher bei Behörden?', 'Das hängt von Behörde und Verfahren ab. Manche Stellen bestellen den Dolmetscher selbst – fragen Sie bei der einladenden Stelle nach.'],
    ],
    serviceType: 'Dolmetschen',
  },
  {
    slug: 'gerichtsdolmetscher',
    eyebrow: 'Gerichtsdolmetscher Köln',
    title: 'Gerichtsdolmetscher und beeidigte Dolmetscher in Köln.',
    metaTitle: 'Gerichtsdolmetscher Köln – beeidigt | Noon',
    description: 'Gerichtsdolmetscher in Köln: allgemein beeidigte Dolmetscher für Amtsgericht, Landgericht, Familiengericht und Kanzlei – Urteile auch beglaubigt.',
    intro: 'Am Justizzentrum Köln und an den übrigen Kölner Gerichten wird täglich in vielen Sprachen verhandelt. Für Anwaltsgespräche, Vernehmungen und private Termine stellen wir allgemein beeidigte Dolmetscher – und übersetzen Urteile, Beschlüsse und Schriftsätze beglaubigt.',
    highlights: ['Allgemein beeidigt', 'Straf-, Familien- und Zivilrecht', 'Vertraulich'],
    sections: [
      ['Beeidigt – was heißt das in NRW?', 'In Nordrhein-Westfalen werden Dolmetscher von den Präsidentinnen und Präsidenten der Landgerichte allgemein beeidigt und in die gemeinsame Dolmetscher- und Übersetzerdatenbank der Länder eingetragen. Sie haben geschworen, treu und gewissenhaft zu übertragen, und müssen nicht für jeden Einsatz neu vereidigt werden.'],
      ['Wann wir direkt gebucht werden', 'Im Strafverfahren zieht das Gericht selbst einen Dolmetscher hinzu, wenn eine beschuldigte Person kein Deutsch versteht. Uns buchen vor allem Anwaltskanzleien und Betroffene direkt: für Mandantengespräche, die Vorbereitung auf die Verhandlung, Vergleichsgespräche, Gutachtertermine oder Besuche nach Absprache mit der Verteidigung.',
        [{ href: '/de/gerichtsdolmetscher/', label: 'Gerichtsdolmetscher bundesweit' }]],
      ['Familiengericht und Arbeitsgericht', 'Bei Scheidung, Sorgerecht, Umgang und Unterhalt sind oft beide Seiten auf Dolmetscher angewiesen – und auf übersetzte Heirats- und Geburtsurkunden oder ausländische Urteile. Auch bei Kündigungsschutzklagen am Arbeitsgericht Köln dolmetschen wir für Arbeitnehmer und Arbeitgeber.',
        [D('scheidungsurteil-uebersetzung', 'Scheidungsurteil übersetzen'), { href: '/de/fachuebersetzungen/recht/', label: 'Juristische Übersetzungen' }]],
      interpretingPriceSection('Köln'),
      INTERPRETING_STEPS,
      digitalSection(C, DIGITAL_INTERPRETING),
    ],
    faqs: [
      ['Brauche ich einen eigenen Dolmetscher vor Gericht?', 'Für die Verhandlung im Strafverfahren lädt das Gericht in der Regel selbst einen. Für Gespräche mit Ihrer Anwältin oder Ihrem Anwalt können Sie uns direkt buchen.'],
      ['Welche Sprachen bieten Sie für Kölner Gerichte an?', 'Unter anderem Türkisch, Kurdisch, Arabisch, Polnisch, Russisch, Ukrainisch, Persisch, Rumänisch, Bulgarisch, Albanisch und Serbisch.'],
      ['Übersetzen Sie Urteile beglaubigt?', 'Ja, Urteile, Beschlüsse, Ladungen und Anklageschriften – auf Wunsch im Express.'],
      ['Wie vertraulich ist der Einsatz?', 'Vollständig. Alle Dolmetscher sind zur Verschwiegenheit verpflichtet, beeidigte zusätzlich durch ihren Eid.'],
    ],
    serviceType: 'Gerichtsdolmetscher',
  },
  {
    slug: 'dolmetscher-notar',
    eyebrow: 'Dolmetscher Notar Köln',
    title: 'Dolmetscher für Notartermine in Köln.',
    metaTitle: 'Dolmetscher Notar Köln – beeidigt | Noon',
    description: 'Dolmetscher beim Notar in Köln: beeidigte Dolmetscher für Immobilienkauf, Vollmacht, Testament und GmbH-Gründung – plus beglaubigte Übersetzung der Urkunde.',
    intro: 'Wer in Köln eine Wohnung kauft, ein Testament errichtet oder eine Gesellschaft gründet und nicht sicher Deutsch spricht, braucht beim Notar einen Dolmetscher. Wir stellen allgemein beeidigte Dolmetscher für die Beurkundung – und übersetzen die Urkunde danach auf Wunsch schriftlich.',
    highlights: ['Allgemein beeidigt', 'Für alle Kölner Notariate', 'Urkunde auch schriftlich'],
    sections: [
      ['Notare im Rheinland', 'Im Rheinland und damit auch in Köln üben Notarinnen und Notare ihr Amt hauptberuflich aus. Für die Beurkundung mit fremdsprachigen Beteiligten gilt bundesweit dasselbe: Spricht jemand nicht ausreichend Deutsch, muss die Niederschrift übersetzt werden (§ 16 Beurkundungsgesetz). Ein allgemein beeidigter Dolmetscher muss dafür nicht eigens vereidigt werden – das spart Zeit im Termin.',
        [NOTARY_GUIDE_LINK, { href: '/de/dolmetschen/notardolmetscher/', label: 'Notardolmetscher bundesweit' }]],
      ['Häufige Termine', '• Kaufvertrag für Wohnung oder Haus\n• Grundschuldbestellung für die Finanzierung\n• Testament, Erbvertrag, Erbscheinsantrag\n• General- und Vorsorgevollmacht\n• Gründung von GmbH oder UG, Gesellschafterwechsel\n• Ehevertrag'],
      ['Damit der Termin glatt läuft', 'Senden Sie uns den Urkundsentwurf einige Tage vor dem Termin. Der Dolmetscher bereitet sich auf Fachbegriffe vor und überträgt die Urkunde Satz für Satz; Ihre Fragen an den Notar werden ebenfalls gedolmetscht. Unterlagen aus dem Ausland, die das Notariat vorher braucht, übersetzen wir beglaubigt.',
        [D('vollmacht-uebersetzung', 'Vollmacht übersetzen'), D('testament-uebersetzung', 'Testament übersetzen'), APOSTILLE_LINK]],
      interpretingPriceSection('Köln'),
      digitalSection(C, DIGITAL_INTERPRETING),
    ],
    faqs: [
      ['Muss der Dolmetscher beim Notar beeidigt sein?', 'Er muss vereidigt werden, wenn er nicht allgemein beeidigt ist und die Beteiligten nicht darauf verzichten. Wir stellen deshalb allgemein beeidigte Dolmetscher.'],
      ['Wie lange dauert ein Notartermin mit Dolmetscher?', 'Etwa ein bis zwei Stunden, je nach Länge der Urkunde. Den Festpreis nennen wir vorab.'],
      ['Darf ein Angehöriger dolmetschen?', 'Das entscheidet der Notar. Bei Grundstücks- und Gesellschaftsverträgen bevorzugen Notare meist einen unabhängigen Dolmetscher.'],
      ['Übersetzen Sie die Urkunde auch für das Ausland?', 'Ja, beglaubigt und auf Wunsch zusammen mit der Apostille.'],
    ],
    serviceType: 'Notardolmetscher',
  },
  {
    slug: 'fachuebersetzungen',
    eyebrow: 'Fachübersetzungen Köln',
    title: 'Fachübersetzungen für Medien, Versicherungen und Industrie in Köln.',
    metaTitle: 'Fachübersetzungen Köln – ab 0,12 €/Wort | Noon',
    description: 'Fachübersetzungen in Köln: Recht, Versicherung, Medien, Medizin und Technik – Fachübersetzer mit Terminologie und zweiter Prüfung, ab 0,12 € pro Wort.',
    intro: 'Köln ist Medienstadt, Versicherungsstandort, Messeplatz und Industriestandort. Für Unternehmen, Kanzleien, Kliniken und Agenturen übersetzen unsere Fachübersetzer Texte, die fachlich stimmen und zur Zielgruppe passen – mit Terminologiepflege und einer zweiten Prüfung vor der Lieferung.',
    highlights: ['Fachübersetzer je Gebiet', 'Terminologie und Revision', 'Ab 0,12 € pro Wort'],
    sections: [
      ['Fachgebiete für Kölner Kunden', '• Versicherungen und Finanzen: Policen, Bedingungen, Schadensberichte, Geschäftsberichte\n• Medien und Marketing: Drehbücher, Untertitel, Pressetexte, Kampagnen, Websites\n• Recht: Verträge, AGB, Schriftsätze, Gesellschaftsunterlagen\n• Medizin: Arztbriefe, Befunde, Studienunterlagen\n• Technik und Automobil: Handbücher, Spezifikationen, Schulungsunterlagen',
        [{ href: '/de/fachuebersetzungen/wirtschaft-finanzen/', label: 'Wirtschaft & Finanzen' }, { href: '/de/fachuebersetzungen/recht/', label: 'Juristische Übersetzungen' }, { href: '/de/fachuebersetzungen/medizinische-dentalmedizin/', label: 'Medizinische Übersetzungen' }, { href: '/de/fachuebersetzungen/ingenieurwesen/', label: 'Technische Übersetzungen' }]],
      ['Texte für Menschen, nicht nur für Fachleute', 'Gerade bei Medien-, Marketing- und Versicherungstexten zählt neben der Fachsprache der Ton: Eine Kampagne soll in der Zielsprache genauso wirken wie im Original, Versicherungsbedingungen sollen verständlich bleiben. Unsere Übersetzer arbeiten in ihre Muttersprache und berücksichtigen Ihre Stilvorgaben und Glossare.'],
      ['Ablauf und Qualität', 'Sie senden die Dateien im Originalformat, wir nennen Festpreis und Liefertermin. Ein Fachübersetzer übersetzt, eine zweite Person prüft. Wiederkehrende Begriffe halten wir in Terminologielisten fest, damit alle Texte einheitlich bleiben. Ihre Unterlagen behandeln wir vertraulich.'],
      ['Preise', 'Fachübersetzungen beginnen ab 0,12 € pro Wort; der Festpreis richtet sich nach Fachgebiet, Umfang, Sprachkombination und Liefertermin. Auf Wunsch liefern wir Verträge oder Registerauszüge zusätzlich als beglaubigte Übersetzung.',
        [{ href: '/de/fachuebersetzungen/', label: 'Alle Fachgebiete' }, D('vertrag-uebersetzung', 'Vertrag übersetzen')]],
      digitalSection(C, 'Dateien senden Sie per E-Mail oder Webformular, gern mit Styleguide und Glossar; die Übersetzung erhalten Sie im Format Ihrer Vorlage.'),
    ],
    faqs: [
      ['Was kostet eine Fachübersetzung in Köln?', 'Ab 0,12 € pro Wort. Den genauen Festpreis nennen wir nach Sichtung der Unterlagen.'],
      ['Übersetzen Sie Untertitel?', 'Ja, Untertiteldateien übersetzen wir unter Beibehaltung der Zeitcodes.'],
      ['Übersetzen Sie Versicherungsbedingungen?', 'Ja, Bedingungen, Policen und Schadensunterlagen – fachlich korrekt und verständlich formuliert.'],
      ['Unterschreiben Sie eine Vertraulichkeitsvereinbarung?', 'Ja, gern vor Beginn des Auftrags.'],
    ],
    serviceType: 'Fachübersetzung',
  },
  {
    slug: 'tuerkisch',
    eyebrow: 'Türkisch Übersetzer Köln',
    title: 'Türkisch-Deutsch in Köln: beglaubigte Übersetzungen und Dolmetscher.',
    metaTitle: 'Türkisch Übersetzer Köln – beglaubigt | Noon',
    description: 'Türkisch Übersetzer in Köln: beglaubigte Übersetzungen Türkisch–Deutsch für Standesamt, Ausländerbehörde und Gericht, Dokumente für die Türkei – ab 39 €.',
    intro: 'Köln ist eines der Zentren der türkischsprachigen Gemeinschaft in Deutschland – von der Keupstraße in Mülheim bis Kalk, Ehrenfeld und Chorweiler. Seit Generationen werden hier Urkunden, Urteile und Vollmachten zwischen Deutschland und der Türkei gebraucht. Wir übersetzen sie beglaubigt in beide Richtungen und stellen Türkisch-Dolmetscher für Kölner Termine.',
    highlights: ['In beide Richtungen', 'Nüfus, Tapu, e-Devlet', 'Dolmetscher für Notar und Gericht'],
    sections: [
      ['Dokumente für Kölner Behörden', 'Für das Standesamt Köln übersetzen wir Nüfus-Auszüge und internationale Personenstandsauszüge, für die Ausländerbehörde Heirats- und Geburtsurkunden, für das Familiengericht türkische Scheidungsurteile mit Rechtskraftvermerk und für das Straßenverkehrsamt türkische Führerscheine. Namen mit Ç, Ğ, İ, Ö, Ş und Ü übernehmen wir exakt aus dem Pass.',
        [D('scheidungsurteil-uebersetzung', 'Scheidungsurteil übersetzen'), D('fuehrerschein-uebersetzung', 'Führerschein übersetzen')]],
      ['Dokumente für die Türkei', 'Wer eine Immobilie in der Türkei verkauft, ein Erbe antritt oder eine in Deutschland geschlossene Ehe in der Türkei eintragen lässt, braucht deutsche Dokumente auf Türkisch: Heiratsurkunden, Geburtsurkunden der Kinder, Erbscheine, notarielle Vollmachten oder Scheidungsbeschlüsse. Deutsche öffentliche Urkunden brauchen für die Türkei in der Regel eine Apostille; die Übersetzung fertigen wir danach an.',
        [D('vollmacht-uebersetzung', 'Vollmacht übersetzen'), APOSTILLE_LINK]],
      ['Türkisch-Dolmetscher in Köln', 'Für Notar, Standesamt, Gericht, Ämter und Arzttermine stellen wir Türkisch-Dolmetscher, auf Wunsch allgemein beeidigt. Auf Anfrage dolmetschen wir auch Kurdisch (Kurmanci).',
        [L('dolmetscher', 'Dolmetscher Köln'), { href: '/de/sprachen/tuerkisch/', label: 'Türkisch bundesweit' }]],
      translationPriceSection('Köln'),
      digitalSection(C, DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Übersetzen Sie türkische Scheidungsurteile für das Familiengericht Köln?', 'Ja, mit Rechtskraftvermerk und allen Stempeln – beglaubigt.'],
      ['Übersetzen Sie deutsche Urkunden für das türkische Konsulat?', 'Ja, zum Beispiel Heirats- und Geburtsurkunden für die Eintragung in das türkische Personenstandsregister.'],
      ['Was kostet eine Türkisch-Übersetzung in Köln?', 'Standarddokumente beginnen ab 39 €. Den Festpreis nennen wir vorab.'],
    ],
    serviceType: 'Türkisch Übersetzung',
  },
  {
    slug: 'arabisch',
    eyebrow: 'Arabisch Übersetzer Köln',
    title: 'Arabisch-Deutsch in Köln: Urkunden, Zeugnisse und Dolmetscher.',
    metaTitle: 'Arabisch Übersetzer Köln – beglaubigt | Noon',
    description: 'Arabisch Übersetzer in Köln: beglaubigte Übersetzungen für Amt, Standesamt und Uni – Dolmetscher für syrischen, irakischen und marokkanischen Dialekt.',
    intro: 'Viele Kölnerinnen und Kölner haben Wurzeln in Syrien, dem Irak, Marokko, dem Libanon oder Ägypten. Für Einbürgerung, Hochzeit, Studium und Beruf brauchen sie ihre arabischen Dokumente auf Deutsch. Wir übersetzen sie beglaubigt und stellen Dolmetscher, die Ihren Dialekt verstehen.',
    highlights: ['Alle arabischen Länder', 'Für Einbürgerung und Studium', 'Dolmetscher mit Dialekt'],
    sections: [
      ['Für die Einbürgerung in Köln', 'Für einen Einbürgerungsantrag verlangt die Stadt Köln je nach Fall Geburts- und Heiratsurkunden, Nachweise zur Identität und gegebenenfalls Unterlagen zu Kindern – ausländische Dokumente als beglaubigte Übersetzung. Senden Sie uns die Liste aus Ihrer Einladung oder Ihrem Antrag; wir übersetzen alle Dokumente mit derselben Namensschreibweise.',
        [{ href: '/de/ratgeber/einbuergerung-dokumente/', label: 'Einbürgerung: Dokumente' }]],
      ['Zeugnisse für Universität und Anerkennung', 'Schul- und Universitätszeugnisse, Notenübersichten und Diplome aus arabischsprachigen Ländern übersetzen wir für die Bewerbung an der Universität zu Köln und der TH Köln sowie für die Anerkennung von Berufsabschlüssen – mit allen Fächern, Noten und Stempeln.',
        [D('zeugnis-uebersetzung', 'Zeugnis übersetzen'), { href: '/de/ratgeber/anerkennung-auslaendischer-abschluesse/', label: 'Anerkennung ausländischer Abschlüsse' }]],
      ['Arabisch-Dolmetscher in Köln', 'Für Ausländerbehörde, Standesamt, Jobcenter, Schule, Klinik und Gericht stellen wir Arabisch-Dolmetscher – mit syrischem, irakischem, libanesischem, ägyptischem oder marokkanischem Dialekt, auf Wunsch beeidigt.',
        [L('dolmetscher', 'Dolmetscher Köln'), { href: '/de/sprachen/arabisch/', label: 'Arabisch bundesweit' }]],
      translationPriceSection('Köln'),
      digitalSection(C, DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Übersetzen Sie syrische Familienbuchauszüge?', 'Ja, vollständig und beglaubigt – mit allen Einträgen und Stempeln.'],
      ['Wie schreiben Sie arabische Namen?', 'Wie in Ihrem Reisepass. Ohne Pass verwenden wir eine einheitliche Umschrift für alle Dokumente.'],
      ['Was kostet eine Arabisch-Übersetzung in Köln?', 'Standarddokumente beginnen ab 39 €. Den Festpreis nennen wir vorab.'],
      ['Übersetzen Sie auch ins Arabische?', 'Ja, deutsche Urkunden und Zeugnisse übersetzen wir beglaubigt ins Arabische, etwa für Behörden in Ihrem Herkunftsland.'],
    ],
    serviceType: 'Arabisch Übersetzung',
  },
  {
    slug: 'polnisch',
    eyebrow: 'Polnisch Übersetzer Köln',
    title: 'Polnisch-Deutsch in Köln: beglaubigte Übersetzungen und Dolmetscher.',
    metaTitle: 'Polnisch Übersetzer Köln – beglaubigt | Noon',
    description: 'Polnisch Übersetzer in Köln: beglaubigte Übersetzungen von Urkunden, Zeugnissen und Rentenunterlagen, Dolmetscher für Notar und Gericht – ab 39 €.',
    intro: 'Polnisch gehört in Köln und ganz Nordrhein-Westfalen zu den meistgesprochenen Sprachen nach Deutsch. Wir übersetzen polnische Urkunden, Zeugnisse und Bescheinigungen beglaubigt ins Deutsche, deutsche Dokumente für polnische Behörden ins Polnische und stellen Polnisch-Dolmetscher für Kölner Termine.',
    highlights: ['In beide Richtungen', 'Urkunden, Zeugnisse, Rente', 'Polnische Sonderzeichen korrekt'],
    sections: [
      ['Polnische Urkunden', 'Polnische Standesämter stellen Urkunden als vollständige Abschrift (odpis zupełny) oder als Kurzabschrift (odpis skrócony) aus, für viele Zwecke auch als mehrsprachigen Auszug. Welche Form die Kölner Stelle verlangt und ob ein mehrsprachiges Formular reicht, erfahren Sie dort – alles andere übersetzen wir beglaubigt. Namen mit ą, ć, ę, ł, ń, ó, ś, ź und ż übernehmen wir genau wie im Ausweis.',
        [D('geburtsurkunde-uebersetzung', 'Geburtsurkunde übersetzen'), D('heiratsurkunde-uebersetzung', 'Heiratsurkunde übersetzen')]],
      ['Rente, Kindergeld, Arbeit', 'Wer in Polen und Deutschland gearbeitet hat, braucht für Rente und Kindergeld oft Nachweise aus beiden Ländern: Arbeitsbescheinigungen (świadectwo pracy), Versicherungsnachweise, Bescheide der polnischen Sozialversicherung ZUS und Schulbescheinigungen der Kinder. Wir übersetzen sie vollständig und mit einheitlicher Namensschreibweise.'],
      ['Polnisch-Dolmetscher in Köln', 'Für Notartermine, Gerichtsverhandlungen, Standesamt, Arbeitgeber und Arztgespräche stellen wir Polnisch-Dolmetscher, auf Wunsch allgemein beeidigt. Deutsche Dokumente – etwa Heiratsurkunden, Urteile oder Vollmachten – übersetzen wir beglaubigt ins Polnische.',
        [L('dolmetscher-notar', 'Dolmetscher Notar Köln'), { href: '/de/sprachen/polnisch/', label: 'Polnisch bundesweit' }]],
      translationPriceSection('Köln'),
      digitalSection(C, DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Brauche ich für polnische Urkunden eine Apostille?', 'Für viele öffentliche Urkunden aus EU-Staaten nicht. Ob die Kölner Stelle eine Übersetzung oder ein mehrsprachiges Formular verlangt, sagt sie Ihnen.'],
      ['Übersetzen Sie Unterlagen der ZUS?', 'Ja, Bescheide und Versicherungsnachweise der polnischen Sozialversicherung – beglaubigt.'],
      ['Was kostet eine Polnisch-Übersetzung in Köln?', 'Standarddokumente beginnen ab 39 €. Den Festpreis nennen wir vorab.'],
    ],
    serviceType: 'Polnisch Übersetzung',
  },
];

// Second pass (audit minimum of 400 words): page-specific sections and FAQs.
const MORE = {
  gerichtsdolmetscher: {
    sections: [['Lange Verhandlungstage', 'Geben Sie uns, soweit zulässig, vorab Aktenzeichen, Verfahrensart und die wichtigsten Schriftstücke. Dann kennt der Dolmetscher Namen und Fachbegriffe bereits vor Beginn. Für ganztägige Verhandlungen planen wir Pausen oder ein Team aus zwei Dolmetschern ein, damit die Qualität bis zum letzten Satz stimmt.']],
  },
  'dolmetscher-notar': {
    sections: [['Wohnungskauf mit Finanzierung', 'Beim Wohnungskauf in Köln gibt es oft zwei Beurkundungen: den Kaufvertrag und die Grundschuld für die finanzierende Bank. Für beide stellen wir auf Wunsch dieselbe Person, die Ihren Fall bereits kennt. Brauchen Sie die Urkunden später in Ihrer Sprache – etwa für Familie oder Steuerberatung im Ausland –, übersetzen wir sie schriftlich.']],
    faqs: [['Kann der Dolmetscher per Video zugeschaltet werden?', 'Ob das zulässig ist, entscheidet der Notar. Für Beurkundungen ist ein Dolmetscher vor Ort üblich.']],
  },
  fachuebersetzungen: {
    sections: [
      ['Branchen in Köln', 'Zu unseren Kunden gehören Versicherer und Makler, Produktionsfirmen und Agenturen, Kanzleien, Kliniken, Automobilzulieferer, Messeaussteller und Verbände. Manche brauchen einmal im Jahr einen Geschäftsbericht, andere jede Woche neue Inhalte für Website und soziale Medien. Für wiederkehrende Aufträge vereinbaren wir feste Abläufe, Ansprechpartner und Glossare.'],
      ['Mehrsprachige Websites', 'Für Websites und Online-Shops übersetzen wir Seiten, Produkttexte und Metadaten so, dass sie in der Zielsprache natürlich klingen und gefunden werden. Wir arbeiten mit Exporten aus gängigen Content-Management-Systemen und liefern die Übersetzung im selben Format zurück.',
        [{ href: '/de/fachuebersetzungen/it-software/', label: 'IT- und Website-Übersetzungen' }]],
    ],
    faqs: [
      ['Übersetzen Sie Pressemitteilungen kurzfristig?', 'Ja, kurze Texte oft noch am selben Tag – sprechen Sie uns mit Ihrem Termin an.'],
      ['Welche Sprachen bieten Sie für Fachübersetzungen?', 'Alle gängigen europäischen Sprachen sowie Arabisch, Türkisch, Persisch, Russisch, Ukrainisch und viele weitere – fragen Sie nach Ihrer Kombination.'],
    ],
  },
  tuerkisch: {
    sections: [['Internationaler Auszug statt Übersetzung?', 'Für Geburt, Heirat und Tod geben türkische Standesämter auf Antrag auch einen mehrsprachigen internationalen Auszug (Formül A) heraus. Akzeptiert das Standesamt Köln diesen Auszug, entfällt dafür die Übersetzung. Registerauszüge, Urteile, Zeugnisse und Führerscheine müssen dagegen weiterhin beglaubigt übersetzt werden – im Zweifel fragen Sie vorher beim Standesamt nach.']],
    faqs: [['Dolmetschen Sie auch Kurdisch?', 'Auf Anfrage Kurmanci. Nennen Sie uns bei der Buchung die gesprochene Variante.']],
  },
  arabisch: {
    sections: [['Beglaubigungen auf arabischen Urkunden', 'Viele Urkunden aus arabischsprachigen Ländern tragen Beglaubigungen des Außenministeriums und der deutschen Auslandsvertretung. Auch diese Vermerke übersetzen wir vollständig, dazu Randnotizen und handschriftliche Ergänzungen, soweit lesbar. Bei Staaten, die dem Apostilleübereinkommen beigetreten sind, kann eine Apostille an die Stelle der Legalisation treten.',
      [APOSTILLE_LINK]]],
    faqs: [['Übersetzen Sie Führerscheine aus Syrien oder dem Irak?', 'Ja, für die Umschreibung beim Straßenverkehrsamt Köln – vollständig mit Vorder- und Rückseite.']],
  },
  polnisch: {
    sections: [['Nachlass und Immobilien in Polen', 'Wenn Kölner Familien eine Wohnung oder ein Grundstück in Polen erben oder verkaufen, verlangen polnische Notare und Gerichte häufig deutsche Erbscheine, Sterbeurkunden und Vollmachten auf Polnisch. In grenzüberschreitenden Erbfällen innerhalb der EU kann zudem ein Europäisches Nachlasszeugnis helfen. Klären Sie vorab mit dem polnischen Notar, welche Dokumente er braucht, und senden Sie uns die Liste.',
      [D('testament-uebersetzung', 'Testament und Erbschein übersetzen')]]],
    faqs: [['Übersetzen Sie Schulzeugnisse aus Polen?', 'Ja, Zeugnisse (świadectwo) und Abschlüsse für Schule, Ausbildung und Hochschule – beglaubigt.']],
  },
};

export const KOELN_PAGES = withMore(BASE_PAGES, MORE);
