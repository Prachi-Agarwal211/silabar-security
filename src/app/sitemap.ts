import { MetadataRoute } from 'next'
import { SERVICE_SLUGS } from '@/data/services'
import { INDUSTRY_SLUGS } from '@/data/industries'
import { STATES, CITIES as ALL_CITIES } from '@/data/locations'
import { BLOG_POSTS } from '@/data/blog'

const BASE_URL = 'https://www.silbarsecurity.in'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Core pages
  const corePages = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/industries`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/careers`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/security-services`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE_URL}/disclaimer`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${BASE_URL}/clients`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/case-studies`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/gallery`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE_URL}/csr`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE_URL}/emergency`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
  ]

  // Service pages
  const servicePages = SERVICE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Industry pages
  const industryPages = INDUSTRY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/industries/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Blog posts — dynamic from data (not hardcoded)
  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // State SEO pages
  const statePages = STATES.map((state) => ({
    url: `${BASE_URL}/security-services/${state.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // City SEO pages
  const cityPages = ALL_CITIES.map((city) => ({
    url: `${BASE_URL}/security-services/city/${city.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...corePages, ...servicePages, ...industryPages, ...blogPages, ...statePages, ...cityPages]
}
