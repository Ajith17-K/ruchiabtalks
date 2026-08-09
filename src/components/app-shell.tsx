import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Home, ListChecks, TrendingUp, Users } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { student } from "@/data/mock";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", label: "Home", mobileLabel: "Home", Icon: Home },
  { to: "/day/12", label: "Challenges", mobileLabel: "Challenge", Icon: ListChecks },
  { to: "/progress", label: "Progress", mobileLabel: "Progress", Icon: TrendingUp },
  { to: "/community", label: "Community", mobileLabel: "Community", Icon: Users },
] as const;

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn(
        "font-display text-base font-extrabold tracking-[0.16em] text-foreground",
        className,
      )}
    >
      AB<span className="text-primary">TALKS</span>
    </Link>
  );
}

export function Avatar() {
  return (
    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-[11px] font-bold text-secondary-foreground">
      {student.initials}
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-6">
            <Logo />
            <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
              {navItems.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm font-medium",
                    pathname === to || (to !== "/dashboard" && pathname.startsWith(to))
                      ? "bg-primary-soft text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeSwitcher />
            <button
              aria-label="Notifications"
              className="relative hidden h-8 w-8 place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground sm:grid"
            >
              <Bell className="h-4 w-4" aria-hidden="true" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
            </button>
            <Avatar />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-28 pt-5 md:pb-16">{children}</main>

      <nav
        aria-label="Mobile"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur-md md:hidden"
      >
        <ul className="mx-auto grid max-w-md grid-cols-4">
          {navItems.map(({ to, mobileLabel, Icon }) => {
            const active = pathname === to || (to !== "/dashboard" && pathname.startsWith(to));
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={cn(
                    "flex min-h-14 flex-col items-center justify-center gap-1 text-[11px] font-semibold",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-7 w-12 place-items-center rounded-full",
                      active && "bg-primary-soft",
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {mobileLabel}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
