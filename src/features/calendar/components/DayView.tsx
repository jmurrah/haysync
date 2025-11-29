"use client";

import { CalendarEvent } from "../types";
import { formatDay } from "../utils/dateUtils";

type DayViewProps = {
  date: Date;
  events: CalendarEvent[];
};

export function DayView({ date, events }: DayViewProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-md border border-[var(--card-border)] bg-[var(--bg-light)] px-3 py-2">
        <p className="text-sm font-medium">{formatDay(date)}</p>
        <p className="text-xs text-muted-foreground">Schedule</p>
      </div>
      <div className="space-y-2">
        {events.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No events for this day.
          </p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="rounded-md border border-[var(--card-border)] bg-[var(--bg-light)] px-3 py-2 text-left"
            >
              <p className="text-sm font-medium text-[var(--text)]">
                {event.title}
              </p>
              {event.time ? (
                <p className="text-xs text-muted-foreground">{event.time}</p>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
