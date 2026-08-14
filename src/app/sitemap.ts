import type { MetadataRoute } from 'next'
import { SERVICES } from '@/data/services'
import { INDUSTRIES } from '@/data/industries'
import { STATES, CITIES } from '@/data/locations'
import { BLOG_POSTS } from '@/data/blog'
import { CASE_STUDIES } from '@/data/case-studies'
import { CAREERS } from '@/data/careers'
import { clampToToday } from '@/lib/content-dates'

const BASE_URL = 'https://www.silbarsecurity.in'

/**
 * Stable sitemap date. Google distrusts <lastmod> that changes on every
 * deploy (build-time `new Date()`) — it looks like artificial churn and can
 * keep pages stuck as "Discovered / crawled — currently not indexed".
 * Use a fixed launch date for templated pages so the sitemap stays honest:
 * only blog posts carry their real publication dates.
 */
const SITE_LAUNCH_DATE = new Date('2026-08-04T00:00:00.000Z')

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
  ]

  for (const r of coreRoutes) {
    urls.push({
      url: `${BASE_URL}${r.path}`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })
  }

  // ── Service pages ──
  for (const s of SERVICES) {
    urls.push({
      url: `${BASE_URL}/services/${s.slug}`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: 'monthly',
      priority: 0.75,
    })
  }

  // ── Industry pages ──
  for (const i of INDUSTRIES) {
    urls.push({
      url: `${BASE_URL}/industries/${i.slug}`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  // ── State pages ──
  for (const st of STATES) {
    urls.push({
      url: `${BASE_URL}/security-services/${st.slug}`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: 'monthly',
      priority: 0.65,
    })
  }

  // ── City pages (334+) ──
  for (const c of CITIES) {
    urls.push({
      url: `${BASE_URL}/security-services/city/${c.slug}`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: 'monthly',
      priority: c.tier === 1 ? 0.7 : 0.55,
    })
  }

  // ── Blog posts (real publication dates — never future) ──
  for (const b of BLOG_POSTS) {
    // Safety net: never emit a future lastmod (clamp handles it upstream too).
    const lastModified = new Date(`${clampToToday(b.publishedAt)}T00:00:00.000Z`)
    urls.push({
      url: `${BASE_URL}/blog/${b.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.55,
    })
  }

  // ── Case studies ──
  for (const cs of CASE_STUDIES) {
    urls.push({
      url: `${BASE_URL}/case-studies/${cs.slug}`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }

  // ── Career posts ──
  for (const job of CAREERS) {
    urls.push({
      url: `${BASE_URL}/careers/${job.slug}`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: 'weekly',
      priority: 0.5,
    })
  }

  return urls
}
