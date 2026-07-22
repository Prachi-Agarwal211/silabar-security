import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MessageSquare, AlertTriangle } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import { ogMetadata } from '@/lib/metadata'
import { CONTACT } from '@/lib/config'
import PageLeadSection from '@/components/sections/PageLeadSection'

export const metadata: Metadata = {
  title: 'Emergency Contact',
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
          <div className="emergency-alert">
            <AlertTriangle size={32} color="white" />
            <div>
              <h2 className="emergency-alert__title">Security Emergency?</h2>
              <p className="emergency-alert__sub">Call our 24/7 emergency line for immediate response.</p>
            </div>
          </div>

          <div className="emergency-contacts-grid">
            <a href={`tel:${CONTACT.phoneRaw}`} className="emergency-card bento-cell glass-panel">
              <Phone size={32} color="var(--color-gold)" />
              <h3 className="emergency-card__label">Emergency Hotline</h3>
              <p className="emergency-card__value">{CONTACT.phone}</p>
              <p className="emergency-card__meta">24/7 Available</p>
            </a>
            <a href={`tel:${CONTACT.landlineRaw}`} className="emergency-card bento-cell glass-panel">
              <Phone size={32} color="var(--color-gold)" />
              <h3 className="emergency-card__label">HQ Landline</h3>
              <p className="emergency-card__value">{CONTACT.landline}</p>
              <p className="emergency-card__meta">Jaipur headquarters</p>
            </a>
            <a href={CONTACT.whatsapp.url} target="_blank" rel="noopener noreferrer" className="emergency-card bento-cell glass-panel">
              <MessageSquare size={32} color="var(--color-gold)" />
              <h3 className="emergency-card__label">WhatsApp Emergency</h3>
              <p className="emergency-card__value--sm">Send SOS Message</p>
              <p className="emergency-card__meta">Instant alert to response team</p>
            </a>
          </div>

          <div className="bento-cell glass-panel emergency-protocol">
            <h2 className="emergency-protocol__title">Emergency Response Protocol</h2>
            <div className="emergency-protocol__list">
              {[
                { step: '1', title: 'Call Emergency Line', desc: 'Dial our 24/7 emergency hotline immediately upon detecting any security incident.' },
                { step: '2', title: 'Provide Location', desc: 'Share the exact location and nature of the incident (theft, intrusion, fire, medical).' },
                { step: '3', title: 'Quick Response Team', desc: 'Our nearest QRT will be dispatched within minutes to your location.' },
                { step: '4', title: 'Incident Documentation', desc: 'Our team will document the incident and provide a detailed report within 24 hours.' },
              ].map((item) => (
                <div key={item.step} className="emergency-step">
                  <span className="emergency-step__num">{item.step}</span>
                  <div>
                    <h4 className="emergency-step__title">{item.title}</h4>
                    <p className="emergency-step__desc">{item.desc}</p>
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