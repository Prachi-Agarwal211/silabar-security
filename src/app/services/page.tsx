import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  Phone,
  ArrowRight,
  Shield,
  CheckCircle2,
  Factory,
  Building2,
  Eye,
  Users,
  Clock,
  MapPin,
} from 'lucide-react'
import { SERVICES } from '@/data/services'
import ServicesGrid from '@/components/sections/ServicesGrid'
import QueryForm from '@/components/sections/QueryForm'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'
import { SITE_STATS } from '@/lib/site-stats'

export const metadata: Metadata = {
  title: `Security Services — ${SERVICES.length} Verticals | Silbar Security`,
  description:
    'Manned guarding, industrial security, event security, CCTV support, facility protection and more. ISO 9001:2015 certified. PAN India deployment. Get a WhatsApp quote.',
  ...ogMetadata(
    `Security Services — ${SERVICES.length} Verticals | Silbar Security`,
    'Professional security services across India. Trained manpower, clear commercials, multi-city capability.',
    '/services'
  ),
}

const PILLARS = [
  {
    icon: Users,
    title: 'Trained Manpower',
    desc: 'Background-verified guards, supervisors, and lady guards inducted on your site SOPs before full post ownership.',
  },
  {
    icon: Eye,
    title: 'Process Visibility',
    desc: 'Duty instructions, attendance discipline, incident escalation, and account ownership — not verbal updates alone.',
  },
  {
    icon: Factory,
    title: 'Industry Fit',
    desc: 'Gate and material focus for plants; visitor flow for hospitals and offices; surge plans for events and retail peaks.',
  },
  {
    icon: MapPin,
    title: 'PAN India Scale',
    desc: `Deployments coordinated nationally with coverage planning across ${SITE_STATS.cities}+ city pages and ${SITE_STATS.states} states.`,
  },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Brief us', text: 'Share facility type, posts, shifts, city, and risk notes via call or WhatsApp form.' },
  { step: '02', title: 'Scope design', text: 'We map posts, supervision, and compliance notes to your actual layout and footfall.' },
  { step: '03', title: 'Proposal', text: 'Category-wise rates, mobilisation assumptions, and inclusions you can review with finance.' },
  { step: '04', title: 'Deploy & stabilise', text: 'Induction, go-live, then fine-tune posts in the first week based on real operations.' },
]

const FEATURED = SERVICES.slice(0, 6)

