import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const db = getDb();
    const result = await db.execute('SELECT COUNT(*) as count FROM waitlist');
    return NextResponse.json({ count: Number(result.rows[0].count) });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
