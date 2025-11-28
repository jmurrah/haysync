"use client";

import { useRouter } from "next/navigation";
import { signOutUser } from "../services/authClient";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      router.replace("/sign-in");
    } catch (error) {
      // TODO: add user-facing error handling
      console.error("Sign-out failed", error);
    }
  };

  return (
    <button type="button" onClick={handleSignOut}>
      Sign out
    </button>
  );
}
