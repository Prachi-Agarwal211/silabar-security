import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/animations/ScrollReveal'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import { INDUSTRIES } from '@/data/industries'
import { ArrowRight, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Industries We Serve — Security for Every Sector',
  description:
    'Silbar Security provides specialized security solutions for manufacturing, hospitals, hotels, warehouses, banks, corporate offices, data centres, government, and more.',
  alternates: { canonical: 'https://www.silbarsecurity.in/industries' },
}

export default function IndustriesPage() {
  return (
    <main className="industries-page" id="main-content">
      <section className="industries-hero">
        <ScrollReveal className="industries-hero__inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Industries</span>
          </nav>
          <span className="page-eyebrow">WHERE WE OPERATE</span>
          <h1 className="industries-title">
            <SplitTextReveal text="12 INDUSTRIES." />
            <br />
            <span className="industries-title--outline">
              <SplitTextReveal text="ONE STANDARD." delay={0.2} />
            </span>
          </h1>
          <p className="industries-subtitle">
            Every industry has unique security challenges. We've solved them.
          </p>
        </ScrollReveal>
      </section>

      <section className="industries-grid-section">
        <div className="industries-grid">
          {INDUSTRIES.map((industry, i) => (
            <ScrollReveal key={industry.slug} delay={i * 0.05} className="industry-card-wrapper">
              <Link
                href={`/industries/${industry.slug}`}
                className="industry-card"
                style={{ height: '100%' }}
              >
                <h2 className="industry-card__title">{industry.shortTitle}</h2>
                <p className="industry-card__desc">{industry.description.slice(0, 100)}...</p>
                <span className="industry-card__cta">
                  Learn More <ArrowRight size={14} />
                </span>
              </Link>
            </ScrollReveal>
            ))}
        </div>
      </section>

      <section className="service-detail-bottom-cta">
        <h2 className="service-detail-bottom-cta__title">Need Industry-Specific Security?</h2>
        <p className="service-detail-bottom-cta__sub">
          Every industry has unique risks. Let our security consultants design a tailored solution for your facility.
        </p>
        <div className="service-detail-ctas" style={{ justifyContent: 'center' }}>
          <a href="tel:+919352303333" className="service-detail-cta service-detail-cta--primary">
            <Phone size={16} /> Call Now
          </a>
          <a
            href="https://wa.me/919352303333?text=Hello%20Silbar%20Security%2C%20I%20need%20security%20for%20my%20industry."
            className="service-detail-cta service-detail-cta--secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Us
          </a>
        </div>
      </section>
    </main>
  )
}
