import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: 'hsl(222 35% 5%)', color: 'hsl(220 15% 95%)' }}
    >
      <div className="text-center max-w-lg">
        <div className="text-5xl mb-6">✅</div>
        <h1
          className="text-4xl font-bold mb-4"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          You&apos;re a Founding Member.
        </h1>
        <p
          className="text-lg mb-8 leading-relaxed"
          style={{ color: 'hsl(220 10% 55%)' }}
        >
          Your commitment is locked in. Check your email — we&apos;ve sent you a confirmation
          with everything you need to know.
        </p>

        <div className="glass-card rounded-[0.625rem] p-6 mb-8 text-left">
          <h2
            className="text-sm font-semibold mb-3"
            style={{ color: 'hsl(220 15% 95%)' }}
          >
            Your founding membership includes:
          </h2>
          <ul className="space-y-2 text-sm" style={{ color: 'hsl(220 10% 55%)' }}>
            <li className="flex gap-2">
              <span style={{ color: 'hsl(262 80% 75%)' }}>✓</span>
              Your locked-in founder rate — permanent
            </li>
            <li className="flex gap-2">
              <span style={{ color: 'hsl(262 80% 75%)' }}>✓</span>
              Your free months, starting from activation
            </li>
            <li className="flex gap-2">
              <span style={{ color: 'hsl(262 80% 75%)' }}>✓</span>
              Private download link sent to your email at launch
            </li>
            <li className="flex gap-2">
              <span style={{ color: 'hsl(262 80% 75%)' }}>✓</span>
              Full refund if we don&apos;t ship within 30 days — automatic
            </li>
          </ul>
        </div>

        <div
          className="rounded-[0.625rem] p-4 mb-8"
          style={{
            background: 'hsl(262 80% 65% / 0.1)',
            border: '1px solid hsl(262 80% 65% / 0.2)',
          }}
        >
          <p className="text-sm" style={{ color: 'hsl(262 80% 75%)' }}>
            🔒 The 30-day refund guarantee is automatic. If we don&apos;t launch in time,
            your money comes back without you having to ask.
          </p>
        </div>

        <Link
          href="/"
          className="text-sm transition-colors"
          style={{ color: 'hsl(220 10% 55%)' }}
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
