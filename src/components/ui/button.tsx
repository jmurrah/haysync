import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

function cn(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const baseStyles =
  "inline-flex items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variantStyles = {
  default:
    "bg-[var(--primary)] text-[var(--neutral-black)] hover:bg-[var(--secondary)]",
  ghost: "bg-transparent text-[var(--text)] hover:bg-[var(--bg-dark)]",
};

export function Button({
  children,
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  const classes = cn(baseStyles, variantStyles.default, className);

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  const classes = cn(baseStyles, variantStyles.ghost, className);

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
