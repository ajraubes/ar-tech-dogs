import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

/** Default social share image: 1200×630, the pug on cream with the wordmark. */
export async function GET() {
  const pug = await readFile(path.join(process.cwd(), 'public/brand/pug.png'))
  const pugSrc = `data:image/png;base64,${pug.toString('base64')}`

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: '72px 80px',
        background: '#f2eee3',
        color: '#2d2520',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 132, fontWeight: 800, letterSpacing: -5, lineHeight: 0.9 }}>
          AR TECH
        </div>
        <div style={{ fontSize: 132, fontWeight: 800, letterSpacing: -5, lineHeight: 0.9 }}>
          DOGS
        </div>
        <div style={{ marginTop: 36, fontSize: 30, color: '#6a5547' }}>
          Design. Develop. Deliver, one sip at a time.
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" height={480} src={pugSrc} width={410} />
    </div>,
    { width: 1200, height: 630 },
  )
}
