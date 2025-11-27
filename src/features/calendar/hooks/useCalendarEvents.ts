"use client";

import { useEffect, useState } from "react";
import type { CalendarEvent } from "@/types/calendar";

export function useCalendarEvents(calendarId: string) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    // TODO: Replace with Firestore onSnapshot subscription for calendar events
    setEvents([]);
  }, [calendarId]);

  return events;
}
