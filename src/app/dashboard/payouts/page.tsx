import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const payouts = [
  { id: "PAY-8821", corridor: "USD → MXN", recipient: "Marisol Vega", amount: "$4,800", status: "Approved" as const },
  { id: "PAY-8822", corridor: "USD → NGN", recipient: "Kola Adeyemi", amount: "$3,200", status: "Draft" as const },
  { id: "PAY-8823", corridor: "EUR → INR", recipient: "Isha Patel", amount: "$6,100", status: "Paid" as const },
];

export default function PayoutsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-muted">Releases</p>
          <h1 className="font-display text-2xl font-semibold">Payouts</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary">Schedule</Button>
          <Button>Release funds</Button>
        </div>
      </div>

      <Card className="bg-panel/80">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <p className="text-sm text-muted">Upcoming releases</p>
            <p className="text-xs text-muted">Clarity on every payment corridor</p>
          </div>
          <Badge tone="subtle">FX lock active</Badge>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {payouts.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center text-muted">
              <p className="font-semibold text-text">No payouts scheduled</p>
              <p className="text-sm">Schedule your next release to keep contractors informed.</p>
              <Button className="mt-2">Schedule payout</Button>
            </div>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-[0.12em] text-muted">
                <tr>
                  <th className="py-2 pr-4">ID</th>
                  <th className="py-2 pr-4">Corridor</th>
                  <th className="py-2 pr-4">Recipient</th>
                  <th className="py-2 pr-4">Amount</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {payouts.map((payout) => (
                  <tr key={payout.id} className="hover:bg-white/5">
                    <td className="py-3 pr-4 font-semibold">{payout.id}</td>
                    <td className="py-3 pr-4 text-muted">{payout.corridor}</td>
                    <td className="py-3 pr-4 text-muted">{payout.recipient}</td>
                    <td className="py-3 pr-4">{payout.amount}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={payout.status} />
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
