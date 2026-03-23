import Link from 'next/link';

export default function WaitlistConfirmedPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="text-5xl mb-6">🔒</div>
        <h1 className="text-4xl font-bold text-white mb-4">You&apos;re in.</h1>
        <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
          Your spot in the founding cohort is secured. We&apos;ll email you a private download link
          the moment Sovereign Self launches — within 30 days.
        </p>
        <div className="glass-card rounded-xl p-6 mb-8 border border-white/10 text-left">
          <h2 className="text-sm font-semibold text-white mb-3">What happens next:</h2>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li className="flex gap-2">
              <span className="text-[#7c3aed]">→</span>
              We build and test Sovereign Self
            </li>
            <li className="flex gap-2">
              <span className="text-[#7c3aed]">→</span>
              You get a private email with your download link
            </li>
            <li className="flex gap-2">
              <span className="text-[#7c3aed]">→</span>
              Five-minute install on your Mac
            </li>
            <li className="flex gap-2">
              <span className="text-[#7c3aed]">→</span>
              Your AI starts learning you — privately
            </li>
          </ul>
        </div>
        <p className="text-xs text-zinc-600 mb-8">
          If we don&apos;t launch within 30 days, no action needed — you won&apos;t be charged.
        </p>
        <Link
          href="/"
          className="text-sm text-[#a78bfa] hover:text-white transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
