import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/animations/ScrollReveal'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import ResumeForm from '@/components/forms/ResumeForm'
import PageHero from '@/components/layout/PageHero'
import { Phone, Mail, CheckCircle } from 'lucide-react'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'
import PageLeadSection from '@/components/sections/PageLeadSection'
import { CAREERS } from '@/data/careers'

export const metadata: Metadata = {
  title: 'Careers — Join India\'s Most Trusted Security Team | Silbar Security',
  description:
    'Build your career with Silbar Security Services. We hire security guards, supervisors, account managers, and corporate staff across PAN India. Professional training. Growth guaranteed.',
  ...ogMetadata('Careers — Join India\'s Most Trusted Security Team | Silbar Security', 'Build your career with Silbar Security Services. We hire security guards, supervisors, account managers, and corporate staff across PAN India. Professional training. Growth guaranteed.', '/careers'),
}

const WHY_JOIN = [
  'Professional training at our 3-acre training center',
  'On-time salary with ESI, PF, and statutory benefits',
  'Career growth from guard to supervisor to manager',
  '24/7 insurance coverage for all deployed personnel',
  'Dedicated HR support and grievance redressal',
  'PAN India deployment — work in your city or relocate',
]

export default function CareersPage() {
  return (
    <main className="careers-page" id="main-content">
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify(CAREERS.map(job => ({
            '@context': 'https://schema.org',
            '@type': 'JobPosting',
            title: job.title,
            description: job.description.replace(/<[^>]*>/g, '').substring(0, 500),
            datePosted: job.postedAt,
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
                addressLocality: job.locations[0],
                addressCountry: 'IN',
              },
            },
          })))
        }} />
      <PageHero
        eyebrow="JOIN THE FORCE"
        title={
          <>
            <SplitTextReveal text="CAREERS AT" />
            <br />
            <span className="page-hero-title--outline">
              <SplitTextReveal text="SILBAR SECURITY" delay={0.2} />
            </span>
          </>
        }
        subtitle={
          <>Be part of India&apos;s trusted security force. 7,000+ professionals. 200+ cities. One standard.</>
        }
        size="compact"
        topContent={
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Careers</span>
          </nav>
        }
      />

      <section className="service-detail-features service-detail-features--padded">
        <div className="service-detail-section-inner service-detail-section-inner--no-padding">
          <h2 className="service-detail-section-title service-detail-section-title--mb">Why Join Silbar?</h2>
          <div className="bento-grid">
            {WHY_JOIN.map((point, i) => (
              <ScrollReveal key={point} delay={i * 0.05} className="bento-cell glass-panel bento-cell--wide benefit-item">
                <CheckCircle size={24} className="service-detail-feature__icon" />
                <span className="benefit-item__text">{point}</span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="service-detail-section-inner openings-section">
        <h2 className="service-detail-section-title service-detail-section-title--mb">Current Openings</h2>
        <div className="openings-grid">
          {CAREERS.map((job, i) => (
            <ScrollReveal key={job.slug} delay={i * 0.05} className="bento-cell glass-panel">
              <Link href={`/careers/${job.slug}`} className="job-card__link">
                <h3 className="job-card__title">{job.title}</h3>
                <p className="job-card__meta">{job.type} — {job.department} — {job.locations.join(', ')}</p>
                <p className="job-card__desc">Click to view full details, responsibilities, requirements, and apply.</p>
              </Link>
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

      {/* Resume Upload Section */}
      <section className="service-detail-features service-detail-features--padded" style={{ background: 'var(--color-midnight)' }}>
        <div className="service-detail-section-inner service-detail-section-inner--no-padding">
          <h2 className="service-detail-section-title service-detail-section-title--mb">Upload Your Resume</h2>
          <p className="service-detail-section-sub" style={{ color: 'rgba(250,248,244,0.7)', marginBottom: '2rem', maxWidth: '600px' }}>
            Submit your resume directly. Our HR team reviews every application within 48 hours.
          </p>
          <ResumeForm />
        </div>
      </section>

      {/* Walk-in Interviews */}
      <section className="service-detail-features service-detail-features--padded">
        <div className="service-detail-section-inner service-detail-section-inner--no-padding">
          <h2 className="service-detail-section-title service-detail-section-title--mb">Walk-In Interviews</h2>
          <div className="bento-grid">
            {[
              { city: 'New Delhi (Registered Office)', address: CONTACT.officeLocations[0].address, time: 'Mon–Sat: 10:00 AM – 4:00 PM', roles: 'All Positions' },
              { city: 'Gurugram (Corporate Office)', address: CONTACT.officeLocations[1].address, time: 'Mon–Fri: 10:00 AM – 3:00 PM', roles: 'Security Guards, Supervisors' },
            ].map((loc, i) => (
              <ScrollReveal key={loc.city} delay={i * 0.1} className="bento-cell glass-panel">
                <h3 style={{ color: 'var(--color-gold-light)', fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{loc.city}</h3>
                <p style={{ color: 'rgba(250,248,244,0.7)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{loc.address}</p>
                <p style={{ color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>{loc.time}</p>
                <p style={{ color: 'rgba(250,248,244,0.5)', fontSize: '0.75rem' }}>Positions: {loc.roles}</p>
              </ScrollReveal>
            ))}
          </div>
          <p style={{ color: 'rgba(250,248,244,0.5)', fontSize: '0.8rem', marginTop: '1.5rem' }}>
            Bring your resume, Aadhaar card, and previous employment documents. No appointment needed.
          </p>
        </div>
      </section>

      {/* Franchise / Business Partner */}
      <section className="service-detail-bottom-cta" style={{ background: 'linear-gradient(135deg, var(--color-cherry-deep) 0%, var(--color-cherry) 100%)' }}>
        <h2 className="service-detail-bottom-cta__title">Franchise & Business Partner</h2>
        <p className="service-detail-bottom-cta__sub">
          Partner with India&apos;s fastest-growing security company. We offer franchise opportunities across 200+ cities.
        </p>
        <div className="service-detail-ctas service-detail-ctas--centered">
          <a href="/contact" className="service-detail-cta service-detail-cta--primary">
            Become a Partner
          </a>
          <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--secondary">
            <Phone size={16} /> Call for Details
          </a>
        </div>
      </section>
    
      <PageLeadSection
        title="Hiring or Partnering with Silbar?"
        subtitle="For job applications use the form above. For business enquiries, leave a message here."
        defaultMessage="I would like to discuss a careers / recruitment enquiry with Silbar Security."
      />

</main>
  )
}
