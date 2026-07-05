import type { Metadata } from 'next'
import { Space_Grotesk, Manrope } from 'next/font/google'
import './globals.css'
import { SmoothScrollProvider } from '@/providers/smooth-scroll'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import OrganizationSchema from '@/components/seo/OrganizationSchema'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
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
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
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
