import type { Metadata } from 'next'
import { DM_Serif_Display, Inter } from 'next/font/google'
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

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://silbarsecurity.com'),
  title: 'Silbar Security | Professional Security Services India',
  description: 'Veteran-led security guards, vehicle patrol, CCTV surveillance, access control, and facility management across 50+ cities in India. PSARA licensed. ISO 9001:2015 certified.',
  keywords: ['security services India', 'security guards', 'facility management', 'CCTV surveillance', 'vehicle patrol', 'access control', 'PSARA licensed security'],
  openGraph: {
    title: 'Silbar Security | Professional Security Services India',
    description: 'Veteran-led security across 50+ Indian cities. PSARA licensed. ISO certified.',
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
    <html lang="en" className={`${dmSerifDisplay.variable} ${inter.variable}`}>
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
