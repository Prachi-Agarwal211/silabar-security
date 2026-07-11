'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  CheckCircle,
  Factory,
  Heart,
  Landmark,
  Server,
  ShoppingBag,
  Hotel,
  Globe,
  GraduationCap,
} from 'lucide-react'



import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'

const ScrollExperience = dynamic(
  () => import('@/components/sections/ScrollExperience')
)

import { SERVICES } from '@/data/services'
import { CONTACT } from '@/lib/config'
const ServicesGrid = dynamic(() => import('@/components/sections/ServicesGrid'))
const QueryForm = dynamic(() => import('@/components/sections/QueryForm'))

// WhatsApp icon inline SVG
function WhatsAppIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  )
}

const WHY_SILBAR_POINTS = [
  'Trained & Verified Manpower — background-checked, uniformed, ISO-audited guards',
  'Advanced Technology — CCTV integration, access control, real-time monitoring',
  'Process-Driven Approach — monthly MIS, compliance reporting, account manager',
  'Pan India Presence — 200+ cities, rapid deployment, 24-hour replacement',
]

const INDUSTRIES_ICONS = [
  { icon: Factory, label: 'Manufacturing' },
  { icon: Heart, label: 'Healthcare' },
  { icon: Landmark, label: 'Banking & Finance' },
  { icon: Server, label: 'IT & Tech Parks' },
  { icon: ShoppingBag, label: 'Retail & Malls' },
  { icon: GraduationCap, label: 'Education' },
  { icon: Hotel, label: 'Hospitality' },
  { icon: Globe, label: 'Government' },
]

const CLIENT_LOGOS = ['Reliance', 'TATA', 'HDFC Bank', 'Infosys', 'Adani', 'DLF']

const STATS = [
  { value: '22+', label: 'Years of Excellence', sub: 'Since 2005' },
  { value: '7,000+', label: 'Security Professionals', sub: 'Licensed & trained' },
  { value: '200+', label: 'Cities Covered', sub: 'Pan India network' },
  { value: '1M+', label: 'Lives Protected Daily', sub: 'Across all sectors' },
]

