// Germany-wide guide pages (plan v4, wave 1): the questions people add most often to
// "beglaubigte Übersetzung" in Google (Kosten, Dauer, Notar, Apostille).
// Facts are kept general; the receiving office always decides what it requires.
import {
  APOSTILLE_LINK, CERTIFIED_LINK, DOCUMENT_LINKS, DURATION_LINK, FAQ_DIGITAL, NOTARY_GUIDE_LINK, PRICE_LINK, QUOTE_LINK,
} from './shared.js';

const EXPRESS_LINK = { href: '/de/express-uebersetzung/', label: 'Express-Übersetzung am selben Tag' };
const PRICES_LINK = { href: '/preise/', label: 'Preisübersicht' };
const NOTARY_INTERPRETER_LINK = { href: '/de/dolmetschen/notardolmetscher/', label: 'Notardolmetscher' };

export const GUIDE_PAGES = [
  {
    slug: 'beglaubigte-uebersetzung-kosten',
    eyebrow: 'Beglaubigte Übersetzung Kosten',
    title: 'Was kostet eine beglaubigte Übersetzung?',
    metaTitle: 'Beglaubigte Übersetzung Kosten – Preise 2026 | Noon',
    description: 'Was kostet eine beglaubigte Übersetzung? Preise pro Dokument ab 39 €, was den Preis bestimmt, Express-Aufpreis, Normzeile vs. Pauschale – verständlich erklärt.',
    intro: 'Die Kosten einer beglaubigten Übersetzung hängen vor allem vom Dokument, von der Sprache und von der Lieferzeit ab. Hier erklären wir, wie Übersetzungsbüros Preise berechnen, was eine Geburtsurkunde oder ein Führerschein bei uns kostet und wie Sie unnötige Kosten vermeiden.',
    highlights: ['Ab 39 € pro Dokument', 'Festpreis vorab', 'Ohne versteckte Kosten'],
    sections: [
      ['Unsere Preise für Standarddokumente', 'Für kurze, typische Dokumente berechnen wir einen Festpreis pro Dokument – ab 39 €. Dazu zählen zum Beispiel:\n• Geburtsurkunde, Heiratsurkunde, Sterbeurkunde\n• Ledigkeitsbescheinigung und Meldebescheinigung\n• Führerschein\n• Schulzeugnis und einseitige Bescheinigungen\n\nDer genaue Preis hängt von Sprache, Umfang und Lesbarkeit ab. Senden Sie uns ein Foto oder einen Scan – Sie erhalten den Festpreis kostenlos und unverbindlich, bevor wir beginnen.',
        [...DOCUMENT_LINKS.slice(0, 4), PRICES_LINK]],
      ['Was den Preis bestimmt', '• Umfang: Eine einseitige Urkunde kostet weniger als ein mehrseitiges Urteil oder ein Diplom mit Notenanlage.\n• Sprache: Häufige Sprachen wie Englisch, Arabisch, Türkisch oder Russisch sind meist günstiger als seltene Sprachkombinationen.\n• Lesbarkeit: Handschriftliche Einträge, schlechte Kopien oder viele Stempel bedeuten mehr Aufwand.\n• Lieferzeit: Express am selben Tag kostet einen Aufpreis, den wir vorab nennen.\n• Versand: Die PDF ist im Preis enthalten; das gestempelte Original kommt per Post.'],
      ['Pauschale oder Normzeile?', 'Viele Büros rechnen Urkunden pauschal pro Dokument ab, längere Texte nach Normzeilen (55 Anschläge) oder nach Wörtern. Gerichte und Behörden vergüten Übersetzungen, die sie selbst in Auftrag geben, nach dem Justizvergütungsgesetz (JVEG) pro Normzeile – für private Aufträge ist das aber keine Preisvorgabe. Bei uns gilt: Standarddokumente zum Festpreis, umfangreiche Dokumente nach Umfang – immer mit Angebot vorab.'],
      ['So sparen Sie Kosten', '• Mehrere Dokumente zusammen anfragen – das ist meist günstiger als einzeln.\n• Vorher bei der Stelle klären, welche Dokumente wirklich übersetzt werden müssen.\n• Gut lesbare Fotos oder Scans senden.\n• Express nur wählen, wenn der Termin es wirklich verlangt.\n• Prüfen, ob für Urkunden aus EU-Staaten ein mehrsprachiges Formular reicht – dann ist manchmal gar keine Übersetzung nötig.',
        [DURATION_LINK, EXPRESS_LINK]],
      ['Angebot anfordern', 'Senden Sie uns Ihr Dokument per WhatsApp, E-Mail oder Formular. Wir nennen Ihnen Festpreis und Lieferzeit – kostenlos und unverbindlich.', [QUOTE_LINK, CERTIFIED_LINK]],
    ],
    faqs: [
      ['Was kostet die beglaubigte Übersetzung einer Geburtsurkunde?', 'Bei uns ab 39 €. Den Festpreis für Ihre Urkunde und Sprache nennen wir vorab.'],
      ['Wie viel kostet eine Übersetzung pro Seite?', 'Urkunden berechnen wir meist pauschal pro Dokument. Bei längeren Texten richtet sich der Preis nach Umfang, Sprache und Fachgebiet.'],
      ['Ist die PDF im Preis enthalten?', 'Ja. Das gestempelte Original per Post ist ebenfalls inklusive, sofern nicht anders vereinbart.'],
      ['Gibt es versteckte Kosten?', 'Nein. Sie erhalten vorab einen Festpreis, der für den vereinbarten Umfang gilt.'],
      FAQ_DIGITAL,
    ],
    serviceType: 'Beglaubigte Übersetzung',
  },
  {
    slug: 'beglaubigte-uebersetzung-dauer',
    eyebrow: 'Beglaubigte Übersetzung Dauer',
    title: 'Wie lange dauert eine beglaubigte Übersetzung?',
    metaTitle: 'Wie lange dauert eine beglaubigte Übersetzung? | Noon',
    description: 'Wie lange dauert eine beglaubigte Übersetzung? In der Regel 2–3 Werktage, im Express am selben Tag. Was den Ablauf verzögert und wie Sie Zeit sparen.',
    intro: 'Termin bei der Ausländerbehörde, Anmeldung beim Standesamt oder Bewerbungsfrist: Oft zählt jeder Tag. Bei uns ist eine beglaubigte Übersetzung in der Regel in 2–3 Werktagen fertig, im Express am selben Tag. Hier erfahren Sie, wovon die Dauer abhängt und wie Sie Zeit sparen.',
    highlights: ['Standard 2–3 Werktage', 'Express am selben Tag', 'PDF sofort, Original per Post'],
    sections: [
      ['Typische Bearbeitungszeiten', '• Standarddokumente (Geburtsurkunde, Führerschein, Ledigkeitsbescheinigung): 2–3 Werktage\n• Express: am selben Tag, meist innerhalb von 4–5 Stunden\n• Mehrseitige Dokumente wie Urteile oder Diplome mit Anlagen: je nach Umfang einige Werktage mehr\n• Postversand des gestempelten Originals: zusätzlich 1–3 Tage innerhalb Deutschlands',
        [EXPRESS_LINK]],
      ['Was den Ablauf verzögert', '• Unleserliche Fotos oder abgeschnittene Seiten – dann müssen wir nachfragen.\n• Unklare Schreibweise von Namen – senden Sie am besten eine Kopie Ihres Reisepasses mit.\n• Seltene Sprachen oder sehr fachliche Texte.\n• Zusätzliche Schritte wie Apostille oder Legalisation, die bei anderen Stellen beantragt werden.\n• Rückfragen der empfangenden Stelle zu Form oder Umfang.',
        [APOSTILLE_LINK]],
      ['PDF oder Original – was brauchen Sie wann?', 'Die PDF erhalten Sie sofort nach Fertigstellung per E-Mail. Viele Stellen akzeptieren sie für den ersten Termin oder für Online-Anträge. Das Original mit Stempel und Unterschrift kommt per Post. Fragen Sie bei Ihrer Stelle nach, ob sie das Original sehen möchte – dann planen Sie die Postlaufzeit ein.'],
      ['So geht es am schnellsten', '1. Dokument vollständig und gut lesbar fotografieren oder scannen.\n2. Passkopie für die Schreibweise der Namen mitsenden.\n3. Den Termin nennen, bis wann Sie die Übersetzung brauchen.\n4. Angebot früh am Tag bestätigen – dann ist auch der Express am selben Tag möglich.',
        [QUOTE_LINK, PRICE_LINK]],
    ],
    faqs: [
      ['Kann ich eine beglaubigte Übersetzung sofort bekommen?', 'Im Express am selben Tag, meist innerhalb von 4–5 Stunden – wenn wir das Dokument früh am Tag erhalten.'],
      ['Wird am Wochenende übersetzt?', 'Fragen Sie uns gern an – telefonisch sind wir rund um die Uhr erreichbar, und wir prüfen, was möglich ist.'],
      ['Wie lange dauert der Postversand?', 'Innerhalb Deutschlands meist 1–3 Tage nach Fertigstellung.'],
      ['Ist die PDF schon gültig?', 'Viele Stellen akzeptieren sie für den ersten Schritt; das Original kommt per Post nach.'],
    ],
    serviceType: 'Beglaubigte Übersetzung',
  },
  {
    slug: 'notar-oder-beglaubigte-uebersetzung',
    eyebrow: 'Notar oder beglaubigte Übersetzung',
    title: 'Notar oder beglaubigte Übersetzung – was brauchen Sie?',
    metaTitle: 'Kann ein Notar eine Übersetzung beglaubigen? | Noon',
    description: 'Kann ein Notar eine Übersetzung beglaubigen? Unterschied zwischen beglaubigter Übersetzung, notarieller Beglaubigung und Apostille – und was deutsche Behörden verlangen.',
    intro: '„Beglaubigt“ kann in Deutschland zwei verschiedene Dinge bedeuten: die beglaubigte Übersetzung durch einen gerichtlich ermächtigten Übersetzer – und die notarielle Beglaubigung einer Unterschrift oder Kopie. Wir erklären den Unterschied, damit Sie genau das bestellen, was Ihre Stelle verlangt.',
    highlights: ['Einfach erklärt', 'Für Behörden in Deutschland', 'Und für das Ausland'],
    sections: [
      ['Die beglaubigte Übersetzung', 'Eine beglaubigte Übersetzung fertigt ein Übersetzer an, den ein Landgericht für seine Sprache ermächtigt, vereidigt oder beeidigt hat. Er bestätigt mit Vermerk, Unterschrift und Stempel, dass die Übersetzung vollständig und richtig ist. Für deutsche Behörden, Standesämter, Gerichte und Hochschulen ist das in aller Regel genau die Form, die verlangt wird – ein Notar ist dafür nicht nötig.',
        [CERTIFIED_LINK, PRICE_LINK]],
      ['Was ein Notar beglaubigt', 'Ein Notar prüft nicht, ob eine Übersetzung richtig ist. Er beglaubigt Unterschriften (z. B. unter einer Vollmacht) oder bestätigt, dass eine Kopie mit dem Original übereinstimmt. Manche Länder verlangen für Dokumente aus Deutschland zusätzlich, dass die Unterschrift des Übersetzers notariell beglaubigt wird – das nennt man oft „notariell beglaubigte Übersetzung“.',
        [NOTARY_INTERPRETER_LINK]],
      ['Und die Apostille?', 'Die Apostille bestätigt die Echtheit einer öffentlichen Urkunde für die Verwendung in einem anderen Staat des Haager Übereinkommens. Sie wird von einer staatlichen Stelle ausgestellt – nicht vom Übersetzer und nicht vom Notar selbst. Für Staaten außerhalb des Abkommens tritt an ihre Stelle die Legalisation durch die Botschaft.',
        [APOSTILLE_LINK]],
      ['Was brauche ich wofür? Eine Übersicht', '• Dokument aus dem Ausland für eine deutsche Behörde: beglaubigte Übersetzung; je nach Land vorher Apostille oder Legalisation auf dem Original.\n• Deutsches Dokument für eine Behörde im Ausland: meist Apostille oder Legalisation auf der deutschen Urkunde und eine beglaubigte Übersetzung; manche Länder verlangen zusätzlich die notarielle Beglaubigung der Übersetzerunterschrift.\n• Vertrag oder Vollmacht beim Notar ohne ausreichende Deutschkenntnisse: Dolmetscher bei der Beurkundung, danach auf Wunsch schriftliche Übersetzung.\n\nIm Zweifel fragen Sie die Stelle, die das Dokument verlangt – oder uns. Wir sagen Ihnen, welche Schritte üblich sind.',
        [QUOTE_LINK]],
    ],
    faqs: [
      ['Kann ein Notar eine Übersetzung beglaubigen?', 'Ein Notar kann die Unterschrift des Übersetzers beglaubigen, aber nicht die Richtigkeit der Übersetzung bestätigen. Das macht der ermächtigte Übersetzer.'],
      ['Akzeptieren deutsche Behörden Übersetzungen ohne Notar?', 'Ja. Für deutsche Stellen reicht in der Regel die beglaubigte Übersetzung eines ermächtigten Übersetzers.'],
      ['Was ist eine notariell beglaubigte Übersetzung?', 'Eine beglaubigte Übersetzung, bei der zusätzlich ein Notar die Unterschrift des Übersetzers beglaubigt – das verlangen manche Länder für deutsche Dokumente.'],
      ['Wer stellt die Apostille aus?', 'Eine staatliche Stelle im Land, in dem die Urkunde ausgestellt wurde – in Deutschland je nach Dokument z. B. Landgericht oder eine Landesbehörde.'],
    ],
    serviceType: 'Beglaubigte Übersetzung',
  },
  {
    slug: 'apostille',
    eyebrow: 'Apostille',
    title: 'Apostille und Legalisation – einfach erklärt.',
    metaTitle: 'Apostille – beantragen, übersetzen, Legalisation | Noon',
    description: 'Was ist eine Apostille, wo wird sie beantragt und muss sie übersetzt werden? Apostille und Legalisation für ausländische und deutsche Urkunden einfach erklärt.',
    intro: 'Eine Apostille bestätigt, dass eine öffentliche Urkunde echt ist – damit sie in einem anderen Land anerkannt wird. Ob Ihre Urkunde eine Apostille, eine Legalisation oder keines von beidem braucht, hängt vom Ausstellungsland, vom Zielland und von der Stelle ab, die das Dokument verlangt. Hier finden Sie die wichtigsten Regeln.',
    highlights: ['Haager Übereinkommen', 'Legalisation', 'Übersetzung inklusive Apostille'],
    sections: [
      ['Was ist eine Apostille?', 'Die Apostille ist ein standardisierter Echtheitsvermerk nach dem Haager Übereinkommen von 1961. Sie bestätigt die Unterschrift, die Funktion des Unterzeichners und das Siegel einer öffentlichen Urkunde – zum Beispiel einer Geburtsurkunde, eines Gerichtsurteils oder einer notariellen Urkunde. Über 120 Staaten sind dem Abkommen beigetreten, darunter die Türkei, Russland, die Ukraine, die USA und alle EU-Staaten.'],
      ['Apostille, Legalisation oder gar nichts?', '• Vertragsstaat des Haager Übereinkommens: Apostille vom Ausstellungsland.\n• Kein Vertragsstaat: Legalisation – die Urkunde wird von der Botschaft oder dem Konsulat des Ziellandes bestätigt, oft nach Vorbeglaubigung im Ausstellungsland.\n• Öffentliche Urkunden zwischen EU-Staaten: Für viele Urkunden (z. B. Geburt, Ehe, Namensführung) entfällt nach der EU-Verordnung 2016/1191 die Apostille; mehrsprachige Formulare können sogar die Übersetzung ersetzen.\n• Bilaterale Abkommen: Mit einigen Staaten gelten besondere Erleichterungen.\n\nWas im Einzelfall gilt, entscheidet die Stelle, bei der Sie die Urkunde vorlegen.'],
      ['Wo beantrage ich eine Apostille für deutsche Urkunden?', 'Zuständig ist die Stelle, die für die jeweilige Urkunde vorgesehen ist – je nach Bundesland und Art des Dokuments zum Beispiel das Landgericht (für notarielle und gerichtliche Urkunden), eine Landesbehörde wie Regierungspräsidium oder Bezirksregierung (für Personenstandsurkunden) oder das Bundesamt für Justiz für bestimmte Bundesurkunden. Ihr Standesamt oder Notar sagt Ihnen, wohin Sie die Urkunde schicken.'],
      ['Muss die Apostille mit übersetzt werden?', 'Ja, in der Regel. Die Apostille gehört zur Urkunde und wird in der beglaubigten Übersetzung mit übersetzt. Wichtig ist die Reihenfolge: Zuerst kommt die Apostille auf das Original, danach wird alles zusammen übersetzt. Manche Zielländer verlangen auch für die Übersetzung selbst eine Apostille – das klären wir gern mit Ihnen vorab.',
        [CERTIFIED_LINK, PRICE_LINK, NOTARY_GUIDE_LINK]],
      ['Wir übersetzen Ihre Urkunde samt Apostille', 'Senden Sie uns ein gut lesbares Foto oder einen Scan der Urkunde mit Apostille oder Legalisation. Sie erhalten vorab einen Festpreis; die beglaubigte Übersetzung kommt als PDF und per Post – im Express am selben Tag.',
        [QUOTE_LINK, EXPRESS_LINK]],
    ],
    faqs: [
      ['Brauche ich für jede ausländische Urkunde eine Apostille?', 'Nein. Ob eine Apostille oder Legalisation nötig ist, hängt vom Ausstellungsland und von der Stelle ab, die die Urkunde verlangt. Für viele Urkunden aus EU-Staaten entfällt sie.'],
      ['Stellt das Übersetzungsbüro die Apostille aus?', 'Nein. Die Apostille stellt eine staatliche Stelle im Ausstellungsland aus. Wir übersetzen die Urkunde einschließlich Apostille.'],
      ['Was ist der Unterschied zwischen Apostille und Legalisation?', 'Die Apostille gilt zwischen Staaten des Haager Übereinkommens. Für andere Staaten bestätigt die Botschaft des Ziellandes die Urkunde – das ist die Legalisation.'],
      ['Wie lange dauert eine Apostille?', 'Das hängt von der ausstellenden Stelle ab – oft wenige Tage bis einige Wochen. Planen Sie die Zeit vor der Übersetzung ein.'],
    ],
    serviceType: 'Apostille Übersetzung',
  },
];
