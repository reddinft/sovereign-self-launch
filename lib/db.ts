import { createClient } from '@libsql/client';

let _client: ReturnType<typeof createClient> | null = null;

export function getDb() {
  if (!_client) {
    if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
      throw new Error('Missing Turso credentials');
    }
    _client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return _client;
}

let _initPromise: Promise<void> | null = null;

export async function ensureDb() {
  if (!_initPromise) {
    _initPromise = initDb();
  }
  await _initPromise;
  return getDb();
}

export async function initDb() {
  const db = getDb();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS waitlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      signed_up_at TEXT NOT NULL,
      source TEXT DEFAULT 'landing'
    )
  `);
  await db.execute(`
    CREATE TABLE IF NOT EXISTS early_commitments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      stripe_session_id TEXT NOT NULL UNIQUE,
      variant TEXT NOT NULL,
      amount_cents INTEGER NOT NULL,
      committed_at TEXT NOT NULL,
      refund_by TEXT NOT NULL,
      refunded_at TEXT,
      status TEXT DEFAULT 'pending'
    )
  `);
}
