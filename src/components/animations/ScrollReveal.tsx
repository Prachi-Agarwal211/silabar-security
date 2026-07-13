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
      // ponytail: reduce distance on mobile for snappier feel
      const isMobile = window.innerWidth < 768
      const distance = isMobile ? 30 : 60
      const fromVars: Record<string, unknown> = { opacity: 0, filter: 'blur(8px)' }
      if (direction === 'up') fromVars.y = distance
      else if (direction === 'down') fromVars.y = -distance
      else if (direction === 'left') fromVars.x = distance
      else if (direction === 'right') fromVars.x = -distance

      gsap.from(el, {
        ...fromVars,
        duration: 1.2,
        delay,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
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
