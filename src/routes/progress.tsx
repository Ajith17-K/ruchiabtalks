import { createFileRoute } from "@tanstack/react-router";
import { Award, ExternalLink, Trophy } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { achievements, leaderboard, portfolioBuilds, student } from "@/data/mock";
import { useAppState } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress, XP & Badges | ABTalks" },
      {
        name: "description",
        content: "Track XP, badges, leaderboard standing and the portfolio your builds create.",
      },
      { property: "og:title", content: "Your ABTalks Progress" },
      { property: "og:description", content: "XP, badges, leaderboard and portfolio preview." },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  const { state } = useAppState();
  const pct = Math.round((state.completedDays / student.totalDays) * 100);

  return (
    <AppShell>
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="surface-card p-5 lg:col-span-2">
          <h1 className="text-xl font-extrabold text-foreground">Your Progress</h1>
          <p className="mt-3 font-display text-3xl font-extrabold text-foreground">
            {state.xp.toLocaleString()} XP
          </p>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {state.completedDays} / {student.totalDays} days · {pct}% · {state.streak} day streak
          </p>
        </section>

        <section className="surface-card p-5">
          <h2 className="inline-flex items-center gap-2 text-sm font-bold text-foreground">
            <Award className="h-4 w-4 text-primary" aria-hidden="true" /> Badges
          </h2>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {achievements.map((a) => (
              <li
                key={a.name}
                className={cn(
                  "rounded-lg border border-border p-3",
                  a.earned ? "bg-primary-soft" : "bg-muted opacity-70",
                )}
              >
                <p className="text-sm font-semibold text-foreground">{a.name}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {a.earned ? `✓ Earned · ${a.note}` : `Locked · ${a.note}`}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="surface-card p-5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="inline-flex items-center gap-2 text-sm font-bold text-foreground">
              <Trophy className="h-4 w-4 text-primary" aria-hidden="true" /> Leaderboard
            </h2>
            <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Demo Data
            </span>
          </div>
          <ol className="mt-3 space-y-1.5">
            {leaderboard.map((l) => (
              <li
                key={l.rank}
                className={cn(
                  "grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-3 rounded-lg px-3 py-2.5 text-sm",
                  l.isYou ? "bg-primary-soft font-bold text-foreground" : "bg-muted text-foreground",
                )}
              >
                <span className="text-muted-foreground">#{l.rank}</span>
                <span className="truncate">
                  {l.name}
                  {l.isYou && <span className="ml-1.5 text-xs text-primary">(You)</span>}
                </span>
                <span className="shrink-0 tabular-nums">{l.xp.toLocaleString()} XP</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="surface-card p-5 lg:col-span-2">
          <h2 className="text-sm font-bold text-foreground">Your Builds Become Your Portfolio</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {portfolioBuilds.map((b) => (
              <li
                key={b.day}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted p-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    Day {b.day} — {b.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{b.stack}</p>
                </div>
                <ExternalLink
                  className="h-4 w-4 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>
          <button className="mt-4 min-h-11 w-full rounded-xl bg-primary text-sm font-bold text-primary-foreground sm:w-auto sm:px-6">
            Preview My Portfolio
          </button>
        </section>
      </div>
    </AppShell>
  );
}
