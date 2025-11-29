"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CalendarViewMode = "month" | "week" | "day";

type HaysyncCalendarProps = {
  viewMode: CalendarViewMode;
  selectedDate: Date;
  onViewChange: (next: CalendarViewMode) => void;
  onDateChange: (next: Date) => void;
};

type CalendarEvent = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string;
};

const WEEK_START = 1; // Monday

const today = normalizeDate(new Date());
const mockEvents: CalendarEvent[] = [
  { id: "1", title: "Product sync", date: dateKey(today), time: "09:30" },
  {
    id: "2",
    title: "Design review",
    date: dateKey(addDays(today, 1)),
    time: "13:00",
  },
  {
    id: "3",
    title: "1:1 catch-up",
    date: dateKey(addDays(today, -2)),
    time: "15:00",
  },
];

export function HaysyncCalendar({
  viewMode,
  selectedDate,
  onViewChange,
  onDateChange,
}: HaysyncCalendarProps) {
  const [visibleDate, setVisibleDate] = useState<Date>(() =>
    normalizeDate(selectedDate),
  );

  useEffect(() => {
    setVisibleDate(normalizeDate(selectedDate));
  }, [selectedDate]);

  const headerLabel = useMemo(() => {
    if (viewMode === "month") {
      return formatMonthYear(visibleDate);
    }
    if (viewMode === "week") {
      const start = startOfWeek(visibleDate);
      const end = endOfWeek(visibleDate);
      return formatWeekRange(start, end);
    }
    return formatDay(selectedDate);
  }, [viewMode, visibleDate, selectedDate]);

  const currentWeek = useMemo(() => {
    const start = startOfWeek(visibleDate);
    return buildWeek(start);
  }, [visibleDate]);

  const monthMatrix = useMemo(() => {
    if (viewMode !== "month") return [];
    return buildMonthMatrix(visibleDate);
  }, [visibleDate, viewMode]);

  const dayEvents = useMemo(() => {
    const key = dateKey(selectedDate);
    return mockEvents.filter((event) => event.date === key);
  }, [selectedDate]);

  const handleNavigate = (direction: "prev" | "next") => {
    const delta = direction === "next" ? 1 : -1;
    let nextDate: Date = visibleDate;

    if (viewMode === "month") {
      nextDate = shiftMonth(visibleDate, delta);
    } else if (viewMode === "week") {
      nextDate = addDays(startOfWeek(visibleDate), delta * 7);
    } else {
      nextDate = addDays(visibleDate, delta);
    }

    setVisibleDate(nextDate);
    onDateChange(nextDate);
  };

  const handleSelectDate = (date: Date) => {
    const normalized = normalizeDate(date);
    setVisibleDate(normalized);
    onDateChange(normalized);
  };

  const handleViewSwitch = (mode: CalendarViewMode) => {
    onViewChange(mode);
    if (mode === "month") {
      setVisibleDate(startOfMonth(selectedDate));
    } else if (mode === "week") {
      setVisibleDate(startOfWeek(selectedDate));
    } else {
      setVisibleDate(selectedDate);
    }
  };

  return (
    <div className="flex flex-col rounded-xl border bg-card text-foreground shadow-sm">
      <div className="flex flex-col gap-3 border-b px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">
            Schedule
          </p>
          <p className="text-lg font-semibold leading-tight">{headerLabel}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center rounded-md border bg-transparent text-sm font-medium shadow-sm">
            {(["month", "week", "day"] as CalendarViewMode[]).map((mode, i) => {
              const isActive = viewMode === mode;
              const label = mode[0].toUpperCase() + mode.slice(1);
              const baseClasses =
                "h-9 px-3 inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";
              const radius =
                i === 0
                  ? "rounded-l-md"
                  : i === 2
                    ? "rounded-r-md"
                    : "rounded-none";
              const palette = isActive
                ? "bg-[hsl(var(--primary)/0.12)] text-[var(--text)] border-l border-r border-[hsl(var(--primary)/0.3)]"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground";
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => handleViewSwitch(mode)}
                  className={`${baseClasses} ${radius} ${palette}`}
                  aria-pressed={isActive}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <NavButton direction="prev" onClick={() => handleNavigate("prev")} />
            <NavButton direction="next" onClick={() => handleNavigate("next")} />
          </div>
        </div>
      </div>

      <div className="px-4 py-3">
        {viewMode === "month" ? (
          <MonthView
            matrix={monthMatrix}
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
            anchorMonth={startOfMonth(visibleDate)}
          />
        ) : viewMode === "week" ? (
          <WeekView
            days={currentWeek}
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
          />
        ) : (
          <DayView date={selectedDate} events={dayEvents} />
        )}
      </div>
    </div>
  );
}

function MonthView({
  matrix,
  selectedDate,
  onSelectDate,
  anchorMonth,
}: {
  matrix: Date[][];
  selectedDate: Date;
  anchorMonth: Date;
  onSelectDate: (date: Date) => void;
}) {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-7 text-center text-xs font-medium text-muted-foreground">
        {weekDays.map((day) => (
          <span key={day} className="py-2">
            {day}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {matrix.flat().map((day, idx) => (
          <DayCell
            key={`${day.toISOString()}-${idx}`}
            date={day}
            onSelectDate={onSelectDate}
            selected={isSameDay(day, selectedDate)}
            isToday={isSameDay(day, today)}
            inCurrentMonth={isSameMonth(day, anchorMonth)}
          />
        ))}
      </div>
    </div>
  );
}

function WeekView({
  days,
  selectedDate,
  onSelectDate,
}: {
  days: Date[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}) {
  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day) => (
        <DayCell
          key={day.toISOString()}
          date={day}
          onSelectDate={onSelectDate}
          selected={isSameDay(day, selectedDate)}
          isToday={isSameDay(day, today)}
          inCurrentMonth
        />
      ))}
    </div>
  );
}

function DayView({ date, events }: { date: Date; events: CalendarEvent[] }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-lg border bg-muted/30 px-3 py-2">
        <p className="text-sm font-medium">{formatDay(date)}</p>
        <p className="text-xs text-muted-foreground">Schedule</p>
      </div>
      <div className="space-y-2">
        {events.length === 0 ? (
          <p className="text-sm text-muted-foreground">No events for this day.</p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="rounded-lg border px-3 py-2 text-left shadow-sm"
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

function DayCell({
  date,
  selected,
  isToday,
  inCurrentMonth,
  onSelectDate,
}: {
  date: Date;
  selected: boolean;
  isToday: boolean;
  inCurrentMonth: boolean;
  onSelectDate: (date: Date) => void;
}) {
  const base =
    "flex flex-col gap-1 rounded-lg border px-2 py-2 text-left transition-colors";
  const emphasis = selected
    ? "border-[hsl(var(--primary)/0.6)] bg-[hsl(var(--primary)/0.12)]"
    : "hover:border-[hsl(var(--primary)/0.35)]";
  const muted = inCurrentMonth ? "" : "text-muted-foreground/70";
  const todayBadge = isToday && !selected ? "border-[hsl(var(--primary)/0.6)]" : "";

  return (
    <button
      type="button"
      onClick={() => onSelectDate(date)}
      className={`${base} ${emphasis} ${muted} ${todayBadge}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{date.getDate()}</span>
        {isToday ? (
          <span className="rounded-full bg-[hsl(var(--primary)/0.12)] px-2 py-0.5 text-[10px] font-semibold text-[var(--text)]">
            Today
          </span>
        ) : null}
      </div>
    </button>
  );
}

function NavButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const label = direction === "prev" ? "Previous period" : "Next period";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
    >
      <Icon className="h-4 w-4" aria-hidden />
    </button>
  );
}

function buildWeek(start: Date) {
  return Array.from({ length: 7 }, (_, idx) => addDays(start, idx));
}

function buildMonthMatrix(visibleDate: Date) {
  const start = startOfWeek(startOfMonth(visibleDate));
  const end = endOfWeek(endOfMonth(visibleDate));
  const days: Date[] = [];
  for (let cursor = start; cursor <= end; cursor = addDays(cursor, 1)) {
    days.push(cursor);
  }

  const matrix: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    matrix.push(days.slice(i, i + 7));
  }
  return matrix;
}

function normalizeDate(date: Date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function addDays(date: Date, days: number) {
  const copy = normalizeDate(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function startOfWeek(date: Date) {
  const copy = normalizeDate(date);
  const day = copy.getDay(); // 0 (Sun) -> 6 (Sat)
  const diff = (day - WEEK_START + 7) % 7;
  return addDays(copy, -diff);
}

function endOfWeek(date: Date) {
  return addDays(startOfWeek(date), 6);
}

function startOfMonth(date: Date) {
  const copy = normalizeDate(date);
  copy.setDate(1);
  return copy;
}

function endOfMonth(date: Date) {
  const copy = startOfMonth(date);
  copy.setMonth(copy.getMonth() + 1);
  copy.setDate(0);
  return normalizeDate(copy);
}

function shiftMonth(date: Date, delta: number) {
  const copy = startOfMonth(date);
  copy.setMonth(copy.getMonth() + delta);
  return normalizeDate(copy);
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function formatMonthYear(date: Date) {
  return date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

function formatWeekRange(start: Date, end: Date) {
  const sameMonth = start.getMonth() === end.getMonth();
  const sameYear = start.getFullYear() === end.getFullYear();

  const startLabel = start.toLocaleDateString(undefined, {
    month: sameMonth ? "long" : "short",
    day: "numeric",
  });
  const endLabel = end.toLocaleDateString(undefined, {
    month: sameYear ? "short" : "long",
    day: "numeric",
    year: "numeric",
  });

  return `${startLabel} – ${endLabel}`;
}

function formatDay(date: Date) {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function dateKey(date: Date) {
  const d = normalizeDate(date);
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}
