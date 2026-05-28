const baseSpecialties = [
  {
    id: 'wirtschaft-finanzen',
    de: {
      label: 'Wirtschaft & Finanzen',
      title: 'Übersetzungsbüro für Wirtschaft und Finanzen',
      text: 'Wir unterstützen Unternehmen, Kanzleien, Steuerberater, Banken und Versicherungen bei fachsprachlichen Übersetzungen - von Geschäftskorrespondenz, Verträgen und AGB über Jahresabschlüsse, Bilanzen, Geschäftsberichte und Gutachten bis hin zu Marketingunterlagen, Präsentationen und Webseiten.',
      examples: ['Jahresabschlüsse und Finanzberichte', 'Verträge, AGB und Gutachten', 'Investor-Relations- und Ausschreibungsunterlagen'],
      cta: 'Kostenlose Anfrage für Wirtschafts- und Finanzübersetzung',
    },
    en: {
      label: 'Business & Finance',
      title: 'Translation office for business and finance',
      text: 'We support companies, law firms, tax advisers, banks and insurers with specialist translations, from business correspondence, contracts and terms to annual reports, balance sheets, expert reports, presentations and websites.',
      examples: ['Annual statements and financial reports', 'Contracts, terms and expert opinions', 'Investor relations and tender documents'],
      cta: 'Request a free business and finance quote',
    },
    ar: {
      label: 'الأعمال والمال',
      title: 'مكتب ترجمة للأعمال والمال',
      text: 'ندعم الشركات والمكاتب القانونية والمحاسبين والبنوك وشركات التأمين بترجمات متخصصة، من المراسلات والعقود والشروط إلى التقارير السنوية والميزانيات والعروض والمواقع الإلكترونية.',
      examples: ['القوائم والتقارير المالية', 'العقود والشروط والتقارير الخبيرة', 'مستندات المستثمرين والمناقصات'],
      cta: 'اطلب عرضا مجانيا لترجمة الأعمال والمال',
    },
    tr: {
      label: 'Ekonomi & Finans',
      title: 'Ekonomi ve finans çeviri bürosu',
      text: 'Şirketlere, hukuk bürolarına, mali müşavirlere, bankalara ve sigorta şirketlerine iş yazışmaları, sözleşmeler, yıllık raporlar, bilançolar, uzman raporları, sunumlar ve web siteleri için uzman çeviri sunuyoruz.',
      examples: ['Yıllık bilançolar ve finans raporları', 'Sözleşmeler, şartlar ve uzman raporları', 'Yatırımcı ilişkileri ve ihale belgeleri'],
      cta: 'Ekonomi ve finans çevirisi için ücretsiz teklif alın',
    },
    ru: {
      label: 'Бизнес и финансы',
      title: 'Бюро переводов для бизнеса и финансов',
      text: 'Мы помогаем компаниям, юридическим фирмам, налоговым консультантам, банкам и страховым компаниям с профильными переводами: от деловой переписки и договоров до годовых отчетов, балансов, презентаций и сайтов.',
      examples: ['Годовая отчетность и финансовые отчеты', 'Договоры, условия и экспертные заключения', 'Документы для инвесторов и тендеров'],
      cta: 'Запросить бесплатный расчет для финансового перевода',
    },
    fr: {
      label: 'Économie & finance',
      title: 'Bureau de traduction économie et finance',
      text: 'Nous accompagnons entreprises, cabinets, conseillers fiscaux, banques et assurances pour les traductions spécialisées, de la correspondance commerciale aux contrats, bilans, rapports, présentations et sites web.',
      examples: ['Bilans et rapports financiers', 'Contrats, conditions et expertises', 'Documents investisseurs et appels d’offres'],
      cta: 'Demander un devis gratuit économie et finance',
    },
    uk: {
      label: 'Бізнес і фінанси',
      title: 'Бюро перекладів для бізнесу та фінансів',
      text: 'Ми підтримуємо компанії, юридичні фірми, податкових консультантів, банки та страхові компанії у фахових перекладах: від ділового листування і договорів до річних звітів, балансів, презентацій і сайтів.',
      examples: ['Річні та фінансові звіти', 'Договори, умови та експертні висновки', 'Документи для інвесторів і тендерів'],
      cta: 'Запросити безкоштовну пропозицію для фінансового перекладу',
    },
  },
  {
    id: 'recht',
    de: {
      label: 'Recht',
      title: 'Übersetzungsbüro für Recht und juristische Fachübersetzungen',
      text: 'Wir übersetzen juristische Dokumente für Rechtsanwälte, Notariate, Unternehmen, Gerichte, Behörden und Privatpersonen. Dazu gehören Verträge, AGB, Urteile, Beschlüsse, Klageschriften, Vollmachten, Satzungen, notarielle Urkunden und Behördenkorrespondenz.',
      examples: ['Verträge und Gesellschaftsunterlagen', 'Urteile, Beschlüsse und Klageschriften', 'Notarielle Urkunden und Vollmachten'],
      cta: 'Kostenlose Anfrage für juristische Übersetzung',
    },
    en: {
      label: 'Legal',
      title: 'Translation office for legal specialist translations',
      text: 'We translate legal documents for lawyers, notaries, companies, courts, authorities and private clients, including contracts, terms, judgments, resolutions, pleadings, powers of attorney, articles of association and notarial deeds.',
      examples: ['Contracts and corporate documents', 'Judgments, resolutions and pleadings', 'Notarial deeds and powers of attorney'],
      cta: 'Request a free legal translation quote',
    },
    ar: {
      label: 'القانون',
      title: 'مكتب ترجمة قانونية متخصصة',
      text: 'نترجم المستندات القانونية للمحامين والموثقين والشركات والمحاكم والجهات الرسمية والأفراد، مثل العقود والأحكام واللوائح والوكالات والمستندات الموثقة والمراسلات الرسمية.',
      examples: ['العقود ومستندات الشركات', 'الأحكام والدعاوى والقرارات', 'المستندات الموثقة والوكالات'],
      cta: 'اطلب عرضا مجانيا لترجمة قانونية',
    },
    tr: {
      label: 'Hukuk',
      title: 'Hukuki uzman çeviri bürosu',
      text: 'Avukatlar, noterler, şirketler, mahkemeler, kurumlar ve özel kişiler için sözleşmeler, kararlar, dava dilekçeleri, vekaletnameler, şirket belgeleri, noter evrakları ve resmi yazışmaları çeviriyoruz.',
      examples: ['Sözleşmeler ve şirket belgeleri', 'Mahkeme kararları ve dilekçeler', 'Noter evrakları ve vekaletnameler'],
      cta: 'Hukuki çeviri için ücretsiz teklif alın',
    },
    ru: {
      label: 'Право',
      title: 'Бюро юридических переводов',
      text: 'Мы переводим юридические документы для адвокатов, нотариусов, компаний, судов, ведомств и частных клиентов: договоры, судебные решения, иски, доверенности, уставы, нотариальные документы и официальную переписку.',
      examples: ['Договоры и корпоративные документы', 'Судебные решения, постановления и иски', 'Нотариальные документы и доверенности'],
      cta: 'Запросить бесплатный расчет юридического перевода',
    },
    fr: {
      label: 'Droit',
      title: 'Bureau de traduction juridique',
      text: 'Nous traduisons les documents juridiques pour avocats, notaires, entreprises, tribunaux, autorités et particuliers : contrats, conditions générales, jugements, actes, procurations, statuts et correspondance administrative.',
      examples: ['Contrats et documents de société', 'Jugements, décisions et conclusions', 'Actes notariés et procurations'],
      cta: 'Demander un devis gratuit pour traduction juridique',
    },
    uk: {
      label: 'Право',
      title: 'Бюро юридичних перекладів',
      text: 'Ми перекладаємо юридичні документи для адвокатів, нотаріусів, компаній, судів, органів влади та приватних клієнтів: договори, рішення, позови, довіреності, статути, нотаріальні документи й офіційне листування.',
      examples: ['Договори та корпоративні документи', 'Судові рішення, постанови й позови', 'Нотаріальні документи та довіреності'],
      cta: 'Запросити безкоштовну пропозицію для юридичного перекладу',
    },
  },
  {
    id: 'ingenieurwesen',
    de: {
      label: 'Ingenieurwesen',
      title: 'Übersetzungsbüro für Technik und Ingenieurwesen',
      text: 'Für Hersteller, Ingenieurbüros, Planungsbüros, Maschinenbauer und Industrieunternehmen übersetzen wir technische Unterlagen fachgerecht - von Bedienungsanleitungen und Datenblättern bis zu Lastenheften, Sicherheitsdokumenten, Patentschriften und technischen Angeboten.',
      examples: ['Bedienungsanleitungen und Handbücher', 'Lasten- und Pflichtenhefte', 'Sicherheitsdokumente und Patente'],
      cta: 'Kostenlose Anfrage für technische Fachübersetzung',
    },
    en: {
      label: 'Engineering',
      title: 'Translation office for technology and engineering',
      text: 'For manufacturers, engineering firms, planning offices and industrial companies, we translate technical documentation such as manuals, data sheets, specifications, safety documents, patents and technical offers.',
      examples: ['Operating manuals and handbooks', 'Requirements and specification documents', 'Safety documents and patents'],
      cta: 'Request a free technical translation quote',
    },
    ar: {
      label: 'الهندسة',
      title: 'مكتب ترجمة للتقنية والهندسة',
      text: 'نترجم الوثائق التقنية للمصنعين ومكاتب الهندسة والتخطيط وشركات الصناعة، مثل أدلة التشغيل وبيانات المنتجات والمواصفات ووثائق السلامة وبراءات الاختراع والعروض التقنية.',
      examples: ['أدلة التشغيل والكتيبات', 'وثائق المتطلبات والمواصفات', 'وثائق السلامة وبراءات الاختراع'],
      cta: 'اطلب عرضا مجانيا لترجمة تقنية',
    },
    tr: {
      label: 'Mühendislik',
      title: 'Teknik ve mühendislik çeviri bürosu',
      text: 'Üreticiler, mühendislik ofisleri, planlama büroları ve sanayi şirketleri için kullanım kılavuzları, veri sayfaları, şartnameler, güvenlik belgeleri, patentler ve teknik teklifleri çeviriyoruz.',
      examples: ['Kullanım kılavuzları ve el kitapları', 'Şartname ve teknik gereksinimler', 'Güvenlik belgeleri ve patentler'],
      cta: 'Teknik çeviri için ücretsiz teklif alın',
    },
    ru: {
      label: 'Инжиниринг',
      title: 'Бюро технических и инженерных переводов',
      text: 'Для производителей, инженерных бюро и промышленных компаний мы переводим техническую документацию: инструкции, паспорта изделий, спецификации, документы по безопасности, патенты и технические предложения.',
      examples: ['Инструкции и руководства', 'Технические задания и спецификации', 'Документы по безопасности и патенты'],
      cta: 'Запросить бесплатный расчет технического перевода',
    },
    fr: {
      label: 'Ingénierie',
      title: 'Bureau de traduction technique et ingénierie',
      text: 'Pour fabricants, bureaux d’études et entreprises industrielles, nous traduisons notices, fiches techniques, cahiers des charges, documents de sécurité, brevets et offres techniques.',
      examples: ['Notices et manuels', 'Cahiers des charges et spécifications', 'Documents de sécurité et brevets'],
      cta: 'Demander un devis gratuit pour traduction technique',
    },
    uk: {
      label: 'Інженерія',
      title: 'Бюро технічних та інженерних перекладів',
      text: 'Для виробників, інженерних бюро та промислових компаній ми перекладаємо технічну документацію: інструкції, технічні паспорти, специфікації, документи з безпеки, патенти й технічні пропозиції.',
      examples: ['Інструкції та посібники', 'Технічні завдання і специфікації', 'Документи з безпеки та патенти'],
      cta: 'Запросити безкоштовну пропозицію для технічного перекладу',
    },
  },
  {
    id: 'medizin-dental',
    de: {
      label: 'Medizinische & Dentalmedizin',
      title: 'Übersetzungsbüro für Medizin und Dentalmedizin',
      text: 'Wir unterstützen Kliniken, Praxen, Labore, Hersteller und Fachverlage mit präzisen medizinischen und dentalmedizinischen Übersetzungen. Ein besonderer Schwerpunkt liegt auf Dentalsoftware, Zahntechnik, Medizintechnik, Befunden, Arztbriefen und Studienunterlagen.',
      examples: ['Befunde, Arztbriefe und OP-Berichte', 'Medizintechnik-Handbücher und Produktkataloge', 'Dentalsoftware, Implantate und Zahntechnik'],
      cta: 'Kostenlose Anfrage für medizinische & dentalmedizinische Fachübersetzung',
    },
    en: {
      label: 'Medical & Dental',
      title: 'Translation office for medical and dental medicine',
      text: 'We support clinics, practices, laboratories, manufacturers and publishers with accurate medical and dental translations, including dental software, dental technology, medical devices, findings, doctor’s letters and study documents.',
      examples: ['Findings, doctor’s letters and operation reports', 'Medical device manuals and catalogues', 'Dental software, implants and dental technology'],
      cta: 'Request a free medical and dental translation quote',
    },
    ar: {
      label: 'الطب وطب الأسنان',
      title: 'مكتب ترجمة للطب وطب الأسنان',
      text: 'ندعم العيادات والمختبرات والمصنعين والناشرين بترجمات طبية وطب أسنان دقيقة، مثل برامج طب الأسنان والتقنية السنية والأجهزة الطبية والتقارير وخطابات الأطباء ووثائق الدراسات.',
      examples: ['النتائج الطبية وخطابات الأطباء وتقارير العمليات', 'أدلة الأجهزة الطبية والكتالوجات', 'برامج الأسنان والزرعات والتقنية السنية'],
      cta: 'اطلب عرضا مجانيا لترجمة طبية وسنية',
    },
    tr: {
      label: 'Tıp & Diş Hekimliği',
      title: 'Tıp ve diş hekimliği çeviri bürosu',
      text: 'Klinikler, muayenehaneler, laboratuvarlar, üreticiler ve yayıncılar için tıbbi ve dental çeviriler yapıyoruz. Odak alanlarımız arasında dental yazılım, diş teknolojisi, medikal cihazlar, raporlar ve çalışma belgeleri vardır.',
      examples: ['Bulgular, doktor mektupları ve ameliyat raporları', 'Medikal cihaz kılavuzları ve katalogları', 'Dental yazılım, implantlar ve diş teknolojisi'],
      cta: 'Tıbbi ve dental çeviri için ücretsiz teklif alın',
    },
    ru: {
      label: 'Медицина и стоматология',
      title: 'Бюро медицинских и стоматологических переводов',
      text: 'Мы поддерживаем клиники, практики, лаборатории, производителей и издательства точными медицинскими и стоматологическими переводами: ПО для стоматологии, медтехника, заключения, врачебные письма и документы исследований.',
      examples: ['Заключения, врачебные письма и операционные отчеты', 'Руководства и каталоги медтехники', 'Стоматологическое ПО, импланты и зуботехника'],
      cta: 'Запросить бесплатный расчет медицинского перевода',
    },
    fr: {
      label: 'Médecine & dentaire',
      title: 'Bureau de traduction médicale et dentaire',
      text: 'Nous accompagnons cliniques, cabinets, laboratoires, fabricants et éditeurs avec des traductions médicales et dentaires précises : logiciels dentaires, technique dentaire, dispositifs médicaux, comptes rendus et documents d’étude.',
      examples: ['Résultats, lettres médicales et rapports opératoires', 'Manuels et catalogues de dispositifs médicaux', 'Logiciels dentaires, implants et technique dentaire'],
      cta: 'Demander un devis gratuit médical et dentaire',
    },
    uk: {
      label: 'Медицина і стоматологія',
      title: 'Бюро медичних і стоматологічних перекладів',
      text: 'Ми підтримуємо клініки, практики, лабораторії, виробників і видавництва точними медичними та стоматологічними перекладами: стоматологічне ПЗ, зуботехніка, медичні пристрої, висновки та дослідження.',
      examples: ['Висновки, листи лікарів і операційні звіти', 'Посібники та каталоги медтехніки', 'Стоматологічне ПЗ, імпланти та зуботехніка'],
      cta: 'Запросити безкоштовну пропозицію для медичного перекладу',
    },
  },
  {
    id: 'pharmazeutik',
    de: {
      label: 'Pharmazeutik',
      title: 'Übersetzungsbüro für Pharmazeutik und Arzneimittel',
      text: 'Für pharmazeutische Unternehmen, Apotheken, Kliniken, CROs, Medizinproduktehersteller und Behörden übersetzen wir fachlich exakte Arzneimitteltexte mit besonderem Blick auf Wirkstoffe, Dosierungen, Warnhinweise und regulatorische Formulierungen.',
      examples: ['Fachinformationen und Packungsbeilagen', 'Zulassungsunterlagen und Studiendokumente', 'GMP-Dokumente, SOPs und Etiketten'],
      cta: 'Kostenlose Anfrage für pharmazeutische Fachübersetzung',
    },
    en: {
      label: 'Pharmaceuticals',
      title: 'Translation office for pharmaceuticals and medicines',
      text: 'For pharmaceutical companies, pharmacies, clinics, CROs, medical device manufacturers and authorities, we translate medicine-related texts with attention to active substances, dosages, warnings and regulatory wording.',
      examples: ['SmPCs and package leaflets', 'Approval files and study documents', 'GMP documents, SOPs and labels'],
      cta: 'Request a free pharmaceutical translation quote',
    },
    ar: {
      label: 'الصيدلة',
      title: 'مكتب ترجمة للصيدلة والأدوية',
      text: 'نترجم النصوص الدوائية للشركات الصيدلانية والصيدليات والعيادات وشركات الأبحاث ومصنعي الأجهزة الطبية والجهات الرسمية، مع عناية خاصة بالمواد الفعالة والجرعات والتحذيرات والصياغات التنظيمية.',
      examples: ['معلومات الدواء والنشرات', 'ملفات التسجيل ووثائق الدراسات', 'وثائق GMP وإجراءات SOP والملصقات'],
      cta: 'اطلب عرضا مجانيا لترجمة صيدلانية',
    },
    tr: {
      label: 'Farmasötik',
      title: 'Farmasötik ve ilaç çeviri bürosu',
      text: 'İlaç şirketleri, eczaneler, klinikler, CRO’lar, medikal ürün üreticileri ve kurumlar için ilaç metinlerini; etken madde, doz, uyarı ve regülasyon ifadelerine dikkat ederek çeviriyoruz.',
      examples: ['Ürün bilgileri ve prospektüsler', 'Ruhsat dosyaları ve çalışma belgeleri', 'GMP belgeleri, SOP’ler ve etiketler'],
      cta: 'Farmasötik çeviri için ücretsiz teklif alın',
    },
    ru: {
      label: 'Фармацевтика',
      title: 'Бюро фармацевтических и лекарственных переводов',
      text: 'Для фармацевтических компаний, аптек, клиник, CRO, производителей медизделий и ведомств мы переводим тексты об Arzneimittel с учетом действующих веществ, дозировок, предупреждений и регуляторных формулировок.',
      examples: ['Инструкции и листки-вкладыши', 'Регистрационные и исследовательские документы', 'GMP-документы, SOP и этикетки'],
      cta: 'Запросить бесплатный расчет фармацевтического перевода',
    },
    fr: {
      label: 'Pharmaceutique',
      title: 'Bureau de traduction pharmaceutique',
      text: 'Pour entreprises pharmaceutiques, pharmacies, cliniques, CRO, fabricants de dispositifs médicaux et autorités, nous traduisons les textes pharmaceutiques avec attention aux substances, dosages, avertissements et exigences réglementaires.',
      examples: ['RCP et notices', 'Dossiers d’autorisation et documents d’étude', 'Documents GMP, SOP et étiquettes'],
      cta: 'Demander un devis gratuit pharmaceutique',
    },
    uk: {
      label: 'Фармацевтика',
      title: 'Бюро фармацевтичних перекладів',
      text: 'Для фармацевтичних компаній, аптек, клінік, CRO, виробників медичних виробів і органів влади ми перекладаємо тексти про лікарські засоби з увагою до діючих речовин, дозувань, попереджень і регуляторних формулювань.',
      examples: ['Інструкції та листки-вкладиші', 'Реєстраційні й дослідницькі документи', 'GMP-документи, SOP та етикетки'],
      cta: 'Запросити безкоштовну пропозицію для фармацевтичного перекладу',
    },
  },
];

