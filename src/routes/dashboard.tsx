import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle2,
  Clock,
  Flame,
  Gauge,
  RotateCcw,
  Signal,
  Sparkles,
  Users,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { achievements, community, student, todayChallenge, weekDays, weeklyReview } from "@/data/mock";
import { useAppState } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Day 12 of 60 | ABTalks" },
      {
        name: "description",
        content: "Your 60-day challenge dashboard: today's challenge, streak, progress and XP.",
      },
      { property: "og:title", content: "ABTalks Dashboard — Day 12 of 60" },
      {
        property: "og:description",
        content: "Here's today's challenge. Estimated time 2–3 hours. Let's get it done.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { state } = useAppState();
  const completed = state.completedDays;
  const pct = Math.round((completed / student.totalDays) * 100);
  const [showWeek, setShowWeek] = useState(false);
  const missedDay = weekDays.some((d) => !d.done);

  return (
    <AppShell>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid min-w-0 gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-foreground sm:text-2xl">
              Good evening, {student.greetingName} 👋
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Day {student.currentDay} of your 60-day journey
            </p>
          </div>

          {/* Streak */}
          <section className="surface-card p-4">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <p className="inline-flex items-center gap-2 text-base font-bold text-foreground">
                  <Flame className="h-4.5 w-4.5 shrink-0 text-primary" aria-hidden="true" />
                  {state.streak} day streak
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  One more day to make it {state.streak + 1}.
                </p>
              </div>
              <ul className="flex shrink-0 gap-1.5">
                {weekDays.map((d, i) => (
                  <li
                    key={i}
                    aria-label={d.done ? "Completed" : "Missed"}
                    className={cn(
                      "grid h-7 w-7 place-items-center rounded-full text-[10px] font-bold",
                      d.done
                        ? "bg-primary text-primary-foreground"
                        : "border border-dashed border-border-strong text-muted-foreground",
                    )}
                  >
                    {d.done ? "✓" : d.label}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Progress */}
          <section className="surface-card p-4">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm font-semibold text-foreground">
                {completed} / {student.totalDays} days
              </p>
              <p className="text-sm font-bold text-primary">{pct}%</p>
            </div>
            <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${pct}%` }}
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Challenge progress"
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {student.totalDays - completed} days remaining
            </p>
          </section>

          {/* TODAY'S CHALLENGE — dominant */}
          <section className="rounded-2xl border border-primary/35 bg-card p-5 shadow-pop">
            <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-extrabold tracking-widest text-primary">
              DAY {todayChallenge.day}
            </span>
            <h2 className="mt-3 text-xl font-extrabold leading-snug text-foreground sm:text-2xl">
              {todayChallenge.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {todayChallenge.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <li className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {todayChallenge.time}
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1">
                <Signal className="h-3.5 w-3.5" aria-hidden="true" /> {todayChallenge.level}
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1">
                {todayChallenge.stack}
              </li>
            </ul>
            <Link
              to="/day/$day"
              params={{ day: "12" }}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-primary-foreground sm:w-auto sm:px-8"
            >
              Start Day {todayChallenge.day} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>

          {/* Streak recovery */}
          {missedDay && (
            <section className="rounded-2xl border border-border bg-muted p-4">
              <p className="inline-flex items-center gap-2 text-sm font-bold text-foreground">
                <RotateCcw className="h-4 w-4 text-primary" aria-hidden="true" /> Streak Recovery
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                You missed one day. Your journey isn&apos;t over.
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>
                  <strong className="text-foreground">Today:</strong> Complete today&apos;s
                  challenge.
                </li>
                <li>
                  <strong className="text-foreground">Next:</strong> Return to your normal schedule.
                </li>
              </ul>
              <p className="mt-2 text-xs font-medium text-primary">
                Progress matters more than perfection.
              </p>
            </section>
          )}
        </div>

        {/* Secondary column */}
        <div className="grid min-w-0 content-start gap-4">
          {/* XP */}
          <section className="surface-card p-4">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Gauge className="h-3.5 w-3.5" aria-hidden="true" /> Your stats
            </p>
            <p className="mt-2 font-display text-2xl font-extrabold text-foreground">
              {state.xp.toLocaleString()} XP
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg bg-muted px-2 py-2">
                <p className="text-base font-bold text-foreground">{state.completedDays}</p>
                <p className="text-[11px] text-muted-foreground">Builds</p>
              </div>
              <div className="rounded-lg bg-muted px-2 py-2">
                <p className="text-base font-bold text-foreground">{state.streak}</p>
                <p className="text-[11px] text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </section>

          {/* Weekly review */}
          <section className="surface-card p-4">
            <p className="inline-flex items-center gap-2 text-sm font-bold text-foreground">
              <BarChart3 className="h-4 w-4 text-primary" aria-hidden="true" /> This Week
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {weeklyReview.completed} / {weeklyReview.total} challenges completed
            </p>
            <p className="text-sm text-muted-foreground">
              Strongest skill:{" "}
              <span className="font-semibold text-foreground">{weeklyReview.strongestSkill}</span>
            </p>
            <button
              onClick={() => setShowWeek((v) => !v)}
              aria-expanded={showWeek}
              className="mt-3 w-full rounded-lg border border-border-strong px-3 py-2 text-sm font-semibold text-foreground"
            >
              {showWeek ? "Hide Weekly Progress" : "View Weekly Progress"}
            </button>
            {showWeek && (
              <ul className="mt-3 space-y-2.5">
                {weeklyReview.skills.map((s) => (
                  <li key={s.name}>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{s.name}</span>
                      <span>{s.value}%</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-primary" style={{ width: `${s.value}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Achievements */}
          <section className="surface-card p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="inline-flex items-center gap-2 text-sm font-bold text-foreground">
                <Award className="h-4 w-4 text-primary" aria-hidden="true" /> Achievements
              </p>
              <Dialog>
                <DialogTrigger className="text-xs font-semibold text-primary">
                  View All
                </DialogTrigger>
                <DialogContent className="max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>All Achievements</DialogTitle>
                  </DialogHeader>
                  <ul className="grid grid-cols-2 gap-2">
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
                </DialogContent>
              </Dialog>
            </div>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {achievements
                .filter((a) => a.earned)
                .slice(0, 4)
                .map((a) => (
                  <li key={a.name} className="rounded-lg bg-muted px-2.5 py-2">
                    <p className="truncate text-xs font-semibold text-foreground">{a.name}</p>
                    <p className="text-[10px] text-[var(--success)]">✓ Earned</p>
                  </li>
                ))}
            </ul>
          </section>

          {/* Community preview */}
          <section className="surface-card p-4">
            <p className="inline-flex items-center gap-2 text-sm font-bold text-foreground">
              <Users className="h-4 w-4 text-primary" aria-hidden="true" /> What Builders Are
              Creating
            </p>
            <ul className="mt-3 space-y-2">
              {community.slice(0, 2).map((c) => (
                <li key={c.name} className="rounded-lg bg-muted p-3">
                  <p className="text-xs font-bold text-foreground">
                    {c.name} · <span className="font-medium text-primary">{c.day}</span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{c.text}</p>
                </li>
              ))}
            </ul>
            <Link
              to="/community"
              className="mt-3 flex min-h-10 items-center justify-center rounded-lg border border-border-strong text-sm font-semibold text-foreground"
            >
              Explore Community
            </Link>
          </section>

          <Link
            to="/progress"
            className="surface-card flex items-center justify-between gap-2 p-4 text-sm font-semibold text-foreground"
          >
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" /> Progress, badges &
              portfolio
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          </Link>

          <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> Demo data — frontend
            prototype
          </p>
        </div>
      </div>
    </AppShell>
  );
}
