import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
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
            <span className="breadcrumb__current" style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline-block', verticalAlign: 'bottom' }}>
              {post.title}
            </span>
          </nav>
        }
      />

      <section style={{ padding: '0 1.5rem 5rem 1.5rem', background: 'var(--color-paper)' }}>
        <article style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--color-paper)', borderRadius: '12px', padding: 'clamp(2rem, 5vw, 4rem)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
          
          <header style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(191, 149, 63, 0.2)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'rgba(10,10,10,0.6)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={16} color="var(--color-cherry)" /> {formattedDate}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={16} color="var(--color-cherry)" /> {post.readTime}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
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
            <div style={{ marginBottom: '2rem', borderRadius: '12px', overflow: 'hidden' }}>
              <img 
                src={post.coverImage} 
                alt={`Cover image for ${post.title}`}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                loading="lazy"
              />
            </div>
          )}

          <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(191, 149, 63, 0.2)' }}>
            <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-cherry)', textDecoration: 'none' }}>
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
          <section style={{ padding: '0 1.5rem 5rem 1.5rem', background: 'var(--color-paper)' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--color-midnight)' }}>
                Related Articles
              </h2>
              <div style={{ display: 'grid', gap: '1.25rem' }}>
                {related.map(r => (
                  <Link 
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="related-card"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '1.25rem 1.5rem', background: 'white', borderRadius: '10px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)', textDecoration: 'none',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-cherry)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{r.category}</span>
                      <h3 style={{ margin: '0.25rem 0 0', fontSize: '1rem', fontWeight: 600, color: 'var(--color-midnight)' }}>{r.title}</h3>
                      <span style={{ fontSize: '0.8rem', color: 'rgba(10,10,10,0.5)' }}>{r.readTime} · {r.author}</span>
                    </div>
                    <ChevronRight size={20} color="var(--color-cherry)" style={{ flexShrink: 0 }} />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )
      })()}

      <style>{`.related-card:hover{transform:translateX(4px);box-shadow:0 6px 20px rgba(0,0,0,0.1)}`}</style>
    
      <PageLeadSection
        title="Protect Your Facility with Silbar"
        subtitle="Talk to our security consultants for a tailored quote."
      />

</main>
  )
}