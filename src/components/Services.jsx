import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
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
  de: { interpreting: 'Dolmetschen', translation: 'Beglaubigte Übersetzungen', specialist: 'Fachübersetzung', faq: 'FAQ', close: 'Menü schließen' },
  en: { interpreting: 'Interpreting', translation: 'Certified translations', specialist: 'Specialist translation', faq: 'FAQ', close: 'Close menu' },
  ar: { interpreting: 'ترجمة فورية', translation: 'ترجمات معتمدة', specialist: 'ترجمة متخصصة', faq: 'الأسئلة الشائعة', close: 'إغلاق القائمة' },
  tr: { interpreting: 'Tercümanlık', translation: 'Yeminli çeviriler', specialist: 'Uzman çeviri', faq: 'SSS', close: 'Menüyü kapat' },
  ru: { interpreting: 'Устный перевод', translation: 'Заверенные переводы', specialist: 'Профильный перевод', faq: 'FAQ', close: 'Закрыть меню' },
  fr: { interpreting: 'Interprétation', translation: 'Traductions certifiées', specialist: 'Traduction spécialisée', faq: 'FAQ', close: 'Fermer le menu' },
  uk: { interpreting: 'Усний переклад', translation: 'Засвідчені переклади', specialist: 'Фаховий переклад', faq: 'FAQ', close: 'Закрити меню' },
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
    trustB: '190+ Sprachen',
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
    trustB: '190+ languages',
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
    trustB: '190+ لغة',
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
    trustB: '190+ dil',
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
    trustB: '190+ языков',
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
    trustB: '190+ langues',
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
    trustB: '190+ мов',
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
  if (active?.id === 'it-software') {
    return <ItSoftwareSheet active={active} visualCopy={visualCopy} lang={lang} />;
  }
  if (active?.id === 'wirtschaft-finanzen') {
    return <WirtschaftFinanzenSheet active={active} visualCopy={visualCopy} lang={lang} />;
  }
  if (active?.id === 'recht') {
    return <RechtSheet active={active} visualCopy={visualCopy} lang={lang} />;
  }
  if (active?.id === 'beglaubigte-uebersetzungen') {
    return <BeglaubigteUebersetzungSheet active={active} visualCopy={visualCopy} lang={lang} />;
  }
  if (POINT_GRID_SHEETS[active?.id]) {
    return <PointGridSheet active={active} data={localizePointGridSheet(active, POINT_GRID_SHEETS[active.id], visualCopy, lang)} lang={lang} />;
  }
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

const IT_ASSET_BASE = '/assets/it-software/';
const DOLMETSCHER_ASSET_BASE = '/assets/dolmetscher/';
const BEEIDIGTE_ASSET_BASE = '/assets/beeidigte-dolmetscher/';
const RECHT_ASSET_BASE = '/assets/recht/';
const STANDESAMT_ASSET_BASE = '/assets/standesamt-dolmetscher/';
const WIRTSCHAFT_ASSET_BASE = '/assets/wirtschaft-finanzen/';
const BEGLAUBIGTE_ASSET_BASE = '/assets/beglaubigte-uebersetzung/';
const POINT_CONTENT_ASSET_BASE = '/assets/points-content/';

const DOLMETSCHER_SHEET = {
  title: 'Dolmetschen',
  introRows: [
    {
      asset: 'mannschaft.png',
      text: 'Professionelle Dolmetscherdienste für Unternehmen, Behörden, Gerichte, medizinische Einrichtungen und Privatpersonen.',
    },
    {
      asset: 'platzhalter.png',
      text: 'Seit 2019 unterstützt unser Dolmetscher- und Übersetzungsbüro Mandanten in Osnabrück, Bielefeld, Kiel, Mainz, Stuttgart, Berlin sowie bundesweit – auf Wunsch auch international.',
    },
    {
      asset: 'save-the-world.png',
      text: 'Wir vermitteln qualifizierte Dolmetscher in über 190 Sprachen für Präsenztermine, Online-Meetings, Videokonferenzen und Telefondolmetschen – schnell, zuverlässig und professionell.',
    },
  ],
  benefits: [
    ['ÜBER 190 SPRACHEN', 'Dolmetscher für nahezu alle Sprachen und Dialekte weltweit.', 'save-the-world.png'],
    ['ERFAHRENE DOLMETSCHER', 'Qualifizierte und geprüfte Dolmetscher mit langjähriger Erfahrung und hoher Fachkompetenz.', 'benutzer.png'],
    ['FLEXIBLE EINSATZFORMEN', 'Kurzfristige Einsätze, individuelle Terminplanung und bundesweite Verfügbarkeit.', 'flexibel.png'],
  ],
  processTitle: 'So geht’s eine Dolmetscher Bestellung',
  process: [
    ['1', 'Anfrage per E-Mail senden', 'Sprache, Auftragsort und Uhrzeit mitteilen.', 'email.png'],
    ['2', 'Angebot erhalten & bestätigen', 'Preis prüfen und Angebot bestätigen.', 'bestatigung.png'],
    ['3', 'Dolmetscher vor Ort', 'Der Dolmetscher ist zum vereinbarten Termin für Sie vor Ort.', 'ubersetzer.png'],
  ],
  cta: 'Kostenlose Dolmetscheranfrage',
};

const BEEIDIGTE_DOLMETSCHER_SHEET = {
  kicker: 'Dolmetschen',
  title: 'Beeidigte Dolmetscher',
  introRows: [
    {
      asset: 'dolmetscher.png',
      text: 'Unsere allgemein beeidigten Dolmetscher begleiten Sie zuverlässig bei Terminen bei Behörden, Gerichten, Notaren, Standesämtern, Anhörungen sowie in Konsulaten und Botschaften.',
    },
    {
      asset: 'netzwerk.png',
      paragraphs: [
        'Dank unseres bundesweiten Netzwerks mit über 8.000 qualifizierten Dolmetschern und Übersetzern finden wir für nahezu jede Sprache den passenden Ansprechpartner. Unsere Muttersprachler sind fachlich qualifiziert und – soweit erforderlich – allgemein beeidigt bzw. ermächtigt.',
        'Ob bei der Ausländerbehörde, vor Gericht, beim Notar oder im Standesamt – wir sorgen für eine präzise, neutrale und rechtssichere Sprachmittlung, damit Ihre Kommunikation reibungslos und offiziell anerkannt erfolgt.',
      ],
    },
  ],
  features: [
    ['Amtlich beeidigt', 'Beeidigte Dolmetscher für Behörden, Gerichte, Notare und offizielle Termine.', 'gesetz.png'],
    ['Rechtssicher', 'Präzise Dolmetschleistungen für Anhörungen, Verfahren und behördliche Gespräche.', 'gericht.png'],
    ['Vielseitig einsetzbar', 'Dolmetscher für Standesamt, Ausländerbehörde, Konsulat und weitere Fachbereiche.', 'vielseitig-einsetzbar.png'],
    ['Vertraulichkeit', 'Vertrauliche Behandlung Ihrer Daten, Dokumente und persönlichen Anliegen.', 'schild.png'],
  ],
};

const STANDESAMT_DOLMETSCHER_SHEET = {
  kicker: 'Dolmetschen',
  title: 'Standesamt-Dolmetscher',
  introTitle: 'Standesamt-Dolmetscher für Ihre Hochzeit',
  intro: 'Für Ihre standesamtliche Trauung stellen wir zuverlässige Dolmetscher, damit beide Partner jedes Wort verstehen und die Eheschließung rechtswirksam erfolgen kann.',
  details: [
    'Unsere beeidigten Standesamt-Dolmetscher begleiten Sie zum Standesamt, erläutern alle Erklärungen in Ihrer Sprache und sorgen für eine reibungslose Verständigung.',
    'So können Sie sich ganz auf Ihren besonderen Tag konzentrieren – wir übernehmen die sprachliche Begleitung.',
  ],
};

const WIRTSCHAFT_FINANZEN_SHEET = {
  kicker: 'Fachübersetzungen',
  title: 'Wirtschaft & Finanzen',
  introTitle: 'Übersetzungen für Wirtschaft & Finanzen',
  intro: 'Wir unterstützen Unternehmen, Kanzleien, Banken und Versicherungen mit präzisen Fachübersetzungen im Bereich Wirtschaft und Finanzen.',
  features: [
    ['Internationaler Geschäftsverkehr', 'Wir übersetzen Wirtschafts- und Finanzdokumente für Unternehmen – professionell, präzise und termingerecht.', 'globales-geschaft.png'],
    ['Banken & Versicherungen', 'Fachübersetzungen für Banken, Versicherungen und Finanzdienstleister.', 'bank.png'],
    ['Bilanzierung & Controlling', 'Übersetzungen von Bilanzen, Reports und Controlling-Unterlagen.', 'bilanz.png'],
    ['Verträge & Compliance', 'Rechtssichere Übersetzungen von Verträgen und Richtlinien.', 'compliance-dokument.png'],
  ],
};

