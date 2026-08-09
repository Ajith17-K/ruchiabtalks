import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  ClipboardCopy,
  Code2,
  Flame,
  HelpCircle,
  ListChecks,
  PartyPopper,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  checklistItems,
  codeReview,
  guidanceByLevel,
  helpSteps,
  linkedInPost,
  mentorResponses,
  requirements,
  resumeBullet,
  student,
  todayChallenge,
} from "@/data/mock";
import { useDayState } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/day/$day")({
  head: () => ({
    meta: [
      { title: "Day 12 — Responsive Student Portfolio | ABTalks" },
      {
        name: "description",
        content:
          "Today's challenge workspace: task, build checklist, AI mentor, code reviewer and proof of work submission.",
      },
      { property: "og:title", content: "Day 12 — Build a Responsive Student Portfolio" },
      {
        property: "og:description",
        content: "Read the task, build it, get help, submit your proof.",
      },
    ],
  }),
  component: Workspace,
});

const urlRe = {
  github: /^https?:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+\/?$/i,
  commit: /^https?:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+\/commit\/[\w]+\/?$/i,
  linkedin: /^https?:\/\/(www\.)?linkedin\.com\/.+$/i,
  deploy: /^https?:\/\/.+\..+$/i,
};

function Workspace() {
  const { day } = Route.useParams();
  const dayNum = Number(day) || 12;
  const navigate = useNavigate();
  const { state, dayState, setDay, update } = useDayState(dayNum);
  const [tab, setTab] = useState<"mentor" | "reviewer">("mentor");
  const [mentorAnswer, setMentorAnswer] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [reviewed, setReviewed] = useState(false);
  const [linkedinDraft, setLinkedinDraft] = useState<string | null>(null);
  const [bullet, setBullet] = useState<string | null>(null);

  const doneCount = dayState.checklist.filter(Boolean).length;
  const proofErrors = useMemo(
    () => ({
      github:
        dayState.proof.github && !urlRe.github.test(dayState.proof.github.trim())
          ? "Enter a valid GitHub repository URL"
          : "",
      commit:
        dayState.proof.commit && !urlRe.commit.test(dayState.proof.commit.trim())
          ? "Enter a valid GitHub commit URL"
          : "",
      linkedin:
        dayState.proof.linkedin && !urlRe.linkedin.test(dayState.proof.linkedin.trim())
          ? "Enter a valid LinkedIn post URL"
          : "",
      deploy:
        dayState.proof.deploy && !urlRe.deploy.test(dayState.proof.deploy.trim())
          ? "Enter a valid deployment URL (https://…)"
          : "",
    }),
    [dayState.proof],
  );

  const canSubmit =
    urlRe.github.test(dayState.proof.github.trim()) &&
    urlRe.commit.test(dayState.proof.commit.trim()) &&
    urlRe.linkedin.test(dayState.proof.linkedin.trim()) &&
    urlRe.deploy.test(dayState.proof.deploy.trim()) &&
    dayState.submitChecks.every(Boolean);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Couldn't copy");
    }
  };

  const submit = () => {
    setDay({ submitted: true });
    update((s) => ({
      ...s,
      xp: s.xp + 300,
      streak: s.streak + 1,
      completedDays: Math.max(s.completedDays, dayNum),
    }));
    toast.success(`Day ${dayNum} submitted · +300 XP`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (dayState.submitted) {
    return (
      <AppShell>
        <SuccessState
          day={dayNum}
          xp={state.xp}
          streak={state.streak}
          completed={state.completedDays}
          onBack={() => navigate({ to: "/dashboard" })}
          linkedinDraft={linkedinDraft}
          setLinkedinDraft={setLinkedinDraft}
          bullet={bullet}
          setBullet={setBullet}
          copy={copy}
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="grid min-w-0 gap-4">
          {/* Header */}
          <div>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Dashboard
            </Link>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-extrabold tracking-widest text-primary">
                DAY {dayNum} OF {student.totalDays}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold text-foreground">
                <Flame className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> {state.streak}
              </span>
              <span className="rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                In Progress
              </span>
            </div>
            <h1 className="mt-3 text-xl font-extrabold leading-snug text-foreground sm:text-2xl">
              {todayChallenge.title}
            </h1>
          </div>

          {/* Today's task */}
          <section className="surface-card p-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Today&apos;s Task
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {todayChallenge.longDescription}
            </p>

            <div className="mt-4">
              <p className="text-xs font-semibold text-muted-foreground">Challenge level</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(["Beginner", "Intermediate", "Advanced"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setDay({ level: lvl })}
                    aria-pressed={dayState.level === lvl}
                    className={cn(
                      "min-h-9 rounded-full border px-3.5 text-xs font-semibold",
                      dayState.level === lvl
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
              <ul className="mt-3 space-y-1.5">
                {guidanceByLevel[dayState.level].map((g) => (
                  <li key={g} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Checklist */}
          <section className="surface-card p-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="inline-flex items-center gap-2 text-sm font-bold text-foreground">
                <ListChecks className="h-4 w-4 text-primary" aria-hidden="true" /> Build Checklist
              </h2>
              <span className="text-xs font-semibold text-muted-foreground">
                {doneCount} / {checklistItems.length} completed
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${(doneCount / checklistItems.length) * 100}%` }}
              />
            </div>
            <ul className="mt-3 space-y-1">
              {checklistItems.map((item, i) => (
                <li key={item}>
                  <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-2 hover:bg-muted">
                    <input
                      type="checkbox"
                      checked={dayState.checklist[i] ?? false}
                      onChange={(e) => {
                        const next = [...dayState.checklist];
                        next[i] = e.target.checked;
                        setDay({ checklist: next });
                      }}
                      className="h-4.5 w-4.5 shrink-0 accent-[var(--primary)]"
                    />
                    <span
                      className={cn(
                        "text-sm",
                        dayState.checklist[i]
                          ? "text-muted-foreground line-through"
                          : "text-foreground",
                      )}
                    >
                      {item}
                    </span>
                    {dayState.checklist[i] && (
                      <span className="ml-auto text-[11px] font-semibold text-[var(--success)]">
                        ✓ Completed
                      </span>
                    )}
                  </label>
                </li>
              ))}
            </ul>
          </section>

          {/* AI Mentor / Code Reviewer */}
          <section className="rounded-2xl border border-border bg-secondary/5 p-4 shadow-card">
            <div
              role="tablist"
              aria-label="Assistance"
              className="inline-flex rounded-full border border-border bg-muted p-0.5"
            >
              {(
                [
                  ["mentor", "AI Mentor", Bot],
                  ["reviewer", "Code Reviewer", Code2],
                ] as const
              ).map(([key, label, Icon]) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={tab === key}
                  onClick={() => setTab(key)}
                  className={cn(
                    "inline-flex min-h-9 items-center gap-1.5 rounded-full px-3.5 text-xs font-bold",
                    tab === key
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" /> {label}
                </button>
              ))}
            </div>

            {tab === "mentor" ? (
              <div className="mt-4">
                <p className="text-sm font-bold text-foreground">🤖 AI Mentor</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {Object.keys(mentorResponses).map((q) => (
                    <button
                      key={q}
                      onClick={() => setMentorAnswer(mentorResponses[q])}
                      className="min-h-11 rounded-lg border border-border bg-card px-3 text-left text-sm font-medium text-foreground hover:border-primary"
                    >
                      {q}
                    </button>
                  ))}
                </div>
                {mentorAnswer && (
                  <div className="mt-3 rounded-lg border-l-2 border-primary bg-primary-soft/60 p-3">
                    <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">
                      {mentorAnswer}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-4">
                <label htmlFor="code" className="text-sm font-bold text-foreground">
                  Code Reviewer
                </label>
                <textarea
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Paste your code here..."
                  rows={6}
                  className="mt-2 w-full rounded-lg border border-input bg-card p-3 font-mono text-xs text-foreground placeholder:text-muted-foreground"
                />
                <button
                  onClick={() => setReviewed(true)}
                  className="mt-2 min-h-11 w-full rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground sm:w-auto sm:px-6"
                >
                  Review My Code
                </button>
                {reviewed && (
                  <ul className="mt-3 space-y-2">
                    {codeReview.map((r) => (
                      <li key={r.label} className="rounded-lg border border-border bg-card p-3">
                        <p
                          className={cn(
                            "text-xs font-bold uppercase tracking-wider",
                            r.tone === "success" ? "text-[var(--success)]" : "text-primary",
                          )}
                        >
                          {r.label}
                        </p>
                        <p className="mt-1 text-sm text-foreground">{r.text}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </section>

          {/* Secondary accordions */}
          <Accordion type="single" collapsible className="surface-card px-4">
            <AccordionItem value="req" className="border-border">
              <AccordionTrigger className="text-sm font-bold">Requirements</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1.5">
                  {requirements.map((r) => (
                    <li key={r} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {r}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="help" className="border-0">
              <AccordionTrigger className="text-sm font-bold">
                <span className="inline-flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" aria-hidden="true" /> Need Help?
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <ol className="list-inside list-decimal space-y-1.5 text-sm text-muted-foreground">
                  {helpSteps.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Proof of work */}
        <div className="grid min-w-0 content-start gap-4">
          <section className="surface-card p-4">
            <h2 className="text-sm font-bold text-foreground">Submit Your Proof</h2>
            <div className="mt-3 grid gap-3">
              {(
                [
                  ["github", "GitHub Repository URL", "https://github.com/you/portfolio"],
                  ["commit", "GitHub Commit URL", "https://github.com/you/portfolio/commit/abc123"],
                  ["linkedin", "LinkedIn Post URL", "https://linkedin.com/posts/..."],
                  ["deploy", "Live Deployment URL", "https://your-portfolio.vercel.app"],
                ] as const
              ).map(([key, label, ph]) => (
                <div key={key}>
                  <label htmlFor={key} className="text-xs font-semibold text-foreground">
                    {label}
                  </label>
                  <input
                    id={key}
                    type="url"
                    inputMode="url"
                    placeholder={ph}
                    value={dayState.proof[key]}
                    onChange={(e) => setDay({ proof: { ...dayState.proof, [key]: e.target.value } })}
                    aria-invalid={!!proofErrors[key]}
                    className={cn(
                      "mt-1 min-h-11 w-full rounded-lg border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground",
                      proofErrors[key] ? "border-destructive" : "border-input",
                    )}
                  />
                  {proofErrors[key] && (
                    <p className="mt-1 text-[11px] font-medium text-destructive">
                      {proofErrors[key]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <ul className="mt-4 space-y-1">
              {[
                "GitHub repository is public",
                "GitHub commit contains today's work",
                "LinkedIn post published",
                "Live deployment works",
              ].map((c, i) => (
                <li key={c}>
                  <label className="flex min-h-10 cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={dayState.submitChecks[i] ?? false}
                      onChange={(e) => {
                        const next = [...dayState.submitChecks];
                        next[i] = e.target.checked;
                        setDay({ submitChecks: next });
                      }}
                      className="h-4.5 w-4.5 shrink-0 accent-[var(--primary)]"
                    />
                    <span className="text-sm text-muted-foreground">{c}</span>
                  </label>
                </li>
              ))}
            </ul>

            <button
              onClick={submit}
              disabled={!canSubmit}
              className="mt-4 min-h-12 w-full rounded-xl bg-primary text-sm font-bold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-45"
            >
              Submit Day {dayNum}
            </button>
            {!canSubmit && (
              <p className="mt-2 text-center text-[11px] text-muted-foreground">
                Add all four valid URLs and tick the checklist to submit.
              </p>
            )}
          </section>

          <section className="surface-card p-4">
            <h2 className="inline-flex items-center gap-2 text-sm font-bold text-foreground">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" /> Quality Check
            </h2>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              <li>No horizontal scrolling at 390px</li>
              <li>Every link opens correctly</li>
              <li>Text is readable without zooming</li>
            </ul>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function SuccessState({
  day,
  xp,
  streak,
  completed,
  onBack,
  linkedinDraft,
  setLinkedinDraft,
  bullet,
  setBullet,
  copy,
}: {
  day: number;
  xp: number;
  streak: number;
  completed: number;
  onBack: () => void;
  linkedinDraft: string | null;
  setLinkedinDraft: (v: string) => void;
  bullet: string | null;
  setBullet: (v: string) => void;
  copy: (t: string) => void;
}) {
  return (
    <div className="mx-auto grid max-w-2xl gap-4">
      <section className="surface-card p-6 text-center">
        <PartyPopper className="mx-auto h-9 w-9 text-primary" aria-hidden="true" />
        <h1 className="mt-3 text-2xl font-extrabold text-foreground">Day {day} Complete!</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your work is now part of your 60-day journey.
        </p>
        <ul className="mt-5 flex flex-wrap justify-center gap-2">
          {["GitHub", "LinkedIn", "Deployment"].map((l) => (
            <li
              key={l}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-semibold text-foreground"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-[var(--success)]" aria-hidden="true" /> {l}{" "}
              ✓
            </li>
          ))}
        </ul>
        <div className="mt-5 grid grid-cols-3 gap-2">
          <Stat label="Day Streak" value={`🔥 ${streak}`} />
          <Stat label="Days" value={`${completed} / 60`} />
          <Stat label="Earned" value="+300 XP" />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Total: {xp.toLocaleString()} XP</p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            onClick={onBack}
            className="min-h-12 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => copy(linkedInPost)}
            className="min-h-12 rounded-xl border border-border-strong px-6 text-sm font-semibold text-foreground"
          >
            Share My Progress
          </button>
        </div>
      </section>

      <section className="surface-card p-4">
        <h2 className="text-sm font-bold text-foreground">Create Your LinkedIn Post</h2>
        <button
          onClick={() => setLinkedinDraft(linkedInPost)}
          className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground"
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" /> Generate with AI
        </button>
        {linkedinDraft !== null && (
          <>
            <textarea
              value={linkedinDraft}
              onChange={(e) => setLinkedinDraft(e.target.value)}
              rows={9}
              className="mt-3 w-full rounded-lg border border-input bg-card p-3 text-sm text-foreground"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                onClick={() => copy(linkedinDraft)}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-border-strong px-4 text-xs font-semibold text-foreground"
              >
                <ClipboardCopy className="h-3.5 w-3.5" aria-hidden="true" /> Copy
              </button>
              <button
                onClick={() => setLinkedinDraft(linkedInPost)}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-border-strong px-4 text-xs font-semibold text-foreground"
              >
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" /> Regenerate
              </button>
              <span className="inline-flex min-h-10 items-center px-2 text-xs text-muted-foreground">
                Edit directly above
              </span>
            </div>
          </>
        )}
      </section>

      <section className="surface-card p-4">
        <h2 className="text-sm font-bold text-foreground">
          Turn This Project Into a Resume Bullet
        </h2>
        <button
          onClick={() => setBullet(resumeBullet)}
          className="mt-3 min-h-11 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground"
        >
          Generate Resume Bullet
        </button>
        {bullet && (
          <div className="mt-3 rounded-lg border-l-2 border-primary bg-muted p-3">
            <p className="text-sm text-foreground">{bullet}</p>
            <button
              onClick={() => copy(bullet)}
              className="mt-2 inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-border-strong px-3 text-xs font-semibold text-foreground"
            >
              <ClipboardCopy className="h-3.5 w-3.5" aria-hidden="true" /> Copy
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted px-2 py-3">
      <p className="text-sm font-extrabold text-foreground">{value}</p>
      <p className="mt-0.5 text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}
