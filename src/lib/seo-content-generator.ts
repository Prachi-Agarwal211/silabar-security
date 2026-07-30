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
  sikkim: [
    'pharmaceutical & biotech manufacturing units (SIDCOL, Rangpo)',
    'tourism & hospitality — hotels, homestays, monasteries',
    'hydropower plants & energy infrastructure',
    'tea gardens & horticulture estates',
    'hospitals & healthcare facilities',
    'educational institutions (universities, research centres)',
    'government & administrative buildings',
    'commercial complexes & shopping centres',
    'residential societies & townships',
    'IT & ITeS (emerging, Gangtok)',
    'warehouses & logistics hubs',
    'event & convention venues',
  ],
  nagaland: [
    'tourism & hospitality — Hornbill Festival venues, resorts',
    'handicraft & handloom clusters',
    'government & administrative facilities',
    'hospitals & healthcare centres',
    'educational institutions (universities, colleges)',
    'agriculture & horticulture processing units',
    'retail & commercial complexes (Dimapur, Kohima)',
    'residential communities & colonies',
    'hotels & tourism properties',
    'bamboo & wood processing industries',
    'financial offices & banking hubs',
    'infrastructure & construction project sites',
  ],
  manipur: [
    'IT parks & ITeS centres (Imphal)',
    'tourism & hospitality properties',
    'handicraft & handloom manufacturing clusters',
    'hospitals & healthcare institutions',
    'educational institutions & research centres',
    'government & secretariat facilities',
    'retail & commercial complexes',
    'residential societies & townships',
    'agriculture & food processing units',
    'warehouses & logistics hubs',
    'hotels & event venues',
    'banks, ATMs & financial offices',
  ],
  mizoram: [
    'government & administrative facilities (Aizawl)',
    'tourism & hospitality — eco-tourism, resorts',
    'hospitals & healthcare centres',
    'educational institutions & colleges',
    'retail & commercial establishments',
    'residential communities',
    'agriculture & bamboo processing units',
    'food processing & packaging industries',
    'hotels & guesthouses',
    'banks & financial institutions',
    'warehouses & cold storage',
    'infrastructure & construction project sites',
  ],
  meghalaya: [
    'tourism & hospitality — hill stations, resorts (Shillong, Cherrapunji)',
    'mining & mineral processing (coal, limestone)',
    'educational institutions & university campuses (Shillong)',
    'hospitals & healthcare facilities',
    'government & secretariat buildings',
    'retail & commercial complexes',
    'residential societies & townships',
    'IT parks & tech centres (emerging)',
    'agriculture & horticulture (tea, fruits, spices)',
    'hotels, homestays & event venues',
    'warehouses & logistics hubs',
    'banking & financial offices',
  ],
  tripura: [
    'government & administrative facilities (Agartala)',
    'tourism & hospitality — heritage sites, palaces, resorts',
    'power plants & energy infrastructure (ONGC, gas-based)',
    'handicraft & handloom clusters',
    'hospitals & healthcare institutions',
    'educational institutions & universities',
    'IT parks & ITeS centres (Agartala)',
    'retail & commercial complexes',
    'residential communities & townships',
    'agriculture & food processing (rubber, tea, bamboo)',
    'warehouses & logistics hubs',
    'hotels & event venues',
  ],
}

