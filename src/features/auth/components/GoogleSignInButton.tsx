"use client";

import { signInWithGoogle } from "../services/authClient";
import { useRouter } from "next/navigation";

export default function GoogleSignInButton() {
  const router = useRouter();

  const handleClick = async () => {
    try {
      await signInWithGoogle();
      router.replace("/");
    } catch (error) {
      // TODO: handle error states (e.g., display message)
      // eslint-disable-next-line no-console
      console.error("Google sign-in failed", error);
    }
  };

  return <button onClick={handleClick}>Sign in with Google</button>;
}
