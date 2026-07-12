// Business contact information — single source of truth

export const CONTACT = {
  phone: '+91 93523 03333',
  phoneRaw: '919352303333',
  tollFree: '1800-123-4567',
  tollFreeRaw: '18001234567',
  email: 'info@silbarsecurity.in',
  emergencyEmail: 'emergency@silbarsecurity.in',
  address: {
    line1: '208, 2nd Floor, Samod Tower',
    line2: 'Sansar Chand Road, Jaipur — 302001',
    state: 'Rajasthan',
    country: 'India',
  },
  whatsapp: {
    number: '+919352303333',
    message: 'Hello%20Silbar%20Security%20-%20I%20need%20a%20security%20quote',
    url: 'https://wa.me/919352303333?text=Hello%20Silbar%20Security%20-%20I%20need%20a%20security%20quote',
  },
  hours: '24/7',
  social: {
    facebook: 'https://www.facebook.com/share/1GtattxqNp/',
    instagram: 'https://instagram.com/silbarsecurity',
    linkedin: 'https://www.linkedin.com/company/silbar-security-services-private-limited/',
    google: 'https://g.co/kgs/silbarsecurity',
  },
  offices: ['Jaipur', 'Delhi', 'Ahmedabad'] as const,
  landline: '+91-141 222 3334',
  landlineRaw: '911412223334',
} as const
