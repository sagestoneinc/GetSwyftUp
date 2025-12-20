import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const stats = [
  { label: "Ready to release", value: "$182,400", hint: "Across 24 contractors" },
  { label: "In review", value: "$64,900", hint: "Awaiting dual approval" },
  { label: "Exception holds", value: "$14,200", hint: "Triggered by policy" },
];

const recent = [
  { name: "Nordic UX Collective", amount: "$18,600", status: "Approved" as const, region: "EUR · Remote" },
  { name: "Harper Lee", amount: "$6,450", status: "Draft" as const, region: "GBP · UK" },
  { name: "Ravi Menon", amount: "$9,200", status: "Paid" as const, region: "SGD · SG" },
  { name: "Amani Kone", amount: "$12,880", status: "Failed" as const, region: "XOF · CI" },
];

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-white/5">
            <CardHeader>
              <p className="text-sm text-muted">{stat.label}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className="text-xs text-muted">{stat.hint}</p>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="bg-panel/80">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.15em] text-muted">Recent payouts</p>
              <h2 className="font-display text-xl font-semibold">Live ledger</h2>
            </div>
            <Badge tone="subtle">Auto-export enabled</Badge>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-[0.12em] text-muted">
              <tr>
                <th className="py-2 pr-4">Recipient</th>
                <th className="py-2 pr-4">Region</th>
                <th className="py-2 pr-4">Amount</th>
                <th className="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recent.map((row) => (
                <tr key={row.name} className="hover:bg-white/5">
                  <td className="py-3 pr-4 font-semibold">{row.name}</td>
                  <td className="py-3 pr-4 text-muted">{row.region}</td>
                  <td className="py-3 pr-4">{row.amount}</td>
                  <td className="py-3 pr-4">
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
