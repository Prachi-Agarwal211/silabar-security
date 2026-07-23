'use client'

import { useRef, useState } from 'react'
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
  ClipboardCheck,
  FileSearch,
  Building2,
  Headphones,
} from 'lucide-react'
import { FAQS } from '@/data/faq'
import { HOME_TESTIMONIALS } from '@/data/reviews'
import { CONTACT, GOOGLE_REVIEWS } from '@/lib/config'
import GoogleReviews from '@/components/sections/GoogleReviews'



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
  'PSARA Licensed Across 19 States — full statutory compliance on every deployment',
  '4 ISO Certifications (IAF Accredited) — 9001, 14001, 45001, 27001',
  'Pan India Presence — 200+ cities across 19 states, rapid deployment, 24-hour replacement',
]

const PROCESS_STEPS = [
  { number: '01', icon: ClipboardCheck, title: 'Free Security Assessment', desc: 'We analyze your facility, identify vulnerabilities, and understand your specific security concerns — no obligation.' },
  { number: '02', icon: FileSearch, title: 'Custom Security Plan', desc: 'Tailored solution with transparent pricing. Manned guarding, remote monitoring, or integrated — whatever fits.' },
  { number: '03', icon: Building2, title: 'Rapid Deployment', desc: 'Vetted, trained professionals deployed within 48 hours using documented SOPs and ISO-audited processes.' },
  { number: '04', icon: Headphones, title: '24/7 Account Support', desc: 'Dedicated account manager, monthly MIS, real-time incident reporting, and 24-hour replacement guarantee.' },
]

