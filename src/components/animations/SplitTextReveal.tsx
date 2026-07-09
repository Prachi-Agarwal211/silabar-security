'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

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

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const targets = container.querySelectorAll(`.split-${mode}`)
    if (!targets.length) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const anims: gsap.core.Tween[] = []
      targets.forEach((target, i) => {
        const randomDelay = delay + i * 0.03 + (Math.random() - 0.5) * 0.02
        anims.push(
          gsap.fromTo(target,
            { opacity: 0, y: 30, rotateX: -90, scale: 0.95, filter: 'blur(8px)' },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              filter: 'blur(0px)',
              duration: 1.0,
              delay: randomDelay,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: container,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            },
          )
        )
      })

      return () => {
        anims.forEach(a => {
          a.scrollTrigger?.kill()
          a.kill()
        })
      }
    })

    return () => mm.revert()
  }, [delay, mode, text])

  const renderSplit = () => {
    if (mode === 'words') {
      return text.split(' ').map((word, i) => (
        <span key={i} className="split-words inline-block" style={{ perspective: '400px' }}>
          {word}{i < text.split(' ').length - 1 ? '\u00A0' : ''}
        </span>
      ))
    }
    return text.split('').map((char, i) => (
      <span key={i} className="split-chars inline-block" style={{ perspective: '400px' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <div ref={containerRef} className={className}>
      {renderSplit()}
    </div>
  )
}
