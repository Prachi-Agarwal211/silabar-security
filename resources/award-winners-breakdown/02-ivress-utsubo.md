# IVRESS — Utsubo

**URL:** https://ivress.utsubo.com
**Studio:** Utsubo (Japan)
**Award:** FWA Site of the Month
**Year:** 2026

---

## Overview

IVRESS is a showcase for the IVRESS headphone brand. Built with WebGPU and TSL (Three.js Shading Language), it represents the cutting edge of browser graphics. FWA Site of the Month winner.

## Key Techniques

### 1. WebGPU Production Pipeline
First major production WebGPU site. Uses WebGPU instead of WebGL for rendering — faster, more efficient, supports compute shaders.

**Three.js WebGPU path:**
```javascript
import { WebGPURenderer } from 'three/addons/renderers/webgpu/WebGPURenderer.js'
const renderer = new WebGPURenderer({ antialias: true })
```

### 2. TSL (Three.js Shading Language)
Write-once shaders that compile to both WebGL and WebGPU. TSL is Three.js's shader abstraction layer.

**TSL pattern:**
```javascript
import { float, uniform, uv, texture, positionLocal, positionWorld, normalWorld, Fn } from 'three/tsl'
const material = new THREE.MeshBasicNodeMaterial()
material.colorNode = Fn(() => {
  // Node-based shader logic
  return color
})()
```

### 3. Glass / Acrylic Material
The headphones render with realistic acrylic transparency — not just opacity, but with fresnel effects, inner refraction, and edge glow. Custom TSL shader handles the light behavior.

### 4. Scroll-Synced Camera Orbit
The camera orbits around the headphones as user scrolls. Unlike standard orbit controls, this is a pre-computed path with cinematic easing.

**How:** Camera moves along a Catmull-Rom curve, position determined by scroll progress:
```javascript
const curve = new THREE.CatmullRomCurve3([pos1, pos2, pos3, pos4])
ScrollTrigger.create({ scrub: 2, onUpdate: (self) => camera.position.copy(curve.getPoint(self.progress)) })
```

### 5. Ambient Particle Field
Thousands of floating particles react to scroll direction and speed, creating an atmospheric "sound visualization" effect around the product.

## Techniques You Can Steal

| Technique | Steal it for |
|-----------|--------------|
| WebGPU rendering pipeline | Any new Three.js project (future-proof) |
| TSL shader system | Multi-target shader development |
| Acrylic/glass TSL shader | Product glass, transparent UI |
| Camera orbit path on scroll | 360° product views, virtual tours |
| Scroll-reactive particles | Ambient backgrounds, data visualization |

## Tech Stack

- Three.js (r170+) with WebGPU backend
- TSL for all shaders
- React (Next.js) for UI
- GSAP for scroll management
