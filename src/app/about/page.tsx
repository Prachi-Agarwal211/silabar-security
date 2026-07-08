import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Award, CheckCircle, Phone } from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import Counter from '@/components/animations/Counter'
import SplitTextReveal from '@/components/animations/SplitTextReveal'

export const metadata: Metadata = {
  title: 'About Silbar Security — Founded by Law Enforcement',
  description:
    'Silbar Security Services was founded by law enforcement professionals. ISO 9001:2015 & PSARA-2005 certified. 7,000+ licensed officers across PAN India.',
  alternates: { canonical: 'https://www.silbarsecurity.in/about' },
}

const STATS = [
  { number: '7,000+', label: 'Licensed Security Officers' },
  { number: '200+', label: 'Cities Served' },
  { number: '15+', label: 'Years of Experience' },
  { number: '500+', label: 'Enterprise Clients' },
]

const CERTIFICATIONS = [
  { name: 'PSARA 2005', desc: 'Licensed under Private Security Agencies Regulation Act across multiple states' },
  { name: 'ISO 9001:2015', desc: 'Quality Management System certified for security service delivery' },
  { name: 'MSME Registered', desc: 'Registered with Ministry of Micro, Small & Medium Enterprises' },
  { name: 'GST Compliant', desc: 'Fully GST registered and compliant for all service invoicing' },
]

const WHY_SILBAR = [
  'Founded by retired law enforcement and defence professionals',
  'PSARA licensed across multiple Indian states',
  'ISO 9001:2015 certified quality management',
  'Full statutory compliance — ESI, PF, Gratuity, Minimum Wages',
  '24-hour guard replacement guarantee',
  'Dedicated account manager for every client',
  'Monthly performance and compliance reports',
  'PAN India deployment capability with local expertise',
]

export default function AboutPage() {
  return (
    <main className="about-page" id="main-content">

      <section className="about-hero">
        <ScrollReveal className="about-hero__inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">About</span>
          </nav>
          <span className="page-eyebrow">ABOUT US</span>
          <h1 className="about-title">
            <SplitTextReveal text="NOT JUST SECURITY." />
            <br />
            <span className="about-title--outline">
              <SplitTextReveal text="A COMMITMENT." delay={0.2} />
            </span>
          </h1>
          <p className="about-subtitle">
            Silbar Security Services was built by people who dedicated their careers
            to protecting others — and still do, every single day.
          </p>
        </ScrollReveal>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="about-stats__grid">
          {STATS.map(({ number, label }) => {
            const numValue = parseInt(number.replace(/\D/g, ''))
            const prefix = number.includes('+') ? '+' : ''
            return (
              <ScrollReveal key={label} className="about-stat">
                <span className="about-stat__number">
                  <Counter to={numValue} suffix={prefix} />
                </span>
                <span className="about-stat__label">{label}</span>
              </ScrollReveal>
            )
          })}
        </div>
      </section>

      {/* Story */}
      <section className="about-story" id="our-story">
        <div className="about-story__inner">
          <ScrollReveal className="about-story__text">
            <span className="page-eyebrow">OUR STORY</span>
            <h2 className="about-story__title">
              <SplitTextReveal text="Founded by Law Enforcement" />
            </h2>
            <p className="about-story__body">
              Silbar Security Services was established by professionals with deep roots in
              law enforcement and defence. We saw firsthand the gap between what Indian
              enterprises needed from private security and what was being delivered: under-trained
              guards, non-compliant agencies, and no accountability.
            </p>
            <p className="about-story__body">
              We built Silbar to be different. Every guard we deploy is PSARA-trained,
              background verified, and covered under full statutory compliance. Every client
              gets a dedicated account manager, monthly MIS reports, and a 24-hour replacement
              guarantee. That's not industry standard. That's our standard.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="about-story__image-block">
            <div className="about-story__image-placeholder">
              <Shield size={48} className="about-story__shield-icon" />
              <span className="about-story__image-label">Est. 2008 · Jaipur, Rajasthan</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Silbar */}
      <section className="about-why" id="why-silbar">
        <ScrollReveal className="about-why__inner">
          <span className="page-eyebrow">WHY SILBAR</span>
          <h2 className="about-why__title">
            <SplitTextReveal text="The Silbar Difference" />
          </h2>
          <div className="about-why__grid">
            {WHY_SILBAR.map((point) => (
              <div key={point} className="about-why__point">
                <CheckCircle size={16} className="about-why__check" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Certifications */}
      <section className="about-certs" id="certifications">
        <div className="about-certs__inner">
          <span className="page-eyebrow">CERTIFICATIONS</span>
          <h2 className="about-certs__title">
            <SplitTextReveal text="Licensed. Certified. Compliant." />
          </h2>
          <div className="about-certs__grid">
            {CERTIFICATIONS.map(({ name, desc }, i) => (
              <ScrollReveal key={name} delay={i * 0.1} className="about-cert-card">
                <div className="about-cert-card__badge">
                  <Award size={20} />
                  {name}
                </div>
                <p className="about-cert-card__desc">{desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="service-detail-bottom-cta">
        <h2 className="service-detail-bottom-cta__title">Ready to Work with India&apos;s Trusted Security Force?</h2>
        <p className="service-detail-bottom-cta__sub">
          Join 500+ enterprise clients who trust Silbar Security for their protection needs.
        </p>
        <div className="service-detail-ctas" style={{ justifyContent: 'center' }}>
          <a href="tel:+919352303333" className="service-detail-cta service-detail-cta--primary">
            <Phone size={16} /> Call Now
          </a>
          <a
            href="https://wa.me/919352303333?text=Hello%20Silbar%20Security%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services."
            className="service-detail-cta service-detail-cta--secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Us
          </a>
        </div>
      </section>
    </main>
  )
}
