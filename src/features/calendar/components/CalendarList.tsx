"use client";

import { useUserCalendars } from "../hooks/useUserCalendars";

type CalendarListProps = {
  userId: string;
  classes: string;
};

export default function CalendarList({ userId, classes }: CalendarListProps) {
  const calendars = useUserCalendars(userId);

  return (
    <section className={classes}>
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
