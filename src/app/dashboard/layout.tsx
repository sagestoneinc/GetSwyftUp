import { Sidebar } from "@/components/dashboard/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/input";
import { getNavForRole } from "@/config/roles";
import { getCurrentUser } from "@/lib/current-user";
import { RoleProvider } from "@/components/dashboard/role-provider";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const navItems = getNavForRole(user.role);

  return (
    <RoleProvider role={user.role} userId={user.id} name={user.name}>
      <div className="flex min-h-screen bg-bg text-text">
        <Sidebar items={navItems} />
        <div className="flex flex-1 flex-col bg-[color-mix(in_srgb,var(--panel)_88%,transparent)]">
          <header className="flex flex-wrap items-center gap-4 border-b border-white/5 px-6 py-4">
            <div className="space-y-1">
              <p className="text-sm text-muted">Workspace</p>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl font-semibold">SwyftUp Capital</h1>
                <Badge tone="accent">Verified</Badge>
                <Badge tone="subtle">{user.role.toLowerCase()}</Badge>
              </div>
            </div>
            <div className="ml-auto flex flex-wrap items-center gap-3">
              <Select defaultValue="global" className="w-44">
                <option value="global">Global · USD</option>
                <option value="latam">LATAM · MXN</option>
                <option value="apac">APAC · SGD</option>
              </Select>
              <Button variant="secondary">Notifications</Button>
              <Button variant="secondary" asChild>
                <Link href="/help" aria-label="Help center">
                  Help
                </Link>
              </Button>
              <Button variant="secondary">{user.name}</Button>
            </div>
          </header>
          <main className="flex-1 space-y-6 px-6 py-6">{children}</main>
        </div>
      </div>
    </RoleProvider>
  );
}
