import { useCallback, useEffect, useState } from "react";
import { checklistItems, student } from "@/data/mock";

export type DayState = {
  checklist: boolean[];
  level: "Beginner" | "Intermediate" | "Advanced";
  proof: { github: string; commit: string; linkedin: string; deploy: string };
  submitChecks: boolean[];
  submitted: boolean;
  reflection: string;
};

export type AppState = {
  xp: number;
  streak: number;
  completedDays: number;
  days: Record<string, DayState>;
};

const KEY = "abtalks.progress";

export const emptyDay = (): DayState => ({
  checklist: checklistItems.map(() => false),
  level: "Intermediate",
  proof: { github: "", commit: "", linkedin: "", deploy: "" },
  submitChecks: [false, false, false, false],
  submitted: false,
  reflection: "",
});

const initial = (): AppState => ({
  xp: student.xp,
  streak: student.streak,
  completedDays: student.currentDay - 1,
  days: {},
});

let listeners: Array<() => void> = [];
let cache: AppState | null = null;

function read(): AppState {
  if (cache) return cache;
  if (typeof localStorage === "undefined") return initial();
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? { ...initial(), ...JSON.parse(raw) } : initial();
  } catch {
    cache = initial();
  }
  return cache ?? initial();
}

function write(next: AppState) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

export function useAppState() {
  const [state, setState] = useState<AppState>(initial);

  useEffect(() => {
    setState(read());
    const l = () => setState({ ...read() });
    listeners.push(l);
    return () => {
      listeners = listeners.filter((x) => x !== l);
    };
  }, []);

  const update = useCallback((fn: (s: AppState) => AppState) => {
    write(fn(read()));
  }, []);

  return { state, update };
}

export function useDayState(day: number) {
  const { state, update } = useAppState();
  const key = String(day);
  const dayState = state.days[key] ?? emptyDay();

  const setDay = useCallback(
    (patch: Partial<DayState>) => {
      update((s) => ({
        ...s,
        days: { ...s.days, [key]: { ...(s.days[key] ?? emptyDay()), ...patch } },
      }));
    },
    [update, key],
  );

  return { state, dayState, setDay, update };
}

export function resetAll() {
  write(initial());
}
