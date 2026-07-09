import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { STATES } from '@/data/locations'
import { SERVICES } from '@/data/services'
import { ArrowRight, Phone, MapPin } from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'

export const revalidate = 86400 // ISR — revalidate once per day

export async function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>
}): Promise<Metadata> {
  const { state } = await params
  const location = STATES.find((s) => s.slug === state)
  if (!location) return {}

  const title = `Security Guard Services in ${location.name} | Silbar Security`
  const description = `PSARA-licensed security guard services in ${location.name}. Silbar Security provides manned guarding, industrial security, CCTV surveillance, and facility management across ${location.majorCities.slice(0, 3).join(', ')} and all of ${location.name}.`

  return {
    title,
    description,
    ...ogMetadata(title, description, `/security-services/${state}`),
  }
}

export default async function StateSEOPage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params
  const location = STATES.find((s) => s.slug === state)
  if (!location) notFound()

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://www.silbarsecurity.in/security-services/${state}`,
    name: `Silbar Security Services — ${location.name}`,
    description: `PSARA-licensed security services in ${location.name}`,
    url: 'https://www.silbarsecurity.in',
    telephone: CONTACT.phoneRaw,
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      addressRegion: location.name,
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'State',
      name: location.name,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Security Services in ${location.name}`,
      itemListElement: SERVICES.slice(0, 5).map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: `${s.shortTitle} in ${location.name}`,
        },
      })),
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Are Silbar Security guards PSARA licensed in ${location.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes. All Silbar Security guards deployed in ${location.name} are licensed under PSARA 2005. We maintain valid PSARA licenses issued by the state's Controlling Authority.`,
        },
      },
      {
        '@type': 'Question',
        name: `Which cities in ${location.name} does Silbar Security serve?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `We serve ${location.majorCities.join(', ')} and all major cities and districts across ${location.name}. Contact us for deployment in any location within the state.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the minimum contract duration for security guards in ${location.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Our standard minimum contract is 3 months. For event security, we offer single-day and short-term deployments. Long-term contracts receive priority pricing and deployment.`,
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="seo-page" id="main-content">

        <section className="seo-page-hero">
          <ScrollReveal>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/" className="breadcrumb__link">Home</Link>
              <span className="breadcrumb__sep">›</span>
              <span className="breadcrumb__current">Security Services in {location.name}</span>
            </nav>
            <h1 className="seo-page-title">
              <SplitTextReveal text={`Security Guard Services in ${location.name}`} mode="words" />
            </h1>
            <p className="seo-page-subtitle">
              PSARA-licensed, ISO 9001:2015 certified security services across
              all {location.districts} districts of {location.name}.
              Serving {location.majorCities.join(', ')} and beyond.
            </p>
            <div className="service-detail-ctas">
              <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--primary">
                <Phone size={16} /> Call Now
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp.number}?text=Hello%20Silbar%20Security%2C%20I%20need%20security%20services%20in%20${encodeURIComponent(location.name)}.`}
                className="service-detail-cta service-detail-cta--secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us
              </a>
            </div>
          </ScrollReveal>
        </section>

        {/* Services in this state */}
        <section className="seo-services-section">
          <div className="service-detail-section-inner">
            <ScrollReveal>
              <h2 className="service-detail-section-title">
                Our Services in {location.name}
              </h2>
            </ScrollReveal>
            <div className="seo-services-grid">
              {SERVICES.map((service, i) => (
                <ScrollReveal key={service.slug} delay={i * 0.03}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="seo-service-link"
                  >
                    <span className="seo-service-link__title">{service.shortTitle}</span>
                    <span className="seo-service-link__location">
                      <MapPin size={11} /> {location.name}
                    </span>
                    <ArrowRight size={13} />
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Cities in this state */}
        <section className="seo-cities-section">
          <div className="service-detail-section-inner">
            <ScrollReveal>
              <h2 className="service-detail-section-title">
                Cities We Serve in {location.name}
              </h2>
            </ScrollReveal>
            <div className="seo-cities-grid">
              {location.majorCities.map((city, i) => (
                <ScrollReveal key={city} delay={i * 0.03}>
                  <span className="seo-city-tag">
                    <MapPin size={12} /> {city}
                  </span>
                </ScrollReveal>
              ))}
            </div>
            <p className="seo-cities-note">
              Don&apos;t see your city? We deploy across all {location.districts} districts of {location.name}.
              <Link href="/contact" className="seo-cities-link"> Contact us for your location.</Link>
            </p>
          </div>
        </section>

        {/* About Silbar in this state */}
        <section className="seo-about-section">
          <div className="service-detail-section-inner">
            <ScrollReveal>
              <h2 className="service-detail-section-title">
                About Silbar Security in {location.name}
              </h2>
            </ScrollReveal>
            <div className="seo-about-content">
              <p>
                Silbar Security Services is a PSARA-licensed private security agency
                operating in {location.name}. We provide manned guarding, industrial
                security, electronic surveillance, and facility management for
                manufacturing companies, hospitals, hotels, warehouses, banks, and
                residential societies across {location.name}.
              </p>
              <p>
                All our security personnel deployed in {location.name} are licensed
                 under the state&apos;s PSARA Controlling Authority, background verified,
                and covered under full statutory compliance including ESI, PF, and
                minimum wages as mandated by {location.name} state labour laws.
              </p>
              <p>
                Our {location.capital}-based operations team manages deployments
                across {location.districts} districts with rapid deployment capability
                and dedicated account management for every client.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="service-detail-faq">
          <div className="service-detail-section-inner">
            <ScrollReveal>
              <h2 className="service-detail-section-title">
                FAQs — Security Services in {location.name}
              </h2>
            </ScrollReveal>
            <div className="service-detail-faq-list">
              {[
                {
                  q: `Are Silbar Security guards PSARA licensed in ${location.name}?`,
                  a: `Yes. All Silbar Security guards deployed in ${location.name} are licensed under PSARA 2005 by the state's Controlling Authority.`,
                },
                {
                  q: `Which cities in ${location.name} does Silbar Security serve?`,
                  a: `We serve ${location.majorCities.join(', ')} and all major cities and districts across ${location.name}.`,
                },
                {
                  q: `What industries does Silbar serve in ${location.name}?`,
                  a: `We serve manufacturing, hospitals, hotels, warehouses, banks, corporate offices, residential societies, and government organizations across ${location.name}.`,
                },
              ].map(({ q, a }) => (
                <details key={q} className="service-detail-faq-item">
                  <summary className="service-detail-faq-q">{q}</summary>
                  <p className="service-detail-faq-a">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="service-detail-bottom-cta">
          <ScrollReveal>
            <h2 className="service-detail-bottom-cta__title">Need Security in {location.name}?</h2>
            <p className="service-detail-bottom-cta__sub">
              Get a customized security quote for your facility in {location.name}. Free consultation.
            </p>
            <div className="service-detail-ctas service-detail-ctas--centered">
              <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--primary">
                <Phone size={16} /> Call {CONTACT.phone}
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp.number}?text=Hello%20Silbar%20Security%2C%20I%20need%20a%20quote%20for%20security%20services%20in%20${encodeURIComponent(location.name)}.`}
                className="service-detail-cta service-detail-cta--secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us
              </a>
            </div>
          </ScrollReveal>
        </section>

      </main>
    </>
  )
}
