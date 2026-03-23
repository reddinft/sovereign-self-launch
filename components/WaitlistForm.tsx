'use client';

import { useState, useEffect } from 'react';
import posthog from 'posthog-js';
import { useRouter } from 'next/navigation';

interface WaitlistFormProps {
  buttonText?: string;
  placeholder?: string;
  source?: string;
}

export function WaitlistForm({
  buttonText = 'Claim your founder spot →',
  placeholder = 'your@email.com',
  source = 'landing',
}: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [count, setCount] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/waitlist')
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => {});
  }, []);

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
        posthog.capture('waitlist_signup', { email_hash: btoa(email).slice(0, 8) });
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
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm"
          disabled={loading}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-primary px-5 py-3 rounded-lg text-sm font-semibold text-white whitespace-nowrap disabled:opacity-50"
        >
          {loading ? 'Joining...' : buttonText}
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      {socialProof && (
        <p className="mt-3 text-sm text-zinc-400">{socialProof}</p>
      )}
    </div>
  );
}
