import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import type { PaketType, ZahlungsModell } from "@/types";
import { PAKETE } from "@/lib/data/pakete";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { paket, zahlungsmodell, profil, preis } = body as {
      paket: PaketType;
      zahlungsmodell: ZahlungsModell;
      profil: { email: string; vorname: string; nachname: string; firma: string };
      preis: number;
    };

    const paketData = PAKETE.find((p) => p.id === paket);
    if (!paketData) return NextResponse.json({ error: "Paket nicht gefunden" }, { status: 400 });

    const stripe = getStripe();
    const betragsInCents = Math.round(preis * 100);
    const isAbo = zahlungsmodell === "abo";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "paypal", "klarna", "sepa_debit"],
      mode: isAbo ? "subscription" : "payment",
      customer_email: profil.email,
      metadata: {
        paket,
        zahlungsmodell,
        kundenname: `${profil.vorname} ${profil.nachname}`,
        firma: profil.firma,
      },
      line_items: [{
        price_data: isAbo
          ? { currency: "eur", product_data: { name: `${paketData.name} — Abo` }, recurring: { interval: "month" }, unit_amount: betragsInCents }
          : { currency: "eur", product_data: { name: paketData.name }, unit_amount: betragsInCents },
        quantity: 1,
      }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/bestaetigung?typ=stripe&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?paket=${paket}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Stripe Fehler" }, { status: 500 });
  }
}
