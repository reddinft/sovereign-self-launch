import { NextRequest, NextResponse } from 'next/server';
import { ensureDb } from '@/lib/db';

function isAuthorized(req: NextRequest) {
  const token = process.env.ADMIN_API_TOKEN;
  if (!token) return false;
  const auth = req.headers.get('authorization');
  return auth === `Bearer ${token}`;
}

function csvEscape(value: unknown) {
  const text = String(value ?? '');
  if (/[",\n]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = await ensureDb();
  const { searchParams } = new URL(req.url);
  const format = searchParams.get('format');

  const waitlist = await db.execute(
    `SELECT email, signed_up_at, source FROM waitlist ORDER BY signed_up_at DESC`
  );
  const commitments = await db.execute(
    `SELECT status, COUNT(*) as count, COALESCE(SUM(amount_cents), 0) as amount_cents
     FROM early_commitments
     GROUP BY status`
  );

  if (format === 'csv') {
    const header = ['email', 'signed_up_at', 'source'];
    const rows = waitlist.rows.map((row) =>
      header.map((key) => csvEscape(row[key])).join(',')
    );
    return new NextResponse([header.join(','), ...rows].join('\n'), {
      headers: {
        'content-type': 'text/csv; charset=utf-8',
        'content-disposition': 'attachment; filename="sovereign-self-waitlist.csv"',
      },
    });
  }

  return NextResponse.json({
    waitlistCount: waitlist.rows.length,
    waitlist: waitlist.rows,
    commitments: commitments.rows,
  });
}
