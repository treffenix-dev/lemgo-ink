"use client";
import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Check, X, Eye } from "lucide-react";

type FreigabeStatus = "ausstehend" | "freigegeben" | "abgelehnt";

const initFreigaben = [
  { id: "1", typ: "Design", titel: "Homepage — Erster Entwurf", beschreibung: "Bitte prüfe das Design der Startseite und gib dein Feedback.", datum: "Heute, 10:00", status: "ausstehend" as FreigabeStatus },
  { id: "2", typ: "Inhalt", titel: "Über uns Seite — Textentwurf", beschreibung: "Der Textentwurf für deine Über-uns-Seite ist fertig.", datum: "Gestern, 15:30", status: "ausstehend" as FreigabeStatus },
  { id: "3", typ: "Design", titel: "Mobile Version — Startseite", beschreibung: "Mobile Ansicht der Startseite wurde fertiggestellt.", datum: "12.06.2025", status: "freigegeben" as FreigabeStatus },
];

const statusMap: Record<FreigabeStatus, { label: string; cls: string }> = {
  ausstehend: { label: "Ausstehend", cls: "bg-amber-100 text-amber-700" },
  freigegeben: { label: "Freigegeben", cls: "bg-green-100 text-green-700" },
  abgelehnt: { label: "Abgelehnt", cls: "bg-red-100 text-red-700" },
};

export default function FreigabenPage() {
  const [items, setItems] = useState(initFreigaben);

  function freigeben(id: string) {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, status: "freigegeben" as FreigabeStatus } : i));
  }

  function ablehnen(id: string) {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, status: "abgelehnt" as FreigabeStatus } : i));
  }

  return (
    <div>
      <TopBar title="Freigaben" />
      <div className="p-6 max-w-3xl space-y-4">
        <p className="text-sm text-muted-foreground">Hier siehst du alle Entwürfe, die auf deine Freigabe warten.</p>
        {items.map((item) => {
          const s = statusMap[item.status];
          return (
            <div key={item.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{item.typ}</span>
                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${s.cls}`}>{s.label}</span>
                  </div>
                  <h3 className="font-semibold">{item.titel}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.datum}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{item.beschreibung}</p>
              {item.status === "ausstehend" && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" /> Vorschau
                  </Button>
                  <Button size="sm" onClick={() => freigeben(item.id)} className="bg-green-600 hover:bg-green-700 text-white">
                    <Check className="w-4 h-4" /> Freigeben
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => ablehnen(item.id)} className="text-red-600 border-red-200 hover:bg-red-50">
                    <X className="w-4 h-4" /> Ablehnen
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
