import type { Metadata, Viewport } from 'next'
import Link from 'next/link'
import './globals.css'
import NavigationWrapper from '@/components/layout/NavigationWrapper'
import StickyCta from '@/components/layout/StickyCta'
import DynamicBreadcrumbSchema from '@/components/seo/DynamicBreadcrumbSchema'
import ExitIntentPopup from '@/components/ui/ExitIntentPopup'
import AnalyticsScripts from '@/components/AnalyticsScripts'
import CookieConsentWrapper from '@/components/CookieConsentWrapper'
import { CONTACT, GOOGLE_REVIEWS } from '@/lib/config'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.silbarsecurity.in'),
  title: {
    default: 'Silbar Security Services Pvt. Ltd. | PSARA Security Agency India',
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
    title: 'Silbar Security — PSARA-Licensed Security Agency India',
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
    title: 'Silbar Security — PSARA-Licensed Security Agency India',
    description:
      'ISO 9001:2015 certified. 7,000+ professionals. Security services across PAN India.',
    images: ['https://www.silbarsecurity.in/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.silbarsecurity.in',
    types: {
      'text/plain': [
        { url: '/llms.txt', title: 'llms.txt' },
        { url: '/ai.txt', title: 'ai.txt' },
      ],
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
    <html lang="en-IN">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:bg-gold focus:text-midnight focus:px-4 focus:py-2 focus:font-body focus:font-semibold"
        >
          Skip to content
        </a>

        {/* Server-rendered nav for search engine crawlability */}
        <nav aria-label="Site navigation" className="sr-only">
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/security-services">Security Services</Link>
          <Link href="/services/industrial-security">Industrial Security</Link>
          <Link href="/services/manned-guarding">Security Guard Services</Link>
          <Link href="/services/event-security">Event Security</Link>
          <Link href="/services/electronic-surveillance">CCTV Surveillance</Link>
          <Link href="/industries">Industries We Serve</Link>
          <Link href="/industries/manufacturing">Manufacturing Security</Link>
          <Link href="/industries/hotels">Hotel &amp; Hospitality Security</Link>
          <Link href="/case-studies">Case Studies</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/security-services">Locations</Link>
          <Link href="/contact">Get a Quote</Link>
          <Link href="/franchise">Franchise</Link>
          <Link href="/certification">Certifications</Link>
          <Link href="/csr">CSR</Link>
          <Link href="/emergency">Emergency</Link>
          <Link href="/disclaimer">Disclaimer</Link>
          <Link href="/terms">Terms of Use</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
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
              // Search variants people actually type — lets Google connect these phrases to the entity
              // (and disambiguate from the US-based 'Silbar Security' franchise, silbarsecurity.com).
              alternateName: [
                'Silbar Security Services Pvt. Ltd.',
                'Silbar Security Services Private Limited',
                'Silbar Security Private Limited',
                'Silbar Security',
                'Silbar Security India',
              ],
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
              sameAs: Array.from(new Set([
                'https://www.linkedin.com/company/silbar-security-services-private-limited/',
                CONTACT.social.facebook,
                'https://www.instagram.com/silbar_security',
                'https://x.com/silbarsecurity',
                GOOGLE_REVIEWS.profileUrl,
                // NOTE: no Wikidata link yet — Q140635640 does not exist and a dead
                // sameAs reference fragments entity resolution. Add the real Wikidata
                // item here once it has been created (see docs/ENTITY-VISIBILITY-CHECKLIST.md).
                ...GOOGLE_REVIEWS.offices.map((o) => o.profileUrl),
                ...CONTACT.officeLocations.map((o) => o.mapUrl).filter(Boolean),
              ])),
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
        {/* Service schema — describes what Silbar actually does (merged from former separate ProfessionalService) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              '@id': 'https://www.silbarsecurity.in/#security-service',
              name: 'Silbar Security Services Pvt. Ltd.',
              description: 'Manned guarding, industrial security, event security, facility management, CCTV surveillance, and VIP protection services across India.',
              provider: { '@id': 'https://www.silbarsecurity.in/#organization' },
              image: 'https://www.silbarsecurity.in/og-image.jpg',
              url: 'https://www.silbarsecurity.in',
              telephone: CONTACT.phone,
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
        <StickyCta />
        <ExitIntentPopup />

        {/* Consent-gated analytics scripts */}
        <AnalyticsScripts />

        {/* Cookie consent banner */}
        <CookieConsentWrapper />
      </body>
    </html>
  )
}
