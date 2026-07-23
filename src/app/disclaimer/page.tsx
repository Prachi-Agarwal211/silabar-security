import type { Metadata } from 'next'
import Link from 'next/link'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import PageHero from '@/components/layout/PageHero'
import { CONTACT } from '@/lib/config'
import { Phone } from 'lucide-react'
import { ogMetadata } from '@/lib/metadata'
import PageLeadSection from '@/components/sections/PageLeadSection'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Legal disclaimer for Silbar Security Services Pvt. Ltd. regarding liability, third-party links, and CCTV recording policies.',
  robots: { index: false, follow: false },
  ...ogMetadata('Disclaimer', 'Legal disclaimer for Silbar Security Services Pvt. Ltd. regarding liability, third-party links, and CCTV recording policies.', '/disclaimer'),
}

const sections = [
  {
    title: 'General Information Disclaimer',
    content: 'The information provided by Silbar Security Services Pvt. Ltd. on www.silbarsecurity.in is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.',
  },
  {
    title: 'Professional Security Liability',
    content: 'The security tips, advice, and information available on this website do not constitute professional security advice. While we strive to provide accurate security guidelines, every facility and situation is unique. Action taken based on the information provided on this website is strictly at your own risk. Silbar Security Services Pvt. Ltd. is not liable for any losses or damages in connection with the use of our website. For tailored security solutions, please contact our consultants directly for a formal assessment.',
  },
  {
    title: 'Third-Party Links Disclaimer',
    content: 'Our website may contain links to external websites that are not provided or maintained by or in any way affiliated with Silbar Security Services Pvt. Ltd. Please note that Silbar Security Services Pvt. Ltd. does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites. We do not endorse the views expressed or the products/services offered on these external sites.',
  },
  {
    title: 'CCTV and Surveillance Disclaimer',
    content: 'Silbar Security Services Pvt. Ltd. may operate CCTV and other electronic surveillance equipment at our corporate offices and at client sites under contract. Such surveillance is conducted strictly for security, safety, and operational monitoring purposes, in compliance with applicable laws including the DPDP Act 2023. Video footage may be shared with law enforcement agencies upon lawful request.',
  },
  {
    title: 'Errors and Omissions',
    content: 'While we have made every attempt to ensure that the information contained on this site has been obtained from reliable sources, Silbar Security Services Pvt. Ltd. is not responsible for any errors or omissions, or for the results obtained from the use of this information.',
  },
  {
    title: 'Testimonials Disclaimer',
    content: 'The site may contain testimonials from users of our services. These testimonials reflect the real-life experiences and opinions of such users. However, the experiences are personal to those particular users, and may not necessarily be representative of all users of our services. We do not claim, and you should not assume, that all users will have the same experiences.',
  },
]

export default function DisclaimerPage() {
  return (
    <main className="legal-page" id="main-content">
      <PageHero
        eyebrow="LEGAL"
        title={
          <>
            <SplitTextReveal text="DISCLAIMER" />
          </>
        }
        subtitle={<>Last updated: July 2026. Important legal notices.</>}
        size="compact"
        topContent={
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Disclaimer</span>
          </nav>
        }
      />

      <section className="legal-content">
        <div className="service-detail-faq-list" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
          {sections.map(({ title, content }) => (
            <details key={title} className="service-detail-faq-item">
              <summary className="service-detail-faq-q">{title}</summary>
              <p className="service-detail-faq-a" style={{ whiteSpace: 'pre-line' }}>{content}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="service-detail-bottom-cta">
        <h2 className="service-detail-bottom-cta__title">Need Professional Security?</h2>
        <p className="service-detail-bottom-cta__sub">
          Contact our consultants for a customized security assessment.
        </p>
        <div className="service-detail-ctas service-detail-ctas--centered">
          <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--primary">
            <Phone size={16} /> Call {CONTACT.phone}
          </a>
          <a href={`mailto:${CONTACT.email}`} className="service-detail-cta service-detail-cta--secondary">
            Email Us
          </a>
        </div>
      </section>
    
      <PageLeadSection title="Still Have Questions?" subtitle="Contact Silbar Security Services Pvt. Ltd. for clarifications about our services." />

</main>
  )
}
