'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import {
  UserCheck, Camera, ClipboardCheck, Building2, Flame,
  Users, Landmark, FileSearch, Car, GraduationCap, UsersRound, Factory,
  ShieldHalf, ShoppingBag,
} from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import type { Service } from '@/data/services'

// ponytail: cursor-driven 3D tilt on hover cards; full PointerEvents polyfill not needed for modern browsers
function tiltOnHover(container: HTMLElement, selector: string) {
  const cards = container.querySelectorAll<HTMLElement>(selector)
  const onMove = (e: PointerEvent, card: HTMLElement) => {
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`
  }
  const onLeave = (card: HTMLElement) => {
    card.style.transform = ''
  }
  cards.forEach((card) => {
    card.addEventListener('pointermove', (e) => onMove(e, card))
    card.addEventListener('pointerleave', () => onLeave(card))
  })
  return () => cards.forEach((card) => {
    card.removeEventListener('pointermove', (e) => onMove(e, card))
    card.removeEventListener('pointerleave', () => onLeave(card))
  })
}

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
  'shopping-bag': ShoppingBag,
  'shield-half': ShieldHalf,
}

interface ServicesGridProps {
  services: Service[]
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const featured = services.slice(0, 5)
  const pills = services.slice(5)

  useEffect(() => {
    if (!cardsRef.current) return
    return tiltOnHover(cardsRef.current, '.sv-card')
  }, [])

  useGSAP(() => {
    if (!sectionRef.current || !cardsRef.current) return
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const header = sectionRef.current!.querySelector('.sv-section-header')
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

      const cards = cardsRef.current!.querySelectorAll('.sv-card')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )

      const pillsEl = sectionRef.current!.querySelector('.sv-pills')
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
    <section className="sv-section" ref={sectionRef} aria-labelledby="sv-heading">
      {/* Camera image — right side */}
      <div className="sv-bg-image" aria-hidden="true" />

      <div className="sv-inner">
        {/* Header */}
        <div className="sv-section-header">
          <span className="section-eyebrow section-eyebrow--red">OUR SERVICES</span>
          <h2 id="sv-heading" className="sv-heading">
            COMPREHENSIVE SECURITY <em>SOLUTIONS</em> FOR EVERY NEED.
          </h2>
          <p className="sv-subtitle">
            Delivering trusted, technology-driven, and professional security
            services tailored to protect what matters most.
          </p>
        </div>

        {/* 5 featured cards */}
        <div className="sv-cards" ref={cardsRef}>
          {featured.map((service) => {
            const Icon = ICON_MAP[service.icon] || ShieldHalf
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="sv-card"
                aria-label={service.title}
              >
                <div className="sv-card__icon">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="sv-card__title">{service.shortTitle || service.title}</h3>
                <p className="sv-card__desc">{service.description}</p>
              </Link>
            )
          })}
        </div>

        {/* Tag pills — all remaining services */}
        <div className="sv-pills" aria-label="All services">
          {pills.map((service) => {
            const Icon = ICON_MAP[service.icon] || ShieldHalf
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="sv-pill"
              >
                <Icon size={12} strokeWidth={2} aria-hidden="true" />
                {service.shortTitle || service.title}
              </Link>
            )
          })}
        </div>
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
