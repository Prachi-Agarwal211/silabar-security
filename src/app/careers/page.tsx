import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/animations/ScrollReveal'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import { Phone, Mail, CheckCircle } from 'lucide-react'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'Careers — Join India\'s Most Trusted Security Team | Silbar Security',
  description:
    'Build your career with Silbar Security Services. We hire security guards, supervisors, account managers, and corporate staff across PAN India. PSARA-trained. Growth guaranteed.',
  ...ogMetadata('Careers — Join India\'s Most Trusted Security Team | Silbar Security', 'Build your career with Silbar Security Services. We hire security guards, supervisors, account managers, and corporate staff across PAN India. PSARA-trained. Growth guaranteed.', '/careers'),
}

const WHY_JOIN = [
  'PSARA-certified training and certification',
  'On-time salary with ESI, PF, and statutory benefits',
  'Career growth from guard to supervisor to manager',
  '24/7 insurance coverage for all deployed personnel',
  'Dedicated HR support and grievance redressal',
  'PAN India deployment — work in your city or relocate',
]

const OPENINGS = [
  {
    title: 'Security Guard (Armed & Unarmed)',
    type: 'Full-time',
    locations: 'Jaipur, Delhi, Mumbai, Ahmedabad, Bengaluru',
    description: 'PSARA-licensed security guards for corporate offices, factories, hospitals, and residential societies.',
  },
  {
    title: 'Security Supervisor',
    type: 'Full-time',
    locations: 'Jaipur, Delhi, Mumbai, Pune',
    description: 'Oversee shift operations, conduct patrol rounds, manage guard deployment, and report to account manager.',
  },
  {
    title: 'Account Manager',
    type: 'Full-time',
    locations: 'Jaipur (HQ)',
    description: 'Manage client relationships, conduct site audits, ensure compliance, and lead a team of supervisors.',
  },
  {
    title: 'Lady Security Guard',
    type: 'Full-time',
    locations: 'Jaipur, Delhi, Mumbai, Bengaluru',
    description: 'Trained lady security personnel for hospitals, schools, malls, and corporate offices.',
  },
  {
    title: 'Business Development Executive',
    type: 'Full-time',
    locations: 'Jaipur (HQ)',
    description: 'Generate leads, pitch security solutions, manage client onboarding, and achieve sales targets.',
  },
]

export default function CareersPage() {
  return (
    <main className="contact-page" id="main-content">
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify(OPENINGS.map(job => ({
            '@context': 'https://schema.org',
            '@type': 'JobPosting',
            title: job.title,
            description: job.description,
            datePosted: '2026-07-01',
            employmentType: 'FULL_TIME',
            hiringOrganization: {
              '@type': 'Organization',
              name: 'Silbar Security Services Pvt. Ltd.',
              sameAs: 'https://www.silbarsecurity.in',
            },
            jobLocation: {
              '@type': 'Place',
              address: {
                '@type': 'PostalAddress',
                addressLocality: job.locations.includes('Jaipur') ? 'Jaipur' : 'Delhi',
                addressRegion: job.locations.includes('Jaipur') ? 'Rajasthan' : 'Delhi',
                addressCountry: 'IN',
              },
            },
          })))
        }} />
      <section className="page-hero page-hero--short">
        <ScrollReveal>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Careers</span>
          </nav>
          <span className="contact-eyebrow">JOIN THE FORCE</span>
          <h1 className="contact-title">
            <SplitTextReveal text="CAREERS AT" />
            <br />
            <span className="contact-title--outline">
              <SplitTextReveal text="SILBAR SECURITY" delay={0.2} />
            </span>
          </h1>
          <p className="contact-subtitle">
            Be part of India&apos;s most trusted PSARA-licensed security force. 
            7,000+ professionals. 200+ cities. One standard.
          </p>
        </ScrollReveal>
      </section>

      <section className="service-detail-features service-detail-features--padded" style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(2rem, 4vh, 4rem) clamp(1.5rem, 5vw, 6rem)' }}>
        <div className="service-detail-section-inner" style={{ padding: 0 }}>
          <h2 className="service-detail-section-title" style={{ marginBottom: '3rem' }}>Why Join Silbar?</h2>
          <div className="bento-grid">
            {WHY_JOIN.map((point, i) => (
              <ScrollReveal key={point} delay={i * 0.05} className="bento-cell glass-panel bento-cell--wide" style={{ flexDirection: 'row', alignItems: 'center', gap: '1rem', padding: '1.5rem 2rem' }}>
                <CheckCircle size={24} className="service-detail-feature__icon" style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                <span style={{ fontSize: '1.1rem', fontWeight: 500, lineHeight: 1.4 }}>{point}</span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="service-detail-section-inner" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
        <h2 className="service-detail-section-title" style={{ marginBottom: '3rem' }}>Current Openings</h2>
        <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {OPENINGS.map((job, i) => (
            <ScrollReveal key={job.title} delay={i * 0.1} className="bento-cell glass-panel">
              <h3 className="job-card__title" style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-cream)', marginBottom: '0.5rem' }}>{job.title}</h3>
              <p className="job-card__meta" style={{ color: 'var(--color-gold)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>{job.type} — {job.locations}</p>
              <p className="job-card__desc" style={{ color: 'rgba(244, 241, 234, 0.85)', lineHeight: 1.6 }}>{job.description}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="service-detail-bottom-cta">
        <h2 className="service-detail-bottom-cta__title">Don&apos;t See Your Role?</h2>
        <p className="service-detail-bottom-cta__sub">
          We&apos;re always looking for talented professionals. Send your resume and we&apos;ll reach out.
        </p>
        <div className="service-detail-ctas service-detail-ctas--centered">
          <a href={`mailto:${CONTACT.email}`} className="service-detail-cta service-detail-cta--primary">
            <Mail size={16} /> Email Your Resume
          </a>
          <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--secondary">
            <Phone size={16} /> Call HR
          </a>
        </div>
      </section>
    </main>
  )
}
