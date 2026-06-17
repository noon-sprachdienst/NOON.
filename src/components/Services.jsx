import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardList,
  Code2,
  Cloud,
  Factory,
  FileText,
  FlaskConical,
  Gamepad2,
  Globe2,
  Handshake,
  Headphones,
  HeartPulse,
  Landmark,
  Languages,
  LockKeyhole,
  MapPin,
  Pill,
  Scale,
  Send,
  ShieldCheck,
  Smartphone,
  Stamp,
  Timer,
  UsersRound,
  Video,
  Wrench,
} from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { getServiceNavigation, serviceUi } from '../data/serviceContent';

const SIDE_LABELS = {
  de: { interpreting: 'Dolmetschen', translation: 'Beglaubigte Übersetzungen', specialist: 'Fachübersetzung', faq: 'FAQ' },
  en: { interpreting: 'Interpreting', translation: 'Certified translations', specialist: 'Specialist translation', faq: 'FAQ' },
  ar: { interpreting: 'ترجمة فورية', translation: 'ترجمات معتمدة', specialist: 'ترجمة متخصصة', faq: 'الأسئلة الشائعة' },
  tr: { interpreting: 'Tercümanlık', translation: 'Yeminli çeviriler', specialist: 'Uzman çeviri', faq: 'SSS' },
  ru: { interpreting: 'Устный перевод', translation: 'Заверенные переводы', specialist: 'Профильный перевод', faq: 'FAQ' },
  fr: { interpreting: 'Interprétation', translation: 'Traductions certifiées', specialist: 'Traduction spécialisée', faq: 'FAQ' },
  uk: { interpreting: 'Усний переклад', translation: 'Засвідчені переклади', specialist: 'Фаховий переклад', faq: 'FAQ' },
};

const VISUAL_COPY = {
  de: {
    overview: 'Überblick',
    highlights: 'Wichtig für Sie',
    typical: 'Typische Inhalte',
    details: 'Aus dem Leistungsprofil',
    process: 'So läuft es ab',
    ctaSub: 'Kostenlos, unverbindlich und mit klarer Rückmeldung zum Ablauf.',
    request: 'Anfrage senden',
    requestText: 'Sprache, Unterlagen, Ort oder Termin kurz mitteilen.',
    review: 'Angebot erhalten',
    reviewText: 'Wir prüfen Umfang, Fachgebiet, Termin und Verfügbarkeit.',
    delivery: 'Umsetzung starten',
    deliveryText: 'Sie bestätigen das Angebot, wir organisieren Übersetzung oder Dolmetscher.',
    trustA: 'Fachlich geprüft',
    trustB: '75+ Sprachen',
    trustC: 'Deutschlandweit',
    interpretingLanguages: '190+ Sprachen',
    markLanguages: 'Sprachen',
    markQuality: 'Qualität',
  },
  en: {
    overview: 'Overview',
    highlights: 'What matters',
    typical: 'Typical content',
    details: 'Service profile',
    process: 'How it works',
    ctaSub: 'Free, non-binding and with a clear reply about the next steps.',
    request: 'Send request',
    requestText: 'Share language, documents, location or appointment details.',
    review: 'Receive quote',
    reviewText: 'We check scope, subject area, timing and availability.',
    delivery: 'Start service',
    deliveryText: 'You confirm the offer, we arrange the translation or interpreter.',
    trustA: 'Expert checked',
    trustB: '75+ languages',
    trustC: 'Across Germany',
    interpretingLanguages: '190+ languages',
    markLanguages: 'Languages',
    markQuality: 'Quality',
  },
  ar: {
    overview: 'نظرة عامة',
    highlights: 'الأهم لك',
    typical: 'محتوى نموذجي',
    details: 'ملف الخدمة',
    process: 'طريقة العمل',
    ctaSub: 'مجاني وغير ملزم مع رد واضح حول الخطوات التالية.',
    request: 'إرسال الطلب',
    requestText: 'أرسل اللغة والمستندات أو المكان أو تفاصيل الموعد باختصار.',
    review: 'استلام العرض',
    reviewText: 'نراجع النطاق والمجال والوقت والتوفر.',
    delivery: 'بدء التنفيذ',
    deliveryText: 'تؤكد العرض، ونحن ننظم الترجمة أو المترجم الفوري.',
    trustA: 'مراجعة تخصصية',
    trustB: '75+ لغة',
    trustC: 'في كل ألمانيا',
    interpretingLanguages: '190+ لغة',
    markLanguages: 'لغات',
    markQuality: 'جودة',
  },
  tr: {
    overview: 'Genel bakış',
    highlights: 'Sizin için önemli',
    typical: 'Tipik içerikler',
    details: 'Hizmet profili',
    process: 'Süreç',
    ctaSub: 'Ücretsiz, bağlayıcı değil ve sonraki adımlar net şekilde açıklanır.',
    request: 'Talep gönder',
    requestText: 'Dil, belge, yer veya randevu bilgilerini kısaca paylaşın.',
    review: 'Teklif alın',
    reviewText: 'Kapsamı, alanı, zamanı ve müsaitliği kontrol ederiz.',
    delivery: 'Hizmeti başlat',
    deliveryText: 'Teklifi onaylarsınız, biz çeviri veya tercümanı organize ederiz.',
    trustA: 'Uzman kontrolü',
    trustB: '75+ dil',
    trustC: 'Almanya genelinde',
    interpretingLanguages: '190+ dil',
    markLanguages: 'Dil',
    markQuality: 'Kalite',
  },
  ru: {
    overview: 'Обзор',
    highlights: 'Что важно',
    typical: 'Типичные материалы',
    details: 'Профиль услуги',
    process: 'Как это работает',
    ctaSub: 'Бесплатно, без обязательств и с понятным ответом о дальнейших шагах.',
    request: 'Отправить запрос',
    requestText: 'Кратко укажите язык, документы, место или детали встречи.',
    review: 'Получить предложение',
    reviewText: 'Мы проверяем объем, тематику, сроки и доступность.',
    delivery: 'Начать выполнение',
    deliveryText: 'Вы подтверждаете предложение, мы организуем перевод или устного переводчика.',
    trustA: 'Проверка экспертом',
    trustB: '75+ языков',
    trustC: 'По всей Германии',
    interpretingLanguages: '190+ языков',
    markLanguages: 'Языки',
    markQuality: 'Качество',
  },
  fr: {
    overview: 'Aperçu',
    highlights: 'L’essentiel',
    typical: 'Contenus typiques',
    details: 'Profil du service',
    process: 'Déroulement',
    ctaSub: 'Gratuit, sans engagement et avec un retour clair sur les prochaines étapes.',
    request: 'Envoyer la demande',
    requestText: 'Indiquez la langue, les documents, le lieu ou le rendez-vous.',
    review: 'Recevoir une offre',
    reviewText: 'Nous vérifions le volume, le domaine, le délai et la disponibilité.',
    delivery: 'Lancer le service',
    deliveryText: 'Vous confirmez l’offre, nous organisons la traduction ou l’interprète.',
    trustA: 'Contrôle expert',
    trustB: '75+ langues',
    trustC: 'Dans toute l’Allemagne',
    interpretingLanguages: '190+ langues',
    markLanguages: 'Langues',
    markQuality: 'Qualité',
  },
  uk: {
    overview: 'Огляд',
    highlights: 'Важливо для вас',
    typical: 'Типовий зміст',
    details: 'Профіль послуги',
    process: 'Як це працює',
    ctaSub: 'Безкоштовно, без зобов’язань і з чіткою відповіддю щодо наступних кроків.',
    request: 'Надіслати запит',
    requestText: 'Коротко вкажіть мову, документи, місце або деталі зустрічі.',
    review: 'Отримати пропозицію',
    reviewText: 'Ми перевіряємо обсяг, тематику, терміни та доступність.',
    delivery: 'Почати виконання',
    deliveryText: 'Ви підтверджуєте пропозицію, ми організовуємо переклад або усного перекладача.',
    trustA: 'Фахова перевірка',
    trustB: '75+ мов',
    trustC: 'По всій Німеччині',
    interpretingLanguages: '190+ мов',
    markLanguages: 'Мови',
    markQuality: 'Якість',
  },
};

