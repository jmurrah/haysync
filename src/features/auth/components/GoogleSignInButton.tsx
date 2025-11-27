"use client";

import { signInWithGoogle } from "../services/authClient";

export default function GoogleSignInButton() {
  const handleClick = async () => {
    await signInWithGoogle();
  };

  return <button onClick={handleClick}>Sign in with Google</button>;
}
