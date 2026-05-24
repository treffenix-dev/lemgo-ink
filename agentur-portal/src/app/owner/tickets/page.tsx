"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter } from "@/components/ui/modal";
import { formatRelative } from "@/lib/utils/format";
import { Search, Send } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { TicketStatus, TicketPriority } from "@/types";

const PRIORITY_CLASS: Record<TicketPriority, string> = {
  niedrig: "text-muted-foreground",
  mittel: "text-amber-600",
  hoch: "text-orange-600",
  kritisch: "text-red-600 font-bold",
};

const PRIORITY_LABEL: Record<TicketPriority, string> = {
  niedrig: "Niedrig",
  mittel: "Mittel",
  hoch: "Hoch",
  kritisch: "Kritisch",
};

type Ticket = {
  id: string;
  kunde: string;
  titel: string;
  kategorie: string;
  prioritaet: TicketPriority;
  status: TicketStatus;
  beschreibung: string;
  created_at: string;
  antworten: { id: string; user: string; text: string; created_at: string }[];
};

const initialTickets: Ticket[] = [
  { id: "1", kunde: "Restaurant Da Vinci", titel: "Logo kann nicht hochgeladen werden", kategorie: "Upload", prioritaet: "hoch", status: "in_bearbeitung", beschreibung: "Wenn ich versuche mein Logo hochzuladen, kommt eine Fehlermeldung: 'Datei zu groß'. Ich habe eine PNG-Datei mit 3MB.", created_at: new Date(Date.now() - 3600000).toISOString(), antworten: [{ id: "a1", user: "Support", text: "Danke für deine Nachricht! Welches Dateiformat verwendest du? Bitte versuche das Logo als JPG unter 2MB hochzuladen.", created_at: new Date(Date.now() - 1800000).toISOString() }] },
  { id: "2", kunde: "Parfümerie Müller", titel: "Änderungswunsch Startseite", kategorie: "Änderungswunsch", prioritaet: "mittel", status: "offen", beschreibung: "Ich möchte gerne die Farbe des Buttons auf der Startseite von Schwarz auf Bordeaux ändern. Außerdem soll der Text im Hero etwas kürzer sein.", created_at: new Date(Date.now() - 7200000).toISOString(), antworten: [] },
  { id: "3", kunde: "Friseur Schneider", titel: "Rechnung unklar", kategorie: "Rechnung", prioritaet: "niedrig", status: "warten_owner", beschreibung: "Ich verstehe nicht, warum in der Rechnung 19% MwSt. ausgewiesen sind. Ich bin Kleinunternehmer.", created_at: new Date(Date.now() - 86400000).toISOString(), antworten: [] },
];

const STATUS_FILTER = ["alle", "offen", "in_bearbeitung", "warten_owner", "warten_kunde", "geloest"] as const;

const STATUS_LABELS: Record<string, string> = {
  alle: "Alle",
  offen: "Offen",
  in_bearbeitung: "In Bearbeitung",
  warten_owner: "Warten (ich)",
  warten_kunde: "Warten (Kunde)",
  geloest: "Gelöst",
};

