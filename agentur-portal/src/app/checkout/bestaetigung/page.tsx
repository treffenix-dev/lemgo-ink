import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";

export default function BestaetigungPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>

        <h1 className="text-2xl font-bold mb-3">Bestellung erfolgreich!</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Vielen Dank für deinen Auftrag. Dein Konto ist jetzt aktiv.
          Wir melden uns innerhalb von 24 Stunden bei dir.
        </p>

        <div className="bg-muted/40 rounded-xl border border-border p-5 mb-8 text-left space-y-3">
          <h3 className="font-semibold text-sm">Nächste Schritte</h3>
          {[
            { n: "1", text: "Kundenportal öffnen und Daten eintragen" },
            { n: "2", text: "Logo, Bilder und Texte hochladen" },
            { n: "3", text: "Wir beginnen mit der Arbeit" },
          ].map((s) => (
            <div key={s.n} className="flex items-center gap-3 text-sm">
              <div className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold shrink-0">
                {s.n}
              </div>
              {s.text}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Button asChild>
            <Link href="/portal">
              Zum Kundenportal <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://wa.me/491234567890" target="_blank" rel="noreferrer">
              <MessageCircle className="w-4 h-4" /> Fragen? WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
