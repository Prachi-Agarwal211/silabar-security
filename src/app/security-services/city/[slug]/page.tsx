import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CITIES, STATES } from '@/data/locations'
import { SERVICES } from '@/data/services'
import { GEO_COORDINATES } from '@/lib/geo-coordinates'
import { generateCityContent } from '@/lib/seo-content-generator'
import { Phone, MapPin, CheckCircle2, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import PageHero from '@/components/layout/PageHero'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'
import PageLeadSection from '@/components/sections/PageLeadSection'

function citySlugFromName(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')
}

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

  const content = generateCityContent(city)
  const title = `Security Guard Services in ${city.name}, ${city.state} | Silbar Security`
  const description = content.metaDescription

  return {
    title,
    description,
    keywords: [
      `security guard services ${city.name}`,
      `security agency ${city.name}`,
      `manned guarding ${city.name}`,
      `security company ${city.state}`,
      'Silbar Security',
    ],
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
  const content = generateCityContent(city)
  const nearbyCities = state
    ? state.majorCities.filter((c) => c.toLowerCase() !== city.name.toLowerCase()).slice(0, 6)
    : []

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://www.silbarsecurity.in/security-services/city/${slug}`,
    name: `Silbar Security Services — ${city.name}`,
    description: content.metaDescription,
    url: `https://www.silbarsecurity.in/security-services/city/${slug}`,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.name,
      addressRegion: city.state,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO_COORDINATES[slug]?.lat || 20.5937,
      longitude: GEO_COORDINATES[slug]?.lng || 78.9629,
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
    areaServed: [
      { '@type': 'City', name: city.name },
      ...nearbyCities.map((c) => ({ '@type': 'City', name: c })),
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Security Services in ${city.name}`,
      itemListElement: SERVICES.slice(0, 8).map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: `${s.shortTitle} in ${city.name}` },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="seo-page" id="main-content">
        <PageHero
          variant="image"
          imageSrc="/hero-guard.webp"
          eyebrow={`${city.name.toUpperCase()} · ${city.state.toUpperCase()}`}
          title={<SplitTextReveal text={`Security Guard Services in ${city.name}`} mode="words" />}
          subtitle={
            <>
              Professional manned guarding, industrial security, and facility protection in {city.name},{' '}
              {city.state}. ISO 9001:2015 certified processes. Trained manpower. Clear proposals.
            </>
          }
          size="tall"
          topContent={
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/" className="breadcrumb__link">Home</Link>
              <span className="breadcrumb__sep">›</span>
              <Link href="/security-services" className="breadcrumb__link">Locations</Link>
              <span className="breadcrumb__sep">›</span>
              <Link href={`/security-services/${city.stateSlug}`} className="breadcrumb__link">{city.state}</Link>
              <span className="breadcrumb__sep">›</span>
              <span className="breadcrumb__current">{city.name}</span>
            </nav>
          }
          bottomContent={
            <div className="service-detail-ctas">
              <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--primary">
                <Phone size={16} /> Call Now
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent(`Hello Silbar Security, I need security services in ${city.name}, ${city.state}.`)}`}
                className="service-detail-cta service-detail-cta--secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us
              </a>
            </div>
          }
        />

        <section className="seo-stats-strip" aria-label="Coverage snapshot">
          <div className="seo-stats-strip__inner">
            <div className="seo-stats-strip__item">
              <strong>{city.name}</strong>
              <span>City coverage</span>
            </div>
            <div className="seo-stats-strip__item">
              <strong>{city.state}</strong>
              <span>State</span>
            </div>
            <div className="seo-stats-strip__item">
              <strong>Tier {city.tier}</strong>
              <span>Market tier</span>
            </div>
            <div className="seo-stats-strip__item">
              <strong>24/7</strong>
              <span>Enquiry support</span>
            </div>
          </div>
        </section>

        <div className="seo-local-cta-band">
          <div className="seo-local-cta-card">
            <div>
              <h2>
                Security quote for <em>{city.name}</em>
              </h2>
              <p>
                Trained guards, clear commercials, WhatsApp-ready enquiry. Call or message our team
                for {city.name}, {city.state}.
              </p>
            </div>
            <div className="seo-local-cta-card__actions">
              <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--primary">
                <Phone size={16} /> {CONTACT.phone}
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent(`Hello Silbar Security, I need security in ${city.name}.`)}`}
                className="service-detail-cta service-detail-cta--secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Intro content */}
        <section className="seo-about-section">
          <div className="service-detail-section-inner">
            <ScrollReveal>
              <h2 className="service-detail-section-title">
                Security Agency in {city.name}
              </h2>
            </ScrollReveal>
            <div className="seo-about-content">
              {content.intro.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Sectors */}
        <section className="seo-services-section">
          <div className="service-detail-section-inner">
            <ScrollReveal>
              <h2 className="service-detail-section-title">{content.sectorsHeading}</h2>
              <p className="seo-cities-note" style={{ marginBottom: '1.25rem' }}>{content.sectorsBlurb}</p>
            </ScrollReveal>
            <ul className="seo-sector-list">
              {content.sectors.map((s) => (
                <li key={s} className="seo-sector-item">
                  <CheckCircle2 size={16} aria-hidden="true" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Why Silbar */}
        <section className="seo-cities-section">
          <div className="service-detail-section-inner">
            <ScrollReveal>
              <h2 className="service-detail-section-title">Why Silbar in {city.name}</h2>
            </ScrollReveal>
            <ul className="seo-why-grid">
              {content.whyPoints.map((point) => (
                <li key={point} className="seo-why-item">
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="seo-about-content" style={{ marginTop: '1.5rem' }}>
              <span style={{ display: 'block', marginBottom: '0.75rem' }}>{content.operations}</span>
              <span style={{ display: 'block' }}>{content.compliance}</span>
            </p>
          </div>
        </section>

        {/* Process */}
        <section className="seo-about-section">
          <div className="service-detail-section-inner">
            <ScrollReveal>
              <h2 className="service-detail-section-title">How deployment works in {city.name}</h2>
            </ScrollReveal>
            <ol className="seo-process-list">
              {content.process.map((step, i) => (
                <li key={step.title} className="seo-process-item">
                  <span className="seo-process-num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Services links */}
        <section className="seo-services-section">
          <div className="service-detail-section-inner">
            <ScrollReveal>
              <h2 className="service-detail-section-title">Our Services in {city.name}</h2>
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
                    <MapPin size={11} /> {city.name}
                  </span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby */}
        {nearbyCities.length > 0 && (
          <section className="seo-cities-section">
            <div className="service-detail-section-inner">
              <ScrollReveal>
                <h2 className="service-detail-section-title">Nearby Cities We Serve</h2>
              </ScrollReveal>
              <div className="seo-cities-grid">
                {nearbyCities.map((c) => {
                  const match = CITIES.find(
                    (x) => x.name.toLowerCase() === c.toLowerCase() || x.slug === citySlugFromName(c)
                  )
                  const href = match
                    ? `/security-services/city/${match.slug}`
                    : `/security-services/${city.stateSlug}`
                  return (
                    <Link key={c} href={href} className="seo-city-tag seo-city-tag--link">
                      <MapPin size={12} /> {c}
                    </Link>
                  )
                })}
              </div>
              {state && (
                <p className="seo-cities-note">
                  View all of{' '}
                  <Link href={`/security-services/${city.stateSlug}`} className="seo-cities-link">
                    {state.name} security coverage
                  </Link>
                  .
                </p>
              )}
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="service-detail-faq">
          <div className="service-detail-section-inner">
            <ScrollReveal>
              <h2 className="service-detail-section-title">
                FAQs — Security Services in {city.name}
              </h2>
            </ScrollReveal>
            <div className="service-detail-faq-list">
              {content.faqs.map(({ q, a }) => (
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
            <h2 className="service-detail-bottom-cta__title">
              Need Security in {city.name}?
            </h2>
            <p className="service-detail-bottom-cta__sub">
              Get a customized security quote for your {city.name} facility. Submit opens WhatsApp with your details.
            </p>
            <div className="service-detail-ctas service-detail-ctas--centered">
              <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--primary">
                <Phone size={16} /> Call Now
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent(`Hello Silbar Security, I need a quote for security services in ${city.name}.`)}`}
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
          title={`Security Services in ${city.name}`}
          subtitle={`Request a free quote for ${city.name} — submit opens WhatsApp with your full enquiry.`}
          defaultMessage={`I need security services in ${city.name}, ${city.state}.`}
          formType={`Security Quote — ${city.name}`}
        />
      </main>
    </>
  )
}
