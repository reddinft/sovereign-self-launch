# Coolify Deployment Plan — Sovereign Self Launch

## Current decision

Coolify is the deployment environment going forward. Vercel remains historical only; do not rely on Vercel Cron or Vercel env vars for production readiness.

## App target

- Repo: `https://github.com/reddinft/sovereign-self-launch`
- Branch: `main`
- Domain: `https://sovereign-self.preview.reddi.tech/` initially; promote to the final production domain after smoke test
- Build pack: Dockerfile preferred. Nixpacks fallback: install `npm ci`, build `npm run build`, start `npm start`
- Health check: `GET /api/health`

## Required Coolify env vars

Copy `.env.example` into the Coolify app environment and fill real values where available. Minimum viable waitlist launch requires:

```bash
NEXT_PUBLIC_BASE_URL=https://sovereign-self.preview.reddi.tech
TURSO_DATABASE_URL=...
TURSO_AUTH_TOKEN=...
CRON_SECRET=...
ADMIN_API_TOKEN=...
```

Payments remain safely disabled until all Stripe values are real:

```bash
STRIPE_SECRET_KEY=sk_live_or_test_...
STRIPE_VARIANT_A_PRICE_ID=price_...
STRIPE_VARIANT_B_PRICE_ID=price_...
STRIPE_VARIANT_C_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Optional but recommended before active campaign:

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
RESEND_API_KEY=re_...
```

## Cron replacement for Vercel Cron

Coolify does not read `vercel.json`. Configure a Coolify scheduled task or external cron to call:

```bash
curl -fsS -H "Authorization: Bearer $CRON_SECRET" \
  https://sovereign-self.preview.reddi.tech/api/cron/refunds
```

Schedule: daily at 02:00 UTC.

## Deployment command via workspace automation

Use the workspace Coolify bootstrap script with the full URL domain format:

```bash
COOLIFY_BASE_URL=... \
COOLIFY_TOKEN=... \
python3 /Users/loki/.openclaw/workspace/scripts/coolify_bootstrap_app.py \
  --project-name "sovereign-self-launch" \
  --project-description "Sovereign Self launch landing page" \
  --app-name "sovereign-self-launch-main" \
  --mode public \
  --repo "https://github.com/reddinft/sovereign-self-launch" \
  --branch main \
  --server-uuid "<server_uuid>" \
  --destination-uuid "<destination_uuid>" \
  --domain "https://sovereign-self.preview.reddi.tech/" \
  --build-pack dockerfile \
  --deploy
```

## Smoke test after deploy

1. `GET /api/health` returns `{ "status": "ok" }`.
2. Landing page returns 200.
3. Protected waitlist export rejects missing auth with 401.
4. `POST /api/waitlist` with a test email returns success and increments count.
5. With Stripe placeholders, pricing CTAs fall back to waitlist capture and direct API checkout returns 503, not 500.
6. With real Stripe price IDs, checkout returns a Stripe Checkout URL.
6. Stripe webhook endpoint rejects unsigned requests with 400 and accepts valid Stripe signed `checkout.session.completed` events.
7. Cron endpoint returns 401 without bearer token and 200/503 with the correct token depending Stripe readiness.

## Current gaps

- Need Coolify app UUID/deploy status after bootstrap.
- Need Nissan-created Stripe products/price IDs before payment CTAs go live.
- Need PostHog feature flag `pricing-variant` before valid A/B readout.
- Need Stripe webhook configured to `POST /api/stripe/webhook` when payments go live.
- Need final domain decision and DNS cutover after preview smoke test.