const BEGLAUBIGTE_UEBERSETZUNG_SHEET = {
  kicker: 'Übersetzungen',
  title: 'Beglaubigte Übersetzungen',
  introTitle: 'Beglaubigte Übersetzungen',
  intro: 'Wir fertigen beglaubigte Übersetzungen für Behörden, Gerichte, Standesämter, Hochschulen, Notare und weitere öffentliche Einrichtungen an. Unsere beglaubigten Übersetzungen werden deutschlandweit offiziell anerkannt.',
  documentsTitle: 'Typische Dokumente',
  documentsLead: 'Zu den Dokumenten, die wir täglich beglaubigt übersetzen, gehören insbesondere:',
  documents: [
    'Geburts-, Heirats- und Sterbeurkunden',
    'Ausweise und Reisepässe',
    'Zeugnisse und Diplome',
    'Führerscheine',
    'Scheidungsunterlagen',
    'Verträge und Vollmachten',
  ],
  languagesTitle: 'Häufige Sprachkombinationen',
  languagesLead: 'Zu unseren häufigsten Sprachkombinationen gehören:',
  languages: [
    'Arabisch – Deutsch',
    'Englisch – Deutsch',
    'Französisch – Deutsch',
    'Türkisch – Deutsch',
    'Russisch – Deutsch',
    'Ukrainisch – Deutsch',
    'Persisch – Deutsch',
    'Rumänisch – Deutsch',
    'Spanisch – Deutsch',
    'Portugiesisch – Deutsch',
    'Albanisch – Deutsch',
    'Serbisch – Deutsch',
    'und viele weitere Sprachen.',
  ],
  processTitle: 'So einfach läuft Ihre beglaubigte Übersetzung ab',
  process: [
    ['1.', 'Dokumente fotografieren oder einscannen', 'word-media/image5.png'],
    ['2.', 'Dokumente senden & Preis erfahren', 'word-media/image6.png'],
    ['3.', 'Adresse per E-Mail senden & Preis bestätigen', 'word-media/image7.png'],
    ['4.', 'Übersetzung per Post erhalten & Rechnung bezahlen', 'word-media/image8.png'],
  ],
  benefits: [
    ['Behördlich anerkannt', 'Beglaubigte Übersetzungen für Visa, Einbürgerung, Anerkennungsverfahren und offizielle Anträge.', 'word-media/image9.png'],
    ['Vier-Augen-Prinzip', 'Jede Übersetzung wird von einem zweiten qualifizierten Linguisten geprüft.', 'word-media/image10.png'],
    ['Terminologiemanagement', 'Einheitliche Fachterminologie für präzise und normgerechte Übersetzungen.', 'word-media/image11.png'],
    ['Versand deutschlandweit', 'Schneller Versand per Post oder Kurier – deutschlandweit und zuverlässig.', 'word-media/image12.png'],
  ],
};

