'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'
import { Shield } from 'lucide-react'
import type { Service } from '@/data/services'

interface RadialServicesProps {
  services: Service[]
}

export default function RadialServices({ services }: RadialServicesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const outerRingRef = useRef<SVGCircleElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Use up to 12 services for the radial layout
  const displayServices = useMemo(() => services.slice(0, 12), [services])
  const totalNodes = displayServices.length

  // Layout constants
  const RADIUS_INNER = 180
  const RADIUS_OUTER = 260
  const LINE_LENGTH = 140

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isMobile || !containerRef.current) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
      })

      // Entrance animation
      const rings = containerRef.current!.querySelectorAll('.radial-ring')
      const nodes = containerRef.current!.querySelectorAll('.radial-node')
      const lines = containerRef.current!.querySelectorAll('.radial-line')
      const dots = containerRef.current!.querySelectorAll('.radial-dot')
      const emblem = containerRef.current!.querySelector('.radial-emblem')

      tl.fromTo(
        rings,
        { scale: 0, opacity: 0, transformOrigin: 'center center' },
        { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.2)', stagger: 0.1 }
      )
      
      if (emblem) {
        tl.fromTo(emblem, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.6')
      }

      if (nodes.length > 0) {
        tl.fromTo(
          nodes,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out' },
          '-=0.4'
        )
      }

      if (lines.length > 0) {
        tl.fromTo(
          lines,
          { strokeDasharray: '0 500' },
          { strokeDasharray: '500 500', duration: 0.8, stagger: 0.05, ease: 'power2.out' },
          '-=0.6'
        )
      }

      if (dots.length > 0) {
        tl.fromTo(
          dots,
          { scale: 0, opacity: 0, transformOrigin: 'center center' },
          { scale: 1, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'back.out(2)' },
          '-=0.4'
        )
      }

      // Idle animation for outer ring
      if (outerRingRef.current) {
        gsap.to(outerRingRef.current, {
          rotation: 360,
          transformOrigin: 'center center',
          duration: 120,
          repeat: -1,
          ease: 'none',
        })
      }

      return () => tl.kill()
    })

    return () => mm.revert()
  }, [isMobile, totalNodes])

  // Precompute angles and positions
  const nodeData = useMemo(() => {
    return displayServices.map((service, i) => {
      // Divide the nodes evenly over 360 degrees.
      // We want to offset by 90 degrees so 0 starts at the top if we wanted, 
      // but splitting into left and right columns usually means:
      // Angles from 0 to 180 (right side), 180 to 360 (left side).
      // Since we want nodes down left and right edges, we map the index to specific angles.
      // E.g., for 10 nodes: 5 on left, 5 on right.
      
      const isRight = i < totalNodes / 2
      const sideIndex = isRight ? i : i - Math.ceil(totalNodes / 2)
      const nodesPerSide = isRight ? Math.ceil(totalNodes / 2) : Math.floor(totalNodes / 2)
      
      // Calculate angle spread across a side. (e.g. from -60 deg to +60 deg)
      // We use 0 as pointing straight RIGHT. 
      // Right side angles: -60 to 60.
      // Left side angles: 120 to 240.
      
      const angleSpread = 140 // degrees
      const startAngle = isRight ? -angleSpread / 2 : 180 - angleSpread / 2
      const angleStep = nodesPerSide > 1 ? angleSpread / (nodesPerSide - 1) : 0
      const angleDeg = startAngle + sideIndex * angleStep
      const angleRad = (angleDeg * Math.PI) / 180

      // Connector dot position (on the outer ring)
      const dotX = 500 + RADIUS_OUTER * Math.cos(angleRad)
      const dotY = 500 + RADIUS_OUTER * Math.sin(angleRad)

      // Terminal position for the line (where the icon will sit)
      const lineEndX = 500 + (RADIUS_OUTER + LINE_LENGTH) * Math.cos(angleRad)
      const lineEndY = 500 + (RADIUS_OUTER + LINE_LENGTH) * Math.sin(angleRad)

      // The HTML node wrapper sits at the lineEnd. 
      // But SVG is 1000x1000 scaled to container.
      // Since HTML overlays the same container, we convert the 1000x1000 space to percentages.
      const htmlLeft = (lineEndX / 1000) * 100
      const htmlTop = (lineEndY / 1000) * 100

      return {
        service,
        index: i,
        isRight,
        dotX,
        dotY,
        lineEndX,
        lineEndY,
        htmlLeft,
        htmlTop,
      }
    })
  }, [displayServices, totalNodes])

  return (
    <section className="radial-services-section">
      <div className="radial-services-header">
        <span className="services-eyebrow">WHAT WE DO</span>
        <h2 className="services-title">
          {totalNodes} <span className="services-title--outline">VERTICALS.</span>
        </h2>
        <span className="services-divider" />
        <p className="services-subcopy">
          COMPLETE SECURITY & FACILITY MANAGEMENT<br />FOR INDIA'S TOP ENTERPRISES.
        </p>
      </div>

      {isMobile ? (
        <div className="radial-stacked-list">
          <div className="radial-stacked-line" />
          {displayServices.map((s, i) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="radial-stacked-node">
              <div className="radial-stacked-icon">
                <Shield size={20} strokeWidth={1.5} />
              </div>
              <div className="radial-stacked-dot" />
              <div className="radial-stacked-content">
                <div className="radial-stacked-header">
                  <span className="radial-stacked-number">{String(i + 1).padStart(2, '0')}</span>
                  <span className="radial-stacked-title">{s.shortTitle}</span>
                </div>
                <p className="radial-stacked-desc">{s.description}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="radial-container" ref={containerRef}>
          {/* Layer 1: SVG Structure (Pointer Events None) */}
          <svg className="radial-svg" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Inner Red Ring */}
            <circle className="radial-ring radial-ring--inner" cx="500" cy="500" r={RADIUS_INNER} />
            
            {/* Outer Gold Ring */}
            <circle 
              ref={outerRingRef}
              className="radial-ring radial-ring--outer" 
              cx="500" 
              cy="500" 
              r={RADIUS_OUTER} 
            />

            {/* Connector Lines and Dots */}
            {nodeData.map((node, i) => (
              <g key={`line-${i}`}>
                <line 
                  className="radial-line"
                  x1={node.dotX} 
                  y1={node.dotY} 
                  x2={node.lineEndX} 
                  y2={node.lineEndY} 
                />
                <circle 
                  className="radial-dot"
                  cx={node.dotX} 
                  cy={node.dotY} 
                  r="4" 
                />
              </g>
            ))}
          </svg>

          {/* Layer 2: Center Emblem */}
          <div className="radial-emblem">
            <Shield size={40} className="radial-emblem-icon" strokeWidth={1.5} />
          </div>

          {/* Layer 3: HTML Nodes */}
          {nodeData.map((node) => {
            const num = String(node.index + 1).padStart(2, '0')
            return (
              <div 
                key={node.service.slug}
                className="radial-nodes-layer"
                style={{ top: `${node.htmlTop}%`, left: `${node.htmlLeft}%` }}
              >
                <Link 
                  href={`/services/${node.service.slug}`}
                  className={`radial-node ${node.isRight ? 'radial-node--right' : 'radial-node--left'}`}
                  style={{
                    // Shift the node appropriately depending on if it's right or left aligned
                    transform: node.isRight ? 'translateX(0)' : 'translateX(-100%)'
                  }}
                >
                  {node.isRight ? (
                    <>
                      <div className="radial-icon">
                        <Shield size={20} strokeWidth={1.5} />
                      </div>
                      <div className="radial-node-content" style={{ alignItems: 'flex-start' }}>
                        <span className="radial-node-number">{num}</span>
                        <span className="radial-node-title">{node.service.shortTitle}</span>
                        <p className="radial-node-desc" style={{ textAlign: 'left' }}>{node.service.description}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="radial-node-content" style={{ alignItems: 'flex-end' }}>
                        <span className="radial-node-number">{num}</span>
                        <span className="radial-node-title">{node.service.shortTitle}</span>
                        <p className="radial-node-desc" style={{ textAlign: 'right' }}>{node.service.description}</p>
                      </div>
                      <div className="radial-icon">
                        <Shield size={20} strokeWidth={1.5} />
                      </div>
                    </>
                  )}
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
