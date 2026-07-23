export interface CaseStudy {
  slug: string
  title: string
  client: string
  industry: string
  location: string
  duration: string
  challenge: string
  solution: string
  results: string[]
  testimonials?: { quote: string; name: string; role: string }[]
  services: string[]
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'automobile-plant-security-rajasthan',
    title: 'Manufacturing Plant Security Overhaul',
    client: 'Leading Automobile Manufacturer',
    industry: 'Manufacturing',
    location: 'Rajasthan',
    duration: '18 months',
    services: ['manned-guarding', 'industrial-security', 'electronic-surveillance', 'risk-assessment'],
    challenge: `<h3>Unchecked Losses Across Three Factory Units</h3>
<p>The client operated three adjacent manufacturing units in Rajasthan's industrial belt, producing auto components for both domestic OEMs and export markets. Despite having a security contract with a previous vendor, the plant had been experiencing persistent material theft — copper wiring, aluminium scrap, and finished inventory worth over ₹85 lakhs had gone missing in the preceding financial year alone. Internal investigations pointed to collusion between contract guards and truck operators at the material dispatch gates.</p>
<h3>Broken Access Control and Shift Gaps</h3>
<p>The factory perimeter spanned 22 kilometres, with six entry points. Access control was limited to manual logbooks at two main gates; the remaining four gates were either unmanned or staffed by a single guard with no vehicle search protocol. Visitor verification was non-existent — anyone claiming vendor status could walk in. Night shifts operated with skeleton coverage, and three separate security incidents involving unauthorised entry into the tooling section had been recorded but never acted upon.</p>
<h3>High Attrition and Low Morale</h3>
<p>The previous vendor's guards had not received salary increases in three years. Attrition was running at 45% annually, meaning the client saw a new guard every few weeks. Training records were fabricated for audit purposes, and guards on site could not demonstrate basic knowledge of fire extinguisher operation or first aid. The client's internal audit flagged 37 non-compliances across the three units, including missing PSARA documentation and expired EPF remittances.</p>`,
    solution: `<h3>Comprehensive Risk Assessment and Site-Mapped Deployment</h3>
<p>Silbar Security Services Pvt. Ltd. began with a two-week risk assessment across all three units. Our team mapped every entry and exit point, analysed material movement patterns across shifts, reviewed existing CCTV coverage gaps, and interviewed plant supervisors to understand pain points. The assessment report identified 14 critical vulnerabilities, including the four unguarded gates, unsecured scrap yards, and the absence of material gate pass systems. Based on this, we designed a three-zone security architecture with dedicated guard posts, roving patrols, and CCTV integration.</p>
<h3>Deployment of 135 Trained Personnel with Modern Protocols</h3>
<p>We deployed 135 security personnel across the three units — including 14 supervisors, 8 lady guards for the female worker entry points, and a dedicated field officer per shift. Each guard completed a seven-day induction covering access control, vehicle search procedure, material gate pass verification, and fire safety. We installed a biometric attendance system linked directly to our central control room to prevent buddy punching. Gate management was overhauled: every vehicle entering or leaving is now logged through our Material Gate Pass system with photographs, weight slips, and supervisor sign-off.</p>
<h3>Technology-Enabled Monitoring and Compliance Assurance</h3>
<p>We integrated 48 new CCTV cameras with the client's existing system, covering all blind spots identified in the assessment. A dedicated monitor wall was set up in the plant security office. Our remote monitoring centre in Jaipur provides 24/7 oversight of critical feeds. On the compliance front, we regularised all statutory documentation — PSARA licensing for Rajasthan, EPF/ESIC registration for all deployed staff, and weekly training records. Monthly audit reports are submitted to the plant head with incident summaries, patrol compliance scores, and improvement recommendations.</p>`,
    results: [
      '70% reduction in material theft within the first six months',
      'Zero security breaches in the subsequent 12-month period',
      '25% cost optimisation vs previous vendor through consolidated deployment',
      '100% statutory compliance achieved across all three units',
      'Guard attrition reduced to under 12% annually through better wages, accommodation, and career progression',
      'All 37 previous audit non-compliances closed within 90 days',
    ],
    testimonials: [
      {
        quote: 'Silbar transformed our security from a constant worry into a reliable operation. The theft numbers that were bleeding our bottom line have completely stopped. Their quarterly business reviews keep our leadership team informed and confident.',
        name: 'Vikram Rathore',
        role: 'Plant Director, Automobile Manufacturing Division',
      },
    ],
  },
  {
    slug: 'hospital-chain-security-delhi',
    title: 'Hospital Chain Security Standardization',
    client: 'Multi-Specialty Hospital Chain',
    industry: 'Hospitals',
    location: 'Delhi NCR',
    duration: '24 months',
    services: ['manned-guarding', 'hospital-security', 'electronic-surveillance', 'kyc-background-checks'],
    challenge: `<h3>Inconsistent Security Across Four Hospital Locations</h3>
<p>The client operated four multi-specialty hospitals across Delhi NCR with a combined capacity of over 1,200 beds. Each hospital managed its security independently — different vendors, different SOPs, and inconsistent quality. The flagship hospital in South Delhi had a well-trained team with CCTV coverage, while the Ghaziabad facility relied on two retired watchmen with no formal training. This disparity created significant risk: a patient safety incident at any one location could damage the brand reputation of the entire chain.</p>
<h3>Pharmacy Theft and Emergency Response Gaps</h3>
<p>Pharmacy inventory discrepancies were reported across three of the four locations, with controlled substances disappearing without documentation. The hospital administration suspected internal collusion but lacked a verification process. Meanwhile, emergency response times varied wildly — the East Delhi hospital took over 18 minutes to respond to a code-blue activation in the parking area, while the flagship location averaged under 4 minutes. There was no standardised incident reporting format, no cross-location coordination, and no central oversight of security operations.</p>
<h3>Crowd Management and Patient Safety Concerns</h3>
<p>OPD hours turned hospital entrances into chaotic zones. Unauthorised vendor entry was rampant — touts and medical representatives freely accessed patient wards. Visitor management was paper-based and unverified. Female staff working night shifts expressed safety concerns about poorly lit parking areas and unmonitored stairwells. The hospital chain was preparing for a JCI accreditation audit, and security compliance was identified as a significant gap area requiring immediate remediation.</p>`,
    solution: `<h3>Standardised SOPs and Centralised Command Structure</h3>
<p>Silbar Security Services Pvt. Ltd. developed a comprehensive Hospital Security Manual covering access control, visitor management, pharmacy security, emergency response, and incident reporting — standardised across all four locations. A central security manager was appointed to oversee all sites, with location-specific security supervisors reporting into the central command. Monthly cross-location audits were instituted, with scores published on a dashboard visible to the hospital COO.</p>
<h3>Specialised Hospital Security Training and Deployment</h3>
<p>We deployed 87 security personnel across the four hospitals, including 12 lady guards, 6 fire wardens, and 4 dedicated pharmacy security officers. All personnel completed a five-day hospital security module covering patient interaction protocols, emergency code response, fire safety, controlled substance handling, and de-escalation techniques. Guards assigned to emergency and ICU areas received additional training in managing distressed family members and coordinating with medical staff during critical incidents.</p>
<h3>Technology Integration and KYC Verification</h3>
<p>We implemented a unified access control system across all four locations with biometric verification for staff, QR-code-based visitor passes, and vehicle RFID tags for regular vendors. CCTV systems were upgraded with 92 new cameras covering previously blind spots — parking areas, stairwells, pharmacy stores, and medicine preparation zones. A centralised monitoring console at the flagship hospital provides real-time feeds from all locations. Additionally, we conducted KYC background verification of all hospital support staff — 340 existing housekeeping, dietary, and administrative personnel — identifying and removing six individuals with adverse police records.</p>`,
    results: [
      'Standardised security protocols operating uniformly across all 4 hospital locations',
      'Patient satisfaction score improved by 35% in post-deployment surveys',
      'Zero pharmacy theft incidents in 18 months following deployment',
      'Successful JCI audit compliance achieved with zero security-related non-conformances',
      'Emergency response time standardised to under 6 minutes across all sites',
      '340 support staff KYC verified; 6 individuals with adverse records removed from premises',
    ],
    testimonials: [
      {
        quote: 'Silbar brought a level of professionalism and consistency we hadn\u2019t experienced before. The JCI audit team specifically commended our security documentation and emergency response protocols. Our patients and staff feel safer, and that is priceless.',
        name: 'Dr. Neelam Saxena',
        role: 'Chief Hospital Administrator',
      },
    ],
  },
  {
    slug: 'it-park-security-bengaluru',
    title: 'IT Park Comprehensive Security',
    client: 'Major IT Park',
    industry: 'IT Parks',
    location: 'Bengaluru',
    duration: '24 months',
    services: ['manned-guarding', 'corporate-security', 'electronic-surveillance', 'facility-management'],
    challenge: `<h3>Managing Access for a 15,000-Occupant Tech Ecosystem</h3>
<p>The IT park in Bengaluru's Whitefield corridor housed 14 buildings across 35 acres, occupied by 28 tenant companies including Fortune 500 technology firms, startups, and shared workspace providers. The daily occupant count exceeded 15,000, with an additional 4,000 visitors, vendors, and service staff passing through. The existing security setup was fragmented — each building had its own guard deployment, inconsistent access protocols, and no unified visitor management system. Tenant companies complained about long entry queues during peak hours and security gaps after 9 PM.</p>
<h3>After-Hours Vulnerability and Parking Security</h3>
<p>The park's multi-level parking facility, with capacity for 3,500 vehicles, was a particular concern. Several incidents of vehicle break-ins and unauthorised entry into the parking area had been reported over the preceding year. The stairwells and service corridors lacked surveillance coverage. Night-shift employees of IT companies reported feeling unsafe walking from buildings to parking areas after 11 PM. The park management was also dealing with unauthorised hawkers and touts accessing tenant floors by posing as delivery personnel.</p>
<h3>Lack of Unified Security Governance</h3>
<p>There was no single security operations centre overseeing the entire park. Each building's guards operated independently, incident reporting was inconsistent, and crisis response coordination between buildings did not exist. The park's emergency evacuation plan had never been tested in a full drill. Tenant satisfaction surveys consistently ranked security as a top-three concern, and two major tenants had issued notices expressing intent to relocate if security infrastructure did not improve.</p>`,
    solution: `<h3>Unified Security Operations Centre with Command-and-Control Architecture</h3>
<p>Silbar Security Services Pvt. Ltd. established a central Security Operations Centre (SOC) at the park's administration building, equipped with a video wall displaying feeds from 186 CCTV cameras across the entire campus. The SOC operates 24/7 with dedicated monitoring staff, radio communication with all guard posts, and direct escalation to the park management and local police through a dedicated liaison channel. A campus-wide incident reporting protocol ensures that any event — from a medical emergency to a suspicious vehicle — is logged, escalated, and resolved with a documented trail.</p>
<h3>Integrated Access Control and Visitor Management Platform</h3>
<p>We deployed a unified access control system across all 14 buildings with biometric authentication for employees and a QR-code-based visitor management platform. Visitors pre-register through a web portal, receive a time-bound QR code, and check in at the gate using a self-service kiosk. Employee access cards were replaced with biometric readers at all building entry points, integrated with tenant HR systems for instant onboarding and offboarding. Delivery personnel are verified through a whitelist system, and all vendor vehicles carry RFID tags for automated gate entry.</p>
<h3>Enhanced Perimeter and Parking Security with Mobile Patrols</h3>
<p>Perimeter security was upgraded with thermal cameras along the boundary wall and motion-sensor lighting in all blind spots. The parking facility received dedicated CCTV coverage with licence-plate recognition cameras at entry and exit points. A mobile patrol team on golf carts conducts randomised rounds of the parking area and service corridors between 8 PM and 8 AM, with GPS-tracked patrol logs. Security personnel at parking and building entrances were trained in customer-service-oriented interaction to maintain a professional, welcoming demeanour while enforcing access protocols.</p>`,
    results: [
      'Seamless security operations for 15,000+ daily occupants across the campus',
      '100% tenant satisfaction score achieved in the annual security audit survey',
      '95% reduction in unauthorised access incidents across the campus',
      'Integrated security platform connected with 28 tenant access control systems',
      'Peak-hour entry wait times reduced from 12 minutes to under 90 seconds',
      'Zero vehicle break-in incidents reported in the 18 months post-deployment',
    ],
    testimonials: [
      {
        quote: 'The SOC is a game-changer. For the first time, we have real-time visibility into everything happening across the campus. Tenant confidence has improved measurably, and our retention discussions no longer feature security as a pain point.',
        name: 'Arun Nambiar',
        role: 'Facility Director, IT Park Management',
      },
    ],
  },
  {
    slug: 'retail-chain-loss-prevention',
    title: 'Retail Chain Loss Prevention',
    client: 'National Retail Chain',
    industry: 'Retail',
    location: 'Pan India (45 stores)',
    duration: '18 months',
    services: ['manned-guarding', 'retail-security', 'electronic-surveillance', 'kyc-background-checks'],
    challenge: `<h3>Shrinkage Rates Impacting Margins Across 45 Stores</h3>
<p>The client, a national retail chain operating 45 stores across 12 states, was grappling with inventory shrinkage averaging 3.2% of revenue — nearly double the industry benchmark. The annual loss exceeded ₹4.2 crores. Store-level audits revealed that shrinkage was not limited to shoplifting but was evenly distributed among external theft, internal pilferage, vendor fraud, and administrative errors. The Delhi flagship store alone reported a 4.8% shrinkage rate, indicating systemic control failures rather than isolated incidents.</p>
<h3>Inconsistent Security Practices and Cash Handling Gaps</h3>
<p>Each store operated with its own security protocols. Some stores had CCTV systems with non-functional cameras; others had guards who were not trained in loss prevention. Cash handling procedures varied widely — some stores used drop safes with dual control, while others kept day-end cash in desk drawers until the next morning. A surprise audit at three stores revealed that cash discrepancies of up to ₹12,000 per week had gone unnoticed by store managers. Background verification of store staff was not being conducted systematically, and several cases of employee collusion with external vendors had been detected but not prevented.</p>
<h3>Shoplifting and Vendor Fraud</h3>
<p>Shoplifting was a persistent problem, particularly in high-footfall stores located in Tier-1 cities. The store security teams lacked training in identifying suspicious behaviour, approaching potential shoplifters, or handling apprehensions without legal exposure. Vendor delivery fraud was another emerging concern — suppliers were colluding with store receiving staff to invoice for quantities not actually delivered. A pilot audit at five stores found that 8% of vendor invoices had discrepancies that were not caught during goods receipt.</p>`,
    solution: `<h3>Multi-Layered Loss Prevention Strategy</h3>
<p>Silbar Security Services Pvt. Ltd. designed a three-tier loss prevention framework: uniformed visible deterrence at store entry and exit points, plain-clothes loss prevention officers on the sales floor, and behind-the-scenes audit controls focused on cash management and vendor receipts. A National Loss Prevention Manager was appointed to oversee the program, with regional supervisors conducting unannounced store audits on a rotating schedule. Each store received a customised security manual tailored to its layout, product mix, and footfall patterns.</p>
<h3>Standardised Deployment with Technology Integration</h3>
<p>We deployed a total of 128 security personnel across the chain, including 32 plain-clothes loss prevention officers and 8 female guards for women's apparel sections. All point-of-sale areas were covered by CCTV with transaction-to-video synchronisation, enabling post-event review of suspicious transactions. Cash management was standardised with dual-control drop safes and scheduled CIT pickups. Electronic article surveillance (EAS) tags were installed on high-theft product categories across all stores, with alarm systems integrated into the guard response protocol.</p>
<h3>Staff Vetting and Vendor Verification Program</h3>
<p>We conducted comprehensive KYC background verification of all 1,450 existing store employees across the chain, including criminal record checks and address verification. Six employees with prior fraud convictions were identified and processed as per company policy. A vendor verification program was instituted, requiring all regular suppliers to register with Silbar's verification desk, including delivery personnel photograph and ID validation. Goods receipt procedures were tightened with mandatory weight checks, count verification, and supervisor sign-off before entry into inventory systems.</p>`,
    results: [
      'Inventory shrinkage reduced from 3.2% to 0.8% of revenue within 12 months',
      'Shoplifting incidents decreased by 60% year-on-year across the chain',
      'Cash handling discrepancies eliminated entirely through standardised procedures',
      'Unified loss prevention protocol implemented and operational across all 45 stores',
      'Background verification completed for 1,450 employees; 6 adverse records identified and actioned',
      'Vendor invoice discrepancy rate dropped from 8% to under 0.5% through tightened goods receipt controls',
    ],
    testimonials: [
      {
        quote: 'Silbar\u2019s loss prevention program delivered results we could see in our P&L from the first quarter itself. The shrinkage drop from 3.2% to 0.8% represents crores in recovered margin. Their operational rigour and reporting give us confidence that the gains are sustainable.',
        name: 'Rajesh Mehta',
        role: 'Chief Operating Officer, Retail Chain',
      },
    ],
  },
  {
    slug: 'warehouse-security-gujarat',
    title: 'Warehouse Complex Security',
    client: 'Logistics Infrastructure Developer',
    industry: 'Logistics',
    location: 'Gujarat',
    duration: '18 months',
    services: ['logistics-security', 'industrial-security', 'fire-life-safety', 'mobile-patrol-quick-response'],
    challenge: `<h3>Securing a Multi-Warehouse Logistics Hub</h3>
<p>The client had developed a 45-acre logistics park in Gujarat's industrial corridor, comprising seven independent warehouses leased to e-commerce companies, FMCG distributors, and cold storage operators. The park operated 24/7 with staggered truck movements exceeding 200 vehicles per day. Security was being managed through a patchwork arrangement — each warehouse tenant had its own security contractor, resulting in inconsistent standards, uncoordinated patrols, and gaps in coverage during shift changeovers. The common areas — internal roads, parking yards, and the main entry gate — fell through the cracks.</p>
<h3>Inventory Theft and Insurance Concerns</h3>
<p>Three incidents of inventory theft had been reported in the preceding six months, totalling losses of approximately ₹18 lakhs. Investigations were hampered by the absence of centralised CCTV recording and lack of vehicle movement logs. The insurance provider had issued a notice threatening to increase the premium by 22% unless a comprehensive security and fire safety system was implemented. Additionally, the fire NOC for the park was pending renewal, as the previous vendor had not maintained fire extinguisher records or conducted the mandatory quarterly fire drills.</p>
<h3>Vehicle Management and Access Coordination</h3>
<p>With 200+ trucks entering and exiting daily, the single entry point frequently became a bottleneck. There was no vehicle booking system — trucks would queue on the highway, causing traffic complaints from the local municipality. Once inside, there was no system to track where a truck was and how long it had been on site. Unauthorised parking in fire lanes was common, and there was no enforcement mechanism. The absence of a central security command meant that an incident in one warehouse could go unnoticed by other tenants for hours.</p>`,
    solution: `<h3>Integrated Security Command Centre with Park-Wide Coverage</h3>
<p>Silbar Security Services Pvt. Ltd. established a Security Command Centre at the park entrance, equipped with CCTV monitoring for 64 cameras covering the main gate, internal roads, parking yards, and warehouse perimeters. The centre operates 24/7 with two dedicated monitoring staff per shift, radio communication with all field personnel, and a direct hotline to the nearest police station and fire station. A park-wide incident response protocol ensures that any security or safety event is communicated to all tenants within minutes.</p>
<h3>Comprehensive Guard Deployment and Patrol Management</h3>
<p>We deployed 42 security personnel including a park security manager, 4 supervisors, 32 guards across three shifts, and 2 fire wardens. Guards posted at the main gate manage vehicle entry through a digital logging system that captures vehicle number, driver details, goods description, and expected exit time. A mobile patrol unit on a dedicated vehicle conducts randomised rounds of the perimeter and internal roads every 90 minutes, with GPS-tracked logs submitted digitally to the command centre. Each warehouse has a designated security point with intercom connectivity to the command centre.</p>
<h3>Fire Safety Compliance and Insurance-Linked Reporting</h3>
<p>Our fire wardens conducted a comprehensive fire risk audit, replacing 38 expired fire extinguishers, installing new fire alarm pull stations in common areas, and marking all fire lanes with painted curbs and signage. Monthly fire drills are conducted with tenant participation, and quarterly reports are submitted to the insurance provider demonstrating compliance. The fire NOC renewal was successfully completed within 60 days of engagement. Regular fire warden patrols check extinguisher pressure, emergency exit accessibility, and fire lane obstructions, with violations reported to the park management within the same shift.</p>`,
    results: [
      'Zero inventory theft incidents recorded in 18 months since deployment',
      'Fire safety compliance achieved with all statutory NOCs renewed and verified',
      '24/7 monitoring with GPS-tracked mobile patrols operating on randomised schedules',
      'Insurance premium reduced by 15% following comprehensive security and fire safety audit',
      '200+ vehicles per day managed through digital gate with average processing time under 3 minutes',
      'Emergency response drills conducted monthly with 100% tenant participation rate',
    ],
    testimonials: [
      {
        quote: 'Before Silbar, security was a constant headache — different vendors, no coordination, and insurance was getting expensive. The command centre changed everything. We now have a single point of control, our insurance costs are down, and our tenants finally feel secure.',
        name: 'Suresh Patel',
        role: 'Park Director, Logistics Infrastructure Developer',
      },
    ],
  },
  {
    slug: 'bank-atm-security-madhyapradesh',
    title: 'Bank & ATM Security Network',
    client: 'Nationalized Bank',
    industry: 'Banks',
    location: 'Madhya Pradesh',
    duration: '24 months',
    services: ['bank-atm-security', 'armed-security', 'cash-van-security', 'electronic-surveillance'],
    challenge: `<h3>Securing a Distributed Banking Network Across Urban and Rural Madhya Pradesh</h3>
<p>The client, a nationalised bank with extensive presence in Madhya Pradesh, operated 38 branches and 152 ATMs spread across the state — from Bhopal and Indore to remote locations in Bundelkhand and Nimar. The previous security vendor had been terminated due to non-compliance with RBI security guidelines, leaving the bank with a fragmented emergency arrangement. ATM vandalism was a recurring problem, particularly in rural and semi-urban locations where machines were targeted for physical break-in attempts. Seven ATM break-in incidents were reported in the 12 months prior to engagement.</p>
<h3>Cash-in-Transit Vulnerabilities</h3>
<p>The bank's cash replenishment for ATMs was being handled through a mix of in-house staff and local cash-in-transit operators with varying levels of security. There was no standardised protocol for cash van movement, no GPS tracking on the vehicles, and no centralised monitoring of CIT operations. Two incidents of cash van deviations from designated routes had been reported, raising serious concerns about internal collusion. The bank's security committee had identified CIT security as the highest-priority risk area requiring immediate intervention.</p>
<h3>RBI Compliance Gaps and Inconsistent Guard Quality</h3>
<p>A self-audit conducted ahead of the annual RBI inspection revealed 23 compliance gaps, including expired PSARA licences for deployed guards in five districts, incomplete documentation of arms licences for armed guards, and lack of training records for ATM response personnel. Guard deployment at branches was inconsistent — some branches had retired personnel with no formal training, while ATM locations had either no guard or shared guards with neighbouring shops. The bank's security budget was under pressure, requiring a cost-effective solution that did not compromise on compliance or coverage.</p>`,
    solution: `<h3>Tiered Security Architecture with Centralised Monitoring</h3>
<p>Silbar Security Services Pvt. Ltd. designed a tiered security model for the bank: Category A branches (high-value, urban) received armed guards with CCTV integration, Category B branches (semi-urban) received unarmed guards with electronic surveillance, and Category C (rural branches) received trained unarmed guards with mobile patrol backup. For ATMs, we deployed a combination of on-site guards for high-risk locations and GPS-tracked mobile patrol teams for cluster coverage of multiple ATMs within a 15-kilometre radius. A central security monitoring cell was established at the bank's Bhopal zonal office with real-time incident tracking and compliance dashboards.</p>
<h3>Standardised Cash-in-Transit Protocol with Full Traceability</h3>
<p>We deployed dedicated CIT teams with armoured vehicles, armed guards, and real-time GPS tracking monitored from the central cell. Each cash van follows a pre-approved route with checkpoints where guards must scan RFID tags to confirm adherence. Any deviation from the route triggers an automatic alert to the monitoring cell and the nearest police control room. Cash handover at ATM sites follows a standardised protocol with dual authentication — the CIT officer and the ATM custodian both sign a digital receipt captured on a handheld device with timestamp and geo-location.</p>
<h3>Compliance Remediation and Guard Quality Upgrade</h3>
<p>We conducted a district-wise audit of all existing guard deployments, regularising PSARA licences across 19 districts, renewing arms licences for 22 armed guards, and training all personnel on RBI's updated security guidelines. A total of 106 security personnel were deployed across the network, including 22 armed guards, 14 lady guards for female-staffed branches, and 6 mobile patrol teams covering 90 cluster-mapped ATM locations. All guards completed a bank-specific training module covering cash handling protocols, RBI compliance requirements, customer interaction, and emergency response for robbery scenarios.</p>`,
    results: [
      'ATM vandalism incidents reduced by 90% across the network',
      'Zero cash-in-transit security incidents in 18 months of operations',
      'RBI compliance audit result: fully compliant with zero non-conformances',
      'Coverage established across 150+ rural and urban ATM locations with optimised patrol clustering',
      'GPS-tracked CIT operations with 100% route adherence and real-time monitoring',
      'All PSARA licences and arms licences regularised, with automated renewal tracking for ongoing compliance',
    ],
    testimonials: [
      {
        quote: 'Silbar\u2019s approach to our banking security was methodical and compliance-focused. They didn\u2019t just deploy guards \u2014 they understood our RBI obligations and built operations around them. The audit result speaks for itself, and our ATM vandalism problem has effectively been eliminated.',
        name: 'Anita Sharma',
        role: 'Zonal Security Manager, Nationalized Bank',
      },
    ],
  },
  {
    slug: 'residential-society-security-delhi',
    title: 'Residential Society Security Transformation',
    client: 'Premium Housing Society',
    industry: 'Residential',
    location: 'Delhi NCR',
    duration: '12 months',
    services: ['residential-security', 'manned-guarding', 'electronic-surveillance', 'kyc-background-checks'],
    challenge: `<h3>A 600-Family Society with Outdated Security</h3>
<p>The premium residential society in Gurugram's Sector 56 comprised 14 towers with 600+ apartments, housing approximately 2,300 residents. The existing security arrangement had been in place for over eight years with the same small vendor. Guard deployment had shrunk from 18 personnel to 9 due to the vendor's financial difficulties — the last three guards had not been paid in two months. The society had experienced 11 burglary incidents in the preceding year, including one where the perpetrators entered through the service gate by impersonating plumbers. The Residents' Welfare Association was facing intense pressure from residents to fix security once and for all.</p>
<h3>Unverified Domestic Staff and Lack of Visitor Control</h3>
<p>Over 200 domestic workers — maids, cooks, drivers, and nannies — entered the society daily. There was no formal verification process. Any domestic staff claiming to work for a resident could walk in by signing a paper register that was never audited. Two incidents of theft by domestic workers had been reported, but the society had no system to prevent recurrence. Visitor management was equally porous — food delivery personnel, cab drivers, and service technicians were waved through without verification, and the paper visitor register was used primarily to satisfy insurance requirements, not for actual security.</p>
<h3>Emergency Response and Community Trust Deficit</h3>
<p>The society had no emergency response protocol. A fire alarm in Tower C a year earlier had resulted in chaos — residents did not know where to assemble, guards did not know how to coordinate with the fire department, and the fire tender could not enter because the main gate was blocked by parked vehicles. Emergency contact numbers for residents were not maintained. The RWA chairman noted that trust in security was at an all-time low, with residents reluctant to step out for evening walks and parents worried about children playing in common areas.</p>`,
    solution: `<h3>Complete Security Overhaul with Community-First Approach</h3>
<p>Silbar Security Services Pvt. Ltd. conducted a detailed vulnerability assessment of the society, mapping all entry points, parking areas, service corridors, blind spots, and emergency assembly points. The assessment was presented to the RWA with a phased remediation plan. We deployed 21 security personnel — including a dedicated security supervisor, 4 lady guards for the family entrance, 14 guards across gate and patrol duties, and 2 mobile patrol personnel. Guard uniforms were redesigned to project a professional, approachable image consistent with the society's premium positioning.</p>
<h3>Digitised Visitor and Domestic Staff Management</h3>
<p>We implemented a digital visitor management system at all three entry gates. Residents pre-register their domestic workers with photographs and ID proofs in a secure portal. Each domestic worker receives a QR-coded ID card that must be scanned at entry and exit. Visitors receive temporary QR codes sent to the resident's phone for approval. Delivery personnel are verified against a whitelist maintained by the RWA, and all entries are logged with timestamps and vehicle numbers. The system has a panic button feature that instantly notifies the security supervisor and society manager if a visitor's identity cannot be verified.</p>
<h3>Emergency Response System and Community Empowerment</h3>
<p>We established an emergency operations protocol with clear roles for each guard post, designated evacuation routes, and assembly points marked with illuminated signage. A dedicated emergency intercom was installed at the main gate with direct connectivity to the nearest fire station, police station, and ambulance service. We conducted a full-scale mock drill within 60 days of deployment, achieving a response time under 5 minutes for a simulated medical emergency in the clubhouse. Monthly safety workshops are held for residents covering fire safety, personal security, and cyber safety, rebuilding the community's trust in their security environment.</p>`,
    results: [
      'Resident satisfaction with security improved by 40% in the annual RWA survey',
      'Visitor management fully digitised with QR-code-based system across all three gates',
      'Domestic worker KYC verification completed for 200+ staff with photo ID and police verification',
      'Emergency response time standardised at under 5 minutes across all scenarios',
      'Zero burglary incidents reported in the 12 months since deployment',
      'Monthly safety workshops and quarterly mock drills achieving 70%+ resident participation',
    ],
    testimonials: [
      {
        quote: 'The transformation has been remarkable. Our residents feel safe walking in the complex at night, parents let their children play in the parks without constant worry, and the digital visitor system has eliminated the anxiety of unknown people entering the society. Silbar gave us our peace of mind back.',
        name: 'Colonel R. P. Singh (Retd.)',
        role: 'President, Residents Welfare Association',
      },
    ],
  },
  {
    slug: 'solar-plant-security-rajasthan',
    title: 'Remote Solar Plant Security',
    client: 'Renewable Energy Company',
    industry: 'Infrastructure',
    location: 'Rajasthan',
    duration: '12 months',
    services: ['manned-guarding', 'electronic-surveillance', 'solar-plants', 'risk-assessment'],
    challenge: `<h3>Protecting a 200-MW Solar Installation in Remote Rajasthan</h3>
<p>The client operated a 200-megawatt solar photovoltaic plant spread across 1,100 acres in the Barmer district of Rajasthan — a remote desert location with minimal infrastructure and extreme temperatures reaching 50°C in summer. The plant's remote location made it an attractive target for theft of valuable solar panels, copper cabling, and aluminium mounting structures. In the 18 months prior to engagement, the plant had lost over 2,400 solar panels worth approximately ₹1.2 crores to organised theft rings operating from nearby villages. The local police station was 35 kilometres away, making response times impractically long.</p>
<h3>Vast Perimeter with Limited Visibility</h3>
<p>The 1,100-acre site was enclosed by a chain-link fence that was damaged in multiple sections by local villagers cutting through to access grazing land. The perimeter was too large for effective manual patrolling, and the existing guard deployment — four unarmed watchmen working 12-hour shifts — could not cover even a fraction of the area. There was no CCTV coverage, no lighting in most sections, and no vehicle for patrolling the vast interior. Theft incidents were typically discovered days later during routine panel inspection, giving thieves ample time to dispose of stolen materials.</p>
<h3>Extreme Working Conditions and Guard Attrition</h3>
<p>The desert environment posed unique challenges for security personnel. Summer temperatures exceeding 48°C, lack of shade across most of the site, and the nearest habitation being 12 kilometres away made guard deployment difficult. The previous vendor had rotated through five different guards in six months, with most leaving due to harsh conditions and lack of basic amenities. The absence of reliable drinking water, mobile network coverage in parts of the site, and emergency medical support created a situation where the few deployed guards were more concerned about their own survival than security.</p>`,
    solution: `<h3>Technology-First Security Architecture for Challenging Terrain</h3>
<p>Silbar Security Services Pvt. Ltd. designed a technology-led security solution tailored to the remote desert environment. We deployed solar-powered CCTV towers at 12 strategic locations across the plant, each equipped with night-vision cameras, motion sensors, and two-way audio. The cameras transmit feeds over a 4G mesh network to a central monitoring console at the plant control room, with a secondary feed to Silbar's remote monitoring centre in Jaipur. Perimeter intrusion detection sensors were installed along the boundary fence, programmed to ignore small animals and environmental triggers while alerting on human-scale movement.</p>
<h3>Mobile Patrol Unit with Purpose- Built Infrastructure</h3>
<p>We deployed a dedicated mobile patrol team with a rugged 4x4 vehicle equipped with GPS tracking, floodlights, and first-aid and fire-fighting equipment. The team conducts randomised patrols of the perimeter and internal roads on an unpredictable schedule. To address the working-condition challenge, we set up a security outpost at the plant entrance with air-conditioned rest facilities, reliable drinking water (through a RO system), satellite phone connectivity for areas with no mobile network, and a dedicated ambulance on standby during peak summer months. We introduced 6-hour shifts instead of 12-hour shifts to reduce heat exposure, with rotation every two hours between outdoor duty and the air-conditioned outpost.</p>
<h3>Community Engagement and Night-Vision Deterrence</h3>
<p>Beyond technology and manpower, we implemented a community engagement program with the surrounding villages. We identified and hired five guards from the local community who understood the terrain and had existing relationships with village leadership. A direct communication channel was established with the village sarpanch, who alerts the security team if suspicious activity is reported. Night-vision binoculars and thermal imaging equipment were provided to night patrol teams to identify approaching individuals from a distance. The combination of visible patrols, thermal detection, and community intelligence has effectively deterred organised theft operations.</p>`,
    results: [
      'Solar panel theft eliminated entirely in 12 months since deployment',
      '24/7 remote monitoring operational with solar-powered CCTV and 4G mesh network',
      'Perimeter breach detection and alert response time under 30 seconds from sensor trigger',
      'Cost-effective security model achieving lower per-acre cost than traditional manual guarding',
      'Guard attrition reduced to zero through improved working conditions, amenities, and local hiring',
      'Community engagement program built positive relationships with 5 surrounding villages',
    ],
    testimonials: [
      {
        quote: 'We were sceptical that any security agency could handle the Barmer location — the heat, the remoteness, the organised theft. Silbar\u2019s technology-first approach combined with local community engagement has completely solved our theft problem. Our panel inventory is finally stable, and the remote monitoring gives us confidence even from our Mumbai office.',
        name: 'Karan Joshi',
        role: 'Head of Operations, Renewable Energy Company',
      },
    ],
  },
]

export const CASE_STUDY_SLUGS = CASE_STUDIES.map((cs) => cs.slug)
