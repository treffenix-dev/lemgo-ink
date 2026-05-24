"use client";

import { useRef, useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { FileText, Download, Plus, Trash2, Eye, X } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type Dokument = {
  id: string;
  name: string;
  groesse: string;
  datum: string;
  kategorie: string;
  dataUrl?: string;
  template?: string;
};

const TEMPLATES: Record<string, string> = {
  agb: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:Arial,sans-serif;max-width:800px;margin:40px auto;padding:0 20px;line-height:1.6;color:#333}h1{font-size:24px;border-bottom:2px solid #333;padding-bottom:10px}h2{font-size:18px;margin-top:28px}p{margin:8px 0}</style></head><body><h1>Allgemeine Geschäftsbedingungen</h1><p><strong>WebAgentur · Stand: Januar 2025</strong></p><h2>§1 Geltungsbereich</h2><p>Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen WebAgentur und ihren Kunden.</p><h2>§2 Leistungen</h2><p>WebAgentur erbringt Dienstleistungen im Bereich Webentwicklung, Design und digitalem Marketing.</p><h2>§3 Zahlungsbedingungen</h2><p>Rechnungen sind innerhalb von 14 Tagen nach Rechnungsdatum zu begleichen. Bei Verzug werden Verzugszinsen in Höhe von 5% über dem Basiszinssatz berechnet.</p><h2>§4 Urheberrecht</h2><p>Alle erstellten Inhalte bleiben bis zur vollständigen Bezahlung Eigentum von WebAgentur. Nach vollständiger Zahlung gehen die Nutzungsrechte auf den Kunden über.</p><h2>§5 Gewährleistung</h2><p>WebAgentur gewährleistet die vereinbarte Funktionalität der erstellten Webprojekte für 12 Monate ab Abnahme.</p><h2>§6 Haftungsbeschränkung</h2><p>Die Haftung von WebAgentur ist auf den Auftragswert begrenzt. Für Folgeschäden wird keine Haftung übernommen.</p><h2>§7 Datenschutz</h2><p>Die Verarbeitung personenbezogener Daten erfolgt gemäß DSGVO. Näheres regelt unsere Datenschutzerklärung.</p><h2>§8 Gerichtsstand</h2><p>Gerichtsstand ist Bielefeld. Es gilt deutsches Recht.</p></body></html>`,

  datenschutz: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:Arial,sans-serif;max-width:800px;margin:40px auto;padding:0 20px;line-height:1.6;color:#333}h1{font-size:24px;border-bottom:2px solid #333;padding-bottom:10px}h2{font-size:18px;margin-top:28px}</style></head><body><h1>Datenschutzerklärung</h1><p><strong>WebAgentur · Stand: Januar 2025</strong></p><h2>1. Verantwortliche Stelle</h2><p>WebAgentur, Musterstraße 1, 33602 Bielefeld<br>E-Mail: info@webagentur.de</p><h2>2. Erhobene Daten</h2><p>Wir erheben personenbezogene Daten (Name, E-Mail, Adresse, Zahlungsdaten) zur Vertragsabwicklung gemäß Art. 6 Abs. 1 lit. b DSGVO sowie zur Erfüllung rechtlicher Verpflichtungen gemäß Art. 6 Abs. 1 lit. c DSGVO.</p><h2>3. Datenweitergabe</h2><p>Eine Weitergabe an Dritte erfolgt nur bei der Zahlungsabwicklung (Stripe Inc.) und dem E-Mail-Versand (Resend Inc.). Beide Anbieter verarbeiten Daten ausschließlich gemäß unserer Weisung.</p><h2>4. Speicherdauer</h2><p>Personenbezogene Daten werden nur so lange gespeichert, wie es für den jeweiligen Zweck erforderlich ist, mindestens jedoch 10 Jahre für steuerrelevante Dokumente.</p><h2>5. Ihre Rechte</h2><p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch gemäß DSGVO.</p><h2>6. Cookies</h2><p>Diese Website verwendet ausschließlich technisch notwendige Cookies. Tracking oder Werbecookies werden nicht eingesetzt.</p><h2>7. Kontakt Datenschutzbeauftragter</h2><p>Bei Fragen: info@webagentur.de</p></body></html>`,

  angebot: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:Arial,sans-serif;max-width:800px;margin:40px auto;padding:0 20px;color:#333}h1{font-size:22px}table{width:100%;border-collapse:collapse;margin:20px 0}th,td{padding:10px 12px;text-align:left;border-bottom:1px solid #eee}th{background:#f5f5f5;font-weight:600}.right{text-align:right}.total td{font-weight:bold;font-size:16px;border-top:2px solid #333}.meta{color:#666;font-size:14px;line-height:1.8}</style></head><body><h1>Angebotsvorlage — Business-Paket</h1><p class="meta">Datum: [DATUM] · Gültig bis: [DATUM + 30 TAGE]<br>Für: [KUNDENNAME] · [FIRMA]</p><h2>Leistungsübersicht</h2><table><tr><th>Beschreibung</th><th>Menge</th><th class="right">Einzelpreis</th><th class="right">Gesamt</th></tr><tr><td>Business-Paket — Website bis 5 Seiten</td><td>1</td><td class="right">1.258,82 €</td><td class="right">1.258,82 €</td></tr><tr><td>Domain-Einrichtung &amp; SSL</td><td>1</td><td class="right">inklusive</td><td class="right">—</td></tr><tr><td>3 Monate Support</td><td>1</td><td class="right">inklusive</td><td class="right">—</td></tr><tr><td></td><td></td><td>Netto</td><td class="right">1.258,82 €</td></tr><tr><td></td><td></td><td>MwSt. 19%</td><td class="right">239,18 €</td></tr><tr class="total"><td></td><td></td><td>Gesamtbetrag</td><td class="right">1.499,00 €</td></tr></table><p class="meta">Dieses Angebot ist freibleibend und unverbindlich. Gerne passen wir es auf Ihre Bedürfnisse an.</p></body></html>`,

  onboarding: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:Arial,sans-serif;max-width:800px;margin:40px auto;padding:0 20px;line-height:1.6;color:#333}h1{font-size:22px}h2{font-size:16px;margin-top:28px;color:#444;border-bottom:1px solid #eee;padding-bottom:6px}ul{padding-left:20px}li{margin:6px 0;list-style:none}li::before{content:"☐ ";font-size:14px}</style></head><body><h1>Onboarding-Checkliste</h1><p><strong>WebAgentur</strong> · Für neue Projekte</p><h2>Phase 1 — Kickoff &amp; Briefing</h2><ul><li>Kickoff-Gespräch vereinbart und durchgeführt</li><li>Briefing-Formular vollständig ausgefüllt</li><li>Zugangsdaten (Hosting, Domain, CMS) erhalten</li><li>Logo, Farben, CI-Materialien übermittelt</li><li>Texte und Bilder geklärt (Lieferung durch Kunden oder Agentur?)</li></ul><h2>Phase 2 — Design</h2><ul><li>Wireframes / Konzept erstellt</li><li>Wireframes vom Kunden freigegeben</li><li>Design-Mockup erstellt</li><li>Design-Mockup freigegeben</li></ul><h2>Phase 3 — Entwicklung</h2><ul><li>Entwicklung gestartet</li><li>Zwischen-Review-Link verschickt</li><li>Feedback eingearbeitet</li><li>Finaler Review-Link verschickt</li></ul><h2>Phase 4 — Launch</h2><ul><li>Finale Abnahme durch Kunden schriftlich bestätigt</li><li>Zahlung vollständig eingegangen</li><li>Domain auf Live-Server umgezogen</li><li>SSL-Zertifikat aktiv</li><li>Go-Live durchgeführt ✓</li></ul></body></html>`,
};

const mockDokumente: Dokument[] = [
  { id: "1", name: "AGB_WebAgentur_2025.pdf", groesse: "245 KB", datum: "01.01.2025", kategorie: "Rechtliches", template: "agb" },
  { id: "2", name: "Datenschutzerklaerung_2025.pdf", groesse: "189 KB", datum: "01.01.2025", kategorie: "Rechtliches", template: "datenschutz" },
  { id: "3", name: "Angebotsvorlage_Business.docx", groesse: "42 KB", datum: "15.05.2025", kategorie: "Vorlagen", template: "angebot" },
  { id: "4", name: "Onboarding_Checkliste.pdf", groesse: "78 KB", datum: "20.05.2025", kategorie: "Vorlagen", template: "onboarding" },
];

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function today() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
}

