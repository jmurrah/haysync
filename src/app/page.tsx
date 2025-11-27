import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>Haysync - simple shared calendars</h1>
      <p>This is a placeholder landing page.</p>
      <Link href="/dashboard">Go to dashboard</Link>
    </main>
  );
}
