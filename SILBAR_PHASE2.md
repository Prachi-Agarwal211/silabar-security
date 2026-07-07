# SILBAR SECURITY — Phase 2 Implementation Document
## Full SEO Architecture + Core Pages + Schema

---

## PHASE 1 REVIEW: ALL CLEAR ✅

| Check | Status |
|---|---|
| `morph-video` z-index raised to 5 | ✅ Applied |
| `trust-card-light` background → transparent | ✅ Applied |
| Marquee bar z-index → 6 | ✅ Applied |
| Services content z-index → 7 | ✅ Applied |
| `100dvh` for iOS Safari | ✅ Applied |
| Mobile hamburger nav + drawer | ✅ Applied |
| Sticky WhatsApp + Quote CTAs | ✅ Applied |
| Real content replacing AI slop | ✅ Applied |
| Full SEO metadata in layout.tsx | ✅ Applied |
| Footer rebuilt with trust badges + contact | ✅ Applied |
| Dock rect=0 guard on first render | ✅ Applied |

**One residual issue to fix in this phase:** `footer-grid` uses `grid-template-columns: 2fr 1fr 1fr 1fr` — the brand column has class `footer-brand-col` but the grid needs to know it spans appropriately. Add `grid-column: 1 / 2` to `.footer-brand-col` so it doesn't collapse on the 4-column layout. Fixed in §7.

---

## WHAT PHASE 2 BUILDS

```
/contact                         — Lead form + schema
/about                           — Company story + certifications
/services                        — Services index
/services/[slug]                 — 10 individual service pages (dynamic)
/industries                      — Industries index
/industries/[slug]               — 12 industry pages (dynamic)
/[state]-security-services       — 36 state SEO pages (ISR)
/security-services/[city]        — Top 12 city pages now, 200+ later
/sitemap.xml                     — Auto-generated
/robots.txt                      — Crawl directives
src/app/layout.tsx               — JSON-LD Organization Schema
```

---

---

# ARCHITECTURE DECISIONS

## Why `[slug]` dynamic routes instead of static files for services/industries?

Next.js App Router with `generateStaticParams` generates true static HTML at build time for every slug — same performance as hand-written files, but one template maintains all 40+ pages. Updating a description updates all pages from a single data file.

## Why ISR for state/city pages?

`revalidate: 86400` (24h) on state/city pages means they are statically served from CDN but can be refreshed without a full rebuild. For 300–500 pages, this is the correct pattern.

## Data layer

All content lives in `src/data/` as TypeScript files with full type safety. No database. No CMS. Editors update `.ts` files and commit — Next.js rebuilds affected pages.

---

---

# STEP 1 — Data Files

## File: `src/data/services.ts` [NEW]