export default function OwnerTicketsPage() {
  const [tickets, setTickets] = useLocalStorage<Ticket[]>("owner_tickets", initialTickets);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("alle");
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [replyText, setReplyText] = useState("");

  const filtered = tickets.filter((t) => {
    const matchSearch = t.titel.toLowerCase().includes(search.toLowerCase()) || t.kunde.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "alle" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  function sendReply() {
    if (!selected || !replyText.trim()) return;
    const newReply = { id: Date.now().toString(), user: "WebAgentur", text: replyText.trim(), created_at: new Date().toISOString() };
    const updatedTickets = tickets.map((t) =>
      t.id === selected.id ? { ...t, antworten: [...t.antworten, newReply], status: "warten_kunde" as TicketStatus } : t
    );
    setTickets(updatedTickets);
    const updated = updatedTickets.find((t) => t.id === selected.id)!;
    setSelected(updated);
    setReplyText("");
  }

  function markResolved() {
    if (!selected) return;
    const updatedTickets = tickets.map((t) => t.id === selected.id ? { ...t, status: "geloest" as TicketStatus } : t);
    setTickets(updatedTickets);
    setSelected(updatedTickets.find((t) => t.id === selected.id)!);
  }

  return (
    <div>
      <TopBar title="Tickets" />
      <div className="p-4 sm:p-6 max-w-5xl space-y-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative max-w-sm flex-1 min-w-[160px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Suchen..."
              className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="flex flex-wrap gap-1">
            {STATUS_FILTER.map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  statusFilter === s ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}>
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Ticket</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide hidden md:table-cell">Kunde</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide hidden sm:table-cell">Priorität</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Status</th>
                <th className="w-10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((t) => (
                <tr key={t.id} onClick={() => { setSelected(t); setReplyText(""); }} className="hover:bg-muted/20 cursor-pointer transition-colors">
                  <td className="px-5 py-4 font-medium max-w-[180px] truncate">{t.titel}</td>
                  <td className="px-5 py-4 hidden md:table-cell text-muted-foreground">{t.kunde}</td>
                  <td className={`px-5 py-4 hidden sm:table-cell text-xs font-medium ${PRIORITY_CLASS[t.prioritaet]}`}>{PRIORITY_LABEL[t.prioritaet]}</td>
                  <td className="px-5 py-4"><StatusBadge type="ticket" status={t.status} /></td>
                  <td className="px-3 py-4 text-muted-foreground">›</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-10 text-muted-foreground text-sm">Keine Tickets gefunden.</div>}
        </div>
      </div>

      <Modal open={!!selected} onOpenChange={() => { setSelected(null); setReplyText(""); }}>
        <ModalContent size="lg">
          {selected && (
            <>
              <ModalHeader>
                <div className="flex items-start gap-3 pr-8 flex-wrap">
                  <ModalTitle className="flex-1 min-w-0">{selected.titel}</ModalTitle>
                  <div className="flex gap-2 shrink-0">
                    <StatusBadge type="ticket" status={selected.status} />
                    <span className={`text-xs font-medium ${PRIORITY_CLASS[selected.prioritaet]}`}>{PRIORITY_LABEL[selected.prioritaet]}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{selected.kunde} · {selected.kategorie} · {formatRelative(selected.created_at)}</p>
              </ModalHeader>

              <div className="p-6 space-y-3 max-h-[50vh] overflow-y-auto">
                <div className="bg-muted/40 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Kundennachricht</p>
                  <p className="text-sm">{selected.beschreibung}</p>
                </div>
                {selected.antworten.map((a) => (
                  <div key={a.id} className={`rounded-lg p-4 ${a.user === "WebAgentur" ? "bg-blue-50 border border-blue-100 ml-4" : "bg-muted/40"}`}>
                    <p className={`text-xs font-medium mb-1 ${a.user === "WebAgentur" ? "text-blue-600" : "text-muted-foreground"}`}>{a.user}</p>
                    <p className="text-sm">{a.text}</p>
                    <p className="text-xs text-muted-foreground mt-2">{formatRelative(a.created_at)}</p>
                  </div>
                ))}
              </div>

              <div className="px-6 pb-2 space-y-2">
                {selected.status !== "geloest" && (
                  <div className="flex gap-2">
                    <Textarea value={replyText} onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Antwort an Kunden schreiben..."
                      className="min-h-[80px] resize-none text-sm"
                      onKeyDown={(e) => { if (e.key === "Enter" && e.metaKey) sendReply(); }}
                    />
                    <button onClick={sendReply} disabled={!replyText.trim()}
                      className="self-end p-2.5 rounded-lg bg-foreground text-background hover:bg-foreground/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <ModalFooter>
                <Button variant="outline" onClick={() => { setSelected(null); setReplyText(""); }}>Schließen</Button>
                {selected.status !== "geloest" && (
                  <Button variant="outline" onClick={markResolved}>Als gelöst markieren</Button>
                )}
                {replyText.trim() && (
                  <Button onClick={sendReply}><Send className="w-4 h-4" /> Antwort senden</Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
