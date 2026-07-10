import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Award, CheckCircle, Phone } from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import Counter from '@/components/animations/Counter'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import { GlassCard } from '@/components/ui/GlassCard'
import { GradientText } from '@/components/ui/GradientText'
import { MagneticButton } from '@/components/ui/MagneticButton'
import PageHero from '@/components/layout/PageHero'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'About Silbar Security — ISO 9001:2015 Certified Security Agency',
  description:
    'Silbar Security Services — ISO 9001:2015 certified. 7,000+ professionals. Manned guarding, electronic surveillance, facility management across PAN India.',
  ...ogMetadata('About Silbar Security — ISO 9001:2015 Certified Security Agency', 'Silbar Security Services — ISO 9001:2015 certified. 7,000+ professionals. Manned guarding, electronic surveillance, facility management across PAN India.', '/about'),
}

const STATS = [
  { number: '7,000+', label: 'Security Professionals' },
  { number: '200+', label: 'Cities Served' },
  { number: '15+', label: 'Years of Experience' },
  { number: '500+', label: 'Enterprise Clients' },
]

const CERTIFICATIONS = [
  { name: 'ISO 9001:2015', desc: 'Quality Management System certified for security service delivery' },
  { name: '3-Acre Training Center', desc: 'Dedicated training facility with modern equipment and certified instructors' },
  { name: 'MSME Registered', desc: 'Registered with Ministry of Micro, Small & Medium Enterprises' },
  { name: 'GST Compliant', desc: 'Fully GST registered and compliant for all service invoicing' },
]

const WHY_SILBAR = [
  'Founded by experienced security and risk management professionals',
  'ISO 9001:2015 certified quality management across all operations',
  'Dedicated 3-acre training center for security personnel',
  'Full statutory compliance — ESI, PF, Gratuity, Minimum Wages',
  '24-hour guard replacement guarantee',
  'Dedicated account manager for every client',
  'Monthly performance and compliance reports',
  'PAN India deployment capability with local expertise',
]

export default function AboutPage() {
  return (
    <main className="about-page" id="main-content">
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About Silbar Security Services',
            description: 'ISO 9001:2015 certified security agency. Founded by security professionals.',
            mainContentOfPage: { '@type': 'WebPageElement' },
            primaryImageOfPage: '/og-image.jpg',
          })
        }} />
      <PageHero
        eyebrow="ABOUT US"
        title={
          <>
            <SplitTextReveal text="NOT JUST SECURITY." />
            <br />
            <span className="page-hero-title--outline">
              <SplitTextReveal text="A COMMITMENT." delay={0.2} />
            </span>
          </>
        }
        subtitle={
          <>Silbar Security Services is an ISO 9001:2015 certified private security agency in India, established in 2005. Headquartered in Jaipur, we provide manned guarding, electronic surveillance, and facility management across 200+ cities with 7,000+ trained security professionals.</>
        }
        size="tall"
        topContent={
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">About</span>
          </nav>
        }
      />

      {/* Stats - Bento Grid */}
      <section className="about-stats">
        <div className="bento-grid">
          {STATS.map(({ number, label }, i) => {
            const numValue = parseInt(number.replace(/\D/g, ''))
            const prefix = number.includes('+') ? '+' : ''
            return (
              <ScrollReveal key={label} delay={i * 0.1} className="bento-cell glass-panel bento-cell--stat">
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
              <SplitTextReveal text="Built by Security Professionals" />


            </h2>
            <p className="about-story__body">
              Silbar Security Services was built on decades of combined experience in
              security management, risk assessment, and personnel training. We saw firsthand
              the gap between what Indian enterprises needed from private security and what was
              being delivered: under-trained guards, non-compliant agencies, and no accountability.
            </p>
            <p className="about-story__body">
              We built Silbar to be different. Every guard we deploy is professionally trained,
              background verified, and covered under full statutory compliance. Every client
              gets a dedicated account manager, monthly MIS reports, and a 24-hour replacement
              guarantee. That&apos;s not industry standard. That&apos;s our standard.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="about-story__image-block">
            <div className="about-story__image-placeholder">
              <Shield size={48} className="about-story__shield-icon" />
              <span className="about-story__image-label">Est. 2005 · Jaipur, Rajasthan</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline" id="timeline">
        <div className="about-timeline__inner">
          <ScrollReveal>
            <span className="page-eyebrow page-eyebrow--centered">MILESTONES</span>
            <h2 className="about-timeline__title">
              <SplitTextReveal text="Our Journey" />
            </h2>
          </ScrollReveal>
          
          <div className="timeline-container">
            {[
              { year: '2005', title: 'The Foundation', desc: 'Silbar Security established in Jaipur by experienced security professionals.' },
              { year: '2012', title: 'Regional Expansion', desc: 'Expanded operations across Rajasthan, building a PAN India deployment network.' },
              { year: '2016', title: 'ISO Certification', desc: 'Achieved ISO 9001:2015 certification for Quality Management Systems.' },
              { year: '2024', title: 'PAN India Presence', desc: 'Now protecting 500+ enterprise clients with a force of 7,000+ licensed officers.' }
            ].map((item, i) => (
              <ScrollReveal key={item.year} delay={i * 0.1} className="timeline-item">
                <div className="timeline-item__year">{item.year}</div>
                <div className="timeline-item__content glass-panel" style={{ padding: '1.5rem', borderRadius: '12px', marginTop: '1rem' }}>
                  <h3 className="timeline-item__title">{item.title}</h3>
                  <p className="timeline-item__desc">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Silbar - Bento Grid */}
      <section className="about-why" id="why-silbar">
        <ScrollReveal className="about-why__inner">
          <span className="page-eyebrow">WHY SILBAR</span>
          <GradientText as="h2" className="about-why__title service-detail-section-title--mb">
            <SplitTextReveal text="The Silbar Difference" />
          </GradientText>
          <div className="bento-grid">
            {WHY_SILBAR.map((point, i) => (
              <ScrollReveal key={point} delay={i * 0.05} className="bento-cell--wide">
                <GlassCard className="bento-cell bento-cell--check-item" tilt={true} opacity={0.03} borderOpacity={0.15}>
                  <CheckCircle size={24} className="about-why__check" />
                  <span className="check-item__text">{point}</span>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Certifications - Bento Grid */}
      <section className="about-certs" id="certifications">
        <div className="about-certs__inner">
          <span className="page-eyebrow">CERTIFICATIONS</span>
          <GradientText as="h2" className="about-certs__title service-detail-section-title--mb">
            <SplitTextReveal text="Licensed. Certified. Compliant." />
          </GradientText>
          <div className="bento-grid">
            {CERTIFICATIONS.map(({ name, desc }, i) => (
              <ScrollReveal key={name} delay={i * 0.1} style={{ display: 'flex' }}>
                <GlassCard className="bento-cell about-cert-card" tilt={true} opacity={0.03} borderOpacity={0.15}>
                  <div className="about-cert-card__badge">
                    <Award size={28} />
                    {name}
                  </div>
                  <p className="about-cert-card__desc">{desc}</p>
                </GlassCard>
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
        <div className="service-detail-ctas service-detail-ctas--centered">
          <MagneticButton as="a" href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--primary">
            <Phone size={16} /> Call Now
          </MagneticButton>
          <MagneticButton
            as="a"
            href={CONTACT.whatsapp.url}
            className="service-detail-cta service-detail-cta--secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Us
          </MagneticButton>
        </div>
      </section>
    </main>
  )
}
