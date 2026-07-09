import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CITIES, STATES } from '@/data/locations'
import { SERVICES } from '@/data/services'
import { Phone, MapPin } from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'

export async function generateStaticParams() {
  return CITIES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const city = CITIES.find((c) => c.slug === slug)
  if (!city) return {}

  const title = `Security Services in ${city.name} | Silbar Security`
  const description = `PSARA-licensed security guards in ${city.name}, ${city.state}. Silbar Security provides manned guarding, CCTV, event security, and facility management across ${city.name}. Call ${CONTACT.phone}.`

  return {
    title,
    description,
    ...ogMetadata(title, description, `/security-services/city/${slug}`),
  }
}

export default async function CitySEOPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const city = CITIES.find((c) => c.slug === slug)
  if (!city) notFound()

  const state = STATES.find((s) => s.slug === city.stateSlug)
  const nearbyCities = state ? state.majorCities.filter((c) => c !== city.name).slice(0, 4) : []

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://www.silbarsecurity.in/security-services/city/${slug}`,
    name: `Silbar Security Services — ${city.name}`,
    description: `PSARA-licensed security services in ${city.name}, ${city.state}`,
    url: 'https://www.silbarsecurity.in',
    telephone: CONTACT.phoneRaw,
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.name,
      addressRegion: city.state,
      addressCountry: 'IN',
    },
    areaServed: [
      { '@type': 'City', name: city.name },
      ...nearbyCities.map((c) => ({ '@type': 'City', name: c })),
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Security Services in ${city.name}`,
      itemListElement: SERVICES.slice(0, 6).map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: `${s.shortTitle} in ${city.name}` },
      })),
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Are your security guards in ${city.name} PSARA licensed?`,
        acceptedAnswer: { '@type': 'Answer', text: `Yes. All Silbar Security guards deployed in ${city.name} are fully licensed under PSARA 2005 by the state Controlling Authority.` },
      },
      {
        '@type': 'Question',
        name: `What security services do you offer in ${city.name}?`,
        acceptedAnswer: { '@type': 'Answer', text: `We provide manned guarding, electronic surveillance (CCTV), industrial security, event security, facility management, and background verification services across ${city.name}.` },
      },
      {
        '@type': 'Question',
        name: `How much do security guards cost in ${city.name}?`,
        acceptedAnswer: { '@type': 'Answer', text: `Costs vary based on guard type (armed/unarmed), shift duration, and site complexity. Contact us at +91 93523 03333 for a customized quote for your ${city.name} facility.` },
      },
      {
        '@type': 'Question',
        name: `Do you serve businesses in ${city.name}?`,
        acceptedAnswer: { '@type': 'Answer', text: `Yes. We serve manufacturing plants, hospitals, hotels, banks, corporate offices, warehouses, retail stores, and residential societies across ${city.name}.` },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="seo-page" id="main-content">
        <section className="seo-page-hero">
          <ScrollReveal>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/" className="breadcrumb__link">Home</Link>
              <span className="breadcrumb__sep">›</span>
              <Link href={`/security-services/${city.stateSlug}`} className="breadcrumb__link">{city.state}</Link>
              <span className="breadcrumb__sep">›</span>
              <span className="breadcrumb__current">{city.name}</span>
            </nav>
            <h1 className="seo-page-title">
              <SplitTextReveal text={`Security Services in ${city.name}`} mode="words" />
            </h1>
            <p className="seo-page-subtitle">
              PSARA-licensed security guard services in {city.name}, {city.state}. 
              Manned guarding, CCTV surveillance, event security, and facility management. 
              {state ? ` Covering all ${state.districts} districts of ${state.name}.` : ''}
            </p>
            <div className="service-detail-ctas">
              <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--primary">
                <Phone size={16} /> Call Now
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp.number}?text=Hello%20Silbar%20Security%2C%20I%20need%20security%20services%20in%20${encodeURIComponent(city.name)}.`}
                className="service-detail-cta service-detail-cta--secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us
              </a>
            </div>
          </ScrollReveal>
        </section>

        <section className="seo-services-section">
          <div className="service-detail-section-inner">
            <ScrollReveal>
              <h2 className="service-detail-section-title">
                Our Services in {city.name}
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
                      <MapPin size={11} /> {city.name}
                    </span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {nearbyCities.length > 0 && (
          <section className="seo-cities-section">
            <div className="service-detail-section-inner">
              <ScrollReveal>
                <h2 className="service-detail-section-title">
                  Nearby Cities We Serve
                </h2>
              </ScrollReveal>
              <div className="seo-cities-grid">
                {nearbyCities.map((c, i) => (
                  <ScrollReveal key={c} delay={i * 0.04}>
                    <Link
                      href={`/security-services/${city.stateSlug}`}
                      className="seo-city-tag seo-city-tag--link"
                    >
                      <MapPin size={12} /> {c}
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="seo-about-section">
          <div className="service-detail-section-inner">
            <ScrollReveal>
              <h2 className="service-detail-section-title">
                About Silbar Security in {city.name}
              </h2>
            </ScrollReveal>
            <div className="seo-about-content">
              <p>
                Silbar Security Services provides professional, PSARA-licensed security solutions 
                to businesses and organizations in {city.name}, {city.state}. Our team of trained 
                security personnel, supervisors, and account managers serves manufacturing plants, 
                corporate offices, hospitals, hotels, banks, and residential societies across the city.
              </p>
              <p>
                All guards deployed in {city.name} undergo PSARA-mandated training, background 
                verification, and are covered under full statutory compliance (ESI, PF, Gratuity). 
                We provide armed and unarmed guards, CCTV surveillance systems, access control 
                management, and 24/7 remote monitoring for facilities in {city.name}.
              </p>
              <p>
                With a population of {city.population} and growing, {city.name} demands professional 
                security services. Silbar Security meets that need with {state ? `deployments across all ${state.districts} districts of ${state.name}` : 'PAN India coverage'}, 
                dedicated account management, and a 24-hour guard replacement guarantee.
              </p>
            </div>
          </div>
        </section>

        <section className="service-detail-faq">
          <div className="service-detail-section-inner">
            <ScrollReveal>
              <h2 className="service-detail-section-title">
                FAQs — Security Services in {city.name}
              </h2>
            </ScrollReveal>
            <div className="service-detail-faq-list">
              {faqSchema.mainEntity.map(({ name, acceptedAnswer }: { name: string; acceptedAnswer: { text: string } }) => (
                <details key={name} className="service-detail-faq-item">
                  <summary className="service-detail-faq-q">{name}</summary>
                  <p className="service-detail-faq-a">{acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="service-detail-bottom-cta">
          <ScrollReveal>
            <h2 className="service-detail-bottom-cta__title">
              Need Security in {city.name}?
            </h2>
            <p className="service-detail-bottom-cta__sub">
              Get a customized security quote for your {city.name} facility within 24 hours.
            </p>
            <div className="service-detail-ctas service-detail-ctas--centered">
              <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--primary">
                <Phone size={16} /> Call Now
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp.number}?text=Hello%20Silbar%20Security%2C%20I%20need%20a%20quote%20for%20security%20services%20in%20${encodeURIComponent(city.name)}.`}
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