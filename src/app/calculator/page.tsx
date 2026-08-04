import type { Metadata } from 'next'
import AdminQuoteCalculator from './AdminQuoteCalculator'

export const metadata: Metadata = {
  title: 'Quote Tool',
  robots: { index: false, follow: false },
}

export default function CalculatorPage() {
  return <AdminQuoteCalculator />
}
