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
  Building2,
  ArrowRight,
} from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import Counter from '@/components/animations/Counter'
import { MagneticButton } from '@/components/ui/MagneticButton'
import QueryForm from '@/components/sections/QueryForm'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'About Silbar Security — ISO 9001:2015 Certified Security Agency',
  description:
    'Silbar Security Services Pvt. Ltd. — ISO certified PAN India security company. Founded in Jaipur. 7,000+ professionals. Compliance-driven guarding across India.',
  ...ogMetadata(
    'About Silbar Security — ISO 9001:2015 Certified Security Agency',
    'Silbar Security Services Pvt. Ltd. — ISO certified PAN India security company. Founded in Jaipur. 7,000+ professionals.',
    '/about'
  ),
}

const STATS = [
  { number: 22, suffix: '+', label: 'Years of Excellence' },
  { number: 7000, suffix: '+', label: 'Security Professionals' },
  { number: 200, suffix: '+', label: 'Cities Covered' },
  { number: 500, suffix: '+', label: 'Enterprise Clients' },
]

const VALUES = [
  { title: 'Compliance First', desc: 'Statutory labour, wage, EPF, ESIC and licensing discipline on every deployment.' },
  { title: 'Trained Manpower', desc: 'Background-verified, uniformed, and continuously trained security professionals.' },
  { title: 'Operational Clarity', desc: 'Monthly MIS, site supervisors, and account managers who stay reachable.' },
  { title: 'PAN India Reach', desc: 'Centralized standards with local deployment across tier-1, 2 and 3 cities.' },
]

const CERTIFICATIONS = [
  { name: 'ISO 9001:2015', desc: 'Quality Management System' },
  { name: 'ISO 14001:2015', desc: 'Environmental Management' },
  { name: 'ISO 45001:2018', desc: 'Occupational Health & Safety' },
  { name: 'ISO 27001', desc: 'Information Security Management' },
  { name: 'Licensed Agency', desc: 'State-compliant private security' },
  { name: 'MSME Registered', desc: 'Government-recognized enterprise' },
  { name: 'EPF & ESIC', desc: 'Full statutory employee coverage' },
  { name: 'MCA · GST', desc: 'Corporate compliance ready' },
]

const TIMELINE = [
  {
    year: '2005',
    title: 'The Foundation',
    desc: 'Founded in Jaipur, Rajasthan by Mr. Sonu Singh with a vision to raise private security standards through professionalism and discipline.',
  },
  {
    year: '2025',
    title: 'Corporate Incorporation',
    desc: 'Incorporated as Silbar Security Services Pvt. Ltd. with Mr. Nakul Singh Jadaun — scaling into a professionally managed national security organization.',
  },
  {
    year: 'Today',
    title: 'PAN India Operations',
    desc: 'HQ in Jaipur with regional hubs in Delhi NCR and Ahmedabad. Protecting industries, institutions, and communities across 200+ cities.',
  },
]

const LEADERS = [
  {
    name: 'Mr. Sonu Singh',
    role: 'Director & Founder',
    bio: 'Extensive experience in India’s private security industry — industrial operations, manpower deployment, client relationships, and statutory compliance.',
  },
  {
    name: 'Mr. Nakul Singh Jadaun',
    role: 'Director',
    bio: 'Operational and management expertise focused on service quality, disciplined field execution, and long-term client partnerships across India.',
  },
]

export default function AboutPage() {
  return (
    <main className="about-page" id="main-content">
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
              foundingDate: '2005',
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
            alt=""
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
              establishments, institutions, and government organizations.
            </p>
            <ul className="about-hero__pills" aria-label="Key credentials">
              <li>ISO 9001:2015</li>
              <li>7,000+ Professionals</li>
              <li>200+ Cities</li>
              <li>Est. 2005 · Jaipur</li>
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
              <Image src="/logo.webp" alt="" width={72} height={72} className="about-hero__logo" />
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
              industry expertise, and uncompromising quality, the organization expanded its capabilities
              and client base across India.
            </p>
            <p className="about-story__body">
              In 2025, the business was incorporated as Silbar Security Services Pvt. Ltd. in partnership
              with Mr. Nakul Singh Jadaun — a milestone in becoming a professionally managed corporate
              security organization with national ambition and local execution.
            </p>
            <div className="about-story__offices">
              <div className="about-story__office">
                <MapPin size={16} aria-hidden="true" />
                <div>
                  <strong>Headquarters</strong>
                  <span>{CONTACT.address.full}</span>
                </div>
              </div>
              <div className="about-story__office">
                <Building2 size={16} aria-hidden="true" />
                <div>
                  <strong>Regional Hubs</strong>
                  <span>Delhi NCR · Ahmedabad · expanding PAN India</span>
                </div>
              </div>
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
                <span>22+</span>
                <small>Years protecting India</small>
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
                protect people, property, and business operations — with trained manpower, transparent
                processes, and responsive support.
              </p>
            </ScrollReveal>
            <ScrollReveal className="about-mv__card about-mv__card--accent" delay={0.12}>
              <div className="about-mv__icon">
                <Eye size={28} aria-hidden="true" />
              </div>
              <h3>Our Vision</h3>
              <p>
                To become one of India&apos;s most respected security companies — recognized for
                operational excellence, legal compliance, professionalism, and customer satisfaction
                nationwide.
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
          <h2 id="guarantee-heading">Our Compliance Guarantee</h2>
          <p>
            If a compliance penalty is imposed solely due to our failure to fulfil contractual
            compliance responsibilities, we stand by our commitment and take responsibility in
            accordance with our service agreement.
          </p>
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
            Standardized security through a corporate operating model — with full respect for
            state-specific regulatory requirements wherever we deploy.
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
