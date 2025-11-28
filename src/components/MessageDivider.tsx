import React from "react";

type MessageDividerProps = {
  message: string;
};

export default function MessageDivider({ message }: { message: string }) {
  return (
    <div className="w-full flex items-center gap-2" aria-hidden="true">
      <span className="flex-1 h-[2px] bg-[var(--text-muted)]" />
      <span className="leading-none text-[var(--text-muted)]">{message}</span>
      <span className="flex-1 h-[2px] bg-[var(--text-muted)]" />
    </div>
  );
}
