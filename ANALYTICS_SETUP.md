# Anonymous Analytics Setup

## Firebase

1. Create a Firebase project owned by the client.
2. Create Firestore in an EU region, preferably Frankfurt (`europe-west3`) or Berlin (`europe-west10`).
3. Create a Firebase Admin service account.
4. Add the values from `.env.example` to the Vercel project's environment variables.
5. Redeploy the Vercel project.

## Retention

Create a Firestore TTL policy for collection group `analyticsEvents` using the timestamp field `expireAt`.
Events are written with a 90-day expiry time.

## Stored Analytics Fields

The analytics API stores anonymous session identifiers, page paths, page duration, coarse country and city,
device category, browser, OS, selected site language, browser language, referrer domain, campaign name and CTA
type. It does not store raw IP addresses, names, email addresses, phone numbers, uploaded documents, message
content or exact coordinates.

## Vercel Environment Variables

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

Use `vercel dev` instead of `npm run dev` when testing the Vercel API endpoints locally.

## Local Admin Preview

Admin login uses the API password from `ADMIN_PASSWORD`. Use `vercel dev` for local admin testing so the Vercel API routes and environment variables are available.
