'use client';

import { motion } from 'framer-motion';
import { Sun, BarChart3, Target, Brain, Shield } from 'lucide-react';

const features = [
  {
    icon: Sun,
    title: 'Daily check-ins.',
    body: 'Start each morning with a private briefing — priorities, blockers, what actually matters today — pulled from your own data, not a cloud.',
  },
  {
    icon: BarChart3,
    title: 'Weekly and quarterly reviews.',
    body: 'Your AI tracks how you\'re spending your time and energy, surfaces patterns, and pushes you toward the goals you actually set.',
  },
  {
    icon: Target,
    title: 'Goal tracking that sticks.',
    body: 'Set it once. ReddiOS holds you to it — without selling that information to anyone.',
  },
  {
    icon: Brain,
    title: 'Memory that persists.',
    body: 'It remembers context across every conversation. Your decisions, your preferences, your unfinished business — always there, always private.',
  },
  {
    icon: Shield,
    title: 'Total data sovereignty.',
    body: 'Everything runs locally on your machine. No server. No sync. No subscription to someone else\'s surveillance infrastructure.',
  },
];

export function FeaturesSection() {
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
          Built to run your life.<br />
          <span className="text-gradient-sovereign">Not to mine it.</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-[0.625rem] flex gap-4"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: 'hsl(262 80% 65% / 0.1)' }}
              >
                <feature.icon
                  className="w-5 h-5"
                  style={{ color: 'hsl(262 80% 75%)' }}
                />
              </div>
              <div>
                <h3
                  className="font-sans font-semibold text-lg mb-1"
                  style={{ color: 'hsl(220 15% 95%)' }}
                >
                  {feature.title}
                </h3>
                <p
                  className="font-sans text-sm leading-relaxed"
                  style={{ color: 'hsl(220 10% 55%)' }}
                >
                  {feature.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
