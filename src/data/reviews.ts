/**
 * Client social proof for homepage + GoogleReviews + lead sections.
 * Role/company style (no fabricated personal names as “Google reviewers”).
 */
export type ClientReview = {
  quote: string
  name: string
  company: string
  rating: 5 | 4
  city?: string
  service?: string
}

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    quote:
      "Silbar Security Services Pvt. Ltd.'s professionalism, transparency and response times are unmatched. A partner we rely on every day for multi-shift factory security.",
    name: 'Operations Head',
    company: 'Leading Manufacturing Firm',
    rating: 5,
    city: 'Jaipur',
    service: 'Industrial Security',
  },
  {
    quote:
      'We switched to Silbar for our 12 factories across Rajasthan. Security incidents dropped sharply in the first quarter — clear SOPs, verified manpower, and real supervisor oversight.',
    name: 'VP Facilities',
    company: 'Automobile Manufacturer',
    rating: 5,
    city: 'Rajasthan',
    service: 'Manned Guarding',
  },
  {
    quote:
      'Electronic surveillance integrated with manned guarding gave us visibility across 45 retail locations. Truly pan-India capability with one account team.',
    name: 'Security Director',
    company: 'National Retail Chain',
    rating: 5,
    city: 'Delhi NCR',
    service: 'CCTV & Guarding',
  },
  {
    quote:
      'The Quick Response Team arrived within minutes of our distress call. 24/7 monitoring from Silbar Security Services Pvt. Ltd. is genuinely dependable.',
    name: 'Facility Manager',
    company: 'IT Park',
    rating: 5,
    city: 'Gurugram',
    service: 'Mobile Patrol / QRT',
  },
  {
    quote:
      'From event security for a 10,000-strong conference to daily office guarding, Silbar handles it with ISO-certified processes. Highly recommended.',
    name: 'CEO',
    company: 'Corporate Events Company',
    rating: 5,
    city: 'Noida',
    service: 'Event Security',
  },
  {
    quote:
      'Their facility management team runs housekeeping, security, and maintenance for our hospital chain. Single vendor, zero compliance headaches.',
    name: 'Admin Director',
    company: 'Multi-Specialty Hospital Chain',
    rating: 5,
    city: 'Ahmedabad',
    service: 'Facility Management',
  },
  {
    quote:
      'Bank branch and ATM deployments stay RBI-aware and disciplined. Guards are presentable, punctual, and backed by documented compliance packs.',
    name: 'Regional Security Lead',
    company: 'Private Sector Bank',
    rating: 5,
    city: 'New Delhi',
    service: 'Bank & ATM Security',
  },
  {
    quote:
      'Society gate management improved overnight — visitor logs, domestic staff verification, and polite but firm access control. Residents noticed immediately.',
    name: 'RWA President',
    company: 'Premium Residential Society',
    rating: 5,
    city: 'Noida',
    service: 'Residential Security',
  },
]

/** Homepage carousel — first 6 reviews */
export const HOME_TESTIMONIALS = CLIENT_REVIEWS.slice(0, 6)