const extraSpecialties = [
  {
    id: 'literatur',
    label: { de: 'Literatur', en: 'Literature', ar: 'الأدب', tr: 'Edebiyat', ru: 'Литература', fr: 'Littérature', uk: 'Література' },
    title: { de: 'Übersetzungsbüro für Literatur und Kultur', en: 'Translation office for literature and culture', ar: 'مكتب ترجمة للأدب والثقافة', tr: 'Edebiyat ve kültür çeviri bürosu', ru: 'Бюро литературных и культурных переводов', fr: 'Bureau de traduction littérature et culture', uk: 'Бюро літературних і культурних перекладів' },
  },
  {
    id: 'it-software',
    label: { de: 'IT & Software', en: 'IT & Software', ar: 'تقنية المعلومات والبرمجيات', tr: 'BT & Yazılım', ru: 'IT и ПО', fr: 'IT & logiciels', uk: 'IT і ПЗ' },
    title: { de: 'Übersetzungsbüro für IT und Software', en: 'Translation office for IT and software', ar: 'مكتب ترجمة لتقنية المعلومات والبرمجيات', tr: 'BT ve yazılım çeviri bürosu', ru: 'Бюро переводов для IT и ПО', fr: 'Bureau de traduction IT et logiciels', uk: 'Бюро перекладів для IT і ПЗ' },
  },
  {
    id: 'chemie-biowissenschaften',
    label: { de: 'Chemie & Biowissenschaften', en: 'Chemistry & Life Sciences', ar: 'الكيمياء وعلوم الحياة', tr: 'Kimya & Yaşam Bilimleri', ru: 'Химия и бионауки', fr: 'Chimie & sciences du vivant', uk: 'Хімія і біонауки' },
    title: { de: 'Übersetzungsbüro für Chemie und Biowissenschaften', en: 'Translation office for chemistry and life sciences', ar: 'مكتب ترجمة للكيمياء وعلوم الحياة', tr: 'Kimya ve yaşam bilimleri çeviri bürosu', ru: 'Бюро переводов по химии и бионаукам', fr: 'Bureau de traduction chimie et sciences du vivant', uk: 'Бюро перекладів з хімії та біонаук' },
  },
  {
    id: 'industrie-produktion',
    label: { de: 'Industrie & Produktion', en: 'Industry & Production', ar: 'الصناعة والإنتاج', tr: 'Sanayi & Üretim', ru: 'Промышленность и производство', fr: 'Industrie & production', uk: 'Промисловість і виробництво' },
    title: { de: 'Übersetzungsbüro für Industrie und Produktion', en: 'Translation office for industry and production', ar: 'مكتب ترجمة للصناعة والإنتاج', tr: 'Sanayi ve üretim çeviri bürosu', ru: 'Бюро переводов для промышленности и производства', fr: 'Bureau de traduction industrie et production', uk: 'Бюро перекладів для промисловості та виробництва' },
  },
];

