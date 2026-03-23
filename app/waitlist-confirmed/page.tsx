import Link from 'next/link';

export default function WaitlistConfirmedPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: 'hsl(222 35% 5%)', color: 'hsl(220 15% 95%)' }}
    >
      <div className="text-center max-w-lg">
        <div className="text-5xl mb-6">🔒</div>
        <h1
          className="text-4xl font-bold mb-4"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          You&apos;re in.
        </h1>
        <p
          className="text-lg mb-8 leading-relaxed"
          style={{ color: 'hsl(220 10% 55%)' }}
        >
          Your spot in the founding cohort is secured. We&apos;ll email you a private download link
          the moment ReddiOS launches — within 30 days.
        </p>
        <div
          className="glass-card rounded-[0.625rem] p-6 mb-8 text-left"
        >
          <h2
            className="text-sm font-semibold mb-3"
            style={{ color: 'hsl(220 15% 95%)' }}
          >
            What happens next:
          </h2>
          <ul className="space-y-2 text-sm" style={{ color: 'hsl(220 10% 55%)' }}>
            <li className="flex gap-2">
              <span style={{ color: 'hsl(262 80% 75%)' }}>→</span>
              We build and test ReddiOS
            </li>
            <li className="flex gap-2">
              <span style={{ color: 'hsl(262 80% 75%)' }}>→</span>
              You get a private email with your download link
            </li>
            <li className="flex gap-2">
              <span style={{ color: 'hsl(262 80% 75%)' }}>→</span>
              Five-minute install on Mac, Windows, or Linux
            </li>
            <li className="flex gap-2">
              <span style={{ color: 'hsl(262 80% 75%)' }}>→</span>
              Your AI starts learning you — privately
            </li>
          </ul>
        </div>
        <p className="text-xs mb-8" style={{ color: 'hsl(220 10% 35%)' }}>
          If we don&apos;t launch within 30 days, no action needed — you won&apos;t be charged.
        </p>
        <Link
          href="/"
          className="text-sm transition-colors"
          style={{ color: 'hsl(262 80% 75%)' }}
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
