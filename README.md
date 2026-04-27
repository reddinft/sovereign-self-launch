# Sovereign Self Launch

Next.js launch site for Sovereign Self / ReddiOS. Deployment target is now **Coolify**, not Vercel.

## Local development

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

The app also ships with a Dockerfile using Next.js standalone output for Coolify.

## Deployment

See `COOLIFY_DEPLOYMENT.md`.

Key points:
- Health check: `/api/health`
- Waitlist requires Turso env vars.
- Checkout is intentionally disabled with a 503 until Stripe key and all three Price IDs are real.
- Refund automation must be configured as a Coolify scheduled task or external cron; `vercel.json` is legacy only.
