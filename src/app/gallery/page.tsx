import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import { ogMetadata } from '@/lib/metadata'
import PageLeadSection from '@/components/sections/PageLeadSection'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Visual gallery of Silbar Security operations, training facilities, team deployments, and events across India.',
  ...ogMetadata(
    'Gallery',
    'Visual gallery of Silbar Security operations, training facilities, team deployments, and events across India.',
    '/gallery'
  ),
}

const GALLERY_ITEMS = [
  { title: 'Guard Training Facility', category: 'Training', color: 'linear-gradient(135deg, #1a0a0d 0%, #3d0f1a 100%)' },
  { title: 'Factory Security Deployment', category: 'Operations', color: 'linear-gradient(135deg, #0a0a12 0%, #141420 100%)' },
  { title: 'CCTV Control Room', category: 'Technology', color: 'linear-gradient(135deg, #8C1F32 0%, #5C1220 100%)' },
  { title: 'Event Security Team', category: 'Events', color: 'linear-gradient(135deg, #14100D 0%, #291e15 100%)' },
  { title: 'VIP Protection Detail', category: 'VIP', color: 'linear-gradient(135deg, #1a0a0d 0%, #3d0f1a 100%)' },
  { title: 'Armed Guard Deployment', category: 'Operations', color: 'linear-gradient(135deg, #0a0a12 0%, #141420 100%)' },
  { title: 'Fire Safety Drill', category: 'Training', color: 'linear-gradient(135deg, #8C1F32 0%, #5C1220 100%)' },
  { title: 'Corporate Office Security', category: 'Operations', color: 'linear-gradient(135deg, #14100D 0%, #291e15 100%)' },
  { title: 'Annual Day Celebration', category: 'Events', color: 'linear-gradient(135deg, #1a0a0d 0%, #3d0f1a 100%)' },
  { title: 'Dog Squad Training', category: 'Training', color: 'linear-gradient(135deg, #0a0a12 0%, #141420 100%)' },
  { title: 'Warehouse Security', category: 'Operations', color: 'linear-gradient(135deg, #8C1F32 0%, #5C1220 100%)' },
  { title: 'ISO Certification Ceremony', category: 'Events', color: 'linear-gradient(135deg, #14100D 0%, #291e15 100%)' },
]

export default function GalleryPage() {
  return (
    <main>
      <PageHero
        eyebrow="GALLERY"
        title={
          <>
            <SplitTextReveal text="SILBAR IN" />
            <br />
            <span className="page-hero-title--outline">
              <SplitTextReveal text="ACTION" delay={0.2} />
            </span>
          </>
        }
        subtitle="A visual showcase of our security operations, training, and team across India."
        size="compact"
        topContent={
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Gallery</span>
          </nav>
        }
      />

      <section className="service-detail-features service-detail-features--padded">
        <div className="service-detail-section-inner service-detail-section-inner--no-padding">
          <div className="gallery-grid">
            {GALLERY_ITEMS.map((item, i) => (
              <div key={i} className="gallery-item" style={{ background: item.color }}>
                <span className="gallery-item__cat">{item.category}</span>
                <h3 className="gallery-item__title">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    
      <PageLeadSection title="Ready to Work with Silbar?" subtitle="Request a free security quote for your location." />

</main>
  )
}