const generic = {
  de: {
    text: 'Wir übertragen Ihre Fachunterlagen präzise, terminologisch konsistent und passend zum jeweiligen Einsatzbereich. Dabei achten wir auf Zielgruppe, Fachsprache, Normen und die spätere Verwendung der Übersetzung.',
    examples: ['Fachtexte und Dokumentationen', 'Produkt- und Marketingunterlagen', 'Mehrsprachige Projekte und Webseiten'],
    cta: 'Kostenlose Fachübersetzung anfragen',
  },
  en: {
    text: 'We translate your specialist documents accurately, consistently and in line with their intended use. We consider the target audience, terminology, standards and the later purpose of the translation.',
    examples: ['Specialist texts and documentation', 'Product and marketing materials', 'Multilingual projects and websites'],
    cta: 'Request a free specialist translation quote',
  },
  ar: {
    text: 'نترجم مستنداتكم المتخصصة بدقة واتساق اصطلاحي وبما يناسب مجال الاستخدام. نراعي الجمهور المستهدف والمصطلحات والمعايير والغرض النهائي من الترجمة.',
    examples: ['نصوص ووثائق متخصصة', 'مواد المنتجات والتسويق', 'مشاريع ومواقع متعددة اللغات'],
    cta: 'اطلب عرضا مجانيا لترجمة متخصصة',
  },
  tr: {
    text: 'Uzman belgelerinizi kullanım amacına uygun, doğru ve terminolojik olarak tutarlı şekilde çeviriyoruz. Hedef kitleyi, alan dilini, standartları ve çevirinin sonraki kullanımını dikkate alıyoruz.',
    examples: ['Uzman metinler ve dokümantasyon', 'Ürün ve pazarlama materyalleri', 'Çok dilli projeler ve web siteleri'],
    cta: 'Ücretsiz uzman çeviri teklifi alın',
  },
  ru: {
    text: 'Мы переводим ваши профильные документы точно, терминологически последовательно и с учетом цели использования. Учитываем аудиторию, терминологию, стандарты и дальнейшее применение перевода.',
    examples: ['Профильные тексты и документация', 'Материалы о продуктах и маркетинге', 'Многоязычные проекты и сайты'],
    cta: 'Запросить бесплатный расчет профильного перевода',
  },
  fr: {
    text: 'Nous traduisons vos documents spécialisés avec précision, cohérence terminologique et adaptation à leur usage. Nous tenons compte du public cible, de la terminologie, des normes et de l’utilisation finale.',
    examples: ['Textes spécialisés et documentation', 'Supports produit et marketing', 'Projets et sites multilingues'],
    cta: 'Demander un devis gratuit spécialisé',
  },
  uk: {
    text: 'Ми перекладаємо ваші фахові документи точно, термінологічно послідовно та відповідно до мети використання. Враховуємо аудиторію, термінологію, стандарти й подальше застосування перекладу.',
    examples: ['Фахові тексти та документація', 'Продуктові й маркетингові матеріали', 'Багатомовні проєкти та сайти'],
    cta: 'Запросити безкоштовну пропозицію для фахового перекладу',
  },
};

