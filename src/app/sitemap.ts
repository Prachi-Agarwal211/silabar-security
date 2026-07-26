import type { MetadataRoute } from 'next'
import { SERVICES } from '@/data/services'
import { INDUSTRIES } from '@/data/industries'
import { STATES, CITIES } from '@/data/locations'
import { BLOG_POSTS } from '@/data/blog'
import { CASE_STUDIES } from '@/data/case-studies'
import { CAREERS } from '@/data/careers'

const BASE_URL = 'https://www.silbarsecurity.in'

/** Core marketing routes (always indexable) */
const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'] }[] = [
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
  // privacy indexable; terms/disclaimer noindex in metadata — omit from sitemap
]

/**
 * Full public inventory for Google + AI crawlers.
 * Built from live data modules so city/state/service pages are not left out of discovery.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const urls: MetadataRoute.Sitemap = []

  for (const r of staticRoutes) {
    urls.push({
      url: `${BASE_URL}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })
  }

  for (const s of SERVICES) {
    urls.push({
      url: `${BASE_URL}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    })
  }

  for (const i of INDUSTRIES) {
    urls.push({
      url: `${BASE_URL}/industries/${i.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  for (const st of STATES) {
    urls.push({
      url: `${BASE_URL}/security-services/${st.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.65,
    })
  }

  for (const c of CITIES) {
    urls.push({
      url: `${BASE_URL}/security-services/city/${c.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: c.tier === 1 ? 0.7 : 0.55,
    })
  }

  for (const b of BLOG_POSTS) {
    urls.push({
      url: `${BASE_URL}/blog/${b.slug}`,
      lastModified: b.publishedAt ? new Date(b.publishedAt) : now,
      changeFrequency: 'monthly',
      priority: 0.55,
    })
  }

  for (const cs of CASE_STUDIES) {
    urls.push({
      url: `${BASE_URL}/case-studies/${cs.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }

  for (const job of CAREERS) {
    urls.push({
      url: `${BASE_URL}/careers/${job.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.5,
    })
  }

  return urls
}
