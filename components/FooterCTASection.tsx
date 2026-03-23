'use client';

import { motion } from 'framer-motion';
import { WaitlistForm } from '@/components/WaitlistForm';

export function FooterCTASection() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: 'hsl(222 28% 9% / 0.3)' }}
    >
      {/* Top gradient rule */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, hsl(262 80% 65% / 0.3), transparent)',
        }}
      />

      {/* Accent orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'hsl(262 80% 65% / 0.08)' }}
      />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl sm:text-5xl mb-4"
          style={{ color: 'hsl(220 15% 95%)' }}
        >
          One spot left for you.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-sans mb-8 max-w-md mx-auto"
          style={{ color: 'hsl(220 10% 55%)' }}
        >
          Waitlist closes when the cohort fills. Don&apos;t decide later.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <WaitlistForm buttonText="Secure my spot →" source="footer" />
        </motion.div>

        <p
          className="text-xs mt-4"
          style={{ color: 'hsl(220 10% 35%)' }}
        >
          No spam. No data selling. Just your download link when we ship.
        </p>
      </div>
    </section>
  );
}
