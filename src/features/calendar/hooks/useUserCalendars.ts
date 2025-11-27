"use client";

import { useEffect, useState } from "react";
import type { Calendar } from "@/types/calendar";

export function useUserCalendars(userId: string) {
  const [calendars, setCalendars] = useState<Calendar[]>([]);

  useEffect(() => {
    // TODO: Replace with Firestore query to fetch user's calendars
    setCalendars([]);
  }, [userId]);

  return calendars;
}