const POINT_GRID_SHEETS = {
  simultandolmetscher: {
    assetBase: `${POINT_CONTENT_ASSET_BASE}simultandolmetscher/`,
    kicker: 'Dolmetschen',
    title: 'Simultandolmetscher',
    wordGrid: { columns: 5, iconSpan: 2, copySpan: 3, featureSpans: [1, 2, 1, 1] },
    rows: [
      {
        icon: 'headset.png',
        paragraphs: [
          'Unsere Simultandolmetscher sorgen dafür, dass internationale Konferenzen, Tagungen und Veranstaltungen reibungslos mehrsprachig ablaufen.',
          'Wir vermitteln qualifizierte Dolmetscher in über 190 Sprachen für Präsenztermine, Online-Meetings, Videokonferenzen und Telefondolmetschen – schnell, zuverlässig und professionell.',
        ],
        listTitle: 'Wir bieten professionelles Echtzeit-Dolmetschen unter anderem in den Sprachkombinationen:',
        items: ['Deutsch–Englisch', 'Deutsch–Französisch', 'Deutsch–Russisch', 'Deutsch–Spanisch', 'Deutsch–Italienisch', 'Deutsch–Arabisch', 'sowie in vielen weiteren europäischen und außereuropäischen Sprachen'],
      },
    ],
    features: [
      ['Simultandolmetschen', 'Echtzeit-Dolmetschen für Konferenzen, Tagungen und internationale Veranstaltungen.', 'mikrofon.png'],
      ['Viele Sprachkombinationen', 'Professionelle Simultandolmetscher für Deutsch und zahlreiche internationale Sprachen.', 'sprachen.png'],
      ['Erfahrene Teams', 'Qualifizierte Simultandolmetscher mit umfangreicher Konferenz- und Fachkompetenz.', 'benutzer.png'],
      ['Moderne Technik', 'Dolmetschkabinen, Empfängeranlagen und professionelle Konferenztechnik aus einer Hand.', 'software.png'],
    ],
    request: true,
  },
  notardolmetscher: {
    assetBase: `${POINT_CONTENT_ASSET_BASE}notardolmetscher/`,
    kicker: 'Fachübersetzungen',
    title: 'Notardolmetscher',
    wordGrid: { columns: 5, iconSpan: 2, copySpan: 3, featureSpans: [1, 2, 1, 1] },
    rows: [
      {
        icon: 'regierung.png',
        paragraphs: [
          'Bei notariellen Beurkundungen – etwa Kaufverträgen, Eheverträgen, Gesellschaftsgründungen oder Vollmachten – ist präzises Dolmetschen unverzichtbar.',
          'Unsere Notardolmetscher arbeiten regelmäßig mit Notariaten zusammen und sind mit den Abläufen vor Ort bestens vertraut.',
          'Wir stellen sicher, dass alle Beteiligten jedes Detail verstehen – unabhängig davon, ob der Termin ein- oder mehrsprachig stattfindet.',
        ],
      },
    ],
    features: [
      ['Präzision', 'Präzise Sprachmittlung für notarielle Beurkundungen und Verträge.', 'qualitat.png'],
      ['Rechtssicherheit', 'Vollständige und rechtssichere Verständigung bei notariellen Terminen.', 'schild.png'],
      ['Erfahrung', 'Regelmäßige Zusammenarbeit mit Notariaten und umfassende Praxiserfahrung.', 'erfahrung.png'],
      ['Flexibel & zuverlässig', 'Kurzfristige Termine und bundesweite Einsätze auf Anfrage möglich.', 'fokus.png'],
    ],
    request: true,
  },
  'fachuebersetzung-overview': {
    assetBase: `${POINT_CONTENT_ASSET_BASE}fachuebersetzung-overview/`,
    kicker: 'Fachübersetzungen',
    title: 'Fachübersetzung',
    wordGrid: { columns: 5, iconSpan: 2, copySpan: 3, featureSpans: [1, 2, 1, 1, 1, 2, 1, 1] },
    rows: [
      {
        icon: 'online-bildung.png',
        title: 'Was sind Fachübersetzungen?',
        paragraphs: [
          'Fachübersetzungen erfordern weit mehr als Sprachkenntnisse. Sie setzen fundiertes Fachwissen und Erfahrung im jeweiligen Fachgebiet voraus. Deshalb arbeiten wir ausschließlich mit qualifizierten Fachübersetzern.',
          'Unsere Fachübersetzer übertragen Inhalte sprachlich korrekt, fachlich präzise und zielgruppengerecht – für technische, juristische, medizinische, wissenschaftliche und wirtschaftliche Dokumente.',
        ],
      },
    ],
    sectionTitle: 'Unsere Fachübersetzungsbereiche:',
    features: [
      ['Recht', 'Verträge, Urteile, Gutachten und juristische Dokumente.', 'gericht.png'],
      ['Ingenieurwesen', 'Technische Dokumentationen, Handbücher und Spezifikationen.', 'ingenieurwesen.png'],
      ['Medizin & Zahnmedizin', 'Patientenunterlagen, Befunde, Studien und medizinische Fachtexte.', 'medizinisch.png'],
      ['Pharmazie', 'Studien, Fachinformationen und Zulassungsunterlagen.', 'rotes-kreuz.png'],
      ['Literatur', 'Bücher, Fachtexte, Artikel und kulturelle Inhalte.', 'online-bildung.png'],
      ['IT & Software', 'Software, Apps, Handbücher und technische Dokumentationen.', 'it-service.png'],
      ['Chemie & Biowissenschaften', 'Patente, Laborberichte und wissenschaftliche Texte.', 'chemie.png'],
      ['Industrie & Produktion', 'Produktionsunterlagen, Prozesse und Qualitätsdokumente.', 'industrie.png'],
    ],
    request: true,
  },
  ingenieurwesen: {
    assetBase: `${POINT_CONTENT_ASSET_BASE}ingenieurwesen/`,
    kicker: 'Fachübersetzungen',
    title: 'Ingenieurwesen',
    wordGrid: { columns: 4, iconSpan: 1, copySpan: 3, featureSpans: [2, 1, 1] },
    rows: [
      {
        icon: 'ingenieurwesen.png',
        title: 'Übersetzungsbüro für Technik und Ingenieurwesen',
        paragraphs: [
          'Als Fachübersetzungsbüro für Technik und Ingenieurwesen unterstützen wir Hersteller, Ingenieurbüros, Planungsbüros, Maschinenbauer und Industrieunternehmen mit präzisen technischen Übersetzungen.',
          'Unsere technischen Fachübersetzungen werden von qualifizierten Übersetzern mit ingenieurwissenschaftlichem Hintergrund angefertigt. Als Muttersprachler ihrer jeweiligen Zielsprache verbinden sie technisches Fachwissen mit sprachlicher Präzision und einer einheitlichen Fachterminologie. So erhalten Sie hochwertige, fachlich korrekte und verständliche Übersetzungen – alles aus einer Hand.',
        ],
      },
      {
        icon: 'unterlagen.png',
        title: 'Wir übersetzen regelmäßig folgende technische Unterlagen:',
        items: ['Bedienungsanleitungen', 'Sicherheitsdatenblätter', 'Wartungshandbücher', 'Patente', 'Konstruktionsunterlagen', 'CAD-Begleitdokumente', 'Ausschreibungen', 'Technische Spezifikationen'],
        columns: 2,
      },
      {
        icon: 'abgeschlossene-aufgabe (1).png',
        title: 'Internationale Technik- und Industrieprojekte',
        lead: 'Unsere technischen Übersetzungen unterstützen Sie bei:',
        items: ['Internationalen Ausschreibungen', 'Maschinenexporten', 'CE-Dokumentationen', 'Technischen Schulungen', 'Anlagenbauprojekten', 'Produktlokalisierung', 'Sicherheitsdokumentationen', 'Weltweitem Vertrieb'],
        columns: 2,
      },
    ],
    features: [
      ['Maschinenbau', 'Fachübersetzungen für Maschinen, Anlagen und technische Systeme.', 'maschinenbau.png'],
      ['Elektrotechnik', 'Präzise Übersetzungen für Elektrotechnik und Steuerungstechnik.', 'leistung.png'],
      ['Internationale Projekte', 'Übersetzungen für Export, Ausschreibungen und internationale Vorhaben.', 'fabrik.png'],
    ],
    request: true,
  },
  'medizin-dental': {
    assetBase: `${POINT_CONTENT_ASSET_BASE}medizin-dental/`,
    kicker: 'Fachübersetzungen',
    title: 'Medizin & Dentalmedizin',
    wordGrid: { columns: 3, iconSpan: 1, copySpan: 2, featureSpans: [2, 1] },
    rows: [
      {
        icon: 'medizinisches-symbol.png',
        title: 'Medizinische Fachübersetzungen',
        paragraphs: [
          'Als spezialisiertes Fachübersetzungsbüro für Medizin und Dentalmedizin unterstützen wir Kliniken, Praxen, medizinische Einrichtungen, Dentalfirmen, Hersteller und Fachverlage mit präzisen und fachlich geprüften Übersetzungen.',
          'Unsere Übersetzer verfügen über langjährige Erfahrung und eine akademische Ausbildung in ihrem jeweiligen Fachgebiet. Viele unserer Fachübersetzer sind Muttersprachler ihrer Zielsprache und beherrschen zusätzlich Deutsch auf muttersprachlichem Niveau. So verbinden wir fachliche Kompetenz mit sprachlicher Präzision und gewährleisten hochwertige Fachübersetzungen.',
        ],
      },
      {
        icon: 'zahne.png',
        title: 'Spezialisierte Dental- und Zahntechnik-Übersetzungen',
        lead: 'Wir verfügen über Erfahrung in folgenden Bereichen:',
        items: ['CAD/CAM-Systeme', 'Intraoralscanner', 'Dentalsoftware', '3D-Druck', 'Implantatsysteme', 'Keramiksysteme', 'Füllungsmaterialien', 'Dentallabortechnik'],
        columns: 2,
      },
      {
        icon: 'gesundheit.png',
        title: 'Gesundheitswesen & Medizintechnik',
        lead: 'Unsere Übersetzungen unterstützen:',
        items: ['Kliniken und Krankenhäuser', 'Arzt- und Zahnarztpraxen', 'Medizintechnik-Hersteller', 'Dentallabore', 'Klinische Studien', 'Medizinische Software', 'Patientenkommunikation', 'Internationale Zulassungen'],
        columns: 2,
      },
    ],
    features: [
      ['Dentalmedizin & Zahntechnik', 'Fachübersetzungen für Zahnmedizin, Zahntechnik, Dentalfirmen und CAD/CAM-Systeme.', 'dental.png'],
      ['Internationale Gesundheitskommunikation', 'Übersetzungen für Studien, Zulassungen und internationale Fachkommunikation.', 'stethoskop.png'],
    ],
    request: true,
  },
  pharmazeutik: {
    assetBase: `${POINT_CONTENT_ASSET_BASE}pharmazeutik/`,
    kicker: 'Fachübersetzungen',
    title: 'Pharmazeutik & Arzneimittel',
    wordGrid: { columns: 4, iconSpan: 2, copySpan: 2, featureSpans: [1, 2, 1] },
    rows: [
      {
        icon: 'pharmazeutik.png',
        paragraphs: [
          'Als spezialisiertes Fachübersetzungsbüro für Pharmazie unterstützen wir Pharmaunternehmen, Apotheken, Kliniken, CROs (Clinical Research Organizations), Hersteller von Medizinprodukten sowie Behörden mit fachlich präzisen Arzneimittelübersetzungen.',
          'Unsere pharmazeutischen Fachübersetzungen werden von qualifizierten Pharmazeuten aus unserem Team angefertigt, die ihre jeweilige Fremdsprache sowie Deutsch sicher beherrschen. Dadurch verbinden wir fundiertes pharmazeutisches Fachwissen mit sprachlicher Präzision und gewährleisten fachgerechte, hochwertige Übersetzungen.',
        ],
      },
      {
        icon: 'rezept (1).png',
        title: 'Pharmazeutische Dokumente',
        lead: 'Wir übersetzen unter anderem:',
        items: ['Fachinformationen (SmPC)', 'Packungsbeilagen (PIL)', 'Arzneimittelverpackungen', 'Etiketten & Faltschachteln', 'Zulassungsunterlagen', 'Einreichungsdossiers', 'Klinische Studien', 'Patienteninformationen', 'GMP-Dokumente', 'SOPs & Arbeitsanweisungen'],
        columns: 2,
      },
      {
        icon: 'durchfuhrbarkeit.png',
        title: 'Internationale Pharma- und Zulassungsprojekte',
        lead: 'Unsere Übersetzungen unterstützen:',
        items: ['Internationale Arzneimittelzulassungen', 'Klinische Studien', 'GMP-Dokumentationen', 'Medizinprodukte', 'Pharmakovigilanz', 'Arzneimittelverpackungen', 'Patienteninformationen', 'Mehrsprachige Produktdokumentationen'],
        columns: 2,
      },
    ],
    features: [
      ['Arzneimittelübersetzungen', 'Präzise Übersetzungen für Arzneimittel, Packungsbeilagen und Zulassungsunterlagen.', 'wissenschaft.png'],
      ['Klinische Forschung', 'Übersetzungen für Studien, Protokolle, Einwilligungserklärungen und Patienteninformationen.', 'klinische-studie.png'],
      ['Pharma & Biotechnologie', 'Einheitliche Fachbegriffe nach aktuellen regulatorischen Anforderungen.', 'biotechnologie (1).png'],
    ],
    request: true,
  },
  literatur: {
    assetBase: `${POINT_CONTENT_ASSET_BASE}literatur/`,
    kicker: 'Fachübersetzungen',
    title: 'Literatur & Kultur',
    wordGrid: { columns: 3, iconSpan: 1, copySpan: 2, featureSpans: [2, 1] },
    rows: [
      {
        icon: 'literarisch.png',
        title: 'Literarische Fachübersetzungen',
        paragraphs: ['Als Fachübersetzungsbüro für Literatur und Kultur unterstützen wir Verlage, Autorinnen und Autoren, Theater, Filmproduktionen, Kulturinstitutionen, Museen und Agenturen mit hochwertigen literarischen Übersetzungen.'],
      },
      {
        icon: 'dokumentieren.png',
        title: 'Literarische und kulturelle Texte',
        lead: 'Wir übersetzen unter anderem:',
        items: ['Romane', 'Erzählungen', 'Kinder- und Jugendbücher', 'Lyrik', 'Essays', 'Biografien', 'Sachbücher', 'Theaterstücke', 'Drehbücher', 'Hörspieltexte', 'Katalogtexte', 'Ausstellungstexte'],
        columns: 2,
      },
      {
        icon: 'biografie.png',
        title: 'Verlage, Autoren & Kulturinstitutionen',
        lead: 'Unsere Übersetzungen unterstützen:',
        items: ['Buchübersetzungen', 'Literaturprojekte', 'Verlagsprogramme', 'Theaterproduktionen', 'Filmproduktionen', 'Museumsausstellungen', 'Mehrsprachige Marketingkampagnen', 'Internationale Kulturprojekte'],
        columns: 2,
      },
    ],
    features: [
      ['Kultur & Medien', 'Übersetzungen für Theater, Film, Hörspiele, Magazine und Kulturprojekte.', 'klappe.png'],
      ['Lektorat & Korrektorat', 'Professionelles Lektorat und Korrektorat für sprachliche und stilistische Qualität.', 'kultur.png'],
    ],
    request: true,
  },
  'chemie-biowissenschaften': {
    assetBase: `${POINT_CONTENT_ASSET_BASE}chemie-biowissenschaften/`,
    kicker: 'Fachübersetzungen',
    title: 'Chemie & Biowissenschaften',
    wordGrid: { columns: 4, iconSpan: 1, copySpan: 3, featureSpans: [2, 1, 1] },
    rows: [
      {
        icon: 'chemie.png',
        title: 'Fachübersetzungen für Chemie & Biowissenschaften',
        paragraphs: ['Als Fachübersetzungsbüro für Chemie und Biowissenschaften unterstützen wir Chemieunternehmen, Labore, Forschungsinstitute, Hochschulen, Biotech-Unternehmen sowie Hersteller von Labor- und Analysegeräten mit präzisen wissenschaftlichen Übersetzungen.'],
      },
      {
        icon: 'labor-ausstattung.png',
        title: 'Naturwissenschaftliche Fachkompetenz',
        lead: 'Unsere Fachübersetzer verfügen über Erfahrung in:',
        items: ['Organischer Chemie', 'Anorganischer Chemie', 'Polymerchemie', 'Materialwissenschaften', 'Analytischer Chemie', 'Umweltanalytik', 'Biochemie', 'Molekularbiologie', 'Genetik', 'Biotechnologie'],
        columns: 2,
      },
    ],
    features: [
      ['Chemische Fachübersetzungen', 'Fachübersetzungen für Maschinen, Anlagen und technische Systeme.', 'flasche.png'],
      ['Biowissenschaften & Life Sciences', 'Präzise Übersetzungen für Elektrotechnik und Steuerungstechnik.', 'data-science.png'],
      ['Labor & Forschung', 'Übersetzungen für Export, Ausschreibungen und internationale Vorhaben.', 'buch.png'],
    ],
    request: true,
  },
};