const SERVICE_IMAGES = {
  interpreting: '/assets/service-scenes/male-interpreting-scene.webp',
  translation: '/assets/service-scenes/certified-translation-scene.png',
  specialist: '/assets/service-scenes/specialist-translation-scene.png',
};

const SERVICE_THEMES = {
  'dolmetschen-overview': { icon: Headphones, tone: 'navy' },
  simultandolmetscher: { icon: Languages, tone: 'navy' },
  verhandlungsdolmetscher: { icon: Handshake, tone: 'navy' },
  'video-telefondolmetscher': { icon: Video, tone: 'navy' },
  'beeidigte-dolmetscher': { icon: Stamp, tone: 'navy' },
  notardolmetscher: { icon: Landmark, tone: 'navy' },
  'standesamt-dolmetscher': { icon: Building2, tone: 'navy' },
  'beglaubigte-uebersetzungen': { icon: FileText, tone: 'red' },
  'wirtschaft-finanzen': { icon: BriefcaseBusiness, tone: 'gold' },
  recht: { icon: Scale, tone: 'red' },
  ingenieurwesen: { icon: Wrench, tone: 'blue' },
  'medizin-dental': { icon: HeartPulse, tone: 'green' },
  pharmazeutik: { icon: Pill, tone: 'green' },
  literatur: { icon: BookOpen, tone: 'gold' },
  'it-software': { icon: Code2, tone: 'blue' },
  'chemie-biowissenschaften': { icon: FlaskConical, tone: 'green' },
  'industrie-produktion': { icon: Factory, tone: 'blue' },
};

