'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'

interface SplitTextRevealProps {
  text: string
  className?: string
  delay?: number
  mode?: 'chars' | 'words' | 'lines'
}

export default function SplitTextReveal({
  text,
  className = '',
  delay = 0,
  mode = 'chars',
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const container = containerRef.current
    if (!container) return

    const inner = container.children[0] as HTMLElement | undefined
    if (!inner) return
    const nodes = Array.from(inner.querySelectorAll('.split-item'))
    if (!nodes.length) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const isMobile = window.innerWidth < 768
      nodes.forEach((node, i) => {
        gsap.fromTo(node,
          { opacity: 0, y: isMobile ? 16 : 24 },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.6 : 0.8,
            delay: delay + i * 0.03,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    })

    return () => mm.revert()
  }, { scope: containerRef, dependencies: [delay, mode, text] })

  const words = text.split(' ')

  return (
    <div ref={containerRef} className={className}>
      <span>
        {words.map((word, i) => (
          <span key={i} className="split-item inline-block">
            {word}{i < words.length - 1 ? '\u00A0' : ''}
          </span>
        ))}
      </span>
    </div>
  )
}
