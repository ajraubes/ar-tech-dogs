import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

/**
 * Social share image, 1200×630. Every page links here with its own `title` (and an
 * optional `kicker` above it), so a shared link shows what that page is about. With no
 * title it is the studio's default card. Montserrat headline and Inter text on espresso,
 * with the brand's icon mark on a beige panel, as in the brand guide.
 */

const ESPRESSO = '#3b2417'
const WARM_WHITE = '#faf8f5'
const BEIGE = '#e6dace'
const TAUPE = '#c8b7a6'

const DEFAULT_TITLE = 'Custom development and Shopify stores, built properly.'
const DEFAULT_KICKER = 'Development · Websites · Shopify'

const clip = (value: string | null, max: number) => {
  const v = (value ?? '').replace(/\s+/g, ' ').trim()
  return v.length > max ? `${v.slice(0, max - 1).trimEnd()}…` : v
}

let assets: Promise<{ mark: string; heading: Buffer; text: Buffer }> | undefined
const loadAssets = () =>
  (assets ??= (async () => {
    const root = process.cwd()
    const [mark, heading, text] = await Promise.all([
      readFile(path.join(root, 'public/brand/collie.png')),
      readFile(path.join(root, 'public/fonts/Montserrat-700.woff')),
      readFile(path.join(root, 'public/fonts/Inter-500.woff')),
    ])
    return { mark: `data:image/png;base64,${mark.toString('base64')}`, heading, text }
  })())

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = clip(searchParams.get('title'), 80) || DEFAULT_TITLE
  const kicker = clip(searchParams.get('kicker'), 60) || DEFAULT_KICKER
  const { mark, heading, text } = await loadAssets()

  // Long titles step down so they always fit in three lines.
  const size = title.length > 52 ? 54 : title.length > 30 ? 62 : 76

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: ESPRESSO,
        color: WARM_WHITE,
        fontFamily: 'Inter',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 56px 60px 72px',
          width: 760,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'Montserrat',
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: -1,
            color: BEIGE,
          }}
        >
          AR Tech Dogs
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 26, fontWeight: 500, color: TAUPE }}>
            {kicker}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 20,
              fontFamily: 'Montserrat',
              fontSize: size,
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: -2.5,
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 24, fontWeight: 500, color: TAUPE }}>
          artechdogs.co.za
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'flex-end',
          justifyContent: 'center',
          background: BEIGE,
          paddingBottom: 56,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" height={351} src={mark} width={368} />
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Montserrat', data: heading, weight: 700, style: 'normal' },
        { name: 'Inter', data: text, weight: 500, style: 'normal' },
      ],
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=604800' },
    },
  )
}
