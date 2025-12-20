import { Sidebar, type NavItem } from "@/components/dashboard/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/input";

const navItems: NavItem[] = [
  { name: "Overview", href: "/dashboard" },
  { name: "Contractors", href: "/dashboard/contractors", badge: "8" },
  { name: "Invoices", href: "/dashboard/invoices", badge: "14" },
  { name: "Payouts", href: "/dashboard/payouts", badge: "5" },
  { name: "Billing", href: "/dashboard/billing" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-bg text-text">
      <Sidebar items={navItems} />
      <div className="flex flex-1 flex-col bg-[color-mix(in_srgb,var(--panel)_88%,transparent)]">
        <header className="flex flex-wrap items-center gap-4 border-b border-white/5 px-6 py-4">
          <div className="space-y-1">
            <p className="text-sm text-muted">Workspace</p>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-xl font-semibold">SwyftUp Capital</h1>
              <Badge tone="accent">Verified</Badge>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Select defaultValue="global" className="w-40">
              <option value="global">Global · USD</option>
              <option value="latam">LATAM · MXN</option>
              <option value="apac">APAC · SGD</option>
            </Select>
            <Button variant="secondary">New contractor</Button>
            <Button>Raise payout</Button>
          </div>
        </header>
        <main className="flex-1 space-y-6 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
