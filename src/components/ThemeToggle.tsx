"use client";

import { useEffect, useState } from "react";
import {
  applyTheme,
  getInitialTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === "light" ? "dark" : "light";
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
      applyTheme(next);
      return next;
    });
  };

  const iconSrc =
    theme === "light" ? "/icons/MoonIcon.svg" : "/icons/SunIcon.svg";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="px-2 pt-2 rounded-sm hover:bg-[var(--card-bg)]"
    >
      <span className="sr-only">
        Switch to {theme === "light" ? "dark" : "light"} mode
      </span>
      <span
        aria-hidden
        className="h-6 w-6 inline-block pointer-events-none"
        style={{
          backgroundColor: theme === "light" ? "#6366F1" : "#FDBA74",
          maskImage: `url(${iconSrc})`,
          WebkitMaskImage: `url(${iconSrc})`,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      />
    </button>
  );
}
