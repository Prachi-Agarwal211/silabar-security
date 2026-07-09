# Rare Artifacts — Design Details That Signal Deliberate Work

These small visual elements separate custom-built sites from templates. They're the "last 10%" that audiences may not consciously notice but feel.

---

## ASCII / Text Ornaments

Use as section dividers, frame elements, or decorative borders in brutalist/technical designs.

**Basic frame:**
```
┌────────────────────┐
│                    │
│     Content        │
│                    │
└────────────────────┘
```

**Section divider:**
```
──────────────────────
```

**Corner accents:**
```
┌── ──┐
│     │
│     │
└── ──┘
```

**Arrow / pointer:**
```
▸ Section Title
  └── Subsection
```

**CSS implementation:**
```css
.ascii-divider::before { content: '────────────────────'; display: block; color: #666; letter-spacing: -2px; font-family: monospace; }
.ascii-frame { border: none; position: relative; }
.ascii-frame::before { content: '┌── ──┐'; position: absolute; top: -1em; left: 0; font-family: monospace; }
.ascii-frame::after { content: '└── ──┘'; position: absolute; bottom: -1em; right: 0; font-family: monospace; }
```

---

## Corner Brackets

```
└── CONTACT ──────────────────┐
                               │
                               │
┌──────────────────────────────┘
```

**Use as:** Section headers, navigation frame, portfolio labels.

```css
.corner-bracket::before { content: '└── '; font-family: monospace; }
.corner-bracket::after { content: ' ──────────────────┐'; font-family: monospace; }
```

---

## Scan Lines

Horizontal lines overlay for CRT/retro screen aesthetic. See `technique-catalogs/06-atmosphere.md` for implementation.

**Use as:** Full-screen overlay at 0.03-0.06 opacity for subtle texture. Higher opacity (0.1) for retro themes.

---

## Paper Texture

Subtle noise/grain overlay that makes digital feel physical.

**CSS:**
```css
.paper-texture { background-color: #F5EDE3; background-image: url("data:image/svg+xml,..."); background-blend-mode: multiply; }
```

**Use:** Backgrounds for editorial/creative sites. Opacity 0.02-0.05 for subtle, 0.1-0.2 for pronounced.

---

## Grid Overlay

Visible grid lines as background aesthetic, not just alignment tool.

```css
.grid-overlay { background-size: 24px 24px; background-image: linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px); }
```

**Use:** Brutalist designs, dev tools, portfolio sites, technical documentation.

---

## Variable Axes Display

Show variable font axes in action — weight, width, or slant changing through content.

```css
.weight-demo { font-variation-settings: 'wght' var(--wght); transition: --wght 0.3s; }
@property --wght { syntax: '<number>'; initial-value: 400; inherits: false; }
.weight-demo:hover { --wght: 800; }
```

---

## Custom Bullet Points

Replace default bullets with design elements.

```css
ul { list-style: none; padding-left: 0; }
ul li::before { content: '▸ '; color: var(--accent); }
/* Or */
ul li::before { content: '— '; color: var(--secondary); }
/* Or */
ul li::before { content: '◆ '; font-size: 0.5em; vertical-align: middle; }
```

---

## Underline Artifacts

Replace default `text-decoration: underline` with custom implementations.

```css
.custom-underline { text-decoration: none; background-image: linear-gradient(var(--accent), var(--accent)); background-repeat: no-repeat; background-position: 0 100%; background-size: 100% 2px; transition: background-size 0.3s; }
.custom-underline:hover { background-size: 100% 100%; color: white; }
```

---

## When to Use

| Artifact | Use Case | Frequency |
|----------|----------|-----------|
| ASCII ornaments | Brutalist, tech, developer themes | 1-2 per page |
| Corner brackets | Section headers, nav labels | Per section |
| Scan lines | Retro, tech, CRT aesthetic | Full overlay, 0.03-0.06 |
| Paper texture | Editorial, creative, warm | Full overlay, 0.02-0.05 |
| Grid overlay | Brutalist, tech, portfolio | Background |
| Variable axes | Interactive, premium | Per element that needs emphasis |
| Custom bullets | Lists, features, specs | Replace all default bullets |
