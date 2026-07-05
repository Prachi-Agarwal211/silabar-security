'use client'

import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface TextGlowProps {
  children: ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  color?: 'gold' | 'red'
  triggerOnScroll?: boolean
}

export default function TextGlow({
  children,
  className = '',
  as: Tag = 'h2',
  color = 'gold',
  triggerOnScroll = true,
}: TextGlowProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    const el = ref.current
    if (!el) return

    const glowColor = color === 'gold'
      ? 'rgba(212, 175, 55, 0.5)'
      : 'rgba(204, 34, 34, 0.5)'

    const shadowBase = color === 'gold'
      ? '0 0 20px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.1)'
      : '0 0 20px rgba(204, 34, 34, 0.3), 0 0 40px rgba(204, 34, 34, 0.1)'

    const shadowActive = color === 'gold'
      ? '0 0 30px rgba(212, 175, 55, 0.5), 0 0 60px rgba(212, 175, 55, 0.2)'
      : '0 0 30px rgba(204, 34, 34, 0.5), 0 0 60px rgba(204, 34, 34, 0.2)'

    if (triggerOnScroll) {
      gsap.fromTo(el,
        { textShadow: '0 0 0px transparent' },
        {
          textShadow: shadowActive,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
          yoyo: true,
          repeat: 1,
          repeatDelay: 0.5,
        }
      )
    } else {
      gsap.to(el, {
        textShadow: shadowActive,
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
      })
    }
  }, { scope: ref, dependencies: [color, triggerOnScroll] })

  return (
    // @ts-expect-error Tag is a valid HTML element
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
