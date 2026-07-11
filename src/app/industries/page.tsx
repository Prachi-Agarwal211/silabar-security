import type { Metadata } from 'next'
import Link from 'next/link'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'
import IndustriesGrid from '@/components/sections/IndustriesGrid'
import QueryForm from '@/components/sections/QueryForm'

export const metadata: Metadata = {
  title: 'Industries We Serve — Security for Every Sector',
  description:
    'Silbar Security provides specialized security solutions for manufacturing, hospitals, hotels, warehouses, banks, corporate offices, data centres, government, and more.',
  ...ogMetadata('Industries We Serve — Security for Every Sector', 'Silbar Security provides specialized security solutions for manufacturing, hospitals, hotels, warehouses, banks, corporate offices, data centres, government, and more.', '/industries'),
}

// Industries data imported for LD+JSON schema
import { INDUSTRIES } from '@/data/industries'
import { Phone, ArrowRight } from 'lucide-react'

export default function IndustriesPage() {
  return (
    <main className="industries-page" id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: INDUSTRIES.map((industry, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `https://www.silbarsecurity.in/industries/${industry.slug}`,
            name: industry.shortTitle || industry.title,
          }))
        })
      }} />

      {/* ─── Page Intro ─── */}
      <section className="industries-listing-intro">
        <div className="industries-listing-intro__inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <Link href="/industries" className="breadcrumb__link breadcrumb__current" aria-current="page">Industries</Link>
          </nav>
          <span className="section-eyebrow section-eyebrow--red">WHERE WE OPERATE</span>
          <h1 className="section-heading industries-listing-h1">
            Solutions Crafted for <em>Every</em> Industry.
          </h1>
          <p className="industries-listing-subtitle">
            Silbar Security provides specialized security solutions tailored to 12 distinct industries
            across India — from manufacturing floors to hospital corridors, banking halls to data centres.
            Every deployment is industry-trained and fully compliant.
          </p>
          <div className="cta-pair" style={{ marginTop: '1.5rem' }}>
            <a href={CONTACT.whatsapp.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Talk to Expert <ArrowRight size={14} aria-hidden="true" />
            </a>
            <a href={`tel:${CONTACT.phoneRaw}`} className="btn-secondary">
              <Phone size={14} aria-hidden="true" /> Call Now
            </a>
          </div>
        </div>
      </section>

      {/* ─── Industry Photo-Card Grid ─── */}
      <section className="industries-card-section" aria-labelledby="industries-grid-heading">
        <div className="industries-card-inner">
          <h2 id="industries-grid-heading" className="sr-only">Industries We Serve</h2>
          <IndustriesGrid industries={INDUSTRIES} />
        </div>
      </section>

      {/* ─── Query Form ─── */}
      <section style={{ padding: '5rem 1.5rem', background: 'var(--color-paper)' }}>
        <QueryForm />
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="industries-bottom-cta" aria-label="Contact for industry security">
        <div className="industries-bottom-cta__inner">
          <span className="section-eyebrow section-eyebrow--light">TAILORED SOLUTIONS</span>
          <h2 className="section-heading section-heading--on-dark">
            Need Industry-Specific <em>Security?</em>
          </h2>
          <p className="industries-bottom-cta__sub">
            Every industry has unique risks. Let our consultants design a tailored solution for your facility.
          </p>
          <div className="cta-pair" style={{ marginTop: '2rem', justifyContent: 'center' }}>
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
