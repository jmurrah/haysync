import { getApp, getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseClientConfig } from "./config";

const appConfig = firebaseClientConfig as FirebaseOptions;
const firebaseApp = getApps().length ? getApp() : initializeApp(appConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { firebaseApp, auth, db };
