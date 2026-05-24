import { NextRequest, NextResponse } from "next/server";
import { getInvoice, updateInvoice } from "@/lib/invoice/store";
import { generateInvoicePDF } from "@/lib/invoice/generate";
import { sendInvoiceEmail } from "@/lib/email/send";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const invoice = getInvoice(params.id);

  if (!invoice) {
    return NextResponse.json({ error: "Rechnung nicht gefunden" }, { status: 404 });
  }

  try {
    const pdfBuffer = await generateInvoicePDF(invoice);
    const result = await sendInvoiceEmail(invoice, pdfBuffer);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error ?? "E-Mail-Versand fehlgeschlagen" },
        { status: 500 }
      );
    }

    // Update invoice status and sent timestamp
    updateInvoice(params.id, {
      status: "offen",
      gesendet_am: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[POST /api/invoices/[id]/send]", err);
    return NextResponse.json({ error: "Interner Fehler beim E-Mail-Versand" }, { status: 500 });
  }
}
