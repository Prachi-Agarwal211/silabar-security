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
    'mining & mineral processing units (zinc, marble, sandstone)',
    'textile & garment manufacturing (Pali, Bhilwara)',
    'renewable energy plants (solar & wind farms)',
    'gems & jewellery units',
    'hotels & heritage tourism properties',
    'auto components & engineering (Neemrana, Bhiwadi)',
    'warehouses & logistics parks',
    'educational campuses & coaching hubs',
    'defence manufacturing facilities',
    'residential townships & societies',
    'hospitals & diagnostic centres',
    'government & PSU facilities',
  ],
  delhi: [
    'corporate offices & IT parks',
    'data centres (Delhi NCR)',
    'retail malls & high streets',
    'multi-specialty hospitals',
    'embassy / VIP-adjacent facilities',
    'NCR warehouses & fulfilment centres',
    'premium residential societies',
    'event venues & exhibition grounds',
    'banking & financial offices',
    'government buildings & PSU HQs',
    'logistics & distribution hubs',
    'hotels & convention centres',
  ],
  gujarat: [
    'chemical & petrochemical plants (Ankleshwar, Dahej)',
    'pharmaceutical manufacturing units',
    'textile & garment parks',
    'ports, CFS & logistics corridors',
    'diamond & jewellery manufacturing (Surat)',
    'semiconductor fabrication units (Sanand)',
    'SEZ manufacturing units',
    'renewable energy & solar parks',
    'commercial complexes',
    'hospitals',
    'residential communities',
    'auto & EV manufacturing plants',
  ],
  maharashtra: [
    'IT parks & BFSI campuses (Mumbai, Pune)',
    'auto & EV manufacturing (Pune, Nashik)',
    'JNPT / port logistics belt',
    'pharmaceutical & biotech units',
    'hospitals & healthcare chains',
    'retail & hypermarkets',
    'high-rise residential towers',
    'data centres & cloud infrastructure',
    'event & entertainment venues',
    'financial district offices',
    'manufacturing & engineering plants',
    'hotels & hospitality properties',
  ],
  karnataka: [
    'IT / tech campuses (Bengaluru)',
    'startup offices & co-working spaces',
    'biotech & pharmaceutical R&D',
    'aerospace & defence manufacturing',
    'electronics manufacturing units',
    'data centres & cloud facilities',
    'educational institutions (universities, colleges)',
    'warehouses & fulfilment centres',
    'hospitals & medical chains',
    'corporate GCCs & BPO centres',
    'residential townships',
    'retail & commercial complexes',
  ],
  'tamil-nadu': [
    'auto & component manufacturing (Chennai, Hosur)',
    'IT parks & tech campuses',
    'ports & maritime logistics',
    'textile & apparel clusters (Tiruppur, Coimbatore)',
    'electronics & engineering units',
    'hospitals & healthcare facilities',
    'educational campuses',
    'retail malls & showrooms',
    'residential societies',
    'pharmaceutical manufacturing',
    'railway & metro infrastructure',
    'cement & building materials plants',
  ],
  telangana: [
    'IT & pharmaceutical Hyderabad belt',
    'life sciences & vaccine production',
    'auto & EV components',
    'warehouses & distribution hubs',
    'hospitals & diagnostic chains',
    'corporate GCCs & tech offices',
    'residential townships',
    'educational institutions',
    'retail & commercial complexes',
    'electronics manufacturing',
    'biotech R&D centres',
    'event & convention venues',
  ],
  'andhra-pradesh': [
    'ports & maritime logistics (Visakhapatnam)',
    'pharma SEZs & manufacturing',
    'IT parks & tech offices',
    'manufacturing & industrial estates',
    'hospitals & healthcare',
    'infrastructure & construction projects',
    'educational institutions',
    'residential communities',
    'retail & commercial',
    'fisheries & food processing',
    'renewable energy parks',
    'textile & apparel units',
  ],
  'uttar-pradesh': [
    'electronics manufacturing (Noida, Greater Noida)',
    'defence & aerospace corridor (Kanpur, Lucknow)',
    'leather & footwear (Kanpur, Agra)',
    'warehouses & e-commerce fulfilment hubs',
    'hospitals & medical chains',
    'educational institutes & universities',
    'manufacturing & industrial estates',
    'commercial complexes & IT parks',
    'residential societies & townships',
    'government & PSU facilities',
    'data centres & cloud infrastructure',
    'hotels & tourism properties (Agra)',
  ],
  haryana: [
    'Gurugram corporate parks & IT campuses',
    'auto & EV manufacturing (Manesar, Kharkhoda)',
    'warehouses & logistics hubs',
    'retail malls & high streets',
    'residential societies & townships',
    'hospitals & healthcare chains',
    'educational institutions',
    'textile recycling & manufacturing (Panipat)',
    'industrial estates & IMTs (Rohtak, Bawal)',
    'data centres',
    'engineering goods (Faridabad)',
    'commercial offices & banking hubs',
  ],
  'madhya-pradesh': [
    'auto & engineering (Pithampur)',
    'pharmaceutical & medical devices (Ujjain)',
    'textile & apparel (PM MITRA Park, Dhar)',
    'warehouses & distribution centres',
    'hospitals & healthcare',
    'educational campuses',
    'commercial buildings',
    'industrial estates',
    'retail & shopping centres',
    'residential communities',
    'cement & building materials',
    'agro-processing & food parks',
  ],
  'west-bengal': [
    'defence shipbuilding (Kolkata, GRSE)',
    'jute & textile clusters (Howrah, Hooghly)',
    'ports & maritime logistics',
    'IT parks & tech campuses',
    'hospitals & healthcare',
    'retail & commercial complexes',
    'residential complexes & townships',
    'educational institutions',
    'manufacturing & engineering units',
    'tea processing & packaging (Siliguri)',
    'commercial offices & banking',
    'event & cultural venues',
  ],
  punjab: [
    'auto components & bicycle manufacturing (Ludhiana)',
    'textile & hosiery clusters',
    'food processing & agro-industry',
    'warehouses & cold storage',
    'hospitals & medical facilities',
    'educational institutes & universities',
    'retail & commercial complexes',
    'residential societies',
    'hotels & hospitality',
    'light engineering & machine tools',
    'sports goods manufacturing (Jalandhar)',
    'logistics & distribution hubs',
  ],
  bihar: [
    'hospitals & medical colleges',
    'educational campuses & coaching hubs',
    'warehouses & logistics',
    'commercial complexes',
    'government facilities',
    'residential societies',
    'retail & markets',
    'event & wedding venues',
    'food processing units',
    'manufacturing & industrial estates',
    'hotels & hospitality',
    'infrastructure project sites',
  ],
  kerala: [
    'IT parks & tech campuses',
    'hospitals & super-specialty medical centres',
    'tourism & hospitality properties',
    'ports & maritime logistics',
    'educational campuses',
    'residential communities',
    'retail & shopping centres',
    'commercial offices',
    'healthcare & ayurveda centres',
    'food processing & marine exports',
    'banking & financial offices',
    'event & convention venues',
  ],
  jharkhand: [
    'coal mining & processing (Dhanbad, BCCL)',
    'steel & metal plants (Jamshedpur, Bokaro)',
    'cement manufacturing units',
    'hospitals & healthcare',
    'educational institutions',
    'warehouses & logistics',
    'commercial complexes',
    'residential societies',
    'retail & markets',
    'government facilities',
    'infrastructure project sites',
    'power & energy plants',
  ],
  chhattisgarh: [
    'steel & core sector plants (Raigarh, Bhilai)',
    'iron ore mining & processing',
    'AI & semiconductor (Nava Raipur)',
    'cement manufacturing',
    'hospitals & healthcare',
    'educational institutions',
    'warehouses & logistics',
    'commercial complexes',
    'residential societies',
    'power & thermal energy plants',
    'food processing units',
    'textile & apparel (emerging)',
  ],
  odisha: [
    'steel & metal plants (Rourkela, Jharsuguda)',
    'petrochemical & refinery (Paradip)',
    'ports & maritime logistics',
    'green energy & renewable parks',
    'hospitals & healthcare',
    'educational institutions',
    'warehouses & distribution hubs',
    'commercial complexes',
    'residential societies',
    'mining & mineral processing',
    'semiconductor (emerging, Bhubaneswar)',
    'infrastructure project sites',
  ],
  uttarakhand: [
    'pharmaceutical manufacturing (Haridwar, SIDCUL)',
    'auto components & manufacturing (Rudrapur)',
    'hospitals & healthcare',
    'educational institutions',
    'residential societies',
    'hotels & tourism / pilgrimage properties',
    'commercial complexes',
    'retail & markets',
    'warehouses & logistics',
    'data centres (emerging)',
    'government facilities',
    'event & wedding venues',
  ],
  'jammu-and-kashmir': [
    'tourism & hospitality (hotels, resorts)',
    'hospitals & healthcare',
    'government facilities',
    'educational campuses',
    'commercial complexes',
    'residential societies',
    'event venues',
    'retail & markets',
    'apple & horticulture processing',
    'handicraft & carpet manufacturing',
    'infrastructure project sites',
    'banking & financial offices',
  ],
  chandigarh: [
    'tractor ancillaries & light engineering',
    'pharmaceutical manufacturing',
    'IT / ITeS & fintech (emerging)',
    'hospitals & healthcare',
    'educational institutions',
    'commercial complexes',
    'residential societies',
    'retail & shopping centres',
    'government & PSU facilities',
    'hotels & hospitality',
    'event & convention venues',
    'data centres (emerging)',
  ],
  'dadra-and-nagar-haveli': [
    'industrial estates & manufacturing (Silvassa)',
    'warehouses & logistics hubs',
    'pharmaceutical & chemical units',
    'hospitals & healthcare',
    'educational institutions',
    'commercial complexes',
    'residential societies',
    'retail & markets',
    'textile & apparel units',
    'food processing & packaging',
    'government facilities',
    'infrastructure project sites',
  ],
  'daman-and-diu': [
    'ports & maritime logistics',
    'tourism & hospitality properties',
    'pharmaceutical manufacturing units',
    'textile & garment units',
    'warehouses & distribution centres',
    'hotels & beach resorts',
    'commercial complexes',
    'residential communities',
    'hospitals & healthcare',
    'educational institutions',
    'retail & shopping centres',
    'event & cultural venues',
  ],
  ladakh: [
    'tourism & hospitality (hotels, guesthouses, homestays)',
    'hospitals & healthcare facilities',
    'government & defence infrastructure',
    'educational institutions',
    'commercial establishments',
    'residential complexes',
    'retail & markets',
    'infrastructure & construction project sites',
    'banking & financial offices',
    'renewable energy (solar micro-grids)',
    'cold storage & warehousing',
    'event & cultural venues',
  ],
  lakshadweep: [
    'tourism & resort properties',
    'ports & maritime infrastructure',
    'fisheries & seafood processing',
    'hospitals & healthcare centres',
    'government & administrative facilities',
    'educational institutions',
    'commercial establishments',
    'residential communities',
    'retail & local markets',
    'renewable energy (solar & wind)',
    'telecommunications & satellite infrastructure',
    'event & community venues',
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
    desc: 'Uncontrolled entry of visitors, contractors, and vehicles creates inventory loss and safety incidents. Structured gate posts with vehicle and material challan systems reduce leakage significantly.',
  },
  {
    title: 'Night-time vulnerability',
    desc: 'After-hours shifts and empty floors need alert manpower, clear patrol routes with checkpoints, and reliable escalation — not a single unmonitored desk.',
  },
  {
    title: 'Attrition & absenteeism',
    desc: 'Unorganised agencies often fail on replacements. Clients need a backup pool of trained relievers so critical posts never stay empty during leave or absence.',
  },
  {
    title: 'Visitor & vendor chaos',
    desc: 'Hospitals, corporate offices, and residential societies face constant footfall. Without SOPs, queues build up and confrontations escalate quickly.',
  },
  {
    title: 'Material movement & theft prevention',
    desc: 'Factories and warehouses lose value at loading bays when challans, seals, gate passes, and vehicle checks are informal or skipped.',
  },
  {
    title: 'Compliance exposure (EPF, ESIC, wages)',
    desc: 'Wage disputes, missing statutory cover, and weak background verification create legal and reputational risk for principal employers during labour audits.',
  },
  {
    title: 'Multi-site inconsistency',
    desc: 'When each location has a different vendor with varying standards, reporting and service quality collapse. Standardised processes across sites matter.',
  },
  {
    title: 'Emergency unreadiness',
    desc: 'Fire, medical, or intrusion events need rehearsed responses. Guards must know emergency contacts, assembly points, fire extinguisher locations, and first actions.',
  },
  {
    title: 'Parking & traffic conflict',
    desc: 'Malls, hospitals, IT parks, and residential societies face daily friction at entry and exit points without trained traffic management and calm communication.',
  },
  {
    title: 'Poor reporting & visibility',
    desc: 'Verbal handovers and absent shift logs hide problems. Clients need structured attendance records, incident reports, and supervisor feedback loops.',
  },
  {
    title: 'IT-OT convergence cyber risk',
    desc: 'Smart factories and automated plants face new threats as IT and operational technology networks merge. Security guards must be alert to unusual access and device tampering.',
  },
  {
    title: 'Labour unrest & crowd management',
    desc: 'Industrial areas sometimes face labour disputes, union activities, or contractor workforce agitations. Guards trained in de-escalation and crowd management are essential.',
  },
  {
    title: 'Drone & perimeter intrusion',
    desc: 'With rising drone activity near sensitive industrial zones, perimeter security now includes airspace awareness and coordinated response protocols.',
  },
  {
    title: 'Seasonal & festival surge pressure',
    desc: 'Festival seasons, harvest periods, and holiday rushes create sudden manpower demand spikes that unplanned agencies cannot handle without quality dropping.',
  },
  {
    title: 'Contractor & temporary worker oversight',
    desc: 'High churn of contract labour at factories and construction sites makes it hard to maintain consistent access control and identity verification at gates.',
  },
  {
    title: 'Cybersecurity-physical security convergence',
    desc: 'As OT and IoT devices proliferate across industrial floors, physical security teams must identify anomalous access near critical network infrastructure and data ports — not just patrol perimeters.',
  },
  {
    title: 'Parking lot security blind spots',
    desc: 'Large parking areas at malls, IT parks, and hospitals create zones with minimal oversight. Vehicle theft, vandalism, and unauthorised loitering go unnoticed without structured patrol routes.',
  },
  {
    title: 'Vendor & contractor access management',
    desc: 'Contractors, AMC technicians, and delivery personnel enter and exit throughout the day. Without a robust contractor pass system and time-bound clearance, sites risk tailgating and unescorted movement.',
  },
  {
    title: 'Cargo theft during transit & loading',
    desc: 'Material disappears not just from warehouses but during loading and dispatch. Security must cover vehicle sealing, dispatch verification, and driver handover protocols at the loading bay.',
  },
  {
    title: 'Data privacy in security operations',
    desc: 'Security logs contain visitor IDs, vehicle numbers, and incident details. Mishandling this data — lost registers, unsecured digital records — creates privacy liability for the client organisation.',
  },
  {
    title: 'Substance abuse screening requirements',
    desc: 'Factories and logistics hubs increasingly mandate alcohol and substance testing for security staff. Defining a fair screening policy with privacy safeguards is a growing operational challenge.',
  },
  {
    title: 'Night shift fatigue management',
    desc: 'Guards on back-to-back night rotations face alertness drops after the third consecutive shift. Roster fatigue leads to missed patrols, delayed incident response, and higher accident risk.',
  },
  {
    title: 'Cross-border movement security',
    desc: 'Sites near state borders with frequent goods movement face unique challenges — document verification at checkpoints, driver identification, and cargo reconciliation across regulatory jurisdictions.',
  },
  {
    title: 'Seasonal demand fluctuation for security',
    desc: 'Agricultural harvests, tourist seasons, and retail festival rushes create unpredictable manpower demands. Fixed contracts leave clients overstaffed in lean months and understaffed during peaks.',
  },
  {
    title: 'Integration of legacy security systems',
    desc: 'Many facilities still operate analog CCTV, standalone biometric readers, or manual logbooks. Deploying guards who can work alongside — not replace — these legacy systems requires careful SOP design.',
  },
]

