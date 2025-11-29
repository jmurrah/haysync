"use client";

import { CalendarDayCell } from "./CalendarDayCell";
import { isSameDay, isSameMonth } from "../utils/dateUtils";

type MonthViewProps = {
  matrix: Date[][];
  selectedDate: Date;
  anchorMonth: Date;
  today: Date;
  onSelectDate: (date: Date) => void;
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function MonthView({
  matrix,
  selectedDate,
  anchorMonth,
  today,
  onSelectDate,
}: MonthViewProps) {
  return (
    <div className="flex h-full w-full flex-col gap-3">
      <div className="grid grid-cols-7 text-center text-xs font-medium text-muted-foreground">
        {WEEKDAYS.map((day) => (
          <span key={day} className="py-2">
            {day}
          </span>
        ))}
      </div>
      <div
        className="grid flex-1 grid-cols-7 gap-2"
        style={{
          gridTemplateRows: `repeat(${matrix.length || 1}, minmax(0, 1fr))`,
        }}
      >
        {matrix.flat().map((day, idx) => (
          <CalendarDayCell
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
