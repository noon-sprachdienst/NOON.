// The 20 English service-area city pages (/en/locations/<city>) were 161–171 words of the
// same template (76 % overlap). Each now gets its own intro, a local section and a local
// FAQ, plus a link to the nearest office. Applied by path like FOREIGN_UPGRADES; no new URLs.
const OFFICE = {
  osnabrueck: 'Osnabrück',
  stuttgart: 'Stuttgart',
  berlin: 'Berlin',
  bielefeld: 'Bielefeld',
  mainz: 'Mainz',
  kiel: 'Kiel',
};
const DE = (slug, label) => ({ href: `/de/${slug}/`, label: `${label} (DE)` });

const AREAS = {
  hamburg: ['Hamburg', 'kiel', {
    intro: 'Certified translations and interpreters for Hamburg: our court-authorised translators translate your documents into German for the Hamburg Welcome Center, the registry offices of the seven districts, courts and universities – fully online, with delivery as PDF and by post anywhere in Hamburg.',
    local: ['Hamburg: port, trade and many languages', 'Hamburg is a port and trading city with people from more than 180 nations, and the requests we receive reflect that. Seafarers and logistics staff need certificates of competency and employment references; families need civil-status documents for the registry offices from Altona to Wandsbek; companies need customs papers, freight contracts and commercial register extracts for partners overseas. For Hamburg we translate especially often from Persian, Turkish, Arabic, Polish and Russian. Clients in Norderstedt, Pinneberg and Harburg order just as digitally as those in the city centre.', [DE('handelsregisterauszug-uebersetzung', 'Handelsregisterauszug übersetzen')]],
    faq: ['Do you translate seafarers’ certificates for Hamburg?', 'Yes – certificates of competency, discharge books and employment references, certified for German authorities and employers.'],
  }],
  koeln: ['Cologne', 'bielefeld', {
    intro: 'Translation services for Cologne (Köln): certified translations for the Ausländeramt, the registry office, the University of Cologne and TH Köln, specialist translations for media and industry, and interpreters for appointments in Cologne and the surrounding Rhineland.',
    local: ['Cologne: studies, media and family documents', 'Many requests from Cologne come from students and researchers at the University of Cologne and TH Köln who need school-leaving certificates, degrees and transcripts for admission or recognition. Media and production companies ask for contracts, scripts and subtitles; manufacturers in the region need technical documentation. Families from the large Turkish, Arabic and Polish-speaking communities need birth and marriage certificates for the registry office and for naturalisation. Clients in Leverkusen, Bergisch Gladbach and Hürth order online.', [DE('diplom-uebersetzung', 'Diplom übersetzen')]],
    faq: ['Do you translate degrees for the University of Cologne?', 'Yes – degrees, transcripts and school-leaving certificates, certified and in the format the university requires.'],
  }],
  muenchen: ['Munich', 'stuttgart', {
    intro: 'Translation services for Munich (München): certified translations for the Kreisverwaltungsreferat (KVR), the registry office, LMU and TUM, and interpreters for notaries, courts and business meetings – ordered online, delivered as PDF and by post.',
    local: ['Munich: international professionals and the KVR', 'Munich attracts engineers, IT specialists and researchers from all over the world. For the Blue Card, residence permits and family reunification at the KVR they need degrees, employment contracts and civil-status documents in German. Students at LMU and TUM need transcripts for admission; companies in automotive, insurance and technology need contracts and technical documents. Buying property in Munich usually involves a notary appointment – we provide sworn interpreters. Clients in Freising, Dachau and Starnberg order online.', [DE('ratgeber/familiennachzug-dokumente', 'Familiennachzug: Dokumente')]],
    faq: ['Can you translate documents for a Blue Card application in Munich?', 'Yes – degrees, employment contracts and certificates, certified and accepted by the KVR.'],
  }],
  'frankfurt-am-main': ['Frankfurt', 'mainz', {
    intro: 'Translation services for Frankfurt am Main: certified translations for the immigration office, registry office and Goethe University, financial and legal translations for banks and companies, and interpreters – from our nearby Mainz office or fully online.',
    local: ['Frankfurt: finance, aviation and international families', 'As a financial centre with the ECB, many banks and one of Europe’s largest airports, Frankfurt needs translations of annual reports, contracts, compliance documents and powers of attorney – often between English and German. International employees need certificates for the immigration office and degrees for recognition; students at Goethe University need transcripts. Families from more than 170 nations ask for birth and marriage certificates for the registry office. Clients in Offenbach, Bad Homburg and Eschborn order online.', [DE('fachuebersetzungen/wirtschaft-finanzen', 'Fachübersetzung Wirtschaft und Finanzen')]],
    faq: ['Do you translate financial documents in Frankfurt?', 'Yes – annual reports, contracts and compliance documents, by specialist translators with a second review.'],
  }],
  duesseldorf: ['Düsseldorf', 'bielefeld', {
    intro: 'Translation services for Düsseldorf: certified translations for the immigration office, the registry office and Heinrich Heine University, translations for trade-fair exhibitors and international companies, and interpreters in the NRW state capital.',
    local: ['Düsseldorf: trade fairs, Japanese companies and state authorities', 'Düsseldorf is the capital of North Rhine-Westphalia, a major trade-fair city and home to one of Europe’s largest Japanese business communities. Companies need contracts, product documentation and fair materials; employees relocating to Düsseldorf need certificates and degrees in German. As the seat of the state government and higher courts, Düsseldorf also generates many requests for court documents and sworn interpreters. Clients in Neuss, Ratingen and Mettmann order online.', [DE('gerichtsdolmetscher', 'Gerichtsdolmetscher')]],
    faq: ['Can you provide interpreters for Messe Düsseldorf?', 'Yes – consecutive interpreters for meetings at the stand and simultaneous interpreters for presentations.'],
  }],
  dortmund: ['Dortmund', 'bielefeld', {
    intro: 'Translation services for Dortmund: certified translations for the immigration office, registry office, Jobcenter and TU Dortmund, and interpreters for authorities, doctors and courts in Dortmund and the eastern Ruhr area.',
    local: ['Dortmund: logistics, technology and many languages', 'Dortmund has changed from coal and steel to logistics, technology and science. Students at TU Dortmund and the University of Applied Sciences need transcripts and degrees; logistics and IT employees need employment references and qualifications. Families from Turkey, Poland, Syria and Eastern Europe need birth and marriage certificates for the registry office, family reunification and naturalisation. For the Jobcenter and recognition of qualifications we translate certificates completely. Clients in Lünen, Unna and Schwerte order online.', [DE('ratgeber/anerkennung-auslaendischer-abschluesse', 'Anerkennung ausländischer Abschlüsse')]],
    faq: ['Do you translate certificates for the Jobcenter Dortmund?', 'Yes – qualifications, employment references and certificates, certified and complete.'],
  }],
  essen: ['Essen', 'bielefeld', {
    intro: 'Translation services for Essen: certified translations for the immigration office, registry office and the University of Duisburg-Essen, medical translations for clinics, and interpreters for appointments in Essen and the central Ruhr area.',
    local: ['Essen: energy, health and university', 'Essen is home to large energy companies, the University Hospital and the University of Duisburg-Essen. Energy and engineering companies need technical and contractual translations; doctors and nurses from abroad need diplomas and licences translated for recognition; patients need medical reports and interpreters. Students need transcripts for admission. Families from many countries ask for certificates for the registry office and naturalisation. Clients in Mülheim an der Ruhr, Gelsenkirchen and Oberhausen order online.', [DE('fachuebersetzungen/medizinische-dentalmedizin', 'Medizinische Übersetzung')]],
    faq: ['Do you translate medical diplomas for recognition?', 'Yes – medical, nursing and dental diplomas, transcripts and certificates of good standing.'],
  }],
  bochum: ['Bochum', 'bielefeld', {
    intro: 'Translation services for Bochum: certified translations for Ruhr University Bochum, the immigration office and the registry office, and interpreters for authorities, hospitals and courts in Bochum, Herne and Witten.',
    local: ['Bochum: Ruhr University and health campus', 'With Ruhr University Bochum (RUB), one of Germany’s largest universities, many requests come from international students and researchers who need degrees, transcripts and recommendation letters. The health campus and university hospitals bring requests from doctors and nurses for recognition, and from patients for medical interpreters. Former industrial workers and their families need pension and employment documents. Clients in Herne, Witten and Hattingen order online.', [DE('dolmetschen/dolmetscher-arzt', 'Dolmetscher für Arztbesuch')]],
    faq: ['Do you translate transcripts for Ruhr University Bochum?', 'Yes – transcripts, degrees and school-leaving certificates in the format the university needs.'],
  }],
  wuppertal: ['Wuppertal', 'bielefeld', {
    intro: 'Translation services for Wuppertal: certified translations for the immigration office, registry office and the University of Wuppertal, technical and chemical translations for industry, and interpreters for the Bergisches Land.',
    local: ['Wuppertal and the Bergisches Land', 'Wuppertal and its neighbours Solingen and Remscheid are known for chemical, pharmaceutical, tool-making and engineering companies. They need safety data sheets, technical manuals and supplier contracts translated. Students at the University of Wuppertal need transcripts and degrees; families need civil-status documents for the registry office and naturalisation. For appointments at authorities, schools and doctors we provide interpreters on site or by video. Clients in Solingen, Remscheid and Velbert order online.', [DE('fachuebersetzungen/chemie-biowissenschaften', 'Fachübersetzung Chemie')]],
    faq: ['Do you translate safety data sheets?', 'Yes – safety data sheets and technical documents, by specialist translators with terminology management.'],
  }],
  bremen: ['Bremen', 'osnabrueck', {
    intro: 'Translation services for Bremen: certified translations for the Migrationsamt, the registry office and the universities, technical translations for aerospace and ports, and interpreters in Bremen and Bremerhaven.',
    local: ['Bremen: ports, aerospace and science', 'Bremen and Bremerhaven are ports with strong logistics, shipping and aerospace industries. Companies need technical documentation, contracts and certificates in English and German; employees need qualifications and references. The University of Bremen and Constructor University attract international students and researchers who need transcripts and degrees. Families ask for birth and marriage certificates for the registry office and naturalisation. Seafarers and port workers often need certificates of competency and medical fitness certificates translated quickly before signing on. Clients in Delmenhorst, Achim and Bremerhaven order online.', [DE('fachuebersetzungen/ingenieurwesen', 'Technische Übersetzung')]],
    faq: ['Do you also serve Bremerhaven?', 'Yes – fully online, with delivery as PDF and by post.'],
  }],
  hannover: ['Hanover', 'osnabrueck', {
    intro: 'Translation services for Hanover (Hannover): certified translations for the immigration office, registry office, Leibniz University and Hannover Medical School, and interpreters for trade fairs, courts and authorities in Lower Saxony’s capital.',
    local: ['Hanover: trade fairs, medicine and state authorities', 'Hanover hosts the Hannover Messe and other international fairs, so exhibitors need brochures, contracts and interpreters. As the capital of Lower Saxony, it is the seat of ministries and higher courts. Hannover Medical School (MHH) and Leibniz University attract doctors, researchers and students who need diplomas and transcripts for recognition and admission. Families need civil-status documents for the registry office. Clients in Langenhagen, Garbsen and Laatzen order online.', [DE('dolmetschen/simultandolmetscher', 'Simultandolmetscher')]],
    faq: ['Can you provide interpreters for Hannover Messe?', 'Yes – consecutive interpreters for stand meetings and simultaneous interpreters for conferences.'],
  }],
  leipzig: ['Leipzig', 'berlin', {
    intro: 'Translation services for Leipzig: certified translations for the immigration office, the registry office and Leipzig University, technical translations for the automotive and logistics industry, and interpreters in Leipzig and Halle.',
    local: ['Leipzig: university, automotive and logistics', 'Leipzig is one of Germany’s fastest-growing cities. Leipzig University attracts international students and researchers; automotive plants and the air-freight hub at Leipzig/Halle Airport bring engineers and logistics specialists who need qualifications, references and contracts in German. Families need certificates for the registry office and family reunification. For appointments at authorities, schools and doctors we arrange interpreters, also by video. Clients in Halle, Markkleeberg and Taucha order online.', [DE('arbeitszeugnis-uebersetzung', 'Arbeitszeugnis übersetzen')]],
    faq: ['Do you translate employment references for Leipzig employers?', 'Yes – references, contracts and qualifications, certified on request.'],
  }],
  dresden: ['Dresden', 'berlin', {
    intro: 'Translation services for Dresden: certified translations for the immigration office, the registry office and TU Dresden, technical translations for the semiconductor and research sector, and interpreters in the Saxon capital.',
    local: ['Dresden: research and semiconductors', 'Dresden is a centre of microelectronics and research – often called Silicon Saxony – with TU Dresden and many research institutes. Engineers and scientists from abroad need degrees and employment documents for residence permits and recognition; companies need technical specifications and contracts. As the capital of Saxony it is also the seat of ministries and higher courts. Families ask for civil-status documents for the registry office. Clients in Freital, Pirna and Radebeul order online.', [DE('fachuebersetzungen/it-software', 'IT- und Softwareübersetzung')]],
    faq: ['Do you translate technical specifications?', 'Yes – specifications, manuals and contracts, by specialist translators with a second review.'],
  }],
  nuernberg: ['Nuremberg', 'stuttgart', {
    intro: 'Translation services for Nuremberg (Nürnberg): certified translations for the immigration office, the registry office and FAU Erlangen-Nürnberg, and interpreters for authorities, courts and businesses in the Nuremberg metropolitan region.',
    local: ['Nuremberg: federal agencies, industry and university', 'Nuremberg is home to the Federal Office for Migration and Refugees (BAMF) and the Federal Employment Agency, and to major engineering and electronics companies. Asylum, residence and employment procedures generate many requests for civil-status documents, certificates and qualifications. Students at FAU Erlangen-Nürnberg and the Technical University of Nuremberg need transcripts and degrees. Companies need technical and legal translations. Clients in Fürth, Erlangen and Schwabach order online.', [DE('ratgeber/einbuergerung-dokumente', 'Einbürgerung: Dokumente')]],
    faq: ['Do you translate documents for asylum and residence procedures?', 'Yes – identity and civil-status documents, certified and accepted by German authorities.'],
  }],
  braunschweig: ['Braunschweig', 'osnabrueck', {
    intro: 'Translation services for Braunschweig: certified translations for the immigration office, registry office and TU Braunschweig, technical translations for automotive and research, and interpreters for Braunschweig, Wolfsburg and Salzgitter.',
    local: ['Braunschweig: research and the automotive region', 'Braunschweig is one of Europe’s most research-intensive regions, with TU Braunschweig and national research institutes, close to Volkswagen in Wolfsburg and industry in Salzgitter. Scientists joining a Braunschweig institute typically send diplomas, doctoral certificates and hosting agreements; suppliers to the car industry send test reports, drawings and quality manuals. Couples and parents ask for birth and marriage certificates. For appointments at authorities and doctors we arrange interpreters, also by video. Clients in Wolfsburg, Salzgitter and Peine order online.', [DE('fachuebersetzungen/ingenieurwesen', 'Technische Übersetzung')]],
    faq: ['Do you also serve Wolfsburg?', 'Yes – fully online, with certified translations as PDF and by post.'],
  }],
  oldenburg: ['Oldenburg', 'osnabrueck', {
    intro: 'Translation services for Oldenburg: certified translations for the immigration office, the registry office and the University of Oldenburg, and interpreters for authorities, courts and hospitals in Oldenburg and the Weser-Ems region.',
    local: ['Oldenburg and the Weser-Ems region', 'Oldenburg is the centre of the Weser-Ems region, with a university, a medical faculty and a strong energy and agricultural sector. International students and medical staff need diplomas and transcripts for admission and recognition; workers in agriculture, food processing and wind energy need qualifications and employment documents. Families need certificates for the registry office and family reunification. Clients in Delmenhorst, Wilhelmshaven, Cloppenburg and Westerstede order online – our Osnabrück head office is close by.', [DE('ratgeber/familiennachzug-dokumente', 'Familiennachzug: Dokumente')]],
    faq: ['Do you translate documents for family reunification?', 'Yes – birth and marriage certificates and family records, certified for the immigration office and embassy.'],
  }],
  rheine: ['Rheine', 'osnabrueck', {
    intro: 'Translation services for Rheine: certified translations for the immigration office of the district of Steinfurt, the registry office and employers, and interpreters for appointments in Rheine and the Münsterland – only about 45 km from our Osnabrück head office.',
    local: ['Rheine and the northern Münsterland', 'Rheine lies in the Münsterland close to the Dutch border. Many requests come from workers in industry, logistics and care who need qualifications and references for recognition, and from families who need civil-status documents for the registry office, the district immigration office and naturalisation. Cross-border commuters ask for Dutch-German translations. Because Rheine is close to our head office, appointments for interpreters can be arranged quickly. Clients in Emsdetten, Steinfurt and Hörstel order online.', [DE('ratgeber/einbuergerung-dokumente', 'Einbürgerung: Dokumente')]],
    faq: ['Do you translate Dutch documents?', 'Yes – Dutch certificates and contracts into German and vice versa.'],
  }],
  lingen: ['Lingen', 'osnabrueck', {
    intro: 'Translation services for Lingen (Ems): certified translations for the immigration office of the Emsland district, the registry office and the Lingen campus of Osnabrück University of Applied Sciences, and interpreters for the Emsland.',
    local: ['Lingen and the Emsland', 'Lingen is an energy and industrial location in the Emsland, close to the Dutch border and to our Osnabrück head office. Workers in energy, food processing and logistics need qualifications and employment documents; students on the Lingen campus need transcripts and degrees. Families from Eastern Europe, Syria and Turkey ask for birth and marriage certificates for the registry office and naturalisation. Clients in Meppen, Nordhorn and Papenburg order online, and interpreters can travel quickly.', [DE('ratgeber/anerkennung-auslaendischer-abschluesse', 'Anerkennung ausländischer Abschlüsse')]],
    faq: ['How quickly can an interpreter come to Lingen?', 'Often within a few days, as Lingen is close to our Osnabrück head office; by video even sooner.'],
  }],
  ibbenbueren: ['Ibbenbüren', 'osnabrueck', {
    intro: 'Translation services for Ibbenbüren: certified translations for the district immigration office, the registry office and employers, and interpreters for appointments in Ibbenbüren and the Tecklenburger Land – only about 30 km from our Osnabrück head office.',
    local: ['Ibbenbüren and the Tecklenburger Land', 'Ibbenbüren, a former mining town, is today a location for medium-sized industry, trade and care. Skilled tradespeople and care staff from abroad often send us vocational certificates and nursing diplomas that the recognition office wants in German; couples planning a wedding at the Ibbenbüren Standesamt send birth certificates and proof of single status. Thanks to the short distance to our head office, documents can also be handed over by appointment in Osnabrück. Clients in Mettingen, Recke and Hopsten order online.', [DE('ratgeber/anerkennung-auslaendischer-abschluesse', 'Anerkennung ausländischer Abschlüsse')]],
    faq: ['Can I hand over my documents in person?', 'Yes, by appointment at our Osnabrück head office, Rosenplatz 17 – but a clear photo is usually enough.'],
  }],
  wiesbaden: ['Wiesbaden', 'mainz', {
    intro: 'Translation services for Wiesbaden: certified translations for the immigration office, the registry office and Hessian authorities, and interpreters in the Hessian capital – from our Mainz office just across the Rhine or fully online.',
    local: ['Wiesbaden: state capital and federal agencies', 'As the capital of Hesse, Wiesbaden is the seat of state ministries and federal agencies such as the Federal Criminal Police Office and the Federal Statistical Office. Employees, families and companies need certified documents for authorities, the registry office and courts. Many international families live in Wiesbaden and ask for birth and marriage certificates and degrees. Weddings at the registry office and notary appointments often need sworn interpreters. Clients in Taunusstein, Eltville and Hochheim order online.', [DE('dolmetschen/standesamt-dolmetscher', 'Standesamt-Dolmetscher')]],
    faq: ['Is your Mainz office close to Wiesbaden?', 'Yes, just across the Rhine – visits by appointment at Richard-Wagner-Straße 13.'],
  }],
};

