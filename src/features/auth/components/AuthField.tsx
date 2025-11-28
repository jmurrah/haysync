import React from "react";

type AuthFieldProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
};

export default function AuthField({
  id,
  label,
  type = "text",
  value,
  onChange,
  autoComplete,
  required = true,
}: AuthFieldProps) {
  return (
    <div className="relative">
      <label
        className="absolute left-3.5 top-1 pointer-events-none text-[var(--text)] text-sm"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="w-full rounded-md border border-[var(--card-border)] bg-[var(--bg-light)] text-[var(--text)] px-3 pt-6 pb-1 hover:border-[var(--primary)] focus-visible:outline-none focus-visible:border-[var(--primary)] focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-0"
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required={required}
      />
    </div>
  );
}