const DELIVERABLES_POOL = [
  'Uniformed, background-verified security personnel with valid ID cards',
  'Site-specific duty instructions (DSI) and post orders for each location',
  'Gate / visitor / material movement control with challan and log systems',
  'Shift attendance discipline and trained replacement backup pool',
  'Supervisor / field officer checks and night patrolling (as contracted)',
  'Incident logging, daily reports, and structured escalation matrix',
  'Emergency response readiness — fire, medical, intrusion protocols',
  'Coordination with facility management / admin / HO teams',
  'Optional CCTV-aware manned posts with surveillance integration',
  'Lady guards where gender-sensitive coverage is required',
  'Event surge manpower for planned peaks and seasonal demand',
  'Clear commercial proposal with category-wise wage and statutory breakdown',
  'Monthly compliance documentation (attendance, PF/ESIC, wage registers)',
  'GPS-enabled guard tour monitoring for night shift vigilance',
  'Visitor management app integration where required by client',
  'Real-time incident dashboard with SMS/WhatsApp alert notifications',
  'Monthly security performance scorecard with key metrics and trend analysis',
  'Annual comprehensive security audit report with vulnerability assessment',
  'Digital visitor log with photo capture and ID card scanning',
  'GPS-enabled guard tour tracking system with checkpoint violation alerts',
  'Fire drill execution reports with timestamped photos and attendance logs',
  'Weekly perimeter inspection summary with photographic evidence',
  'Biometric attendance integration report for multi-site payroll consolidation',
  'Vendor background check documentation with court record verification proof',
  'Executive protection itinerary logs with route risk assessments',
]

