import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

/**
 * Social share image, 1200×630. Every page links here with its own `title` (and an
 * optional `kicker` above it), so a shared link shows what that page is about. With no
 * title it is the studio's default card. Set in Barlow, the wordmark's face, on espresso.
 */

const ESPRESSO = '#2d2520'
const CREAM = '#f2eee3'
const CREMA = '#e2c275'
const MUTED = '#c9bba5'

const DEFAULT_TITLE = 'Websites and Shopify stores, built properly.'
const DEFAULT_KICKER = 'Senior-led development studio · Cape Town'

const clip = (value: string | null, max: number) => {
  const v = (value ?? '').replace(/\s+/g, ' ').trim()
  return v.length > max ? `${v.slice(0, max - 1).trimEnd()}…` : v
}

let assets: Promise<{ pug: string; w600: Buffer; w800: Buffer }> | undefined
const loadAssets = () =>
  (assets ??= (async () => {
    const root = process.cwd()
    const [pug, w600, w800] = await Promise.all([
      readFile(path.join(root, 'public/brand/pug.png')),
      readFile(path.join(root, 'public/fonts/Barlow-600.ttf')),
      readFile(path.join(root, 'public/fonts/Barlow-800.ttf')),
    ])
    return { pug: `data:image/png;base64,${pug.toString('base64')}`, w600, w800 }
  })())

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = clip(searchParams.get('title'), 80) || DEFAULT_TITLE
  const kicker = clip(searchParams.get('kicker'), 60) || DEFAULT_KICKER
  const { pug, w600, w800 } = await loadAssets()

  // Long titles step down so they always fit in three lines.
  const size = title.length > 52 ? 62 : title.length > 30 ? 72 : 88

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: ESPRESSO,
        color: CREAM,
        fontFamily: 'Barlow',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 0 64px 72px',
          width: 780,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: 1,
            textTransform: 'uppercase',
            color: CREMA,
          }}
        >
          AR Tech Dogs
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 26, fontWeight: 600, color: MUTED }}>
            {kicker}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 18,
              maxWidth: 640,
              fontSize: size,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -2,
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 26, fontWeight: 600, color: MUTED }}>
          artechdogs.co.za
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: -40,
          bottom: -70,
          width: 520,
          height: 520,
          borderRadius: 520,
          background: CREMA,
          display: 'flex',
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        height={440}
        src={pug}
        style={{ position: 'absolute', right: 40, bottom: 24 }}
        width={396}
      />
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Barlow', data: w600, weight: 600, style: 'normal' },
        { name: 'Barlow', data: w800, weight: 800, style: 'normal' },
      ],
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=604800' },
    },
  )
}
