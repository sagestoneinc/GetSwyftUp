'use client';

import { useMemo, useState } from "react";
import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { getInvoices, getContractors } from "@/data/dashboard";
import { useRole } from "@/components/dashboard/role-provider";
import { Role } from "@/config/roles";

const invoices = getInvoices();
const contractorMap = Object.fromEntries(getContractors().map((c) => [c.id, c.name]));

export default function InvoicesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const role = useRole();
  const unauthorized = ![Role.OWNER, Role.FINANCE_ADMIN].includes(role);

  const filtered = useMemo(
    () =>
      invoices.filter(
        (inv) =>
          (!search || inv.id.toLowerCase().includes(search.toLowerCase())) &&
          (status === "all" || inv.status.toLowerCase() === status),
      ),
    [search, status],
  );

  if (unauthorized) {
    return <p className="text-sm text-muted">Invoices are available to finance roles only.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-muted">Billing</p>
          <h1 className="font-display text-2xl font-semibold">Invoices</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary">Upload invoice</Button>
          <Button>Generate invoice</Button>
        </div>
      </div>

      <Card className="bg-panel/80">
        <CardHeader className="flex flex-col gap-4 border-b border-white/5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted">Pending and recent invoices</p>
            <p className="text-xs text-muted">Filters help you triage approvals quickly.</p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <Input
              placeholder="Search invoice #"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-44"
            />
            <Select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full sm:w-40">
              <option value="all">All statuses</option>
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="pending approval">Pending approval</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="paid">Paid</option>
            </Select>
          </div>
          <Badge tone="subtle">Auto-matching enabled</Badge>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center text-muted">
              <p className="font-semibold text-text">No invoices recorded</p>
              <p className="text-sm">Upload or generate an invoice to track payable items.</p>
              <Button className="mt-2">Add invoice</Button>
            </div>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-[0.12em] text-muted">
                <tr>
                  <th className="py-2 pr-4">Invoice</th>
                  <th className="py-2 pr-4">Contractor</th>
                  <th className="py-2 pr-4">Amount</th>
                  <th className="py-2 pr-4">Currency</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Submitted</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-white/5">
                    <td className="py-3 pr-4 font-semibold">{invoice.id}</td>
                    <td className="py-3 pr-4 text-muted">{contractorMap[invoice.contractorId] ?? "—"}</td>
                    <td className="py-3 pr-4">{invoice.amount.toLocaleString()}</td>
                    <td className="py-3 pr-4 text-muted">{invoice.currency}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={invoice.status} />
                    </td>
                    <td className="py-3 pr-4 text-muted">{invoice.submittedAt}</td>
                    <td className="flex flex-wrap gap-2 py-3 pr-4">
                      <Button size="sm" variant="secondary">
                        Review
                      </Button>
                      <Button size="sm">Approve</Button>
                      <Button size="sm" variant="secondary">
                        Reject
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
  );
}
