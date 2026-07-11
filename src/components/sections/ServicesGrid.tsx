'use client'

import { useRef } from 'react'
import Link from 'next/link'
import {
  UserCheck, Camera, ClipboardCheck, Building2, Flame,
  Users, Landmark, FileSearch, Car, GraduationCap, UsersRound, Factory,
  ArrowRight, ShieldHalf,
} from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
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
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  // Featured 5 — the primary cards in the horizontal row
  const featured = services.slice(0, 5)
  // Remaining services as tag pills
  const pills = services.slice(5)

  useGSAP(() => {
    if (!sectionRef.current || !cardsRef.current) return
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Header reveal
      const header = sectionRef.current!.querySelector('.services-dark-header')
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
          }
        )
      }

      // Cards — single stagger timeline
      const cards = cardsRef.current!.querySelectorAll('.services-dark-card')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' },
        }
      )

      // Pills row
      const pillsEl = sectionRef.current!.querySelector('.services-pills-row')
      if (pillsEl) {
        gsap.fromTo(
          pillsEl,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
            scrollTrigger: { trigger: pillsEl, start: 'top 85%' },
          }
        )
      }
    })

    return () => mm.revert()
  }, { scope: sectionRef })

  return (
    <section className="services-dark-section" ref={sectionRef} aria-labelledby="services-dark-heading">
      {/* Noise texture overlay */}
      <div className="services-dark-noise" aria-hidden="true" />

      <div className="services-dark-inner">
        {/* Header row: eyebrow + heading + view-all */}
        <div className="services-dark-header">
          <div className="services-dark-header__left">
            <span className="section-eyebrow section-eyebrow--light">OUR SERVICES</span>
            <h2 id="services-dark-heading" className="section-heading section-heading--on-dark">
              Comprehensive Security <em>Solutions</em><br />for Every Need.
            </h2>
          </div>
          <Link href="/services" className="services-dark-viewall" aria-label="View all security services">
            View All Services <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        {/* 5-card horizontal grid */}
        <div className="services-dark-cards" ref={cardsRef}>
          {featured.map((service) => {
            const Icon = ICON_MAP[service.icon] || ShieldHalf
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="services-dark-card"
                aria-label={service.title}
              >
                <span className="services-dark-card__icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <span className="services-dark-card__title">{service.shortTitle || service.title}</span>
                <span className="services-dark-card__desc">{service.description}</span>
                <span className="services-dark-card__arrow" aria-hidden="true">
                  <ArrowRight size={14} />
                </span>
              </Link>
            )
          })}
        </div>

        {/* Tag pills — secondary services */}
        {pills.length > 0 && (
          <div className="services-pills-row" aria-label="Additional services">
            {pills.map((service) => {
              const Icon = ICON_MAP[service.icon] || ShieldHalf
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="services-pill"
                >
                  <Icon size={12} strokeWidth={2} aria-hidden="true" />
                  {service.shortTitle || service.title}
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: services.map((service, index) => ({
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
