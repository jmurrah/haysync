export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "haysync-theme";

export function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  const prefersDark =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDark ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.body.classList.remove("theme-light", "theme-dark", "dark");
  if (theme === "dark") {
    document.body.classList.add("theme-dark", "dark");
  } else {
    document.body.classList.add("theme-light");
  }
}
