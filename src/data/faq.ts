export type FAQCategory = 'General' | 'Compliance' | 'Services' | 'Industries' | 'Operations'

export type FAQ = {
  q: string
  a: string
  category: FAQCategory
}

export const FAQS: FAQ[] = [
  // General (16)
  {
    category: 'General',
    q: 'What services does Silbar Security Services Pvt. Ltd. provide?',
    a: 'Silbar Security Services Pvt. Ltd. provides comprehensive security solutions including Industrial Security, Corporate Security, Factory Security, Warehouse Security, Commercial Security, Government Security Services, Hospital Security, Educational Institution Security, Residential Security, Event Security, Fire & Safety Personnel, and customized security solutions across India.'
  },
  {
    category: 'General',
    q: 'Is Silbar Security Services a PSARA licensed security company?',
    a: 'Yes. Silbar Security Services Pvt. Ltd. has obtained PSARA licences across 19 states and Union Territories including Rajasthan, Delhi, Haryana, Uttar Pradesh, Madhya Pradesh, Gujarat, Punjab, Chandigarh, Uttarakhand, Maharashtra, Chhattisgarh, Odisha, Jharkhand, West Bengal, Karnataka, Tamil Nadu, and Telangana, with expansion into additional states continuing as part of our PAN India growth strategy.'
  },
  {
    category: 'General',
    q: 'In which states do you provide security services?',
    a: 'We provide professional security services across 19 states including Rajasthan, Delhi, Haryana, Uttar Pradesh, Madhya Pradesh, Gujarat, Punjab, Chandigarh, Uttarakhand, Maharashtra, Chhattisgarh, Odisha, Jharkhand, West Bengal, Karnataka, Tamil Nadu, and Telangana, with further expansion underway. Our centralized operations cover 200+ cities across these states.'
  },
  {
    category: 'General',
    q: 'Are your security guards professionally trained?',
    a: 'Yes. Our security personnel undergo structured recruitment, document verification, background checks, police verification, physical fitness tests, and job-specific training before deployment. We also provide site-specific induction and continuous supervision to ensure professional performance and discipline.'
  },
  {
    category: 'General',
    q: 'What makes Silbar Security different from other security companies?',
    a: 'Our biggest strength is our Compliance-First Business Model. We focus on professional manpower, statutory compliance (EPF, ESIC, Minimum Wages), transparent documentation, experienced management, quality supervision, 4 ISO certifications (IAF accredited), PSARA licensing across 19 states, CAPSI membership, and long-term client partnerships rather than simply deploying guards.'
  },
  {
    category: 'General',
    q: 'Is your company ISO certified?',
    a: 'Yes. We are certified for ISO 9001:2015 (Quality Management System), ISO 14001:2015 (Environmental Management System), ISO 45001:2018 (Occupational Health & Safety Management System), and ISO 27001 (Information Security Management System) — all IAF accredited, reflecting our commitment to quality, environmental responsibility, occupational health & safety, and information security.'
  },
  {
    category: 'General',
    q: 'How long has Silbar Security been operating in India?',
    a: 'Silbar Security was established in 2018 with a vision to transform the private security industry. Founded initially as a proprietorship in Jaipur, Rajasthan by Mr. Sonu Singh, it was incorporated as Silbar Security Services Pvt. Ltd. in October 2025 with Mr. Nakul Singh Jadaun joining as Director.'
  },
  {
    category: 'General',
    q: 'Is Silbar Security Services registered with Startup India, MSME, GST, EPF and ESIC?',
    a: 'Yes. Our company is registered under Startup India (DPIIT recognized), MSME, MCA, GST, and fully complies with EPF and ESIC requirements, enabling us to deliver legally compliant and transparent security services to all our clients.'
  },
  {
    category: 'General',
    q: 'What are your payment terms and billing cycles?',
    a: 'Our standard payment terms are monthly billing cycles with invoices raised at the start of each month. Payments are due within 15 to 30 days from invoice date. We offer flexible payment options including NEFT, RTGS, cheque, and online transfer. Customized billing cycles can be discussed based on contract size and client requirements.'
  },
  {
    category: 'General',
    q: 'What is the minimum contract duration for security services?',
    a: 'The minimum contract duration typically ranges from 6 to 12 months, depending on the nature of the site and scope of services. For short-term requirements such as events or seasonal projects, we offer flexible contracts starting from a single day to a few months. Long-term contracts benefit from preferential pricing and additional value-added services.'
  },
  {
    category: 'General',
    q: 'Do you provide security services in semi-urban and rural areas?',
    a: 'Yes, we provide security services across metropolitan cities, semi-urban towns, and rural locations within our operational states. Our branch network and mobile deployment capabilities allow us to reach remote industrial sites, factory locations in rural belts, and infrastructure projects in偏远 areas with the same service standards as our urban deployments.'
  },
  {
    category: 'General',
    q: 'What is your typical response time for emergency situations?',
    a: 'Our typical response time varies by location: in metropolitan areas our Quick Response Team (QRT) can reach the site within 10–15 minutes of receiving an alert. In semi-urban and rural locations, response time is within 20–30 minutes. For critical emergencies, our 24/7 control room immediately dispatches the nearest available patrol vehicle and notifies the incident response team.'
  },
  {
    category: 'General',
    q: 'What are the standard shift hours for security guards?',
    a: 'Standard shifts are 8 to 12 hours per day, with shift patterns including day shift (6 AM to 6 PM), night shift (6 PM to 6 AM), and rotating shifts depending on site requirements. All guards are entitled to weekly offs and statutory leaves as per applicable labour laws. Overtime is compensated as per company policy and legal requirements.'
  },
  {
    category: 'General',
    q: 'Can you explain your escalation process for unresolved issues?',
    a: 'Our escalation process follows a structured 4-level hierarchy. Level 1: Site Supervisor resolves day-to-day operational issues. Level 2: Field Officer or Area Manager handles unresolved complaints within 24 hours. Level 3: Operations Manager reviews persistent concerns and implements corrective action. Level 4: Senior Management escalates to Director level for strategic or contractual matters. Every escalation is logged and tracked in our CRM system.'
  },
  {
    category: 'General',
    q: 'How do you handle complaints from clients about guard behavior or performance?',
    a: 'Complaints are immediately logged by the client\'s designated relationship manager. We investigate through supervisor reports, CCTV review, and interviews. If the complaint is valid, we counsel or retrain the guard, issue a written warning, and schedule follow-up checks. For serious or repeated misconduct, we replace the guard within 24 hours and submit a formal incident report to the client.'
  },
  {
    category: 'General',
    q: 'What technology platforms do you use for managing security operations?',
    a: 'We leverage a suite of technology platforms including GPS-enabled Guard Tour Systems for patrol tracking, biometric attendance devices for guard login/logout, cloud-based CCTV monitoring with mobile viewing, incident management software for reporting, and a centralized control room with real-time dashboard monitoring. All systems are integrated to provide clients with transparent and data-driven security operations.'
  },

  // Compliance (16)
  {
    category: 'Compliance',
    q: 'Are you a PSARA licensed security agency?',
    a: 'Yes, Silbar Security Services Pvt. Ltd. operates in strict compliance with the Private Security Agencies Regulation Act (PSARA) 2005. We hold valid PSARA licenses across 19 states and Union Territories in India, with additional state licenses under process as part of our nationwide expansion strategy.'
  },
  {
    category: 'Compliance',
    q: 'Do you comply with all labor laws (PF, ESI, Minimum Wage)?',
    a: 'Absolutely. We are 100% compliant with all statutory requirements including EPF, ESIC, Minimum Wages Act, Bonus Act, and Gratuity Act. We follow applicable State Government Minimum Wages notifications for every deployment and share monthly compliance reports with our clients.'
  },
  {
    category: 'Compliance',
    q: 'Are all your security guards police verified?',
    a: 'Yes, police verification is a mandatory pre-requisite for employment at Silbar Security. No guard is deployed without a cleared police verification report. We follow strict recruitment and verification procedures as required by law, client policy, and contract requirements.'
  },
  {
    category: 'Compliance',
    q: 'What ISO certifications does Silbar Security hold?',
    a: 'Silbar Security Services Pvt. Ltd. holds 4 ISO certifications — ISO 9001:2015 (Quality Management System), ISO 14001:2015 (Environmental Management System), ISO 45001:2018 (Occupational Health & Safety Management System), and ISO 27001 (Information Security Management System). All certifications are IAF accredited, ensuring global recognition and credibility.'
  },
  {
    category: 'Compliance',
    q: 'Are your guards trained as per PSARA guidelines?',
    a: 'Yes, all our guards undergo mandatory training covering physical fitness, fire safety, first aid, crowd control, legal protocols, and security procedures as mandated by PSARA and state-specific regulations.'
  },
  {
    category: 'Compliance',
    q: 'What happens in case of a compliance audit by the government?',
    a: 'Since we maintain transparent digital records of all PF, ESI challans, wage registers, and statutory documentation, our clients face zero liability during labor department audits. We take full responsibility for compliance management.'
  },
  {
    category: 'Compliance',
    q: 'Do you provide compliance documentation to clients?',
    a: 'Yes, we provide applicable statutory and operational documents as required under the service agreement, including monthly MIS reports containing PF/ESI challans, attendance sheets, wage registers, and invoices to help clients maintain transparency and compliance.'
  },
  {
    category: 'Compliance',
    q: 'What is your Compliance Assurance commitment?',
    a: 'If a compliance penalty is imposed solely due to our failure to fulfil contractual compliance responsibilities, we stand by our commitment and take responsibility in accordance with our service agreement. This reflects our confidence in our systems and dedication to protecting our clients\' interests.'
  },
  {
    category: 'Compliance',
    q: 'How do you ensure compliance with the Contract Labour (Regulation & Abolition) Act?',
    a: 'We maintain a valid Certificate of Registration as a principal employer and comply with all provisions of the Contract Labour Act including issuance of appointment letters, maintaining registers of contract labour, displaying abstract of the Act at worksites, ensuring welfare amenities like canteen and rest rooms, and filing annual returns with the appropriate government authorities.'
  },
  {
    category: 'Compliance',
    q: 'How do you handle minimum wage revisions across different states?',
    a: 'We track state-wise minimum wage notifications through a dedicated compliance cell that monitors official gazettes and labour department updates. Whenever a revision is announced, we immediately adjust wage structures for all affected guards and issue revised wage registers. Clients receive updated cost sheets reflecting the change with full transparency.'
  },
  {
    category: 'Compliance',
    q: 'Are our guards eligible for gratuity benefits under your employment?',
    a: 'Yes, all guards who complete 5 years of continuous service with Silbar Security are eligible for gratuity as per the Payment of Gratuity Act, 1972. We are registered under the act and maintain a gratuity fund. The gratuity amount is calculated at 15 days of last drawn wages for every completed year of service or part thereof exceeding six months.'
  },
  {
    category: 'Compliance',
    q: 'Do you pay statutory bonus to guards as per the Payment of Bonus Act?',
    a: 'Yes, we comply with the Payment of Bonus Act, 1965 and pay annual statutory bonus to eligible guards earning less than the prescribed wage ceiling. The bonus is calculated on the allocable surplus and paid within the statutory timeline each year. We maintain proper bonus registers and submit returns as required under the Act.'
  },
  {
    category: 'Compliance',
    q: 'Do you maintain registers and records as required under the Contract Labour Act?',
    a: 'Yes, we maintain all mandatory registers including the Register of Contract Labour (Form XII), Muster Roll, Wage Register, Deduction Register, Register of Overtime, Register of Fines, Register of Advances, and Combined Annual Return. All records are digitized and available for client and government inspection at any time.'
  },
  {
    category: 'Compliance',
    q: 'Does your company have a POSH (Prevention of Sexual Harassment) policy?',
    a: 'Yes, we have a comprehensive POSH policy aligned with the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013. We have constituted an Internal Complaints Committee (ICC) across our branches, conduct annual POSH awareness training for all employees, and maintain a strict zero-tolerance approach towards any form of harassment.'
  },
  {
    category: 'Compliance',
    q: 'What insurance coverage do you provide for your guards and third-party liabilities?',
    a: 'We maintain comprehensive insurance including Workmen\'s Compensation Insurance as per the Employees\' Compensation Act for all guards, Public Liability Insurance covering third-party property damage or bodily injury arising from our operations, and Group Personal Accident Insurance for guards on duty. Insurance certificates are shared with clients upon request.'
  },
  {
    category: 'Compliance',
    q: 'What documents can we expect during a statutory compliance audit?',
    a: 'During a compliance audit, we provide EPF and ESIC monthly challans and returns, minimum wage registers with attendance records, bonus and gratuity payment receipts, contract labour registration certificates, PSARA license copies, insurance policy certificates, POSH policy documents, and annual statutory returns. All documents are maintained in both physical and digital formats with proper audit trails.'
  },

  // Services (16)
  {
    category: 'Services',
    q: 'What is the difference between a Security Guard and a Security Supervisor?',
    a: 'A Security Guard is responsible for access control, patrolling, monitoring, and reporting. A Security Supervisor oversees a team of guards, handles shift rosters, manages client communication, conducts inspections, and handles escalations. Depending on the assignment size, we also deploy Field Officers and Operations Managers.'
  },
  {
    category: 'Services',
    q: 'Do you provide Armed Security Guards?',
    a: 'Yes, we provide licensed Armed Security Guards (Gunmen) for banks, cash-in-transit, VIP protection, and high-risk industrial sites where legally permissible and contractually required.'
  },
  {
    category: 'Services',
    q: 'Do you offer Electronic Surveillance solutions?',
    a: 'Yes, we provide end-to-end electronic security solutions including CCTV installation, biometric access control, boom barriers, video analytics, and remote monitoring integrated with our manned guarding services.'
  },
  {
    category: 'Services',
    q: 'Do you provide fire safety personnel?',
    a: 'We provide trained fire safety officers and fire guards equipped to handle firefighting equipment, execute evacuation protocols, conduct fire drills, and maintain fire safety compliance as per applicable regulations.'
  },
  {
    category: 'Services',
    q: 'What is a Quick Response Team (QRT)?',
    a: 'Our QRT comprises highly trained personnel in patrolling vehicles who respond immediately to distress calls, perimeter breaches, or emergencies at client sites. The QRT is available 24/7 and can reach most client locations within minutes.'
  },
  {
    category: 'Services',
    q: 'Do you offer security audits and risk assessments?',
    a: 'Yes, our senior security consultants conduct comprehensive security audits and risk assessments to identify vulnerabilities in your premises, evaluate operational risks, and recommend customized security solutions tailored to your specific requirements.'
  },
  {
    category: 'Services',
    q: 'Can you provide security services for newly established factories?',
    a: 'Yes. We regularly support newly established factories, manufacturing plants, warehouses, and commercial projects by providing security solutions from the commencement of operations, including perimeter security, access control, and material movement monitoring.'
  },
  {
    category: 'Services',
    q: 'Do you provide facility management services alongside security?',
    a: 'Yes, alongside security, we offer comprehensive facility management services including housekeeping, pantry management, maintenance staff, and integrated facility management solutions for clients seeking a single-vendor partner.'
  },
  {
    category: 'Services',
    q: 'What does your security audit process involve step by step?',
    a: 'Our security audit process includes 5 phases: 1) Site assessment — physical inspection of premises, perimeter, lighting, access points, and existing security infrastructure. 2) Threat analysis — identifying potential risks, vulnerabilities, and historical incident patterns. 3) Gap analysis — comparing current security measures against industry benchmarks and compliance requirements. 4) Recommendations — detailed report with actionable improvements, cost estimates, and implementation timelines. 5) Review — follow-up audit after implementation to measure effectiveness.'
  },
  {
    category: 'Services',
    q: 'How often do your guards conduct perimeter patrols?',
    a: 'Patrol frequency is customized based on site risk assessment and client requirements. For standard industrial and commercial sites, guards conduct perimeter patrols every 30 to 60 minutes. For high-risk sites, patrol intervals are reduced to 15 to 20 minutes. All patrols are logged via NFC tag scanning in our Guard Tour System, providing verifiable digital records of every patrol round.'
  },
  {
    category: 'Services',
    q: 'How do you integrate fire safety with regular security duties?',
    a: 'Our security personnel are cross-trained in both security and fire safety functions. Guards are trained to operate fire extinguishers, hydrants, and hose reels, conduct daily fire equipment inspections, execute fire evacuation drills, and serve as fire wardens during emergencies. For larger facilities, dedicated fire safety officers are deployed who report to both the security operations manager and the client\'s safety officer.'
  },
  {
    category: 'Services',
    q: 'Do you offer combined pricing for security and housekeeping services?',
    a: 'Yes, we offer integrated service contracts where security and housekeeping services are bundled under a single agreement at a discounted rate compared to separate contracts. This single-vendor approach simplifies billing, reduces administrative overhead, ensures coordinated operations, and provides consistent service quality across both functions.'
  },
  {
    category: 'Services',
    q: 'Can you provide security for one-time events or temporary requirements?',
    a: 'Yes, we specialize in temporary and event security solutions including corporate events, exhibitions, conferences, concerts, festivals, political rallies, film shoots, and sporting events. We deploy the required number of guards, supervisors, and QRT vehicles for the event duration. Temporary contracts can be arranged with as little as 24 to 48 hours of notice, subject to manpower availability.'
  },
  {
    category: 'Services',
    q: 'What is the licensing process for deploying armed guards at our site?',
    a: 'Deploying armed guards requires the client to submit a written request on company letterhead stating the requirement and justification. We then apply to the respective state\'s District Magistrate or Licensing Authority under the Arms Act, 1959 for issuance of arms licenses. The process involves police verification of both the guard and the site, security assessment, and payment of applicable fees. The entire process typically takes 30 to 60 days. Armed guards are deployed only after all approvals are in place.'
  },
  {
    category: 'Services',
    q: 'How long does your KYC and document verification process take for new guards?',
    a: 'Our standard KYC and verification process takes 7 to 10 working days from the date of application submission. This includes Aadhaar and PAN verification, address proof validation, police verification through the local police station, educational document checks, previous employment verification, and medical fitness certification. For urgent deployments, we can expedite the process within 3 to 5 days, pending police clearance.'
  },
  {
    category: 'Services',
    q: 'What are the terms of your guard replacement guarantee?',
    a: 'We offer a 24-hour replacement guarantee for any guard who is found to be unsuitable, underperforming, or involved in misconduct. If a client requests a replacement, we dispatch a trained substitute within 24 hours of the request. For repeated issues at the same post, we upgrade the replacement to a senior guard or supervisor at no additional cost. This guarantee is documented in the service agreement.'
  },

  // Industries (16)
  {
    category: 'Industries',
    q: 'Do you have experience securing manufacturing plants?',
    a: 'Yes, industrial security is one of our core strengths. We secure numerous manufacturing plants, factories, and industrial units. Our guards are trained in material movement checking, gate pass systems, weighing scale operations, labor frisking, and perimeter surveillance.'
  },
  {
    category: 'Industries',
    q: 'How do you handle security for IT parks and corporate offices?',
    a: 'For corporate environments, we deploy professional, English-speaking guards trained in visitor management systems, access control protocols, emergency evacuations, and professional conduct suitable for corporate and multinational environments.'
  },
  {
    category: 'Industries',
    q: 'Can you secure large construction sites?',
    a: 'Yes, construction sites require specialized perimeter security and material theft prevention. We deploy strict access control, material movement documentation, night-vision equipped patrolling teams, and round-the-clock surveillance.'
  },
  {
    category: 'Industries',
    q: 'Do you provide security for educational institutions?',
    a: 'Yes, we secure schools, colleges, and universities with a focus on child safety, anti-ragging measures, traffic management during peak hours, strict visitor control, and surveillance of campus perimeters.'
  },
  {
    category: 'Industries',
    q: 'What is your approach to hospital security?',
    a: 'Healthcare security requires high empathy and crisis management skills. Our guards are trained in crowd control in emergency wards, patient visitor management, preventing equipment theft, managing pharmacy security, and maintaining calm during medical emergencies.'
  },
  {
    category: 'Industries',
    q: 'Do you secure retail malls and showrooms?',
    a: 'Yes, we provide loss prevention officers, CCTV operators, and floor guards trained to identify shoplifting, manage crowd flow, handle parking, and maintain a welcoming yet secure environment for shoppers.'
  },
  {
    category: 'Industries',
    q: 'How do you secure residential societies?',
    a: 'We deploy guards trained in visitor management protocols, monitoring domestic help and service staff, managing parking and vehicle entry, conducting night patrols, and maintaining security logs for all residential activities.'
  },
  {
    category: 'Industries',
    q: 'Do you provide security for government departments and PSUs?',
    a: 'Yes. Silbar Security Services actively participates in government and public sector opportunities and provides security manpower for eligible government departments, public sector organizations, and infrastructure projects, subject to applicable tender requirements and PSARA compliance.'
  },
  {
    category: 'Industries',
    q: 'Do you implement lockdown drills and emergency response plans in schools?',
    a: 'Yes, we work closely with school administrations to develop and implement comprehensive lockdown procedures for threats such as intruders, natural disasters, or medical emergencies. Our guards are trained to execute lockdown protocols including securing entry and exit points, coordinating with local law enforcement, managing parent reunification areas, and conducting periodic lockdown drills at least once per quarter. Detailed incident response plans are documented and shared with the school management.'
  },
  {
    category: 'Industries',
    q: 'How do you manage security in hospital emergency and isolation wards?',
    a: 'Hospital emergency and isolation ward security requires specialized protocols. Our guards are trained in PPE usage, restricted access enforcement for isolation zones, managing distressed relatives in emergency waiting areas, monitoring visitor entry logs, and coordinating with hospital staff during medical emergencies. For COVID or infectious disease wards, we deploy guards with additional training in infection control protocols and bio-waste disposal area security.'
  },
  {
    category: 'Industries',
    q: 'What measures do you take to prevent theft at construction sites during night hours?',
    a: 'Night security at construction sites involves multiple layers: deployment of guards with night-vision flashlights and thermal scanning capabilities at entry and exit points, scheduled patrols with NFC tag verification every 20 minutes, CCTV coverage of material storage areas with night vision, random vehicle inspections for outgoing material, and coordination with a mobile QRT patrol that visits the site at unpredictable intervals during night hours.'
  },
  {
    category: 'Industries',
    q: 'How do you handle security protocols for VIP guests in hotels?',
    a: 'For high-profile guests in hotels, we implement a tiered security protocol: pre-arrival threat assessment and room sweep, dedicated security personnel at the VIP floor elevator lobbies, discreet personal security officers trained in close protection, controlled access to the VIP floor with biometric or card-based entry, CCTV monitoring of all VIP access points, and coordination with local police for off-site movements. All VIP security personnel possess valid PSARA certifications for personal security.'
  },
  {
    category: 'Industries',
    q: 'Do you provide cab checking and vehicle inspection services for IT parks?',
    a: 'Yes, we provide comprehensive vehicle inspection services for IT parks including employee cab checking at entry gates for unauthorized occupants, under-vehicle scanning using mirrors or cameras, verification of cab credentials against pre-approved vendor lists, random baggage checks for outgoing vehicles, and maintaining digital logs of all vehicle entries and exits. For large IT parks, we deploy dedicated traffic management personnel for peak hour vehicle flow.'
  },
  {
    category: 'Industries',
    q: 'Can you secure solar farms and remote energy installations with minimal on-site staff?',
    a: 'Yes, for remote solar farms and energy installations, we deploy a hybrid security model combining a small on-site guard presence with extensive technology. This includes solar-powered CCTV cameras with cellular transmission, motion sensors, drone-based perimeter surveillance on schedule, and alarm systems directly linked to our 24/7 control room. A mobile patrol team visits the site at random intervals. This model reduces manpower costs while maintaining 24/7 security coverage.'
  },
  {
    category: 'Industries',
    q: 'How do you handle security during bank branch renovations and cash transitions?',
    a: 'Bank branch renovation security requires special attention to cash chest protection and construction worker access. We deploy armed guards at the cash vault area 24/7, enforce separate entry protocols for construction workers away from banking areas, conduct daily material movement verification to prevent theft of bank assets, supervise cash transitions between temporary and permanent vaults, and coordinate with the branch manager for ATM servicing security during renovation periods.'
  },
  {
    category: 'Industries',
    q: 'How do you scale up security during peak seasons at warehouses and logistics hubs?',
    a: 'During peak seasons such as festive periods or harvest seasons, warehouse and logistics hubs face increased theft risk and traffic volume. We implement a scalable security model: deploy additional temporary guards from our reliever pool, increase patrol frequency from hourly to 30-minute intervals, deploy extra CCTV operators to monitor loading bays, implement enhanced vehicle checking protocols for outgoing shipments, and station a supervisor dedicated to logistics area security coordination.'
  },

  // Operations (16)
  {
    category: 'Operations',
    q: 'How do you monitor guards working during the night shift?',
    a: 'We use GPS-enabled Guard Tour Systems where guards scan NFC tags placed around the perimeter at specific intervals. Our 24/7 control room monitors this in real-time, and night field officers conduct surprise physical checks to ensure vigilance.'
  },
  {
    category: 'Operations',
    q: 'What happens if a guard takes leave or is absent?',
    a: 'We maintain a reliever pool of trained replacement guards. If a scheduled guard does not report to duty, a trained replacement is dispatched immediately from our nearest branch office to ensure no disruption in security coverage.'
  },
  {
    category: 'Operations',
    q: 'Who should we contact in case of an emergency?',
    a: 'Clients are provided with a 3-level escalation matrix. Level 1 is the Site Supervisor, Level 2 is the Field Officer/Area Manager, and Level 3 is the Operations Head available 24/7. We also have a dedicated emergency helpline at +91 99821 70555.'
  },
  {
    category: 'Operations',
    q: 'How frequently do your officers visit the site?',
    a: 'Our Area Managers and Field Officers conduct weekly daytime meetings with the client, bi-weekly surprise night checks, and periodic performance reviews to ensure operational readiness and service quality.'
  },
  {
    category: 'Operations',
    q: 'Do your guards carry communication equipment?',
    a: 'Yes, depending on the site size and requirements, we equip our guards with Walkie-Talkies, smartphones with reporting apps, and emergency communication devices to ensure seamless coordination.'
  },
  {
    category: 'Operations',
    q: 'How do you handle grievances or complaints regarding a guard?',
    a: 'If a client is dissatisfied with a guard\'s performance, we guarantee a replacement within 24 hours. We then investigate the matter, retrain or reassign the guard based on feedback, and implement corrective measures to prevent recurrence.'
  },
  {
    category: 'Operations',
    q: 'What uniforms and equipment do you provide?',
    a: 'We provide complete seasonal uniforms (summer/winter), safety shoes, identity cards, lanyards, batons, torches, umbrellas, and reflective jackets as per PSARA regulations and client requirements.'
  },
  {
    category: 'Operations',
    q: 'How do you ensure the quality of your security services?',
    a: 'We maintain quality through structured recruitment and verification, professional training programs, experienced supervisors, operational audits, client feedback mechanisms, attendance monitoring, and continuous performance reviews at all levels.'
  },
  {
    category: 'Operations',
    q: 'What is your protocol for guard shift changes and handovers?',
    a: 'Our shift change protocol requires the outgoing and incoming guards to conduct a joint site walk-through, review the duty log book for any incidents or instructions during the previous shift, verify equipment and key inventory, check communication devices, and sign a handover-takeover register. Any unresolved issues from the previous shift are verbally briefed and documented. The supervisor conducts a spot check during shift change at least once per day.'
  },
  {
    category: 'Operations',
    q: 'How often do supervisors inspect each guard post?',
    a: 'Supervisors inspect each guard post at a minimum of twice per shift — once at the start of the shift and once during the shift. Additionally, Field Officers conduct unannounced inspections at least 3 to 4 times per week at random timings, including at least one night inspection per week. All inspections are recorded in the site inspection register with timestamps and observation notes.'
  },
  {
    category: 'Operations',
    q: 'How long do you retain CCTV footage at client sites?',
    a: 'CCTV footage retention depends on the client\'s storage infrastructure and requirements. For standard deployments, footage is retained for 30 to 45 days. For clients with specific compliance needs such as banks or government facilities, retention can be extended to 90 days or more. Footage is stored on site with NVRs and simultaneously backed up to cloud storage for critical installations. Deletion is automated based on the retention policy agreed with the client.'
  },
  {
    category: 'Operations',
    q: 'What format do you use for incident reporting?',
    a: 'We use a standardized Incident Report Format (IRF) that captures: date and time of incident, location, names of involved personnel and witnesses, description of the incident in chronological order, immediate actions taken, damage or loss assessment (if applicable), photographs or CCTV stills as evidence, and recommendations to prevent recurrence. All reports are submitted digitally within 24 hours of the incident and stored in our incident management system with a unique reference number.'
  },
  {
    category: 'Operations',
    q: 'How does your emergency communication tree function during a crisis?',
    a: 'Our emergency communication tree operates in 4 tiers. Tier 1: The on-site guard immediately alerts the Site Supervisor and the 24/7 control room. Tier 2: The control room dispatches the QRT and notifies the Field Officer and Operations Manager. Tier 3: The Operations Manager alerts the client\'s designated emergency contact and activates the crisis management team. Tier 4: For major incidents, the Senior Management and Company Director are notified within 30 minutes. All communications follow a pre-defined script to ensure accurate information flow.'
  },
  {
    category: 'Operations',
    q: 'How often do you conduct refresher training for deployed guards?',
    a: 'Refresher training is conducted every 3 months covering topics such as fire safety refresher, customer service skills, report writing, legal updates, and equipment handling. Annual refresher covers physical fitness tests, first aid certification renewal, and PSARA mandatory training updates. Additional training is conducted whenever there is a change in site requirements, security threat levels, or client-specific protocol updates.'
  },
  {
    category: 'Operations',
    q: 'What is your policy on uniform cleanliness and equipment maintenance?',
    a: 'Guards are required to report for duty in clean, pressed uniforms with polished shoes and proper grooming. Uniforms are inspected during shift commencement by the supervisor. Equipment such as batons, torches, walkie-talkies, and flashlights are checked for functionality at the start of each shift. Defective equipment is immediately replaced. We conduct monthly uniform and equipment audits, and any guard found with unkempt appearance or faulty equipment is subject to disciplinary action including fines or suspension.'
  },
  {
    category: 'Operations',
    q: 'What disciplinary actions are taken against guards who violate the code of conduct?',
    a: 'Our disciplinary process follows progressive action: 1) Verbal warning for minor infractions like late reporting or incomplete paperwork. 2) Written warning with a show-cause notice for repeated violations or minor misconduct. 3) Fine or penalty as per company policy for negligence resulting in security lapses. 4) Suspension pending inquiry for serious offenses including theft, assault, collusion, or dereliction of duty. 5) Termination of employment with a negative report to PSARA authorities for criminal offenses. All disciplinary actions are documented and communicated to the client.'
  }
]
