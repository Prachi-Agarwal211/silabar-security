import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/animations/ScrollReveal'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import { Phone, Mail, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Careers — Join India\'s Most Trusted Security Team | Silbar Security',
  description:
    'Build your career with Silbar Security Services. We hire security guards, supervisors, account managers, and corporate staff across PAN India. PSARA-trained. Growth guaranteed.',
  alternates: { canonical: 'https://www.silbarsecurity.in/careers' },
  openGraph: {
    title: 'Careers at Silbar Security Services',
    description: 'Join 7,000+ professionals protecting India. PSARA-trained, compliance-first, growth-driven.',
  },
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

      <section className="service-detail-features" style={{ paddingTop: '4rem' }}>
        <div className="service-detail-section-inner">
          <h2 className="service-detail-section-title">Why Join Silbar?</h2>
          <div className="service-detail-features-grid">
            {WHY_JOIN.map((point) => (
              <div key={point} className="service-detail-feature">
                <CheckCircle size={16} className="service-detail-feature__icon" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-detail-section-inner" style={{ paddingTop: '0' }}>
        <h2 className="service-detail-section-title">Current Openings</h2>
        <div className="job-cards">
          {OPENINGS.map((job) => (
            <div key={job.title} className="job-card">
              <h3 className="job-card__title">{job.title}</h3>
              <p className="job-card__meta">{job.type} — {job.locations}</p>
              <p className="job-card__desc">{job.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="service-detail-bottom-cta">
        <h2 className="service-detail-bottom-cta__title">Don&apos;t See Your Role?</h2>
        <p className="service-detail-bottom-cta__sub">
          We&apos;re always looking for talented professionals. Send your resume and we&apos;ll reach out.
        </p>
        <div className="service-detail-ctas" style={{ justifyContent: 'center' }}>
          <a href="mailto:info@silbarsecurity.in" className="service-detail-cta service-detail-cta--primary">
            <Mail size={16} /> Email Your Resume
          </a>
          <a href="tel:+919352303333" className="service-detail-cta service-detail-cta--secondary">
            <Phone size={16} /> Call HR
          </a>
        </div>
      </section>
    </main>
  )
}
