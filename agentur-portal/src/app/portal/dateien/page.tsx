"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Upload, FileText, Image, Check, AlertCircle, X } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { DocumentType } from "@/types";

type SlotState = { vorhanden: boolean; dateiName?: string };
type FilesState = Record<string, SlotState>;

const initialFiles: FilesState = {
  logo: { vorhanden: false },
  bild: { vorhanden: false },
  text: { vorhanden: true, dateiName: "texte_da_vinci.pdf" },
  speisekarte: { vorhanden: false },
};

const SLOTS = [
  { typ: "logo" as DocumentType, label: "Logo", beschreibung: "PNG, SVG oder AI — am besten auf transparentem Hintergrund", pflicht: true, akzeptiert: ".png,.svg,.ai,.eps,.pdf", icon: Image },
  { typ: "bild" as DocumentType, label: "Bilder (min. 5)", beschreibung: "Fotos von deinem Betrieb, Team, Produkten oder Räumen", pflicht: true, akzeptiert: ".jpg,.jpeg,.png,.webp", icon: Image },
  { typ: "text" as DocumentType, label: "Texte", beschreibung: "Über uns, Leistungen, Willkommenstext — als Word, PDF oder direkt eintippen", pflicht: false, akzeptiert: ".pdf,.doc,.docx,.txt", icon: FileText },
  { typ: "speisekarte" as DocumentType, label: "Speisekarte / Menü", beschreibung: "Falls vorhanden — als PDF, Word oder Bild", pflicht: false, akzeptiert: ".pdf,.doc,.docx,.jpg,.png", icon: FileText },
];

export default function DateienPage() {
  const [files, setFiles] = useLocalStorage<FilesState>("portal_dateien", initialFiles);
  const [dragOver, setDragOver] = useState<DocumentType | null>(null);

  function handleFile(typ: string, file: File | null) {
    if (!file) return;
    setFiles((prev) => ({ ...prev, [typ]: { vorhanden: true, dateiName: file.name } }));
  }

  function handleDrop(typ: string, e: React.DragEvent) {
    e.preventDefault();
    setDragOver(null);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(typ, file);
  }

  function entfernen(typ: string) {
    setFiles((prev) => ({ ...prev, [typ]: { vorhanden: false } }));
  }

  const fehlendePflicht = SLOTS.filter((s) => s.pflicht && !files[s.typ]?.vorhanden);

  return (
    <div>
      <TopBar title="Dateien & Uploads" />
      <div className="p-4 sm:p-6 max-w-3xl space-y-6">
        {fehlendePflicht.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-amber-800 text-sm">
                {fehlendePflicht.length} Pflichtdatei{fehlendePflicht.length !== 1 ? "en" : ""} fehlen noch
              </p>
              <p className="text-xs text-amber-700 mt-1">
                Lade {fehlendePflicht.map((f) => f.label).join(" und ")} hoch, damit wir dein Projekt starten können.
              </p>
            </div>
          </div>
        )}
        {fehlendePflicht.length === 0 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <Check className="w-5 h-5 text-green-600 shrink-0" />
            <p className="text-sm text-green-800 font-medium">Alle Pflichtdateien hochgeladen — wir können loslegen!</p>
          </div>
        )}

        <div className="space-y-4">
          {SLOTS.map((slot) => {
            const state = files[slot.typ] ?? { vorhanden: false };
            return (
              <div key={slot.typ}
                onDragOver={(e) => { e.preventDefault(); setDragOver(slot.typ); }}
                onDragLeave={() => setDragOver(null)}
                onDrop={(e) => handleDrop(slot.typ, e)}
                className={`rounded-xl border-2 border-dashed p-6 transition-colors ${
                  dragOver === slot.typ ? "border-foreground bg-foreground/5" :
                  state.vorhanden ? "border-green-300 bg-green-50" : "border-border bg-card hover:border-foreground/30"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${state.vorhanden ? "bg-green-100" : "bg-muted"}`}>
                      <slot.icon className={`w-5 h-5 ${state.vorhanden ? "text-green-600" : "text-muted-foreground"}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="font-medium">{slot.label}</p>
                        {slot.pflicht && !state.vorhanden && <span className="text-xs text-red-500 font-medium">Pflichtfeld</span>}
                        {state.vorhanden && <span className="flex items-center gap-1 text-xs text-green-700 font-medium"><Check className="w-3 h-3" /> Hochgeladen</span>}
                      </div>
                      <p className="text-sm text-muted-foreground">{slot.beschreibung}</p>
                      {state.dateiName && <p className="text-xs text-green-700 mt-1 font-medium">{state.dateiName}</p>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <label className="cursor-pointer">
                      <input type="file" accept={slot.akzeptiert} className="hidden"
                        multiple={slot.typ === "bild"}
                        onChange={(e) => handleFile(slot.typ, e.target.files?.[0] ?? null)}
                      />
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        state.vorhanden ? "bg-muted text-muted-foreground hover:bg-muted/80" : "bg-foreground text-background hover:bg-foreground/90"
                      }`}>
                        <Upload className="w-4 h-4" />
                        {state.vorhanden ? "Ersetzen" : "Hochladen"}
                      </span>
                    </label>
                    {state.vorhanden && (
                      <button onClick={() => entfernen(slot.typ)}
                        className="flex items-center justify-center gap-1 px-4 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors">
                        <X className="w-3 h-3" /> Entfernen
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold mb-2">Weitere Dateien</h3>
          <p className="text-sm text-muted-foreground mb-4">Belege, Verträge, zusätzliche Bilder oder andere Dokumente.</p>
          <label className="cursor-pointer">
            <input type="file" multiple className="hidden" onChange={(e) => { if (e.target.files?.[0]) alert(`"${e.target.files[0].name}" wurde hochgeladen.`); }} />
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-muted text-sm font-medium hover:bg-muted/80 transition-colors">
              <Upload className="w-4 h-4" /> Datei hochladen
            </span>
          </label>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Problem beim Upload?{" "}
          <a href="/portal/tickets?kategorie=upload_problem" className="text-foreground underline">Ticket erstellen</a>
        </div>
      </div>
    </div>
  );
}
