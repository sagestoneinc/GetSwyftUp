import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-muted">Ecosystem</p>
          <h1 className="font-display text-2xl font-semibold">Integrations</h1>
        </div>
        <Badge tone="subtle">Coming soon</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-panel/80">
          <CardHeader>
            <p className="text-sm text-muted">Accounting</p>
            <h3 className="font-semibold">Connect accounting</h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted">QuickBooks, NetSuite, Xero.</p>
            <Button className="mt-3" variant="secondary">
              Connect
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-panel/80">
          <CardHeader>
            <p className="text-sm text-muted">Webhooks</p>
            <h3 className="font-semibold">Webhook/API keys</h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted">Get notified on payout events.</p>
            <Button className="mt-3" variant="secondary">
              Manage
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-panel/80">
          <CardHeader>
            <p className="text-sm text-muted">Treasury</p>
            <h3 className="font-semibold">Provider sync</h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted">Coming soon: real-time balances.</p>
            <Badge tone="subtle">Soon</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
