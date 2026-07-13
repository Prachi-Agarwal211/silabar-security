import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MessageSquare, AlertTriangle } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import { ogMetadata } from '@/lib/metadata'
import { CONTACT } from '@/lib/config'
import PageLeadSection from '@/components/sections/PageLeadSection'

export const metadata: Metadata = {
  title: 'Emergency Contact | Silbar Security',
  description: '24/7 emergency security contact for Silbar Security clients. Immediate response for security incidents, fire emergencies, and critical situations.',
  ...ogMetadata(
    'Emergency Contact',
    '24/7 emergency security contact for Silbar Security clients. Immediate response for security incidents, fire emergencies, and critical situations.',
    '/emergency'
  ),
}

export default function EmergencyPage() {
  return (
    <main>
      <PageHero
        eyebrow="EMERGENCY"
        title={
          <>
            <SplitTextReveal text="24/7 EMERGENCY" />
            <br />
            <span className="page-hero-title--outline">
              <SplitTextReveal text="RESPONSE" delay={0.2} />
            </span>
          </>
        }
        subtitle="Immediate security response for critical situations. Available 24 hours, 7 days a week."
        size="compact"
        topContent={
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Emergency</span>
          </nav>
        }
      />

      <section className="service-detail-features service-detail-features--padded">
        <div className="service-detail-section-inner service-detail-section-inner--no-padding">
          {/* Emergency Alert */}
          <div style={{
            background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
            borderRadius: '8px',
            padding: '2rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <AlertTriangle size={32} color="white" />
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'white', marginBottom: '0.25rem' }}>Security Emergency?</h2>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>Call our 24/7 emergency line for immediate response.</p>
            </div>
          </div>

          {/* Emergency Contact Numbers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <a href={`tel:${CONTACT.phoneRaw}`} className="bento-cell glass-panel" style={{ padding: '2rem', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.75rem' }}>
              <Phone size={32} color="var(--color-gold)" />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-paper-ink)' }}>Emergency Hotline</h3>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-cherry)' }}>{CONTACT.phone}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-horizon-600)' }}>24/7 Available</p>
            </a>
            <a href={`tel:${CONTACT.landlineRaw}`} className="bento-cell glass-panel" style={{ padding: '2rem', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.75rem' }}>
              <Phone size={32} color="var(--color-gold)" />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-paper-ink)' }}>HQ Landline</h3>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-cherry)' }}>{CONTACT.landline}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-horizon-600)' }}>Jaipur headquarters</p>
            </a>
            <a href={CONTACT.whatsapp.url} target="_blank" rel="noopener noreferrer" className="bento-cell glass-panel" style={{ padding: '2rem', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.75rem' }}>
              <MessageSquare size={32} color="var(--color-gold)" />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-paper-ink)' }}>WhatsApp Emergency</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-cherry)', fontWeight: 600 }}>Send SOS Message</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-horizon-600)' }}>Instant alert to response team</p>
            </a>
          </div>

          {/* Emergency Procedures */}
          <div className="bento-cell glass-panel" style={{ padding: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-paper-ink)', marginBottom: '1rem' }}>Emergency Response Protocol</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { step: '1', title: 'Call Emergency Line', desc: 'Dial our 24/7 emergency hotline immediately upon detecting any security incident.' },
                { step: '2', title: 'Provide Location', desc: 'Share the exact location and nature of the incident (theft, intrusion, fire, medical).' },
                { step: '3', title: 'Quick Response Team', desc: 'Our nearest QRT will be dispatched within minutes to your location.' },
                { step: '4', title: 'Incident Documentation', desc: 'Our team will document the incident and provide a detailed report within 24 hours.' },
              ].map((item) => (
                <div key={item.step} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{
                    minWidth: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--color-cherry)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                  }}>{item.step}</span>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-paper-ink)', marginBottom: '0.25rem' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-horizon-600)', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    
      <PageLeadSection
        title="Non-Emergency Security Enquiry"
        subtitle="For active emergencies call our hotline. For quotes and planning, use this form."
        defaultMessage="I need help planning security / emergency response coverage."
      />

</main>
  )
}
