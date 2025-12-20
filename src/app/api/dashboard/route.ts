import { NextResponse } from "next/server";
import {
  getContractors,
  getInvoices,
  getPayouts,
  getCards,
  getTransactions,
  getApprovalItems,
  getActivities,
} from "@/data/dashboard";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const resource = searchParams.get("resource");
  const search = searchParams.get("search")?.toLowerCase() ?? "";
  const status = searchParams.get("status");

  switch (resource) {
    case "contractors": {
      const items = getContractors().filter(
        (c) =>
          (!search || c.name.toLowerCase().includes(search)) &&
          (!status || c.status.toLowerCase() === status.toLowerCase()),
      );
      return NextResponse.json({ items });
    }
    case "invoices": {
      const items = getInvoices().filter(
        (i) =>
          (!search || i.id.toLowerCase().includes(search)) &&
          (!status || i.status.toLowerCase() === status.toLowerCase()),
      );
      return NextResponse.json({ items });
    }
    case "payouts": {
      const items = getPayouts().filter(
        (p) =>
          (!search || p.id.toLowerCase().includes(search)) &&
          (!status || p.status.toLowerCase() === status.toLowerCase()),
      );
      return NextResponse.json({ items });
    }
    case "cards": {
      return NextResponse.json({ items: getCards() });
    }
    case "transactions": {
      return NextResponse.json({ items: getTransactions() });
    }
    case "approvals": {
      return NextResponse.json({ items: getApprovalItems() });
    }
    case "activity": {
      return NextResponse.json({ items: getActivities() });
    }
    default:
      return NextResponse.json({ error: "Unknown resource" }, { status: 400 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const action = body?.action as string | undefined;
  const entityId = body?.id as string | undefined;
  if (!action || !entityId) {
    return NextResponse.json({ error: "Missing action or id" }, { status: 400 });
  }

  const success = {
    id: entityId,
    action,
    status: "ok",
    auditLogged: true,
    message: "Mock mutation recorded",
  };

  return NextResponse.json(success);
}