```typescript
export interface Service {
  slug: string
  title: string
  shortTitle: string
  description: string
  longDescription: string
  features: string[]
  industries: string[]
  faqs: { q: string; a: string }[]
  schema: {
    name: string
    serviceType: string
    areaServed: string
  }
}

export const SERVICES: Service[] = [
  {
    slug: 'manned-guarding',
    title: 'Manned Guarding Services',
    shortTitle: 'Manned Guarding',
    description:
      'PSARA-licensed armed and unarmed security guards for factories, offices, hospitals, residential societies, and commercial properties across India.',
    longDescription:
      'Silbar Security deploys over 7,000 PSARA-licensed security personnel across India. Our guards are uniformed, trained in access control, first aid, fire safety, and emergency response. We deploy armed guards, unarmed guards, lady guards, supervisors, and bodyguards based on client risk assessment. All personnel undergo background verification and are covered under ESI, PF, and statutory compliance.',
    features: [
      'Armed & unarmed security guards',
      'Lady guards for gender-sensitive environments',
      'Supervisors and shift managers',
      'Bodyguards and personal protection officers',
      'Patrolling and access control',
      'PSARA-licensed, background verified',
      'Full statutory compliance (ESI, PF, Gratuity)',
    ],
    industries: ['Manufacturing', 'Hospitals', 'Hotels', 'Warehouses', 'Banks', 'Corporate', 'Residential', 'Retail'],
    faqs: [
      {
        q: 'Are your security guards PSARA licensed?',
        a: 'Yes. All our security personnel are licensed under the Private Security Agencies Regulation Act (PSARA) 2005. We hold valid PSARA licenses across multiple states in India.',
      },
      {
        q: 'Do you provide armed security guards?',
        a: 'Yes. We deploy armed guards where required, with all necessary government authorizations for licensed weapons and trained armed personnel.',
      },
      {
        q: 'What training do your guards receive?',
        a: 'All guards complete PSARA-mandated training including unarmed combat, first aid, fire safety, access control, crowd management, and emergency response protocols.',
      },
      {
        q: 'Can you deploy lady guards?',
        a: 'Yes. We have a dedicated force of trained lady security guards for hospitals, malls, schools, hotels, and corporate offices that require gender-sensitive security.',
      },
    ],
    schema: {
      name: 'Manned Guarding Services',
      serviceType: 'SecurityService',
      areaServed: 'India',
    },
  },
  {
    slug: 'industrial-security',
    title: 'Industrial & Factory Security Services',
    shortTitle: 'Industrial Security',
    description:
      'Comprehensive security solutions for manufacturing plants, factories, warehouses, and logistics facilities. Perimeter control, access management, and shift supervision.',
    longDescription:
      'Industrial facilities face unique security challenges — high-value inventory, machinery, shift workers, and multiple entry points. Silbar Security provides dedicated industrial security teams trained in perimeter surveillance, access control systems, material movement monitoring, and emergency response. We work with ISO-certified factories, SEZ units, auto ancillaries, textile mills, and pharmaceutical plants.',
    features: [
      'Perimeter and boundary security',
      'Material gate management and vehicle logging',
      'Shift supervisor deployment',
      'Access control system management',
      'CCTV monitoring integration',
      'Theft prevention protocols',
      'Emergency evacuation management',
    ],
    industries: ['Manufacturing', 'Warehouses', 'Mining', 'Automotive', 'Pharma', 'Textiles'],
    faqs: [
      {
        q: 'Do you provide security for 24/7 factory operations?',
        a: 'Yes. We structure deployments in 8-hour or 12-hour shifts to ensure continuous coverage for round-the-clock manufacturing operations.',
      },
      {
        q: 'Can you manage material gate entry and exit logging?',
        a: 'Yes. Our gate management teams maintain vehicle entry logs, material movement records, and visitor registers as per your company\'s compliance requirements.',
      },
    ],
    schema: {
      name: 'Industrial & Factory Security Services',
      serviceType: 'SecurityService',
      areaServed: 'India',
    },
  },
  {
    slug: 'event-security',
    title: 'Event & VIP Security Services',
    shortTitle: 'Event Security',
    description:
      'Professional crowd management, VIP escort, and VVIP protection for corporate events, conferences, concerts, exhibitions, and government functions.',
    longDescription:
      'Event security requires specialized skills in crowd psychology, emergency evacuation, and protocol management. Silbar Security deploys trained event security teams for corporate conferences, product launches, music concerts, sporting events, political rallies, and cultural festivals. Our VIP/VVIP protection teams are drawn from law enforcement backgrounds and trained in close protection, route planning, and threat assessment.',
    features: [
      'Crowd management and entry-exit control',
      'VIP and VVIP close protection',
      'Venue perimeter security',
      'Emergency evacuation planning',
      'Baggage screening and frisking',
      'Coordination with local police',
      'Event risk assessment',
    ],
    industries: ['Hotels', 'Corporate', 'Government', 'Entertainment', 'Sports'],
    faqs: [
      {
        q: 'Do you provide security for high-profile political events?',
        a: 'Yes. We have experience securing political rallies, government functions, and ministerial visits. Our teams coordinate with local law enforcement for seamless security.',
      },
      {
        q: 'How far in advance should we book event security?',
        a: 'For large events (1000+ attendees), we recommend at least 2 weeks advance notice for proper planning and deployment. Smaller events can be arranged within 48–72 hours.',
      },
    ],
    schema: {
      name: 'Event & VIP Security Services',
      serviceType: 'SecurityService',
      areaServed: 'India',
    },
  },
  {
    slug: 'bank-atm-security',
    title: 'Bank & ATM Security Services',
    shortTitle: 'Bank & ATM Security',
    description:
      'Cash-in-transit, bullion escort, and armed ATM guard services. Strict compliance with RBI security guidelines and banking sector protocols.',
    longDescription:
      'Financial institutions require the highest security standards. Silbar Security provides armed guards for bank branches, ATM kiosks, cash vans, and bullion transport. All our bank security personnel are specially trained in cash handling protocols, threat assessment, and emergency response. We maintain strict compliance with RBI-mandated security standards for banking premises.',
    features: [
      'Armed branch security guards',
      'ATM security and overnight protection',
      'Cash-in-transit (CIT) services',
      'Bullion and valuables escort',
      'Night vault security',
      'Currency chest protection',
      'RBI compliance adherence',
    ],
    industries: ['Banks', 'NBFC', 'Insurance', 'Jewellery', 'Government'],
    faqs: [
      {
        q: 'Are your guards trained specifically for bank security?',
        a: 'Yes. Our bank security personnel receive specialized training in RBI security guidelines, cash handling protocols, threat response, and bank-specific emergency procedures.',
      },
      {
        q: 'Do you cover rural and semi-urban ATM locations?',
        a: 'Yes. We deploy security across metro, tier-2, and tier-3 cities. Our PAN India network covers rural banking infrastructure as well.',
      },
    ],
    schema: {
      name: 'Bank & ATM Security Services',
      serviceType: 'SecurityService',
      areaServed: 'India',
    },
  },
  {
    slug: 'electronic-surveillance',
    title: 'Electronic Surveillance & CCTV Services',
    shortTitle: 'Electronic Surveillance',
    description:
      'CCTV installation, remote monitoring, access control, fire alarm systems, GPS vehicle tracking, and integrated security technology solutions.',
    longDescription:
      'Modern security is technology-powered. Silbar Security provides end-to-end electronic surveillance solutions including CCTV design and installation, remote monitoring centers, access control systems (biometric, RFID), video analytics, fire detection and alarm systems, and GPS fleet tracking. We integrate hardware with software for a complete digital security picture.',
    features: [
      'CCTV design, supply, and installation',
      'Remote 24/7 monitoring center',
      'Biometric and RFID access control',
      'Fire detection and alarm systems',
      'Intrusion detection systems',
      'GPS vehicle tracking',
      'Video analytics and AI surveillance',
    ],
    industries: ['Manufacturing', 'Hospitals', 'Hotels', 'Retail', 'Corporate', 'Residential', 'Data Centers'],
    faqs: [
      {
        q: 'Do you offer remote monitoring services?',
        a: 'Yes. We operate 24/7 remote monitoring centers that can monitor CCTV feeds, trigger alerts, and coordinate response teams for any security incident.',
      },
      {
        q: 'Can you integrate CCTV with our existing access control system?',
        a: 'Yes. We integrate all major CCTV brands with access control systems, HR software, and building management systems for a unified security platform.',
      },
    ],
    schema: {
      name: 'Electronic Surveillance & CCTV Services',
      serviceType: 'SecurityService',
      areaServed: 'India',
    },
  },
  {
    slug: 'risk-assessment',
    title: 'Security Risk Assessment & Audit Services',
    shortTitle: 'Risk Assessment',
    description:
      'Professional security audits, vulnerability assessments, disaster management planning, and crisis response consultancy for enterprises.',
    longDescription:
      'Before deploying security, you need to understand your risks. Silbar Security\'s risk assessment team conducts on-site security audits, identifies vulnerabilities in perimeter security, access control, and emergency response, and delivers a detailed remediation plan. We also develop disaster management and business continuity plans for industrial facilities, hospitals, and large commercial properties.',
    features: [
      'Comprehensive security audit',
      'Vulnerability and threat assessment',
      'Gap analysis and remediation plan',
      'Emergency evacuation planning',
      'Disaster management plan',
      'Business continuity planning',
      'Security consultant reports',
    ],
    industries: ['Manufacturing', 'Hospitals', 'Hotels', 'Corporate', 'Infrastructure', 'Government'],
    faqs: [
      {
        q: 'How long does a security audit take?',
        a: 'A standard facility audit takes 2–5 business days depending on the size of the premises. We deliver a written report within 7 working days of the audit.',
      },
      {
        q: 'Is a security audit mandatory for PSARA compliance?',
        a: 'While not mandated for all facilities, many insurance policies and enterprise contracts require documented security assessments. We provide audit reports suitable for compliance documentation.',
      },
    ],
    schema: {
      name: 'Security Risk Assessment Services',
      serviceType: 'ConsultingService',
      areaServed: 'India',
    },
  },
  {
    slug: 'facility-management',
    title: 'Facility Management Services',
    shortTitle: 'Facility Management',
    description:
      'Integrated facility management including housekeeping, maintenance, pantry services, and operations support. One vendor, complete facility coverage.',
    longDescription:
      'Silbar Security extends beyond security into complete facility management — because a well-managed facility is a secure one. We provide housekeeping, deep cleaning, pantry and cafeteria management, electrical and plumbing maintenance, landscaping, pest control coordination, and operations support staff. Our single-vendor model simplifies procurement, billing, and compliance for facility managers.',
    features: [
      'Housekeeping and sanitation',
      'Electrical and plumbing maintenance',
      'Pantry and cafeteria management',
      'Front desk and receptionist services',
      'Pest control coordination',
      'Landscaping and horticulture',
      'Single vendor, one invoice',
    ],
    industries: ['Corporate', 'Hospitals', 'Hotels', 'IT Parks', 'Manufacturing', 'Educational Institutions'],
    faqs: [
      {
        q: 'Can you handle both security and housekeeping for our facility?',
        a: 'Yes. This is one of our most popular service combinations. A single contract, one point of contact, and unified billing simplifies your vendor management significantly.',
      },
      {
        q: 'Do you provide facility management for multi-site enterprises?',
        a: 'Yes. We manage multi-location facilities for corporate groups, hospital chains, and retail networks. Our regional supervisors ensure consistent service quality across all sites.',
      },
    ],
    schema: {
      name: 'Facility Management Services',
      serviceType: 'FacilityManagementService',
      areaServed: 'India',
    },
  },
  {
    slug: 'security-training',
    title: 'Security Training & Certification',
    shortTitle: 'Security Training',
    description:
      'PSARA-certified security training for guards, supervisors, and corporate security teams. Weapons handling, first aid, fire safety, and soft skills.',
    longDescription:
      'Quality security starts with quality training. Silbar Security operates PSARA-compliant training centers where security personnel receive certified instruction in unarmed combat, weapons handling (for armed guards), first aid and CPR, fire safety and evacuation, access control procedures, report writing, and professional conduct. We also offer in-house training programs for corporate security teams.',
    features: [
      'PSARA-mandated security training',
      'Weapons handling and safety',
      'First aid and CPR certification',
      'Fire safety and evacuation drills',
      'Access control and CCTV operation',
      'Corporate security team training',
      'Certified training completion records',
    ],
    industries: ['All Industries'],
    faqs: [
      {
        q: 'Do you provide training certificates?',
        a: 'Yes. All trainees receive PSARA-compliant training completion certificates. We maintain training records for audit and compliance purposes.',
      },
      {
        q: 'Can you train our existing security team?',
        a: 'Yes. We offer refresher training and specialized modules for existing in-house security teams at your premises or at our training centers.',
      },
    ],
    schema: {
      name: 'Security Training & Certification',
      serviceType: 'EducationalService',
      areaServed: 'India',
    },
  },
  {
    slug: 'manpower-solutions',
    title: 'Security Manpower Solutions',
    shortTitle: 'Manpower Solutions',
    description:
      'End-to-end manpower deployment for security, facility, and support roles with payroll, compliance, and statutory management handled by Silbar.',
    longDescription:
      'Hiring and managing contract staff is complex — compliance, payroll, ESI, PF, and attrition are constant challenges. Silbar Security takes complete ownership of manpower deployment: recruitment, training, deployment, payroll processing, ESI/PF filing, gratuity management, and replacement. We operate as a compliant labour contractor so you can focus on your core business.',
    features: [
      'End-to-end recruitment and screening',
      'Payroll processing and disbursement',
      'ESI, PF, and statutory compliance',
      'Replacement guarantee within 24 hours',
      'Monthly MIS reports',
      'Background verification for all staff',
      'Labour law compliance documentation',
    ],
    industries: ['All Industries'],
    faqs: [
      {
        q: 'How quickly can you deploy manpower for a new site?',
        a: 'For standard security guards, we can deploy within 48–72 hours for most locations. Specialized roles (armed guards, VIP protection) may require 5–7 days for proper screening.',
      },
      {
        q: 'Do you handle all labour law compliance?',
        a: 'Yes. We manage ESI, PF, Gratuity, Minimum Wages Act compliance, and provide all necessary documents for your audits. We indemnify you from labour disputes arising from our deployed staff.',
      },
    ],
    schema: {
      name: 'Security Manpower Solutions',
      serviceType: 'EmploymentAgency',
      areaServed: 'India',
    },
  },
  {
    slug: 'kyc-background-checks',
    title: 'KYC & Employee Background Verification',
    shortTitle: 'Background Checks',
    description:
      'Pre-employment verification, address checks, criminal record screening, and KYC documentation for vendor and employee onboarding.',
    longDescription:
      'Knowing who you hire is the first line of security. Silbar Security offers comprehensive background verification services including address verification, identity document authentication, criminal record checks through police verification, previous employment verification, educational certificate verification, and credit history checks for sensitive financial roles.',
    features: [
      'Address and identity verification',
      'Police verification and criminal record check',
      'Previous employment verification',
      'Educational certificate verification',
      'Court record and litigation check',
      'Credit and financial background check',
      'Detailed verification report with supporting documents',
    ],
    industries: ['Banks', 'IT', 'Hospitals', 'Manufacturing', 'Corporate', 'Retail'],
    faqs: [
      {
        q: 'How long does a background verification take?',
        a: 'Standard address and identity verification takes 3–5 business days. Police verification can take 7–15 days depending on the state. We provide interim reports during the process.',
      },
      {
        q: 'Can you verify employees in rural areas?',
        a: 'Yes. We have field verification teams across urban and rural India to conduct physical address verification even in remote locations.',
      },
    ],
    schema: {
      name: 'KYC & Employee Background Verification',
      serviceType: 'InvestigativeService',
      areaServed: 'India',
    },
  },
]

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug)
```

