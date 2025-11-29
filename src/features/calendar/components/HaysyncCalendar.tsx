"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MonthView } from "./MonthView";
import { WeekView } from "./WeekView";
import {
  addDays,
  buildMonthMatrix,
  buildWeek,
  formatMonthYear,
  formatWeekRange,
  normalizeDate,
  shiftMonth,
  startOfMonth,
  startOfWeek,
  endOfWeek,
} from "../utils/dateUtils";

export type CalendarViewMode = "month" | "week";

type HaysyncCalendarProps = {
  viewMode: CalendarViewMode;
  selectedDate: Date;
  onViewChange: (next: CalendarViewMode) => void;
  onDateChange: (next: Date) => void;
};

const WEEK_START = 1; // Monday
const TODAY = normalizeDate(new Date());

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
    const start = startOfWeek(visibleDate, WEEK_START);
    const end = endOfWeek(visibleDate, WEEK_START);
    return formatWeekRange(start, end);
  }, [viewMode, visibleDate]);

  const currentWeek = useMemo(() => {
    const start = startOfWeek(visibleDate, WEEK_START);
    return buildWeek(start);
  }, [visibleDate]);

  const monthMatrix = useMemo(() => {
    if (viewMode !== "month") return [];
    return buildMonthMatrix(visibleDate, WEEK_START);
  }, [visibleDate, viewMode]);

  const handleNavigate = (direction: "prev" | "next") => {
    const delta = direction === "next" ? 1 : -1;
    let nextDate: Date = visibleDate;

    if (viewMode === "month") {
      nextDate = shiftMonth(visibleDate, delta);
    } else {
      nextDate = addDays(startOfWeek(visibleDate, WEEK_START), delta * 7);
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
    } else {
      setVisibleDate(startOfWeek(selectedDate, WEEK_START));
    }
  };

  return (
    <div className="h-full w-full flex flex-col gap-3 rounded-md border border-[var(--card-border)] bg-[var(--bg-light)] text-[var(--text)] shadow-none">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--card-border)] px-4 py-2 shadow-none">
        <div className="flex items-center gap-2">
          <NavButton direction="prev" onClick={() => handleNavigate("prev")} />
          <NavButton direction="next" onClick={() => handleNavigate("next")} />
          <p className="text-sm font-semibold">{headerLabel}</p>
        </div>
        <div className="inline-flex overflow-hidden rounded-md border border-[var(--card-border)] bg-[var(--bg-light)] text-sm font-medium">
          {(["month", "week"] as CalendarViewMode[]).map((mode, idx) => {
            const isActive = viewMode === mode;
            const base = "px-3 py-1.5";
            const radius = idx === 0 ? "rounded-l-md" : "rounded-r-md";
            const palette = isActive
              ? "bg-[var(--bg)] text-[var(--text)]"
              : "text-muted-foreground hover:bg-[var(--bg)]";
            const label = mode[0].toUpperCase() + mode.slice(1);
            return (
              <button
                key={mode}
                type="button"
                onClick={() => handleViewSwitch(mode)}
                className={`${base} ${radius} ${palette}`}
                aria-pressed={isActive}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 py-3 flex-1 overflow-hidden min-h-0">
        {viewMode === "month" ? (
          <MonthView
            matrix={monthMatrix}
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
            anchorMonth={startOfMonth(visibleDate)}
            today={TODAY}
          />
        ) : (
          <WeekView
            days={currentWeek}
            selectedDate={selectedDate}
            today={TODAY}
            onSelectDate={handleSelectDate}
          />
        )}
      </div>
    </div>
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
      className="inline-flex h-8 w-8 items-center justify-center rounded border border-[var(--card-border)] bg-[var(--bg-light)] text-sm font-medium text-[var(--text)] hover:border-[var(--primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--primary)]"
    >
      <Icon className="h-4 w-4" aria-hidden />
    </button>
  );
}
