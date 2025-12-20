import { Badge } from "@/components/ui/badge";

type Tone = "warning" | "success" | "critical" | "accent" | "subtle";

const toneMap: Record<string, { tone: Tone; label: string }> = {
  draft: { tone: "warning", label: "Draft" },
  submitted: { tone: "subtle", label: "Submitted" },
  approved: { tone: "accent", label: "Approved" },
  scheduled: { tone: "subtle", label: "Scheduled" },
  paid: { tone: "success", label: "Paid" },
  failed: { tone: "critical", label: "Failed" },
  pending: { tone: "warning", label: "Pending" },
  active: { tone: "success", label: "Active" },
  frozen: { tone: "warning", label: "Frozen" },
  closed: { tone: "critical", label: "Closed" },
  investigating: { tone: "warning", label: "Investigating" },
  open: { tone: "subtle", label: "Open" },
};

const formatLabel = (value: string) =>
  !value ? "Unknown" : value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

export function StatusBadge({ status }: { status: string }) {
  if (!status) {
    return <Badge tone="subtle">Unknown</Badge>;
  }
  const key = status.toLowerCase();
  const mapped = toneMap[key];
  const tone = mapped?.tone ?? "subtle";
  const label = mapped?.label ?? formatLabel(status);
  return <Badge tone={tone}>{label}</Badge>;
}
