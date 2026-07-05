import type { Metadata } from 'next'
import { DM_Serif_Display, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import { SmoothScrollProvider } from '@/providers/smooth-scroll'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import OrganizationSchema from '@/components/seo/OrganizationSchema'

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://silbarsecurity.com'),
  title: 'Silbar Security | India\'s Premier Physical Security & Facility Management',
  description: 'Professional security guards, vehicle patrol, CCTV surveillance, access control, and facility management services across 50+ cities in India. 96% customer satisfaction.',
  keywords: ['security services India', 'security guards', 'facility management', 'CCTV surveillance', 'vehicle patrol', 'access control'],
  openGraph: {
    title: 'Silbar Security | Professional Security Services India',
    description: 'India\'s most professional Physical Security & Facility Management company.',
    type: 'website',
    locale: 'en_IN',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${sourceSans3.variable}`}>
      <body>
        <OrganizationSchema />
        <SmoothScrollProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