const detailParagraphsDe = {
  'wirtschaft-finanzen': [
    'Als Fachübersetzungsbüro für Wirtschaft und Finanzen unterstützen wir Unternehmen, Kanzleien, Steuerberater, Banken und Versicherungen bei allen fachsprachlichen Übersetzungen. Wir übertragen Ihre Dokumente präzise und verständlich in die gewünschte Sprache - von Geschäftskorrespondenz, Verträgen und AGB über Jahresabschlüsse, Bilanzen, Geschäftsberichte und Gutachten bis hin zu Marketingunterlagen, Präsentationen und Webseiten aus dem Bereich Wirtschaft und Finanzen.',
    'Unsere Fachübersetzer verfügen über fundiertes wirtschaftliches und finanztechnisches Know-how und kennen die Terminologie von Bilanzierung, Controlling, Steuern, Investment, Banking und Versicherungen. So stellen wir sicher, dass Fachbegriffe korrekt und konsistent verwendet werden - ein entscheidender Faktor für professionelle Finanzübersetzungen, etwa bei internationalen Ausschreibungen, Investor-Relations-Dokumenten oder Vertragsverhandlungen.',
    'Als deutschlandweit tätiges Übersetzungsbüro für Wirtschaftstexte und Finanzdokumente arbeiten wir für Kunden aus Stuttgart, Berlin, Mainz, Kiel, Osnabrück, Bielefeld und vielen weiteren Standorten - in zahlreichen Sprachkombinationen für den internationalen Geschäftsverkehr.',
    'Schildern Sie uns kurz, welche Unterlagen übersetzt werden sollen und in welche Sprache. Wir erstellen Ihnen eine kostenlose und unverbindliche Anfrage mit Preisangabe, Lieferzeit und Ablauf.',
  ],
  recht: [
    'Als Fachübersetzungsbüro für Recht unterstützen wir Rechtsanwälte, Notariate, Unternehmen, Gerichte, Behörden und Privatpersonen mit präzisen juristischen Übersetzungen. Wir übersetzen unter anderem Verträge, Allgemeine Geschäftsbedingungen, Urteile, Beschlüsse, Klageschriften, Mahn- und Vollstreckungsbescheide, Vollmachten, Satzungen, Gesellschaftsunterlagen, notarielle Urkunden sowie die Korrespondenz mit Gerichten und Behörden.',
    'Unsere juristischen Fachübersetzer verfügen über fundierte Kenntnisse im Zivilrecht, Strafrecht, Handels- und Gesellschaftsrecht, Arbeitsrecht, Familienrecht, Mietrecht und Verwaltungsrecht. Sie beherrschen die Terminologie beider Rechtssysteme und achten darauf, dass Formulierungen rechtssicher und verständlich bleiben.',
    'Als deutschlandweit tätiges Übersetzungsbüro für juristische Texte arbeiten wir für Kanzleien, Notariate, Unternehmen und Privatpersonen in vielen Städten. Wir bieten juristische Fachübersetzungen in zahlreichen Sprachkombinationen an - für grenzüberschreitende Verträge, internationale Mandate und die Kommunikation mit Geschäftspartnern, Gerichten und Behörden.',
    'Teilen Sie uns kurz mit, welche Dokumente übersetzt werden sollen und in welche Sprache. Auf dieser Grundlage erstellen wir eine kostenlose und unverbindliche Anfrage mit Informationen zu Preis, Bearbeitungszeit und Ablauf.',
  ],
  ingenieurwesen: [
    'Als Fachübersetzungsbüro für Technik und Ingenieurwesen unterstützen wir Hersteller, Ingenieurbüros, Planungsbüros, Maschinenbauer und Industrieunternehmen mit präzisen technischen Übersetzungen. Wir übertragen Ihre Unterlagen fachgerecht in die gewünschte Sprache - von Bedienungsanleitungen, Handbüchern und technischen Datenblättern über Lasten- und Pflichtenhefte, Wartungsanleitungen und Sicherheitsdokumente bis hin zu Patentschriften, Schulungsunterlagen und technischen Angeboten.',
    'Unsere technischen Fachübersetzer verfügen über praktische Erfahrung in Bereichen wie Maschinenbau, Anlagenbau, Elektrotechnik, Verfahrenstechnik, Bauwesen, Umwelttechnik und Energietechnik. Sie kennen die spezifische Fachterminologie der Ingenieure und achten darauf, dass Maße, Normen, Sicherheits- und Warnhinweise korrekt und eindeutig übertragen werden.',
    'Als deutschlandweit tätiger Übersetzungsdienst für technische Dokumentation unterstützen wir Unternehmen bei mehrsprachigen Projekten, internationalen Ausschreibungen und der Lokalisierung technischer Dokumentation für den weltweiten Export - in zahlreichen Sprachkombinationen.',
    'Beschreiben Sie uns kurz, welche Unterlagen übersetzt werden sollen und in welche Sprache. Auf dieser Basis erstellen wir Ihnen eine kostenlose und unverbindliche Anfrage mit Informationen zu Preis, Lieferzeit und Ablauf.',
  ],
  'medizin-dental': [
    'Als spezialisiertes Fachübersetzungsbüro für medizinische und dentalmedizinische Übersetzungen unterstützen wir Kliniken, Praxen, medizinische Einrichtungen, Labore, Hersteller und Fachverlage mit präzisen, fachlich geprüften Übersetzungen. Unsere medizinischen Fachübersetzer verfügen über eine medizinische, naturwissenschaftliche, dentaltechnologische oder ingenieurwissenschaftliche Ausbildung, langjährige Berufserfahrung im Gesundheitswesen bzw. in der Medizintechnik und sind mit aktueller Fachterminologie sowie gesetzlichen Anforderungen vertraut.',
    'Wir übersetzen unter anderem medizinische Gerätebeschreibungen und Bedienungsanleitungen, Produktkataloge und Broschüren von Medizintechnik-Herstellern, Befunde, Arztbriefe, Gutachten und OP-Berichte, Studienunterlagen, klinische Prüfungen, Patienteninformationen, Aufklärungsbögen sowie Webseiten und Marketingmaterial aus dem Gesundheitsbereich.',
    'Ein besonderer Schwerpunkt unseres Büros liegt im Bereich Dentalmedizin und Zahntechnik. Wir übersetzen für Zahnarztpraxen, Dentallabore, Dentalhersteller und Softwareanbieter und kennen die Terminologie moderner digitaler Zahnmedizin.',
    'Unsere speziell geschulten Übersetzerinnen und Übersetzer für Dentaltechnologie sorgen dafür, dass alle Fachbegriffe, Abkürzungen und Gerätebezeichnungen korrekt und konsistent verwendet werden - ein entscheidender Faktor für die sichere Anwendung von Software, Materialien und Geräten im Praxis- und Laboralltag.',
    'Beschreiben Sie uns kurz, welche Unterlagen oder Software übersetzt werden sollen und in welche Sprache. Auf dieser Grundlage erstellen wir eine kostenlose und unverbindliche Anfrage mit Informationen zu Preis, Lieferzeit und Ablauf.',
  ],
  pharmazeutik: [
    'Als spezialisiertes Fachübersetzungsbüro für Pharmazeutik unterstützen wir pharmazeutische Unternehmen, Apotheken, Kliniken, CROs, Hersteller von Medizinprodukten sowie Behörden mit fachlich exakten Arzneimittelübersetzungen. Unsere Fachübersetzer verfügen in der Regel über eine pharmazeutische, medizinische oder naturwissenschaftliche Ausbildung und sind mit den regulatorischen Anforderungen der Branche vertraut.',
    'Wir übersetzen unter anderem Fachinformationen, Gebrauchsinformationen und Packungsbeilagen, Arzneimittelverpackungen, Etiketten, Faltschachteln, Zulassungsunterlagen und Einreichungsdossiers, Dokumente zu klinischen Studien, Qualitäts- und GMP-Dokumente, SOPs, Validierungsunterlagen, Schulungsunterlagen und Marketingmaterial.',
    'Dabei achten wir besonders auf korrekte Wirkstoffbezeichnungen, Dosierungen, Warnhinweise, Kontraindikationen, Nebenwirkungen und rechtlich relevante Formulierungen, damit Ihre pharmazeutischen Unterlagen sowohl für Fachkreise als auch für Patientinnen und Patienten eindeutig verständlich und rechtssicher sind.',
    'Wir unterstützen Sie bei internationalen Zulassungen, mehrsprachigen Arzneimittelverpackungen und der Lokalisierung pharmazeutischer Dokumentation in zahlreiche Sprachkombinationen.',
  ],
  'chemie-biowissenschaften': [
    'Als Fachübersetzungsbüro für Chemie und Biowissenschaften unterstützen wir Chemieunternehmen, Labore, Forschungsinstitute, Hochschulen, Biotech-Firmen und Hersteller von Labor- und Analysegeräten mit präzisen wissenschaftlichen Übersetzungen. Wir übertragen Ihre Unterlagen fachgerecht in die gewünschte Sprache - von Sicherheitsdatenblättern, Laborprotokollen und Prüfberichten über Produktkataloge, Analysenzertifikate und Patentunterlagen bis hin zu wissenschaftlichen Publikationen, Studienberichten und Präsentationen.',
    'Unsere Fachübersetzer verfügen über eine chemische oder naturwissenschaftliche Ausbildung und kennen die Terminologie aus Bereichen wie organische und anorganische Chemie, Polymerchemie, Materialwissenschaften, analytische Chemie, Umweltanalytik, Biochemie, Molekularbiologie, Genetik, Mikrobiologie, Biotechnologie und Life Sciences.',
    'Sie achten darauf, dass Formeln, Einheiten, Grenzwerte, Gefahrenhinweise und Fachbegriffe korrekt und konsistent wiedergegeben werden - eine zentrale Voraussetzung für rechtssichere Dokumentation, Laborarbeit und internationalen Wissenstransfer.',
    'Beschreiben Sie uns kurz, welche Dokumente übersetzt werden sollen und in welche Sprache. Auf dieser Basis erstellen wir eine kostenlose und unverbindliche Anfrage mit Angaben zu Preis, Bearbeitungszeit und Ablauf.',
  ],
  literatur: [
    'Als Fachübersetzungsbüro für Literatur und Kultur unterstützen wir Verlage, Autorinnen und Autoren, Theater, Filmproduktionen, Kulturinstitutionen, Museen und Agenturen bei hochwertigen literarischen Übersetzungen. Unser Ziel ist es, Stil, Ton und Wirkung des Originals in die Zielsprache zu übertragen - nicht nur den reinen Inhalt.',
    'Wir übersetzen unter anderem Romane, Erzählungen, Kinder- und Jugendbücher, Lyrik, Essays, Biografien und Sachbücher, Theaterstücke, Drehbücher und Hörspieltexte, Katalogtexte, Ausstellungstexte und Museumsguides, Literatur- und Kulturmagazine, Feuilletontexte, Blogs, Klappentexte, Pressetexte, Autorenviten und Werbematerialien.',
    'Unsere literarischen Übersetzerinnen und Übersetzer arbeiten mit besonderem Augenmerk auf Stil, Sprachrhythmus, Bildsprache, Wortspiele und kulturelle Anspielungen. Viele verfügen selbst über literarische oder geisteswissenschaftliche Ausbildung, eigene Publikationen oder langjährige Verlagserfahrung.',
    'Teilen Sie uns kurz mit, welche Texte übersetzt werden sollen, in welche Sprache und für welchen Verlag, Anlass oder Veröffentlichungskanal sie gedacht sind.',
  ],
  'it-software': [
    'Als spezialisiertes Übersetzungsbüro für IT, Software und Lokalisierung unterstützen wir Softwarehersteller, Startups, Agenturen, Systemhäuser und IT-Abteilungen bei der fachgerechten Übersetzung und Lokalisierung ihrer digitalen Produkte. Wir arbeiten mit gängigen Dateiformaten wie XML, YAML, JSON, PO, XLIFF und CSV und integrieren uns auf Wunsch direkt in bestehende Lokalisierungs-Workflows, Git-Repositories oder CI/CD-Pipelines.',
    'Unsere IT-Fachübersetzer verfügen über technisches Verständnis in Bereichen wie Softwareentwicklung, Cloud-Infrastruktur, IT-Security, Datenbanken und DevOps und achten darauf, dass Benutzeroberflächen, Fehlermeldungen, Tooltips und Dokumentationen nicht nur sprachlich korrekt, sondern auch konsistent und nutzerfreundlich sind.',
    'Typische Übersetzungen im IT- und Softwarebereich sind API-Dokumentationen, Developer Guides, Systembeschreibungen, Code-Kommentare, technische Spezifikationen, Release Notes, UI-Texte, App-Store-Beschreibungen, Gaming-Lokalisierung, Datenbankdokumentation, Cloud- und Infrastrukturtexte, IT-Sicherheitsrichtlinien, Datenschutzberichte, E-Learning-Unterlagen und technische IT-Dokumentation.',
    'Beschreiben Sie uns kurz, welche Dateien oder Dokumente übersetzt werden sollen und in welche Sprache. Auf dieser Basis erstellen wir eine kostenlose und unverbindliche Anfrage mit Angaben zu Preis, Lieferzeit und Ablauf.',
  ],
  'industrie-produktion': [
    'Als Fachübersetzungsbüro für Industrie, Produktion und Maschinenbau unterstützen wir produzierende Unternehmen, Zulieferer, Anlagenbauer und Handelsunternehmen bei allen technischen und kaufmännischen Übersetzungen. Wir übertragen Ihre Dokumente fachgerecht in die gewünschte Sprache - von Produkt- und Materialkatalogen über Montage- und Bedienungsanleitungen bis hin zu Lasten-/Pflichtenheften, Arbeitsanweisungen, ISO-Dokumentation und Sicherheitsunterlagen.',
    'Typische Übersetzungen im Bereich Industrie und Produktion sind Produkt- und Ersatzteilkataloge, Materiallisten, Stücklisten, Bestellnummern, Preislisten, Arbeits- und Prozessanweisungen für die Fertigung, Bedienungs-, Montage- und Wartungshandbücher, Qualitätsmanagement-Dokumente, Lieferantendokumentation, Spezifikationen, Prüfprotokolle, Gefährdungsbeurteilungen, Betriebsanweisungen und Sicherheitsdaten.',
    'Unsere Fachübersetzer kennen die Terminologie aus Bereichen wie Maschinenbau, Automatisierung, Logistik, Metallverarbeitung, Kunststofftechnik und Anlagenbau. So stellen wir sicher, dass Fachbegriffe, Maßeinheiten, Normen, Sicherheitshinweise und Warnpiktogramme korrekt und einheitlich wiedergegeben werden.',
    'Beschreiben Sie uns kurz, welche Unterlagen übersetzt werden sollen und in welche Sprache. Auf dieser Basis erstellen wir eine kostenlose und unverbindliche Anfrage mit Angaben zu Preis, Bearbeitungszeit und Ablauf.',
  ],
};

