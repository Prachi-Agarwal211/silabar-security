import { SITE } from '@/lib/constants'

export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    description: "India's most professional Physical Security & Facility Management company.",
    foundingDate: '2010',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressRegion: 'Delhi',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-98765-43210',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
