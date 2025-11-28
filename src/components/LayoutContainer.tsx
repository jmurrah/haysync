import React from "react";

type LayoutContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function LayoutContainer({
  children,
  className,
}: LayoutContainerProps) {
  const classes = ["h-full", "w-10/12", "max-w-5xl", "mx-auto", className]
    .filter(Boolean)
    .join(" ");
  return <div className={classes}>{children}</div>;
}
