"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CalendarList from "@/features/calendar/components/CalendarList";
import CalendarView from "@/features/calendar/components/CalendarView";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

export default function DashboardPage() {
  const { user, loading } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/sign-in");
    }
  }, [loading, router, user]);

  const userId = user?.uid ?? "";
  const calendarId = "placeholder-calendar";

  if (!user && loading) {
    return (
      <main>
        <p>Checking authentication...</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main>
      {/* <h1>haysync dashboard</h1> */}
      <CalendarList userId={userId} />
      <CalendarView calendarId={calendarId} />
    </main>
  );
}
