"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/ui/status-badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter } from "@/components/ui/modal";
import { MessageSquare, Plus, Send } from "lucide-react";
import type { TicketCategory } from "@/types";
import { formatRelative } from "@/lib/utils/format";

const KATEGORIEN: { value: TicketCategory; label: string }[] = [
  { value: "allgemein", label: "Allgemeine Frage" },
  { value: "logo_fehlt", label: "Logo fehlt" },
  { value: "texte_fehlen", label: "Texte fehlen" },
  { value: "bilder_fehlen", label: "Bilder fehlen" },
  { value: "upload_problem", label: "Upload-Problem" },
  { value: "speisekarte_fehlt", label: "Speisekarte fehlt" },
  { value: "aenderungswunsch", label: "Änderungswunsch" },
  { value: "rechnung", label: "Rechnung" },
  { value: "zahlung", label: "Zahlung" },
  { value: "bug", label: "Fehler" },
  { value: "sonstiges", label: "Sonstiges" },
];

type Antwort = { id: string; user: string; text: string; created_at: string };
type Ticket = {
  id: string;
  titel: string;
  kategorie: TicketCategory;
  status: "offen" | "in_bearbeitung" | "warten_owner" | "warten_kunde" | "geloest";
  prioritaet: "niedrig" | "mittel" | "hoch" | "kritisch";
  beschreibung: string;
  created_at: string;
  antworten: Antwort[];
};

