// Centralized site constants — single source of truth

export const SITE = {
  name: 'Silbar Security',
  url: 'https://silbarsecurity.com',
  phone: '+91 98765 43210',
  phoneTel: 'tel:+919876543210',
  email: 'info@silbarsecurity.com',
  tagline: "India's Premier Physical Security & Facility Management",
} as const

export const STATS = [
  { value: 24, suffix: '/7', label: 'Coverage', prefix: '' },
  { value: 96, suffix: '%', label: 'Satisfaction', prefix: '' },
  { value: 5000, suffix: '+', label: 'Guards Deployed', prefix: '' },
  { value: 98, suffix: '%', label: 'Reliability', prefix: '' },
] as const

export const HERO_STATS = [
  { label: 'ANNUAL LOSSES IN INDIA', value: '₹47,000 Cr' },
  { label: 'UNSECURED PREMISES', value: '73%' },
] as const
