'use client';

import { motion } from 'framer-motion';
import { FaqAccordion } from '@/components/FaqAccordion';

export function FaqSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl sm:text-4xl text-center mb-12"
          style={{ color: 'hsl(220 15% 95%)' }}
        >
          Questions?
        </motion.h2>
        <FaqAccordion />
      </div>
    </section>
  );
}