---

## File: `src/data/industries.ts` [NEW]

```typescript
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
```

---

## File: `src/data/locations.ts` [NEW]

```typescript
export interface StateLocation {
  slug: string          // used in URL: /security-services/rajasthan
  name: string          // display name
  capital: string
  majorCities: string[]
  districts: number
  population: string    // for schema
}

export interface CityLocation {
  slug: string          // used in URL: /security-services/city/jaipur
  name: string
  state: string
  stateSlug: string
  population: string
  tier: 1 | 2 | 3
}

export const STATES: StateLocation[] = [
  { slug: 'rajasthan', name: 'Rajasthan', capital: 'Jaipur', majorCities: ['Jaipur', 'Jodhpur', 'Kota', 'Ajmer', 'Bikaner', 'Udaipur'], districts: 50, population: '81 million' },
  { slug: 'delhi', name: 'Delhi', capital: 'New Delhi', majorCities: ['New Delhi', 'Noida', 'Gurugram', 'Faridabad', 'Ghaziabad'], districts: 11, population: '32 million' },
  { slug: 'gujarat', name: 'Gujarat', capital: 'Gandhinagar', majorCities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'], districts: 33, population: '70 million' },
  { slug: 'maharashtra', name: 'Maharashtra', capital: 'Mumbai', majorCities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane'], districts: 36, population: '124 million' },
  { slug: 'uttar-pradesh', name: 'Uttar Pradesh', capital: 'Lucknow', majorCities: ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Noida'], districts: 75, population: '240 million' },
  { slug: 'haryana', name: 'Haryana', capital: 'Chandigarh', majorCities: ['Gurugram', 'Faridabad', 'Hisar', 'Rohtak', 'Ambala'], districts: 22, population: '29 million' },
  { slug: 'karnataka', name: 'Karnataka', capital: 'Bengaluru', majorCities: ['Bengaluru', 'Mysuru', 'Hubli', 'Mangaluru', 'Belagavi'], districts: 31, population: '67 million' },
  { slug: 'tamil-nadu', name: 'Tamil Nadu', capital: 'Chennai', majorCities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'], districts: 38, population: '77 million' },
  { slug: 'telangana', name: 'Telangana', capital: 'Hyderabad', majorCities: ['Hyderabad', 'Warangal', 'Karimnagar', 'Nizamabad'], districts: 33, population: '39 million' },
  { slug: 'andhra-pradesh', name: 'Andhra Pradesh', capital: 'Amaravati', majorCities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Tirupati'], districts: 13, population: '52 million' },
  { slug: 'madhya-pradesh', name: 'Madhya Pradesh', capital: 'Bhopal', majorCities: ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain'], districts: 52, population: '85 million' },
  { slug: 'west-bengal', name: 'West Bengal', capital: 'Kolkata', majorCities: ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri', 'Asansol'], districts: 23, population: '99 million' },
  { slug: 'punjab', name: 'Punjab', capital: 'Chandigarh', majorCities: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Chandigarh'], districts: 23, population: '30 million' },
  { slug: 'bihar', name: 'Bihar', capital: 'Patna', majorCities: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia'], districts: 38, population: '125 million' },
  { slug: 'jharkhand', name: 'Jharkhand', capital: 'Ranchi', majorCities: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro'], districts: 24, population: '38 million' },
  { slug: 'odisha', name: 'Odisha', capital: 'Bhubaneswar', majorCities: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur'], districts: 30, population: '46 million' },
  { slug: 'chhattisgarh', name: 'Chhattisgarh', capital: 'Raipur', majorCities: ['Raipur', 'Bhilai', 'Bilaspur', 'Durg', 'Korba'], districts: 33, population: '32 million' },
  { slug: 'uttarakhand', name: 'Uttarakhand', capital: 'Dehradun', majorCities: ['Dehradun', 'Haridwar', 'Rishikesh', 'Nainital', 'Roorkee'], districts: 13, population: '11 million' },
  { slug: 'himachal-pradesh', name: 'Himachal Pradesh', capital: 'Shimla', majorCities: ['Shimla', 'Dharamshala', 'Manali', 'Solan'], districts: 12, population: '7 million' },
  { slug: 'kerala', name: 'Kerala', capital: 'Thiruvananthapuram', majorCities: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur'], districts: 14, population: '35 million' },
  { slug: 'goa', name: 'Goa', capital: 'Panaji', majorCities: ['Panaji', 'Margao', 'Vasco', 'Mapusa'], districts: 2, population: '1.5 million' },
  { slug: 'assam', name: 'Assam', capital: 'Dispur', majorCities: ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat'], districts: 35, population: '35 million' },
]

// Top cities for initial launch — expand to 200+ by adding to this array
export const CITIES: CityLocation[] = [
  { slug: 'jaipur', name: 'Jaipur', state: 'Rajasthan', stateSlug: 'rajasthan', population: '4 million', tier: 1 },
  { slug: 'delhi', name: 'Delhi', state: 'Delhi', stateSlug: 'delhi', population: '32 million', tier: 1 },
  { slug: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', stateSlug: 'gujarat', population: '8 million', tier: 1 },
  { slug: 'mumbai', name: 'Mumbai', state: 'Maharashtra', stateSlug: 'maharashtra', population: '21 million', tier: 1 },
  { slug: 'pune', name: 'Pune', state: 'Maharashtra', stateSlug: 'maharashtra', population: '7 million', tier: 1 },
  { slug: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', stateSlug: 'karnataka', population: '13 million', tier: 1 },
  { slug: 'hyderabad', name: 'Hyderabad', state: 'Telangana', stateSlug: 'telangana', population: '10 million', tier: 1 },
  { slug: 'chennai', name: 'Chennai', state: 'Tamil Nadu', stateSlug: 'tamil-nadu', population: '11 million', tier: 1 },
  { slug: 'kolkata', name: 'Kolkata', state: 'West Bengal', stateSlug: 'west-bengal', population: '15 million', tier: 1 },
  { slug: 'surat', name: 'Surat', state: 'Gujarat', stateSlug: 'gujarat', population: '7 million', tier: 1 },
  { slug: 'jodhpur', name: 'Jodhpur', state: 'Rajasthan', stateSlug: 'rajasthan', population: '1.5 million', tier: 2 },
  { slug: 'noida', name: 'Noida', state: 'Uttar Pradesh', stateSlug: 'uttar-pradesh', population: '700k', tier: 1 },
  { slug: 'gurugram', name: 'Gurugram', state: 'Haryana', stateSlug: 'haryana', population: '900k', tier: 1 },
  { slug: 'indore', name: 'Indore', state: 'Madhya Pradesh', stateSlug: 'madhya-pradesh', population: '3 million', tier: 2 },
  { slug: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', stateSlug: 'uttar-pradesh', population: '3.5 million', tier: 1 },
  { slug: 'vadodara', name: 'Vadodara', state: 'Gujarat', stateSlug: 'gujarat', population: '2 million', tier: 2 },
  { slug: 'udaipur', name: 'Udaipur', state: 'Rajasthan', stateSlug: 'rajasthan', population: '500k', tier: 3 },
  { slug: 'kota', name: 'Kota', state: 'Rajasthan', stateSlug: 'rajasthan', population: '1 million', tier: 2 },
]
```

---

---

# STEP 2 — Core Pages

## File: `src/app/contact/page.tsx` [NEW]

