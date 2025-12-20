'use client';

import Link from "next/link";
import { useMemo, useState } from "react";
import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { getContractors } from "@/data/dashboard";
import { Role } from "@/config/roles";
import { RoleGuard } from "@/components/dashboard/role-guard";

const contractors = getContractors();

export default function ContractorsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");

  const filtered = useMemo(
    () =>
      contractors.filter(
        (c) =>
          (!search || c.name.toLowerCase().includes(search.toLowerCase())) &&
          (status === "all" || c.status.toLowerCase() === status),
      ),
    [search, status],
  );

  return (
    <RoleGuard
      allowed={[Role.OWNER, Role.FINANCE_ADMIN]}
      fallback={<p className="text-sm text-muted">You do not have access to Contractors.</p>}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.15em] text-muted">Vendors</p>
            <h1 className="font-display text-2xl font-semibold">Contractors</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary">Import list</Button>
            <Button>New contractor</Button>
          </div>
        </div>

        <Card className="bg-panel/80">
          <CardHeader className="flex flex-col gap-4 border-b border-white/5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted">Active roster</p>
              <p className="text-xs text-muted">Status badges show readiness to pay</p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <Input
                placeholder="Search contractor"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-48"
              />
              <Select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full sm:w-40">
                <option value="all">All statuses</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </Select>
            </div>
            <Badge tone="subtle">KYC auto-checks on</Badge>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-8 text-center text-muted">
                <p className="font-semibold text-text">No contractors yet</p>
                <p className="text-sm">Add your first vendor to start onboarding and payouts.</p>
                <Button className="mt-2">Create contractor</Button>
              </div>
            ) : (
              <table className="min-w-full text-sm">
                <thead className="text-left text-xs uppercase tracking-[0.12em] text-muted">
                  <tr>
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Country</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4">Preferred currency</th>
                    <th className="py-2 pr-4">Card issued</th>
                    <th className="py-2 pr-4">Last payout</th>
                    <th className="py-2 pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map((contractor) => (
                    <tr key={contractor.id} className="hover:bg-white/5">
                      <td className="py-3 pr-4 font-semibold">
                        <Link href={`/dashboard/contractors/${contractor.id}`} className="text-[var(--accent)]">
                          {contractor.name}
                        </Link>
                      </td>
                      <td className="py-3 pr-4 text-muted">{contractor.country}</td>
                      <td className="py-3 pr-4">
                        <StatusBadge status={contractor.status} />
                      </td>
                      <td className="py-3 pr-4 text-muted">{contractor.currency}</td>
                      <td className="py-3 pr-4 text-muted">{contractor.cardIssued ? "Yes" : "No"}</td>
                      <td className="py-3 pr-4 text-muted">
                        {contractor.lastPayout ? `${contractor.lastPayout.date} · ${contractor.lastPayout.amount} ${contractor.lastPayout.currency}` : "—"}
                      </td>
                      <td className="flex flex-wrap gap-2 py-3 pr-4">
                        <Button size="sm" variant="secondary" asChild>
                          <Link href={`/dashboard/contractors/${contractor.id}`}>View profile</Link>
                        </Button>
                        <Button size="sm" variant="secondary">
                          Issue card
                        </Button>
                        <Button size="sm" variant="secondary">
                          Request info
                        </Button>
                        <Button size="sm" variant="secondary">
                          Suspend
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </div>
    </RoleGuard>
  );
}
