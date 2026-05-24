"use client";

import { TopBar } from "@/components/layout/TopBar";
import { MessageCircle, Phone, Mail, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
  return (
    <div>
      <TopBar title="Support" />
      <div className="p-6 max-w-2xl space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Wie können wir dir helfen?</h2>
          <p className="text-muted-foreground text-sm">Wähle den Kontaktweg, der dir am liebsten ist.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: MessageCircle, label: "WhatsApp", desc: "Schnellste Antwort — meist innerhalb von 1 Stunde", href: "https://wa.me/491234567890", external: true, color: "text-[#25D366]", bg: "bg-[#25D366]/10" },
            { icon: Phone, label: "Anrufen", desc: "Mo–Fr 9–18 Uhr · +49 1234 567890", href: "tel:+491234567890", external: false, color: "text-blue-600", bg: "bg-blue-50" },
            { icon: Mail, label: "E-Mail", desc: "Antwort innerhalb von 24 Stunden", href: "mailto:hallo@webagentur.de", external: false, color: "text-purple-600", bg: "bg-purple-50" },
            { icon: MessageSquare, label: "Ticket erstellen", desc: "Strukturierte Anfragen mit Verlauf", href: "/portal/tickets?neu=true", external: false, color: "text-amber-600", bg: "bg-amber-50" },
          ].map((c) => (
            <a key={c.label} href={c.href} target={c.external ? "_blank" : undefined} rel={c.external ? "noreferrer" : undefined}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 hover:border-foreground/30 hover:shadow-sm transition-all group">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${c.bg}`}>
                <c.icon className={`w-5 h-5 ${c.color}`} />
              </div>
              <div>
                <p className="font-semibold group-hover:underline">{c.label}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{c.desc}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="rounded-xl border border-border bg-muted/30 p-5">
          <h3 className="font-semibold mb-2">Häufige Fragen</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/portal/tickets?kategorie=upload_problem" className="hover:text-foreground">→ Datei kann nicht hochgeladen werden</Link></li>
            <li><Link href="/portal/rechnungen" className="hover:text-foreground">→ Rechnung oder Zahlung unklar</Link></li>
            <li><Link href="/portal/tickets?kategorie=aenderungswunsch" className="hover:text-foreground">→ Änderungswunsch an der Website</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