export default function HomePageClient() {
  const whySilbarRef = useRef<HTMLElement>(null)
  const industriesRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLElement>(null)

  // Why Silbar — photo mosaic stagger + copy reveal
  useGSAP(() => {
    if (!whySilbarRef.current) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const copy = whySilbarRef.current!.querySelector('.why-silbar-copy')
      const tiles = whySilbarRef.current!.querySelectorAll('.why-silbar-tile')
      const tl = gsap.timeline({
        scrollTrigger: { trigger: whySilbarRef.current, start: 'top 65%' },
      })
      tl.fromTo(copy, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
        .fromTo(
          tiles,
          { opacity: 0, scale: 0.92, rotate: 0 },
          { opacity: 1, scale: 1, duration: 0.65, stagger: 0.1, ease: 'back.out(1.2)' },
          '-=0.5'
        )
    })
    return () => mm.revert()
  }, { scope: whySilbarRef })

  // Industries strip — icon stagger
  useGSAP(() => {
    if (!industriesRef.current) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const items = industriesRef.current!.querySelectorAll('.industry-icon-item')
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out',
          scrollTrigger: { trigger: industriesRef.current, start: 'top 75%' },
        }
      )
    })
    return () => mm.revert()
  }, { scope: industriesRef })

  // Stats — counter-style reveal
  useGSAP(() => {
    if (!statsRef.current) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cards = statsRef.current!.querySelectorAll('.stat-card')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 75%' },
        }
      )
    })
    return () => mm.revert()
  }, { scope: statsRef })

  return (
    <main className="relative w-full" id="main-content">
      <ScrollExperience />
      <ServicesGrid services={SERVICES} />

      {/* ─── WHY SILBAR ────────────────────────────────── */}
      <section className="why-silbar-section section-transition-diagonal" ref={whySilbarRef} aria-labelledby="why-silbar-title">
        <div className="why-silbar-inner">
          {/* Left: copy */}
          <div className="why-silbar-copy">
            <span className="section-eyebrow section-eyebrow--light">WHY SILBAR</span>
            <h2 id="why-silbar-title" className="section-heading section-heading--on-dark" style={{ marginBottom: '1.25rem' }}>
              Protection is our <em>Promise.</em><br />Integrity is our Foundation.
            </h2>
            <p className="why-silbar-body">
              For over two decades, Silbar Security has been the trusted partner for enterprises,
              institutions, and communities across India. We combine people, process, and technology
              to deliver unmatched protection.
            </p>
            <ul className="why-silbar-checklist" aria-label="Why choose Silbar">
              {WHY_SILBAR_POINTS.map((point) => (
                <li key={point} className="why-silbar-check-item">
                  <CheckCircle size={18} aria-hidden="true" className="why-silbar-check-icon" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="cta-pair" style={{ marginTop: '1.75rem' }}>
              <Link href="/about" className="btn-primary">
                Our Story <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Request Assessment
              </Link>
            </div>
          </div>

          {/* Right: asymmetric photo mosaic */}
          <div className="why-silbar-mosaic" aria-hidden="true">
            <div className="why-silbar-tile why-silbar-tile--a">
              <div className="why-silbar-tile__inner" style={{
                background: 'linear-gradient(135deg, #1a0a0d 0%, #3d0f1a 100%)'
              }}>
                <div className="why-silbar-tile__label">Est. 2005</div>
              </div>
            </div>
            <div className="why-silbar-tile why-silbar-tile--b">
              <div className="why-silbar-tile__inner" style={{
                background: 'linear-gradient(135deg, #0a0a12 0%, #141420 100%)'
              }}>
                <div className="why-silbar-tile__icon">
                  <Building2 size={28} color="rgba(212,175,55,0.6)" />
                </div>
                <div className="why-silbar-tile__label">200+ Cities</div>
              </div>
            </div>
            <div className="why-silbar-tile why-silbar-tile--c">
              <div className="why-silbar-tile__inner" style={{
                background: 'linear-gradient(135deg, #8C1F32 0%, #5C1220 100%)'
              }}>
                <div className="why-silbar-tile__badge">ISO 9001:2015</div>
              </div>
            </div>
            <div className="why-silbar-tile why-silbar-tile--d">
              <div className="why-silbar-tile__inner" style={{
                background: 'linear-gradient(135deg, #14100D 0%, #291e15 100%)'
              }}>
                <div className="why-silbar-tile__number">7,000+</div>
                <div className="why-silbar-tile__label">Professionals</div>
              </div>
            </div>
            {/* Trusted since badge */}
            <div className="why-silbar-trusted-badge" aria-hidden="true">
              <span className="why-silbar-trusted-text">TRUSTED<br />SINCE<br />2005</span>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* ─── INDUSTRIES STRIP ──────────────────────────── */}
      <section className="industries-strip section-transition-diagonal" ref={industriesRef} aria-labelledby="industries-strip-title">
        <div className="industries-strip-inner">
          <div className="industries-strip-header">
            <span className="section-eyebrow section-eyebrow--light">INDUSTRIES WE PROTECT</span>
            <h2 id="industries-strip-title" className="section-heading section-heading--on-dark">
              Securing What <em>Matters</em> Most.
            </h2>
            <Link href="/industries" className="industries-strip-viewall">
              All Industries <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>

          <div className="industry-icon-grid" role="list">
            {INDUSTRIES_ICONS.map(({ icon: Icon, label }) => (
              <div key={label} className="industry-icon-item" role="listitem">
                <div className="industry-icon-item__circle" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.6} />
                </div>
                <span className="industry-icon-item__label">{label}</span>
              </div>
            ))}
          </div>

          {/* Client logos row */}
          <div className="client-logos" aria-label="Clients include">
            {CLIENT_LOGOS.map((name) => (
              <span key={name} className="client-logo-name">{name}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* ─── STATS + TESTIMONIAL ───────────────────────── */}
      <section className="stats-testimonial-section section-transition-diagonal" ref={statsRef} aria-labelledby="stats-section-title">
        <div className="stats-testimonial-inner">
          <div className="stats-testimonial-header">
            <span className="section-eyebrow section-eyebrow--light">OUR COMMITMENT IN NUMBERS</span>
            <h2 id="stats-section-title" className="section-heading section-heading--on-dark">
              Explore <em>More</em>
              <Link href="/about" className="stats-explore-link">
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </h2>
          </div>

          <div className="stats-cards-row">
            {STATS.map(({ value, label, sub }) => (
              <div key={label} className="stat-card" aria-label={`${value} ${label}`}>
                <div className="stat-card__value">{value}</div>
                <div className="stat-card__label">{label}</div>
                <div className="stat-card__sub">{sub}</div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <blockquote className="testimonial-card">
            <p className="testimonial-card__quote">
              &ldquo;Silbar&apos;s professionalism, transparency and response times are unmatched.
              A partner we rely on, every day.&rdquo;
            </p>
            <footer className="testimonial-card__attribution">
              <span className="testimonial-card__name">— Operations Head</span>
              <span className="testimonial-card__company">Leading Manufacturing Firm</span>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ─── QUERY FORM ────────────────────────────────── */}
      <section className="home-query-section" style={{ padding: '4rem 1.5rem' }}>
        <QueryForm />
      </section>

      {/* ─── STICKY CTAs ───────────────────────────────── */}
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
