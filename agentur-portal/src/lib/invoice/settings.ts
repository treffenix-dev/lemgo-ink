export interface InvoiceSettings {
  auto_senden: boolean;      // env INVOICE_AUTO_SEND=true/false, default false
  zahlungsziel_tage: number; // env INVOICE_PAYMENT_DAYS=14, default 14
  absender_name: string;     // env INVOICE_FROM_NAME
  absender_email: string;    // env INVOICE_FROM_EMAIL
}

export function getInvoiceSettings(): InvoiceSettings {
  return {
    auto_senden: process.env.INVOICE_AUTO_SEND === "true",
    zahlungsziel_tage: parseInt(process.env.INVOICE_PAYMENT_DAYS ?? "14", 10),
    absender_name: process.env.INVOICE_FROM_NAME ?? "WebAgentur",
    absender_email: process.env.INVOICE_FROM_EMAIL ?? "onboarding@resend.dev",
  };
}