function getDocUrl(doc: Dokument): { url: string; revoke: boolean } | null {
  if (doc.dataUrl) return { url: doc.dataUrl, revoke: false };
  if (doc.template && TEMPLATES[doc.template]) {
    const blob = new Blob([TEMPLATES[doc.template]], { type: "text/html" });
    return { url: URL.createObjectURL(blob), revoke: true };
  }
  return null;
}

export default function DokumentePage() {
  const [dokumente, setDokumente] = useLocalStorage<Dokument[]>("owner_dokumente", mockDokumente);
  const [kategorie, setKategorie] = useState("Sonstiges");
  const [preview, setPreview] = useState<{ doc: Dokument; url: string; revoke: boolean } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const kategorien = Array.from(new Set(dokumente.map((d) => d.kategorie)));

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      const neu: Dokument = {
        id: Date.now().toString(),
        name: file.name,
        groesse: formatBytes(file.size),
        datum: today(),
        kategorie,
        dataUrl,
      };
      setDokumente((prev) => [neu, ...prev]);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function deleteDok(id: string) {
    setDokumente((prev) => prev.filter((d) => d.id !== id));
  }

  function downloadDoc(doc: Dokument) {
    const result = getDocUrl(doc);
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    a.download = doc.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    if (result.revoke) URL.revokeObjectURL(result.url);
  }

  function openPreview(doc: Dokument) {
    const result = getDocUrl(doc);
    if (!result) return;
    setPreview({ doc, url: result.url, revoke: result.revoke });
  }

  function closePreview() {
    if (preview?.revoke) URL.revokeObjectURL(preview.url);
    setPreview(null);
  }

  return (
    <div>
      <input ref={fileRef} type="file" className="hidden" onChange={handleFile} />
      <TopBar
        title="Dokumente"
        actions={
          <div className="flex items-center gap-2">
            <select
              value={kategorie}
              onChange={(e) => setKategorie(e.target.value)}
              className="hidden sm:block h-9 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {["Rechtliches", "Vorlagen", "Rechnungen", "Verträge", "Sonstiges"].map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
            <Button size="sm" onClick={() => fileRef.current?.click()}>
              <Plus className="w-4 h-4" /><span className="hidden sm:inline ml-1">Hochladen</span>
            </Button>
          </div>
        }
      />
      <div className="p-4 sm:p-6 max-w-4xl space-y-6">
        {kategorien.map((kat) => (
          <div key={kat} className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border bg-muted/30">
              <h3 className="text-sm font-semibold">{kat}</h3>
            </div>
            <div className="divide-y divide-border">
              {dokumente.filter((d) => d.kategorie === kat).map((d) => (
                <div key={d.id} className="group px-5 py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{d.name}</p>
                      <p className="text-xs text-muted-foreground">{d.groesse} · {d.datum}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="outline" size="icon-sm" onClick={() => openPreview(d)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon-sm" onClick={() => downloadDoc(d)}>
                      <Download className="w-4 h-4" />
                    </Button>
                    <button
                      onClick={() => deleteDok(d.id)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {dokumente.length === 0 && (
          <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
            <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="font-medium mb-1">Noch keine Dokumente</p>
            <Button size="sm" onClick={() => fileRef.current?.click()}>Erstes Dokument hochladen</Button>
          </div>
        )}
      </div>

      {preview && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background shrink-0">
            <p className="text-sm font-medium truncate max-w-xs">{preview.doc.name}</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => downloadDoc(preview.doc)}>
                <Download className="w-4 h-4 mr-1" /> Herunterladen
              </Button>
              <button
                onClick={closePreview}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <iframe
            src={preview.url}
            className="flex-1 w-full border-0"
            title={preview.doc.name}
          />
        </div>
      )}
    </div>
  );
}