export function getSpecialties(lang) {
  const code = generic[lang] ? lang : 'de';
  const first = baseSpecialties.map((item) => ({
    id: item.id,
    ...item[code],
    ...(code === 'de' && detailParagraphsDe[item.id] ? { paragraphs: detailParagraphsDe[item.id] } : {}),
  }));
  const rest = extraSpecialties.map((item) => ({
    id: item.id,
    label: item.label[code],
    title: item.title[code],
    ...generic[code],
    ...(code === 'de' && detailParagraphsDe[item.id] ? { paragraphs: detailParagraphsDe[item.id] } : {}),
  }));
  return [...first, ...rest];
}

export const serviceUi = {
  de: {
    title: 'Fachübersetzungen.',
    sub: 'Wählen Sie ein Fachgebiet aus. Die Buttons springen direkt zu den passenden Leistungsdetails.',
    kicker: 'Fachübersetzung',
    faqTitle: 'Häufig gestellte Fragen.',
    faqSub: 'Antworten aus unserem Leistungsprofil: Ablauf, Kosten, Bearbeitungszeit, Anerkennung und Dolmetscherbuchung.',
  },
  en: {
    title: 'Specialist Translations.',
    sub: 'Choose a subject area. The buttons jump directly to the matching service details.',
    kicker: 'Specialist translation',
    faqTitle: 'Frequently Asked Questions.',
    faqSub: 'Answers from our service profile: process, cost, turnaround, recognition and interpreter booking.',
  },
  ar: {
    title: 'الترجمات المتخصصة.',
    sub: 'اختر مجالا متخصصا. تنقلك الأزرار مباشرة إلى تفاصيل الخدمة المناسبة.',
    kicker: 'ترجمة متخصصة',
    faqTitle: 'الأسئلة الشائعة.',
    faqSub: 'إجابات حول آلية العمل والتكلفة والمدة والاعتراف بالترجمات وحجز المترجمين الفوريين.',
  },
  tr: {
    title: 'Uzman Çeviriler.',
    sub: 'Bir uzmanlık alanı seçin. Butonlar sizi doğrudan ilgili hizmet detaylarına götürür.',
    kicker: 'Uzman çeviri',
    faqTitle: 'Sık Sorulan Sorular.',
    faqSub: 'Süreç, maliyet, teslim süresi, tanınma ve tercüman rezervasyonu hakkında yanıtlar.',
  },
  ru: {
    title: 'Профильные переводы.',
    sub: 'Выберите тематику. Кнопки ведут прямо к соответствующим описаниям услуг.',
    kicker: 'Профильный перевод',
    faqTitle: 'Частые вопросы.',
    faqSub: 'Ответы о процессе, стоимости, сроках, признании переводов и бронировании устных переводчиков.',
  },
  fr: {
    title: 'Traductions spécialisées.',
    sub: 'Choisissez un domaine. Les boutons mènent directement aux détails du service correspondant.',
    kicker: 'Traduction spécialisée',
    faqTitle: 'Questions fréquentes.',
    faqSub: 'Réponses sur le processus, les coûts, les délais, la reconnaissance et la réservation d’interprètes.',
  },
  uk: {
    title: 'Фахові переклади.',
    sub: 'Оберіть галузь. Кнопки ведуть прямо до відповідних деталей послуги.',
    kicker: 'Фаховий переклад',
    faqTitle: 'Поширені запитання.',
    faqSub: 'Відповіді про процес, вартість, терміни, визнання перекладів і бронювання усних перекладачів.',
  },
};

