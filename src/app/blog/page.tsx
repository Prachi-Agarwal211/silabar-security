import type { Metadata } from 'next'
import Link from 'next/link'
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/data/blog'
import BlogCard from '@/components/ui/BlogCard'
import PageHero from '@/components/layout/PageHero'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { ogMetadata } from '@/lib/metadata'

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
          
          {/* Categories filter (visual only for now) */}
          <ScrollReveal>
            <div className="blog-categories" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '3rem', justifyContent: 'center' }}>
              {BLOG_CATEGORIES.map((cat, i) => (
                <button
                  key={cat}
                  style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: '999px',
                    border: '1px solid rgba(191, 149, 63, 0.4)',
                    background: i === 0 ? 'var(--color-cherry)' : 'transparent',
                    color: i === 0 ? 'white' : 'var(--color-midnight)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {BLOG_POSTS.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 0.1}>
                <BlogCard post={post} />
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>
    </main>
  )
}
