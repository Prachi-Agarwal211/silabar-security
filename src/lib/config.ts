// Business contact information — single source of truth

/** Official WordPress blog (daily posts / CMS) */
export const WORDPRESS_BLOG = {
  origin: 'https://blog.silbarsecurity.in',
  home: 'https://blog.silbarsecurity.in/',
  api: 'https://blog.silbarsecurity.in/wp-json/wp/v2',
  feed: 'https://blog.silbarsecurity.in/feed/',
} as const

export const CONTACT = {
  /** Public website / sales mobile — client confirmed */
  phone: '+91 99821 70555',
  phoneRaw: '919982170555',
  /** PSARA / Jaipur GBP line (not personal 3333) */
  psaraPhone: '+91 99831 69555',
  psaraPhoneRaw: '919983169555',
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
    message: 'Hello%20Silbar%20Security%20Services%20Pvt.%20Ltd.%20-%20I%20need%20a%20security%20quote',
    url: 'https://wa.me/919982170555?text=Hello%20Silbar%20Security%20Services%20Pvt.%20Ltd.%20-%20I%20need%20a%20security%20quote',
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
   * Office locations — mapUrl uses Google Business Profile cid (not bare address search).
   * Verified against live GBP listings: Delhi, Gurugram, Jaipur, Noida, Ahmedabad.
   */
  officeLocations: [
    {
      city: 'New Delhi (Registered Office)',
      badge: 'Registered Office',
      region: 'Delhi',
      placeName: 'Registered Office - Silbar Security Services Pvt. Ltd.',
      address: '5th Floor, Statesman House, Plot No. 148, Barakhamba Road, Connaught Place, New Delhi — 110001',
      pin: '110001',
      phone: '+91 99821 70555',
      phoneRaw: '919982170555',
      hours: 'Mon–Sat: 9:00 AM – 7:00 PM',
      isHQ: true,
      lat: 28.6307992,
      lng: 77.2226255,
      mapUrl: 'https://maps.google.com/?cid=7869038594776014797',
      mapEmbed: 'https://www.google.com/maps?cid=7869038594776014797&output=embed&hl=en',
    },
    {
      city: 'Gurugram (Corporate Office)',
      badge: 'Corporate Office',
      region: 'Haryana',
      placeName: 'Corporate Office - Silbar Security Services Pvt. Ltd.',
      address: '2nd Floor, MPD Tower, Golf Course Road, Sector 43, Gurugram, Haryana — 122009',
      pin: '122009',
      phone: '+91 99821 70555',
      phoneRaw: '919982170555',
      hours: 'Mon–Sat: 9:00 AM – 7:00 PM',
      isHQ: false,
      lat: 28.4502633,
      lng: 77.1006415,
      mapUrl: 'https://maps.google.com/?cid=3300960116722998024',
      mapEmbed: 'https://www.google.com/maps?cid=3300960116722998024&output=embed&hl=en',
    },
    {
      city: 'Jaipur (Regional Office)',
      badge: 'Regional Office',
      region: 'Rajasthan',
      placeName: 'Regional Office - Silbar Security Services Pvt. Ltd. Jaipur',
      address: '7th Floor, Man Upasana Tower, C-44, Sardar Patel Marg, C Scheme, Ashok Nagar, Jaipur — 302001',
      pin: '302001',
      phone: '+91 99831 69555',
      phoneRaw: '919983169555',
      hours: 'Mon–Sat: 9:00 AM – 7:00 PM',
      isHQ: false,
      lat: 26.9119365,
      lng: 75.7973241,
      mapUrl: 'https://maps.google.com/?cid=7404208150107816544',
      mapEmbed: 'https://www.google.com/maps?cid=7404208150107816544&output=embed&hl=en',
    },
    {
      city: 'Noida (Regional Office)',
      badge: 'Regional Office',
      region: 'Uttar Pradesh',
      placeName: 'Regional Office - Silbar Security Services Pvt. Ltd. Noida',
      address: 'C-20, Coast Guard Golf Ground Rd, C Block, Phase 2, Industrial Area, Sector 62, Noida, Uttar Pradesh — 201309',
      pin: '201309',
      phone: '+91 99821 70555',
      phoneRaw: '919982170555',
      hours: 'Mon–Sat: 9:00 AM – 7:00 PM',
      isHQ: false,
      lat: 28.6143967,
      lng: 77.3553021,
      mapUrl: 'https://maps.google.com/?cid=14695954397884633275',
      mapEmbed: 'https://www.google.com/maps?cid=14695954397884633275&output=embed&hl=en',
    },
    {
      city: 'Ahmedabad (Regional Office)',
      badge: 'Regional Office',
      region: 'Gujarat',
      placeName: 'Regional Office - Silbar Security Services Pvt. Ltd. Ahmedabad',
      address: '6th Floor, Tower-A, Mondeal Heights, 605, S.G. Highway, Iskcon Cross Rd, Ahmedabad, Gujarat — 380015',
      pin: '380015',
      phone: '+91 99821 70555',
      phoneRaw: '919982170555',
      hours: 'Mon–Sat: 9:00 AM – 7:00 PM',
      isHQ: false,
      lat: 23.0228658,
      lng: 72.5067099,
      mapUrl: 'https://maps.google.com/?cid=4837321117134116721',
      mapEmbed: 'https://www.google.com/maps?cid=4837321117134116721&output=embed&hl=en',
    },
  ] as const,
  /** @deprecated Use emergencyPhone — placeholder removed; maps to primary mobile */
  tollFree: '+91 99821 70555',
  tollFreeRaw: '919982170555',
} as const

