import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'
import IndustriesGrid from '@/components/sections/IndustriesGrid'
import QueryForm from '@/components/sections/QueryForm'
import { INDUSTRIES } from '@/data/industries'
import { Phone, ArrowRight, Shield, Factory, Building2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Industries We Serve — Security for Every Sector',
  description:
    'Silbar Security provides specialized security solutions for manufacturing, hospitals, hotels, warehouses, banks, corporate offices, data centres, government, and more.',
  ...ogMetadata(
    'Industries We Serve — Security for Every Sector',
    'Specialized security for manufacturing, hospitals, hotels, warehouses, banks, corporate offices, data centres, and more.',
    '/industries'
  ),
}

const HIGHLIGHTS = [
  { icon: Factory, label: 'Industrial & Manufacturing' },
  { icon: Building2, label: 'Corporate & Commercial' },
  { icon: Shield, label: 'Critical Infrastructure' },
]

export default function IndustriesPage() {
  return (
    <main className="industries-page" id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: INDUSTRIES.map((industry, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `https://www.silbarsecurity.in/industries/${industry.slug}`,
              name: industry.shortTitle || industry.title,
            })),
          }),
        }}
      />

      {/* ─── Photo hero ─── */}
      <section className="industries-hero" aria-labelledby="industries-heading">
        <div className="industries-hero__media" aria-hidden="true">
          <Image
            src="/industries-bg.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="industries-hero__img"
          />
          <div className="industries-hero__scrim" />
        </div>
        <div className="industries-hero__inner">
          <nav className="breadcrumb breadcrumb--on-dark" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Industries</span>
          </nav>
          <span className="section-eyebrow section-eyebrow--light">WHERE WE OPERATE</span>
          <h1 id="industries-heading" className="industries-hero__title">
            Solutions Crafted for <em>Every</em> Industry.
          </h1>
          <p className="industries-hero__sub">
            Specialized security for {INDUSTRIES.length} sectors across India — from manufacturing floors
            and hospital corridors to banking halls, warehouses, and data centres. Every deployment is
            industry-trained and fully compliant.
          </p>
          <div className="industries-hero__highlights">
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <span key={label} className="industries-hero__chip">
                <Icon size={14} aria-hidden="true" /> {label}
              </span>
            ))}
          </div>
          <div className="industries-hero__ctas">
            <a
              href={CONTACT.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-primary--on-dark"
            >
              Talk to Expert <ArrowRight size={14} aria-hidden="true" />
            </a>
            <a href={`tel:${CONTACT.phoneRaw}`} className="btn-secondary btn-secondary--on-dark">
              <Phone size={14} aria-hidden="true" /> Call Now
            </a>
          </div>
        </div>
      </section>

      {/* ─── Stats strip ─── */}
      <section className="industries-stats" aria-label="Industry coverage">
        <div className="industries-stats__inner">
          <div className="industries-stats__item">
            <strong>{INDUSTRIES.length}+</strong>
            <span>Industry verticals</span>
          </div>
          <div className="industries-stats__item">
            <strong>200+</strong>
            <span>Cities covered</span>
          </div>
          <div className="industries-stats__item">
            <strong>ISO</strong>
            <span>Process-driven delivery</span>
          </div>
          <div className="industries-stats__item">
            <strong>24/7</strong>
            <span>Support &amp; response</span>
          </div>
        </div>
      </section>

      {/* ─── Grid ─── */}
      <section className="industries-card-section" aria-labelledby="industries-grid-heading">
        <div className="industries-card-inner">
          <div className="industries-card-header">
            <span className="section-eyebrow section-eyebrow--red">SECTOR EXPERTISE</span>
            <h2 id="industries-grid-heading" className="section-heading">
              Explore Security by <em>Industry.</em>
            </h2>
            <p className="industries-card-header__sub">
              Select your sector for challenges we solve, recommended services, and FAQs tailored to your environment.
            </p>
          </div>
          <IndustriesGrid industries={INDUSTRIES} />
        </div>
      </section>

      {/* ─── Mid band with image ─── */}
      <section className="industries-band" aria-label="Why industry specialists">
        <div className="industries-band__media" aria-hidden="true">
          <Image src="/why-silbar-bg.webp" alt="" fill sizes="100vw" className="industries-band__img" />
          <div className="industries-band__scrim" />
        </div>
        <div className="industries-band__inner">
          <span className="section-eyebrow section-eyebrow--light">WHY SECTOR FOCUS MATTERS</span>
          <h2 className="section-heading section-heading--on-dark">
            Guards Trained for <em>Your</em> Risk Profile.
          </h2>
          <p>
            Factory gate protocols differ from hospital visitor flows and bank cash-handling rules.
            Silbar deploys sector-specific SOPs, supervisors, and reporting — not one-size-fits-all manpower.
          </p>
          <Link href="/services" className="industries-band__link">
            View all services <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ─── Form ─── */}
      <section className="industries-form-section" aria-label="Request industry security quote">
        <QueryForm
          title="Need Industry-Specific Security?"
          subtitle="Share your sector and site details — we design a tailored deployment plan."
        />
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="industries-bottom-cta" aria-label="Contact for industry security">
        <div className="industries-bottom-cta__inner">
          <span className="section-eyebrow section-eyebrow--light">TAILORED SOLUTIONS</span>
          <h2 className="section-heading section-heading--on-dark">
            Ready for Sector-Ready <em>Security?</em>
          </h2>
          <p className="industries-bottom-cta__sub">
            Every industry has unique risks. Let our consultants design a solution for your facility.
          </p>
          <div className="industries-bottom-cta__actions">
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
