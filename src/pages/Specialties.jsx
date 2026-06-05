import { useMemo, useState } from 'react';
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
    tags: ['75+ Sprachen', 'ISO 17100', 'Express 24h', 'Vier-Augen-Prinzip'],
    nav: 'Fachgebiet auswählen',
  },
  en: {
    eyebrow: 'Specialist translations',
    title: 'Expertise that stays precise in every language.',
    sub: 'Choose your field. Our specialist translators transfer terminology, tone and content reliably into your target language.',
    quality: 'Certified quality',
    qualityText: 'Reviewed by specialists, terminologically consistent and tailored to the intended use.',
    price: 'from',
    unit: '/ word',
    tags: ['75+ languages', 'ISO 17100', 'Express 24h', 'Four-eyes principle'],
    nav: 'Select a field',
  },
  ar: {
    eyebrow: 'ترجمات متخصصة',
    title: 'خبرة تحافظ على دقتها في كل لغة.',
    sub: 'اختر مجالك. ينقل مترجمونا المتخصصون المصطلحات والنبرة والمحتوى بدقة إلى اللغة المطلوبة.',
    quality: 'جودة معتمدة',
    qualityText: 'مراجعة تخصصية، مصطلحات متسقة، وصياغة تناسب مجال الاستخدام.',
    price: 'ابتداء من',
    unit: '/ كلمة',
    tags: ['75+ لغة', 'ISO 17100', 'إكسبريس 24 ساعة', 'مراجعة مزدوجة'],
    nav: 'اختر المجال',
  },
  tr: {
    eyebrow: 'Uzman çeviriler',
    title: 'Her dilde hassasiyetini koruyan uzmanlık.',
    sub: 'Alanınızı seçin. Uzman çevirmenlerimiz terminolojiyi, tonu ve içeriği hedef dile güvenilir biçimde aktarır.',
    quality: 'Sertifikalı kalite',
    qualityText: 'Uzman kontrolü, tutarlı terminoloji ve kullanım alanına uygun çeviri.',
    price: 'den itibaren',
    unit: '/ kelime',
    tags: ['75+ dil', 'ISO 17100', 'Ekspres 24s', 'Çift kontrol'],
    nav: 'Alan seçin',
  },
  ru: {
    eyebrow: 'Профильные переводы',
    title: 'Экспертность, сохраняющая точность на любом языке.',
    sub: 'Выберите отрасль. Наши профильные переводчики точно передают терминологию, тон и содержание.',
    quality: 'Сертифицированное качество',
    qualityText: 'Проверка специалистами, единая терминология и адаптация к назначению текста.',
    price: 'от',
    unit: '/ слово',
    tags: ['75+ языков', 'ISO 17100', 'Экспресс 24ч', 'Двойная проверка'],
    nav: 'Выберите отрасль',
  },
  fr: {
    eyebrow: 'Traductions spécialisées',
    title: 'Une expertise précise dans chaque langue.',
    sub: 'Choisissez votre domaine. Nos traducteurs spécialisés transmettent terminologie, ton et contenu avec fiabilité.',
    quality: 'Qualité certifiée',
    qualityText: 'Contrôle spécialisé, terminologie cohérente et traduction adaptée à son usage.',
    price: 'à partir de',
    unit: '/ mot',
    tags: ['75+ langues', 'ISO 17100', 'Express 24h', 'Double contrôle'],
    nav: 'Choisir un domaine',
  },
  uk: {
    eyebrow: 'Фахові переклади',
    title: 'Експертність, що зберігає точність кожною мовою.',
    sub: 'Оберіть галузь. Наші фахові перекладачі точно передають термінологію, тон і зміст.',
    quality: 'Сертифікована якість',
    qualityText: 'Фахова перевірка, узгоджена термінологія й адаптація до призначення тексту.',
    price: 'від',
    unit: '/ слово',
    tags: ['75+ мов', 'ISO 17100', 'Експрес 24г', 'Подвійна перевірка'],
    nav: 'Оберіть галузь',
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

export default function Specialties() {
  const { lang } = useI18n();
  const copy = PAGE_COPY[lang] || PAGE_COPY.de;
  const specialties = useMemo(() => getSpecialties(lang), [lang]);
  const [activeId, setActiveId] = useState('medizin-dental');
  const active = specialties.find((item) => item.id === activeId) || specialties[0];
  const paragraphs = active.paragraphs || [active.text];
  const summaryParagraphs = paragraphs.slice(0, 2);
  const summaryExamples = (active.examples || []).slice(0, 3);

  return (
    <section className="specialty-page" id="fachuebersetzungen" aria-labelledby="specialty-page-heading">
      <div className="container specialty-page-intro">
        <span className="specialty-page-eyebrow">{copy.eyebrow}</span>
        <h1 id="specialty-page-heading">{copy.title}</h1>
        <p>{copy.sub}</p>
      </div>

      <div className="container specialty-page-shell">
        <article className="specialty-page-content">
          <span className="specialty-page-kicker">{copy.eyebrow}</span>
          <h2>{active.title}</h2>

          <div className="specialty-page-copy">
            {summaryParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <ul className="specialty-page-examples">
            {summaryExamples.map((example) => <li key={example}>{example}</li>)}
          </ul>

          <div className="specialty-page-quality">
            <div className="specialty-page-quality-icon" aria-hidden="true">i</div>
            <div>
              <h3>{copy.quality}</h3>
              <p>{copy.qualityText}</p>
            </div>
          </div>

          <div className="specialty-page-actions">
            <div className="specialty-page-tags">
              {copy.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="specialty-page-quote">
              <div className="specialty-page-price">
                <span>{copy.price}</span>
                <strong>0,16€</strong>
                <small>{copy.unit}</small>
              </div>
              <a href="/angebot" className="btn btn-primary">
                {active.cta} <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </article>

        <aside className="specialty-page-rail" aria-label={copy.nav}>
          <span className="specialty-page-rail-label">{copy.nav}</span>
          {specialties.map((item) => {
            const Icon = ICONS[item.id] || BriefcaseIcon;
            return (
              <button
                type="button"
                key={item.id}
                className={item.id === active.id ? 'active' : ''}
                onClick={() => setActiveId(item.id)}
                aria-pressed={item.id === active.id}
              >
                <Icon />
                <span>{item.label}</span>
                <ArrowIcon />
              </button>
            );
          })}
        </aside>
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
