import type { Metadata } from 'next'

const BASE_URL = 'https://www.silbarsecurity.in'
const SITE_NAME = 'Silbar Security Services'

export function ogMetadata(title: string, description: string, path: string): Partial<Metadata> {
  const url = `${BASE_URL}${path}`
  return {
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_IN',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Silbar Security Services' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
    },
  }
}
