'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

interface SplitTextRevealProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  duration?: number
  type?: 'chars' | 'words' | 'lines'
  ease?: string
}

export default function SplitTextReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.03,
  duration = 0.8,
  type = 'chars',
  ease = 'expo.out',
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const split = SplitText.create(containerRef.current, { type })
    gsap.set(split[type], { yPercent: 110, opacity: 0 })
    gsap.to(split[type], {
      yPercent: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease,
    })

    return () => {
      split.revert()
    }
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className={className}>
      {text}
    </div>
  )
}
