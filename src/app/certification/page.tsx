import type { Metadata } from 'next'
import Link from 'next/link'
import { Award, Shield, CheckCircle, Phone, FileCheck, ScrollText } from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import PageHero from '@/components/layout/PageHero'
import QueryForm from '@/components/sections/QueryForm'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'Certifications — ISO, PSARA & Regulatory Compliance | Silbar Security',
  description:
    'View all certifications of Silbar Security Services Pvt. Ltd. — 4 ISO certifications (IAF accredited), PSARA licenses across 19 states, Startup India, MSME, CAPSI member, and more.',
  ...ogMetadata(
    'Certifications — ISO, PSARA & Regulatory Compliance | Silbar Security',
    'View all certifications of Silbar Security Services Pvt. Ltd. — 4 ISO certifications (IAF accredited), PSARA licenses across 19 states.',
    '/certification'
  ),
}

const ISO_CERTS = [
  { name: 'ISO 9001:2015', desc: 'Quality Management System — IAF Accredited', detail: 'Demonstrates our ability to consistently provide services that meet customer and regulatory requirements through effective quality management processes.' },
  { name: 'ISO 14001:2015', desc: 'Environmental Management System — IAF Accredited', detail: 'Reflects our commitment to environmental responsibility, sustainable operations, and minimizing our ecological footprint across all deployments.' },
  { name: 'ISO 45001:2018', desc: 'Occupational Health & Safety — IAF Accredited', detail: 'Ensures a safe working environment for our 7,000+ professionals through systematic hazard identification, risk assessment, and safety protocols.' },
  { name: 'ISO/IEC 27001:2022', desc: 'Information Security Management — IAF Accredited', detail: 'Guarantees the security of client data, confidential information, and operational records through robust information security controls.' },
]

const REGULATORY = [
  { name: 'PSARA Licensed', desc: '19 States & Union Territories', detail: 'Fully compliant with the Private Security Agencies Regulation Act (PSARA) 2005 across 19 states with active expansion underway.' },
  { name: 'Startup India', desc: 'DPIIT Recognized', detail: 'Recognized by the Department for Promotion of Industry and Internal Trade under the Startup India initiative.' },
  { name: 'MSME Registered', desc: 'Government-Recognized Enterprise', detail: 'Registered as a Micro, Small & Medium Enterprise under the MSME Development Act.' },
  { name: 'MCA Registered', desc: 'Ministry of Corporate Affairs', detail: 'Incorporated as Silbar Security Services Pvt. Ltd. under the Companies Act, compliant with all corporate governance requirements.' },
  { name: 'GST Registered', desc: 'Tax Compliant', detail: 'Registered under Goods and Services Tax with full compliance on all applicable tax filings.' },
  { name: 'EPF & ESIC Compliant', desc: 'Full Statutory Coverage', detail: '100% compliant with Employees\' Provident Fund and Employees\' State Insurance regulations for all eligible employees.' },
  { name: 'CAPSI Member', desc: 'Central Association of Private Security Industry', detail: 'Proud member of CAPSI, demonstrating our commitment to professional standards and ethical business practices in the private security industry.' },
]

const PSARA_STATES = [
  'Rajasthan', 'Delhi', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh',
  'Gujarat', 'Punjab', 'Chandigarh', 'Uttarakhand', 'Maharashtra',
  'Chhattisgarh', 'Odisha', 'Jharkhand', 'West Bengal', 'Karnataka',
  'Tamil Nadu', 'Telangana', 'Andhra Pradesh', 'Bihar'
]

