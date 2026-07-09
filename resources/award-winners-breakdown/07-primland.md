# Explore Primland — Internal Team

**URL:** https://exploreprimland.com
**Studio:** Unknown (internal/agency)
**Year:** 2025-2026

---

## Overview

Cinematic landscape flythrough for Primland resort. The site flies users through mountains, forests, and resort buildings in a single continuous scroll. Every frame is a postcard.

## Key Techniques

### 1. Cinematic Landscape Flythrough
The camera navigates through a real 3D terrain map (from GIS/lidar data) as user scrolls. Feels like a drone flyover, not a slideshow.

**How:** Three.js terrain geometry from heightmap data + camera path along terrain:
```javascript
const terrain = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 200, 200), material)
// Displace vertices from heightmap
const verts = terrain.geometry.attributes.position.array
heightmapData.forEach((h, i) => verts[i * 3 + 2] = h)
// Camera follows path along terrain surface
```

### 2. Scroll-Synced Virtual Tour
Scroll progress = travel distance. The camera moves continuously forward through the landscape. Speed is consistent — no pin stops or panel switches.

### 3. Seasonal/Weather Transitions
As user flies through different areas, weather changes — sunny meadows transition to misty forests to snowy peaks. Materials, fog, and lighting all shift.

**How:** Uniform lerping between environment states based on scroll position:
```javascript
const fog = lerp(0.01, 0.1, scrollProgress)
scene.fog = new THREE.Fog(color1.lerp(color2, scrollProgress), 10, 100)
```

### 4. POI (Point of Interest) Labels
3D labels appear at points of interest (lodge, golf course, spa) as user flies past them. Labels float in world space with leader lines.

### 5. Ambient Nature Audio
Background audio (birds, wind, water) changes based on camera position in the landscape. Not just music — positional environmental audio.

## Techniques You Can Steal

| Technique | Steal it for |
|-----------|--------------|
| Terrain flythrough from heightmaps | Real estate, travel, architecture |
| Weather/environment transitions | Any outdoor or natural brand |
| Scroll = travel distance | Virtual tours, product journeys |
| Positional audio | Immersive experiences, brand atmospheres |

## Why It Works

The continuous flythrough feels like a real experience, not a web page. Users don't "scroll" — they "fly." The weather transitions and audio make each zone feel distinct.

## Tech Stack

- Three.js (terrain from heightmap data)
- GSAP scroll-linked camera path
- Web Audio API (positional audio)
- Texture-based terrain (satellite imagery)