const initialTickets: Ticket[] = [
  {
    id: "1", titel: "Logo kann nicht hochgeladen werden", kategorie: "upload_problem",
    status: "in_bearbeitung", prioritaet: "hoch",
    beschreibung: "Wenn ich versuche mein Logo hochzuladen, kommt eine Fehlermeldung.",
    created_at: new Date(Date.now() - 3600000).toISOString(),
    antworten: [{ id: "a1", user: "Support", text: "Danke für deine Nachricht! Welches Dateiformat verwendest du?", created_at: new Date(Date.now() - 1800000).toISOString() }],
  },
  {
    id: "2", titel: "Frage zu Öffnungszeiten", kategorie: "allgemein",
    status: "geloest", prioritaet: "niedrig",
    beschreibung: "Wo kann ich die Öffnungszeiten eintragen?",
    created_at: new Date(Date.now() - 86400000).toISOString(), antworten: [],
  },
];

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [createOpen, setCreateOpen] = useState(false);
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const [newTitel, setNewTitel] = useState("");
  const [newKategorie, setNewKategorie] = useState<TicketCategory>("allgemein");
  const [newBeschreibung, setNewBeschreibung] = useState("");
  const [replyText, setReplyText] = useState("");

  function createTicket() {
    if (!newTitel.trim() || !newBeschreibung.trim()) return;
    const t: Ticket = {
      id: Date.now().toString(),
      titel: newTitel.trim(),
      kategorie: newKategorie,
      status: "offen",
      prioritaet: "mittel",
      beschreibung: newBeschreibung.trim(),
      created_at: new Date().toISOString(),
      antworten: [],
    };
    setTickets((prev) => [t, ...prev]);
    setCreateOpen(false);
    setNewTitel("");
    setNewBeschreibung("");
    setNewKategorie("allgemein");
  }

  function sendReply() {
    if (!activeTicket || !replyText.trim()) return;
    const newReply: Antwort = { id: Date.now().toString(), user: "Du", text: replyText.trim(), created_at: new Date().toISOString() };
    const updated = tickets.map((t) =>
      t.id === activeTicket.id ? { ...t, antworten: [...t.antworten, newReply], status: "warten_owner" as const } : t
    );
    setTickets(updated);
    setActiveTicket(updated.find((t) => t.id === activeTicket.id)!);
    setReplyText("");
  }

  return (
    <div>
      <TopBar title="Tickets" actions={<Button size="sm" onClick={() => setCreateOpen(true)}><Plus className="w-4 h-4" /><span className="hidden sm:inline ml-1">Neues Ticket</span></Button>} />
      <div className="p-4 sm:p-6 max-w-3xl">
        {tickets.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
            <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="font-medium mb-1">Noch keine Tickets</p>
            <Button size="sm" onClick={() => setCreateOpen(true)}>Erstes Ticket erstellen</Button>
          </div>
        ) : (
          <div className="space-y-3">
            {tickets.map((t) => (
              <button key={t.id} onClick={() => { setActiveTicket(t); setReplyText(""); }}
                className="w-full text-left rounded-xl border border-border bg-card p-5 hover:border-foreground/30 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="font-medium">{t.titel}</p>
                  <StatusBadge type="ticket" status={t.status} />
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{KATEGORIEN.find((k) => k.value === t.kategorie)?.label}</span>
                  <span>•</span>
                  <span>{formatRelative(t.created_at)}</span>
                  {t.antworten.length > 0 && <><span>•</span><span>{t.antworten.length} Antwort{t.antworten.length !== 1 ? "en" : ""}</span></>}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Create ticket modal */}
      <Modal open={createOpen} onOpenChange={setCreateOpen}>
        <ModalContent>
          <ModalHeader><ModalTitle>Neues Ticket</ModalTitle></ModalHeader>
          <div className="p-6 space-y-4">
            <Input label="Titel" required value={newTitel} onChange={(e) => setNewTitel(e.target.value)} placeholder="Kurze Beschreibung des Problems" />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Kategorie</label>
              <Select value={newKategorie} onValueChange={(v) => setNewKategorie(v as TicketCategory)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {KATEGORIEN.map((k) => <SelectItem key={k.value} value={k.value}>{k.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Textarea label="Beschreibung" required value={newBeschreibung} onChange={(e) => setNewBeschreibung(e.target.value)} placeholder="Beschreibe dein Anliegen..." className="min-h-[120px]" />
          </div>
          <ModalFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Abbrechen</Button>
            <Button disabled={!newTitel || !newBeschreibung} onClick={createTicket}>Ticket erstellen</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* View ticket modal */}
      <Modal open={!!activeTicket} onOpenChange={() => { setActiveTicket(null); setReplyText(""); }}>
        <ModalContent size="lg">
          {activeTicket && (
            <>
              <ModalHeader>
                <div className="flex items-center gap-3 pr-8 flex-wrap">
                  <ModalTitle className="flex-1 min-w-0">{activeTicket.titel}</ModalTitle>
                  <StatusBadge type="ticket" status={activeTicket.status} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{KATEGORIEN.find((k) => k.value === activeTicket.kategorie)?.label} · {formatRelative(activeTicket.created_at)}</p>
              </ModalHeader>

              <div className="p-6 space-y-3 max-h-[45vh] overflow-y-auto">
                <div className="bg-muted/40 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Deine Nachricht</p>
                  <p className="text-sm">{activeTicket.beschreibung}</p>
                </div>
                {activeTicket.antworten.map((a) => (
                  <div key={a.id} className={`rounded-lg p-4 ${a.user === "Du" ? "bg-muted/40 ml-4" : "bg-blue-50 border border-blue-100"}`}>
                    <p className={`text-xs font-medium mb-1 ${a.user === "Du" ? "text-muted-foreground" : "text-blue-600"}`}>{a.user}</p>
                    <p className="text-sm">{a.text}</p>
                    <p className="text-xs text-muted-foreground mt-2">{formatRelative(a.created_at)}</p>
                  </div>
                ))}
              </div>

              {activeTicket.status !== "geloest" && (
                <div className="px-6 pb-4 flex gap-2">
                  <Textarea value={replyText} onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Antwort schreiben..."
                    className="min-h-[80px] resize-none text-sm"
                    onKeyDown={(e) => { if (e.key === "Enter" && e.metaKey) sendReply(); }}
                  />
                  <button onClick={sendReply} disabled={!replyText.trim()}
                    className="self-end p-2.5 rounded-lg bg-foreground text-background hover:bg-foreground/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
