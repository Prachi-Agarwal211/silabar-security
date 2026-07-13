import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CAREERS, CAREER_SLUGS } from '@/data/careers'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'
import { Phone, Mail, CheckCircle, MapPin, Briefcase, Building2 } from 'lucide-react'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import PageLeadSection from '@/components/sections/PageLeadSection'
import '@/styles/pages/career-detail.css'

export function generateStaticParams() {
  return CAREER_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const career = CAREERS.find((c) => c.slug === slug)
  if (!career) return {}

  return {
    title: `${career.title} — Careers at Silbar Security`,
    description: `Apply for ${career.title} at Silbar Security Services. ${career.locations.join(', ')}. ${career.type}. ${career.department}. Join India's most trusted security force.`,
    ...ogMetadata(`${career.title} — Careers at Silbar Security`, `Apply for ${career.title} at Silbar Security Services. ${career.locations.join(', ')}.`, `/careers/${slug}`),
  }
}

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const career = CAREERS.find((c) => c.slug === slug)
  if (!career) notFound()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: career.title,
    description: career.description.replace(/<[^>]*>/g, '').substring(0, 500),
    datePosted: career.postedAt,
    employmentType: career.type === 'Full-time' ? 'FULL_TIME' : career.type === 'Part-time' ? 'PART_TIME' : 'CONTRACTOR',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Silbar Security Services Pvt. Ltd.',
      sameAs: 'https://www.silbarsecurity.in',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: career.locations[0],
        addressCountry: 'IN',
      },
    },
    ...(career.salary ? {
      estimatedSalary: {
        '@type': 'MonetaryAmount',
        currency: 'INR',
        value: career.salary,
      },
    } : {}),
  }

  return (
    <main className="career-detail-page" id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="career-detail-hero">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/" className="breadcrumb__link">Home</Link>
          <span className="breadcrumb__sep">›</span>
          <Link href="/careers" className="breadcrumb__link">Careers</Link>
          <span className="breadcrumb__sep">›</span>
          <span className="breadcrumb__current">{career.title}</span>
        </nav>

        <div className="career-detail-hero__content">
          <div className="career-detail-hero__badges">
            <span className="career-detail-badge career-detail-badge--type">{career.type}</span>
            <span className="career-detail-badge career-detail-badge--dept">{career.department}</span>
          </div>

          <h1 className="career-detail-hero__title">
            <SplitTextReveal text={career.title} />
          </h1>

          <div className="career-detail-hero__meta">
            <span className="career-detail-hero__meta-item">
              <MapPin size={14} />
              {career.locations.join(', ')}
            </span>
          </div>

          {career.salary && (
            <p className="career-detail-hero__salary">{career.salary}</p>
          )}

          <div className="career-detail-hero__ctas">
            <a
              href={`https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent(`Hi Silbar Security, I am interested in the ${career.title} position at ${career.locations[0]}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="service-detail-cta service-detail-cta--secondary"
            >
              <Phone size={16} /> Apply on WhatsApp
            </a>
            <a
              href={`mailto:${CONTACT.email}?subject=Application for ${career.title}&body=Dear Silbar HR Team,%0D%0A%0D%0AI am writing to apply for the ${career.title} position. Please find my resume attached.%0D%0A%0D%0ARegards,%0D%0A[Your Name]`}
              className="service-detail-cta service-detail-cta--primary"
            >
              <Mail size={16} /> Apply via Email
            </a>
          </div>
        </div>
      </section>

      <div className="career-detail-container">
        <div className="career-detail-main">
          <section className="career-detail-section">
            <div
              className="career-detail-description"
              dangerouslySetInnerHTML={{ __html: career.description }}
            />
          </section>

          <section className="career-detail-section">
            <h2 className="career-detail-section__title">
              <CheckCircle size={20} className="career-detail-section__icon" />
              Responsibilities
            </h2>
            <ul className="career-detail-list">
              {career.responsibilities.map((item) => (
                <li key={item} className="career-detail-list__item">
                  <CheckCircle size={16} className="career-detail-list__icon" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="career-detail-section">
            <h2 className="career-detail-section__title">
              <Briefcase size={20} className="career-detail-section__icon" />
              Requirements
            </h2>
            <ul className="career-detail-list">
              {career.requirements.map((item) => (
                <li key={item} className="career-detail-list__item">
                  <CheckCircle size={16} className="career-detail-list__icon" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="career-detail-section">
            <h2 className="career-detail-section__title">
              <Building2 size={20} className="career-detail-section__icon" />
              Benefits & Perks
            </h2>
            <ul className="career-detail-list">
              {career.benefits.map((item) => (
                <li key={item} className="career-detail-list__item">
                  <CheckCircle size={16} className="career-detail-list__icon" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="career-detail-section career-detail-section--apply">
            <h2 className="career-detail-section__title">Apply for this Position</h2>
            <p className="career-detail-apply__sub">
              Ready to join India&apos;s most trusted security force? Apply now and our HR team will reach out within 48 hours.
            </p>
            <div className="service-detail-ctas service-detail-ctas--centered">
              <a
                href={`https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent(`Hi Silbar Security, I am interested in the ${career.title} position at ${career.locations[0]}. My name is [Your Name].`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="service-detail-cta service-detail-cta--secondary"
              >
                <Phone size={16} /> Apply on WhatsApp
              </a>
              <a
                href={`mailto:${CONTACT.email}?subject=Application for ${career.title}&body=Dear Silbar HR Team,%0D%0A%0D%0AI am writing to apply for the ${career.title} position. Please find my resume attached.%0D%0A%0D%0ARegards,%0D%0A[Your Name]%0D%0A%0D%0APlease call me at: [Your Phone Number]`}
                className="service-detail-cta service-detail-cta--primary"
              >
                <Mail size={16} /> Apply via Email
              </a>
            </div>
          </section>
        </div>
      </div>

      <PageLeadSection
        title="Not the Role You're Looking For?"
        subtitle="We're always hiring talented professionals. Send us your resume and our team will reach out when a suitable position opens up."
        defaultMessage={`I would like to discuss a careers enquiry with Silbar Security. I am interested in similar roles to ${career.title}.`}
      />
    </main>
  )
}
