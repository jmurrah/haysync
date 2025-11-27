"use client";

import { useUserCalendars } from "../hooks/useUserCalendars";

type CalendarListProps = {
  userId: string;
};

export default function CalendarList({ userId }: CalendarListProps) {
  const calendars = useUserCalendars(userId);

  return (
    <section>
      <h2>Your calendars</h2>
      {calendars.length === 0 ? (
        <p>No calendars yet.</p>
      ) : (
        <ul>
          {calendars.map((calendar) => (
            <li key={calendar.id}>{calendar.name}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
