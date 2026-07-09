'use client'

import { useEffect, useState } from 'react'

export function HeroParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; top: string; delay: string; duration: string; size: string }>>([])

  useEffect(() => {
    // Generate particles on client to avoid hydration mismatch
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${10 + Math.random() * 15}s`,
      size: `${2 + Math.random() * 3}px`,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="hero-particles" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="hero-particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  )
}
