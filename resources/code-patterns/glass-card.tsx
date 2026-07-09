// Glassmorphism Card Component (React)

'use client'

import { useRef, type ReactNode } from 'react'
import gsap from 'gsap'

interface GlassCardProps {
  children: ReactNode
  className?: string
  blur?: number
  opacity?: number
  tilt?: boolean
  glare?: boolean
}

export function GlassCard({
  children,
  className = '',
  blur = 12,
  opacity = 0.1,
  tilt = false,
  glare = false
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    if (tilt) {
      gsap.to(cardRef.current, {
        rotateX: -(y - 0.5) * 12,
        rotateY: (x - 0.5) * 12,
        duration: 0.4,
        ease: 'power2.out'
      })
    }

    if (glare && glareRef.current) {
      gsap.to(glareRef.current, {
        background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
        duration: 0.2
      })
    }
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)'
    })
  }

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={tilt || glare ? handleMouseMove : undefined}
      onMouseLeave={tilt ? handleMouseLeave : undefined}
      style={{
        position: 'relative',
        background: `rgba(255, 255, 255, ${opacity})`,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        overflow: 'hidden',
        ...(tilt ? {
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        } : {})
      }}
    >
      {glare && (
        <div
          ref={glareRef}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: 'inherit'
          }}
        />
      )}
      {children}
    </div>
  )
}
