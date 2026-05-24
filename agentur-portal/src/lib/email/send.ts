// Server-only: do NOT import in client components
import type { Invoice } from "@/lib/invoice/types";

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(amount);

const formatDate = (dateStr: string): string =>
  new Intl.DateTimeFormat("de-DE").format(new Date(dateStr));

export async function sendInvoiceEmail(
  invoice: Invoice,
  pdfBuffer: Buffer
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("[sendInvoiceEmail] RESEND_API_KEY nicht gesetzt — E-Mail-Versand übersprungen");
    return { success: false, error: "Resend nicht konfiguriert" };
  }

  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const from = `WebAgentur <${fromEmail}>`;

  const vollName = `${invoice.kunde.vorname} ${invoice.kunde.nachname}`.trim();
  const anrede = invoice.kunde.vorname ? `Sehr geehrte(r) ${vollName}` : "Sehr geehrte Damen und Herren";

  const htmlBody = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rechnung ${invoice.nummer}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="border-top: 4px solid #1a1a1a; padding-top: 20px; margin-bottom: 30px;">
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="width: 36px; height: 36px; border-radius: 50%; background: #1a1a1a; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 18px;">W</div>
      <span style="font-size: 18px; font-weight: bold;">WebAgentur</span>
    </div>
  </div>

  <p>${anrede},</p>

  <p>
    im Anhang finden Sie Ihre Rechnung <strong>${invoice.nummer}</strong> über <strong>${formatCurrency(invoice.gesamt)}</strong>.
  </p>

  <div style="background: #f9f9f9; border-left: 4px solid #1a1a1a; padding: 16px 20px; margin: 24px 0; border-radius: 2px;">
    <p style="margin: 0 0 8px 0;"><strong>Rechnungsdetails</strong></p>
    <p style="margin: 4px 0; font-size: 14px;">Rechnungsnummer: ${invoice.nummer}</p>
    <p style="margin: 4px 0; font-size: 14px;">Betrag: ${formatCurrency(invoice.gesamt)} (inkl. ${invoice.mwst_satz}% MwSt.)</p>
    <p style="margin: 4px 0; font-size: 14px;">Zahlungsziel: <strong>${formatDate(invoice.faellig_am)}</strong></p>
    <p style="margin: 4px 0; font-size: 14px;">Zahlungsart: ${invoice.zahlungsart}</p>
  </div>

  <p>
    Bitte überweisen Sie den Betrag bis zum <strong>${formatDate(invoice.faellig_am)}</strong> unter Angabe der Rechnungsnummer <strong>${invoice.nummer}</strong>.
  </p>

  <p>
    Bei Fragen zu Ihrer Rechnung stehen wir Ihnen gerne zur Verfügung.
  </p>

  <p>
    Mit freundlichen Grüßen<br>
    <strong>Ihr WebAgentur Team</strong>
  </p>

  <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
  <p style="font-size: 12px; color: #888;">
    WebAgentur | Musterstraße 1, 32657 Lemgo | hallo@webagentur.de
  </p>
</body>
</html>
  `.trim();

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to: invoice.kunde.email,
      subject: `Rechnung ${invoice.nummer} von WebAgentur`,
      html: htmlBody,
      attachments: [
        {
          filename: `Rechnung-${invoice.nummer}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      console.error("[sendInvoiceEmail] Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[sendInvoiceEmail] Unexpected error:", message);
    return { success: false, error: message };
  }
}
