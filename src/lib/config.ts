// Business contact information — single source of truth

/** Official WordPress blog (daily posts / CMS) */
export const WORDPRESS_BLOG = {
  origin: 'https://blog.silbarsecurity.in',
  home: 'https://blog.silbarsecurity.in/',
  api: 'https://blog.silbarsecurity.in/wp-json/wp/v2',
  feed: 'https://blog.silbarsecurity.in/feed/',
} as const

export const CONTACT = {
  phone: '+91 99821 70555',
  phoneRaw: '919982170555',
  /** Primary emergency line (same as main mobile until dedicated toll-free is confirmed) */
  emergencyPhone: '+91 99821 70555',
  emergencyPhoneRaw: '919982170555',
  email: 'info@silbarsecurity.in',
  emergencyEmail: 'emergency@silbarsecurity.in',
  address: {
    line1: '5th Floor, Statesman House, Plot No. 148',
    line2: 'Barakhamba Road, Connaught Place, New Delhi — 110001',
    state: 'Delhi',
    country: 'India',
    full: '5th Floor, Statesman House, Plot No. 148, Barakhamba Road, Connaught Place, New Delhi — 110001, India',
  },
  whatsapp: {
    number: '919982170555',
    message: 'Hello%20Silbar%20Security%20-%20I%20need%20a%20security%20quote',
    url: 'https://wa.me/919982170555?text=Hello%20Silbar%20Security%20-%20I%20need%20a%20security%20quote',
  },
  hours: 'Mon–Sat 9:00 AM – 7:00 PM · Emergency: 24/7',
  social: {
    facebook: 'https://www.facebook.com/share/1GtattxqNp/',
    instagram: 'https://instagram.com/silbar_security',
    linkedin: 'https://www.linkedin.com/company/silbar-security-services-private-limited/',
    google: 'https://g.co/kgs/silbarsecurity',
  },
  landline: '+91-141-4021078',
  landlineRaw: '911414021078',
  /**
   * Office locations for contact / careers / schema.
   * HQ has full street address; regional hubs show city + coverage until street addresses are confirmed by client.
   */
  officeLocations: [
    {
      city: 'New Delhi (Registered Office)',
      badge: 'Registered Office',
      region: 'Delhi',
      address: '5th Floor, Statesman House, Plot No. 148, Barakhamba Road, Connaught Place, New Delhi — 110001',
      pin: '110001',
      phone: '+91 99821 70555',
      phoneRaw: '919982170555',
      hours: 'Mon–Sat: 9:00 AM – 7:00 PM',
      isHQ: true,
      mapUrl: 'https://maps.google.com/?cid=7869038594776014797',
    },
    {
      city: 'Gurugram (Corporate Office)',
      badge: 'Corporate Office',
      region: 'Haryana',
      address: '2nd Floor, MPD Tower, Golf Course Road, Sector 43, Gurugram, Haryana — 122002',
      pin: '122002',
      phone: '+91 99821 70555',
      phoneRaw: '919982170555',
      hours: 'Mon–Sat: 9:00 AM – 7:00 PM',
      isHQ: false,
      mapUrl: 'https://maps.google.com/?cid=3300960116722998024',
    },
    {
      city: 'Jaipur (Regional Office)',
      badge: 'Regional Office',
      region: 'Rajasthan',
      address: '7th Floor, Man Upasana Tower, C-44, Sardar Patel Marg, C Scheme, Ashok Nagar, Jaipur — 302001',
      pin: '302001',
      phone: '+91 99821 70555',
      phoneRaw: '919982170555',
      hours: 'Mon–Sat: 9:00 AM – 7:00 PM',
      isHQ: false,
      mapUrl: 'https://www.google.com/maps?kgmid=/g/11y05bzscz',
    },
    {
      city: 'Noida (Regional Office)',
      badge: 'Regional Office',
      region: 'Uttar Pradesh',
      address: 'C-20, Coast Guard Golf Ground Rd, C Block, Phase 2, Industrial Area, Sector 62, Noida, Uttar Pradesh — 201309',
      pin: '201309',
      phone: '+91 99821 70555',
      phoneRaw: '919982170555',
      hours: 'Mon–Sat: 9:00 AM – 7:00 PM',
      isHQ: false,
      mapUrl: 'https://www.google.com/maps?kgmid=/g/11y0631x1t',
    },
    {
      city: 'Ahmedabad (Regional Office)',
      badge: 'Regional Office',
      region: 'Gujarat',
      address: '6th Floor, Tower-A, Mondeal Heights, 605, S.G. Highway, Iskcon Cross Rd, Ahmedabad, Gujarat — 380015',
      pin: '380015',
      phone: '+91 99821 70555',
      phoneRaw: '919982170555',
      hours: 'Mon–Sat: 9:00 AM – 7:00 PM',
      isHQ: false,
      mapUrl: 'https://www.google.com/maps?kgmid=/g/11t2sjqn5v',
    },
  ] as const,
  /** @deprecated Use emergencyPhone — placeholder removed; maps to primary mobile */
  tollFree: '+91 99821 70555',
  tollFreeRaw: '919982170555',
} as const

export const GOOGLE_REVIEWS = {
  /** Google review write URL — get this from your GBP dashboard → Promote → Get more reviews */
  writeUrl: 'https://g.page/r/silbar-security/review',
  /** EmbedSocial (or similar) widget embed code — empty = fallback static display shown */
  embedScriptSrc: '',
  embedDivAttrs: '',
  rating: 4.8,
  reviewCount: '150+',
} as const
