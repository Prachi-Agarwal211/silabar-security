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

export default function MaskReveal({
  children,
  direction = 'bottom',
  duration = 1.2,
  delay = 0,
  className = ''
}: MaskRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    let clipPathStart = ''
    switch (direction) {
      case 'left':
        clipPathStart = 'inset(0% 100% 0% 0%)'
        break
      case 'right':
        clipPathStart = 'inset(0% 0% 0% 100%)'
        break
      case 'top':
        clipPathStart = 'inset(100% 0% 0% 0%)'
        break
      case 'bottom':
        clipPathStart = 'inset(0% 0% 100% 0%)'
        break
      case 'center':
        clipPathStart = 'inset(50% 50% 50% 50%)'
        break
    }

    gsap.fromTo(
      containerRef.current,
      { clipPath: clipPathStart },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration,
        delay,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    )
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className={`mask-reveal ${className}`} style={{ visibility: 'hidden' /* GSAP fixes this on load */ }}>
      {children}
    </div>
  )
}
