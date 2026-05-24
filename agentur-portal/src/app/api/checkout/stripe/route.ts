import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

type ZahlungsModell = "einmalig" | "halbhalb" | "raten";
type Zahlungsart = "karte" | "paypal" | "klarna" | "sepa";

const PAKET_NAMEN: Record<string, string> = {
  starter: "Starter",
  business: "Business",
  pro: "Pro",
};

// Maps internal zahlungsart to Stripe payment_method_types strings
const PAYMENT_METHOD_TYPES: Record<Zahlungsart, string> = {
  karte: "card",
  paypal: "paypal",
  klarna: "klarna",
  sepa: "sepa_debit",
};

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3456";
}

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe nicht konfiguriert" }, { status: 503 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const body = await req.json();
    const {
      paket,
      zahlungsmodell,
      zahlungsart,
      profil,
      preis,
    }: {
      paket: string;
      zahlungsmodell: ZahlungsModell;
      zahlungsart: Zahlungsart;
      profil: {
        email: string;
        vorname: string;
        nachname: string;
        firma: string;
        strasse: string;
        plz: string;
        ort: string;
        land: string;
      };
      preis: number;
    } = body;

    const baseUrl = getBaseUrl();
    const paketName = PAKET_NAMEN[paket] ?? paket;
    const productName = `WebAgentur ${paketName}-Paket`;

    // For halbhalb: charge 50% now, remainder handled manually
    const chargeAmount = zahlungsmodell === "halbhalb"
      ? Math.round(preis * 0.5 * 100)
      : Math.round(preis * 100);

    const isHalbhalb = zahlungsmodell === "halbhalb";
    const description = isHalbhalb
      ? "Anzahlung 50% — Restzahlung nach Fertigstellung"
      : undefined;

    const paymentMethodType = PAYMENT_METHOD_TYPES[zahlungsart] ?? "card";

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      payment_method_types: [paymentMethodType],
      customer_email: profil.email,
      locale: "de",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: productName,
              ...(description ? { description } : {}),
            },
            unit_amount: chargeAmount,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/checkout/bestaetigung?typ=stripe&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout?paket=${paket}`,
      metadata: {
        paket,
        zahlungsmodell,
        zahlungsart,
        preis_gesamt: String(preis),
        preis_jetzt: String(chargeAmount / 100),
        vorname: profil.vorname,
        nachname: profil.nachname,
        firma: profil.firma,
        strasse: profil.strasse,
        plz: profil.plz,
        ort: profil.ort,
        land: profil.land,
      },
    };

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[Stripe Checkout] Error:", error);
    return NextResponse.json({ error: "Stripe-Fehler beim Erstellen der Session" }, { status: 500 });
  }
}
