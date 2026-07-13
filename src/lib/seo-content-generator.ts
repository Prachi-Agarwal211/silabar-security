import { CityLocation, StateLocation } from '@/data/locations'
import { CONTACT } from '@/lib/config'

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
  while (out.length < Math.min(n, options.length) && i < options.length * 4) {
    const idx = (seed + i * 7919) % options.length
    if (!used.has(idx)) {
      used.add(idx)
      out.push(options[idx]!)
    }
    i++
  }
  return out
}

const STATE_SECTORS: Record<string, string[]> = {
  rajasthan: [
    'manufacturing & auto components',
    'gems & jewellery units',
    'hotels & heritage tourism',
    'warehouses & logistics parks',
    'educational campuses & coaching hubs',
    'residential townships & societies',
    'hospitals & diagnostic centres',
    'government & PSU facilities',
  ],
  delhi: [
    'corporate offices & IT parks',
    'retail malls & high streets',
    'multi-specialty hospitals',
    'embassy / VIP-adjacent facilities',
    'NCR warehouses & fulfilment',
    'premium residential societies',
    'event venues & exhibitions',
    'banking & financial offices',
  ],
  gujarat: [
    'chemical & pharma plants',
    'textile & garment parks',
    'ports, CFS & logistics',
    'diamond & jewellery manufacturing',
    'SEZ manufacturing units',
    'commercial complexes',
    'hospitals',
    'residential communities',
  ],
  maharashtra: [
    'IT parks & BFSI campuses',
    'auto & engineering plants',
    'JNPT / port logistics belt',
    'hospitals & healthcare chains',
    'retail & hypermarkets',
    'high-rise residential',
    'data centres',
    'event & entertainment venues',
  ],
  karnataka: [
    'IT / tech campuses',
    'startup offices',
    'biotech & pharma',
    'electronics manufacturing',
    'data centres',
    'educational institutions',
    'warehouses',
    'hospitals',
  ],
  'tamil-nadu': [
    'auto & component manufacturing',
    'IT parks',
    'ports & logistics',
    'textile clusters',
    'hospitals',
    'educational campuses',
    'retail',
    'residential societies',
  ],
  telangana: [
    'IT & pharma Hyderabad belt',
    'manufacturing',
    'warehouses',
    'hospitals',
    'corporate campuses',
    'residential townships',
    'education',
    'retail',
  ],
  'andhra-pradesh': [
    'ports & logistics',
    'manufacturing',
    'pharma SEZs',
    'IT parks',
    'hospitals',
    'infrastructure projects',
    'education',
    'residential',
  ],
  'uttar-pradesh': [
    'Noida / Greater Noida industry',
    'warehouses & e-commerce hubs',
    'hospitals',
    'educational institutes',
    'manufacturing',
    'commercial complexes',
    'residential societies',
    'government facilities',
  ],
  haryana: [
    'Gurugram corporate parks',
    'auto manufacturing',
    'warehouses',
    'retail',
    'residential societies',
    'hospitals',
    'education',
    'industrial estates',
  ],
  'madhya-pradesh': [
    'manufacturing',
    'warehouses',
    'hospitals',
    'educational campuses',
    'commercial buildings',
    'industrial estates',
    'retail',
    'residential',
  ],
  'west-bengal': [
    'ports & logistics',
    'manufacturing',
    'IT parks',
    'hospitals',
    'retail',
    'residential complexes',
    'education',
    'commercial offices',
  ],
  punjab: [
    'manufacturing',
    'warehouses',
    'hospitals',
    'educational institutes',
    'retail',
    'residential societies',
    'hotels',
    'agro-industry',
  ],
  bihar: [
    'hospitals',
    'educational campuses',
    'warehouses',
    'commercial complexes',
    'government facilities',
    'residential',
    'retail',
    'events',
  ],
  kerala: [
    'IT parks',
    'hospitals',
    'tourism & hotels',
    'ports',
    'educational campuses',
    'residential',
    'retail',
    'commercial offices',
  ],
  'jammu-and-kashmir': [
    'tourism & hospitality',
    'hospitals',
    'government facilities',
    'educational campuses',
    'commercial complexes',
    'residential',
    'events',
    'retail',
  ],
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

const CHALLENGES_POOL = [
  {
    title: 'Gate & access discipline',
    desc: 'Uncontrolled entry of visitors, contractors, and vehicles creates inventory loss and safety incidents. Structured gate posts reduce leakage.',
  },
  {
    title: 'Night-time vulnerability',
    desc: 'After-hours shifts and empty floors need alert manpower, clear patrol routes, and reliable escalation—not a single sleepy desk.',
  },
  {
    title: 'Attrition & absenteeism',
    desc: 'Unorganised agencies often fail on replacements. Clients need backup planning so critical posts never stay empty.',
  },
  {
    title: 'Visitor & vendor chaos',
    desc: 'Hospitals, offices, and societies face constant footfall. Without SOPs, queues and confrontations escalate quickly.',
  },
  {
    title: 'Material movement risk',
    desc: 'Factories and warehouses lose value at loading bays when challans, seals, and vehicle checks are informal.',
  },
  {
    title: 'Compliance exposure',
    desc: 'Wage disputes, missing statutory cover, and weak verification create legal and reputational risk for principal employers.',
  },
  {
    title: 'Multi-site inconsistency',
    desc: 'When each location has a different vendor style, reporting and quality collapse. Standard processes matter.',
  },
  {
    title: 'Emergency unreadiness',
    desc: 'Fire, medical, or intrusion events need rehearsed responses. Guards must know contacts, assembly points, and first actions.',
  },
  {
    title: 'Parking & traffic conflict',
    desc: 'Malls, hospitals, and societies face daily friction without trained traffic control and calm communication.',
  },
  {
    title: 'Poor reporting visibility',
    desc: 'Verbal updates hide problems. Clients need attendance discipline, incident logs, and supervisor feedback loops.',
  },
]

const DELIVERABLES_POOL = [
  'Uniformed, background-verified security personnel',
  'Site-specific duty instructions and post orders',
  'Gate / visitor / material control as scoped',
  'Shift attendance discipline and replacement backup',
  'Supervisor / field officer checks (as contracted)',
  'Incident logging and escalation matrix',
  'Basic emergency response readiness on post',
  'Coordination with facility / admin / HO teams',
  'Optional CCTV-aware manned posts',
  'Lady guards where gender-sensitive coverage is required',
  'Event surge manpower when pre-planned',
  'Clear commercial proposal with category-wise rates',
]

const TRAINING_TOPICS = [
  'Access control & visitor handling',
  'Gate procedures & vehicle checks',
  'Basic fire awareness & emergency response',
  'Patrolling techniques & observation',
  'Customer service & conflict de-escalation',
  'Report writing & radio/phone discipline',
  'First aid awareness (as trained)',
  'Site-specific SOP induction',
]

const PACKAGE_TYPES = [
  {
    name: 'Essential Guarding',
    points: ['Unarmed / standard posts', 'Shift coverage as scoped', 'Supervisor sampling', 'Basic reporting'],
  },
  {
    name: 'Industrial / Logistics',
    points: ['Gate + material focus', 'Loading bay awareness', 'Perimeter patrol plan', 'Shift handover discipline'],
  },
  {
    name: 'Corporate / Commercial',
    points: ['Reception-adjacent posts', 'Visitor management support', 'Lobby & parking discipline', 'Professional presentation'],
  },
  {
    name: 'Healthcare / Sensitive',
    points: ['Lady guards option', 'Ward / OPD flow support', 'Calm crowd handling', 'Emergency path awareness'],
  },
]

const WHO_NEEDS = [
  'Factory and plant owners needing gate and shift security',
  'Warehouse and 3PL operators managing high vehicle throughput',
  'Hospitals requiring disciplined visitor and emergency support',
  'Corporate offices and IT parks with multi-entry facilities',
  'Residential RWAs seeking reliable society desk coverage',
  'Retail malls and high-street brands managing footfall',
  'Hotels and event organisers needing surge manpower',
  'Educational institutions controlling campus access',
  'Banks and financial offices with sensitive premises',
  'Multi-city companies consolidating security vendors',
]

const WHY_POINTS_POOL = [
  'ISO 9001:2015 certified quality processes',
  'Background-verified, trained manpower',
  'PAN India coordination with local deployment capability',
  'Supervisor oversight and replacement planning',
  'Statutory-aware commercial structures (wages / EPF-ESIC as applicable)',
  'Documented SOPs and escalation matrix',
  'Experience across industrial, commercial, and residential sites',
  'Responsive phone and WhatsApp account handling',
  'Transparent proposals — category-wise clarity',
  'Headquarters in Jaipur with national operating model',
  'Support for armed/unarmed mixes where permitted and contracted',
  'Scalable for single site or multi-location contracts',
]

const PROCESS_STEPS = [
  { title: 'Discovery call / WhatsApp brief', desc: 'Share facility type, posts, shifts, city, and risk notes for {place}.' },
  { title: 'Scope & risk discussion', desc: 'We clarify gate, patrol, visitor, material, and supervision needs for your site.' },
  { title: 'Commercial proposal', desc: 'Receive category-wise rates, compliance notes, and mobilisation assumptions for {place}.' },
  { title: 'Manpower selection', desc: 'Background-checked personnel are aligned to post requirements and appearance standards.' },
  { title: 'Site induction', desc: 'Duty instructions, emergency contacts, and facility rules are briefed before full responsibility.' },
  { title: 'Go-live deployment', desc: 'Guards mobilise with uniforms and tools as contracted; supervisor introduces the team.' },
  { title: 'Stabilisation week', desc: 'Fine-tune posts, timings, and reporting based on real footfall in the first days.' },
  { title: 'Ongoing management', desc: 'Attendance, replacements, checks, and reviews continue via your account contact.' },
]

export type FAQItem = { q: string; a: string }
export type ChallengeItem = { title: string; desc: string }
export type PackageItem = { name: string; points: string[] }
export type ProcessStep = { title: string; desc: string }

export type LocationSEOContent = {
  placeName: string
  placeType: 'city' | 'state'
  intro: string[]
  marketOverview: string[]
  challengesHeading: string
  challenges: ChallengeItem[]
  sectorsHeading: string
  sectors: string[]
  sectorsBlurb: string
  deliverablesHeading: string
  deliverables: string[]
  packagesHeading: string
  packages: PackageItem[]
  whoNeedsHeading: string
  whoNeeds: string[]
  trainingHeading: string
  trainingTopics: string[]
  trainingBlurb: string
  operations: string[]
  compliance: string[]
  whyHeading: string
  whyPoints: string[]
  processHeading: string
  process: ProcessStep[]
  faqs: FAQItem[]
  closingCta: string
  metaDescription: string
  servicesIntro: string
  keywordsLine: string
}

function sectorsForState(stateSlug: string, seed: number): string[] {
  const base = STATE_SECTORS[stateSlug] || DEFAULT_SECTORS
  return pickN(seed, base, Math.min(8, base.length))
}

function buildFaqs(place: string, region: string, seed: number, isCity: boolean): FAQItem[] {
  const base: FAQItem[] = [
    {
      q: `Do you provide security guard services in ${place}?`,
      a: `Yes. Silbar Security deploys professional security manpower and related services in ${place}${isCity ? `, ${region}` : ''}. Share your site details for a tailored proposal and mobilisation timeline.`,
    },
    {
      q: `What security services can I hire in ${place}?`,
      a: `Common scopes in ${place} include manned guarding (unarmed/armed as permitted), lady guards, supervisors, industrial gate security, residential society desks, event surge staff, and support processes around visitor/material control. Exact mix depends on your facility.`,
    },
    {
      q: `Are security guards in ${place} background verified?`,
      a: `Yes. Personnel are background-verified as part of our recruitment process and inducted on site instructions before taking full charge of posts in ${place}.`,
    },
    {
      q: `How quickly can Silbar deploy guards in ${place}?`,
      a: `Lead time depends on headcount, category, and local availability. Many commercial sites can mobilise after commercial and onboarding formalities; large industrial rosters may need a short planning window. Ask for current timelines for ${place}.`,
    },
    {
      q: `How are security guard rates calculated for ${place}?`,
      a: `Rates depend on guard category, shift hours, supervision intensity, statutory components, and site risk. Contact ${CONTACT.phone} or use the WhatsApp form for a written quote for ${place}.`,
    },
    {
      q: `Do you follow minimum wages applicable in ${region}?`,
      a: `We structure deployments with attention to applicable state wage notifications and statutory requirements for eligible employees. Inclusions are confirmed in your commercial proposal for the ${place} site.`,
    },
    {
      q: `Can you secure factories and warehouses in ${place}?`,
      a: `Yes. Industrial and logistics sites are a core use-case — gate control, material movement discipline, perimeter awareness, and shift supervision as scoped for ${place}.`,
    },
    {
      q: `Do you provide lady security guards in ${place}?`,
      a: `Yes, where the site requires gender-sensitive coverage (hospitals, schools, certain corporate floors, societies). Availability is confirmed at proposal stage for ${place}.`,
    },
    {
      q: `What supervision do clients get in ${place}?`,
      a: `Depending on contract size, clients receive supervisor posts and/or field officer sampling, attendance checks, and structured escalation. Multi-post sites in ${place} typically need clearer supervision design.`,
    },
    {
      q: `Can Silbar handle multi-location security including ${place}?`,
      a: `Yes. Multi-site clients can consolidate under one partner model with local deployment in ${place} and central coordination from our operating team.`,
    },
    {
      q: `What documents should I prepare for onboarding in ${place}?`,
      a: `Typically: site address, post map, shift timings, emergency contacts, visitor rules, and any client compliance forms. Our team will guide you through contract and mobilisation paperwork.`,
    },
    {
      q: `How do I get a free security quote for ${place}?`,
      a: `Use the form on this page (opens WhatsApp with your details), call ${CONTACT.phone}, or email ${CONTACT.email}. Mention facility type, number of posts, and shifts for the fastest proposal.`,
    },
  ]
  const rotate = seed % 4
  return [...base.slice(rotate), ...base.slice(0, rotate)]
}

export function generateCityContent(city: CityLocation): LocationSEOContent {
  const seed = stringToHash(city.slug)
  const place = city.name
  const region = city.state
  const sectors = sectorsForState(city.stateSlug, seed)

  const intro = [
    pick(seed, 1, [
      `Silbar Security Services provides professional security guard services in ${place}, ${region}. We deploy trained, background-verified manpower for factories, offices, hospitals, warehouses, retail sites, residential communities, and institutional campuses across the city.`,
      `If you are searching for a reliable security agency in ${place}, Silbar Security delivers manned guarding and facility protection with ISO-aligned processes, clear commercials, and responsive coordination for clients across ${region}.`,
      `Businesses and institutions in ${place} need more than a uniform at the gate. Silbar Security focuses on disciplined posts, duty instructions, supervisor oversight, and measurable reporting tailored to local operating conditions in ${region}.`,
    ]),
    pick(seed, 2, [
      `${place} is a Tier-${city.tier} market with an urban population of about ${city.population}. Growth in industry, logistics, healthcare, retail, and housing increases demand for professional security — not ad-hoc manpower hired without process.`,
      `With roughly ${city.population} residents and expanding commercial activity, ${place} presents high-traffic gates, night shifts, and multi-tenant facilities. Our deployments emphasise verification, training, and site-specific SOPs.`,
      `${place}'s mix of industrial and commercial facilities (population ~${city.population}) requires flexible models — 8/12-hour shifts, lady guards where needed, and optional integration of manned posts with electronic surveillance practices.`,
    ]),
    pick(seed, 3, [
      `Silbar Security Services Pvt. Ltd. is headquartered in Jaipur and coordinates PAN India deployments. For ${place}, that means local mobilisation with national process standards — uniforms, induction, replacements, and account ownership.`,
      `Clients expanding into ${place} from other cities often want one security partner. We support multi-location contracts while keeping ${place} site instructions specific to your facility layout and risk profile.`,
    ]),
    `Whether you manage a single warehouse desk or a multi-post industrial complex in ${place}, we start with scope clarity: posts, shifts, visitor rules, material movement, and escalation contacts — then propose manpower that matches reality, not a generic brochure headcount.`,
  ]

  const marketOverview = [
    `Security demand in ${place} is driven by manufacturing units, logistics nodes, healthcare facilities, corporate offices, retail, education, and dense residential societies. Each environment needs different soft skills and post discipline.`,
    `Peak risks often appear at shift change, night hours, contractor entry windows, and festival seasons when footfall spikes. A professional agency plans posts and relief systems for these pressure points in ${place}.`,
    `Choosing Silbar Security for ${place} means you get a partner focused on operational control: attendance, presentation, duty knowledge, and communication with your facility or HO team — not just lowest-cost staffing.`,
  ]

  const challenges = pickN(seed, CHALLENGES_POOL, 6)
  const deliverables = pickN(seed, DELIVERABLES_POOL, 10)
  const whyPoints = pickN(seed, WHY_POINTS_POOL, 8)
  const whoNeeds = pickN(seed, WHO_NEEDS, 8)
  const trainingTopics = pickN(seed, TRAINING_TOPICS, 8)
  const packages = pickN(seed, PACKAGE_TYPES, 4)

  const process = PROCESS_STEPS.map((s) => ({
    title: s.title,
    desc: s.desc.replace(/\{place\}/g, place),
  }))

  const operations = [
    pick(seed, 10, [
      `Day operations in ${place} typically focus on access control, visitor flow, parking discipline, and professional interaction with employees and guests. Night operations emphasise patrol alertness, restricted zones, and reliable escalation.`,
      `In ${place}, we design posts around real movement: main gate, material gate, lobby, parking, and critical rooms. Over-posting wastes budget; under-posting creates blind spots — scoping is everything.`,
    ]),
    `Supervisors and field checks (as contracted) sample attendance, uniform standards, and knowledge of emergency contacts. Clients should receive a clear escalation path for incidents in ${place}.`,
    `For multi-shift sites, handover discipline matters: pending visitors, open permits, vehicle logs, and night observations must transfer cleanly between crews working your ${place} facility.`,
  ]

  const compliance = [
    `Silbar Security Services Pvt. Ltd. is ISO 9001:2015 certified. Guards deployed for ${place} sites are background-verified and operated under documented processes.`,
    `We structure commercials with attention to applicable labour norms and statutory components for eligible staff in ${region}. Exact inclusions — wages, benefits, supervision, and equipment — are listed in the proposal so finance and compliance teams can review cleanly.`,
    `Principal employers increasingly ask for documentation packs. Our team can discuss verification practices, training records, and contract clauses relevant to your ${place} deployment.`,
  ]

  return {
    placeName: place,
    placeType: 'city',
    intro,
    marketOverview,
    challengesHeading: `Common security challenges in ${place}`,
    challenges,
    sectorsHeading: `Sectors we secure in ${place}`,
    sectors,
    sectorsBlurb: `Security needs in ${place} vary by facility type. Silbar supports deployments across ${sectors.slice(0, 5).join(', ')}, and similar environments — with SOPs matched to operations in ${region}.`,
    deliverablesHeading: `What you can expect from a ${place} deployment`,
    deliverables,
    packagesHeading: `Engagement styles for ${place} facilities`,
    packages,
    whoNeedsHeading: `Who hires security services in ${place}?`,
    whoNeeds,
    trainingHeading: `Training focus for guards deployed in ${place}`,
    trainingTopics,
    trainingBlurb: `Beyond general guarding skills, personnel inducted at your ${place} site learn your layout, emergency contacts, visitor rules, and restricted areas so day-one performance is not guesswork.`,
    operations,
    compliance,
    whyHeading: `Why organisations choose Silbar in ${place}`,
    whyPoints,
    processHeading: `How Silbar deploys security in ${place}`,
    process,
    faqs: buildFaqs(place, region, seed, true),
    closingCta: `Ready to secure your facility in ${place}? Call ${CONTACT.phone}, WhatsApp via the form below, or email ${CONTACT.email}. Mention posts, shifts, and facility type for a fast proposal.`,
    metaDescription: `Security guard services in ${place}, ${region}. Silbar Security — trained manpower, industrial & commercial security, ISO 9001:2015. Call ${CONTACT.phone} for a free quote.`,
    servicesIntro: `Explore Silbar Security service verticals for planning your ${place} deployment. Open any service for features and FAQs, then request a local quote for your site.`,
    keywordsLine: `security guard services ${place}, security agency ${place}, manned guarding ${place}, security company ${region}, industrial security ${place}, society security ${place}`,
  }
}

export function generateStateContent(state: StateLocation): LocationSEOContent {
  const seed = stringToHash(state.slug)
  const place = state.name
  const citiesList = state.majorCities.slice(0, 6).join(', ')
  const sectors = sectorsForState(state.slug, seed)

  const intro = [
    `Silbar Security Services provides professional security solutions across ${place}, covering major cities including ${citiesList} and client sites across ${state.districts} districts where trained manpower is required.`,
    `With a state population of about ${state.population}, ${place} has diverse security demand — industrial estates, logistics corridors, hospitals, corporate campuses, retail, education, and dense residential communities.`,
    pick(seed, 2, [
      `Our approach in ${place} prioritises verified guards, clear site instructions, supervisor checks, and statutory-aware commercial structures so clients can scale posts without losing quality control.`,
      `Whether you need a society desk in ${state.capital} or multi-plant industrial security across ${place}, Silbar designs headcount, shifts, and reporting to match operational reality.`,
      `Clients expanding across ${place} benefit from one security partner model: consistent training baseline, account ownership, and transparent proposals for each site.`,
    ]),
    `Silbar Security Services Pvt. Ltd. is ISO 9001:2015 certified and operates from Jaipur headquarters with regional coordination. For ${place} enquiries, contact ${CONTACT.phone} or submit the WhatsApp form on this page.`,
  ]

  const marketOverview = [
    `${place}'s economy spans ${sectors.slice(0, 4).join(', ')} and more. Security risk profiles differ sharply between a pharma plant, a mall, and a residential township — generic rosters fail.`,
    `Statewide operations need both local mobilisation and central standards. Silbar supports capital-region demand around ${state.capital} while deploying to other major cities listed on this page.`,
    `Festival peaks, night logistics, contractor surges, and multi-tenant buildings are recurring stress points across ${place}. Professional agencies plan relief, supervision, and escalation for those moments.`,
  ]

  return {
    placeName: place,
    placeType: 'state',
    intro,
    marketOverview,
    challengesHeading: `Security challenges facilities face across ${place}`,
    challenges: pickN(seed, CHALLENGES_POOL, 6),
    sectorsHeading: `Key security demand areas in ${place}`,
    sectors,
    sectorsBlurb: `${place}'s demand spans ${sectors.slice(0, 4).join(', ')}. Silbar maps manpower and supervision to sector risk — not a one-size roster for every site in the state.`,
    deliverablesHeading: `What Silbar delivers for ${place} sites`,
    deliverables: pickN(seed, DELIVERABLES_POOL, 10),
    packagesHeading: `Typical engagement models in ${place}`,
    packages: pickN(seed, PACKAGE_TYPES, 4),
    whoNeedsHeading: `Who needs professional security in ${place}?`,
    whoNeeds: pickN(seed, WHO_NEEDS, 8),
    trainingHeading: `Training & induction standards for ${place}`,
    trainingTopics: pickN(seed, TRAINING_TOPICS, 8),
    trainingBlurb: `Guards allocated to ${place} sites receive process training plus facility induction covering layout, emergency paths, and client-specific rules before full post ownership.`,
    operations: [
      `Statewide coordination for ${place} includes account management, replacement planning, and reporting standards consistent with Silbar’s quality system.`,
      `Capital and major-city sites often need higher visitor soft-skills; industrial belts need gate and material discipline. We scope each city facility separately even under one state contract.`,
      `Multi-city clients in ${place} can standardise KPIs — attendance, night checks, incident reporting — while allowing site SOPs to differ by plant or campus.`,
    ],
    compliance: [
      `For ${place} deployments, we emphasise verification, training, wage-structure clarity, and statutory compliance for eligible employees.`,
      `Exact inclusions are confirmed in each commercial proposal so finance, HR, and compliance stakeholders can review without ambiguity.`,
      `ISO 9001:2015 certification underpins our process discipline; site delivery still depends on clear client instructions and joint onboarding in ${place}.`,
    ],
    whyHeading: `Why choose Silbar Security in ${place}`,
    whyPoints: pickN(seed, WHY_POINTS_POOL, 8),
    processHeading: `Deployment process for sites in ${place}`,
    process: PROCESS_STEPS.map((s) => ({
      title: s.title,
      desc: s.desc.replace(/\{place\}/g, place),
    })),
    faqs: buildFaqs(place, place, seed, false),
    closingCta: `Planning security across ${place}? Call ${CONTACT.phone} or use the form below — WhatsApp opens with your enquiry pre-filled for our team.`,
    metaDescription: `Security guard company in ${place} — Silbar Security. Manned guarding across ${citiesList} & more. ISO 9001:2015. Call ${CONTACT.phone}.`,
    servicesIntro: `Silbar Security service lines available for sites across ${place}. Open any service for details, then request a state/city-specific quote.`,
    keywordsLine: `security guard services ${place}, security agency ${place}, security company ${state.capital}, manned guarding ${place}, industrial security ${place}`,
  }
}

export function generateCityParagraphs(city: CityLocation): string[] {
  return generateCityContent(city).intro
}

export function generateStateParagraphs(state: StateLocation): string[] {
  return generateStateContent(state).intro
}

/** Extra long-form blocks for service detail pages */
export function generateServiceExtraContent(serviceTitle: string, shortTitle: string) {
  const seed = stringToHash(serviceTitle)
  return {
    benefits: pickN(seed, [
      `Specialised ${shortTitle.toLowerCase()} aligned to real site risk — not generic manpower.`,
      'Clear commercials and scope definitions for finance and operations teams.',
      'Background-verified personnel with induction on your facility rules.',
      'Supervisor / field support options for multi-post sites.',
      'PAN India coordination for multi-city brands.',
      'ISO 9001:2015 process backbone with local deployment.',
    ], 6),
    process: [
      { title: 'Requirement capture', desc: `Share facility type, posts, shifts, and why you need ${shortTitle.toLowerCase()}.` },
      { title: 'Scope design', desc: 'We map posts, supervision, and compliance notes to your risk profile.' },
      { title: 'Proposal', desc: 'Receive transparent rates and mobilisation assumptions.' },
      { title: 'Selection & briefing', desc: 'Personnel are aligned to appearance, skills, and site instructions.' },
      { title: 'Go-live', desc: 'Deployment with handover, then stabilisation based on real footfall.' },
      { title: 'Review', desc: 'Ongoing replacements, checks, and reporting as contracted.' },
    ],
    useCases: pickN(seed, [
      'Manufacturing plants and industrial estates',
      'Warehouses, CFS, and logistics parks',
      'Hospitals and diagnostic centres',
      'Corporate offices and IT parks',
      'Residential societies and townships',
      'Retail malls and high-street stores',
      'Hotels, banquets, and events',
      'Educational campuses',
      'Banks and financial offices',
      'Infrastructure and project sites',
    ], 8),
  }
}
