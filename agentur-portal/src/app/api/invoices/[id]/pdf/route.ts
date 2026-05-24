import { NextRequest, NextResponse } from "next/server";
import { getInvoice } from "@/lib/invoice/store";
import { generateInvoicePDF } from "@/lib/invoice/generate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const invoice = getInvoice(params.id);

  if (!invoice) {
    return NextResponse.json({ error: "Rechnung nicht gefunden" }, { status: 404 });
  }

  try {
    const pdfBuffer = await generateInvoicePDF(invoice);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="Rechnung-${invoice.nummer}.pdf"`,
        "Content-Length": String(pdfBuffer.length),
      },
    });
  } catch (err) {
    console.error("[GET /api/invoices/[id]/pdf]", err);
    return NextResponse.json({ error: "PDF-Generierung fehlgeschlagen" }, { status: 500 });
  }
}
