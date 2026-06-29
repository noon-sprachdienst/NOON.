import { useEffect, useMemo, useRef, useState } from 'react';
import { getSpecialties } from '../data/serviceContent';
import { useI18n } from '../hooks/useI18n';

const PAGE_COPY = {
  de: {
    eyebrow: 'Fachübersetzungen',
    title: 'Fachwissen, das in jeder Sprache präzise bleibt.',
    sub: 'Wählen Sie Ihr Fachgebiet. Unsere spezialisierten Übersetzer übertragen Terminologie, Ton und Inhalt verlässlich in die gewünschte Sprache.',
    quality: 'Zertifizierte Qualität',
    qualityText: 'Fachlich geprüft, terminologisch konsistent und auf den konkreten Einsatzbereich abgestimmt.',
    price: 'ab',
    unit: '/ Wort',
    tags: ['190+ Sprachen', 'Express 24h', 'Vier-Augen-Prinzip'],
    nav: 'Fachgebiet auswählen',
    close: 'Menü schließen',
  },
  en: {
    eyebrow: 'Specialist translations',
    title: 'Expertise that stays precise in every language.',
    sub: 'Choose your field. Our specialist translators transfer terminology, tone and content reliably into your target language.',
    quality: 'Certified quality',
    qualityText: 'Reviewed by specialists, terminologically consistent and tailored to the intended use.',
    price: 'from',
    unit: '/ word',
    tags: ['190+ languages', 'Express 24h', 'Four-eyes principle'],
    nav: 'Select a field',
    close: 'Close menu',
  },
  ar: {
    eyebrow: 'ترجمات متخصصة',
    title: 'خبرة تحافظ على دقتها في كل لغة.',
    sub: 'اختر مجالك. ينقل مترجمونا المتخصصون المصطلحات والنبرة والمحتوى بدقة إلى اللغة المطلوبة.',
    quality: 'جودة معتمدة',
    qualityText: 'مراجعة تخصصية، مصطلحات متسقة، وصياغة تناسب مجال الاستخدام.',
    price: 'ابتداء من',
    unit: '/ كلمة',
    tags: ['190+ لغة', 'إكسبريس 24 ساعة', 'مراجعة مزدوجة'],
    nav: 'اختر المجال',
    close: 'إغلاق القائمة',
  },
  tr: {
    eyebrow: 'Uzman çeviriler',
    title: 'Her dilde hassasiyetini koruyan uzmanlık.',
    sub: 'Alanınızı seçin. Uzman çevirmenlerimiz terminolojiyi, tonu ve içeriği hedef dile güvenilir biçimde aktarır.',
    quality: 'Sertifikalı kalite',
    qualityText: 'Uzman kontrolü, tutarlı terminoloji ve kullanım alanına uygun çeviri.',
    price: 'den itibaren',
    unit: '/ kelime',
    tags: ['190+ dil', 'Ekspres 24s', 'Çift kontrol'],
    nav: 'Alan seçin',
    close: 'Menüyü kapat',
  },
  ru: {
    eyebrow: 'Профильные переводы',
    title: 'Экспертность, сохраняющая точность на любом языке.',
    sub: 'Выберите отрасль. Наши профильные переводчики точно передают терминологию, тон и содержание.',
    quality: 'Сертифицированное качество',
    qualityText: 'Проверка специалистами, единая терминология и адаптация к назначению текста.',
    price: 'от',
    unit: '/ слово',
    tags: ['190+ языков', 'Экспресс 24ч', 'Двойная проверка'],
    nav: 'Выберите отрасль',
    close: 'Закрыть меню',
  },
  fr: {
    eyebrow: 'Traductions spécialisées',
    title: 'Une expertise précise dans chaque langue.',
    sub: 'Choisissez votre domaine. Nos traducteurs spécialisés transmettent terminologie, ton et contenu avec fiabilité.',
    quality: 'Qualité certifiée',
    qualityText: 'Contrôle spécialisé, terminologie cohérente et traduction adaptée à son usage.',
    price: 'à partir de',
    unit: '/ mot',
    tags: ['190+ langues', 'Express 24h', 'Double contrôle'],
    nav: 'Choisir un domaine',
    close: 'Fermer le menu',
  },
  uk: {
    eyebrow: 'Фахові переклади',
    title: 'Експертність, що зберігає точність кожною мовою.',
    sub: 'Оберіть галузь. Наші фахові перекладачі точно передають термінологію, тон і зміст.',
    quality: 'Сертифікована якість',
    qualityText: 'Фахова перевірка, узгоджена термінологія й адаптація до призначення тексту.',
    price: 'від',
    unit: '/ слово',
    tags: ['190+ мов', 'Експрес 24г', 'Подвійна перевірка'],
    nav: 'Оберіть галузь',
    close: 'Закрити меню',
  },
};

const ICONS = {
  'wirtschaft-finanzen': BriefcaseIcon,
  recht: ScaleIcon,
  ingenieurwesen: CogIcon,
  'medizin-dental': MedicalIcon,
  pharmazeutik: FlaskIcon,
  literatur: BookIcon,
  'it-software': MonitorIcon,
  'chemie-biowissenschaften': AtomIcon,
  'industrie-produktion': FactoryIcon,
};

