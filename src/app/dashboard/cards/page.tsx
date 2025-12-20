'use client';

import { useMemo, useState } from "react";
import { Card as UiCard, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCards, getContractors, getTransactions } from "@/data/dashboard";
import { useRole } from "@/components/dashboard/role-provider";
import { Role } from "@/config/roles";

const cards = getCards();
const contractorMap = Object.fromEntries(getContractors().map((c) => [c.id, c.name]));

export default function CardsPage() {
  const role = useRole();
  const [frozenIds, setFrozenIds] = useState<string[]>([]);

  const toggleFreeze = (cardId: string) => {
    setFrozenIds((prev) => (prev.includes(cardId) ? prev.filter((id) => id !== cardId) : [...prev, cardId]));
  };

  const txns = getTransactions();
  const displayCards = useMemo(
    () =>
      cards.map((card) => ({
        ...card,
        status: frozenIds.includes(card.id) ? "Frozen" : card.status,
      })),
    [frozenIds],
  );

  if (role === Role.CONTRACTOR) {
    const contractorId = getContractors()[0]?.id;
    const card = cards.find((c) => c.contractorId === contractorId);
    const contractorTxns = txns.filter((t) => (card ? t.cardId === card.id : false));

    return (
      <div className="space-y-6">
        <UiCard className="bg-panel/80">
          <CardHeader>
            <p className="text-sm uppercase tracking-[0.15em] text-muted">Card</p>
            <h1 className="font-display text-2xl font-semibold">Virtual card</h1>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted">Card number</p>
            <p className="text-xl font-semibold">{card ? `**** ${card.last4}` : "Not issued"}</p>
            <p className="text-sm text-muted">Status: {card ? card.status : "Request issuance"}</p>
            {card && (
              <Button size="sm" onClick={() => toggleFreeze(card.id)} variant="secondary">
                {frozenIds.includes(card.id) ? "Unfreeze" : "Freeze"}
              </Button>
            )}
          </CardContent>
        </UiCard>

        <UiCard className="bg-panel/80">
          <CardHeader className="flex items-center justify-between">
            <p className="text-sm text-muted">Transactions</p>
            <Badge tone="subtle">{contractorTxns.length} records</Badge>
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
                {contractorTxns.map((txn) => (
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
        </UiCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-muted">Spend</p>
          <h1 className="font-display text-2xl font-semibold">Cards</h1>
        </div>
        <Button>Issue card</Button>
      </div>

      <UiCard className="bg-panel/80">
        <CardHeader className="flex items-center justify-between">
          <p className="text-sm text-muted">Issued cards</p>
          <Badge tone="subtle">{displayCards.length} cards</Badge>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-[0.12em] text-muted">
              <tr>
                <th className="py-2 pr-4">Card</th>
                <th className="py-2 pr-4">Contractor</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Limit</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {displayCards.map((card) => (
                <tr key={card.id}>
                  <td className="py-3 pr-4 font-semibold">**** {card.last4}</td>
                  <td className="py-3 pr-4 text-muted">{contractorMap[card.contractorId]}</td>
                  <td className="py-3 pr-4 text-muted">{card.status}</td>
                  <td className="py-3 pr-4">
                    {card.limit.toLocaleString()} {card.currency}
                  </td>
                  <td className="flex gap-2 py-3 pr-4">
                    <Button size="sm" variant="secondary" onClick={() => toggleFreeze(card.id)}>
                      {card.status === "Frozen" ? "Unfreeze" : "Freeze"}
                    </Button>
                    <Button size="sm" variant="secondary">
                      Set limit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </UiCard>

      <UiCard className="bg-panel/80">
        <CardHeader className="flex items-center justify-between">
          <p className="text-sm text-muted">Transactions</p>
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
      </UiCard>
    </div>
  );
}