const faqByLang = {
  de: [
    ['cost', 'Was kostet eine Übersetzung?', 'Der Preis richtet sich nach Sprache, Fachgebiet, Textumfang und gewünschter Lieferzeit. Senden Sie uns das Dokument zu - Sie erhalten ein verbindliches Festpreisangebot innerhalb weniger Minuten.'],
    ['duration', 'Wie lange dauert eine Übersetzung?', 'Kleinere Standarddokumente wie Urkunden oder Zeugnisse sind oft innerhalb von 4-6 Werktagen fertig. Bei größeren Fachübersetzungen stimmen wir den Liefertermin individuell mit Ihnen ab. Auf Wunsch bieten wir auch Express-Service in 24 Stunden an.'],
    ['iso', 'Sind Ihre Übersetzungen ISO-zertifiziert?', 'Unsere Übersetzungsprozesse orientieren sich an der ISO 17100 für Übersetzungsdienstleistungen. Wir arbeiten mit CAT-Tools und kundenspezifischen Terminologiedatenbanken für gleichbleibend hohe Qualität.'],
    ['accepted', 'Werden Ihre beglaubigten Übersetzungen von Behörden anerkannt?', 'Ja. Unsere beglaubigten Übersetzungen werden von allgemein beeidigten Übersetzerinnen und Übersetzern erstellt und von Gerichten, Standesämtern, Ausländerbehörden, Hochschulen und Notariaten in ganz Deutschland anerkannt.'],
    ['original', 'Benötigen Sie das Originaldokument?', 'In den meisten Fällen reicht ein gut lesbares Foto oder ein Scan. Ob das Original benötigt wird, hängt vom Verwendungszweck ab - das prüfen wir individuell für Sie.'],
    ['delivery', 'Erhalte ich die Übersetzung digital oder per Post?', 'Sie erhalten die beglaubigte Übersetzung wahlweise als PDF, im Original per Post oder zur Abholung in einer unserer sechs Filialen deutschlandweit.'],
    ['request', 'Wie kann ich eine Übersetzung oder einen Dolmetscher anfragen?', 'Ganz einfach: per WhatsApp, E-Mail oder über unser Online-Formular. Senden Sie uns dabei nach Möglichkeit ein Handyfoto oder einen Scan des Dokuments beziehungsweise eine kurze Beschreibung Ihres Dolmetschertermins mit Ort, Datum, Sprachkombination und Anlass.'],
    ['free', 'Ist die Anfrage wirklich kostenlos und unverbindlich?', 'Ja. Sie erhalten von uns einen Festpreis und alle Informationen zum Ablauf - komplett unverbindlich, transparent und ohne versteckte Kosten.'],
    ['languages', 'In welche Sprachen übersetzen Sie?', 'Wir bieten Übersetzungen und Dolmetscherdienste in über 190 Sprachen an - von gängigen europäischen Sprachen bis hin zu vielen außereuropäischen und seltenen Sprachkombinationen.'],
    ['interpreters', 'Welche Arten von Dolmetschern bieten Sie an?', 'Wir vermitteln Simultandolmetscher, Verhandlungsdolmetscher, Video- und Telefondolmetscher, Standesamt-, Notar-, Gerichts- und beeidigte Dolmetscher - je nach Anlass und Sprache.'],
    ['speed', 'Wie schnell können Sie einen Dolmetscher organisieren?', 'Bei gängigen Sprachen können wir oft innerhalb weniger Stunden einen Dolmetscher bereitstellen. Bei seltenen Sprachen empfehlen wir eine Vorlaufzeit von einigen Tagen. Video- und Telefondolmetscher sind häufig sogar sofort verfügbar.'],
    ['cities', 'Für welche Städte bieten Sie Dolmetscherdienste an?', 'Unsere Dolmetscher sind deutschlandweit im Einsatz - sowohl vor Ort als auch online per Video oder Telefon. Auf Wunsch sind Einsätze auch international möglich.'],
  ],
  en: [
    ['cost', 'How much does a translation cost?', 'The price depends on the language, subject area, text volume and requested delivery time. Send us the document and you will receive a binding fixed-price quote within a few minutes.'],
    ['duration', 'How long does a translation take?', 'Smaller standard documents such as certificates or diplomas are often ready within 4-6 working days. For larger specialist translations, we agree the delivery date individually. Express service within 24 hours is available on request.'],
    ['iso', 'Are your translations ISO-certified?', 'Our translation processes are aligned with ISO 17100 for translation services. We use CAT tools and client-specific terminology databases for consistent quality.'],
    ['accepted', 'Are certified translations accepted by authorities?', 'Yes. Our certified translations are prepared by sworn translators and accepted by courts, registry offices, immigration authorities, universities and notaries throughout Germany.'],
    ['original', 'Do you need the original document?', 'In most cases, a clear photo or scan is enough. Whether the original is required depends on the intended use, and we check that individually for you.'],
    ['delivery', 'Do I receive the translation digitally or by post?', 'You can receive the certified translation as a PDF, as an original by post, or collect it from one of our six branches across Germany.'],
    ['request', 'How can I request a translation or interpreter?', 'Simply contact us by WhatsApp, e-mail or our online form. If possible, send a photo or scan of the document, or a short description of the interpreting appointment with place, date, language pair and purpose.'],
    ['free', 'Is the request really free and non-binding?', 'Yes. You receive a fixed price and all process information with no obligation, transparently and without hidden costs.'],
    ['languages', 'Which languages do you translate?', 'We provide translation and interpreting services in more than 190 languages, from common European languages to many non-European and rare language pairs.'],
    ['interpreters', 'What types of interpreters do you offer?', 'We arrange simultaneous, negotiation, video and telephone interpreters as well as registry office, notary, court and sworn interpreters, depending on the occasion and language.'],
    ['speed', 'How quickly can you arrange an interpreter?', 'For common languages, we can often provide an interpreter within a few hours. For rare languages, we recommend a few days lead time. Video and telephone interpreters are often available immediately.'],
    ['cities', 'In which cities do you offer interpreting services?', 'Our interpreters work throughout Germany, both on site and online by video or phone. International assignments are also possible on request.'],
  ],
};

