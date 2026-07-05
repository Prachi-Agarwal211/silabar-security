import { SITE } from '@/lib/constants'

export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.name,
    image: `${SITE.url}/og-image.png`,
    url: SITE.url,
    telephone: '+91-98765-43210',
    email: SITE.email,
    description: "India's most professional Physical Security & Facility Management company. Protecting people, property, and peace of mind.",
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressRegion: 'Delhi',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.6139,
      longitude: 77.209,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '250',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
