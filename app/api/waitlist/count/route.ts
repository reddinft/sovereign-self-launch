import { NextResponse } from 'next/server';
import { ensureDb } from '@/lib/db';

export async function GET() {
  try {
    const db = await ensureDb();
    const result = await db.execute('SELECT COUNT(*) as count FROM waitlist');
    return NextResponse.json({ count: Number(result.rows[0].count) });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
