export interface Industry {
  slug: string
  title: string
  shortTitle: string
  description: string
  challenges: string[]
  solutions: string[]
  services: string[]
  faqs: { q: string; a: string }[]
}

export const INDUSTRIES: Industry[] = [
  {
    slug: 'manufacturing',
    title: 'Security for Manufacturing Plants & Factories',
    shortTitle: 'Manufacturing',
    description: 'Comprehensive security and facility management for manufacturing units, auto plants, FMCG factories, and industrial corridors across India.',
    challenges: ['High-value raw material theft', 'Multiple shift worker access', 'Large perimeter coverage', 'Fire and safety compliance', 'Material gate management'],
    solutions: ['Dedicated gate security with vehicle logging', 'Perimeter CCTV surveillance', 'Armed guards for high-value areas', 'Fire safety training and drills', 'Shift supervisor management'],
    services: ['manned-guarding', 'industrial-security', 'electronic-surveillance', 'risk-assessment', 'facility-management'],
    faqs: [
      { q: 'Do you provide security for SEZ and industrial parks?', a: 'Yes. We have extensive experience securing Special Economic Zones, industrial parks, and export processing units with multi-layer security protocols.' },
    ],
  },
  {
    slug: 'hospitals',
    title: 'Hospital & Healthcare Security Services',
    shortTitle: 'Hospitals',
    description: 'Sensitive, patient-centric security for hospitals, clinics, diagnostic centres, and pharmaceutical companies.',
    challenges: ['24/7 public access management', 'ICU and OT area protection', 'Pharmaceutical and equipment security', 'Patient and visitor management', 'Emergency department crowd control'],
    solutions: ['Lady guards for sensitive wards', 'Visitor management systems', 'CCTV with HIPAA-sensitive placement', 'Emergency response protocols', 'Pharmacy and store security'],
    services: ['manned-guarding', 'electronic-surveillance', 'facility-management', 'risk-assessment'],
    faqs: [
      { q: 'Do you deploy lady guards in hospital settings?', a: 'Yes. Lady guards are a standard part of our hospital security teams, particularly for maternity wards, women\'s wards, and OPD areas.' },
    ],
  },
  {
    slug: 'warehouses',
    title: 'Warehouse & Logistics Security Services',
    shortTitle: 'Warehouses',
    description: 'End-to-end security for warehouses, distribution centres, cold storages, and 3PL facilities.',
    challenges: ['Inventory shrinkage and pilferage', 'Night-time vulnerability', 'Multiple docking points', 'Driver and delivery personnel management', 'Fire risk in storage areas'],
    solutions: ['Night security with hourly patrolling', 'Loading dock access control', 'CCTV with inventory zone coverage', 'Driver verification protocols', 'Fire detection systems'],
    services: ['manned-guarding', 'industrial-security', 'electronic-surveillance', 'kyc-background-checks'],
    faqs: [
      { q: 'Can you secure cold storage and temperature-controlled warehouses?', a: 'Yes. We deploy guards trained for cold storage environments and can integrate with temperature monitoring systems.' },
    ],
  },
  {
    slug: 'hotels',
    title: 'Hotel & Hospitality Security Services',
    shortTitle: 'Hotels',
    description: 'Discreet, guest-first security for 5-star hotels, resorts, banquet halls, and hospitality properties.',
    challenges: ['Guest privacy and experience balance', 'High-profile guest protection', 'Event and banquet security', 'Parking and valet area safety', 'Night club and bar security'],
    solutions: ['Plain-clothes security for discretion', 'VIP escort and close protection', 'CCTV covering all public areas', 'Trained hospitality-aware guards', 'Event security deployment'],
    services: ['manned-guarding', 'event-security', 'electronic-surveillance', 'facility-management'],
    faqs: [
      { q: 'Do your guards receive hospitality training?', a: 'Yes. Hotel security personnel receive additional training in guest interaction, hospitality etiquette, and non-confrontational security techniques.' },
    ],
  },
  {
    slug: 'banks',
    title: 'Bank & Financial Institution Security',
    shortTitle: 'Banks & BFSI',
    description: 'PSARA-licensed armed security for banks, NBFCs, insurance offices, and financial institutions.',
    challenges: ['Branch robbery prevention', 'ATM security and cash replenishment', 'Loan recovery intimidation', 'Currency chest security', 'Night vault protection'],
    solutions: ['Armed and unarmed branch guards', 'Dedicated ATM security personnel', 'Cash-in-transit services', 'CCTV with banking compliance', 'Emergency response protocols'],
    services: ['bank-atm-security', 'manned-guarding', 'electronic-surveillance'],
    faqs: [
      { q: 'Are you compliant with RBI security guidelines for banks?', a: 'Yes. All our bank security deployments adhere to RBI-mandated security requirements for banking premises, ATMs, and currency chests.' },
    ],
  },
  {
    slug: 'corporate',
    title: 'Corporate Office Security Services',
    shortTitle: 'Corporate Offices',
    description: 'Professional, presentable security for corporate offices, IT parks, business parks, and commercial buildings.',
    challenges: ['Multi-tenant building access', 'Visitor and contractor management', 'Data centre physical security', 'Employee safety after hours', 'Executive protection'],
    solutions: ['Smart access control integration', 'Visitor management systems', 'Server room physical access controls', 'After-hours patrolling', 'Executive security drivers'],
    services: ['manned-guarding', 'electronic-surveillance', 'facility-management', 'kyc-background-checks'],
    faqs: [
      { q: 'Can you integrate with our existing access control system?', a: 'Yes. We work alongside existing Honeywell, HID, Bosch, or custom access control systems. Our guards are trained on your specific systems.' },
    ],
  },
  {
    slug: 'residential',
    title: 'Residential Society Security Services',
    shortTitle: 'Residential Societies',
    description: 'Community security for housing societies, gated communities, apartments, and villa projects.',
    challenges: ['Multiple entry and exit points', 'Domestic worker verification', 'Delivery and visitor management', 'Parking and vehicle control', 'Resident privacy'],
    solutions: ['Boom barrier and gate security', 'Visitor and delivery logging', 'Domestic worker background checks', 'CCTV at all entry points', 'Night round patrolling'],
    services: ['manned-guarding', 'electronic-surveillance', 'kyc-background-checks', 'facility-management'],
    faqs: [
      { q: 'Do you verify domestic workers for housing societies?', a: 'Yes. We offer background verification services for domestic workers, maids, drivers, and other household staff employed by society residents.' },
    ],
  },
  {
    slug: 'retail',
    title: 'Retail & Mall Security Services',
    shortTitle: 'Retail & Malls',
    description: 'Loss prevention, crowd management, and CCTV surveillance for retail stores, supermarkets, and shopping malls.',
    challenges: ['Shoplifting and inventory shrinkage', 'Peak hour crowd management', 'Fitting room and blind spot coverage', 'Parking security', 'Weekend and holiday events'],
    solutions: ['Plain-clothes loss prevention staff', 'CCTV with video analytics', 'Uniformed crowd management guards', 'Parking attendant-security integration', 'Event security for sales and promotions'],
    services: ['manned-guarding', 'electronic-surveillance', 'event-security', 'facility-management'],
    faqs: [
      { q: 'Do you provide undercover loss prevention staff?', a: 'Yes. We deploy trained plain-clothes loss prevention personnel who blend with shoppers while monitoring for shoplifting activity.' },
    ],
  },
  {
    slug: 'education',
    title: 'School & Educational Institution Security',
    shortTitle: 'Education',
    description: 'Child-safe, POCSO-aware security for schools, colleges, universities, and coaching institutes.',
    challenges: ['Child safety and stranger danger', 'Bus arrival and dismissal management', 'Exam security and invigilation support', 'Campus boundary security', 'Unauthorized vendor access'],
    solutions: ['Background-verified guards (child-safe)', 'Visitor log with photo ID requirement', 'CCTV at all campus entry points', 'Bus pick-up and drop-off coordination', 'Female guards for girls\' schools and hostels'],
    services: ['manned-guarding', 'electronic-surveillance', 'kyc-background-checks', 'risk-assessment'],
    faqs: [
      { q: 'Are your guards police-verified for school deployments?', a: 'Yes. All guards deployed to schools and educational institutions undergo mandatory police verification and character background checks.' },
    ],
  },
  {
    slug: 'government',
    title: 'Government & PSU Security Services',
    shortTitle: 'Government',
    description: 'PSARA-compliant security for government offices, PSUs, defence facilities, and public sector organizations.',
    challenges: ['Tender and compliance requirements', 'High-security area protocols', 'VIP and official visit security', 'Document and asset security', 'Multi-agency coordination'],
    solutions: ['PSARA-licensed guards with police verification', 'Security clearance documentation', 'VIP escort and protocol management', 'Coordination with SPG/CRPF/local police', 'Detailed daily security reports'],
    services: ['manned-guarding', 'event-security', 'electronic-surveillance', 'risk-assessment'],
    faqs: [
      { q: 'Can you fulfill government tender requirements for security?', a: 'Yes. We maintain all documentation required for government security tenders including PSARA licenses, ESI/PF compliance certificates, IT returns, and ISO certification.' },
    ],
  },
  {
    slug: 'data-centers',
    title: 'Data Centre Physical Security',
    shortTitle: 'Data Centers',
    description: 'Layered physical security for Tier-3 and Tier-4 data centres, server rooms, and technology infrastructure.',
    challenges: ['Unauthorised physical access', 'Multi-level access zone control', 'Vendor and maintenance crew management', '24/7 monitoring requirement', 'Compliance with ISO 27001 physical controls'],
    solutions: ['Biometric access control integration', 'Man-trap and airlock security', 'CCTV with 30-day retention', 'Visitor log with NDA enforcement', '24/7 security operations desk'],
    services: ['manned-guarding', 'electronic-surveillance', 'kyc-background-checks', 'risk-assessment'],
    faqs: [
      { q: 'Are you familiar with data centre security compliance standards?', a: 'Yes. Our data centre security teams are briefed on ISO 27001 physical security controls, SSAE 16, and SOC 2 physical access requirements.' },
    ],
  },
  {
    slug: 'infrastructure',
    title: 'Infrastructure & Utilities Security',
    shortTitle: 'Infrastructure',
    description: 'Security for highways, power plants, substations, oil & gas facilities, airports, and critical national infrastructure.',
    challenges: ['Remote location deployment', 'Critical asset protection', 'Anti-sabotage protocols', 'Extreme environment operations', 'Multi-agency coordination'],
    solutions: ['Long-deployment trained guards', 'Armed perimeter security', 'CCTV with solar-powered backup', 'Emergency response team', 'Coordination with CISF/BSF where required'],
    services: ['manned-guarding', 'industrial-security', 'electronic-surveillance', 'risk-assessment'],
    faqs: [
      { q: 'Can you deploy security for remote power substations?', a: 'Yes. We have experience securing remote power infrastructure including substations, transmission towers, and off-grid facilities with trained long-deployment personnel.' },
    ],
  },
]

export const INDUSTRY_SLUGS = INDUSTRIES.map((i) => i.slug)
