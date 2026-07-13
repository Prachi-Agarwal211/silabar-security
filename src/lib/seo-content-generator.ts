import { CityLocation, StateLocation } from '@/data/locations'
import { CONTACT } from '@/lib/config'

/** Deterministic hash so the same city always gets the same content combo */
function stringToHash(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function pick<T>(seed: number, index: number, options: T[]): T {
  return options[(seed + index * 9973) % options.length]!
}

function pickN<T>(seed: number, options: T[], n: number): T[] {
  const out: T[] = []
  const used = new Set<number>()
  let i = 0
  while (out.length < Math.min(n, options.length) && i < options.length * 3) {
    const idx = (seed + i * 7919) % options.length
    if (!used.has(idx)) {
      used.add(idx)
      out.push(options[idx]!)
    }
    i++
  }
  return out
}

/** Regional industry focus — more unique than pure templates */
const STATE_SECTORS: Record<string, string[]> = {
  rajasthan: ['manufacturing & auto components', 'gems & jewellery units', 'hotels & tourism', 'warehouses & logistics parks', 'educational campuses', 'residential townships'],
  delhi: ['corporate offices & IT parks', 'retail & malls', 'hospitals', 'embassies & VIP facilities', 'warehouses in NCR', 'residential societies'],
  gujarat: ['chemical & pharma plants', 'textile parks', 'ports & logistics', 'diamond & jewellery', 'manufacturing SEZs', 'commercial complexes'],
  maharashtra: ['IT parks & BFSI', 'manufacturing corridors', 'warehousing (JNPT belt)', 'hospitals', 'retail chains', 'high-rise residential'],
  karnataka: ['IT / tech campuses', 'start-up offices', 'biotech & pharma', 'manufacturing', 'data centres', 'educational institutions'],
  'tamil-nadu': ['auto & manufacturing', 'IT parks', 'ports & logistics', 'textile clusters', 'hospitals', 'educational campuses'],
  telangana: ['IT / pharma Hyderabad', 'manufacturing', 'warehouses', 'hospitals', 'corporate campuses', 'residential townships'],
  'andhra-pradesh': ['ports & logistics', 'manufacturing', 'pharma SEZs', 'IT parks', 'hospitals', 'infrastructure projects'],
  'uttar-pradesh': ['Noida / Ghaziabad industry', 'warehouses', 'hospitals', 'educational institutes', 'manufacturing', 'commercial complexes'],
  haryana: ['Gurugram corporate parks', 'auto manufacturing', 'warehouses', 'retail', 'residential societies', 'hospitals'],
  'madhya-pradesh': ['manufacturing', 'warehouses', 'hospitals', 'educational campuses', 'commercial buildings', 'industrial estates'],
  'west-bengal': ['ports & logistics', 'manufacturing', 'IT parks', 'hospitals', 'retail', 'residential complexes'],
  punjab: ['manufacturing', 'warehouses', 'hospitals', 'educational institutes', 'retail', 'residential societies'],
  bihar: ['hospitals', 'educational campuses', 'warehouses', 'commercial complexes', 'government facilities', 'residential'],
  kerala: ['IT parks', 'hospitals', 'tourism & hotels', 'ports', 'educational campuses', 'residential'],
  'jammu-and-kashmir': ['tourism & hospitality', 'hospitals', 'government facilities', 'educational campuses', 'commercial complexes'],
}

const DEFAULT_SECTORS = [
  'manufacturing plants',
  'warehouses & logistics',
  'hospitals & clinics',
  'corporate offices',
  'retail & commercial',
  'residential societies',
  'hotels & events',
  'educational institutions',
]

const CITY_OPENERS = [
  (c: CityLocation) =>
    `Silbar Security Services provides professional security guard services in ${c.name}, ${c.state}. We deploy trained, background-verified manpower for factories, offices, hospitals, warehouses, retail sites, and residential communities across the city.`,
  (c: CityLocation) =>
    `Looking for a reliable security agency in ${c.name}? Silbar Security delivers manned guarding, CCTV support, and facility security with ISO-aligned processes and clear statutory compliance for clients in ${c.state}.`,
  (c: CityLocation) =>
    `Businesses and institutions in ${c.name} choose Silbar Security for disciplined deployments — uniformed guards, site supervisors, documented SOPs, and responsive account management tailored to local operating conditions in ${c.state}.`,
  (c: CityLocation) =>
    `Silbar Security operates security deployments in ${c.name} (${c.state}) covering industrial, commercial, healthcare, and residential facilities. Our focus is practical protection: access control, patrolling, visitor management, and emergency readiness.`,
  (c: CityLocation) =>
    `From gate management to night patrols, Silbar Security supports organisations in ${c.name} with compliant security manpower. Headquarters in Jaipur with PAN India coordination ensures standardised quality even for multi-city clients.`,
]

const CITY_CONTEXT = [
  (c: CityLocation) =>
    `${c.name} is a Tier-${c.tier} market with an urban population of about ${c.population}. Growth in industry, logistics, healthcare, and housing increases demand for professional security — not ad-hoc manpower. Silbar designs shifts, posts, and reporting around your site risk profile.`,
  (c: CityLocation) =>
    `With roughly ${c.population} residents and expanding commercial activity, ${c.name} needs security teams that understand high-traffic gates, material movement, and after-hours vulnerability. Our deployments emphasise verified guards, supervisor checks, and clear escalation paths.`,
  (c: CityLocation) =>
    `${c.name}'s mix of industrial and commercial facilities (population ~${c.population}) requires flexible security models — 8/12-hour shifts, lady guards where needed, and optional electronic surveillance integration with manned posts.`,
  (c: CityLocation) =>
    `Whether you run a plant, warehouse, hospital, or society in ${c.name}, staffing quality and compliance matter as much as headcount. Silbar Security aligns deployments with applicable labour rules and client site instructions.`,
]

const CITY_OPERATIONS = [
  (c: CityLocation) =>
    `In ${c.name}, every deployment includes site induction, duty instructions, attendance discipline, and supervisor oversight. Clients receive structured reporting so security performance is measurable — not left to verbal updates alone.`,
  (c: CityLocation) =>
    `Our ${c.name} operations support include replacement backup for absenteeism, night checks by field officers (as contracted), and coordination with your facility or admin team for visitor, material, and emergency protocols.`,
  (c: CityLocation) =>
    `Silbar Security’s model for ${c.name} combines trained manpower with process discipline: SOPs, escalation matrix, and compliance documentation (EPF/ESIC where applicable) so clients reduce operational and regulatory risk.`,
  (c: CityLocation) =>
    `For multi-location clients expanding into ${c.name}, we mirror the same standards used across our PAN India network — uniform training baseline, account manager ownership, and transparent commercial terms.`,
]

const CITY_COMPLIANCE = [
  (c: CityLocation) =>
    `Silbar Security Services Pvt. Ltd. is ISO 9001:2015 certified. Guards deployed for ${c.name} sites are background-verified and operated under documented processes. We follow applicable state wage notifications and statutory requirements for eligible staff.`,
  (c: CityLocation) =>
    `Compliance is part of delivery in ${c.name}: police verification practices as per recruitment norms, uniformed presentation, and labour-law aligned wage structures. Ask our team for the documentation pack relevant to your contract.`,
  (c: CityLocation) =>
    `Clients in ${c.name} often need audit-ready security partners for vendors, banks, and corporate compliance teams. Silbar supports with process documentation, training records, and clear contractual accountability.`,
]

const PROCESS_STEPS = [
  { title: 'Site discussion', desc: 'Share facility type, posts required, shifts, and risk concerns. We assess scope for {place}.' },
  { title: 'Proposal & commercials', desc: 'Receive a clear quote aligned to manpower category, compliance, and supervision for your {place} site.' },
  { title: 'Manpower selection', desc: 'Background-checked personnel are shortlisted and briefed on your site instructions.' },
  { title: 'Deployment & handover', desc: 'Guards mobilise with uniforms, duty tools as contracted, and supervisor introduction.' },
  { title: 'Ongoing management', desc: 'Attendance, replacements, night checks, and reporting continue through your account manager.' },
]

const WHY_POINTS_POOL = [
  'ISO 9001:2015 certified processes',
  'Background-verified, trained manpower',
  'PAN India coordination with local deployment',
  'Supervisor oversight and replacement backup',
  'Statutory compliance focus (wages, EPF/ESIC as applicable)',
  'Clear commercial proposals — no opaque billing',
  'Support for industrial, commercial, and residential sites',
  'WhatsApp / phone responsive account handling',
  'Documented SOPs and escalation matrix',
  'Experience across manufacturing, hospitals, warehouses, and offices',
]

export type FAQItem = { q: string; a: string }

export type LocationSEOContent = {
  intro: string[]
  sectorsHeading: string
  sectors: string[]
  sectorsBlurb: string
  operations: string
  compliance: string
  whyPoints: string[]
  process: { title: string; desc: string }[]
  faqs: FAQItem[]
  metaDescription: string
  servicesIntro: string
}

function sectorsForState(stateSlug: string, seed: number): string[] {
  const base = STATE_SECTORS[stateSlug] || DEFAULT_SECTORS
  return pickN(seed, base, 6)
}

export function generateCityContent(city: CityLocation): LocationSEOContent {
  const seed = stringToHash(city.slug)
  const sectors = sectorsForState(city.stateSlug, seed)
  const place = city.name

  const intro = [
    pick(seed, 1, CITY_OPENERS)(city),
    pick(seed, 2, CITY_CONTEXT)(city),
    pick(seed, 3, CITY_OPERATIONS)(city),
    pick(seed, 4, CITY_COMPLIANCE)(city),
  ]

  const whyPoints = pickN(seed, WHY_POINTS_POOL, 6)

  const process = PROCESS_STEPS.map((s) => ({
    title: s.title,
    desc: s.desc.replace(/\{place\}/g, place),
  }))

  const faqs: FAQItem[] = [
    {
      q: `Do you provide security guard services in ${city.name}?`,
      a: `Yes. Silbar Security deploys professional security guards and related services in ${city.name}, ${city.state}. Share your site details for a tailored proposal.`,
    },
    {
      q: `What types of security services are available in ${city.name}?`,
      a: `In ${city.name} we commonly deploy manned guarding (armed/unarmed as permitted), lady guards, supervisors, industrial/gate security, event security, and support for CCTV / facility processes depending on contract scope.`,
    },
    {
      q: `Are guards in ${city.name} verified and trained?`,
      a: `Yes. Personnel are background-verified and trained for access control, visitor handling, basic emergency response, and site-specific instructions before or during induction at your ${city.name} facility.`,
    },
    {
      q: `How fast can you deploy security staff in ${city.name}?`,
      a: `Deployment timelines depend on headcount, category (armed/unarmed), and local availability. Many commercial sites can be mobilised quickly after commercial and compliance formalities — ask for a current lead time for ${city.name}.`,
    },
    {
      q: `How are security guard charges calculated in ${city.name}?`,
      a: `Pricing depends on guard category, shift hours, supervision, statutory components, and site risk. Contact ${CONTACT.phone} or WhatsApp for a written quote for your ${city.name} location.`,
    },
    {
      q: `Do you follow minimum wages and statutory rules for ${city.state}?`,
      a: `We structure deployments in line with applicable state wage notifications and statutory requirements for eligible employees. Confirm inclusions in your commercial proposal for the ${city.name} site.`,
    },
    {
      q: `Can Silbar secure factories and warehouses in ${city.name}?`,
      a: `Yes. Industrial and logistics sites in ${city.name} are a core use-case — gate control, material movement discipline, perimeter awareness, and shift supervision as scoped.`,
    },
    {
      q: `How do I get a quote for security in ${city.name}?`,
      a: `Use the form on this page (opens WhatsApp with your details), call ${CONTACT.phone}, or email ${CONTACT.email}. Mention facility type, posts, and shifts for the fastest proposal.`,
    },
  ]

  // Rotate FAQ order slightly by seed for variety in schema
  const rotated = [...faqs.slice(seed % 3), ...faqs.slice(0, seed % 3)]

  return {
    intro,
    sectorsHeading: `Sectors we secure in ${city.name}`,
    sectors,
    sectorsBlurb: `Security needs in ${city.name} vary by facility type. Silbar supports deployments across ${sectors.slice(0, 4).join(', ')}, and similar environments — with SOPs matched to your operations in ${city.state}.`,
    operations: pick(seed, 5, CITY_OPERATIONS)(city),
    compliance: pick(seed, 6, CITY_COMPLIANCE)(city),
    whyPoints,
    process,
    faqs: rotated,
    metaDescription: `Security guard services in ${city.name}, ${city.state}. Silbar Security — ISO 9001:2015, trained manpower, industrial & commercial security. Call ${CONTACT.phone} for a free quote.`,
    servicesIntro: `Explore Silbar Security service verticals available for deployment planning in ${city.name}. Each service page explains scope, features, and FAQs; request a local quote for your site.`,
  }
}

export function generateStateContent(state: StateLocation): LocationSEOContent {
  const seed = stringToHash(state.slug)
  const sectors = sectorsForState(state.slug, seed)
  const citiesList = state.majorCities.slice(0, 5).join(', ')

  const intro = [
    `Silbar Security Services provides professional security solutions across ${state.name}, covering major cities including ${citiesList} and deployments across ${state.districts} districts where client sites require trained manpower.`,
    `With a state population of about ${state.population}, ${state.name} has diverse security demand — from industrial estates near ${state.capital} to commercial, healthcare, logistics, and residential facilities statewide. Silbar combines PAN India process standards with local deployment capability.`,
    pick(seed, 2, [
      `Our approach in ${state.name} prioritises verified guards, clear site instructions, supervisor checks, and statutory-aware commercial structures so clients can scale posts without losing control of quality.`,
      `Whether you need a single society desk in ${state.capital} or multi-plant industrial security across ${state.name}, Silbar Security designs headcount, shifts, and reporting to match operational reality.`,
      `Clients expanding across ${state.name} benefit from one security partner model: consistent training baseline, account ownership, and transparent proposals for each site.`,
    ]),
    `Silbar Security Services Pvt. Ltd. is ISO 9001:2015 certified and operates from its Jaipur headquarters with regional coordination for North, West, and other markets. For ${state.name} enquiries, contact ${CONTACT.phone} or submit the WhatsApp form on this page.`,
  ]

  const faqs: FAQItem[] = [
    {
      q: `Is Silbar Security available across ${state.name}?`,
      a: `Yes. We support security deployments across ${state.name}, including ${citiesList} and other districts based on site requirements and mobilisation timelines.`,
    },
    {
      q: `Which cities in ${state.name} do you cover?`,
      a: `Primary coverage includes ${state.majorCities.join(', ')}. If your site is in another district of ${state.name}, share the location — we evaluate deployment feasibility quickly.`,
    },
    {
      q: `What industries do you secure in ${state.name}?`,
      a: `Common deployments in ${state.name} include ${sectors.slice(0, 5).join(', ')}, among others. Each site gets SOPs suited to its risk and footfall.`,
    },
    {
      q: `Are your guards licensed and compliant for ${state.name}?`,
      a: `We deploy trained, background-verified personnel and structure contracts with attention to applicable labour and wage norms in ${state.name}. Licensing and documentation requirements are handled as part of onboarding.`,
    },
    {
      q: `How do I request a security quote in ${state.name}?`,
      a: `Call ${CONTACT.phone}, WhatsApp via the form on this page, or email ${CONTACT.email}. Share city, facility type, posts, and shifts for an accurate proposal.`,
    },
    {
      q: `Do you provide industrial and warehouse security in ${state.name}?`,
      a: `Yes. Manufacturing and logistics security — gate control, material discipline, perimeter awareness, and shift supervision — are core offerings for clients across ${state.name}.`,
    },
    {
      q: `Can you support multi-city security contracts in ${state.name}?`,
      a: `Yes. Multi-site clients in ${state.name} can consolidate under one commercial and operational framework with city-wise deployment and central coordination.`,
    },
  ]

  return {
    intro,
    sectorsHeading: `Key security demand areas in ${state.name}`,
    sectors,
    sectorsBlurb: `${state.name}'s economy spans ${sectors.slice(0, 3).join(', ')} and more. Silbar Security maps manpower and supervision to the sector risk of each facility — not a one-size roster.`,
    operations: `Statewide coordination for ${state.name} includes account management, replacement planning, and reporting standards consistent with Silbar’s ISO-oriented quality system. Capital-region operations around ${state.capital} are supported alongside other major cities listed on this page.`,
    compliance: `For ${state.name} deployments, we emphasise verification, training, wage-structure clarity, and statutory compliance for eligible employees. Exact inclusions are confirmed in each commercial proposal.`,
    whyPoints: pickN(seed, WHY_POINTS_POOL, 6),
    process: PROCESS_STEPS.map((s) => ({
      title: s.title,
      desc: s.desc.replace(/\{place\}/g, state.name),
    })),
    faqs,
    metaDescription: `Security guard company in ${state.name} — Silbar Security. Manned guarding across ${citiesList} & more. ISO 9001:2015. Call ${CONTACT.phone}.`,
    servicesIntro: `Silbar Security service lines available for sites across ${state.name}. Open any service for details, then request a state/city-specific quote.`,
  }
}

/** @deprecated use generateCityContent().intro — kept for any residual imports */
export function generateCityParagraphs(city: CityLocation): string[] {
  return generateCityContent(city).intro
}

/** @deprecated use generateStateContent().intro */
export function generateStateParagraphs(state: StateLocation): string[] {
  return generateStateContent(state).intro
}
