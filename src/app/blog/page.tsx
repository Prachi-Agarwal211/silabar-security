import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/animations/ScrollReveal'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import PageHero from '@/components/layout/PageHero'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'Security Blog — Insights & Tips | Silbar Security',
  description: 'Expert insights on security services, safety tips, and industry trends. Silbar Security\'s official blog for Indian businesses.',
  ...ogMetadata('Security Blog — Insights & Tips | Silbar Security', 'Expert insights on security services, safety tips, and industry trends. Silbar Security\'s official blog for Indian businesses.', '/blog'),
}

const POSTS = [
  {
    title: 'Security Services in Jaipur: Complete Business Guide',
    excerpt: 'Comprehensive guide to security guard services in Jaipur. Types of guards, pricing, and how to choose the right security agency.',
    slug: 'security-services-jaipur-guide',
    date: 'July 2026',
    readTime: '6 min',
    category: 'City Guide',
  },
  {
    title: 'How to Choose a Security Agency in India: 7 Critical Questions',
    excerpt: 'Before you sign a security contract, ask these 7 questions. From guard training to replacement guarantees.',
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
    excerpt: 'Indian hospitals face unique security challenges. Learn how professional guards, CCTV, and access control create safer healthcare environments.',
    slug: 'hospital-security-india',
    date: 'May 2026',
    readTime: '6 min',
    category: 'Industry',
  },
  {
    title: 'Industrial Security in India: Protecting Factories and Manufacturing Plants',
    excerpt: 'Comprehensive guide to industrial security for factories and manufacturing units across India.',
    slug: 'industrial-security-factory-guide',
    date: 'July 2026',
    readTime: '7 min',
    category: 'Industrial',
  },
  {
    title: 'Event Security Management: Complete Guide for Indian Events',
    excerpt: 'From weddings to corporate conferences, learn how professional event security works in India.',
    slug: 'event-security-management-india',
    date: 'July 2026',
    readTime: '6 min',
    category: 'Event Security',
  },
  {
    title: 'VIP Protection Services in India: Executive Protection Guide',
    excerpt: 'Professional close protection services for business leaders, celebrities, and high-net-worth individuals.',
    slug: 'vip-protection-services-india',
    date: 'June 2026',
    readTime: '8 min',
    category: 'VIP Protection',
  },
  {
    title: 'Bank and ATM Security: Protecting Financial Infrastructure in India',
    excerpt: 'Critical security measures for banks, ATMs, and financial institutions across India.',
    slug: 'bank-atm-security-india',
    date: 'June 2026',
    readTime: '6 min',
    category: 'Banking',
  },
  {
    title: 'Construction Site Security: Protecting Materials, Equipment, and Workers',
    excerpt: 'How to secure construction sites against theft, vandalism, and safety hazards.',
    slug: 'construction-site-security-india',
    date: 'June 2026',
    readTime: '7 min',
    category: 'Construction',
  },
  {
    title: 'School and College Security: Protecting Students and Staff in India',
    excerpt: 'Essential security measures for educational institutions from entry management to emergency response.',
    slug: 'school-college-security-india',
    date: 'May 2026',
    readTime: '7 min',
    category: 'Education',
  },
  {
    title: 'Shopping Mall Security: Crowd Management and Retail Protection',
    excerpt: 'Comprehensive security strategies for shopping malls, retail stores, and commercial complexes.',
    slug: 'shopping-mall-security',
    date: 'May 2026',
    readTime: '6 min',
    category: 'Retail',
  },
  {
    title: 'Fire Life Safety Management: Prevention, Detection, and Response',
    excerpt: 'Essential fire life safety measures every Indian business needs, from prevention to emergency evacuation.',
    slug: 'fire-life-safety-management',
    date: 'May 2026',
    readTime: '8 min',
    category: 'Fire Safety',
  },
  {
    title: 'Why 24/7 Security Matters: The Cost of Gaps in Coverage',
    excerpt: 'Why gaps in security coverage cost businesses more than continuous protection.',
    slug: 'why-247-security-important',
    date: 'April 2026',
    readTime: '5 min',
    category: 'Security Basics',
  },
  {
    title: 'Corporate Office Security: Best Practices for Modern Workplaces',
    excerpt: 'How to secure your corporate office without compromising employee experience and productivity.',
    slug: 'corporate-office-security',
    date: 'April 2026',
    readTime: '6 min',
    category: 'Corporate',
  },
  {
    title: 'Residential Security: Protecting Homes and Apartment Complexes',
    excerpt: 'Security solutions for residential societies, gated communities, and individual homes.',
    slug: 'residential-security-services',
    date: 'April 2026',
    readTime: '6 min',
    category: 'Residential',
  },
  {
    title: 'Hotel Security Management: Guest Safety and Property Protection',
    excerpt: 'Complete guide to hotel security, from guest safety to crowd management in hospitality venues.',
    slug: 'hotel-security-management',
    date: 'March 2026',
    readTime: '7 min',
    category: 'Hospitality',
  },
]

export default function BlogPage() {
  return (
    <main className="blog-page" id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: POSTS.map((post, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `https://www.silbarsecurity.in/blog/${post.slug}`,
            name: post.title,
            description: post.excerpt,
          }))
        })
      }} />
      <PageHero
        eyebrow="KNOWLEDGE HUB"
        title={
          <>
            <SplitTextReveal text="SECURITY" />
            <br />
            <span className="page-hero-title--outline">
              <SplitTextReveal text="INSIGHTS" delay={0.2} />
            </span>
          </>
        }
        subtitle={
          <>Expert advice on security services, compliance, safety tips, and industry trends for Indian businesses.</>
        }
        size="compact"
        topContent={
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Blog</span>
          </nav>
        }
      />

      <section className="service-detail-section-inner blog-listing-section">
        <div className="blog-grid">
          {POSTS.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.05} className="bento-cell glass-panel">
              <Link href={`/blog/${post.slug}`} className="blog-card__link">
                <div className="blog-card__header">
                  <h2 className="blog-card__title">{post.title}</h2>
                  <ArrowRight size={24} className="blog-card__arrow" />
                </div>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <div className="blog-card__meta">
                  <span className="blog-card__meta-item"><Calendar size={12} /> {post.date}</span>
                  <span className="blog-card__meta-item"><Clock size={12} /> {post.readTime}</span>
                  <span className="blog-card__meta-cat">{post.category}</span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="service-detail-bottom-cta">
        <h2 className="service-detail-bottom-cta__title">Need Expert Security Advice?</h2>
        <p className="service-detail-bottom-cta__sub">
          Our security consultants are ready to assess your facility and provide a customized solution.
        </p>
        <div className="service-detail-ctas service-detail-ctas--centered">
          <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--primary">
            Call {CONTACT.phone}
          </a>
          <a
            href={CONTACT.whatsapp.url}
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