faqByLang.ar = [
  ['cost', 'كم تكلفة الترجمة؟', 'يعتمد السعر على اللغة والمجال وحجم النص وموعد التسليم المطلوب. أرسل لنا المستند وسنرسل لك سعرا ثابتا ملزما خلال دقائق.'],
  ['duration', 'كم تستغرق الترجمة؟', 'غالبا ما تكون المستندات القياسية الصغيرة جاهزة خلال 4 إلى 6 أيام عمل. أما الترجمات المتخصصة الكبيرة فنحدد موعد التسليم لها بشكل فردي. خدمة 24 ساعة متاحة عند الطلب.'],
  ['iso', 'هل ترجماتكم متوافقة مع ISO؟', 'تستند عملياتنا إلى معيار ISO 17100 لخدمات الترجمة، ونستخدم أدوات CAT وقواعد مصطلحات خاصة بالعملاء لضمان جودة ثابتة.'],
  ['accepted', 'هل تقبل الجهات الرسمية الترجمات المعتمدة؟', 'نعم. يتم إعداد الترجمات المعتمدة من مترجمين محلفين وتقبلها المحاكم ومكاتب السجل والجامعات والموثقون والجهات الرسمية في ألمانيا.'],
  ['original', 'هل تحتاجون إلى المستند الأصلي؟', 'في معظم الحالات تكفي صورة واضحة أو مسح ضوئي. نتحقق بشكل فردي مما إذا كان الأصل مطلوبا حسب الغرض من الاستخدام.'],
  ['delivery', 'هل أستلم الترجمة رقميا أم بالبريد؟', 'يمكنك استلام الترجمة المعتمدة كملف PDF أو كأصل بالبريد أو استلامها من أحد فروعنا الستة في ألمانيا.'],
  ['request', 'كيف أطلب ترجمة أو مترجما فوريا؟', 'ببساطة عبر واتساب أو البريد الإلكتروني أو النموذج الإلكتروني. أرسل صورة أو مسحا للمستند أو وصفا قصيرا للموعد مع المكان والتاريخ واللغات والسبب.'],
  ['free', 'هل الطلب مجاني وغير ملزم؟', 'نعم. تحصل على سعر ثابت وكل معلومات الإجراء بشكل شفاف، دون التزام ودون تكاليف مخفية.'],
  ['languages', 'إلى أي لغات تترجمون؟', 'نقدم خدمات الترجمة والترجمة الفورية بأكثر من 190 لغة، من اللغات الأوروبية الشائعة إلى لغات نادرة وغير أوروبية كثيرة.'],
  ['interpreters', 'ما أنواع المترجمين الفوريين التي توفرونها؟', 'نوفر مترجمي مؤتمرات ومفاوضات وفيديو وهاتف، وكذلك مترجمي السجل المدني والموثق والمحاكم والمترجمين المحلفين حسب الموعد واللغة.'],
  ['speed', 'كم بسرعة يمكنكم توفير مترجم فوري؟', 'في اللغات الشائعة يمكننا غالبا توفير مترجم خلال ساعات قليلة. للغات النادرة نوصي بمهلة عدة أيام. مترجمو الفيديو والهاتف غالبا متاحون فورا.'],
  ['cities', 'في أي مدن تقدمون خدمات الترجمة الفورية؟', 'مترجمونا يعملون في جميع أنحاء ألمانيا، حضوريا أو عبر الفيديو أو الهاتف. ويمكن تنظيم مواعيد دولية عند الطلب.'],
];

faqByLang.tr = [
  ['cost', 'Bir çeviri ne kadar tutar?', 'Fiyat dile, uzmanlık alanına, metin hacmine ve istenen teslim süresine bağlıdır. Belgeyi gönderin, birkaç dakika içinde bağlayıcı sabit fiyat teklifi alın.'],
  ['duration', 'Bir çeviri ne kadar sürer?', 'Sertifika veya diploma gibi küçük standart belgeler çoğu zaman 4-6 iş günü içinde hazır olur. Büyük uzman çevirilerde teslim tarihini sizinle özel olarak belirleriz. 24 saat ekspres hizmet mümkündür.'],
  ['iso', 'Çevirileriniz ISO sertifikalı mı?', 'Çeviri süreçlerimiz ISO 17100 çeviri hizmetleri standardına göre yapılandırılmıştır. Tutarlı kalite için CAT araçları ve müşteriye özel terminoloji veritabanları kullanıyoruz.'],
  ['accepted', 'Onaylı çeviriler resmi kurumlarca kabul edilir mi?', 'Evet. Onaylı çevirilerimiz yeminli çevirmenler tarafından hazırlanır ve Almanya genelinde mahkemeler, nüfus müdürlükleri, göçmenlik makamları, üniversiteler ve noterler tarafından kabul edilir.'],
  ['original', 'Orijinal belge gerekli mi?', 'Çoğu durumda okunaklı bir fotoğraf veya tarama yeterlidir. Orijinalin gerekip gerekmediği kullanım amacına bağlıdır ve bunu sizin için ayrıca kontrol ederiz.'],
  ['delivery', 'Çeviriyi dijital olarak mı postayla mı alırım?', 'Onaylı çeviriyi PDF olarak, posta ile orijinal olarak veya Almanya’daki altı şubemizden teslim alabilirsiniz.'],
  ['request', 'Çeviri veya tercüman talebini nasıl yaparım?', 'WhatsApp, e-posta veya online form üzerinden kolayca başvurabilirsiniz. Mümkünse belge fotoğrafı veya taraması ya da tercüman randevusu için yer, tarih, dil çifti ve amaç bilgilerini gönderin.'],
  ['free', 'Talep gerçekten ücretsiz ve bağlayıcı değil mi?', 'Evet. Sabit fiyatı ve süreç bilgilerini şeffaf şekilde, yükümlülük olmadan ve gizli masraf olmadan alırsınız.'],
  ['languages', 'Hangi dillere çeviri yapıyorsunuz?', 'Yaygın Avrupa dillerinden birçok Avrupa dışı ve nadir dil çiftine kadar 190’dan fazla dilde çeviri ve tercümanlık hizmeti sunuyoruz.'],
  ['interpreters', 'Hangi tercüman türlerini sunuyorsunuz?', 'Simultane, müzakere, video ve telefon tercümanlarının yanı sıra nikah, noter, mahkeme ve yeminli tercümanlar sağlıyoruz.'],
  ['speed', 'Ne kadar hızlı tercüman organize edebilirsiniz?', 'Yaygın dillerde çoğu zaman birkaç saat içinde tercüman sağlayabiliriz. Nadir dillerde birkaç gün önceden haber vermenizi öneririz. Video ve telefon tercümanları çoğu zaman hemen müsaittir.'],
  ['cities', 'Hangi şehirlerde tercümanlık hizmeti veriyorsunuz?', 'Tercümanlarımız Almanya genelinde görev yapar; yerinde, video veya telefonla. Talep üzerine uluslararası görevler de mümkündür.'],
];

