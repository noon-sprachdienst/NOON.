import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let database;

function getCredentials() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) return null;
  return { projectId, clientEmail, privateKey };
}

export function getDatabase() {
  if (database) return database;

  const credentials = getCredentials();
  if (!credentials) {
    throw new Error('Firebase analytics is not configured.');
  }

  if (!getApps().length) {
    initializeApp({ credential: cert(credentials) });
  }

  database = getFirestore();
  return database;
}