```tsx
import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us — Get a Free Security Quote',
  description:
    'Contact Silbar Security Services for a free security consultation and quote. Call +91 93523 03333 or email info@silbarsecurity.in. Offices in Jaipur, Delhi, and Ahmedabad.',
  alternates: { canonical: 'https://www.silbarsecurity.in/contact' },
}

export default function ContactPage() {
  return (
    <main className="contact-page" id="main-content">
      <section className="contact-hero">
        <div className="contact-hero__inner">
          <span className="contact-eyebrow">GET IN TOUCH</span>
          <h1 className="contact-title">
            REQUEST A<br />
            <span className="contact-title--outline">FREE QUOTE</span>
          </h1>
          <p className="contact-subtitle">
            Tell us about your facility. Our security consultants will
            respond within 2 business hours.
          </p>
        </div>
      </section>

      <section className="contact-body">
        <div className="contact-body__inner">

          {/* Contact cards */}
          <div className="contact-cards">
            <a href="tel:+919352303333" className="contact-card">
              <div className="contact-card__icon"><Phone size={20} /></div>
              <div className="contact-card__label">CALL US DIRECTLY</div>
              <div className="contact-card__value">+91 93523 03333</div>
              <div className="contact-card__note">Mon–Sat, 9AM–7PM IST</div>
            </a>
            <a href="tel:+911412223334" className="contact-card">
              <div className="contact-card__icon"><Phone size={20} /></div>
              <div className="contact-card__label">LANDLINE</div>
              <div className="contact-card__value">+91-141 222 3334</div>
              <div className="contact-card__note">Jaipur Head Office</div>
            </a>
            <a href="mailto:info@silbarsecurity.in" className="contact-card">
              <div className="contact-card__icon"><Mail size={20} /></div>
              <div className="contact-card__label">EMAIL US</div>
              <div className="contact-card__value">info@silbarsecurity.in</div>
              <div className="contact-card__note">Response within 4 hours</div>
            </a>
            <a
              href="https://wa.me/919352303333"
              className="contact-card contact-card--whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="contact-card__icon"><Shield size={20} /></div>
              <div className="contact-card__label">WHATSAPP</div>
              <div className="contact-card__value">Instant Quote</div>
              <div className="contact-card__note">Available 24/7</div>
            </a>
          </div>

          {/* Lead form */}
          <form
            className="contact-form"
            id="quote-form"
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
          >
            <h2 className="contact-form__title">Get a Free Quote</h2>

            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="name" className="contact-form__label">Your Name *</label>
                <input id="name" name="name" type="text" required className="contact-form__input" placeholder="Full Name" />
              </div>
              <div className="contact-form__field">
                <label htmlFor="company" className="contact-form__label">Company / Organization *</label>
                <input id="company" name="company" type="text" required className="contact-form__input" placeholder="Company Name" />
              </div>
            </div>

            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="phone" className="contact-form__label">Phone Number *</label>
                <input id="phone" name="phone" type="tel" required className="contact-form__input" placeholder="+91 9XXXXXXXXX" />
              </div>
              <div className="contact-form__field">
                <label htmlFor="email" className="contact-form__label">Email Address</label>
                <input id="email" name="email" type="email" className="contact-form__input" placeholder="email@company.com" />
              </div>
            </div>

            <div className="contact-form__field">
              <label htmlFor="service" className="contact-form__label">Service Required *</label>
              <select id="service" name="service" required className="contact-form__select">
                <option value="">Select a Service</option>
                <option value="manned-guarding">Manned Guarding</option>
                <option value="industrial-security">Industrial Security</option>
                <option value="event-security">Event & VIP Security</option>
                <option value="bank-atm">Bank & ATM Security</option>
                <option value="surveillance">Electronic Surveillance / CCTV</option>
                <option value="facility-management">Facility Management</option>
                <option value="risk-assessment">Risk Assessment</option>
                <option value="manpower">Manpower Solutions</option>
                <option value="background-check">KYC / Background Checks</option>
                <option value="other">Other / Multiple Services</option>
              </select>
            </div>

            <div className="contact-form__field">
              <label htmlFor="city" className="contact-form__label">City / Location *</label>
              <input id="city" name="city" type="text" required className="contact-form__input" placeholder="City where security is needed" />
            </div>

            <div className="contact-form__field">
              <label htmlFor="message" className="contact-form__label">Describe Your Requirement</label>
              <textarea
                id="message"
                name="message"
                className="contact-form__textarea"
                rows={4}
                placeholder="Number of guards needed, type of facility, shift requirements..."
              />
            </div>

            <button type="submit" className="contact-form__submit">
              Request Free Quote
            </button>

            <p className="contact-form__note">
              <Shield size={12} /> No spam. Your information is confidential and used only to contact you about your security requirements.
            </p>
          </form>

          {/* Office locations */}
          <div className="contact-offices">
            <h2 className="contact-offices__title">Our Offices</h2>
            <div className="contact-offices__grid">
              {[
                { city: 'Jaipur (HQ)', address: 'Head Office Address, Jaipur, Rajasthan 302001' },
                { city: 'Delhi NCR', address: 'Office Address, New Delhi 110001' },
                { city: 'Ahmedabad', address: 'Office Address, Ahmedabad, Gujarat 380001' },
              ].map(({ city, address }) => (
                <div key={city} className="contact-office">
                  <div className="contact-office__city">
                    <MapPin size={14} className="contact-office__icon" />
                    {city}
                  </div>
                  <p className="contact-office__address">{address}</p>
                  <div className="contact-office__hours">
                    <Clock size={12} /> Mon–Sat: 9:00 AM – 7:00 PM
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
```

---

## File: `src/app/about/page.tsx` [NEW]

```tsx
import type { Metadata } from 'next'
import { Shield, Award, Users, MapPin, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Silbar Security — Founded by Law Enforcement',
  description:
    'Silbar Security Services was founded by law enforcement professionals. ISO 9001:2015 & PSARA-2005 certified. 7,000+ licensed officers across PAN India.',
  alternates: { canonical: 'https://www.silbarsecurity.in/about' },
}

const STATS = [
  { number: '7,000+', label: 'Licensed Security Officers' },
  { number: '200+', label: 'Cities Served' },
  { number: '15+', label: 'Years of Experience' },
  { number: '500+', label: 'Enterprise Clients' },
]

const CERTIFICATIONS = [
  { name: 'PSARA 2005', desc: 'Licensed under Private Security Agencies Regulation Act across multiple states' },
  { name: 'ISO 9001:2015', desc: 'Quality Management System certified for security service delivery' },
  { name: 'MSME Registered', desc: 'Registered with Ministry of Micro, Small & Medium Enterprises' },
  { name: 'GST Compliant', desc: 'Fully GST registered and compliant for all service invoicing' },
]

const WHY_SILBAR = [
  'Founded by retired law enforcement and defence professionals',
  'PSARA licensed across multiple Indian states',
  'ISO 9001:2015 certified quality management',
  'Full statutory compliance — ESI, PF, Gratuity, Minimum Wages',
  '24-hour guard replacement guarantee',
  'Dedicated account manager for every client',
  'Monthly performance and compliance reports',
  'PAN India deployment capability with local expertise',
]

export default function AboutPage() {
  return (
    <main className="about-page" id="main-content">

      <section className="about-hero">
        <div className="about-hero__inner">
          <span className="page-eyebrow">ABOUT US</span>
          <h1 className="about-title">
            NOT JUST SECURITY.<br />
            <span className="about-title--outline">A COMMITMENT.</span>
          </h1>
          <p className="about-subtitle">
            Silbar Security Services was built by people who dedicated their careers
            to protecting others — and still do, every single day.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="about-stats__grid">
          {STATS.map(({ number, label }) => (
            <div key={label} className="about-stat">
              <span className="about-stat__number">{number}</span>
              <span className="about-stat__label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="about-story" id="our-story">
        <div className="about-story__inner">
          <div className="about-story__text">
            <span className="page-eyebrow">OUR STORY</span>
            <h2 className="about-story__title">Founded by Law Enforcement</h2>
            <p className="about-story__body">
              Silbar Security Services was established by professionals with deep roots in
              law enforcement and defence. We saw firsthand the gap between what Indian
              enterprises needed from private security and what was being delivered: under-trained
              guards, non-compliant agencies, and no accountability.
            </p>
            <p className="about-story__body">
              We built Silbar to be different. Every guard we deploy is PSARA-trained,
              background verified, and covered under full statutory compliance. Every client
              gets a dedicated account manager, monthly MIS reports, and a 24-hour replacement
              guarantee. That's not industry standard. That's our standard.
            </p>
          </div>
          <div className="about-story__image-block">
            <div className="about-story__image-placeholder">
              <Shield size={48} className="about-story__shield-icon" />
              <span className="about-story__image-label">Est. 2008 · Jaipur, Rajasthan</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Silbar */}
      <section className="about-why" id="why-silbar">
        <div className="about-why__inner">
          <span className="page-eyebrow">WHY SILBAR</span>
          <h2 className="about-why__title">The Silbar Difference</h2>
          <div className="about-why__grid">
            {WHY_SILBAR.map((point) => (
              <div key={point} className="about-why__point">
                <CheckCircle size={16} className="about-why__check" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="about-certs" id="certifications">
        <div className="about-certs__inner">
          <span className="page-eyebrow">CERTIFICATIONS</span>
          <h2 className="about-certs__title">Licensed. Certified. Compliant.</h2>
          <div className="about-certs__grid">
            {CERTIFICATIONS.map(({ name, desc }) => (
              <div key={name} className="about-cert-card">
                <div className="about-cert-card__badge">
                  <Award size={20} />
                  {name}
                </div>
                <p className="about-cert-card__desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
```