const SLUGS = Object.keys(AREAS);

export const EN_AREA_UPGRADES = Object.fromEntries(Object.entries(AREAS).map(([slug, [city, office, { intro, local, faq }]], i) => {
  const officeName = OFFICE[office];
  // Each city page links to the next one, so every page has an in-content inbound link.
  const next = SLUGS[(i + 1) % SLUGS.length];
  return [`/en/locations/${slug}`, {
    description: `Certified translations and interpreters for ${city}: sworn translators accepted by German authorities, fully online from €39 per document.`,
    intro,
    sections: [
      local,
      [`Certified translations for ${city}`, `Send a clear photo or scan of your document by WhatsApp, e-mail or web form. You receive a fixed price in advance, and the certified translation as PDF and by post to your address in ${city} – usually in 2–3 working days, by express the same day. Standard documents start at €39.`, [{ href: '/en/certified-translations/', label: 'Certified translations' }]],
      [`Interpreters in ${city}`, `For registry offices, notaries, courts, immigration offices and doctors in ${city} we arrange interpreters on site, by video or by phone – sworn interpreters where required, from €85 per hour.`],
      [`Nearest office: ${officeName}`, `Our nearest office to ${city} is in ${officeName}. Most clients from ${city} never need to visit: the whole process works online. Phone and WhatsApp are available around the clock.`, [{ href: `/en/locations/${office}/`, label: `Translation Office ${officeName}` }, { href: `/en/locations/${next}/`, label: `Translations for ${AREAS[next][0]}` }]],
    ],
    faqs: [
      faq,
      [`Do I have to come to an office from ${city}?`, 'No. Everything works online, and the certified translation is sent as PDF and by post.'],
      [`Are your translations accepted in ${city}?`, 'Yes, certified translations by court-authorised translators are accepted throughout Germany.'],
    ],
  }];
}));
