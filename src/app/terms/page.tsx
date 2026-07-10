import type { Metadata } from 'next'
import Link from 'next/link'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import PageHero from '@/components/layout/PageHero'
import { CONTACT } from '@/lib/config'
import { Phone } from 'lucide-react'
import { ogMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'Terms of Use | Silbar Security Services',
  description: 'Terms of Use for Silbar Security Services Pvt. Ltd. Please read these terms carefully before using our website or services.',
  ...ogMetadata('Terms of Use | Silbar Security Services', 'Terms of Use for Silbar Security Services Pvt. Ltd. Please read these terms carefully before using our website or services.', '/terms'),
}

const sections = [
  {
    title: 'Acceptance of Terms',
    content: 'By accessing or using the Silbar Security Services website (silbarsecurity.in), you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you must not use our website or services.',
  },
  {
    title: 'Services Description',
    content: 'Silbar Security Services Pvt. Ltd. provides private security services including manned guarding, electronic surveillance, facility management, event security, and related security solutions. All services are delivered in compliance with the Private Security Agencies Regulation Act (PSARA) 2005 and applicable state laws. Service scope, duration, and pricing are defined in individual service agreements.',
  },
  {
    title: 'Client Obligations',
    content: 'Clients agree to: provide accurate and complete information for risk assessment, ensure safe working conditions for deployed personnel, allow access to premises for security audits and inspections, comply with statutory requirements for contract labour, and make timely payments as per agreed terms. Failure to meet these obligations may result in service suspension.',
  },
  {
    title: 'Intellectual Property',
    content: 'All content on this website — including text, graphics, logos, images, and software — is the property of Silbar Security Services Pvt. Ltd. and is protected by Indian copyright laws. You may not reproduce, distribute, modify, or republish any content without prior written permission.',
  },
  {
    title: 'Limitation of Liability',
    content: 'Silbar Security Services Pvt. Ltd. shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our website or services. Our total liability for any claim shall not exceed the total amount paid by the client for the specific service giving rise to the claim. We maintain comprehensive insurance coverage as required by PSARA regulations.',
  },
  {
    title: 'Indemnification',
    content: 'You agree to indemnify and hold harmless Silbar Security Services Pvt. Ltd., its directors, employees, and agents from any claims, damages, or expenses arising from your use of our website, breach of these terms, or violation of applicable laws.',
  },
  {
    title: 'Governing Law',
    content: 'These Terms of Use are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Jaipur, Rajasthan.',
  },
  {
    title: 'Service Agreements',
    content: 'For clients who enter into service agreements with Silbar Security: the specific terms of your service agreement (including scope, pricing, duration, and termination conditions) will supplement these Terms of Use. In case of any conflict, the specific service agreement shall prevail.',
  },
  {
    title: 'Termination',
    content: 'We reserve the right to terminate or suspend access to our website or services at any time, without prior notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties.',
  },
  {
    title: 'Changes to Terms',
    content: 'We reserve the right to modify these Terms of Use at any time. Changes become effective immediately upon posting. Your continued use of the website after changes constitutes acceptance of the modified terms. We recommend reviewing this page periodically.',
  },
  {
    title: 'Contact',
    content: 'For questions about these Terms of Use, contact us at: ' + CONTACT.email + ', ' + CONTACT.phone + ', or 208, 2nd Floor, Samod Tower, Sansar Chand Road, Jaipur — 302001, Rajasthan, India.',
  },
]

export default function TermsPage() {
  return (
    <main className="legal-page" id="main-content">
      <PageHero
        eyebrow="LEGAL"
        title={
          <>
            <SplitTextReveal text="TERMS OF" />
            <br />
            <span className="page-hero-title--outline">
              <SplitTextReveal text="USE" delay={0.2} />
            </span>
          </>
        }
        subtitle={<>Last updated: July 2026. Please read carefully.</>}
        size="compact"
        topContent={
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Terms of Use</span>
          </nav>
        }
      />

      <section className="legal-content">
        {sections.map(({ title, content }) => (
          <div key={title}>
            <h2>{title}</h2>
            <p>{content}</p>
          </div>
        ))}
      </section>

      <section className="service-detail-bottom-cta">
        <h2 className="service-detail-bottom-cta__title">Have Questions?</h2>
        <p className="service-detail-bottom-cta__sub">
          Call us for clarification on any of these terms.
        </p>
        <div className="service-detail-ctas service-detail-ctas--centered">
          <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--primary">
            <Phone size={16} /> Call {CONTACT.phone}
          </a>
          <a href={`mailto:${CONTACT.email}`} className="service-detail-cta service-detail-cta--secondary">
            Email Us
          </a>
        </div>
      </section>
    </main>
  )
}