const RECHT_SHEET = {
  kicker: 'Fachübersetzungen',
  title: 'Recht',
  introTitle: 'Juristische Fachübersetzungen',
  intro: [
    'Wir erstellen präzise Fachübersetzungen für Kanzleien, Notare, Gerichte, Unternehmen, Behörden und Privatpersonen.',
    'Wir übersetzen Verträge, Urteile, Beschlüsse, Vollmachten, Satzungen, Klageschriften, Urkunden und viele weitere juristische Dokumente.',
  ],
  documentsTitle: 'Typische Rechtsdokumente, die wir regelmäßig übersetzen:',
  documents: [
    'Verträge',
    'Gesellschaftsverträge',
    'Vollmachten',
    'Gerichtsurteile',
    'Beschlüsse',
    'Satzungen',
    'Klageschriften',
    'Notarielle Urkunden',
  ],
  features: [
    ['Internationale Rechtskommunikation', 'Für Kanzleien, Unternehmen, Behörden und internationale Verfahren.', 'internationale-beziehungen.png'],
    ['Rechtssichere Übersetzungen', 'Für Verträge, Gerichtsdokumente, Gutachten und Schriftsätze.', 'zertifikat.png'],
    ['Juristische Fachterminologie', 'Einheitliche Fachbegriffe und höchste Übersetzungsqualität.', 'gericht.png'],
    ['Verträge & Urkunden', 'Immobilienverträge, Vollmachten, Maklerverträge und notarielle Urkunden.', 'dokument.png'],
  ],
};

const IT_SOFTWARE_SHEET = {
  title: 'IT & Software',
  sections: [
    {
      asset: 'technology.png',
      title: 'IT- & Softwareübersetzungen',
      text: 'Als Übersetzungsbüro für IT, Software und Lokalisierung unterstützen wir Softwarehersteller, Start-ups, Agenturen, Systemhäuser und IT-Abteilungen bei der fachgerechten Übersetzung und Lokalisierung digitaler Produkte.',
    },
    {
      asset: 'mobile-development.png',
      title: 'Apps, Software & Gaming',
      items: [
        'Mobile Apps',
        'UI-Texte',
        'Push-Benachrichtigungen',
        'App-Store-Texte',
        'Spieltexte',
        'Storylines',
        'Tutorials',
        'Hilfetexte',
      ],
    },
    {
      asset: 'file.png',
      title: 'Software & Technische Dokumentation',
      lead: 'Wir übersetzen unter anderem:',
      items: [
        'API-Dokumentationen',
        'Developer Guides',
        'Technische Spezifikationen',
        'Release Notes',
        'Changelogs',
        'Benutzerhandbücher',
        'Administratorhandbücher',
        'Installationsanleitungen',
        'Konfigurationsanleitungen',
      ],
    },
    {
      asset: 'technical-support.png',
      title: 'Technische Fachkompetenz',
      lead: 'Unsere Fachübersetzer verfügen über Erfahrung in:',
      items: [
        'Softwareentwicklung',
        'Cloud-Infrastrukturen',
        'IT-Sicherheit',
        'Datenbanken',
        'DevOps',
        'Systemarchitekturen',
        'Softwarelokalisierung',
        'Compliance',
      ],
    },
  ],
  languageCard: {
    asset: 'earth-grid.png',
    title: 'Häufige Sprachkombinationen',
    items: [
      'Englisch–Deutsch',
      'Französisch–Deutsch',
      'Spanisch–Deutsch',
      'Italienisch–Deutsch',
      'Arabisch–Deutsch',
      'Türkisch–Deutsch',
      'Polnisch–Deutsch',
      'Russisch–Deutsch',
      'Niederländisch–Deutsch',
    ],
  },
  international: {
    asset: 'connection.png',
    title: 'Internationale Software- & IT-Projekte',
    lead: 'Unsere Übersetzungen unterstützen:',
    items: [
      'API-Dokumentationen',
      'IT-Sicherheitsrichtlinien',
      'Cloud-Architekturen',
      'DevOps-Runbooks',
      'DSGVO-Dokumentationen',
      'Softwarelokalisierung',
      'E-Learning-Plattformen',
      'Enterprise-Software',
    ],
  },
  workflow: [
    'Wir arbeiten mit XML-, YAML-, JSON-, PO-, XLIFF- und CSV-Dateien und integrieren uns auf Wunsch direkt in bestehende Lokalisierungs-Workflows, Git-Repositories und CI/CD-Pipelines.',
    'Unsere IT-Fachübersetzer verfügen über fundiertes technisches Verständnis in den Bereichen Softwareentwicklung, Cloud-Infrastruktur, IT-Sicherheit, Datenbanken und DevOps. Dadurch stellen wir sicher, dass Benutzeroberflächen, Fehlermeldungen, Tooltips, technische Dokumentationen und Softwareinhalte nicht nur sprachlich präzise, sondern auch fachlich korrekt, konsistent und benutzerfreundlich übersetzt werden.',
  ],
  nationwide: {
    asset: 'pin.png',
    title: 'Deutschlandweit für Sie im Einsatz',
    text: 'Als deutschlandweit tätiges IT-Übersetzungsbüro unterstützen wir Unternehmen, Start-ups, Softwarehersteller und IT-Dienstleister in Städten wie Berlin, Hamburg, München, Stuttgart, Hannover, Frankfurt, Köln und Osnabrück sowie Remote-Teams in ganz Europa.',
  },
  cta: {
    asset: 'question.png',
    question: 'Sie benötigen eine Fachübersetzung im Bereich IT oder Softwarelokalisierung?',
    text: 'Teilen Sie uns einfach mit, welche Inhalte übersetzt werden sollen, in welche Sprache die Übersetzung erfolgen soll und ob besondere Anforderungen an Terminologie, Format oder Lokalisierung bestehen. Auf dieser Grundlage erhalten Sie von uns zeitnah ein kostenloses und unverbindliches Angebot mit transparenten Konditionen und einer realistischen Lieferzeit.',
    button: 'Kostenlose Anfrage',
  },
  bottom: [
    ['SOFTWARE & LOKALISIERUNG', 'Lokalisierung von Software, Webanwendungen und IT-Produkten in zahlreiche Sprachen.', 'technology.png'],
    ['CLOUD & DEVOPS', 'Übersetzungen für Cloud-Architekturen, DevOps-Dokumentationen, Runbooks und IT-Infrastrukturen.', 'cloud-service.png'],
    ['IT-SICHERHEIT & DSGVO', 'Fachgerechte Übersetzungen für Sicherheitsrichtlinien, Datenschutzdokumente und Compliance-Anforderungen.', 'shield.png'],
    ['APPS & GAMING', 'Lokalisierung von Apps, Spielen und Benutzeroberflächen für optimale Nutzererlebnisse weltweit.', 'mobile-development.png'],
    ['TECHNISCHE DOKUMENTATION', 'Übersetzung von API-Dokumentationen, Benutzerhandbüchern, Installationsanleitungen und technischen Spezifikationen.', 'file.png'],
    ['DEUTSCHLANDWEIT TÄTIG', 'Ihr zuverlässiger Partner für IT-Übersetzungen und Softwarelokalisierung – bundesweit und international.', 'germany-map.png'],
  ],
};

function DatabaseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v6c0 1.66 3.13 3 7 3s7-1.34 7-3V5" />
      <path d="M5 11v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
    </svg>
  );
}

