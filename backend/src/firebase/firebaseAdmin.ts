import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import type { App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

export function normalizePrivateKey(privateKey: string | undefined) {
  if (!privateKey) {
    return undefined;
  }

  const trimmed = privateKey.trim();
  const unquoted =
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
      ? trimmed.slice(1, -1)
      : trimmed;

  const normalized = unquoted
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\r\n/g, '\n');

  if (normalized.includes('-----BEGIN')) {
    return normalized;
  }

  const decoded = Buffer.from(normalized, 'base64').toString('utf8');

  if (decoded.includes('-----BEGIN')) {
    return decoded
      .replace(/\\r\\n/g, '\n')
      .replace(/\\n/g, '\n')
      .replace(/\r\n/g, '\n');
  }

  return normalized;
}

function readServiceAccount() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY);

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  return { projectId, clientEmail, privateKey };
}

function getFirebaseApp(): App | null {
  const serviceAccount = readServiceAccount();

  if (!serviceAccount) {
    return null;
  }

  if (getApps().length > 0) {
    return getApp();
  }

  return initializeApp({
    credential: cert(serviceAccount),
  });
}

export async function verifyFirebaseToken(token: string) {
  const app = getFirebaseApp();

  if (!app) {
    throw new Error('Firebase admin credentials are not configured on the server.');
  }

  return getAuth(app).verifyIdToken(token);
}
