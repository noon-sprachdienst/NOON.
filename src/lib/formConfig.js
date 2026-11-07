import { useEffect, useState } from 'react';
import { DEFAULT_FORM_CONFIG } from '../data/formConfig.js';
import { LOCKED_FIELDS } from '../data/formSchema.js';

// Loads the published quote-form settings from /api/cms/form (answered from the Vercel cache,
// so visitors never read the database). The built-in form renders at once and is replaced when
// the settings arrive; any failure keeps the built-in form.
const SESSION_KEY = 'noon_form_config';
const SESSION_MAX_AGE = 5 * 60 * 1000;
let loaded = null;
let pending = null;

export function isUsableConfig(config) {
  return Boolean(config && config.schema === 1 && Array.isArray(config.fields) && Array.isArray(config.languages)
    && LOCKED_FIELDS.every((id) => config.fields.some((field) => field.id === id)));
}

function readSession() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
    return saved && Date.now() - saved.at < SESSION_MAX_AGE && isUsableConfig(saved.config) ? saved.config : null;
  } catch {
    return null;
  }
}

function loadPublished() {
  if (loaded) return Promise.resolve(loaded);
  if (!pending) {
    pending = fetch('/api/cms/form', { headers: { Accept: 'application/json' } })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (isUsableConfig(data?.config)) {
          loaded = data.config;
          try { sessionStorage.setItem(SESSION_KEY, JSON.stringify({ at: Date.now(), config: loaded })); } catch { /* private mode */ }
        }
        return loaded;
      })
      .catch(() => null);
  }
  return pending;
}

export function useFormConfig() {
  const [config, setConfig] = useState(() => loaded || readSession() || DEFAULT_FORM_CONFIG);
  useEffect(() => {
    let alive = true;
    loadPublished().then((published) => { if (alive && published) setConfig(published); });
    return () => { alive = false; };
  }, []);
  return config;
}
