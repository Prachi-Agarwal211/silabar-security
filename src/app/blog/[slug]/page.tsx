import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { BLOG_POSTS } from '@/data/blog'
import { Calendar, Clock, ArrowLeft, User, ChevronRight } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { ogMetadata } from '@/lib/metadata'
import PageLeadSection from '@/components/sections/PageLeadSection'

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) return {}

  return {
    title: `${post.title}`,
    description: post.excerpt,
    ...ogMetadata(`${post.title}`, post.excerpt, `/blog/${slug}`, `/images/og/${slug}-og.svg`),
    openGraph: {
      type: 'article' as const,
      publishedTime: post.publishedAt,
      authors: [post.author],
      section: post.category,
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  // Format the date
  const dateObj = new Date(post.publishedAt)
  const formattedDate = dateObj.toLocaleDateString('en-IN', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <main className="blog-post-page" id="main-content">
      {/* JSON-LD Schema for BlogPosting */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          image: post.coverImage ? `https://www.silbarsecurity.in${post.coverImage}` : undefined,
          author: {
            '@type': 'Person',
            name: post.author
          },
          datePublished: post.publishedAt,
          dateModified: post.modifiedAt,
          publisher: {
            '@type': 'Organization',
            name: 'Silbar Security Services Pvt. Ltd.',
            url: 'https://www.silbarsecurity.in'
          }
        })
      }} />

      <PageHero
        eyebrow={post.category}
        title={<SplitTextReveal text={post.title} mode="words" />}
        subtitle={post.excerpt}
        size="tall"
        topContent={
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <Link href="/blog" className="breadcrumb__link">Blog</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current breadcrumb__current--truncate">
              {post.title}
            </span>
          </nav>
        }
      />

      <section className="blog-post-shell">
        <article className="blog-post-article">
          <header className="blog-post-header">
            <div className="blog-post-meta">
              <span className="blog-post-meta__item">
                <Calendar size={16} color="var(--color-cherry)" /> {formattedDate}
              </span>
              <span className="blog-post-meta__item">
                <Clock size={16} color="var(--color-cherry)" /> {post.readTime}
              </span>
              <span className="blog-post-meta__item">
                <User size={16} color="var(--color-cherry)" /> {post.author}
              </span>
            </div>
          </header>

          <ScrollReveal>
            <div 
              className="blog-post-content" 
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </ScrollReveal>

          {post.coverImage && (
            <div className="blog-post-cover">
              <Image
                src={post.coverImage}
                alt={`Cover image for ${post.title}`}
                width={1600}
                height={900}
                className="blog-post-cover__img"
                loading="lazy"
              />
            </div>
          )}

          <footer className="blog-post-footer">
            <Link href="/blog" className="blog-post-back">
              <ArrowLeft size={16} /> Back to All Articles
            </Link>
          </footer>
        </article>
      </section>

      {/* Related Posts Section */}
      {(() => {
        const related = BLOG_POSTS
          .filter(p => p.slug !== post.slug && p.category === post.category)
          .slice(0, 3)
        if (related.length === 0) return null
        return (
          <section className="blog-post-shell">
            <div className="blog-post-related-inner">
              <h2 className="blog-post-related-title">
                Related Articles
              </h2>
              <div className="blog-post-related-list">
                {related.map(r => (
                  <Link 
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="related-card"
                  >
                    <div>
                      <span className="related-card__cat">{r.category}</span>
                      <h3 className="related-card__title">{r.title}</h3>
                      <span className="related-card__meta">{r.readTime} · {r.author}</span>
                    </div>
                    <ChevronRight size={20} color="var(--color-cherry)" className="related-card__arrow" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )
      })()}
    
      <PageLeadSection
        title="Protect Your Facility with Silbar"
        subtitle="Talk to our security consultants for a tailored quote."
      />

</main>
  )
}
