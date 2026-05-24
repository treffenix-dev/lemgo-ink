import { NextResponse } from "next/server";
import { getInvoices } from "@/lib/invoice/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const invoices = getInvoices();
    // Sort newest first
    const sorted = [...invoices].sort(
      (a, b) => new Date(b.erstellt_am).getTime() - new Date(a.erstellt_am).getTime()
    );
    return NextResponse.json(sorted);
  } catch (err) {
    console.error("[GET /api/invoices]", err);
    return NextResponse.json({ error: "Fehler beim Laden der Rechnungen" }, { status: 500 });
  }
}
