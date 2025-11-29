"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addMinutes,
  formatHourLabel,
  isSameDay,
  normalizeDate,
} from "../utils/dateUtils";

type WeekViewProps = {
  days: Date[];
  selectedDate: Date;
  today: Date;
  onSelectDate: (date: Date) => void;
  onCreateRange: (range: { start: Date; end: Date }) => void;
  draftRange?: { start: Date; end: Date } | null;
};

type SlotPosition = {
  dayIndex: number;
  slotIndex: number; // 0-47 for each 30-minute block
};

type SlotSpan = {
  dayIndex: number;
  start: number; // inclusive slot index
  end: number; // inclusive slot index
};

const HALF_HOUR_SLOTS = 48;

export function WeekView({
  days,
  selectedDate,
  today,
  onSelectDate,
  onCreateRange,
  draftRange,
}: WeekViewProps) {
  const slots = useMemo(
    () => Array.from({ length: HALF_HOUR_SLOTS }, (_, idx) => idx),
    [],
  );
  const [dragStart, setDragStart] = useState<SlotPosition | null>(null);
  const [dragCurrent, setDragCurrent] = useState<SlotPosition | null>(null);
  const [hovered, setHovered] = useState<SlotPosition | null>(null);
  const [lockedRange, setLockedRange] = useState<SlotSpan | null>(null);
  const isDragging = dragStart !== null;

  // Palette driven by theme vars; `--primary` can be hex or hsl components.
  const primary = "var(--primary, #01f9c6)";
  const primaryMix = (percent: number) =>
    `color-mix(in srgb, ${primary} ${percent}%, transparent)`;
  const baseBg = "var(--bg-light, #f8fafc)";
  const hoverBg = primaryMix(22);
  const dragBg = primaryMix(32);
  const dragOutline = primary;

  const handleStart = useCallback((pos: SlotPosition) => {
    setLockedRange(null);
    setDragStart(pos);
    setDragCurrent(pos);
    setHovered(pos);
    document.body.style.userSelect = "none";
  }, []);

  const handleEnter = useCallback(
    (pos: SlotPosition) => {
      setHovered(pos);
      if (!isDragging) return;
      setDragCurrent(pos);
    },
    [isDragging],
  );

  const handleEnd = useCallback(
    (pos?: SlotPosition) => {
      if (!dragStart) return;
      const target = pos ?? dragCurrent ?? dragStart;
      const slotSpan = target ? toSlotSpan(dragStart, target) : null;
      const range = target ? buildRange(dragStart, target, days) : null;
      if (range && slotSpan) {
        setLockedRange(slotSpan);
        onCreateRange(range);
        onSelectDate(range.start);
      }
      setDragStart(null);
      setDragCurrent(null);
      setHovered(null);
      document.body.style.userSelect = "";
    },
    [dragCurrent, dragStart, days, onCreateRange, onSelectDate],
  );

  // End drag gracefully even if the pointer is released outside a cell.
  useEffect(() => {
    if (!isDragging) return;
    const handlePointerUp = () => handleEnd();
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("mouseleave", handlePointerUp);
    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("mouseleave", handlePointerUp);
    };
  }, [handleEnd, isDragging]);

  // Keep selection visible while the create placeholder is open.
  useEffect(() => {
    if (typeof draftRange === "undefined") return;
    if (!draftRange) {
      if (!isDragging) setLockedRange(null);
      return;
    }
    const span = rangeToSlotSpan(draftRange, days);
    setLockedRange(span);
  }, [draftRange, days, isDragging]);

  const dragRange = useMemo(() => {
    if (!dragStart || !dragCurrent) return null;
    return toSlotSpan(dragStart, dragCurrent);
  }, [dragCurrent, dragStart]);

  const visibleRange = dragRange ?? lockedRange;

  return (
    <div className="flex h-full w-full select-none flex-col overflow-hidden">
      <div className="grid grid-cols-[72px,repeat(7,1fr)] border-b border-[var(--card-border)] bg-[var(--bg)] text-xs font-semibold text-muted-foreground">
        <div className="flex items-end justify-end pr-3 pt-3" />
        {days.map((day) => (
          <button
            key={day.toISOString()}
            type="button"
            onClick={() => onSelectDate(day)}
            className={`flex h-full flex-col items-start gap-1 border-l border-[var(--card-border)] px-3 py-2 text-left transition-colors ${
              isSameDay(day, selectedDate)
                ? "bg-[var(--bg)] text-[var(--text)]"
                : "hover:bg-[var(--bg-light)]"
            }`}
          >
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
              {day.toLocaleDateString(undefined, { weekday: "short" })}
            </span>
            <span className="text-sm font-semibold leading-none">
              {day.getDate()}
              {isSameDay(day, today) ? (
                <span className="ml-1 rounded-full bg-[hsl(var(--primary))] bg-opacity-20 px-1 text-[10px] font-semibold text-[var(--text)]">
                  Today
                </span>
              ) : null}
            </span>
          </button>
        ))}
      </div>

      <div className="relative flex-1 overflow-auto">
        <div className="grid min-h-full grid-cols-[72px,repeat(7,1fr)] gap-x-px bg-[var(--card-border)] p-px">
          <div className="sticky left-0 z-10 bg-[var(--card-border)]">
            <div
              className="grid gap-px"
              style={{ gridTemplateRows: "repeat(48, 48px)" }}
            >
              {slots.map((slot) => (
                <div
                  key={`label-${slot}`}
                  className="flex h-full items-start justify-end bg-[var(--bg)] pr-3 text-[11px] text-muted-foreground"
                >
                  {slot % 2 === 0 ? formatHourLabel(slot / 2) : ""}
                </div>
              ))}
            </div>
          </div>

          {days.map((day, dayIndex) => (
            <div
              key={day.toISOString()}
              className="relative bg-[var(--card-border)]"
            >
              <div
                className="grid gap-px"
                style={{ gridTemplateRows: "repeat(48, 48px)" }}
              >
                {slots.map((slot) => {
                  const selected =
                    visibleRange &&
                    dayIndex === visibleRange.dayIndex &&
                    slot >= visibleRange.start &&
                    slot <= visibleRange.end;
                  const isHovered =
                    !selected &&
                    hovered?.dayIndex === dayIndex &&
                    hovered?.slotIndex === slot;
                  const baseClasses =
                    "relative h-full w-full cursor-pointer bg-[var(--bg-light)] px-1 text-left transition-[background-color,box-shadow] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--card-border)]";

                  // Keep backgrounds inline so they are never overridden by Tailwind classes.
                  const backgroundColor = selected
                    ? dragBg
                    : isHovered
                      ? hoverBg
                      : baseBg;

                  const hoverShadow =
                    !selected && isHovered
                      ? `inset 0 0 0 1px ${primaryMix(60)}`
                      : undefined;
                  const selectionShadow = selected
                    ? `inset 0 0 0 1px ${dragOutline}, 0 0 0 1px ${dragOutline}`
                    : undefined;
                  const boxShadow = [selectionShadow, hoverShadow]
                    .filter(Boolean)
                    .join(", ");

                  return (
                    <button
                      key={`${day.toISOString()}-${slot}`}
                      type="button"
                      className={baseClasses}
                      style={{ backgroundColor, boxShadow }}
                      data-selected={selected ? "true" : "false"}
                      data-hovered={isHovered ? "true" : "false"}
                      onPointerDown={(e) => {
                        e.preventDefault();
                        if (e.button !== 0) return;
                        handleStart({ dayIndex, slotIndex: slot });
                      }}
                      onPointerEnter={() =>
                        handleEnter({ dayIndex, slotIndex: slot })
                      }
                      onPointerUp={(e) => {
                        e.preventDefault();
                        handleEnd({ dayIndex, slotIndex: slot });
                      }}
                      onPointerLeave={() => {
                        if (!isDragging) setHovered(null);
                      }}
                      aria-label={`${day.toDateString()} ${slotLabel(
                        slot,
                      )} block`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function toSlotSpan(start: SlotPosition, end: SlotPosition): SlotSpan | null {
  if (start.dayIndex !== end.dayIndex) return null;
  const firstSlot = Math.min(start.slotIndex, end.slotIndex);
  const lastSlot = Math.max(start.slotIndex, end.slotIndex);
  return { dayIndex: start.dayIndex, start: firstSlot, end: lastSlot };
}

function rangeToSlotSpan(
  range: { start: Date; end: Date },
  days: Date[],
): SlotSpan | null {
  if (!isSameDay(range.start, range.end)) return null;
  const dayIndex = days.findIndex((day) => isSameDay(day, range.start));
  if (dayIndex === -1) return null;

  const startMinutes = range.start.getHours() * 60 + range.start.getMinutes();
  const endMinutes = range.end.getHours() * 60 + range.end.getMinutes();
  const startSlot = Math.floor(startMinutes / 30);
  const endSlot = Math.max(startSlot, Math.ceil(endMinutes / 30) - 1);

  return { dayIndex, start: startSlot, end: endSlot };
}

function buildRange(
  start: SlotPosition,
  end: SlotPosition,
  days: Date[],
): { start: Date; end: Date } | null {
  if (start.dayIndex !== end.dayIndex) return null;
  const day = normalizeDate(days[start.dayIndex]);
  const firstSlot = Math.min(start.slotIndex, end.slotIndex);
  const lastSlot = Math.max(start.slotIndex, end.slotIndex) + 1;
  const startMinutes = firstSlot * 30;
  const endMinutes = lastSlot * 30;
  const startDate = addMinutes(day, startMinutes);
  const endDate = addMinutes(day, endMinutes);
  return { start: startDate, end: endDate };
}

function slotLabel(slotIndex: number) {
  const startHour = Math.floor(slotIndex / 2);
  const startMinute = slotIndex % 2 === 0 ? "00" : "30";
  const label = new Date();
  label.setHours(startHour, parseInt(startMinute), 0, 0);
  return label.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}