/** State-specific security challenges — cities draw from their state's pool before falling back to generic */
const STATE_CHALLENGES: Record<string, ChallengeItem[]> = {
  rajasthan: [
    { title: 'Heritage hotel security complexity', desc: 'Rajasthan\'s palace hotels and heritage properties face unique challenges — unauthorised photography, trespassing, and managing high tourist footfall across sprawling, multi-entrance properties without disrupting guest experience.' },
    { title: 'Mining site perimeter protection', desc: 'Zinc, marble, and sandstone mining operations in remote Rajasthan locations need 24/7 perimeter security to prevent equipment theft, illegal extraction, and unauthorized access across vast, hard-to-monitor sites.' },
    { title: 'Textile & garment factory material loss', desc: 'Pali and Bhilwara textile units lose significant value at loading bays. Without structured material challan and vehicle check systems, fabric and finished goods disappear during dispatch.' },
    { title: 'Solar & wind farm remote guarding', desc: 'Renewable energy installations across Rajasthan\'s desert and rural stretches face vandalism, cable theft, and trespassing where local police response times are long.' },
    { title: 'Coaching hub crowd control', desc: 'Kota and Jaipur\'s student coaching hubs create dense pedestrian traffic, parking chaos, and late-night security concerns. Guards must manage entry, vehicle flow, and after-hours campus safety.' },
    { title: 'Jewellery unit cash & valuables handling', desc: 'Gems and jewellery manufacturing units in Jaipur handle high-value inventory daily. Internal theft, cash movement during payroll, and vendor access need layered security protocols.' },
    { title: 'Heritage site visitor management', desc: 'Tourist-heavy cities like Udaipur and Jodhpur see thousands of daily visitors at heritage sites. Guards must balance access control with hospitality — firm on security, polite with guests.' },
    { title: 'Industrial estate material theft', desc: 'Neemrana and Bhiwadi industrial belts experience material theft during night shifts. Perimeter patrol gaps and unguarded rear gates create vulnerabilities in multi-tenant estates.' },
  ],
  delhi: [
    { title: 'Corporate IT park multi-entry challenge', desc: 'Delhi\'s IT parks and corporate offices operate with multiple entry points, parking levels, and visitor-heavy lobbies. Guards must manage vehicle checks, identity verification, and professional front desk presence simultaneously.' },
    { title: 'Embassy-adjacent sensitive zone security', desc: 'Properties near diplomatic enclaves face elevated security scrutiny. Guards need heightened alertness for suspicious activity, coordinated response protocols, and discretion around VIP-protected zones.' },
    { title: 'High-rise residential tower management', desc: 'Delhi\'s premium residential towers in Dwarka, Rohini, and Vasant Kunj need dedicated gate management, visitor verification, parcel handling, and night patrols across multiple floors and basements.' },
    { title: 'Retail mall high-footfall control', desc: 'Delhi malls experience peak weekend footfall of 50,000+. Guards need de-escalation skills, crowd management training, and coordinated incident response across parking, entry gates, and food courts.' },
    { title: 'Warehouse & logistics night operations', desc: 'NCR warehouse clusters operate night dispatch windows with high vehicle throughput. Material challan verification, seal checks, and driver identification need rigorous SOPs to prevent cargo theft.' },
    { title: 'Government building protocol compliance', desc: 'Delhi government buildings require protocol-compliant security — visitor logs, bag screening, ID verification, and coordination with central security agencies. Private guards must follow strict service-level rules.' },
    { title: 'Metro station adjacent footfall management', desc: 'Properties near Delhi metro stations face concentrated footfall surges during peak hours. Security teams must manage access without creating bottlenecks that cause commuter congestion.' },
    { title: 'Banks & ATMs cash logistics security', desc: 'Delhi\'s financial district has high-value cash movement between banks, ATMs, and corporate treasuries. Armoured van coordination, cash room access logs, and after-hours vault monitoring are critical.' },
  ],
  gujarat: [
    { title: 'Chemical plant hazardous zone access', desc: 'Ankleshwar and Dahej chemical plants need strict access control around hazardous material storage zones. Guards must verify PPE compliance, manage contractor entry, and escalate safety violations immediately.' },
    { title: 'Port & CFS cargo theft prevention', desc: 'Gujarat\'s ports and container freight stations face cargo theft during loading, unloading, and storage. Seal verification, container yard patrols, and driver handover protocols prevent losses.' },
    { title: 'Diamond unit high-value merchandise protection', desc: 'Surat\'s diamond manufacturing units handle high-value inventory requiring bag searches, work-in-progress reconciliation, and restricted area access. Internal theft prevention and CCTV integration are essential.' },
    { title: 'Pharma plant clean-room entry protocols', desc: 'Pharmaceutical manufacturing units require controlled-access clean room environments. Guards must enforce gowning protocols, hygiene discipline, and material pass-through systems without contaminating production zones.' },
    { title: 'Textile park fire safety compliance', desc: 'Textile parks face elevated fire risks from fabric dust and chemical storage. Guards must conduct weekly fire extinguisher checks, evacuation drills, and hot work permit verification.' },
    { title: 'SEZ multi-tenant estate coordination', desc: 'Gujarat SEZs house multiple manufacturing units under one perimeter. Guards coordinate across tenants for common gate access, visitor passes, and shared emergency response plans.' },
    { title: 'Solar park cable theft prevention', desc: 'Large solar installations in Kutch and Banaskantha face copper cable theft. Night patrols, perimeter intrusion detection, and local police coordination are critical for energy infrastructure protection.' },
    { title: 'Auto & EV plant shift change management', desc: 'Auto and EV plants in Sanand and Mandal operate multiple shifts with thousands of workers entering and exiting. Guard checkpoints must clear worker queues efficiently while preventing unauthorized entry.' },
  ],
  maharashtra: [
    { title: 'IT park high-density access control', desc: 'Mumbai and Pune IT parks house 10,000+ employees daily. Guards must manage fast-paced visitor check-ins, lift lobby security, parking allocation, and emergency evacuations across multi-building campuses.' },
    { title: 'Port logistics cargo chain integrity', desc: 'JNPT and Mumbai port belts face cargo theft across the logistics chain — from container yard to truck dispatch. Seal verification, vehicle tracking, and loading bay supervision are essential.' },
    { title: 'High-rise residential fire evacuation', desc: 'Mumbai\'s high-rise apartments need rigorous fire safety protocols — weekly extinguisher checks, assembly point drills, and coordination with building fire safety officers during emergencies.' },
    { title: 'Pharma & biotech R&D security', desc: 'Pharma R&D units need layered access control for sensitive research zones, intellectual property protection, and visitor NDAs. Guards must monitor material exit and enforce data room protocols.' },
    { title: 'Auto plant tool & equipment theft', desc: 'Pune and Nashik auto plants experience tool crib theft during shift handovers. Structured tool issue systems, contractor bag checks, and CCTV oversight of tool rooms prevent losses.' },
    { title: 'Financial district lobby management', desc: 'Mumbai BKC offices need reception-area security with professional presentation, visitor pre-registration, meeting room access control, and coordination with building concierge services.' },
    { title: 'Nightclub & entertainment venue crowd control', desc: 'Pune and Mumbai nightlife venues require guards trained in intoxication management, age verification, and non-confrontational crowd de-escalation during peak hours.' },
    { title: 'Hospital emergency room security', desc: 'Multi-specialty hospitals face ER security challenges — distressed relatives, agitated patients, and late-night footfall. Guards need crisis intervention skills and sensitivity training.' },
  ],
  karnataka: [
    { title: 'Tech campus bike & vehicle theft', desc: 'Bengaluru tech parks with 50,000+ employees face high vehicle theft risk in sprawling parking lots. Structured patrol routes, CCTV blind-spot coverage, and bike verification at exits are essential.' },
    { title: 'Startup co-working space access', desc: 'Bengaluru\'s co-working boom creates shared-space security challenges — multiple companies under one roof, transient members, and after-hours access without dedicated reception.' },
    { title: 'Biotech lab intellectual property risk', desc: 'Biotech R&D units in Bengaluru need layered access with bio-metric entry, material exit screening, and escort protocols for visitors near sensitive research areas.' },
    { title: 'Manufacturing plant night patrol gaps', desc: 'Peenya and electronic city industrial estates face night patrol gaps between guard shift changes. Random supervisor checks and GPS-tracked patrol routes improve after-hours vigilance.' },
    { title: 'Apartment tower visitor management', desc: 'Bengaluru\'s high-density apartment complexes face constant delivery personnel, domestic help, and service vendor traffic. Digital visitor logs with photo capture improve accountability.' },
    { title: 'Aerospace & defence access protocols', desc: 'Aerospace manufacturing units near Bengaluru require defence-grade access control — classified area segregation, visitor NDAs, camera-free zones, and security-cleared personnel only.' },
    { title: 'Electronic city late-night employee safety', desc: 'IT parks in Electronic City operate night shifts with employees leaving at 2-3 AM. Guards must ensure well-lit pathways, escort protocols for women employees, and emergency contact readiness.' },
    { title: 'Warehouse inventory shrinkage prevention', desc: 'Bengaluru logistics hubs face inventory shrinkage during night dispatch. Material reconciliation at loading bays, driver verification, and CCTV coverage of dispatch zones reduce losses.' },
  ],
  'tamil-nadu': [
    { title: 'Auto plant production line security', desc: 'Chennai and Hosur auto plants require access control segregated by production zone. Guards must monitor inter-zone material movement, contractor access, and tool crib security across sprawling shop floors.' },
    { title: 'IT corridor vehicle flow management', desc: 'Chennai\'s OMR corridor IT parks face peak-hour vehicle congestion. Traffic management at entry gates, parking allocation, and shuttle coordination need trained guards during rush windows.' },
    { title: 'Port & maritime logistics chain security', desc: 'Chennai and Tuticorin port areas face cargo theft from container yards. Seal verification during loading, yard lighting audits, and truck dispatch checks reduce pilferage.' },
    { title: 'Textile mill fire safety compliance', desc: 'Tiruppur and Coimbatore textile mills have high fire risk from cotton dust and chemical storage. Guards need fire warden training, weekly extinguisher checks, and evacuation drill coordination.' },
    { title: 'Educational campus hostel security', desc: 'Tamil Nadu\'s engineering colleges and hostel campuses require round-the-clock access control, visitor logs, and gender-sensitive security protocols for student safety.' },
    { title: 'Hospital multi-specialty access control', desc: 'Chennai hospital corridors see heavy visitor footfall. Ward-specific access, OPD queue management, and emergency room security need guards trained in healthcare environment sensitivity.' },
    { title: 'Electronics unit anti-theft protocols', desc: 'Electronics manufacturing units face component theft — small, high-value parts leave in pockets or bags. Mandatory bag checks, tool reconciliation, and CCTV at exit points deter internal theft.' },
    { title: 'Cement plant material movement checks', desc: 'Cement plants have high-volume material movement — trucks, raw materials, finished goods. Gate checks, weighbridge verification, and loading bay supervision prevent material leakage.' },
  ],
  telangana: [
    { title: 'Pharma unit clean-room access', desc: 'Hyderabad pharma SEZs require badge-restricted access to clean rooms and production zones. Guards enforce gowning, material pass-through, and contractor escort protocols without disrupting production.' },
    { title: 'IT corridor night shift safety', desc: 'HITEC City and Gachibowli IT parks operate 24/7. Night shift employees need well-lit parking, escort services, and emergency contact points. Guards trained in gender-sensitive response are essential.' },
    { title: 'Life sciences R&D IP protection', desc: 'Vaccine and life sciences R&D centres need layered security — biometric access, classified zone segregation, visitor NDAs, and material exit screening to protect intellectual property.' },
    { title: 'Warehouse & distribution hub oversight', desc: 'Hyderabad logistics hubs face inventory loss during night dispatch windows. Material reconciliation, driver verification, and GPS-tracked outbound shipments close theft vulnerabilities.' },
    { title: 'Corporate GCC visitor management', desc: 'Global capability centres in Hyderabad host international visitors frequently. Guards need professional reception skills, visitor pre-registration systems, and meeting room access management.' },
    { title: 'Biotech research centre data security', desc: 'Biotech R&D units require physical-data security convergence — guards monitor access to server rooms and research data storage areas, reporting unusual after-hours entry attempts.' },
    { title: 'Convention centre event security', desc: 'Hyderabad\'s convention centres host large conferences with 5,000+ attendees. Guards manage bag checks, crowd flow, VIP segregation, and emergency evacuation coordination during events.' },
    { title: 'Residential township perimeter control', desc: 'Hyderabad\'s gated communities need perimeter patrols, night vigilance at secondary gates, and visitor verification at main gates. Intercom-based release systems reduce unauthorized entry.' },
  ],
  'uttar-pradesh': [
    { title: 'Electronics factory anti-pilferage', desc: 'Noida electronics manufacturing units face high risk of component pilferage. Mandatory bag checks, tool reconciliation, and CCTV at exit points prevent small high-value parts from leaving undetected.' },
    { title: 'Defence corridor sensitive zone access', desc: 'Kanpur and Lucknow defence corridor facilities need strict access segregation between classified and general zones. Guards must verify clearances, enforce camera restrictions, and manage contractor entry.' },
    { title: 'Leather unit chemical safety compliance', desc: 'Kanpur leather tanneries handle hazardous chemicals. Guards must monitor PPE compliance, restricted chemical storage access, and emergency spill response readiness.' },
    { title: 'Warehouse night dispatch integrity', desc: 'UP logistics hubs operate night dispatch for e-commerce fulfilment. Seal verification, driver photo capture, and load reconciliation at gates during after-hours windows prevent theft.' },
    { title: 'Educational campus multi-entry management', desc: 'UP\'s large university campuses have multiple entry gates, hostels, and academic blocks. Guards must manage pedestrian and vehicle access simultaneously while maintaining student safety protocols.' },
    { title: 'Heritage & tourism site crowd control', desc: 'Agra, Varanasi, and Ayodhya see millions of tourists and pilgrims. Guards need training in crowd management, queue discipline, and emergency response at high-density religious sites.' },
    { title: 'Mandis & wholesale market theft', desc: 'Agricultural mandis in UP face theft during peak trading hours. Cash handling, vendor access, and vehicle movement need structured oversight to prevent loss.' },
    { title: 'Industrial estate common perimeter', desc: 'UP industrial area tenants share common gates and roads. Guards coordinate across multiple factories for access control, visitor passes, and shared emergency response.' },
  ],
  haryana: [
    { title: 'Corporate park multi-tenant access', desc: 'Gurugram corporate parks host 50+ companies under one roof. Guards manage visitor verification, lift lobby security, parking allocation, and inter-floor access across multiple tenants.' },
    { title: 'Auto plant tool crib theft', desc: 'Manesar and Kharkhoda auto plants face tool theft from open cribs during shift changes. Structured check-in/out systems, bag checks at shift end, and CCTV tool room coverage prevent losses.' },
    { title: 'Warehouse cluster cargo security', desc: 'Haryana warehouse clusters near NH-48 face cargo theft during loading bay operations. Seal verification, driver identity checks, and GPS-tracked dispatch reduce pilferage risk.' },
    { title: 'Retail mall parking lot safety', desc: 'Gurugram malls face vehicle theft and vandalism in multi-level parking. Patrol routes, CCTV coverage of blind spots, and boom barrier checks at exit points improve security.' },
    { title: 'Residential society RWA coordination', desc: 'Haryana\'s residential societies have active RWAs with specific security expectations — visitor logs, night patrol GPS tracking, and monthly security committee meetings.' },
    { title: 'Data centre physical access control', desc: 'Gurugram data centres need ISO 27001-aligned physical security — biometric access, mantrap entry, escort policies, and strict separation between colocation and admin zones.' },
    { title: 'Educational campus student safety', desc: 'Haryana\'s private universities and coaching centres need POCSO-compliant security protocols, hostel entry logs, and gender-sensitive guard deployment.' },
    { title: 'IMT industrial estate perimeter', desc: 'IMT Manesar and Bawal industrial areas have shared perimeter walls. Guards must coordinate across units for common gate discipline and emergency response.' },
  ],
  'west-bengal': [
    { title: 'Shipyard & dry dock access control', desc: 'Kolkata shipbuilding yards need strict access segregation between production, dry dock, and administrative zones. Guards verify clearances, enforce PPE compliance, and monitor material movement.' },
    { title: 'Jute mill fire prevention', desc: 'Howrah jute mills face extreme fire risk from loose jute fibre and chemical treatments. Guards need fire-specific training, weekly extinguisher checks, and hot work permit enforcement.' },
    { title: 'IT hub after-hours security', desc: 'Salt Lake Sector V IT parks operate night shifts. Guards must manage after-hours access, employee safety to transit points, and secure the perimeter during low-occupancy hours.' },
    { title: 'Port area cargo chain integrity', desc: 'Kolkata port logistics face cargo theft from container yards and loading bays. Seal verification, truck dispatch checks, and yard lighting audits reduce losses.' },
    { title: 'Heritage property visitor management', desc: 'Kolkata\'s heritage buildings and museums need security balancing preservation with public access — bag checks, photography restrictions, and crowd flow management in narrow corridors.' },
    { title: 'Multi-specialty hospital access', desc: 'Kolkata hospitals see high patient footfall. Ward-specific access, OPD queue discipline, and emergency room security need healthcare-trained guards with crisis de-escalation skills.' },
    { title: 'Residential complex monsoon readiness', desc: 'Kolkata\'s monsoon-prone residential complexes need guards trained in waterlogging response, electrical panel monitoring during rain, and emergency sandbag placement.' },
    { title: 'Tea estate processing security', desc: 'Siliguri tea processing units face equipment theft and material pilferage during harvest season. Night patrols, processing area access control, and contractor verification are essential.' },
  ],
  punjab: [
    { title: 'Auto ancillaries tool security', desc: 'Ludhiana auto and bicycle parts units face high tool theft. Structured tool crib management, shift-end bag checks, and CCTV in tool rooms deter internal theft.' },
    { title: 'Food processing hygiene-security balance', desc: 'Punjab food processing plants need guards to enforce hygiene protocols at entry — hairnets, shoe covers, hand sanitization — while maintaining access control and material movement checks.' },
    { title: 'Cold storage temperature zone access', desc: 'Cold storage facilities need restricted access to temperature-controlled zones. Guards must monitor entry logs, verify contractor clearances, and prevent unauthorized access to perishable goods.' },
    { title: 'Sports goods unit anti-theft', desc: 'Jalandhar sports goods units face component theft from production floors. Mandatory bag checks, raw material reconciliation, and finished goods verification during dispatch help.' },
    { title: 'Hosiery cluster fire safety', desc: 'Ludhiana hosiery clusters have elevated fire risk from fabric and synthetic materials. Guards need fire warden training, weekly extinguisher checks, and evacuation drill coordination.' },
    { title: 'Warehouse cluster night logistics', desc: 'Punjab logistics hubs operate night dispatch for agricultural produce. Seal verification, truck dispatch checks, and driver identity verification during late hours prevent cargo theft.' },
    { title: 'Educational campus hostel supervision', desc: 'Punjab university hostels need round-the-clock access control, visitor logs, and gender-sensitive security for student safety in residential halls.' },
    { title: 'Agri mandi crowd & cash management', desc: 'Agricultural mandis see peak season crowds and cash transactions. Guards manage vendor access, vehicle queues, and cash handling security during auction hours.' },
  ],
  bihar: [
    { title: 'Hospital ER security & crowd control', desc: 'Patna hospitals face crowded emergency rooms with distressed relatives. Guards need crisis de-escalation training, queue management skills, and coordinated response with hospital security teams.' },
    { title: 'Coaching institute student safety', desc: 'Bihar\'s coaching hubs see thousands of students in concentrated areas. Guards need to manage entry, prevent unauthorized access, monitor after-hours campus use, and ensure student safety.' },
    { title: 'Government building protocol compliance', desc: 'Patna government offices require security guards familiar with official protocol — visitor registers, bag screening, identity verification, and coordination with administrative staff.' },
    { title: 'Warehouse grain theft prevention', desc: 'Bihar grain warehouses and mandis face theft during harvest procurement. Night patrols, seal verification, and inventory reconciliation at dispatch prevent losses.' },
    { title: 'Wedding venue crowd management', desc: 'Bihar\'s large wedding venues host thousands of guests. Guards need temporary surge planning, parking management, and guest verification during peak wedding season.' },
    { title: 'Educational campus boundary security', desc: 'Bihar university campuses need perimeter patrols, hostel gate security, and night vigilance to prevent unauthorized entry and ensure student safety across large grounds.' },
    { title: 'Retail market theft prevention', desc: 'Bihar\'s busy retail markets face pickpocketing, shoplifting, and vendor disputes. Trained guards in de-escalation and patrol patterns reduce incidents.' },
    { title: 'Infrastructure project site security', desc: 'Road and bridge construction sites face material theft — steel, cement, and equipment disappear from unattended sites. Night guards with material logs prevent losses.' },
  ],
  kerala: [
    { title: 'IT park flood & monsoon preparedness', desc: 'Kerala IT parks face monsoon waterlogging. Guards need sump pump monitoring, electrical panel checks during rain, and emergency sandbag deployment training.' },
    { title: 'Hospital super-specialty access', desc: 'Kerala\'s multi-specialty hospitals need ward-specific access control, visitor verification, and sensitive handling of medical records and pharmaceutical storage zones.' },
    { title: 'Tourism resort beach access control', desc: 'Kerala beach resorts face unauthorized beach access and guest privacy challenges. Guards must secure perimeter boundaries while maintaining open beach feel for guests.' },
    { title: 'Port cargo integrity checks', desc: 'Kerala ports handle spice, seafood, and coir exports. Seal verification, cargo reconciliation, and driver ID checks during loading prevent theft and contamination.' },
    { title: 'Houseboat & backwater tourism security', desc: 'Kerala\'s houseboat tourism sector needs security for overnight guest safety, equipment theft prevention, and emergency response coordination in remote backwater locations.' },
    { title: 'Educational campus security', desc: 'Kerala university campuses need hostel security, night patrols, and visitor management — balancing open academic environment with student safety requirements.' },
    { title: 'Food processing hygiene compliance', desc: 'Kerala seafood and spice processing units need guards to enforce hygiene protocols — PPE compliance, restricted zone access, and contamination prevention in processing areas.' },
    { title: 'Residential community gate management', desc: 'Kerala\'s gated communities need visitor verification, delivery management, and night patrols. Guards must balance security with hospitality for resident comfort.' },
  ],
  jharkhand: [
    { title: 'Coal mine perimeter & equipment security', desc: 'Dhanbad coal mines face equipment theft and illegal mining access. Guards need perimeter patrol protocols, vehicle checks at mine entry, and coordination with mine security teams.' },
    { title: 'Steel plant material movement oversight', desc: 'Jamshedpur and Bokaro steel plants have high-volume material movement — raw materials in, finished goods out. Gate checks, weighbridge verification, and scrap material monitoring prevent leakage.' },
    { title: 'Power plant access segregation', desc: 'Jharkhand power plants need segregated access between administrative, turbine, and coal handling zones. Guards must verify clearances and enforce restricted area protocols.' },
    { title: 'Warehouse contractor management', desc: 'Jharkhand warehouses see high contractor and truck driver footfall. Structured contractor pass systems and time-bound access clearances prevent tailgating and unauthorized movement.' },
    { title: 'Educational campus hostel security', desc: 'Jharkhand university hostels need round-the-clock security, visitor logs, and gender-sensitive patrols for student safety across residential campuses.' },
    { title: 'Hospital emergency room discipline', desc: 'Ranchi and Jamshedpur hospitals need trained security for ER crowd management, distressed relative handling, and late-night visitor control.' },
    { title: 'Industrial estate shared perimeter', desc: 'Adityapur and other industrial estates have common perimeter walls. Guards coordinate across units for gate discipline and emergency response.' },
    { title: 'Construction material theft prevention', desc: 'Infrastructure projects across Jharkhand face material theft from active sites. Night guards with material reconciliation logs prevent losses of steel, cement, and equipment.' },
  ],
  odisha: [
    { title: 'Steel plant scrap material theft', desc: 'Rourkela steel plants face significant value loss through scrap material theft. Structured scrap disposal protocols, vehicle checks at exits, and weighbridge verification prevent leakage.' },
    { title: 'Port cargo chain integrity', desc: 'Paradip port operations face cargo theft from container yards and warehouses. Seal verification, truck dispatch checks, and yard lighting audits during night operations reduce pilferage.' },
    { title: 'Power & energy plant access control', desc: 'Odisha\'s energy infrastructure needs segregated access between generation, transmission, and administrative zones — with strict contractor verification and restricted area protocols.' },
    { title: 'Mining site equipment security', desc: 'Iron ore and bauxite mining operations face equipment theft from remote sites. Night patrols, perimeter fencing checks, and local police coordination are essential.' },
    { title: 'Hospital emergency security', desc: 'Bhubaneswar and Cuttack hospitals need ER and OPD security for crowd management, distressed relative handling, and late-night visitor control.' },
    { title: 'Educational campus boundary security', desc: 'Odisha university campuses need perimeter patrols, hostel gate control, and night vigilance to prevent unauthorized entry across large grounds.' },
    { title: 'Warehouse logistics dispatch integrity', desc: 'Odisha logistics hubs face inventory loss during dispatch. Material reconciliation, driver verification, and loading bay supervision close theft vulnerabilities.' },
    { title: 'Aluminium plant pot room access', desc: 'Aluminium smelters need strict access to pot rooms and reduction areas. Guards enforce PPE compliance, restricted entry, and contractor escort protocols.' },
  ],
  chhattisgarh: [
    { title: 'Steel plant hot zone access', desc: 'Bhilai steel plants require strict segregation between hot zone (furnace, rolling) and cold zones. Guards must enforce PPE compliance and restricted area access in high-temperature environments.' },
    { title: 'Coal mine vehicle & equipment check', desc: 'Chhattisgarh coal mines face vehicle theft and equipment pilferage. Gate checks for outgoing vehicles, tool reconciliation, and perimeter patrols reduce losses.' },
    { title: 'Cement plant material reconciliation', desc: 'Cement plants have high-volume raw material and finished goods movement. Weighbridge verification, vehicle sealing, and dispatch reconciliation prevent leakage.' },
    { title: 'Power plant contractor access', desc: 'Chhattisgarh power plants have high contractor turnover during maintenance shutdowns. Structured contractor pass systems and time-bound clearances prevent unauthorized access.' },
    { title: 'AI & semiconductor park emerging risk', desc: 'Nava Raipur\'s emerging AI and semiconductor park needs future-ready security — biometric entry, server room access logs, and environment monitoring for sensitive equipment.' },
    { title: 'Hospital & healthcare security', desc: 'Raipur and Bhilai hospitals need ER crowd management, OPD queue discipline, and night security for emergency departments.' },
    { title: 'Industrial estate common perimeter', desc: 'Chhattisgarh industrial estates share perimeter walls. Guards coordinate across units for gate discipline, visitor management, and shared emergency response.' },
    { title: 'Food processing hygiene-security', desc: 'Chhattisgarh food processing units need guards to enforce hygiene protocols while maintaining access control and material movement verification.' },
  ],
  'madhya-pradesh': [
    { title: 'Auto plant tool & component theft', desc: 'Pithampur auto hub faces tool crib theft and component pilferage. Structured check-in/out systems, shift-end bag checks, and CCTV in tool rooms deter internal theft.' },
    { title: 'Pharma unit clean-room compliance', desc: 'Ujjain pharma SEZs need strict clean-room access — gowning enforcement, material pass-through, and contractor escort protocols without disrupting production.' },
    { title: 'Textile park fire safety', desc: 'Dhar textile units face elevated fire risk from fabric and synthetic materials. Guards need fire warden training, extinguisher checks, and evacuation drills.' },
    { title: 'Warehouse dispatch theft prevention', desc: 'MP logistics hubs face inventory loss during night dispatch. Material reconciliation, driver verification, and seal checks at loading bays reduce theft.' },
    { title: 'Educational campus student hostel security', desc: 'MP\'s university campuses need hostel security, night patrols, and visitor management for student safety across residential buildings.' },
    { title: 'Hospital & medical college security', desc: 'Bhopal and Indore hospitals need ER crowd management, OPD queue discipline, and late-night emergency department security.' },
    { title: 'Agro-processing seasonal demand', desc: 'MP food parks face seasonal production surges during harvest. Temporary guard deployment and surge planning help manage increased material movement and contractor access.' },
    { title: 'Industrial estate material movement', desc: 'MP industrial estates have multi-unit common gates. Guards coordinate across tenants for access control and shared security SOPs.' },
  ],
  uttarakhand: [
    { title: 'Pharma plant cold chain access', desc: 'Haridwar pharma SEZs need strict access control in cold chain storage zones. Guards monitor temperature-sensitive area entry, enforce PPE compliance, and verify contractor clearances.' },
    { title: 'Tourism & pilgrimage site crowd control', desc: 'Haridwar, Rishikesh, and Char Dham routes see millions of pilgrims. Guards need crowd management training, queue discipline, and emergency response for high-density religious gatherings.' },
    { title: 'Auto component unit tool control', desc: 'Rudrapur auto ancillaries face tool crib theft. Structured tool issue systems, shift-end checks, and CCTV tool room surveillance prevent losses.' },
    { title: 'Hydro power station remote guarding', desc: 'Uttarakhand\'s hydro power stations in remote hilly areas face equipment theft and vandalism. Guards need self-sufficient deployment with local police coordination.' },
    { title: 'Resort & hotel guest privacy', desc: 'Uttarakhand hill resorts need security balanced with guest experience — perimeter access control, room key management, and VIP guest privacy protection.' },
    { title: 'Educational campus hostel security', desc: 'Dehradun\'s boarding schools and university hostels need round-the-clock security, visitor logs, and gender-sensitive patrols for student safety.' },
    { title: 'Data centre physical security', desc: 'Emerging data centres in Uttarakhand need mantrap entry, biometric access, and 24/7 monitoring for server room and colocation zone security.' },
    { title: 'Monsoon landslide emergency readiness', desc: 'Uttarakhand facilities face monsoon-triggered landslides. Guards need emergency evacuation protocols, road blockage reporting, and coordination with disaster response teams.' },
  ],
  'jammu-and-kashmir': [
    { title: 'Tourist resort perimeter security', desc: 'Kashmir\'s hotel and resort properties need perimeter security, guest verification, and coordination with local tourism police during peak season.' },
    { title: 'Government facility protocol compliance', desc: 'Government buildings in Srinagar and Jammu require strict protocol compliance — visitor registers, identity verification, bag screening, and coordination with central security agencies.' },
    { title: 'Hospital emergency readiness', desc: 'J&K hospitals need security trained in emergency response, crowd management, and sensitive handling of patients and visitors in high-stress environments.' },
    { title: 'Educational campus security', desc: 'Kashmir university campuses need perimeter patrols, hostel security, and student safety protocols that respect the sensitive regional context.' },
    { title: 'Apple & horticulture cold storage', desc: 'Kashmir apple cold storage facilities face theft during harvest season. Night patrols, access control to cold rooms, and dispatch verification prevent losses.' },
    { title: 'Handicraft unit IP protection', desc: 'Kashmir\'s handicraft and carpet units need protection of designs and materials. Restricted area access, visitor logs, and material exit screening protect intellectual property.' },
    { title: 'Commercial complex crowd management', desc: 'Srinagar markets see heavy footfall during tourist season. Guards need crowd management, theft prevention patrols, and coordinated response for busy commercial zones.' },
    { title: 'Infrastructure project site security', desc: 'Road and tunnel construction sites need material theft prevention and site access control. Night guards with material logs prevent losses of equipment and supplies.' },
  ],
  himachal: [
    { title: 'Tourist resort off-season security', desc: 'Himachal resorts face unique challenges — high season crowds followed by sparse off-season occupancy requiring different security postures.' },
    { title: 'Pharma unit cold chain access', desc: 'Solan pharma units need clean-room and cold chain access control — gowning enforcement, restricted zone entry, and contractor escort protocols.' },
    { title: 'Hydro power station remote monitoring', desc: 'Himachal\'s hydro stations in remote valleys face equipment theft and vandalism. Guards need self-sufficient deployment with local police coordination.' },
    { title: 'Hill station parking & traffic management', desc: 'Shimla and Manali face severe parking constraints during tourist season. Guards need traffic management training and de-escalation skills for parking disputes.' },
    { title: 'Adventure sports venue safety', desc: 'River rafting, paragliding, and trekking base camps need equipment security, participant verification, and emergency response coordination.' },
    { title: 'Hotel & homestay guest privacy', desc: 'Himachal hospitality properties need security balanced with guest experience — perimeter control, key management, and privacy protection.' },
    { title: 'Educational campus hostel security', desc: 'Himachal boarding schools and colleges need hostel security, visitor logs, and gender-sensitive patrols.' },
    { title: 'Monsoon landslide response', desc: 'Himachal facilities face monsoon disruption. Guards need evacuation protocols, road status reporting, and coordination with disaster response teams.' },
  ],
  'andhra-pradesh': [
    { title: 'Port & maritime logistics chain integrity', desc: 'Visakhapatnam port area faces cargo theft during container yard operations. Seal verification, truck dispatch checks, and night yard patrols reduce pilferage across the logistics chain.' },
    { title: 'Pharma SEZ clean-room access', desc: 'Pharma SEZs in AP need strict clean-room access control — gowning enforcement, material pass-through, and contractor escort protocols without disrupting production.' },
    { title: 'IT park night shift employee safety', desc: 'Visakhapatnam IT corridor operates night shifts requiring well-lit parking, escort protocols for women employees, and emergency contact readiness.' },
    { title: 'Industrial estate material theft prevention', desc: 'AP industrial estates face material theft during night shifts. Gate checks, weighbridge verification, and patrols across multi-tenant estates prevent losses.' },
    { title: 'Fisheries & food processing hygiene security', desc: 'Seafood processing units in AP need guards to enforce hygiene protocols while maintaining access control and material movement verification.' },
    { title: 'Educational campus hostel supervision', desc: 'AP university hostels need round-the-clock security, visitor logs, and gender-sensitive patrols for student safety.' },
    { title: 'Temple town crowd management', desc: 'Tirupati and other temple towns see millions of pilgrims annually. Guards need queue management, bag screening, and emergency response for high-density religious gatherings.' },
    { title: 'Warehouse & cold storage access', desc: 'AP logistics hubs need restricted access to cold chain storage zones. Guards monitor entry logs and prevent unauthorized access to perishable goods.' },
  ],
  assam: [
    { title: 'Tea garden perimeter security', desc: 'Assam tea estates face equipment theft and trespassing during harvest season. Night patrols across vast, remote plantation areas need dedicated guard deployment.' },
    { title: 'Oil & gas facility access control', desc: 'Assam oil fields and refineries require strict access segregation between processing, storage, and administrative zones with contractor verification and PPE enforcement.' },
    { title: 'IT park emerging security needs', desc: 'Guwahati IT parks have growing security requirements — visitor management, after-hours access, and coordination with multiple tenants in shared facilities.' },
    { title: 'Warehouse monsoon readiness', desc: 'Assam warehouses face monsoon waterlogging and structural risks. Guards need flood response training, electrical safety awareness, and emergency sandbag placement.' },
    { title: 'Hospital crowd & emergency management', desc: 'Guwahati hospitals see high patient footfall. ER security, OPD queue discipline, and late-night visitor management need trained healthcare security personnel.' },
    { title: 'Educational campus bicycle & vehicle theft', desc: 'Assam university campuses face vehicle theft in parking lots. Structured patrol routes and CCTV blind-spot coverage reduce incidents.' },
    { title: 'Bamboo & wood processing fire safety', desc: 'Bamboo processing units face elevated fire risk from dry material and wood dust. Guards need fire warden training and weekly extinguisher checks.' },
    { title: 'Bridge & infrastructure project security', desc: 'Major infrastructure projects in Assam face material theft from active construction sites. Night guards with material reconciliation logs prevent losses.' },
  ],
  goa: [
    { title: 'Beach resort guest privacy & access', desc: 'Goa beach resorts need security balancing open beach access with guest privacy — perimeter control, room key management, and VIP guest protection.' },
    { title: 'Nightclub & party venue crowd control', desc: 'Goa nightlife venues require guards trained in intoxication management, age verification, and non-confrontational de-escalation during peak tourist season.' },
    { title: 'Port & maritime logistics security', desc: 'Mormugao port handles iron ore and container cargo. Seal verification, yard patrols, and truck dispatch checks prevent theft during loading operations.' },
    { title: 'Hotel seasonal surge manpower', desc: 'Goa hotels face 10x footfall during peak tourist season requiring temporary surge guard deployment without quality dropping.' },
    { title: 'Villa community perimeter control', desc: 'Goa villa communities need night patrols, visitor verification, and delivery management across multiple entry points in residential enclaves.' },
    { title: 'Water sports equipment security', desc: 'Beachfront water sports operators need overnight equipment security — jet skis, boats, and gear locked and patrolled after hours.' },
    { title: 'Casino & late-night venue security', desc: 'Goa casino operations require guards with surveillance awareness, conduct monitoring, and coordinated response with gaming regulators.' },
    { title: 'Construction site material theft', desc: 'Goa construction boom faces material theft from active sites. Night guards with material logs and perimeter checks prevent losses.' },
  ],
  chandigarh: [
    { title: 'Corporate office multi-tenant access', desc: 'Chandigarh IT park and commercial towers house multiple companies. Guards manage visitor verification, lift lobby access, and parking across shared facilities.' },
    { title: 'Pharma unit clean-room protocols', desc: 'Chandigarh pharma manufacturing units need gowning enforcement, material pass-through systems, and contractor escort for clean-room zones.' },
    { title: 'Sector shopping complex crowd management', desc: 'Chandigarh sector markets face weekend crowd surges. Guards need traffic management, theft prevention patrols, and coordinated incident response.' },
    { title: 'Residential society RWA standards', desc: 'Chandigarh residential societies have strict RWA security expectations — visitor logs, GPS night patrol tracking, and monthly security meetings.' },
    { title: 'Educational institution campus hostel security', desc: 'Chandigarh university hostels need round-the-clock security, visitor verification, and gender-sensitive patrols for student safety.' },
    { title: 'Hospital multi-specialty access', desc: 'Chandigarh hospitals need ward-specific access, OPD queue management, and emergency room security with healthcare-trained guards.' },
    { title: 'Government building protocol compliance', desc: 'Chandigarh government offices require protocol-compliant security — visitor registers, ID verification, bag screening, and coordination with central agencies.' },
    { title: 'Warehouse & logistics dispatch integrity', desc: 'Chandigarh logistics hubs face inventory loss during night dispatch. Seal verification and driver identity checks at loading bays prevent theft.' },
  ],
  sikkim: [
    { title: 'Pharma biotech cold chain security', desc: 'Sikkim pharma SEZs need strict access control in cold chain zones. Guards monitor temperature-sensitive area entry and enforce clean-room protocols.' },
    { title: 'Tourist hotel & homestay guest safety', desc: 'Sikkim tourism properties require security for guest privacy, baggage handling, and emergency response in remote hilly locations.' },
    { title: 'Hydropower plant remote guarding', desc: 'Sikkim hydropower stations in remote valleys face equipment theft and vandalism. Guards need self-sufficient deployment with local police coordination.' },
    { title: 'Monastery & pilgrimage site crowd control', desc: 'Sikkim monasteries and pilgrimage sites see seasonal visitor surges. Guards need crowd management and queue discipline training.' },
    { title: 'Government building protocol compliance', desc: 'Government offices in Gangtok require protocol-compliant security — visitor logs, identity verification, and coordination with administrative staff.' },
    { title: 'Educational campus hostel security', desc: 'Sikkim university hostels need round-the-clock security, visitor verification, and gender-sensitive patrols for student safety.' },
    { title: 'Warehouse & cold storage access', desc: 'Sikkim warehouses and cold storage for horticulture produce need restricted access and material movement verification during harvest season.' },
    { title: 'Infrastructure project site security', desc: 'Road and tunnel construction sites in Sikkim face material theft. Night guards with material reconciliation logs prevent losses.' },
  ],
  nagaland: [
    { title: 'Government building protocol compliance', desc: 'Government offices in Kohima and Dimapur require protocol-compliant security — visitor registers, identity verification, and coordination with state administration.' },
    { title: 'Hornbill Festival venue crowd management', desc: 'Nagaland Hornbill Festival venues see massive seasonal crowds. Guards need temporary surge planning, bag checks, and emergency response coordination.' },
    { title: 'Hotel & tourism property guest safety', desc: 'Nagaland tourism properties need perimeter security, guest verification, and emergency response readiness for international visitors.' },
    { title: 'Hospital emergency room security', desc: 'Dimapur and Kohima hospitals need trained guards for ER crowd management and late-night visitor control.' },
    { title: 'Educational campus hostel supervision', desc: 'Nagaland university hostels need round-the-clock security and visitor verification for student safety.' },
    { title: 'Handicraft & handloom unit protection', desc: 'Nagaland handicraft units need protection of materials and finished goods. Restricted area access and visitor logs prevent losses.' },
    { title: 'Commercial complex & market security', desc: 'Dimapur commercial areas face shoplifting and vendor disputes. Trained guards in patrol patterns and de-escalation reduce incidents.' },
    { title: 'Infrastructure project site material theft', desc: 'Road and building construction sites in Nagaland face material theft. Night guards with perimeter checks prevent losses.' },
  ],
  manipur: [
    { title: 'Government facility protocol security', desc: 'Imphal government secretariat and offices require strict visitor protocols — identity verification, bag screening, and coordination with central security agencies.' },
    { title: 'IT park emerging security needs', desc: 'Imphal IT parks have developing security requirements. Guards need visitor management training and after-hours access protocols.' },
    { title: 'Hotel & tourism guest protection', desc: 'Manipur tourism properties need perimeter security, guest verification, and emergency response readiness.' },
    { title: 'Hospital emergency department security', desc: 'Imphal hospitals need trained security for ER crowd management, distressed relative handling, and night visitor control.' },
    { title: 'Handicraft & handloom IP protection', desc: 'Manipur handicraft units need protection of traditional designs and materials. Restricted area access and material exit screening help.' },
    { title: 'Educational campus hostel supervision', desc: 'Manipur university campuses need hostel security, night patrols, and visitor management for student safety.' },
    { title: 'Commercial complex theft prevention', desc: 'Imphal markets and commercial areas face theft and vendor disputes. Trained guards in patrol patterns reduce incidents.' },
    { title: 'Warehouse & logistics access', desc: 'Manipur warehouses need restricted access and material movement verification to prevent inventory loss.' },
  ],
  mizoram: [
    { title: 'Government building protocol compliance', desc: 'Aizawl government offices require protocol-compliant security — visitor registers, identity verification, and coordination with state administration.' },
    { title: 'Hotel & eco-tourism guest safety', desc: 'Mizoram eco-tourism resorts need perimeter security, guest verification, and emergency response in remote hill locations.' },
    { title: 'Hospital emergency response readiness', desc: 'Aizawl hospitals need trained security for ER crowd management and after-hours visitor control.' },
    { title: 'Educational campus hostel security', desc: 'Mizoram university hostels need round-the-clock security and visitor verification for student safety.' },
    { title: 'Bamboo processing unit fire safety', desc: 'Bamboo processing units face fire risk from dry material. Guards need fire warden training and weekly extinguisher checks.' },
    { title: 'Commercial establishment theft prevention', desc: 'Aizawl commercial areas need patrol patterns and de-escalation training for guards to reduce shoplifting incidents.' },
    { title: 'Food processing hygiene-security', desc: 'Mizoram food processing units need guards to enforce hygiene protocols while maintaining access control.' },
    { title: 'Warehouse & cold storage access', desc: 'Mizoram warehouses and cold storage need restricted access and material movement verification.' },
  ],
  meghalaya: [
    { title: 'Coal & limestone mining perimeter', desc: 'Meghalaya mining operations face equipment theft and unauthorized extraction. Perimeter patrols and vehicle checks at mine entry points prevent losses.' },
    { title: 'Tourist resort hill station security', desc: 'Shillong and Cherrapunji tourism properties need guest privacy, parking management, and emergency response in hilly terrain.' },
    { title: 'Educational campus university security', desc: 'Shillong university campuses need hostel security, night patrols, and visitor management across multiple building blocks.' },
    { title: 'Hospital emergency room security', desc: 'Shillong hospitals need trained security for ER crowd management and late-night visitor control.' },
    { title: 'Government secretariat protocol', desc: 'Meghalaya government buildings require protocol-compliant security — visitor logs, ID verification, and coordination with administrative staff.' },
    { title: 'Warehouse cold storage access', desc: 'Meghalaya cold storage for horticulture and flowers needs restricted access and material movement verification.' },
    { title: 'Retail & commercial theft prevention', desc: 'Shillong commercial areas face shoplifting and vendor disputes. Trained guards in patrol patterns and de-escalation reduce incidents.' },
    { title: 'IT park emerging security needs', desc: 'Emerging IT parks in Meghalaya need developing security protocols — visitor management, after-hours access, and tenant coordination.' },
  ],
  tripura: [
    { title: 'Government building protocol compliance', desc: 'Agartala government offices require strict visitor protocols — identity verification, bag screening, and coordination with state administration.' },
    { title: 'Heritage palace & tourism site security', desc: 'Tripura heritage palaces and tourism sites need bag checks, photography restriction enforcement, and crowd flow management.' },
    { title: 'Power plant contractor access control', desc: 'Gas-based power plants in Tripura need strict contractor verification and time-bound access clearances during maintenance shutdowns.' },
    { title: 'Hospital emergency department security', desc: 'Agartala hospitals need trained security for ER crowd management and late-night visitor control.' },
    { title: 'Handicraft cluster theft prevention', desc: 'Tripura handicraft units need protection of finished goods and raw materials. Restricted area access prevents losses.' },
    { title: 'Educational campus hostel supervision', desc: 'Tripura university hostels need round-the-clock security and visitor verification for student safety.' },
    { title: 'IT park new facility security', desc: 'Emerging IT parks in Agartala need developing security SOPs for visitor management and after-hours access.' },
    { title: 'Warehouse rubber & agri storage', desc: 'Tripura rubber and agricultural warehouses need restricted access and material movement verification during procurement season.' },
  ],
  ladakh: [
    { title: 'Tourist guesthouse & hotel security', desc: 'Ladakh tourism properties need perimeter security, guest verification, and emergency response in extreme high-altitude conditions.' },
    { title: 'Government & defence infrastructure access', desc: 'Ladakh government and defence-adjacent facilities require strict access control, identity verification, and protocol compliance.' },
    { title: 'Cold storage for apple & horticulture', desc: 'Ladakh cold storage facilities need restricted access and temperature zone monitoring during harvest season.' },
    { title: 'Hospital emergency readiness', desc: 'Leh hospitals need security trained in emergency response at high altitude with limited local medical infrastructure.' },
    { title: 'Renewable energy solar park security', desc: 'Ladakh solar micro-grid installations face equipment theft in remote locations. Night patrols and perimeter protection are essential.' },
    { title: 'Educational campus hostel security', desc: 'Ladakh educational institutions need hostel security and visitor management for student safety.' },
    { title: 'Commercial establishment theft prevention', desc: 'Leh commercial areas face tourist-season shoplifting. Trained guards in patrol patterns and de-escalation reduce incidents.' },
    { title: 'Infrastructure project site material protection', desc: 'Road and tunnel construction sites face material theft in remote Ladakh locations. Night guards with material logs prevent losses.' },
  ],
  lakshadweep: [
    { title: 'Tourist resort island security', desc: 'Lakshadweep resort properties need perimeter security, guest verification, and emergency evacuation coordination on remote islands.' },
    { title: 'Port & maritime logistics control', desc: 'Lakshadweep ports face cargo handling security challenges. Restricted area access, seal verification, and yard patrols prevent losses.' },
    { title: 'Fisheries processing hygiene security', desc: 'Seafood processing units need guards to enforce hygiene protocols while maintaining access control in food processing zones.' },
    { title: 'Government administrative facility protocol', desc: 'Government buildings on the islands require protocol-compliant security with visitor registers and identity verification.' },
    { title: 'Hospital emergency response', desc: 'Lakshadweep healthcare facilities need security for emergency response with limited medical evacuation options.' },
    { title: 'Educational institution campus security', desc: 'Island schools and colleges need visitor management and student safety protocols.' },
    { title: 'Commercial establishment security', desc: 'Local markets and commercial areas need theft prevention patrols and vendor dispute management.' },
    { title: 'Telecom & satellite infrastructure protection', desc: 'Remote telecom infrastructure needs equipment theft prevention and perimeter protection in island locations.' },
  ],
  'dadra-and-nagar-haveli': [
    { title: 'Industrial estate multi-tenant access', desc: 'Silvassa industrial estates have multiple manufacturing units sharing common gates. Guards coordinate across tenants for access control and emergency response.' },
    { title: 'Warehouse & logistics dispatch integrity', desc: 'Silvassa logistics hubs face inventory loss during dispatch. Material reconciliation, driver verification, and seal checks at loading bays prevent theft.' },
    { title: 'Pharma & chemical unit safety compliance', desc: 'Chemical and pharma units need strict PPE enforcement, hazardous zone access control, and spill response readiness.' },
    { title: 'Textile unit fire safety', desc: 'Textile manufacturing units face elevated fire risk. Guards need fire warden training and weekly extinguisher checks.' },
    { title: 'Food processing hygiene compliance', desc: 'Food processing units need guards to enforce hygiene protocols while maintaining access control and material movement checks.' },
    { title: 'Residential colony perimeter security', desc: 'Silvassa residential colonies need night patrols, visitor verification, and delivery management across colony gates.' },
    { title: 'Hospital emergency department security', desc: 'Local healthcare facilities need trained security for crowd management and late-night visitor control.' },
    { title: 'Infrastructure project site material theft', desc: 'Construction sites face material theft. Night guards with reconciliation logs prevent losses of steel and equipment.' },
  ],
  'daman-and-diu': [
    { title: 'Tourist resort & beach security', desc: 'Daman and Diu beach resorts need perimeter security balancing beach access with guest privacy during tourist season.' },
    { title: 'Port & maritime cargo protection', desc: 'Maritime cargo operations need seal verification, yard patrols, and loading bay supervision during port operations.' },
    { title: 'Pharma unit clean-room access', desc: 'Pharmaceutical units need restricted access to production zones with gowning enforcement and contractor escort protocols.' },
    { title: 'Textile & garment unit fire safety', desc: 'Garment manufacturing units face fire risk from fabric materials. Guards need fire warden training and equipment checks.' },
    { title: 'Warehouse & distribution centre oversight', desc: 'Daman warehouses need material reconciliation during dispatch and driver verification at loading bays.' },
    { title: 'Hospital emergency readiness', desc: 'Local healthcare facilities need security for crowd management and after-hours emergency department control.' },
    { title: 'Residential community night patrol', desc: 'Coastal residential communities need night patrols, visitor verification, and monsoon preparedness for security guards.' },
    { title: 'Commercial complex theft prevention', desc: 'Local markets and commercial areas need patrol patterns and de-escalation training for guards.' },
  ],
  'andaman-and-nicobar': [
    { title: 'Tourist resort island access control', desc: 'Andaman resort properties need perimeter security, guest boat access control, and emergency evacuation coordination from remote islands.' },
    { title: 'Port & harbour logistics protection', desc: 'Port Blair port faces cargo handling security. Seal verification, yard patrols, and restricted area access prevent pilferage.' },
    { title: 'Government facility protocol security', desc: 'Andaman government buildings require protocol-compliant security with visitor registers and identity verification.' },
    { title: 'Fisheries & seafood processing compliance', desc: 'Seafood processing units need guards to enforce hygiene protocols while controlling access to processing zones.' },
    { title: 'Hospital emergency response readiness', desc: 'Port Blair hospitals need security trained in emergency response with limited medical evacuation infrastructure.' },
    { title: 'Educational institution campus security', desc: 'Island schools and university campuses need visitor management and student safety protocols.' },
    { title: 'Historical site visitor management', desc: 'Cellular Jail and other historical sites need bag checks, crowd flow management, and photography restriction enforcement.' },
    { title: 'Warehouse & logistics access control', desc: 'Island warehouses need restricted access and material movement verification during ship-based goods receipt and dispatch.' },
  ],
  puducherry: [
    { title: 'IT park office security', desc: 'Puducherry IT parks need visitor management, parking control, and after-hours access protocols for tech companies.' },
    { title: 'Tourist hotel & heritage property security', desc: 'French Quarter heritage hotels need discreet security balancing guest privacy with property protection.' },
    { title: 'Manufacturing unit material theft prevention', desc: 'Puducherry industrial estates face material theft. Gate checks, weighbridge verification, and night patrols prevent losses.' },
    { title: 'Hospital emergency room management', desc: 'Puducherry hospitals need trained security for ER crowd management and late-night visitor control.' },
    { title: 'Educational campus hostel supervision', desc: 'Puducherry university hostels need round-the-clock security and visitor verification for student safety.' },
    { title: 'Port & fishing harbour access', desc: 'Puducherry port area needs restricted access, seal verification for cargo, and coordination with local authorities.' },
    { title: 'Warehouse cold storage security', desc: 'Puducherry cold storage and warehouse facilities need restricted access and material movement verification.' },
    { title: 'Commercial complex & market security', desc: 'Puducherry commercial areas face shoplifting and vendor disputes. Trained guards in patrol patterns reduce incidents.' },
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
  {
    title: 'Guard misconduct & negligence risks',
    desc: 'Sleeping on duty, excessive phone use, or gate abandonment undermines security. Structured supervisor rounds, CCTV oversight, and random spot checks deter misconduct before it becomes a pattern.',
  },
  {
    title: 'Key management & asset room access',
    desc: 'Loose key registers and undocumented asset room entry create blind spots in theft investigations. Tamper-evident key cabinets with signed in/out logs close this gap.',
  },
  {
    title: 'Post-muster & attendance manipulation',
    desc: 'Proxy attendance and late sign-ins are common in unorganised security setups. Biometric or GPS-verified check-ins eliminate ghost manpower and ensure billed hours match deployed hours.',
  },
  {
    title: 'Fire safety equipment tampering',
    desc: 'Extinguishers and hose reels are often blocked, expired, or tampered with between inspections. Guards trained in weekly equipment checks catch these before an emergency.',
  },
  {
    title: 'Late-night delivery oversight',
    desc: 'After-hours deliveries skip gate checks when supervision is thin. Protocols for night delivery windows with pre-approved vendor lists and mandatory vehicle search reduce risk.',
  },
  {
    title: 'Unauthorised photography & recording',
    desc: 'Sensitive industrial and corporate sites face risks from mobile cameras. Clear signage, bag inspection protocols, and guard alertness to recording behaviour are essential countermeasures.',
  },
  {
    title: 'Vehicle search compliance gaps',
    desc: 'Inconsistent vehicle checks at gates — skipped boot inspections, unchecked undercarriages — create smuggling vulnerabilities. Standardised vehicle search SOPs with checkpoint verification help.',
  },
  {
    title: 'Construction material theft during fit-outs',
    desc: 'Renovation and fit-out periods see high material movement. Without dedicated material gate passes and exit verification, copper, steel, and fixtures leave sites undetected.',
  },
  {
    title: 'Visitor ID verification fatigue',
    desc: 'High footfall dulls vigilance at busy gates, leading to tailgating and unauthorised entry. Rotating gate staff and periodic supervisor interventions maintain check quality throughout shifts.',
  },
  {
    title: 'Public demonstration & protest management',
    desc: 'Corporate and government sites near protest-prone areas need guards trained in cordon management, non-confrontational communication, and coordinated response with local law enforcement.',
  },
  {
    title: 'VIP movement security coordination',
    desc: 'Unscheduled VIP visits create scramble. Pre-planned route security, room sweeps, elevator holds, and discrete cordon protocols ensure seamless protection without disrupting facility operations.',
  },
  {
    title: 'Lone women employee night safety',
    desc: 'Women working night shifts at IT parks, BPOs, and factories need escort protocols, well-lit pathways, and emergency contact points. Guards trained in gender-sensitive response are critical.',
  },
  {
    title: 'School bus & child safety at gates',
    desc: 'Residential societies and school-adjacent sites face unique risks during pickup and drop-off. Guards must verify vehicle IDs, manage gate area crowd control, and prevent unauthorised child access.',
  },
  {
    title: 'Flood & monsoon preparedness',
    desc: 'Heavy rainfall creates waterlogging, electrical hazards, and access road disruptions. Guards need monsoon SOPs — sump pump checks, electrical panel monitoring, and emergency sandbag placement.',
  },
  {
    title: 'Power failure & generator security protocols',
    desc: 'Blackouts disable electronic access, CCTV, and alarm systems. Guards must know generator changeover procedures, manual gate protocols, and increased patrol requirements during power loss.',
  },
  {
    title: 'Security equipment maintenance oversight',
    desc: 'Cameras with obstructed lenses, non-functional boom barriers, and offline biometric readers are common in aging installations. Guard-reported equipment faults with logged follow-ups prevent degradation.',
  },
  {
    title: 'Multi-agency security coordination',
    desc: 'Sites with separate cleaning, catering, and facility vendors need clear security coordination. Conflicting instructions and undefined escalation paths create gaps that compromise site safety.',
  },
  {
    title: 'Guard welfare & accommodation quality',
    desc: 'Poor living conditions and irregular breaks lower guard morale and retention. Clients benefit when partner agencies invest in guard amenities, medical coverage, and fair shift scheduling.',
  },
  {
    title: 'Cash & valuables handling oversight',
    desc: 'ATMs, retail cash counters, and payroll offices handle significant cash movement. Dedicated cash escort protocols with signed handover chains and CCTV coverage reduce internal and external theft.',
  },
  {
    title: 'Alcohol & substance detection protocols',
    desc: 'On-duty intoxication compromises alertness and professional conduct. Random breathalyser tests with documented results and clear escalation for positive cases maintain chemical-free deployments.',
  },
  {
    title: 'Parking enforcement & towing disputes',
    desc: 'Unauthorised parking and vehicle towing create confrontations at commercial and residential sites. Guards need clear parking SOPs, signage enforcement authority, and de-escalation skills for resulting disputes.',
  },
  {
    title: 'Lost & found management gaps',
    desc: 'Misplaced wallets, phones, and documents at malls, offices, and hospitals create liability. A documented lost-and-found process with signed custody logs protects both clients and the security team.',
  },
  {
    title: 'Medical emergency first response',
    desc: 'Heart attacks, falls, and injuries on site need immediate response. Guards with basic first aid training, knowledge of nearest hospitals, and emergency contact lists save critical minutes.',
  },
  {
    title: 'Post-incident evidence preservation',
    desc: 'After theft, vandalism, or intrusion, poorly preserved evidence weakens investigations. Guards trained in scene cordon, CCTV footage preservation, and witness identification strengthen case outcomes.',
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
  'Standardised uniform and grooming protocols across all deployed personnel',
  '24/7 central control room coordination for multi-site client emergency escalation',
  'WhatsApp-based daily shift reports with photo evidence of post readiness and site conditions',
  'Monthly client review meetings with performance metrics and improvement action plans',
  'Pre-deployment medical fitness screening documentation for all security personnel',
  'On-site CCTV operator deployment where manned posts need real-time surveillance backup',
  'Vehicle patrol services with GPS-tracked route adherence and checkpoint verification logs',
  'Crisis management cell activation within 30 minutes for emergency situations',
  'Guard rotation planning every 6-12 months to prevent site familiarity and complacency risks',
  'Weather-appropriate gear provision — raincoats, woollen uniforms, sun protection as per season',
  'Post order books with signed guard acknowledgements and mandatory monthly refresher audits',
  'Surprise alertness drills — unannounced supervisor visits to test response times and procedure recall',
  'Third-party compliance audit facilitation for client ISO, IMS, and regulatory credential requirements',
  'Biometric attendance integration with real-time data sync for multi-site payroll and compliance reporting',
  'Security awareness bulletin distribution — monthly one-pagers on emerging threats and guard best practices',
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
  'Vehicle search techniques — mirror checks, compartment inspection, and document verification at gates',
  'Baggage and package screening protocols — visual inspection, X-ray awareness, prohibited item identification',
  'Ethical conduct and anti-corruption training — gift refusal protocols, bribery prevention, whistleblower rights',
  'Monsoon and flood safety protocols — water level monitoring, electrical hazard awareness, evacuation routes',
  'Basic English and Hindi communication skills for report writing, visitor interaction, and phone etiquette',
  'Gender sensitisation training — respectful interaction with women, children, elderly, and vulnerable individuals',
  'Emergency triage and first responder protocols for medical incidents, injuries, and accident scenes',
  'Legal awareness — rights of arrested persons, use-of-force continuum, citizen arrest boundaries, RTI basics',
  'Suicide prevention and mental health crisis recognition — identifying warning signs, escalation to supervisors',
  'VIP movement protocols — route security, room sweeping, crowd cordon, and motorcade assistance coordination',
  'Electronic access control systems — RFID card management, biometric reader troubleshooting, tailgate prevention',
  'Hotel and hospitality security — guest privacy, baggage handling, room key control, and front desk coordination',
  'Fire warden training for multi-floor buildings — floor marshals, assembly point management, and headcount procedures',
  'IoT security awareness for smart buildings — sensor tampering detection, network port monitoring, device alerts',
  'Posture, uniform presentation, and personal grooming standards for professional appearance at client sites',
  'Conflict resolution and persuasion techniques for managing aggressive individuals without physical confrontation',
  'Substance abuse recognition — identifying intoxication signs, refusal procedures, escalation, and documentation',
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
  'Event management companies needing temporary surge manpower for conferences, concerts, and wedding venues',
  'Government hospitals requiring security personnel with sensitivity training for patient and visitor management',
  'Agricultural processing units — rice mills, cold storage facilities, grain warehouses — needing theft prevention',
  'Religious institutions and large temple trusts requiring organised crowd management and queue discipline systems',
  'Film and television production sets needing access control and equipment protection during active shoots',
  'Corporate event venues and convention centres managing high-profile gatherings with VIP guest protocols',
  'Petrol pumps and fuel stations with cash handling requirements and night-time security coverage concerns',
  'Courier and parcel sorting hubs with high-volume goods movement requiring pilferage prevention measures',
  'Old age homes and assisted living facilities requiring compassionate security and visitor monitoring protocols',
  'Agricultural mandis and wholesale markets needing organised traffic management and theft prevention systems',
  'Luxury retail boutiques and jewellery showrooms with high-value merchandise requiring VIP clientele protocols',
  'Airport-adjacent logistics and cargo handling facilities needing transport security and cargo clearance protocols',
  'Heritage hotels and palace properties requiring security with sensitivity to guest privacy and hospitality standards',
  'Bus depots and transport hubs needing crowd management, ticket fraud prevention, and passenger safety measures',
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
  'In-house training facility with structured curriculum, certified trainers, and periodic skill assessments',
  'Digital HRMS system for attendance, payroll, and multi-site compliance management in one platform',
  'Client web portal for on-demand access to deployment registers, incident reports, and compliance documentation',
  'Active in 19 states with native-language speaking guards matched to regional client preferences',
  'Zero-tolerance policy for guard misconduct with documented disciplinary action and client notification',
  'Dedicated recruitment wing with police verification, court record checks, and reference verification',
  '24/7 emergency helpline for client escalation — single-point contact for after-hours security concerns',
  'Annual third-party security audit with vulnerability assessment, gap analysis, and remediation roadmap',
  'Customised post order books tailored to each facility layout, risk matrix, and client-specific SOPs',
  'Partnership network of PSARA-certified agencies enabling seamless pan-India scalability',
  'Employee welfare programmes — medical insurance, skill development, and recognition initiatives for guard retention',
  'Compliance with Sexual Harassment of Women at Workplace Act for lady guard deployment protocols',
  'Bi-annual client satisfaction surveys with published results and documented action plans for improvement',
  'Guard recognition and reward programme — employee of the month, performance incentives, and career advancement paths',
  'Rapid response team on standby for crisis situations — labour unrest, natural disasters, and major security breaches',
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
  seed: number
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

/** City-specific landmarks / notable zones — adds local uniqueness to intro paragraphs */
const CITY_LANDMARKS: Record<string, string[]> = {
  // ── Tier 1 cities ──
  jaipur: ['Sanganer Airport', 'Jaipur Railway Station (PRS)', 'Mansarovar Industrial Area', 'Sitapura Industrial Zone', 'Tonk Road Corridor', 'Bais Godam Circle'],
  delhi: ['Indira Gandhi International Airport', 'New Delhi Railway Station', 'Connaught Place', 'Nehru Place', 'Okhla Industrial Area', 'Bawana Industrial Estate', 'Rohini Sector', 'Dwarka Sector'],
  mumbai: ['Chhatrapati Shivaji Maharaj International Airport', 'Navi Mumbai SEZ', 'BKC Financial District', 'Andheri MIDC', 'Thane-Belapur Industrial Belt', 'Lower Parel Commercial Hub'],
  bengaluru: ['Kempegowda International Airport', 'Electronic City', 'Whitefield IT Corridor', 'Peenya Industrial Estate', 'Manyata Tech Park', 'HSR Layout', 'MG Road'],
  hyderabad: ['Rajiv Gandhi International Airport', 'HITEC City', 'Gachibowli IT Corridor', 'Patancheru Industrial Area', 'Nacharam Industrial Estate', 'Banjara Hills', 'Secunderabad'],
  chennai: ['Chennai International Airport', 'OMR IT Corridor', 'Guindy Industrial Estate', 'Ambattur Industrial Area', 'Tidel Park', 'Sriperumbudur SEZ', 'Ennore Port Area'],
  kolkata: ['Netaji Subhas Chandra Bose International Airport', 'Salt Lake Sector V', 'New Town', 'Howrah Industrial Belt', 'Rajahat IT Hub', 'Dharamtolla', 'Park Street'],
  pune: ['Pune International Airport', 'Hinjewadi IT Park', 'Chakan MIDC', 'Bhosari Industrial Area', 'Baner', 'Kharadi', 'Shivajinagar'],
  ahmedabad: ['Sardar Vallabhbhai Patel International Airport', 'SG Highway Corridor', 'Sanand Industrial Area', 'GIDC Naroda', 'GIDC Vatva', 'Bavla Industrial Zone', 'Satellite'],
  surat: ['Surat International Airport', 'Sachin GIDC', 'Palsana Industrial Area', 'Pandesara GIDC', 'Katargam', 'Varachha', 'City Light Road'],
  lucknow: ['Chaudhary Charan Singh International Airport', 'Transport Nagar', 'Sitapur Road Industrial Area', 'Gomti Nagar', 'Hazratganj', 'Amausi Industrial Area'],
  noida: ['Noida International Airport (Jewar)', 'Sector 62 IT Hub', 'Sector 125 Financial District', 'Film City', 'Noida-Greater Noida Expressway', 'Sector 18 Market'],
  gurugram: ['Gurugram Cyber City', 'MG Road', 'Golf Course Road', 'Udyog Vihar', 'IMT Manesar', 'Sohna Road Corridor', 'DLF Phase 1–5'],
  // ── Rajasthan T2/T3 ──
  jodhpur: ['Jodhpur Airport', 'Jodhpur Railway Station', 'Basni Industrial Area', 'Sangaria Industrial Hub', 'Soorsagar', 'Paota'],
  kota: ['Kota Airport', 'Kota Junction Railway Station', 'Kota Industrial Area', 'Rawatbhata Atomic Complex', 'Aerodrome Circle', 'Chambal Garden'],
  ajmer: ['Ajmer Junction Railway Station', 'Kishangarh Airport', 'Madanganj Industrial Area', 'Ana Sagar Lake', 'Dargah Area', 'Mayo College'],
  bikaner: ['Bikaner Airport', 'Bikaner Junction Railway Station', 'Bikaner Industrial Area', 'Gajner Palace Road', 'Rani Bazaar', 'Kote Gate'],
  udaipur: ['Maharana Pratap Airport (Dabok)', 'Udaipur City Railway Station', 'Udaipur Industrial Area (Eklingpura)', 'Hiran Magri', 'Lake Pichola Area', 'Bapu Bazaar'],
  bhilwara: ['Bhilwara Railway Station', 'Bhilwara Industrial Area', 'Mandal Chawni', 'Bhopalganj', 'Chittor Road', 'Pur Road'],
  alwar: ['Alwar Railway Station', 'Alwar Industrial Area (Matsya)', 'Bhiwadi Industrial Corridor', 'City Palace Area', 'Company Bagh', 'Khithalpar'],
  // ── Maharashtra T2/T3 ──
  nashik: ['Nashik Airport (Ozar)', 'Nashik Road Railway Station', 'Satpur MIDC', 'Ambad MIDC', 'Gangapur Road', 'College Road'],
  nagpur: ['Dr. Babasaheb Ambedkar International Airport', 'Butibori MIDC', 'Hingna MIDC', 'MIHAN SEZ', 'Sitabuldi', 'Wardha Road Corridor'],
  'navi-mumbai': ['Chhatrapati Shivaji Maharaj International Airport (via Atal Setu)', 'Navi Mumbai SEZ', 'MIDC Rabale', 'Vashi Node', 'Kharghar Sector', 'CBD Belapur'],
  thane: ['Thane Railway Station', 'Wagle Industrial Estate', 'Thane-Belapur Industrial Belt', 'Hiranandani Estate', 'Kasarvadavali', 'Ghoda Khoda'],
  aurangabad: ['Aurangabad Airport (Chikalthana)', 'Aurangabad Railway Station', 'Shendra MIDC', 'Waluj MIDC', 'CIDCO', 'Padegaon Industrial Area'],
  solapur: ['Solapur Airport', 'Solapur Railway Station', 'Solapur MIDC', 'Chincholi Industrial Area', 'Railway Lines Workshops', 'Degaon'],
  kolhapur: ['Kolhapur Airport', 'Kolhapur Railway Station', 'Shivaji Udyamnagar Industrial Area', 'Tararani Chowk', 'Sambhaji Nagar', 'Rankala Lake Area'],
  amravati: ['Amravati Airport', 'Amravati Railway Station', 'MIDC Amravati (Bela)', 'VMV Chowk', 'Gadge Nagar', 'Rajapeth'],
  // ── Gujarat T2/T3 ──
  vadodara: ['Vadodara Airport (Harni)', 'Vadodara Railway Station', 'Makarpura GIDC', 'Waghodia Industrial Area', 'Gujarat Industrial Estate', 'Fatehgunj'],
  rajkot: ['Rajkot Airport', 'Rajkot Railway Station', 'Aji Industrial Zone', 'Metoda GIDC', 'Kalavad Road', 'Race Course Area'],
  bhavnagar: ['Bhavnagar Airport', 'Bhavnagar Railway Station', 'Bhavnagar Port', 'Chitra GIDC', 'Kalyan Nagar', 'Gautam Nagar'],
  jamnagar: ['Jamnagar Airport', 'Jamnagar Railway Station', 'Jamnagar Refinery Complex', 'Reliance Township', 'GIDC Digvijay', 'Bedis'],
  gandhinagar: ['Gandhinagar Railway Station', 'Gandhinagar IT Park', 'GHB Complex', 'Gandhinagar Sector', 'Infocity', 'Pethapur'],
  anand: ['Anand Railway Station', 'Vadodara Airport (nearby)', 'GIDC Anand', 'Sardar Vallabhbhai Patel University', 'Vithal Udyognagar', 'Gunjan'],
  mehsana: ['Mehsana Railway Station', 'Unava GIDC', 'Mehsana Industrial Park', 'Highway Road Corridor', 'Nagalpur', 'Santalpur Road'],
  // ── UP T2/T3 ──
  kanpur: ['Kanpur Airport (Chakeri)', 'Kanpur Central Railway Station', 'Panki Industrial Area', 'Dada Nagar Industrial Area', 'The Mall', 'Transport Nagar'],
  ghaziabad: ['Ghaziabad Railway Station', 'Hindon Airport', 'Ghaziabad Industrial Area', 'Vaishali Sector', 'Kavi Nagar', 'Raj Nagar Extension'],
  meerut: ['Meerut City Railway Station', 'Meerut Industrial Area (Partapur)', 'Modipuram Industrial Zone', 'Ganga Nagar', 'Jail Chauraha', 'Delhi Road'],
  allahabad: ['Prayagraj Airport (Bamrauli)', 'Prayagraj Junction', 'Naini Industrial Area', 'Subedarganj', 'Civil Lines', 'Triveni Marg'],
  bareilly: ['Bareilly Airport', 'Bareilly Junction Railway Station', 'Bareilly Industrial Area (Izzatnagar)', 'Pilibhit Road', 'Civil Lines', 'Bada Bazaar'],
  gorakhpur: ['Gorakhpur Airport', 'Gorakhpur Junction Railway Station', 'Gorakhpur Industrial Development Area', 'Golghar', 'Mohaddipur', 'Tarapetwa'],
  moradabad: ['Moradabad Railway Station', 'Moradabad Industrial Area', 'Transport Nagar', 'Kanth Road', 'Buddhi Vihar', 'Civil Lines'],
  aligarh: ['Aligarh Junction Railway Station', 'Aligarh Industrial Area', 'Mathura Road Corridor', 'University Area (AMU)', 'Ramghat Road', 'Sahil Bazaar'],
  mathura: ['Mathura Junction Railway Station', 'Agra Airport (nearby)', 'Mathura Industrial Area', 'Vrindavan Road', 'Chattikara', 'Krishna Janmabhoomi Area'],
  // ── Haryana T2/T3 ──
  faridabad: ['Faridabad Railway Station', 'Sector 27 Industrial Area', 'Surajkund Road', 'NH-44 Corridor', 'Neharpar Faridabad', 'Ballabhgarh'],
  hisar: ['Hisar Airport', 'Hisar Railway Station', 'Hisar Industrial Area', 'Sirsa Road', 'Azad Nagar', 'Red Square Market'],
  rohtak: ['Rohtak Junction Railway Station', 'Rohtak Industrial Estate', 'MDU Campus Road', 'Civil Road', 'Model Town', 'Jhajjar Road'],
  panipat: ['Panipat Junction Railway Station', 'Panipat Refinery Complex', 'Panipat Industrial Area (Sector 31)', 'G.T. Road', 'Huda Sector', 'Sanjay Chowk'],
  ambala: ['Ambala Cantonment Railway Station', 'Ambala Air Force Station', 'Ambala Industrial Area', 'Ambala City', 'Jagadhri Road', 'Saddar Bazaar'],
  karnal: ['Karnal Junction Railway Station', 'Karnal Industrial Area', 'GT Road Corridor', 'Sector 12', 'Model Town', 'Kunjpura Road'],
  sonipat: ['Sonipat Junction Railway Station', 'Sonipat Industrial Area', 'GT Karnal Road', 'Kharkhoda Industrial Corridor', 'Model Town', 'Atlas Cycle Area'],
  // ── Karnataka T2/T3 ──
  mysuru: ['Mysuru Airport', 'Mysuru Junction Railway Station', 'Belavadi Industrial Area', 'Hootagalli Industrial Zone', 'KRS Road', 'Jayanagar'],
  mangaluru: ['Mangaluru International Airport', 'Mangaluru Railway Station', 'Mangaluru SEZ', 'Kuttar Industrial Area', 'Mangaladevi Temple Area', 'Hampankatta'],
  hubli: ['Hubli Airport', 'Hubli Junction Railway Station', 'Gokul Industrial Area', 'Tarihal Industrial Estate', 'Vidyanagar', 'Deshpande Nagar'],
  belagavi: ['Belagavi Airport (Sambre)', 'Belagavi Railway Station', 'Belagavi Industrial Area (Kanbargi)', 'Peeranwadi', 'Tilakwadi', 'Shahpur'],
  // ── Tamil Nadu T2/T3 ──
  coimbatore: ['Coimbatore International Airport', 'Coimbatore Junction Railway Station', 'SIDCO Industrial Estate', 'Kurichi Industrial Area', 'Peelamedu', 'Avinashi Road'],
  madurai: ['Madurai International Airport', 'Madurai Junction Railway Station', 'SIDCO Industrial Estate (Kappalur)', 'Madurai-Tirunagar', 'Anna Nagar', 'Periyar Bus Stand Area'],
  tiruchirappalli: ['Tiruchirappalli International Airport', 'Trichy Junction Railway Station', 'SIDCO Industrial Estate (Thuvakudi)', 'BHEL Campus', 'Crawford', 'Srirangam'],
  salem: ['Salem Airport', 'Salem Junction Railway Station', 'SIDCO Industrial Estate (Kondalampatti)', 'Hastampatti', 'Alagapuram', 'Swarnavalli'],
  tiruppur: ['Tiruppur Railway Station', 'SIDCO Industrial Estate (Mangalam)', 'Tiruppur Textile Hub', 'Kumaran Nagar', 'Ukkadam', 'Avinashi Road'],
  vellore: ['Vellore Cantonment Railway Station', 'SIDCO Industrial Estate', 'Katpadi', 'Vellore Fort Road', 'Bypass Road', 'Sankarapalayam'],
  erode: ['Erode Junction Railway Station', 'SIDCO Industrial Estate', 'Perundurai SEZ', 'Brough Road', 'Kollampalayam', 'Sampath Nagar'],
  // ── Andhra Pradesh T2/T3 ──
  vijayawada: ['Vijayawada Railway Station', 'Vijayawada Airport (Gannavaram)', 'Benz Circle', 'Machilipatnam Road Corridor', 'Patamata', 'Auto Nagar Industrial Area'],
  guntur: ['Guntur Junction Railway Station', 'Guntur Industrial Estate', 'Brodipet', 'Lakshmipuram', 'Kothapet', 'Pattabhipuram'],
  tirupati: ['Tirupati International Airport', 'Tirupati Railway Station', 'APIIC Industrial Estate (Renigunta)', 'Alipiri', 'Kapila Teertham Road', 'Tiruchanoor'],
  kakinada: ['Kakinada Port', 'Kakinada Railway Station', 'APIIC Industrial Estate (Kakinada SEZ)', 'Jaganath Nagar', 'Sarpavaram', 'Chandramouleswar Temple Area'],
  nellore: ['Nellore Railway Station', 'APIIC Industrial Estate (Bitragunta)', 'Pogathota', 'Railway Station Road Corridor', 'Vedayapalem', 'Ranganayakulapet'],
  // ── Madhya Pradesh T2/T3 ──
  gwalior: ['Gwalior Airport', 'Gwalior Junction Railway Station', 'Gwalior IT Park', 'Birlanagar Industrial Area', 'Mohan Nagar', 'Phool Bagh'],
  jabalpur: ['Jabalpur Airport (Dumna)', 'Jabalpur Junction Railway Station', 'Jabalpur Industrial Area', 'Adhartal', 'Marhatal', 'Gwarighat'],
  ujjain: ['Ujjain Junction Railway Station', 'Devi Ahilya Bai Holkar Airport (Indore, nearby)', 'Ujjain Industrial Area', 'Nana Khera', 'Dewas Road', 'Harsiddhi Mandir Area'],
  // ── West Bengal T2/T3 ──
  howrah: ['Howrah Junction Railway Station', 'Howrah Industrial Belt (Bally)', 'Shibpur', 'Golabari', 'Belur Math Road', 'Santragachi'],
  siliguri: ['Bagdogra International Airport', 'Siliguri Junction Railway Station', 'Sevoke Road Corridor', 'Khalpara', 'Matigara', 'Salugara'],
  durgapur: ['Durgapur Airport (Kazi Nazrul Islam)', 'Durgapur Railway Station', 'Durgapur Steel Plant', 'Bidhan Nagar', 'Ashanda', 'Muchipara'],
  asansol: ['Asansol Junction Railway Station', 'Asansol Industrial Area', 'Burnpur', 'Ushagram', 'Kultipara', 'Chelidanga'],
  // ── Punjab T2/T3 ──
  ludhiana: ['Ludhiana Airport (Sahnewal)', 'Ludhiana Railway Station', 'Focal Point Industrial Area', 'G.T. Road', 'Model Town', 'PAU Road'],
  amritsar: ['Sri Guru Ram Dass Jee International Airport', 'Amritsar Railway Station', 'Amritsar Industrial Area (Verrka)', 'Ranjit Avenue', 'Hall Bazaar', 'Golden Temple Area'],
  jalandhar: ['Jalandhar City Railway Station', 'Jalandhar Industrial Area (Nurmahal Road)', 'Model Town', 'BMC Chowk', 'Basti Sheikh', 'Apra'],
  // ── Bihar T2/T3 ──
  gaya: ['Gaya Airport (Bodhgaya)', 'Gaya Junction Railway Station', 'Bodhgaya Temple Corridor', 'Manpur Industrial Area', 'Suhail', 'Tekari Road'],
  bhagalpur: ['Bhagalpur Railway Station', 'Bhagalpur Industrial Area (Vikramshila)', 'Barari Ghat Road', 'Tilkamanjhi', 'Sabour', 'Nathnagar'],
  muzaffarpur: ['Muzaffarpur Railway Station', 'Muzaffarpur Industrial Area', 'Saraiya', 'Beltron', 'Akhara Ghat', 'Juda Bazaar'],
  // ── Kerala T2/T3 ──
  kochi: ['Cochin International Airport', 'Ernakulam Junction Railway Station', 'Kochi Port & SEZ', 'Infopark (Kakkanad)', 'MG Road', 'Edappally'],
  trivandrum: ['Thiruvananthapuram International Airport', 'Thiruvananthapuram Central Railway Station', 'Technopark', 'Sasthamangalam', 'Kazhakoottam', 'East Fort'],
  kozhikode: ['Calicut International Airport', 'Kozhikode Railway Station', 'KINFRA Industrial Park', 'Kallayi Road', 'Vellayil', 'Mavoor Road'],
  thrissur: ['Thrissur Railway Station', 'KINFRA Industrial Park (Koratty)', 'Punkunnam', 'Round West', 'Shakthan Thampuran Market Area', 'Chembookavu'],
  // ── Jharkhand T2/T3 ──
  dhanbad: ['Dhanbad Junction Railway Station', 'Dhanbad Industrial Area', 'Saraidhela Industrial Zone', 'Sindri', 'Bank More', 'Jharia'],
  bokaro: ['Bokaro Airport', 'Bokaro Steel Plant', 'Bokaro Industrial Area', 'Chas', 'Sector 4', 'City Centre'],
  // ── Odisha T2/T3 ──
  cuttack: ['Cuttack Railway Station', 'Cuttack Industrial Estate', 'CBD Area', 'Mangalabag', 'Buxi Bazaar', 'Badambadi'],
  rourkela: ['Rourkela Airport', 'Rourkela Railway Station', 'Rourkela Steel Plant', 'Udit Nagar', 'Bisra Road', 'Chhend'],
  // ── Chhattisgarh T2/T3 ──
  raipur: ['Swami Vivekananda Airport (Raipur)', 'Raipur Junction Railway Station', 'Siltara Industrial Area', 'Urla Industrial Estate', 'Civil Lines', 'New Rajendra Nagar'],
  bhilai: ['Bhilai Railway Station', 'Bhilai Steel Plant', 'Bhilai Industrial Area', 'Civic Centre', 'Supela', 'Smriti Nagar'],
  // ── Uttarakhand T2 ──
  dehradun: ['Jolly Grant Airport (Dehradun)', 'Dehradun Railway Station', 'SIDCUL Industrial Area (Haridwar nearby)', 'Rajpur Road', 'ISBT Dehradun', 'Doon University Road'],
  haridwar: ['Haridwar Junction Railway Station', 'Jolly Grant Airport (nearby)', 'SIDCUL Haridwar', 'Ranipur More', 'Kankhal', 'Bhupatwala'],
  rishikesh: ['Rishikesh Railway Station', 'SIDCUL Area (nearby)', 'Laxman Jhula Road', 'Tapovan', 'Rishikesh Bus Stand', 'Triveni Ghat Area'],
  // ── Himachal T3 ──
  shimla: ['Shimla Railway Station', 'Shimla Bus Stand (ISBT)', 'The Mall Road', 'Jakhu Temple Road', 'Sanjauli', 'Chaura Maidan'],
  dharamshala: ['Kangra Airport (Gaggal)', 'Dharamshala Bus Stand', 'Mclodganj Road', 'Naddi', 'Temple Road', 'Kotwali Bazaar'],
  // ── UTs / Others ──
  pondicherry: ['Puducherry Railway Station', 'Puducherry Port', 'White Town', 'Goubert Market Area', 'Anna Nagar', 'Muthialpet'],
  // ── Northeast India ──
  silchar: ['Silchar Airport (Kumbhirgram)', 'Silchar Railway Station', 'Silchar IT Park', 'Tarapur', 'Sonai Road', 'Premtala'],
  dibrugarh: ['Dibrugarh Airport (Mohanbari)', 'Dibrugarh Railway Station', 'Dibrugarh Port (Bogibeel)', 'Dibrugarh University Area', 'Chowkidinghee', 'Sepon'],
  jorhat: ['Jorhat Airport (Rowriah)', 'Jorhat Railway Station', 'Jorhat IT Park', 'Cinnamara', 'Gar Ali', 'Barbheta'],
  tezpur: ['Tezpur Airport (Salonibari)', 'Tezpur Railway Station', 'Tezpur University Area', 'Jyoti Chitraban', 'Chitralekha Udyan', 'Dekargaon'],
  imphal: ['Imphal International Airport (Bir Tikendrajit)', 'Imphal Railway Station', 'Manipur Secretariat Area', 'Thangal Bazaar', 'Paona Bazaar', 'Palace Compound'],
  dimapur: ['Dimapur Airport', 'Dimapur Railway Station', 'Dimapur Industrial Area', 'Kohima Road Corridor', 'Circular Road', 'Pamla Colony'],
  // ── Jammu, Kashmir & Ladakh ──
  jammu: ['Jammu Airport (Satwari)', 'Jammu Tawi Railway Station', 'Jammu Industrial Area (Bari Brahmana)', 'Shalimar Road', 'Raghunath Bazaar', 'Gandhi Nagar'],
  anantnag: ['Anantnag Railway Station', 'Srinagar Airport (nearby)', 'Anantnag Industrial Area', 'Khanabal', 'Mattan Road', 'Bijbehara'],
  leh: ['Leh Kushok Bakula Rimpochee Airport', 'Leh Bus Stand', 'Main Bazaar', 'Changspa Road', 'Fort Road', 'Old Town'],
  // ── Sikkim ──
  gangtok: ['Bagdogra Airport (nearby, Siliguri)', 'Gangtok Bus Stand', 'MG Marg Area', 'Ranka Monastery Road', 'Tadong', 'Deorali'],
  // ── Meghalaya, Tripura ──
  shillong: ['Shillong Airport (Umroi)', 'Shillong Railway Station (Byrnihat)', 'Shillong Peak Road', 'Police Bazaar', 'Laitumkhrah', 'Mawlai'],
  agartala: ['Agartala Airport (Maharaja Bir Bikram)', 'Agartala Railway Station', 'Agartala Industrial Area', 'Amaravati Road', 'Shyamali Bazaar', 'Battala'],
  // ── Islands & UTs ──
  'port-blair': ['Veer Savarkar International Airport', 'Port Blair Harbour', 'Aberdeen Bazaar', 'Phoenix Bay', 'Haddo', 'Marine Drive'],
  silvassa: ['Silvassa Bus Stand', 'Silvassa Industrial Estate', 'Dadra Industrial Area', 'Naroli Road', 'Chikhli Road', 'Amli'],
  // ── More UP district towns ──
  firozabad: ['Firozabad Railway Station', 'Firozabad Glass Industrial Belt', 'Taj Nagari Highway', 'Sobti Ganj', 'Dev Nagar', 'Patsua'],
  jhansi: ['Jhansi Airport', 'Jhansi Junction Railway Station', 'Jhansi Industrial Area', 'Shivpuri Road', 'Civil Lines', 'Laxmi Talab'],
  muzaffarnagar: ['Muzaffarnagar Railway Station', 'Muzaffarnagar Industrial Area', 'Delhi Road Corridor', 'New Mandi', 'Civil Lines', 'Saharanpur Road'],
  ayodhya: ['Ayodhya Railway Station', 'Ayodhya Airport (Maryada Purushottam Shri Ram)', 'Ram Path', 'Naya Ghat', 'Saket Nagar', 'Rikabganj'],
}

function getLandmarks(slug: string): string[] {
  return CITY_LANDMARKS[slug] || []
}

function sectorsForState(stateSlug: string, seed: number): string[] {
  const base = STATE_SECTORS[stateSlug] || DEFAULT_SECTORS
  return pickN(seed, base, Math.min(8, base.length))
}

/** State-specific challenges — each city gets its state's challenges + generic fill */
function challengesForState(stateSlug: string, seed: number): ChallengeItem[] {
  const base = STATE_CHALLENGES[stateSlug]
  if (!base) return []
  return pickN(seed, base, Math.min(6, base.length))
}

function buildFaqs(place: string, region: string, seed: number, isCity: boolean): FAQItem[] {
  const base: FAQItem[] = [
    {
      q: `Do you provide security guard services in ${place}?`,
      a: `Yes. Silbar Security Services Pvt. Ltd. deploys professional security manpower and related services in ${place}${isCity ? `, ${region}` : ''}. Share your site details for a tailored proposal and mobilisation timeline.`,
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

  const tierLabel = city.tier === 1 ? 'metropolitan' : city.tier === 2 ? 'urban' : 'regional'

  const landmarks = getLandmarks(city.slug)
  const landmarkAreas = landmarks.length >= 3 ? landmarks.slice(0, 3).join(', ') : ''
  const landmarkSuffix = landmarkAreas ? ` Key locations include ${landmarkAreas}.` : ''

  const intro = [
    pick(seed, 1, [
      `Silbar Security Services Pvt. Ltd. provides professional security guard services in ${place}, ${region}. We deploy trained, background-verified manpower for factories, offices, hospitals, warehouses, retail sites, residential communities, and institutional campuses across the city.${landmarkSuffix}`,
      `If you are searching for a reliable security agency in ${place}, Silbar Security Services Pvt. Ltd. delivers manned guarding and facility protection with ISO-certified processes, PSARA compliance, clear commercials, and responsive coordination for clients across ${region}.`,
      `Businesses and institutions in ${place} need more than a uniform at the gate. Silbar Security Services Pvt. Ltd. focuses on disciplined posts, site-specific duty instructions, supervisor oversight, monthly compliance reporting, and measurable service standards tailored to local operating conditions in ${region}.`,
      `Looking for trusted security guards in ${place}? Silbar Security Services Pvt. Ltd. provides end-to-end security deployment — from gate management and night patrols to visitor control and incident reporting — across ${region}.`,
      `Silbar Security Services Pvt. Ltd. is your ${tierLabel} security partner in ${place}, ${region}. We bring ISO-certified processes and PSARA-licensed manpower to factories, offices, hospitals, residential societies, and commercial establishments across the city.`,
      `${place} businesses trust Silbar Security Services Pvt. Ltd. for reliable, compliance-driven security solutions. From ${sectors.slice(0, 2).join(' to ')} — our ${tierLabel} team in ${region} delivers site-specific guarding, supervision, and reporting.`,
      `Need security in ${place}? Silbar Security Services Pvt. Ltd. combines PSARA licensing, 4 ISO certifications, and local expertise in ${region} to protect your facility — whether a factory gate, a corporate lobby, or a residential township.`,
      `Silbar Security Services Pvt. Ltd. serves ${place} with discipline-driven security manpower trained for ${sectors.slice(0, 3).join(', ')}. Our ${tierLabel} approach ensures guards are matched to your facility's specific risk profile — not a generic shift roster.`,
      `Since our inception, Silbar Security Services Pvt. Ltd. has built a reputation for dependable security in ${place}, ${region}. We partner with ${sectors.slice(0, 3).join(', ')} to deliver verified personnel, structured SOPs, and responsive account management.`,
      `Operating across ${region}, Silbar Security Services Pvt. Ltd. brings scalable security solutions to ${place}. Our PSARA-licensed, ISO-certified deployment model adapts to single-site and multi-location requirements across ${sectors.slice(0, 4).join(', ')}.`,
    ]),
    pick(seed, 2, [
      `${place} is a Tier-${city.tier} market with an urban population of about ${city.population}. Growth in industry, logistics, healthcare, retail, and housing increases demand for professional, compliance-driven security — not ad-hoc manpower hired without process.`,
      `With roughly ${city.population} residents and expanding commercial activity across ${sectors.slice(0, 4).join(', ')}, ${place} presents high-traffic gates, night shift requirements, and multi-tenant facilities that demand verified personnel and structured supervision.`,
      `${place}'s mix of industrial and commercial facilities (population ~${city.population}) requires flexible deployment models — 8/12-hour shifts, lady guards where gender sensitivity is needed, and optional integration of manned posts with electronic surveillance systems.`,
      `Home to approximately ${city.population} people and a growing ${tierLabel} economy, ${place} generates security demand across ${sectors.slice(0, 3).join(', ')}. Key commercial nodes require disciplined access control, material movement checks, and professional guard presentation.`,
      `The ${region} business landscape in ${place} (population ~${city.population}) spans ${sectors.slice(0, 4).join(', ')}. Each sector presents unique security challenges — from visitor management in hospitals to material movement in factories to lobby discipline in corporate offices.`,
      `${place}'s ${tierLabel} economy (population ~${city.population}) is driven by ${sectors.slice(0, 3).join(', ')}. Security providers must adapt to varied shift patterns, supervision needs, and compliance requirements that differ sharply between an industrial plant and a residential tower.`,
    ]),
    pick(seed, 3, [
      `Silbar Security Services Pvt. Ltd. — with Registered Office in New Delhi, Corporate Office in Gurugram, and regional offices in Jaipur, Noida, and Ahmedabad — coordinates PAN India deployments. For ${place}, that means local mobilisation with national process standards: uniforms, induction, replacement pool, and account management.`,
      `Clients expanding into ${place} from other cities often prefer a single security partner. We support multi-location contracts across ${region} while keeping each site's duty instructions specific to its facility layout, operational hours, and risk profile.`,
      `Our ${tierLabel} deployment model in ${place} emphasises post-specific duty briefings, supervisor field checks, and documented incident reporting — so whether you manage a single gate or a multi-acre campus, the service standard remains consistent across ${region}.`,
      `What sets Silbar apart in ${place} is our focus on operational rigour: police-verified manpower, site-specific duty instructions, supervisor oversight, and transparent commercials with statutory compliance. ${landmarkSuffix}`,
      `For ${place} clients, Silbar Security Services Pvt. Ltd. provides more than guards — we provide a security management system with documented SOPS, structured escalation, monthly compliance packs, and a dedicated account manager who knows your site.${landmarkSuffix}`,
    ]),
    pick(seed, 4, [
      `Whether you manage a single warehouse gate or a multi-post industrial complex in ${place}, we start with scope clarity: number of posts, shift timings, visitor management rules, material movement protocols, and escalation contacts — then propose trained manpower that matches your actual requirements, not a generic brochure headcount.`,
      `Silbar's engagement in ${place} begins with a site assessment: we understand your facility layout, peak traffic hours, sensitive zones, and emergency protocols — then design a manpower plan that covers your actual risk areas without over-posting or under-delivering.`,
    ]),
  ]

  const marketOverview = [
    `Security demand in ${place} is driven by ${sectors.slice(0, 5).join(', ')}, and other commercial activities. Each facility type needs different soft skills, post discipline, and supervision intensity — a one-size approach fails across such varied environments.`,
    `Peak risks in ${place} often appear at shift changeovers, night hours when visibility is low, contractor entry windows, and festival seasons when footfall spikes dramatically. A professional agency plans posts, relief systems, and supervisor coverage for these pressure points.`,
    `Choosing Silbar Security Services Pvt. Ltd. for ${place} means partnering with a PSARA-licensed, ISO-certified agency focused on operational control: attendance discipline, professional presentation, duty knowledge, compliance documentation, and responsive communication with your facility management or HO team.`,
  ]

  // ponytail: offset seed (+31337) so generic fill items diverge from state-picked items.
  // Without this offset, same-state cities would share identical state + generic sets.
  const stateChallenges = challengesForState(city.stateSlug, seed)
  const genericChallenges = pickN(seed + 31337, CHALLENGES_POOL, 8)
  const challenges = [...stateChallenges, ...genericChallenges].slice(0, 8)
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
    seed,
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
    metaDescription: pick(seed, 20, [
      `Security guard company in ${place}, ${region}. Tier-${city.tier}, population ${city.population}. Serving ${sectors.slice(0, 3).join(', ')}. PSARA licensed, ISO certified. Call ${CONTACT.phone}.`,
      `Trusted security agency in ${place}, ${region}. ${sectors.slice(0, 2).join(' and ')} security. PSARA licensed, ISO 9001:2015 certified. Get a free quote.`,
      `${place} security guard services — ${sectors.slice(0, 2).join(', ')} protection. Verified manpower, PSARA licensed, PAN India deployments. Call ${CONTACT.phone}.`,
      `Professional security company serving ${place}, ${region}. Manned guarding, industrial security, and facility protection. ISO & PSARA certified. Enquire now.`,
      `Looking for security guards in ${place}? Silbar Security Services Pvt. Ltd. — Tier-${city.tier} security partner with PSARA license and 4 ISO certifications serving ${sectors.slice(0, 2).join(', ')} clients.`,
      `Best security agency in ${place}, ${region}. PSARA licensed, ISO 9001:2015, 14001, 45001 & 27001 certified. Serving ${sectors.slice(0, 3).join(', ')}. Call ${CONTACT.phone} now.`,
      `Reliable security guards in ${place}, ${region}. Professional manned guarding for ${sectors.slice(0, 2).join(', ')}. Police-verified personnel, 24/7 supervision. Free quote available.`,
      `Top security company in ${place}. ISO & PSARA certified security services for ${sectors.slice(0, 3).join(', ')}. Trained guards, supervisor oversight, compliance reporting. Call ${CONTACT.phone}.`,
    ]),
    servicesIntro: `Explore all Silbar Security Services Pvt. Ltd. service verticals available for your ${place} facility. Click any service for detailed features, use cases, and FAQs, then request a site-specific quote for your ${region} location.`,
    keywordsLine: `security guard services ${place}, security agency ${place}, manned guarding ${place}, security company ${region}, industrial security ${place}, PSARA licensed security ${place}`,
  }
}

export function generateStateContent(state: StateLocation): LocationSEOContent {
  const seed = stringToHash(state.slug)
  const place = state.name
  const citiesList = state.majorCities.slice(0, 6).join(', ')
  const sectors = sectorsForState(state.slug, seed)

  const intro = [
    `Silbar Security Services Pvt. Ltd. provides professional security solutions across ${place}, covering major cities including ${citiesList} and client sites across ${state.districts} districts with trained, background-verified manpower.`,
    `With a state population of about ${state.population}, ${place} has diverse security demand spanning ${sectors.slice(0, 5).join(', ')} and more. Each sector requires a tailored approach to manpower deployment, supervision intensity, and compliance management.`,
    `Silbar Security Services Pvt. Ltd. is PSARA licensed and operates with 4 ISO certifications (IAF accredited), bringing national standards to every deployment in ${place} — from single society desks to multi-plant industrial contracts.`,
    pick(seed, 2, [
      `Our approach in ${place} prioritises verified guards with police background checks, clear site-specific duty instructions, regular supervisor oversight, and statutory-aware commercial structures so clients can scale posts without losing quality control.`,
      `Whether you need a society gate in ${state.capital} or comprehensive industrial security across multiple cities in ${place}, Silbar designs manpower, shifts, and reporting to match your operational reality.`,
      `Businesses expanding across ${place} benefit from a single security partner model: consistent training standards, dedicated account management, monthly compliance documentation, and transparent proposals for each site.`,
    ]),
    `Silbar Security Services Pvt. Ltd. operates from New Delhi (Registered Office), Gurugram (Corporate Office), and regional offices in Jaipur, Noida, and Ahmedabad. For ${place} enquiries, call ${CONTACT.phone}, email ${CONTACT.email}, or submit the WhatsApp form on this page.`,
  ]

  const marketOverview = [
    `${place}'s economy spans ${sectors.slice(0, 5).join(', ')}, with security risk profiles that differ sharply between a manufacturing plant, a hospital, a shopping mall, and a residential township — generic guard rosters fail to address these varied requirements.`,
    `Key industrial corridors and commercial hubs in ${place} experience peak security demand during night logistics windows, festival seasons when footfall surges, and contractor-heavy operational periods. Professional agencies plan relief manpower, supervisor coverage, and escalation protocols for these pressure points.`,
    `Choosing Silbar Security Services Pvt. Ltd. for ${place} means partnering with a PSARA-compliant agency that brings documented processes, trained personnel, monthly compliance reporting, and responsive account management — not just uniformed staff at the gate.`,
  ]

  // Blended challenges: state-specific + generic (offset seed so generic items differ from city pages in the same state)
  const sChallenges = challengesForState(state.slug, seed)
  const gChallenges = pickN(seed + 31337, CHALLENGES_POOL, 8)
  const stateChallenges = [...sChallenges, ...gChallenges].slice(0, 8)

  return {
    placeName: place,
    placeType: 'state',
    seed,
    intro,
    marketOverview,
    challengesHeading: `Security challenges facilities face across ${place}`,
    challenges: stateChallenges,
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
      `Silbar Security Services Pvt. Ltd. holds 4 ISO certifications (IAF accredited) and PSARA licenses across 19 states. Our process discipline is ISO-certified; site delivery excellence depends on clear client instructions and structured joint onboarding at every ${place} location.`,
    ],
    whyHeading: `Why choose Silbar Security Services Pvt. Ltd. in ${place}`,
    whyPoints: pickN(seed, WHY_POINTS_POOL, 10),
    processHeading: `How Silbar deploys security for ${place} sites`,
    process: PROCESS_STEPS.map((s) => ({
      title: s.title,
      desc: s.desc.replace(/\{place\}/g, place),
    })),
    faqs: buildFaqs(place, place, seed, false),
    closingCta: `Planning security for your facility in ${place}? Call ${CONTACT.phone}, email ${CONTACT.email}, or use the WhatsApp form below. Share your facility type, number of posts, and shift requirements for a fast proposal.`,
    metaDescription: pick(seed, 20, [
      `Security guard company in ${place}. Serving ${citiesList || state.capital} across ${state.districts} districts. ${sectors.slice(0, 3).join(', ')} security. PSARA licensed, ISO certified. Call ${CONTACT.phone}.`,
      `Security agency in ${place} — ${sectors.slice(0, 3).join(', ')}. ${state.districts} districts covered. PSARA licensed, 4 ISO certifications. Get a free quote.`,
      `${place} security guard services across ${state.districts} districts. Serving ${citiesList || state.capital} and all major cities. ISO 9001:2015 certified. Call ${CONTACT.phone}.`,
      `Professional security company in ${place}. ${sectors.slice(0, 2).join(' and ')} security. PAN India capability with local ${place} deployment. Enquire now.`,
      `Looking for security in ${place}? Silbar Security Services Pvt. Ltd. covers ${state.districts} districts with PSARA-licensed, ISO-certified security manpower across ${citiesList || state.capital}.`,
    ]),
    servicesIntro: `Explore Silbar Security Services Pvt. Ltd.'s full range of service verticals available for deployment across ${place}. Click any service to view features, use cases, and FAQs, then request a ${place}-specific quote.`,
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
