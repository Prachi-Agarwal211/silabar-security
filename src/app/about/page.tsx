import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  Shield,
  Award,
  Phone,
  Target,
  Eye,
  Users,
  CheckCircle2,
  MapPin,
  ArrowRight,
} from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { CONTACT } from '@/lib/config'
import Counter from '@/components/animations/Counter'
import { MagneticButton } from '@/components/ui/MagneticButton'
import QueryForm from '@/components/sections/QueryForm'
import { ogMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'About Silbar Security India — ISO & PSARA Certified PAN India Security Agency',
    description:
      'Silbar Security Services India — ISO & PSARA certified PAN India security company. Founded in Jaipur. 4 ISO certifications, 19 state PSARA licenses. Compliance-driven guarding.',
  ...ogMetadata(
    'About Silbar Security India — ISO & PSARA Certified PAN India Security Agency',
    'Silbar Security Services India Pvt. Ltd. — ISO & PSARA certified PAN India security company. Founded in Jaipur. PSARA licensed across 19 states.',
    '/about'
  ),
}

const STATS = [
  { number: 8, suffix: '+', label: 'Years of Excellence' },
  { number: 7000, suffix: '+', label: 'Security Professionals' },
  { number: 200, suffix: '+', label: 'Cities Covered' },
  { number: 19, suffix: '', label: 'PSARA Licensed States' },
]

const VALUES = [
  { title: 'Compliance First', desc: 'Statutory labour, wage, EPF, ESIC and licensing discipline on every deployment.' },
  { title: 'Trained Manpower', desc: 'Background-verified, uniformed, and continuously trained security professionals.' },
  { title: 'Operational Clarity', desc: 'Monthly MIS, site supervisors, and account managers who stay reachable.' },
  { title: 'PAN India Reach', desc: 'Centralized standards with local deployment across tier-1, 2 and 3 cities.' },
]

const CERTIFICATIONS = [
  { name: 'ISO 9001:2015', desc: 'Quality Management System (IAF Accredited)' },
  { name: 'ISO 14001:2015', desc: 'Environmental Management (IAF Accredited)' },
  { name: 'ISO 45001:2018', desc: 'Occupational Health & Safety (IAF Accredited)' },
  { name: 'ISO/IEC 27001:2022', desc: 'Information Security Management (IAF Accredited)' },
  { name: 'PSARA Licensed', desc: '19 states & UTs across India' },
  { name: 'Startup India', desc: 'DPIIT recognized startup' },
  { name: 'MSME Registered', desc: 'Government-recognized enterprise' },
  { name: 'CAPSI Member', desc: 'Central Association of Private Security Industry' },
]

const TIMELINE = [
  {
    year: '2018',
    title: 'The Foundation',
    desc: 'Founded in Jaipur, Rajasthan by Mr. Sonu Singh with a vision to transform private security standards through professionalism, compliance, and discipline.',
  },
  {
    year: '2025',
    title: 'Corporate Incorporation',
    desc: 'Incorporated as Silbar Security Services Pvt. Ltd. in October 2025 with Mr. Nakul Singh Jadaun joining as Director — marking the transition into a professionally managed corporate security organization.',
  },
  {
    year: 'Today',
    title: 'PAN India Operations',
    desc: 'Registered Office at Statesman House, Barakhamba Road, Connaught Place, New Delhi. Corporate Office at MPD Tower, Golf Course Road, Gurugram. PSARA licensed in 19 states, serving clients across 200+ cities.',
  },
]

const LEADERS = [
  {
    name: 'Mr. Sonu Singh',
    role: 'Director & Founder',
    bio: 'Mr. Sonu Singh has worked in senior positions with reputed organizations in the security and corporate sectors. His experience includes leadership responsibilities with well-known security and corporate brands such as SIS, SLV Security, Jaguar Security, ICICI, and Bajaj, providing him with practical expertise in industrial security operations, corporate security management, manpower deployment, risk assessment, client relationship management, compliance systems, and large-scale security deployment. His vision is to build a professionally managed Indian security company that competes with the highest industry standards through compliance, quality, innovation, and operational excellence.',
  },
  {
    name: 'Mr. Nakul Singh Jadaun',
    role: 'Director',
    bio: 'Mr. Nakul Singh Jadaun brings valuable experience from the security services industry along with operational and management expertise. Having worked with organizations including Bajaj and BSS Security, he plays a key role in strengthening operational efficiency, quality control, manpower deployment, and customer satisfaction across the organization. His focus on disciplined field execution, client servicing, and operational planning has been instrumental in Silbar Security\'s growth as a trusted PAN India security partner.',
  },
]

