// Plan v4 "Andere Sprachen": the English office pages (searches like "translation services
// Osnabrück", "translation agency Berlin", "sworn translator Berlin") and the Turkish
// Berlin/Stuttgart pages ("yeminli tercüman Stuttgart/Berlin") get real content.
// Applied by path like FOREIGN_UPGRADES; no new URLs.
const QUOTE_EN = { href: '/en/angebot/', label: 'Request a free quote' };
const QUOTE_TR = { href: '/tr/angebot/', label: 'Ücretsiz teklif alın' };
// Kept deliberately short: the rest of each page is specific to the office.
const prices = (city) => [`Prices and ordering in ${city}`, 'From €39 per standard document, €0.12 per word for specialist texts, €85 per hour for interpreters. Send a photo by WhatsApp or e-mail, get a fixed price, receive the translation as PDF and by post in 2–3 working days – or the same day by express.'];

function office(city, { street, district, intro, local, extra, faqs, de }) {
  return {
    eyebrow: `Translation Office ${city}`,
    title: `Certified translations and interpreters in ${city}.`,
    metaTitle: `Translation Services ${city} – Sworn Translators | Noon`,
    description: `Translation services in ${city}: sworn translations accepted by German authorities, interpreters and specialist translations – from €39 per document.`,
    intro,
    highlights: ['Court-authorised translators', 'From €39 per document', 'Same-day express'],
    sections: [
      [`Our office in ${city}`, `Visit us by appointment at ${street}${district ? ` (${district})` : ''}. Most clients never need to come in: you send your documents digitally and receive the translation as a PDF and by post. Phone and WhatsApp are available around the clock.`, [{ href: de, label: `Übersetzungsbüro ${city} (Deutsch)` }, QUOTE_EN]],
      local,
      extra,
      prices(city),
    ].filter(Boolean),
    faqs: [
      [`Are your translations accepted by authorities in ${city}?`, 'Yes, throughout Germany.'],
      ...faqs,
    ],
  };
}

