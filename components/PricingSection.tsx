'use client';

import { PricingCards } from '@/components/PricingCards';
import { WaitlistForm } from '@/components/WaitlistForm';
import { motion } from 'framer-motion';

type PricingVariant = 'variant-a' | 'variant-b' | 'variant-c';

interface PricingSectionProps {
  initialVariant: PricingVariant;
}

export function PricingSection({ initialVariant }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-xl mx-auto"
        >
          <span
            className="px-3 py-1 rounded-full border text-xs font-medium mb-4 inline-block"
            style={{
              borderColor: 'hsl(262 80% 65% / 0.3)',
              color: 'hsl(262 80% 75%)',
            }}
          >
            Founding pricing — coming soon
          </span>
          <h2
            className="font-display text-3xl sm:text-4xl mb-4"
            style={{ color: 'hsl(220 15% 95%)' }}
          >
            Founder pricing opening soon.
          </h2>
          <p
            className="font-sans leading-relaxed"
            style={{ color: 'hsl(220 10% 55%)' }}
          >
            We&apos;re opening a small founding cohort — the people who shape what this becomes.
            Lock in your rate now. Fully refundable if we don&apos;t launch within 30 days.
          </p>
        </motion.div>

        <PricingCards initialVariant={initialVariant} />

        {/* Embedded waitlist CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center max-w-md mx-auto"
        >
          <p
            className="text-sm mb-4"
            style={{ color: 'hsl(220 10% 45%)' }}
          >
            Not ready to commit? Join the waitlist to be first in line.
          </p>
          <WaitlistForm buttonText="Get first access →" source="pricing" />
        </motion.div>
      </div>
    </section>
  );
}
