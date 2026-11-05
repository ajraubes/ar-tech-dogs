import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

/** Default social share image: 1200×630, brand colours, no external assets. */
export async function GET() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 80,
        background: '#0e0e11',
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        color: '#f5f2ec',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: '#ff6a1f',
            display: 'flex',
          }}
        />
        <div style={{ fontSize: 36, fontWeight: 600, letterSpacing: -1 }}>AR Tech Dogs</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
          Digital experiences.
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: -4,
            lineHeight: 1,
            color: '#ff6a1f',
          }}
        >
          Engineered to grow.
        </div>
      </div>
      <div style={{ fontSize: 26, color: '#b8b3ab' }}>
        Websites · Shopify & Shopify Plus · Next.js & Payload CMS
      </div>
    </div>,
    { width: 1200, height: 630 },
  )
}
