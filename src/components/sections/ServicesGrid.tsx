'use client'

import { useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'
import { ArrowRight, Shield, Eye, Users, Building2, Calendar, CreditCard, Flame, UserCheck, ClipboardCheck, Car, Award } from 'lucide-react'
import type { Service } from '@/data/services'

interface ServicesGridProps {
  services: Service[]
}

// Icon map — one Lucide icon per service slug
const SERVICE_ICONS: Record<string, React.ElementType> = {
  'manned-guarding': Shield,
  'industrial-security': Building2,
  'event-security': Calendar,
  'bank-atm-security': CreditCard,
  'electronic-surveillance': Eye,
  'risk-assessment': ClipboardCheck,
  'facility-management': Building2,
  'security-training': Award,
  'manpower-solutions': Users,
  'background-checks': UserCheck,
  'fire-life-safety': Flame,
  'mobile-patrol': Car,
}

const DEFAULT_ICON = Shield

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
          start: 'top 80%',
        },
      })

      const panels = containerRef.current!.querySelectorAll('.services-comic-panel')
      
      const evenPanels = Array.from(panels).filter((_, i) => i % 2 === 0)
      const oddPanels = Array.from(panels).filter((_, i) => i % 2 !== 0)

      tl.fromTo(
        evenPanels,
        { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 },
        { 
          clipPath: 'inset(0% 0% 0% 0%)', 
          opacity: 1,
          duration: 0.9, 
          stagger: 0.05, 
          ease: 'power3.out' 
        },
        0 // start at time 0
      )

      tl.fromTo(
        oddPanels,
        { clipPath: 'inset(0% 0% 0% 100%)', opacity: 0 },
        { 
          clipPath: 'inset(0% 0% 0% 0%)', 
          opacity: 1,
          duration: 0.9, 
          stagger: 0.05, 
          ease: 'power3.out' 
        },
        0 // start at time 0, parallel to even panels
      )
    })

    return () => mm.revert()
  }, [])

  // Asymmetric 4-column grid span classes for 12 services
  // Layout reads: [big 2x2] [1x1] [1x1] / [1x1] [1x1] [2x1] / [2x1] [1x1] [1x1] / [1x1] [1x1] [2x1]
  const spanClasses = [
    'panel-span-2x2', // 0 — hero panel (Manned Guarding)
    'panel-span-1x1', // 1
    'panel-span-1x1', // 2
    'panel-span-2x1', // 3
    'panel-span-1x1', // 4
    'panel-span-1x1', // 5
    'panel-span-2x1', // 6
    'panel-span-1x1', // 7
    'panel-span-1x1', // 8
    'panel-span-1x1', // 9
    'panel-span-1x1', // 10
    'panel-span-2x1', // 11
  ]

  // Indices to invert (cream/gold light background panels for visual rhythm)
  const invertedIndices = [2, 5, 9]

  return (
    <section className="services-comic-section">
      {/* Section header */}
      <div className="services-comic-header">
        <div className="services-comic-eyebrow">12 Security Verticals</div>
        <h2 className="services-comic-heading">
          WHAT WE{' '}
          <span className="outline">PROTECT.</span>
        </h2>
      </div>

      <div className="services-comic-container" ref={containerRef}>
        <div className="services-comic-grid">
          {displayServices.map((service, index) => {
            const spanClass = spanClasses[index] || 'panel-span-1x1'
            const isInverted = invertedIndices.includes(index)
            const numeral = String(index + 1).padStart(2, '0')
            const IconComponent = SERVICE_ICONS[service.slug] || DEFAULT_ICON

            return (
              <Link 
                href={`/services/${service.slug}`} 
                key={service.slug}
                className={`services-comic-panel ${spanClass} ${isInverted ? 'is-inverted' : ''}`}
              >
                {/* Ghost numeral */}
                <div className="services-comic-numeral">{numeral}</div>

                {/* Icon */}
                <div className="services-comic-icon">
                  <IconComponent size={18} strokeWidth={1.75} />
                </div>

                {/* Text content */}
                <div className="services-comic-content">
                  <h3 className="services-comic-title">{service.shortTitle || service.title}</h3>
                  <p className="services-comic-desc">{service.description}</p>
                  <span className="services-comic-arrow">
                    Learn more <ArrowRight size={12} />
                  </span>
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
