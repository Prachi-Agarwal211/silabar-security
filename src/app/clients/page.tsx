import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail, FileText, MapPin, ClipboardCheck, Download } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import ProposalForm from '@/components/forms/ProposalForm'
import SurveyForm from '@/components/forms/SurveyForm'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'
import PageLeadSection from '@/components/sections/PageLeadSection'

export const metadata: Metadata = {
  ...ogMetadata('Client Services', 'Request proposals, site surveys, and instant quotes from Silbar Security. Existing clients can access documents and raise service requests.', '/clients'),
}

export default function ClientsPage() {
  return (
    <main>
      <PageHero
        eyebrow="CLIENT SERVICES"
        title={
          <>
            <SplitTextReveal text="YOUR SECURITY" />
            <br />
            <span className="page-hero-title--outline">
              <SplitTextReveal text="PARTNER" delay={0.2} />
            </span>
          </>
        }
        subtitle="Request proposals, schedule site surveys, and manage your security services with Silbar."
        size="compact"
        topContent={
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Client Services</span>
          </nav>
        }
      />

      {/* Service Cards */}
      <section className="service-detail-features service-detail-features--padded">
        <div className="service-detail-section-inner service-detail-section-inner--no-padding">
          <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {/* Request Proposal */}
            <div className="bento-cell glass-panel" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <FileText size={24} color="var(--color-gold)" />
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-paper-ink)' }}>Request Proposal</h2>
              </div>
              <p style={{ color: 'var(--color-horizon-600)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Get a customized security proposal tailored to your facility requirements. Our team will prepare a detailed plan within 48 hours.
              </p>
              <ProposalForm />
            </div>

            {/* Request Site Survey */}
            <div className="bento-cell glass-panel" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <MapPin size={24} color="var(--color-gold)" />
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-paper-ink)' }}>Request Site Survey</h2>
              </div>
              <p style={{ color: 'var(--color-horizon-600)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Our security experts will visit your facility for a comprehensive risk assessment and security audit. Free of charge.
              </p>
              <SurveyForm />
            </div>

            {/* Quick Actions */}
            <div className="bento-cell glass-panel" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <ClipboardCheck size={24} color="var(--color-gold)" />
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-paper-ink)' }}>Quick Actions</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--primary" style={{ justifyContent: 'center' }}>
                  <Phone size={16} /> Call Now — {CONTACT.phone}
                </a>
                <a href={CONTACT.whatsapp.url} target="_blank" rel="noopener noreferrer" className="service-detail-cta service-detail-cta--secondary" style={{ justifyContent: 'center' }}>
                  WhatsApp Us
                </a>
                <a href={`mailto:${CONTACT.email}`} className="service-detail-cta service-detail-cta--secondary" style={{ justifyContent: 'center' }}>
                  <Mail size={16} /> Email Us
                </a>
                <div style={{ borderTop: '1px solid rgba(20,16,13,0.1)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-horizon-600)', fontWeight: 600, marginBottom: '0.5rem' }}>Download Documents</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-cherry)', textDecoration: 'none' }}>
                      <Download size={14} /> Company Profile (PDF)
                    </a>
                    <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-cherry)', textDecoration: 'none' }}>
                      <Download size={14} /> Service Catalogue (PDF)
                    </a>
                    <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-cherry)', textDecoration: 'none' }}>
                      <Download size={14} /> PSARA License (PDF)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    
      <PageLeadSection
        title="Join Our Client Family"
        subtitle="Request a proposal for your site — free consultation."
      />

</main>
  )
}
