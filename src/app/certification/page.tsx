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
  title: 'Certifications — ISO, PSARA & Regulatory Compliance',
    description:
      'Certifications of Silbar Security Services Pvt. Ltd. — 4 ISO (IAF accredited), PSARA licenses across 19 states, Startup India, MSME, CAPSI member.',
    ...ogMetadata(
      'Certifications — ISO, PSARA & Regulatory Compliance',
      'Certifications of Silbar Security Services Pvt. Ltd. — 4 ISO (IAF accredited), PSARA licenses across 19 states, Startup India, MSME, CAPSI member.',
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
            <div className="cert-section__body cert-section__body--light" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '48rem' }}>
              <p>
                Silbar Security Services Pvt. Ltd. operates in strict compliance with the Private Security Agencies
                (Regulation) Act, 2005 — commonly known as PSARA. PSARA is the central legislation that requires every
                private security agency in India to obtain a licence from the Controlling Authority of each state or
                union territory where it deploys security personnel. Operating without a valid PSARA licence is a
                punishable offence, and clients who engage unlicensed agencies can face serious legal and commercial
                exposure if an incident occurs on their premises. The Act also sets expectations around agency
                ownership, character verification of directors and guards, training standards, and the conditions
                under which a licence may be suspended or cancelled.
              </p>
              <p>
                Our multi-state PSARA licensing enables Silbar Security Services Pvt. Ltd. to provide standardised
                security services across India — from Registered Office operations in New Delhi and Corporate Office
                coordination in Gurugram, to regional offices in Jaipur, Noida, and Ahmedabad, and client sites in
                more than 200 cities. Each state licence is maintained with the documentation, police verification
                processes, and training standards required by that state&apos;s Controlling Authority (typically the
                Home Department or the office of the Commissioner of Police). Because security deployment is a
                state-subject matter under PSARA, a licence valid in one state does not automatically authorise
                deployment in another — which is why multi-state clients should always verify coverage for every
                site location before mobilisation.
              </p>
              <p>
                Under PSARA and related Bureau of Police Research &amp; Development (BPR&amp;D) guidelines, security
                personnel must complete prescribed training covering legal awareness, access control, fire safety,
                first aid, report writing, and professional conduct. Armed personnel require additional weapons
                training and valid arms licences where applicable. Silbar Security Services Pvt. Ltd. inducts guards
                through structured training and site-specific briefing so that every post is manned by police-verified,
                duty-ready professionals — not casual manpower hired without process. Training refreshers and
                supervisor checks keep service quality consistent after the initial mobilisation window.
              </p>
              <p>
                For clients, PSARA compliance is not a paperwork formality. It is the foundation of liability
                protection, insurance validity, and audit readiness. When you hire Silbar Security Services Pvt. Ltd.,
                you receive a partner that can share licence credentials for the state of deployment, maintain EPF and
                ESIC for eligible employees, follow applicable minimum wage notifications, and supply monthly
                attendance and statutory documentation packs for principal-employer audits. This is especially
                important for factories, hospitals, banks, IT parks, warehouses, residential societies, and government
                or PSU facilities that undergo periodic compliance reviews by internal audit teams, insurers, or
                statutory inspectors.
              </p>
              <p>
                A complete PSARA-ready engagement with Silbar Security Services Pvt. Ltd. typically covers five
                practical layers: (1) valid agency licence for the deployment state; (2) police-verified and
                background-checked personnel with identity documentation on file; (3) training and site induction
                records aligned to BPR&amp;D / Controlling Authority expectations; (4) wage and statutory structure
                consistent with state minimum wage notifications and labour law for eligible employees; and
                (5) operational reporting — attendance, incident logs, supervisor visits, and escalation matrices —
                that principal employers can produce during audits. We design commercials and delivery SOPs so these
                layers are visible, not buried in fine print.
              </p>
              <p>
                How should a client verify an agency before signing? First, request a copy of the PSARA licence and
                confirm that the licence holder name matches the contracting entity — for us, Silbar Security
                Services Pvt. Ltd. Second, confirm the licence covers the specific state where guards will stand post.
                Third, ask how guards are recruited, verified, trained, and replaced when attrition occurs. Fourth,
                review sample monthly compliance packs (attendance, PF/ESIC challans where applicable, wage
                registers). Fifth, check Google Business Profile locations and office presence — we maintain mapped
                offices in New Delhi, Gurugram, Jaipur, Noida, and Ahmedabad so clients can validate real operating
                footprints rather than only a virtual address.
              </p>
              <p>
                Silbar Security Services Pvt. Ltd. also aligns PSARA discipline with ISO process standards
                (ISO 9001:2015 quality, ISO 14001:2015 environment, ISO 45001:2018 occupational health &amp; safety,
                and ISO/IEC 27001:2022 information security). The combination matters: PSARA establishes legal
                authority to deploy private security; ISO certifications establish how quality, safety, and
                information handling are controlled day to day. Clients get both the licence backbone and the
                management-system backbone — useful for multi-location contracts, vendor scorecards, and enterprise
                procurement evaluations.
              </p>
              <p>
                Our PSARA coverage currently includes the following 19 states and union territories, with additional
                licences under process as part of our PAN India expansion strategy. Expansion is planned against
                client demand corridors so that new state licences open alongside real deployment capacity, not empty
                paper coverage. For PSARA licence verification, multi-state deployment queries, or documentation
                support, contact Silbar Security Services Pvt. Ltd. on the dedicated PSARA line{' '}
                <a href={`tel:${CONTACT.psaraPhoneRaw}`} style={{ color: 'inherit', fontWeight: 700 }}>{CONTACT.psaraPhone}</a>,
                or the main business line{' '}
                <a href={`tel:${CONTACT.phoneRaw}`} style={{ color: 'inherit', fontWeight: 700 }}>{CONTACT.phone}</a>,
                or email {CONTACT.email}.
              </p>
              <p>
                Whether you need a single society desk in Jaipur, industrial gate security in Noida, corporate
                coverage in Gurugram, registered-office coordination from New Delhi, or multi-plant security across
                Gujarat from Ahmedabad, Silbar Security Services Pvt. Ltd. structures deployments under valid PSARA
                authority for the state of operation. Ask for the licence reference applicable to your site at the
                proposal stage — we believe transparent compliance is a competitive advantage, not a hidden cost.
                Share your facility type, headcount, shifts, and states of operation, and our team will respond with
                a scoped proposal, mobilisation timeline, and the compliance documents your procurement or legal
                team typically needs to clear vendor onboarding.
              </p>
            </div>
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
              Additional state licenses under process as part of our PAN India expansion strategy. PSARA enquiries:{' '}
              {CONTACT.psaraPhone} · General enquiries: {CONTACT.phone}
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
              At Silbar Security Services Pvt. Ltd., compliance is not merely a requirement — it is our identity. Every registration and certification represents our commitment to ethical business practices.
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
