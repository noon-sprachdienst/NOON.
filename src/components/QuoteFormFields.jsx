import { fieldRows, languageList, OTHER_LANGUAGE, textIn } from '../data/formSchema.js';

// Renders the quote-form fields from the CMS settings. Used by the site form (HowContact)
// and by the live preview in the admin, so both always look the same.
const HTML_IDS = {
  firstName: 'form-first', lastName: 'form-last', email: 'form-email', phone: 'form-phone', sourceLanguage: 'form-from',
  targetLanguage: 'form-to', files: 'form-file', driveLink: 'form-drive', message: 'form-doc',
};
const AUTOCOMPLETE = { firstName: 'given-name', lastName: 'family-name', email: 'email', phone: 'tel', driveLink: 'off' };
export const FILE_ACCEPT = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.heic,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png,image/webp,image/heic';

function ServiceIcon({ id }) {
  return id === 'translation' ? (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M9 7h6M9 11h6M9 15h4" />
    </svg>
  ) : (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <path d="M12 19v4M8 23h8" />
    </svg>
  );
}

export default function QuoteFormFields({
  config, lang, service, onService, sourceLang, onSourceLang, targetLang, onTargetLang, onFilesChange, idPrefix = '',
}) {
  const htmlId = (field) => `${idPrefix}${HTML_IDS[field.id] || `form-${field.id}`}`;
  const languageName = (id) => {
    if (id === OTHER_LANGUAGE) return textIn(config.texts.otherName, lang) || 'Andere Sprache …';
    return textIn(config.languages.find((language) => language.id === id)?.name, lang) || id;
  };

  const renderField = (field) => {
    const id = htmlId(field);
    const label = textIn(field.label, lang);
    const placeholder = textIn(field.placeholder, lang) || undefined;
    const help = textIn(field.help, lang);
    const helpNode = help ? <p className="form-hint">{help}</p> : null;

    if (field.type === 'service') {
      return (
        <div key={field.id} className="service-toggle" role="group" aria-label={label}>
          {field.options.map((option) => (
            <button key={option.id} type="button" className={`service-choice${service === option.id ? ' active' : ''}`} onClick={() => onService(option.id)} aria-pressed={service === option.id}>
              <ServiceIcon id={option.id} />
              {textIn(option.label, lang)}
            </button>
          ))}
        </div>
      );
    }

    if (field.type === 'checkbox') {
      return (
        <div key={field.id} className="form-field form-check">
          <label htmlFor={id}>
            <input id={id} name={field.id} type="checkbox" value="yes" required={field.required} />
            <span>{label}</span>
          </label>
          {helpNode}
        </div>
      );
    }

    let control;
    if (field.type === 'language') {
      const isSource = field.id === 'sourceLanguage';
      const value = isSource ? sourceLang : targetLang;
      const list = languageList(config, isSource ? 'source' : 'target');
      control = (
        <>
          <select id={id} name={field.id} value={list.includes(value) ? value : list[0]} onChange={(e) => (isSource ? onSourceLang : onTargetLang)(e.target.value)}>
            {list.map((languageId) => <option key={languageId} value={languageId}>{languageName(languageId)}</option>)}
          </select>
          {value === OTHER_LANGUAGE && (
            <input className="form-other-lang" name={`${field.id}Other`} type="text" required maxLength={60} autoComplete="off"
              aria-label={`${label}: ${textIn(config.texts.otherLabel, lang)}`} placeholder={textIn(config.texts.otherPlaceholder, lang) || undefined} />
          )}
        </>
      );
    } else if (field.type === 'file') {
      control = <input id={id} name="files" type="file" accept={FILE_ACCEPT} multiple onChange={onFilesChange} />;
    } else if (field.type === 'textarea') {
      control = <textarea id={id} name={field.id} placeholder={placeholder} required={field.required} maxLength={3000} />;
    } else if (field.type === 'select') {
      control = (
        <select id={id} name={field.id} required={field.required} defaultValue="">
          <option value="">{placeholder || '—'}</option>
          {field.options.map((option) => <option key={option.id} value={option.id}>{textIn(option.label, lang)}</option>)}
        </select>
      );
    } else {
      control = (
        <input id={id} name={field.id} type={field.type} placeholder={placeholder} required={field.required}
          autoComplete={AUTOCOMPLETE[field.id] || (field.builtin ? undefined : 'off')} inputMode={field.type === 'url' ? 'url' : undefined}
          maxLength={field.type === 'textarea' ? 3000 : 500} />
      );
    }

    return (
      <div key={field.id} className="form-field">
        <label htmlFor={id}>{label}{field.required && !field.builtin ? ' *' : ''}</label>
        {control}
        {helpNode}
      </div>
    );
  };

  return fieldRows(config, service).map((row) => {
    if (row.length === 1 && row[0].width !== 'half') return renderField(row[0]);
    return <div key={row.map((field) => field.id).join('+')} className="form-row">{row.map(renderField)}</div>;
  });
}
