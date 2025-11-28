"use client";

import { signInWithGoogle } from "../services/authClient";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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

  return (
    <Button
      onClick={handleClick}
      className="flex w-full gap-2 justify-center items-center h-12"
    >
      <img src="/logos/google-icon.svg" />
      <span className="text-base">Continue with Google</span>
    </Button>
  );
}
