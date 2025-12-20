import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-white/5 bg-[color-mix(in_srgb,var(--panel)_85%,transparent)] shadow-[var(--shadow-soft)] backdrop-blur-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 border-b border-white/5 px-5 pb-4 pt-5",
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: CardProps) {
  return (
    <div className={cn("px-5 py-4", className)} {...props} />
  );
}
