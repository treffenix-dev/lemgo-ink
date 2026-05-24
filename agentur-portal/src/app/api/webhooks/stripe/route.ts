import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe nicht konfiguriert" }, { status: 503 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.warn("[Stripe Webhook] STRIPE_WEBHOOK_SECRET nicht gesetzt — Signaturprüfung übersprungen");
    return NextResponse.json({ error: "Webhook-Secret nicht konfiguriert" }, { status: 503 });
  }

  if (!sig) {
    return NextResponse.json({ error: "Fehlende Stripe-Signatur" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await req.arrayBuffer();
    const buf = Buffer.from(rawBody);
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Stripe Webhook] Signaturprüfung fehlgeschlagen:", message);
    return NextResponse.json({ error: `Webhook-Signatur ungültig: ${message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log("[Stripe Webhook] checkout.session.completed", {
      session_id: session.id,
      customer_email: session.customer_email,
      amount_total: session.amount_total,
      currency: session.currency,
      payment_status: session.payment_status,
      metadata: session.metadata,
    });

    // TODO: Supabase-Integration
    // Wenn Supabase konfiguriert ist, hier Bestellung in der DB anlegen:
    // - customer_profiles erstellen
    // - projects anlegen
    // - invoices anlegen
    // - notifications erstellen
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