---

---

# STEP 3 — Services Dynamic Route

## File: `src/app/services/page.tsx` [NEW]

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { SERVICES } from '@/data/services'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Security Services — 10 Verticals for Every Industry',
  description:
    'Silbar Security offers manned guarding, industrial security, event security, bank & ATM security, CCTV surveillance, facility management, and more. PSARA-licensed. PAN India.',
  alternates: { canonical: 'https://www.silbarsecurity.in/services' },
}

export default function ServicesPage() {
  return (
    <main className="services-page" id="main-content">
      <section className="services-page-hero">
        <span className="page-eyebrow">WHAT WE DO</span>
        <h1 className="services-page-title">
          10 SECURITY<br />
          <span className="services-page-title--outline">VERTICALS.</span>
        </h1>
        <p className="services-page-subtitle">
          End-to-end security and facility management for India's enterprises.
          PSARA licensed. ISO certified.
        </p>
      </section>

      <section className="services-page-grid-section">
        <div className="services-page-grid">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="service-page-card"
            >
              <div className="service-page-card__header">
                <h2 className="service-page-card__title">{service.shortTitle}</h2>
                <ArrowRight size={18} className="service-page-card__arrow" />
              </div>
              <p className="service-page-card__desc">{service.description}</p>
              <div className="service-page-card__industries">
                {service.industries.slice(0, 3).map((ind) => (
                  <span key={ind} className="service-page-card__tag">{ind}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
```

---

## File: `src/app/services/[slug]/page.tsx` [NEW]

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SERVICES, SERVICE_SLUGS } from '@/data/services'
import { CheckCircle, ArrowRight, Phone } from 'lucide-react'

export async function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) return {}

  return {
    title: `${service.title} in India | Silbar Security`,
    description: service.description,
    alternates: {
      canonical: `https://www.silbarsecurity.in/services/${slug}`,
    },
    openGraph: {
      title: `${service.title} | Silbar Security Services`,
      description: service.description,
    },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) notFound()

  // JSON-LD schema for this service
  const schema = {
    '@context': 'https://schema.org',
    '@type': service.schema.serviceType,
    name: service.schema.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'Silbar Security Services Pvt. Ltd.',
      url: 'https://www.silbarsecurity.in',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.title,
    },
  }

  // FAQ schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="service-detail-page" id="main-content">

        {/* Hero */}
        <section className="service-detail-hero">
          <div className="service-detail-hero__inner">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/" className="breadcrumb__link">Home</Link>
              <span className="breadcrumb__sep">›</span>
              <Link href="/services" className="breadcrumb__link">Services</Link>
              <span className="breadcrumb__sep">›</span>
              <span className="breadcrumb__current">{service.shortTitle}</span>
            </nav>
            <h1 className="service-detail-title">{service.title}</h1>
            <p className="service-detail-subtitle">{service.longDescription}</p>
            <div className="service-detail-ctas">
              <a href="tel:+919352303333" className="service-detail-cta service-detail-cta--primary">
                <Phone size={16} /> Call Now
              </a>
              <Link href="/contact" className="service-detail-cta service-detail-cta--secondary">
                Get Quote <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="service-detail-features">
          <div className="service-detail-section-inner">
            <h2 className="service-detail-section-title">What's Included</h2>
            <div className="service-detail-features-grid">
              {service.features.map((f) => (
                <div key={f} className="service-detail-feature">
                  <CheckCircle size={16} className="service-detail-feature__icon" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="service-detail-industries">
          <div className="service-detail-section-inner">
            <h2 className="service-detail-section-title">Industries We Serve</h2>
            <div className="service-detail-industries-tags">
              {service.industries.map((ind) => (
                <span key={ind} className="service-detail-industry-tag">{ind}</span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="service-detail-faq">
          <div className="service-detail-section-inner">
            <h2 className="service-detail-section-title">Frequently Asked Questions</h2>
            <div className="service-detail-faq-list">
              {service.faqs.map(({ q, a }) => (
                <details key={q} className="service-detail-faq-item">
                  <summary className="service-detail-faq-q">{q}</summary>
                  <p className="service-detail-faq-a">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="service-detail-bottom-cta">
          <h2 className="service-detail-bottom-cta__title">
            Need {service.shortTitle} Services?
          </h2>
          <p className="service-detail-bottom-cta__sub">
            Our security consultants will assess your facility and provide a
            customized quote within 24 hours.
          </p>
          <Link href="/contact" className="service-detail-cta service-detail-cta--primary">
            Request Free Consultation <ArrowRight size={16} />
          </Link>
        </section>

      </main>
    </>
  )
}
```

---

---

# STEP 4 — Industries Dynamic Route

## File: `src/app/industries/page.tsx` [NEW]

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { INDUSTRIES } from '@/data/industries'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Industries We Serve — Security for Every Sector',
  description:
    'Silbar Security provides specialized security solutions for manufacturing, hospitals, hotels, warehouses, banks, corporate offices, data centres, government, and more.',
  alternates: { canonical: 'https://www.silbarsecurity.in/industries' },
}

export default function IndustriesPage() {
  return (
    <main className="industries-page" id="main-content">
      <section className="industries-hero">
        <span className="page-eyebrow">WHERE WE OPERATE</span>
        <h1 className="industries-title">
          12 INDUSTRIES.<br />
          <span className="industries-title--outline">ONE STANDARD.</span>
        </h1>
        <p className="industries-subtitle">
          Every industry has unique security challenges. We've solved them.
        </p>
      </section>

      <section className="industries-grid-section">
        <div className="industries-grid">
          {INDUSTRIES.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="industry-card"
            >
              <h2 className="industry-card__title">{industry.shortTitle}</h2>
              <p className="industry-card__desc">{industry.description.slice(0, 100)}...</p>
              <span className="industry-card__cta">
                Learn More <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
```

---

## File: `src/app/industries/[slug]/page.tsx` [NEW]

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { INDUSTRIES, INDUSTRY_SLUGS } from '@/data/industries'
import { SERVICES } from '@/data/services'
import { CheckCircle, ArrowRight, AlertTriangle, Phone } from 'lucide-react'

export async function generateStaticParams() {
  return INDUSTRY_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const industry = INDUSTRIES.find((i) => i.slug === slug)
  if (!industry) return {}
  return {
    title: `${industry.title} | Silbar Security`,
    description: industry.description,
    alternates: { canonical: `https://www.silbarsecurity.in/industries/${slug}` },
  }
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const industry = INDUSTRIES.find((i) => i.slug === slug)
  if (!industry) notFound()

  const relatedServices = SERVICES.filter((s) =>
    industry.services.includes(s.slug)
  )

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: industry.title,
    description: industry.description,
    provider: {
      '@type': 'Organization',
      name: 'Silbar Security Services Pvt. Ltd.',
      url: 'https://www.silbarsecurity.in',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: industry.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="industry-detail-page" id="main-content">

        <section className="industry-detail-hero">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <Link href="/industries" className="breadcrumb__link">Industries</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">{industry.shortTitle}</span>
          </nav>
          <h1 className="industry-detail-title">{industry.title}</h1>
          <p className="industry-detail-subtitle">{industry.description}</p>
          <div className="service-detail-ctas">
            <a href="tel:+919352303333" className="service-detail-cta service-detail-cta--primary">
              <Phone size={16} /> Get Quote
            </a>
          </div>
        </section>

        {/* Challenges */}
        <section className="industry-challenges">
          <div className="service-detail-section-inner">
            <h2 className="service-detail-section-title">Security Challenges</h2>
            <div className="industry-challenges-list">
              {industry.challenges.map((c) => (
                <div key={c} className="industry-challenge-item">
                  <AlertTriangle size={15} className="industry-challenge-item__icon" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section className="industry-solutions">
          <div className="service-detail-section-inner">
            <h2 className="service-detail-section-title">Our Solutions</h2>
            <div className="service-detail-features-grid">
              {industry.solutions.map((s) => (
                <div key={s} className="service-detail-feature">
                  <CheckCircle size={16} className="service-detail-feature__icon" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="industry-related-services">
          <div className="service-detail-section-inner">
            <h2 className="service-detail-section-title">Services for {industry.shortTitle}</h2>
            <div className="industry-services-grid">
              {relatedServices.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} className="industry-service-link">
                  {service.shortTitle} <ArrowRight size={14} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="service-detail-faq">
          <div className="service-detail-section-inner">
            <h2 className="service-detail-section-title">FAQs</h2>
            <div className="service-detail-faq-list">
              {industry.faqs.map(({ q, a }) => (
                <details key={q} className="service-detail-faq-item">
                  <summary className="service-detail-faq-q">{q}</summary>
                  <p className="service-detail-faq-a">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
```

---

---

# STEP 5 — State SEO Pages

## File: `src/app/security-services/[state]/page.tsx` [NEW]

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { STATES } from '@/data/locations'
import { SERVICES } from '@/data/services'
import { ArrowRight, Phone, MapPin } from 'lucide-react'

export const revalidate = 86400 // ISR — revalidate once per day

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

  const title = `Security Guard Services in ${location.name} | Silbar Security`
  const description = `PSARA-licensed security guard services in ${location.name}. Silbar Security provides manned guarding, industrial security, CCTV surveillance, and facility management across ${location.majorCities.slice(0, 3).join(', ')} and all of ${location.name}.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.silbarsecurity.in/security-services/${state}`,
    },
    openGraph: { title, description },
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

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://www.silbarsecurity.in/security-services/${state}`,
    name: `Silbar Security Services — ${location.name}`,
    description: `PSARA-licensed security services in ${location.name}`,
    url: 'https://www.silbarsecurity.in',
    telephone: '+919352303333',
    email: 'info@silbarsecurity.in',
    address: {
      '@type': 'PostalAddress',
      addressRegion: location.name,
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'State',
      name: location.name,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Security Services in ${location.name}`,
      itemListElement: SERVICES.slice(0, 5).map((s) => ({
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
    mainEntity: [
      {
        '@type': 'Question',
        name: `Are Silbar Security guards PSARA licensed in ${location.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes. All Silbar Security guards deployed in ${location.name} are licensed under PSARA 2005. We maintain valid PSARA licenses issued by the state's Controlling Authority.`,
        },
      },
      {
        '@type': 'Question',
        name: `Which cities in ${location.name} does Silbar Security serve?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `We serve ${location.majorCities.join(', ')} and all major cities and districts across ${location.name}. Contact us for deployment in any location within the state.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the minimum contract duration for security guards in ${location.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Our standard minimum contract is 3 months. For event security, we offer single-day and short-term deployments. Long-term contracts receive priority pricing and deployment.`,
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="seo-page" id="main-content">

        <section className="seo-page-hero">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Security Services in {location.name}</span>
          </nav>
          <h1 className="seo-page-title">
            Security Guard Services<br />in {location.name}
          </h1>
          <p className="seo-page-subtitle">
            PSARA-licensed, ISO 9001:2015 certified security services across
            all {location.districts} districts of {location.name}.
            Serving {location.majorCities.join(', ')} and beyond.
          </p>
          <div className="seo-page-ctas">
            <a href="tel:+919352303333" className="service-detail-cta service-detail-cta--primary">
              <Phone size={16} /> Call Now
            </a>
            <Link href="/contact" className="service-detail-cta service-detail-cta--secondary">
              Get Free Quote <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Services in this state */}
        <section className="seo-services-section">
          <div className="service-detail-section-inner">
            <h2 className="service-detail-section-title">
              Our Services in {location.name}
            </h2>
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
                  <ArrowRight size={13} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Cities in this state */}
        <section className="seo-cities-section">
          <div className="service-detail-section-inner">
            <h2 className="service-detail-section-title">
              Cities We Serve in {location.name}
            </h2>
            <div className="seo-cities-grid">
              {location.majorCities.map((city) => (
                <span key={city} className="seo-city-tag">
                  <MapPin size={12} /> {city}
                </span>
              ))}
            </div>
            <p className="seo-cities-note">
              Don't see your city? We deploy across all {location.districts} districts of {location.name}.
              <Link href="/contact" className="seo-cities-link"> Contact us for your location.</Link>
            </p>
          </div>
        </section>

        {/* About Silbar in this state */}
        <section className="seo-about-section">
          <div className="service-detail-section-inner">
            <h2 className="service-detail-section-title">
              About Silbar Security in {location.name}
            </h2>
            <div className="seo-about-content">
              <p>
                Silbar Security Services is a PSARA-licensed private security agency
                operating in {location.name}. We provide manned guarding, industrial
                security, electronic surveillance, and facility management for
                manufacturing companies, hospitals, hotels, warehouses, banks, and
                residential societies across {location.name}.
              </p>
              <p>
                All our security personnel deployed in {location.name} are licensed
                under the state's PSARA Controlling Authority, background verified,
                and covered under full statutory compliance including ESI, PF, and
                minimum wages as mandated by {location.name} state labour laws.
              </p>
              <p>
                Our {location.capital}-based operations team manages deployments
                across {location.districts} districts with rapid deployment capability
                and dedicated account management for every client.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="service-detail-faq">
          <div className="service-detail-section-inner">
            <h2 className="service-detail-section-title">
              FAQs — Security Services in {location.name}
            </h2>
            <div className="service-detail-faq-list">
              {[
                {
                  q: `Are Silbar Security guards PSARA licensed in ${location.name}?`,
                  a: `Yes. All Silbar Security guards deployed in ${location.name} are licensed under PSARA 2005 by the state's Controlling Authority.`,
                },
                {
                  q: `Which cities in ${location.name} does Silbar Security serve?`,
                  a: `We serve ${location.majorCities.join(', ')} and all major cities and districts across ${location.name}.`,
                },
                {
                  q: `What industries does Silbar serve in ${location.name}?`,
                  a: `We serve manufacturing, hospitals, hotels, warehouses, banks, corporate offices, residential societies, and government organizations across ${location.name}.`,
                },
              ].map(({ q, a }) => (
                <details key={q} className="service-detail-faq-item">
                  <summary className="service-detail-faq-q">{q}</summary>
                  <p className="service-detail-faq-a">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
```

---

---

# STEP 6 — Schema in Layout

## File: `src/app/layout.tsx` — add JSON-LD Organization Schema

Add inside `<body>` (before `{children}`), around **line 100**:

```tsx
        {/* Organization schema — injected globally */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': 'https://www.silbarsecurity.in/#organization',
              name: 'Silbar Security Services Pvt. Ltd.',
              alternateName: 'Silbar Security',
              url: 'https://www.silbarsecurity.in',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.silbarsecurity.in/logo.png',
                width: 300,
                height: 60,
              },
              description:
                'ISO 9001:2015 & PSARA-2005 certified private security agency with 7,000+ licensed officers. Manned guarding, electronic surveillance, facility management, VIP protection across PAN India.',
              telephone: '+91-9352303333',
              email: 'info@silbarsecurity.in',
              foundingDate: '2008',
              numberOfEmployees: { '@type': 'QuantitativeValue', value: 7000 },
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Head Office Address',
                addressLocality: 'Jaipur',
                addressRegion: 'Rajasthan',
                postalCode: '302001',
                addressCountry: 'IN',
              },
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: '+91-9352303333',
                  contactType: 'customer service',
                  areaServed: 'IN',
                  availableLanguage: ['English', 'Hindi'],
                },
              ],
              sameAs: [
                'https://www.linkedin.com/company/silbar-security',
                'https://www.facebook.com/silbarsecurity',
              ],
              hasCredential: [
                {
                  '@type': 'EducationalOccupationalCredential',
                  credentialCategory: 'license',
                  name: 'PSARA License',
                  recognizedBy: { '@type': 'Organization', name: 'Government of India' },
                },
                {
                  '@type': 'EducationalOccupationalCredential',
                  credentialCategory: 'certification',
                  name: 'ISO 9001:2015',
                  recognizedBy: { '@type': 'Organization', name: 'Bureau Veritas' },
                },
              ],
            }),
          }}
        />
        {children}
```

---

---

# STEP 7 — Sitemap + Robots

## File: `src/app/sitemap.ts` [NEW]

```typescript
import { MetadataRoute } from 'next'
import { SERVICE_SLUGS } from '@/data/services'
import { INDUSTRY_SLUGS } from '@/data/industries'
import { STATES, CITIES } from '@/data/locations'

const BASE_URL = 'https://www.silbarsecurity.in'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Core pages
  const corePages = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/industries`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
  ]

  // Service pages
  const servicePages = SERVICE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Industry pages
  const industryPages = INDUSTRY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/industries/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // State SEO pages
  const statePages = STATES.map((state) => ({
    url: `${BASE_URL}/security-services/${state.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // City SEO pages
  const cityPages = CITIES.map((city) => ({
    url: `${BASE_URL}/security-services/city/${city.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...corePages, ...servicePages, ...industryPages, ...statePages, ...cityPages]
}
```

---

## File: `src/app/robots.ts` [NEW]

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: 'https://www.silbarsecurity.in/sitemap.xml',
    host: 'https://www.silbarsecurity.in',
  }
}
```

---

---

# STEP 8 — Shared Page CSS

Add to the end of `src/app/globals.css`:

```css
/* ============================================
   Shared Page Layout
   ============================================ */

.page-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-body);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: 1rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-body);
  font-size: 0.72rem;
  color: var(--color-horizon-500);
  margin-bottom: 2rem;
}

.breadcrumb__link {
  color: var(--color-horizon-500);
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb__link:hover { color: var(--color-cream); }
.breadcrumb__sep { opacity: 0.4; }
.breadcrumb__current { color: var(--color-cream); }

/* All inner pages share a dark background */
.contact-page,
.about-page,
.services-page,
.service-detail-page,
.industries-page,
.industry-detail-page,
.seo-page {
  min-height: 100dvh;
  background: var(--color-midnight);
  color: var(--color-cream);
  padding-top: clamp(5rem, 10vh, 8rem); /* clear the fixed header */
}

/* Section inner container */
.service-detail-section-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(3rem, 6vh, 5rem) clamp(1.5rem, 5vw, 6rem);
}

.service-detail-section-title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-cream);
  text-transform: uppercase;
  margin-bottom: 2rem;
}

/* Hero sections for inner pages */
.service-detail-hero,
.industry-detail-hero,
.seo-page-hero,
.contact-hero,
.about-hero,
.services-page-hero,
.industries-hero {
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(2rem, 5vh, 4rem) clamp(1.5rem, 5vw, 6rem) clamp(3rem, 6vh, 5rem);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.service-detail-title,
.industry-detail-title,
.seo-page-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.03em;
  color: var(--color-cream);
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.service-detail-subtitle,
.industry-detail-subtitle,
.seo-page-subtitle {
  font-family: var(--font-body);
  font-size: clamp(0.9rem, 1.2vw, 1.1rem);
  line-height: 1.7;
  color: rgba(244, 241, 234, 0.7);
  max-width: 680px;
  margin-bottom: 2rem;
}

/* CTA buttons used across pages */
.service-detail-ctas {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.service-detail-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8em 1.8em;
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s var(--ease-smooth), transform 0.2s var(--ease-smooth);
}

.service-detail-cta--primary {
  background: var(--color-gold);
  color: var(--color-midnight);
}

.service-detail-cta--primary:hover {
  background: var(--color-gold-light);
  transform: translateY(-2px);
}

.service-detail-cta--secondary {
  border: 1px solid rgba(191, 149, 63, 0.4);
  color: var(--color-cream);
  background: transparent;
}

.service-detail-cta--secondary:hover {
  border-color: var(--color-gold);
  transform: translateY(-2px);
}

/* Feature grid */
.service-detail-features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (max-width: 640px) {
  .service-detail-features-grid { grid-template-columns: 1fr; }
}

.service-detail-feature {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-family: var(--font-body);
  font-size: 0.88rem;
  line-height: 1.5;
  color: rgba(244, 241, 234, 0.8);
}

.service-detail-feature__icon {
  color: var(--color-gold);
  flex-shrink: 0;
  margin-top: 0.1rem;
}

/* Industry tags */
.service-detail-industries-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.service-detail-industry-tag {
  padding: 0.35em 0.9em;
  border: 1px solid rgba(191, 149, 63, 0.25);
  border-radius: 999px;
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: rgba(244, 241, 234, 0.7);
  text-transform: uppercase;
}

/* FAQ accordion */
.service-detail-faq-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.service-detail-faq-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.service-detail-faq-q {
  padding: 1.25rem 0;
  font-family: var(--font-display);
  font-size: clamp(0.88rem, 1.1vw, 1rem);
  font-weight: 600;
  color: var(--color-cream);
  cursor: pointer;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.service-detail-faq-q::after {
  content: '+';
  font-size: 1.2rem;
  color: var(--color-gold);
  flex-shrink: 0;
}

details[open] .service-detail-faq-q::after {
  content: '−';
}

.service-detail-faq-a {
  padding-bottom: 1.25rem;
  font-family: var(--font-body);
  font-size: 0.88rem;
  line-height: 1.7;
  color: rgba(244, 241, 234, 0.65);
}

/* Bottom CTA section */
.service-detail-bottom-cta {
  text-align: center;
  padding: clamp(4rem, 8vh, 6rem) clamp(1.5rem, 5vw, 6rem);
  background: rgba(191, 149, 63, 0.05);
  border-top: 1px solid rgba(191, 149, 63, 0.15);
}

.service-detail-bottom-cta__title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-cream);
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.service-detail-bottom-cta__sub {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: rgba(244, 241, 234, 0.6);
  margin-bottom: 2rem;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

/* Services index page */
.services-page-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 5vw, 6rem) clamp(4rem, 8vh, 6rem);
}

@media (max-width: 900px) { .services-page-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 580px) { .services-page-grid { grid-template-columns: 1fr; } }

.service-page-card {
  padding: 1.75rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(191, 149, 63, 0.12);
  border-radius: 12px;
  text-decoration: none;
  transition: border-color 0.3s var(--ease-smooth), transform 0.2s var(--ease-smooth);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.service-page-card:hover {
  border-color: rgba(191, 149, 63, 0.4);
  transform: translateY(-3px);
}

.service-page-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.service-page-card__title {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-cream);
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.service-page-card__arrow { color: var(--color-gold); flex-shrink: 0; }

.service-page-card__desc {
  font-family: var(--font-body);
  font-size: 0.78rem;
  line-height: 1.6;
  color: rgba(244, 241, 234, 0.55);
  flex: 1;
}

.service-page-card__industries {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-top: auto;
}

.service-page-card__tag {
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--color-gold);
  text-transform: uppercase;
  opacity: 0.7;
}

/* Industries index page */
.industries-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 5vw, 6rem) clamp(4rem, 8vh, 6rem);
}

@media (max-width: 1024px) { .industries-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px) { .industries-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .industries-grid { grid-template-columns: 1fr; } }

.industry-card {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(191, 149, 63, 0.12);
  border-radius: 10px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: border-color 0.3s, transform 0.2s;
}

.industry-card:hover { border-color: rgba(191, 149, 63, 0.4); transform: translateY(-2px); }

.industry-card__title {
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-cream);
  text-transform: uppercase;
}

.industry-card__desc {
  font-family: var(--font-body);
  font-size: 0.75rem;
  line-height: 1.5;
  color: rgba(244, 241, 234, 0.5);
}

.industry-card__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-gold);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-top: auto;
}

/* SEO pages */
.seo-services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

@media (max-width: 768px) { .seo-services-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .seo-services-grid { grid-template-columns: 1fr; } }

.seo-service-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.9rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(191, 149, 63, 0.1);
  border-radius: 8px;
  text-decoration: none;
  transition: border-color 0.2s;
}

.seo-service-link:hover { border-color: rgba(191, 149, 63, 0.35); }

.seo-service-link__title {
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-cream);
}

.seo-service-link__location {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-family: var(--font-body);
  font-size: 0.65rem;
  color: var(--color-horizon-500);
}

.seo-cities-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.seo-city-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4em 0.9em;
  border: 1px solid rgba(191, 149, 63, 0.2);
  border-radius: 999px;
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: rgba(244, 241, 234, 0.7);
}

.seo-cities-note {
  font-family: var(--font-body);
  font-size: 0.82rem;
  color: rgba(244, 241, 234, 0.5);
}

.seo-cities-link {
  color: var(--color-gold);
  text-decoration: none;
}

.seo-about-content p {
  font-family: var(--font-body);
  font-size: 0.9rem;
  line-height: 1.8;
  color: rgba(244, 241, 234, 0.7);
  margin-bottom: 1rem;
  max-width: 780px;
}

/* Contact page */
.contact-page-hero,
.contact-hero__inner {
  max-width: 1200px;
  margin: 0 auto;
}

.contact-title,
.about-title,
.services-page-title,
.industries-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 7vw, 5.5rem);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.03em;
  color: var(--color-cream);
  text-transform: uppercase;
  margin-bottom: 1.25rem;
}

.contact-title--outline,
.about-title--outline,
.services-page-title--outline,
.industries-title--outline {
  color: transparent;
  -webkit-text-stroke: 1.5px var(--color-cream);
}

.contact-eyebrow,
.contact-subtitle,
.about-subtitle,
.services-page-subtitle,
.industries-subtitle {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: rgba(244, 241, 234, 0.65);
  line-height: 1.7;
  max-width: 560px;
}

.contact-eyebrow { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-gold); display: block; margin-bottom: 1rem; }

.contact-body { padding-bottom: clamp(4rem, 8vh, 6rem); }
.contact-body__inner { max-width: 1200px; margin: 0 auto; padding: clamp(3rem, 6vh, 4rem) clamp(1.5rem, 5vw, 6rem); display: flex; flex-direction: column; gap: 3rem; }

.contact-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
@media (max-width: 900px) { .contact-cards { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .contact-cards { grid-template-columns: 1fr; } }

.contact-card {
  padding: 1.5rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(191, 149, 63, 0.12);
  border-radius: 12px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: border-color 0.3s, transform 0.2s;
}

.contact-card:hover { border-color: rgba(191, 149, 63, 0.4); transform: translateY(-2px); }

.contact-card--whatsapp { border-color: rgba(37, 211, 102, 0.2); }
.contact-card--whatsapp:hover { border-color: rgba(37, 211, 102, 0.5); }

.contact-card__icon { color: var(--color-gold); }
.contact-card__label { font-family: var(--font-body); font-size: 0.65rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-horizon-500); }
.contact-card__value { font-family: var(--font-display); font-size: 0.95rem; font-weight: 700; color: var(--color-cream); }
.contact-card__note { font-family: var(--font-body); font-size: 0.72rem; color: var(--color-horizon-600); }

/* Contact form */
.contact-form {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(191, 149, 63, 0.12);
  border-radius: 16px;
  padding: clamp(2rem, 4vh, 3rem) clamp(1.5rem, 3vw, 2.5rem);
}

.contact-form__title {
  font-family: var(--font-display);
  font-size: clamp(1.3rem, 2.5vw, 2rem);
  font-weight: 700;
  color: var(--color-cream);
  text-transform: uppercase;
  letter-spacing: -0.01em;
  margin-bottom: 1.75rem;
}

.contact-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
@media (max-width: 640px) { .contact-form__row { grid-template-columns: 1fr; } }

.contact-form__field { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1rem; }

.contact-form__label {
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(244, 241, 234, 0.55);
}

.contact-form__input,
.contact-form__select,
.contact-form__textarea {
  width: 100%;
  padding: 0.75em 1em;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: var(--color-cream);
  font-family: var(--font-body);
  font-size: 0.88rem;
  outline: none;
  transition: border-color 0.2s;
}

.contact-form__input:focus,
.contact-form__select:focus,
.contact-form__textarea:focus {
  border-color: var(--color-gold);
}

.contact-form__select option { background: var(--color-midnight-900); color: var(--color-cream); }

.contact-form__textarea { resize: vertical; min-height: 100px; }

.contact-form__submit {
  display: inline-flex;
  align-items: center;
  padding: 0.85em 2.5em;
  background: var(--color-gold);
  color: var(--color-midnight);
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  margin-top: 0.5rem;
}

.contact-form__submit:hover { background: var(--color-gold-light); transform: translateY(-2px); }

.contact-form__note {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-body);
  font-size: 0.72rem;
  color: var(--color-horizon-600);
  margin-top: 1rem;
}

