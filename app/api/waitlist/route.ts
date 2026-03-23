import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, source = 'landing' } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const db = getDb();

    await db.execute({
      sql: `INSERT INTO waitlist (email, signed_up_at, source)
            VALUES (?, ?, ?)
            ON CONFLICT(email) DO NOTHING`,
      args: [normalizedEmail, new Date().toISOString(), source],
    });

    // Get current waitlist count
    const countResult = await db.execute('SELECT COUNT(*) as count FROM waitlist');
    const count = Number(countResult.rows[0].count);

    return NextResponse.json({ success: true, count });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = getDb();
    const result = await db.execute('SELECT COUNT(*) as count FROM waitlist');
    return NextResponse.json({ count: Number(result.rows[0].count) });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
