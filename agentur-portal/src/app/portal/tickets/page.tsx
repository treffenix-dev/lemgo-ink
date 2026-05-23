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

const mockTickets = [
  {
    id: "1", titel: "Logo kann nicht hochgeladen werden", kategorie: "upload_problem" as TicketCategory,
    status: "in_bearbeitung" as const, prioritaet: "hoch" as const,
    beschreibung: "Wenn ich versuche mein Logo hochzuladen, kommt eine Fehlermeldung.",
    created_at: new Date(Date.now() - 3600000).toISOString(),
    antworten: [{ id: "a1", user: "Support", text: "Danke für deine Nachricht! Welches Dateiformat verwendest du?", created_at: new Date(Date.now() - 1800000).toISOString() }],
  },
  {
    id: "2", titel: "Frage zu Öffnungszeiten", kategorie: "allgemein" as TicketCategory,
    status: "geloest" as const, prioritaet: "niedrig" as const,
    beschreibung: "Wo kann ich die Öffnungszeiten eintragen?",
    created_at: new Date(Date.now() - 86400000).toISOString(), antworten: [],
  },
];

export default function TicketsPage() {
  const [open, setOpen] = useState(false);
  const [activeTicket, setActiveTicket] = useState<typeof mockTickets[0] | null>(null);
  const [newTitel, setNewTitel] = useState("");
  const [newKategorie, setNewKategorie] = useState<TicketCategory>("allgemein");
  const [newBeschreibung, setNewBeschreibung] = useState("");
  const [replyText, setReplyText] = useState("");

  return (
    <div>
      <TopBar title="Tickets" actions={<Button size="sm" onClick={() => setOpen(true)}><Plus className="w-4 h-4" /> Neues Ticket</Button>} />
      <div className="p-6 max-w-3xl">
        {mockTickets.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
            <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="font-medium mb-1">Noch keine Tickets</p>
            <Button size="sm" onClick={() => setOpen(true)}>Erstes Ticket erstellen</Button>
          </div>
        ) : (
          <div className="space-y-3">
            {mockTickets.map((t) => (
              <button key={t.id} onClick={() => setActiveTicket(t)}
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

      <Modal open={open} onOpenChange={setOpen}>
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
            <Button variant="outline" onClick={() => setOpen(false)}>Abbrechen</Button>
            <Button disabled={!newTitel || !newBeschreibung}>Ticket erstellen</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal open={!!activeTicket} onOpenChange={() => setActiveTicket(null)}>
        <ModalContent size="lg">
          {activeTicket && (
            <>
              <ModalHeader>
                <div className="flex items-center gap-3 pr-8">
                  <ModalTitle className="flex-1">{activeTicket.titel}</ModalTitle>
                  <StatusBadge type="ticket" status={activeTicket.status} />
                </div>
              </ModalHeader>
              <div className="p-6 space-y-4">
                <div className="bg-muted/40 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">Deine Nachricht</p>
                  <p className="text-sm">{activeTicket.beschreibung}</p>
                </div>
                {activeTicket.antworten.map((a) => (
                  <div key={a.id} className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <p className="text-xs text-blue-600 font-medium mb-1">{a.user}</p>
                    <p className="text-sm">{a.text}</p>
                    <p className="text-xs text-muted-foreground mt-2">{formatRelative(a.created_at)}</p>
                  </div>
                ))}
                {activeTicket.status !== "geloest" && (
                  <div className="flex gap-2">
                    <Textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Antwort schreiben..." className="min-h-[80px]" />
                    <Button size="icon" className="self-end" disabled={!replyText}><Send className="w-4 h-4" /></Button>
                  </div>
                )}
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
