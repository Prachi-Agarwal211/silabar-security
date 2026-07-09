'use client'

import { useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'
import {
  UserCheck, Factory, Users, Landmark, Camera, ClipboardCheck,
  Building2, GraduationCap, UsersRound, FileSearch, Flame, Car, ShieldHalf,
} from 'lucide-react'
import { gsap } from '@/lib/gsap'
import type { Service } from '@/data/services'

const ICON_MAP: Record<string, React.ElementType> = {
  'user-check': UserCheck,
  factory: Factory,
  users: Users,
  landmark: Landmark,
  camera: Camera,
  'clipboard-check': ClipboardCheck,
  'building-2': Building2,
  'graduation-cap': GraduationCap,
  'users-round': UsersRound,
  'file-search': FileSearch,
  flame: Flame,
  car: Car,
}

interface ServicesGridProps {
  services: Service[]
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const displayServices = useMemo(() => services.slice(0, 12), [services])
  const leftColumn = displayServices.slice(0, 6)
  const rightColumn = displayServices.slice(6, 12)

  useEffect(() => {
    if (!sectionRef.current) return
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const items = sectionRef.current!.querySelectorAll('.services-split-item')
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
      tl.fromTo(
        items,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power3.out' }
      )
    })

    return () => mm.revert()
  }, [])

  const renderItem = (service: Service, index: number, side: 'left' | 'right') => {
    const Icon = ICON_MAP[service.icon] || ShieldHalf
    const numeral = String(index + 1).padStart(2, '0')
    return (
      <Link
        href={`/services/${service.slug}`}
        key={service.slug}
        className={`services-split-item services-split-item--${side}`}
      >
        <span className="services-split-item__icon">
          <Icon size={22} strokeWidth={1.75} />
        </span>
        <span className="services-split-item__body">
          <span className="services-split-item__number">{numeral}</span>
          <span className="services-split-item__title">{service.shortTitle || service.title}</span>
          <span className="services-split-item__desc">{service.description}</span>
        </span>
      </Link>
    )
  }

  return (
    <section className="services-split-section" ref={sectionRef}>
      <div className="services-split-corner services-split-corner--tl" aria-hidden="true" />
      <div className="services-split-corner services-split-corner--tr" aria-hidden="true" />
      <div className="services-split-corner services-split-corner--bl" aria-hidden="true" />

      <div className="services-split-grid">
        <div className="services-split-col services-split-col--left">
          {leftColumn.map((s, i) => renderItem(s, i, 'left'))}
        </div>

        <div className="services-split-badge" aria-hidden="true">
          <ShieldHalf size={40} strokeWidth={1.5} />
        </div>

        <div className="services-split-col services-split-col--right">
          {rightColumn.map((s, i) => renderItem(s, i + 6, 'right'))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: displayServices.map((service, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `https://www.silbarsecurity.in/services/${service.slug}`,
              name: service.title,
            })),
          }),
        }}
      />
    </section>
  )
}
