import type { Metadata } from 'next'
import { Shield, Award, CheckCircle } from 'lucide-react'

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
        <div className="about-hero__inner">
          <span className="page-eyebrow">ABOUT US</span>
          <h1 className="about-title">
            NOT JUST SECURITY.<br />
            <span className="about-title--outline">A COMMITMENT.</span>
          </h1>
          <p className="about-subtitle">
            Silbar Security Services was built by people who dedicated their careers
            to protecting others — and still do, every single day.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="about-stats__grid">
          {STATS.map(({ number, label }) => (
            <div key={label} className="about-stat">
              <span className="about-stat__number">{number}</span>
              <span className="about-stat__label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="about-story" id="our-story">
        <div className="about-story__inner">
          <div className="about-story__text">
            <span className="page-eyebrow">OUR STORY</span>
            <h2 className="about-story__title">Founded by Law Enforcement</h2>
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
          </div>
          <div className="about-story__image-block">
            <div className="about-story__image-placeholder">
              <Shield size={48} className="about-story__shield-icon" />
              <span className="about-story__image-label">Est. 2008 · Jaipur, Rajasthan</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Silbar */}
      <section className="about-why" id="why-silbar">
        <div className="about-why__inner">
          <span className="page-eyebrow">WHY SILBAR</span>
          <h2 className="about-why__title">The Silbar Difference</h2>
          <div className="about-why__grid">
            {WHY_SILBAR.map((point) => (
              <div key={point} className="about-why__point">
                <CheckCircle size={16} className="about-why__check" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="about-certs" id="certifications">
        <div className="about-certs__inner">
          <span className="page-eyebrow">CERTIFICATIONS</span>
          <h2 className="about-certs__title">Licensed. Certified. Compliant.</h2>
          <div className="about-certs__grid">
            {CERTIFICATIONS.map(({ name, desc }) => (
              <div key={name} className="about-cert-card">
                <div className="about-cert-card__badge">
                  <Award size={20} />
                  {name}
                </div>
                <p className="about-cert-card__desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