/* Contact offices */
.contact-offices__title {
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2vw, 1.75rem);
  font-weight: 700;
  color: var(--color-cream);
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.contact-offices__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
@media (max-width: 768px) { .contact-offices__grid { grid-template-columns: 1fr; } }

.contact-office { padding: 1.25rem; border: 1px solid rgba(191,149,63,0.1); border-radius: 10px; }

.contact-office__city {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-cream);
  margin-bottom: 0.5rem;
}

.contact-office__icon { color: var(--color-gold); }
.contact-office__address { font-family: var(--font-body); font-size: 0.78rem; color: rgba(244,241,234,0.55); line-height: 1.5; margin-bottom: 0.5rem; }
.contact-office__hours { display: flex; align-items: center; gap: 0.3rem; font-family: var(--font-body); font-size: 0.7rem; color: var(--color-horizon-500); }

/* About page */
.about-hero__inner { max-width: 900px; }

.about-stats { background: rgba(191, 149, 63, 0.04); border-top: 1px solid rgba(191, 149, 63, 0.1); border-bottom: 1px solid rgba(191, 149, 63, 0.1); padding: clamp(2rem, 4vh, 3rem) clamp(1.5rem, 5vw, 6rem); }
.about-stats__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; max-width: 1200px; margin: 0 auto; }
@media (max-width: 768px) { .about-stats__grid { grid-template-columns: repeat(2, 1fr); } }

