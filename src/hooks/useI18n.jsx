import { createContext, useContext, useState, useEffect } from 'react';
import { translations, LANG_META } from '../data/translations';

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('noon-lang');
      if (saved && translations[saved]) return saved;
    } catch (e) { /* noop */ }
    return 'de';
  });

  const setLang = (next) => {
    if (!translations[next]) return;
    setLangState(next);
    try { localStorage.setItem('noon-lang', next); } catch (e) { /* noop */ }
  };

  useEffect(() => {
    const meta = LANG_META[lang];
    document.documentElement.lang = meta.html;
    document.documentElement.dir = meta.dir;
  }, [lang]);

  const t = (key) => translations[lang]?.[key] ?? translations.de?.[key] ?? key;
  const isRTL = lang === 'ar';
  const meta = LANG_META[lang];

  return (
    <I18nContext.Provider value={{ lang, setLang, t, isRTL, meta, LANG_META }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
};
