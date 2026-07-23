import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Manrope } from 'next/font/google'
import './globals.css'
import NavigationWrapper from '@/components/layout/NavigationWrapper'
import DynamicBreadcrumbSchema from '@/components/seo/DynamicBreadcrumbSchema'
import ExitIntentPopup from '@/components/ui/ExitIntentPopup'
import AnalyticsScripts from '@/components/AnalyticsScripts'
import CookieConsentWrapper from '@/components/CookieConsentWrapper'
import { CONTACT, GOOGLE_REVIEWS } from '@/lib/config'

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
    default: 'Silbar Security Services Pvt. Ltd. | Trusted Security Agency',
    template: '%s | Silbar Security Services Pvt. Ltd.',
  },
  description:
    'Silbar Security Services Pvt. Ltd. — ISO 9001:2015 certified security agency with 7,000+ guards. Manned guarding, CCTV, facility management, VIP protection across India.',
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
  creator: 'Silbar Security Services Pvt. Ltd.',
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
    siteName: 'Silbar Security Services Pvt. Ltd.',
    title: 'Silbar Security Services Pvt. Ltd. | Trusted Security Agency',
    description:
      'ISO 9001:2015 certified. 7,000+ professionals. Manned guarding, VIP protection, surveillance, and facility management across India.',
    images: [
      {
        url: 'https://www.silbarsecurity.in/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Silbar Security Services Pvt. Ltd. — Protecting India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silbar Security Services Pvt. Ltd. | Trusted Security Agency',
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
    'ai-content-declaration': 'public',
    'geo-optimized': 'true',
    'geo.region': 'IN-DL',
    'geo.placename': 'New Delhi, Delhi',
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

        {/* Server-rendered nav for search engine crawlability */}
        <nav aria-label="Site navigation" className="sr-only">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/security-services">Security Services</a>
          <a href="/services/industrial-security">Industrial Security</a>
          <a href="/services/security-guard-services">Security Guard Services</a>
          <a href="/services/event-security">Event Security</a>
          <a href="/services/cctv-surveillance-systems">CCTV Surveillance</a>
          <a href="/industries">Industries We Serve</a>
          <a href="/industries/manufacturing">Manufacturing Security</a>
          <a href="/industries/hospitality">Hospitality Security</a>
          <a href="/case-studies">Case Studies</a>
          <a href="/careers">Careers</a>
          <a href="/blog">Blog</a>
          <a href="/faq">FAQ</a>
          <a href="/gallery">Gallery</a>
          <a href="/contact">Contact Us</a>
          <a href="/security-services">Locations</a>
          <a href="/contact">Get a Quote</a>
          <a href="/franchise">Franchise</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </nav>

        {/* Organization schema — injected globally */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': 'https://www.silbarsecurity.in/#organization',
              name: 'Silbar Security Services Pvt. Ltd.',
              alternateName: 'Silbar Security Services Pvt. Ltd.',
              url: 'https://www.silbarsecurity.in',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.silbarsecurity.in/icon-512.png',
                width: 512,
                height: 512,
              },
              description:
                'ISO 9001:14001:45001:27001 certified PAN India security agency with PSARA licenses across 19 states. Manned guarding, electronic surveillance, facility management, VIP protection across India.',
              telephone: '+91-9982170555',
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
                  telephone: '+91-9982170555',
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
                'https://x.com/silbarsecurity',
                GOOGLE_REVIEWS.profileUrl,
                'https://www.wikidata.org/wiki/Q140635640',
                ...GOOGLE_REVIEWS.offices.map((o) => o.profileUrl),
                ...(CONTACT.officeLocations as unknown as any[]).map((o: any) => o.mapUrl).filter(Boolean),
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
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: String(GOOGLE_REVIEWS.rating),
                reviewCount: String(GOOGLE_REVIEWS.reviewCountNumber),
                bestRating: '5',
                worstRating: '1',
              },
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
              name: 'Silbar Security Services Pvt. Ltd.',
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
              name: 'Silbar Security Services Pvt. Ltd.',
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

        {/* Consent-gated analytics scripts */}
        <AnalyticsScripts />

        {/* Cookie consent banner */}
        <CookieConsentWrapper />
      </body>
    </html>
  )
}
