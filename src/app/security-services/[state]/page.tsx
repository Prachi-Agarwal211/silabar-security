import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { STATES, CITIES } from '@/data/locations'
import { SERVICES } from '@/data/services'
import { GEO_COORDINATES } from '@/lib/geo-coordinates'
import { generateStateContent } from '@/lib/seo-content-generator'
import { ArrowRight, Phone, MapPin } from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import PageHero from '@/components/layout/PageHero'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'
import PageLeadSection from '@/components/sections/PageLeadSection'
import LocationRichContent from '@/components/sections/LocationRichContent'

export const revalidate = 86400

function citySlugFromName(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')
}

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

  const content = generateStateContent(location)
  // Truncate to 40 chars max — layout template adds ' | Silbar Security India' (~20 chars)
  // Final title must stay under ~60 chars for SEO
  const shortTitle = `Security Services ${location.name}`
  const title = shortTitle.length > 40 ? shortTitle.slice(0, 37) + '...' : shortTitle
  const description = content.metaDescription.length > 157 ? content.metaDescription.slice(0, 157) + '...' : content.metaDescription

  return {
    title,
    description,
    keywords: [
      `security guard services ${location.name}`,
      `security agency ${location.name}`,
      `security company ${location.capital}`,
      'Silbar Security',
      'manned guarding India',
    ],
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

  const content = generateStateContent(location)
  const capitalKey = location.capital.toLowerCase().replace(/\s+/g, '-')
  const citiesInState = CITIES.filter((c) => c.stateSlug === location.slug)

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `https://www.silbarsecurity.in/security-services/${state}`,
    name: `Silbar Security Services India — ${location.name}`,
    description: content.metaDescription,
    url: `https://www.silbarsecurity.in/security-services/${state}`,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      addressRegion: location.name,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO_COORDINATES[capitalKey]?.lat || 20.5937,
      longitude: GEO_COORDINATES[capitalKey]?.lng || 78.9629,
    },
    image: 'https://www.silbarsecurity.in/og-image.jpg',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    areaServed: {
      '@type': 'State',
      name: location.name,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Security Services in ${location.name}`,
      itemListElement: SERVICES.slice(0, 8).map((s) => ({
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
    mainEntity: content.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="seo-page" id="main-content">
        <PageHero
          variant="image"
          imageSrc="/industries-bg.webp"
          eyebrow={`${location.name.toUpperCase()} · PAN INDIA`}
          title={<SplitTextReveal text={`Security Guard Services in ${location.name}`} mode="words" />}
          subtitle={
            <>
              Trained security professionals across {location.districts} districts of {location.name}.
              Serving {location.majorCities.slice(0, 4).join(', ')} and more. ISO 9001:2015 certified processes.
            </>
          }
          size="tall"
          topContent={
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/" className="breadcrumb__link">Home</Link>
              <span className="breadcrumb__sep">›</span>
              <Link href="/security-services" className="breadcrumb__link">Locations</Link>
              <span className="breadcrumb__sep">›</span>
              <span className="breadcrumb__current">{location.name}</span>
            </nav>
          }
          bottomContent={
            <div className="service-detail-ctas">
              <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--primary">
                <Phone size={16} /> Call Now
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent(`Hello Silbar Security, I need security services in ${location.name}.`)}`}
                className="service-detail-cta service-detail-cta--secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us
              </a>
            </div>
          }
        />

        <section className="seo-stats-strip" aria-label="State coverage snapshot">
          <div className="seo-stats-strip__inner">
            <div className="seo-stats-strip__item">
              <strong>{location.districts}</strong>
              <span>Districts</span>
            </div>
            <div className="seo-stats-strip__item">
              <strong>{location.majorCities.length}+</strong>
              <span>Major cities</span>
            </div>
            <div className="seo-stats-strip__item">
              <strong>{location.capital}</strong>
              <span>Capital</span>
            </div>
            <div className="seo-stats-strip__item">
              <strong>{location.population}</strong>
              <span>Population</span>
            </div>
          </div>
        </section>

        <div className="seo-local-cta-band">
          <div className="seo-local-cta-card">
            <div>
              <h2>
                Deploy security across <em>{location.name}</em>
              </h2>
              <p>
                From {location.capital} to industrial and commercial hubs statewide — request a
                proposal for single-site or multi-city contracts.
              </p>
            </div>
            <div className="seo-local-cta-card__actions">
              <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--primary">
                <Phone size={16} /> {CONTACT.phone}
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent(`Hello Silbar Security, I need security services in ${location.name}.`)}`}
                className="service-detail-cta service-detail-cta--secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <LocationRichContent content={content} />

        <section className="seo-services-section">
          <div className="service-detail-section-inner">
            <ScrollReveal>
              <h2 className="service-detail-section-title">Our Services in {location.name}</h2>
              <p className="seo-cities-note" style={{ marginBottom: '1.25rem' }}>{content.servicesIntro}</p>
            </ScrollReveal>
            <div className="seo-services-grid">
              {SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="seo-service-link"
                >
                  <span className="seo-service-link__title">{service.shortTitle}</span>
                  <span className="seo-service-link__location">
                    <MapPin size={11} /> {location.name}
                  </span>
                  <ArrowRight size={13} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="seo-cities-section">
          <div className="service-detail-section-inner">
            <ScrollReveal>
              <h2 className="service-detail-section-title">
                Cities We Serve in {location.name}
              </h2>
            </ScrollReveal>
            <div className="seo-cities-grid">
              {(citiesInState.length > 0
                ? citiesInState
                : location.majorCities.map((name) => ({
                    slug: citySlugFromName(name),
                    name,
                  }))
              ).map((city) => (
                <Link
                  key={city.slug}
                  href={`/security-services/city/${city.slug}`}
                  className="seo-city-tag seo-city-tag--link"
                >
                  <MapPin size={12} /> {city.name}
                </Link>
              ))}
            </div>
            <p className="seo-cities-note">
              Don&apos;t see your city? We evaluate deployments across {location.districts} districts of{' '}
              {location.name}.{' '}
              <Link href="/contact" className="seo-cities-link">Contact us for your location.</Link>
            </p>
          </div>
        </section>

        <section className="service-detail-bottom-cta">
          <ScrollReveal>
            <h2 className="service-detail-bottom-cta__title">Need Security in {location.name}?</h2>
            <p className="service-detail-bottom-cta__sub">
              Get a customized security quote for your facility in {location.name}. Free consultation via call or WhatsApp.
            </p>
            <div className="service-detail-ctas service-detail-ctas--centered">
              <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--primary">
                <Phone size={16} /> Call {CONTACT.phone}
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent(`Hello Silbar Security, I need a quote for security services in ${location.name}.`)}`}
                className="service-detail-cta service-detail-cta--secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us
              </a>
            </div>
          </ScrollReveal>
        </section>

        <PageLeadSection
          title={`Security Quote for ${location.name}`}
          subtitle={`Tell us about your facility in ${location.name} — submit opens WhatsApp with your details.`}
          defaultMessage={`I need security services in ${location.name}.`}
          formType={`Security Quote — ${location.name}`}
        />
      </main>
    </>
  )
}
