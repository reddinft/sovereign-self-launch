'use client';

import { motion } from 'framer-motion';

const problems = [
  <>
    Meta&apos;s AI has been collecting every conversation you have on WhatsApp, Instagram, and Facebook since December 2025.{' '}
    <strong className="not-italic" style={{ color: 'hsl(262 80% 75%)' }}>No opt-out.</strong>
  </>,
  <>
    Those conversations train their models. They target your ads.{' '}
    <strong className="not-italic" style={{ color: 'hsl(262 80% 75%)' }}>In some cases, contractors see your photos.</strong>
  </>,
  <>
    Big Tech&apos;s AI is the product.{' '}
    <strong className="not-italic" style={{ color: 'hsl(262 80% 75%)' }}>You&apos;re the data.</strong>
  </>,
];

export function ProblemSection() {
  return (
    <section
      className="py-24 border-y"
      style={{ borderColor: 'hsl(222 20% 16%)' }}
    >
      <div className="container mx-auto px-4 max-w-2xl">
        <p
          className="text-xs uppercase tracking-widest mb-12 text-center"
          style={{ color: 'hsl(220 10% 45%)' }}
        >
          Why now.
        </p>
        <div className="space-y-10">
          {problems.map((statement, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="font-display italic text-2xl sm:text-3xl leading-snug"
              style={{ color: 'hsl(220 15% 95%)' }}
            >
              {statement}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
