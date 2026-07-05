'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

interface FloatingElement {
  id: string
  size: number
  x: string
  y: string
  color: string
  shape: 'circle' | 'diamond' | 'cross' | 'ring'
  speed: number
  rotation: number
}

const elements: FloatingElement[] = [
  { id: 'float-1', size: 12, x: '8%', y: '15%', color: 'var(--purple-500)', shape: 'circle', speed: 3.5, rotation: 0 },
  { id: 'float-2', size: 8, x: '92%', y: '25%', color: 'var(--gold-400)', shape: 'diamond', speed: 4.2, rotation: 45 },
  { id: 'float-3', size: 16, x: '5%', y: '60%', color: 'var(--cyan-400)', shape: 'ring', speed: 5, rotation: 0 },
  { id: 'float-4', size: 10, x: '88%', y: '70%', color: 'var(--purple-400)', shape: 'cross', speed: 3.8, rotation: 15 },
  { id: 'float-5', size: 6, x: '15%', y: '85%', color: 'var(--gold-500)', shape: 'circle', speed: 4.5, rotation: 0 },
  { id: 'float-6', size: 14, x: '80%', y: '45%', color: 'var(--purple-600)', shape: 'diamond', speed: 3.2, rotation: 30 },
  { id: 'float-7', size: 8, x: '50%', y: '10%', color: 'var(--cyan-400)', shape: 'ring', speed: 4.8, rotation: 0 },
  { id: 'float-8', size: 10, x: '35%', y: '90%', color: 'var(--purple-500)', shape: 'cross', speed: 3.6, rotation: 60 },
]

function getShape(shape: string, size: number, color: string) {
  const s = size
  switch (shape) {
    case 'diamond':
      return (
        <div
          style={{
            width: s,
            height: s,
            background: color,
            transform: 'rotate(45deg)',
          }}
        />
      )
    case 'cross':
      return (
        <div style={{ position: 'relative', width: s, height: s }}>
          <div style={{
            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
            width: 2, height: s, background: color,
          }} />
          <div style={{
            position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)',
            width: s, height: 2, background: color,
          }} />
        </div>
      )
    case 'ring':
      return (
        <div
          style={{
            width: s,
            height: s,
            border: `1.5px solid ${color}`,
            borderRadius: '50%',
          }}
        />
      )
    default:
      return (
        <div
          style={{
            width: s,
            height: s,
            background: color,
            borderRadius: '50%',
          }}
        />
      )
  }
}

export default function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const els = containerRef.current.children

    Array.from(els).forEach((el, i) => {
      const float = elements[i]
      if (!float) return

      // Continuous organic floating — random X/Y oscillation
      gsap.to(el, {
        x: `random(-15, 15)`,
        y: `random(-12, 12)`,
        duration: float.speed,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.3,
      })

      // Slow rotation
      gsap.to(el, {
        rotation: `random(-180, 180)`,
        duration: float.speed * 2.5,
        ease: 'none',
        repeat: -1,
        delay: i * 0.5,
      })

      // Subtle scale pulse
      gsap.to(el, {
        scale: `random(0.7, 1.3)`,
        duration: float.speed * 1.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.2,
      })
    })
  }, { scope: containerRef })

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute opacity-20"
          style={{ left: el.x, top: el.y }}
        >
          {getShape(el.shape, el.size, el.color)}
        </div>
      ))}
    </div>
  )
}
