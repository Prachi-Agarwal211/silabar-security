// Business contact information — single source of truth

/** Official WordPress blog (daily posts / CMS) */
export const WORDPRESS_BLOG = {
  origin: 'https://blog.silbarsecurity.in',
  home: 'https://blog.silbarsecurity.in/',
  api: 'https://blog.silbarsecurity.in/wp-json/wp/v2',
  feed: 'https://blog.silbarsecurity.in/feed/',
} as const

export const CONTACT = {
  phone: '+91 93523 03333',
  phoneRaw: '919352303333',
  /** Primary emergency line (same as main mobile until dedicated toll-free is confirmed) */
  emergencyPhone: '+91 93523 03333',
  emergencyPhoneRaw: '919352303333',
  email: 'info@silbarsecurity.in',
  emergencyEmail: 'emergency@silbarsecurity.in',
  address: {
    line1: '208, 2nd Floor, Samod Tower',
    line2: 'Sansar Chand Road, Jaipur — 302001',
    state: 'Rajasthan',
    country: 'India',
    full: '208, 2nd Floor, Samod Tower, Sansar Chand Road, Jaipur — 302001, Rajasthan, India',
  },
  whatsapp: {
    number: '919352303333',
    message: 'Hello%20Silbar%20Security%20-%20I%20need%20a%20security%20quote',
    url: 'https://wa.me/919352303333?text=Hello%20Silbar%20Security%20-%20I%20need%20a%20security%20quote',
  },
  hours: 'Mon–Sat 9:00 AM – 7:00 PM · Emergency: 24/7',
  social: {
    facebook: 'https://www.facebook.com/share/1GtattxqNp/',
    instagram: 'https://instagram.com/silbarsecurity',
    linkedin: 'https://www.linkedin.com/company/silbar-security-services-private-limited/',
    google: 'https://g.co/kgs/silbarsecurity',
  },
  landline: '+91-141 222 3334',
  landlineRaw: '911412223334',
  /**
   * Office locations for contact / careers / schema.
   * HQ has full street address; regional hubs show city + coverage until street addresses are confirmed by client.
   */
  officeLocations: [
    {
      city: 'Jaipur (HQ)',
      badge: 'Headquarters',
      region: 'Rajasthan',
      address: '208, 2nd Floor, Samod Tower, Sansar Chand Road, Jaipur — 302001',
      pin: '302001',
      phone: '+91 93523 03333',
      phoneRaw: '919352303333',
      landline: '+91-141 222 3334',
      hours: 'Mon–Sat: 9:00 AM – 7:00 PM',
      isHQ: true,
    },
    {
      city: 'Delhi NCR',
      badge: 'North India',
      region: 'Delhi',
      address: 'Corporate operations office — New Delhi / NCR (site surveys & deployments across Delhi NCR)',
      pin: '110001',
      phone: '+91 93523 03333',
      phoneRaw: '919352303333',
      hours: 'Mon–Sat: 9:00 AM – 7:00 PM',
      isHQ: false,
    },
    {
      city: 'Ahmedabad',
      badge: 'West India',
      region: 'Gujarat',
      address: 'Regional operations hub — Ahmedabad, Gujarat (coverage across Gujarat industrial corridors)',
      pin: '380001',
      phone: '+91 93523 03333',
      phoneRaw: '919352303333',
      hours: 'Mon–Sat: 9:00 AM – 7:00 PM',
      isHQ: false,
    },
  ] as const,
  /** @deprecated Use emergencyPhone — placeholder removed; maps to primary mobile */
  tollFree: '+91 93523 03333',
  tollFreeRaw: '919352303333',
} as const
