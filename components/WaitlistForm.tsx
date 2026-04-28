'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import posthog from 'posthog-js';
import { useRouter } from 'next/navigation';

interface WaitlistFormProps {
  buttonText?: string;
  placeholder?: string;
  source?: string;
  showSocialProof?: boolean;
}

export function WaitlistForm({
  buttonText = 'Claim your founder spot',
  placeholder = 'your@email.com',
  source = 'landing',
  showSocialProof = false,
}: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [count, setCount] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/waitlist/count')
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => {});
  }, []);

  const hashEmail = async (value: string) => {
    const data = new TextEncoder().encode(value.toLowerCase().trim());
    const digest = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('')
      .slice(0, 16);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (data.success) {
        posthog.capture('waitlist_signup', { email_hash: await hashEmail(email) });
        router.push('/waitlist-confirmed');
      } else {
        setError(data.error || 'Something went wrong. Try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const socialProof =
    count === null
      ? null
      : count === 0
      ? 'Be the first founder on the waitlist.'
      : `Join ${count.toLocaleString()} founder${count === 1 ? '' : 's'} already on the waitlist.`;

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 rounded-[0.625rem] text-sm transition-all duration-200"
          style={{
            background: 'hsl(220 15% 95% / 0.05)',
            border: '1px solid hsl(220 15% 95% / 0.1)',
            color: 'hsl(220 15% 95%)',
          }}
          disabled={loading}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-5 py-3 rounded-[0.625rem] text-sm font-semibold transition-all whitespace-nowrap disabled:opacity-50 group shrink-0"
          style={{
            background: 'hsl(262 80% 65%)',
            color: 'hsl(0 0% 100%)',
            boxShadow: '0 4px 20px hsl(262 80% 65% / 0.3)',
          }}
        >
          {loading ? 'Joining...' : buttonText}
          {!loading && (
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          )}
        </button>
      </form>

      {error && (
        <p className="mt-2 text-sm" style={{ color: 'hsl(0 72% 65%)' }}>
          {error}
        </p>
      )}

      {showSocialProof && socialProof && (
        <AnimatePresence mode="wait">
          <motion.p
            key={count}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="mt-3 text-sm"
            style={{ color: 'hsl(220 10% 55%)' }}
          >
            <motion.span className="tabular-nums">{socialProof}</motion.span>
          </motion.p>
        </AnimatePresence>
      )}
    </div>
  );
}
