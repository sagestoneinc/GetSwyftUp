import { Badge } from "@/components/ui/badge";

type Status = "Draft" | "Approved" | "Paid" | "Failed";

const toneMap: Record<Status, { tone: "warning" | "success" | "critical" | "accent"; label: string }> = {
  Draft: { tone: "warning", label: "Draft" },
  Approved: { tone: "accent", label: "Approved" },
  Paid: { tone: "success", label: "Paid" },
  Failed: { tone: "critical", label: "Failed" },
};

export function StatusBadge({ status }: { status: Status }) {
  const tone = toneMap[status];
  return <Badge tone={tone.tone}>{tone.label}</Badge>;
}
