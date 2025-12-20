import { withdrawPayoutAction, getDb } from "@/lib/mock-db";
import { formatCurrency } from "@/lib/format";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { StatusBadge } from "@/components/status-badge";

export default function WithdrawPage() {
  const db = getDb();
  const contractorWallets = db.wallets.filter((w) => w.ownerType === "CONTRACTOR");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Fast bank withdrawal (low FX, real rates)</p>
          <h1 className="font-display text-2xl font-semibold">Powered by Wise</h1>
          <p className="text-sm text-muted">Cheapest rail for overseas contractors. FX shown up front.</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <p className="text-sm text-muted">Create withdrawal</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <form className="space-y-3" action={withdrawPayoutAction}>
              <Select name="contractorId" required>
                <option value="">Choose contractor</option>
                {contractorWallets.map((w) => {
                  const contractor = db.contractors.find((c) => c.id === w.ownerId);
                  return (
                    <option key={w.id} value={w.ownerId}>
                      {contractor?.name} · {formatCurrency(w.balance, w.currency)}
                    </option>
                  );
                })}
              </Select>
              <Input name="amount" type="number" min="1" step="1" placeholder="Amount" required />
              <Select name="destinationCurrency" required defaultValue="USD">
                <option value="USD">USD</option>
                <option value="MXN">MXN</option>
                <option value="EUR">EUR</option>
              </Select>
              <Button type="submit" className="w-full">
                Request withdrawal via Wise
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-sm text-muted">Recent withdrawals</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {db.payouts.slice(0, 5).map((payout) => {
              const contractor = db.contractors.find((c) => c.id === payout.contractorId);
              const feeLabel = payout.fxFee ? `Fee ${formatCurrency(payout.fxFee, payout.sourceCurrency)}` : "No fee";
              return (
                <div key={payout.id} className="rounded-[var(--radius-card)] border border-white/5 p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{contractor?.name}</p>
                    <StatusBadge status={payout.status} />
                  </div>
                  <p className="text-sm text-muted">
                    {formatCurrency(payout.amount, payout.sourceCurrency)} → {payout.destinationCurrency} @ {payout.fxRate} ·{" "}
                    {feeLabel}
                  </p>
                  <p className="text-xs text-muted">Powered by Wise • {payout.providerRef}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
