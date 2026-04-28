import { NextResponse } from 'next/server';

const isConfigured = (value: string | undefined, placeholder?: string) =>
  Boolean(value && value.trim() && value !== placeholder);

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'sovereign-self-launch',
    checks: {
      turso: Boolean(process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN),
      stripe: isConfigured(process.env.STRIPE_SECRET_KEY, 'sk_test_placeholder'),
      stripeWebhook: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
      posthog: isConfigured(process.env.NEXT_PUBLIC_POSTHOG_KEY, 'phc_placeholder'),
      resend: Boolean(process.env.RESEND_API_KEY),
      cronSecret: Boolean(process.env.CRON_SECRET),
    },
  });
}
