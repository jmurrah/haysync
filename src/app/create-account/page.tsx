"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { createAccountWithEmail } from "@/features/auth/services/authClient";
import GoogleSignInButton from "@/features/auth/components/GoogleSignInButton";
import AuthCard from "@/features/auth/components/AuthCard";
import AuthField from "@/features/auth/components/AuthField";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import MessageDivider from "@/components/MessageDivider";

export default function CreateAccountPage() {
  const router = useRouter();
  const { user, loading } = useCurrentUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [loading, router, user]);

  const handleCreateAccount = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      if (password !== confirmPassword) {
        // TODO: surface mismatch to the user
        return;
      }
      await createAccountWithEmail(email, password);
      router.replace("/");
    } catch (error) {
      // TODO: add user-facing error feedback
      console.error("Account creation failed", error);
    }
  };

  return (
    <main className="h-full w-full flex justify-center items-center">
      <AuthCard
        heading={<h1 className="text-4xl">Welcome to haysync</h1>}
        footer={
          <p>
            Already have an account?{" "}
            <Link href="/sign-in">
              <span className="underline-fill">Sign in</span>
            </Link>
          </p>
        }
      >
        <form
          onSubmit={handleCreateAccount}
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
            autoComplete="new-password"
          />
          <AuthField
            id="confirm-password"
            label="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            autoComplete="new-password"
          />
          <Button type="submit" className="h-12 text-base">
            Create account
          </Button>
        </form>
        <MessageDivider message="or" />
        <GoogleSignInButton />
      </AuthCard>
    </main>
  );
}