const DOCUMENT_SPECIALTY_CONTENT_DE = {
  'wirtschaft-finanzen': {
    title: 'Übersetzungsbüro für Wirtschaft und Finanzen',
    paragraphs: [
      'Wir übersetzen Wirtschafts- und Finanzdokumente für Unternehmen, Banken, Steuerberater, Versicherungen, Wirtschaftsprüfer und Kanzleien. Dazu gehören Jahresabschlüsse, Bilanzen, Geschäftsberichte, Verträge, Gutachten, Ausschreibungsunterlagen, Finanzanalysen sowie Marketing- und Unternehmenskommunikation für internationale Märkte.',
      'Unsere Fachübersetzungen werden von mehrsprachigen Wirtschaftsexperten, Finanzfachkräften und spezialisierten Fachübersetzern erstellt. Dadurch stellen wir sicher, dass wirtschaftliche Kennzahlen, Fachbegriffe und branchenspezifische Inhalte korrekt, konsistent und verständlich übertragen werden.',
    ],
    examples: [
      'Jahresabschlüsse, Bilanzen und Finanzberichte',
      'Verträge, AGB, Gutachten und Unternehmensdokumente',
      'Investor-Relations-, Ausschreibungs- und Bankunterlagen',
    ],
    quality: 'Fachliche Expertise',
    qualityText: 'Bearbeitung durch qualifizierte Fachübersetzer mit fundierten Kenntnissen in Wirtschaft, Finanzen, Banking und Unternehmenskommunikation.',
  },
  recht: {
    title: 'Übersetzungsbüro für Recht und juristische Fachübersetzungen',
    paragraphs: [
      'Wir übersetzen juristische Dokumente für Rechtsanwälte, Notariate, Gerichte, Behörden, Unternehmen und Privatpersonen. Dazu zählen Verträge, Urteile, Beschlüsse, Vollmachten, Gesellschaftsunterlagen, notarielle Urkunden sowie die Kommunikation mit Gerichten und Behörden.',
      'Unsere juristischen Übersetzungen werden von mehrsprachigen Juristen, Rechtsexperten und spezialisierten Fachübersetzern erstellt. Dadurch bleiben juristische Formulierungen präzise, rechtssicher und auf das jeweilige Rechtssystem abgestimmt.',
    ],
    examples: [
      'Verträge, Urteile und gerichtliche Beschlüsse',
      'Vollmachten, Satzungen und Gesellschaftsunterlagen',
      'Behörden- und Gerichtskorrespondenz',
    ],
    quality: 'Juristische Fachkompetenz',
    qualityText: 'Juristische Übersetzungen mit besonderem Fokus auf Rechtssicherheit, Fachterminologie und internationale Verständlichkeit.',
  },
  ingenieurwesen: {
    title: 'Übersetzungsbüro für Technik und Ingenieurwesen',
    paragraphs: [
      'Wir übersetzen technische Dokumentationen für Ingenieurbüros, Industrieunternehmen, Maschinenbauer und internationale Hersteller. Dazu gehören Bedienungsanleitungen, technische Datenblätter, Wartungsunterlagen, Sicherheitsdokumentationen, Ausschreibungen und technische Spezifikationen.',
      'Unsere technischen Übersetzungen werden von Ingenieuren, Technikern und Fachübersetzern mit technischem Hintergrund erstellt. Dadurch werden technische Zusammenhänge, Normen und sicherheitsrelevante Inhalte fachgerecht übertragen.',
    ],
    examples: [
      'Technische Handbücher und Bedienungsanleitungen',
      'Datenblätter, Spezifikationen und Patente',
      'Wartungs-, Sicherheits- und Projektdokumentationen',
    ],
    quality: 'Technische Fachkompetenz',
    qualityText: 'Bearbeitung durch technische Fachübersetzer, Ingenieure und Spezialisten mit fundierter Branchenerfahrung.',
  },
  'medizin-dental': {
    title: 'Übersetzungsbüro für Medizin und Dentalmedizin',
    paragraphs: [
      'Wir sind auf medizinische und dentalmedizinische Fachübersetzungen spezialisiert und unterstützen Kliniken, Arztpraxen, Zahnarztpraxen, Dentallabore, Hersteller und Forschungseinrichtungen. Übersetzt werden unter anderem Befunde, Arztbriefe, OP-Berichte, Patienteninformationen, Medizintechnik-Dokumentationen sowie Unterlagen der digitalen Zahnmedizin.',
      'Unsere medizinischen Übersetzungen werden von mehrsprachigen Ärztinnen und Ärzten, Dentalingenieuren, Zahntechnikern und spezialisierten medizinischen Fachübersetzern erstellt. Dadurch gewährleisten wir höchste fachliche Präzision für Medizin, Medizintechnik und moderne Zahnmedizin.',
    ],
    examples: [
      'Befunde, Arztbriefe und medizinische Gutachten',
      'Medizintechnik, Software und Gerätehandbücher',
      'Dentaltechnik, Implantologie und CAD/CAM-Systeme',
    ],
    quality: 'Medizinische Spezialisierung',
    qualityText: 'Fachliche Begleitung durch mehrsprachige Ärztinnen, Ärzte, Dentalingenieure und Experten aus dem Gesundheitswesen.',
  },
  pharmazeutik: {
    title: 'Übersetzungsbüro für Pharmazeutik und Arzneimittel',
    paragraphs: [
      'Wir übersetzen pharmazeutische Dokumente für Pharmaunternehmen, Apotheken, Kliniken, CROs und Hersteller von Medizinprodukten. Dazu gehören Packungsbeilagen, Fachinformationen, Zulassungsunterlagen, klinische Studien und Qualitätsdokumentationen.',
      'Unsere pharmazeutischen Übersetzungen werden von Pharmazeuten, Naturwissenschaftlern und spezialisierten Fachübersetzern erstellt. Dadurch bleiben Wirkstoffbezeichnungen, Dosierungen und regulatorische Inhalte fachlich korrekt.',
    ],
    examples: [
      'Fachinformationen und Packungsbeilagen',
      'Klinische Studien und Zulassungsunterlagen',
      'GMP-, SOP- und Qualitätsdokumentationen',
    ],
    quality: 'Pharmazeutische Fachkompetenz',
    qualityText: 'Bearbeitung durch Fachübersetzer mit Erfahrung in Pharmaindustrie, klinischer Forschung und regulatorischen Prozessen.',
  },
  literatur: {
    title: 'Übersetzungsbüro für Literatur und Kultur',
    paragraphs: [
      'Wir unterstützen Verlage, Autorinnen und Autoren sowie Kulturinstitutionen bei hochwertigen literarischen Übersetzungen. Dabei steht nicht nur die sprachliche Übertragung, sondern auch die Bewahrung von Stil, Tonalität und kulturellen Besonderheiten im Mittelpunkt.',
      'Unsere literarischen Übersetzungen werden von erfahrenen Literaturübersetzern, Sprachwissenschaftlern und Lektoren erstellt. So bleibt die Wirkung des Originals auch in der Zielsprache erhalten.',
    ],
    examples: [
      'Romane, Sachbücher und Biografien',
      'Theaterstücke, Drehbücher und Hörspieltexte',
      'Kultur- und Ausstellungstexte',
    ],
    quality: 'Sprachliche Präzision',
    qualityText: 'Besonderer Fokus auf Stil, Lesefluss, kulturelle Nuancen und die Wirkung des Originaltextes.',
  },
  'it-software': {
    title: 'Übersetzungsbüro für IT und Software',
    paragraphs: [
      'Wir übersetzen Software, Apps, technische Dokumentationen und digitale Inhalte für Unternehmen, Entwicklerteams und Softwareanbieter. Dabei unterstützen wir sowohl kleine Anwendungen als auch internationale Software- und Lokalisierungsprojekte.',
      'Unsere IT-Fachübersetzungen werden von Softwareentwicklern, IT-Spezialisten und technischen Fachübersetzern erstellt. Dadurch bleiben technische Zusammenhänge, Benutzerfreundlichkeit und Terminologie konsistent erhalten.',
    ],
    examples: [
      'Softwarelokalisierung und Apps',
      'API-Dokumentationen und Entwicklerhandbücher',
      'IT-Sicherheit, Cloud und Compliance',
    ],
    quality: 'IT-Fachkompetenz',
    qualityText: 'Übersetzungen durch Fachübersetzer mit technischem Verständnis für Softwareentwicklung, Cloud-Infrastruktur und IT-Sicherheit.',
  },
  'chemie-biowissenschaften': {
    title: 'Übersetzungsbüro für Chemie und Biowissenschaften',
    paragraphs: [
      'Wir übersetzen wissenschaftliche Dokumente für Labore, Forschungseinrichtungen, Chemieunternehmen und Biotech-Firmen. Dazu gehören Sicherheitsdatenblätter, Studien, Laborberichte, Patente und wissenschaftliche Publikationen.',
      'Unsere Fachübersetzungen werden von Chemikern, Biologen und Naturwissenschaftlern mit mehrsprachiger Expertise begleitet. Dadurch werden wissenschaftliche Inhalte präzise und fachgerecht übertragen.',
    ],
    examples: [
      'Sicherheitsdatenblätter und Laborberichte',
      'Studien, Publikationen und Patente',
      'Biotechnologie und Life-Science-Dokumentation',
    ],
    quality: 'Wissenschaftliche Fachkompetenz',
    qualityText: 'Präzise Übersetzungen durch Experten aus Chemie, Biologie, Forschung und angewandten Naturwissenschaften.',
  },
  'industrie-produktion': {
    title: 'Übersetzungsbüro für Industrie und Produktion',
    paragraphs: [
      'Wir übersetzen technische und kaufmännische Texte für Industrie, Produktion, Maschinenbau und Handel. Dazu gehören Produktkataloge, Anleitungen, Spezifikationen, Qualitätsdokumente, Sicherheitsunterlagen und Prozessbeschreibungen.',
      'Unsere Fachübersetzer sorgen dafür, dass Fachbegriffe, Maßeinheiten, Normen und Warnhinweise einheitlich und korrekt bleiben. So passt die Übersetzung zum praktischen Einsatz in Fertigung und Export.',
    ],
    examples: [
      'Fachtexte und Dokumentationen',
      'Produkt- und Marketingunterlagen',
      'Mehrsprachige Projekte und Webseiten',
    ],
    quality: 'Zertifizierte Qualität',
    qualityText: 'Fachlich geprüft, terminologisch konsistent und auf den konkreten Einsatzbereich abgestimmt.',
  },
};

