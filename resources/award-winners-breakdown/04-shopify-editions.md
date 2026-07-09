# Shopify Editions — Internal Team

**URL:** https://www.shopify.com/enterprise/editions
**Studio:** Shopify Internal
**Year:** 2025-2026

---

## Overview

Shopify Editions announces new enterprise features through a multi-product scroll reveal. Each product is revealed with its own Three.js environment — products emerge from blocks, morph into shape, or assemble from parts.

## Key Techniques

### 1. Scroll-Sequenced Product Reveal
Each product has its own reveal sequence — they don't just fade in. Products are constructed (built block by block), grown (scaled from 0 with a spring), or unfolded (rotated from flat to 3D).

**How:** GSAP timeline per product section, triggered by ScrollTrigger:
```javascript
ScrollTrigger.create({ trigger: '.product-section', start: 'top 80%', onEnter: () => productRevealTimeline.play() })
```

### 2. Material Morphing
Products transition through material states — wireframe → solid → textured → glowing. Creates a "design process" feel without showing actual wireframes.

### 3. Section-Locked Camera
Each product section has its own camera position and target. As user enters a section, the camera smoothly transitions to that section's view.

### 4. Live Data Integration
Product specs and metrics are live data, not static text. When a product is revealed, its metrics (speed, volume, uptime) animate as scroll-based counters.

## Techniques You Can Steal

| Technique | Steal it for |
|-----------|--------------|
| Product assembly reveal | Product launches, feature showcases |
| Material state transitions | Design process narratives |
| Per-section camera positions | Multi-product or multi-feature showcases |
| Live metric counters | SaaS, data products, enterprise |

## Tech Stack

- Three.js
- GSAP + ScrollTrigger
- React (Shopify's Polaris)
- Custom GLSL for material transitions
