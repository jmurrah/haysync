"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MonthView } from "./MonthView";
import { WeekView } from "./WeekView";
import {
  addDays,
  addMinutes,
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
  const [draftRange, setDraftRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

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

  const openCreatePlaceholder = (range?: { start: Date; end: Date }) => {
    if (range) {
      setDraftRange(range);
      return;
    }
    const base = normalizeDate(selectedDate);
    base.setHours(9, 0, 0, 0);
    setDraftRange({ start: base, end: addMinutes(base, 60) });
  };

  const closePlaceholder = () => setDraftRange(null);

  return (
    <div className="h-full w-full flex flex-col gap-3 rounded-md border border-[var(--card-border)] bg-[var(--bg-light)] text-[var(--text)] shadow-none">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--card-border)] px-4 py-2 shadow-none">
        <div className="flex items-center gap-2">
          <NavButton direction="prev" onClick={() => handleNavigate("prev")} />
          <NavButton direction="next" onClick={() => handleNavigate("next")} />
          <p className="text-sm font-semibold">{headerLabel}</p>
        </div>
        <div className="flex items-center gap-2">
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
          <button
            type="button"
            onClick={() => openCreatePlaceholder()}
            className="rounded-md border border-[var(--card-border)] bg-[var(--bg-light)] px-3 py-1.5 text-sm font-semibold text-[var(--text)] transition-colors hover:border-[var(--primary)]"
          >
            Add event
          </button>
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
            onCreateRange={openCreatePlaceholder}
            draftRange={draftRange}
          />
        )}
      </div>
      {draftRange ? (
        <CreateEventPlaceholder range={draftRange} onClose={closePlaceholder} />
      ) : null}
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

function CreateEventPlaceholder({
  range,
  onClose,
}: {
  range: { start: Date; end: Date };
  onClose: () => void;
}) {
  const startLabel = range.start.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const endLabel = range.end.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-md rounded-lg border border-[var(--card-border)] bg-[var(--bg-light)] p-5 shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-[var(--text)]">
              Create event (placeholder)
            </h3>
            <p className="text-sm text-muted-foreground">
              {startLabel} – {endLabel}
            </p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-[var(--card-border)] bg-[var(--bg-light)] px-3 py-1.5 text-sm font-medium text-[var(--text)] hover:border-[var(--primary)]"
          >
            Close
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-[var(--text)] px-3 py-1.5 text-sm font-semibold text-[var(--bg-light)]"
          >
            Create placeholder
          </button>
        </div>
      </div>
    </div>
  );
}
