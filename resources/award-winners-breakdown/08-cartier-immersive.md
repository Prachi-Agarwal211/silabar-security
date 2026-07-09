# Cartier — Immersive Garden

**URL:** https://www.cartier.com
**Studio:** Immersive Garden (France)
**Year:** 2025-2026

---

## Overview

Cartier's luxury product pages feature "one 3D room per product." Each product lives in its own meticulously crafted 3D environment that reflects its design inspiration — a watch in a library, a necklace in a garden.

## Key Techniques

### 1. One 3D Environment Per Product
Each product has a unique, branded 3D room. The environment matches the product's story — not a generic 3D viewer. The watch rests on a marble pedestal in a library; the necklace floats in a botanical garden.

**How:** Each product page loads a dedicated Three.js scene with optimized assets:
```javascript
// Per-product scene configuration
const scenes = { watch: { environment: 'library', lighting: 'warm', camera: [0, 0, 5] }, necklace: { environment: 'garden', lighting: 'natural', camera: [2, 1, 4] }}
```

### 2. Premium Glass Material
Cartier's signature glass/reflection shaders handle the transparent watch faces, diamonds, and high-end materials. Uses multi-layer reflections and environment maps.

**How:** Custom shader with fresnel, reflection map, and transmission:
```javascript
const glassMaterial = new THREE.MeshPhysicalMaterial({ transmission: 0.9, thickness: 0.5, roughness: 0.05, metalness: 0.1, envMap: hdrTexture, envMapIntensity: 2 })
```

### 3. Slow, Contemplative Camera
Camera moves extremely slowly around the product — a single orbit over 60 seconds. Users can also drag to rotate, but the auto-orbit encourages patience and observation.

### 4. Product Detail Peel
Users can "peel" layers of the product — in a watch, the face lifts to show the movement beneath. In a necklace, gems separate to show individual stones.

**How:** GSAP timeline that animates child objects on interaction:
```javascript
gsap.to(watchFace, { y: 0.5, duration: 1, ease: 'power2.out' })
gsap.to(movementDetail, { opacity: 1, duration: 0.5 })
```

### 5. Luxury Typography in 3D Space
Product names and prices appear as 3D floating text near the product, with subtle animation. Not HTML overlays — actual 3D text geometry.

## Techniques You Can Steal

| Technique | Steal it for |
|-----------|--------------|
| Per-product 3D environments | E-commerce, luxury, product pages |
| Premium glass/physical materials | Any transparent or reflective product |
| Slow auto-orbit camera | Product showcases, art, collectibles |
| Product detail peel | Electronics, luxury goods, complex products |
| 3D floating labels | Product info, pricing, specs |

## Why It Works

The "one room per product" approach makes each product feel special. The slow camera and glass materials say "this is worth examining closely." The peel interaction reveals craftsmanship.

## Tech Stack

- Three.js with MeshPhysicalMaterial
- HDR environment maps (studio photography quality)
- GSAP for peel/interaction timelines
- Custom TSL/GLSL for luxury glass shaders
