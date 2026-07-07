'use client'

import { useRef, useEffect } from 'react'

interface FloatingElementsProps {
  count?: number
  className?: string
}

export default function FloatingElements({
  count = 5,
  className = '',
}: FloatingElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // ponytail: simple random animation via CSS custom properties
    const elements = container.querySelectorAll('.floating-el')
    elements.forEach((el) => {
      const htmlEl = el as HTMLElement
      const x = Math.random() * 100
      const y = Math.random() * 100
      const duration = 15 + Math.random() * 20
      const delay = Math.random() * -20
      const size = 2 + Math.random() * 4

      htmlEl.style.setProperty('--x', `${x}%`)
      htmlEl.style.setProperty('--y', `${y}%`)
      htmlEl.style.setProperty('--size', `${size}px`)
      htmlEl.style.animationDuration = `${duration}s`
      htmlEl.style.animationDelay = `${delay}s`
    })
  }, [count])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="floating-el absolute rounded-full bg-gold/20"
          style={{
            left: 'var(--x)',
            top: 'var(--y)',
            width: 'var(--size)',
            height: 'var(--size)',
            animation: 'float 20s ease-in-out infinite',
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -40px) scale(1.2); }
          50% { transform: translate(-20px, 20px) scale(0.8); }
          75% { transform: translate(40px, 30px) scale(1.1); }
        }
      `}</style>
    </div>
  )
}
