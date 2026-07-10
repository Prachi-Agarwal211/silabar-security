import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/animations/ScrollReveal'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import { CONTACT } from '@/lib/config'
import { Phone } from 'lucide-react'
import { ogMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'Privacy Policy | Silbar Security Services',
  description: 'Privacy Policy for Silbar Security Services Pvt. Ltd. Learn how we collect, use, and protect your personal information.',
  ...ogMetadata('Privacy Policy | Silbar Security Services', 'Privacy Policy for Silbar Security Services Pvt. Ltd. Learn how we collect, use, and protect your personal information.', '/privacy-policy'),
}

const sections = [
  {
    title: 'Introduction',
    content: 'Silbar Security Services Pvt. Ltd. ("Silbar Security", "we", "us", "our") values your privacy. This Privacy Policy describes how we collect, use, store, and protect your personal information when you visit our website, contact us, or use our services. By using our website or services, you consent to the practices described in this policy.',
  },
  {
    title: 'Information We Collect',
    content: 'We collect information you provide directly: name, email address, phone number, company name, and message when you fill out our contact form or request a quote. We also automatically collect certain information when you visit our website including IP address, browser type, pages visited, time and date of visit, and referring website. If you apply for a position through our Careers page, we collect your resume, work history, and contact details.',
  },
  {
    title: 'How We Use Your Information',
    content: 'We use your information to respond to your inquiries and provide security quotes, to communicate with you about our services, to process job applications, to improve our website and services, to comply with legal obligations, and to send relevant service updates with your consent.',
  },
  {
    title: 'Information Sharing',
    content: 'We do not sell your personal information. We may share your information with: service providers who help us operate our website and business (analytics, hosting, email), law enforcement or government authorities when required by law, and professional advisors (lawyers, accountants) in the course of business operations. Any third-party service providers are contractually bound to protect your data and use it only for the purposes we specify.',
  },
  {
    title: 'Data Security',
    content: 'We implement industry-standard security measures to protect your personal information including encryption (SSL/TLS) for data transmission, secure server infrastructure, access controls limiting data access to authorized personnel only, and regular security audits. However, no method of electronic storage or transmission is 100% secure. We cannot guarantee absolute security but strive to protect your data to the best of our ability.',
  },
  {
    title: 'Data Retention',
    content: 'We retain your personal information for as long as necessary to fulfill the purposes described in this policy, or as required by applicable law. Contact form inquiries are retained for 2 years. Job applicant data is retained for 1 year. Financial records are retained as required by Indian tax and corporate laws (typically 8 years).',
  },
  {
    title: 'Your Rights',
    content: 'You have the right to: access your personal information held by us, request correction of inaccurate or incomplete data, request deletion of your data (subject to legal retention requirements), withdraw consent for marketing communications at any time, and request a copy of your data in a portable format. To exercise any of these rights, contact us at ' + CONTACT.email + '.',
  },
  {
    title: 'Cookies',
    content: 'Our website uses cookies and similar tracking technologies to improve user experience, analyze site traffic, and understand where our visitors come from. You can control cookie preferences through your browser settings. Disabling cookies may affect certain features of our website. We use Google Analytics to understand website traffic patterns — Google\'s privacy policy applies to data collected through their services.',
  },
  {
    title: 'Third-Party Links',
    content: 'Our website may contain links to third-party websites (e.g., WhatsApp, Google Maps). We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any personal information.',
  },
  {
    title: 'Changes to This Policy',
    content: 'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. Significant changes will be notified via email or a prominent notice on our website.',
  },
  {
    title: 'Contact Us',
    content: 'For questions about this Privacy Policy or to exercise your data rights, contact us at: ' + CONTACT.email + ', ' + CONTACT.phone + ', or 208, 2nd Floor, Samod Tower, Sansar Chand Road, Jaipur — 302001, Rajasthan, India.',
  },
]

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page" id="main-content">
      <section className="page-hero page-hero--short">
        <ScrollReveal>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Privacy Policy</span>
          </nav>
          <span className="contact-eyebrow">LEGAL</span>
          <h1 className="contact-title">
            <SplitTextReveal text="PRIVACY" />
            <br />
            <span className="contact-title--outline">
              <SplitTextReveal text="POLICY" delay={0.2} />
            </span>
          </h1>
          <p className="contact-subtitle">
            Last updated: July 2026. Your privacy matters to us.
          </p>
        </ScrollReveal>
      </section>

      <section className="legal-content">
        {sections.map(({ title, content }) => (
          <div key={title}>
            <h2>{title}</h2>
            <p>{content}</p>
          </div>
        ))}
      </section>

      <section className="service-detail-bottom-cta">
        <h2 className="service-detail-bottom-cta__title">Have Questions About Your Data?</h2>
        <p className="service-detail-bottom-cta__sub">
          Contact us anytime — we are here to help.
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
