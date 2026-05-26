"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter } from "@/components/ui/modal";
import { Search, ChevronRight, Mail, Phone, Package, Clock, Plus, Pencil, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { ProjectStatus, InvoiceStatus } from "@/types";

type Kunde = {
  id: string;
  firma: string;
  kontakt: string;
  email: string;
  telefon: string;
  paket: string;
  status: ProjectStatus;
  zahlungsstatus: InvoiceStatus;
  letztAktiv: string;
  notizen: string;
};

const mockKunden: Kunde[] = [
  { id: "1", firma: "Restaurant Da Vinci", kontakt: "Marco Da Vinci", email: "marco@davinci.de", telefon: "0521 123456", paket: "Business", status: "daten_ausfuellen", zahlungsstatus: "offen", letztAktiv: "Heute 14:23", notizen: "Wartet auf Logo-Upload und Speisekarte." },
  { id: "2", firma: "Parfümerie Müller", kontakt: "Sabine Müller", email: "info@parfuemerie-mueller.de", telefon: "05231 998877", paket: "Pro", status: "in_arbeit", zahlungsstatus: "bezahlt", letztAktiv: "Heute 11:05", notizen: "Design läuft, Feedbackrunde diese Woche." },
  { id: "3", firma: "Friseur Schneider", kontakt: "Peter Schneider", email: "peter@friseur-schneider.de", telefon: "0152 33445566", paket: "Starter", status: "review", zahlungsstatus: "bezahlt", letztAktiv: "Gestern", notizen: "Seite liegt zur Abnahme vor." },
  { id: "4", firma: "Bäckerei Wagner", kontakt: "Lisa Wagner", email: "lisa@baeckerei-wagner.de", telefon: "05232 112233", paket: "Business", status: "fertig", zahlungsstatus: "bezahlt", letztAktiv: "vor 3 Tagen", notizen: "Projekt abgeschlossen, läuft live." },
];

const PAKETE = ["Starter", "Business", "Pro", "Enterprise"];
const PROJECT_STATUSES: ProjectStatus[] = ["daten_ausfuellen", "in_arbeit", "review", "fertig"];
const INVOICE_STATUSES: InvoiceStatus[] = ["offen", "bezahlt", "ueberfaellig"];

const EMPTY_FORM: Omit<Kunde, "id"> = {
  firma: "", kontakt: "", email: "", telefon: "",
  paket: "Business", status: "daten_ausfuellen",
  zahlungsstatus: "offen", letztAktiv: "Gerade", notizen: "",
};

export default function KundenPage() {
  const [kunden, setKunden] = useLocalStorage<Kunde[]>("owner_kunden", mockKunden);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Kunde | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Kunde, "id">>(EMPTY_FORM);

  const filtered = kunden.filter((k) =>
    k.firma.toLowerCase().includes(search.toLowerCase()) ||
    k.kontakt.toLowerCase().includes(search.toLowerCase()) ||
    k.email.toLowerCase().includes(search.toLowerCase())
  );

  function upd<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function openCreate() {
    setEditId(null);
    setForm(EMPTY_FORM);
    setEditOpen(true);
  }

  function openEdit(k: Kunde) {
    setEditId(k.id);
    setForm({ firma: k.firma, kontakt: k.kontakt, email: k.email, telefon: k.telefon, paket: k.paket, status: k.status, zahlungsstatus: k.zahlungsstatus, letztAktiv: k.letztAktiv, notizen: k.notizen });
    setSelected(null);
    setEditOpen(true);
  }

  function saveKunde() {
    if (!form.firma.trim()) return;
    if (editId) {
      setKunden((prev) => prev.map((k) => k.id === editId ? { ...k, ...form } : k));
    } else {
      setKunden((prev) => [{ ...form, id: Date.now().toString() }, ...prev]);
    }
    setEditOpen(false);
    setEditId(null);
  }

  function deleteKunde(id: string) {
    if (!confirm("Kunden wirklich löschen?")) return;
    setKunden((prev) => prev.filter((k) => k.id !== id));
    setSelected(null);
  }

  const selectCls = "w-full h-9 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div>
      <TopBar
        title="Kunden"
        actions={
          <Button size="sm" onClick={openCreate}>
            <Plus className="w-4 h-4" /><span className="hidden sm:inline ml-1">Neuer Kunde</span>
          </Button>
        }
      />
      <div className="p-4 sm:p-6 max-w-5xl space-y-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Suchen..."
            className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Firma</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide hidden md:table-cell">Paket</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Projektstatus</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide hidden lg:table-cell">Zahlung</th>
                <th className="w-20" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((k) => (
                <tr key={k.id} onClick={() => setSelected(k)} className="hover:bg-muted/20 cursor-pointer transition-colors">
                  <td className="px-5 py-4"><p className="font-medium">{k.firma}</p><p className="text-xs text-muted-foreground">{k.email}</p></td>
                  <td className="px-5 py-4 hidden md:table-cell text-muted-foreground">{k.paket}</td>
                  <td className="px-5 py-4"><StatusBadge type="project" status={k.status} /></td>
                  <td className="px-5 py-4 hidden lg:table-cell"><StatusBadge type="invoice" status={k.zahlungsstatus} /></td>
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-1">
                      <button onClick={(e) => { e.stopPropagation(); openEdit(k); }} className="text-muted-foreground hover:text-foreground transition-colors p-1">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); deleteKunde(k.id); }} className="text-muted-foreground hover:text-red-400 transition-colors p-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-muted-foreground text-sm">Keine Kunden gefunden.</div>}
        </div>
      </div>

      {/* Detail Modal */}
      <Modal open={!!selected} onOpenChange={() => setSelected(null)}>
        <ModalContent>
          {selected && (
            <>
              <ModalHeader>
                <ModalTitle>{selected.firma}</ModalTitle>
              </ModalHeader>
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <StatusBadge type="project" status={selected.status} />
                  <StatusBadge type="invoice" status={selected.zahlungsstatus} />
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <Package className="w-4 h-4 mt-0.5 shrink-0" />
                    <div><p className="text-xs uppercase tracking-wide mb-0.5">Paket</p><p className="text-foreground font-medium">{selected.paket}</p></div>
                  </div>
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                    <div><p className="text-xs uppercase tracking-wide mb-0.5">Letzte Aktivität</p><p className="text-foreground">{selected.letztAktiv}</p></div>
                  </div>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
                  <p className="text-sm font-medium">{selected.kontakt}</p>
                  <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Mail className="w-4 h-4" />{selected.email}
                  </a>
                  <a href={`tel:${selected.telefon}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Phone className="w-4 h-4" />{selected.telefon}
                  </a>
                </div>
                {selected.notizen && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-xs font-medium text-amber-800 mb-1">Notiz</p>
                    <p className="text-sm text-amber-700">{selected.notizen}</p>
                  </div>
                )}
                <div className="flex gap-2 pt-1">
                  <Button className="flex-1" onClick={() => openEdit(selected)}><Pencil className="w-4 h-4" /> Bearbeiten</Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <a href={`mailto:${selected.email}`}><Mail className="w-4 h-4" /> E-Mail</a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Create / Edit Modal */}
      <Modal open={editOpen} onOpenChange={(v) => { setEditOpen(v); if (!v) setEditId(null); }}>
        <ModalContent>
          <ModalHeader><ModalTitle>{editId ? "Kunde bearbeiten" : "Neuer Kunde"}</ModalTitle></ModalHeader>
          <div className="p-6 grid grid-cols-2 gap-4">
            <Input label="Firmenname" required className="col-span-2" value={form.firma} onChange={(e) => upd("firma", e.target.value)} placeholder="Restaurant Da Vinci" />
            <Input label="Ansprechpartner" value={form.kontakt} onChange={(e) => upd("kontakt", e.target.value)} placeholder="Max Mustermann" />
            <Input label="E-Mail" type="email" value={form.email} onChange={(e) => upd("email", e.target.value)} placeholder="max@firma.de" />
            <Input label="Telefon" type="tel" value={form.telefon} onChange={(e) => upd("telefon", e.target.value)} placeholder="0521 123456" />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Paket</label>
              <select className={selectCls} value={form.paket} onChange={(e) => upd("paket", e.target.value)}>
                {PAKETE.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Projektstatus</label>
              <select className={selectCls} value={form.status} onChange={(e) => upd("status", e.target.value as ProjectStatus)}>
                {PROJECT_STATUSES.map((s) => (
                  <option key={s} value={s}>{s === "daten_ausfuellen" ? "Daten ausfüllen" : s === "in_arbeit" ? "In Arbeit" : s === "review" ? "Review" : "Fertig"}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Zahlungsstatus</label>
              <select className={selectCls} value={form.zahlungsstatus} onChange={(e) => upd("zahlungsstatus", e.target.value as InvoiceStatus)}>
                {INVOICE_STATUSES.map((s) => (
                  <option key={s} value={s}>{s === "offen" ? "Offen" : s === "bezahlt" ? "Bezahlt" : "Überfällig"}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5 col-span-2">
              <label className="text-xs font-medium text-muted-foreground">Notizen</label>
              <textarea className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" rows={3}
                value={form.notizen} onChange={(e) => upd("notizen", e.target.value)} placeholder="Interne Notizen zum Kunden..." />
            </div>
          </div>
          <ModalFooter>
            <Button variant="outline" onClick={() => { setEditOpen(false); setEditId(null); }}>Abbrechen</Button>
            <Button disabled={!form.firma.trim()} onClick={saveKunde}>{editId ? "Speichern" : "Kunde anlegen"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
