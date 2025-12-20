'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const [name, setName] = useState("SwyftUp Capital");
  const [country, setCountry] = useState("United States");
  const [currency, setCurrency] = useState("USD");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-muted">Workspace</p>
          <h1 className="font-display text-2xl font-semibold">Settings</h1>
        </div>
        <Badge tone="subtle">Security placeholders</Badge>
      </div>

      <Card className="bg-panel/80">
        <CardHeader>
          <p className="text-sm text-muted">Organization profile</p>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm text-muted">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted">Country</label>
            <Input value={country} onChange={(e) => setCountry(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted">Default currency</label>
            <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted">Notification preferences</label>
            <Textarea defaultValue="Approvals: immediate\nPayouts: daily digest" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted">Security</label>
            <Input disabled value="SSO coming soon" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-panel/80">
        <CardHeader>
          <p className="text-sm text-muted">Team members</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: "Workspace Owner", role: "OWNER" },
            { name: "Finance Admin", role: "FINANCE_ADMIN" },
          ].map((member) => (
            <div key={member.name} className="flex items-center justify-between rounded-[var(--radius-card)] border border-white/5 bg-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-semibold">{member.name}</p>
                <p className="text-xs text-muted">Role: {member.role}</p>
              </div>
              <Button size="sm" variant="secondary">
                Change role
              </Button>
            </div>
          ))}
          <Button size="sm">Invite member</Button>
        </CardContent>
      </Card>

      <Card className="bg-panel/80">
        <CardHeader>
          <p className="text-sm text-muted">Security</p>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted">
          <p>SSO and MFA enforcement placeholders.</p>
          <p>Webhook signing key rotation coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
