import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'

const POSTS = [
  {
    slug: 'psara-compliance-guide-2026',
    title: 'PSARA Compliance 2026: Complete Guide for Indian Businesses',
    excerpt: 'Everything you need to know about PSARA 2005 compliance for private security agencies in India.',
    content: `The Private Security Agencies Regulation Act (PSARA) 2005 governs every private security agency operating in India. If your business hires security guards or contracts with a security agency, understanding PSARA compliance is essential.

## What is PSARA?

PSARA is a central act that establishes the legal framework for licensing and regulating private security agencies in India. Each state's Controlling Authority — typically a senior IPS officer in the Home Department — administers licensing.

## Key Requirements

1. **Licensing**: Every security agency must hold a valid PSARA license for each state where they operate
2. **Training**: Guards must complete minimum 160 hours of training (100 hours classroom + 60 hours field)
3. **Verification**: All guards undergo police verification and background checks before deployment
4. **Identity Cards**: Every guard must carry a PSARA-compliant photo ID card
5. **Record Keeping**: Agencies must maintain training records, deployment history, and incident reports for 7+ years

## Why PSARA Compliance Matters

- Legal mandate — operating without a license is a punishable offense
- Client confidence — licensed agencies are preferred by corporate and government clients
- Insurance compliance — many policies require documented security assessments
- Employee welfare — PSARA mandates ESI, PF, and minimum wage compliance

Silbar Security Services holds valid PSARA licenses across multiple Indian states, ensuring full compliance for every deployment.`,
    date: 'July 2026',
    readTime: '8 min',
    category: 'Compliance',
  },
  {
    slug: 'security-services-jaipur-guide',
    title: 'Security Services in Jaipur: Complete Business Guide',
    excerpt: 'Comprehensive guide to security guard services in Jaipur.',
    content: `Jaipur, the Pink City, is a major business hub with manufacturing units, hotels, hospitals, corporate offices, and residential societies — all requiring professional security services.

## Types of Security Services Available in Jaipur

### Manned Guarding
Armed and unarmed security guards for factories, offices, banks, and residential complexes. Silbar Security deploys PSARA-trained guards across all areas of Jaipur including Sitapura Industrial Area, Vishwakarma Industrial Area, and Mahindra World City.

### Electronic Surveillance
CCTV installation and remote monitoring for homes and businesses. Modern systems include AI-powered video analytics and mobile app access.

### Event Security
Weddings, conferences, and political rallies require crowd management and access control. Professional event security teams ensure smooth operations.

## How to Choose a Security Agency in Jaipur

1. **Verify PSARA License** — Confirm the agency's license with the Rajasthan Controlling Authority
2. **Check Guard Training** — Guards must complete PSARA-mandated 160-hour training
3. **Review Compliance** — Ensure ESI, PF, and gratuity compliance for all deployed staff
4. **Ask About Replacement** — A 24-hour replacement guarantee is industry best practice
5. **Visit Deployed Sites** — Speak with existing clients about their experience

Silbar Security, headquartered in Jaipur, meets all these criteria with 7,000+ licensed officers serving 200+ cities.`,
    date: 'July 2026',
    readTime: '6 min',
    category: 'City Guide',
  },
  {
    slug: 'how-to-choose-security-agency-india',
    title: 'How to Choose a Security Agency in India: 7 Critical Questions',
    excerpt: 'Before you sign a security contract, ask these 7 questions.',
    content: `Choosing the right security agency is one of the most important decisions a business can make. Here are 7 questions to ask before signing a contract.

## 1. Are You PSARA Licensed?
Verify their PSARA license for your state. Operating without a license is illegal under PSARA 2005.

## 2. What Training Do Your Guards Receive?
PSARA mandates 160 hours of training. Ask about their training curriculum and certification process.

## 3. Are Your Guards Background Verified?
Every guard should undergo police verification and identity authentication before deployment.

## 4. What Happens if a Guard Doesn't Show Up?
A 24-hour replacement guarantee is standard for professional agencies. Confirm their backup deployment process.

## 5. Do You Handle Statutory Compliance?
ESI, PF, gratuity, and minimum wage compliance should be fully managed by the agency.

## 6. Can You Provide Client References?
Speak with existing clients in similar industries about their experience.

## 7. What Technology Do You Use?
Modern agencies use GPS tracking, digital attendance, CCTV monitoring, and incident reporting apps.

Silbar Security scores on all 7 counts with PSARA licensing across multiple states, 7,000+ trained officers, 24-hour replacement guarantee, and full compliance management.`,
    date: 'June 2026',
    readTime: '5 min',
    category: 'Guide',
  },
  {
    slug: 'manned-guarding-vs-cctv',
    title: 'Manned Guarding vs Electronic Surveillance: What Your Business Needs',
    excerpt: 'Should you hire security guards or install CCTV?',
    content: `One of the most common questions business owners ask is: should I hire security guards or install CCTV cameras? The answer depends on your specific needs.

## Manned Guarding: Best For

- Physical presence and deterrence
- Access control and visitor management
- Emergency response and evacuation
- Night-time property patrol
- Industries with high-value assets

## Electronic Surveillance: Best For

- 24/7 monitoring coverage
- Large perimeter areas
- Evidence collection and documentation
- Remote site management
- Cost-effective multi-location coverage

## The Best Approach: Integrated Security

Most businesses benefit from a combined approach — guards handle physical response and access control, while CCTV provides continuous monitoring and documentation. Silbar Security offers both services as an integrated solution.`,
    date: 'June 2026',
    readTime: '7 min',
    category: 'Security',
  },
  {
    slug: 'hospital-security-india',
    title: 'Hospital Security Challenges and Best Practices in India',
    excerpt: 'Indian hospitals face unique security challenges.',
    content: `Hospitals in India face unique security challenges — 24/7 public access, sensitive patient areas, valuable equipment, and emergency departments.

## Key Challenges

- **Crowd Control**: Emergency departments attract large, anxious crowds
- **Drug Security**: Pharmacies and storage areas need strict access control
- **Patient Safety**: Newborn nurseries, ICU, and women's wards need special protection
- **Visitor Management**: Hundreds of visitors daily require efficient systems

## Best Practices

1. Deploy lady guards for women's wards and maternity sections
2. Install CCTV with strategic placement respecting patient privacy
3. Implement visitor management systems with photo ID requirements
4. Train guards in medical emergency response and patient interaction
5. Coordinate with local police for emergency scenarios

Silbar Security provides specialized hospital security teams trained in healthcare environment protocols.`,
    date: 'May 2026',
    readTime: '6 min',
    category: 'Industry',
  },
  {
    slug: 'industrial-security-factory-guide',
    title: 'Industrial Security in India: Protecting Factories and Manufacturing Plants',
    excerpt: 'Comprehensive guide to industrial security for factories and manufacturing units across India.',
    content: `Industrial facilities face unique security challenges — large perimeters, hazardous materials, shift operations, and high-value inventory.

## Key Industrial Security Risks

- **Theft & Pilferage**: Raw materials, finished goods, and scrap metal are common targets. Internal collusion is a significant factor.
- **Unauthorized Access**: Large perimeters with multiple entry points require robust access control systems.
- **Sabotage**: Disgruntled employees or external actors can damage expensive machinery and equipment.
- **Fire Hazards**: Chemical storage, electrical systems, and welding operations create elevated fire risks.

## Security Solutions for Industrial Facilities

### Perimeter Security
Perimeter walls with anti-climb features, CCTV coverage along all boundary walls, and regular patrol rounds by trained guards.

### Access Control
Biometric entry systems for employees, vehicle inspection protocols for deliveries, and visitor management with photo ID.

### Material Movement Control
Gate passes for all materials leaving the premises, random vehicle inspections, and digital weighbridge records.

### Fire Life Safety
Fire extinguishers at all hazard points, sprinkler systems in storage areas, trained fire wardens on every shift, and regular fire drills.

## Compliance Requirements
Industrial security in India must comply with Factory Act 1948, state-specific rules, and PSARA regulations. Silbar Security provides PSARA-licensed guards trained in industrial security protocols.

Our guards undergo specialized training in material movement control, fire response, and emergency evacuation procedures specific to industrial environments.`,
    date: 'July 2026',
    readTime: '7 min',
    category: 'Industrial',
  },
  {
    slug: 'event-security-management-india',
    title: 'Event Security Management: Complete Guide for Indian Events',
    excerpt: 'From weddings to corporate conferences, learn how professional event security works in India.',
    content: `India's event industry is booming — weddings, concerts, corporate conferences, political rallies, and sports events all require professional security management.

## Types of Event Security

### Wedding Security
Indian weddings are large, multi-day affairs with hundreds or thousands of guests. Security teams manage guest verification, gift handling, crowd control, and VIP protection for the families.

### Corporate Event Security
Product launches, shareholder meetings, and corporate galas require discreet security that doesn't interfere with the guest experience. Plainclothes guards, bag checks, and CCTV coverage are standard.

### Concert & Festival Security
Large gatherings need comprehensive planning — entry management, medical emergency response, fire safety compliance, and crowd flow management.

### Political Rally Security
Political events require close coordination with local police, VIP protection protocols, and thorough venue sweeps before the event.

## Event Security Checklist

- Pre-event venue risk assessment
- Entry point management plan
- Bag checking protocols
- Emergency evacuation routes
- Medical response station
- Fire extinguisher placement
- Communication system for security team

Silbar Security has provided event security for corporate conferences, weddings, and public events across Rajasthan, Delhi, Gujarat, and Maharashtra. Our teams are trained in crowd management and emergency response.`,
    date: 'July 2026',
    readTime: '6 min',
    category: 'Event Security',
  },
  {
    slug: 'vip-protection-services-india',
    title: 'VIP Protection Services in India: Executive Protection Guide',
    excerpt: 'Professional close protection services for business leaders, celebrities, and high-net-worth individuals.',
    content: `VIP protection — also called executive protection or close protection — is a specialized security service that goes far beyond standard manned guarding.

## Who Needs VIP Protection?

- Business leaders and CXOs
- Celebrities and public figures
- High-net-worth individuals
- Political figures and dignitaries
- Witnesses under protection

## Components of VIP Protection

### Advance Security Assessment
Before any movement, the security team conducts route surveys, venue assessments, and threat analysis. Alternative routes and safe rooms are identified.

### Personal Security Officers (PSOs)
Trained PSOs accompany the principal at all times. They are skilled in defensive driving, threat detection, and emergency evacuation.

### Vehicle Security
Armored vehicles, secure convoy protocols, and GPS tracking ensure safe transportation. Drivers are trained in anti-ambush and evasive driving techniques.

### Residence Security
The principal's home is secured with CCTV, access control systems, and 24/7 guard presence. Family members are also included in the security plan.

## PSARA Compliance for VIP Protection
All VIP protection personnel must hold valid PSARA licenses. Silbar Security's close protection teams are PSARA-licensed and trained in advanced security protocols.`,
    date: 'June 2026',
    readTime: '8 min',
    category: 'VIP Protection',
  },
  {
    slug: 'bank-atm-security-india',
    title: 'Bank and ATM Security: Protecting Financial Infrastructure in India',
    excerpt: 'Critical security measures for banks, ATMs, and financial institutions across India.',
    content: `Banks and ATMs are high-risk targets for theft, vandalism, and fraud. Robust security is essential for protecting both assets and customer trust.

## ATM Security Challenges

- **Skimming & Card Cloning**: Criminal gangs install skimming devices on ATMs to capture card data
- **Physical Attacks**: ATM ram-raids and explosive attacks on cash machines
- **Vandalism**: Screen damage, keypad tampering, and random destruction
- **Robbery**: Cash replenishment routes are especially vulnerable

## Bank Branch Security

- Armed guards at all branch entrances
- CCTV coverage of all customer areas, cash counters, and strong rooms
- Panic buttons at teller stations connected to local police
- Biometric access control for staff-only areas
- Cash vaults with time-lock mechanisms and dual-control access

## ATM Security Measures

- CCTV cameras with night vision and remote monitoring
- GPS tracking on all cash replenishment vehicles
- Panic alarm systems connected to control room
- Regular patrol visits by security supervisors
- Incident reporting and documentation protocols

## Regulatory Compliance
Banks must follow RBI guidelines on security, including mandatory CCTV retention periods, guard training requirements, and incident reporting procedures.

Silbar Security provides specialized bank and ATM security services with guards trained in cash handling protocols, incident response, and customer interaction.`,
    date: 'June 2026',
    readTime: '6 min',
    category: 'Banking',
  },
  {
    slug: 'construction-site-security-india',
    title: 'Construction Site Security: Protecting Materials, Equipment, and Workers',
    excerpt: 'How to secure construction sites against theft, vandalism, and safety hazards.',
    content: `Construction sites are uniquely vulnerable — open perimeters, valuable materials and equipment, multiple contractor teams, and extended working hours create complex security challenges.

## Major Risks on Construction Sites

- **Material Theft**: Steel, copper wiring, cement, and plumbing fixtures are high-value targets
- **Equipment Theft**: Power tools, generators, and heavy machinery are frequently stolen
- **Vandalism**: Graffiti, broken windows, and damaged fixtures delay projects and increase costs
- **Trespassing**: Unauthorized individuals on site create safety and liability risks
- **Fire Hazards**: Welding operations, electrical work, and combustible materials

## Construction Security Best Practices

### Perimeter Security
Temporary fencing with anti-climb features, CCTV towers with night vision, and 24/7 guard presence at all entry points.

### Material Management
Secure storage areas with controlled access, material movement registers, and random inspections of vehicles leaving site.

### Worker Access Control
Biometric attendance systems, contractor employee registers, and visitor management protocols.

### Night Security
Night guards with patrol schedules, motion-activated lighting, and remote CCTV monitoring.

## Legal Requirements
The Building and Other Construction Workers Act 1996 mandates safety and security measures. Silbar Security provides trained construction site security personnel across India.`,
    date: 'June 2026',
    readTime: '7 min',
    category: 'Construction',
  },
  {
    slug: 'school-college-security-india',
    title: 'School and College Security: Protecting Students and Staff in India',
    excerpt: 'Essential security measures for educational institutions — from entry management to emergency response.',
    content: `School and college campuses must balance open, welcoming environments with robust security measures. Parents entrust institutions with their children's safety, making security a top priority.

## Key Security Concerns for Educational Institutions

- **Unauthorized Entry**: Strangers entering campus without screening
- **Student Safety**: Bullying, harassment, and physical altercations
- **Child Abduction**: Stranger danger and custody disputes near school premises
- **Emergency Response**: Fire, earthquake, or medical emergencies
- **After-Hours Security**: Evening events, hostel security, and campus patrol

## Recommended Security Measures

### Entry Management
Single entry point during school hours, visitor screening with photo ID verification, parent sign-in/sign-out registers.

### CCTV Coverage
Cameras at all entry/exit points, corridors, playground areas (excluding sensitive areas like changing rooms and toilets for privacy compliance).

### Lady Security Guards
Lady guards are essential for girls' schools and colleges. They handle search procedures, parent interaction, and women's hostel security.

### Emergency Drills
Regular fire drills, earthquake evacuation drills, and lockdown drills for security threats.

### Student Transportation Security
GPS tracking on school buses, attendant on every bus, and parent notification systems for pickup/drop-off.

## Regulatory Framework
The National Commission for Protection of Child Rights (NCPCR) has issued guidelines for school safety. Silbar Security provides PSARA-licensed guards trained in child protection protocols.`,
    date: 'May 2026',
    readTime: '7 min',
    category: 'Education',
  },
  {
    slug: 'shopping-mall-security',
    title: 'Shopping Mall Security: Crowd Management and Retail Protection',
    excerpt: 'Comprehensive security strategies for shopping malls, retail stores, and commercial complexes.',
    content: `Shopping malls are complex security environments — thousands of visitors daily, multiple entry points, diverse retail outlets, food courts, and entertainment zones.

## Mall Security Challenges

- **Crowd Management**: Weekend and festival crowds require careful planning
- **Shoplifting**: Retail theft is a persistent challenge across all store types
- **Vehicle Security**: Large parking areas need monitoring and patrol
- **Fire Safety**: Food courts, crowded corridors, and storage areas
- **Emergency Response**: Medical incidents, fires, or security threats

## Mall Security Components

### Entry and Access Control
Bag checking stations at all entrances, metal detectors during high-alert periods, and vehicle inspection at parking entry.

### CCTV Control Room
Central monitoring with hundreds of cameras covering all public areas, corridors, parking, and service areas.

### Foot Patrol
Uniformed guards patrol all floors, with radio communication to the control room.

### Fire Life Safety
Fire extinguishers, sprinkler systems, smoke detectors, and trained fire marshals on every floor.

### Lost Child Protocol
Designated safe zones and trained staff for handling lost children.

Silbar Security provides mall security services with trained guards, CCTV operators, and fire safety personnel.`,
    date: 'May 2026',
    readTime: '6 min',
    category: 'Retail',
  },
  {
    slug: 'fire-life-safety-management',
    title: 'Fire Life Safety Management: Prevention, Detection, and Response',
    excerpt: 'Essential fire life safety measures every Indian business needs — from prevention to emergency evacuation.',
    content: `Fire life safety (FLS) is a critical component of any comprehensive security strategy. Fires cause thousands of deaths and crores in property damage annually in India.

## Fire Prevention

### Electrical Safety
Short circuits are the leading cause of fires in Indian buildings. Regular electrical audits, proper wiring, and overload protection are essential.

### Housekeeping
Clutter-free workspaces, proper waste disposal, and storage of flammable materials in approved containers prevent many fires.

### Hot Work Permits
Welding, grinding, and other spark-producing activities require fire watch personnel and fire extinguisher readiness.

## Fire Detection Systems

- Smoke detectors in all zones
- Heat detectors in kitchens and boiler rooms
- Manual call points at all exits
- Integrated fire alarm panel with building management system

## Fire Suppression Systems

- Portable fire extinguishers (ABC, CO2, foam types)
- Sprinkler systems in all occupied areas
- Kitchen suppression systems in food preparation areas
- Hose reels and fire hydrants on every floor

## Emergency Evacuation

- Clearly marked evacuation routes with illuminated exit signs
- Assembly points outside the building
- Trained fire wardens for each floor
- Regular fire drills every 6 months
- Special provisions for disabled individuals

## Legal Compliance
The National Building Code 2016 and state fire services acts mandate fire safety measures. Silbar Security provides FLS-trained guards and fire safety consulting across India.`,
    date: 'May 2026',
    readTime: '8 min',
    category: 'Fire Safety',
  },
  {
    slug: 'why-247-security-important',
    title: 'Why 24/7 Security Matters: The Cost of Gaps in Coverage',
    excerpt: 'Why gaps in security coverage cost businesses more than continuous protection.',
    content: `Many businesses ask: do we really need security guards 24 hours a day? The answer depends on risk assessment — but gaps in coverage often cost more than continuous protection.

## The Cost of Security Gaps

### Theft and Loss
Most thefts occur during night shifts, weekends, and holidays when security presence is minimal. A single incident can cost more than months of guard service.

### Liability Risks
If an incident occurs during an uncovered period, the business owner bears full liability. Insurance claims may be denied if security protocols were not maintained.

### Emergency Response
Fires, medical emergencies, and security threats don't follow business hours. 24/7 guards provide immediate response capability.

## When 24/7 Security is Essential

- Manufacturing plants with shift operations
- Hospitals operating 24 hours
- Hotels and hospitality venues
- Warehouses and logistics centers
- Residential societies and apartment complexes
- IT parks and corporate campuses

## Cost-Effective Alternatives

If full 24/7 guard deployment isn't feasible, consider:
- CCTV monitoring with remote response
- Night patrol services on scheduled rounds
- Alarm systems connected to control room
- Weekend-only guard deployment

Silbar Security offers flexible deployment options — full 24/7, day-only, night-only, or weekend coverage — customized to your budget and risk profile.`,
    date: 'April 2026',
    readTime: '5 min',
    category: 'Security Basics',
  },
  {
    slug: 'corporate-office-security',
    title: 'Corporate Office Security: Best Practices for Modern Workplaces',
    excerpt: 'How to secure your corporate office without compromising employee experience and productivity.',
    content: `Modern corporate offices need security that is visible enough to deter threats but discreet enough to not disrupt work. Here's how to achieve that balance.

## Reception Security

The reception desk is the first line of defense. Professional security personnel manage visitor check-in, issue temporary passes, and verify appointments.

## Access Control Systems

- Biometric entry for employees
- RFID cards for contractors and temporary staff
- Visitor management software with photo capture
- Turnstile gates at main entrances

## CCTV Strategy

Cameras should cover:
- All entry and exit points
- Reception and waiting areas
- Server rooms and sensitive areas
- Parking and loading bays

Avoid cameras in washrooms, changing rooms, and private office cabins.

## IT Security Integration

Physical security must coordinate with cybersecurity:
- Server room access restricted to authorized IT staff
- CCTV retention for forensic analysis in case of data breaches
- Visitor policies for electronic devices

## After-Hours Security

- Night guards for patrol and monitoring
- After-hours access requires prior approval
- Cleaning and maintenance staff must have ID checks

Silbar Security provides corporate security services for offices in Jaipur, Delhi, Mumbai, and Bengaluru, with guards trained in professional reception protocols and IT security awareness.`,
    date: 'April 2026',
    readTime: '6 min',
    category: 'Corporate',
  },
  {
    slug: 'security-guard-license-procedure',
    title: 'Security Guard License in India: PSARA License Procedure Explained',
    excerpt: 'Step-by-step guide to getting a PSARA license for security agencies and guards in India.',
    content: `Understanding the PSARA licensing procedure is essential for any security agency operating in India. Here's a complete guide.

## PSARA License for Security Agencies

### Eligibility
- Company registered under Companies Act or partnership firm
- Directors/shareholders must be Indian citizens
- No criminal convictions for directors
- Minimum capital requirements (varies by state)

### Application Process

1. **State Application**: Apply to the Controlling Authority of the state(s) where you operate
2. **Documentation**: Company registration, director IDs, address proof, police clearance certificates
3. **Verification**: Police verification of all directors and key personnel
4. **Training Certification**: Proof of training infrastructure and curriculum
5. **License Fee**: Pay the prescribed fee for each state

### Timeline
The PSARA application process typically takes 3-6 months from application to license issuance.

## PSARA License for Security Guards

### Eligibility
- Indian citizen aged 18-65
- Minimum Class 8 education (varies by state)
- Physical fitness certification
- No criminal record

### Training Requirements

PSARA mandates 160 hours of training:
- **100 hours classroom**: Legal aspects, access control, report writing, fire safety, first aid
- **60 hours field training**: Practical deployment, weapon handling, patrol procedures

### License Validity
PSARA licenses are typically valid for 5 years, renewable upon application.

Silbar Security holds valid PSARA licenses across multiple states and all 7,000+ guards are fully PSARA-trained and licensed.`,
    date: 'April 2026',
    readTime: '7 min',
    category: 'Compliance',
  },
  {
    slug: 'residential-security-services',
    title: 'Residential Security: Protecting Homes and Apartment Complexes',
    excerpt: 'Security solutions for residential societies, gated communities, and individual homes.',
    content: `Residential security is one of the fastest-growing segments of the security industry in India. Apartment complexes, gated communities, and individual homes all need professional protection.

## Apartment Complex Security

### Gate Management
Round-the-clock guard presence at main gates, vehicle inspection protocols, and visitor registers.

### CCTV Coverage
Cameras at entry/exit points, parking areas, corridors, and common areas. Privacy considerations for residents.

### Night Patrol
Night guards conduct scheduled patrols of the entire complex, checking for unlocked doors, suspicious activity, and safety hazards.

### Emergency Response
Guards trained in fire response, medical emergency, and coordination with local police.

## Gated Community Security

- Multiple entry points with controlled access
- Resident RFID stickers for vehicles
- Domestic staff registration and ID cards
- CCTV monitoring at all entry points
- 24/7 security control room

## Individual Home Security

For individual homes, options include:
- Residential guards for 24/7 or night-only duty
- CCTV systems with mobile app monitoring
- Smart door locks and video doorbells
- Alarm systems with remote monitoring

Silbar Security provides residential security services across Jaipur, Delhi, and other major cities with guards trained in resident interaction and community safety protocols.`,
    date: 'April 2026',
    readTime: '6 min',
    category: 'Residential',
  },
  {
    slug: 'security-guard-training-standards',
    title: 'Security Guard Training Standards in India: PSARA Curriculum Explained',
    excerpt: 'What goes into professional security guard training? The complete PSARA training curriculum breakdown.',
    content: `Security guard training in India is governed by PSARA 2005, which mandates a comprehensive 160-hour training program. Here's what the curriculum covers.

## PSARA Training Curriculum

### Module 1: Legal Framework (20 hours)
- PSARA 2005 Act and Rules
- Indian Penal Code basics
- Criminal Procedure Code relevant sections
- Evidence Act fundamentals
- Rights and duties of security guards

### Module 2: Access Control (20 hours)
- Visitor management procedures
- Vehicle inspection protocols
- Bag checking techniques
- Identification document verification
- Entry register management

### Module 3: Fire Safety (20 hours)
- Fire prevention principles
- Types of fire extinguishers
- Fire extinguisher operation
- Evacuation procedures
- Fire drill coordination

### Module 4: First Aid & Medical Response (15 hours)
- Basic first aid
- CPR and rescue breathing
- Handling medical emergencies
- Coordination with ambulance services

### Module 5: Communication & Report Writing (15 hours)
- Radio communication protocols
- Incident report writing
- Daily log maintenance
- Verbal de-escalation techniques

### Module 6: Patrol Procedures (20 hours)
- Patrol routes and scheduling
- Observation techniques
- Suspicious behavior detection
- Night patrol best practices

### Module 7: Weapon Training (15 hours) — for armed guards
- Weapon safety and handling
- Firing range practice
- Weapon maintenance
- Use of force guidelines

### Module 8: Customer Service (15 hours)
- Professional demeanor
- Communication with clients and visitors
- Handling complaints
- Emergency response coordination

### Field Training (60 hours)
Practical deployment under supervision of experienced guards.

Silbar Security's training program exceeds PSARA requirements, with additional modules on technology, cybersecurity awareness, and specialized industry protocols.`,
    date: 'March 2026',
    readTime: '8 min',
    category: 'Training',
  },
  {
    slug: 'hotel-security-management',
    title: 'Hotel Security Management: Guest Safety and Property Protection',
    excerpt: 'Complete guide to hotel security — from guest safety to crowd management in hospitality venues.',
    content: `Hotels in India face unique security challenges — 24/7 operations, international guests, multiple entry points, restaurants, banquet halls, and room service create complex security requirements.

## Hotel Security Risks

- **Unauthorized Room Access**: Guest rooms must have strict access control
- **Theft**: In-room theft, luggage theft, and property loss
- **Solicitation**: Unauthorized visitors and solicitors entering the property
- **Crowd Management**: Banquet events, weddings, and conferences
- **Kitchen & Back Area Security**: Food safety and staff access control

## Hotel Security Measures

### Front Desk Security
- Guest identity verification at check-in
- Visitor policy requiring guest confirmation
- Room key management protocols

### CCTV Coverage
- Lobby, corridors, parking, restaurant, and banquet areas
- Privacy considerations for guest room floors
- 24/7 monitoring by trained operators

### Baggage Handling
- Baggage storage security
- Bell staff training on theft prevention
- Lost and found protocols

### Event Security
Weddings and conferences in hotel banquet halls require:
- Guest verification at event entry
- Gift handling for wedding events
- Coordinated parking management

Silbar Security provides hotel security services with guards trained in hospitality protocols, guest interaction, and emergency response.`,
    date: 'March 2026',
    readTime: '7 min',
    category: 'Hospitality',
  },
]

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = POSTS.find((p) => p.slug === slug)
  if (!post) return {}

  return {
    title: `${post.title} | Silbar Security Blog`,
    description: post.excerpt,
    ...ogMetadata(`${post.title} | Silbar Security Blog`, post.excerpt, `/blog/${slug}`),
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'Silbar Security Services Pvt. Ltd.' },
    publisher: { '@type': 'Organization', name: 'Silbar Security Services' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main className="blog-page" id="main-content">
        <section className="page-hero page-hero--short">
          <ScrollReveal>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/" className="breadcrumb__link">Home</Link>
              <span className="breadcrumb__sep">›</span>
              <Link href="/blog" className="breadcrumb__link">Blog</Link>
              <span className="breadcrumb__sep">›</span>
              <span className="breadcrumb__current">{post.title}</span>
            </nav>
            <span className="contact-eyebrow">{post.category} — {post.date} · {post.readTime}</span>
            <h1 className="contact-title contact-title--blog">
              <SplitTextReveal text={post.title} mode="words" />
            </h1>
          </ScrollReveal>
        </section>

        <section className="legal-content glass-panel legal-content--blog">
          <ScrollReveal>
            {post.content.split('\n').map((line, i) => {
            if (line.startsWith('## ')) {
              return <h2 key={i}>{line.replace('## ', '')}</h2>
            }
            if (line.startsWith('### ')) {
              return <h3 key={i}>{line.replace('### ', '')}</h3>
            }
            if (line.match(/^\d+\.\s/)) {
              return <li key={i}>{line}</li>
            }
            if (line.startsWith('- ')) {
              return <li key={i} className="legal-content__bullet">{line.replace('- ', '')}</li>
            }
            if (line.trim() === '') return <br key={i} />
            return <p key={i}>{line}</p>
          })}
          </ScrollReveal>
        </section>

        <section className="service-detail-bottom-cta">
          <ScrollReveal>
            <h2 className="service-detail-bottom-cta__title">Need Expert Security Advice?</h2>
            <p className="service-detail-bottom-cta__sub">
              Our security consultants are ready to help. Call us for a free facility assessment.
            </p>
            <div className="service-detail-ctas service-detail-ctas--centered">
              <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--primary">
                <Phone size={16} /> Call {CONTACT.phone}
              </a>
              <a
                href={CONTACT.whatsapp.url}
                className="service-detail-cta service-detail-cta--secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us
              </a>
            </div>
          </ScrollReveal>
        </section>
      </main>
    </>
  )
}