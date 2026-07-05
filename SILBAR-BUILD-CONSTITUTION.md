# SILBAR SECURITY — Build Constitution

> This document is the source of truth. Every design decision, every line of code,
> every piece of copy must pass through this filter.

---

## 1. THE ANTI-AI TELLS (What We're Eliminating)

| # | Tell | Fix |
|---|------|-----|
| 1 | Emoji as icons | Lucide SVG icons only |
| 2 | Copy-pasted radial gradients per section | Flat backgrounds + grain overlay |
| 3 | Cliché fear-stat→reveal narrative | Specific, trust-based copy |
| 4 | Glow-on-everything | Max 2 glow moments per page |
| 5 | Uniform `tracking-[0.3em]` | Per-element tracking values |
| 6 | Zero real photography | Real photos when available |

---

## 2. COLOR SYSTEM

### Palette (unchanged)
- **Midnight:** `#060810` → `#1C2330` (base darks)
- **Naval:** `#031F30` → `#0E4D75` (depth, accent)
- **Gold:** `#D4AF37` (primary accent, sparingly)
- **Red:** `#CC2222` (signal, minimal)
- **Horizon:** `#F5F6F8` → `#6B7683` (text hierarchy)

### Background Rules
- Maximum 2 gradient/glow moments per entire page (hero + CTA)
- All other sections: FLAT `midnight-*` backgrounds
- Section differentiation: alternating surface tones (900/950) + 1px `rgba(255,255,255,0.04)` borders
- One subtle radial accent per section max (different color, different position)

### Section Background Map
| Section | Background |
|---------|-----------|
| Hero | `midnight-950` + earned radial accents |
| Services | `midnight-900` FLAT |
| Stats | `midnight-800` FLAT |
| Industries | `midnight-950` FLAT |
| Why Choose Us | `midnight-900` FLAT |
| CTA | `midnight-950` → `midnight-900` gradient (earned) |

---

## 3. TYPOGRAPHY

### Font Pairing
- **Body/UI:** Inter (geometric sans-serif) — everything except hero headline
- **Hero headline:** DM Serif Display (display serif) — hero ONLY

### Tracking Values (no more uniform 0.3em)
| Element | Tracking |
|---------|----------|
| Section labels | `tracking-[0.15em]` |
| Logo "SECURITY" | `tracking-[0.25em]` |
| Nav links | `tracking-[0.05em]` |
| CTA buttons | `tracking-[0.05em]` |
| Stat numbers | default (no tracking) |

### Headline Sizes (varied per section)
| Section | Size |
|---------|------|
| Hero | `clamp(4rem, 10vw, 9rem)` |
| Services | `clamp(2rem, 4vw, 3.5rem)` |
| Stats | no heading, just numbers |
| Industries | `clamp(1.8rem, 3vw, 2.8rem)` |
| Why Choose Us | `clamp(1.5rem, 2.5vw, 2.5rem)` |
| CTA | `clamp(2rem, 4vw, 3.5rem)` |

---

## 4. MOTION & GRAIN

### Grain Overlay
- SVG feTurbulence at 4% opacity, `mix-blend-mode: overlay`
- Fixed at z-index 9999, `pointer-events: none`
- Use PNG fallback for mobile performance

### Animation Budget
- Remove floating particles (20 DOM nodes, template feel)
- Remove text-glow-pulse animation
- Remove shield-glow animation
- Keep: ScrollReveal (entrance), Counter (stat count), hero GSAP timeline
- Respect `prefers-reduced-motion` on ALL animations

### Glow Budget
- Maximum 2 glow moments per page
- Remove: btn-red-glow, shield-glow, text-glow
- Keep: btn-gold-glow (CTA), hero radial accents

---

## 5. ICONS

### Lucide React Only
- `Shield`, `Siren`, `Cctv`, `KeyRound`, `Building2`, `CalendarDays`
- `Swords`, `Radio`, `MapPin`, `Award`, `ShieldCheck`
- Style: `strokeWidth={1.5}`, `size={24}`, `currentColor`

---

## 6. COPY PRINCIPLES

### Rules
- Trust-based, not fear-based (except hero Phase 1-2 dramatic arc)
- Specific numbers, real cities, real credentials
- No "Comprehensive", "Premier", "Cutting-Edge", "State-of-the-Art"
- Short sentences. Active voice. Direct.
- One punch moment per section, not bookending everything

### Section Labels
- "Our Services" not "WHAT WE DO"
- "Industries" not "INDUSTRIES WE SERVE"
- "Why Silbar" not "WHY SILBAR"
- "Get Started" not "READY TO SECURE YOUR PREMISES?"

---

## 7. MOBILE-FIRST

### Hero on Mobile (<768px)
- Static hero, NOT scrollytelling
- Logo + headline + tagline + 2 CTAs
- Remove: particles, multi-phase animation, India map
- Keep: GSAP scrollytelling on desktop

### Touch Targets
- Minimum 48x48px (WCAG AAA)
- Current `h-14` (56px) is good — keep

### Section Padding
- Mobile: `py-20` (80px)
- Desktop: `py-32` (128px)

---

## 8. LAYOUT VARIETY

### Break the Uniform Grid
| Section | Layout |
|---------|--------|
| Services | Bento grid (varied card sizes) |
| Stats | Horizontal strip, large numbers |
| Industries | 2-column: list left, visual right |
| Why Choose Us | Single-column editorial, alternating |
| CTA | Centered (closing moment) |

---

## 9. INDIAN SECURITY MARKET CONTEXT

### What Competitors Do
- SIS Group: Navy + gold, corporate, stats-heavy
- Innovision: Dark theme, modern, clean (most premium in India)
- SISCO: Dark + green accent, modern feel
- CISS: Defence credentials, bravery stories
- Most Indian sites: "uniformly blue" with generic templates

### Silbar's Opportunity
- Lead with modern design (dark theme, interactive elements)
- Position as "new generation" security company
- Specific client outcome stories, not generic promises
- PSARA license prominently displayed
- ISO certifications visible
- Pan-India coverage with specific city names
- Real guard photos (when available)

---

## 10. CHECKLIST

Before any merge/deploy:
- [ ] No emoji as icons
- [ ] No more than 2 gradient backgrounds per page
- [ ] No `tracking-[0.3em]` repeated pattern
- [ ] No generic copy ("Comprehensive", "Premier", "Cutting-Edge")
- [ ] Grain overlay present
- [ ] `prefers-reduced-motion` respected
- [ ] Mobile hero is static (no pinned scrollytelling)
- [ ] Touch targets ≥ 48px
- [ ] All interactive elements have focus styles
- [ ] Build passes clean
