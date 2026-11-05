# AR Tech Dogs brand guide

Everything here is taken from the logo: a friendly pug sitting with a cup of coffee, on warm cream, over the name in heavy charcoal capitals and the line "Design. Develop. Deliver, one sip at a time".

The site's tokens live in `src/app/(frontend)/globals.css`. Change them there, not in components.

## Personality

Warm, senior, unhurried. The pug is calm and a little smug: he knows the work is good. Copy is plain and direct, never cute. The mascot carries the friendliness, so the type and layout can stay precise.

## Logo

The master is the brand identity board (`public/brand/brand-board.png`). Every file below was traced from it.

| File | Use |
| --- | --- |
| `public/brand/pug-head.svg` | Primary mark: the pug's head in colour. Master vector. |
| `public/brand/mark.png` | The head, transparent, 256px. Beside the wordmark in the header and footer. |
| `public/brand/pug.svg` | The stacked logo's pug, sitting with his coffee. Master vector. |
| `public/brand/pug.webp`, `pug.png` | The sitting pug, transparent, 1000px and 640px. Used on the site. |
| `public/brand/pug-head-line.svg` | One-colour (dark) head, for print, stamps and single-colour use. |
| `public/brand/pug-head-reversed.svg` | Reversed head, light on espresso. |
| `public/brand/logo.png` | App icon: the head on a crema rounded square, 512px. Social profiles, schema.org. |
| `public/favicon.ico`, `favicon-64.png` | The app icon as favicon (16, 32, 48, 64). |
| `public/apple-touch-icon.png`, `icon-192.png`, `icon-512.png` | The head on a full crema square for home screens and the web manifest. |

The horizontal lockup is live text on the site: the head, then "AR TECH DOGS" in Barlow ExtraBold capitals, with the tagline underneath on wide screens.

Rules:

- The sitting pug sits on something: his crema tile, the edge of a section. He never floats in empty space.
- Keep at least the height of the pug's head clear around the mark.
- Never recolour, outline, rotate, stretch or add a shadow to the pug. On crema, give him the tile's lighter glow behind him; cream, oat and espresso are all fine.
- The tagline is "Design. Develop. Deliver, one sip at a time." with that punctuation.

## Colour

| Name | Hex | Role |
| --- | --- | --- |
| Cream | `#F2EEE3` | Page background. The logo's ground. |
| Oat | `#E9E3D4` | Raised sections and cards: one tone step down from cream. |
| Espresso | `#2D2520` | Text, primary buttons on light, dark sections and the footer. |
| Mocha | `#6A5547` | Secondary text on cream (6:1). |
| Crema | `#E2C275` | The pug's coat. Accent field (the pricing band), buttons on espresso, highlights. |
| Toast | `#C6A55C` | The coat's shadow. Illustration only; too light for text on cream. |
| Roast | `#4F3E33` | The muzzle. Button hover, secondary text on Crema. |
| Foam | `#FFE7B3` | The chest highlight. Illustration only. |
| Deep gold | `#7A5F24` | Small gold-coloured text on cream (5.2:1). |

Proportions: about 70% cream and oat, 20% espresso, 10% crema. Crema is a field or an action, never a thin line.

Contrast (WCAG): espresso on cream 13:1, espresso on crema 8.7:1, crema on espresso 8.7:1, mocha on cream 6:1. Every pairing in the site passes AA.

Separate surfaces with a tone step (cream → oat → espresso), not with borders or shadows. Shadows are only for things that float, such as a menu.

## Type

One family: **Barlow** (Google Fonts, self-hosted in `src/fonts`), the closest match to the logo's wordmark: DIN-like, slightly rounded, confident in capitals.

| Role | Size | Weight | Tracking | Leading |
| --- | --- | --- | --- | --- |
| Monument (homepage name) | fills the width, about 16% of it | 700, capitals | -0.035em | 0.82 |
| Display (closing headline) | 48 → 96px | 700 | -0.035em | 0.9 |
| H1 (page titles) | 40 → 80px | 700 | -0.03em | 0.98 |
| H2 (section titles) | 32 → 56px | 700 | -0.025em | 1.0 |
| H3 | 20 → 24px | 600 | -0.01em | 1.2 |
| Lead | 18 → 22px | 400 | 0 | 1.5 |
| Body | 17px | 400 | 0 | 1.55 |
| Small | 14px | 400–600 | 0 | 1.45 |

Sentence case everywhere except the wordmark. No monospace outside code. No small letter-spaced labels above headings: the heading does the work.

## Shape and space

- Buttons are pills: espresso on light grounds, crema on espresso. 48–56px tall.
- Cards and fields use a 24px radius. Images keep the same radius.
- One page frame: 20px side margins on phones, 40px on desktop, 1360px max width.
- Sections are 80px apart on phones and 128px on desktop, and change field colour rather than drawing a line.

## Motion

- The pug settles onto his tile on load with a small spring, then breathes slowly. Steam rises off his cup once he has landed.
- Coffee is the motion theme, used where it explains something: steam over every cup (hero, page heroes, the close, the 404), a cup that fills while the enquiry form sends, and a steaming cup when it has sent.
- Primary buttons pour: on mouse hover a darker roast rises from the bottom of the pill in 420ms. Touch gets the press scale instead.
- The header head tilts 9° when pointed at, like a dog listening.
- Reasons are marked with a coffee bean, not a tick.
- Sections arrive heading first, then text, then the rest, 80ms apart, rising 20px.
- The process section is a pinned cortado glass: each of the six stages takes one sip.
- Buttons press to 97%. Under reduced motion the steam stands still and everything else changes instantly.

## Voice

- Say what it is, then what it costs. Published prices are a feature; show them.
- "You talk to the person who writes the code" beats any adjective.
- Coffee is the brand's one joke. Use it once per page at most ("One sip at a time").
