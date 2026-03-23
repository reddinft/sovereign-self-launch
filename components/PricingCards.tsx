'use client';

import { useState, useEffect } from 'react';
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
    badge: '⭐ RECOMMENDED',
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
  const [highlighted, setHighlighted] = useState<Variant>(initialVariant);

  useEffect(() => {
    // Track which variant was shown
    posthog.capture('pricing_variant_seen', { variant: initialVariant });
  }, [initialVariant]);

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
      {/* Email input for checkout */}
      <div className="mb-8 max-w-md mx-auto">
        <label className="block text-sm text-zinc-400 mb-2">
          Your email (needed for your download link)
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm"
        />
      </div>

      {error && (
        <p className="text-center text-sm text-red-400 mb-6">{error}</p>
      )}

      {/* Pricing cards — C first (anchor), then B, then A */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`glass-card rounded-2xl p-6 flex flex-col relative transition-all duration-300 ${
              plan.highlight ? 'glow-purple' : ''
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-[#7c3aed] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {plan.badge}
                </span>
              </div>
            )}

            <div className="mb-4">
              <p className="text-sm font-medium text-zinc-400 mb-1">{plan.name}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-zinc-400 text-sm">{plan.period}</span>
              </div>
              <div className="mt-2">
                <span className="inline-block bg-[#7c3aed]/20 text-[#a78bfa] text-sm font-semibold px-3 py-1 rounded-full border border-[#7c3aed]/30">
                  {plan.gift}
                </span>
              </div>
            </div>

            <p className="text-sm text-zinc-400 mb-2">{plan.tagline}</p>
            <p className="text-xs text-zinc-500 mb-6">{plan.months}</p>

            <button
              onClick={() => handleCheckout(plan.id, plan.variantKey as Variant)}
              disabled={loadingVariant !== null}
              className={`mt-auto w-full py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 disabled:opacity-50 ${
                plan.highlight
                  ? 'bg-[#7c3aed] hover:bg-[#6d28d9] text-white'
                  : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
              }`}
            >
              {loadingVariant === plan.id ? 'Redirecting...' : plan.cta}
            </button>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-zinc-500 mt-8">
        Not the right fit? Every founding membership is fully refundable — no questions, no hoops — if we don&apos;t launch within 30 days of your payment.
      </p>
    </div>
  );
}
