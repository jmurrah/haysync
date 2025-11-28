"use client";

import { signInWithGoogle } from "../services/authClient";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type GoogleSignInButtonProps = {
  onStarted?: () => void;
  onSettled?: () => void;
};

export default function GoogleSignInButton({
  onStarted,
  onSettled,
}: GoogleSignInButtonProps) {
  const router = useRouter();

  const handleClick = async () => {
    try {
      onStarted?.();
      await signInWithGoogle();
      router.replace("/");
    } catch (error) {
      // TODO: handle error states (e.g., display message)
      // eslint-disable-next-line no-console
      console.error("Google sign-in failed", error);
    } finally {
      onSettled?.();
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
