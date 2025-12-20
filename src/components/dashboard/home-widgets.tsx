'use client';

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ActionItem, ActivityLog, KPI } from "@/data/dashboard";

export function KPIGrid({ items }: { items: KPI[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Link key={item.label} href={item.href} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/40">
          <Card className="bg-white/5">
            <CardHeader className="border-0">
              <p className="text-sm text-muted">{item.label}</p>
              <p className="text-2xl font-semibold">{item.value}</p>
              <p className="text-xs text-[var(--brand-2)]">{item.delta}</p>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export function ActionRequiredPanel({ items }: { items: ActionItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const activeItem = useMemo(() => items.find((i) => i.id === activeId), [items, activeId]);

  return (
    <Card className="bg-panel/80">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-muted">Action required</p>
          <h2 className="font-display text-xl font-semibold">Prioritized items</h2>
          <p className="text-sm text-muted">Resolve high-risk blockers before releasing funds.</p>
        </div>
        <Badge tone="subtle">Top {items.length}</Badge>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-white/5 bg-white/5 p-4 hover:border-[var(--accent)]/40"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge tone="accent">{item.type}</Badge>
                  <p className="text-sm font-semibold">{item.summary}</p>
                </div>
                <span className="text-xs text-muted">
                  {new Date(item.timestamp).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </span>
              </div>
              <p className="text-sm text-muted">{item.reason}</p>
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={() => setActiveId(item.id)}>
                  {item.cta}
                </Button>
                <Link href={item.targetHref} className="text-sm text-[var(--accent)] underline underline-offset-4">
                  Open details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[var(--radius-card)] border border-white/5 bg-white/5 p-4">
          {activeItem ? (
            <>
              <div className="flex items-center gap-2">
                <Badge tone="accent">{activeItem.type}</Badge>
                <p className="text-sm font-semibold">{activeItem.summary}</p>
              </div>
              <p className="mt-2 text-sm text-muted">{activeItem.reason}</p>
              <div className="mt-4 space-y-2 rounded-[var(--radius-card)] border border-white/5 bg-panel/70 p-3 text-sm">
                <p>Why this matters</p>
                <ul className="list-disc pl-4 text-muted">
                  <li>Prevents payout delays</li>
                  <li>Keeps audit trail clean</li>
                  <li>Unblocks contractor experience</li>
                </ul>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Button asChild>
                  <Link href={activeItem.targetHref}>{activeItem.cta}</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/dashboard/approvals">View inbox</Link>
                </Button>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted">Select an action to see details.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function LifecycleFunnel({
  steps,
}: {
  steps: Array<{ label: string; count: number; value: string; href: string }>;
}) {
  return (
    <Card className="bg-panel/80">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-muted">Lifecycle</p>
          <h2 className="font-display text-xl font-semibold">Contractor → Paid</h2>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-4">
        {steps.map((step) => (
          <Link key={step.label} href={step.href} className="rounded-[var(--radius-card)] border border-white/5 bg-white/5 p-3 transition hover:border-[var(--accent)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/40">
            <p className="text-xs uppercase tracking-[0.14em] text-muted">{step.label}</p>
            <p className="text-xl font-semibold">{step.count}</p>
            <p className="text-xs text-muted">{step.value}</p>
            <div className="mt-2 h-1 rounded-full bg-white/10">
              <div className="h-1 rounded-full bg-[var(--accent)]" style={{ width: `${Math.min(100, step.count * 8)}%` }} />
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

export function ActivityFeed({ items }: { items: ActivityLog[] }) {
  return (
    <Card className="bg-panel/80">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-muted">Audit</p>
          <h2 className="font-display text-xl font-semibold">Recent activity</h2>
        </div>
        <Badge tone="subtle">Last 20</Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-[var(--radius-card)] border border-white/5 bg-white/5 px-3 py-2">
            <div className="space-y-1">
              <p className="text-sm font-semibold">{item.message}</p>
              <p className="text-xs text-muted">
                {item.actor} · {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
            <Badge tone="accent">{item.type}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function FinancialOverview({
  volumeSeries,
  currencyMix,
}: {
  volumeSeries: Array<{ month: string; value: number }>;
  currencyMix: Array<{ currency: string; value: number }>;
}) {
  return (
    <Card className="bg-panel/80">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-muted">Financials</p>
          <h2 className="font-display text-xl font-semibold">Overview</h2>
        </div>
        <Badge tone="subtle">Last 6 months</Badge>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-sm text-muted">Monthly payout volume</p>
          <div className="flex items-end gap-3">
            {volumeSeries.map((point) => (
              <div key={point.month} className="flex flex-col items-center gap-2">
                <div
                  className="w-10 rounded-[var(--radius-card)] bg-[var(--accent)]/70"
                  style={{ height: `${Math.max(10, point.value / 1500)}px` }}
                />
                <p className="text-xs text-muted">{point.month}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted">Top currencies</p>
          <div className="space-y-2">
            {currencyMix.map((mix) => (
              <div key={mix.currency}>
                <div className="flex items-center justify-between text-sm">
                  <span>{mix.currency}</span>
                  <span className="text-muted">{mix.value}%</span>
                </div>
                <div className="mt-1 h-1 rounded-full bg-white/10">
                  <div className="h-1 rounded-full bg-[var(--accent)]" style={{ width: `${mix.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
