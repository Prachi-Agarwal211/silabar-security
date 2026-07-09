// Rotational Inertia Particle System
// No dependencies — pure Canvas 2D

export interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number; life: number
}

export interface ParticleConfig {
  count: number
  speed: number
  size: number
  color: string
  decay: number
  connectDistance: number
}

export class ParticleField {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private particles: Particle[] = []
  private config: ParticleConfig
  private animId: number = 0

  constructor(canvas: HTMLCanvasElement, config: Partial<ParticleConfig> = {}) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.config = {
      count: 80,
      speed: 0.5,
      size: 2,
      color: '#ffffff',
      decay: 0.98,
      connectDistance: 120,
      ...config
    }
    this.resize()
    this.init()
  }

  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  init() {
    this.particles = Array.from({ length: this.config.count }, () => ({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * this.config.speed,
      vy: (Math.random() - 0.5) * this.config.speed,
      size: Math.random() * this.config.size + 1,
      life: Math.random() * 0.5 + 0.5
    }))
  }

  update(mouseX?: number, mouseY?: number) {
    this.particles.forEach(p => {
      p.x += p.vx
      p.y += p.vy

      // Inertial decay (slow down over time)
      p.vx *= this.config.decay
      p.vy *= this.config.decay

      // Mouse interaction — particles drift away from cursor
      if (mouseX !== undefined && mouseY !== undefined) {
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 100) {
          p.vx += dx * 0.001
          p.vy += dy * 0.001
        }
      }

      // Wrap around edges
      if (p.x < 0) p.x = this.canvas.width
      if (p.x > this.canvas.width) p.x = 0
      if (p.y < 0) p.y = this.canvas.height
      if (p.y > this.canvas.height) p.y = 0
    })
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // ponytail: O(n^2) connection rendering — ~5k checks/frame at 100 particles. Use spatial hash if >200.
    this.particles.forEach((a, i) => {
      this.particles.slice(i + 1).forEach(b => {
        const dx = a.x - b.x
        const dy = a.y - b.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < this.config.connectDistance) {
          this.ctx.strokeStyle = this.config.color
          this.ctx.globalAlpha = (1 - dist / this.config.connectDistance) * 0.3
          this.ctx.lineWidth = 0.5
          this.ctx.beginPath()
          this.ctx.moveTo(a.x, a.y)
          this.ctx.lineTo(b.x, b.y)
          this.ctx.stroke()
        }
      })
    })

    // Draw particles
    this.particles.forEach(p => {
      this.ctx.fillStyle = this.config.color
      this.ctx.globalAlpha = p.life
      this.ctx.beginPath()
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      this.ctx.fill()
    })
  }

  start() {
    const loop = () => {
      this.update()
      this.draw()
      this.animId = requestAnimationFrame(loop)
    }
    loop()
  }

  stop() {
    cancelAnimationFrame(this.animId)
  }

  destroy() {
    this.stop()
    this.particles = []
  }
}

// Usage:
// const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement
// const field = new ParticleField(canvas, { count: 100, color: '#4ecdc4' })
// field.start()
// window.addEventListener('resize', () => field.resize())