const DOCUMENT_SPECIALTY_CONTENT = {
  de: DOCUMENT_SPECIALTY_CONTENT_DE,
  en: {
    'wirtschaft-finanzen': {
      title: 'Translation office for business and finance',
      paragraphs: [
        'We translate business and financial documents for companies, banks, tax advisors, insurers, auditors and law firms. This includes annual financial statements, balance sheets, business reports, contracts, expert opinions, tender documents, financial analyses as well as marketing and corporate communication for international markets.',
        'Our specialist translations are prepared by multilingual business experts, finance professionals and specialized translators. This ensures that business figures, technical terms and industry-specific content are translated correctly, consistently and clearly.',
      ],
      examples: ['Annual statements, balance sheets and financial reports', 'Contracts, terms, expert opinions and corporate documents', 'Investor relations, tender and banking documents'],
      quality: 'Specialist expertise',
      qualityText: 'Handled by qualified specialist translators with sound knowledge of business, finance, banking and corporate communication.',
    },
    recht: {
      title: 'Translation office for legal and specialist legal translations',
      paragraphs: [
        'We translate legal documents for lawyers, notaries, courts, authorities, companies and private clients. These include contracts, judgments, resolutions, powers of attorney, corporate documents, notarial deeds and communication with courts and authorities.',
        'Our legal translations are prepared by multilingual lawyers, legal experts and specialized translators. This keeps legal wording precise, legally reliable and adapted to the relevant legal system.',
      ],
      examples: ['Contracts, judgments and court decisions', 'Powers of attorney, articles of association and corporate documents', 'Authority and court correspondence'],
      quality: 'Legal expertise',
      qualityText: 'Legal translations with a special focus on legal reliability, specialist terminology and international clarity.',
    },
    ingenieurwesen: {
      title: 'Translation office for technology and engineering',
      paragraphs: [
        'We translate technical documentation for engineering offices, industrial companies, mechanical engineering firms and international manufacturers. This includes operating manuals, technical data sheets, maintenance documents, safety documentation, tenders and technical specifications.',
        'Our technical translations are prepared by engineers, technicians and specialist translators with a technical background. This ensures that technical contexts, standards and safety-relevant content are translated professionally.',
      ],
      examples: ['Technical manuals and operating instructions', 'Data sheets, specifications and patents', 'Maintenance, safety and project documentation'],
      quality: 'Technical expertise',
      qualityText: 'Handled by technical specialist translators, engineers and experts with sound industry experience.',
    },
    'medizin-dental': {
      title: 'Translation office for medicine and dental medicine',
      paragraphs: [
        'We specialize in medical and dental specialist translations and support clinics, medical practices, dental practices, dental laboratories, manufacturers and research institutions. We translate findings, doctor’s letters, operation reports, patient information, medical technology documentation and documents from digital dentistry.',
        'Our medical translations are prepared by multilingual doctors, dental engineers, dental technicians and specialized medical translators. This guarantees the highest professional precision for medicine, medical technology and modern dentistry.',
      ],
      examples: ['Findings, doctor’s letters and medical reports', 'Medical technology, software and device manuals', 'Dental technology, implantology and CAD/CAM systems'],
      quality: 'Medical specialization',
      qualityText: 'Specialist support from multilingual doctors, dental engineers and healthcare experts.',
    },
    pharmazeutik: {
      title: 'Translation office for pharmaceuticals and medicinal products',
      paragraphs: [
        'We translate pharmaceutical documents for pharmaceutical companies, pharmacies, clinics, CROs and medical device manufacturers. This includes package leaflets, product information, approval documents, clinical studies and quality documentation.',
        'Our pharmaceutical translations are prepared by pharmacists, natural scientists and specialized translators. This keeps active ingredient names, dosages and regulatory content professionally correct.',
      ],
      examples: ['Product information and package leaflets', 'Clinical studies and approval documents', 'GMP, SOP and quality documentation'],
      quality: 'Pharmaceutical expertise',
      qualityText: 'Handled by specialist translators with experience in the pharmaceutical industry, clinical research and regulatory processes.',
    },
    literatur: {
      title: 'Translation office for literature and culture',
      paragraphs: [
        'We support publishers, authors and cultural institutions with high-quality literary translations. The focus is not only on linguistic transfer, but also on preserving style, tone and cultural nuances.',
        'Our literary translations are prepared by experienced literary translators, linguists and editors. This preserves the effect of the original in the target language.',
      ],
      examples: ['Novels, non-fiction books and biographies', 'Plays, scripts and radio play texts', 'Cultural and exhibition texts'],
      quality: 'Linguistic precision',
      qualityText: 'Special focus on style, readability, cultural nuance and the effect of the original text.',
    },
    'it-software': {
      title: 'Translation office for IT and software',
      paragraphs: [
        'We translate software, apps, technical documentation and digital content for companies, development teams and software providers. We support both small applications and international software and localization projects.',
        'Our IT specialist translations are prepared by software developers, IT specialists and technical translators. This keeps technical context, usability and terminology consistent.',
      ],
      examples: ['Software localization and apps', 'API documentation and developer manuals', 'IT security, cloud and compliance'],
      quality: 'IT expertise',
      qualityText: 'Translations by specialist translators with technical understanding of software development, cloud infrastructure and IT security.',
    },
    'chemie-biowissenschaften': {
      title: 'Translation office for chemistry and life sciences',
      paragraphs: [
        'We translate scientific documents for laboratories, research institutions, chemical companies and biotech firms. This includes safety data sheets, studies, laboratory reports, patents and scientific publications.',
        'Our specialist translations are supported by chemists, biologists and natural scientists with multilingual expertise. This ensures that scientific content is translated precisely and professionally.',
      ],
      examples: ['Safety data sheets and laboratory reports', 'Studies, publications and patents', 'Biotechnology and life science documentation'],
      quality: 'Scientific expertise',
      qualityText: 'Precise translations by experts in chemistry, biology, research and applied natural sciences.',
    },
    'industrie-produktion': {
      title: 'Translation office for industry and production',
      paragraphs: [
        'We translate technical and commercial texts for industry, production, mechanical engineering and trade. This includes product catalogues, manuals, specifications, quality documents, safety documents and process descriptions.',
        'Our specialist translators ensure that technical terms, units of measurement, standards and warnings remain consistent and correct. This makes the translation suitable for practical use in manufacturing and export.',
      ],
      examples: ['Specialist texts and documentation', 'Product and marketing materials', 'Multilingual projects and websites'],
      quality: 'Certified quality',
      qualityText: 'Reviewed by specialists, terminologically consistent and tailored to the intended use.',
    },
  },
  ar: {
    'wirtschaft-finanzen': {
      title: 'مكتب ترجمة للأعمال والمال',
      paragraphs: [
        'نترجم وثائق الأعمال والمال للشركات والبنوك ومستشاري الضرائب وشركات التأمين ومدققي الحسابات والمكاتب القانونية. ويشمل ذلك القوائم السنوية والميزانيات والتقارير التجارية والعقود والتقارير الخبيرة ووثائق المناقصات والتحليلات المالية وكذلك مواد التسويق والتواصل المؤسسي للأسواق الدولية.',
        'تُنجز ترجماتنا المتخصصة بواسطة خبراء أعمال متعددي اللغات ومتخصصين ماليين ومترجمين متخصصين. وبذلك نضمن نقل الأرقام الاقتصادية والمصطلحات الفنية والمحتوى الخاص بكل قطاع بدقة واتساق ووضوح.',
      ],
      examples: ['القوائم السنوية والميزانيات والتقارير المالية', 'العقود والشروط والتقارير الخبيرة ووثائق الشركات', 'وثائق علاقات المستثمرين والمناقصات والبنوك'],
      quality: 'خبرة تخصصية',
      qualityText: 'تنفيذ بواسطة مترجمين متخصصين مؤهلين لديهم معرفة راسخة بالأعمال والمال والبنوك والتواصل المؤسسي.',
    },
    recht: {
      title: 'مكتب ترجمة للقانون والترجمات القانونية المتخصصة',
      paragraphs: [
        'نترجم الوثائق القانونية للمحامين وكتاب العدل والمحاكم والجهات الحكومية والشركات والأفراد. ويشمل ذلك العقود والأحكام والقرارات والتوكيلات ووثائق الشركات والمحررات الموثقة والمراسلات مع المحاكم والجهات الرسمية.',
        'تُنجز ترجماتنا القانونية بواسطة قانونيين متعددي اللغات وخبراء قانون ومترجمين متخصصين. وبذلك تبقى الصياغات القانونية دقيقة وموثوقة ومناسبة للنظام القانوني المعني.',
      ],
      examples: ['العقود والأحكام وقرارات المحاكم', 'التوكيلات والأنظمة الأساسية ووثائق الشركات', 'مراسلات الجهات الرسمية والمحاكم'],
      quality: 'خبرة قانونية',
      qualityText: 'ترجمات قانونية بتركيز خاص على السلامة القانونية والمصطلحات المتخصصة والوضوح الدولي.',
    },
    ingenieurwesen: {
      title: 'مكتب ترجمة للتقنية والهندسة',
      paragraphs: [
        'نترجم الوثائق التقنية لمكاتب الهندسة والشركات الصناعية وشركات بناء الآلات والمصنعين الدوليين. ويشمل ذلك أدلة التشغيل ونشرات البيانات التقنية ووثائق الصيانة ووثائق السلامة والمناقصات والمواصفات التقنية.',
        'تُنجز ترجماتنا التقنية بواسطة مهندسين وفنيين ومترجمين متخصصين لديهم خلفية تقنية. وبذلك تُنقل العلاقات التقنية والمعايير والمحتويات المتعلقة بالسلامة بصورة مهنية.',
      ],
      examples: ['الأدلة التقنية وتعليمات التشغيل', 'نشرات البيانات والمواصفات وبراءات الاختراع', 'وثائق الصيانة والسلامة والمشاريع'],
      quality: 'خبرة تقنية',
      qualityText: 'تنفيذ بواسطة مترجمين تقنيين متخصصين ومهندسين وخبراء لديهم خبرة عملية راسخة في القطاع.',
    },
    'medizin-dental': {
      title: 'مكتب ترجمة للطب وطب الأسنان',
      paragraphs: [
        'نحن متخصصون في الترجمات الطبية وترجمات طب الأسنان وندعم المستشفيات والعيادات الطبية وعيادات الأسنان ومختبرات الأسنان والمصنعين ومؤسسات البحث. نترجم النتائج الطبية وخطابات الأطباء وتقارير العمليات ومعلومات المرضى ووثائق التقنية الطبية ووثائق طب الأسنان الرقمي.',
        'تُنجز ترجماتنا الطبية بواسطة أطباء متعددي اللغات ومهندسي طب أسنان وفنيي أسنان ومترجمين طبيين متخصصين. وبذلك نضمن أعلى درجات الدقة المهنية في الطب والتقنية الطبية وطب الأسنان الحديث.',
      ],
      examples: ['النتائج وخطابات الأطباء والتقارير الطبية', 'التقنية الطبية والبرمجيات وأدلة الأجهزة', 'تقنية الأسنان وزراعة الأسنان وأنظمة CAD/CAM'],
      quality: 'تخصص طبي',
      qualityText: 'دعم تخصصي من أطباء متعددي اللغات ومهندسي طب أسنان وخبراء في قطاع الرعاية الصحية.',
    },
    pharmazeutik: {
      title: 'مكتب ترجمة للصيدلة والأدوية',
      paragraphs: [
        'نترجم الوثائق الصيدلانية لشركات الأدوية والصيدليات والمستشفيات ومنظمات الأبحاث السريرية ومصنعي الأجهزة الطبية. ويشمل ذلك النشرات الداخلية والمعلومات الفنية ووثائق الاعتماد والدراسات السريرية ووثائق الجودة.',
        'تُنجز ترجماتنا الصيدلانية بواسطة صيادلة وعلماء طبيعة ومترجمين متخصصين. وبذلك تبقى أسماء المواد الفعالة والجرعات والمحتوى التنظيمي صحيحة من الناحية المهنية.',
      ],
      examples: ['المعلومات الفنية والنشرات الدوائية', 'الدراسات السريرية ووثائق الاعتماد', 'وثائق GMP وSOP والجودة'],
      quality: 'خبرة صيدلانية',
      qualityText: 'تنفيذ بواسطة مترجمين متخصصين لديهم خبرة في صناعة الأدوية والبحث السريري والإجراءات التنظيمية.',
    },
    literatur: {
      title: 'مكتب ترجمة للأدب والثقافة',
      paragraphs: [
        'ندعم دور النشر والمؤلفين والمؤسسات الثقافية بترجمات أدبية عالية الجودة. لا يقتصر التركيز على النقل اللغوي فقط، بل يشمل الحفاظ على الأسلوب والنبرة والخصوصيات الثقافية.',
        'تُنجز ترجماتنا الأدبية بواسطة مترجمين أدبيين ذوي خبرة ولغويين ومحررين. وبذلك يبقى تأثير النص الأصلي حاضرًا في اللغة الهدف.',
      ],
      examples: ['الروايات والكتب غير الخيالية والسير الذاتية', 'المسرحيات والسيناريوهات ونصوص الأعمال الإذاعية', 'نصوص الثقافة والمعارض'],
      quality: 'دقة لغوية',
      qualityText: 'تركيز خاص على الأسلوب وسلاسة القراءة والفروق الثقافية وتأثير النص الأصلي.',
    },
    'it-software': {
      title: 'مكتب ترجمة لتقنية المعلومات والبرمجيات',
      paragraphs: [
        'نترجم البرمجيات والتطبيقات والوثائق التقنية والمحتوى الرقمي للشركات وفرق التطوير ومزودي البرمجيات. ندعم التطبيقات الصغيرة وكذلك مشاريع البرمجيات والتوطين الدولية.',
        'تُنجز ترجمات تقنية المعلومات بواسطة مطوري برمجيات ومتخصصي IT ومترجمين تقنيين. وبذلك تبقى العلاقات التقنية وسهولة الاستخدام والمصطلحات متسقة.',
      ],
      examples: ['توطين البرمجيات والتطبيقات', 'وثائق API وأدلة المطورين', 'أمن المعلومات والسحابة والامتثال'],
      quality: 'خبرة تقنية معلومات',
      qualityText: 'ترجمات بواسطة مترجمين متخصصين لديهم فهم تقني لتطوير البرمجيات والبنية السحابية وأمن المعلومات.',
    },
    'chemie-biowissenschaften': {
      title: 'مكتب ترجمة للكيمياء وعلوم الحياة',
      paragraphs: [
        'نترجم الوثائق العلمية للمختبرات ومؤسسات البحث وشركات الكيمياء وشركات التقنية الحيوية. ويشمل ذلك صحائف بيانات السلامة والدراسات وتقارير المختبر وبراءات الاختراع والمنشورات العلمية.',
        'تُرافق ترجماتنا المتخصصة بواسطة كيميائيين وبيولوجيين وعلماء طبيعة ذوي خبرة متعددة اللغات. وبذلك تُنقل المحتويات العلمية بدقة ومهنية.',
      ],
      examples: ['صحائف بيانات السلامة وتقارير المختبر', 'الدراسات والمنشورات وبراءات الاختراع', 'وثائق التقنية الحيوية وعلوم الحياة'],
      quality: 'خبرة علمية',
      qualityText: 'ترجمات دقيقة بواسطة خبراء في الكيمياء والبيولوجيا والبحث والعلوم الطبيعية التطبيقية.',
    },
    'industrie-produktion': {
      title: 'مكتب ترجمة للصناعة والإنتاج',
      paragraphs: [
        'نترجم النصوص التقنية والتجارية الخاصة بالصناعة والإنتاج والهندسة الميكانيكية والتجارة. ويشمل ذلك كتالوجات المنتجات والتعليمات والمواصفات ووثائق الجودة ووثائق السلامة ووصف العمليات.',
        'يضمن مترجمونا المتخصصون بقاء المصطلحات الفنية ووحدات القياس والمعايير والتحذيرات موحدة وصحيحة. لذلك تكون الترجمة مناسبة للاستخدام العملي في التصنيع والتصدير.',
      ],
      examples: ['نصوص ووثائق متخصصة', 'مواد المنتجات والتسويق', 'مشاريع ومواقع متعددة اللغات'],
      quality: 'جودة معتمدة',
      qualityText: 'مراجعة تخصصية، مصطلحات متسقة، وصياغة تناسب مجال الاستخدام.',
    },
  },
  tr: {
    'wirtschaft-finanzen': {
      title: 'Ekonomi ve finans çeviri bürosu',
      paragraphs: [
        'Şirketler, bankalar, mali müşavirler, sigorta şirketleri, denetçiler ve hukuk büroları için ekonomi ve finans belgeleri çeviriyoruz. Buna yıllık finansal tablolar, bilançolar, faaliyet raporları, sözleşmeler, bilirkişi raporları, ihale belgeleri, finansal analizler ve uluslararası pazarlar için pazarlama ve kurumsal iletişim metinleri dahildir.',
        'Uzman çevirilerimiz çok dilli ekonomi uzmanları, finans profesyonelleri ve uzman çevirmenler tarafından hazırlanır. Böylece ekonomik göstergelerin, terimlerin ve sektöre özgü içeriklerin doğru, tutarlı ve anlaşılır şekilde aktarılmasını sağlarız.',
      ],
      examples: ['Yıllık tablolar, bilançolar ve finans raporları', 'Sözleşmeler, şartlar, bilirkişi raporları ve şirket belgeleri', 'Yatırımcı ilişkileri, ihale ve banka belgeleri'],
      quality: 'Uzmanlık bilgisi',
      qualityText: 'Ekonomi, finans, bankacılık ve kurumsal iletişim alanlarında sağlam bilgiye sahip nitelikli uzman çevirmenler tarafından hazırlanır.',
    },
    recht: {
      title: 'Hukuk ve hukuki uzman çeviriler bürosu',
      paragraphs: [
        'Avukatlar, noterler, mahkemeler, resmi kurumlar, şirketler ve özel kişiler için hukuki belgeler çeviriyoruz. Buna sözleşmeler, mahkeme kararları, kararlar, vekaletnameler, şirket belgeleri, noter belgeleri ve mahkemeler ile kurumlarla yazışmalar dahildir.',
        'Hukuki çevirilerimiz çok dilli hukukçular, hukuk uzmanları ve uzman çevirmenler tarafından hazırlanır. Böylece hukuki ifadeler hassas, güvenilir ve ilgili hukuk sistemine uygun kalır.',
      ],
      examples: ['Sözleşmeler, hükümler ve mahkeme kararları', 'Vekaletnameler, tüzükler ve şirket belgeleri', 'Resmi kurum ve mahkeme yazışmaları'],
      quality: 'Hukuki uzmanlık',
      qualityText: 'Hukuki güvenilirlik, uzman terminoloji ve uluslararası anlaşılabilirlik odaklı hukuki çeviriler.',
    },
    ingenieurwesen: {
      title: 'Teknik ve mühendislik çeviri bürosu',
      paragraphs: [
        'Mühendislik ofisleri, sanayi şirketleri, makine üreticileri ve uluslararası üreticiler için teknik dokümantasyon çeviriyoruz. Buna kullanım kılavuzları, teknik veri sayfaları, bakım belgeleri, güvenlik dokümantasyonu, ihaleler ve teknik şartnameler dahildir.',
        'Teknik çevirilerimiz mühendisler, teknisyenler ve teknik geçmişe sahip uzman çevirmenler tarafından hazırlanır. Böylece teknik bağlamlar, standartlar ve güvenlikle ilgili içerikler profesyonelce aktarılır.',
      ],
      examples: ['Teknik el kitapları ve kullanım talimatları', 'Veri sayfaları, şartnameler ve patentler', 'Bakım, güvenlik ve proje dokümantasyonu'],
      quality: 'Teknik uzmanlık',
      qualityText: 'Sağlam sektör deneyimine sahip teknik uzman çevirmenler, mühendisler ve uzmanlar tarafından hazırlanır.',
    },
    'medizin-dental': {
      title: 'Tıp ve diş hekimliği çeviri bürosu',
      paragraphs: [
        'Tıbbi ve dental uzman çevirilerde uzmanız; klinikler, doktor muayenehaneleri, diş hekimleri, dental laboratuvarlar, üreticiler ve araştırma kurumlarını destekliyoruz. Bulgular, doktor mektupları, ameliyat raporları, hasta bilgilendirmeleri, medikal teknoloji dokümantasyonu ve dijital diş hekimliği belgeleri çeviriyoruz.',
        'Tıbbi çevirilerimiz çok dilli doktorlar, dental mühendisler, diş teknisyenleri ve uzman tıbbi çevirmenler tarafından hazırlanır. Böylece tıp, medikal teknoloji ve modern diş hekimliği için en yüksek mesleki hassasiyeti sağlarız.',
      ],
      examples: ['Bulgular, doktor mektupları ve tıbbi raporlar', 'Medikal teknoloji, yazılım ve cihaz kılavuzları', 'Dental teknoloji, implantoloji ve CAD/CAM sistemleri'],
      quality: 'Tıbbi uzmanlaşma',
      qualityText: 'Çok dilli doktorlar, dental mühendisler ve sağlık sektörü uzmanları tarafından uzman desteği.',
    },
    pharmazeutik: {
      title: 'Farmasötik ve ilaç çeviri bürosu',
      paragraphs: [
        'İlaç şirketleri, eczaneler, klinikler, CRO’lar ve tıbbi cihaz üreticileri için farmasötik belgeler çeviriyoruz. Buna prospektüsler, ürün bilgileri, ruhsat belgeleri, klinik çalışmalar ve kalite dokümantasyonu dahildir.',
        'Farmasötik çevirilerimiz eczacılar, doğa bilimciler ve uzman çevirmenler tarafından hazırlanır. Böylece etkin madde adları, dozajlar ve düzenleyici içerikler mesleki olarak doğru kalır.',
      ],
      examples: ['Ürün bilgileri ve prospektüsler', 'Klinik çalışmalar ve ruhsat belgeleri', 'GMP, SOP ve kalite dokümantasyonu'],
      quality: 'Farmasötik uzmanlık',
      qualityText: 'İlaç endüstrisi, klinik araştırma ve düzenleyici süreçlerde deneyimli uzman çevirmenler tarafından hazırlanır.',
    },
    literatur: {
      title: 'Edebiyat ve kültür çeviri bürosu',
      paragraphs: [
        'Yayınevleri, yazarlar ve kültür kurumlarını yüksek kaliteli edebi çevirilerle destekliyoruz. Odak yalnızca dil aktarımı değil, aynı zamanda üslup, ton ve kültürel özelliklerin korunmasıdır.',
        'Edebi çevirilerimiz deneyimli edebiyat çevirmenleri, dilbilimciler ve editörler tarafından hazırlanır. Böylece orijinal metnin etkisi hedef dilde de korunur.',
      ],
      examples: ['Romanlar, kurgu dışı kitaplar ve biyografiler', 'Tiyatro oyunları, senaryolar ve radyo oyunu metinleri', 'Kültür ve sergi metinleri'],
      quality: 'Dilsel hassasiyet',
      qualityText: 'Üslup, okuma akışı, kültürel nüanslar ve orijinal metnin etkisine özel odak.',
    },
    'it-software': {
      title: 'IT ve yazılım çeviri bürosu',
      paragraphs: [
        'Şirketler, geliştirici ekipler ve yazılım sağlayıcıları için yazılım, uygulama, teknik dokümantasyon ve dijital içerik çeviriyoruz. Küçük uygulamaları da uluslararası yazılım ve lokalizasyon projelerini de destekliyoruz.',
        'IT uzman çevirilerimiz yazılım geliştiriciler, IT uzmanları ve teknik çevirmenler tarafından hazırlanır. Böylece teknik bağlam, kullanılabilirlik ve terminoloji tutarlı kalır.',
      ],
      examples: ['Yazılım lokalizasyonu ve uygulamalar', 'API dokümantasyonu ve geliştirici kılavuzları', 'IT güvenliği, bulut ve uyumluluk'],
      quality: 'IT uzmanlığı',
      qualityText: 'Yazılım geliştirme, bulut altyapısı ve IT güvenliği konusunda teknik anlayışa sahip uzman çevirmenler tarafından çeviriler.',
    },
    'chemie-biowissenschaften': {
      title: 'Kimya ve yaşam bilimleri çeviri bürosu',
      paragraphs: [
        'Laboratuvarlar, araştırma kurumları, kimya şirketleri ve biyoteknoloji firmaları için bilimsel belgeler çeviriyoruz. Buna güvenlik veri sayfaları, çalışmalar, laboratuvar raporları, patentler ve bilimsel yayınlar dahildir.',
        'Uzman çevirilerimiz çok dilli uzmanlığa sahip kimyagerler, biyologlar ve doğa bilimciler tarafından desteklenir. Böylece bilimsel içerikler hassas ve profesyonel şekilde aktarılır.',
      ],
      examples: ['Güvenlik veri sayfaları ve laboratuvar raporları', 'Çalışmalar, yayınlar ve patentler', 'Biyoteknoloji ve yaşam bilimleri dokümantasyonu'],
      quality: 'Bilimsel uzmanlık',
      qualityText: 'Kimya, biyoloji, araştırma ve uygulamalı doğa bilimleri uzmanları tarafından hassas çeviriler.',
    },
    'industrie-produktion': {
      title: 'Sanayi ve üretim çeviri bürosu',
      paragraphs: [
        'Sanayi, üretim, makine mühendisliği ve ticaret için teknik ve ticari metinler çeviriyoruz. Buna ürün katalogları, talimatlar, teknik şartnameler, kalite belgeleri, güvenlik dokümanları ve süreç açıklamaları dahildir.',
        'Uzman çevirmenlerimiz teknik terimlerin, ölçü birimlerinin, standartların ve uyarıların tutarlı ve doğru kalmasını sağlar. Böylece çeviri üretim ve ihracatta pratik kullanıma uygun olur.',
      ],
      examples: ['Uzman metinler ve dokümantasyon', 'Ürün ve pazarlama materyalleri', 'Çok dilli projeler ve web siteleri'],
      quality: 'Sertifikalı kalite',
      qualityText: 'Uzman kontrolü, tutarlı terminoloji ve kullanım alanına uygun çeviri.',
    },
  },
  ru: {
    'wirtschaft-finanzen': {
      title: 'Бюро переводов для бизнеса и финансов',
      paragraphs: [
        'Мы переводим деловые и финансовые документы для компаний, банков, налоговых консультантов, страховых компаний, аудиторов и юридических фирм. Сюда входят годовые отчеты, балансы, бизнес-отчеты, договоры, экспертные заключения, тендерная документация, финансовая аналитика, а также маркетинговая и корпоративная коммуникация для международных рынков.',
        'Наши специализированные переводы выполняются многоязычными экспертами в сфере бизнеса, финансовыми специалистами и профильными переводчиками. Это обеспечивает корректную, последовательную и понятную передачу экономических показателей, терминов и отраслевого содержания.',
      ],
      examples: ['Годовые отчеты, балансы и финансовая отчетность', 'Договоры, условия, экспертные заключения и корпоративные документы', 'Документы для инвесторов, тендеров и банков'],
      quality: 'Профессиональная экспертиза',
      qualityText: 'Выполнение квалифицированными профильными переводчиками с глубокими знаниями бизнеса, финансов, банковского дела и корпоративной коммуникации.',
    },
    recht: {
      title: 'Бюро юридических и профильных правовых переводов',
      paragraphs: [
        'Мы переводим юридические документы для адвокатов, нотариусов, судов, органов власти, компаний и частных клиентов. Это договоры, судебные решения, постановления, доверенности, корпоративные документы, нотариальные акты и переписка с судами и органами власти.',
        'Наши юридические переводы выполняются многоязычными юристами, правовыми экспертами и профильными переводчиками. Благодаря этому юридические формулировки остаются точными, надежными и адаптированными к соответствующей правовой системе.',
      ],
      examples: ['Договоры, судебные решения и постановления', 'Доверенности, уставы и корпоративные документы', 'Переписка с органами власти и судами'],
      quality: 'Юридическая компетенция',
      qualityText: 'Юридические переводы с особым вниманием к правовой надежности, терминологии и международной понятности.',
    },
    ingenieurwesen: {
      title: 'Бюро технических и инженерных переводов',
      paragraphs: [
        'Мы переводим техническую документацию для инженерных бюро, промышленных компаний, машиностроителей и международных производителей. Это инструкции по эксплуатации, технические паспорта, документы по обслуживанию, документация по безопасности, тендеры и технические спецификации.',
        'Наши технические переводы выполняются инженерами, техниками и профильными переводчиками с техническим опытом. Это обеспечивает профессиональную передачу технических взаимосвязей, стандартов и содержания, связанного с безопасностью.',
      ],
      examples: ['Технические руководства и инструкции по эксплуатации', 'Паспорта, спецификации и патенты', 'Документация по обслуживанию, безопасности и проектам'],
      quality: 'Техническая компетенция',
      qualityText: 'Выполнение техническими переводчиками, инженерами и специалистами с глубоким отраслевым опытом.',
    },
    'medizin-dental': {
      title: 'Бюро медицинских и стоматологических переводов',
      paragraphs: [
        'Мы специализируемся на медицинских и стоматологических переводах и поддерживаем клиники, врачебные практики, стоматологии, зуботехнические лаборатории, производителей и исследовательские учреждения. Переводим заключения, письма врачей, операционные отчеты, информацию для пациентов, документацию по медтехнике и документы цифровой стоматологии.',
        'Наши медицинские переводы выполняются многоязычными врачами, стоматологическими инженерами, зубными техниками и профильными медицинскими переводчиками. Это гарантирует максимальную профессиональную точность для медицины, медицинской техники и современной стоматологии.',
      ],
      examples: ['Заключения, письма врачей и медицинские отчеты', 'Медтехника, программное обеспечение и руководства к устройствам', 'Зуботехника, имплантология и системы CAD/CAM'],
      quality: 'Медицинская специализация',
      qualityText: 'Профессиональное сопровождение многоязычными врачами, стоматологическими инженерами и экспертами здравоохранения.',
    },
    pharmazeutik: {
      title: 'Бюро переводов для фармацевтики и лекарственных средств',
      paragraphs: [
        'Мы переводим фармацевтические документы для фармацевтических компаний, аптек, клиник, CRO и производителей медицинских изделий. Это листки-вкладыши, профессиональная информация, регистрационные документы, клинические исследования и документация по качеству.',
        'Наши фармацевтические переводы выполняются фармацевтами, специалистами естественных наук и профильными переводчиками. Благодаря этому названия действующих веществ, дозировки и регуляторное содержание остаются профессионально корректными.',
      ],
      examples: ['Профессиональная информация и листки-вкладыши', 'Клинические исследования и регистрационные документы', 'Документация GMP, SOP и качества'],
      quality: 'Фармацевтическая компетенция',
      qualityText: 'Выполнение профильными переводчиками с опытом в фармацевтической промышленности, клинических исследованиях и регуляторных процессах.',
    },
    literatur: {
      title: 'Бюро переводов литературы и культуры',
      paragraphs: [
        'Мы поддерживаем издательства, авторов и культурные учреждения высококачественными литературными переводами. В центре внимания не только языковая передача, но и сохранение стиля, тональности и культурных особенностей.',
        'Наши литературные переводы выполняются опытными литературными переводчиками, лингвистами и редакторами. Так воздействие оригинала сохраняется и на целевом языке.',
      ],
      examples: ['Романы, научно-популярные книги и биографии', 'Пьесы, сценарии и радиопьесы', 'Культурные и выставочные тексты'],
      quality: 'Языковая точность',
      qualityText: 'Особое внимание стилю, плавности чтения, культурным нюансам и воздействию оригинального текста.',
    },
    'it-software': {
      title: 'Бюро переводов для IT и программного обеспечения',
      paragraphs: [
        'Мы переводим программное обеспечение, приложения, техническую документацию и цифровой контент для компаний, команд разработчиков и поставщиков ПО. Поддерживаем как небольшие приложения, так и международные проекты локализации.',
        'Наши IT-переводы выполняются разработчиками ПО, IT-специалистами и техническими переводчиками. Благодаря этому технический контекст, удобство использования и терминология остаются последовательными.',
      ],
      examples: ['Локализация ПО и приложений', 'API-документация и руководства для разработчиков', 'IT-безопасность, облако и compliance'],
      quality: 'IT-компетенция',
      qualityText: 'Переводы профильными специалистами с техническим пониманием разработки ПО, облачной инфраструктуры и IT-безопасности.',
    },
    'chemie-biowissenschaften': {
      title: 'Бюро переводов для химии и наук о жизни',
      paragraphs: [
        'Мы переводим научные документы для лабораторий, исследовательских учреждений, химических компаний и биотехнологических фирм. Это паспорта безопасности, исследования, лабораторные отчеты, патенты и научные публикации.',
        'Наши профильные переводы сопровождаются химиками, биологами и специалистами естественных наук с многоязычной экспертизой. Это обеспечивает точную и профессиональную передачу научного содержания.',
      ],
      examples: ['Паспорта безопасности и лабораторные отчеты', 'Исследования, публикации и патенты', 'Документация по биотехнологии и life science'],
      quality: 'Научная компетенция',
      qualityText: 'Точные переводы экспертами в химии, биологии, исследованиях и прикладных естественных науках.',
    },
    'industrie-produktion': {
      title: 'Бюро переводов для промышленности и производства',
      paragraphs: [
        'Мы переводим технические и коммерческие тексты для промышленности, производства, машиностроения и торговли. Сюда входят каталоги продукции, инструкции, спецификации, документы по качеству, материалы по безопасности и описания процессов.',
        'Наши профильные переводчики следят за тем, чтобы технические термины, единицы измерения, стандарты и предупреждения оставались единообразными и корректными. Поэтому перевод подходит для практического применения в производстве и экспорте.',
      ],
      examples: ['Профильные тексты и документация', 'Материалы о продуктах и маркетинге', 'Многоязычные проекты и сайты'],
      quality: 'Сертифицированное качество',
      qualityText: 'Проверка специалистами, единая терминология и адаптация к назначению текста.',
    },
  },
  fr: {
    'wirtschaft-finanzen': {
      title: 'Bureau de traduction pour économie et finance',
      paragraphs: [
        'Nous traduisons des documents économiques et financiers pour entreprises, banques, conseillers fiscaux, assurances, auditeurs et cabinets juridiques. Cela comprend les comptes annuels, bilans, rapports d’activité, contrats, expertises, dossiers d’appel d’offres, analyses financières ainsi que la communication marketing et corporate pour les marchés internationaux.',
        'Nos traductions spécialisées sont réalisées par des experts économiques multilingues, des spécialistes financiers et des traducteurs spécialisés. Nous garantissons ainsi une transmission correcte, cohérente et compréhensible des chiffres économiques, termes techniques et contenus sectoriels.',
      ],
      examples: ['Comptes annuels, bilans et rapports financiers', 'Contrats, CGV, expertises et documents d’entreprise', 'Documents investisseurs, appels d’offres et dossiers bancaires'],
      quality: 'Expertise spécialisée',
      qualityText: 'Traitement par des traducteurs spécialisés qualifiés disposant de solides connaissances en économie, finance, banque et communication d’entreprise.',
    },
    recht: {
      title: 'Bureau de traduction juridique et spécialisée en droit',
      paragraphs: [
        'Nous traduisons des documents juridiques pour avocats, notaires, tribunaux, autorités, entreprises et particuliers. Cela comprend contrats, jugements, décisions, procurations, documents de société, actes notariés et correspondance avec les tribunaux et autorités.',
        'Nos traductions juridiques sont réalisées par des juristes multilingues, experts en droit et traducteurs spécialisés. Les formulations juridiques restent ainsi précises, fiables et adaptées au système juridique concerné.',
      ],
      examples: ['Contrats, jugements et décisions judiciaires', 'Procurations, statuts et documents de société', 'Correspondance administrative et judiciaire'],
      quality: 'Compétence juridique',
      qualityText: 'Traductions juridiques avec une attention particulière à la sécurité juridique, à la terminologie spécialisée et à la clarté internationale.',
    },
    ingenieurwesen: {
      title: 'Bureau de traduction technique et ingénierie',
      paragraphs: [
        'Nous traduisons des documentations techniques pour bureaux d’ingénierie, entreprises industrielles, constructeurs de machines et fabricants internationaux. Cela comprend modes d’emploi, fiches techniques, documents de maintenance, documentation de sécurité, appels d’offres et spécifications techniques.',
        'Nos traductions techniques sont réalisées par des ingénieurs, techniciens et traducteurs spécialisés ayant une formation technique. Les contextes techniques, normes et contenus liés à la sécurité sont ainsi transmis de manière professionnelle.',
      ],
      examples: ['Manuels techniques et modes d’emploi', 'Fiches techniques, spécifications et brevets', 'Documentation de maintenance, sécurité et projets'],
      quality: 'Compétence technique',
      qualityText: 'Traitement par des traducteurs techniques, ingénieurs et spécialistes disposant d’une solide expérience sectorielle.',
    },
    'medizin-dental': {
      title: 'Bureau de traduction médicale et dentaire',
      paragraphs: [
        'Nous sommes spécialisés dans les traductions médicales et dentaires et accompagnons cliniques, cabinets médicaux, cabinets dentaires, laboratoires dentaires, fabricants et instituts de recherche. Nous traduisons notamment résultats, lettres médicales, comptes rendus opératoires, informations patients, documentation de technologie médicale et documents de dentisterie numérique.',
        'Nos traductions médicales sont réalisées par des médecins multilingues, ingénieurs dentaires, techniciens dentaires et traducteurs médicaux spécialisés. Nous garantissons ainsi une précision professionnelle maximale pour la médecine, la technologie médicale et la dentisterie moderne.',
      ],
      examples: ['Résultats, lettres médicales et rapports médicaux', 'Technologie médicale, logiciels et manuels d’appareils', 'Technique dentaire, implantologie et systèmes CAD/CAM'],
      quality: 'Spécialisation médicale',
      qualityText: 'Accompagnement spécialisé par des médecins multilingues, ingénieurs dentaires et experts du secteur de la santé.',
    },
    pharmazeutik: {
      title: 'Bureau de traduction pharmaceutique et médicaments',
      paragraphs: [
        'Nous traduisons des documents pharmaceutiques pour laboratoires pharmaceutiques, pharmacies, cliniques, CRO et fabricants de dispositifs médicaux. Cela comprend notices, informations professionnelles, dossiers d’autorisation, études cliniques et documentation qualité.',
        'Nos traductions pharmaceutiques sont réalisées par des pharmaciens, scientifiques et traducteurs spécialisés. Les noms de substances actives, dosages et contenus réglementaires restent ainsi professionnellement corrects.',
      ],
      examples: ['Informations professionnelles et notices', 'Études cliniques et dossiers d’autorisation', 'Documentation GMP, SOP et qualité'],
      quality: 'Compétence pharmaceutique',
      qualityText: 'Traitement par des traducteurs spécialisés expérimentés dans l’industrie pharmaceutique, la recherche clinique et les processus réglementaires.',
    },
    literatur: {
      title: 'Bureau de traduction littéraire et culturelle',
      paragraphs: [
        'Nous accompagnons éditeurs, auteurs et institutions culturelles avec des traductions littéraires de haute qualité. L’accent porte non seulement sur le transfert linguistique, mais aussi sur la préservation du style, du ton et des particularités culturelles.',
        'Nos traductions littéraires sont réalisées par des traducteurs littéraires expérimentés, linguistes et correcteurs. L’effet de l’original est ainsi conservé dans la langue cible.',
      ],
      examples: ['Romans, ouvrages documentaires et biographies', 'Pièces de théâtre, scénarios et textes radiophoniques', 'Textes culturels et d’exposition'],
      quality: 'Précision linguistique',
      qualityText: 'Attention particulière au style, à la fluidité, aux nuances culturelles et à l’effet du texte original.',
    },
    'it-software': {
      title: 'Bureau de traduction IT et logiciels',
      paragraphs: [
        'Nous traduisons logiciels, applications, documentation technique et contenus numériques pour entreprises, équipes de développement et fournisseurs de logiciels. Nous accompagnons aussi bien les petites applications que les projets internationaux de logiciel et de localisation.',
        'Nos traductions IT spécialisées sont réalisées par des développeurs, spécialistes IT et traducteurs techniques. Les contextes techniques, l’ergonomie et la terminologie restent ainsi cohérents.',
      ],
      examples: ['Localisation de logiciels et applications', 'Documentation API et manuels développeurs', 'Sécurité IT, cloud et conformité'],
      quality: 'Compétence IT',
      qualityText: 'Traductions par des spécialistes ayant une compréhension technique du développement logiciel, de l’infrastructure cloud et de la sécurité IT.',
    },
    'chemie-biowissenschaften': {
      title: 'Bureau de traduction chimie et sciences de la vie',
      paragraphs: [
        'Nous traduisons des documents scientifiques pour laboratoires, instituts de recherche, entreprises chimiques et sociétés biotech. Cela comprend fiches de données de sécurité, études, rapports de laboratoire, brevets et publications scientifiques.',
        'Nos traductions spécialisées sont accompagnées par des chimistes, biologistes et scientifiques dotés d’une expertise multilingue. Les contenus scientifiques sont ainsi transmis avec précision et professionnalisme.',
      ],
      examples: ['Fiches de données de sécurité et rapports de laboratoire', 'Études, publications et brevets', 'Documentation biotechnologie et sciences de la vie'],
      quality: 'Compétence scientifique',
      qualityText: 'Traductions précises par des experts en chimie, biologie, recherche et sciences naturelles appliquées.',
    },
    'industrie-produktion': {
      title: 'Bureau de traduction industrie et production',
      paragraphs: [
        'Nous traduisons des textes techniques et commerciaux pour l’industrie, la production, la construction mécanique et le commerce. Cela comprend les catalogues produits, notices, spécifications, documents qualité, documents de sécurité et descriptions de processus.',
        'Nos traducteurs spécialisés veillent à ce que les termes techniques, unités de mesure, normes et avertissements restent cohérents et corrects. La traduction est ainsi adaptée à l’utilisation pratique en production et à l’export.',
      ],
      examples: ['Textes spécialisés et documentation', 'Supports produit et marketing', 'Projets et sites multilingues'],
      quality: 'Qualité certifiée',
      qualityText: 'Contrôle spécialisé, terminologie cohérente et traduction adaptée à son usage.',
    },
  },
  uk: {
    'wirtschaft-finanzen': {
      title: 'Бюро перекладів для бізнесу та фінансів',
      paragraphs: [
        'Ми перекладаємо економічні та фінансові документи для компаній, банків, податкових консультантів, страхових компаній, аудиторів і юридичних фірм. Це охоплює річну звітність, баланси, бізнес-звіти, договори, експертні висновки, тендерну документацію, фінансову аналітику, а також маркетингову й корпоративну комунікацію для міжнародних ринків.',
        'Наші спеціалізовані переклади виконують багатомовні бізнес-експерти, фінансові фахівці та профільні перекладачі. Завдяки цьому економічні показники, терміни й галузевий зміст передаються правильно, послідовно та зрозуміло.',
      ],
      examples: ['Річна звітність, баланси та фінансові звіти', 'Договори, умови, експертні висновки та корпоративні документи', 'Документи для інвесторів, тендерів і банків'],
      quality: 'Фахова експертиза',
      qualityText: 'Виконання кваліфікованими профільними перекладачами з ґрунтовними знаннями бізнесу, фінансів, банківської справи та корпоративної комунікації.',
    },
    recht: {
      title: 'Бюро юридичних і правових спеціалізованих перекладів',
      paragraphs: [
        'Ми перекладаємо юридичні документи для адвокатів, нотаріусів, судів, органів влади, компаній і приватних клієнтів. Це договори, судові рішення, постанови, довіреності, корпоративні документи, нотаріальні акти та листування з судами й органами влади.',
        'Наші юридичні переклади виконують багатомовні юристи, правові експерти та профільні перекладачі. Завдяки цьому юридичні формулювання залишаються точними, надійними й адаптованими до відповідної правової системи.',
      ],
      examples: ['Договори, судові рішення та постанови', 'Довіреності, статути та корпоративні документи', 'Листування з органами влади й судами'],
      quality: 'Юридична компетенція',
      qualityText: 'Юридичні переклади з особливою увагою до правової надійності, фахової термінології та міжнародної зрозумілості.',
    },
    ingenieurwesen: {
      title: 'Бюро технічних та інженерних перекладів',
      paragraphs: [
        'Ми перекладаємо технічну документацію для інженерних бюро, промислових компаній, машинобудівників і міжнародних виробників. Це інструкції з експлуатації, технічні паспорти, документи з обслуговування, документація з безпеки, тендери й технічні специфікації.',
        'Наші технічні переклади виконують інженери, техніки та профільні перекладачі з технічним досвідом. Завдяки цьому технічні взаємозв’язки, стандарти й зміст, пов’язаний із безпекою, передаються професійно.',
      ],
      examples: ['Технічні посібники та інструкції з експлуатації', 'Паспорти, специфікації та патенти', 'Документація з обслуговування, безпеки та проєктів'],
      quality: 'Технічна компетенція',
      qualityText: 'Виконання технічними перекладачами, інженерами та спеціалістами з ґрунтовним галузевим досвідом.',
    },
    'medizin-dental': {
      title: 'Бюро медичних і стоматологічних перекладів',
      paragraphs: [
        'Ми спеціалізуємося на медичних і стоматологічних перекладах та підтримуємо клініки, медичні практики, стоматології, зуботехнічні лабораторії, виробників і дослідницькі установи. Перекладаємо висновки, листи лікарів, операційні звіти, інформацію для пацієнтів, документацію з медтехніки та документи цифрової стоматології.',
        'Наші медичні переклади виконують багатомовні лікарі, стоматологічні інженери, зубні техніки та профільні медичні перекладачі. Це гарантує найвищу професійну точність для медицини, медичної техніки та сучасної стоматології.',
      ],
      examples: ['Висновки, листи лікарів і медичні звіти', 'Медтехніка, програмне забезпечення та посібники до пристроїв', 'Зуботехніка, імплантологія та системи CAD/CAM'],
      quality: 'Медична спеціалізація',
      qualityText: 'Фаховий супровід багатомовними лікарями, стоматологічними інженерами та експертами сфери охорони здоров’я.',
    },
    pharmazeutik: {
      title: 'Бюро перекладів для фармацевтики та лікарських засобів',
      paragraphs: [
        'Ми перекладаємо фармацевтичні документи для фармацевтичних компаній, аптек, клінік, CRO та виробників медичних виробів. Це листки-вкладиші, професійна інформація, реєстраційні документи, клінічні дослідження та документація з якості.',
        'Наші фармацевтичні переклади виконують фармацевти, фахівці природничих наук і профільні перекладачі. Завдяки цьому назви діючих речовин, дозування й регуляторний зміст залишаються професійно правильними.',
      ],
      examples: ['Професійна інформація та листки-вкладиші', 'Клінічні дослідження та реєстраційні документи', 'Документація GMP, SOP і якості'],
      quality: 'Фармацевтична компетенція',
      qualityText: 'Виконання профільними перекладачами з досвідом у фармацевтичній промисловості, клінічних дослідженнях і регуляторних процесах.',
    },
    literatur: {
      title: 'Бюро перекладів літератури та культури',
      paragraphs: [
        'Ми підтримуємо видавництва, авторів і культурні установи високоякісними літературними перекладами. У центрі уваги не лише мовна передача, а й збереження стилю, тональності та культурних особливостей.',
        'Наші літературні переклади виконують досвідчені літературні перекладачі, лінгвісти й редактори. Так вплив оригіналу зберігається і в цільовій мові.',
      ],
      examples: ['Романи, нон-фікшн і біографії', 'П’єси, сценарії та тексти радіовистав', 'Культурні та виставкові тексти'],
      quality: 'Мовна точність',
      qualityText: 'Особлива увага до стилю, плавності читання, культурних нюансів і впливу оригінального тексту.',
    },
    'it-software': {
      title: 'Бюро перекладів для IT та програмного забезпечення',
      paragraphs: [
        'Ми перекладаємо програмне забезпечення, застосунки, технічну документацію та цифровий контент для компаній, команд розробників і постачальників ПЗ. Підтримуємо як невеликі застосунки, так і міжнародні проєкти локалізації.',
        'Наші IT-переклади виконують розробники ПЗ, IT-фахівці та технічні перекладачі. Завдяки цьому технічний контекст, зручність використання й термінологія залишаються послідовними.',
      ],
      examples: ['Локалізація ПЗ і застосунків', 'API-документація та посібники для розробників', 'IT-безпека, хмара та compliance'],
      quality: 'IT-компетенція',
      qualityText: 'Переклади профільними фахівцями з технічним розумінням розробки ПЗ, хмарної інфраструктури та IT-безпеки.',
    },
    'chemie-biowissenschaften': {
      title: 'Бюро перекладів для хімії та наук про життя',
      paragraphs: [
        'Ми перекладаємо наукові документи для лабораторій, дослідницьких установ, хімічних компаній і біотехнологічних фірм. Це паспорти безпеки, дослідження, лабораторні звіти, патенти й наукові публікації.',
        'Наші профільні переклади супроводжують хіміки, біологи та фахівці природничих наук із багатомовною експертизою. Завдяки цьому науковий зміст передається точно й професійно.',
      ],
      examples: ['Паспорти безпеки та лабораторні звіти', 'Дослідження, публікації та патенти', 'Документація з біотехнології та наук про життя'],
      quality: 'Наукова компетенція',
      qualityText: 'Точні переклади експертами з хімії, біології, досліджень і прикладних природничих наук.',
    },
    'industrie-produktion': {
      title: 'Бюро перекладів для промисловості та виробництва',
      paragraphs: [
        'Ми перекладаємо технічні та комерційні тексти для промисловості, виробництва, машинобудування й торгівлі. Це охоплює каталоги продукції, інструкції, специфікації, документи з якості, матеріали з безпеки та описи процесів.',
        'Наші профільні перекладачі дбають про те, щоб технічні терміни, одиниці вимірювання, стандарти й попередження залишалися узгодженими та правильними. Тому переклад підходить для практичного використання у виробництві й експорті.',
      ],
      examples: ['Фахові тексти та документація', 'Продуктові й маркетингові матеріали', 'Багатомовні проєкти та сайти'],
      quality: 'Сертифікована якість',
      qualityText: 'Фахова перевірка, узгоджена термінологія й адаптація до призначення тексту.',
    },
  },
};

