import type { Metadata } from 'next'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  title: 'Security Services in India | Silbar Security',
  description: 'Silbar Security Services — ISO 9001:2015 certified. 7,000+ professionals across PAN India. Manned guarding, CCTV, facility management, VIP protection.',
  alternates: { canonical: 'https://www.silbarsecurity.in' },
  openGraph: {
    title: 'Silbar Security Services | Trusted Security Agency India',
    description: 'India\'s trusted security agency with 7,000+ professionals across 200+ cities.',
  },
}

export default function Home() {
  return <HomePageClient />
}