.about-stat { text-align: center; }
.about-stat__number { display: block; font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 800; color: var(--color-gold); }
.about-stat__label { display: block; font-family: var(--font-body); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(244, 241, 234, 0.5); margin-top: 0.25rem; }

.about-story { padding: clamp(3rem, 6vh, 5rem) clamp(1.5rem, 5vw, 6rem); }
.about-story__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; max-width: 1200px; margin: 0 auto; }
@media (max-width: 768px) { .about-story__inner { grid-template-columns: 1fr; } }

.about-story__title { font-family: var(--font-display); font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 800; letter-spacing: -0.02em; color: var(--color-cream); text-transform: uppercase; margin-bottom: 1.5rem; }
.about-story__body { font-family: var(--font-body); font-size: 0.9rem; line-height: 1.8; color: rgba(244, 241, 234, 0.7); margin-bottom: 1rem; }

.about-story__image-placeholder { background: rgba(191, 149, 63, 0.05); border: 1px solid rgba(191, 149, 63, 0.15); border-radius: 16px; aspect-ratio: 4/3; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; }
.about-story__shield-icon { color: var(--color-gold); opacity: 0.4; }
.about-story__image-label { font-family: var(--font-body); font-size: 0.75rem; color: var(--color-horizon-600); }

.about-why { background: rgba(255, 255, 255, 0.02); padding: clamp(3rem, 6vh, 5rem) clamp(1.5rem, 5vw, 6rem); }
.about-why__inner { max-width: 1200px; margin: 0 auto; }
.about-why__title { font-family: var(--font-display); font-size: clamp(1.5rem, 3vw, 2.5rem); font-weight: 800; letter-spacing: -0.02em; color: var(--color-cream); text-transform: uppercase; margin-bottom: 2rem; }
.about-why__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
@media (max-width: 640px) { .about-why__grid { grid-template-columns: 1fr; } }

