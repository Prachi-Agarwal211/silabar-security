import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BLOG_POSTS } from '@/data/blog'
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react'
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
    ...ogMetadata(`${post.title}`, post.excerpt, `/blog/${slug}`),
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
          author: {
            '@type': 'Person',
            name: post.author
          },
          datePublished: post.publishedAt,
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

          <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(191, 149, 63, 0.2)' }}>
            <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-cherry)', textDecoration: 'none' }}>
              <ArrowLeft size={16} /> Back to All Articles
            </Link>
          </footer>
        </article>
      </section>
    
      <PageLeadSection
        title="Protect Your Facility with Silbar"
        subtitle="Talk to our security consultants for a tailored quote."
      />

</main>
  )
}