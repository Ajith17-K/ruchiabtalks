import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeChoice = "light" | "dark" | "system";

const STORAGE_KEY = "abtalks.theme";

type ThemeContextValue = {
  theme: ThemeChoice;
  resolved: "light" | "dark";
  setTheme: (t: ThemeChoice) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  resolved: "light",
  setTheme: () => {},
});

function systemPref(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeChoice>("light");
  const [resolved, setResolved] = useState<"light" | "dark">("light");

  const apply = useCallback((choice: ThemeChoice) => {
    const next = choice === "system" ? systemPref() : choice;
    setResolved(next);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", next === "dark");
      document.documentElement.style.colorScheme = next;
    }
  }, []);

  useEffect(() => {
    const stored = (typeof localStorage !== "undefined" &&
      localStorage.getItem(STORAGE_KEY)) as ThemeChoice | null;
    const initial: ThemeChoice = stored ?? "light";
    setThemeState(initial);
    apply(initial);
  }, [apply]);

  useEffect(() => {
    if (theme !== "system" || typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => apply("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme, apply]);

  const setTheme = useCallback(
    (t: ThemeChoice) => {
      setThemeState(t);
      try {
        localStorage.setItem(STORAGE_KEY, t);
      } catch {
        /* ignore */
      }
      apply(t);
    },
    [apply],
  );

  return (
    <ThemeContext.Provider value={{ theme, resolved, setTheme }}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
