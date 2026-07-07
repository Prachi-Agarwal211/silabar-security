import type { Metadata } from 'next'
import Link from 'next/link'
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
        <span className="page-eyebrow">WHERE WE OPERATE</span>
        <h1 className="industries-title">
          12 INDUSTRIES.<br />
          <span className="industries-title--outline">ONE STANDARD.</span>
        </h1>
        <p className="industries-subtitle">
          Every industry has unique security challenges. We've solved them.
        </p>
      </section>

      <section className="industries-grid-section">
        <div className="industries-grid">
          {INDUSTRIES.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="industry-card"
            >
              <h2 className="industry-card__title">{industry.shortTitle}</h2>
              <p className="industry-card__desc">{industry.description.slice(0, 100)}...</p>
              <span className="industry-card__cta">
                Learn More <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