const FEATURE_ICONS = [BadgeCheck, Globe2, Timer, ShieldCheck, UsersRound, ClipboardList];
const DETAIL_ICONS = [FileText, ShieldCheck, Globe2];
const RICH_SERVICE_IDS = new Set([
  'dolmetschen-overview',
  'fachuebersetzung-overview',
  'simultandolmetscher',
  'verhandlungsdolmetscher',
  'video-telefondolmetscher',
  'beeidigte-dolmetscher',
  'notardolmetscher',
  'standesamt-dolmetscher',
  'beglaubigte-uebersetzungen',
  'wirtschaft-finanzen',
  'recht',
  'ingenieurwesen',
  'medizin-dental',
  'pharmazeutik',
  'literatur',
  'it-software',
  'chemie-biowissenschaften',
  'industrie-produktion',
]);
const RICH_GROUP_ICONS = [Code2, Smartphone, Gamepad2, ClipboardList, Cloud, LockKeyhole, BookOpen, FileText];
const RICH_LABELS = {
  de: {
    languagePairs: 'Häufige Sprachkombinationen',
    itProjects: 'Typische IT- & Softwareprojekte',
    internationalIt: 'Internationale Software- & IT-Projekte',
    nationwide: 'Deutschlandweit für Sie im Einsatz',
    industryProfile: 'Industrie, Produktion & Maschinenbau',
    serviceProfile: 'Leistungsprofil',
    qualityProfile: 'Qualität und Einsatz',
    processProfile: 'Ablauf und Anfrage',
    compactFields: ['Präzise Kommunikation', 'Fachlich geprüft', 'Schnelle Organisation', 'Persönliche Beratung'],
    industryFields: ['Maschinenbau', 'Automatisierung', 'Logistik', 'Qualitätsmanagement', 'Sicherheitsunterlagen', 'Exportdokumente'],
    pairs: ['Englisch–Deutsch', 'Französisch–Deutsch', 'Spanisch–Deutsch', 'Italienisch–Deutsch', 'Arabisch–Deutsch', 'Türkisch–Deutsch', 'Polnisch–Deutsch', 'Russisch–Deutsch'],
  },
  en: {
    languagePairs: 'Frequent language pairs',
    itProjects: 'Typical IT & software projects',
    internationalIt: 'International software & IT projects',
    nationwide: 'Available across Germany',
    industryProfile: 'Industry, production & mechanical engineering',
    serviceProfile: 'Service profile',
    qualityProfile: 'Quality and use',
    processProfile: 'Process and request',
    compactFields: ['Precise communication', 'Expert checked', 'Fast coordination', 'Personal advice'],
    industryFields: ['Mechanical engineering', 'Automation', 'Logistics', 'Quality management', 'Safety documents', 'Export documents'],
    pairs: ['English–German', 'French–German', 'Spanish–German', 'Italian–German', 'Arabic–German', 'Turkish–German', 'Polish–German', 'Russian–German'],
  },
  ar: {
    languagePairs: 'أزواج لغوية شائعة',
    itProjects: 'مشاريع تقنية وبرمجيات نموذجية',
    internationalIt: 'مشاريع برمجيات وتقنية دولية',
    nationwide: 'متاحون في كل ألمانيا',
    industryProfile: 'الصناعة والإنتاج والهندسة الميكانيكية',
    serviceProfile: 'ملف الخدمة',
    qualityProfile: 'الجودة والاستخدام',
    processProfile: 'الخطوات والطلب',
    compactFields: ['تواصل دقيق', 'مراجعة تخصصية', 'تنظيم سريع', 'استشارة شخصية'],
    industryFields: ['الهندسة الميكانيكية', 'الأتمتة', 'اللوجستيات', 'إدارة الجودة', 'وثائق السلامة', 'وثائق التصدير'],
    pairs: ['الإنجليزية–الألمانية', 'الفرنسية–الألمانية', 'الإسبانية–الألمانية', 'الإيطالية–الألمانية', 'العربية–الألمانية', 'التركية–الألمانية', 'البولندية–الألمانية', 'الروسية–الألمانية'],
  },
  tr: {
    languagePairs: 'Sık dil kombinasyonları',
    itProjects: 'Tipik BT ve yazılım projeleri',
    internationalIt: 'Uluslararası yazılım ve BT projeleri',
    nationwide: 'Almanya genelinde hizmet',
    industryProfile: 'Sanayi, üretim ve makine mühendisliği',
    serviceProfile: 'Hizmet profili',
    qualityProfile: 'Kalite ve kullanım',
    processProfile: 'Süreç ve talep',
    compactFields: ['Net iletişim', 'Uzman kontrolü', 'Hızlı organizasyon', 'Kişisel danışmanlık'],
    industryFields: ['Makine mühendisliği', 'Otomasyon', 'Lojistik', 'Kalite yönetimi', 'Güvenlik belgeleri', 'İhracat belgeleri'],
    pairs: ['İngilizce–Almanca', 'Fransızca–Almanca', 'İspanyolca–Almanca', 'İtalyanca–Almanca', 'Arapça–Almanca', 'Türkçe–Almanca', 'Lehçe–Almanca', 'Rusça–Almanca'],
  },
  ru: {
    languagePairs: 'Частые языковые пары',
    itProjects: 'Типичные IT- и software-проекты',
    internationalIt: 'Международные software- и IT-проекты',
    nationwide: 'Работаем по всей Германии',
    industryProfile: 'Промышленность, производство и машиностроение',
    serviceProfile: 'Профиль услуги',
    qualityProfile: 'Качество и применение',
    processProfile: 'Процесс и запрос',
    compactFields: ['Точная коммуникация', 'Проверка экспертом', 'Быстрая организация', 'Личная консультация'],
    industryFields: ['Машиностроение', 'Автоматизация', 'Логистика', 'Управление качеством', 'Документы по безопасности', 'Экспортные документы'],
    pairs: ['Английский–немецкий', 'Французский–немецкий', 'Испанский–немецкий', 'Итальянский–немецкий', 'Арабский–немецкий', 'Турецкий–немецкий', 'Польский–немецкий', 'Русский–немецкий'],
  },
  fr: {
    languagePairs: 'Combinaisons linguistiques fréquentes',
    itProjects: 'Projets IT et logiciels typiques',
    internationalIt: 'Projets logiciels et IT internationaux',
    nationwide: 'Disponible dans toute l’Allemagne',
    industryProfile: 'Industrie, production et construction mécanique',
    serviceProfile: 'Profil du service',
    qualityProfile: 'Qualité et utilisation',
    processProfile: 'Processus et demande',
    compactFields: ['Communication précise', 'Contrôle expert', 'Organisation rapide', 'Conseil personnel'],
    industryFields: ['Construction mécanique', 'Automatisation', 'Logistique', 'Gestion qualité', 'Documents de sécurité', 'Documents d’exportation'],
    pairs: ['Anglais–allemand', 'Français–allemand', 'Espagnol–allemand', 'Italien–allemand', 'Arabe–allemand', 'Turc–allemand', 'Polonais–allemand', 'Russe–allemand'],
  },
  uk: {
    languagePairs: 'Поширені мовні пари',
    itProjects: 'Типові IT- та software-проєкти',
    internationalIt: 'Міжнародні software- та IT-проєкти',
    nationwide: 'Працюємо по всій Німеччині',
    industryProfile: 'Промисловість, виробництво та машинобудування',
    serviceProfile: 'Профіль послуги',
    qualityProfile: 'Якість і застосування',
    processProfile: 'Процес і запит',
    compactFields: ['Точна комунікація', 'Фахова перевірка', 'Швидка організація', 'Особиста консультація'],
    industryFields: ['Машинобудування', 'Автоматизація', 'Логістика', 'Управління якістю', 'Документи з безпеки', 'Експортні документи'],
    pairs: ['Англійська–німецька', 'Французька–німецька', 'Іспанська–німецька', 'Італійська–німецька', 'Арабська–німецька', 'Турецька–німецька', 'Польська–німецька', 'Російська–німецька'],
  },
};

const TEXT_FIXES = [
  [/Pr\?senz/g, 'Präsenz'],
  [/\?ber/g, 'Über'],
  [/Gesch\?fts/g, 'Geschäfts'],
  [/Vertragsabschl\?sse/g, 'Vertragsabschlüsse'],
  [/Beh\?rden/g, 'Behörden'],
  [/Kaufvertr\?ge/g, 'Kaufverträge'],
  [/Ehevertr\?ge/g, 'Eheverträge'],
  [/Gesellschaftsgr\?ndungen/g, 'Gesellschaftsgründungen'],
  [/F\?hrerscheine/g, 'Führerscheine'],
  [/Beschl\?sse/g, 'Beschlüsse'],
  [/Eheschlie\?ungen/g, 'Eheschließungen'],
  [/Beh\?rdentermine/g, 'Behördentermine'],
  [/Anh\?rungen/g, 'Anhörungen'],
];

function normalizeText(text = '') {
  return TEXT_FIXES.reduce((value, [pattern, replacement]) => value.replace(pattern, replacement), String(text));
}

function shorten(text = '', max = 260) {
  const clean = normalizeText(text).replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const boundary = clean.lastIndexOf('.', max);
  return `${clean.slice(0, boundary > 130 ? boundary + 1 : max).trim()}…`;
}

function uniqueList(items) {
  return [...new Set(items.filter(Boolean).map((item) => normalizeText(item).replace(/\s+/g, ' ').trim()))];
}

