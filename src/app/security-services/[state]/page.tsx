import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { STATES, CITIES } from '@/data/locations'
import { SERVICES } from '@/data/services'
import { GEO_COORDINATES } from '@/lib/geo-coordinates'
import { generateStateContent } from '@/lib/seo-content-generator'
import { ArrowRight, Phone, MapPin, ShieldCheck, Clock, BadgeCheck, IndianRupee } from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import PageHero from '@/components/layout/PageHero'
import { CONTACT, GOOGLE_REVIEWS, getOfficesForStatePage } from '@/lib/config'
import { ogMetadata, seoDescription, seoTitle } from '@/lib/metadata'
import PageLeadSection from '@/components/sections/PageLeadSection'
import LocationRichContent from '@/components/sections/LocationRichContent'
import GbpOfficeSection from '@/components/sections/GbpOfficeSection'
import { locationHeroImage } from '@/lib/location-images'
import Image from 'next/image'

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
  // Truncate to 40 chars max — layout template adds ' | Silbar Security Services Pvt. Ltd. India' (~20 chars)
  // Final title must stay under ~60 chars for SEO
  const shortTitle = `Security Services ${location.name}`
  const title = seoTitle(shortTitle)
  const description = seoDescription(content.metaDescription)

  return {
    title,
    description,
    keywords: [
      `security guard services ${location.name}`,
      `security agency ${location.name}`,
      `security company ${location.capital}`,
      'Silbar Security Services Pvt. Ltd.',
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
  const gbpOffices = getOfficesForStatePage(location.slug)
  const primaryOffice = gbpOffices[0]
  const verifiedStateOffice = primaryOffice?.address && primaryOffice.region === location.name
    ? primaryOffice
    : undefined

  // Cycle the landing-page hero imagery across all states so every state page
  // gets its own visual identity (reuses existing /public assets — no new files).
  const stateIndex = STATES.findIndex((s) => s.slug === location.slug)
  const heroImage = locationHeroImage(stateIndex, 1)
  const rateImage = locationHeroImage(stateIndex, 0)

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': verifiedStateOffice ? 'LocalBusiness' : 'ProfessionalService',
    '@id': `https://www.silbarsecurity.in/security-services/${state}`,
    name: primaryOffice?.placeName || `Silbar Security Services Pvt. Ltd. — ${location.name}`,
    legalName: 'Silbar Security Services Pvt. Ltd.',
    description: content.metaDescription,
    url: `https://www.silbarsecurity.in/security-services/${state}`,
    telephone: primaryOffice?.phone || CONTACT.phone,
    email: CONTACT.email,
    parentOrganization: {
      '@id': 'https://www.silbarsecurity.in/#organization',
    },
    ...(verifiedStateOffice
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: verifiedStateOffice.address.split(',')[0]?.trim(),
            addressLocality: verifiedStateOffice.city?.replace(/\s*\(.*?\)\s*/g, '').trim(),
            addressRegion: location.name,
            postalCode: verifiedStateOffice.pin,
            addressCountry: 'IN',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: verifiedStateOffice.lat || GEO_COORDINATES[capitalKey]?.lat,
            longitude: verifiedStateOffice.lng || GEO_COORDINATES[capitalKey]?.lng,
          },
          ...(verifiedStateOffice.mapUrl ? { hasMap: verifiedStateOffice.mapUrl } : {}),
        }
      : {}),
    sameAs: [
      ...(primaryOffice?.mapUrl ? [primaryOffice.mapUrl] : []),
    ],
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(GOOGLE_REVIEWS.rating),
      reviewCount: String(GOOGLE_REVIEWS.reviewCountNumber),
      bestRating: '5',
      worstRating: '1',
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
          imageSrc={heroImage}
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
                href={`https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent(`Hello Silbar Security Services Pvt. Ltd., I need security services in ${location.name}.`)}`}
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
                href={`https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent(`Hello Silbar Security Services Pvt. Ltd., I need security services in ${location.name}.`)}`}
                className="service-detail-cta service-detail-cta--secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
              {primaryOffice?.mapUrl && (
                <a
                  href={primaryOffice.mapUrl}
                  className="service-detail-cta service-detail-cta--secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin size={16} /> Google Profile
                </a>
              )}
            </div>
          </div>
        </div>

        <GbpOfficeSection
          placeLabel={location.name}
          offices={gbpOffices}
          isLocalOffice={['delhi', 'haryana', 'rajasthan', 'uttar-pradesh', 'gujarat'].includes(location.slug)}
        />

        <LocationRichContent content={content} seed={content.seed} />

        {/* Image band — why choose us for this state */}
        <section className="seo-image-band" aria-labelledby={`why-${location.slug}`}>
          <div className="seo-image-band__media" aria-hidden="true">
            <Image
              src={rateImage}
              alt={`Security deployment in ${location.name}`}
              fill
              sizes="100vw"
              className="seo-image-band__img"
            />
            <div className="seo-image-band__scrim" />
          </div>
          <div className="seo-image-band__inner">
            <div className="seo-image-band__grid">
              <div className="seo-image-band__copy">
                <span className="section-eyebrow section-eyebrow--light">WHY SILBAR IN {location.name.toUpperCase()}</span>
                <h2 id={`why-${location.slug}`}>
                  Trained Guards. <em>Real</em> Compliance.
                </h2>
                <p>
                  Every deployment in {location.name} runs on the same PAN India standard — background-verified
                  manpower, documented SOPs, statutory wage compliance and a dedicated account manager.
                </p>
              </div>
              <ul className="seo-image-band__points">
                {[
                  { icon: ShieldCheck, t: 'PSARA Licensed', d: `Fully licensed operations across ${location.name}.` },
                  { icon: BadgeCheck, t: 'ISO Certified Processes', d: '9001 · 14001 · 45001 · 27001 (IAF accredited).' },
                  { icon: Clock, t: '24/7 Support & Replacement', d: 'Rapid backup deployment, dedicated supervisor.' },
                  { icon: IndianRupee, t: 'Transparent Billing', d: 'Statutory-aware, minimum-wage-linked commercials.' },
                ].map((pt) => (
                  <li key={pt.t} className="seo-image-band__point">
                    <span className="seo-image-band__icon"><pt.icon size={20} aria-hidden="true" /></span>
                    <div>
                      <strong>{pt.t}</strong>
                      <span>{pt.d}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

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
                href={`https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent(`Hello Silbar Security Services Pvt. Ltd., I need a quote for security services in ${location.name}.`)}`}
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
