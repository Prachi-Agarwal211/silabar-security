export type FAQCategory = 'General' | 'Compliance' | 'Services' | 'Industries' | 'Operations'

export type FAQ = {
  q: string
  a: string
  category: FAQCategory
}

export const FAQS: FAQ[] = [
  // General (8)
  {
    category: 'General',
    q: 'How long has Silbar Security been operating in India?',
    a: 'Silbar Security was established with a vision to transform the private security industry. Founded initially as a proprietorship in Jaipur, Rajasthan, it was incorporated as Silbar Security Services Pvt. Ltd. in October 2025.'
  },
  {
    category: 'General',
    q: 'Are you a PAN India security company?',
    a: 'Yes, we are a professionally managed PAN India Security Guard Company. While our headquarters is in Jaipur, Rajasthan, we have branch offices and operations across major cities in India.'
  },
  {
    category: 'General',
    q: 'Do you provide security guards for both residential and commercial properties?',
    a: 'Yes, we provide security solutions for a wide range of establishments including residential communities, commercial buildings, corporate offices, and industrial plants.'
  },
  {
    category: 'General',
    q: 'How do you recruit your security personnel?',
    a: 'Our recruitment process is rigorous and includes physical fitness tests, educational verification, background checks, and police verification before any guard is inducted into our training program.'
  },
  {
    category: 'General',
    q: 'Can I get a customized security quote for my specific needs?',
    a: 'Absolutely. We conduct a free site survey and risk assessment before providing a customized security proposal tailored to your facility\'s unique requirements and budget.'
  },
  {
    category: 'General',
    q: 'What makes Silbar Security different from local unorganized agencies?',
    a: 'We differentiate ourselves through 100% statutory compliance, rigorous training, technology integration (like guard tour systems), and a dedicated Quick Response Team (QRT) for emergencies.'
  },
  {
    category: 'General',
    q: 'How quickly can you deploy security guards at my site?',
    a: 'Depending on the location and specific requirements, we can typically mobilize and deploy trained security personnel within 48 to 72 hours of contract signing.'
  },
  {
    category: 'General',
    q: 'Do you provide female security guards?',
    a: 'Yes, we provide specially trained female security guards for corporate offices, malls, educational institutions, and healthcare facilities where frisking and handling female visitors is required.'
  },

  // Compliance (8)
  {
    category: 'Compliance',
    q: 'Are you a PSARA licensed security agency?',
    a: 'Yes, Silbar Security Services Pvt. Ltd. operates in strict compliance with the Private Security Agencies Regulation Act (PSARA) 2005.'
  },
  {
    category: 'Compliance',
    q: 'Do you comply with all labor laws (PF, ESI, Minimum Wage)?',
    a: 'Absolutely. We are 100% compliant with all statutory requirements including EPF, ESIC, Minimum Wages Act, Bonus Act, and Gratuity. We share monthly compliance reports with our clients.'
  },
  {
    category: 'Compliance',
    q: 'Are all your security guards police verified?',
    a: 'Yes, police verification is a mandatory pre-requisite for employment at Silbar Security. No guard is deployed without a cleared police verification report.'
  },
  {
    category: 'Compliance',
    q: 'Do you have ISO certification?',
    a: 'We operate on standardized Quality Management Systems aligned with ISO 9001:2015 principles to ensure consistent service delivery.'
  },
  {
    category: 'Compliance',
    q: 'Are your guards trained as per PSARA guidelines?',
    a: 'Yes, all our guards undergo mandatory training covering physical fitness, fire safety, first aid, crowd control, and legal protocols as mandated by PSARA.'
  },
  {
    category: 'Compliance',
    q: 'What happens in case of a compliance audit by the government?',
    a: 'Since we maintain transparent digital records of all PF, ESI challans and wage registers, our clients face zero liability during labor department audits.'
  },
  {
    category: 'Compliance',
    q: 'Do you provide compliance dashboards to clients?',
    a: 'Yes, we provide monthly MIS reports containing PF/ESI challans, attendance sheets, and wage registers along with our invoices.'
  },
  {
    category: 'Compliance',
    q: 'Who holds liability in case of an incident on site?',
    a: 'We maintain comprehensive insurance coverage including Workmen\'s Compensation and Fidelity Guarantee insurance to protect our clients from financial liabilities.'
  },

  // Services (8)
  {
    category: 'Services',
    q: 'What is the difference between a Security Guard and a Security Supervisor?',
    a: 'A Security Guard is responsible for access control, patrolling, and monitoring. A Security Supervisor oversees a team of guards, handles shift rosters, manages client communication, and handles escalations.'
  },
  {
    category: 'Services',
    q: 'Do you provide Armed Security Guards?',
    a: 'Yes, we provide licensed Armed Security Guards (Gunmen) for banks, cash-in-transit, VIP protection, and high-risk industrial sites.'
  },
  {
    category: 'Services',
    q: 'What is Bouncer or Executive Protection service?',
    a: 'We provide physically robust, trained bouncers and Personal Security Officers (PSOs) for event security, crowd management, and executive protection.'
  },
  {
    category: 'Services',
    q: 'Do you offer Electronic Surveillance solutions?',
    a: 'Yes, we provide end-to-end electronic security solutions including CCTV installation, biometric access control, boom barriers, and remote monitoring.'
  },
  {
    category: 'Services',
    q: 'Can you provide housekeeping or facility management services?',
    a: 'Yes, alongside security, we offer comprehensive facility management services including housekeeping, pantry management, and maintenance staff.'
  },
  {
    category: 'Services',
    q: 'Do you provide fire safety personnel?',
    a: 'We provide trained fire safety officers and fire guards equipped to handle firefighting equipment and execute evacuation protocols.'
  },
  {
    category: 'Services',
    q: 'What is a Quick Response Team (QRT)?',
    a: 'Our QRT comprises highly trained personnel in patrolling vehicles who respond immediately to distress calls, perimeter breaches, or emergencies at client sites.'
  },
  {
    category: 'Services',
    q: 'Do you offer security audits?',
    a: 'Yes, our senior security consultants conduct comprehensive security audits to identify vulnerabilities in your premises and recommend customized solutions.'
  },

  // Industries (8)
  {
    category: 'Industries',
    q: 'Do you have experience securing manufacturing plants?',
    a: 'Yes, we secure numerous industrial plants. Our guards are trained in material movement checking (returnable/non-returnable gate passes), weighing scale operations, and labor frisking.'
  },
  {
    category: 'Industries',
    q: 'How do you handle security for IT parks and corporate offices?',
    a: 'For corporate environments, we deploy soft-skilled, English-speaking guards trained in visitor management systems, access control, and emergency evacuations.'
  },
  {
    category: 'Industries',
    q: 'Can you secure large construction sites?',
    a: 'Yes, construction sites require specialized perimeter security and material theft prevention. We deploy strict access control and night-vision equipped patrolling teams.'
  },
  {
    category: 'Industries',
    q: 'Do you provide security for educational institutions?',
    a: 'Yes, we secure schools and universities with a focus on child safety, anti-ragging measures, traffic management during peak hours, and strict visitor control.'
  },
  {
    category: 'Industries',
    q: 'What is your approach to hospital security?',
    a: 'Healthcare security requires high empathy and crisis management. Our guards are trained in crowd control in emergency wards, patient visitor management, and preventing equipment theft.'
  },
  {
    category: 'Industries',
    q: 'Do you secure retail malls and showrooms?',
    a: 'Yes, we provide loss prevention officers, CCTV operators, and floor guards trained to identify shoplifting while maintaining a welcoming environment for shoppers.'
  },
  {
    category: 'Industries',
    q: 'How do you secure residential societies?',
    a: 'We deploy guards trained in using visitor management apps (like MyGate), monitoring domestic help, managing parking, and conducting night patrols.'
  },
  {
    category: 'Industries',
    q: 'Do you provide event security?',
    a: 'Yes, we provide temporary deployment of bouncers, guards, and traffic marshals for corporate events, weddings, concerts, and exhibitions.'
  },

  // Operations (8)
  {
    category: 'Operations',
    q: 'How do you monitor guards working during the night shift?',
    a: 'We use GPS-enabled Guard Tour Systems. Guards must scan NFC tags placed around the perimeter at specific intervals. Our 24/7 control room monitors this, and night field officers conduct surprise physical checks.'
  },
  {
    category: 'Operations',
    q: 'What happens if a guard takes leave or is absent?',
    a: 'We maintain a 15% reliever pool. If a scheduled guard does not report to duty, a trained replacement is dispatched immediately from our nearest branch office.'
  },
  {
    category: 'Operations',
    q: 'Who should we contact in case of an emergency?',
    a: 'Clients are provided with a 3-level escalation matrix. Level 1 is the Site Supervisor, Level 2 is the Field Officer/Area Manager, and Level 3 is the Operations Head available 24/7.'
  },
  {
    category: 'Operations',
    q: 'How frequently do your officers visit the site?',
    a: 'Our Area Managers and Field Officers conduct weekly daytime meetings with the client and bi-weekly surprise night checks to ensure operational readiness.'
  },
  {
    category: 'Operations',
    q: 'Do your guards carry communication equipment?',
    a: 'Yes, depending on the site size, we equip our guards with Walkie-Talkies, smartphones with our proprietary reporting app, and emergency panic buttons.'
  },
  {
    category: 'Operations',
    q: 'How do you handle grievances or complaints regarding a guard?',
    a: 'If a client is dissatisfied with a guard\'s performance, we guarantee a replacement within 24 hours. We then retrain or reassign the guard based on the feedback.'
  },
  {
    category: 'Operations',
    q: 'What uniforms and equipment do you provide?',
    a: 'We provide complete seasonal uniforms (summer/winter), safety shoes, lanyards, batons, torches, umbrellas, and reflective jackets as per PSARA regulations.'
  },
  {
    category: 'Operations',
    q: 'How do we process monthly billing and attendance?',
    a: 'Attendance is captured biometrically or via our app. The attendance sheet is verified by the client on the last day of the month, and invoices are generated by the 2nd with a 15-day payment cycle.'
  }
]
