import {
  cert,
  getApp,
  getApps,
  initializeApp,
  type App,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { firebaseAdminConfig } from "./config";

const { projectId, clientEmail, privateKey } = firebaseAdminConfig;
const normalizedPrivateKey = privateKey?.replace(/\\n/g, "\n");

const existingApp = getApps()[0];
const adminApp: App | undefined = existingApp
  ? existingApp
  : projectId && clientEmail && normalizedPrivateKey
    ? initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: normalizedPrivateKey,
        }),
      })
    : undefined;

const adminDb = adminApp ? getFirestore(adminApp) : undefined;

export { adminApp, adminDb };
