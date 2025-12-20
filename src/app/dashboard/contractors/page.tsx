import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const contractors = [
  { name: "Harper Lee", role: "Product Design", region: "UK · GBP", status: "Draft" as const },
  { name: "Ravi Menon", role: "Engineering", region: "Singapore · SGD", status: "Approved" as const },
  { name: "Amani Kone", role: "Compliance Ops", region: "Côte d’Ivoire · XOF", status: "Paid" as const },
];

export default function ContractorsPage() {
  return (
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
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <p className="text-sm text-muted">Active roster</p>
            <p className="text-xs text-muted">Status badges show readiness to pay</p>
          </div>
          <Badge tone="subtle">KYC auto-checks on</Badge>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {contractors.length === 0 ? (
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
                  <th className="py-2 pr-4">Role</th>
                  <th className="py-2 pr-4">Region</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {contractors.map((contractor) => (
                  <tr key={contractor.name} className="hover:bg-white/5">
                    <td className="py-3 pr-4 font-semibold">{contractor.name}</td>
                    <td className="py-3 pr-4 text-muted">{contractor.role}</td>
                    <td className="py-3 pr-4 text-muted">{contractor.region}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={contractor.status} />
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
