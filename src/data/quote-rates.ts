/**
 * Per-state security-guard basic wages for the quote calculator.
 *
 * Rajasthan figures come from the client's own rate sheet (Rajasthan (1) (1).xlsx):
 * guard ₹6,474 / supervisor ₹7,774 monthly basic — marked `verified: true`.
 *
 * All other states use researched, VDA-linked minimum-wage figures for the
 * semi-skilled / watch-&-ward security guard category (major-city zone where a
 * state zones rates), revised ~April/October each year — marked `verified: false`.
 * These are INDICATIVE: the sales team confirms the final rate per deployment.
 *
 * To update a state, edit the number here — the calculator picks it up automatically.
 */

export type QuoteCategory = 'guard' | 'lady-guard' | 'supervisor'

export interface StateQuoteRate {
  slug: string
  name: string
  /** Monthly basic wage (INR) for an unarmed security guard / lady guard */
  guardBasic: number
  /** Monthly basic wage (INR) for a security supervisor */
  supervisorBasic: number
  /** true = from the client's own rate sheet; false = researched/indicative */
  verified: boolean
}

export const QUOTE_RATES: StateQuoteRate[] = [
  { slug: 'rajasthan', name: 'Rajasthan', guardBasic: 6474, supervisorBasic: 7774, verified: true },
  { slug: 'delhi', name: 'Delhi', guardBasic: 20371, supervisorBasic: 24445, verified: false },
  { slug: 'maharashtra', name: 'Maharashtra', guardBasic: 14756, supervisorBasic: 17707, verified: false },
  { slug: 'karnataka', name: 'Karnataka', guardBasic: 26745, supervisorBasic: 32094, verified: false },
  { slug: 'tamil-nadu', name: 'Tamil Nadu', guardBasic: 14080, supervisorBasic: 16896, verified: false },
  { slug: 'telangana', name: 'Telangana', guardBasic: 17000, supervisorBasic: 20400, verified: false },
  { slug: 'andhra-pradesh', name: 'Andhra Pradesh', guardBasic: 13998, supervisorBasic: 16798, verified: false },
  { slug: 'gujarat', name: 'Gujarat', guardBasic: 13325, supervisorBasic: 15990, verified: false },
  { slug: 'uttar-pradesh', name: 'Uttar Pradesh', guardBasic: 13940, supervisorBasic: 16728, verified: false },
  { slug: 'haryana', name: 'Haryana', guardBasic: 13704, supervisorBasic: 16445, verified: false },
  { slug: 'madhya-pradesh', name: 'Madhya Pradesh', guardBasic: 15144, supervisorBasic: 18173, verified: false },
  { slug: 'west-bengal', name: 'West Bengal', guardBasic: 11807, supervisorBasic: 14168, verified: false },
  { slug: 'punjab', name: 'Punjab', guardBasic: 13403, supervisorBasic: 16084, verified: false },
  { slug: 'bihar', name: 'Bihar', guardBasic: 11752, supervisorBasic: 14102, verified: false },
  { slug: 'jharkhand', name: 'Jharkhand', guardBasic: 18042, supervisorBasic: 21650, verified: false },
  { slug: 'odisha', name: 'Odisha', guardBasic: 14872, supervisorBasic: 17846, verified: false },
  { slug: 'chhattisgarh', name: 'Chhattisgarh', guardBasic: 14712, supervisorBasic: 17654, verified: false },
  { slug: 'uttarakhand', name: 'Uttarakhand', guardBasic: 14541, supervisorBasic: 17449, verified: false },
  { slug: 'himachal-pradesh', name: 'Himachal Pradesh', guardBasic: 14790, supervisorBasic: 17748, verified: false },
  { slug: 'kerala', name: 'Kerala', guardBasic: 13000, supervisorBasic: 15600, verified: false },
  { slug: 'goa', name: 'Goa', guardBasic: 14586, supervisorBasic: 17503, verified: false },
  { slug: 'assam', name: 'Assam', guardBasic: 12257, supervisorBasic: 14708, verified: false },
  { slug: 'jammu-and-kashmir', name: 'Jammu & Kashmir', guardBasic: 12558, supervisorBasic: 15070, verified: false },
  { slug: 'chandigarh', name: 'Chandigarh', guardBasic: 15237, supervisorBasic: 18284, verified: false },
  { slug: 'ladakh', name: 'Ladakh', guardBasic: 14000, supervisorBasic: 16800, verified: false },
  { slug: 'puducherry', name: 'Puducherry', guardBasic: 13500, supervisorBasic: 16200, verified: false },
  { slug: 'andaman-and-nicobar', name: 'Andaman & Nicobar', guardBasic: 13000, supervisorBasic: 15600, verified: false },
  { slug: 'dadra-and-nagar-haveli', name: 'Dadra & Nagar Haveli', guardBasic: 12500, supervisorBasic: 15000, verified: false },
  { slug: 'sikkim', name: 'Sikkim', guardBasic: 13000, supervisorBasic: 15600, verified: false },
  { slug: 'nagaland', name: 'Nagaland', guardBasic: 12500, supervisorBasic: 15000, verified: false },
  { slug: 'manipur', name: 'Manipur', guardBasic: 12000, supervisorBasic: 14400, verified: false },
  { slug: 'mizoram', name: 'Mizoram', guardBasic: 12000, supervisorBasic: 14400, verified: false },
  { slug: 'meghalaya', name: 'Meghalaya', guardBasic: 12000, supervisorBasic: 14400, verified: false },
  { slug: 'tripura', name: 'Tripura', guardBasic: 12000, supervisorBasic: 14400, verified: false },
  { slug: 'lakshadweep', name: 'Lakshadweep', guardBasic: 12000, supervisorBasic: 14400, verified: false },
]

export function getQuoteRate(slug: string): StateQuoteRate | undefined {
  return QUOTE_RATES.find((r) => r.slug === slug)
}
