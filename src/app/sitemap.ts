import type { MetadataRoute } from 'next'
import { SERVICES } from '@/data/services'
import { INDUSTRIES } from '@/data/industries'
import { STATES, CITIES } from '@/data/locations'
import { BLOG_POSTS } from '@/data/blog'
import { CASE_STUDIES } from '@/data/case-studies'
import { CAREERS } from '@/data/careers'

const BASE_URL = 'https://www.silbarsecurity.in'
const BUILD_DATE = new Date()

// ─── Sitemap Index Segments ───────────────────────────────────────────

type SitemapSegment = { id: string }

export async function generateSitemaps(): Promise<SitemapSegment[]> {
  return [
    { id: 'core' },
    { id: 'services' },
    { id: 'industries' },
    { id: 'states' },
    { id: 'cities' },
    { id: 'blog' },
    { id: 'case-studies' },
    { id: 'careers' },
  ]
}

// ─── Individual Segment Generators ────────────────────────────────────

function corePages(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'] }[] = [
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
    { path: '/google', priority: 0.5, changeFrequency: 'monthly' },
  ]

  return routes.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: BUILD_DATE,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
}

function servicePages(): MetadataRoute.Sitemap {
  // Services: lastmod derived from the service data (all share BUILD_DATE since static)
  return SERVICES.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))
}

function industryPages(): MetadataRoute.Sitemap {
  return INDUSTRIES.map((i) => ({
    url: `${BASE_URL}/industries/${i.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
}

function statePages(): MetadataRoute.Sitemap {
  return STATES.map((st) => ({
    url: `${BASE_URL}/security-services/${st.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }))
}

function cityPages(): MetadataRoute.Sitemap {
  return CITIES.map((c) => ({
    url: `${BASE_URL}/security-services/city/${c.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'monthly' as const,
    priority: c.tier === 1 ? 0.7 : 0.55,
  }))
}

function blogPages(): MetadataRoute.Sitemap {
  return BLOG_POSTS.map((b) => ({
    url: `${BASE_URL}/blog/${b.slug}`,
    lastModified: b.modifiedAt
      ? new Date(b.modifiedAt)
      : b.publishedAt
        ? new Date(b.publishedAt)
        : BUILD_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.55,
  }))
}

function caseStudyPages(): MetadataRoute.Sitemap {
  return CASE_STUDIES.map((cs) => ({
    url: `${BASE_URL}/case-studies/${cs.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
}

function careerPages(): MetadataRoute.Sitemap {
  return CAREERS.map((job) => ({
    url: `${BASE_URL}/careers/${job.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))
}

// ─── Default export — dispatches by segment id ────────────────────────

export default function sitemap({
  id,
}: {
  id: string
}): MetadataRoute.Sitemap {
  switch (id) {
    case 'core':
      return corePages()
    case 'services':
      return servicePages()
    case 'industries':
      return industryPages()
    case 'states':
      return statePages()
    case 'cities':
      return cityPages()
    case 'blog':
      return blogPages()
    case 'case-studies':
      return caseStudyPages()
    case 'careers':
      return careerPages()
    default:
      return []
  }
}
