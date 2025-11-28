"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import GoogleSignInButton from "@/features/auth/components/GoogleSignInButton";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

export default function SignInPage() {
  const router = useRouter();
  const { user, loading } = useCurrentUser();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [loading, router, user]);

  return (
    <main>
      <h1>Sign in to haysync</h1>
      <p>Access your calendars by signing in.</p>
      <GoogleSignInButton />
    </main>
  );
}
