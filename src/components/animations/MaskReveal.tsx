'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'

interface MaskRevealProps {
  children: React.ReactNode
  direction?: 'left' | 'right' | 'top' | 'bottom' | 'center'
  duration?: number
  delay?: number
  className?: string
}

const DIR_MAP: Record<string, string> = {
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
  top: 'inset(100% 0% 0% 0%)',
  bottom: 'inset(0% 0% 100% 0%)',
  center: 'inset(50% 50% 50% 50%)',
}

export default function MaskReveal({
  children,
  direction = 'bottom',
  duration = 1.2,
  delay = 0,
  className = ''
}: MaskRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const el = containerRef.current
    if (!el) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(el,
        { clipPath: DIR_MAP[direction] || DIR_MAP.bottom },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration,
          delay,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        }
      )
    })

    return () => mm.revert()
  }, { scope: containerRef, dependencies: [direction, duration, delay] })

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}