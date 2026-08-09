import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Flame,
  Github,
  Globe,
  Layers,
  Linkedin,
  Repeat,
  Rocket,
  Users,
} from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Logo } from "@/components/app-shell";
import { journey, tracks } from "@/data/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ABTalks — 60-Day Coding Challenge for Students" },
      {
        name: "description",
        content:
          "A 60-day coding challenge that turns daily practice into real projects, public proof, and a portfolio you can show.",
      },
      { property: "og:title", content: "ABTalks — 60-Day Coding Challenge" },
      {
        property: "og:description",
        content: "Build every day. Become impossible to ignore. One practical challenge a day.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Logo />
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <Link
              to="/dashboard"
              className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground sm:inline-flex"
            >
              Start
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-10 md:pt-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              <Flame className="h-3.5 w-3.5" aria-hidden="true" /> 60 days · one build a day
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.1] text-foreground sm:text-4xl md:text-5xl">
              Build every day.
              <br />
              Become impossible to ignore.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              A 60-day coding challenge that turns daily practice into real projects, public proof,
              and a portfolio you can show.
            </p>

            <dl className="mt-7 grid grid-cols-3 gap-3">
              {[
                ["60", "Days"],
                ["60", "Builds"],
                ["1", "Growing Portfolio"],
              ].map(([n, l]) => (
                <div key={l} className="surface-card px-3 py-3">
                  <dt className="font-display text-2xl font-extrabold text-foreground">{n}</dt>
                  <dd className="mt-0.5 text-xs text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/dashboard"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-card"
              >
                Start the Challenge <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-border-strong px-6 text-sm font-semibold text-foreground"
              >
                How It Works
              </a>
            </div>
          </div>

          {/* Hero preview */}
          <div className="surface-card overflow-hidden p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-bold tracking-wider text-primary">
                DAY 12
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                <Flame className="h-3.5 w-3.5" aria-hidden="true" /> 11 day streak
              </span>
            </div>
            <h2 className="mt-3 text-lg font-bold text-foreground">Responsive Portfolio</h2>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-1/5 rounded-full bg-primary" />
              </div>
              <span className="text-xs font-bold text-foreground">20%</span>
            </div>
            <ul className="mt-4 grid gap-2">
              {[
                ["GitHub", Github],
                ["LinkedIn", Linkedin],
                ["Deployed", Globe],
              ].map(([label, Icon]) => {
                const I = Icon as typeof Github;
                return (
                  <li
                    key={label as string}
                    className="flex items-center justify-between rounded-lg border border-border bg-muted px-3 py-2.5"
                  >
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                      <I className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      {label as string}
                    </span>
                    <CheckCircle2 className="h-4 w-4 text-[var(--success)]" aria-hidden="true" />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-extrabold text-foreground">How It Works</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <div className="surface-card p-5">
              <span className="font-display text-sm font-extrabold text-primary">01</span>
              <h3 className="mt-1 text-lg font-bold text-foreground">Pick a Track</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {tracks.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="surface-card p-5">
              <span className="font-display text-sm font-extrabold text-primary">02</span>
              <h3 className="mt-1 text-lg font-bold text-foreground">Build Every Day</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Complete one practical challenge every day.
              </p>
            </div>
            <div className="surface-card p-5">
              <span className="font-display text-sm font-extrabold text-primary">03</span>
              <h3 className="mt-1 text-lg font-bold text-foreground">Share Your Proof</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Submit GitHub, LinkedIn, and a deployment URL when required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-extrabold text-foreground">Why Join</h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [Repeat, "Build Consistency", "Turn coding into a daily habit."],
            [Layers, "Build Real Projects", "Learn by actually creating things."],
            [Rocket, "Build a Portfolio", "Turn 60 days of work into visible proof."],
            [Users, "Build in Public", "Share your progress and become visible."],
          ].map(([Icon, title, text]) => {
            const I = Icon as typeof Repeat;
            return (
              <div key={title as string} className="surface-card p-5">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-soft text-primary">
                  <I className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-base font-bold text-foreground">{title as string}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{text as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* JOURNEY */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-extrabold text-foreground">The 60-Day Journey</h2>
          <ol className="mt-7 grid gap-3 sm:grid-cols-5">
            {journey.map((j) => (
              <li key={j.day} className="surface-card px-4 py-4">
                <span className="text-xs font-bold tracking-wider text-primary">DAY {j.day}</span>
                <p className="mt-1 text-sm font-semibold text-foreground">{j.label}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">
          Your portfolio won&apos;t build itself.
        </h2>
        <p className="mt-3 text-muted-foreground">Start with Day 1. Build something today.</p>
        <Link
          to="/dashboard"
          className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-bold text-primary-foreground shadow-card"
        >
          Start My 60-Day Journey <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        ABTalks — 60-Day Coding Challenge · Prototype with demo data
      </footer>
    </div>
  );
}
