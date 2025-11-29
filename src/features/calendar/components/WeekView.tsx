"use client";

import { CalendarDayCell } from "./CalendarDayCell";
import { isSameDay } from "../utils/dateUtils";

type WeekViewProps = {
  days: Date[];
  selectedDate: Date;
  today: Date;
  onSelectDate: (date: Date) => void;
};

export function WeekView({
  days,
  selectedDate,
  today,
  onSelectDate,
}: WeekViewProps) {
  return (
    <div className="grid h-full w-full grid-cols-7 gap-2 auto-rows-fr">
      {days.map((day) => (
        <CalendarDayCell
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
