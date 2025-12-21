'use client';

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { getApprovalItems, getContractors, getApprovalRules, getActivities } from "@/data/dashboard";
import { Role } from "@/config/roles";
import { useRole } from "@/components/dashboard/role-provider";

const items = getApprovalItems();
const contractorMap = Object.fromEntries(getContractors().map((c) => [c.id, c.name]));
const rules = getApprovalRules();
const activity = getActivities().slice(0, 5);

export default function ApprovalsPage() {
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [team, setTeam] = useState("finance");
  const [amount, setAmount] = useState(50000);
  const [selectedId, setSelectedId] = useState(items[0]?.id);
  const role = useRole();
  const unauthorized = ![Role.SUPER_ADMIN, Role.OWNER, Role.FINANCE_ADMIN].includes(role);

  const filtered = useMemo(
    () =>
      items.filter(
        (item) =>
          (type === "all" || item.entityType.toLowerCase() === type) &&
          (status === "all" || item.status.toLowerCase() === status) &&
          item.amount <= amount,
      ),
    [type, status, amount],
  );

  const selected = filtered.find((f) => f.id === selectedId) ?? filtered[0];

  if (unauthorized) {
    return <p className="text-sm text-muted">Approvals inbox is only available to finance roles.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-muted">Inbox</p>
          <h1 className="font-display text-2xl font-semibold">Approvals</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary">Bulk approve</Button>
          <Button>New rule</Button>
        </div>
      </div>

      <Card className="bg-panel/80">
        <CardHeader className="flex flex-col gap-4 border-b border-white/5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted">Filter</p>
            <p className="text-xs text-muted">Triage by type, status, team, and amount.</p>
          </div>
          <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-4">
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="all">All types</option>
              <option value="invoice">Invoice</option>
              <option value="payout">Payout</option>
            </Select>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="all">All status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </Select>
            <Select value={team} onChange={(e) => setTeam(e.target.value)}>
              <option value="finance">Finance</option>
              <option value="ops">Ops</option>
              <option value="owner">Owner</option>
            </Select>
            <div>
              <label className="text-xs text-muted">Amount ≤ ${amount.toLocaleString()}</label>
              <Input
                type="range"
                min={0}
                max={100000}
                step={5000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="overflow-x-auto rounded-[var(--radius-card)] border border-white/5 bg-white/5">
            <table className="min-w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-[0.12em] text-muted">
                <tr>
                  <th className="py-2 pr-4">Type</th>
                  <th className="py-2 pr-4">Entity</th>
                  <th className="py-2 pr-4">Contractor</th>
                  <th className="py-2 pr-4">Amount</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="cursor-pointer hover:bg-white/5"
                    onClick={() => setSelectedId(item.id)}
                  >
                    <td className="py-3 pr-4">{item.entityType}</td>
                    <td className="py-3 pr-4 font-semibold">{item.entityId}</td>
                    <td className="py-3 pr-4 text-muted">{contractorMap[item.contractorId] ?? "—"}</td>
                    <td className="py-3 pr-4">
                      {item.amount.toLocaleString()} {item.currency}
                    </td>
                    <td className="py-3 pr-4 text-muted">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 rounded-[var(--radius-card)] border border-white/5 bg-white/5 p-4">
            {selected ? (
              <>
                <Badge tone="accent">{selected.entityType}</Badge>
                <h3 className="text-lg font-semibold">{selected.entityId}</h3>
                <p className="text-sm text-muted">
                  Contractor: {contractorMap[selected.contractorId] ?? "—"}
                </p>
                <p className="text-sm text-muted">
                  Amount: {selected.amount.toLocaleString()} {selected.currency}
                </p>
                <p className="text-sm text-muted">Status: {selected.status}</p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm">Approve</Button>
                  <Button size="sm" variant="secondary">
                    Reject
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted">Select an approval item to review.</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-panel/80">
        <CardHeader className="flex flex-col gap-2 border-b border-white/5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.15em] text-muted">Rules</p>
            <h2 className="font-display text-xl font-semibold">Approval rules</h2>
          </div>
          <Button size="sm" variant="secondary">
            Edit rules
          </Button>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {rules.map((rule) => (
            <div key={rule.id} className="rounded-[var(--radius-card)] border border-white/5 bg-white/5 p-3">
              <p className="text-sm font-semibold">
                {rule.type} &gt; {rule.threshold.toLocaleString()} {rule.currency}
              </p>
              <p className="text-xs text-muted">Approver: {rule.approverRole}</p>
              <p className="text-xs text-muted">Created: {rule.createdAt}</p>
            </div>
          ))}
          <div className="rounded-[var(--radius-card)] border border-dashed border-white/10 p-3 text-sm text-muted">
            Add rule to require OWNER sign-off above thresholds.
          </div>
        </CardContent>
      </Card>

      <Card className="bg-panel/80">
        <CardHeader>
          <p className="text-sm text-muted">Audit log</p>
        </CardHeader>
        <CardContent className="space-y-2">
          {activity.map((log) => (
            <div key={log.id} className="flex items-center justify-between rounded-[var(--radius-card)] border border-white/5 bg-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-semibold">{log.message}</p>
                <p className="text-xs text-muted">
                  {log.actor} · {new Date(log.createdAt).toLocaleString()}
                </p>
              </div>
              <Badge tone="accent">{log.type}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
