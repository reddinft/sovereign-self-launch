import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
      apiVersion: '2026-02-25.clover',
    });
  }
  return _stripe;
}

export const VARIANT_PRICE_IDS: Record<string, string> = {
  a: process.env.STRIPE_VARIANT_A_PRICE_ID || 'price_placeholder_a',
  b: process.env.STRIPE_VARIANT_B_PRICE_ID || 'price_placeholder_b',
  c: process.env.STRIPE_VARIANT_C_PRICE_ID || 'price_placeholder_c',
};

export const VARIANT_AMOUNTS_CENTS: Record<string, number> = {
  a: 995,
  b: 1995,
  c: 2995,
};
