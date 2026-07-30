import type { Metadata } from 'next'

const BASE_URL = 'https://www.silbarsecurity.in'
const SITE_NAME = 'Silbar Security Services Pvt. Ltd.'

export function ogMetadata(
  title: string,
  description: string,
  path: string,
  image?: string
): Partial<Metadata> {
  const url = `${BASE_URL}${path}`
  const ogImage = image
    ? `${BASE_URL}${image}`
    : `${BASE_URL}/images/og/default-og.svg`

  return {
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_IN',
      images: [{ url: ogImage, width: 1200, height: 630, alt: 'Silbar Security Services Pvt. Ltd.' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}
