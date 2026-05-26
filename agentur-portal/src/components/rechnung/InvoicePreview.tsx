import { Invoice, invoiceTotal } from "@/lib/invoice";

function fmt(n: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);
}
function fmtDate(s: string) {
  if (!s) return "—";
  const d = new Date(s);
  return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

type Props = { invoice: Invoice; mode?: "screen" | "print" };

export function InvoicePreview({ invoice, mode = "screen" }: Props) {
  const total = invoiceTotal(invoice.positionen);
  const faelligDatum = (() => {
    if (!invoice.datum) return "—";
    const d = new Date(invoice.datum);
    d.setDate(d.getDate() + invoice.zahlungszielTage);
    return d.toLocaleDateString("de-DE");
  })();

  return (
    <div
      id="invoice-print-area"
      className={`bg-white text-gray-900 ${mode === "screen" ? "shadow-lg rounded-lg overflow-hidden" : ""}`}
      style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "11px", lineHeight: "1.5" }}
    >
      <div style={{ padding: "40px 48px 32px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "32px" }}>
          <div style={{ fontSize: "10px", color: "#6b7280" }}>
            {invoice.absenderName} • {invoice.absenderStrasse} • {invoice.absenderOrt}
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "20px", fontWeight: "700", color: "#1e3a5f" }}>{invoice.absenderName}</div>
            <div style={{ fontSize: "10px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {invoice.absenderZusatz}
            </div>
          </div>
        </div>

        {/* Empfänger + Rechnungsdetails */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "32px" }}>
          <div>
            <div style={{ fontWeight: "700" }}>{invoice.empfaengerFirma || "Firmenname"}</div>
            {invoice.empfaengerAnsprechpartner && (
              <div>Ansprechpartner: {invoice.empfaengerAnsprechpartner}</div>
            )}
            <div>{invoice.empfaengerStrasse}</div>
            <div>{invoice.empfaengerOrt}</div>
          </div>
          <div style={{ textAlign: "right", fontSize: "10.5px" }}>
            {[
              ["Rechnungsnummer:", invoice.nummer],
              ["Rechnungsdatum:", fmtDate(invoice.datum)],
              ["Leistungsdatum:", fmtDate(invoice.leistungsdatum)],
              ["Steuernummer:", invoice.absenderSteuernummer],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "flex", gap: "16px", justifyContent: "flex-end" }}>
                <span style={{ color: "#6b7280" }}>{label}</span>
                <span style={{ fontWeight: "500", minWidth: "120px", textAlign: "right" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Title */}
        <div style={{ borderLeft: "3px solid #1e3a5f", paddingLeft: "12px", marginBottom: "8px" }}>
          <div style={{ fontSize: "18px", fontWeight: "700" }}>Rechnung</div>
          <div style={{ fontSize: "10px", color: "#6b7280" }}>Bitte geben Sie bei der Zahlung die Rechnungsnummer an.</div>
        </div>

        <div style={{ marginBottom: "24px" }} />

        {/* Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}>
          <thead>
            <tr style={{ backgroundColor: "#1e3a5f", color: "white" }}>
              <th style={{ textAlign: "left", padding: "8px 12px", fontSize: "10px", fontWeight: "600", width: "40px" }}>POS.</th>
              <th style={{ textAlign: "left", padding: "8px 12px", fontSize: "10px", fontWeight: "600" }}>BESCHREIBUNG</th>
              <th style={{ textAlign: "right", padding: "8px 12px", fontSize: "10px", fontWeight: "600", width: "100px" }}>MENGE</th>
              <th style={{ textAlign: "right", padding: "8px 12px", fontSize: "10px", fontWeight: "600", width: "100px" }}>GESAMT</th>
            </tr>
          </thead>
          <tbody>
            {invoice.positionen.map((pos, i) => (
              <tr key={pos.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", verticalAlign: "top", color: "#6b7280" }}>{i + 1}</td>
                <td style={{ padding: "10px 12px", verticalAlign: "top" }}>
                  <div style={{ fontWeight: "600" }}>{pos.beschreibung || "—"}</div>
                  {pos.detail && (
                    <div style={{ fontSize: "9.5px", color: "#6b7280", marginTop: "2px" }}>{pos.detail}</div>
                  )}
                </td>
                <td style={{ padding: "10px 12px", textAlign: "right", verticalAlign: "top" }}>{pos.menge}</td>
                <td style={{ padding: "10px 12px", textAlign: "right", verticalAlign: "top", fontWeight: "500" }}>
                  {fmt(pos.preis)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summen */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
          <div style={{ width: "260px" }}>
            {[
              ["Zwischensumme:", fmt(total), false],
              ["Umsatzsteuer (0%):", "0,00 €", false],
            ].map(([label, value]) => (
              <div key={label as string} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: "1px solid #e5e7eb" }}>
                <span style={{ color: "#6b7280" }}>{label}</span>
                <span>{value as string}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontWeight: "700", fontSize: "13px" }}>
              <span>Gesamtbetrag:</span>
              <span style={{ color: "#1e3a5f" }}>{fmt(total)}</span>
            </div>
          </div>
        </div>

        {/* § 19 Hinweis */}
        <div style={{ border: "1px solid #d1d5db", borderRadius: "4px", padding: "10px 14px", marginBottom: "24px", fontSize: "9.5px", color: "#374151" }}>
          <strong>Hinweis: Gemäß § 19 UStG wird keine Umsatzsteuer berechnet und ausgewiesen (Kleinunternehmerregelung).</strong>
          <br />
          Bitte überweisen Sie den Gesamtbetrag von <strong>{fmt(total)}</strong> innerhalb von {invoice.zahlungszielTage} Tagen
          (bis zum {faelligDatum}) auf das unten angegebene Bankkonto.
        </div>

        {invoice.notiz && (
          <div style={{ fontSize: "9.5px", color: "#6b7280", marginBottom: "16px", fontStyle: "italic" }}>
            {invoice.notiz}
          </div>
        )}

        {/* Footer */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", borderTop: "1px solid #e5e7eb", paddingTop: "16px", fontSize: "9.5px", color: "#6b7280" }}>
          <div>
            <div style={{ fontWeight: "600", color: "#374151", marginBottom: "4px" }}>Kontoverbindung:</div>
            <div>{invoice.absenderName}</div>
            <div>IBAN: {invoice.absenderIBAN}</div>
            <div>BIC: {invoice.absenderBIC}</div>
            <div>{invoice.absenderBank}</div>
          </div>
          <div>
            <div style={{ fontWeight: "600", color: "#374151", marginBottom: "4px" }}>Kontaktdaten:</div>
            {invoice.absenderTelefon && <div>Tel.: {invoice.absenderTelefon}</div>}
            {invoice.absenderEmail && <div>E-Mail: {invoice.absenderEmail}</div>}
          </div>
          <div>
            <div style={{ fontWeight: "600", color: "#374151", marginBottom: "4px" }}>Rechtliche Angaben:</div>
            <div>Inhaber: {invoice.absenderName}</div>
            <div>Gewerbebetrieb angemeldet beim</div>
            <div>Ordnungsamt der Stadt Lemgo</div>
          </div>
        </div>

      </div>
    </div>
  );
}
