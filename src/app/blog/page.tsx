import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink, Rss } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import BlogFilter from '@/components/sections/BlogFilter'
import { ogMetadata } from '@/lib/metadata'
import PageLeadSection from '@/components/sections/PageLeadSection'
import { BLOG_POSTS } from '@/data/blog'
import { fetchWordPressPosts } from '@/lib/wordpress'
import { WORDPRESS_BLOG } from '@/lib/config'

export const revalidate = 300 // refresh WP posts every 5 min

export const metadata: Metadata = {
  title: 'Blog | Security Insights — Silbar Security India',
  description:
    'Security tips, compliance guides, and company updates from Silbar Security India. Live posts from blog.silbarsecurity.in plus curated insights.',
  ...ogMetadata(
    'Blog | Security Insights — Silbar Security India',
    'Live WordPress blog + security insights from Silbar Security Services India.',
    '/blog'
  ),
}

export default async function BlogListingPage() {
  const wpPosts = await fetchWordPressPosts(30)

  // WordPress first (live CMS), then local curated posts not already mirrored
  const wpSlugs = new Set(wpPosts.map((p) => p.slug))
  const localExtras = BLOG_POSTS.filter((p) => !wpSlugs.has(p.slug)).map((p) => ({
    ...p,
    source: 'local' as const,
  }))
  const posts = [...wpPosts, ...localExtras].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  const categories = [
    'All',
    ...Array.from(new Set(posts.map((p) => p.category))).filter(Boolean),
  ]

  return (
    <main className="blog-listing-page" id="main-content">
      <PageHero
        eyebrow="INSIGHTS & NEWS"
        title={
          <>
            <SplitTextReveal text="Security" />
            <br />
            <span className="page-hero-title--outline">
              <SplitTextReveal text="Insights." delay={0.2} />
            </span>
          </>
        }
        subtitle="Expert analysis and company updates — published on our WordPress blog and shown live here."
        size="compact"
        topContent={
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Blog</span>
          </nav>
        }
      />

      <section className="blog-wp-banner" aria-label="WordPress blog">
        <div className="blog-wp-banner__inner">
          <div>
            <p className="blog-wp-banner__eyebrow">Connected CMS</p>
            <h2 className="blog-wp-banner__title">
              Live from <em>blog.silbarsecurity.in</em>
            </h2>
            <p className="blog-wp-banner__text">
              Publish daily posts in WordPress — they appear on this page automatically
              (refreshes about every 5 minutes). Full articles open on the WordPress site.
            </p>
          </div>
          <div className="blog-wp-banner__actions">
            <a
              href={WORDPRESS_BLOG.home}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Open WordPress Blog <ExternalLink size={14} aria-hidden="true" />
            </a>
            <a
              href={WORDPRESS_BLOG.feed}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Rss size={14} aria-hidden="true" /> RSS Feed
            </a>
          </div>
        </div>
      </section>

      <section className="blog-content">
        <div className="blog-content__inner">
          {posts.length === 0 ? (
            <div className="blog-empty-state">
              <h2>No posts yet</h2>
              <p>
                Your WordPress site is connected. Publish a post at{' '}
                <a href={WORDPRESS_BLOG.home} target="_blank" rel="noopener noreferrer">
                  blog.silbarsecurity.in
                </a>{' '}
                and it will show up here.
              </p>
              <a href={WORDPRESS_BLOG.home} className="btn-primary" target="_blank" rel="noopener noreferrer">
                Go to WordPress
              </a>
            </div>
          ) : (
            <BlogFilter posts={posts} categories={categories} />
          )}
        </div>
      </section>

      <PageLeadSection
        title="Need Security for Your Business?"
        subtitle="Get a free consultation — submit opens WhatsApp with your enquiry."
        formType="Blog Page Quote"
      />
    </main>
  )
}
