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
  }
]
