export const firebaseClientConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? \"\",\n  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? \"\",\n  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? \"\",\n  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? \"\",\n  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? \"\",\n  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? \"\"\n };
};

export const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY
};
