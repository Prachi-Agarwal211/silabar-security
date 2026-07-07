# 20 — CREATIVE CODING FORMULAS
## Math Behind Shaders, Noise, Particles, and Physics

---

## HOW TO USE THIS FILE

Each formula includes:
1. The math equation
2. The JavaScript/TypeScript implementation
3. The visual result
4. When to use it
5. The anti-generic check

**Don't memorize. Reference. Copy the formula, adapt the values.**

---

## 1. SPRING PHYSICS

### The Math
```
F = -k * x - c * v
where:
  F = force
  k = stiffness (spring constant)
  x = displacement from target
  c = damping coefficient
  v = velocity
```

### The Implementation
```typescript
function spring(
  current: number,
  target: number,
  velocity: number,
  stiffness: number = 100,
  damping: number = 10,
  mass: number = 1
): [number, number] {
  const springForce = -stiffness * (current - target);
  const dampingForce = -damping * velocity;
  const acceleration = (springForce + dampingForce) / mass;
  const newVelocity = velocity + acceleration * 0.016; // ~60fps
  const newPosition = current + newVelocity * 0.016;
  return [newPosition, newVelocity];
}
```

### Visual Result
- Bouncy, natural motion
- Overshoots target, then settles
- Feels alive, not mechanical

### When to Use
- Hover effects (magnetic buttons)
- Page transitions
- Scroll-triggered reveals
- Custom cursor follow

### Anti-Generic Check
✅ Physics-based, not CSS transition
✅ Has mass/stiffness/damping (not just duration)

---

## 2. ELASTIC EASING

### The Math
```
y = 1 - cos(π * x) * e^(-6 * x)
```

### The Implementation
```typescript
function elasticOut(x: number): number {
  const c4 = (2 * Math.PI) / 3;
  return x === 0
    ? 0
    : x === 1
    ? 1
    : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}

function elasticIn(x: number): number {
  const c4 = (2 * Math.PI) / 3;
  return x === 0
    ? 0
    : x === 1
    ? 1
    : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
}
```

### Visual Result
- Bouncy, rubber-band feel
- Used by Apple for iOS animations
- Feels premium and intentional

### When to Use
- Button hover/click effects
- Modal open/close
- Accordion expand/collapse
- Tab switching

### Anti-Generic Check
✅ Bouncy, not just ease-in-out
✅ Feels like Apple's iOS

---

## 3. PERLIN NOISE

### The Math
```
Perlin noise generates smooth, continuous random values
based on gradient vectors at grid points.
```

### The Implementation
```typescript
// Simplified 2D Perlin noise
class PerlinNoise {
  private permutation: number[];

  constructor(seed: number = 0) {
    this.permutation = this.generatePermutation(seed);
  }

  private generatePermutation(seed: number): number[] {
    const p: number[] = [];
    for (let i = 0; i < 256; i++) p[i] = i;
    // Fisher-Yates shuffle with seed
    let s = seed;
    for (let i = 255; i > 0; i--) {
      s = (s * 16807 + 0) % 2147483647;
      const j = s % (i + 1);
      [p[i], p[j]] = [p[j], p[i]];
    }
    return [...p, ...p];
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  private lerp(a: number, b: number, t: number): number {
    return a + t * (b - a);
  }

  private grad(hash: number, x: number, y: number): number {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  noise2D(x: number, y: number): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = this.fade(xf);
    const v = this.fade(yf);
    const p = this.permutation;
    const a = p[X] + Y;
    const b = p[X + 1] + Y;
    return this.lerp(
      this.lerp(this.grad(p[a], xf, yf), this.grad(p[b], xf - 1, yf), u),
      this.lerp(
        this.grad(p[a + 1], xf, yf - 1),
        this.grad(p[b + 1], xf - 1, yf - 1),
        u
      ),
      v
    );
  }

  // Fractal Brownian Motion (layered noise)
  fbm(x: number, y: number, octaves: number = 4): number {
    let value = 0;
    let amplitude = 0.5;
    let frequency = 1;
    for (let i = 0; i < octaves; i++) {
      value += amplitude * this.noise2D(x * frequency, y * frequency);
      amplitude *= 0.5;
      frequency *= 2;
    }
    return value;
  }
}
```

### Visual Result
- Smooth, organic randomness
- Used for terrain, clouds, fire, water
- Feels natural, not random

### When to Use
- Background textures
- Particle movement
- Terrain generation
- Fluid simulation

