import { MetadataRoute } from 'next'
import { SERVICE_SLUGS } from '@/data/services'
import { INDUSTRY_SLUGS } from '@/data/industries'
import { STATES, CITIES } from '@/data/locations'
import { BLOG_POSTS } from '@/data/blog'

const BASE_URL = 'https://www.silbarsecurity.in'

type Freq = MetadataRoute.Sitemap[number]['changeFrequency']

function entry(
  path: string,
  priority: number,
  changeFrequency: Freq = 'monthly',
  lastModified: Date = new Date()
): MetadataRoute.Sitemap[number] {
  return {
    url: path === '/' ? BASE_URL : `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }
}

/**
 * Complete XML sitemap for Google / Bing.
 * Includes every public marketing URL: core, services, industries,
 * states, cities, blog, legal, franchise, google landing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // ── Core pages (high value) ──
  const corePages: MetadataRoute.Sitemap = [
    entry('/', 1.0, 'weekly', now),
    entry('/services', 0.95, 'weekly', now),
    entry('/security-services', 0.95, 'weekly', now),
    entry('/contact', 0.95, 'monthly', now),
    entry('/about', 0.9, 'monthly', now),
    entry('/industries', 0.9, 'monthly', now),
    entry('/faq', 0.85, 'monthly', now),
    entry('/franchise', 0.85, 'monthly', now),
    entry('/blog', 0.8, 'weekly', now),
    entry('/careers', 0.7, 'monthly', now),
    entry('/clients', 0.7, 'monthly', now),
    entry('/case-studies', 0.7, 'monthly', now),
    entry('/emergency', 0.75, 'monthly', now),
    entry('/gallery', 0.55, 'monthly', now),
    entry('/csr', 0.55, 'monthly', now),
    entry('/google', 0.5, 'monthly', now), // Google Business landing
    entry('/privacy-policy', 0.3, 'yearly', now),
    entry('/terms', 0.3, 'yearly', now),
    entry('/disclaimer', 0.3, 'yearly', now),
  ]

  // ── Service detail pages ──
  const servicePages = SERVICE_SLUGS.map((slug) =>
    entry(`/services/${slug}`, 0.85, 'monthly', now)
  )

  // ── Industry detail pages ──
  const industryPages = INDUSTRY_SLUGS.map((slug) =>
    entry(`/industries/${slug}`, 0.8, 'monthly', now)
  )

  // ── Blog posts ──
  const blogPages = BLOG_POSTS.map((post) =>
    entry(`/blog/${post.slug}`, 0.65, 'monthly', new Date(post.publishedAt))
  )

  // ── State SEO pages ──
  const statePages = STATES.map((state) =>
    entry(`/security-services/${state.slug}`, 0.75, 'monthly', now)
  )

  // ── City SEO pages (tier-1 slightly higher priority) ──
  const cityPages = CITIES.map((city) => {
    const priority = city.tier === 1 ? 0.72 : city.tier === 2 ? 0.65 : 0.58
    return entry(`/security-services/city/${city.slug}`, priority, 'monthly', now)
  })

  return [
    ...corePages,
    ...servicePages,
    ...industryPages,
    ...blogPages,
    ...statePages,
    ...cityPages,
  ]
}
