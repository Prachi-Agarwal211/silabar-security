/**
 * Admin quote engine — replicates the client's rate-sheet formula exactly
 * (verified against `Rajasthan (1) (1).xlsx`, 12-hour shift basis):
 *
 *   gross    = basic + HRA(50%) + conveyance
 *   PF       = 13%   of basic
 *   ESI      = 3.25% of gross
 *   Bonus    = 8.33% of basic
 *   Leave    = 8.33% of basic
 *   Uniform  = ₹250 fixed
 *   net      = gross + PF + ESI + Bonus + Leave + Uniform
 *   relieving= 16.67% of net
 *   subtotal = net + relieving
 *   service  = 10% of subtotal
 *   grand    = subtotal + service
 *   commission = commissionPct% of grand   ← admin-entered (typically 10–20%)
 *   GST      = 18% on (grand + commission), optional
 *
 * The admin enters the state minimum wage manually (daily wage × 26 days or a
 * direct monthly basic), so this engine takes raw inputs instead of a rate table.
 */

export const QUOTE_DEFAULTS = {
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
  defaultCommissionPct: 15,
  defaultDays: 26,
  defaultHours: 8,
} as const

export type QuoteCategory = 'guard' | 'supervisor'

export interface QuoteLine {
  label: string
  amount: number
  isTotal?: boolean
  isCommission?: boolean
}

export interface AdminQuoteInput {
  stateName: string
  category: QuoteCategory
  /** Monthly basic wage (INR) after day math — pass dailyWage*days or direct monthly */
  monthlyBasic: number
  conveyance: number
  /** Commission / partner share on top of the grand total (0.10 = 10%) */
  commissionPct: number
  includeGst: boolean
  /** Billing details for the PDF */
  clientName?: string
  siteName?: string
  city?: string
  posts?: number
  coverage?: '12h' | '24h'
  daysPerMonth?: number
  hoursPerShift?: number
}

export interface QuoteBreakdown {
  basic: number
  hra: number
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
  commission: number
  billedTotal: number
  gst: number
  totalPerGuard: number
  lines: QuoteLine[]
}

const round2 = (n: number) => Math.round(n * 100) / 100

export function computeAdminQuote(input: AdminQuoteInput): QuoteBreakdown {
  const c = QUOTE_DEFAULTS
  const { monthlyBasic: basic, conveyance } = input

  const hra = basic * c.hraRate
  const gross = basic + hra + conveyance
  const pf = basic * c.pfRate
  const esi = gross * c.esiRate
  const bonus = basic * c.bonusRate
  const leave = basic * c.leaveRate
  const uniform = c.uniformCharge
  const net = gross + pf + esi + bonus + leave + uniform
  const relieving = net * c.relievingRate
  const subtotal = net + relieving
  const serviceCharge = subtotal * c.serviceChargeRate
  const grand = subtotal + serviceCharge
  const commission = grand * input.commissionPct
  const billedTotal = grand + commission
  const gst = input.includeGst ? billedTotal * c.gstRate : 0
  const totalPerGuard = billedTotal + gst

  const lines: QuoteLine[] = [
    { label: 'Minimum / Basic Wage', amount: round2(basic) },
    { label: `HRA (${(c.hraRate * 100).toFixed(0)}% of basic)`, amount: round2(hra) },
    ...(conveyance ? [{ label: 'Conveyance', amount: round2(conveyance) }] : []),
    { label: 'Gross Total', amount: round2(gross) },
    { label: `PF (${(c.pfRate * 100).toFixed(0)}% of basic)`, amount: round2(pf) },
    { label: `ESI (${(c.esiRate * 100).toFixed(2)}% of gross)`, amount: round2(esi) },
    { label: `Bonus (${(c.bonusRate * 100).toFixed(2)}% of basic)`, amount: round2(bonus) },
    { label: `Leave (${(c.leaveRate * 100).toFixed(2)}% of basic)`, amount: round2(leave) },
    { label: 'Uniform charges', amount: round2(uniform) },
    { label: 'Net Total', amount: round2(net) },
    { label: `Relieving charges (${(c.relievingRate * 100).toFixed(2)}%)`, amount: round2(relieving) },
    { label: 'Sub Total', amount: round2(subtotal) },
    { label: `Service charges (${(c.serviceChargeRate * 100).toFixed(0)}%)`, amount: round2(serviceCharge) },
    { label: 'Grand Total (per guard / month)', amount: round2(grand), isTotal: true },
    { label: `Commission / Partner share (${(input.commissionPct * 100).toFixed(0)}%)`, amount: round2(commission), isCommission: true },
    ...(input.includeGst ? [{ label: `GST (${(c.gstRate * 100).toFixed(0)}%)`, amount: round2(gst) }] : []),
  ]

  return {
    basic: round2(basic),
    hra: round2(hra),
    conveyance: round2(conveyance),
    gross: round2(gross),
    pf: round2(pf),
    esi: round2(esi),
    bonus: round2(bonus),
    leave: round2(leave),
    uniform: round2(uniform),
    net: round2(net),
    relieving: round2(relieving),
    subtotal: round2(subtotal),
    serviceCharge: round2(serviceCharge),
    grand: round2(grand),
    commission: round2(commission),
    billedTotal: round2(billedTotal),
    gst: round2(gst),
    totalPerGuard: round2(totalPerGuard),
    lines,
  }
}

/** Number of guards billed for the selected coverage across all posts. */
export function guardsForCoverage(coverage: '12h' | '24h', posts: number): number {
  return Math.max(1, posts) * (coverage === '24h' ? 2 : 1)
}

export function formatINR(n: number): string {
  return `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
}
