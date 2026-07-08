import type { Metadata } from 'next'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  title: 'PSARA-Licensed Security Services in India | Silbar Security',
  description: 'Silbar Security Services — ISO 9001:2015 & PSARA-2005 certified. 7,000+ licensed officers across PAN India. Manned guarding, CCTV, facility management, VIP protection.',
  alternates: { canonical: 'https://www.silbarsecurity.in' },
  openGraph: {
    title: 'Silbar Security Services | PSARA-Licensed Security Agency India',
    description: 'India\'s trusted PSARA-licensed security agency with 7,000+ officers across 200+ cities.',
  },
}

export default function Home() {
  return <HomePageClient />
}
