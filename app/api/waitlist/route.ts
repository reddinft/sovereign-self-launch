import { NextRequest, NextResponse } from 'next/server';
import { ensureDb } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, source = 'landing' } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const db = await ensureDb();

    await db.execute({
      sql: `INSERT INTO waitlist (email, signed_up_at, source)
            VALUES (?, ?, ?)
            ON CONFLICT(email) DO NOTHING`,
      args: [normalizedEmail, new Date().toISOString(), source],
    });

    // Get current waitlist count
    const countResult = await db.execute('SELECT COUNT(*) as count FROM waitlist');
    const count = Number(countResult.rows[0].count);

    // Send confirmation email if Resend key is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'ReddiOS <onboarding@resend.dev>', // uses Resend's shared domain until custom domain set
          to: normalizedEmail,
          subject: "You're on the list — ReddiOS",
          html: `
            <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:40px 20px;background:#080b14;color:#f5f5f5">
              <div style="color:#a78bfa;font-size:14px;letter-spacing:2px;margin-bottom:24px">⬡ ReddiOS</div>
              <h1 style="font-size:28px;font-weight:700;margin-bottom:16px">You're in.</h1>
              <p style="color:#aaa;line-height:1.6">We'll reach out when founding spots open. You'll be among the first to know — and the first to get access.</p>
              <p style="color:#aaa;line-height:1.6;margin-top:16px">In the meantime: your data is already safer than it was five minutes ago. You made the right call.</p>
              <p style="color:#555;font-size:14px;margin-top:40px">— The ReddiOS team</p>
            </div>
          `
        });
      } catch (e) {
        // Email failure is non-fatal — waitlist signup still succeeds
        console.error('Resend error:', e);
      }
    }

    return NextResponse.json({ success: true, count });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await ensureDb();
    const result = await db.execute('SELECT COUNT(*) as count FROM waitlist');
    return NextResponse.json({ count: Number(result.rows[0].count) });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
