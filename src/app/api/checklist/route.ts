import { NextResponse } from "next/server";
import { completeChecklistItem, getChecklist } from "@/data/dashboard";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") ?? "demo-user";
  return NextResponse.json({ items: getChecklist(userId) });
}

export async function POST(request: Request) {
  const body = await request.json();
  const userId = typeof body.userId === "string" ? body.userId : "demo-user";
  const key = body.key;
  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }
  const items = completeChecklistItem(userId, key);
  return NextResponse.json({ items });
}
