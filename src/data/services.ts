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
  icon: string
}

export const SERVICES: Service[] = [
  {
    slug: 'manned-guarding',
    title: 'Manned Guarding Services',
    shortTitle: 'Manned Guarding',
    icon: 'user-check',
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
    icon: 'factory',
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
    icon: 'users',
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
    icon: 'landmark',
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
    icon: 'camera',
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
    icon: 'clipboard-check',
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
    icon: 'building-2',
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
    icon: 'graduation-cap',
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
    icon: 'users-round',
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
    icon: 'file-search',
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
  {
    slug: 'fire-life-safety',
    title: 'Fire & Life Safety Services',
    shortTitle: 'Fire & Life Safety',
    icon: 'flame',
    description:
      'Fire safety audits, fire-fighting equipment maintenance, and trained fire warden deployment for factories, warehouses, hospitals, and high-occupancy buildings across India.',
    longDescription:
      'Silbar Security provides on-ground fire and life safety services that go beyond the classroom drills covered in our training programs — fire risk audits, fire extinguisher and hydrant system maintenance, fire warden deployment on every shift, and evacuation route planning for factories, warehouses, hospitals, hotels, and multi-tenant commercial buildings. Our teams work alongside your existing fire-fighting infrastructure and local fire NOC requirements to keep your facility compliant and genuinely prepared, not just paper-certified.',
    features: [
      'Fire risk assessment and audits',
      'Fire extinguisher and hydrant system checks',
      'Trained fire warden deployment per shift',
      'Evacuation route planning and signage review',
      'Fire NOC compliance support',
      'Mock drill scheduling and reporting',
      'Integration with existing building fire systems',
    ],
    industries: ['Manufacturing', 'Warehouses', 'Hospitals', 'Hotels', 'IT Parks', 'Data Centers'],
    faqs: [
      {
        q: 'Do you provide fire wardens as a standalone service, or only with security guards?',
        a: 'Both. We can deploy fire wardens as a standalone service integrated with your existing team, or combine it with our manned guarding contracts for a single point of accountability.',
      },
      {
        q: 'Can you help with fire NOC compliance for a new facility?',
        a: 'Yes. Our team can review your current fire safety setup against local fire department NOC requirements and flag gaps before your inspection.',
      },
    ],
    schema: {
      name: 'Fire & Life Safety Services',
      serviceType: 'SecurityService',
      areaServed: 'India',
    },
  },
  {
    slug: 'mobile-patrol-quick-response',
    title: 'Mobile Patrol & Quick Response Services',
    shortTitle: 'Mobile Patrol',
    icon: 'car',
    description:
      'Randomized mobile patrol visits and rapid-response teams for multi-site facilities, residential societies, and properties that need deterrence between fixed guard shifts.',
    longDescription:
      'For clients who don\'t need a guard stationed 24/7 at every location — multi-site retail chains, residential societies, ATMs, and seasonal facilities — Silbar Security runs scheduled and randomized mobile patrol visits, backed by a quick-response team that can reach any covered site within a committed response window if an alarm or distress call comes in. Patrol logs, timestamps, and site photos are shared with facility managers after every visit for full accountability.',
    features: [
      'Scheduled and randomized patrol visits',
      'Rapid-response team for alarm callouts',
      'Multi-site route planning',
      'Patrol logs with timestamps and photos',
      'Coverage between fixed guard shifts',
      'Ideal for residential societies and retail chains',
      'Coordinated with local police liaison where applicable',
    ],
    industries: ['Residential Societies', 'Retail', 'Banks', 'ATMs', 'Corporate'],
    faqs: [
      {
        q: 'How often do patrol visits happen?',
        a: 'Frequency is set per client based on risk assessment — typically every 2 to 4 hours, with intentionally randomized timing so visits aren\'t predictable.',
      },
      {
        q: 'What is your response time for an alarm or distress call?',
        a: 'Response windows are agreed per site during onboarding based on your location and our nearest patrol team — we\'ll confirm a specific committed time for your facility during the site survey.',
      },
    ],
    schema: {
      name: 'Mobile Patrol & Quick Response Services',
      serviceType: 'SecurityService',
      areaServed: 'India',
    },
  },
]

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug)
