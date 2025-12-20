export enum Role {
  OWNER = "OWNER",
  FINANCE_ADMIN = "FINANCE_ADMIN",
  CONTRACTOR = "CONTRACTOR",
}

export type PermissionScope = {
  canAccess: Array<
    | "/dashboard"
    | "/dashboard/contractors"
    | "/dashboard/contractors/[id]"
    | "/dashboard/invoices"
    | "/dashboard/approvals"
    | "/dashboard/payouts"
    | "/dashboard/cards"
    | "/dashboard/reports"
    | "/dashboard/integrations"
    | "/dashboard/settings"
  >;
};

export type NavLink = { name: string; href: string };

const baseNav: Record<Role, NavLink[]> = {
  [Role.OWNER]: [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Contractors", href: "/dashboard/contractors" },
    { name: "Invoices", href: "/dashboard/invoices" },
    { name: "Approvals", href: "/dashboard/approvals" },
    { name: "Payouts", href: "/dashboard/payouts" },
    { name: "Cards", href: "/dashboard/cards" },
    { name: "Reports", href: "/dashboard/reports" },
    { name: "Integrations", href: "/dashboard/integrations" },
    { name: "Settings", href: "/dashboard/settings" },
  ],
  [Role.FINANCE_ADMIN]: [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Contractors", href: "/dashboard/contractors" },
    { name: "Invoices", href: "/dashboard/invoices" },
    { name: "Approvals", href: "/dashboard/approvals" },
    { name: "Payouts", href: "/dashboard/payouts" },
    { name: "Cards", href: "/dashboard/cards" },
    { name: "Reports", href: "/dashboard/reports" },
    { name: "Integrations", href: "/dashboard/integrations" },
    { name: "Settings", href: "/dashboard/settings" },
  ],
  [Role.CONTRACTOR]: [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Payouts", href: "/dashboard/payouts" },
    { name: "Cards", href: "/dashboard/cards" },
    { name: "Settings", href: "/dashboard/settings" },
  ],
};

export const rolePermissions: Record<Role, PermissionScope> = {
  [Role.OWNER]: {
    canAccess: [
      "/dashboard",
      "/dashboard/contractors",
      "/dashboard/contractors/[id]",
      "/dashboard/invoices",
      "/dashboard/approvals",
      "/dashboard/payouts",
      "/dashboard/cards",
      "/dashboard/reports",
      "/dashboard/integrations",
      "/dashboard/settings",
    ],
  },
  [Role.FINANCE_ADMIN]: {
    canAccess: [
      "/dashboard",
      "/dashboard/contractors",
      "/dashboard/contractors/[id]",
      "/dashboard/invoices",
      "/dashboard/approvals",
      "/dashboard/payouts",
      "/dashboard/cards",
      "/dashboard/reports",
      "/dashboard/integrations",
      "/dashboard/settings",
    ],
  },
  [Role.CONTRACTOR]: {
    canAccess: ["/dashboard", "/dashboard/payouts", "/dashboard/cards", "/dashboard/settings"],
  },
};

export function getNavForRole(role: Role): NavLink[] {
  return baseNav[role] ?? baseNav[Role.CONTRACTOR];
}

export function canAccessPath(role: Role, path: PermissionScope["canAccess"][number]) {
  const permissions = rolePermissions[role];
  if (!permissions) return false;
  return permissions.canAccess.includes(path);
}
