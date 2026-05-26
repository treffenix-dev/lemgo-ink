"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Check, X, Eye, ExternalLink, MessageSquare } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type FreigabeStatus = "ausstehend" | "freigegeben" | "abgelehnt";
type Freigabe = {
  id: string;
  typ: string;
  titel: string;
  beschreibung: string;
  datum: string;
  status: FreigabeStatus;
  vorschauUrl?: string;
  kommentar?: string;
};

const initialFreigaben: Freigabe[] = [
  { id: "1", typ: "Design", titel: "Homepage — Erster Entwurf", beschreibung: "Bitte prüfe das Design der Startseite und gib dein Feedback.", datum: "Heute, 10:00", status: "ausstehend", vorschauUrl: "https://restaurant-da-vinci.vercel.app" },
  { id: "2", typ: "Inhalt", titel: "Über uns Seite — Textentwurf", beschreibung: "Der Textentwurf für deine Über-uns-Seite ist fertig.", datum: "Gestern, 15:30", status: "ausstehend" },
  { id: "3", typ: "Design", titel: "Mobile Version — Startseite", beschreibung: "Mobile Ansicht der Startseite wurde fertiggestellt.", datum: "12.06.2025", status: "freigegeben", kommentar: "Sieht super aus!" },
];

const statusMap: Record<FreigabeStatus, { label: string; cls: string }> = {
  ausstehend: { label: "Ausstehend", cls: "bg-amber-100 text-amber-700" },
  freigegeben: { label: "Freigegeben", cls: "bg-green-100 text-green-700" },
  abgelehnt: { label: "Abgelehnt", cls: "bg-red-100 text-red-700" },
};

export default function FreigabenPage() {
  const [items, setItems] = useLocalStorage<Freigabe[]>("portal_freigaben", initialFreigaben);
  const [commentId, setCommentId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [pendingAction, setPendingAction] = useState<"freigeben" | "ablehnen" | null>(null);

  function openComment(id: string, action: "freigeben" | "ablehnen") {
    setCommentId(id);
    setPendingAction(action);
    setCommentText("");
  }

  function submitDecision() {
    if (!commentId || !pendingAction) return;
    setItems((prev) => prev.map((i) =>
      i.id === commentId
        ? { ...i, status: pendingAction === "freigeben" ? "freigegeben" : "abgelehnt" as FreigabeStatus, kommentar: commentText.trim() || undefined }
        : i
    ));
    setCommentId(null);
    setPendingAction(null);
    setCommentText("");
  }

  function resetDecision(id: string) {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, status: "ausstehend", kommentar: undefined } : i));
  }

  const ausstehend = items.filter((i) => i.status === "ausstehend").length;

  return (
    <div>
      <TopBar title="Freigaben" />
      <div className="p-4 sm:p-6 max-w-3xl space-y-4">
        {ausstehend > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            <strong>{ausstehend} Freigabe{ausstehend !== 1 ? "n" : ""}</strong> warten auf deine Entscheidung.
          </div>
        )}

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
              <p className="text-sm text-muted-foreground mb-3">{item.beschreibung}</p>

              {item.kommentar && (
                <div className="flex items-start gap-2 bg-muted/40 rounded-lg p-3 mb-3 text-sm">
                  <MessageSquare className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-muted-foreground italic">{item.kommentar}</p>
                </div>
              )}

              {item.status === "ausstehend" && commentId !== item.id && (
                <div className="flex gap-2 flex-wrap">
                  {item.vorschauUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={item.vorschauUrl} target="_blank" rel="noreferrer">
                        <Eye className="w-4 h-4" /> Vorschau
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  )}
                  {!item.vorschauUrl && (
                    <Button size="sm" variant="outline"><Eye className="w-4 h-4" /> Vorschau</Button>
                  )}
                  <Button size="sm" onClick={() => openComment(item.id, "freigeben")} className="bg-green-600 hover:bg-green-700 text-white">
                    <Check className="w-4 h-4" /> Freigeben
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => openComment(item.id, "ablehnen")} className="text-red-600 border-red-200 hover:bg-red-50">
                    <X className="w-4 h-4" /> Ablehnen
                  </Button>
                </div>
              )}

              {commentId === item.id && (
                <div className="space-y-3">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={pendingAction === "ablehnen" ? "Was soll geändert werden? (optional)" : "Feedback oder Kommentar (optional)"}
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => { setCommentId(null); setPendingAction(null); }}>
                      Abbrechen
                    </Button>
                    <Button
                      size="sm"
                      onClick={submitDecision}
                      className={pendingAction === "freigeben" ? "bg-green-600 hover:bg-green-700 text-white" : ""}
                      variant={pendingAction === "ablehnen" ? "outline" : undefined}
                    >
                      {pendingAction === "freigeben" ? <><Check className="w-4 h-4" /> Jetzt freigeben</> : <><X className="w-4 h-4" /> Jetzt ablehnen</>}
                    </Button>
                  </div>
                </div>
              )}

              {item.status !== "ausstehend" && commentId !== item.id && (
                <button onClick={() => resetDecision(item.id)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors mt-2">
                  Entscheidung zurücksetzen
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