### Anti-Generic Check
✅ Organic, not random
✅ Used in award-winning sites

---

## 4. FLOW FIELD

### The Math
```
angle = noise(x * frequency, y * frequency) * TWO_PI
velocity = [cos(angle), angle]
position += velocity * speed
```

### The Implementation
```typescript
function createFlowField(
  width: number,
  height: number,
  noise: PerlinNoise,
  frequency: number = 0.01,
  scale: number = 10
): number[][] {
  const field: number[][] = [];
  for (let y = 0; y < height; y += scale) {
    const row: number[] = [];
    for (let x = 0; x < width; x += scale) {
      const angle = noise.noise2D(x * frequency, y * frequency) * Math.PI * 2;
      row.push(angle);
    }
    field.push(row);
  }
  return field;
}

function followFlowField(
  x: number,
  y: number,
  field: number[][],
  scale: number,
  speed: number
): [number, number] {
  const col = Math.floor(x / scale);
  const row = Math.floor(y / scale);
  if (!field[row] || field[row][col] === undefined) return [x, y];
  const angle = field[row][col];
  return [x + Math.cos(angle) * speed, y + Math.sin(angle) * speed];
}
```

### Visual Result
- Particles follow invisible currents
- Feels like wind or water
- Organic, mesmerizing movement

### When to Use
- Background particle effects
- Generative art
- Loading animations
- Hero section backgrounds

### Anti-Generic Check
✅ Particles follow invisible forces
✅ Unique every time (noise-based)

---

## 5. BOIDS (Flocking Simulation)

### The Math
```
Separation: steer away from nearby boids
Alignment: steer towards average heading of nearby boids
Cohesion: steer towards average position of nearby boids
```

### The Implementation
```typescript
interface Boid {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function updateBoids(
  boids: Boid[],
  separationWeight: number = 1.5,
  alignmentWeight: number = 1.0,
  cohesionWeight: number = 1.0,
  perceptionRadius: number = 50,
  maxSpeed: number = 2
): Boid[] {
  return boids.map((boid) => {
    let sepX = 0, sepY = 0, sepCount = 0;
    let aliX = 0, aliY = 0, aliCount = 0;
    let cohX = 0, cohY = 0, cohCount = 0;

    boids.forEach((other) => {
      if (boid === other) return;
      const dx = other.x - boid.x;
      const dy = other.y - boid.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < perceptionRadius) {
        // Separation
        sepX -= dx / dist;
        sepY -= dy / dist;
        sepCount++;
        // Alignment
        aliX += other.vx;
        aliY += other.vy;
        aliCount++;
        // Cohesion
        cohX += other.x;
        cohY += other.y;
        cohCount++;
      }
    });

    let ax = 0, ay = 0;

    if (sepCount > 0) {
      ax += (sepX / sepCount) * separationWeight;
      ay += (sepY / sepCount) * separationWeight;
    }
    if (aliCount > 0) {
      ax += ((aliX / aliCount) - boid.vx) * alignmentWeight;
      ay += ((aliY / aliCount) - boid.vy) * alignmentWeight;
    }
    if (cohCount > 0) {
      ax += ((cohX / cohCount - boid.x) * 0.01) * cohesionWeight;
      ay += ((cohY / cohCount - boid.y) * 0.01) * cohesionWeight;
    }

    let vx = boid.vx + ax;
    let vy = boid.vy + ay;
    const speed = Math.sqrt(vx * vx + vy * vy);
    if (speed > maxSpeed) {
      vx = (vx / speed) * maxSpeed;
      vy = (vy / speed) * maxSpeed;
    }

    return { x: boid.x + vx, y: boid.y + vy, vx, vy };
  });
}
```

### Visual Result
- Particles flock like birds or fish
- Emergent behavior from simple rules
- Feels alive and intelligent

### When to Use
- Hero section backgrounds
- Loading animations
- Interactive particle systems
- Generative art

### Anti-Generic Check
✅ Emergent behavior, not pre-programmed
✅ Unique every time

---

## 6. VORONOI

### The Math
```
For each pixel, find the nearest point.
Color based on which point is nearest.
```

