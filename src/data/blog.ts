export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string // HTML or Markdown string for real app, here just a long string
  coverImage: string
  author: string
  publishedAt: string
  category: string
  readTime: string
}

export const BLOG_CATEGORIES = [
  'All',
  'Security Tips',
  'Industry News',
  'Company Updates',
  'Compliance',
]

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'importance-of-iso-9001-in-security',
    title: 'Why ISO 9001:2015 Certification Matters in Private Security',
    excerpt: 'Discover how quality management systems transform security operations from reactive guarding to proactive risk management.',
    content: `
      <h2>The Shift in Private Security</h2>
      <p>The private security industry in India has evolved significantly over the last decade. It's no longer just about deploying guards at a gate; it's about comprehensive risk management, standardized procedures, and measurable quality. This is where ISO 9001:2015 certification becomes a crucial differentiator.</p>
      
      <h2>What Does ISO 9001:2015 Mean for Security?</h2>
      <p>ISO 9001:2015 is the international standard for Quality Management Systems (QMS). When a security agency achieves this certification, it means they have established a systematic approach to:</p>
      <ul>
        <li><strong>Manpower Sourcing & Training:</strong> Rigorous background checks, structured training programs, and regular skill upgrades.</li>
        <li><strong>Standard Operating Procedures (SOPs):</strong> Every site has documented site instructions, emergency response protocols, and reporting formats.</li>
        <li><strong>Performance Auditing:</strong> Regular day/night checks by field officers, monthly MIS reports, and continuous feedback loops.</li>
      </ul>

      <h2>Why Clients Should Demand Certified Agencies</h2>
      <p>Partnering with a non-certified, unorganized agency often leads to compliance risks, high attrition rates, and ultimately, security breaches. A certified agency like Silbar Security ensures that our processes are audited by third-party experts annually, guaranteeing that our commitment to quality isn't just a promise—it's a proven practice.</p>
    `,
    coverImage: '/images/blog/iso-security.jpg', // We will just use gradients or abstract shapes for now in UI if image doesn't exist
    author: 'Silbar Security Expert',
    publishedAt: '2026-06-15',
    category: 'Compliance',
    readTime: '4 min read'
  },
  {
    id: 'post-2',
    slug: 'cctv-vs-manned-guarding',
    title: 'CCTV vs. Manned Guarding: Finding the Right Balance',
    excerpt: 'Is electronic surveillance replacing physical security guards? Learn how an integrated approach provides the best protection.',
    content: `
      <h2>The Rise of Electronic Surveillance</h2>
      <p>With AI-powered cameras, biometric access control, and remote monitoring systems becoming more affordable, many facility managers ask: "Do we still need physical security guards?"</p>
      
      <h2>The Limitations of Technology</h2>
      <p>While CCTV cameras are excellent for recording events, deterring casual theft, and providing post-incident evidence, they cannot <em>intervene</em>. A camera cannot escort an abusive visitor off the premises, check a delivery truck for unauthorized materials, or respond instantly to a fire alarm.</p>

      <h2>The Integrated Security Model</h2>
      <p>The most effective security strategy doesn't choose between humans and technology; it integrates them. At Silbar Security, we train our guards to act as the "response arm" of the electronic surveillance system.</p>
      <ul>
        <li><strong>Proactive Monitoring:</strong> Guards stationed at the control room monitor feeds to detect anomalies before they escalate.</li>
        <li><strong>Immediate Response:</strong> When a perimeter breach alarm triggers, the Quick Response Team (QRT) is deployed instantly.</li>
        <li><strong>Human Judgement:</strong> Technology can detect movement, but human guards are required to assess intent and context.</li>
      </ul>
      <p>By blending licensed, trained manpower with modern technology, businesses achieve a robust security posture that is both cost-effective and highly responsive.</p>
    `,
    coverImage: '/images/blog/cctv-guard.jpg',
    author: 'Operations Head',
    publishedAt: '2026-06-28',
    category: 'Security Tips',
    readTime: '5 min read'
  },
  {
    id: 'post-3',
    slug: 'preparing-facility-for-festive-season',
    title: 'Preparing Your Facility\'s Security for the Festive Season',
    excerpt: 'Increased footfall, temporary staff, and extended hours bring unique security challenges. Here is how to prepare.',
    content: `
      <h2>Heightened Risks During Festivals</h2>
      <p>In India, the festive season brings a surge in economic activity. Retail stores see massive footfall, manufacturing plants operate double shifts to meet demand, and residential complexes host large gatherings. This increased activity inevitably attracts security risks, including theft, unauthorized access, and crowd mismanagement.</p>
      
      <h2>Key Preparation Steps</h2>
      <p>To ensure a safe festive season, facility managers should take the following steps:</p>
      <ol>
        <li><strong>Conduct a Vulnerability Assessment:</strong> Identify weak points in your perimeter and upgrade lighting in dark spots.</li>
        <li><strong>Deploy Additional Manpower:</strong> Request temporary deployment of additional guards from your security partner for crowd control and parking management.</li>
        <li><strong>Verify Temporary Staff:</strong> Ensure all seasonal workers undergo strict ID verification and are issued temporary passes.</li>
        <li><strong>Test Fire Safety Systems:</strong> With the increased use of electrical decorations and firecrackers, ensuring fire extinguishers and alarms are functional is critical.</li>
      </ol>
      <p>Silbar Security provides short-term deployment services tailored for the festive season, ensuring your business operations continue smoothly without compromising on safety.</p>
    `,
    coverImage: '/images/blog/festive-security.jpg',
    author: 'Silbar Security Expert',
    publishedAt: '2026-07-05',
    category: 'Industry News',
    readTime: '3 min read'
  },
  {
    id: 'post-4',
    slug: 'how-to-choose-security-agency-india',
    title: 'How to Choose a Security Agency in India: A Practical Checklist',
    excerpt: 'Beyond the lowest quote — what facility managers should verify before awarding a security contract.',
    content: `
      <h2>Price Is Not the Only Metric</h2>
      <p>Many RFPs for private security still award contracts primarily on lowest cost. That approach often leads to underpaid manpower, high attrition, and weak night supervision. A better process evaluates process quality, compliance, and operational control alongside commercials.</p>
      <h2>Checklist Before You Sign</h2>
      <ul>
        <li><strong>Company credentials:</strong> Incorporation, GST, and quality certifications such as ISO 9001:2015.</li>
        <li><strong>Manpower practices:</strong> Background verification, training syllabus, and replacement guarantees.</li>
        <li><strong>Statutory approach:</strong> How wages, EPF, and ESIC are handled for eligible staff in your state.</li>
        <li><strong>Supervision model:</strong> Field officers, night checks, and reporting frequency.</li>
        <li><strong>References:</strong> Similar industry deployments (factory, hospital, warehouse, society).</li>
      </ul>
      <h2>Questions to Ask Vendors</h2>
      <p>Ask for a sample site instruction document, escalation matrix, and a clear commercial breakup. If answers are vague, risk usually shows up after mobilisation — not before.</p>
      <p>Silbar Security structures proposals with transparent scope so clients in Jaipur, Delhi NCR, Ahmedabad, and pan-India multi-site networks can compare value — not just headcount rates.</p>
    `,
    coverImage: '/images/blog/choose-agency.jpg',
    author: 'Silbar Security Expert',
    publishedAt: '2026-07-08',
    category: 'Security Tips',
    readTime: '5 min read',
  },
  {
    id: 'post-5',
    slug: 'industrial-security-gate-management',
    title: 'Industrial Gate Management: Where Most Factory Losses Start',
    excerpt: 'Material movement, contractor access, and shift change chaos — fixing the gate often fixes half the risk.',
    content: `
      <h2>The Gate Is a Control Point</h2>
      <p>In manufacturing and logistics, losses frequently begin at the gate: incomplete vehicle logs, weak material challan checks, and uncontrolled contractor entry. Technology helps, but disciplined manpower is still the frontline.</p>
      <h2>What Good Gate Security Looks Like</h2>
      <ul>
        <li>Documented vehicle and material procedures</li>
        <li>Separate pedestrian and vehicle flows where possible</li>
        <li>Shift-wise accountability with supervisor samples</li>
        <li>Coordination with stores / logistics teams</li>
      </ul>
      <h2>How Silbar Approaches Industrial Sites</h2>
      <p>Our industrial deployments emphasise gate discipline, perimeter awareness, and clear escalation. Combined with optional CCTV support and MIS reporting, plants get a security layer that supports operations — not just a uniform at the barrier.</p>
    `,
    coverImage: '/images/blog/industrial-gate.jpg',
    author: 'Operations Head',
    publishedAt: '2026-07-10',
    category: 'Industry News',
    readTime: '4 min read',
  },
  {
    id: 'post-6',
    slug: 'residential-society-security-best-practices',
    title: 'Residential Society Security: Best Practices for RWAs',
    excerpt: 'Visitor management, parking disputes, and night patrols — practical guidance for society committees.',
    content: `
      <h2>Societies Need Process, Not Just Guards</h2>
      <p>Residential security fails when posts are unclear: who handles deliveries, how visitors are logged, and what happens at 2 AM when a gate is left open. RWAs should define duty instructions with their security partner.</p>
      <h2>Core Practices</h2>
      <ol>
        <li>Standard visitor and cab protocols</li>
        <li>Delivery staging rules</li>
        <li>Parking and boom-barrier discipline</li>
        <li>Emergency contact tree for residents and police/fire</li>
      </ol>
      <h2>Working With a Professional Agency</h2>
      <p>Silbar Security supports residential communities with trained guards, lady guards where required, and supervisor oversight. Clear commercial terms and replacement backup help committees avoid service gaps during festivals and peak seasons.</p>
    `,
    coverImage: '/images/blog/residential-security.jpg',
    author: 'Silbar Security Expert',
    publishedAt: '2026-07-11',
    category: 'Security Tips',
    readTime: '4 min read',
  },
]

