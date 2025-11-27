import GoogleSignInButton from "@/features/auth/components/GoogleSignInButton";

export default function SignInPage() {
  return (
    <main>
      <h1>Sign in to Haysync</h1>
      <p>Access your calendars by signing in.</p>
      <GoogleSignInButton />
    </main>
  );
}
