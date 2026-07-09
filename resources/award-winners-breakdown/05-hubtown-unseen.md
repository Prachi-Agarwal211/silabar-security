# Hubtown — Unseen Studio

**URL:** https://hubtown.in
**Studio:** Unseen Studio (India)
**Year:** 2025-2026

---

## Overview

B2B real estate development showcase. Proves B2B doesn't have to be boring. Features a 3D monolith building that deconstructs/reconstructs on mouse interaction.

## Key Techniques

### 1. 3D Monolith with Mouse-Reveal
A large 3D building block sits centrally. As user moves mouse, layers peel back to reveal the interior, floor plans, and data. The monolith is not just decorative — it's the primary navigation.

**How:** Raycaster detects mouse position on the 3D object, triggers material/geometry changes:
```javascript
raycaster.setFromCamera(mouse, camera)
const intersects = raycaster.intersectObject(monolith)
if (intersects.length) {
  // Reveal interior layer
  gsap.to(interior, { opacity: 1, duration: 0.5 })
}
```

### 2. Architectural Cutaway
Sections of the building can be removed to reveal cross-section views. Uses Three.js clipping planes or geometry boolean operations.

### 3. Data Integrated Into 3D Space
Metrics (square footage, floors, amenities) appear as 3D labels floating in world space, not 2D overlays. Makes data feel physical.

**How:** CSS2DRenderer or sprite-based labels positioned in 3D space, always facing camera.

### 4. Ambient Building Environment
The building exists in a stylized city environment — low-poly surrounding buildings, atmospheric fog, directional light that changes based on time of day (or user scroll position).

## Techniques You Can Steal

| Technique | Steal it for |
|-----------|--------------|
| 3D object as navigation | B2B, real estate, architecture, product |
| Mouse-reveal interior layers | Product details, feature exploration |
| 3D data labels | Data visualization, dashboards, specs |
| Clipping plane architecture cutaway | Construction, medical, engineering |

## Why It Works

Proves B2B can be award-winning. The 3D monolith is not decoration — it's the interface. Every interaction reveals useful information. Data lives in 3D space instead of panels.

## Tech Stack

- Three.js
- React (Next.js)
- GSAP for transitions
- CSS2DRenderer for labels
