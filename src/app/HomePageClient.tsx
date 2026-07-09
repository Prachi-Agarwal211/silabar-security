'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  ClipboardCheck,
  MapPin,
  Radio,
  ShieldCheck,
} from 'lucide-react'

import { initLenis, destroyLenis } from '@/lib/lenis'

const ScrollExperience = dynamic(
  () => import('@/components/sections/ScrollExperience')
)

import { SERVICES } from '@/data/services'
import { CONTACT } from '@/lib/config'
import ServicesGrid from '@/components/sections/ServicesGrid'
import ScrollReveal from '@/components/animations/ScrollReveal'

const COMMAND_SIGNALS = [
  {
    icon: ShieldCheck,
    label: 'PSARA guard force',
    value: '7,000+',
    text: 'Licensed officers, supervisors, lady guards, armed guards, and response teams for regulated deployments.',
  },
  {
    icon: MapPin,
    label: 'City coverage',
    value: '200+',
    text: 'Rapid deployment across Rajasthan, Delhi NCR, Gujarat, Maharashtra, Karnataka, and high-growth corridors.',
  },
  {
    icon: ClipboardCheck,
    label: 'Compliance stack',
    value: 'ISO + ESI/PF',
    text: 'Training records, statutory files, attendance, replacement, and monthly MIS managed through one agency.',
  },
]

const COVERAGE_POINTS = [
  'Jaipur HQ',
  'Delhi NCR',
  'Ahmedabad',
  'Mumbai',
  'Bengaluru',
  'PAN India',
]

// WhatsApp icon inline SVG (no extra package dependency)
function WhatsAppIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  )
}

export default function HomePageClient() {
  useEffect(() => {
    initLenis()
    return () => destroyLenis()
  }, [])

  return (
    <main className="relative w-full" id="main-content">
      <ScrollExperience />
      <ServicesGrid services={SERVICES} />

      <section className="home-command-section" aria-labelledby="home-command-title">
        <div className="home-command-grid">
          <ScrollReveal className="home-command-copy">
            <span className="home-section-kicker">Operations command</span>
            <h2 id="home-command-title" className="home-section-title">
              Security that moves before risk does.
            </h2>
            <p className="home-section-copy">
              Silbar combines trained manpower, field supervision, electronic surveillance,
              fire life safety, and compliance reporting into one operating system for
              factories, hospitals, hotels, banks, residential societies, and enterprise sites.
            </p>
            <div className="home-command-actions">
              <Link href="/services" className="home-command-link">
                Explore services <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link href="/contact" className="home-command-link home-command-link--muted">
                Request assessment
              </Link>
            </div>
          </ScrollReveal>

          <div className="home-command-panels">
            {COMMAND_SIGNALS.map(({ icon: Icon, label, value, text }, index) => (
              <ScrollReveal key={label} delay={index * 0.08} className="home-command-card glass-card">
                <span className="home-command-card__icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.7} />
                </span>
                <span className="home-command-card__label">{label}</span>
                <strong className="home-command-card__value">{value}</strong>
                <span className="home-command-card__text">{text}</span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home-coverage-section" aria-labelledby="home-coverage-title">
        <div className="home-coverage-map" aria-hidden="true">
          <span className="home-coverage-map__scan" />
          {COVERAGE_POINTS.map((point, index) => (
            <span
              key={point}
              className={`home-coverage-pin home-coverage-pin--${index + 1}`}
            />
          ))}
        </div>
        <ScrollReveal className="home-coverage-copy glass-panel" style={{ padding: '2rem' }}>
          <span className="home-section-kicker">Local SEO, real operations</span>
          <h2 id="home-coverage-title" className="home-section-title">
            Built for city-specific security demand.
          </h2>
          <p className="home-section-copy">
            Local buyers search by city, service, and urgency. The site supports
            state and city landing pages while the business promise stays consistent:
            PSARA-licensed guards, verified manpower, fast replacement, and clean
            documentation.
          </p>
          <div className="home-coverage-tags">
            {COVERAGE_POINTS.map((point) => (
              <span key={point}>
                <Building2 size={13} aria-hidden="true" />
                {point}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section className="home-response-strip" aria-label="Security response process">
        {['Assess', 'Deploy', 'Monitor', 'Report'].map((step, index) => (
          <ScrollReveal key={step} delay={index * 0.06} className="home-response-step">
            <Radio size={16} aria-hidden="true" />
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{step}</strong>
          </ScrollReveal>
        ))}
      </section>

      {/* Sticky CTAs — WhatsApp + Call */}
      <div className="sticky-cta" aria-label="Quick contact options">
        <a
          href={`tel:${CONTACT.phoneRaw}`}
          className="sticky-cta__call"
          id="sticky-call-btn"
        >
          Call Now
        </a>
        <a
          href={CONTACT.whatsapp.url}
          className="sticky-cta__whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          id="sticky-whatsapp-btn"
        >
          <WhatsAppIcon />
        </a>
      </div>
    </main>
  )
}