const TRAINING_TOPICS = [
  'Access control & visitor handling protocols',
  'Gate procedures, vehicle checks & material challan systems',
  'Basic fire awareness, extinguisher use & emergency evacuation',
  'Patrolling techniques, observation & checkpoint verification',
  'Customer service, communication & conflict de-escalation',
  'Report writing, incident logging & radio/phone discipline',
  'First aid awareness & medical emergency response',
  'Site-specific SOP induction & duty instruction briefing',
  'Crowd management & labour unrest de-escalation',
  'Night vigilance & GPS-enabled tour monitoring compliance',
  'Cybersecurity awareness — identifying phishing, tailgating, and device tampering',
  'Customer service, professional conduct, and telephone etiquette',
  'Report writing, incident documentation, and digital log filling',
  'Defensive driving for security drivers — hazard perception and evasive manoeuvres',
  'CCTV operation basics, camera blind-spot identification, and video playback for investigations',
  'Diversity and inclusion in security operations — gender sensitivity and cultural awareness',
  'Stress management, shift fatigue coping, and mental health awareness for security personnel',
  'Environmental safety awareness and waste management best practices for facility perimeters',
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
  'Factory and plant owners needing gate control, material movement checks, and shift security',
  'Warehouse and 3PL operators managing high vehicle throughput and inventory protection',
  'Hospitals requiring disciplined visitor management, crowd control, and emergency support',
  'Corporate offices and IT parks with multi-entry facilities and professional front desk presence',
  'Residential RWAs seeking reliable society gate management and night patrol coverage',
  'Retail malls, showrooms, and high-street brands managing footfall and loss prevention',
  'Hotels, resorts, and event organisers needing guest-facing security and surge manpower',
  'Educational institutions — schools, colleges, universities — controlling campus access and student safety',
  'Banks, ATMs, and financial offices with sensitive premises and cash handling support',
  'Government departments and PSUs requiring compliant, PSARA-licensed security deployment',
  'Manufacturing plants in auto, pharma, engineering, and FMCG sectors needing industrial security',
  'Multi-city companies consolidating security vendors under a single standardised partner model',
  'Construction and infrastructure project sites requiring material theft prevention and site access control',
  'Data centres and tech facilities needing strict access protocols and surveillance-aware guarding',
  'Logistics parks, CFS, and port-adjacent facilities with round-the-clock operational security needs',
  'Multi-site retail chains with inventory loss concerns and high footfall management',
  'Gated communities and premium residential townships with high resident service expectations',
  'Pharmaceutical companies requiring controlled substance access logs and clean-room entry discipline',
  'Data centres and cloud infrastructure providers needing ISO 27001-aligned physical access controls',
  'Educational institutions — schools, colleges, hostels — requiring POCSO-compliant campus security protocols',
  'Luxury hotels, boutique resorts, and serviced apartments with VIP guest privacy and protection needs',
  'Logistics companies and fleet operators with cargo theft prevention and loading bay supervision requirements',
  'Government offices, secretariats, and public service centres requiring protocol-compliant security deployment',
  'Sports stadiums, entertainment venues, and convention centres with large crowd ingress and egress management',
  'Commercial real estate developers requiring construction site security during active development phases',
]

