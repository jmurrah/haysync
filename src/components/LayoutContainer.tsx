import React from "react";

type LayoutContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function LayoutContainer({
  children,
  className,
}: LayoutContainerProps) {
  const classes = [
    "flex justify-center items-center h-full w-full mx-auto",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <div className={classes}>{children}</div>;
}
