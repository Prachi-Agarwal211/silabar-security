/**
 * Single source of truth for public page counts.
 * Used on Locations page, footer, and internal reporting so clients
 * see the real inventory (~320), not partial crawls.
 */
import { SERVICES } from '@/data/services'
import { INDUSTRIES } from '@/data/industries'
import { STATES, CITIES } from '@/data/locations'
import { BLOG_POSTS } from '@/data/blog'

/** Core marketing pages (not generated from lists) */
export const CORE_PAGES = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/industries', label: 'Industries' },
  { path: '/security-services', label: 'Locations' },
  { path: '/contact', label: 'Contact' },
  { path: '/blog', label: 'Blog' },
  { path: '/faq', label: 'FAQ' },
  { path: '/franchise', label: 'Franchise' },
  { path: '/careers', label: 'Careers' },
  { path: '/case-studies', label: 'Case Studies' },
  { path: '/clients', label: 'Clients' },
  { path: '/csr', label: 'CSR' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/google', label: 'Google Landing' },
  { path: '/emergency', label: 'Emergency' },
  { path: '/privacy-policy', label: 'Privacy Policy' },
  { path: '/terms', label: 'Terms' },
  { path: '/disclaimer', label: 'Disclaimer' },
] as const

export const SITE_STATS = {
  core: CORE_PAGES.length,
  services: SERVICES.length,
  industries: INDUSTRIES.length,
  states: STATES.length,
  cities: CITIES.length,
  blog: BLOG_POSTS.length,
  get total() {
    return (
      this.core +
      this.services +
      this.industries +
      this.states +
      this.cities +
      this.blog
    )
  },
  get locationPages() {
    return this.states + this.cities
  },
} as const

/** Human label e.g. "320+" */
export function formatPageCount(n = SITE_STATS.total): string {
  return `${n}+`
}
