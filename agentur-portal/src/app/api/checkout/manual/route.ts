import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { profil, paket, zahlungsart, preis } = body;

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log("[Demo Checkout]", profil?.email, paket, preis);
      return NextResponse.json({ customerId: `demo_${Date.now()}` });
    }

    const supabase = await createClient();

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: profil.email,
      password: profil.passwort,
      user_metadata: { role: "customer" },
      email_confirm: true,
    });

    if (authError || !authData.user) {
      return NextResponse.json({ error: "Benutzer konnte nicht erstellt werden" }, { status: 500 });
    }

    const { data: customerProfile, error: profileError } = await supabase
      .from("customer_profiles")
      .insert({
        user_id: authData.user.id,
        vorname: profil.vorname,
        nachname: profil.nachname,
        firma: profil.firma,
        email: profil.email,
        telefon: profil.telefon,
        strasse: profil.strasse,
        plz: profil.plz,
        ort: profil.ort,
        land: profil.land,
        branche: profil.branche,
      })
      .select()
      .single();

    if (profileError || !customerProfile) {
      return NextResponse.json({ error: "Profil konnte nicht erstellt werden" }, { status: 500 });
    }

    const { error: projectError } = await supabase.from("projects").insert({
      customer_id: customerProfile.id,
      name: `${profil.firma} — Website`,
      paket,
      status: "nicht_gestartet",
    });

    if (projectError) console.error("Project creation error:", projectError);

    const invoiceNumber = `RE-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`;
    const netto = preis / 1.19;

    await supabase.from("invoices").insert({
      invoice_number: invoiceNumber,
      customer_id: customerProfile.id,
      betrag: Math.round(netto * 100) / 100,
      mwst: 19,
      gesamt: preis,
      status: "offen",
      zahlungsart,
      positionen: [{ bezeichnung: `${paket.charAt(0).toUpperCase() + paket.slice(1)}-Paket — Website`, menge: 1, einzelpreis: Math.round(netto * 100) / 100, gesamt: Math.round(netto * 100) / 100 }],
    });

    await supabase.from("notifications").insert({
      user_id: authData.user.id,
      typ: "konto_erstellt",
      titel: "Willkommen bei WebAgentur!",
      text: "Dein Konto wurde erfolgreich erstellt. Bitte füll jetzt deine Daten im Onboarding aus.",
      link: "/portal",
    });

    return NextResponse.json({ customerId: customerProfile.id });
  } catch (error) {
    console.error("Manual checkout error:", error);
    return NextResponse.json({ error: "Interner Fehler" }, { status: 500 });
  }
}
