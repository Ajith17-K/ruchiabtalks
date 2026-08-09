import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { community } from "@/data/mock";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "What Builders Are Creating | ABTalks" },
      {
        name: "description",
        content: "See what other students are building during their 60-day coding challenge.",
      },
      { property: "og:title", content: "What Builders Are Creating — ABTalks" },
      {
        property: "og:description",
        content: "Learning visibility and inspiration from other builders.",
      },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-2xl">
        <h1 className="text-xl font-extrabold text-foreground">What Builders Are Creating</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Inspiration from the community — demo data.
        </p>
        <ul className="mt-4 grid gap-3">
          {community.map((c) => (
            <li key={c.name} className="surface-card p-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-[11px] font-bold text-secondary-foreground">
                  {c.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-foreground">{c.name}</p>
                  <p className="truncate text-xs font-medium text-primary">{c.day}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{c.text}</p>
              <button className="mt-3 inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-border-strong px-4 text-xs font-semibold text-foreground">
                View Project <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}
