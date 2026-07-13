'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * Performance-minded scroll reveal:
 * - transform + opacity only (no blur on large screens — blur is expensive on Mac GPU)
 * - shorter distances on mobile
 * - fully skipped when prefers-reduced-motion
 */
export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const isMobile = window.innerWidth < 768
      const isMac = window.innerWidth >= 1280
      const distance = isMobile ? 24 : isMac ? 40 : 48
      const fromVars: gsap.TweenVars = {
        opacity: 0,
        // Avoid filter:blur on desktop — major paint cost
        ...(isMobile ? { filter: 'blur(4px)' } : {}),
      }
      if (direction === 'up') fromVars.y = distance
      else if (direction === 'down') fromVars.y = -distance
      else if (direction === 'left') fromVars.x = distance
      else if (direction === 'right') fromVars.x = -distance

      gsap.from(el, {
        ...fromVars,
        duration: isMac ? 0.9 : 1.05,
        delay,
        ease: 'power3.out',
        clearProps: 'filter',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true,
        },
      })
    })

    return () => mm.revert()
  }, { scope: ref, dependencies: [delay, direction] })

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
