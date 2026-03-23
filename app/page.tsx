import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { getPostHogServer } from '@/lib/posthog';
import { HeroSection } from '@/components/HeroSection';
import { ProblemSection } from '@/components/ProblemSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { PricingSection } from '@/components/PricingSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { FaqSection } from '@/components/FaqSection';
import { FooterCTASection } from '@/components/FooterCTASection';
import { Navbar } from '@/components/Navbar';

export const dynamic = 'force-dynamic';

async function getDistinctId(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get('ph_distinct_id');
  return existing?.value || uuidv4();
}

export default async function HomePage() {
  const distinctId = await getDistinctId();

  try {
    const posthog = getPostHogServer();
    posthog.capture({
      distinctId,
      event: 'page_view',
      properties: { page: 'landing' },
    });
    await posthog.shutdown();
  } catch {
    // PostHog not configured — skip
  }

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: 'hsl(222 35% 5%)' }}>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <PricingSection />
      <HowItWorksSection />
      <FaqSection />
      <FooterCTASection />
      <footer className="py-8 border-t" style={{ borderColor: 'hsl(222 20% 16%)' }}>
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm font-semibold" style={{ color: 'hsl(220 15% 95%)' }}>ReddiOS</p>
          <p className="text-xs" style={{ color: 'hsl(220 10% 35%)' }}>
            © {new Date().getFullYear()} Redditech Pty Ltd · Privacy-first, always.
          </p>
          <div className="flex gap-6">
            <a href="#pricing" className="text-xs transition-colors" style={{ color: 'hsl(220 10% 45%)' }}>Early Access</a>
            <a href="mailto:nissan@reddi.tech" className="text-xs transition-colors" style={{ color: 'hsl(220 10% 45%)' }}>Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
