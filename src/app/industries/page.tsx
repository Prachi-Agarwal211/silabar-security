import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/animations/ScrollReveal'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import { INDUSTRIES } from '@/data/industries'
import { ArrowRight } from 'lucide-react'

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
    </main>
  )
}