export default function ServicesPage() {
  return (
    <main className="services-page services-page--v2" id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Silbar Security Services',
            numberOfItems: SERVICES.length,
            itemListElement: SERVICES.map((service, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `https://www.silbarsecurity.in/services/${service.slug}`,
              name: service.shortTitle,
              description: service.description,
            })),
          }),
        }}
      />

      {/* ─── Cinematic photo hero ─── */}
      <section className="svc-hero" aria-labelledby="services-page-heading">
        <div className="svc-hero__media" aria-hidden="true">
          <Image
            src="/hero-guard.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="svc-hero__img"
          />
          <div className="svc-hero__scrim" />
        </div>
        <div className="svc-hero__inner">
          <nav className="breadcrumb breadcrumb--on-dark" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Services</span>
          </nav>
          <span className="section-eyebrow section-eyebrow--light">
            {SERVICES.length} SECURITY VERTICALS · ISO 9001:2015
          </span>
          <h1 id="services-page-heading" className="svc-hero__title">
            Services Built Around <em>Your</em> Risk.
          </h1>
          <p className="svc-hero__body">
            One accountable partner for manned guarding, industrial gates, events, surveillance support,
            and facility protection — designed for real posts, real shifts, and multi-city brands.
          </p>
          <ul className="svc-hero__pills" aria-label="Highlights">
            <li><Shield size={14} aria-hidden="true" /> ISO Certified</li>
            <li><Users size={14} aria-hidden="true" /> 7,000+ Pros</li>
            <li><MapPin size={14} aria-hidden="true" /> {SITE_STATS.cities}+ Cities</li>
            <li><Clock size={14} aria-hidden="true" /> Fast Quotes</li>
          </ul>
          <div className="svc-hero__ctas">
            <a href={`tel:${CONTACT.phoneRaw}`} className="btn-primary btn-primary--on-dark">
              <Phone size={14} aria-hidden="true" /> {CONTACT.phone}
            </a>
            <a href="#all-services" className="btn-secondary btn-secondary--on-dark">
              Browse all services <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="svc-stats" aria-label="Service coverage">
        <div className="svc-stats__inner">
          <div className="svc-stats__item">
            <strong>{SERVICES.length}</strong>
            <span>Service verticals</span>
          </div>
          <div className="svc-stats__item">
            <strong>ISO</strong>
            <span>9001:2015 process</span>
          </div>
          <div className="svc-stats__item">
            <strong>24/7</strong>
            <span>Enquiry response</span>
          </div>
          <div className="svc-stats__item">
            <strong>PAN</strong>
            <span>India deployment</span>
          </div>
        </div>
      </section>

      {/* Quick jump — sticky feel on mobile scroll-x */}
      <nav className="services-quickjump" aria-label="Jump to popular services">
        <div className="services-quickjump-inner">
          {FEATURED.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="services-quickjump-item">
              {service.shortTitle}
            </Link>
          ))}
          <a href="#all-services" className="services-quickjump-item services-quickjump-item--more">
            + {SERVICES.length - FEATURED.length} more
          </a>
        </div>
      </nav>

      {/* How we deliver */}
      <section className="svc-pillars section-pad" aria-labelledby="pillars-heading">
        <div className="shell">
          <ScrollReveal>
            <span className="section-eyebrow section-eyebrow--red">HOW WE DELIVER</span>
            <h2 id="pillars-heading" className="section-heading" style={{ marginBottom: '0.75rem' }}>
              Not Just Headcount. <em>Control.</em>
            </h2>
            <p className="svc-lead">
              Silbar Security designs posts around gate flow, night risk, visitor chaos, and compliance —
              then staffs and supervises to that design.
            </p>
          </ScrollReveal>
          <div className="svc-pillars__grid">
            {PILLARS.map(({ icon: Icon, title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 0.06} className="svc-pillar brand-card">
                <div className="svc-pillar__icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.6} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured image band */}
      <section className="svc-feature-band" aria-labelledby="featured-heading">
        <div className="svc-feature-band__media" aria-hidden="true">
          <Image src="/industries-bg.webp" alt="" fill sizes="100vw" className="svc-feature-band__img" />
          <div className="svc-feature-band__scrim" />
        </div>
        <div className="shell svc-feature-band__inner">
          <ScrollReveal>
            <span className="section-eyebrow section-eyebrow--light">FEATURED PATHS</span>
            <h2 id="featured-heading" className="section-heading section-heading--on-dark">
              Start With Your <em>Highest-Risk</em> Post.
            </h2>
          </ScrollReveal>
          <div className="svc-feature-links">
            {FEATURED.map((s, i) => (
              <ScrollReveal key={s.slug} delay={i * 0.05}>
                <Link href={`/services/${s.slug}`} className="svc-feature-link">
                  <span className="svc-feature-link__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="svc-feature-link__body">
                    <strong>{s.shortTitle}</strong>
                    <em>{s.description.slice(0, 90)}…</em>
                  </span>
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="svc-process section-pad brand-rail" aria-labelledby="process-heading">
        <div className="shell">
          <ScrollReveal>
            <span className="section-eyebrow section-eyebrow--red">ENGAGEMENT</span>
            <h2 id="process-heading" className="section-heading" style={{ marginBottom: '1.5rem' }}>
              From Brief to <em>Go-Live.</em>
            </h2>
          </ScrollReveal>
          <ol className="svc-process__list">
            {HOW_IT_WORKS.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.07} className="svc-process__item">
                <span className="svc-process__step">{item.step}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Full grid */}
      <div id="all-services" className="svc-all-wrap">
        <div className="shell svc-all-header">
          <ScrollReveal>
            <span className="section-eyebrow section-eyebrow--red">COMPLETE CATALOGUE</span>
            <h2 className="section-heading">
              All {SERVICES.length} <em>Services.</em>
            </h2>
            <p className="svc-lead">
              Open any vertical for features, use-cases, FAQs, and a WhatsApp quote form prefilled for that service.
            </p>
          </ScrollReveal>
        </div>
        <ServicesGrid services={SERVICES} />
      </div>

      {/* Content block — SEO + human */}
      <section className="svc-copy-block section-pad" aria-labelledby="copy-heading">
        <div className="shell brand-split">
          <ScrollReveal>
            <span className="section-eyebrow section-eyebrow--red">WHY SILBAR SERVICES</span>
            <h2 id="copy-heading" className="section-heading" style={{ marginBottom: '1rem' }}>
              Built for Indian Sites. <em>Not Templates.</em>
            </h2>
            <div className="svc-copy-prose">
              <p>
                Security failures rarely start with &ldquo;not enough guards.&rdquo; They start with unclear posts,
                weak night checks, informal material movement, and vendors who disappear on absences.
                Silbar Security structures each service line around those failure modes.
              </p>
              <p>
                Whether you need manned guarding for a society desk, industrial gate control, event surge
                teams, or multi-city standardisation, we propose category-wise commercials and mobilisation
                plans you can review with operations and finance.
              </p>
              <p>
                The Indian security landscape is evolving rapidly. Businesses today face a wider range of threats
                than ever before — from unauthorised access and material theft to fire hazards, data breaches, and
                compliance penalties. A fragmented security approach with multiple vendors often leads to gaps in
                coverage, inconsistent standards, and higher management overhead. This is why more organisations
                are consolidating their security requirements under a single, accountable partner who can deliver
                consistent quality across every site.
              </p>
              <p>
                Silbar Security brings together manned guarding, electronic surveillance, fire safety personnel,
                and facility management under one roof. Our integrated approach means fewer vendor touchpoints,
                standardised operating procedures across locations, and a single point of accountability for
                all your security needs. Whether you operate a single factory or a chain of retail outlets
                across 10 states, you get the same disciplined execution, compliance rigour, and responsive
                support at every location.
              </p>
              <p>
                Explore locations across India on our{' '}
                <Link href="/security-services">city &amp; state directory</Link>, or jump into{' '}
                <Link href="/industries">industry-specific security</Link> if your risk is sector-driven.
              </p>
            </div>
            <ul className="svc-check-list">
              {[
                'Background-verified manpower with site induction',
                'Supervisor / field check options on multi-post sites',
                'Statutory-aware proposals for eligible staff',
                'WhatsApp-ready enquiries from every service page',
                'Centralised billing and MIS for multi-site clients',
                '24-hour replacement guarantee on all deployments',
              ].map((t) => (
                <li key={t}>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="svc-copy-visual">
            <div className="svc-copy-visual__frame">
              <Image
                src="/why-silbar-bg.webp"
                alt="Silbar Security operations"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                className="svc-copy-visual__img"
              />
              <div className="svc-copy-visual__badge">
                <Building2 size={18} aria-hidden="true" />
                <span>Process-driven · PAN India</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad brand-rail" aria-labelledby="svc-faq-title">
        <div className="shell" style={{ maxWidth: '900px' }}>
          <ScrollReveal>
            <span className="section-eyebrow section-eyebrow--red">FAQ</span>
            <h2 id="svc-faq-title" className="section-heading" style={{ marginBottom: '0.75rem' }}>
              Common Questions About <em>Our Services.</em>
            </h2>
            <p className="section-subtitle" style={{ marginBottom: '2.5rem' }}>
              Answers about deployment, compliance, costs, and coverage.
            </p>
          </ScrollReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { q: 'How quickly can Silbar deploy security guards at my facility?', a: 'We typically deploy trained, verified guards within 48\u201372 hours of proposal acceptance. For emergency requirements, we can mobilise a Quick Response Team within 24 hours from our nearest regional hub. Deployment includes site induction, uniform issue, and SOP briefing before the guard assumes duty.' },
              { q: 'Do you provide security services in tier-2 and tier-3 cities?', a: 'Yes. Silbar Security operates across 200+ cities in India, including tier-2 and tier-3 locations. Our regional offices in Rajasthan, Delhi NCR, Uttar Pradesh, Madhya Pradesh, Gujarat, Punjab, Haryana, Maharashtra, and other states ensure we can deploy and supervise guards even in smaller cities with the same quality standards as our metro operations.' },
              { q: 'Are your security guards insured and compliant with labour laws?', a: 'Absolutely. All our guards are enrolled in EPF, ESIC, and covered under comprehensive insurance policies. We strictly adhere to Minimum Wages Act, Contract Labour Act, and all applicable state-specific labour regulations. Our compliance-first approach means zero statutory risk for our clients.' },
              { q: 'What is the typical cost of hiring a security guard from Silbar?', a: 'Costs vary based on location, post type (armed/unarmed), shift duration, and any special requirements. We provide transparent, category-wise pricing with no hidden charges. Contact us via WhatsApp or phone for a custom quote tailored to your facility and city.' },
              { q: 'Can Silbar manage security across multiple locations for a single client?', a: 'Yes. Multi-site deployment is one of our core strengths. We provide centralised billing, standardised SOPs, consistent supervision, and a single account manager for all locations. This ensures uniform security standards whether you have 2 sites or 200.' },
            ].map((faq) => (
              <details key={faq.q} className="service-detail-faq-item">
                <summary className="service-detail-faq-q">{faq.q}</summary>
                <p className="service-detail-faq-a">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="svc-form section-pad--tight" aria-label="Request a service quote">
        <div className="shell shell--narrow">
          <QueryForm
            title="Request a Service Quote"
            subtitle="Tell us which service and city — submit opens WhatsApp with your full enquiry."
            formType="Services Catalogue Quote"
          />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="services-bottom-cta" aria-label="Contact for services">
        <div className="services-bottom-cta__inner">
          <span className="section-eyebrow section-eyebrow--light">READY TO SECURE?</span>
          <h2 className="section-heading section-heading--on-dark">
            Ready to Secure Your <em>Operations?</em>
          </h2>
          <p className="services-bottom-cta__sub">
            Call or WhatsApp our consultants. Multi-site brands and single facilities welcome.
          </p>
          <div className="cta-pair" style={{ marginTop: '1.5rem', justifyContent: 'center' }}>
            <a href={`tel:${CONTACT.phoneRaw}`} className="btn-primary btn-primary--on-dark">
              <Phone size={14} aria-hidden="true" /> Call Now
            </a>
            <a
              href={CONTACT.whatsapp.url}
              className="btn-secondary btn-secondary--on-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
