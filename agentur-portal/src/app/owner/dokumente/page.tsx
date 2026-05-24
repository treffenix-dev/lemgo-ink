"use client";

import { useRef, useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { FileText, Download, Plus, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type Dokument = { id: string; name: string; groesse: string; datum: string; kategorie: string };

const mockDokumente: Dokument[] = [
  { id: "1", name: "AGB_WebAgentur_2025.pdf", groesse: "245 KB", datum: "01.01.2025", kategorie: "Rechtliches" },
  { id: "2", name: "Datenschutzerklaerung_2025.pdf", groesse: "189 KB", datum: "01.01.2025", kategorie: "Rechtliches" },
  { id: "3", name: "Angebotsvorlage_Business.docx", groesse: "42 KB", datum: "15.05.2025", kategorie: "Vorlagen" },
  { id: "4", name: "Onboarding_Checkliste.pdf", groesse: "78 KB", datum: "20.05.2025", kategorie: "Vorlagen" },
];

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function today() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2,"0")}.${String(d.getMonth()+1).padStart(2,"0")}.${d.getFullYear()}`;
}

export default function DokumentePage() {
  const [dokumente, setDokumente] = useLocalStorage<Dokument[]>("owner_dokumente", mockDokumente);
  const [kategorie, setKategorie] = useState("Sonstiges");
  const fileRef = useRef<HTMLInputElement>(null);

  const kategorien = Array.from(new Set(dokumente.map((d) => d.kategorie)));

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const neu: Dokument = {
      id: Date.now().toString(),
      name: file.name,
      groesse: formatBytes(file.size),
      datum: today(),
      kategorie,
    };
    setDokumente((prev) => [neu, ...prev]);
    e.target.value = "";
  }

  function deleteDok(id: string) {
    setDokumente((prev) => prev.filter((d) => d.id !== id));
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
                    <Button variant="outline" size="icon-sm">
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
    </div>
  );
}
