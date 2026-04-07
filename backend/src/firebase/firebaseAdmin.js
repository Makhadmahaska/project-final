import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
function readServiceAccount() {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    if (!projectId || !clientEmail || !privateKey) {
        return null;
    }
    return { projectId, clientEmail, privateKey };
}
function getFirebaseApp() {
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
export async function verifyFirebaseToken(token) {
    const app = getFirebaseApp();
    if (!app) {
        throw new Error('Firebase admin credentials are not configured on the server.');
    }
    return getAuth(app).verifyIdToken(token);
}
//# sourceMappingURL=firebaseAdmin.js.map