'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import posthog from 'posthog-js';

type Variant = 'variant-a' | 'variant-b' | 'variant-c';

interface PricingCardsProps {
  initialVariant: Variant;
}

const PLANS = [
  {
    id: 'c',
    variantKey: 'variant-c',
    name: 'Founder',
    badge: 'Most popular',
    price: '$29.95',
    period: '/month',
    gift: '+ 1 year free',
    tagline: 'A full year, on us. You focus on the launch.',
    cta: 'Become a Founding Member →',
    highlight: true,
    months: '13 months total',
  },
  {
    id: 'b',
    variantKey: 'variant-b',
    name: 'Early',
    badge: null,
    price: '$19.95',
    period: '/month',
    gift: '+ 6 months free',
    tagline: 'More skin in the game. More months on us.',
    cta: 'Lock in the Early rate →',
    highlight: false,
    months: '7 months total',
  },
  {
    id: 'a',
    variantKey: 'variant-a',
    name: 'Basic',
    badge: null,
    price: '$9.95',
    period: '/month',
    gift: '+ 2 months free',
    tagline: 'Get in early, stay private.',
    cta: 'Join at $9.95/mo →',
    highlight: false,
    months: '3 months total',
  },
] as const;

export function PricingCards({ initialVariant }: PricingCardsProps) {
  const [email, setEmail] = useState('');
  const [loadingVariant, setLoadingVariant] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    posthog.capture('pricing_variant_seen', { variant: initialVariant });
  }, [initialVariant]);

  const hashEmail = async (value: string) => {
    const data = new TextEncoder().encode(value.toLowerCase().trim());
    const digest = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('')
      .slice(0, 16);
  };

  const joinWaitlistForPlan = async (planId: string) => {
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: `pricing-${planId}` }),
    });
    const waitlistData = await res.json();
    if (!waitlistData.success) {
      throw new Error(waitlistData.error || 'Failed to join waitlist.');
    }
    posthog.capture('pricing_waitlist_fallback', {
      variant: planId,
      email_hash: await hashEmail(email),
    });
    window.location.href = '/waitlist-confirmed';
  };

  const handleCheckout = async (planId: string, variantKey: Variant) => {
    setError('');
    if (!email || !email.includes('@')) {
      setError('Please enter your email above before selecting a plan.');
      return;
    }
    setLoadingVariant(planId);
    posthog.capture('checkout_started', {
      variant: planId,
      price: PLANS.find((p) => p.id === planId)?.price,
    });
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variant: planId, email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.fallback === 'waitlist') {
        await joinWaitlistForPlan(planId);
      } else {
        setError(data.error || 'Failed to start checkout. Try again.');
        setLoadingVariant(null);
      }
    } catch {
      setError('Network error. Please try again.');
      setLoadingVariant(null);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Email input */}
      <div className="mb-8 max-w-md mx-auto">
        <label
          className="block text-sm mb-2"
          style={{ color: 'hsl(220 10% 55%)' }}
        >
          Your email (needed for your download link)
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-4 py-3 rounded-[0.625rem] text-sm"
          style={{
            background: 'hsl(220 15% 95% / 0.05)',
            border: '1px solid hsl(220 15% 95% / 0.1)',
            color: 'hsl(220 15% 95%)',
          }}
        />
      </div>

      {error && (
        <p
          className="text-center text-sm mb-6"
          style={{ color: 'hsl(0 72% 65%)' }}
        >
          {error}
        </p>
      )}

      {/* Cards — C first (anchor), then B, then A */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card rounded-[0.625rem] p-6 flex flex-col relative ${
              plan.highlight ? 'glow-purple' : ''
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: 'hsl(262 80% 65%)',
                    color: 'hsl(0 0% 100%)',
                  }}
                >
                  {plan.badge}
                </span>
              </div>
            )}

            <div className="mb-4">
              <p
                className="text-sm font-medium mb-1"
                style={{ color: 'hsl(220 10% 55%)' }}
              >
                {plan.name}
              </p>
              <div className="flex items-baseline gap-1">
                <span
                  className="font-display text-4xl"
                  style={{ color: 'hsl(220 15% 95%)' }}
                >
                  {plan.price}
                </span>
                <span
                  className="text-sm"
                  style={{ color: 'hsl(220 10% 55%)' }}
                >
                  {plan.period}
                </span>
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5">
                <Gift
                  className="w-4 h-4"
                  style={{ color: 'hsl(262 80% 75%)' }}
                />
                <span
                  className="text-sm font-semibold"
                  style={{ color: 'hsl(262 80% 75%)' }}
                >
                  {plan.gift}
                </span>
              </div>
            </div>

            <p
              className="text-sm mb-1"
              style={{ color: 'hsl(220 10% 55%)' }}
            >
              {plan.tagline}
            </p>
            <p
              className="text-xs mb-6"
              style={{ color: 'hsl(220 10% 40%)' }}
            >
              {plan.months}
            </p>

            <button
              onClick={() => handleCheckout(plan.id, plan.variantKey as Variant)}
              disabled={loadingVariant !== null}
              className="mt-auto w-full py-3 px-4 rounded-[0.625rem] text-sm font-semibold transition-all disabled:opacity-50"
              style={
                plan.highlight
                  ? {
                      background: 'hsl(262 80% 65%)',
                      color: 'hsl(0 0% 100%)',
                    }
                  : {
                      background: 'hsl(220 15% 95% / 0.05)',
                      border: '1px solid hsl(220 15% 95% / 0.1)',
                      color: 'hsl(220 15% 95%)',
                    }
              }
            >
              {loadingVariant === plan.id ? 'Redirecting...' : plan.cta}
            </button>
          </motion.div>
        ))}
      </div>

      <p
        className="text-center text-sm mt-8"
        style={{ color: 'hsl(220 10% 45%)' }}
      >
        Not the right fit? Every founding membership is fully refundable — no questions, no hoops — if we don&apos;t launch within 30 days of your payment.
      </p>
    </div>
  );
}
