import type { Metadata } from 'next'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  title: 'Security Services in India | Silbar Security',
  description: 'Silbar Security Services — 4 ISO certified (IAF), PSARA licensed across 19 states. PAN India security services. Manned guarding, CCTV, facility management, VIP protection.',
  alternates: { canonical: 'https://www.silbarsecurity.in' },
  openGraph: {
    title: 'Silbar Security Services | Trusted Security Agency India',
    description: 'India\'s trusted security agency with PSARA licenses across 19 states and 4 ISO certifications.',
  },
}

export default function Home() {
  return <HomePageClient />
}
