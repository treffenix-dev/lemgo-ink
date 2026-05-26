"use client";

import { useState } from "react";
import { Printer, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const inputCls = "w-full h-9 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring";
const labelCls = "block text-xs font-medium text-muted-foreground mb-1";

function today() {
  return new Date().toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function AbnahmeprotokollPage() {
  const router = useRouter();

  const [data, setData] = useState({
    auftragnehmer: "Nick Wittmann — Digital Services & Webdesign",
    auftraggeber: "",
    projektname: "",
    projekturl: "",
    datum: today(),
    leistungen: [
      "Erstellung der Website gemäß Absprache",
      "Responsive Design (Mobile-Optimierung)",
      "Reservierungssystem / Bestellfunktion",
      "Texte, Bilder und Inhalte eingebaut",
      "Übergabe der Zugangsdaten",
    ].join("\n"),
    maengel: "",
    freigabe: true,
  });

  function set(key: string, value: string | boolean) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <>
      <style>{`
        @media print {
          body > * { display: none !important; }
          #abnahme-print { display: block !important; }
          #abnahme-print * { display: revert !important; }
        }
      `}</style>

      <div className="flex h-screen overflow-hidden">
        {/* Form */}
        <div className="w-[400px] shrink-0 border-r border-border flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card">
            <div className="flex items-center gap-3">
              <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-sm font-semibold">Abnahmeprotokoll</h2>
            </div>
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="w-3.5 h-3.5" /> Drucken / PDF
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <div className="rounded-xl border border-border bg-card p-4 space-y-3">
              <h3 className="text-xs font-semibold">Projektdaten</h3>
              <div><label className={labelCls}>Projektname</label><input className={inputCls} placeholder="Website Münchener Löwenbräu" value={data.projektname} onChange={(e) => set("projektname", e.target.value)} /></div>
              <div><label className={labelCls}>Website-URL</label><input className={inputCls} placeholder="https://loewenbraeu-lemgo.vercel.app" value={data.projekturl} onChange={(e) => set("projekturl", e.target.value)} /></div>
              <div><label className={labelCls}>Auftraggeber (Kunde)</label><input className={inputCls} placeholder="Münchener Löwenbräu, Danko Bradaric" value={data.auftraggeber} onChange={(e) => set("auftraggeber", e.target.value)} /></div>
              <div><label className={labelCls}>Datum der Abnahme</label><input className={inputCls} value={data.datum} onChange={(e) => set("datum", e.target.value)} /></div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 space-y-3">
              <h3 className="text-xs font-semibold">Erbrachte Leistungen</h3>
              <textarea
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                rows={6}
                value={data.leistungen}
                onChange={(e) => set("leistungen", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Eine Leistung pro Zeile</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 space-y-3">
              <h3 className="text-xs font-semibold">Mängel / Anmerkungen</h3>
              <textarea
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                rows={3}
                placeholder="Keine Mängel festgestellt."
                value={data.maengel}
                onChange={(e) => set("maengel", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
          <div className="max-w-[660px] mx-auto">
            <p className="text-xs text-muted-foreground text-center mb-4 uppercase tracking-wide">Vorschau</p>

            <div
              id="abnahme-print"
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "11px", lineHeight: "1.6", color: "#1a1a1a" }}
            >
              <div style={{ padding: "40px 48px" }}>
                {/* Header */}
                <div style={{ borderBottom: "2px solid #1e3a5f", paddingBottom: "16px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <div style={{ fontSize: "20px", fontWeight: "700", color: "#1e3a5f" }}>Abnahmeprotokoll</div>
                    <div style={{ fontSize: "10px", color: "#6b7280", marginTop: "2px" }}>Projekt-Übergabe & Freigabe</div>
                  </div>
                  <div style={{ textAlign: "right", fontSize: "10px", color: "#6b7280" }}>
                    <div>{data.auftragnehmer}</div>
                    <div>Datum: {data.datum}</div>
                  </div>
                </div>

                {/* Projektinfos */}
                <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px", fontSize: "11px" }}>
                  <tbody>
                    {[
                      ["Projekt:", data.projektname || "—"],
                      ["Website:", data.projekturl || "—"],
                      ["Auftraggeber:", data.auftraggeber || "—"],
                      ["Auftragnehmer:", data.auftragnehmer],
                    ].map(([label, value]) => (
                      <tr key={label} style={{ borderBottom: "1px solid #e5e7eb" }}>
                        <td style={{ padding: "6px 0", width: "160px", color: "#6b7280", fontWeight: "500" }}>{label}</td>
                        <td style={{ padding: "6px 0", fontWeight: "600" }}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Leistungen */}
                <div style={{ marginBottom: "24px" }}>
                  <div style={{ fontWeight: "700", marginBottom: "8px", color: "#1e3a5f" }}>Erbrachte Leistungen</div>
                  <ul style={{ margin: 0, paddingLeft: "18px" }}>
                    {data.leistungen.split("\n").filter(Boolean).map((l, i) => (
                      <li key={i} style={{ marginBottom: "4px" }}>{l}</li>
                    ))}
                  </ul>
                </div>

                {/* Mängel */}
                <div style={{ marginBottom: "32px" }}>
                  <div style={{ fontWeight: "700", marginBottom: "6px", color: "#1e3a5f" }}>Mängel / Anmerkungen</div>
                  <div style={{ padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: "4px", minHeight: "40px", color: data.maengel ? "#1a1a1a" : "#9ca3af", fontStyle: data.maengel ? "normal" : "italic" }}>
                    {data.maengel || "Keine Mängel festgestellt."}
                  </div>
                </div>

                {/* Freigabe */}
                <div style={{ border: "1px solid #1e3a5f", borderRadius: "6px", padding: "16px 20px", marginBottom: "32px", backgroundColor: "#f0f4ff" }}>
                  <div style={{ fontWeight: "700", color: "#1e3a5f", marginBottom: "6px" }}>Freigabeerklärung</div>
                  <div style={{ fontSize: "10.5px" }}>
                    Der Auftraggeber bestätigt, dass die oben genannten Leistungen erbracht wurden und das Projekt
                    {data.maengel ? " unter Vorbehalt der genannten Anmerkungen" : " ohne Mängel"} abgenommen wird.
                    Mit der Unterzeichnung wird die Rechnung zur Zahlung freigegeben.
                  </div>
                </div>

                {/* Unterschriften */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
                  {["Auftragnehmer", "Auftraggeber"].map((role) => (
                    <div key={role}>
                      <div style={{ borderTop: "1px solid #374151", paddingTop: "6px", marginTop: "40px" }}>
                        <div style={{ fontSize: "10px", color: "#6b7280" }}>{role}, Ort & Datum</div>
                        <div style={{ fontSize: "10px", color: "#6b7280", marginTop: "2px" }}>{role === "Auftragnehmer" ? data.auftragnehmer : data.auftraggeber || "________________________"}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