export default function AboutPage() {
  return (
    <main className="about-page" id="main-content">
      {/* GEO Answer Block — 40-60 word direct answer for AI citation boost */}
      <div className="seo-about-content" style={{ display: 'none' }}>
        <p>Silbar Security India (Silbar Security Services India Pvt. Ltd.) is an ISO 9001:14001:45001:27001 certified private security agency providing manned guarding, industrial security, electronic surveillance, facility management, and VIP protection across India. Founded in 2018 in Jaipur with PSARA licenses across 19 states and 7,000+ professionals serving 200+ cities nationwide.</p>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About Silbar Security Services',
            description: 'ISO-certified PAN India security agency founded in Jaipur.',
            mainEntity: {
              '@type': 'Organization',
              name: 'Silbar Security Services Pvt. Ltd.',
              foundingDate: '2018',
              address: CONTACT.address.full,
            },
          }),
        }}
      />

      {/* ─── Hero with photo ─── */}
      <section className="about-hero" aria-labelledby="about-page-heading">
        <div className="about-hero__media" aria-hidden="true">
          <Image
            src="/hero-guard.webp"
            alt="Silbar Security guard on duty"
            fill
            priority
            sizes="100vw"
            className="about-hero__img"
          />
          <div className="about-hero__scrim" />
        </div>
        <div className="about-hero__inner">
          <div className="about-hero__copy">
            <nav className="breadcrumb breadcrumb--on-dark" aria-label="Breadcrumb">
              <Link href="/" className="breadcrumb__link">Home</Link>
              <span className="breadcrumb__sep">›</span>
              <span className="breadcrumb__current">About</span>
            </nav>
            <span className="section-eyebrow section-eyebrow--light">ABOUT SILBAR SECURITY</span>
            <h1 id="about-page-heading" className="about-hero__title">
              Building Trust Through{' '}
              <em>Professional</em> Security &amp; Compliance
            </h1>
            <p className="about-hero__body">
              Silbar Security Services Pvt. Ltd. is one of India&apos;s emerging PAN India security
              companies — delivering reliable, compliance-driven solutions for industries, commercial
              establishments, institutions, and government organizations across 19 states.
            </p>
            <ul className="about-hero__pills" aria-label="Key credentials">
              <li>4 ISO Certified (IAF)</li>
              <li>PSARA Licensed · 19 States</li>
              <li>200+ Cities</li>
              <li>Est. 2018</li>
            </ul>
            <div className="about-hero__ctas">
              <MagneticButton
                as="a"
                href="/contact"
                className="btn-primary btn-primary--on-dark"
                strength={0.2}
              >
                Request a Quote <ArrowRight size={16} aria-hidden="true" />
              </MagneticButton>
              <a href={`tel:${CONTACT.phoneRaw}`} className="btn-secondary btn-secondary--on-dark">
                <Phone size={14} aria-hidden="true" /> {CONTACT.phone}
              </a>
            </div>
          </div>
          <div className="about-hero__aside" aria-hidden="true">
            <div className="about-hero__badge-card">
              <Image src="/logo.webp" alt="Silbar Security Services Logo" width={72} height={72} className="about-hero__logo" />
              <div className="about-hero__badge-meta">
                <strong>Silbar Security</strong>
                <span>Services Pvt. Ltd.</span>
              </div>
              <div className="about-hero__badge-row">
                <Award size={16} /> ISO Certified · Licensed · Insured
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="about-stats" aria-label="Company statistics">
        <div className="about-stats-inner">
          {STATS.map(({ number, suffix, label }) => (
            <div key={label} className="about-stat-item">
              <span className="about-stat__number">
                <Counter to={number} suffix={suffix} />
              </span>
              <span className="about-stat__label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Story + photo mosaic ─── */}
      <section className="about-story" id="our-story">
        <div className="about-story__layout">
          <ScrollReveal className="about-story__text">
            <span className="section-eyebrow section-eyebrow--red">OUR STORY</span>
            <h2 className="section-heading about-story-heading">
              A Journey of <em>Excellence.</em>
            </h2>
            <p className="about-story__body">
              The journey of Silbar Security began in Jaipur, Rajasthan, where Mr. Sonu Singh founded
              the business with a vision to redefine private security standards. Through dedication,
              industry expertise, and uncompromising quality, the organization steadily expanded its
              capabilities and client base across India.
            </p>
            <p className="about-story__body">
              In October 2025, the business was incorporated as Silbar Security Services Pvt. Ltd.
              in partnership with Mr. Nakul Singh Jadaun — marking a significant milestone in its
              transformation into a professionally managed corporate security organization with
              PAN India ambition.
            </p>
            <div className="about-story__offices">
              {[...CONTACT.officeLocations].map((office) => (
                <div key={office.city} className="about-story__office">
                  <MapPin size={16} aria-hidden="true" />
                  <div>
                    <strong>{office.badge}</strong>
                    <span>{office.address}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div className="about-story__mosaic" aria-hidden="true">
            <div className="about-story__mosaic-main">
              <Image
                src="/why-silbar-bg.webp"
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="about-story__mosaic-img"
              />
              <div className="about-story__mosaic-caption">
                <span>8+</span>
                <small>Years of protecting India</small>
              </div>
            </div>
            <div className="about-story__mosaic-side">
              <div className="about-story__mosaic-tile about-story__mosaic-tile--gold">
                <strong>7,000+</strong>
                <span>Trained professionals</span>
              </div>
              <div className="about-story__mosaic-tile about-story__mosaic-tile--photo">
                <Image
                  src="/industries-bg.webp"
                  alt=""
                  fill
                  sizes="240px"
                  className="about-story__mosaic-img"
                />
                <span>Multi-industry deployments</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Timeline ─── */}
      <section className="about-timeline" aria-labelledby="timeline-heading">
        <div className="about-timeline__inner">
          <ScrollReveal>
            <span className="section-eyebrow section-eyebrow--light">MILESTONES</span>
            <h2 id="timeline-heading" className="section-heading section-heading--on-dark about-timeline__title">
              How We <em>Grew.</em>
            </h2>
          </ScrollReveal>
          <div className="timeline-container">
            {TIMELINE.map((item, index) => (
              <ScrollReveal key={item.year} delay={index * 0.12} direction="left">
                <div className="timeline-item">
                  <div className="timeline-item__year">{item.year}</div>
                  <div className="timeline-item__content">
                    <h3 className="timeline-item__title">{item.title}</h3>
                    <p className="timeline-item__desc">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Mission / Vision ─── */}
      <section className="about-mv" aria-labelledby="mv-heading">
        <div className="about-mv__inner">
          <ScrollReveal className="about-mv__header">
            <span className="section-eyebrow section-eyebrow--red">PURPOSE</span>
            <h2 id="mv-heading" className="section-heading">
              Mission &amp; <em>Vision.</em>
            </h2>
          </ScrollReveal>
          <div className="about-mv__grid">
            <ScrollReveal className="about-mv__card">
              <div className="about-mv__icon">
                <Target size={28} aria-hidden="true" />
              </div>
              <h3>Our Mission</h3>
              <p>
                To provide reliable, technology-enabled, and compliance-focused security services that
                protect people, property, and business operations across India through highly trained
                professionals, ethical business practices, transparent processes, continuous improvement,
                and exceptional customer service.
              </p>
            </ScrollReveal>
            <ScrollReveal className="about-mv__card about-mv__card--accent" delay={0.12}>
              <div className="about-mv__icon">
                <Eye size={28} aria-hidden="true" />
              </div>
              <h3>Our Vision</h3>
              <p>
                To become one of India&apos;s most respected and trusted Security Guard Companies,
                recognized for professionalism, compliance, innovation, operational excellence,
                and long-term customer relationships while setting new benchmarks for the
                private security industry.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className="about-values" aria-labelledby="values-heading">
        <div className="about-values__inner">
          <ScrollReveal>
            <span className="section-eyebrow section-eyebrow--red">WHAT WE STAND FOR</span>
            <h2 id="values-heading" className="section-heading">
              Principles That <em>Guide</em> Every Deployment.
            </h2>
          </ScrollReveal>
          <div className="about-values__grid">
            {VALUES.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.08} className="about-values__card">
                <CheckCircle2 size={22} className="about-values__check" aria-hidden="true" />
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Leadership ─── */}
      <section className="about-leadership" id="leadership" aria-labelledby="leadership-heading">
        <div className="about-leadership__bg" aria-hidden="true">
          <Image src="/why-silbar-bg.webp" alt="" fill sizes="100vw" className="about-leadership__bg-img" />
        </div>
        <div className="about-leadership__inner">
          <ScrollReveal>
            <span className="section-eyebrow section-eyebrow--light">LEADERSHIP</span>
            <h2 id="leadership-heading" className="section-heading section-heading--on-dark">
              Experienced <em>Leadership.</em>
            </h2>
          </ScrollReveal>
          <div className="about-leadership__grid">
            {LEADERS.map((leader, i) => (
              <ScrollReveal key={leader.name} delay={i * 0.12} className="about-leader-card">
                <div className="about-leader-card__avatar" aria-hidden="true">
                  <Users size={32} />
                </div>
                <h3>{leader.name}</h3>
                <p className="about-leader-card__role">{leader.role}</p>
                <p className="about-leader-card__bio">{leader.bio}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Certifications ─── */}
      <section className="about-certs" aria-labelledby="certs-heading">
        <div className="about-certs__inner">
          <ScrollReveal>
            <span className="section-eyebrow section-eyebrow--red">TRUST &amp; COMPLIANCE</span>
            <h2 id="certs-heading" className="section-heading about-certs__title">
              Certified. Compliant. <em>Accountable.</em>
            </h2>
          </ScrollReveal>
          <div className="about-certs-grid">
            {CERTIFICATIONS.map((cert, i) => (
              <ScrollReveal key={cert.name} delay={i * 0.05} className="about-cert-card">
                <div className="about-cert-card__badge">
                  <Award size={18} aria-hidden="true" />
                  {cert.name}
                </div>
                <p className="about-cert-card__desc">{cert.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Compliance guarantee ─── */}
      <section className="about-guarantee" aria-labelledby="guarantee-heading">
        <div className="about-guarantee__inner">
          <Shield size={48} className="about-guarantee__icon" aria-hidden="true" />
          <h2 id="guarantee-heading">Our Compliance Assurance</h2>
          <p>
            If a compliance penalty is imposed solely due to our failure to fulfil contractual
            compliance responsibilities, we stand by our commitment and take responsibility in
            accordance with our service agreement. This reflects our accountability, transparency,
            and long-term partnership approach with every client.
          </p>
        </div>
      </section>

      {/* ─── Commitments section ─── */}
      <section className="section-pad" aria-labelledby="commitments-heading">
        <div className="shell" style={{ maxWidth: '900px' }}>
          <ScrollReveal>
            <span className="section-eyebrow section-eyebrow--red">OUR COMMITMENTS</span>
            <h2 id="commitments-heading" className="section-heading" style={{ marginBottom: '1rem' }}>
              What We Stand <em>For.</em>
            </h2>
            <div style={{ fontFamily: 'var(--font-body)', lineHeight: 1.8, color: 'var(--color-horizon-600)' }}>
              <p style={{ marginBottom: '1rem' }}>
                Silbar Security is built on a foundation of ethical business practices, statutory compliance,
                and client-centric service delivery. We believe that security is not just about deploying
                guards — it is about building systems, processes, and relationships that protect our clients&apos;
                people, assets, and reputation every single day.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Every decision we make — from the guards we recruit to the equipment we deploy, from the
                training we deliver to the reports we share — is guided by our core philosophy: compliance
                is not optional, quality is not negotiable, and client partnership is not transactional.
                This philosophy has earned us the trust of 500+ businesses across 19 states, and it
                continues to drive our growth as one of India&apos;s emerging security companies.
              </p>
              <p>
                We are equally committed to our security personnel — providing them with fair wages,
                statutory benefits (EPF, ESIC), proper training, uniforms, equipment, and career
                growth opportunities. A motivated, well-treated guard delivers better security.
                It is that simple.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section-pad brand-rail" aria-labelledby="about-faq-title">
        <div className="shell" style={{ maxWidth: '900px' }}>
          <ScrollReveal>
            <span className="section-eyebrow section-eyebrow--red">FAQ</span>
            <h2 id="about-faq-title" className="section-heading" style={{ marginBottom: '0.75rem' }}>
              Questions About <em>Silbar Security.</em>
            </h2>
            <p className="section-subtitle" style={{ marginBottom: '2.5rem' }}>
              Everything you need to know about our company, credentials, and approach.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { q: 'Is Silbar Security Services a registered company?', a: 'Yes. Silbar Security Services Pvt. Ltd. is registered under the Companies Act, 2013 (CIN: U80210RJ2025PTC092323). The company is also registered with Startup India (DPIIT recognized), MSME, GST, EPF, ESIC, and holds PSARA licenses across 19 states.' },
                { q: 'Where is Silbar Security headquartered?', a: 'Our Registered Office is at Statesman House, Barakhamba Road, Connaught Place, New Delhi — 110001. Our Corporate Office is at MPD Tower, Golf Course Road, Sector 43, Gurugram, Haryana — 122002.' },
                { q: 'Who are the directors of Silbar Security?', a: 'Silbar Security Services Pvt. Ltd. is led by Mr. Sonu Singh (Director & Founder) and Mr. Nakul Singh Jadaun (Director). Both bring extensive industry experience from senior roles with leading security and corporate organizations.' },
                { q: 'What certifications does Silbar Security hold?', a: 'We hold 4 ISO certifications (9001:2015, 14001:2015, 45001:2018, 27001) all IAF accredited, PSARA licenses across 19 states, CAPSI membership, and registrations with Startup India, MSME, EPF, ESIC, and GST.' },
                { q: 'How many clients does Silbar Security serve?', a: 'We are trusted by 500+ businesses across 19 states and 200+ cities in India, serving manufacturing, healthcare, banking, IT, retail, education, hospitality, government, and residential sectors.' },
                { q: 'Does Silbar provide security only in North India?', a: 'No. While we started in Rajasthan, we now operate across 19 states covering North, West, Central, East, and South India. Our PAN India presence includes major metros and tier-2/3 cities alike.' },
              ].map((faq) => (
                <details key={faq.q} className="service-detail-faq-item">
                  <summary className="service-detail-faq-q">{faq.q}</summary>
                  <p className="service-detail-faq-a">{faq.a}</p>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Form ─── */}
      <section className="about-form-section" aria-label="Contact Silbar Security">
        <QueryForm
          title="Partner with Silbar Security"
          subtitle="Tell us about your facility — our consultants respond within 2 business hours."
        />
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="about-cta-section">
        <div className="about-cta-inner">
          <span className="section-eyebrow section-eyebrow--light">PAN INDIA OPERATIONS</span>
          <h2 className="section-heading section-heading--on-dark">
            Ready to Work with India&apos;s <em>Trusted</em> Security Force?
          </h2>
          <p className="about-cta__sub">
            Registered Office: Statesman House, Barakhamba Road, Connaught Place, New Delhi.
            Corporate Office: MPD Tower, Golf Course Road, Sector 43, Gurugram.
            Serving clients across 19 states with 4 ISO certifications.
          </p>
          <div className="about-cta__actions">
            <MagneticButton
              as="a"
              href={`tel:${CONTACT.phoneRaw}`}
              className="btn-primary btn-primary--on-dark"
              strength={0.2}
            >
              <Phone size={14} aria-hidden="true" /> Call Now
            </MagneticButton>
            <MagneticButton
              as="a"
              href={CONTACT.whatsapp.url}
              className="btn-secondary btn-secondary--on-dark"
              target="_blank"
              rel="noopener noreferrer"
              strength={0.2}
            >
              WhatsApp Us
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  )
}
