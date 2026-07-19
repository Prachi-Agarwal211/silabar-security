import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Manrope } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import NavigationWrapper from '@/components/layout/NavigationWrapper'
import DynamicBreadcrumbSchema from '@/components/seo/DynamicBreadcrumbSchema'
import ExitIntentPopup from '@/components/ui/ExitIntentPopup'
import { CONTACT } from '@/lib/config'

// Fewer weights = faster first paint on MacBook / 4G
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['500', '600', '700'],
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
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
    types: {
      'text/plain': [{ url: '/llms.txt', title: 'llms.txt' }],
    },
  },
  other: {
    'ai-content-declaration': 'human-authored-brand-site',
    'geo-optimized': 'true',
  },
  category: 'security',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
                url: 'https://www.silbarsecurity.in/icon-512.png',
                width: 512,
                height: 512,
              },
              description:
                'ISO 9001:14001:45001:27001 certified PAN India security agency with PSARA licenses across 19 states. Manned guarding, electronic surveillance, facility management, VIP protection across India.',
              telephone: '+91-9352303333',
              email: CONTACT.email,
              foundingDate: '2018',
              numberOfEmployees: { '@type': 'QuantitativeValue', value: 7000 },
              address: {
                '@type': 'PostalAddress',
                streetAddress: '5th Floor, Statesman House, Plot No. 148, Barakhamba Road, Connaught Place',
                addressLocality: 'New Delhi',
                addressRegion: 'Delhi',
                postalCode: '110001',
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
                'https://www.instagram.com/silbar_security',
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
                'Security Guard Services Jaipur',
                'Security Agency Delhi NCR',
                'Security Company Ahmedabad',
              ],
              slogan: 'Building Trust Through Professional Security & Compliance',
              areaServed: { '@type': 'Country', name: 'India' },
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
        {/* WebSite + Speakable — Generative Engine Optimization */}
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
                'ISO 9001:2015 certified private security agency in India. Manned guarding, industrial security, CCTV support, facility protection across 200+ cities.',
              inLanguage: 'en-IN',
              publisher: { '@id': 'https://www.silbarsecurity.in/#organization' },
              speakable: {
                '@type': 'SpeakableSpecification',
                cssSelector: [
                  '.seo-page-title',
                  '.seo-page-subtitle',
                  '.service-detail-section-title',
                  '.service-detail-faq-q',
                  '.service-detail-faq-a',
                  '.about-hero__title',
                  '.section-heading',
                  '.seo-about-content p',
                  '.service-detail-hero-content p',
                  '.industry-description p',
                  '.city-description p',
                  '.faq-answer p',
                  '.benefit-item__text',
                  '.job-card__desc',
                  '.certification-description',
                  '.case-study-summary',
                  '.blog-post-content p',
                  '.service-detail-features li',
                  '.service-detail-bottom-cta__title',
                  '.service-detail-bottom-cta__sub',
                ],
              },
            }),
          }}
        />
        {/* ProfessionalService schema for GEO answer engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              '@id': 'https://www.silbarsecurity.in/#security-service',
              name: 'Silbar Security Guard Services',
              image: 'https://www.silbarsecurity.in/og-image.jpg',
              url: 'https://www.silbarsecurity.in',
              telephone: CONTACT.phone,
              priceRange: '$$',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '5th Floor, Statesman House, Plot No. 148, Barakhamba Road, Connaught Place',
                addressLocality: 'New Delhi',
                addressRegion: 'Delhi',
                postalCode: '110001',
                addressCountry: 'IN',
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                opens: '09:00',
                closes: '19:00',
              },
              areaServed: 'IN',
              serviceType: [
                'Manned Guarding',
                'Industrial Security',
                'Event Security',
                'Facility Security',
              ],
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
