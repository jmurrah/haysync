"use client";

import { useCalendarEvents } from "../hooks/useCalendarEvents";
import { useState } from "react";
import { HaysyncCalendar, type CalendarViewMode } from "./HaysyncCalendar";

type CalendarViewProps = {
  calendarId: string;
  classes: string;
};

export default function CalendarView({
  calendarId,
  classes,
}: CalendarViewProps) {
  const events = useCalendarEvents(calendarId);
  const [viewMode, setViewMode] = useState<CalendarViewMode>("month");
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());

  return (
    <section className={`${classes} flex flex-col gap-2 text-left`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl">Calendar</h2>
        <p className="text-xs text-muted-foreground">
          {events.length} events loaded
        </p>
      </div>
      <HaysyncCalendar
        viewMode={viewMode}
        selectedDate={selectedDate}
        onViewChange={setViewMode}
        onDateChange={setSelectedDate}
      />
    </section>
  );
}
