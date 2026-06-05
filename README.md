# NOON. Sprachdienst Website 

Production website for NOON. Sprachdienst, a multilingual translation and
interpreting service with locations across Germany.

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
- Quote form with optional PDF, Word, or image attachments
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
Mobile 1:  +49 160 956 27 666
Hours:     Monday-Saturday, 10:00-19:00
```

Update the shared configuration instead of hardcoding contact details in
individual components.

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
GET  /api/admin/status       Check analytics configuration
GET  /api/admin/analytics    Read protected dashboard data
```

## Project Structure

```text
api/                         Vercel serverless functions
public/                      Static assets and globe data
src/components/              Website sections and UI components
src/config/contact.js        Shared public contact details
src/data/                    Translations and service content
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

## Security Checklist ;)

- Never commit `.env` files.
- Never use the mailbox's normal Google password for SMTP.
- Never expose Firebase service-account keys.
- Rotate compromised credentials immediately.
- Store production secrets only in Vercel environment variables.
- Redeploy after changing secrets.
