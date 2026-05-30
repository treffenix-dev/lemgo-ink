import { NextResponse } from "next/server";

/**
 * Reservierungs-Endpunkt.
 * Validiert die Anfrage und nimmt sie entgegen. Funktioniert sofort (ohne Keys).
 *
 * Zum ECHTEN Speichern/Benachrichtigen hier andocken:
 *  - Supabase: in eine Tabelle `reservierungen` inserten
 *  - oder E-Mail an das Restaurant (Resend/Nodemailer)
 *  - oder Buchungstool (resmio / Quandoo / OpenTable) per API
 */
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { personen, datum, uhrzeit, name, kontakt } = data ?? {};

    if (!personen || !datum || !uhrzeit || !name || !kontakt) {
      return NextResponse.json(
        { ok: false, error: "Bitte alle Felder ausfüllen." },
        { status: 400 }
      );
    }

    // TODO: Hier Supabase-Insert / E-Mail-Versand einsetzen (Keys via ENV).
    // await supabase.from("reservierungen").insert({ personen, datum, uhrzeit, name, kontakt });
    console.log("Neue Reservierungsanfrage:", { personen, datum, uhrzeit, name, kontakt });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }
}
