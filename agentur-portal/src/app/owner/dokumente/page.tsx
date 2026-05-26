"use client";

import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Upload, FolderOpen, FileText, ImageIcon, File } from "lucide-react";

const mockDocs = [
  { name: "Gewerbeanmeldung.pdf",         typ: "pdf",   groesse: "1.2 MB", datum: "15.03.2024" },
  { name: "AGB_Webdesign_2024.pdf",       typ: "pdf",   groesse: "234 KB", datum: "01.01.2024" },
  { name: "Datenschutzerklärung.docx",    typ: "doc",   groesse: "85 KB",  datum: "01.01.2024" },
  { name: "Briefkopf_Vorlage.png",        typ: "image", groesse: "540 KB", datum: "20.02.2024" },
  { name: "Impressum_Template.txt",       typ: "txt",   groesse: "2 KB",   datum: "05.01.2024" },
];

function DocIcon({ typ }: { typ: string }) {
  if (typ === "pdf")   return <FileText className="w-5 h-5 text-red-400" />;
  if (typ === "image") return <ImageIcon className="w-5 h-5 text-blue-400" />;
  return <File className="w-5 h-5 text-muted-foreground" />;
}

export default function DokumentePage() {
  return (
    <div>
      <TopBar
        title="Dokumente"
        actions={
          <Button size="sm" variant="outline" disabled>
            <Upload className="w-4 h-4" /> Upload (bald)
          </Button>
        }
      />
      <div className="p-6 max-w-3xl space-y-5">

        {/* Coming Soon Banner */}
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4 flex items-start gap-3">
          <FolderOpen className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-300">Cloud-Speicher kommt bald</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Dokumente hochladen, organisieren und mit Kunden teilen — wird mit Supabase Storage verbunden.
              Bis dahin: Dateien lokal speichern oder Google Drive verlinken.
            </p>
          </div>
        </div>

        {/* Mock Document List */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border">
            <h3 className="text-sm font-semibold">Vorlagen & Stammdokumente</h3>
          </div>
          <div className="divide-y divide-border">
            {mockDocs.map((d) => (
              <div key={d.name} className="px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <DocIcon typ={d.typ} />
                  <div>
                    <p className="text-sm font-medium">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.groesse} · {d.datum}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-xs" disabled>
                  Öffnen
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
