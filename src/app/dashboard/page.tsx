import { Role } from "@/config/roles";
import { getCurrentUser } from "@/lib/current-user";
import {
  getKPIs,
  getActionRequired,
  getLifecycleFunnel,
  getActivities,
  getChecklist,
  getPayouts,
  getCards,
  getTransactions,
  getContractors,
} from "@/data/dashboard";
import {
  ActionRequiredPanel,
  ActivityFeed,
  FinancialOverview,
  KPIGrid,
  LifecycleFunnel,
} from "@/components/dashboard/home-widgets";
import { SetupChecklistCard } from "@/components/dashboard/setup-checklist";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function DashboardOverviewPage() {
  const user = await getCurrentUser();
  const isContractor = user.role === Role.CONTRACTOR;

  if (isContractor) {
    const contractor = getContractors()[0];
    const payouts = getPayouts().filter((p) => p.contractorId === contractor?.id).slice(0, 3);
    const card = getCards().find((c) => c.contractorId === contractor?.id);
    const txns = getTransactions().filter((t) => (card ? t.cardId === card.id : true)).slice(0, 5);

    return (
      <div className="space-y-6">
        <KPIGrid items={getKPIs(user.role)} />

        <Card className="bg-panel/80">
          <CardHeader>
            <p className="text-sm uppercase tracking-[0.15em] text-muted">Profile completion</p>
            <h2 className="font-display text-xl font-semibold">Keep your payouts smooth</h2>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3">
            {[
              { label: "Upload tax form", complete: false },
              { label: "Verify payout method", complete: true },
              { label: "Enable notifications", complete: false },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[var(--radius-card)] border border-white/5 bg-white/5 p-3 text-sm"
              >
                <p className="font-semibold">{item.label}</p>
                <p className="text-xs text-muted">{item.complete ? "Completed" : "Required"}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-panel/80">
          <CardHeader>
            <p className="text-sm uppercase tracking-[0.15em] text-muted">Balance & payouts</p>
            <h2 className="font-display text-xl font-semibold">Your payout overview</h2>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[var(--radius-card)] border border-white/5 bg-white/5 p-4">
              <p className="text-sm text-muted">Available balance</p>
              <p className="text-2xl font-semibold">$8,400</p>
              <p className="text-xs text-muted">Last updated today</p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-white/5 bg-white/5 p-4">
              <p className="text-sm text-muted">Upcoming payouts</p>
              <ul className="mt-2 space-y-1 text-sm text-muted">
                {payouts.map((p) => (
                  <li key={p.id}>
                    {p.id} — {p.amount} {p.currency} ({p.status})
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[var(--radius-card)] border border-white/5 bg-white/5 p-4">
              <p className="text-sm text-muted">Virtual card</p>
              <p className="text-xl font-semibold">{card ? `**** ${card.last4}` : "Not issued"}</p>
              <p className="text-xs text-muted">{card?.status ?? "Tap to request a card"}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-panel/80">
          <CardHeader className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.15em] text-muted">Recent transactions</p>
              <h2 className="font-display text-xl font-semibold">Card + payout history</h2>
            </div>
            <Badge tone="subtle">{txns.length} records</Badge>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-[0.12em] text-muted">
                <tr>
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Merchant</th>
                  <th className="py-2 pr-4">Amount</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {txns.map((txn) => (
                  <tr key={txn.id}>
                    <td className="py-3 pr-4">{txn.createdAt}</td>
                    <td className="py-3 pr-4 text-muted">{txn.merchant}</td>
                    <td className="py-3 pr-4">
                      {txn.amount} {txn.currency}
                    </td>
                    <td className="py-3 pr-4 text-muted">{txn.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    );
  }

  const checklist = getChecklist(user.id);
  const funnel = getLifecycleFunnel();
  const activity = getActivities();
  const kpis = getKPIs(user.role);
  const actionItems = getActionRequired(user.role);

  return (
    <div className="space-y-6">
      <SetupChecklistCard items={checklist} userId={user.id} />
      <KPIGrid items={kpis} />
      <ActionRequiredPanel items={actionItems} />
      <LifecycleFunnel steps={funnel} />
      <ActivityFeed items={activity} />
      <FinancialOverview
        volumeSeries={[
          { month: "Jul", value: 12000 },
          { month: "Aug", value: 15500 },
          { month: "Sep", value: 16200 },
          { month: "Oct", value: 17400 },
          { month: "Nov", value: 18200 },
          { month: "Dec", value: 19500 },
        ]}
        currencyMix={[
          { currency: "USD", value: 55 },
          { currency: "GBP", value: 18 },
          { currency: "EUR", value: 12 },
          { currency: "MXN", value: 10 },
          { currency: "SGD", value: 5 },
        ]}
      />
    </div>
  );
}
