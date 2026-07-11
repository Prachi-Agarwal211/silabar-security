import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import { SplitTextReveal } from '@/components/animations/SplitTextReveal'
import { ogMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  ...ogMetadata({
    title: 'Case Studies',
    description: 'Real-world security solutions delivered by Silbar Security. See how we protect India\'s leading enterprises across manufacturing, healthcare, and corporate sectors.',
    url: '/case-studies',
  }),
}

const CASE_STUDIES = [
  {
    id: 1,
    title: 'Manufacturing Plant Security Overhaul',
    client: 'Leading Automobile Manufacturer',
    location: 'Rajasthan',
    challenge: 'High theft incidents, unauthorized access, and shift-management gaps across 3 factory units.',
    solution: 'Deployed 120+ guards across 3 shifts, integrated CCTV with access control, implemented gate management with vehicle logging.',
    results: ['90% reduction in security incidents', 'Zero theft in 12 months', 'Full PSARA compliance achieved'],
    services: ['Manned Guarding', 'Electronic Surveillance', 'Gate Management'],
  },
  {
    id: 2,
    title: 'Hospital Chain Security Standardization',
    client: 'Multi-Specialty Hospital Chain',
    location: 'Delhi NCR',
    challenge: 'Inconsistent security across 8 hospital locations, patient safety concerns, and emergency response gaps.',
    solution: 'Standardized SOPs across all locations, deployed trained hospital security teams, implemented emergency response protocols.',
    results: ['100% SOP compliance', '15-minute emergency response', 'Patient safety score improved 40%'],
    services: ['Hospital Security', 'Emergency Response', 'Training'],
  },
  {
    id: 3,
    title: 'IT Park Comprehensive Security',
    client: 'Major IT Park',
    location: 'Bengaluru',
    challenge: 'Managing access for 10,000+ employees, visitor verification, and after-hours security across 12 buildings.',
    solution: 'Biometric access control integration, dedicated control room with CCTV monitoring, QRT deployment for after-hours.',
    results: ['Zero security breaches', 'Visitor processing time reduced 60%', '99.9% uptime on access systems'],
    services: ['Electronic Surveillance', 'Access Control', 'Quick Response Team'],
  },
  {
    id: 4,
    title: 'Retail Chain Loss Prevention',
    client: 'National Retail Chain',
    location: 'Pan India (45 stores)',
    challenge: 'High shrinkage rates across 45 retail locations, inconsistent security practices.',
    solution: 'Deployed plain-clothes loss prevention officers, standardized CCTV monitoring, implemented inventory protection protocols.',
    results: ['70% reduction in shrinkage', 'Standardized security across 45 locations', 'ROI achieved in 6 months'],
    services: ['Retail Security', 'Loss Prevention', 'CCTV Monitoring'],
  },
  {
    id: 5,
    title: 'Construction Site Security',
    client: 'Infrastructure Developer',
    location: 'Gujarat',
    challenge: 'Theft of construction materials, equipment damage, and unauthorized access at a 200-acre site.',
    solution: 'Perimeter security with CCTV towers, material yard protection, 24/7 guard deployment with mobile patrol.',
    results: ['Zero material theft', 'Equipment damage reduced 95%', 'Insurance claims dropped 80%'],
    services: ['Construction Security', 'Perimeter Security', 'Mobile Patrol'],
  },
  {
    id: 6,
    title: 'Bank & ATM Security Network',
    client: 'Nationalized Bank',
    location: 'Madhya Pradesh',
    challenge: 'Securing 200+ ATMs and 50 bank branches with inconsistent guard quality.',
    solution: 'Standardized armed guard deployment, GPS-tracked cash van security, centralized monitoring center.',
    results: ['Zero ATM robberies', 'Cash van security 100% compliant', 'Response time under 10 minutes'],
    services: ['Bank Security', 'Armed Guards', 'Cash Van Security'],
  },
]

export default function CaseStudiesPage() {
  return (
    <main>
      <PageHero
        eyebrow="CASE STUDIES"
        title={
          <>
            <SplitTextReveal text="REAL RESULTS" />
            <br />
            <span className="page-hero-title--outline">
              <SplitTextReveal text="REAL PROTECTION" delay={0.2} />
            </span>
          </>
        }
        subtitle="See how Silbar Security delivers measurable outcomes for India's leading enterprises."
        size="compact"
        topContent={
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Case Studies</span>
          </nav>
        }
      />

      <section className="service-detail-features service-detail-features--padded">
        <div className="service-detail-section-inner service-detail-section-inner--no-padding">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {CASE_STUDIES.map((study) => (
              <div key={study.id} className="bento-cell glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-paper-ink)', marginBottom: '0.25rem' }}>{study.title}</h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-cherry)' }}>{study.client} — {study.location}</p>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-cherry)', marginBottom: '0.5rem' }}>Challenge</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-horizon-600)', lineHeight: 1.6 }}>{study.challenge}</p>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-cherry)', marginBottom: '0.5rem' }}>Solution</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-horizon-600)', lineHeight: 1.6 }}>{study.solution}</p>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold-dark)', marginBottom: '0.5rem' }}>Results</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {study.results.map((r) => (
                        <li key={r} style={{ fontSize: '0.85rem', color: 'var(--color-horizon-600)', lineHeight: 1.8, paddingLeft: '1rem', position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: 'var(--color-gold)' }}>✓</span> {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {study.services.map((s) => (
                    <span key={s} style={{ padding: '0.25rem 0.75rem', background: 'rgba(140,31,50,0.08)', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-cherry)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
