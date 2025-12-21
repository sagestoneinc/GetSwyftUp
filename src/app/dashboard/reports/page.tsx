'use client';

import { useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPayouts, getContractors } from "@/data/dashboard";
import { Role } from "@/config/roles";
import { useRole } from "@/components/dashboard/role-provider";

export default function ReportsPage() {
  const role = useRole();
  const payouts = getPayouts();
  const contractorMap = useMemo(
    () => Object.fromEntries(getContractors().map((c) => [c.id, c.name])),
    [],
  );
  const unauthorized = ![Role.SUPER_ADMIN, Role.OWNER, Role.FINANCE_ADMIN].includes(role);

  const escapeCsvValue = (value: unknown) => {
    const str = String(value ?? "");
    if (/[",\n]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  if (unauthorized) {
    return <p className="text-sm text-muted">Reports are limited to finance roles.</p>;
  }

  const exportCsv = () => {
    const rows = [
      ["Payout ID", "Contractor", "Amount", "Currency", "Status", "Created"],
      ...payouts.map((p) => [
        p.id,
        contractorMap[p.contractorId] ?? "",
        p.amount,
        p.currency,
        p.status,
        p.createdAt,
      ]),
    ];
    const csv = rows.map((r) => r.map(escapeCsvValue).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "payout-history.csv";
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-muted">Reports</p>
          <h1 className="font-display text-2xl font-semibold">Audit-ready exports</h1>
        </div>
        <Badge tone="subtle">CSV export ready</Badge>
      </div>

      <Card className="bg-panel/80">
        <CardHeader className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted">Payout history</p>
            <p className="text-xs text-muted">Filter by status and export</p>
          </div>
          <Button onClick={exportCsv}>Export CSV</Button>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-[0.12em] text-muted">
              <tr>
                <th className="py-2 pr-4">Payout</th>
                <th className="py-2 pr-4">Contractor</th>
                <th className="py-2 pr-4">Amount</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {payouts.map((p) => (
                <tr key={p.id}>
                  <td className="py-3 pr-4 font-semibold">{p.id}</td>
                  <td className="py-3 pr-4 text-muted">{contractorMap[p.contractorId]}</td>
                  <td className="py-3 pr-4">
                    {p.amount} {p.currency}
                  </td>
                  <td className="py-3 pr-4 text-muted">{p.status}</td>
                  <td className="py-3 pr-4 text-muted">{p.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card className="bg-panel/80">
        <CardHeader>
          <p className="text-sm text-muted">Contractor spend</p>
          <p className="text-xs text-muted">Summary by contractor and month</p>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {getContractors().map((c) => (
            <div key={c.id} className="rounded-[var(--radius-card)] border border-white/5 bg-white/5 p-3">
              <p className="text-sm font-semibold">{c.name}</p>
              <p className="text-xs text-muted">Currency: {c.currency}</p>
              <p className="text-xs text-muted">Status: {c.status}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
