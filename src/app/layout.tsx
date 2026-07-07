import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Manrope } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Silbar Security Services | PSARA-Licensed Security Agency India',
    template: '%s | Silbar Security Services',
  },
  description:
    'Silbar Security Services Pvt. Ltd. — ISO 9001:2015 & PSARA-2005 certified security agency with 7,000+ licensed officers. Manned guarding, electronic surveillance, facility management, and VIP protection across PAN India.',
  keywords: [
    'security agency India',
    'PSARA licensed security company',
    'manned guarding services',
    'industrial security Rajasthan',
    'security guard company Jaipur',
    'facility management India',
    'CCTV surveillance services',
    'event security India',
  ],
  authors: [{ name: 'Silbar Security Services Pvt. Ltd.' }],
  creator: 'Silbar Security Services',
  publisher: 'Silbar Security Services Pvt. Ltd.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.silbarsecurity.in',
    siteName: 'Silbar Security Services',
    title: 'Silbar Security Services | PSARA-Licensed Security Agency India',
    description:
      'ISO 9001:2015 & PSARA-2005 certified. 7,000+ licensed officers. Manned guarding, VIP protection, surveillance, and facility management across India.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Silbar Security Services — Protecting India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silbar Security Services | PSARA-Licensed Security Agency India',
    description:
      'ISO certified. 7,000+ officers. Security services across PAN India.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.silbarsecurity.in',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:bg-gold focus:text-midnight focus:px-4 focus:py-2 focus:font-body focus:font-semibold"
        >
          Skip to content
        </a>
        {/* Organization schema — injected globally */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': 'https://www.silbarsecurity.in/#organization',
              name: 'Silbar Security Services Pvt. Ltd.',
              alternateName: 'Silbar Security',
              url: 'https://www.silbarsecurity.in',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.silbarsecurity.in/logo.png',
                width: 300,
                height: 60,
              },
              description:
                'ISO 9001:2015 & PSARA-2005 certified private security agency with 7,000+ licensed officers. Manned guarding, electronic surveillance, facility management, VIP protection across PAN India.',
              telephone: '+91-9352303333',
              email: 'info@silbarsecurity.in',
              foundingDate: '2008',
              numberOfEmployees: { '@type': 'QuantitativeValue', value: 7000 },
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Head Office Address',
                addressLocality: 'Jaipur',
                addressRegion: 'Rajasthan',
                postalCode: '302001',
                addressCountry: 'IN',
              },
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: '+91-9352303333',
                  contactType: 'customer service',
                  areaServed: 'IN',
                  availableLanguage: ['English', 'Hindi'],
                },
              ],
              sameAs: [
                'https://www.linkedin.com/company/silbar-security',
                'https://www.facebook.com/silbarsecurity',
              ],
              hasCredential: [
                {
                  '@type': 'EducationalOccupationalCredential',
                  credentialCategory: 'license',
                  name: 'PSARA License',
                  recognizedBy: { '@type': 'Organization', name: 'Government of India' },
                },
                {
                  '@type': 'EducationalOccupationalCredential',
                  credentialCategory: 'certification',
                  name: 'ISO 9001:2015',
                  recognizedBy: { '@type': 'Organization', name: 'Bureau Veritas' },
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  )
}
