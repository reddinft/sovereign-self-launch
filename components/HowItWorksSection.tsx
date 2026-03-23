'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Claim your spot.',
    description: 'Pick your tier, drop your email, and you\'re in the founding cohort.',
  },
  {
    title: 'Download and install.',
    description: 'When we launch, you get a private link. Five-minute setup on Mac, Windows, or Linux. No accounts. No cloud. Mobile is on the roadmap — local when it can be, verifiably private when it can\'t.',
  },
  {
    title: 'Your AI starts learning you.',
    description: 'Check-ins. Goals. Context. It builds a picture of your work and life — entirely on your machine.',
  },
];

export function HowItWorksSection() {
  return (
    <section
      className="py-24"
      style={{ background: 'hsl(222 28% 9% / 0.3)' }}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl sm:text-4xl text-center mb-4"
          style={{ color: 'hsl(220 15% 95%)' }}
        >
          Three steps. Then it just runs.
        </motion.h2>
        <p
          className="text-center text-sm mb-16"
          style={{ color: 'hsl(220 10% 45%)' }}
        >
          No accounts. No cloud sync. No learning curve.
        </p>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center text-center gap-4"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center border"
                style={{
                  background: 'hsl(262 80% 65% / 0.1)',
                  borderColor: 'hsl(262 80% 65% / 0.3)',
                }}
              >
                <span
                  className="font-display text-xl"
                  style={{ color: 'hsl(262 80% 75%)' }}
                >
                  {i + 1}
                </span>
              </div>
              <h3
                className="font-sans font-semibold"
                style={{ color: 'hsl(220 15% 95%)' }}
              >
                {step.title}
              </h3>
              <p
                className="font-sans text-sm leading-relaxed"
                style={{ color: 'hsl(220 10% 55%)' }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