const CERTIFICATIONS_DATA = [
  { title: 'ISO 9001:2015', sub: 'Quality Management', icon: Award },
  { title: 'ISO 14001:2015', sub: 'Environmental Management', icon: Shield },
  { title: 'ISO 45001:2018', sub: 'Health & Safety', icon: Shield },
  { title: 'ISO/IEC 27001:2022', sub: 'Information Security', icon: Shield },
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

const CLIENT_LOGOS = ['Manufacturing', 'Healthcare', 'Banking & Finance', 'IT & Tech Parks', 'Retail & Malls', 'Government']

const STATS = [
  { value: '8+', label: 'Years of Excellence', sub: 'Since 2018' },
  { value: '7,000+', label: 'Security Professionals', sub: 'Licensed & trained' },
  { value: '200+', label: 'Cities Covered', sub: '19 states across India' },
  { value: '19', label: 'PSARA Licensed States', sub: 'With 4 ISO certifications' },
]

export default function HomePageClient() {
  const whySilbarRef = useRef<HTMLElement>(null)
  const industriesRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeDot, setActiveDot] = useState(0)

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
      const testimonialItems = statsRef.current!.querySelectorAll('.testimonial-card')
      
      const tl = gsap.timeline({
        scrollTrigger: { trigger: statsRef.current, start: 'top 75%' }
      })

      tl.fromTo(
        cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      )
      
      tl.fromTo(
        testimonialItems,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
        '-=0.4'
      )
    })
    return () => mm.revert()
  }, { scope: statsRef })

  return (
    <main className="relative w-full" id="main-content">
      <ScrollExperience />
      <ServicesGrid services={SERVICES} />

      {/* ─── HOW WE WORK (Process) ────────────────────── */}
      <section className="process-section brand-rail" aria-labelledby="process-title">
        <div className="shell">
          <span className="section-eyebrow">HOW WE WORK</span>
          <h2 id="process-title" className="section-heading">
            Simple Process. <em>Trusted</em> Protection.
          </h2>
          <p className="section-subtitle">
            From assessment to deployment — a transparent, step-by-step approach that puts your safety first.
          </p>
          <div className="process-grid">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.number} className={`process-step hover-lift${i < PROCESS_STEPS.length - 1 ? ' process-step--arrow' : ''}`}>
                <div className="process-step__header">
                  <div className="process-step__number">{step.number}</div>
                  <div className="process-step__icon">
                    <step.icon size={20} strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="process-step__title">{step.title}</h3>
                <p className="process-step__desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand claim strip — unique pattern between services & why */}
      <section className="brand-band section-pad--tight" aria-label="Brand promise">
        <div className="brand-band__inner shell brand-split">
          <div>
            <span className="section-eyebrow section-eyebrow--light">SILBAR PROMISE</span>
            <h2 className="section-heading section-heading--on-dark heading-mb-sm">
              Security You Can <em className="brand-shimmer-text">Measure.</em>
            </h2>
            <p className="brand-claim-text">
              Trained manpower. Documented SOPs. Statutory-aware commercials. Account ownership.
              Built for factories, campuses, hospitals, and multi-city brands across India.
            </p>
          </div>
          <div className="brand-seals-row">
            <div className="brand-seal motion-glow">ISO<br />9001<br />2015</div>
            <div className="brand-seal">EST<br />2018</div>
            <div className="brand-seal">19<br />STATES</div>
          </div>
        </div>
      </section>

      {/* ─── WHY SILBAR ────────────────────────────────── */}
      <section className="why-silbar-section brand-rail" ref={whySilbarRef} aria-labelledby="why-silbar-title">
        <div className="why-silbar-bg" aria-hidden="true" />

        <div className="why-silbar-inner">
          <div className="why-silbar-copy">
            <span className="section-eyebrow section-eyebrow--light">WHY SILBAR</span>
            <h2 id="why-silbar-title" className="section-heading section-heading--on-dark heading-mb-lg">
              Protection is our <em>Promise.</em><br />Integrity is our Foundation.
            </h2>
            <p className="why-silbar-body">
               Since 2018, Silbar Security Services Pvt. Ltd. has grown into a trusted PAN India security partner for enterprises,
              institutions, and communities across India. With PSARA licenses in 19 states, 4 ISO certifications,
              and a team of 7,000+ trained professionals, we combine compliance, people, and technology
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
            <div className="cta-pair cta-pair--on-dark">
              <Link href="/about" className="btn-primary btn-primary--white">
                Our Story <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn-secondary btn-secondary--on-dark">
                Request Assessment
              </Link>
            </div>
          </div>

          <div className="why-silbar-mosaic" aria-hidden="true">
            <div className="why-silbar-tile why-silbar-tile--a">
              <div className="why-silbar-tile__inner why-silbar-tile__inner--dark">
                <div className="why-silbar-tile__icon-wrap why-silbar-tile__icon-wrap--gold">
                  <Shield size={32} strokeWidth={1.5} />
                </div>
                <div className="why-silbar-tile__content">
                  <div className="why-silbar-tile__title">EST. 2018</div>
                  <div className="why-silbar-tile__subtitle">Building trust since<br />2018</div>
                </div>
              </div>
            </div>

            <div className="why-silbar-tile why-silbar-tile--b">
              <div className="why-silbar-tile__inner why-silbar-tile__inner--dark">
                <div className="why-silbar-tile__icon-wrap why-silbar-tile__icon-wrap--gold">
                  <Globe size={32} strokeWidth={1.5} />
                </div>
                <div className="why-silbar-tile__content">
                  <div className="why-silbar-tile__title">19 STATES</div>
                  <div className="why-silbar-tile__subtitle">PSARA LICENSED<br />200+ CITIES</div>
                </div>
              </div>
            </div>

            <div className="why-silbar-tile why-silbar-tile--c">
              <div className="why-silbar-tile__inner why-silbar-tile__inner--light">
                <div className="why-silbar-tile__icon-wrap why-silbar-tile__icon-wrap--cherry">
                  <Award size={28} strokeWidth={1.5} />
                </div>
                <div className="why-silbar-tile__content">
                  <div className="why-silbar-tile__title why-silbar-tile__title--dark">4 ISO CERTIFIED</div>
                  <div className="why-silbar-tile__subtitle why-silbar-tile__subtitle--dark">IAF ACCREDITED</div>
                  <div className="why-silbar-tile__desc">9001 · 14001 · 45001 · 27001<br />Quality. Safety. Security.</div>
                </div>
              </div>
            </div>

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

            <div className="why-silbar-trusted-badge" aria-hidden="true">
              <span className="why-silbar-trusted-text">TRUSTED<br />SINCE<br />2018</span>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* ─── INDUSTRIES WE PROTECT ──────────────────────── */}
      <section className="industries-protect-section" ref={industriesRef} aria-labelledby="industries-strip-title">
        <div className="industries-protect-inner">
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
                <span className="google-reviews-rating">{GOOGLE_REVIEWS.rating}</span>
                <span className="google-reviews-stars" aria-label={`${GOOGLE_REVIEWS.rating} out of 5`}>
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="var(--color-gold)" stroke="none" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </span>
                <span className="google-reviews-count">{GOOGLE_REVIEWS.reviewCount} on Google</span>
              </div>
              <p className="google-reviews-text">
                Trusted by <strong>{GOOGLE_REVIEWS.businessesServed}</strong> businesses across India.
                Silbar Security Services Pvt. Ltd. — ISO certified · PSARA licensed.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <a
                  href={GOOGLE_REVIEWS.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary review-btn"
                >
                  View on Google
                </a>
                <a
                  href={GOOGLE_REVIEWS.writeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary review-btn"
                >
                  Review Us on Google
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATIONS SHOWCASE ───────────────────── */}
      <section className="certs-showcase brand-rail" aria-labelledby="certs-title">
        <div className="shell">
          <span className="section-eyebrow section-eyebrow--light">CERTIFIED EXCELLENCE</span>
          <h2 id="certs-title" className="section-heading section-heading--on-dark">
            ISO Certified. <em>IAF Accredited.</em>
          </h2>
          <p className="section-subtitle section-subtitle--light">
            Our certifications reflect our commitment to quality, safety, environment, and information security — 
            independently verified by IAF-accredited bodies.
          </p>
          <div className="certs-showcase__grid">
            {CERTIFICATIONS_DATA.map((cert) => (
              <div key={cert.title} className="cert-badge hover-lift">
                <div className="cert-badge__icon cert-badge__icon--gold">
                  <cert.icon size={24} strokeWidth={1.5} />
                </div>
                <div className="cert-badge__title">{cert.title}</div>
                <div className="cert-badge__sub">{cert.sub}</div>
              </div>
            ))}
          </div>
          <div className="certs-showcase__cta">
            <Link href="/certification" className="btn-primary btn-primary--on-dark">
              View All Certifications <ArrowRight size={14} />
            </Link>
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

          {/* Testimonials carousel */}
          <div
            className="testimonials-carousel"
            ref={carouselRef}
            onScroll={(e) => {
              const el = e.currentTarget
              const idx = Math.round(el.scrollLeft / (el.children[0] as HTMLElement).offsetWidth)
              if (idx !== activeDot) setActiveDot(Math.min(idx, HOME_TESTIMONIALS.length - 1))
            }}
          >
            {HOME_TESTIMONIALS.map((t, i) => (
              <blockquote key={i} className="testimonial-card">
                <p className="testimonial-card__quote">&ldquo;{t.quote}&rdquo;</p>
                <footer className="testimonial-card__attribution">
                  <span className="testimonial-card__name">— {t.name}</span>
                  <span className="testimonial-card__company">{t.company}{t.city ? ` · ${t.city}` : ''}</span>
                </footer>
              </blockquote>
            ))}
          </div>
          <div className="testimonials-dots" role="group" aria-label="Testimonial navigation">
            {HOME_TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`testimonials-dot${i === activeDot ? ' active' : ''}`}
                onClick={() => {
                  const el = carouselRef.current
                  if (!el) return
                  const card = el.children[0] as HTMLElement
                  el.scrollTo({ left: card.offsetWidth * i, behavior: 'smooth' })
                  setActiveDot(i)
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────── */}
      <section className="section-pad brand-rail" aria-labelledby="home-faq-title">
        <div className="shell">
          <span className="section-eyebrow">FAQ</span>
          <h2 id="home-faq-title" className="section-heading" style={{ marginBottom: '0.75rem' }}>
            Frequently Asked <em>Questions.</em>
          </h2>
          <p className="section-subtitle" style={{ marginBottom: '2.5rem' }}>
            Quick answers about our security services, coverage, and compliance standards.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '800px' }}>
            {FAQS.filter(f => f.category === 'General').slice(0, 6).map((faq) => (
              <details key={faq.q} className="service-detail-faq-item">
                <summary className="service-detail-faq-q">{faq.q}</summary>
                <p className="service-detail-faq-a">{faq.a}</p>
              </details>
            ))}
          </div>
          <div style={{ marginTop: '2rem' }}>
            <Link href="/faq" className="btn-secondary">
              View All {FAQS.length} FAQs <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── GOOGLE REVIEWS / SOCIAL PROOF ───────────────── */}
      <GoogleReviews variant="full" />

      {/* ─── QUERY FORM ────────────────────────────────── */}
      <section className="home-query-section page-lead-section" aria-label="Request a security quote">
        <div className="lead-social-proof" aria-label="Google reviews summary">
          <span className="lead-social-proof__rating">★ {GOOGLE_REVIEWS.ratingLabel}</span>
          <p className="lead-social-proof__text">
            {GOOGLE_REVIEWS.reviewCount} Google reviews · Trusted by {GOOGLE_REVIEWS.businessesServed} businesses · Silbar Security Services Pvt. Ltd.
          </p>
          <a href={GOOGLE_REVIEWS.profileUrl} target="_blank" rel="noopener noreferrer" className="lead-social-proof__link">
            View Google Profile →
          </a>
        </div>
        <QueryForm
          title="Get a Free Security Quote"
          subtitle="Tell us about your facility — submit opens WhatsApp with your details so we can reply instantly."
          formType="Homepage Quote"
        />
        <p className="google-reviews-contact-note" style={{ textAlign: 'center', marginTop: '1rem' }}>
          Submits via WhatsApp to {CONTACT.phone} · Or call: <a href={`tel:${CONTACT.phoneRaw}`}>{CONTACT.phone}</a>
        </p>
      </section>
    </main>
  )
}
