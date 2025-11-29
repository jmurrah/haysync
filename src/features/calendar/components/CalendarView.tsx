"use client";

import { useCalendarEvents } from "../hooks/useCalendarEvents";

type CalendarViewProps = {
  calendarId: string;
  classes: string;
};

export default function CalendarView({
  calendarId,
  classes,
}: CalendarViewProps) {
  const events = useCalendarEvents(calendarId);

  return (
    <section className={classes}>
      <h2 className="text-xl">Calendar</h2>
      {/* <Calendar></Calendar> */}
    </section>
  );
}
