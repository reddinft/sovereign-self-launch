import { NextRequest, NextResponse } from 'next/server';
import { getStripe, VARIANT_PRICE_IDS, VARIANT_AMOUNTS_CENTS } from '@/lib/stripe';
import { ensureDb } from '@/lib/db';

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_placeholder') {
    return NextResponse.json(
      { error: 'Early access payments opening soon. Join the waitlist to be notified.' },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const { variant, email } = body;

    if (!variant || !['a', 'b', 'c'].includes(variant)) {
      return NextResponse.json({ error: 'Invalid variant' }, { status: 400 });
    }
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const priceId = VARIANT_PRICE_IDS[variant];
    if (!priceId || priceId.startsWith('price_placeholder')) {
      return NextResponse.json(
        { error: 'Early access payments opening soon. Join the waitlist to be notified.' },
        { status: 503 }
      );
    }

    const amountCents = VARIANT_AMOUNTS_CENTS[variant];
    const committedAt = new Date().toISOString();
    const refundBy = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    const stripe = getStripe();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || req.headers.get('origin') || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        variant,
        email,
        committed_at: committedAt,
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/#pricing`,
    });

    // Pre-store commitment — will be updated on webhook success
    try {
      const db = await ensureDb();
      await db.execute({
        sql: `INSERT INTO early_commitments 
              (email, stripe_session_id, variant, amount_cents, committed_at, refund_by, status)
              VALUES (?, ?, ?, ?, ?, ?, 'pending')
              ON CONFLICT(stripe_session_id) DO NOTHING`,
        args: [email, session.id, variant, amountCents, committedAt, refundBy],
      });
    } catch (dbError) {
      console.error('DB pre-store error (non-fatal):', dbError);
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
