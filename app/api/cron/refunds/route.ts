import { NextRequest, NextResponse } from 'next/server';
import { ensureDb } from '@/lib/db';
import { getStripe } from '@/lib/stripe';

export async function GET(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_placeholder') {
    return NextResponse.json(
      { processed: 0, refunded: 0, failed: 0, disabled: 'Stripe is not configured' },
      { status: 503 }
    );
  }

  const db = await ensureDb();
  const stripe = getStripe();
  const now = new Date().toISOString();

  // Find all pending commitments past their refund deadline
  const result = await db.execute({
    sql: `SELECT * FROM early_commitments 
          WHERE status = 'pending' AND refund_by < ?`,
    args: [now],
  });

  const refunded: string[] = [];
  const failed: string[] = [];

  for (const row of result.rows) {
    const sessionId = String(row.stripe_session_id);
    try {
      // Get the payment intent from the Stripe session
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_intent) {
        await stripe.refunds.create({
          payment_intent: String(session.payment_intent),
        });
        await db.execute({
          sql: `UPDATE early_commitments 
                SET status = 'refunded', refunded_at = ? 
                WHERE stripe_session_id = ?`,
          args: [new Date().toISOString(), sessionId],
        });
        refunded.push(sessionId);
      }
    } catch (error) {
      console.error(`Refund failed for session ${sessionId}:`, error);
      failed.push(sessionId);
    }
  }

  return NextResponse.json({
    processed: result.rows.length,
    refunded: refunded.length,
    failed: failed.length,
    refundedIds: refunded,
    failedIds: failed,
  });
}
