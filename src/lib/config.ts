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
    line1: '5th Floor, Statesman House, Plot No. 148',
    line2: 'Barakhamba Road, Connaught Place, New Delhi — 110001',
    state: 'Delhi',
    country: 'India',
    full: '5th Floor, Statesman House, Plot No. 148, Barakhamba Road, Connaught Place, New Delhi — 110001, India',
  },
  whatsapp: {
    number: '919352303333',
    message: 'Hello%20Silbar%20Security%20-%20I%20need%20a%20security%20quote',
    url: 'https://wa.me/919352303333?text=Hello%20Silbar%20Security%20-%20I%20need%20a%20security%20quote',
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
      phone: '+91 93523 03333',
      phoneRaw: '919352303333',
      hours: 'Mon–Sat: 9:00 AM – 7:00 PM',
      isHQ: true,
    },
    {
      city: 'Gurugram (Corporate Office)',
      badge: 'Corporate Office',
      region: 'Haryana',
      address: '2nd Floor, MPD Tower, Golf Course Road, Sector 43, Gurugram, Haryana — 122002',
      pin: '122002',
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