### The Implementation
```typescript
function voronoi(
  x: number,
  y: number,
  points: [number, number][]
): { distance: number; pointIndex: number } {
  let minDist = Infinity;
  let pointIndex = 0;
  points.forEach((point, i) => {
    const dx = x - point[0];
    const dy = y - point[1];
    const dist = dx * dx + dy * dy;
    if (dist < minDist) {
      minDist = dist;
      pointIndex = i;
    }
  });
  return { distance: Math.sqrt(minDist), pointIndex };
}

// Generate random points
function generatePoints(
  count: number,
  width: number,
  height: number
): [number, number][] {
  const points: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    points.push([Math.random() * width, Math.random() * height]);
  }
  return points;
}
```

### Visual Result
- Organic, cellular patterns
- Used for backgrounds, textures
- Feels natural, biological

### When to Use
- Background textures
- Section dividers
- Loading animations
- Generative patterns

### Anti-Generic Check
✅ Organic, not geometric
✅ Unique every time (random points)

---

## 7. REACTION-DIFFUSION

### The Math
```
∂a/∂t = Da∇²a - ab² + f(1-a)
∂b/∂t = Db∇²b + ab² - (k+f)b
where:
  a, b = chemical concentrations
  Da, Db = diffusion rates
  f = feed rate
  k = kill rate
```

### The Implementation
```typescript
class ReactionDiffusion {
  private a: Float32Array;
  private b: Float32Array;
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.a = new Float32Array(width * height).fill(1);
    this.b = new Float32Array(width * height);
    // Seed some b in the center
    const cx = width / 2;
    const cy = height / 2;
    for (let y = cy - 10; y < cy + 10; y++) {
      for (let x = cx - 10; x < cx + 10; x++) {
        this.b[y * width + x] = 1;
      }
    }
  }

  step(Da: number = 1, Db: number = 0.5, f: number = 0.055, k: number = 0.062) {
    const { width: w, width, height } = this;
    const newA = new Float32Array(w * height);
    const newB = new Float32Array(w * height);

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = y * w + x;
        const a = this.a[i];
        const b = this.b[i];
        const laplaceA =
          this.a[i - 1] + this.a[i + 1] + this.a[i - w] + this.a[i + w] - 4 * a;
        const laplaceB =
          this.b[i - 1] + this.b[i + 1] + this.b[i - w] + this.b[i + w] - 4 * b;
        const abb = a * b * b;
        newA[i] = a + (Da * laplaceA - abb + f * (1 - a));
        newB[i] = b + (Db * laplaceB + abb - (k + f) * b);
      }
    }
    this.a = newA;
    this.b = newB;
  }

  getPattern(): Float32Array {
    return this.a;
  }
}
```

### Visual Result
- Organic, coral-like patterns
- Used for generative art
- Feels alive, biological

### When to Use
- Background textures
- Generative art
- Loading animations
- Section dividers

### Anti-Generic Check
✅ Biological, not geometric
✅ Unique every time (seed-based)

---

## 8. SIMPLEX NOISE (Improved Perlin)

### The Math
```
Similar to Perlin noise but with fewer artifacts
and better performance in higher dimensions.
```

### The Implementation
```typescript
// Use a library for simplex noise
// github.com/jwagner/simplex-noise.js
import { createNoise2D } from 'simplex-noise';

const noise2D = createNoise2D();

function fbm(x: number, y: number, octaves: number = 4): number {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  for (let i = 0; i < octaves; i++) {
    value += amplitude * noise2D(x * frequency, y * frequency);
    amplitude *= 0.5;
    frequency *= 2;
  }
  return value;
}
```

### Visual Result
- Smoother than Perlin noise
- Fewer grid artifacts
- Better for large-scale terrain

### When to Use
- Terrain generation
- Cloud effects
- Water simulation
- Any large-scale noise

### Anti-Generic Check
✅ Smoother than Perlin
✅ Better performance

---

## 9. CURL NOISE

### The Math
```
velocity.x = ∂noise/∂y
velocity.y = -∂noise/∂x
```

### The Implementation
```typescript
function curlNoise(
  x: number,
  y: number,
  noise: PerlinNoise,
  epsilon: number = 0.01
): [number, number] {
  const dx = (noise.noise2D(x + epsilon, y) - noise.noise2D(x - epsilon, y)) / (2 * epsilon);
  const dy = (noise.noise2D(x, y + epsilon) - noise.noise2D(x, y - epsilon)) / (2 * epsilon);
  return [dy, -dx]; // Curl
}
```

### Visual Result
- Swirling, fluid-like motion
- Used for smoke, fire, water
- Feels natural, not random

### When to Use
- Smoke effects
- Fire simulation
- Water ripples
- Fluid backgrounds

