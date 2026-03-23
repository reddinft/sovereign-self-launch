'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { WaitlistForm } from '@/components/WaitlistForm';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern-sovereign" />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Violet orbs */}
      <motion.div
        animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'hsl(262 80% 65% / 0.08)' }}
      />
      <motion.div
        animate={{ x: [0, -15, 0], y: [0, 10, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 -right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'hsl(262 80% 65% / 0.06)' }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          {/* Ping badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
            style={{
              background: 'hsl(262 80% 65% / 0.1)',
              border: '1px solid hsl(262 80% 65% / 0.2)',
              color: 'hsl(262 80% 75%)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: 'hsl(262 80% 65%)' }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: 'hsl(262 80% 65%)' }}
              />
            </span>
            Now accepting founding members
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-tight mb-6"
            style={{ color: 'hsl(220 15% 95%)' }}
          >
            Your private AI{' '}
            <span className="text-gradient-sovereign">chief of staff</span>
            <span className="relative block sm:inline">
              <svg
                className="absolute -bottom-2 left-0 w-full hidden sm:block"
                viewBox="0 0 300 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 7C75 3 150 2.5 298 7"
                  stroke="hsl(262 80% 65%)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'hsl(220 10% 55%)' }}
          >
            Zuckerberg&apos;s building one for himself. Meta&apos;s version reads your WhatsApp and sells you ads.
            Yours runs on your machine — and answers only to you.
          </motion.p>

          {/* Waitlist form + social proof */}
          <motion.div
            id="waitlist-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center"
          >
            <WaitlistForm
              buttonText="Claim your founder spot"
              source="hero"
              showSocialProof
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div
          className="w-6 h-10 rounded-full border-2 flex justify-center p-2"
          style={{ borderColor: 'hsl(220 10% 35%)' }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: 'hsl(220 10% 45%)' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
