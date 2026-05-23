import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const STRIPE_PRICES = {
  starter_einmalig: process.env.STRIPE_PRICE_STARTER_EINMALIG,
  business_einmalig: process.env.STRIPE_PRICE_BUSINESS_EINMALIG,
  pro_einmalig: process.env.STRIPE_PRICE_PRO_EINMALIG,
  starter_abo: process.env.STRIPE_PRICE_STARTER_ABO,
  business_abo: process.env.STRIPE_PRICE_BUSINESS_ABO,
  pro_abo: process.env.STRIPE_PRICE_PRO_ABO,
} as const;
