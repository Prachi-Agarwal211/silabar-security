'use client'

import { useRef, useState, useEffect } from 'react'
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
  const [effectiveMode, setEffectiveMode] = useState(mode)

  useEffect(() => {
    const checkMode = () => {
      setEffectiveMode(window.innerWidth < 768 ? 'words' : mode)
    }
    checkMode()
    window.addEventListener('resize', checkMode)
    return () => window.removeEventListener('resize', checkMode)
  }, [mode])

  useGSAP(() => {
    const container = containerRef.current
    if (!container) return

    const targets = container.querySelectorAll(`.split-${effectiveMode}`)
    if (!targets.length) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      targets.forEach((target, i) => {
        gsap.fromTo(target,
          { opacity: 0, y: 30, rotateX: -90, scale: 0.95, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.0,
            delay: delay + i * 0.03,
            ease: 'expo.out',
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
  }, { scope: containerRef, dependencies: [delay, effectiveMode, text] })

  const renderSplit = () => {
    if (effectiveMode === 'words') {
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
