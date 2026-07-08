'use client'

import { useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'
import type { Service } from '@/data/services'

interface ServicesGridProps {
  services: Service[]
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  // Use up to 12 services for the layout
  const displayServices = useMemo(() => services.slice(0, 12), [services])

  useEffect(() => {
    if (!containerRef.current) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      })

      const panels = containerRef.current!.querySelectorAll('.services-comic-panel')
      
      const evenPanels = Array.from(panels).filter((_, i) => i % 2 === 0)
      const oddPanels = Array.from(panels).filter((_, i) => i % 2 !== 0)

      tl.fromTo(
        evenPanels,
        { clipPath: 'inset(0% 100% 0% 0%)' },
        { 
          clipPath: 'inset(0% 0% 0% 0%)', 
          duration: 0.9, 
          stagger: 0.05, 
          ease: 'power3.out' 
        },
        0 // start at time 0
      )

      tl.fromTo(
        oddPanels,
        { clipPath: 'inset(0% 0% 0% 100%)' },
        { 
          clipPath: 'inset(0% 0% 0% 0%)', 
          duration: 0.9, 
          stagger: 0.05, 
          ease: 'power3.out' 
        },
        0 // start at time 0, parallel to even panels
      )
    })

    return () => mm.revert()
  }, [])

  // Map of CSS span classes for the 12 items to create an asymmetric 6x4 grid
  const spanClasses = [
    'panel-span-3x2', // 0
    'panel-span-2x1', // 1
    'panel-span-1x2', // 2
    'panel-span-1x1', // 3
    'panel-span-1x1', // 4
    'panel-span-2x1', // 5
    'panel-span-1x2', // 6
    'panel-span-2x1', // 7
    'panel-span-1x1', // 8
    'panel-span-2x1', // 9
    'panel-span-2x1', // 10
    'panel-span-1x1', // 11
  ]

  // Indices to invert (white background, ink text)
  const invertedIndices = [1, 6, 10]

  return (
    <section className="services-comic-section">
      <div className="services-comic-container" ref={containerRef}>
        <div className="services-comic-grid">
          {displayServices.map((service, index) => {
            const spanClass = spanClasses[index] || 'panel-span-1x1'
            const isInverted = invertedIndices.includes(index)
            const numeral = String(index + 1).padStart(2, '0')

            return (
              <Link 
                href={`/services/${service.slug}`} 
                key={service.slug}
                className={`services-comic-panel ${spanClass} ${isInverted ? 'is-inverted' : ''}`}
              >
                <div className="services-comic-numeral">{numeral}</div>
                <div className="services-comic-content">
                  <h3 className="services-comic-title">{service.shortTitle || service.title}</h3>
                  <p className="services-comic-desc">{service.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      
      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: displayServices.map((service, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `https://silbarsecurity.in/services/${service.slug}`,
              name: service.title
            }))
          })
        }}
      />
    </section>
  )
}
