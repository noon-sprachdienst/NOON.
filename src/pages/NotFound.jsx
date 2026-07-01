import { useI18n } from '../hooks/useI18n';

const COPY = {
  de: { title: 'Seite nicht gefunden', text: 'Die angeforderte Seite existiert nicht oder wurde verschoben.', cta: 'Zur Startseite' },
  en: { title: 'Page not found', text: 'The page you requested does not exist or has been moved.', cta: 'Back to home' },
  ar: { title: 'الصفحة غير موجودة', text: 'الصفحة المطلوبة غير موجودة أو تم نقلها.', cta: 'العودة إلى الصفحة الرئيسية' },
  tr: { title: 'Sayfa bulunamadı', text: 'İstediğiniz sayfa mevcut değil veya taşınmış.', cta: 'Ana sayfaya dön' },
  ru: { title: 'Страница не найдена', text: 'Запрошенная страница не существует или была перемещена.', cta: 'На главную' },
  fr: { title: 'Page introuvable', text: 'La page demandée n’existe pas ou a été déplacée.', cta: 'Retour à l’accueil' },
  uk: { title: 'Сторінку не знайдено', text: 'Запитувана сторінка не існує або була переміщена.', cta: 'На головну' },
};

export default function NotFound() {
  const { lang } = useI18n();
  const c = COPY[lang] || COPY.de;
  const homeHref = lang === 'de' ? '/' : `/${lang}`;
  return (
    <section className="notfound-page" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 1.5rem' }}>
      <p style={{ fontSize: '4rem', fontWeight: 700, margin: 0, lineHeight: 1 }}>404</p>
      <h1 style={{ marginTop: '1rem' }}>{c.title}</h1>
      <p style={{ maxWidth: '32rem' }}>{c.text}</p>
      <a href={homeHref} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>{c.cta}</a>
    </section>
  );
}
