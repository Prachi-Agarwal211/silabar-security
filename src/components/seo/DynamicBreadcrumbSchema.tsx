'use client'

import { usePathname } from 'next/navigation'

const LABEL_MAP: Record<string, string> = {
  '': 'Home',
  'services': 'Services',
  'industries': 'Industries',
  'about': 'About',
  'blog': 'Blog',
  'contact': 'Contact',
  'careers': 'Careers',
  'clients': 'Client Services',
  'privacy-policy': 'Privacy Policy',
  'terms': 'Terms of Use',
  'security-services': 'Security Services',
  'disclaimer': 'Disclaimer',
  'faq': 'FAQs',
}

export default function DynamicBreadcrumbSchema() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  const itemListElement = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.silbarsecurity.in' },
    ...segments.map((seg, i) => {
      const label = LABEL_MAP[seg] || seg.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      return {
        '@type': 'ListItem',
        position: i + 2,
        name: label,
        item: `https://www.silbarsecurity.in/${segments.slice(0, i + 1).join('/')}`,
      }
    }),
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