function getVisualContent(active, copy) {
  const paragraphs = uniqueList(active?.paragraphs || [active?.text]);
  const longParagraphs = paragraphs.filter((item) => item.length > 105);
  const shortItems = paragraphs.filter((item) => item.length <= 105 && !item.includes('___'));
  const examples = uniqueList([...(active?.examples || []), ...shortItems]).slice(0, 6);
  const highlights = [
    active?.group === 'interpreting' ? copy.interpretingLanguages : copy.trustB,
    copy.trustA,
    copy.trustC,
  ];

  return {
    lead: shorten(longParagraphs[0] || active?.text || '', 390),
    detailParagraphs: longParagraphs.slice(1, 3).map((item) => shorten(item, 260)),
    examples: examples.length ? examples : highlights,
    highlights,
  };
}

function getOfferHref(lang) {
  return lang === 'de' ? '/angebot' : `/${lang}/angebot`;
}

function getServiceImage(active) {
  return SERVICE_IMAGES[active?.group] || SERVICE_IMAGES.specialist;
}

function getServiceTheme(active) {
  return SERVICE_THEMES[active?.id] || SERVICE_THEMES[active?.group] || { icon: BadgeCheck, tone: 'navy' };
}

function buildGroupedItems(paragraphs, groups) {
  return groups.map(([titleIndex, start, end], index) => ({
    title: normalizeText(paragraphs[titleIndex] || ''),
    items: paragraphs.slice(start, end).map(normalizeText).filter(Boolean),
    Icon: RICH_GROUP_ICONS[index] || BadgeCheck,
  })).filter((group) => group.title);
}

