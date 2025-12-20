'use client';

import type { Role } from "@/config/roles";
import { useRole } from "@/components/dashboard/role-provider";

export function RoleGuard({
  allowed,
  children,
  fallback,
}: {
  allowed: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const role = useRole();
  if (allowed.includes(role)) return <>{children}</>;
  return (
    fallback ?? (
      <div className="rounded-[var(--radius-card)] border border-white/10 bg-panel/70 p-6 text-sm text-muted">
        You don&apos;t have access to this area with your current role.
      </div>
    )
  );
}