.about-why__point { display: flex; align-items: flex-start; gap: 0.75rem; font-family: var(--font-body); font-size: 0.88rem; line-height: 1.5; color: rgba(244, 241, 234, 0.75); }
.about-why__check { color: var(--color-gold); flex-shrink: 0; margin-top: 0.1rem; }

.about-certs { padding: clamp(3rem, 6vh, 5rem) clamp(1.5rem, 5vw, 6rem); }
.about-certs__inner { max-width: 1200px; margin: 0 auto; }
.about-certs__title { font-family: var(--font-display); font-size: clamp(1.5rem, 3vw, 2.5rem); font-weight: 800; letter-spacing: -0.02em; color: var(--color-cream); text-transform: uppercase; margin-bottom: 2rem; }
.about-certs__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
@media (max-width: 900px) { .about-certs__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .about-certs__grid { grid-template-columns: 1fr; } }

.about-cert-card { padding: 1.5rem; border: 1px solid rgba(191, 149, 63, 0.15); border-radius: 10px; }
.about-cert-card__badge { display: flex; align-items: center; gap: 0.5rem; font-family: var(--font-display); font-size: 0.82rem; font-weight: 700; color: var(--color-gold); text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 0.75rem; }
.about-cert-card__desc { font-family: var(--font-body); font-size: 0.78rem; line-height: 1.55; color: rgba(244, 241, 234, 0.55); }

/* Industry detail extras */
.industry-challenges-list { display: flex; flex-direction: column; gap: 0.75rem; }
.industry-challenge-item { display: flex; align-items: flex-start; gap: 0.75rem; font-family: var(--font-body); font-size: 0.88rem; color: rgba(244, 241, 234, 0.7); }
.industry-challenge-item__icon { color: rgba(204, 34, 34, 0.7); flex-shrink: 0; margin-top: 0.1rem; }

.industry-services-grid { display: flex; flex-wrap: wrap; gap: 0.75rem; }
.industry-service-link { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.5em 1.2em; border: 1px solid rgba(191, 149, 63, 0.2); border-radius: 4px; font-family: var(--font-display); font-size: 0.78rem; font-weight: 600; color: var(--color-cream); text-decoration: none; text-transform: uppercase; letter-spacing: 0.04em; transition: border-color 0.2s, color 0.2s; }
.industry-service-link:hover { border-color: var(--color-gold); color: var(--color-gold); }
```

---

---

# PHASE 2 EXECUTION ORDER

```
1. Create src/data/services.ts
2. Create src/data/industries.ts
3. Create src/data/locations.ts
4. Create src/app/contact/page.tsx
5. Create src/app/about/page.tsx
6. Create src/app/services/page.tsx
7. Create src/app/services/[slug]/page.tsx
8. Create src/app/industries/page.tsx
9. Create src/app/industries/[slug]/page.tsx
10. Create src/app/security-services/[state]/page.tsx
11. Create src/app/sitemap.ts
12. Create src/app/robots.ts
13. Add Organization Schema to src/app/layout.tsx (Step 6)
14. Append all CSS from Step 8 to src/app/globals.css
```

**Run after each batch:**
```bash
npm run build
```
Zero TypeScript errors expected. If `params` type errors appear on Next.js 15+, the `Promise<{ slug: string }>` pattern in `generateMetadata` and page `props` is correct.

---

> **Phase 3 after this:** City SEO pages (`/security-services/city/[city]`), blog with MDX, Google Reviews embed, complete Tailwind→CSS migration for any remaining utility classes, and programmatic expansion of CITIES array to 200+.
