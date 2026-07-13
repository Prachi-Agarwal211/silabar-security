'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle,
  Factory,
  Heart,
  Landmark,
  Server,
  ShoppingBag,
  Hotel,
  Globe,
  GraduationCap,
  Shield,
  Award,
  Users,
} from 'lucide-react'



import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'

const ScrollExperience = dynamic(
  () => import('@/components/sections/ScrollExperience')
)

import { SERVICES } from '@/data/services'
const ServicesGrid = dynamic(() => import('@/components/sections/ServicesGrid'))
const QueryForm = dynamic(() => import('@/components/sections/QueryForm'))

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
      const testimonials = statsRef.current!.querySelectorAll('.testimonial-card')
      
      const tl = gsap.timeline({
        scrollTrigger: { trigger: statsRef.current, start: 'top 75%' }
      })

      tl.fromTo(
        cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      )
      
      tl.fromTo(
        testimonials,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
        '-=0.4' // overlap with the stat cards animation
      )
    })
    return () => mm.revert()
  }, { scope: statsRef })

  return (
    <main className="relative w-full" id="main-content">
      <ScrollExperience />
      <ServicesGrid services={SERVICES} />

      {/* ─── WHY SILBAR ────────────────────────────────── */}
      <section className="why-silbar-section" ref={whySilbarRef} aria-labelledby="why-silbar-title">
        {/* Background image */}
        <div className="why-silbar-bg" aria-hidden="true" />

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
            <div className="why-silbar-divider" aria-hidden="true" />
            <ul className="why-silbar-checklist" aria-label="Why choose Silbar">
              {WHY_SILBAR_POINTS.map((point) => (
                <li key={point} className="why-silbar-check-item">
                  <CheckCircle size={18} aria-hidden="true" className="why-silbar-check-icon" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="cta-pair" style={{ marginTop: '1.75rem' }}>
              <Link href="/about" className="btn-primary" style={{ background: 'white', color: '#0B0E14', borderColor: 'white' }}>
                Our Story <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn-secondary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}>
                Request Assessment
              </Link>
            </div>
          </div>

          {/* Right: mosaic cards */}
          <div className="why-silbar-mosaic" aria-hidden="true">
            {/* Tile A — EST. 2005 */}
            <div className="why-silbar-tile why-silbar-tile--a">
              <div className="why-silbar-tile__inner why-silbar-tile__inner--dark">
                <div className="why-silbar-tile__icon-wrap why-silbar-tile__icon-wrap--gold">
                  <Shield size={32} strokeWidth={1.5} />
                </div>
                <div className="why-silbar-tile__content">
                  <div className="why-silbar-tile__title">EST. 2005</div>
                  <div className="why-silbar-tile__subtitle">Two decades of trust<br />and commitment</div>
                </div>
              </div>
            </div>

            {/* Tile B — 200+ CITIES */}
            <div className="why-silbar-tile why-silbar-tile--b">
              <div className="why-silbar-tile__inner why-silbar-tile__inner--dark">
                <div className="why-silbar-tile__icon-wrap why-silbar-tile__icon-wrap--gold">
                  <Globe size={32} strokeWidth={1.5} />
                </div>
                <div className="why-silbar-tile__content">
                  <div className="why-silbar-tile__title">200+ CITIES</div>
                  <div className="why-silbar-tile__subtitle">PAN INDIA PRESENCE</div>
                </div>
              </div>
            </div>

            {/* Tile C — ISO 9001:2015 */}
            <div className="why-silbar-tile why-silbar-tile--c">
              <div className="why-silbar-tile__inner why-silbar-tile__inner--light">
                <div className="why-silbar-tile__icon-wrap why-silbar-tile__icon-wrap--cherry">
                  <Award size={28} strokeWidth={1.5} />
                </div>
                <div className="why-silbar-tile__content">
                  <div className="why-silbar-tile__title why-silbar-tile__title--dark">ISO 9001:2015</div>
                  <div className="why-silbar-tile__subtitle why-silbar-tile__subtitle--dark">CERTIFIED</div>
                  <div className="why-silbar-tile__desc">Quality processes.<br />Trusted standards.</div>
                </div>
              </div>
            </div>

            {/* Tile D — 7,000+ PROFESSIONALS */}
            <div className="why-silbar-tile why-silbar-tile--d">
              <div className="why-silbar-tile__inner why-silbar-tile__inner--light">
                <div className="why-silbar-tile__icon-wrap why-silbar-tile__icon-wrap--cherry">
                  <Users size={28} strokeWidth={1.5} />
                </div>
                <div className="why-silbar-tile__content">
                  <div className="why-silbar-tile__number">7,000+</div>
                  <div className="why-silbar-tile__subtitle why-silbar-tile__subtitle--dark">PROFESSIONALS</div>
                  <div className="why-silbar-tile__desc">Trained. Equipped.<br />Committed.</div>
                </div>
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

      {/* ─── INDUSTRIES WE PROTECT (REDESIGNED) ──────────────────────────── */}
      <section className="industries-protect-section" ref={industriesRef} aria-labelledby="industries-strip-title">
        <div className="industries-protect-inner">
          {/* Content Overlay */}
          <div className="industries-protect-content">
            <span className="section-eyebrow">INDUSTRIES WE PROTECT</span>
            <h2 id="industries-strip-title" className="section-heading">
              Securing What <em>Matters</em> Most.
            </h2>
            
            <div className="industries-list">
              <Link href="/industries" className="industry-pill active">All Industries</Link>
              {INDUSTRIES_ICONS.map(({ label }) => (
                <span key={label} className="industry-pill">{label}</span>
              ))}
            </div>

            <div className="client-logos-text">
              {CLIENT_LOGOS.join(' • ')}
            </div>

            <div className="google-reviews-compact">
              <div className="google-reviews-header">
                <span className="google-reviews-rating">4.8</span>
                <span className="google-reviews-stars">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="var(--color-gold)" stroke="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </span>
                <span className="google-reviews-count">on Google</span>
              </div>
              <p className="google-reviews-text">
                Trusted by <strong>500+</strong> businesses across India. Read what our clients say about us.
              </p>
              <a
                href="https://g.page/r/silbar-security/review"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ marginTop: '0.5rem', display: 'inline-flex' }}
              >
                Review Us on Google
              </a>
            </div>
          </div>
        </div>
      </section>

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

          {/* Testimonials */}
          <div className="testimonials-grid">
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
            <blockquote className="testimonial-card">
              <p className="testimonial-card__quote">
                &ldquo;We switched to Silbar Security for our 12 factories across Rajasthan.
                The reduction in security incidents has been remarkable — 90% fewer incidents in the first quarter.&rdquo;
              </p>
              <footer className="testimonial-card__attribution">
                <span className="testimonial-card__name">— VP Facilities</span>
                <span className="testimonial-card__company">Automobile Manufacturer</span>
              </footer>
            </blockquote>
            <blockquote className="testimonial-card">
              <p className="testimonial-card__quote">
                &ldquo;Their electronic surveillance integration with manned guarding gave us
                complete visibility across 45 retail locations. Truly pan-India capability.&rdquo;
              </p>
              <footer className="testimonial-card__attribution">
                <span className="testimonial-card__name">— Security Director</span>
                <span className="testimonial-card__company">National Retail Chain</span>
              </footer>
            </blockquote>
            <blockquote className="testimonial-card">
              <p className="testimonial-card__quote">
                &ldquo;The Quick Response Team arrived within 15 minutes of our distress call.
                Silbar&apos;s 24/7 monitoring is genuinely world-class.&rdquo;
              </p>
              <footer className="testimonial-card__attribution">
                <span className="testimonial-card__name">— Facility Manager</span>
                <span className="testimonial-card__company">IT Park, Bengaluru</span>
              </footer>
            </blockquote>
            <blockquote className="testimonial-card">
              <p className="testimonial-card__quote">
                &ldquo;From event security for our 10,000-strong conference to daily office guarding,
                Silbar handles it all with ISO-certified processes. Highly recommended.&rdquo;
              </p>
              <footer className="testimonial-card__attribution">
                <span className="testimonial-card__name">— CEO</span>
                <span className="testimonial-card__company">Corporate Events Company</span>
              </footer>
            </blockquote>
            <blockquote className="testimonial-card">
              <p className="testimonial-card__quote">
                &ldquo;Their facility management team manages housekeeping, security, and maintenance
                for our hospital chain. Single vendor, zero compliance headaches.&rdquo;
              </p>
              <footer className="testimonial-card__attribution">
                <span className="testimonial-card__name">— Admin Director</span>
                <span className="testimonial-card__company">Multi-Specialty Hospital Chain</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ─── QUERY FORM ────────────────────────────────── */}
      <section className="home-query-section page-lead-section" style={{ padding: '4rem 1.5rem' }}>
        <QueryForm
          title="Get a Free Security Quote"
          subtitle="Tell us about your facility — we respond within 2 business hours."
        />
      </section>
    </main>
  )
}
