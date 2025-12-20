import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type BadgeTone = "subtle" | "accent" | "warning" | "success" | "critical";

const toneStyles: Record<BadgeTone, string> = {
  subtle: "bg-white/5 text-muted border-white/10",
  accent: "bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)]/40",
  warning: "bg-amber-500/15 text-amber-300 border-amber-400/40",
  success: "bg-emerald-500/15 text-emerald-300 border-emerald-400/40",
  critical: "bg-[var(--brand-2)]/15 text-[var(--brand-2)] border-[var(--brand-2)]/35",
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

export function Badge({ className, tone = "subtle", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-[var(--radius-pill)] px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        toneStyles[tone],
        className,
      )}
      {...props}
    />
  );
}
