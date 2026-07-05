// Centralized site constants — single source of truth

export const SITE = {
  name: 'Silbar Security',
  url: 'https://silbarsecurity.com',
  phone: '+91 98765 43210',
  phoneTel: 'tel:+919876543210',
  email: 'info@silbarsecurity.com',
  tagline: 'Professional Security. Zero Compromise.',
} as const

export const STATS = [
  { value: 24, suffix: '/7', label: 'Coverage', prefix: '' },
  { value: 96, suffix: '%', label: 'Satisfaction', prefix: '' },
  { value: 5000, suffix: '+', label: 'Guards Deployed', prefix: '' },
  { value: 98, suffix: '%', label: 'Reliability', prefix: '' },
] as const
