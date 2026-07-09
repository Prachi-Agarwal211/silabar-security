// SVG Path Morph Component (React + GSAP)
// Morph between two SVG paths on hover

'use client'

import { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

gsap.registerPlugin(MorphSVGPlugin)

interface PathMorphProps {
  paths: {
    idle: string   // Path data for idle state
    hover: string  // Path data for hover state
  }
  size?: number
  duration?: number
  className?: string
}

export function PathMorph({ paths, size = 48, duration = 0.6, className = '' }: PathMorphProps) {
  const pathRef = useRef<SVGPathElement>(null)
  const mouseEnter = useCallback(() => {
    gsap.to(pathRef.current, {
      morphSVG: paths.hover,
      duration,
      ease: 'power2.inOut'
    })
  }, [paths.hover, duration])

  const mouseLeave = useCallback(() => {
    gsap.to(pathRef.current, {
      morphSVG: paths.idle,
      duration,
      ease: 'elastic.out(1, 0.3)'
    })
  }, [paths.idle, duration])

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      style={{ cursor: 'pointer' }}
    >
      <path
        ref={pathRef}
        d={paths.idle}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Usage:
// <PathMorph
//   paths={{
//     idle: 'M12 5v14M5 12h14',                    // Plus icon
//     hover: 'M5 5l14 14M19 5l-14 14'               // X icon
//   }}
//   size={32}
// />
