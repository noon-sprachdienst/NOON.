# Noon Dolmetscher & Übersetzungsbüro – Website

Production website for Noon Dolmetscher & Übersetzungsbüro
(https://www.noon-sprachdienst.de), a translation and interpreting office with
its head office in Osnabrück and offices in Stuttgart, Berlin, Bielefeld, Mainz
and Kiel.

The project includes a responsive React frontend, multilingual content, local
branch maps, a consent-aware analytics dashboard, and a quote form that sends
requests to `info@noon-sprachdienst.de`.

## Features

- Seven interface languages: German, English, Arabic, Turkish, Russian, French,
  and Ukrainian
- Responsive layouts for desktop, tablet, and mobile screens
- Interactive globe hero and consent-aware branch maps
- Translation, interpreting, pricing, specialty, FAQ, and location content
- WhatsApp, email, and phone contact actions
- Phone chooser for both mobile numbers
- Quote form with optional PDF, Word, or image attachments (phone photos are
  shrunk in the browser before upload)
- About 200 prerendered SEO landing pages: offices, service-area cities,
  documents, languages, interpreting and specialist translations
- Consent-aware anonymous analytics with a protected admin dashboard

## Technology

- React 18 and Vite
- Vercel Functions for server-side endpoints
- Nodemailer with Google Workspace SMTP for contact-form delivery
- Firebase Admin SDK and Cloud Firestore for consent-aware analytics
- Leaflet for interactive maps
- Three.js and `three-globe` for the hero globe

## Local Setup

Requirements:

- Node.js 20 or newer
- npm

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The site is available at:

```text
http://localhost:5173
```

Create a local `.env` file from `.env.example` only when testing server-side
functions locally. Never commit `.env` files or real credentials.

## Production Build

```bash
npm run build
npm run preview
```

The generated production files are written to `dist/`.

## Deployment On Vercel

Production deploys automatically when `main` is pushed to
`github.com/noon-sprachdienst/NOON.`; other branches get password-protected
preview deployments. To check a deployment, look at the status icon next to the
commit on GitHub (yellow = building, green = live, red = failed) or open
Vercel -> Project -> Deployments.

First-time setup:

1. Import this GitHub repository into Vercel.
2. Keep the default Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`
3. Add the environment variables listed below.
4. Deploy the project.
5. After changing environment variables, trigger a new deployment.

## Contact Details

Public contact details are centralized in:

```text
src/config/contact.js
```

Current values:

```text
Email:     info@noon-sprachdienst.de
WhatsApp:  +49 160 956 27 666
Phone:     +49 160 956 27 666
Kiel:      +49 15567 478943 (own phone and WhatsApp on the Kiel pages)
```

Office addresses, coordinates and per-office phone numbers live in
`LOCATIONS` (`src/data/seoPages.js`) and `BRANCHES`
(`src/components/Branches.jsx`); the static map images are in
`public/assets/maps/`. Update the shared configuration instead of hardcoding
contact details in individual components.

## Contact Form Email Setup

The quote form posts to:

```text
/api/contact/send
```

Requests are sent to the NOON. mailbox as email messages. Optional attachments
are delivered as email attachments and are not stored in Firebase.

Supported attachment types:

```text
PDF, DOC, DOCX, JPG, JPEG, PNG, WEBP, HEIC
```

Maximum attachments:

```text
6 files, 3 MB combined
```

Vercel rejects request bodies over 4.5 MB and base64 adds about a third, so the
limit is 3 MB. JPEG, PNG, WEBP and HEIC photos larger than 600 KB are scaled to
at most 2400 px and re-encoded as JPEG in the browser before upload; files that
are still too large show their size and offer WhatsApp, Google Drive or e-mail.

Add these variables in:

```text
Vercel -> Project -> Settings -> Environment Variables
```

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@noon-sprachdienst.de
SMTP_PASSWORD=replace-with-google-app-password
CONTACT_EMAIL=info@noon-sprachdienst.de
# Optional: routes "Übersetzung" (translation) quote requests to a
# different inbox than "Dolmetschen" (interpreting) / appointment / job
# requests, which keep going to CONTACT_EMAIL. Defaults to
# uebersetzung@noon-sprachdienst.de if unset.
CONTACT_EMAIL_TRANSLATION=uebersetzung@noon-sprachdienst.de
```

### Google Workspace App Password

Do not use the normal Google account password. Google Workspace no longer
supports basic authentication with only a username and the account password.

Use a dedicated App Password:

1. Sign in as `info@noon-sprachdienst.de`.
2. Open the Google Account security settings.
3. Enable 2-Step Verification.
4. Open Google App Passwords.
5. Create a password named `NOON Website`.
6. Add the generated 16-character password to Vercel as `SMTP_PASSWORD`.

Useful links:

- [Google Account security](https://myaccount.google.com/security)
- [Google App Passwords](https://myaccount.google.com/apppasswords)
- [Google Workspace guidance for less secure apps](https://support.google.com/a/answer/6260879)

If the Workspace administrator disables App Passwords, use Google OAuth or a
configured Workspace SMTP relay instead of the normal account password.

## Firebase Analytics Setup

The analytics dashboard uses Firebase Admin SDK and Cloud Firestore. Add these
variables in Vercel:

```env
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
```

Notes:

- Use a strong unique `ADMIN_PASSWORD`.
- Generate a separate random `ADMIN_SESSION_SECRET`.
- Keep the Firebase private key only in Vercel environment variables.
- Never commit service-account JSON files or paste private keys into issues,
  pull requests, documentation, or chat messages.
- Rotate a private key immediately if it is accidentally exposed.

The protected dashboard is available at:

```text
/admin
```

Page views are counted per day in `analyticsDaily/YYYY-MM-DD` documents, so the
dashboard has no event limit. After the first deployment of the daily counters,
use the one-time "Rebuild" button in the admin settings.

## Privacy Behavior

- Analytics starts only after the visitor accepts optional cookies.
- Analytics uses a pseudonymous session identifier.
- Raw IP addresses, uploaded documents, messages, and contact details are not
  stored in analytics.
- Analytics events are configured with a 90-day retention timestamp.
- Interactive maps load only after the relevant consent choice.
- Contact-form files are validated and sent as email attachments without
  permanent website storage.

Review the privacy policy whenever analytics providers, retention periods, mail
delivery, or document handling change.

## Server Endpoints

```text
POST /api/contact/send       Send a quote request by email
POST /api/analytics/event    Record a consent-aware analytics event
POST /api/admin/login        Start an admin session
POST /api/admin/logout       End an admin session
POST /api/admin/analytics-rebuild  Rebuild the daily counters once
GET  /api/admin/status       Check analytics configuration
GET  /api/admin/analytics    Read protected dashboard data
```

## SEO Pages

`npm run build` runs `vite build` and then `scripts/prerender-seo.mjs`, which
writes a static HTML file for every SEO page (title, description, canonical,
hreflang, JSON-LD and readable content for search engines) plus
`sitemap.xml` and `404.html`.

```text
src/data/seoPages.js       All SEO pages (services, offices, cities, documents),
                           office copy in locationDetails, schema data
src/data/pageUpgrades.js   Hand-written German copy: PAGE_UPGRADES by path,
                           new pages in NEW_PAGES_DE, sitemap dates in
                           CONTENT_UPDATED
src/data/contentLinks.js   Shared link blocks and facts (delivery times, prices,
                           languages) used by the German pages
src/data/languagePages.js  /de/sprachen/ hub and the language pages
src/data/pageTitles.js     Search titles: keyword first, "| Noon Übersetzungsbüro",
                           or "| Noon" when the title would exceed 65 characters
src/data/simplePages.js    Meta for /angebot, /termin, /bewerbung, /leistungen,
                           /fachuebersetzungen
scripts/staticMain.mjs     Static text for the German home and simple pages
vercel.json                Redirects for old Squarespace URLs (308)
```

Rules for page content:

- Only use facts confirmed by the office (ermächtigte Übersetzer and beeidigte
  Dolmetscher for all languages, 2–3 working days, express the same day within
  about 4–5 hours, prices from the price page).
- Service-area cities have no office: no address and no opening hours.
- Internal links always end with `/`, the canonical form of every URL.
- Keep descriptions at 155 characters or less.

To add a German landing page, add it to `NEW_PAGES_DE` (or improve an existing
one through `PAGE_UPGRADES`), run `npm run build`, and check
`dist/<path>/index.html` and `dist/sitemap.xml`.

## Project Structure

```text
api/                         Vercel serverless functions
public/                      Static assets and globe data
src/components/              Website sections and UI components
src/config/contact.js        Shared public contact details
src/data/                    Translations, service content and SEO pages
scripts/                     Prerender and audit scripts
src/hooks/                   Shared frontend hooks
src/lib/                     Analytics client
src/pages/                   Specialty and admin pages
src/styles/global.css        Main stylesheet
```

## Troubleshooting

### The contact form reports a delivery error

Check that all `SMTP_*` variables exist in Vercel, the App Password is current,
and the project was redeployed after adding the variables.

### App Passwords are not visible

Confirm that 2-Step Verification is active. If the option is still unavailable,
ask the Google Workspace administrator whether App Passwords are disabled. Use
OAuth or SMTP relay when required by the organization policy.

### Analytics does not show production data

Check the Firebase environment variables, Firestore setup, cookie consent, and
the `/api/admin/status` endpoint.

## Security Checklist

- Never commit `.env` files.
- Never use the mailbox's normal Google password for SMTP.
- Never expose Firebase service-account keys.
- Rotate compromised credentials immediately.
- Store production secrets only in Vercel environment variables.
- Redeploy after changing secrets.
