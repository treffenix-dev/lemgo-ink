import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { FileText, Download, Plus } from "lucide-react";

const mockDokumente = [
  { id: "1", name: "AGB_WebAgentur_2025.pdf", groesse: "245 KB", datum: "01.01.2025", kategorie: "Rechtliches" },
  { id: "2", name: "Datenschutzerklaerung_2025.pdf", groesse: "189 KB", datum: "01.01.2025", kategorie: "Rechtliches" },
  { id: "3", name: "Angebotsvorlage_Business.docx", groesse: "42 KB", datum: "15.05.2025", kategorie: "Vorlagen" },
  { id: "4", name: "Onboarding_Checkliste.pdf", groesse: "78 KB", datum: "20.05.2025", kategorie: "Vorlagen" },
];

const kategorien = Array.from(new Set(mockDokumente.map((d) => d.kategorie)));

export default function DokumentePage() {
  return (
    <div>
      <TopBar
        title="Dokumente"
        actions={
          <Button size="sm">
            <Plus className="w-4 h-4" /> Hochladen
          </Button>
        }
      />
      <div className="p-6 max-w-4xl space-y-6">
        {kategorien.map((kat) => (
          <div key={kat} className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border bg-muted/30">
              <h3 className="text-sm font-semibold">{kat}</h3>
            </div>
            <div className="divide-y divide-border">
              {mockDokumente.filter((d) => d.kategorie === kat).map((d) => (
                <div key={d.id} className="px-5 py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-sm font-medium">{d.name}</p>
                      <p className="text-xs text-muted-foreground">{d.groesse} · {d.datum}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="icon-sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
