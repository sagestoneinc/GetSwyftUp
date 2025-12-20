import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const invoices = [
  { id: "INV-2041", vendor: "Northwind Labs", amount: "$12,800", due: "Feb 4", status: "Approved" as const },
  { id: "INV-2042", vendor: "Lumen Data", amount: "$7,300", due: "Feb 6", status: "Draft" as const },
  { id: "INV-2043", vendor: "Altair Ops", amount: "$21,400", due: "Feb 6", status: "Paid" as const },
];

export default function InvoicesPage() {
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
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <p className="text-sm text-muted">Pending and recent invoices</p>
            <p className="text-xs text-muted">Clear statuses avoid payment ambiguity</p>
          </div>
          <Badge tone="subtle">Auto-matching enabled</Badge>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {invoices.length === 0 ? (
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
                  <th className="py-2 pr-4">Vendor</th>
                  <th className="py-2 pr-4">Due</th>
                  <th className="py-2 pr-4">Amount</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-white/5">
                    <td className="py-3 pr-4 font-semibold">{invoice.id}</td>
                    <td className="py-3 pr-4 text-muted">{invoice.vendor}</td>
                    <td className="py-3 pr-4 text-muted">{invoice.due}</td>
                    <td className="py-3 pr-4">{invoice.amount}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={invoice.status} />
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