function chunkItems(items, size = 4) {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

function isListHeading(text = '') {
  return /^(wir übersetzen|typische|dazu gehören|häufig|so läuft|these|typical|we translate|nous traduisons|nous proposons|نترجم|تشمل|نموذجية|типичные|ми перекладаємо|çevirdiğimiz)/i.test(text.trim());
}

function isQuestionText(text = '') {
  return /[?؟]\s*$/.test(text.trim());
}

function getUsableShortItems(paragraphs, active, richLabels) {
  return uniqueList([
    ...(active?.examples || []),
    ...paragraphs.filter((item) => item.length <= 125 && !isListHeading(item) && !isQuestionText(item)),
    ...richLabels.compactFields,
  ]).slice(0, 18);
}

function buildGenericGroups(paragraphs, active, visualCopy, richLabels) {
  const shortItems = getUsableShortItems(paragraphs, active, richLabels);
  const titles = [
    visualCopy.typical,
    richLabels.serviceProfile,
    richLabels.qualityProfile,
    richLabels.processProfile,
  ];

  return chunkItems(shortItems, 4).slice(0, 4).map((items, index) => ({
    title: titles[index] || visualCopy.highlights,
    items,
    Icon: RICH_GROUP_ICONS[index] || BadgeCheck,
  })).filter((group) => group.items.length);
}

function getLongParagraphs(paragraphs) {
  return paragraphs.filter((item) => item.length > 125 && !isQuestionText(item));
}

function getCtaParagraph(paragraphs, visualCopy) {
  const questionIndex = paragraphs.findIndex(isQuestionText);
  if (questionIndex >= 0) {
    return [paragraphs[questionIndex], paragraphs[questionIndex + 1]]
      .filter(Boolean)
      .join(' ');
  }
  const longParagraphs = getLongParagraphs(paragraphs);
  return longParagraphs[longParagraphs.length - 1] || visualCopy.ctaSub;
}

function getContentSegments(active, visualCopy, lang = 'de') {
  const richLabels = RICH_LABELS[lang] || RICH_LABELS.de;
  const paragraphs = (active?.paragraphs || []).map(normalizeText);

  if (active?.id === 'it-software') {
    return buildGroupedItems(paragraphs, [
      [3, 4, 8],
      [8, 9, 12],
      [12, 13, 16],
      [16, 17, 20],
      [20, 21, 24],
      [24, 25, 28],
      [28, 29, 32],
      [32, 33, 36],
    ]);
  }

  if (active?.id === 'industrie-produktion') {
    return [
      { title: paragraphs[1] || visualCopy.typical, items: paragraphs.slice(2, 8), Icon: Factory },
      { title: visualCopy.highlights, items: richLabels.industryFields, Icon: Wrench },
    ];
  }

  const segments = [];
  for (let index = 0; index < paragraphs.length; index += 1) {
    const text = paragraphs[index];
    const next = paragraphs[index + 1];
    const looksLikeHeading = isListHeading(text) || (text.length <= 85 && next && next.length <= 130 && !isQuestionText(text));
    if (!looksLikeHeading) continue;

    const items = [];
    for (let cursor = index + 1; cursor < paragraphs.length; cursor += 1) {
      const item = paragraphs[cursor];
      if (!item || isQuestionText(item)) break;
      if (item.length > 150) break;
      if (isListHeading(item) && items.length) break;
      items.push(item);
    }

    if (items.length >= 2) {
      segments.push({
        title: text.replace(/:$/, ''),
        items: uniqueList(items).slice(0, 8),
        Icon: RICH_GROUP_ICONS[segments.length] || BadgeCheck,
      });
      index += items.length;
    }
  }

  if (segments.length) return segments.slice(0, 8);

  return chunkItems(getUsableShortItems(paragraphs, active, richLabels), 4).slice(0, 4).map((items, index) => ({
    title: [visualCopy.typical, richLabels.serviceProfile, richLabels.qualityProfile, richLabels.processProfile][index] || visualCopy.highlights,
    items,
    Icon: RICH_GROUP_ICONS[index] || BadgeCheck,
  }));
}

function getRichServiceData(active, visualCopy, lang = 'de') {
  if (!RICH_SERVICE_IDS.has(active?.id)) return null;

  const richLabels = RICH_LABELS[lang] || RICH_LABELS.de;
  const paragraphs = (active?.paragraphs || []).map(normalizeText);
  const isIt = active.id === 'it-software';
  const ctaText = normalizeText(active?.cta || visualCopy.request);

  if (isIt) {
    const groups = buildGroupedItems(paragraphs, [
      [3, 4, 8],
      [8, 9, 12],
      [12, 13, 16],
      [16, 17, 20],
      [20, 21, 24],
      [24, 25, 28],
      [28, 29, 32],
      [32, 33, 36],
    ]);

    return {
      title: normalizeText(active.label || active.title),
      introTitle: normalizeText(active.title),
      intro: paragraphs[0],
      competenceTitle: visualCopy.highlights,
      competence: paragraphs[1],
      groupsTitle: paragraphs[2] || visualCopy.typical,
      groups,
      sideCards: [
        {
          Icon: Smartphone,
          title: richLabels.itProjects,
          items: groups.slice(0, 6).map((group) => group.title),
        },
        {
          Icon: Globe2,
          title: richLabels.languagePairs,
          items: richLabels.pairs,
        },
      ],
      wideBlocks: [
        {
          Icon: Cloud,
          title: richLabels.internationalIt,
          text: paragraphs[1],
          checks: groups.slice(0, 8).map((group) => group.title),
        },
        {
          Icon: MapPin,
          title: richLabels.nationwide,
          text: paragraphs[36],
          checks: [visualCopy.trustC, visualCopy.trustA, visualCopy.trustB],
        },
      ],
      ctaText,
      ctaParagraph: paragraphs[37],
      footerTiles: groups.slice(0, 6),
    };
  }

  if (active.id === 'industrie-produktion') {
    const typicalItems = paragraphs.slice(2, 8).map(normalizeText).filter(Boolean);
    const groups = [
      {
        title: paragraphs[1] || visualCopy.typical,
        items: typicalItems,
        Icon: ClipboardList,
      },
      {
        title: visualCopy.highlights,
        items: richLabels.industryFields,
        Icon: Factory,
      },
    ];

    return {
      title: normalizeText(active.label || active.title),
      introTitle: normalizeText(active.title),
      intro: paragraphs[0],
      competenceTitle: visualCopy.highlights,
      competence: paragraphs[8],
      groupsTitle: paragraphs[1] || visualCopy.typical,
      groups,
      sideCards: [
        {
          Icon: Factory,
          title: visualCopy.typical,
          items: typicalItems.slice(0, 6),
        },
        {
          Icon: Globe2,
          title: richLabels.languagePairs,
          items: richLabels.pairs,
        },
      ],
      wideBlocks: [
        {
          Icon: Factory,
          title: richLabels.industryProfile,
          text: paragraphs[8],
          checks: richLabels.industryFields,
        },
        {
          Icon: MapPin,
          title: richLabels.nationwide,
          text: paragraphs[9],
          checks: [visualCopy.trustC, visualCopy.trustA, visualCopy.trustB],
        },
      ],
      ctaText,
      ctaParagraph: paragraphs[10],
      footerTiles: groups[0].items.slice(0, 6).map((item, index) => ({
        title: item,
        items: [visualCopy.trustA],
        Icon: RICH_GROUP_ICONS[index] || Factory,
      })),
    };
  }

  const activeTheme = getServiceTheme(active);
  const longParagraphs = getLongParagraphs(paragraphs);
  const groups = buildGenericGroups(paragraphs, active, visualCopy, richLabels);
  const shortItems = getUsableShortItems(paragraphs, active, richLabels);
  const wideParagraphs = longParagraphs.slice(2, 4);

  return {
    title: normalizeText(active.label || active.title),
    introTitle: normalizeText(active.title),
    intro: longParagraphs[0] || paragraphs[0] || active?.text || '',
    competenceTitle: visualCopy.highlights,
    competence: longParagraphs[1] || paragraphs[1] || visualCopy.ctaSub,
    groupsTitle: isListHeading(paragraphs[1]) ? paragraphs[1] : visualCopy.typical,
    groups,
    sideCards: [
      {
        Icon: activeTheme.icon || BadgeCheck,
        title: richLabels.serviceProfile,
        items: shortItems.slice(0, 6),
      },
      {
        Icon: Globe2,
        title: active?.group === 'interpreting' ? visualCopy.interpretingLanguages : richLabels.languagePairs,
        items: active?.group === 'interpreting' ? [visualCopy.trustC, visualCopy.trustA, visualCopy.ctaSub] : richLabels.pairs,
      },
    ],
    wideBlocks: [
      {
        Icon: activeTheme.icon || BadgeCheck,
        title: richLabels.qualityProfile,
        text: wideParagraphs[0] || longParagraphs[1] || visualCopy.ctaSub,
        checks: [visualCopy.trustA, visualCopy.trustB, visualCopy.trustC],
      },
      {
        Icon: MapPin,
        title: richLabels.nationwide,
        text: wideParagraphs[1] || longParagraphs[2] || longParagraphs[0] || visualCopy.ctaSub,
        checks: shortItems.slice(0, 4),
      },
    ],
    ctaText,
    ctaParagraph: getCtaParagraph(paragraphs, visualCopy),
    footerTiles: (groups.length ? groups.flatMap((group) => group.items) : shortItems).slice(0, 6).map((item, index) => ({
      title: item,
      items: [visualCopy.ctaSub],
      Icon: RICH_GROUP_ICONS[index] || BadgeCheck,
    })),
  };
}

function RichServicePanel({ active, visualCopy, lang }) {
  const rich = getRichServiceData(active, visualCopy, lang);
  if (!rich) return null;
  if (active?.group === 'translation') {
    return <CertifiedTranslationSheet active={active} rich={rich} visualCopy={visualCopy} lang={lang} />;
  }
  if (active?.group === 'interpreting') {
    return <InterpretingSheet active={active} rich={rich} visualCopy={visualCopy} lang={lang} />;
  }
  return <SpecialistSheet active={active} rich={rich} visualCopy={visualCopy} lang={lang} />;
}

function IconBubble({ icon: Icon }) {
  return (
    <span className="pdf-icon-bubble" aria-hidden="true">
      <Icon />
    </span>
  );
}

function SpecialistSheet({ active, rich, visualCopy, lang }) {
  const ActiveIcon = getServiceTheme(active).icon || BadgeCheck;
  const richLabels = RICH_LABELS[lang] || RICH_LABELS.de;
  const paragraphs = (active?.paragraphs || []).map(normalizeText);
  const longParagraphs = getLongParagraphs(paragraphs);
  const segments = getContentSegments(active, visualCopy, lang);
  const sideItems = (segments[0]?.items || rich.sideCards[0]?.items || []).slice(0, 7);
  const languagePairs = richLabels.pairs.slice(0, 8);
  const bottomTiles = (segments.flatMap((segment) => segment.items).length ? segments.flatMap((segment) => segment.items) : rich.footerTiles.map((tile) => tile.title)).slice(0, 6);

  return (
    <div className="pdf-service-sheet pdf-service-sheet--specialist" data-service-id={active.id}>
      <section className="pdf-top-grid">
        <div className="pdf-main-column">
          <h3>{rich.title}</h3>
          <div className="pdf-info-row">
            <IconBubble icon={ActiveIcon} />
            <div>
              <h4>{rich.introTitle}</h4>
              <p>{rich.intro}</p>
            </div>
          </div>
          <div className="pdf-info-row">
            <IconBubble icon={ShieldCheck} />
            <div>
              <h4>{rich.competenceTitle}</h4>
              <p>{rich.competence}</p>
            </div>
          </div>
          {longParagraphs[2] && (
            <div className="pdf-info-row">
              <IconBubble icon={MapPin} />
              <div>
                <h4>{richLabels.nationwide}</h4>
                <p>{longParagraphs[2]}</p>
              </div>
            </div>
          )}
        </div>

        <div className="pdf-side-stack">
          <article className="pdf-side-card">
            <IconBubble icon={ClipboardList} />
            <h4>{segments[0]?.title || visualCopy.typical}</h4>
            <ul>{sideItems.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="pdf-side-card">
            <IconBubble icon={Globe2} />
            <h4>{richLabels.languagePairs}</h4>
            <ul>{languagePairs.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className="pdf-topic-section" aria-labelledby={`${active.id}-typical`}>
        <div className="pdf-section-title">
          <IconBubble icon={segments[0]?.Icon || Cloud} />
          <h4 id={`${active.id}-typical`}>{rich.groupsTitle}</h4>
        </div>
        <div className="pdf-topic-grid">
          {segments.map(({ Icon, title, items }) => (
            <article className="pdf-topic-card" key={title}>
              <IconBubble icon={Icon} />
              <h5>{title}</h5>
              <ul>
                {items.slice(0, 4).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="pdf-wide-card">
        <IconBubble icon={MapPin} />
        <div>
          <h4>{richLabels.nationwide}</h4>
          <p>{longParagraphs[longParagraphs.length - 2] || rich.wideBlocks[1]?.text || visualCopy.ctaSub}</p>
        </div>
      </section>

      <section className="pdf-cta-card">
        <IconBubble icon={HelpIcon(active)} />
        <div>
          <h4>{rich.ctaText}</h4>
          <p>{rich.ctaParagraph}</p>
        </div>
        <a href={getOfferHref(lang)} className="pdf-blue-btn">
          {rich.ctaText} <ArrowRight aria-hidden="true" />
        </a>
      </section>

      <div className="pdf-bottom-strip">
        {bottomTiles.map((item, index) => {
          const Icon = RICH_GROUP_ICONS[index] || BadgeCheck;
          return (
            <div className="pdf-bottom-tile" key={item}>
              <Icon aria-hidden="true" />
              <strong>{item}</strong>
              <span>{visualCopy.ctaSub}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HelpIcon(active) {
  if (active?.group === 'interpreting') return Headphones;
  if (active?.group === 'translation') return FileText;
  return BadgeCheck;
}

function DolmetschenReferenceSheet({ active, visualCopy, lang }) {
  const richLabels = RICH_LABELS[lang] || RICH_LABELS.de;
  const paragraphs = (active?.paragraphs || []).map(normalizeText);
  const main = paragraphs[0] || '';
  const row1 = main.split('Seit 2019')[0]?.trim() || main;
  const row2Rest = main.includes('Seit 2019') ? `Seit 2019${main.split('Seit 2019')[1]}` : paragraphs[1] || '';
  const row2 = row2Rest.split('Wir vermitteln')[0]?.trim() || row2Rest;
  const row3 = main.includes('Wir vermitteln')
    ? `Wir vermitteln${main.split('Wir vermitteln')[1]}`.trim()
    : paragraphs[1] || visualCopy.ctaSub;
  const rows = [
    { Icon: UsersRound, text: row1 },
    { Icon: MapPin, text: row2 },
    { Icon: Globe2, text: row3 },
  ].filter((row) => row.text);
  const benefits = lang === 'de'
    ? [
        ['ÜBER 190 SPRACHEN', 'Dolmetscher für nahezu alle Sprachen und Dialekte weltweit.', Globe2],
        ['ERFAHRENE DOLMETSCHER', 'Qualifizierte und geprüfte Dolmetscher mit Fachkompetenz und Erfahrung.', UsersRound],
        ['VIELSEITIGE EINSATZGEBIETE', 'Einsätze bei Unternehmen, Behörden, Gerichten, medizinischen Einrichtungen und für Privatkunden.', Landmark],
        ['FLEXIBLE EINSATZFORMEN', 'Präsenztermine vor Ort, Online Meetings, Video- und Telefondolmetschen.', Video],
      ]
    : [
        [visualCopy.interpretingLanguages, visualCopy.ctaSub, Globe2],
        [visualCopy.trustA, visualCopy.ctaSub, UsersRound],
        [richLabels.serviceProfile, visualCopy.ctaSub, Landmark],
        [visualCopy.trustC, visualCopy.ctaSub, Video],
      ];

  return (
    <div className="pdf-dolmetschen-reference" data-service-id={active.id}>
      <section className="pdf-dolmetschen-hero">
        <div className="pdf-dolmetschen-copy">
          <h3>{normalizeText(active.label || active.title)}</h3>
          <div className="pdf-dolmetschen-rows">
            {rows.map(({ Icon, text }) => (
              <div className="pdf-dolmetschen-row" key={text}>
                <IconBubble icon={Icon} />
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
        <figure className="pdf-dolmetschen-art pdf-visual-placeholder" aria-hidden="true">
          <span />
        </figure>
      </section>

      <div className="pdf-dolmetschen-benefits">
        {benefits.map(([title, text, Icon]) => (
          <div className="pdf-dolmetschen-benefit" key={title}>
            <IconBubble icon={Icon} />
            <strong>{title}</strong>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InterpretingSheet({ active, rich, visualCopy, lang }) {
  const ActiveIcon = getServiceTheme(active).icon || Headphones;
  const richLabels = RICH_LABELS[lang] || RICH_LABELS.de;
  const paragraphs = (active?.paragraphs || []).map(normalizeText);
  const longParagraphs = getLongParagraphs(paragraphs);
  const details = getUsableShortItems(paragraphs, active, richLabels).slice(0, 6);
  const isOverview = active.id === 'dolmetschen-overview';
  const steps = [
    [visualCopy.request, visualCopy.requestText, Send],
    [visualCopy.review, visualCopy.reviewText, ClipboardList],
    [visualCopy.delivery, visualCopy.deliveryText, UsersRound],
  ];

  if (isOverview) {
    return <DolmetschenReferenceSheet active={active} visualCopy={visualCopy} lang={lang} />;
  }

  return (
    <div className="pdf-service-sheet pdf-service-sheet--interpreting" data-service-id={active.id}>
      <section className="pdf-interpreter-hero">
        <div className="pdf-main-column">
          <h3>{rich.title}</h3>
          {(isOverview ? longParagraphs.slice(0, 3) : [rich.intro, rich.competence, rich.ctaParagraph]).filter(Boolean).map((text, index) => {
            const Icon = [ActiveIcon, MapPin, Globe2][index] || BadgeCheck;
            const title = [rich.introTitle, richLabels.nationwide, richLabels.serviceProfile][index] || visualCopy.details;
            return (
              <div className="pdf-info-row" key={`${title}-${index}`}>
                <IconBubble icon={Icon} />
                <div>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </div>
              </div>
            );
          })}
        </div>
        <figure className="pdf-interpreter-visual pdf-visual-placeholder" aria-hidden="true">
          <span />
        </figure>
      </section>

      <div className="pdf-benefit-strip">
        {[visualCopy.interpretingLanguages, visualCopy.trustA, richLabels.serviceProfile, visualCopy.trustC].map((item, index) => {
          const Icon = [Globe2, UsersRound, Landmark, Video][index] || BadgeCheck;
          return (
            <div className="pdf-benefit-item" key={item}>
              <Icon aria-hidden="true" />
              <strong>{item}</strong>
              <span>{details[index] || visualCopy.ctaSub}</span>
            </div>
          );
        })}
      </div>

      <section className="pdf-process-board">
        <h4>{visualCopy.process}</h4>
        <div className="pdf-process-grid">
          {steps.map(([title, text, Icon], index) => (
            <article className="pdf-process-card" key={title}>
              <b>{index + 1}</b>
              <Icon aria-hidden="true" />
              <h5>{title}</h5>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pdf-cta-card">
        <IconBubble icon={HelpIcon(active)} />
        <div>
          <h4>{rich.ctaText}</h4>
          <p>{rich.ctaParagraph}</p>
        </div>
        <a href={getOfferHref(lang)} className="pdf-blue-btn">
          {rich.ctaText} <ArrowRight aria-hidden="true" />
        </a>
      </section>
    </div>
  );
}

function CertifiedTranslationSheet({ active, rich, visualCopy, lang }) {
  const richLabels = RICH_LABELS[lang] || RICH_LABELS.de;
  const paragraphs = (active?.paragraphs || []).map(normalizeText);
  const documents = paragraphs.slice(2, 9).filter(Boolean);
  const languagePairs = paragraphs.slice(11, 28).filter((item) => item && item.length < 60);
  const processText = paragraphs.slice(29, 33).filter(Boolean);
  const processSteps = processText.length ? processText : [
    visualCopy.requestText,
    visualCopy.reviewText,
    visualCopy.deliveryText,
  ];

  return (
    <div className="pdf-service-sheet pdf-service-sheet--translation" data-service-id={active.id}>
      <section className="pdf-top-grid">
        <div className="pdf-main-column">
          <h3>{rich.title}</h3>
          <div className="pdf-info-row">
            <IconBubble icon={FileText} />
            <div>
              <h4>{rich.introTitle}</h4>
              <p>{rich.intro}</p>
            </div>
          </div>
          <div className="pdf-info-row">
            <IconBubble icon={ShieldCheck} />
            <div>
              <h4>{rich.competenceTitle}</h4>
              <p>{rich.competence}</p>
            </div>
          </div>
        </div>
        <div className="pdf-side-stack">
          <article className="pdf-side-card">
            <IconBubble icon={ClipboardList} />
            <h4>{paragraphs[1] || visualCopy.typical}</h4>
            <ul>{documents.slice(0, 7).map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="pdf-side-card">
            <IconBubble icon={Globe2} />
            <h4>{richLabels.languagePairs}</h4>
            <ul>{(languagePairs.length ? languagePairs : richLabels.pairs).slice(0, 8).map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className="pdf-certified-process">
        <h4>{visualCopy.process}</h4>
        <div className="pdf-certified-grid">
          {processSteps.slice(0, 6).map((item, index) => {
            const Icon = [FileText, Send, ClipboardList, Stamp, CheckCircle2, ShieldCheck][index] || BadgeCheck;
            return (
              <article className="pdf-certified-step" key={`${item}-${index}`}>
                <b>{index + 1}</b>
                <Icon aria-hidden="true" />
                <p>{item.replace(/^\d+\.\s*/, '')}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="pdf-cta-card">
        <IconBubble icon={Stamp} />
        <div>
          <h4>{rich.ctaText}</h4>
          <p>{getCtaParagraph(paragraphs, visualCopy)}</p>
        </div>
        <a href={getOfferHref(lang)} className="pdf-blue-btn">
          {rich.ctaText} <ArrowRight aria-hidden="true" />
        </a>
      </section>
    </div>
  );
}

export default function Services() {
  const { lang } = useI18n();
  const navItems = useMemo(() => getServiceNavigation(lang), [lang]);
  const interpretingItems = navItems.filter((item) => item.group === 'interpreting');
  const translationItem = navItems.find((item) => item.group === 'translation');
  const specialtyItems = navItems.filter((item) => item.group === 'specialist');
  const ui = serviceUi[lang] || serviceUi.de;
  const side = SIDE_LABELS[lang] || SIDE_LABELS.de;
  const visualCopy = VISUAL_COPY[lang] || VISUAL_COPY.de;
  const specialtyOverview = useMemo(() => ({
    id: 'fachuebersetzung-overview',
    group: 'specialist',
    label: side.specialist,
    title: ui.title.replace(/\.$/, ''),
    kicker: ui.kicker,
    text: ui.sub,
    paragraphs: [
      ui.sub,
      visualCopy.ctaSub,
      ...specialtyItems.slice(0, 9).map((item) => item.label),
    ],
    examples: specialtyItems.slice(0, 6).map((item) => item.label),
    cta: visualCopy.request,
  }), [side.specialist, specialtyItems, ui.kicker, ui.sub, ui.title, visualCopy.ctaSub, visualCopy.request]);
  const [activeId, setActiveId] = useState(navItems[0]?.id);
  const active = activeId === specialtyOverview.id ? specialtyOverview : navItems.find((item) => item.id === activeId) || navItems[0];
  const activeVisual = getVisualContent(active, visualCopy);
  const activeCta = normalizeText(active?.cta || visualCopy.request);
  const activeImage = getServiceImage(active);
  const activeTheme = getServiceTheme(active);
  const ActiveThemeIcon = activeTheme.icon;
  const richService = getRichServiceData(active, visualCopy, lang);
  const steps = [
    [visualCopy.request, visualCopy.requestText, Send],
    [visualCopy.review, visualCopy.reviewText, ClipboardList],
    [visualCopy.delivery, visualCopy.deliveryText, CheckCircle2],
  ];

  useEffect(() => {
    setActiveId(navItems[0]?.id);
  }, [lang, navItems]);

  return (
    <section className="services" id="services" aria-labelledby="services-heading">
      <div className="container">
        <div className="specialties" id="fachuebersetzungen">
          <div className="section-head specialties-head">
            <h2 data-reveal="">{ui.title}</h2>
            <p data-reveal="" style={{ '--ri': 1 }}>
              {ui.sub}
            </p>
          </div>

          <div className="specialty-layout" data-reveal="" style={{ '--ri': 0 }}>
            <aside className="specialty-sidebar" aria-label="Fachübersetzungen Navigation">
              <button
                type="button"
                className={`specialty-side-row specialty-side-row--strong${active?.id === interpretingItems[0]?.id ? ' active' : ''}`}
                onClick={() => setActiveId(interpretingItems[0]?.id)}
                aria-pressed={active?.id === interpretingItems[0]?.id}
              >
                {side.interpreting} <span aria-hidden="true">›</span>
              </button>

              {interpretingItems.length > 1 && (
                <div className="specialty-side-subnav">
                  {interpretingItems.slice(1).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`specialty-side-row specialty-side-row--sub${item.id === 'standesamt-dolmetscher' ? ' specialty-side-row--strong' : ''}${active?.id === item.id ? ' active' : ''}`}
                      onClick={() => setActiveId(item.id)}
                      aria-pressed={active?.id === item.id}
                    >
                      {item.label} <span aria-hidden="true">›</span>
                    </button>
                  ))}
                </div>
              )}

              <button
                type="button"
                className={`specialty-side-row specialty-side-row--strong${active?.id === translationItem?.id ? ' active' : ''}`}
                onClick={() => setActiveId(translationItem?.id)}
                aria-pressed={active?.id === translationItem?.id}
              >
                {side.translation} <span aria-hidden="true">›</span>
              </button>

              <button
                type="button"
                className={`specialty-side-row specialty-side-row--active specialty-side-row--strong${active?.id === specialtyOverview.id ? ' active' : ''}`}
                onClick={() => setActiveId(specialtyOverview.id)}
                aria-pressed={active?.id === specialtyOverview.id}
              >
                {side.specialist} <span aria-hidden="true">›</span>
              </button>

              <div className="specialty-side-subnav">
                {specialtyItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`specialty-side-row specialty-side-row--sub${active?.id === item.id ? ' active' : ''}`}
                    onClick={() => setActiveId(item.id)}
                    aria-pressed={active?.id === item.id}
                  >
                    {item.label} <span aria-hidden="true">›</span>
                  </button>
                ))}
              </div>

              <a href="/#faq" className="specialty-side-row specialty-side-row--strong">
                {side.faq} <span aria-hidden="true">›</span>
              </a>
            </aside>

            <article className={`service-visual-panel${richService ? ' service-visual-panel--rich' : ''}`} aria-live="polite">
              {richService ? (
                <RichServicePanel active={active} visualCopy={visualCopy} lang={lang} />
              ) : (
              <>
                <div className="service-visual-hero">
                <div className="service-visual-copy">
                  <span className="service-visual-kicker">{normalizeText(active?.kicker || visualCopy.overview)}</span>
                  <h3>{normalizeText(active?.title)}</h3>
                  <p>{activeVisual.lead}</p>
                </div>
                <figure className={`service-visual-art service-visual-art--${activeTheme.tone}`} aria-hidden="true">
                  <div className="service-topic-card">
                    <div className="service-topic-mark">
                      <ActiveThemeIcon />
                    </div>
                    <span>{normalizeText(active?.label || active?.kicker || visualCopy.overview)}</span>
                    <strong>{normalizeText(active?.title)}</strong>
                    <p>{activeVisual.examples[0] || activeVisual.highlights[0]}</p>
                    <div className="service-topic-metrics">
                      {activeVisual.highlights.map((item) => (
                        <small key={item}>{item}</small>
                      ))}
                    </div>
                  </div>
                  <div className="service-visual-illustration">
                    <img src={activeImage} alt="" loading="lazy" decoding="async" />
                  </div>
                </figure>
              </div>

              <div className="service-info-grid">
                <section className="service-info-card service-info-card--list">
                  <span className="service-info-label">{visualCopy.typical}</span>
                  <ul>
                    {activeVisual.examples.map((item, index) => {
                      const Icon = FEATURE_ICONS[index] || CheckCircle2;
                      return (
                        <li key={item}>
                          <span className="service-info-icon" aria-hidden="true">
                            <Icon />
                          </span>
                          <span>{item}</span>
                        </li>
                      );
                    })}
                  </ul>
                </section>

                <section className="service-info-card">
                  <span className="service-info-label">{visualCopy.details}</span>
                  <div className="service-detail-list">
                    {(activeVisual.detailParagraphs.length ? activeVisual.detailParagraphs : [visualCopy.ctaSub]).map((paragraph, index) => {
                      const Icon = DETAIL_ICONS[index] || FileText;
                      return (
                        <div className="service-detail-item" key={paragraph}>
                          <Icon aria-hidden="true" />
                          <p>{paragraph}</p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>

              <section className="service-process-card">
                <span className="service-info-label">{visualCopy.process}</span>
                <div className="service-process-steps">
                  {steps.map(([title, text, Icon], index) => (
                    <div className="service-process-step" key={title}>
                      <div className="service-process-body">
                        <b>{String(index + 1).padStart(2, '0')}</b>
                        <Icon aria-hidden="true" />
                        <strong>{title}</strong>
                        <p>{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="service-visual-cta">
                <div>
                  <strong>{activeCta}</strong>
                  <span>{visualCopy.ctaSub}</span>
                </div>
                <a href={getOfferHref(lang)} className="service-green-btn">
                  {activeCta} <ArrowRight aria-hidden="true" />
                </a>
              </div>
              </>
              )}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
