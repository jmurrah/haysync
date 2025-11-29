"use client";

type CalendarDayCellProps = {
  date: Date;
  selected: boolean;
  isToday: boolean;
  inCurrentMonth: boolean;
  onSelectDate: (date: Date) => void;
};

export function CalendarDayCell({
  date,
  selected,
  isToday,
  inCurrentMonth,
  onSelectDate,
}: CalendarDayCellProps) {
  const base =
    "flex h-full w-full flex-col gap-2 rounded-sm border border-[var(--card-border)] bg-[var(--bg-light)] px-2 py-2 text-left";
  const emphasis = selected
    ? "border-[var(--primary)]"
    : "hover:border-[var(--primary)]";
  const muted = inCurrentMonth ? "" : "text-muted-foreground/70";

  return (
    <button
      type="button"
      onClick={() => onSelectDate(date)}
      className={`${base} ${emphasis} ${muted}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{date.getDate()}</span>
        {isToday ? (
          <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-[var(--text)]">
            Today
          </span>
        ) : null}
      </div>
    </button>
  );
}
