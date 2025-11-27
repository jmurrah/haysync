import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase-client";

export async function signInWithGoogle() {
  // TODO: Handle auth state and errors as needed
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
}
