import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Shield, Award, Phone, Play, Target, Eye, Users } from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import Counter from '@/components/animations/Counter'
import { MagneticButton } from '@/components/ui/MagneticButton'
import QueryForm from '@/components/sections/QueryForm'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'About Silbar Security — ISO 9001:2015 Certified Security Agency',
  description:
    'Silbar Security Services — ISO 9001:2015 certified. Founded in 2005. 7,000+ professionals. Manned guarding, electronic surveillance, facility management across PAN India.',
  ...ogMetadata('About Silbar Security — ISO 9001:2015 Certified Security Agency', 'Silbar Security Services — ISO 9001:2015 certified. Founded in 2005. 7,000+ professionals. Manned guarding, electronic surveillance, facility management across PAN India.', '/about'),
}

const STATS = [
  { number: 22, suffix: '+', label: 'Years of Excellence' },
  { number: 7000, suffix: '+', label: 'Security Professionals' },
  { number: 200, suffix: '+', label: 'Cities Served' },
  { number: 500, suffix: '+', label: 'Enterprise Clients' },
]

const CERTIFICATIONS = [
  { name: 'ISO 9001:2015', desc: 'Quality Management System' },
  { name: 'ISO 14001:2015', desc: 'Environmental Management System' },
  { name: 'ISO 45001:2018', desc: 'Occupational Health & Safety' },
  { name: 'ISO 27001', desc: 'Information Security Management System' },
  { name: 'PSARA Licensed', desc: 'Compliant across states' },
  { name: 'MSME Registered', desc: 'Govt. recognized enterprise' },
  { name: 'Startup India', desc: 'Recognized emerging business' },
  { name: 'Statutory Compliant', desc: 'MCA, GST, EPF, ESIC' },
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
        })
      }} />

      {/* ─── 1. Hero Section ─── */}
      <section className="about-intro-block" aria-labelledby="about-page-heading">
        <div className="about-intro-inner">
          <div className="about-intro-copy">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/" className="breadcrumb__link">Home</Link>
              <span className="breadcrumb__sep">›</span>
              <span className="breadcrumb__current">About</span>
            </nav>
            <span className="section-eyebrow section-eyebrow--light">ABOUT SILBAR SECURITY</span>
            <h1 id="about-page-heading" className="section-heading section-heading--on-dark about-intro-h1">
              Building Trust Through <em>Professional</em> Security & Compliance
            </h1>
            <p className="about-intro-body">
              Silbar Security Services Pvt. Ltd. is one of India&apos;s emerging PAN India security service companies, committed to delivering reliable, compliance-driven, and professional security solutions.
            </p>
            <div className="cta-pair" style={{ marginTop: '1.75rem' }}>
              <MagneticButton
                as="a"
                href={`tel:${CONTACT.phoneRaw}`}
                className="btn-primary btn-primary--on-dark"
                strength={0.2}
              >
                <Phone size={14} aria-hidden="true" /> Request a Quote
              </MagneticButton>
            </div>
          </div>
          <div className="about-intro-visual" aria-hidden="true">
            <div className="about-play-circle"><Play size={28} fill="currentColor" /></div>
            <div className="about-intro-tagline">Est. 2005 · Jaipur, Rajasthan</div>
            <div className="about-intro-shield">
              <Image src="/logo.png" alt="Silbar Security" width={80} height={80} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. Stats Band ─── */}
      <section className="about-stats" aria-label="Company statistics">
        <div className="about-stats-inner">
          {STATS.map(({ number, suffix, label }) => (
            <div key={label} className="about-stat-item">
              <span className="about-stat__number"><Counter to={number} suffix={suffix} /></span>
              <span className="about-stat__label">{label}</span>
            </div>
          ))}
          <div className="about-stat-item">
            <span className="about-stat__number"><Counter to={100} suffix="+" /></span>
            <span className="about-stat__label">Experienced Professionals</span>
          </div>
          <div className="about-stat-item">
            <span className="about-stat__number"><Counter to={4} suffix="" /></span>
            <span className="about-stat__label">ISO Certifications</span>
          </div>
        </div>
      </section>

      {/* ─── 3. Compliance Trust Bar ─── */}
      <section className="about-trust-bar">
        <div className="about-trust-bar__inner">
          {CERTIFICATIONS.map(cert => (
            <div key={cert.name} className="trust-badge">
              <Award size={16} />
              <span>{cert.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 4. Our Story / Timeline ─── */}
      <section className="about-story" id="our-story">
        <div className="about-story__inner">
          <ScrollReveal className="about-story__text">
            <span className="section-eyebrow section-eyebrow--red">OUR STORY</span>
            <h2 className="section-heading about-story-heading">
              A Journey of <em>Excellence.</em>
            </h2>
            <p className="about-story__body">
              The journey of Silbar Security Services began in Jaipur, Rajasthan, where Mr. Sonu Singh founded the business with a vision to redefine the standards of the private security industry. Through dedication, industry expertise, and an uncompromising commitment to quality, the organization steadily expanded its capabilities and client base.
            </p>
            <p className="about-story__body">
              In October 2025, the business was incorporated as Silbar Security Services Pvt. Ltd. in partnership with Mr. Nakul Singh Jadaun, marking a significant milestone in its transformation into a professionally managed corporate security organization. Today, we operate from our Corporate Office in Gurugram, managing operations across India.
            </p>
          </ScrollReveal>

          <div className="timeline-container">
            <div className="timeline-line"></div>
            {[
              { year: '2005', title: 'The Foundation', desc: 'Established in Jaipur by Mr. Sonu Singh with a vision to raise industry standards.' },
              { year: '2025', title: 'Incorporation', desc: 'Incorporated as a Pvt. Ltd. company with Mr. Nakul Singh Jadaun.' },
              { year: 'Today', title: 'PAN India Presence', desc: 'Operating from Gurugram (Corporate) and New Delhi (Registered) protecting 500+ clients.' }
            ].map((item, index) => (
              <ScrollReveal key={item.year} delay={index * 0.15} direction="left">
                <div className="timeline-item">
                  <div className="timeline-item__year">{item.year}</div>
                  <div className="timeline-item__content">
                    <h3 className="timeline-item__title">{item.title}</h3>
                    <p className="timeline-item__desc">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. Mission & Vision ─── */}
      <section className="about-mission-vision" style={{ background: 'var(--color-paper)', padding: '5rem 0' }}>
        <div className="about-story__inner" style={{ gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          <ScrollReveal direction="up">
            <Target size={48} color="var(--color-cherry)" style={{ marginBottom: '1.5rem' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-midnight)' }}>Our Mission</h2>
            <p style={{ lineHeight: 1.7, color: 'var(--color-horizon-700)' }}>
              To provide reliable, technology-enabled, and compliance-focused security services that protect people, property, and business operations. We aim to create long-term partnerships by delivering trained manpower, transparent processes, timely documentation, and responsive customer support while maintaining the highest standards of integrity and professionalism.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <Eye size={48} color="var(--color-cherry)" style={{ marginBottom: '1.5rem' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-midnight)' }}>Our Vision</h2>
            <p style={{ lineHeight: 1.7, color: 'var(--color-horizon-700)' }}>
              To become one of the most respected and trusted security guard companies in India, recognized for operational excellence, legal compliance, professionalism, and customer satisfaction. We aspire to build a nationally recognized security brand that consistently delivers value to clients through innovation, accountability, and ethical business practices.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── 6. Leadership Team ─── */}
      <section className="about-why" id="leadership" style={{ background: 'var(--color-midnight-900)' }}>
        <div className="about-why__inner" style={{ display: 'block', maxWidth: '1000px', margin: '0 auto' }}>
          <ScrollReveal>
            <span className="section-eyebrow section-eyebrow--light">LEADERSHIP</span>
            <h2 className="section-heading section-heading--on-dark" style={{ marginBottom: '3rem', textAlign: 'center' }}>
              Experienced <em>Leadership.</em>
            </h2>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <ScrollReveal direction="up">
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2.5rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                <Users size={40} color="var(--color-gold)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>Mr. Sonu Singh</h3>
                <p style={{ color: 'var(--color-gold)', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Director & Founder</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, fontSize: '0.9rem' }}>Extensive experience in India's private security industry. Held senior positions with reputed organizations, bringing practical expertise in industrial security operations, manpower deployment, client relationship management, and statutory compliance.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2.5rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                <Users size={40} color="var(--color-gold)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>Mr. Nakul Singh Jadaun</h3>
                <p style={{ color: 'var(--color-gold)', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Director</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, fontSize: '0.9rem' }}>Brings valuable experience from the security services industry along with strong operational and management expertise, focusing on operational discipline, quality service delivery, and long-term client relationships.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── 7. Compliance Guarantee ─── */}
      <section style={{ padding: '6rem 2rem', background: 'var(--color-cherry-deep)', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Shield size={64} color="var(--color-gold)" style={{ margin: '0 auto 2rem' }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'white', marginBottom: '1.5rem' }}>Our Compliance Guarantee</h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.8 }}>
            "If a compliance penalty is imposed solely due to our failure to fulfil our contractual compliance responsibilities, we stand by our commitment and take responsibility in accordance with our service agreement."
          </p>
        </div>
      </section>

      {/* ─── 8. Query Form ─── */}
      <section style={{ padding: '5rem 1.5rem', background: 'var(--color-paper)' }}>
        <QueryForm />
      </section>

      {/* ─── 9. PAN India & Bottom CTA ─── */}
      <section className="about-cta-section">
        <div className="about-cta-inner">
          <span className="section-eyebrow section-eyebrow--light">PAN INDIA OPERATIONS</span>
          <h2 className="section-heading section-heading--on-dark">
            Ready to Work with India&apos;s <em>Trusted</em> Security Force?
          </h2>
          <p className="about-cta__sub">
            Silbar Security Services is continuously expanding its footprint to provide PAN India security services. Our objective is to deliver standardized security services through a centralized corporate operating model while ensuring full compliance with state-specific regulatory requirements.
          </p>
          <div className="cta-pair" style={{ marginTop: '2rem', justifyContent: 'center' }}>
            <MagneticButton as="a" href={`tel:${CONTACT.phoneRaw}`} className="btn-primary btn-primary--on-dark" strength={0.2}>
              <Phone size={14} aria-hidden="true" /> Call Now
            </MagneticButton>
            <MagneticButton
              as="a"
              href={CONTACT.whatsapp.url}
              className="btn-secondary btn-secondary--on-dark"
              target="_blank"
              rel="noopener noreferrer"
              strength={0.2}
            >
              WhatsApp Us
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  )
}