function ItAssetBubble({ asset, alt = '' }) {
  return (
    <span className="it-asset-bubble" aria-hidden={alt ? undefined : 'true'}>
      <img src={`${IT_ASSET_BASE}${asset}`} alt={alt} loading="lazy" />
    </span>
  );
}

function DolmetscherAsset({ asset, className = '', alt = '' }) {
  return (
    <span className={`dolm-asset ${className}`} aria-hidden={alt ? undefined : 'true'}>
      <img src={`${DOLMETSCHER_ASSET_BASE}${asset}`} alt={alt} loading="lazy" />
    </span>
  );
}

function BeeidigteAsset({ asset, className = '', alt = '' }) {
  return (
    <span className={`beeidigt-asset ${className}`} aria-hidden={alt ? undefined : 'true'}>
      <img src={`${BEEIDIGTE_ASSET_BASE}${asset}`} alt={alt} loading="lazy" />
    </span>
  );
}

function StandesamtAsset({ asset, className = '', alt = '' }) {
  return (
    <span className={`standesamt-asset ${className}`} aria-hidden={alt ? undefined : 'true'}>
      <img src={`${STANDESAMT_ASSET_BASE}${asset}`} alt={alt} loading="lazy" />
    </span>
  );
}

function WirtschaftAsset({ asset, className = '', alt = '' }) {
  return (
    <span className={`wirtschaft-asset ${className}`} aria-hidden={alt ? undefined : 'true'}>
      <img src={`${WIRTSCHAFT_ASSET_BASE}${asset}`} alt={alt} loading="lazy" />
    </span>
  );
}

function BeglaubigteAsset({ asset, className = '', alt = '' }) {
  return (
    <span className={`beglaubigte-asset ${className}`} aria-hidden={alt ? undefined : 'true'}>
      <img src={`${BEGLAUBIGTE_ASSET_BASE}${asset}`} alt={alt} loading="lazy" />
    </span>
  );
}

function PointGridAsset({ base, asset, className = '', alt = '' }) {
  return (
    <span className={`point-grid-asset ${className}`} aria-hidden={alt ? undefined : 'true'}>
      <img src={`${base}${asset}`} alt={alt} loading="lazy" />
    </span>
  );
}

const REQUEST_CARD_COPY = {
  de: { title: 'Unverbindliche Anfrage', translation: 'Übersetzungsanfrage ›', interpreting: 'Dolmetscher-Anfrage ›' },
  en: { title: 'Non-binding request', translation: 'Translation request ›', interpreting: 'Interpreter request ›' },
  ar: { title: 'طلب غير ملزم', translation: 'طلب ترجمة ›', interpreting: 'طلب مترجم فوري ›' },
  tr: { title: 'Bağlayıcı olmayan talep', translation: 'Çeviri talebi ›', interpreting: 'Tercüman talebi ›' },
  ru: { title: 'Запрос без обязательств', translation: 'Запрос перевода ›', interpreting: 'Запрос устного переводчика ›' },
  fr: { title: 'Demande sans engagement', translation: 'Demande de traduction ›', interpreting: 'Demande d’interprète ›' },
  uk: { title: 'Запит без зобов’язань', translation: 'Запит перекладу ›', interpreting: 'Запит усного перекладача ›' },
};

function RequestCard({ lang = 'de', className = '' }) {
  const copy = REQUEST_CARD_COPY[lang] || REQUEST_CARD_COPY.de;

  return (
    <div className={`dolm-request-card ${className}`.trim()} aria-label={copy.title}>
      <span className="dolm-request-info">i</span>
      <div>
        <strong>{copy.title}</strong>
        <a href={getOfferHref(lang)}>{copy.translation}</a>
        <a href={getOfferHref(lang)}>{copy.interpreting}</a>
      </div>
    </div>
  );
}

function splitSentences(text = '', max = 3) {
  return String(text)
    .split(/(?<=[.!?؟])\s+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, max);
}

function localizeFeatures(active, fallbackFeatures = [], visualCopy, lang = 'de') {
  if (lang === 'de') return fallbackFeatures;
  const examples = (active?.examples || []).map(normalizeText).filter(Boolean);
  const labels = [
    visualCopy.interpretingLanguages,
    visualCopy.trustA,
    visualCopy.trustC,
    visualCopy.highlights,
    visualCopy.typical,
    visualCopy.details,
  ].filter(Boolean);

  return fallbackFeatures.map(([title, text, asset], index) => [
    examples[index] || labels[index] || title,
    examples[index + 1] || visualCopy.ctaSub || text,
    asset,
  ]);
}

function localizePointGridSheet(active, data, visualCopy, lang = 'de') {
  if (lang === 'de') return data;

  const paragraphs = (active?.paragraphs || []).map(normalizeText).filter(Boolean);
  const examples = (active?.examples || []).map(normalizeText).filter(Boolean);
  const localizedRows = data.rows.map((row, index) => {
    const nextRow = { ...row };
    const rowText = paragraphs[index] || paragraphs[0] || row.paragraphs?.[0] || active?.text || '';
    const parts = splitSentences(rowText, row.paragraphs?.length || 2);
    nextRow.title = index === 0 ? normalizeText(active?.title || active?.label || row.title) : (row.title && (examples[index - 1] || row.title));
    nextRow.paragraphs = parts.length ? parts : row.paragraphs;
    if (row.lead) nextRow.lead = visualCopy.typical;
    if (row.listTitle) nextRow.listTitle = visualCopy.typical;
    if (row.items?.length) {
      const sourceItems = examples.length ? examples : paragraphs.slice(index + 1, index + 1 + row.items.length);
      nextRow.items = sourceItems.length ? sourceItems.slice(0, row.items.length) : row.items;
    }
    return nextRow;
  });

  return {
    ...data,
    kicker: normalizeText(active?.kicker || data.kicker),
    title: normalizeText(active?.label || active?.title || data.title),
    sectionTitle: data.sectionTitle ? visualCopy.typical : data.sectionTitle,
    rows: localizedRows,
    features: localizeFeatures(active, data.features, visualCopy, lang),
  };
}

function RechtAsset({ asset, className = '', alt = '' }) {
  return (
    <span className={`recht-asset ${className}`} aria-hidden={alt ? undefined : 'true'}>
      <img src={`${RECHT_ASSET_BASE}${asset}`} alt={alt} loading="lazy" />
    </span>
  );
}

