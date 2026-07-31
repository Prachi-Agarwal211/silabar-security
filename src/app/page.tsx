import type { Metadata } from 'next'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  title: 'Security Services in India | Silbar Security Services Pvt. Ltd.',
  description: 'Silbar Security Services Pvt. Ltd. — 4 ISO certified, PSARA licensed across 19 states. Manned guarding, CCTV, facility management, VIP protection across India.',
  alternates: { canonical: 'https://www.silbarsecurity.in' },
  openGraph: {
    title: 'Silbar Security Services Pvt. Ltd. | PSARA-Licensed Security Agency India',
    description: 'India\'s PSARA-licensed security agency serving 19 states with 4 ISO certifications.',
  },
}

export default function Home() {
  return <HomePageClient />
}
