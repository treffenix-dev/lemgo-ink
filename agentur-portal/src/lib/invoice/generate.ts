// Server-only: do NOT import in client components
import type { Invoice } from "./types";

export async function generateInvoicePDF(invoice: Invoice): Promise<Buffer> {
  try {
    // Dynamic imports to avoid issues with bundling
    const { pdf } = await import("@react-pdf/renderer");
    const { InvoicePDF } = await import("./InvoicePDF");
    const React = await import("react");

    const element = React.createElement(InvoicePDF, { invoice });
    const instance = pdf(element);
    const blob = await instance.toBlob();
    const arrayBuffer = await blob.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (err) {
    console.error("[generateInvoicePDF] Error generating PDF:", err);
    // Return a minimal fallback PDF
    const fallback = `%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj 2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj 3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<<>>>>endobj\nxref\n0 4\n0000000000 65535 f\n0000000009 00000 n\n0000000058 00000 n\n0000000115 00000 n\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n190\n%%EOF`;
    return Buffer.from(fallback, "utf-8");
  }
}
