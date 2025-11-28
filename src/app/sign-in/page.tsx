"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GoogleSignInButton from "@/features/auth/components/GoogleSignInButton";
import AuthCard from "@/features/auth/components/AuthCard";
import AuthField from "@/features/auth/components/AuthField";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import Logo from "@/components/Logo";
import { signInWithEmail } from "@/features/auth/services/authClient";
import { Button } from "@/components/ui/button";
import MessageDivider from "@/components/MessageDivider";

export default function SignInPage() {
  const router = useRouter();
  const { user, loading } = useCurrentUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [loading, router, user]);

  const handleEmailSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      await signInWithEmail(email, password);
      router.replace("/");
    } catch (error) {
      // TODO: add user-facing error feedback
      console.error("Email sign-in failed", error);
      setSubmitting(false);
    }
  };

  if (loading || user || submitting) {
    return (
      <main className="h-screen w-full flex items-center justify-center">
        <p>Signing you in...</p>
      </main>
    );
  }

  return (
    <main className="h-full w-full flex justify-center items-center">
      <AuthCard
        heading={
          <h1 className="text-4xl">
            Sign in to hay<span className="italic">sync</span>
          </h1>
        }
        footer={
          <p>
            Don't have an account?{" "}
            <Link href="/create-account">
              <span className="underline-fill">Create an account</span>
            </Link>
          </p>
        }
      >
        <form
          onSubmit={handleEmailSignIn}
          className="flex flex-col gap-4 w-full"
        >
          <AuthField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
          />
          <AuthField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
          />
          <Button type="submit" className="h-12 text-base">
            Sign in
          </Button>
        </form>
        <MessageDivider message="or" />
        <GoogleSignInButton
          onStarted={() => setSubmitting(true)}
          onSettled={() => setSubmitting(false)}
        />
      </AuthCard>
    </main>
  );
}
