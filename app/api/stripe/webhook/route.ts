import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { ensureDb } from '@/lib/db';
import { getStripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Stripe webhook is not configured' }, { status: 503 });
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });
  }

  const rawBody = await req.text();
  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    console.error('Stripe webhook signature verification failed:', error);
    return NextResponse.json({ error: 'Invalid Stripe signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const sessionId = session.id;
    const email = session.customer_email || session.metadata?.email || '';
    const variant = session.metadata?.variant || 'unknown';
    const committedAt = session.metadata?.committed_at || new Date().toISOString();
    const refundBy = session.metadata?.refund_by || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id || null;
    const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id || null;

    const db = await ensureDb();
    await db.execute({
      sql: `INSERT INTO early_commitments
            (email, stripe_session_id, variant, amount_cents, committed_at, refund_by, status, stripe_payment_intent_id, stripe_customer_id, paid_at)
            VALUES (?, ?, ?, ?, ?, ?, 'paid', ?, ?, ?)
            ON CONFLICT(stripe_session_id) DO UPDATE SET
              status = 'paid',
              stripe_payment_intent_id = excluded.stripe_payment_intent_id,
              stripe_customer_id = excluded.stripe_customer_id,
              paid_at = excluded.paid_at`,
      args: [
        email,
        sessionId,
        variant,
        Number(session.amount_total || 0),
        committedAt,
        refundBy,
        paymentIntentId,
        customerId,
        new Date().toISOString(),
      ],
    });
  }

  return NextResponse.json({ received: true });
}
