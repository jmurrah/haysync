"use client";

import { useCalendarEvents } from "../hooks/useCalendarEvents";

type CalendarViewProps = {
  calendarId: string;
};

export default function CalendarView({ calendarId }: CalendarViewProps) {
  const events = useCalendarEvents(calendarId);

  return (
    <section>
      <h2>Calendar events</h2>
      {events.length === 0 ? (
        <p>No events yet.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>{event.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
