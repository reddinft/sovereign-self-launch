'use client';

export function Navbar() {
  const scrollToForm = () => {
    const el = document.getElementById('waitlist-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b"
      style={{
        background: 'hsl(222 35% 5% / 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderColor: 'hsl(222 20% 16%)',
      }}
    >
      <span
        className="text-lg font-semibold tracking-tight"
        style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: 'hsl(220 15% 95%)' }}
      >
        ReddiOS
      </span>
      <button
        onClick={scrollToForm}
        className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
        style={{
          background: 'hsl(262 80% 65%)',
          color: 'hsl(0 0% 100%)',
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.background = 'hsl(262 80% 58%)';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.background = 'hsl(262 80% 65%)';
        }}
      >
        Join waitlist
      </button>
    </nav>
  );
}
