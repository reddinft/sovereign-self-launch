import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { getPricingVariant, getPostHogServer } from '@/lib/posthog';
import { WaitlistForm } from '@/components/WaitlistForm';
import { PricingCards } from '@/components/PricingCards';
import { FaqAccordion } from '@/components/FaqAccordion';

export const dynamic = 'force-dynamic';

async function getDistinctId(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get('ph_distinct_id');
  return existing?.value || uuidv4();
}

export default async function HomePage() {
  const distinctId = await getDistinctId();
  const pricingVariant = await getPricingVariant(distinctId);

  // Track server-side
  try {
    const posthog = getPostHogServer();
    posthog.capture({
      distinctId,
      event: 'page_view',
      properties: { page: 'landing' },
    });
    await posthog.shutdown();
  } catch {
    // PostHog not configured yet — skip
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-grid">
        {/* Background orb */}
        <div className="orb orb-purple w-[600px] h-[600px] top-[-200px] left-1/2 -translate-x-1/2" />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-zinc-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] animate-pulse" />
            Founding cohort — limited spots
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
            Your private AI<br />
            <span className="text-[#a78bfa]">chief of staff.</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 mb-4 leading-relaxed max-w-2xl mx-auto">
            Zuckerberg&apos;s building one for himself. Meta&apos;s version reads your WhatsApp and sells you ads.
            Yours runs on your machine — and answers only to you.
          </p>

          <p className="text-sm text-zinc-500 mb-10">
            Mark Zuckerberg is building one for himself. We built one that doesn&apos;t feed a data centre.
          </p>

          <WaitlistForm
            buttonText="Claim your founder spot →"
            source="hero"
          />
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <section className="px-6 py-24 max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-[#7c3aed] mb-8 text-center">Why now.</p>
        <div className="space-y-6 text-center">
          <p className="text-xl sm:text-2xl font-medium text-white leading-relaxed">
            Meta&apos;s AI has been collecting every conversation you have on WhatsApp, Instagram, and Facebook since December 2025.{' '}
            <span className="text-zinc-400">No opt-out.</span>
          </p>
          <p className="text-xl sm:text-2xl font-medium text-white leading-relaxed">
            Those conversations train their models. They target your ads.{' '}
            <span className="text-zinc-400">In some cases, contractors see your photos.</span>
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-white">
            Big Tech&apos;s AI is the product.{' '}
            <span className="text-[#a78bfa]">You&apos;re the data.</span>
          </p>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="px-6 py-24 bg-white/[0.015]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">
            Built to run your life.<br />
            <span className="text-zinc-400">Not to mine it.</span>
          </h2>
          <p className="text-center text-zinc-500 mb-16 text-sm">Everything runs on your machine. Zero cloud. Zero tracking.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Daily check-ins.',
                body: 'Start each morning with a private briefing — priorities, blockers, what actually matters today — pulled from your own data, not a cloud.',
                icon: '🌅',
              },
              {
                title: 'Weekly and quarterly reviews.',
                body: 'Your AI tracks how you\'re spending your time and energy, surfaces patterns, and pushes you toward the goals you actually set.',
                icon: '📊',
              },
              {
                title: 'Goal tracking that sticks.',
                body: 'Set it once. Sovereign Self holds you to it — without selling that information to anyone.',
                icon: '🎯',
              },
              {
                title: 'Memory that persists.',
                body: 'It remembers context across every conversation. Your decisions, your preferences, your unfinished business — always there, always private.',
                icon: '🧠',
              },
              {
                title: 'Total data sovereignty.',
                body: 'Everything runs locally on your machine. No server. No sync. No subscription to someone else\'s surveillance infrastructure.',
                icon: '🔒',
              },
            ].map((feature) => (
              <div key={feature.title} className="glass-card rounded-xl p-6">
                <div className="text-2xl mb-3">{feature.icon}</div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">
            Founder Pricing
          </h2>
          <p className="text-center text-zinc-400 mb-4 max-w-2xl mx-auto">
            We&apos;re opening a small founding cohort — the people who shape what this becomes.
            Lock in your rate now. Fully refundable if we don&apos;t launch within 30 days.
          </p>
          <p className="text-center text-zinc-500 text-sm mb-12">
            Same product, same privacy, same features. The difference is how many free months you lock in.
          </p>

          <PricingCards initialVariant={pricingVariant} />
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="px-6 py-24 bg-white/[0.015]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Three steps. Then it just runs.
          </h2>
          <p className="text-zinc-500 text-sm mb-16">No accounts. No cloud sync. No learning curve.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Claim your spot.',
                body: "Pick your tier, drop your email, and you're in the founding cohort.",
              },
              {
                step: '02',
                title: 'Download and install.',
                body: 'When we launch, you get a private link. Five-minute setup on your Mac. No accounts. No cloud sync.',
              },
              {
                step: '03',
                title: 'Your AI starts learning you.',
                body: 'Check-ins. Goals. Context. It builds a picture of your work and life — entirely on your machine.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-4xl font-bold text-[#7c3aed]/30 mb-3">{item.step}</div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="px-6 py-24">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Questions?
          </h2>
          <FaqAccordion />
        </div>
      </section>

      {/* ─── FOOTER CTA ─── */}
      <section className="px-6 py-24 bg-white/[0.015] relative">
        <div className="orb orb-purple w-[400px] h-[400px] bottom-0 left-1/2 -translate-x-1/2 opacity-10" />
        <div className="relative z-10 max-w-xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            One spot left for you.
          </h2>
          <p className="text-zinc-400 mb-8">
            Waitlist closes when the cohort fills. Don&apos;t decide later.
          </p>

          <WaitlistForm
            buttonText="Secure my spot →"
            source="footer"
          />

          <p className="mt-4 text-xs text-zinc-600">
            No spam. No data selling. Just your download link when we ship.
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="px-6 py-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm font-semibold text-white">Sovereign Self</p>
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Redditech Pty Ltd · Sydney, Australia
          </p>
          <div className="flex gap-6">
            <a href="#pricing" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Pricing</a>
            <a href="mailto:nissan@reddi.tech" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
