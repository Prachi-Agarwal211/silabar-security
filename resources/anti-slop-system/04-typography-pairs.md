# Typography Pairs

10 curated font pairings that avoid common defaults (Inter, Roboto, Open Sans). Each includes when to use and variable font axes where available.

---

## The Pairs

### 1. Space Mono + Plus Jakarta Sans
**Vibe:** Technical + Clean
**Use:** Tech startups, developer tools, data visualization
**Headings:** Space Mono (700)
**Body:** Plus Jakarta Sans (400, 500)
**Variable axes:** Space Mono has no axes. Jakarta: wght 200-800

### 2. IBM Plex Sans + IBM Plex Serif
**Vibe:** Editorial + Trustworthy
**Use:** News, publishing, professional services
**Headings:** IBM Plex Serif (600)
**Body:** IBM Plex Sans (400)
**Variable axes:** Both have wght 100-700

### 3. Fraunces + Söhne
**Vibe:** Luxury + Modern
**Use:** Premium brands, fashion, high-end products
**Headings:** Fraunces (700, soft)
**Body:** Söhne (400)
**Variable axes:** Fraunces: wght 100-900, SOFT 0-100, WONK 0-100

### 4. DM Mono + Inter
**Vibe:** Developer + Readable
**Use:** SaaS, developer tools, documentation
**Headings:** DM Mono (500)
**Body:** Inter (400, 450)
**Variable axes:** Inter: opsz wght

### 5. Cabinet Grotesk + Sentinel
**Vibe:** Bold + Classic
**Use:** Creative agencies, portfolios, branding
**Headings:** Cabinet Grotesk (800)
**Body:** Sentinel (400)
**Note:** Both are premium fonts — use web font licensing

### 6. JetBrains Mono + Satoshi
**Vibe:** Code + Premium
**Use:** Dev tools, premium tech, design tools
**Headings:** JetBrains Mono (600)
**Body:** Satoshi (400, 500)
**Variable axes:** JetBrains: wght 100-800. Satoshi: wght 300-900

### 7. Syne + Outfit
**Vibe:** Display + Minimal
**Use:** Creative portfolios, art, fashion
**Headings:** Syne (800)
**Body:** Outfit (400)
**Variable axes:** Syne: wght 400-800. Outfit: wght 300-700

### 8. Bebas Neue + Montserrat
**Vibe:** Impact + Body
**Use:** Entertainment, events, landing pages
**Headings:** Bebas Neue (regular, all caps)
**Body:** Montserrat (400)
**Note:** Bebas Neue is caps-only. Use only for short headings.

### 9. Literata + Work Sans
**Vibe:** Long-form + Clean
**Use:** Blogs, articles, editorial
**Headings:** Literata (600)
**Body:** Work Sans (400)
**Variable axes:** Literata: opsz, wght. Work Sans: wght 100-900

### 10. Playfair Display + Source Sans
**Vibe:** Editorial + Reliable
**Use:** Magazine, luxury editorial, sophisticated
**Headings:** Playfair Display (700)
**Body:** Source Sans (400)
**Variable axes:** Playfair: wght 400-900

---

## Mono Usage Rules

Mono typefaces (Space Mono, DM Mono, JetBrains Mono) should be used sparingly for maximum impact:

- **Use mono for:** Numbers, data points, code snippets, technical terms, labels, statistical figures, short callouts
- **Don't use mono for:** Body text longer than 50 words, emotional/creative copy, testimonials, narrative content
- **Mono as accent:** Set CTAs, navigation items, or metric numbers in the mono typeface for contrast
- **Mono hierarchy:** In a mono + sans pairing, mono is display/accent, sans is body

---

## Custom Type Scale

Default 42/18 is banned. Use one of these instead:

| Use | Small | Medium | Large |
|-----|-------|--------|-------|
| Editorial | 14/22/36/58 | 15/24/38/62 | 16/26/42/68 |
| Technical | 13/18/28/44 | 14/20/32/48 | 15/22/36/52 |
| Dramatic | 16/28/48/80 | 18/32/52/90 | 20/36/58/100 |

## How to Load Variable Fonts

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap" rel="stylesheet">
```
```css
body { font-family: 'Inter', sans-serif; font-weight: 400; }
h1 { font-weight: 700; font-variation-settings: 'opsz' 32; }
```