export type OfficeLocation = (typeof CONTACT.officeLocations)[number]

/** City slug → Silbar Google Business Profile office */
const CITY_OFFICE_INDEX: Record<string, number> = {
  delhi: 0,
  'new-delhi': 0,
  gurugram: 1,
  gurgaon: 1,
  jaipur: 2,
  noida: 3,
  'greater-noida': 3,
  ahmedabad: 4,
}

/** State slug → preferred Silbar office index (nearest GBP hub) */
const STATE_OFFICE_INDEX: Record<string, number> = {
  delhi: 0,
  haryana: 1,
  rajasthan: 2,
  'uttar-pradesh': 3,
  gujarat: 4,
}

export function getOfficeForCitySlug(citySlug: string): OfficeLocation | undefined {
  const i = CITY_OFFICE_INDEX[citySlug.toLowerCase()]
  return i === undefined ? undefined : CONTACT.officeLocations[i]
}

/** Offices to show on a city page: local GBP if we have one, else nearest state hub (always ≥1). */
export function getOfficesForCityPage(citySlug: string, stateSlug: string): OfficeLocation[] {
  const local = getOfficeForCitySlug(citySlug)
  if (local) return [local]
  const i = STATE_OFFICE_INDEX[stateSlug.toLowerCase()]
  return [CONTACT.officeLocations[i ?? 0]!]
}

/** Offices to show on a state page: state hub GBP, or Registered Office for other states. */
export function getOfficesForStatePage(stateSlug: string): OfficeLocation[] {
  const i = STATE_OFFICE_INDEX[stateSlug.toLowerCase()]
  // One embed per page — hub office for DL/HR/RJ/UP/GJ, else Registered Office (Delhi)
  return [CONTACT.officeLocations[i ?? 0]!]
}

export const GOOGLE_REVIEWS = {
  /** Google review write URL — get this from your GBP dashboard → Promote → Get more reviews */
  writeUrl: 'https://g.page/r/silbar-security/review',
  /** EmbedSocial (or similar) widget embed code — empty = fallback static display shown */
  embedScriptSrc: '',
  embedDivAttrs: '',
  rating: 4.8,
  reviewCount: '150+',
} as const
