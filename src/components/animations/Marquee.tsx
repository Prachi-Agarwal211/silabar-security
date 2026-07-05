'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface MarqueeProps {
  items: string[]
  speed?: number
  direction?: 'left' | 'right'
  className?: string
}

export default function Marquee({ items, speed = 30, direction = 'left', className = '' }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const inner = innerRef.current
    if (!track || !inner) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const halfWidth = inner.scrollWidth / 2
    const duration = halfWidth / speed

    const tween = gsap.to(inner, {
      x: direction === 'left' ? -halfWidth : halfWidth,
      duration,
      ease: 'none',
      repeat: -1,
    })

    // Pause on hover
    const pause = () => tween.pause()
    const resume = () => tween.resume()
    track.addEventListener('mouseenter', pause)
    track.addEventListener('mouseleave', resume)

    return () => {
      tween.kill()
      track.removeEventListener('mouseenter', pause)
      track.removeEventListener('mouseleave', resume)
    }
  }, [items, speed, direction])

  return (
    <div
      ref={trackRef}
      className={`relative overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        ref={innerRef}
        className="flex w-max gap-0"
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-6 px-6 whitespace-nowrap"
          >
            <span className="text-sm font-bold tracking-[0.15em] uppercase text-horizon-400/40">
              {item}
            </span>
            <span className="text-purple-500/40 text-xs">&#9670;</span>
          </div>
        ))}
      </div>
    </div>
  )
}
