import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import BlogFilter from '@/components/sections/BlogFilter'
import { ogMetadata } from '@/lib/metadata'
import PageLeadSection from '@/components/sections/PageLeadSection'

export const metadata: Metadata = {
  title: 'Blog | Silbar Security Insights',
  description: 'Read the latest security insights, industry news, and updates from Silbar Security Services.',
  ...ogMetadata('Blog | Silbar Security Insights', 'Read the latest security insights, industry news, and updates from Silbar Security Services.', '/blog'),
}

export default function BlogListingPage() {
  return (
    <main className="blog-listing-page" id="main-content">
      <PageHero
        eyebrow="OUR INSIGHTS"
        title={
          <>
            <SplitTextReveal text="Security" />
            <br />
            <span className="page-hero-title--outline">
              <SplitTextReveal text="Insights." delay={0.2} />
            </span>
          </>
        }
        subtitle="Expert analysis, industry news, and best practices for securing your business."
        size="compact"
        topContent={
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Blog</span>
          </nav>
        }
      />

      <section className="blog-content" style={{ padding: '4rem 1.5rem', background: 'var(--color-paper)', minHeight: '60vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <BlogFilter />
        </div>
      </section>
    
      <PageLeadSection
        title="Need Security for Your Business?"
        subtitle="Get a free consultation from Silbar Security. We respond within 24 hours."
      />

</main>
  )
}