const WHY_POINTS_POOL = [
  '4 ISO certifications (9001:2015, 14001:2015, 45001:2018, 27001) — IAF accredited',
  'PSARA licensed across 19 states with multi-state compliance capability',
  'Background-verified, trained manpower with police verification',
  'PAN India coordination with local deployment in 200+ cities',
  'Supervisor oversight, night patrol checks, and replacement pool planning',
  'Statutory-aware commercial structures (wages / EPF / ESIC as applicable)',
  'Documented SOPs, post orders, and structured escalation matrix',
  'Experience across industrial, corporate, commercial, government, and residential sites',
  'Responsive phone, email, and WhatsApp account management for clients',
  'Transparent proposals with category-wise wage and compliance breakdown',
  'Registered Office in New Delhi with PAN India operating model',
  'Scalable for single site or multi-location, multi-state contracts',
  'Monthly compliance documentation and attendance reporting',
  'Startup India recognised and CAPSI member',
  'Support for armed/unarmed mixes, lady guards, and specialised posts where permitted',
  'Transparent commercial breakup with category-wise wages, statutory components, and service charges — no hidden fees',
  'Dedicated account manager assigned to every contract for single-point client coordination',
  'Multi-location deployment capability across 200+ cities with consistent service standards',
  '24-hour replacement guarantee for absentee guards to ensure critical posts are never vacant',
  'Monthly MIS reports with incident trend analytics, attendance summaries, and compliance dashboards',
  'Police-verified manpower with court record background checks and periodic reverification cycles',
  'ISO 14001:2015 environmental management compliance for eco-conscious facility operations',
  'Comprehensive insurance coverage — public liability, employee compensation, and third-party property damage',
  'Local expertise across 19 PSARA-licensed states with native-language guards and regional team presence',
  'Real-time GPS-based attendance and patrol tracking with supervisor verification alerts',
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
      `If you are searching for a reliable security agency in ${place}, Silbar Security delivers manned guarding and facility protection with ISO-certified processes, PSARA compliance, clear commercials, and responsive coordination for clients across ${region}.`,
      `Businesses and institutions in ${place} need more than a uniform at the gate. Silbar Security focuses on disciplined posts, site-specific duty instructions, supervisor oversight, monthly compliance reporting, and measurable service standards tailored to local operating conditions in ${region}.`,
    ]),
    pick(seed, 2, [
      `${place} is a Tier-${city.tier} market with an urban population of about ${city.population}. Growth in industry, logistics, healthcare, retail, and housing increases demand for professional, compliance-driven security — not ad-hoc manpower hired without process.`,
      `With roughly ${city.population} residents and expanding commercial activity across ${sectors.slice(0, 4).join(', ')}, ${place} presents high-traffic gates, night shift requirements, and multi-tenant facilities that demand verified personnel and structured supervision.`,
      `${place}'s mix of industrial and commercial facilities (population ~${city.population}) requires flexible deployment models — 8/12-hour shifts, lady guards where gender sensitivity is needed, and optional integration of manned posts with electronic surveillance systems.`,
    ]),
    pick(seed, 3, [
      `Silbar Security Services Pvt. Ltd. — with Registered Office in New Delhi, Corporate Office in Gurugram, and branch presence in Jaipur — coordinates PAN India deployments. For ${place}, that means local mobilisation with national process standards: uniforms, induction, replacement pool, and account management.`,
      `Clients expanding into ${place} from other cities often prefer a single security partner. We support multi-location contracts across ${region} while keeping each site's duty instructions specific to its facility layout, operational hours, and risk profile.`,
    ]),
    `Whether you manage a single warehouse gate or a multi-post industrial complex in ${place}, we start with scope clarity: number of posts, shift timings, visitor management rules, material movement protocols, and escalation contacts — then propose trained manpower that matches your actual requirements, not a generic brochure headcount.`,
  ]

  const marketOverview = [
    `Security demand in ${place} is driven by ${sectors.slice(0, 5).join(', ')}, and other commercial activities. Each facility type needs different soft skills, post discipline, and supervision intensity — a one-size approach fails across such varied environments.`,
    `Peak risks in ${place} often appear at shift changeovers, night hours when visibility is low, contractor entry windows, and festival seasons when footfall spikes dramatically. A professional agency plans posts, relief systems, and supervisor coverage for these pressure points.`,
    `Choosing Silbar Security for ${place} means partnering with a PSARA-licensed, ISO-certified agency focused on operational control: attendance discipline, professional presentation, duty knowledge, compliance documentation, and responsive communication with your facility management or HO team.`,
  ]

  const challenges = pickN(seed, CHALLENGES_POOL, 8)
  const deliverables = pickN(seed, DELIVERABLES_POOL, 12)
  const whyPoints = pickN(seed, WHY_POINTS_POOL, 10)
  const whoNeeds = pickN(seed, WHO_NEEDS, 10)
  const trainingTopics = pickN(seed, TRAINING_TOPICS, 8)
  const packages = pickN(seed, PACKAGE_TYPES, 4)

  const process = PROCESS_STEPS.map((s) => ({
    title: s.title,
    desc: s.desc.replace(/\{place\}/g, place),
  }))

  const operations = [
    pick(seed, 10, [
      `Day operations in ${place} typically focus on access control, visitor flow management, parking discipline, and professional interaction with employees, clients, and guests. Night operations emphasise patrol alertness, restricted zone monitoring, and reliable escalation to supervisors.`,
      `In ${place}, we design posts around actual movement patterns: main gate, material gate, lobby reception, parking areas, and critical asset rooms. Over-posting wastes your budget; under-posting creates security blind spots — precise scoping is essential for effective protection.`,
    ]),
    `Supervisors and field officers (as contracted) conduct regular attendance checks, uniform and grooming inspections, post inspections, and verify that guards know emergency contacts and site-specific protocols. Clients receive a clear escalation path for all security-related matters in ${place}.`,
    `For multi-shift sites in ${place}, handover discipline is critical: pending visitor passes, open material permits, vehicle logs, night observation notes, and incident reports must transfer cleanly between crews. Our reporting systems ensure this continuity.`,
  ]

  const compliance = [
    `Silbar Security Services Pvt. Ltd. holds 4 ISO certifications (IAF accredited) and PSARA licenses across 19 states. Guards deployed for ${place} sites are police-verified, trained, and operated under documented quality processes.`,
    `We structure commercials with strict attention to applicable ${region} state minimum wage notifications, statutory benefits (EPF, ESIC) for eligible employees, and all applicable labour law requirements. Exact inclusions — wages, benefits, supervision levels, and equipment — are itemised in every proposal for complete transparency.`,
    `Principal employers increasingly require compliance documentation packs for audits. We provide monthly attendance records, wage registers, PF/ESIC challans, and incident reports to help ${place} clients maintain full statutory compliance and audit readiness.`,
  ]

  return {
    placeName: place,
    placeType: 'city',
    intro,
    marketOverview,
    challengesHeading: `Common security challenges in ${place}`,
    challenges,
    sectorsHeading: `Sectors we serve in ${place}`,
    sectors,
    sectorsBlurb: `Security requirements in ${place} vary significantly by facility type — from manufacturing plants to hospitals to corporate offices to residential communities. Silbar customises deployment SOPs, supervision levels, and compliance processes accordingly across ${region}.`,
    deliverablesHeading: `What you get with Silbar in ${place}`,
    deliverables,
    packagesHeading: `Engagement models for ${place} facilities`,
    packages,
    whoNeedsHeading: `Who hires security services in ${place}?`,
    whoNeeds,
    trainingHeading: `Guard training for ${place} deployments`,
    trainingTopics,
    trainingBlurb: `Beyond standard guarding skills, personnel assigned to your ${place} site receive comprehensive induction covering your specific facility layout, emergency contact numbers, visitor management rules, restricted area protocols, and shift handover procedures — ensuring day-one readiness.`,
    operations,
    compliance,
    whyHeading: `Why organisations choose Silbar in ${place}`,
    whyPoints,
    processHeading: `How Silbar deploys security in ${place}`,
    process,
    faqs: buildFaqs(place, region, seed, true),
    closingCta: `Ready to secure your facility in ${place}? Call ${CONTACT.phone}, WhatsApp via the form below, or email ${CONTACT.email}. Share your facility type, number of posts, and shift requirements for a fast, transparent proposal.`,
    metaDescription: `Security guard company in ${place}, ${region}. PSARA licensed, 4 ISO certified. Industrial, commercial & residential security manpower. Call ${CONTACT.phone}.`,
    servicesIntro: `Explore all Silbar Security service verticals available for your ${place} facility. Click any service for detailed features, use cases, and FAQs, then request a site-specific quote for your ${region} location.`,
    keywordsLine: `security guard services ${place}, security agency ${place}, manned guarding ${place}, security company ${region}, industrial security ${place}, PSARA licensed security ${place}`,
  }
}

