import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Manrope, Oswald } from 'next/font/google'
import './globals.css'
import NavigationWrapper from '@/components/layout/NavigationWrapper'

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

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.silbarsecurity.in'),
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
    google: 'REAL_TOKEN_HERE',
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
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable} ${oswald.variable}`}>
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
              foundingDate: '2005',
              numberOfEmployees: { '@type': 'QuantitativeValue', value: 7000 },
              address: {
                '@type': 'PostalAddress',
                streetAddress: '208, 2nd Floor, Samod Tower, Sansar Chand Road',
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
              actionableFeedbackPolicy: 'https://www.silbarsecurity.in/contact',
              correctionsPolicy: 'https://www.silbarsecurity.in/contact',
              ethicsPolicy: 'https://www.silbarsecurity.in/about',
              diversityPolicy: 'https://www.silbarsecurity.in/about',
              knowsAbout: [
                'Security Guard Services India',
                'PSARA Licensed Security Agency',
                'Manned Guarding Services',
                'Industrial Security',
                'Electronic Surveillance',
                'Facility Management',
                'Event Security',
                'Bank ATM Security',
                'Fire Life Safety',
                'Mobile Patrol Security',
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
        {/* WebSite + SearchAction + Speakable schema — GEO-optimized */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': 'https://www.silbarsecurity.in/#website',
              url: 'https://www.silbarsecurity.in',
              name: 'Silbar Security Services',
              description:
                'PSARA-licensed private security agency in India. Manned guarding, CCTV, facility management, event security.',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://www.silbarsecurity.in/search?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
              speakable: {
                '@type': 'SpeakableSpecification',
                cssSelector: ['.seo-page-title', '.seo-page-subtitle', '.service-detail-section-title', '.service-detail-faq-q'],
              },
            }),
          }}
        />
        {/* BreadcrumbList schema — default home */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.silbarsecurity.in' },
                { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.silbarsecurity.in/services' },
                { '@type': 'ListItem', position: 3, name: 'Industries', item: 'https://www.silbarsecurity.in/industries' },
                { '@type': 'ListItem', position: 4, name: 'Contact', item: 'https://www.silbarsecurity.in/contact' },
              ],
            }),
          }}
        />
        <NavigationWrapper>{children}</NavigationWrapper>
      </body>
    </html>
  )
}
