import React from "react";

type LogoProps = {
  size?: string;
};

export default function Logo({ size = "16px" }: LogoProps) {
  return (
    <span className="flex items-center logo-text" style={{ fontSize: size }}>
      <span className="text-[var(--logo-hay)]">hay</span>
      <span className="text-[var(--primary)] font-bold underline">sync</span>
    </span>
  );
}
