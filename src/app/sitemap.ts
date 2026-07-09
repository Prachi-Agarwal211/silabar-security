import { MetadataRoute } from 'next'
import { SERVICE_SLUGS } from '@/data/services'
import { INDUSTRY_SLUGS } from '@/data/industries'
import { STATES, CITIES as ALL_CITIES } from '@/data/locations'

const BASE_URL = 'https://www.silbarsecurity.in'

const BLOG_SLUGS = [
  'psara-compliance-guide-2026',
  'security-services-jaipur-guide',
  'how-to-choose-security-agency-india',
  'manned-guarding-vs-cctv',
  'hospital-security-india',
  'industrial-security-factory-guide',
  'event-security-management-india',
  'vip-protection-services-india',
  'bank-atm-security-india',
  'construction-site-security-india',
  'school-college-security-india',
  'shopping-mall-security',
  'fire-life-safety-management',
  'why-247-security-important',
  'corporate-office-security',
  'security-guard-license-procedure',
  'residential-security-services',
  'security-guard-training-standards',
  'hotel-security-management',
]

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
    { url: `${BASE_URL}/privacy-policy`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.3 },
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

  // Blog posts
  const blogPages = BLOG_SLUGS.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
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
