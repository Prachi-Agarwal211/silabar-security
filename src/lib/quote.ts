import { QuoteCategory, StateQuoteRate } from '@/data/quote-rates'

/**
 * Quote engine — replicates the client's rate-sheet formula exactly
 * (verified against `Rajasthan (1) (1).xlsx`, 12-hour shift basis):
 *
 *   gross    = basic + HRA(50%) + conveyance
 *   PF       = 13%   of basic          (Rajasthan sheet: 6474 × 0.13 = 841.62)
 *   ESI      = 3.25% of gross          (9711 × 0.0325 = 315.61)
 *   Bonus    = 8.33% of basic
 *   Leave    = 8.33% of basic
 *   Uniform  = ₹250 fixed
 *   net      = gross + PF + ESI + Bonus + Leave + Uniform
 *   relieving= 16.67% of net
 *   subtotal = net + relieving
 *   service  = 10% of subtotal
 *   grand    = subtotal + service
 *   GST      = 18% on grand (extra, optional)
 *
 * Lady guards bill at the guard rate (same category on the sheet).
 */

export const QUOTE_CONSTANTS = {
  hraRate: 0.5,
  conveyanceGuard: 0,
  conveyanceSupervisor: 1000,
  pfRate: 0.13,
  esiRate: 0.0325,
  bonusRate: 0.0833,
  leaveRate: 0.0833,
  uniformCharge: 250,
  relievingRate: 0.1667,
  serviceChargeRate: 0.1,
  gstRate: 0.18,
} as const


export interface QuoteLine {
  label: string
  amount: number
  isTotal?: boolean
}

export interface QuoteBreakdown {
  basic: number
  conveyance: number
  gross: number
  pf: number
  esi: number
  bonus: number
  leave: number
  uniform: number
  net: number
  relieving: number
  subtotal: number
  serviceCharge: number
  grand: number
  gst: number
  /** grand + GST (GST applied when enabled) */
  totalPerGuard: number
  lines: QuoteLine[]
}

export interface QuoteInput {
  rate: StateQuoteRate
  category: QuoteCategory
  /** 12h single-shift post = 1 guard/post; 24h coverage = 2 guards/post */
  coverage: '12h' | '24h'
  posts: number
  includeGst: boolean
  includeEsi: boolean
}

// The rate sheet carries full precision and only rounds at display (e.g. net
// 12196.7959 → shown 12196.80). Rounding intermediates changes the grand total
// by a few paise, so we keep raw values here and round when formatting.

export function computeQuoteBreakdown(input: QuoteInput): QuoteBreakdown {
  const { rate, category, includeEsi } = input
  const isSupervisor = category === 'supervisor'
  const basic = isSupervisor ? rate.supervisorBasic : rate.guardBasic
  const conveyance = isSupervisor ? QUOTE_CONSTANTS.conveyanceSupervisor : QUOTE_CONSTANTS.conveyanceGuard

  const hra = basic * QUOTE_CONSTANTS.hraRate
  const gross = basic + hra + conveyance
  const pf = basic * QUOTE_CONSTANTS.pfRate
  const esi = includeEsi ? gross * QUOTE_CONSTANTS.esiRate : 0
  const bonus = basic * QUOTE_CONSTANTS.bonusRate
  const leave = basic * QUOTE_CONSTANTS.leaveRate
  const uniform = QUOTE_CONSTANTS.uniformCharge
  const net = gross + pf + esi + bonus + leave + uniform
  const relieving = net * QUOTE_CONSTANTS.relievingRate
  const subtotal = net + relieving
  const serviceCharge = subtotal * QUOTE_CONSTANTS.serviceChargeRate
  const grand = subtotal + serviceCharge
  const gst = input.includeGst ? grand * QUOTE_CONSTANTS.gstRate : 0
  const totalPerGuard = grand + gst

  const lines: QuoteLine[] = [
    { label: 'Minimum / Basic Wage', amount: basic },
    { label: 'HRA (50% of basic)', amount: hra },
    ...(conveyance ? [{ label: 'Conveyance', amount: conveyance }] : []),
    { label: 'Gross Total', amount: gross },
    { label: 'PF (13% of basic)', amount: pf },
    { label: 'ESI (3.25% of gross)', amount: esi },
    { label: 'Bonus (8.33% of basic)', amount: bonus },
    { label: 'Leave (8.33% of basic)', amount: leave },
    { label: 'Uniform charges', amount: uniform },
    { label: 'Net Total', amount: net },
    { label: 'Relieving charges (16.67%)', amount: relieving },
    { label: 'Sub Total', amount: subtotal },
    { label: 'Service charges (10%)', amount: serviceCharge },
    { label: 'Grand Total (per guard / month)', amount: grand, isTotal: true },
    ...(input.includeGst ? [{ label: 'GST (18%)', amount: gst }] : []),
  ]

  return { basic, conveyance, gross, pf, esi, bonus, leave, uniform, net, relieving, subtotal, serviceCharge, grand, gst, totalPerGuard, lines }
}

/** Number of guards billed for the selected coverage across all posts. */
export function guardsForCoverage(coverage: QuoteInput['coverage'], posts: number): number {
  return posts * (coverage === '24h' ? 2 : 1)
}

export function formatINR(n: number): string {
  return `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
}

export function buildQuoteMessage(input: QuoteInput, breakdown: QuoteBreakdown): string {
  const guards = guardsForCoverage(input.coverage, input.posts)
  const monthly = breakdown.totalPerGuard * guards
  const annual = monthly * 12
  const catLabel =
    input.category === 'supervisor' ? 'Security Supervisor' : input.category === 'lady-guard' ? 'Lady Security Guard' : 'Security Guard'
  const coverageLabel = input.coverage === '24h' ? '24-hour coverage (2 guards per post)' : '12-hour single shift (1 guard per post)'

  return [
    `*Security Quote Estimate — Silbar Security Services Pvt. Ltd.*`,
    '',
    `*State:* ${input.rate.name}`,
    `*Category:* ${catLabel}`,
    `*Coverage:* ${coverageLabel}`,
    `*Posts:* ${input.posts}`,
    `*Guards billed:* ${guards}`,
    `*Rate per guard (incl. statutory + service charge):* ${formatINR(breakdown.totalPerGuard)}/month${input.includeGst ? ' + GST' : ''}`,
    `*Estimated total:* ${formatINR(monthly)}/month · ${formatINR(annual)}/year`,
    '',
    'This is an indicative estimate based on current minimum wages. Please confirm your exact requirement for a final written quotation.',
    '',
    '_Sent from silbarsecurity.in_',
  ].join('\n')
}
