import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Manrope } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import NavigationWrapper from '@/components/layout/NavigationWrapper'
import DynamicBreadcrumbSchema from '@/components/seo/DynamicBreadcrumbSchema'
import ExitIntentPopup from '@/components/ui/ExitIntentPopup'
import { CONTACT } from '@/lib/config'

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
  metadataBase: new URL('https://www.silbarsecurity.in'),
  title: {
    default: 'Silbar Security Services | Trusted Security Agency India',
    template: '%s | Silbar Security Services',
  },
  description:
    'Silbar Security Services Pvt. Ltd. — ISO 9001:2015 certified security agency with 7,000+ professionals. Manned guarding, electronic surveillance, facility management, and VIP protection across PAN India.',
  keywords: [
    'security agency India',
    'security company India',
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
    title: 'Silbar Security Services | Trusted Security Agency India',
    description:
      'ISO 9001:2015 certified. 7,000+ professionals. Manned guarding, VIP protection, surveillance, and facility management across India.',
    images: [
      {
        url: 'https://www.silbarsecurity.in/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Silbar Security Services — Protecting India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silbar Security Services | Trusted Security Agency India',
    description:
      'ISO 9001:2015 certified. 7,000+ professionals. Security services across PAN India.',
    images: ['https://www.silbarsecurity.in/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.silbarsecurity.in',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/icon-192.png',
  },
  manifest: '/manifest.json',
  verification: {
    google: process.env.GOOGLE_VERIFICATION || '',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0B0E14' },
    { media: '(prefers-color-scheme: light)', color: '#8C1F32' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-IN" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
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
                'ISO 9001:2015 certified private security agency with 7,000+ professionals. Manned guarding, electronic surveillance, facility management, VIP protection across PAN India.',
              telephone: '+91-9352303333',
              email: CONTACT.email,
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
              foundingPlace: {
                '@type': 'Place',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Jaipur',
                  addressRegion: 'Rajasthan',
                  addressCountry: 'IN'
                }
              },
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: '+91-9352303333',
                  contactType: 'customer service',
                  areaServed: [
                    'Rajasthan', 'Delhi', 'Gujarat', 'Maharashtra', 'Karnataka', 
                    'Haryana', 'Uttar Pradesh', 'Punjab', 'Madhya Pradesh', 'Bihar', 
                    'West Bengal', 'Odisha', 'Andhra Pradesh', 'Telangana', 'Tamil Nadu', 
                    'Kerala', 'Assam', 'Jharkhand', 'Chhattisgarh', 'Uttarakhand', 'Himachal Pradesh'
                  ],
                  availableLanguage: ['English', 'Hindi'],
                },
              ],
              sameAs: [
                'https://www.linkedin.com/company/silbar-security-services-private-limited/',
                'https://www.facebook.com/share/1GtattxqNp/',
                'https://g.co/kgs/silbarsecurity',
              ],
              actionableFeedbackPolicy: 'https://www.silbarsecurity.in/contact',
              correctionsPolicy: 'https://www.silbarsecurity.in/contact',
              ethicsPolicy: 'https://www.silbarsecurity.in/about',
              diversityPolicy: 'https://www.silbarsecurity.in/about',
              knowsAbout: [
                'Security Guard Services India',
                'Private Security Agency India',
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
                'Private security agency in India. Manned guarding, CCTV, facility management, event security.',
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
        <DynamicBreadcrumbSchema />
        <NavigationWrapper>{children}</NavigationWrapper>
        <ExitIntentPopup />

        {/* Google Analytics 4 */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        {/* Google Tag Manager */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <Script id="gtm-init" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
            `}
          </Script>
        )}

        {/* Google Tag Manager (noscript) */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
      </body>
    </html>
  )
}
