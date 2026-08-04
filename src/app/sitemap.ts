import type { MetadataRoute } from 'next'
import { SERVICES } from '@/data/services'
import { INDUSTRIES } from '@/data/industries'
import { STATES, CITIES } from '@/data/locations'
import { BLOG_POSTS } from '@/data/blog'
import { CASE_STUDIES } from '@/data/case-studies'
import { CAREERS } from '@/data/careers'

const BASE_URL = 'https://www.silbarsecurity.in'
const BUILD_DATE = new Date()

/**
 * Flat sitemap — under 50 000 URLs so no sitemap index needed.
 * All 546+ pages are listed here so Google discovers everything.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = []

  // ── Core pages ──
  const coreRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'] }[] = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/services', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/industries', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/security-services', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/quote-calculator', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.95, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/faq', priority: 0.75, changeFrequency: 'monthly' },
    { path: '/franchise', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/careers', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/case-studies', priority: 0.75, changeFrequency: 'monthly' },
    { path: '/clients', priority: 0.65, changeFrequency: 'monthly' },
    { path: '/csr', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/gallery', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/certification', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/emergency', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/google', priority: 0.5, changeFrequency: 'monthly' },
  ]

  for (const r of coreRoutes) {
    urls.push({
      url: `${BASE_URL}${r.path}`,
      lastModified: BUILD_DATE,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })
  }

  // ── Service pages ──
  for (const s of SERVICES) {
    urls.push({
      url: `${BASE_URL}/services/${s.slug}`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.75,
    })
  }

  // ── Industry pages ──
  for (const i of INDUSTRIES) {
    urls.push({
      url: `${BASE_URL}/industries/${i.slug}`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  // ── State pages ──
  for (const st of STATES) {
    urls.push({
      url: `${BASE_URL}/security-services/${st.slug}`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.65,
    })
  }

  // ── City pages (334+) ──
  for (const c of CITIES) {
    urls.push({
      url: `${BASE_URL}/security-services/city/${c.slug}`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: c.tier === 1 ? 0.7 : 0.55,
    })
  }

  // ── Blog posts (with actual lastmod dates) ──
  for (const b of BLOG_POSTS) {
    urls.push({
      url: `${BASE_URL}/blog/${b.slug}`,
      lastModified: b.modifiedAt
        ? new Date(b.modifiedAt)
        : b.publishedAt
          ? new Date(b.publishedAt)
          : BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.55,
    })
  }

  // ── Case studies ──
  for (const cs of CASE_STUDIES) {
    urls.push({
      url: `${BASE_URL}/case-studies/${cs.slug}`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }

  // ── Career posts ──
  for (const job of CAREERS) {
    urls.push({
      url: `${BASE_URL}/careers/${job.slug}`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 0.5,
    })
  }

  return urls
}
