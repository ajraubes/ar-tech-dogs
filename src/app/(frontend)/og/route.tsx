import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

/** Default social share image: 1200×630, brand mark and colours. */
export async function GET() {
  const mark = await readFile(path.join(process.cwd(), 'public/brand/mark-tile.png'))
  const markSrc = `data:image/png;base64,${mark.toString('base64')}`

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 80,
        background: '#070c14',
        backgroundImage:
          'linear-gradient(rgba(120,170,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(120,170,255,0.07) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        color: '#f2f5f9',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" height={96} src={markSrc} style={{ borderRadius: 22 }} width={96} />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 0.95 }}>
          <div style={{ fontSize: 40, fontWeight: 800 }}>AR TECH</div>
          <div style={{ fontSize: 48, fontWeight: 800, color: '#008efa' }}>DOGS</div>
        </div>
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
            color: '#008efa',
          }}
        >
          Engineered to grow.
        </div>
      </div>
      <div style={{ fontSize: 24, letterSpacing: 8, color: '#9aa6b8' }}>
        BUILD · INNOVATE · SCALE
      </div>
    </div>,
    { width: 1200, height: 630 },
  )
}