export const FOREIGN_UPGRADES_2 = {
  '/en/locations/berlin': office('Berlin', {
    street: 'Potsdamer Straße 63, 10785 Berlin',
    district: 'Tiergarten',
    de: '/de/standorte/berlin/',
    intro: 'Looking for a sworn translator or translation agency in Berlin? Our court-authorised translators produce certified translations from and into German for the Landesamt für Einwanderung (LEA), the registry offices of the twelve districts, Berlin courts, universities and employers – and we provide interpreters for appointments across Berlin.',
    local: ['Typical requests in Berlin', '• Residence permits, Blue Card and family reunification at the LEA: birth and marriage certificates, degrees, employment contracts\n• Getting married at a Berlin Standesamt: birth certificates, certificates of no impediment, divorce decrees – plus an interpreter for the ceremony\n• Start-ups and companies: contracts, articles of association, commercial register extracts in English\n• Students at FU, HU, TU and Charité: diplomas and transcripts\n• Notary appointments for buying property, with a sworn interpreter', [{ href: '/de/standorte/berlin/beglaubigte-uebersetzung/', label: 'Beglaubigte Übersetzung Berlin (DE)' }, { href: '/de/standorte/berlin/dolmetscher/', label: 'Dolmetscher Berlin (DE)' }]],
    extra: ['Interpreters in Berlin', 'For the LEA, Jobcenter, registry office, notary, court, doctor or business meetings we arrange interpreters – in person, by video or by phone. Court and notary appointments are covered by sworn (beeidigte) interpreters. Conference interpreting is available for events and delegations.', [{ href: '/de/standorte/berlin/konferenzdolmetscher/', label: 'Konferenzdolmetscher Berlin (DE)' }]],
    faqs: [['Can you translate my English documents into German for the LEA?', 'Yes – degrees, employment contracts, bank statements and certificates, certified and accepted by the LEA.']],
  }),
  '/en/locations/stuttgart': office('Stuttgart', {
    street: 'Friedrichstraße 15, 70174 Stuttgart',
    district: 'Mitte',
    de: '/de/standorte/stuttgart/',
    intro: 'Translation services in Stuttgart for private clients and companies: certified translations for the Ausländerbehörde, registry office, driving licence office and University of Stuttgart, specialist translations for the automotive and engineering industry, and interpreters for authorities, courts and business meetings.',
    local: ['Typical requests in Stuttgart', '• International employees in automotive and engineering: diplomas, employment references and contracts\n• Exchanging a foreign driving licence at the Führerscheinstelle\n• Weddings at the Standesamt Stuttgart and births of children\n• Technical documentation, audit reports and supplier contracts for companies in the region\n• Clients from Esslingen, Ludwigsburg, Böblingen, Sindelfingen and Waiblingen – fully online', [{ href: '/de/standorte/stuttgart/englisch/', label: 'Englisch Übersetzer Stuttgart (DE)' }, { href: '/de/standorte/stuttgart/fachuebersetzungen/', label: 'Fachübersetzungen Stuttgart (DE)' }]],
    extra: ['Interpreters and conference interpreting', 'Consecutive and simultaneous interpreters for trade fairs at Messe Stuttgart, supplier audits, training and negotiations – plus sworn interpreters for courts and notaries, and telephone or video interpreting for short conversations.', [{ href: '/de/standorte/stuttgart/konferenzdolmetscher/', label: 'Konferenzdolmetscher Stuttgart (DE)' }]],
    faqs: [['Do you translate technical documents in English?', 'Yes – operating manuals, specifications and contracts, translated by specialist translators with terminology management.'], ['Can I exchange my foreign driving licence with your translation?', 'Yes, the Führerscheinstelle accepts certified translations by court-authorised translators. We translate the licence completely, front and back.']],
  }),
  '/en/locations/osnabrueck': office('Osnabrück', {
    street: 'Rosenplatz 17, 49074 Osnabrück',
    district: 'head office',
    de: '/de/standorte/osnabrueck/',
    intro: 'Translation services in Osnabrück from our head office at Rosenplatz 17: certified translations accepted by German authorities, interpreters for appointments in Osnabrück, the district and the Emsland, and specialist translations for companies.',
    local: ['Typical requests in Osnabrück', '• Students and researchers at Osnabrück University and the University of Applied Sciences: diplomas and transcripts\n• Residence, family reunification and naturalisation: certificates for the immigration office\n• Weddings at the Osnabrück registry office\n• Companies in the region: contracts and technical documents\n• Clients from the district of Osnabrück, the Emsland and Münsterland – fully online', [{ href: '/de/diplom-uebersetzung/', label: 'Diplom übersetzen (DE)' }, { href: '/de/ratgeber/einbuergerung-dokumente/', label: 'Einbürgerung: Dokumente (DE)' }]],
    extra: ['Our head office and team', 'Osnabrück is where Noon started in 2019 and where our head office is today. From here we coordinate translators and interpreters for all six offices – for Arabic dialects, Turkish, Persian (Farsi and Dari), Ukrainian, Russian, Kurdish and many more languages. For international companies in the region we also translate contracts, technical documentation and websites with specialist translators and a second review.', [{ href: '/de/ueber-uns/', label: 'Über uns (DE)' }, { href: '/de/sprachen/', label: 'Sprachen (DE)' }]],
    faqs: [['Can I pick up my translation at Rosenplatz?', 'Yes, by appointment. Most clients receive it as a PDF and by post.']],
  }),
  '/en/locations/bielefeld': office('Bielefeld', {
    street: 'Teichstraße 24, 33615 Bielefeld',
    district: '',
    de: '/de/standorte/bielefeld/',
    intro: 'Translation services in Bielefeld and the OWL region: certified translations for the immigration office, registry office and Bielefeld University, interpreters for authorities and courts, and specialist translations for companies in Ostwestfalen-Lippe.',
    local: ['Typical requests in Bielefeld', '• International students at Bielefeld University: transcripts and degree certificates\n• Russian-, Ukrainian- and Turkish-speaking families: certificates for registry office and naturalisation\n• Employees in mechanical engineering and the food industry: employment references and qualifications\n• Clients from Gütersloh, Herford, Detmold and Paderborn – fully online', [{ href: '/de/sprachen/russisch/', label: 'Russisch Übersetzer (DE)' }, { href: '/de/ratgeber/anerkennung-auslaendischer-abschluesse/', label: 'Anerkennung (DE)' }]],
    extra: ['Interpreters in Bielefeld and OWL', 'For appointments at the immigration office, Jobcenter, registry office, courts, hospitals and schools in Bielefeld, Gütersloh, Herford and the whole OWL region we arrange interpreters – in person, by video or by phone, sworn for court and notary. Short conversations with a doctor or school are often easiest by video, without travel costs.', [{ href: '/de/dolmetschen/dolmetscher-arzt/', label: 'Dolmetscher für Arztbesuch (DE)' }, { href: '/de/dolmetschen/dolmetscher-schule/', label: 'Dolmetscher für Elterngespräche (DE)' }]],
    faqs: [['Do you translate documents for Bielefeld University?', 'Yes – diplomas, transcripts and school-leaving certificates, certified and in the required format.'], ['Can I visit the Bielefeld office?', 'Yes, by appointment at Teichstraße 24. Please call or message us first so that your documents and language combination are prepared.']],
  }),
  '/en/locations/mainz': office('Mainz', {
    street: 'Richard-Wagner-Straße 13, 55118 Mainz',
    district: '',
    de: '/de/standorte/mainz/',
    intro: 'Translation services in Mainz and Wiesbaden: certified translations for authorities, the registry office and Johannes Gutenberg University, interpreters for appointments in both state capitals, and specialist translations for companies in the Rhine-Main area.',
    local: ['Typical requests in Mainz and Wiesbaden', '• Researchers and students at Johannes Gutenberg University: degrees and transcripts\n• Pharma, biotech and media companies: contracts and specialist texts\n• Families from abroad: certificates for registry office and naturalisation\n• Clients in Wiesbaden, Ingelheim and Rüsselsheim – fully online, or by appointment in Mainz', [{ href: '/de/standorte/wiesbaden/', label: 'Übersetzungen Wiesbaden (DE)' }, { href: '/de/fachuebersetzungen/', label: 'Fachübersetzungen (DE)' }]],
    extra: ['Interpreters for Mainz and Wiesbaden', 'For notaries, courts, registry offices and immigration offices in both state capitals we provide interpreters – in person, by video or by phone, and sworn interpreters where required. Weddings at the registry office, property purchases at the notary and court hearings are the most common appointments.', [{ href: '/de/dolmetschen/dolmetscher-hochzeit/', label: 'Dolmetscher für Hochzeit (DE)' }, { href: '/de/gerichtsdolmetscher/', label: 'Gerichtsdolmetscher (DE)' }]],
    faqs: [['Do you also serve Wiesbaden?', 'Yes. Our Mainz office is just across the Rhine; most clients from Wiesbaden order online.'], ['Do you translate degrees for Johannes Gutenberg University?', 'Yes – diplomas, transcripts and school-leaving certificates for application and recognition, certified and in the required format.']],
  }),
  '/en/locations/kiel': office('Kiel', {
    street: 'Bothwellstraße 25, 24143 Kiel',
    district: 'Gaarden',
    de: '/de/standorte/kiel/',
    intro: 'Translation services in Kiel with our own Kiel number +49 15567 478943 (phone and WhatsApp): certified translations for the immigration office, registry office, courts and Kiel University, plus interpreters – including Polish, Persian (Farsi and Dari) and medical interpreting.',
    local: ['Typical requests in Kiel', '• Students and researchers at Kiel University (CAU): diplomas and transcripts\n• Shipyard, port and logistics workers: qualifications and employment documents\n• Polish, Afghan and Iranian families: certificates for registry office, immigration office and family reunification\n• Patients and clinics: medical interpreters\n• Clients from Neumünster, Rendsburg, Eckernförde and Plön – fully online', [{ href: '/de/standorte/kiel/polnisch/', label: 'Polnisch Übersetzer Kiel (DE)' }, { href: '/de/standorte/kiel/medizinischer-dolmetscher/', label: 'Medizinischer Dolmetscher Kiel (DE)' }]],
    extra: ['Polish, Persian and medical interpreting', 'In Kiel we are especially often asked for Polish and for Persian – both Iranian Farsi and Afghan Dari. We translate certificates, Tazkiras and qualifications into German and provide interpreters for social services, asylum procedures, schools and hospitals such as the UKSH. Medical interpreting is available on site or by video.', [{ href: '/de/standorte/kiel/persisch/', label: 'Persisch Übersetzer Kiel (DE)' }, { href: '/de/standorte/kiel/ermaechtigter-uebersetzer/', label: 'Ermächtigter Übersetzer Kiel (DE)' }]],
    faqs: [['How do I reach the Kiel office?', 'Call or WhatsApp +49 15567 478943 – around the clock. Visits by appointment at Bothwellstraße 25.'], ['Do you provide interpreters for Dari and Farsi?', 'Yes, for both varieties – please tell us which one you speak so that we can choose the right interpreter.']],
  }),
  '/tr/subeler/stuttgart': {
    eyebrow: 'Yeminli tercüman Stuttgart',
    title: 'Stuttgart’ta yeminli tercüman ve onaylı çeviri.',
    metaTitle: 'Yeminli Tercüman Stuttgart – onaylı çeviri | Noon',
    description: 'Stuttgart’ta yeminli tercüman: nüfus kayıt örneği, evlilik cüzdanı, boşanma kararı ve ehliyet için onaylı çeviri – belge başına 39 €’dan başlayan fiyatlar.',
    intro: 'Stuttgart’ta yeminli tercüman mı arıyorsunuz? Mahkeme tarafından yetkilendirilmiş tercümanlarımız Türkçe belgelerinizi Almanca’ya, Almanca belgelerinizi Türkçe’ye onaylı olarak çevirir. Çevirilerimiz Ausländerbehörde, Standesamt, Führerscheinstelle ve mahkemeler tarafından tüm Almanya’da kabul edilir. Ofisimiz: Friedrichstraße 15, 70174 Stuttgart – randevu ile.',
    highlights: ['Yetkili tercümanlar', 'Belge başına 39 €’dan', 'Aynı gün ekspres'],
    sections: [
      ['Hangi belgeleri çeviriyoruz?', '• nüfus kayıt örneği ve doğum belgeleri\n• evlilik cüzdanı ve uluslararası evlenme belgeleri\n• kesinleşme şerhli boşanma kararları\n• ehliyet (Führerschein değişimi için)\n• diploma, transkript ve iş belgeleri\n• Türkiye’de kullanılacak Almanca belgeler (vekaletname, boşanma kararı, nüfus belgeleri)', [{ href: '/de/standorte/stuttgart/tuerkisch/', label: 'Türkisch Übersetzer Stuttgart (DE)' }, QUOTE_TR]],
      ['Stuttgart’ta sözlü tercüman', 'Noter, mahkeme, nikâh (Standesamt), Ausländerbehörde, doktor ve iş görüşmeleri için tercüman sağlıyoruz – yüz yüze, görüntülü veya telefonla. Mahkeme ve noter için yeminli tercümanlar.'],
      ['Fiyatlar ve süreler', 'Standart belgeler belge başına 39 €’dan başlar; kesin fiyatı önceden ve ücretsiz bildiririz. Normal teslim 2–3 iş günü, ekspres aynı gün (genellikle 4–5 saat). Çeviriyi PDF olarak e-posta ile, mühürlü aslını posta ile alırsınız. Sözlü tercüme saatlik 85 €’dan başlar.'],
      ['Türkiye’de kullanılacak belgeler', 'Türkiye’deki nüfus müdürlükleri, mahkemeler, noterler ve SGK için Almanca belgelerinizi (doğum ve evlilik belgeleri, boşanma kararları, vekaletnameler, emeklilik belgeleri) Türkçe’ye onaylı olarak çeviriyoruz. Türkiye’de kullanım için Alman belgesine genellikle apostil gerekir; apostili de çeviriyoruz. İsimleri pasaportunuzdaki yazımla tüm belgelerde aynı şekilde yazıyoruz.'],
      ['Nasıl sipariş verilir?', '1. Belgenin fotoğrafını WhatsApp, e-posta veya form ile gönderin.\n2. Ücretsiz sabit fiyat ve teslim tarihi alın.\n3. Onaylı çeviriyi PDF ve posta ile alın.\n\nEsslingen, Ludwigsburg, Böblingen ve Waiblingen’deki müşterilerimiz de tamamen online sipariş veriyor.'],
    ],
    faqs: [
      ['Yeminli tercüme ücreti ne kadar?', 'Standart belgeler belge başına 39 €’dan başlar; kesin fiyatı önceden bildiririz.'],
      ['Çeviriniz Alman makamlarınca kabul ediliyor mu?', 'Evet, yetkili tercümanların onaylı çevirileri tüm Almanya’da kabul edilir.'],
      ['Aslını göndermem gerekiyor mu?', 'Hayır, genellikle net bir fotoğraf veya tarama yeterlidir.'],
      ['Apostil de çevriliyor mu?', 'Evet, belgede apostil varsa onu da çeviririz.'],
    ],
  },
  '/tr/subeler/berlin': {
    eyebrow: 'Yeminli tercüman Berlin',
    title: 'Berlin’de yeminli tercüman ve onaylı çeviri.',
    metaTitle: 'Yeminli Tercüman Berlin – fiyat ve onaylı çeviri | Noon',
    description: 'Berlin’de yeminli tercüman: LEA, Standesamt ve mahkemeler için Türkçe–Almanca onaylı çeviri ve sözlü tercüman – belge başına 39 €’dan, aynı gün ekspres.',
    intro: 'Berlin’de yeminli tercüman ve uygun fiyat mı arıyorsunuz? Türkçe belgelerinizi Almanca’ya ve Almanca belgelerinizi Türkçe’ye onaylı olarak çeviriyoruz – Landesamt für Einwanderung (LEA), ilçe nikâh daireleri (Standesamt), Berlin mahkemeleri ve noterler için. Ofisimiz: Potsdamer Straße 63, 10785 Berlin – randevu ile.',
    highlights: ['Yetkili tercümanlar', 'Fiyat önceden belli', 'Aynı gün ekspres'],
    sections: [
      ['Berlin’de sık gelen talepler', '• Berlin’de nikâh: doğum belgesi, bekârlık belgesi, boşanma kararı ve nikâhta tercüman\n• Vatandaşlık başvurusu (Einbürgerung): nüfus belgeleri ve isim yazımı\n• Türkiye’de miras ve gayrimenkul satışı için Almanca vekaletname çevirisi\n• Türk ehliyetinin Berlin’de değiştirilmesi\n• Boşanmanın Türkiye’de veya Almanya’da tanınması', [{ href: '/de/standorte/berlin/tuerkisch/', label: 'Türkisch Übersetzer Berlin (DE)' }, QUOTE_TR]],
      ['Berlin’de sözlü tercüman', 'Noter, nikâh, mahkeme, LEA, Jobcenter ve doktor randevuları için Türkçe tercüman – yüz yüze, görüntülü veya telefonla; mahkeme ve noter için yeminli.'],
      ['Fiyatlar ve süreler', 'Standart belgeler belge başına 39 €’dan; kesin fiyat önceden ve ücretsiz. Normal teslim 2–3 iş günü, ekspres aynı gün. PDF e-posta ile, mühürlü aslı posta ile. Sözlü tercüme saatlik 85 €’dan başlar.'],
      ['İsim yazımı ve apostil', 'Vatandaşlık başvurusunda ve nikâhta en sık sorun isimlerin farklı yazılmasıdır. Bu yüzden tüm belgelerinizi birlikte gönderin; isimleri pasaportunuzdaki gibi her belgede aynı yazarız. Belgede apostil varsa onu da çeviririz; Türkiye’de kullanılacak Alman belgeleri için apostil genellikle gereklidir.'],
      ['Nasıl sipariş verilir?', '1. Belgenin fotoğrafını WhatsApp veya e-posta ile gönderin.\n2. Sabit fiyat ve teslim tarihi alın.\n3. Onaylı çeviriyi PDF ve posta ile alın.'],
    ],
    faqs: [
      ['Berlin’de yeminli tercüme fiyatı ne kadar?', 'Standart belgeler belge başına 39 €’dan başlar; kesin fiyatı önceden ücretsiz bildiririz.'],
      ['LEA çevirilerinizi kabul ediyor mu?', 'Evet, yetkili tercümanların onaylı çevirileri Berlin’de ve tüm Almanya’da kabul edilir.'],
      ['e-Devlet belgelerini çeviriyor musunuz?', 'Evet, barkodlu e-Devlet çıktılarını da çeviriyoruz; kabul edip etmeyeceğine ilgili makam karar verir.'],
      ['Nikâhta tercüman sağlıyor musunuz?', 'Evet, talep üzerine yeminli tercüman.'],
    ],
  },
};