faqByLang.ru = [
  ['cost', 'Сколько стоит перевод?', 'Цена зависит от языка, тематики, объема текста и желаемого срока. Отправьте документ, и в течение нескольких минут вы получите фиксированное предложение.'],
  ['duration', 'Сколько занимает перевод?', 'Небольшие стандартные документы часто готовы за 4-6 рабочих дней. Для крупных профильных переводов срок согласуется индивидуально. По запросу возможен экспресс-сервис за 24 часа.'],
  ['iso', 'Ваши переводы соответствуют ISO?', 'Наши процессы ориентированы на ISO 17100 для переводческих услуг. Мы используем CAT-инструменты и клиентские базы терминов для стабильного качества.'],
  ['accepted', 'Принимаются ли заверенные переводы ведомствами?', 'Да. Заверенные переводы выполняются присяжными переводчиками и принимаются судами, ЗАГСами, миграционными ведомствами, вузами и нотариусами по всей Германии.'],
  ['original', 'Нужен ли оригинал документа?', 'В большинстве случаев достаточно четкой фотографии или скана. Нужен ли оригинал, зависит от цели использования; мы проверяем это индивидуально.'],
  ['delivery', 'Я получу перевод цифровым способом или по почте?', 'Вы можете получить заверенный перевод в PDF, оригинал по почте или забрать его в одном из шести филиалов в Германии.'],
  ['request', 'Как заказать перевод или устного переводчика?', 'Свяжитесь с нами через WhatsApp, e-mail или онлайн-форму. По возможности отправьте фото или скан документа либо краткое описание встречи с местом, датой, языковой парой и целью.'],
  ['free', 'Запрос действительно бесплатный и ни к чему не обязывает?', 'Да. Вы получите фиксированную цену и всю информацию о процессе прозрачно, без обязательств и скрытых расходов.'],
  ['languages', 'На какие языки вы переводите?', 'Мы предоставляем письменные и устные переводы более чем на 190 языках, от распространенных европейских до редких и внеевропейских языковых пар.'],
  ['interpreters', 'Какие виды устных переводчиков вы предлагаете?', 'Мы организуем синхронных, переговорных, видео- и телефонных переводчиков, а также переводчиков для ЗАГСа, нотариуса, суда и присяжных переводчиков.'],
  ['speed', 'Как быстро можно организовать переводчика?', 'Для распространенных языков часто возможно организовать переводчика за несколько часов. Для редких языков рекомендуем несколько дней подготовки. Видео- и телефонные переводчики часто доступны сразу.'],
  ['cities', 'В каких городах вы предлагаете устный перевод?', 'Наши переводчики работают по всей Германии, как очно, так и онлайн по видео или телефону. Международные выезды также возможны по запросу.'],
];

faqByLang.fr = [
  ['cost', 'Combien coûte une traduction ?', 'Le prix dépend de la langue, du domaine, du volume et du délai souhaité. Envoyez-nous le document et vous recevrez un prix fixe en quelques minutes.'],
  ['duration', 'Combien de temps dure une traduction ?', 'Les petits documents standards sont souvent prêts en 4 à 6 jours ouvrés. Pour les traductions spécialisées plus importantes, nous convenons du délai individuellement. Un service express en 24 heures est possible.'],
  ['iso', 'Vos traductions sont-elles certifiées ISO ?', 'Nos processus s’orientent sur la norme ISO 17100 pour les services de traduction. Nous utilisons des outils CAT et des bases terminologiques client pour une qualité constante.'],
  ['accepted', 'Les traductions certifiées sont-elles acceptées par les autorités ?', 'Oui. Elles sont réalisées par des traducteurs assermentés et acceptées par tribunaux, mairies, services d’immigration, universités et notaires dans toute l’Allemagne.'],
  ['original', 'Avez-vous besoin du document original ?', 'Dans la plupart des cas, une photo ou un scan lisible suffit. La nécessité de l’original dépend de l’usage prévu ; nous le vérifions individuellement.'],
  ['delivery', 'La traduction est-elle envoyée en ligne ou par courrier ?', 'Vous pouvez recevoir la traduction certifiée en PDF, l’original par courrier ou la retirer dans l’une de nos six agences en Allemagne.'],
  ['request', 'Comment demander une traduction ou un interprète ?', 'Contactez-nous par WhatsApp, e-mail ou formulaire en ligne. Si possible, envoyez une photo ou un scan du document, ou une brève description du rendez-vous avec lieu, date, langues et objet.'],
  ['free', 'La demande est-elle vraiment gratuite et sans engagement ?', 'Oui. Vous recevez un prix fixe et toutes les informations de manière transparente, sans engagement et sans frais cachés.'],
  ['languages', 'Dans quelles langues traduisez-vous ?', 'Nous proposons des traductions et interprétations dans plus de 190 langues, des langues européennes courantes aux combinaisons rares et extra-européennes.'],
  ['interpreters', 'Quels types d’interprètes proposez-vous ?', 'Nous organisons des interprètes simultanés, de négociation, vidéo et téléphone, ainsi que des interprètes pour mariage civil, notaire, tribunal et assermentés.'],
  ['speed', 'À quelle vitesse pouvez-vous organiser un interprète ?', 'Pour les langues courantes, nous pouvons souvent fournir un interprète en quelques heures. Pour les langues rares, quelques jours de délai sont recommandés. Les interprètes vidéo et téléphone sont souvent disponibles immédiatement.'],
  ['cities', 'Dans quelles villes proposez-vous l’interprétation ?', 'Nos interprètes interviennent dans toute l’Allemagne, sur place ou en ligne par vidéo ou téléphone. Des missions internationales sont possibles sur demande.'],
];

faqByLang.uk = [
  ['cost', 'Скільки коштує переклад?', 'Ціна залежить від мови, тематики, обсягу тексту та бажаного строку. Надішліть документ, і за кілька хвилин ви отримаєте фіксовану пропозицію.'],
  ['duration', 'Скільки триває переклад?', 'Невеликі стандартні документи часто готові за 4-6 робочих днів. Для більших фахових перекладів строк узгоджується індивідуально. За запитом можливий експрес-сервіс за 24 години.'],
  ['iso', 'Чи відповідають ваші переклади ISO?', 'Наші процеси орієнтуються на ISO 17100 для перекладацьких послуг. Ми використовуємо CAT-інструменти та клієнтські бази термінології для стабільної якості.'],
  ['accepted', 'Чи приймають завірені переклади органи влади?', 'Так. Завірені переклади виконуються присяжними перекладачами та приймаються судами, РАЦСами, міграційними органами, університетами й нотаріусами по всій Німеччині.'],
  ['original', 'Чи потрібен оригінал документа?', 'У більшості випадків достатньо чіткої фотографії або скану. Чи потрібен оригінал, залежить від мети використання; ми перевіряємо це індивідуально.'],
  ['delivery', 'Я отримаю переклад цифрово чи поштою?', 'Ви можете отримати завірений переклад як PDF, оригінал поштою або забрати його в одному з шести філіалів у Німеччині.'],
  ['request', 'Як замовити переклад або усного перекладача?', 'Зв’яжіться з нами через WhatsApp, e-mail або онлайн-форму. За можливості надішліть фото чи скан документа або короткий опис зустрічі з місцем, датою, мовною парою та метою.'],
  ['free', 'Запит справді безкоштовний і ні до чого не зобов’язує?', 'Так. Ви отримуєте фіксовану ціну та всю інформацію прозоро, без зобов’язань і прихованих витрат.'],
  ['languages', 'На які мови ви перекладаєте?', 'Ми надаємо письмові й усні переклади більш ніж 190 мовами, від поширених європейських до рідкісних і позаєвропейських мовних пар.'],
  ['interpreters', 'Які види усних перекладачів ви пропонуєте?', 'Ми організовуємо синхронних, переговорних, відео- і телефонних перекладачів, а також перекладачів для РАЦСу, нотаріуса, суду та присяжних перекладачів.'],
  ['speed', 'Як швидко можна організувати перекладача?', 'Для поширених мов часто можливо організувати перекладача за кілька годин. Для рідкісних мов рекомендуємо кілька днів підготовки. Відео- і телефонні перекладачі часто доступні одразу.'],
  ['cities', 'У яких містах ви пропонуєте усний переклад?', 'Наші перекладачі працюють по всій Німеччині, очно або онлайн через відео чи телефон. Міжнародні виїзди також можливі за запитом.'],
];

export function getFaqs(lang) {
  const code = faqByLang[lang] ? lang : 'de';
  return faqByLang[code].map(([key, q, a]) => ({ key, q, a }));
}
