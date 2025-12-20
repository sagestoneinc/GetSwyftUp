import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const tiers = [
  {
    name: "Starter",
    price: "$24",
    cadence: "per contractor / month",
    description: "For teams beginning to formalize payouts and approvals.",
    features: [
      "Automated onboarding with tax collection",
      "Two approval layers with policy controls",
      "Multi-currency payouts with live FX",
      "Exportable ledgers and receipts",
    ],
    popular: false,
  },
  {
    name: "Growth",
    price: "$68",
    cadence: "per contractor / month",
    description: "For finance teams scaling payouts with more oversight.",
    features: [
      "All Starter features plus risk scoring",
      "Advanced treasury routing with holds",
      "SAML SSO and granular roles",
      "Quarterly continuity review sessions",
    ],
    popular: true,
  },
];

const addons = [
  { name: "Dedicated payout corridor", detail: "Reserved rails for priority markets", price: "$350 / month" },
  { name: "Compliance review pack", detail: "Monthly screenings + certification letters", price: "$420 / month" },
  { name: "Premium support", detail: "24/7 response with named success manager", price: "$280 / month" },
];

export default function PricingPage() {
  return (
    <div className="bg-bg text-text">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-4">
            <Badge tone="accent">Transparent pricing</Badge>
            <h1 className="font-display text-4xl font-semibold leading-tight">Calm, predictable billing</h1>
            <p className="max-w-2xl text-lg text-muted">
              Every plan includes secure onboarding, payout routing, and audit-ready exports. Choose the guardrails
              your team needs today and grow without surprises.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <span className="inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            Monthly billing shown. Annual terms available on request.
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative bg-white/5 ${tier.popular ? "border-[var(--accent)]/40 shadow-[var(--shadow-elevated)]" : ""}`}
            >
              {tier.popular && (
                <Badge tone="accent" className="absolute right-4 top-4">
                  Most popular
                </Badge>
              )}
              <CardHeader>
                <h2 className="font-display text-2xl font-semibold">{tier.name}</h2>
                <p className="text-sm text-muted">{tier.description}</p>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-semibold">{tier.price}</span>
                  <span className="text-sm text-muted">{tier.cadence}</span>
                </div>
                <Button className="w-full" variant={tier.popular ? "primary" : "secondary"}>
                  {tier.popular ? "Start Growth" : "Choose Starter"}
                </Button>
                <div className="space-y-2">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent)]" />
                      <p className="text-sm text-muted">{feature}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-10 bg-panel/70">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.15em] text-muted">Add-ons</p>
                <h3 className="font-display text-2xl font-semibold">Layer in more oversight</h3>
              </div>
              <Button variant="ghost" asChild>
                <Link href="/">Return home</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {addons.map((addon) => (
              <div
                key={addon.name}
                className="flex flex-col items-start justify-between gap-3 rounded-[var(--radius-card)] border border-white/5 bg-white/5 p-4 md:flex-row md:items-center"
              >
                <div>
                  <p className="font-semibold">{addon.name}</p>
                  <p className="text-sm text-muted">{addon.detail}</p>
                </div>
                <span className="text-sm font-semibold text-[var(--accent)]">{addon.price}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
