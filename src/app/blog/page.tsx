import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/animations/ScrollReveal'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Security Blog — Insights & Tips | Silbar Security',
  description: 'Expert insights on security services, PSARA compliance, safety tips, and industry trends. Silbar Security\'s official blog for Indian businesses.',
  alternates: { canonical: 'https://www.silbarsecurity.in/blog' },
}

const POSTS = [
  {
    title: 'PSARA Compliance 2026: Complete Guide for Indian Businesses',
    excerpt: 'Everything you need to know about PSARA 2005 compliance for private security agencies in India. Training requirements, licensing process, and audit preparation.',
    slug: 'psara-compliance-guide-2026',
    date: 'July 2026',
    readTime: '8 min',
    category: 'Compliance',
  },
  {
    title: 'Security Services in Jaipur: Complete Business Guide',
    excerpt: 'Comprehensive guide to security guard services in Jaipur. Types of guards, pricing, PSARA requirements, and how to choose the right security agency.',
    slug: 'security-services-jaipur-guide',
    date: 'July 2026',
    readTime: '6 min',
    category: 'City Guide',
  },
  {
    title: 'How to Choose a Security Agency in India: 7 Critical Questions',
    excerpt: 'Before you sign a security contract, ask these 7 questions. From PSARA licensing to guard training to replacement guarantees.',
    slug: 'how-to-choose-security-agency-india',
    date: 'June 2026',
    readTime: '5 min',
    category: 'Guide',
  },
  {
    title: 'Manned Guarding vs Electronic Surveillance: What Your Business Needs',
    excerpt: 'Should you hire security guards or install CCTV? We break down the costs, benefits, and best use cases for both approaches.',
    slug: 'manned-guarding-vs-cctv',
    date: 'June 2026',
    readTime: '7 min',
    category: 'Security',
  },
  {
    title: 'Hospital Security Challenges and Best Practices in India',
    excerpt: 'Indian hospitals face unique security challenges. Learn how PSARA-trained guards, CCTV, and access control create safer healthcare environments.',
    slug: 'hospital-security-india',
    date: 'May 2026',
    readTime: '6 min',
    category: 'Industry',
  },
]

export default function BlogPage() {
  return (
    <main className="contact-page" id="main-content">
      <section className="page-hero page-hero--short">
        <ScrollReveal>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Blog</span>
          </nav>
          <span className="contact-eyebrow">KNOWLEDGE HUB</span>
          <h1 className="contact-title">
            <SplitTextReveal text="SECURITY" />
            <br />
            <span className="contact-title--outline">
              <SplitTextReveal text="INSIGHTS" delay={0.2} />
            </span>
          </h1>
          <p className="contact-subtitle">
            Expert advice on security services, compliance, safety tips, and industry trends for Indian businesses.
          </p>
        </ScrollReveal>
      </section>

      <section className="service-detail-section-inner">
        <div className="seo-services-grid">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card"
            >
              <div className="service-page-card__header">
                <h2 className="blog-card__title">{post.title}</h2>
                <ArrowRight size={18} className="service-page-card__arrow" />
              </div>
              <p className="blog-card__excerpt">{post.excerpt}</p>
              <div className="blog-card__meta" style={{ marginTop: '1rem' }}>
                <span className="tag-chip"><Calendar size={11} /> {post.date}</span>
                <span className="tag-chip"><Clock size={11} /> {post.readTime}</span>
                <span className="tag-chip">{post.category}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="service-detail-bottom-cta">
        <h2 className="service-detail-bottom-cta__title">Need Expert Security Advice?</h2>
        <p className="service-detail-bottom-cta__sub">
          Our security consultants are ready to assess your facility and provide a customized solution.
        </p>
        <div className="service-detail-ctas" style={{ justifyContent: 'center' }}>
          <a href="tel:+919352303333" className="service-detail-cta service-detail-cta--primary">
            Call +91 93523 03333
          </a>
          <a
            href="https://wa.me/919352303333"
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