export default function Specialties() {
  const { lang } = useI18n();
  const copy = PAGE_COPY[lang] || PAGE_COPY.de;
  const specialties = useMemo(() => getSpecialties(lang), [lang]);
  const [activeId, setActiveId] = useState('medizin-dental');
  const sectionRef = useRef(null);
  const [drawerAvailable, setDrawerAvailable] = useState(false);
  const [railOpen, setRailOpen] = useState(false);
  const active = specialties.find((item) => item.id === activeId) || specialties[0];
  const documentContent = DOCUMENT_SPECIALTY_CONTENT[lang]?.[active.id] || DOCUMENT_SPECIALTY_CONTENT.de[active.id];
  const paragraphs = active.paragraphs || [active.text];
  const summaryParagraphs = documentContent?.paragraphs || paragraphs.slice(0, 2);
  const summaryExamples = documentContent?.examples || (active.examples || []).slice(0, 3);
  const qualityTitle = documentContent?.quality || copy.quality;
  const qualityText = documentContent?.qualityText || copy.qualityText;

  const renderSummaryParagraph = (paragraph) => {
    if (lang !== 'de' || active.id !== 'medizin-dental' || !paragraph.includes('spezialisiert')) {
      return paragraph;
    }
    const match = paragraph.match(/\bspezialisiert\b/);
    if (!match || match.index === undefined) {
      return paragraph;
    }
    const before = paragraph.slice(0, match.index);
    const after = paragraph.slice(match.index + 'spezialisiert'.length);
    return (
      <>
        {before}
        <strong>spezialisiert</strong>
        {after}
      </>
    );
  };

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setDrawerAvailable(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setDrawerAvailable(entry.isIntersecting),
      { root: null, threshold: 0.08, rootMargin: '-88px 0px -28% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="specialty-page" id="fachuebersetzungen" aria-labelledby="specialty-page-heading" ref={sectionRef}>
      <div className="container specialty-page-intro">
        <span className="specialty-page-eyebrow">{copy.eyebrow}</span>
        <h1 id="specialty-page-heading">{copy.title}</h1>
        <p>{copy.sub}</p>
      </div>

      <div className="container specialty-page-shell">
        <button
          type="button"
          className={`specialty-drawer-toggle specialty-drawer-toggle--page${lang === 'ar' ? ' is-rtl' : ''}${drawerAvailable || railOpen ? ' is-visible' : ''}`}
          onClick={() => setRailOpen(true)}
          aria-expanded={railOpen}
          aria-controls="fachwissen-point-menu"
          aria-label={copy.nav}
        >
          <span className="specialty-drawer-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <article className="specialty-page-content">
          <span className="specialty-page-kicker">{copy.eyebrow}</span>
          <h2>{documentContent?.title || active.title}</h2>

          <div className="specialty-page-copy">
            {summaryParagraphs.map((paragraph) => <p key={paragraph}>{renderSummaryParagraph(paragraph)}</p>)}
          </div>

          <ul className="specialty-page-examples">
            {summaryExamples.map((example) => <li key={example}>{example}</li>)}
          </ul>

          <div className="specialty-page-quality">
            <div className="specialty-page-quality-icon" aria-hidden="true">i</div>
            <div>
              <h3>{qualityTitle}</h3>
              <p>{qualityText}</p>
            </div>
          </div>

          <div className="specialty-page-actions">
            <div className="specialty-page-tags">
              {copy.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="specialty-page-quote">
              <div className="specialty-page-price">
                <span>{copy.price}</span>
                <strong>0,09€</strong>
                <small>{copy.unit}</small>
              </div>
              <a href="/angebot" className="btn btn-primary">
                {active.cta} <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </article>

        <aside
          id="fachwissen-point-menu"
          className={`specialty-page-rail${lang === 'ar' ? ' is-rtl' : ''}${railOpen ? ' is-open' : ''}`}
          aria-label={copy.nav}
        >
          <button
            type="button"
            className="specialty-drawer-close"
            onClick={() => setRailOpen(false)}
            aria-label={copy.close}
          >
            ×
          </button>
          <span className="specialty-page-rail-label">{copy.nav}</span>
          {specialties.map((item) => {
            const Icon = ICONS[item.id] || BriefcaseIcon;
            return (
              <button
                type="button"
                key={item.id}
                className={item.id === active.id ? 'active' : ''}
                onClick={() => {
                  setActiveId(item.id);
                  setRailOpen(false);
                }}
                aria-pressed={item.id === active.id}
              >
                <Icon />
                <span>{item.label}</span>
                <ArrowIcon />
              </button>
            );
          })}
        </aside>
        <button
          type="button"
          className={`specialty-drawer-backdrop${railOpen ? ' is-open' : ''}`}
          onClick={() => setRailOpen(false)}
          aria-label={copy.close}
        />
      </div>
    </section>
  );
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>;
}

function BriefcaseIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6V4h6v2M4 7h16v12H4zM4 11h16M10 11v2h4v-2" /></svg>;
}

function ScaleIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v17M7 20h10M5 6h14M7 6l-4 7h8L7 6Zm10 0-4 7h8l-4-7Z" /></svg>;
}

function CogIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1A7 7 0 0 0 15 6l-.3-2.5h-4L10.4 6A7 7 0 0 0 8 7.1l-2.3-1-2 3.4 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 2.4 1.1l.3 2.5h4L15 18a7 7 0 0 0 1.6-1.1l2.3 1 2-3.4-2-1.5c.1-.3.1-.7.1-1Z" /></svg>;
}

function MedicalIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4h6v5h5v6h-5v5H9v-5H4V9h5z" /></svg>;
}

function FlaskIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 15h8" /></svg>;
}

function BookIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h11a3 3 0 0 1 3 3v13H7a2 2 0 0 1-2-2V4Zm0 13h11M9 8h6M9 11h6" /></svg>;
}

function MonitorIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="1" /><path d="M8 21h8M12 17v4" /></svg>;
}

function AtomIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="1" /><path d="M19 5c2 2-.8 7-4.5 10.5S6 22 4 20s.8-7 4.5-10.5S17 3 19 5ZM5 5c-2 2 .8 7 4.5 10.5S18 22 20 20s-.8-7-4.5-10.5S7 3 5 5Z" /></svg>;
}

function FactoryIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21V9l6 3V9l6 3V5h4l2 16H3Zm4-4h2m3 0h2m3 0h2" /></svg>;
}
