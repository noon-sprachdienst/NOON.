import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { I18nProvider } from './hooks/useI18n';
import App from './App.jsx';
import './styles/global.css';

const Admin = lazy(() => import('./pages/Admin.jsx'));

const isAdmin = /^\/admin\/?$/.test(window.location.pathname);

// Browser page translation (e.g. Chrome auto-translate) rewrites React's text
// nodes and crashes the admin into a blank page, so it is switched off there.
if (isAdmin) {
  document.documentElement.setAttribute('translate', 'no');
  document.documentElement.classList.add('notranslate');
}

// Shows a short message with a reload button instead of a blank page if the
// admin panel crashes.
class AdminErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error('admin panel error', error);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, fontFamily: 'system-ui, sans-serif', background: '#f3f5fa' }}>
        <div style={{ maxWidth: 420, textAlign: 'center', background: '#fff', padding: 28, borderRadius: 18, boxShadow: '0 8px 24px -12px rgba(17,26,46,.2)' }}>
          <p style={{ margin: '0 0 6px', fontWeight: 700, color: '#111a2e' }}>Das Admin-Panel konnte nicht geladen werden.</p>
          <p style={{ margin: '0 0 18px', fontSize: 14, color: '#45506a' }}>Bitte die Seite neu laden. Falls die Browser-Übersetzung aktiv ist, diese für diese Seite ausschalten.</p>
          <button type="button" onClick={() => window.location.reload()} style={{ padding: '10px 18px', borderRadius: 11, border: 0, background: '#1f2d4d', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>
            Neu laden
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isAdmin ? (
      <AdminErrorBoundary>
        <Suspense fallback={null}>
          <Admin />
        </Suspense>
      </AdminErrorBoundary>
    ) : (
      <HelmetProvider>
        <I18nProvider>
          <App />
        </I18nProvider>
      </HelmetProvider>
    )}
  </React.StrictMode>
);
