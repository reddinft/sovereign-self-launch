'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: 'What exactly is Sovereign Self?',
    a: "It's an AI chief of staff that runs entirely on your computer. It manages daily check-ins, tracks your goals, remembers your context, and helps you think clearly — without sending a single byte to the cloud. Think of it as the personal AI operating system that tech executives are quietly building for themselves, made available to everyone who doesn't want Big Tech handling their data.",
  },
  {
    q: 'Is my data actually private?',
    a: "Yes. Everything runs locally — on your machine, not ours. We don't have a server receiving your conversations. We don't store your data. We can't see it. That's the whole point.",
  },
  {
    q: 'When does it launch?',
    a: "We're targeting a launch within 30 days of opening the founding cohort. We'll email you directly with your download link when it's ready.",
  },
  {
    q: "What happens if I pay and you don't launch?",
    a: "You get a full refund. Automatically. No forms, no disputes, no \"please allow 5-7 business days.\" If we don't ship within 30 days of your payment, your money comes back.",
  },
  {
    q: "What's the difference between the three pricing tiers?",
    a: 'Same product, same privacy, same features. The difference is how many free months you lock in as a founding member. Basic ($9.95/mo) gets 2 months free. Early ($19.95/mo) gets 6 months free. Founder ($29.95/mo) gets a full year free. After the free period, billing continues at the rate you locked in — which is also your permanent founder rate.',
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3">
      {FAQS.map((faq, i) => (
        <div key={i} className="glass-card rounded-xl overflow-hidden">
          <button
            className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className="text-sm font-medium text-white">{faq.q}</span>
            <span className="text-zinc-400 text-lg flex-shrink-0">
              {openIndex === i ? '−' : '+'}
            </span>
          </button>
          {openIndex === i && (
            <div className="px-6 pb-4">
              <p className="text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
