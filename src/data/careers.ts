export interface Career {
  slug: string
  title: string
  type: 'Full-time' | 'Part-time' | 'Contract'
  department: string
  locations: string[]
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  salary?: string
  postedAt: string
}

export const CAREERS: Career[] = [
  {
    slug: 'security-guard',
    title: 'Security Guard (Armed & Unarmed)',
    type: 'Full-time',
    department: 'Operations',
    locations: ['Jaipur', 'Delhi', 'Mumbai', 'Ahmedabad', 'Bengaluru'],
    description: `<h3>About the Role</h3>
<p>Silbar Security Services Pvt. Ltd. is seeking trained and dedicated security guards for armed and unarmed deployment across corporate offices, factories, hospitals, residential societies, banks, hotels, retail stores, and government facilities. As India's most trusted security force with 7,000+ professionals deployed across 200+ cities, we offer unmatched career stability and growth opportunities in the security industry.</p>
<h3>What You'll Do</h3>
<p>As a Security Guard at Silbar, you will be responsible for access control at entry and exit points, conducting regular patrol rounds of the assigned premises, monitoring CCTV cameras and security systems, verifying visitor identification and maintaining visitor logs, preventing unauthorized access and theft, responding to security alarms and emergency situations, managing crowd control during events or peak hours, and coordinating with local law enforcement when required. You will be the first line of defence for our clients' assets, people, and property.</p>
<h3>Why Join Silbar Security Services Pvt. Ltd.</h3>
<p>Silbar Security Services Pvt. Ltd. is a PSARA-licensed, ISO 9001:2015, ISO 14001:2015, ISO 45001:2018, and ISO 27001:2022 certified security company with IAF accreditation. We provide on-time salary with full statutory compliance including ESI, PF, and gratuity. All guards receive professional training at our dedicated 3-acre training center covering unarmed combat, first aid, fire safety, access control, and emergency response. We offer clear career progression paths from Security Guard to Senior Guard to Supervisor to Account Manager.</p>`,
    responsibilities: [
      'Control access at entry and exit points, verify visitor identification, and maintain detailed visitor logs',
      'Conduct regular foot patrols of assigned premises including perimeter checks and blind spot monitoring',
      'Monitor CCTV feeds and security alarm systems, escalating suspicious activity immediately',
      'Respond to security incidents, fire alarms, medical emergencies, and breach attempts with calm professionalism',
      'Manage vehicle entry and exit, inspect vehicles when required, and maintain traffic flow within premises',
      'Prepare daily shift reports documenting incidents, observations, and handover notes for the incoming shift',
      'Coordinate with local police and emergency services during security incidents or law enforcement visits',
      'Perform bag inspection and frisking duties at sensitive locations in compliance with client protocols'
    ],
    requirements: [
      'Minimum 10th pass (12th pass preferred for armed guard positions)',
      'Height: 165 cm (male) / 155 cm (female) minimum; Physically fit with no major health issues',
      'Age: 21–45 years (relaxable for ex-servicemen and candidates with prior security experience)',
      'Armed guard candidates must possess a valid arms license or be eligible to apply for one',
      'Prior security experience preferred but not mandatory — we provide comprehensive training to freshers',
      'Police verification clearance and clean criminal record are mandatory before deployment',
      'Basic English and local language literacy for report writing and visitor communication',
      'Willingness to work in rotating shifts including night shifts, weekends, and public holidays'
    ],
    benefits: [
      'On-time salary with ESI, PF, gratuity, and minimum wage compliance across all states',
      '24/7 accident and life insurance coverage for all deployed personnel at no cost to the employee',
      'Free professional training at our 3-acre training center with certification upon completion',
      'Annual performance-based increments, festival bonuses, and recognition awards for outstanding service',
      'Clear promotion pathway: Security Guard → Senior Guard → Shift Supervisor → Assistant Account Manager'
    ],
    salary: '₹12,000 – ₹22,000/month depending on experience, location, and armed/unarmed role',
    postedAt: '2026-07-01'
  },
  {
    slug: 'security-supervisor',
    title: 'Security Supervisor',
    type: 'Full-time',
    department: 'Operations',
    locations: ['Jaipur', 'Delhi', 'Mumbai', 'Pune', 'Chennai'],
    description: `<h3>About the Role</h3>
<p>Silbar Security Services Pvt. Ltd. is looking for experienced Security Supervisors to lead guard teams across client sites. As a Security Supervisor, you will be the critical link between the account management team and the ground-level security guards deployed at client premises. You will oversee shift operations, conduct quality checks, manage deployment schedules, and ensure that every guard under your supervision meets Silbar's exacting standards of professionalism, punctuality, and performance.</p>
<h3>What You'll Do</h3>
<p>Security Supervisors at Silbar are responsible for managing daily guard deployment and attendance, conducting field patrol rounds to inspect guard posts, briefing guards at shift change about site-specific instructions, handling client escalations and on-ground issues immediately, conducting surprise checks and random patrol verification, ensuring all guards are in proper uniform and equipped with necessary gear, maintaining site-level documentation including incident reports and daily logs, and reporting to the Account Manager with daily performance updates. You are the face of Silbar Security Services Pvt. Ltd. on the ground.</p>
<h3>Why Join Silbar Security Services Pvt. Ltd.</h3>
<p>Silbar Security Services Pvt. Ltd. is one of India's fastest-growing security companies with a PAN India presence across 200+ cities. We invest heavily in our supervisory staff because they are the backbone of our operations. As a Security Supervisor at Silbar, you will receive advanced training in leadership, conflict resolution, and client management. We offer competitive salaries, full statutory benefits, performance bonuses, and clear career growth to Account Manager and Regional Manager roles.</p>`,
    responsibilities: [
      'Supervise daily deployment of security guards across assigned shifts and ensure 100% attendance',
      'Conduct multiple field patrol rounds per shift to verify guard presence, alertness, and proper conduct',
      'Brief all guards at shift change about site-specific instructions, recent incidents, and client expectations',
      'Handle on-ground client escalations and resolve security issues without escalation wherever possible',
      'Maintain site documentation including daily reports, incident registers, attendance sheets, and patrol logs',
      'Report to the Account Manager with detailed performance updates, attendance issues, and incident summaries'
    ],
    requirements: [
      'Minimum 12th pass (graduate preferred); Ex-servicemen and candidates with police background encouraged',
      'Minimum 2 years of experience in security operations with at least 1 year in a supervisory capacity',
      'Strong leadership skills with the ability to manage teams of 10–50 guards across multiple shifts',
      'Good communication skills in Hindi, English, and the local language of the deployment city',
      'Basic computer literacy for preparing digital reports, attendance sheets, and WhatsApp coordination',
      'Valid driving license preferred for field supervisory roles requiring travel between multiple sites'
    ],
    benefits: [
      'On-time salary with ESI, PF, gratuity, and full statutory compliance across all states of deployment',
      '24/7 accident and life insurance coverage for all supervisory personnel at no cost to the employee',
      'Advanced leadership and management training programs with certification from our training center',
      'Annual performance bonuses, festival incentives, and recognition awards for operational excellence',
      'Career growth pathway: Security Supervisor → Assistant Account Manager → Account Manager → Regional Manager'
    ],
    salary: '₹18,000 – ₹30,000/month depending on experience, location, and site complexity',
    postedAt: '2026-07-01'
  },
  {
    slug: 'account-manager',
    title: 'Account Manager - Security Operations',
    type: 'Full-time',
    department: 'Client Management',
    locations: ['Jaipur (HQ)'],
    description: `<h3>About the Role</h3>
<p>Silbar Security Services Pvt. Ltd. is seeking an experienced Account Manager to manage key client relationships from our Jaipur headquarters. The Account Manager is the most senior operational role responsible for the complete security delivery at assigned client sites. You will own the client relationship end-to-end, manage a team of supervisors and several hundred guards, conduct periodic site audits, ensure contractual compliance, and identify opportunities to enhance service quality and operational efficiency.</p>
<h3>What You'll Do</h3>
<p>As an Account Manager at Silbar, you will serve as the primary point of contact for clients regarding all security operations, conduct monthly and quarterly business reviews with client stakeholders, perform onsite security audits to assess guard performance, site vulnerabilities, and compliance gaps, manage the complete P&L for your assigned accounts including manpower budgeting and billing, lead and develop a team of supervisors through regular training, feedback, and performance reviews, coordinate with the HR and training teams to ensure adequate staffing levels, and prepare and present detailed MIS reports to both clients and Silbar's senior management.</p>
<h3>Why Join Silbar Security Services Pvt. Ltd.</h3>
<p>Silbar Security Services Pvt. Ltd. is a rapidly growing organization with a professional management team and significant investment in systems, processes, and training infrastructure. As an Account Manager, you will have the autonomy to run your accounts like your own business while being backed by a 7,000+ strong organization. We offer an excellent compensation package, performance-linked bonuses, company-provided transport for site visits, and significant career growth potential to Regional Head and Branch Head positions.</p>`,
    responsibilities: [
      'Serve as the primary point of contact for 5–10 key client accounts across security operations',
      'Conduct monthly site audits to assess guard performance, compliance, and site-specific security risks',
      'Manage end-to-end account P&L including manpower budgeting, billing, invoicing, and cost optimization',
      'Lead and mentor a team of supervisors through regular reviews, training, and performance feedback',
      'Prepare and present detailed MIS reports, incident analyses, and improvement plans to client stakeholders',
      'Coordinate with HR, training, and operations teams to ensure adequate staffing and skill development'
    ],
    requirements: [
      'Graduate or postgraduate in any discipline; MBA or diploma in security management preferred',
      'Minimum 5 years of experience in security operations with at least 2 years in account or client management',
      'Strong financial acumen with experience managing P&L, budgeting, and cost control for client accounts',
      'Excellent communication and presentation skills with fluency in Hindi and English',
      'Proficiency in MS Office (Excel, PowerPoint, Word) and experience with CRM or MIS reporting tools',
      'Willingness to travel extensively to client sites across Rajasthan and neighbouring states'
    ],
    benefits: [
      'Competitive salary with monthly performance-linked incentives and annual bonus structure',
      'Company-provided vehicle or travel allowance for site visits and client meetings',
      'Mobile phone and data reimbursement for business communication',
      'Health insurance coverage for self and immediate family members',
      'Leadership development programs and fast-track growth to Regional Manager and Branch Head roles'
    ],
    salary: '₹35,000 – ₹55,000/month plus performance incentives and travel allowance',
    postedAt: '2026-07-01'
  },
  {
    slug: 'lady-security-guard',
    title: 'Lady Security Guard',
    type: 'Full-time',
    department: 'Operations',
    locations: ['Jaipur', 'Delhi', 'Mumbai', 'Bengaluru', 'Pune'],
    description: `<h3>About the Role</h3>
<p>Silbar Security Services Pvt. Ltd. invites applications from trained and motivated women to join our dedicated Lady Security Guard force. We recognise that many environments — hospitals, schools, women's hostels, malls, hotels, and corporate offices — require female security personnel for cultural sensitivity, legal compliance, or operational requirements. Our lady guards receive the same high-quality training as our male guards, plus additional modules in gender-sensitive security protocols, soft skills, and professional communication.</p>
<h3>What You'll Do</h3>
<p>As a Lady Security Guard at Silbar, you will be responsible for access control and visitor verification at client premises, performing lady frisking duties at events, hospitals, and corporate offices where female screening is required, monitoring CCTV feeds and responding to security incidents, managing entry and exit of female staff, students, or guests with professionalism, conducting patrols of assigned areas with attention to gender-sensitive zones, assisting in emergency evacuation procedures with special attention to women and children, and preparing daily shift reports and incident documentation. You will be a role model for women in the security profession.</p>
<h3>Why Join Silbar Security Services Pvt. Ltd.</h3>
<p>Silbar Security Services Pvt. Ltd. is committed to gender diversity in the security workforce. We provide equal pay for equal work, full statutory benefits including ESI, PF, and gratuity, and a safe and respectful work environment. Our lady guards are covered under 24/7 insurance and receive free training at our dedicated training center. We offer flexible shift options where possible and clear career progression to Lady Supervisor and Assistant Account Manager roles. Join India's most trusted security company and build a career that commands respect.</p>`,
    responsibilities: [
      'Manage access control and visitor verification at designated entry points with professional demeanour',
      'Conduct lady frisking at events, hospitals, schools, and corporate offices requiring female screening',
      'Monitor assigned premises through regular patrols with attention to gender-sensitive areas and protocols',
      'Assist in emergency evacuation procedures with special focus on women, children, and vulnerable individuals',
      'Maintain daily activity logs, incident reports, and handover notes for shift transitions',
      'Coordinate with male security colleagues and supervisors for integrated security operations'
    ],
    requirements: [
      'Minimum 10th pass; 12th pass preferred for corporate and hospital deployments',
      'Height: 152 cm minimum; Physically fit with ability to stand for extended periods',
      'Age: 21–40 years (relaxable for ex-police personnel and experienced candidates)',
      'Prior security experience preferred but not mandatory — comprehensive training provided',
      'Police verification clearance and clean criminal record are mandatory requirements',
      'Basic communication skills in Hindi and local language; English preferred for corporate sites'
    ],
    benefits: [
      'Equal pay for equal work with on-time salary and full ESI, PF, and gratuity benefits',
      '24/7 accident and life insurance coverage at no cost to the employee',
      'Free professional training including gender-sensitive security protocols and self-defence training',
      'Safe and respectful work environment with dedicated HR support for women employees',
      'Career growth to Lady Supervisor, Assistant Account Manager, and corporate roles'
    ],
    salary: '₹12,000 – ₹20,000/month depending on experience, location, and site type',
    postedAt: '2026-07-01'
  },
  {
    slug: 'business-development-executive',
    title: 'Business Development Executive',
    type: 'Full-time',
    department: 'Sales',
    locations: ['Jaipur (HQ)', 'Delhi'],
    description: `<h3>About the Role</h3>
<p>Silbar Security Services Pvt. Ltd. is looking for a dynamic and target-driven Business Development Executive to drive our growth in Rajasthan and the Delhi NCR region. As a BDE, you will be responsible for generating new business across all our service lines — manned guarding, electronic surveillance, facility management, fire safety, and security consulting. This is a field sales role that requires a hunter mindset, strong presentation skills, and the ability to navigate complex B2B sales cycles involving facility managers, procurement teams, and CXO-level decision makers.</p>
<h3>What You'll Do</h3>
<p>As a Business Development Executive, you will identify and prospect potential clients across industries including manufacturing, healthcare, hospitality, retail, education, and banking, conduct client meetings and site visits to understand security requirements and pitch tailored solutions, prepare and present professional proposals, quotations, and service presentations, negotiate contracts and pricing within approval authority, manage the complete sales cycle from lead generation to contract signing and onboarding, maintain a robust pipeline using CRM tools and report weekly sales forecasts, coordinate with the operations team for smooth handover of signed accounts, and represent Silbar at industry events, trade shows, and networking forums.</p>
<h3>Why Join Silbar Security Services Pvt. Ltd.</h3>
<p>The Indian private security industry is growing at 15–20% annually, and Silbar Security Services Pvt. Ltd. is positioned as one of the fastest-growing players in this space. As a BDE, you will have the opportunity to sell a comprehensive portfolio of services backed by ISO certifications, a 3-acre training center, and a 7,000+ workforce across 200+ cities. We offer an attractive compensation structure with a competitive base salary, uncapped incentives, travel allowance, and fast-track promotion based on performance.</p>`,
    responsibilities: [
      'Identify and prospect potential B2B clients across multiple industries requiring security and facility services',
      'Conduct client meetings, site visits, and security need assessments to pitch tailored Silbar solutions',
      'Prepare and present professional proposals, quotations, and presentations to decision-makers and procurement teams',
      'Negotiate contracts and pricing within approved authority to close new business within defined timelines',
      'Manage complete sales cycle from lead generation through contract signing and client onboarding',
      'Maintain accurate pipeline records using CRM tools and submit weekly sales forecasts to management'
    ],
    requirements: [
      'Graduate in any discipline; MBA in sales or marketing is a strong advantage',
      'Minimum 2 years of B2B field sales experience; security or facility management industry experience preferred',
      'Proven track record of meeting or exceeding sales targets in a service-based or solution-selling environment',
      'Excellent communication and presentation skills with fluency in Hindi and English',
      'Own vehicle and valid driving license mandatory for field sales across city and neighbouring areas',
      'Willingness to travel extensively within the assigned territory and occasionally to other cities'
    ],
    benefits: [
      'Competitive base salary with uncapped monthly performance incentives and annual bonus',
      'Travel allowance, fuel reimbursement, and mobile phone with data plan provided by the company',
      'In-depth product and sales training on security services, compliance, and industry knowledge',
      'Health insurance coverage and statutory benefits including PF after confirmation',
      'Fast-track promotion pathway based on consistent performance — BDE → Senior BDE → Regional Sales Manager'
    ],
    salary: '₹25,000 – ₹40,000/month plus uncapped incentives and travel allowance',
    postedAt: '2026-07-01'
  },
  {
    slug: 'field-supervisor',
    title: 'Field Security Supervisor',
    type: 'Full-time',
    department: 'Operations',
    locations: ['Jaipur', 'Delhi', 'Ahmedabad', 'Mumbai'],
    description: `<h3>About the Role</h3>
<p>Silbar Security Services Pvt. Ltd. is hiring Field Security Supervisors to strengthen our field operations across key cities. Field Supervisors are the mobile eyes and ears of our operations team, responsible for covering multiple client sites within a city or region. Unlike site-based supervisors who are stationed at one location, Field Supervisors travel to different client premises throughout the day to conduct inspections, performance checks, and surprise audits. This role is ideal for individuals who enjoy mobility, variety, and have the energy to cover multiple locations daily.</p>
<h3>What You'll Do</h3>
<p>As a Field Security Supervisor, you will visit 5–8 client sites daily to inspect guard performance and site conditions, conduct random patrol checks at irregular intervals to ensure guards remain alert and follow protocols, verify that all guards are in proper uniform, equipped, and maintaining post-specific discipline, interact with client representatives on-site to gather feedback and address minor concerns immediately, report site-level issues, attendance shortages, and equipment malfunctions to the account manager, assist in conducting on-the-job training for new guards deployed at client sites, and perform emergency visits when incidents or alarms are reported at any assigned site within your zone.</p>
<h3>Why Join Silbar Security Services Pvt. Ltd.</h3>
<p>Field Supervisors at Silbar enjoy a dynamic work environment where no two days are the same. You will develop a broad understanding of security operations across multiple industries and facility types — from factories and hospitals to corporate towers and residential societies. Silbar provides a company vehicle or substantial travel allowance, a mobile phone with data, and all necessary gear. We offer full statutory benefits, performance bonuses, and career growth to senior supervisory and account management roles.</p>`,
    responsibilities: [
      'Visit 5–8 client sites daily to conduct guard performance inspections and security compliance checks',
      'Conduct surprise patrol verification and random checks to ensure guard alertness and protocol adherence',
      'Verify guard uniform, equipment, attendance, and post-specific SOP compliance at every site visit',
      'Gather client feedback during site visits and address minor concerns or escalations on the spot',
      'Report daily findings, attendance issues, and equipment problems to the account manager with photographic evidence',
      'Provide on-the-job coaching and refresher training to guards during site visits'
    ],
    requirements: [
      'Minimum 12th pass; graduate degree preferred for supervisory roles with reporting responsibilities',
      'Minimum 1 year of experience in security operations or field service roles',
      'Valid driving license with confidence to ride or drive extensively within the city on a daily basis',
      'Good communication skills in Hindi, English, and local language of the deployment city',
      'Basic smartphone proficiency for taking geo-tagged photos, WhatsApp reporting, and digital attendance verification',
      'Physically fit with the ability to be on the move for 8–10 hours daily across multiple locations'
    ],
    benefits: [
      'On-time salary with full ESI, PF, and gratuity benefits from the date of joining',
      'Company-provided vehicle or substantial fuel and travel allowance for daily field visits',
      'Smartphone with data plan provided for digital reporting and communication',
      '24/7 accident and life insurance coverage for all field personnel',
      'Career growth to Account Manager and Regional Operations Manager roles with proven performance'
    ],
    salary: '₹16,000 – ₹25,000/month plus travel allowance',
    postedAt: '2026-07-01'
  },
  {
    slug: 'control-room-operator',
    title: 'Security Control Room Operator',
    type: 'Full-time',
    department: 'Technology',
    locations: ['Jaipur', 'Delhi'],
    description: `<h3>About the Role</h3>
<p>Silbar Security Services Pvt. Ltd. is seeking trained Security Control Room Operators to manage our 24/7 security monitoring centres in Jaipur and Delhi. Control Room Operators are responsible for monitoring live CCTV feeds from multiple client sites, managing alarm systems, dispatching response teams, and maintaining communication with field personnel. This role requires high alertness, the ability to multitask in a high-pressure environment, and comfort with technology and surveillance systems.</p>
<h3>What You'll Do</h3>
<p>As a Control Room Operator, you will monitor live CCTV feeds from multiple client sites across the city and region, respond to intrusion alarms, fire alarms, and panic alerts by verifying the cause and dispatching the nearest response team, maintain radio and phone communication with field guards and supervisors across all shifts, log all incidents, alarms, and actions taken in the incident management system with precise timestamps, escalate critical incidents to the account manager and senior management immediately, manage access control systems remotely including granting or denying entry for after-hours access, and prepare shift-wise incident summary reports for client review.</p>
<h3>Why Join Silbar Security Services Pvt. Ltd.</h3>
<p>The control room is the nerve centre of Silbar's security operations. Working as a Control Room Operator gives you exposure to advanced security technology — CCTV systems, video management software (VMS), access control platforms (ACS), fire alarm systems, and incident management tools. Silbar provides comprehensive training on all systems. We offer competitive salaries, shift allowances for night duty, and career growth to Senior Operator, Control Room Manager, and Technical Operations roles within the organization.</p>`,
    responsibilities: [
      'Monitor live CCTV feeds from multiple client sites and identify suspicious activities or security breaches',
      'Respond to intrusion alarms, fire alarms, and panic alerts by verifying cause and dispatching response teams',
      'Maintain continuous radio and phone communication with field guards and supervisors across all shifts',
      'Log all incidents, alarms, actions, and communications in the incident management system with accurate timestamps',
      'Escalate critical incidents, security breaches, and emergency situations to management immediately',
      'Prepare shift-wise incident summary reports and handover documentation for incoming shift operators'
    ],
    requirements: [
      'Minimum 12th pass; graduate degree preferred for this role',
      'Prior experience in security control room operations, CCTV monitoring, or similar roles preferred',
      'Comfort with technology — experience with CCTV systems, VMS software, and alarm monitoring platforms',
      'Excellent attention to detail with the ability to monitor multiple screens simultaneously',
      'Good communication skills in Hindi and English for clear radio and phone communication',
      'Willingness to work in rotating 24/7 shifts including night shifts, weekends, and public holidays'
    ],
    benefits: [
      'Competitive salary with night shift allowance and weekend duty benefits',
      'Comprehensive training on all surveillance and monitoring systems used across Silbar client sites',
      '24/7 accident and life insurance coverage for all control room personnel',
      'Statutory benefits including ESI, PF, and gratuity from the date of joining',
      'Career growth to Senior Control Room Operator, Control Room Manager, and Technical Operations roles'
    ],
    salary: '₹14,000 – ₹24,000/month plus night shift allowance',
    postedAt: '2026-07-01'
  },
  {
    slug: 'cctv-technician',
    title: 'CCTV Installation & Maintenance Technician',
    type: 'Full-time',
    department: 'Technology',
    locations: ['Jaipur', 'Delhi', 'Mumbai'],
    description: `<h3>About the Role</h3>
<p>Silbar Security Services Pvt. Ltd. requires skilled CCTV Installation and Maintenance Technicians for our Technology division. As a CCTV Technician, you will be responsible for the installation, configuration, troubleshooting, and maintenance of CCTV systems, access control devices, fire alarm panels, and related electronic security equipment across client sites in Jaipur, Delhi, and Mumbai. This is a hands-on technical role that requires both installation skills and the ability to diagnose and repair faults in existing systems efficiently.</p>
<h3>What You'll Do</h3>
<p>As a CCTV and Security Systems Technician, you will install CCTV cameras, DVRs/NVRs, cables (coaxial, CAT6, fiber), mounts, and power supplies at new client sites following design blueprints, configure camera settings including resolution, recording schedules, motion detection zones, and remote viewing access, install and configure biometric access control systems, boom barriers, and metal detectors, perform routine preventive maintenance visits to clean cameras, check storage health, verify backup functionality, and update firmware, troubleshoot and repair faulty cameras, recording equipment, power supplies, and network connectivity issues, maintain detailed installation records, service logs, and inventory of spare parts, and coordinate with the project manager and client representatives during installations to ensure minimal business disruption.</p>
<h3>Why Join Silbar Security Services Pvt. Ltd.</h3>
<p>Silbar Security Services Pvt. Ltd. is expanding its electronic surveillance division rapidly, installing and maintaining security systems for corporate clients, factories, hospitals, and government facilities. As a CCTV Technician at Silbar, you will work with leading brands — CP Plus, Hikvision, Dahua, Honeywell, Bosch, and ZKTeco — gaining valuable hands-on experience. We offer a competitive salary, travel allowances, tool kit provision, and opportunities for advanced technical training and certification sponsored by the company.</p>`,
    responsibilities: [
      'Install CCTV cameras, DVRs/NVRs, cabling, mounts, and power supplies at new client sites as per design plans',
      'Configure camera settings, recording schedules, motion detection, remote viewing access, and mobile app setup',
      'Install and configure biometric access control systems, boom barriers, and metal detectors at entry points',
      'Perform preventive maintenance visits including cleaning, storage health checks, backup verification, and firmware updates',
      'Troubleshoot and repair faulty cameras, recording equipment, power supply issues, and network connectivity problems',
      'Maintain detailed installation records, service logs, inventory of spare parts, and warranty documentation'
    ],
    requirements: [
      'ITI or diploma in Electronics, Electrical, or related technical field; relevant experience may substitute formal education',
      'Minimum 1 year of hands-on experience in CCTV installation, maintenance, and troubleshooting',
      'Hands-on experience with at least two major brands: CP Plus, Hikvision, Dahua, Honeywell, Bosch, or ZKTeco',
      'Knowledge of cabling standards, network basics (IP addressing, PoE, router configuration), and power supply calculations',
      'Valid driving license and willingness to travel within the city for service calls at multiple client sites',
      'Comfort with heights for camera installation on poles, walls, and ceilings using ladders and scaffolding'
    ],
    benefits: [
      'Competitive salary with field service allowance and travel reimbursement for client site visits',
      'Company-provided tool kit, testing equipment, and safety gear for installation and maintenance work',
      'Sponsorship for advanced technical certifications from leading security equipment manufacturers',
      'Statutory benefits including ESI, PF, and gratuity; 24/7 accident insurance coverage',
      'Career growth to Senior Technician, Installation Team Lead, and Technical Manager roles'
    ],
    salary: '₹15,000 – ₹28,000/month depending on experience and technical certifications',
    postedAt: '2026-07-01'
  },
  {
    slug: 'hr-executive',
    title: 'HR & Compliance Executive',
    type: 'Full-time',
    department: 'Human Resources',
    locations: ['Jaipur (HQ)'],
    description: `<h3>About the Role</h3>
<p>Silbar Security Services Pvt. Ltd. is looking for an experienced HR & Compliance Executive to join our Human Resources team at the Jaipur headquarters. Given the labour-intensive nature of the security industry with 7,000+ employees across 200+ cities, this role is critical for managing the complete employee lifecycle — from recruitment and onboarding to payroll, statutory compliance, and grievance handling. The HR & Compliance Executive ensures that Silbar remains a compliant and employee-friendly organization.</p>
<h3>What You'll Do</h3>
<p>As an HR & Compliance Executive, you will manage end-to-end recruitment for field and corporate positions including job postings, screening, interviews, and offer letters, coordinate onboarding and induction programs for new hires including documentation, uniform issuance, and training scheduling, maintain and update employee records in the HRMS system including attendance, leaves, and personal information, process monthly payroll inputs for assigned regions including overtime, deductions, and incentives, ensure statutory compliance with ESI, PF, Gratuity, Bonus Act, Minimum Wages Act, Contract Labour Act, and PSARA requirements across all states of operation, handle employee grievances, disciplinary matters, and exit formalities with confidentiality and professionalism, prepare compliance reports for audits, client requirements, and government submissions, and coordinate with operations and training teams for skill gap identification and training programs.</p>
<h3>Why Join Silbar Security Services Pvt. Ltd.</h3>
<p>Silbar Security Services Pvt. Ltd. is a PSARA-licensed organization operating across 19+ states, making this role a rich learning opportunity for HR professionals interested in multi-state labour law compliance. You will gain hands-on experience managing a large, distributed workforce in one of India's most regulated industries. We offer a professional work environment, competitive salary, and opportunities for growth to Senior HR and HR Manager roles.</p>`,
    responsibilities: [
      'Manage end-to-end recruitment for field and corporate positions from job posting to offer letter issuance',
      'Coordinate employee onboarding, induction programs, documentation, and HRMS data management',
      'Process monthly payroll inputs for assigned regions including attendance, OT, deductions, and incentives',
      'Ensure statutory compliance with ESI, PF, Gratuity, Bonus Act, Minimum Wages Act, and Contract Labour Act',
      'Handle employee grievances, disciplinary proceedings, and exit formalities with confidentiality',
      'Prepare compliance reports for client audits, government submissions, and internal management reviews'
    ],
    requirements: [
      'Graduate or postgraduate in Human Resources, Labour Law, Business Administration, or related field',
      'Minimum 2 years of HR experience with exposure to payroll processing and statutory compliance',
      'Working knowledge of ESI, PF, Gratuity, Minimum Wages Act, Bonus Act, and Contract Labour Regulation Act',
      'Proficiency in MS Office (especially Excel) and experience with HRMS or payroll software',
      'Strong communication and interpersonal skills with fluency in Hindi and English',
      'High integrity and ability to handle sensitive employee data and disciplinary matters with confidentiality'
    ],
    benefits: [
      'Competitive salary with annual performance-based increments and festival bonuses',
      'Professional development opportunities including HR certification sponsorship and labour law workshops',
      'Health insurance coverage for self and family members after confirmation',
      'Standard statutory benefits including PF, ESIC, and gratuity',
      'Career growth to Senior HR Executive, HR Manager, and Head of HR roles'
    ],
    salary: '₹22,000 – ₹35,000/month depending on experience and qualifications',
    postedAt: '2026-07-01'
  },
  {
    slug: 'training-officer',
    title: 'Security Training Officer',
    type: 'Full-time',
    department: 'Training',
    locations: ['Jaipur'],
    description: `<h3>About the Role</h3>
<p>Silbar Security Services Pvt. Ltd. is seeking a qualified Security Training Officer to join our Training division based at our dedicated 3-acre training center in Jaipur. The Training Officer is responsible for designing, conducting, and evaluating training programs for security guards, supervisors, and corporate staff. This role is ideal for retired defence or police personnel, or experienced security professionals who have a passion for teaching and developing others in the security profession.</p>
<h3>What You'll Do</h3>
<p>As a Security Training Officer, you will conduct classroom and practical training sessions for newly recruited security guards covering basic security protocols, unarmed combat, access control, report writing, and professional conduct, design and update training curriculum to align with industry standards, ISO requirements, and client-specific needs, conduct refresher training programs for existing guards and supervisors to address skill gaps and new requirements, train armed guards in weapons handling, safety protocols, and use-of-force legal framework, administer written and practical assessments to evaluate trainee competence and issue completion certificates, maintain training records, attendance, and assessment results for compliance and audit purposes, coordinate with operations and HR teams to schedule training batches based on recruitment flow, and contribute to the development of training aids, manuals, and standard operating procedures.</p>
<h3>Why Join Silbar Security Services Pvt. Ltd.</h3>
<p>Silbar Security Services Pvt. Ltd.'s training center is the cornerstone of our service quality. As a Training Officer, you will have the satisfaction of shaping every guard who joins our force, directly impacting the safety of our clients and the careers of our employees. You will work in a professional training environment with access to training aids, firing ranges, and modern teaching tools. We offer a stable schedule, excellent statutory benefits, and opportunities to grow into Senior Training Officer and Head of Training roles.</p>`,
    responsibilities: [
      'Conduct classroom and practical training sessions for new recruits covering security protocols and professional conduct',
      'Design and update training curriculum to align with industry standards, ISO certifications, and client requirements',
      'Conduct refresher training for existing guards and supervisors to address skill gaps and evolving security needs',
      'Train armed guards in weapons handling, safety protocols, and legal framework for use of force',
      'Administer assessments to evaluate trainee competence and issue training completion certificates',
      'Maintain training records, attendance logs, and assessment results for audits and compliance documentation'
    ],
    requirements: [
      'Ex-servicemen (Army, Navy, Air Force), ex-police personnel, or experienced security professionals preferred',
      'Minimum 3 years of experience in security operations, training, or law enforcement',
      'Proven experience in conducting training programs for security personnel or military units',
      'Strong knowledge of security protocols, unarmed combat, fire safety, first aid, and access control procedures',
      'Good communication and presentation skills with fluency in Hindi and English',
      'Basic computer literacy for preparing training materials, reports, and maintaining digital training records'
    ],
    benefits: [
      'Competitive salary with recognition for military or police service background',
      'Stable daytime schedule with no night shifts or rotational duty',
      'Professional training environment with access to modern training aids, ranges, and teaching tools',
      'Full statutory benefits including ESI, PF, and gratuity with 24/7 accident insurance',
      'Career growth to Senior Training Officer, Head of Training, and Operations Management roles'
    ],
    salary: '₹20,000 – ₹35,000/month depending on experience, qualifications, and service background',
    postedAt: '2026-07-01'
  },
  {
    slug: 'fire-safety-officer',
    title: 'Fire Safety Officer',
    type: 'Full-time',
    department: 'Operations',
    locations: ['Jaipur', 'Delhi', 'Mumbai'],
    description: `<h3>About the Role</h3>
<p>Silbar Security Services Pvt. Ltd. is hiring certified Fire Safety Officers for deployment at industrial facilities, warehouses, hospitals, hotels, and commercial complexes across Jaipur, Delhi, and Mumbai. Fire Safety Officers at Silbar are responsible for preventing fire incidents through proactive risk assessment, maintaining fire-fighting equipment in readiness, and leading emergency response during fire events. This role combines technical knowledge of fire safety systems with practical leadership during emergencies.</p>
<h3>What You'll Do</h3>
<p>As a Fire Safety Officer, you will conduct regular fire risk assessments and safety audits of assigned client premises to identify fire hazards and recommend corrective actions, inspect and maintain all fire-fighting equipment including fire extinguishers, hydrant systems, sprinklers, smoke detectors, and fire alarm panels, train security guards and client staff in fire safety protocols including fire extinguisher operation, evacuation procedures, and assembly point management, lead fire warden teams and conduct scheduled and surprise fire drills with documentation of response times and evacuation efficiency, prepare and maintain fire safety documentation including equipment registers, inspection logs, and drill reports required for fire NOC compliance, coordinate with the local fire department during inspections, emergencies, and renewal of fire NOCs, respond immediately to any fire alarm or fire incident and lead the on-ground fire-fighting response, and investigate fire incidents to determine root cause and recommend preventive measures.</p>
<h3>Why Join Silbar Security Services Pvt. Ltd.</h3>
<p>Fire safety is a critical and growing requirement across Indian industries, driven by stricter fire NOC enforcement and insurance compliance. As a Fire Safety Officer at Silbar, you will be at the forefront of this essential function, with opportunities to work across diverse facility types and industries. We offer competitive compensation, full statutory benefits, and support for advanced fire safety certifications including NEBOSH Fire Safety and NFPA certifications.</p>`,
    responsibilities: [
      'Conduct regular fire risk assessments and safety audits to identify hazards and recommend corrective actions',
      'Inspect and maintain fire-fighting equipment including extinguishers, hydrants, sprinklers, detectors, and alarm panels',
      'Train security guards and client staff in fire safety protocols, extinguisher operation, and evacuation procedures',
      'Lead fire warden teams and conduct scheduled and surprise fire drills with documented response time analysis',
      'Maintain fire safety documentation, equipment registers, inspection logs, and drill reports for NOC compliance',
      'Investigate fire incidents to determine root cause and prepare detailed incident reports with preventive recommendations'
    ],
    requirements: [
      'Diploma or certificate in Fire Safety Engineering, Industrial Safety, or Fire Prevention from a recognized institute',
      'Minimum 2 years of experience in fire safety roles in industrial, commercial, or facility management settings',
      'Hands-on knowledge of fire-fighting equipment, fire alarm panels, hydrant systems, and sprinkler systems',
      'Good physical fitness and ability to respond to emergencies including climbing stairs and lifting equipment',
      'Strong communication skills in Hindi and English for conducting training and preparing reports',
      'Valid driving license preferred for Fire Safety Officer roles covering multiple client sites'
    ],
    benefits: [
      'Competitive salary with recognition for professional fire safety certifications',
      'Sponsorship for advanced certifications including NEBOSH Fire Safety, NFPA, or IFE qualifications',
      'Full statutory benefits including ESI, PF, and gratuity from the date of joining',
      '24/7 accident and life insurance coverage for all fire safety personnel',
      'Career growth to Senior Fire Safety Officer, Fire Safety Manager, and HSE Head roles'
    ],
    salary: '₹22,000 – ₹38,000/month depending on certifications and experience',
    postedAt: '2026-07-01'
  },
  {
    slug: 'administrative-assistant',
    title: 'Administrative Assistant',
    type: 'Full-time',
    department: 'Administration',
    locations: ['Jaipur (HQ)'],
    description: `<h3>About the Role</h3>
<p>Silbar Security Services Pvt. Ltd. is seeking a well-organized and proactive Administrative Assistant to support our corporate office operations at the Jaipur headquarters. The Administrative Assistant is the backbone of our office — ensuring smooth day-to-day operations, coordinating between departments, managing office supplies and facilities, handling travel and accommodation arrangements for management and visiting staff, and providing general administrative support to multiple teams including operations, HR, finance, and sales.</p>
<h3>What You'll Do</h3>
<p>As an Administrative Assistant, you will manage incoming and outgoing correspondence including emails, phone calls, and physical mail, coordinate travel arrangements including flight, train, and hotel bookings for management and field staff, maintain office supplies inventory and place purchase orders as needed, manage office facilities coordination including housekeeping, maintenance, and vendor management, maintain and organize physical and digital filing systems for contracts, employee documents, and compliance records, assist the HR and finance teams with document collection, data entry, and verification tasks, coordinate meetings, appointments, and calendar management for senior management, handle visitor reception and front desk duties as required, and assist in organizing company events, training sessions, and management meetings.</p>
<h3>Why Join Silbar Security Services Pvt. Ltd.</h3>
<p>This role offers a great entry point into a growing organization where you will gain exposure to multiple functions — HR, operations, finance, and sales. You will work directly with senior management and department heads, learning how a 7,000+ employee organization functions. Silbar offers a professional office environment, competitive salary, all statutory benefits, and opportunities to grow into specialist or supervisory roles in administration, HR, or operations.</p>`,
    responsibilities: [
      'Manage incoming and outgoing correspondence including emails, phone calls, and physical mail distribution',
      'Coordinate travel arrangements including flight, train, hotel bookings, and vehicle coordination for management',
      'Maintain office supplies inventory, place purchase orders, and manage vendor relationships for office consumables',
      'Maintain organized physical and digital filing systems for contracts, employee documents, and compliance records',
      'Assist HR and finance teams with document collection, data entry, verification tasks, and audit support',
      'Coordinate meetings, appointments, and calendar management for senior management and department heads'
    ],
    requirements: [
      'Graduate in any discipline; diploma in Office Management or Secretarial Practice is a plus',
      'Minimum 1 year of experience in administrative roles, office management, or as a personal assistant',
      'Proficiency in MS Office (Word, Excel, PowerPoint, Outlook) and general computer skills',
      'Strong organizational skills with the ability to prioritize tasks and manage multiple requests simultaneously',
      'Good communication skills in Hindi and English with professional telephone etiquette',
      'Pleasant personality and professional demeanour suitable for corporate office environment'
    ],
    benefits: [
      'Competitive salary with annual performance-based increments and festival bonuses',
      'Professional office environment with daytime working hours (no night shifts or rotational duty)',
      'Health insurance coverage and full statutory benefits including ESI, PF, and gratuity',
      'Exposure to multiple departments for broad career development within the organization',
      'Career growth to Senior Administrative Assistant, Office Manager, or departmental specialist roles'
    ],
    salary: '₹14,000 – ₹22,000/month depending on experience and qualifications',
    postedAt: '2026-07-01'
  }
]

export const CAREER_SLUGS = CAREERS.map((c) => c.slug)
