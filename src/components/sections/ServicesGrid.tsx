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

const CATEGORY_MAP: Record<string, string> = {
  'manned-guarding': 'Manned Guarding',
  'industrial-security': 'Industry-Specific',
  'event-security': 'Specialized & VIP Protection',
  'corporate-security': 'Manned Guarding',
  'cctv-surveillance-support': 'Electronic & Tech Security',
  'hospital-security': 'Industry-Specific',
  'hotel-security': 'Industry-Specific',
  'educational-security': 'Industry-Specific',
  'lady-security-guards': 'Manned Guarding',
  'bank-atm-security': 'Industry-Specific',
  'vip-close-protection': 'Specialized & VIP Protection',
  'fire-life-safety': 'Compliance & Training',
  'facility-management': 'Manned Guarding',
  'escort-security-guards': 'Specialized & VIP Protection',
  'residential-society-security': 'Manned Guarding',
  'warehouse-logistics-security': 'Industry-Specific',
  'retail-mall-security': 'Industry-Specific',
  'construction-site-security': 'Industry-Specific',
  'data-centre-security': 'Electronic & Tech Security',
  'bpo-it-security': 'Electronic & Tech Security',
  'cash-in-transit-security': 'Specialized & VIP Protection',
  'maritime-port-security': 'Industry-Specific',
  'solar-power-plant-security': 'Industry-Specific',
  'mining-infrastructure-security': 'Industry-Specific',
  'supermarket-hypermarket-security': 'Industry-Specific',
  'religious-place-event-security': 'Specialized & VIP Protection',
  'toll-plaza-highway-security': 'Industry-Specific',
  'parking-traffic-management': 'Manned Guarding',
  'dog-squad-k9': 'Specialized & VIP Protection',
  'cyber-security-advisory': 'Electronic & Tech Security',
  'security-audit-risk-assessment': 'Compliance & Training',
  'disaster-emergency-response': 'Compliance & Training',
  'estate-farmhouse-security': 'Manned Guarding',
  'psara-compliance-consulting': 'Compliance & Training',
  'security-training-academy': 'Compliance & Training',
}

const CATEGORIES = [
  'Manned Guarding',
  'Electronic & Tech Security',
  'Industry-Specific',
  'Specialized & VIP Protection',
  'Compliance & Training',
]

interface ServicesGridProps {
  services: Service[]
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const featured = services.slice(0, 5)
  const remaining = services.slice(5)

  const grouped = CATEGORIES.map((cat) => ({
    name: cat,
    items: remaining.filter(
      (s) => (s.category || CATEGORY_MAP[s.slug] || 'Manned Guarding') === cat
    ),
  })).filter((cat) => cat.items.length > 0)

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
          <h2 id="sv-heading" className="sv-heading">
            SECURITY <em>SOLUTIONS</em> FOR EVERY NEED.
          </h2>
          <p className="sv-subtitle">
            Delivering professional, technology-driven security
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

        {/* Categorized service accordions */}
        <div className="sv-categories-accordion-wrap" aria-label="Services by Category">
          {grouped.map((group, idx) => (
            <details
              key={group.name}
              className="sv-category-accordion"
              open={idx === 0}
            >
              <summary className="sv-category-summary">
                <span>{group.name}</span>
                <small style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                  {group.items.length} {group.items.length === 1 ? 'service' : 'services'}
                </small>
              </summary>
              <div className="sv-category-pills">
                {group.items.map((service) => {
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
            </details>
          ))}
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
