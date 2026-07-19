import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.silbarsecurity.in'

const staticRoutes = [
  '', '/about', '/blog', '/careers', '/case-studies',
  '/certification', '/clients', '/contact', '/csr',
  '/disclaimer', '/emergency', '/faq', '/franchise',
  '/gallery', '/google', '/industries', '/privacy-policy',
  '/security-services', '/services', '/terms',
]

const industries = [
  'banking-finance', 'government-psus', 'healthcare',
  'hospitality', 'it-telecom', 'logistics-supply-chain',
  'manufacturing', 'residential-real-estate',
  'commercial-real-estate', 'retail',
]

const services = [
  'armed-security-guards', 'bank-atm-security',
  'bouncer-vip-protection', 'cctv-surveillance-systems',
  'corporate-security', 'emergency-response',
  'event-security', 'facility-management',
  'fire-life-safety', 'industrial-security',
  'mobile-patrol-security', 'retail-security',
  'school-college-security', 'security-consulting',
  'security-guard-services', 'unarmed-security-guards',
  'warehouse-security',
]

const blogSlugs = [
  'security-guard-services-in-delhi',
  'security-awareness-month-2026',
  'importance-of-security-audits',
]

const states = [
  'andhra-pradesh', 'bihar', 'chhattisgarh', 'delhi',
  'gujarat', 'haryana', 'himachal-pradesh', 'jharkhand',
  'karnataka', 'kerala', 'madhya-pradesh', 'maharashtra',
  'odisha', 'punjab', 'rajasthan', 'tamil-nadu',
  'telangana', 'uttar-pradesh', 'uttarakhand', 'west-bengal',
  'assam',
]

const cities = [
  'ahmedabad', 'bangalore', 'bhopal', 'chandigarh',
  'chennai', 'coimbatore', 'delhi', 'ghaziabad',
  'gurugram', 'hyderabad', 'indore', 'jaipur',
  'jodhpur', 'kolkata', 'kochi', 'lucknow',
  'ludhiana', 'mumbai', 'nagpur', 'noida',
  'patna', 'pune', 'ranchi', 'surat',
  'thane', 'vadodara', 'varanasi',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = []

  for (const route of staticRoutes) {
    urls.push({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1.0 : route === '/contact' ? 0.9 : 0.8,
    })
  }

  for (const slug of services) {
    urls.push({
      url: `${BASE_URL}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  for (const slug of industries) {
    urls.push({
      url: `${BASE_URL}/industries/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  for (const state of states) {
    urls.push({
      url: `${BASE_URL}/security-services/${state}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }

  for (const city of cities) {
    urls.push({
      url: `${BASE_URL}/security-services/city/${city}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }

  for (const slug of blogSlugs) {
    urls.push({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    })
  }

  return urls
}