export function generateStateContent(state: StateLocation): LocationSEOContent {
  const seed = stringToHash(state.slug)
  const place = state.name
  const citiesList = state.majorCities.slice(0, 6).join(', ')
  const sectors = sectorsForState(state.slug, seed)

  const intro = [
    `Silbar Security Services provides professional security solutions across ${place}, covering major cities including ${citiesList} and client sites across ${state.districts} districts with trained, background-verified manpower.`,
    `With a state population of about ${state.population}, ${place} has diverse security demand spanning ${sectors.slice(0, 5).join(', ')} and more. Each sector requires a tailored approach to manpower deployment, supervision intensity, and compliance management.`,
    `Silbar Security is PSARA licensed and operates with 4 ISO certifications (IAF accredited), bringing national standards to every deployment in ${place} — from single society desks to multi-plant industrial contracts.`,
    pick(seed, 2, [
      `Our approach in ${place} prioritises verified guards with police background checks, clear site-specific duty instructions, regular supervisor oversight, and statutory-aware commercial structures so clients can scale posts without losing quality control.`,
      `Whether you need a society gate in ${state.capital} or comprehensive industrial security across multiple cities in ${place}, Silbar designs manpower, shifts, and reporting to match your operational reality.`,
      `Businesses expanding across ${place} benefit from a single security partner model: consistent training standards, dedicated account management, monthly compliance documentation, and transparent proposals for each site.`,
    ]),
    `Silbar Security Services Pvt. Ltd. is headquartered in New Delhi with corporate operations from Gurugram and branch presence in Jaipur. For ${place} enquiries, call ${CONTACT.phone}, email ${CONTACT.email}, or submit the WhatsApp form on this page.`,
  ]

  const marketOverview = [
    `${place}'s economy spans ${sectors.slice(0, 5).join(', ')}, with security risk profiles that differ sharply between a manufacturing plant, a hospital, a shopping mall, and a residential township — generic guard rosters fail to address these varied requirements.`,
    `Key industrial corridors and commercial hubs in ${place} experience peak security demand during night logistics windows, festival seasons when footfall surges, and contractor-heavy operational periods. Professional agencies plan relief manpower, supervisor coverage, and escalation protocols for these pressure points.`,
    `Choosing Silbar Security for ${place} means partnering with a PSARA-compliant agency that brings documented processes, trained personnel, monthly compliance reporting, and responsive account management — not just uniformed staff at the gate.`,
  ]

  return {
    placeName: place,
    placeType: 'state',
    intro,
    marketOverview,
    challengesHeading: `Security challenges facilities face across ${place}`,
    challenges: pickN(seed, CHALLENGES_POOL, 8),
    sectorsHeading: `Key security demand areas in ${place}`,
    sectors,
    sectorsBlurb: `${place}'s diverse economy spans ${sectors.slice(0, 5).join(', ')}. Silbar maps manpower, supervision intensity, and compliance requirements to each sector's specific risk profile — not a one-size roster for every site in the state.`,
    deliverablesHeading: `What Silbar delivers for ${place} clients`,
    deliverables: pickN(seed, DELIVERABLES_POOL, 12),
    packagesHeading: `Engagement models we offer in ${place}`,
    packages: pickN(seed, PACKAGE_TYPES, 4),
    whoNeedsHeading: `Who needs professional security services in ${place}?`,
    whoNeeds: pickN(seed, WHO_NEEDS, 10),
    trainingHeading: `Guard training & induction for ${place} deployments`,
    trainingTopics: pickN(seed, TRAINING_TOPICS, 8),
    trainingBlurb: `Guards deployed across ${place} receive structured training covering access control, fire safety, emergency response, and customer interaction — plus site-specific induction on your facility layout, emergency contacts, visitor rules, and restricted areas before taking full charge.`,
    operations: [
      `Statewide coordination for ${place} includes dedicated account management, trained replacement pool management, and consistent reporting standards aligned with Silbar's ISO-certified quality system.`,
      `Capital city sites like ${state.capital} and major urban centres often need higher soft-skills for visitor handling; industrial belts require gate discipline, material movement checks, and shift handover rigour. We scope each location separately even under a single state contract.`,
      `Multi-site clients in ${place} benefit from standardised KPIs — attendance tracking, night patrol verification, incident reporting formats, and escalation timelines — while allowing site-specific SOPs to vary by facility type, whether plant, office, or campus.`,
      `Our operations team conducts periodic site inspections, surprise night checks, and client feedback reviews to maintain service consistency across all ${place} deployments.`,
    ],
    compliance: [
      `For all ${place} deployments, we emphasise police-verified recruitment, structured training, wage-structure clarity aligned with state minimum wage notifications, and full statutory compliance (EPF, ESIC) for eligible employees as per applicable law.`,
      `Monthly compliance documentation — attendance records, wage registers, PF/ESIC challans — is provided to clients for complete transparency and audit readiness.`,
      `Silbar Security holds 4 ISO certifications (IAF accredited) and PSARA licenses across 19 states. Our process discipline is ISO-certified; site delivery excellence depends on clear client instructions and structured joint onboarding at every ${place} location.`,
    ],
    whyHeading: `Why choose Silbar Security in ${place}`,
    whyPoints: pickN(seed, WHY_POINTS_POOL, 10),
    processHeading: `How Silbar deploys security for ${place} sites`,
    process: PROCESS_STEPS.map((s) => ({
      title: s.title,
      desc: s.desc.replace(/\{place\}/g, place),
    })),
    faqs: buildFaqs(place, place, seed, false),
    closingCta: `Planning security for your facility in ${place}? Call ${CONTACT.phone}, email ${CONTACT.email}, or use the WhatsApp form below. Share your facility type, number of posts, and shift requirements for a fast proposal.`,
    metaDescription: `Security guard company in ${place}. PSARA licensed, 4 ISO certified. Manned guarding across ${place}. Call ${CONTACT.phone} for a free quote.`,
    servicesIntro: `Explore Silbar Security's full range of service verticals available for deployment across ${place}. Click any service to view features, use cases, and FAQs, then request a ${place}-specific quote.`,
    keywordsLine: `security guard services ${place}, security agency ${place}, security company ${state.capital}, manned guarding ${place}, industrial security ${place}, PSARA licensed security ${place}`,
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
      `Specialised ${shortTitle.toLowerCase()} aligned to your specific site risk profile — not generic manpower deployment.`,
      'PSARA-licensed and ISO-certified service delivery with full statutory compliance documentation.',
      'Police-verified, background-checked personnel with site-specific induction before deployment.',
      'Dedicated supervisor / field officer support for multi-post and multi-shift sites.',
      'PAN India coordination capability for multi-city and multi-state organisations.',
      '4 ISO certifications (IAF accredited) providing certified process backbone with local deployment.',
      'Monthly compliance reporting including attendance, wage registers, and PF/ESIC documentation.',
      'Transparent commercial proposals with category-wise rate breakdown for easy client review.',
    ], 8),
    process: [
      { title: 'Requirement consultation', desc: `Share your facility type, number of posts, shift timings, and specific requirements for ${shortTitle.toLowerCase()}.` },
      { title: 'Site scope design', desc: 'We map post locations, supervision levels, and compliance requirements to your risk profile.' },
      { title: 'Transparent proposal', desc: 'Receive category-wise rates, statutory compliance notes, and mobilisation timeline.' },
      { title: 'Manpower selection & verification', desc: 'Background-checked personnel selected based on appearance, skills, and site requirements.' },
      { title: 'Site induction & briefing', desc: 'Guards receive duty instructions, emergency contacts, and facility-specific SOPs before go-live.' },
      { title: 'Go-live deployment', desc: 'Personnel mobilise in uniform with equipment; supervisor introduces the team and commences operations.' },
      { title: 'Stabilisation & fine-tuning', desc: 'First week adjustments to posts, timings, and reporting based on actual site conditions.' },
      { title: 'Ongoing account management', desc: 'Attendance tracking, replacement pool, supervisor checks, incident reporting, and monthly reviews.' },
    ],
    useCases: pickN(seed, [
      'Manufacturing plants and industrial estates',
      'Warehouses, CFS, and logistics parks',
      'Hospitals and diagnostic centres',
      'Corporate offices and IT parks',
      'Residential societies and townships',
      'Retail malls and high-street stores',
      'Hotels, banquets, and events',
      'Educational campuses — schools, colleges, universities',
      'Banks, ATMs, and financial offices',
      'Government departments and PSU facilities',
      'Infrastructure and construction project sites',
      'Data centres and technology facilities',
      'Healthcare facilities and nursing homes',
      'Commercial complexes and shopping centres',
      'Hotels, resorts, and hospitality properties',
    ], 10),
  }
}
