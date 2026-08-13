import type { Metadata } from 'next'
import HomePageClient from './HomePageClient'
import { seoDescription, seoTitle } from '@/lib/metadata'

export const metadata: Metadata = {
  title: seoTitle('Silbar Security — PSARA-Licensed Security Agency India'),
  description: seoDescription('Silbar Security Services Pvt. Ltd. — 4 ISO certified, PSARA licensed across 19 states. Manned guarding, CCTV, facility management, VIP protection across India.'),
  alternates: { canonical: 'https://www.silbarsecurity.in' },
  openGraph: {
    title: 'Silbar Security Services Pvt. Ltd. — PSARA-Licensed Security Agency India',
    description: 'India\'s PSARA-licensed security agency serving 19 states with 4 ISO certifications.',
    images: [
      {
        url: 'https://www.silbarsecurity.in/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Silbar Security Services Pvt. Ltd.',
      },
    ],
  },
}

export default function Home() {
  return (
    <HomePageClient />
  );
}
