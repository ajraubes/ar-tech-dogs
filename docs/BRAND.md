# AR Tech Dogs brand guide

Custom development and websites with a Shopify focus. Develop · Design · Build · Grow.

The mascot is **Jinx**, a black and white border collie at a laptop (code on one screen, a cart on the other) with a cup of coffee in front. The look is warm, polished and corporate: clean vector dog motifs, subtle tech and ecommerce icons, understated coffee accents and generous whitespace.

The source artwork lives in `docs/brand/` (brand guide, exploration board, logo mark, team profiles, banner suite, asset library, email signatures). The site's tokens live in `src/app/(frontend)/globals.css`. Change them there, not in components.

## Voice

Clear, expert, approachable, practical. Say what it is, then what it costs. "You talk to the person who writes the code" beats any adjective. Coffee is the brand's one joke; use it once per page at most ("One sip at a time").

## Logo

| File | Use |
| --- | --- |
| `docs/brand/logo-mark.webp` | Master icon mark, transparent, lossless. |
| `public/brand/collie.webp`, `collie.png` | The icon mark, transparent, 1000px and 640px. Hero, page heroes, footer, share image. |
| `public/brand/mark.png` | The icon mark at 256px, beside the wordmark in the header and footer. |
| `public/brand/logo.png` | App icon: the mark on an espresso rounded square, 512px. Social profiles, schema.org. |
| `public/favicon.ico`, `favicon-64.png` | Favicon (16, 32, 48, 64) on espresso, as in the brand guide. |
| `public/apple-touch-icon.png`, `icon-192.png`, `icon-512.png` | The mark on a full espresso square, inside the maskable safe zone. |

The horizontal lockup is live text: the mark, then "AR Tech Dogs" in Montserrat Bold (sentence case, tight tracking), with "Design. Develop. Deliver, one sip at a time." underneath on wide screens.

Rules (from the brand guide):

- Use the approved versions only (primary, stacked, icon). Never alter, stretch, redraw, outline or add effects to the mark.
- Keep the logo clear, legible and surrounded by ample whitespace. Never on busy or low-contrast backgrounds.
- The mark sits on something: a tile's lower edge, the hero's edge, the line of the wordmark.

## Colour

| Name | Hex | Role |
| --- | --- | --- |
| Charcoal | `#1F1F1F` | Text. The footer field. |
| Espresso | `#3B2417` | Primary buttons on light, dark sections, the favicon tile. |
| Coffee brown | `#6B442E` | Secondary text and small accent text on light (7.9:1 on warm white). Button hover. |
| Mocha | `#9C735B` | Accent: the active nav dot, selection, illustration. Not for small text. |
| Taupe | `#C8B7A6` | Secondary text on espresso (7.4:1). |
| Beige | `#E6DACE` | Accent field (the hero tile, the pricing band), buttons on espresso, chips. |
| Warm white | `#FAF8F5` | Page background. |

Raised sections and cards use `#F1EBE4`, one tone step from warm white toward beige. Separate surfaces with a tone step (warm white → raised → beige → espresso → charcoal), never a border or shadow. No gradients.

## Type

**Montserrat** (Bold/Semibold) for headings and the wordmark, **Inter** for body and UI. Both are variable fonts self-hosted from `src/fonts`. The share image uses static Montserrat 700 and Inter 500 from `public/fonts`.

| Role | Size | Weight | Tracking | Leading |
| --- | --- | --- | --- | --- |
| Display (closing headline) | 42 → 84px | 700 | -0.04em | 1.0 |
| H1 (page titles) | 36 → 70px | 700 | -0.035em | 1.04 |
| H2 (section titles) | 30 → 50px | 700 | -0.03em | 1.06 |
| H3 | 19 → 23px | 600 | -0.015em | 1.25 |
| Lead | 18 → 22px | 400 | 0 | 1.5 |
| Body | 17px | 400 | 0 | 1.55 |
| Small | 14px | 400–600 | 0 | 1.45 |

Sentence case everywhere. No monospace outside code. No small letter-spaced labels above headings.

## Artwork

- **Team portraits** (`public/brand/team/`): each person drawn as their own dog at the laptop, in a mocha ring. Jinx (border collie), AJ (German shepherd in a suit), Danika (golden retriever), Zurika (whippet), Ruan (husky). They are matched to CMS team members by first name in `src/components/site/TeamPortrait.tsx`. Anyone else gets `coming-soon.webp`, the "Profile coming soon" card.
- **Spot illustrations** (`public/brand/art/`): Jinx at work, one per service, mapped in `src/components/site/art.ts`. Transparent; on a light field other than warm white add `mix-blend-multiply`.
- New artwork from the asset library: crop it from `docs/brand/asset-library.webp`, keep the brand colours, and never set it on espresso without a light tile behind it.

## Shape and space

- Buttons are pills: espresso on light grounds, beige on espresso. 48–56px tall.
- Cards and fields use a 24px radius; the hero tile 32px.
- One page frame: 20px side margins on phones, 40px on desktop, 1360px max width.
- Sections are 80px apart on phones and 128px on desktop, and change field colour rather than drawing a line.

## Motion

- The mark settles onto its tile on load with a small spring, then breathes slowly.
- Primary buttons pour: on mouse hover the coffee-brown hover colour rises from the bottom of the pill.
- The header mark tilts when pointed at, like a dog that heard its name; team portraits tilt the same way.
- Illustrations lift a few pixels when their card or row is pointed at.
- Sections arrive heading first, then text, then the rest, 80ms apart, rising 20px.
- The process section is a pinned cortado glass: each of the six stages takes one sip.
- Under reduced motion everything changes instantly.
