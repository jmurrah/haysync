export const DEFAULT_WEEK_START = 1; // Monday

export function normalizeDate(date: Date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function addDays(date: Date, days: number) {
  const copy = normalizeDate(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function startOfWeek(date: Date, weekStart = DEFAULT_WEEK_START) {
  const copy = normalizeDate(date);
  const day = copy.getDay(); // 0 (Sun) -> 6 (Sat)
  const diff = (day - weekStart + 7) % 7;
  return addDays(copy, -diff);
}

export function endOfWeek(date: Date, weekStart = DEFAULT_WEEK_START) {
  return addDays(startOfWeek(date, weekStart), 6);
}

export function startOfMonth(date: Date) {
  const copy = normalizeDate(date);
  copy.setDate(1);
  return copy;
}

export function endOfMonth(date: Date) {
  const copy = startOfMonth(date);
  copy.setMonth(copy.getMonth() + 1);
  copy.setDate(0);
  return normalizeDate(copy);
}

export function shiftMonth(date: Date, delta: number) {
  const copy = startOfMonth(date);
  copy.setMonth(copy.getMonth() + delta);
  return normalizeDate(copy);
}

export function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function formatMonthYear(date: Date) {
  return date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

export function formatWeekRange(start: Date, end: Date) {
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

export function formatDay(date: Date) {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function dateKey(date: Date) {
  const d = normalizeDate(date);
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function buildWeek(start: Date) {
  return Array.from({ length: 7 }, (_, idx) => addDays(start, idx));
}

export function buildMonthMatrix(
  visibleDate: Date,
  weekStart = DEFAULT_WEEK_START,
) {
  const start = startOfWeek(startOfMonth(visibleDate), weekStart);
  const end = endOfWeek(endOfMonth(visibleDate), weekStart);
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
