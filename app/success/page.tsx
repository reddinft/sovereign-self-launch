import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="text-5xl mb-6">✅</div>
        <h1 className="text-4xl font-bold text-white mb-4">You&apos;re a Founding Member.</h1>
        <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
          Your commitment is locked in. Check your email — we&apos;ve sent you a confirmation
          with everything you need to know.
        </p>

        <div className="glass-card rounded-xl p-6 mb-8 border border-white/10 text-left">
          <h2 className="text-sm font-semibold text-white mb-3">Your founding membership includes:</h2>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li className="flex gap-2">
              <span className="text-[#7c3aed]">✓</span>
              Your locked-in founder rate — permanent
            </li>
            <li className="flex gap-2">
              <span className="text-[#7c3aed]">✓</span>
              Your free months, starting from activation
            </li>
            <li className="flex gap-2">
              <span className="text-[#7c3aed]">✓</span>
              Private download link sent to your email at launch
            </li>
            <li className="flex gap-2">
              <span className="text-[#7c3aed]">✓</span>
              Full refund if we don&apos;t ship within 30 days — automatic
            </li>
          </ul>
        </div>

        <div className="bg-[#7c3aed]/10 border border-[#7c3aed]/20 rounded-xl p-4 mb-8">
          <p className="text-sm text-[#a78bfa]">
            🔒 The 30-day refund guarantee is automatic. If we don&apos;t launch in time,
            your money comes back without you having to ask.
          </p>
        </div>

        <Link
          href="/"
          className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