export default function CertificationPage() {
  return (
    <main className="certification-page" id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Certifications — Silbar Security Services',
            description: 'View all certifications of Silbar Security Services Pvt. Ltd.',
          }),
        }}
      />

      <PageHero
        eyebrow="CERTIFICATIONS & COMPLIANCE"
        title={
          <>
            <SplitTextReveal text="Certified." />
            <br />
            <span className="page-hero-title--outline">
              <SplitTextReveal text="Compliant. Accountable." delay={0.2} />
            </span>
          </>
        }
        subtitle="Silbar Security Services Pvt. Ltd. holds 4 ISO certifications (IAF accredited), PSARA licenses across 19 states, and full statutory compliance — making us a trusted partner for organizations seeking professionally managed security services."
        size="tall"
        topContent={
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Certifications</span>
          </nav>
        }
      />

      {/* ISO Certifications */}
      <section className="cert-section--light">
        <div className="cert-section__inner">
          <ScrollReveal>
            <span className="section-eyebrow section-eyebrow--red">ISO CERTIFICATIONS</span>
            <h2 className="section-heading cert-heading-mb">
              4 International Standards. <em>IAF Accredited.</em>
            </h2>
            <p className="cert-section__body">
              Our ISO certifications are accredited by the International Accreditation Forum (IAF), ensuring global recognition and credibility. Each certification reflects our commitment to excellence in quality, environment, safety, and information security.
            </p>
          </ScrollReveal>

          <div className="cert-card-grid">
            {ISO_CERTS.map((cert, i) => (
              <ScrollReveal key={cert.name} delay={i * 0.08}>
                <div className="cert-card hover-lift">
                  <div className="cert-card__icon">
                    <Award size={24} />
                  </div>
                  <h3 className="cert-card__title">{cert.name}</h3>
                  <p className="cert-card__sub">{cert.desc}</p>
                  <p className="cert-card__detail">{cert.detail}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PSARA Section */}
      <section className="cert-section--dark">
        <div className="cert-section__inner">
          <ScrollReveal>
            <span className="section-eyebrow section-eyebrow--light">PSARA COMPLIANCE</span>
            <h2 className="section-heading section-heading--on-dark cert-heading-mb">
              Licensed Across <em>19 States.</em>
            </h2>
            <p className="cert-section__body cert-section__body--light">
              We operate in strict compliance with the Private Security Agencies Regulation Act (PSARA) 2005. Our multi-state licensing enables us to provide standardized security services across India.
            </p>
          </ScrollReveal>

          <div className="cert-pill-grid">
            {PSARA_STATES.map((state, i) => (
              <ScrollReveal key={state} delay={i * 0.03}>
                <div className="cert-pill hover-lift">
                  <CheckCircle size={12} className="cert-pill__icon" />
                  {state}
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <p className="cert-note">
              Additional state licenses under process as part of our PAN India expansion strategy.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Regulatory Registrations */}
      <section className="cert-section--light">
        <div className="cert-section__inner">
          <ScrollReveal>
            <span className="section-eyebrow section-eyebrow--red">REGULATORY COMPLIANCE</span>
            <h2 className="section-heading cert-heading-mb">
              Fully Compliant. <em>Transparent.</em>
            </h2>
            <p className="cert-section__body">
              At Silbar Security, compliance is not merely a requirement — it is our identity. Every registration and certification represents our commitment to ethical business practices.
            </p>
          </ScrollReveal>

          <div className="cert-reg-grid">
            {REGULATORY.map((item, i) => (
              <ScrollReveal key={item.name} delay={i * 0.05}>
                <div className="cert-reg-card hover-lift">
                  <div className="cert-reg-card__icon">
                    <FileCheck size={20} />
                  </div>
                  <div>
                    <h3 className="cert-reg-card__title">{item.name}</h3>
                    <p className="cert-reg-card__sub">{item.desc}</p>
                    <p className="cert-reg-card__detail">{item.detail}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Assurance */}
      <section className="cert-section--cherry">
        <div className="cert-section__inner--narrow">
          <ScrollReveal>
            <Shield size={48} className="cert-assurance-icon" />
            <h2 className="cert-assurance-title">Our Compliance Assurance</h2>
            <p className="cert-assurance-text">
              If a compliance penalty is imposed solely due to our failure to fulfil contractual compliance responsibilities, we stand by our commitment and take responsibility in accordance with our service agreement. This reflects our accountability and long-term partnership approach.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Certificate Upload Placeholder */}
      <section className="cert-section--light">
        <div className="cert-section__inner--narrow">
          <ScrollReveal>
            <span className="section-eyebrow section-eyebrow--red">CERTIFICATE GALLERY</span>
            <h2 className="section-heading cert-heading-mb">
              Our <em>Certificates.</em>
            </h2>
            <p className="cert-section__body" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
              Download and view our official certificates. New certificates will be added here as they are received.
            </p>
            <div className="cert-gallery-grid">
              {['ISO 9001:2015', 'ISO 14001:2015', 'ISO 45001:2018', 'ISO/IEC 27001:2022', 'PSARA License', 'Startup India'].map((cert) => (
                <div key={cert} className="cert-gallery-item hover-lift">
                  <ScrollText size={28} className="cert-gallery-item__icon" />
                  <p className="cert-gallery-item__title">{cert}</p>
                  <p className="cert-gallery-item__status">Certificate coming soon</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="cert-cta-section">
        <div className="cert-cta__inner">
          <h2 className="section-heading section-heading--on-dark cert-heading-mb">
            Work with a <em>Certified</em> Security Partner
          </h2>
          <p className="cert-cta__text">
            Choose Silbar Security for professionally managed, compliance-driven security services across India.
          </p>
          <div className="cert-cta__actions">
            <a href={`tel:${CONTACT.phoneRaw}`} className="btn-primary btn-primary--on-dark">
              <Phone size={16} /> Call {CONTACT.phone}
            </a>
            <Link href="/contact" className="btn-secondary btn-secondary--on-dark">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      <QueryForm />
    </main>
  )
}
