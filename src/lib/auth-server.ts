import { getAuth, type DecodedIdToken } from "firebase-admin/auth";
import { adminApp } from "./firebase-admin";

const adminAuth = adminApp ? getAuth(adminApp) : undefined;

export async function verifyIdToken(token: string): Promise<DecodedIdToken | null> {
  if (!adminAuth) {
    // TODO: Ensure Firebase Admin SDK is configured before verifying tokens
    return null;
  }

  try {
    return await adminAuth.verifyIdToken(token);
  } catch (error) {
    // TODO: Log or handle verification errors
    return null;
  }
}
