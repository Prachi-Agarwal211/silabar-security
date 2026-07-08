import type { Metadata } from 'next'
import { SERVICES } from '@/data/services'
import ServicesGrid from '@/components/sections/ServicesGrid'

export const metadata: Metadata = {
  title: 'Security Services — 12 Verticals for Every Industry',
  description:
    'Silbar Security offers manned guarding, industrial security, event security, bank & ATM security, CCTV surveillance, facility management, and more. PSARA-licensed. PAN India.',
  alternates: { canonical: 'https://www.silbarsecurity.in/services' },
}

export default function ServicesPage() {
  return (
    <main className="services-page" id="main-content">
      <ServicesGrid services={SERVICES} />
    </main>
  )
}