function PointGridSheet({ active, data, lang = 'de' }) {
  const featureCount = data.features?.length || 0;
  const grid = data.wordGrid || {};
  const tableCols = grid.columns || 2;
  const iconSpan = grid.iconSpan || 1;
  const copySpan = grid.copySpan || Math.max(tableCols - iconSpan, 1);
  const featureSpans = grid.featureSpans || [];
  const bottomCols = grid.featureColumns || tableCols || Math.min(Math.max(featureCount, 2), 4);
  const template = `repeat(${tableCols}, minmax(0, 1fr))`;

  return (
    <div className="point-grid-sheet" data-service-id={active.id}>
      <span className="point-grid-kicker">{data.kicker}</span>
      <h3>{data.title}</h3>

      <section className="point-grid-table" style={{ '--point-table-cols': template }} aria-label={`${data.title} Übersicht`}>
        {data.rows.map((row, index) => (
          <Fragment key={`${data.title}-${index}`}>
            <div className="point-grid-icon-cell" style={{ gridColumn: `span ${row.iconSpan || iconSpan}` }}>
              <PointGridAsset base={data.assetBase} asset={row.icon} />
            </div>
            <div className="point-grid-copy-cell" style={{ gridColumn: `span ${row.copySpan || copySpan}` }}>
              {row.title && <h4>{row.title}</h4>}
              {(row.paragraphs || []).map((text) => <p key={text}>{text}</p>)}
              {row.listTitle && <h4>{row.listTitle}</h4>}
              {row.lead && <p>{row.lead}</p>}
              {row.items?.length ? (
                <ul className={row.columns === 2 ? 'point-grid-list point-grid-list--two' : 'point-grid-list'}>
                  {row.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ) : null}
              {data.request && index === 0 && (
                <RequestCard lang={lang} className="point-grid-request-card" />
              )}
            </div>
          </Fragment>
        ))}
      </section>

      {data.sectionTitle && <h4 className="point-grid-section-title">{data.sectionTitle}</h4>}
      {data.features?.length ? (
        <section className="point-grid-card-grid" style={{ '--point-cols': bottomCols }} aria-label={`${data.title} Details`}>
          {data.features.map(([title, text, asset], index) => (
            <article className="point-grid-card" style={{ gridColumn: `span ${featureSpans[index] || 1}` }} key={title}>
              <PointGridAsset base={data.assetBase} asset={asset} />
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
        </section>
      ) : null}
    </div>
  );
}

function getLocalizedItSoftwareSheet(active, visualCopy, lang = 'de') {
  if (lang === 'de') return IT_SOFTWARE_SHEET;
  const paragraphs = (active?.paragraphs || []).map(normalizeText).filter(Boolean);
  const groups = [
    [paragraphs[3] || 'Software development & APIs', paragraphs.slice(4, 8), 'technology.png'],
    [paragraphs[8] || 'Mobile apps', paragraphs.slice(9, 12), 'mobile-development.png'],
    [paragraphs[12] || 'Gaming & Localization', paragraphs.slice(13, 16), 'mobile-development.png'],
    [paragraphs[16] || 'Databases & Data Engineering', paragraphs.slice(17, 20), 'file.png'],
    [paragraphs[20] || 'Cloud & Infrastructure', paragraphs.slice(21, 24), 'cloud-service.png'],
    [paragraphs[24] || 'IT security & compliance', paragraphs.slice(25, 28), 'shield.png'],
    [paragraphs[28] || 'E-learning & training', paragraphs.slice(29, 32), 'file.png'],
    [paragraphs[32] || 'Technical documentation', paragraphs.slice(33, 36), 'file.png'],
  ];
  return {
    ...IT_SOFTWARE_SHEET,
    title: normalizeText(active?.label || active?.title || IT_SOFTWARE_SHEET.title),
    sections: [
      {
        ...IT_SOFTWARE_SHEET.sections[0],
        title: normalizeText(active?.title || active?.label || IT_SOFTWARE_SHEET.sections[0].title),
        text: paragraphs[0] || active?.text || IT_SOFTWARE_SHEET.sections[0].text,
      },
      {
        ...IT_SOFTWARE_SHEET.sections[1],
        title: paragraphs[2] || visualCopy.typical,
        items: groups.map(([title]) => title).slice(0, 8),
      },
      {
        ...IT_SOFTWARE_SHEET.sections[2],
        title: groups[7][0],
        lead: visualCopy.typical,
        items: groups[7][1],
      },
      {
        ...IT_SOFTWARE_SHEET.sections[3],
        title: visualCopy.highlights,
        lead: visualCopy.details,
        items: [groups[0][0], groups[4][0], groups[5][0], groups[3][0], groups[6][0], groups[7][0]],
      },
    ],
    languageCard: {
      ...IT_SOFTWARE_SHEET.languageCard,
      title: (RICH_LABELS[lang] || RICH_LABELS.de).languagePairs,
      items: (RICH_LABELS[lang] || RICH_LABELS.de).pairs,
    },
    international: {
      ...IT_SOFTWARE_SHEET.international,
      title: (RICH_LABELS[lang] || RICH_LABELS.de).internationalIt,
      lead: visualCopy.highlights,
      items: groups.map(([title]) => title).slice(0, 8),
    },
    workflow: [paragraphs[0], paragraphs[1]].filter(Boolean),
    nationwide: {
      ...IT_SOFTWARE_SHEET.nationwide,
      title: (RICH_LABELS[lang] || RICH_LABELS.de).nationwide,
      text: paragraphs[36] || visualCopy.ctaSub,
    },
    cta: {
      ...IT_SOFTWARE_SHEET.cta,
      question: paragraphs[37]?.split('\n')[0] || normalizeText(active?.cta || visualCopy.request),
      text: paragraphs[37] || visualCopy.ctaSub,
      button: normalizeText(active?.cta || visualCopy.request),
    },
    bottom: groups.slice(0, 6).map(([title, items, asset]) => [title, items.join(' '), asset]),
  };
}

function ItSoftwareSheet({ active, visualCopy, lang = 'de' }) {
  const data = getLocalizedItSoftwareSheet(active, visualCopy, lang);
  const [intro, apps, docs, competence] = data.sections;
  const renderList = (items, className = 'it-doc-list') => (
    <ul className={className}>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );

  return (
    <div className="it-word-sheet" data-service-id={active.id}>
      <h3 className="it-word-title">{data.title}</h3>

      <section className="it-word-cell it-word-icon it-word-icon--intro">
        <ItAssetBubble asset={intro.asset} />
      </section>
      <section className="it-word-cell it-word-copy it-word-copy--intro">
        <h4>{intro.title}</h4>
        <p>{intro.text}</p>
      </section>

      <section className="it-word-cell it-word-icon it-word-icon--apps">
        <ItAssetBubble asset={apps.asset} />
      </section>
      <section className="it-word-cell it-word-copy it-word-copy--apps">
        <h4>{apps.title}</h4>
        {renderList(apps.items)}
      </section>

      <section className="it-word-cell it-word-icon it-word-icon--docs">
        <ItAssetBubble asset={docs.asset} />
      </section>
      <section className="it-word-cell it-word-copy it-word-copy--docs">
        <h4>{docs.title}</h4>
        <p>{docs.lead}</p>
        {renderList(docs.items)}
      </section>

      <section className="it-word-cell it-word-icon it-word-icon--languages">
        <ItAssetBubble asset={data.languageCard.asset} />
      </section>
      <section className="it-word-cell it-word-copy it-word-copy--languages">
        <h4>{data.languageCard.title}</h4>
        {renderList(data.languageCard.items)}
      </section>

      <section className="it-word-cell it-word-icon it-word-icon--competence">
        <ItAssetBubble asset={competence.asset} />
      </section>
      <section className="it-word-cell it-word-copy it-word-copy--competence">
        <h4>{competence.title}</h4>
        <p>{competence.lead}</p>
        {renderList(competence.items, 'it-doc-list it-doc-list--two-columns')}
      </section>

      <section className="it-word-cell it-word-icon it-word-icon--international">
        <ItAssetBubble asset={data.international.asset} />
      </section>
      <section className="it-word-cell it-word-copy it-word-copy--international">
        <h4>{data.international.title}</h4>
        <p>{data.international.lead}</p>
        <div className="it-word-checks">
          {data.international.items.map((item) => (
            <span className="it-word-check-item" key={item}>
              <span className="it-word-checkmark" aria-hidden="true">✓</span>
              <span className="it-word-check-text">{item}</span>
            </span>
          ))}
        </div>
      </section>

      <section className="it-word-cell it-word-copy it-word-copy--workflow">
        {data.workflow.map((text) => <p key={text}>{text}</p>)}
      </section>

      <section className="it-word-cell it-word-icon it-word-icon--nationwide">
        <ItAssetBubble asset={data.nationwide.asset} />
      </section>
      <section className="it-word-cell it-word-copy it-word-copy--nationwide">
        <h4>{data.nationwide.title}</h4>
        <p>{data.nationwide.text}</p>
      </section>

      <section className="it-word-cell it-word-icon it-word-icon--cta">
        <ItAssetBubble asset={data.cta.asset} />
      </section>
      <section className="it-word-cell it-word-copy it-word-copy--cta">
        <h4>{data.cta.question}</h4>
        <p>{data.cta.text}</p>
        <a href={getOfferHref(lang)} className="it-doc-btn">
          {data.cta.button} <ArrowRight aria-hidden="true" />
        </a>
      </section>

      <section className="it-word-bottom-strip">
        {data.bottom.map(([title, text, asset]) => (
          <article className="it-doc-bottom-tile" key={title}>
            <img src={`${IT_ASSET_BASE}${asset}`} alt="" loading="lazy" />
            <div>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          </article>
        ))}
      </section>
    </div>
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

function RechtSheet({ active, visualCopy, lang = 'de' }) {
  const data = lang === 'de' ? RECHT_SHEET : (() => {
    const paragraphs = (active?.paragraphs || []).map(normalizeText).filter(Boolean);
    const examples = (active?.examples || []).map(normalizeText).filter(Boolean);
    return {
      ...RECHT_SHEET,
      kicker: normalizeText(active?.kicker || RECHT_SHEET.kicker),
      title: normalizeText(active?.label || active?.title || RECHT_SHEET.title),
      introTitle: normalizeText(active?.title || active?.label || RECHT_SHEET.introTitle),
      intro: [paragraphs[0], paragraphs[1]].filter(Boolean),
      documentsTitle: visualCopy.typical,
      documents: examples.length ? examples : paragraphs.slice(2, 10),
      features: localizeFeatures(active, RECHT_SHEET.features, visualCopy, lang),
    };
  })();

  return (
    <div className="recht-word-sheet" data-service-id={active.id}>
      <div className="recht-word-title">
        <span>{data.kicker}</span>
        <h3>{data.title}</h3>
      </div>

      <div className="recht-word-icon recht-word-icon--intro">
        <RechtAsset asset="gericht.png" />
      </div>
      <section className="recht-word-copy recht-word-copy--intro" aria-label="Recht Fachübersetzungen">
        <div>
          <h4>{data.introTitle}</h4>
          {data.intro.map((text) => <p key={text}>{text}</p>)}
        </div>
        <RequestCard lang={lang} className="recht-request-card" />
      </section>

      <div className="recht-word-icon recht-word-icon--documents">
        <RechtAsset asset="juristisches-papier.png" />
      </div>
      <section className="recht-word-copy recht-word-copy--documents" aria-label="Typische Rechtsdokumente">
        <h4>{data.documentsTitle}</h4>
        <ul>
          {data.documents.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="recht-word-bottom-strip" aria-label="Recht Vorteile">
        {data.features.map(([title, text, asset]) => (
          <article className="recht-word-bottom-tile" key={title}>
            <RechtAsset asset={asset} />
            <div>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function HelpIcon(active) {
  if (active?.group === 'interpreting') return Headphones;
  if (active?.group === 'translation') return FileText;
  return BadgeCheck;
}

function DolmetschenReferenceSheet({ active, visualCopy, lang }) {
  const data = lang === 'de' ? DOLMETSCHER_SHEET : (() => {
    const paragraphs = (active?.paragraphs || []).map(normalizeText).filter(Boolean);
    const overview = paragraphs[0] || active?.text || '';
    const parts = splitSentences(overview, 3);
    const examples = (active?.examples || []).map(normalizeText).filter(Boolean);
    return {
      title: normalizeText(active?.label || active?.title || DOLMETSCHER_SHEET.title),
      introRows: [
        { asset: 'mannschaft.png', text: parts[0] || overview },
        { asset: 'platzhalter.png', text: parts[1] || paragraphs[1] || visualCopy.ctaSub },
        { asset: 'save-the-world.png', text: parts[2] || paragraphs[2] || visualCopy.ctaSub },
      ],
      benefits: [
        [visualCopy.interpretingLanguages, examples[0] || visualCopy.ctaSub, 'save-the-world.png'],
        [visualCopy.trustA, examples[1] || visualCopy.ctaSub, 'benutzer.png'],
        [visualCopy.trustC, examples[2] || visualCopy.ctaSub, 'flexibel.png'],
      ],
      processTitle: visualCopy.process,
      process: [
        ['1', visualCopy.request, visualCopy.requestText, 'email.png'],
        ['2', visualCopy.review, visualCopy.reviewText, 'bestatigung.png'],
        ['3', visualCopy.delivery, visualCopy.deliveryText, 'ubersetzer.png'],
      ],
      cta: normalizeText(active?.cta || visualCopy.request),
    };
  })();
  const kicker = normalizeText(active?.kicker || SIDE_LABELS[lang]?.specialist || DOLMETSCHER_SHEET.kicker);
  return (
    <div className="dolm-doc-sheet" data-service-id={active.id}>
      <span className="dolm-doc-kicker">{kicker}</span>
      <h3>{data.title}</h3>

      <section className="dolm-doc-table" aria-label="Dolmetschen Übersicht">
        <div className="dolm-doc-icon-cell dolm-doc-icon-cell--top">
          <DolmetscherAsset asset="mannschaft.png" />
        </div>
        <div className="dolm-doc-copy-cell">
          <p>{data.introRows[0].text}</p>
        </div>

        <div className="dolm-doc-icon-cell dolm-doc-icon-cell--wide">
          <DolmetscherAsset asset="platzhalter.png" />
        </div>
        <div className="dolm-doc-copy-cell dolm-doc-copy-cell--wide">
          <p>{data.introRows[1].text}</p>
          <p>{data.introRows[2].text}</p>
          <RequestCard lang={lang} />
        </div>

      </section>

      <h4 className="dolm-doc-process-title">{data.processTitle}</h4>

      <section className="dolm-doc-card-grid" aria-label="So geht die Dolmetscher Bestellung">
        {data.process.map(([step, title, text, asset]) => (
          <article className="dolm-doc-card dolm-doc-card--process" key={step}>
            <DolmetscherAsset asset={asset} />
            <span>{step}.</span>
            <strong>{title}</strong>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="dolm-doc-card-grid dolm-doc-card-grid--benefits" aria-label="Dolmetschen Vorteile">
        {data.benefits.map(([title, text, asset]) => (
          <article className="dolm-doc-card dolm-doc-card--benefit" key={title}>
            <DolmetscherAsset asset={asset} />
            <strong>{title}</strong>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function WirtschaftFinanzenSheet({ active, visualCopy, lang = 'de' }) {
  const data = lang === 'de' ? WIRTSCHAFT_FINANZEN_SHEET : (() => {
    const paragraphs = (active?.paragraphs || []).map(normalizeText).filter(Boolean);
    return {
      ...WIRTSCHAFT_FINANZEN_SHEET,
      kicker: normalizeText(active?.kicker || WIRTSCHAFT_FINANZEN_SHEET.kicker),
      title: normalizeText(active?.label || active?.title || WIRTSCHAFT_FINANZEN_SHEET.title),
      introTitle: normalizeText(active?.title || active?.label || WIRTSCHAFT_FINANZEN_SHEET.introTitle),
      intro: paragraphs[0] || active?.text || WIRTSCHAFT_FINANZEN_SHEET.intro,
      features: localizeFeatures(active, WIRTSCHAFT_FINANZEN_SHEET.features, visualCopy, lang),
    };
  })();

  return (
    <div className="wirtschaft-doc-sheet" data-service-id={active.id}>
      <span className="wirtschaft-doc-kicker">{data.kicker}</span>
      <h3>{data.title}</h3>

      <section className="wirtschaft-doc-table" aria-label="Wirtschaft und Finanzen Übersicht">
        <div className="wirtschaft-doc-icon-cell">
          <WirtschaftAsset asset="wirtschaft.png" />
        </div>
        <div className="wirtschaft-doc-copy-cell">
          <h4>{data.introTitle}</h4>
          <p>{data.intro}</p>
          <RequestCard lang={lang} className="wirtschaft-request-card" />
        </div>
      </section>

      <section className="wirtschaft-doc-card-grid" aria-label="Wirtschaft und Finanzen Vorteile">
        {data.features.map(([title, text, asset]) => (
          <article className="wirtschaft-doc-card" key={title}>
            <WirtschaftAsset asset={asset} />
            <strong>{title}</strong>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function BeglaubigteUebersetzungSheet({ active, visualCopy, lang = 'de' }) {
  const data = lang === 'de' ? BEGLAUBIGTE_UEBERSETZUNG_SHEET : (() => {
    const paragraphs = (active?.paragraphs || []).map(normalizeText).filter(Boolean);
    const examples = (active?.examples || []).map(normalizeText).filter(Boolean);
    return {
      ...BEGLAUBIGTE_UEBERSETZUNG_SHEET,
      kicker: normalizeText(active?.kicker || BEGLAUBIGTE_UEBERSETZUNG_SHEET.kicker),
      title: normalizeText(active?.title || active?.label || BEGLAUBIGTE_UEBERSETZUNG_SHEET.title),
      introTitle: normalizeText(active?.title || active?.label || BEGLAUBIGTE_UEBERSETZUNG_SHEET.introTitle),
      intro: paragraphs[0] || active?.text || BEGLAUBIGTE_UEBERSETZUNG_SHEET.intro,
      documentsTitle: paragraphs[1] || visualCopy.typical,
      documentsLead: visualCopy.details,
      documents: paragraphs.slice(2, 9).length ? paragraphs.slice(2, 9) : examples,
      languagesTitle: paragraphs[10] || (RICH_LABELS[lang] || RICH_LABELS.de).languagePairs,
      languagesLead: visualCopy.details,
      languages: paragraphs.slice(11, 23).length ? paragraphs.slice(11, 23) : (RICH_LABELS[lang] || RICH_LABELS.de).pairs,
      processTitle: visualCopy.process,
      process: [
        ['1.', visualCopy.requestText, 'word-media/image5.png'],
        ['2.', visualCopy.reviewText, 'word-media/image6.png'],
        ['3.', visualCopy.deliveryText, 'word-media/image7.png'],
        ['4.', visualCopy.ctaSub, 'word-media/image8.png'],
      ],
      benefits: localizeFeatures(active, BEGLAUBIGTE_UEBERSETZUNG_SHEET.benefits, visualCopy, lang),
    };
  })();

  return (
    <div className="beglaubigte-doc-sheet" data-service-id={active.id}>
      <span className="beglaubigte-doc-kicker">{data.kicker}</span>
      <h3>{data.title}</h3>

      <section className="beglaubigte-doc-table" aria-label="Beglaubigte Übersetzungen Übersicht">
        <div className="beglaubigte-doc-icon-cell beglaubigte-doc-icon-cell--intro">
          <BeglaubigteAsset asset="word-media/image1.png" />
        </div>
        <div className="beglaubigte-doc-copy-cell beglaubigte-doc-copy-cell--intro">
          <h4>{data.introTitle}</h4>
          <p>{data.intro}</p>
          <RequestCard lang={lang} className="beglaubigte-request-card" />
        </div>

        <div className="beglaubigte-doc-icon-cell beglaubigte-doc-icon-cell--documents">
          <BeglaubigteAsset asset="word-media/image3.png" />
        </div>
        <div className="beglaubigte-doc-copy-cell beglaubigte-doc-copy-cell--documents">
          <h4>{data.documentsTitle}</h4>
          <p>{data.documentsLead}</p>
          <ul>
            {data.documents.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <div className="beglaubigte-doc-icon-cell beglaubigte-doc-icon-cell--languages">
          <BeglaubigteAsset asset="word-media/image4.png" />
        </div>
        <div className="beglaubigte-doc-copy-cell beglaubigte-doc-copy-cell--languages">
          <h4>{data.languagesTitle}</h4>
          <p>{data.languagesLead}</p>
          <ul>
            {data.languages.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <h4 className="beglaubigte-doc-process-title">{data.processTitle}</h4>
      <section className="beglaubigte-doc-process-grid" aria-label="Ablauf beglaubigte Übersetzung">
        {data.process.map(([step, text, asset]) => (
          <article className="beglaubigte-doc-process-card" key={step}>
            <BeglaubigteAsset asset={asset} />
            <strong>{step}</strong>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="beglaubigte-doc-card-grid" aria-label="Beglaubigte Übersetzung Vorteile">
        {data.benefits.map(([title, text, asset]) => (
          <article className="beglaubigte-doc-card" key={title}>
            <BeglaubigteAsset asset={asset} />
            <strong>{title}</strong>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function BeeidigteDolmetscherSheet({ active, visualCopy, lang = 'de' }) {
  const data = lang === 'de' ? BEEIDIGTE_DOLMETSCHER_SHEET : (() => {
    const paragraphs = (active?.paragraphs || []).map(normalizeText).filter(Boolean);
    const parts = splitSentences(paragraphs[0], 2);
    return {
      ...BEEIDIGTE_DOLMETSCHER_SHEET,
      kicker: normalizeText(active?.kicker || BEEIDIGTE_DOLMETSCHER_SHEET.kicker),
      title: normalizeText(active?.label || active?.title || BEEIDIGTE_DOLMETSCHER_SHEET.title),
      introRows: [
        { ...BEEIDIGTE_DOLMETSCHER_SHEET.introRows[0], text: parts[0] || paragraphs[0] || BEEIDIGTE_DOLMETSCHER_SHEET.introRows[0].text },
        { ...BEEIDIGTE_DOLMETSCHER_SHEET.introRows[1], paragraphs: [parts[1] || paragraphs[1] || visualCopy.ctaSub, paragraphs[1] || visualCopy.ctaSub] },
      ],
      features: localizeFeatures(active, BEEIDIGTE_DOLMETSCHER_SHEET.features, visualCopy, lang),
    };
  })();

  return (
    <div className="beeidigt-doc-sheet" data-service-id={active.id}>
      <span className="beeidigt-doc-kicker">{data.kicker}</span>
      <h3>{data.title}</h3>

      <section className="beeidigt-doc-table" aria-label="Beeidigte Dolmetscher Übersicht">
        <div className="beeidigt-doc-icon-cell beeidigt-doc-icon-cell--top">
          <BeeidigteAsset asset={data.introRows[0].asset} />
        </div>
        <div className="beeidigt-doc-copy-cell">
          <p>{data.introRows[0].text}</p>
        </div>

        <div className="beeidigt-doc-icon-cell beeidigt-doc-icon-cell--wide">
          <BeeidigteAsset asset={data.introRows[1].asset} />
        </div>
        <div className="beeidigt-doc-copy-cell beeidigt-doc-copy-cell--wide">
          {data.introRows[1].paragraphs.map((text) => <p key={text}>{text}</p>)}
          <RequestCard lang={lang} className="beeidigt-request-card" />
        </div>
      </section>

      <section className="beeidigt-doc-card-grid" aria-label="Beeidigte Dolmetscher Vorteile">
        {data.features.map(([title, text, asset]) => (
          <article className="beeidigt-doc-card" key={title}>
            <BeeidigteAsset asset={asset} />
            <strong>{title}</strong>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function StandesamtDolmetscherSheet({ active, visualCopy, lang = 'de' }) {
  const data = lang === 'de' ? STANDESAMT_DOLMETSCHER_SHEET : (() => {
    const paragraphs = (active?.paragraphs || []).map(normalizeText).filter(Boolean);
    const parts = splitSentences(paragraphs[0], 3);
    return {
      ...STANDESAMT_DOLMETSCHER_SHEET,
      kicker: normalizeText(active?.kicker || STANDESAMT_DOLMETSCHER_SHEET.kicker),
      title: normalizeText(active?.label || active?.title || STANDESAMT_DOLMETSCHER_SHEET.title),
      introTitle: normalizeText(active?.title || active?.label || STANDESAMT_DOLMETSCHER_SHEET.introTitle),
      intro: parts[0] || paragraphs[0] || STANDESAMT_DOLMETSCHER_SHEET.intro,
      details: [parts[1] || paragraphs[1] || visualCopy.ctaSub, parts[2] || paragraphs[2] || visualCopy.ctaSub],
    };
  })();

  return (
    <div className="standesamt-doc-sheet" data-service-id={active.id}>
      <span className="standesamt-doc-kicker">{data.kicker}</span>
      <h3>{data.title}</h3>

      <section className="standesamt-doc-table" aria-label="Standesamt Dolmetscher Übersicht">
        <div className="standesamt-doc-icon-cell standesamt-doc-icon-cell--top">
          <StandesamtAsset asset="eheringe.png" />
        </div>
        <div className="standesamt-doc-copy-cell">
          <h4>{data.introTitle}</h4>
          <p>{data.intro}</p>
        </div>

        <div className="standesamt-doc-icon-cell standesamt-doc-icon-cell--wide">
          <StandesamtAsset asset="regierung.png" />
        </div>
        <div className="standesamt-doc-copy-cell standesamt-doc-copy-cell--wide">
          {data.details.map((text) => <p key={text}>{text}</p>)}
          <RequestCard lang={lang} className="standesamt-request-card" />
        </div>
      </section>
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
  if (active.id === 'beeidigte-dolmetscher') {
    return <BeeidigteDolmetscherSheet active={active} visualCopy={visualCopy} lang={lang} />;
  }
  if (active.id === 'standesamt-dolmetscher') {
    return <StandesamtDolmetscherSheet active={active} visualCopy={visualCopy} lang={lang} />;
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
  const sectionRef = useRef(null);
  const [drawerAvailable, setDrawerAvailable] = useState(false);
  const active = activeId === specialtyOverview.id ? specialtyOverview : navItems.find((item) => item.id === activeId) || navItems[0];
  const activeVisual = getVisualContent(active, visualCopy);
  const activeCta = normalizeText(active?.cta || visualCopy.request);
  const activeImage = getServiceImage(active);
  const activeTheme = getServiceTheme(active);
  const ActiveThemeIcon = activeTheme.icon;
  const richService = getRichServiceData(active, visualCopy, lang);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const steps = [
    [visualCopy.request, visualCopy.requestText, Send],
    [visualCopy.review, visualCopy.reviewText, ClipboardList],
    [visualCopy.delivery, visualCopy.deliveryText, CheckCircle2],
  ];

  useEffect(() => {
    setActiveId(navItems[0]?.id);
    setSidebarOpen(false);
  }, [lang, navItems]);

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
    <section className="services" id="services" aria-labelledby="services-heading">
      <div className="container">
        <div className="specialties" id="fachuebersetzungen" ref={sectionRef}>
          <div className="section-head specialties-head">
            <h2 data-reveal="">{ui.title}</h2>
            <p data-reveal="" style={{ '--ri': 1 }}>
              {ui.sub}
            </p>
          </div>

          <button
            type="button"
            className={`specialty-drawer-toggle specialty-drawer-toggle--services${lang === 'ar' ? ' is-rtl' : ''}${drawerAvailable || sidebarOpen ? ' is-visible' : ''}`}
            onClick={() => setSidebarOpen(true)}
            aria-expanded={sidebarOpen}
            aria-controls="leistungen-point-menu"
            aria-label={side.specialist}
          >
            <span className="specialty-drawer-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>

          <div className="specialty-layout" data-reveal="" style={{ '--ri': 0 }}>
            <aside
              id="leistungen-point-menu"
              className={`specialty-sidebar${lang === 'ar' ? ' is-rtl' : ''}${sidebarOpen ? ' is-open' : ''}`}
              aria-label="Fachübersetzungen Navigation"
            >
              <button
                type="button"
                className="specialty-drawer-close"
                onClick={() => setSidebarOpen(false)}
                aria-label={side.close}
              >
                ×
              </button>
              <button
                type="button"
                className={`specialty-side-row specialty-side-row--strong${active?.id === interpretingItems[0]?.id ? ' active' : ''}`}
                onClick={() => {
                  setActiveId(interpretingItems[0]?.id);
                  setSidebarOpen(false);
                }}
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
                      onClick={() => {
                        setActiveId(item.id);
                        setSidebarOpen(false);
                      }}
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
                onClick={() => {
                  setActiveId(translationItem?.id);
                  setSidebarOpen(false);
                }}
                aria-pressed={active?.id === translationItem?.id}
              >
                {side.translation} <span aria-hidden="true">›</span>
              </button>

              <button
                type="button"
                className={`specialty-side-row specialty-side-row--active specialty-side-row--strong${active?.id === specialtyOverview.id ? ' active' : ''}`}
                onClick={() => {
                  setActiveId(specialtyOverview.id);
                  setSidebarOpen(false);
                }}
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
                    onClick={() => {
                      setActiveId(item.id);
                      setSidebarOpen(false);
                    }}
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
            <button
              type="button"
              className={`specialty-drawer-backdrop${sidebarOpen ? ' is-open' : ''}`}
              onClick={() => setSidebarOpen(false)}
              aria-label={side.close}
            />

            <article
              className={`service-visual-panel${richService ? ' service-visual-panel--rich' : ''}`}
              data-active-service={active?.id}
              aria-live="polite"
            >
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
