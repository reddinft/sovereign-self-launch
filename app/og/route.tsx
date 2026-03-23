import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#080b14',
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ color: '#a78bfa', fontSize: '24px', marginBottom: '20px', letterSpacing: '2px' }}>⬡ ReddiOS</div>
        <div style={{ color: '#f0f0f5', fontSize: '56px', fontWeight: 'bold', textAlign: 'center', maxWidth: '900px', lineHeight: 1.2 }}>
          Your private AI chief of staff.
        </div>
        <div style={{ color: '#666', fontSize: '24px', marginTop: '24px', textAlign: 'center' }}>
          Zuckerberg&apos;s building one for himself. Yours stays private.
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