### Anti-Generic Check
✅ Fluid, not random
✅ Used in film/VFX

---

## 10. DAMPENED OSCILLATION

### The Math
```
y = A * e^(-ζωt) * cos(ωd * t + φ)
where:
  A = amplitude
  ζ = damping ratio
  ω = natural frequency
  ωd = damped frequency
  φ = phase
```

### The Implementation
```typescript
function dampedOscillation(
  t: number,
  amplitude: number = 1,
  damping: number = 0.5,
  frequency: number = 2,
  phase: number = 0
): number {
  const omega = frequency * Math.PI * 2;
  const dampedOmega = omega * Math.sqrt(1 - damping * damping);
  return amplitude * Math.exp(-damping * omega * t) * Math.cos(dampedOmega * t + phase);
}
```

### Visual Result
- Bouncy, settling motion
- Used for spring animations
- Feels physical, real

### When to Use
- Spring physics
- Bouncy UI elements
- Loading indicators
- Page transitions

### Anti-Generic Check
✅ Physical, not CSS transition
✅ Feels real, not digital

---

## 11. BEZIER CURVE

### The Math
```
B(t) = (1-t)³P0 + 3(1-t)²tP1 + 3(1-t)t²P2 + t³P3
```

### The Implementation
```typescript
function bezier(
  t: number,
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number]
): [number, number] {
  const u = 1 - t;
  const x = u*u*u*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t*t*t*p3[0];
  const y = u*u*u*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t*t*t*p3[1];
  return [x, y];
}

// For CSS cubic-bezier approximation
function cubicBezierToPoints(
  x1: number, y1: number, x2: number, y2: number
): [number, number][] {
  const points: [number, number][] = [];
  for (let t = 0; t <= 1; t += 0.01) {
    points.push(bezier(t, [0, 0], [x1, y1], [x2, y2], [1, 1]));
  }
  return points;
}
```

### Visual Result
- Smooth, curved motion
- Used for custom easing
- Feels intentional, not linear

### When to Use
- Custom easing functions
- Path animations
- SVG morphing
- Scroll-driven curves

### Anti-Generic Check
✅ Custom curve, not default easing
✅ Feels intentional

---

## 12. WAVE FUNCTION

### The Math
```
y = A * sin(ωx + φ) + offset
where:
  A = amplitude
  ω = frequency
  φ = phase
  offset = vertical offset
```

### The Implementation
```typescript
function wave(
  x: number,
  amplitude: number = 1,
  frequency: number = 1,
  phase: number = 0,
  offset: number = 0
): number {
  return amplitude * Math.sin(frequency * x + phase) + offset;
}

// Multi-wave (ocean-like)
function oceanWave(
  x: number,
  time: number,
  waves: { amplitude: number; frequency: number; phase: number }[]
): number {
  return waves.reduce((sum, w) =>
    sum + w.amplitude * Math.sin(w.frequency * x + w.phase + time), 0);
}
```

### Visual Result
- Smooth, rhythmic motion
- Used for wave effects, loading
- Feels natural, calming

### When to Use
- Wave animations
- Loading indicators
- Background effects
- Scroll-driven motion

### Anti-Generic Check
✅ Rhythmic, not random
✅ Feels natural

---

## CHEAT SHEET

| Effect | Formula | Use Case |
|--------|---------|----------|
| Spring | F = -kx - cv | Bouncy UI, cursor follow |
| Elastic | cos(πx) * e^(-6x) | Premium feel, Apple-like |
| Perlin | Gradient noise | Organic textures, terrain |
| Flow Field | angle = noise(x,y) * 2π | Particle movement |
| Boids | Separation + Alignment + Cohesion | Flocking, AI-like |
| Voronoi | Nearest point | Cellular patterns |
| Reaction-Diffusion | ∂a/∂t = ... | Coral, biological |
| Curl Noise | ∂noise/∂y, -∂noise/∂x | Smoke, fluid |
| Damped Oscillation | Ae^(-ζωt) * cos(ωdt) | Settling motion |
| Bezier | (1-t)³P0 + ... | Custom easing |
| Wave | A * sin(ωx + φ) | Wave effects |

---

## HOW TO USE THIS FILE

When you need a visual effect:
1. Find the formula that matches
2. Copy the implementation
3. Adjust parameters to match your design
4. Test visually (not just mathematically)
5. Run the anti-generic check

**These formulas are tools, not toys. Use them to create memorable experiences.**
