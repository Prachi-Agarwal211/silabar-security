/**
 * Admin quote engine — replicates the client's rate-sheet formula exactly
 * (verified against `Rajasthan (1) (1).xlsx`, 12-hour shift basis):
 *
 *   gross    = basic + HRA(50%) + conveyance
 *   PF       = 13%   of basic
 *   ESI      = 3.25% of gross
 *   Bonus    = 8.33% of basic
 *   Leave    = 8.33% of basic
 *   Gratuity = 4.81% of basic
 *   Uniform  = ₹500 fixed
 *   net      = gross + PF + ESI + Bonus + Leave + Gratuity + Uniform
 *   relieving= 16.67% of net
 *   subtotal = net + relieving
 *   service  = serviceChargePct% of subtotal
 *   allowance= rentAllowancePct% of subtotal
 *   billed   = subtotal + allowance + service
 *   GST      = 18% on billed, optional
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
  gratuityRate: 0.0481,
  uniformCharge: 500,
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
  /** Rent allowance % on grand total (0.10 = 10%) */
  rentAllowancePct: number
  /** Service charge % on grand total (0.10 = 10%) */
  serviceChargePct: number
  includeGst: boolean
  /** Billing details for the PDF */
  clientName?: string
  siteName?: string
  city?: string
  guards?: number
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
  gratuity: number
  uniform: number
  net: number
  relieving: number
  subtotal: number
  grand: number
  rentAllowance: number
  serviceCharge: number
  billedTotal: number
  gst: number
  totalPerGuard: number
  lines: QuoteLine[]
}

// ponytail: Excel rounds each line to whole numbers (Math.round), not 2 decimals.
const round2 = (n: number) => Math.round(n)

export function computeAdminQuote(input: AdminQuoteInput): QuoteBreakdown {
  const c = QUOTE_DEFAULTS
  const { monthlyBasic: basic, conveyance } = input

  const hra = basic * c.hraRate
  const gross = basic + hra + conveyance
  const pf = basic * c.pfRate
  const esi = gross * c.esiRate
  const bonus = basic * c.bonusRate
  const leave = basic * c.leaveRate
  const gratuity = basic * c.gratuityRate
  const uniform = c.uniformCharge
  const net = gross + pf + esi + bonus + leave + gratuity + uniform
  const relieving = net * c.relievingRate
  const subtotal = net + relieving
  const grand = subtotal
  const rentAllowance = grand * input.rentAllowancePct
  const serviceCharge = grand * input.serviceChargePct
  const billedTotal = grand + rentAllowance + serviceCharge
  const gst = input.includeGst ? billedTotal * c.gstRate : 0
  const totalPerGuard = billedTotal + gst

  const lines: QuoteLine[] = [
    { label: 'Basic Monthly Wage', amount: round2(basic) },
    { label: 'House Rent Allowance (HRA)', amount: round2(hra) },
    ...(conveyance ? [{ label: 'Conveyance', amount: round2(conveyance) }] : []),
    { label: 'Gross Monthly Wages', amount: round2(gross) },
    { label: 'Employer Provident Fund Contribution', amount: round2(pf) },
    { label: 'Employer ESI Contribution', amount: round2(esi) },
    { label: 'Statutory Bonus Provision', amount: round2(bonus) },
    { label: 'Leave Wages Provision', amount: round2(leave) },
    { label: 'Gratuity Provision', amount: round2(gratuity) },
    { label: 'Uniform, ID Card & Safety Equipment', amount: round2(uniform) },
    { label: 'Statutory Employment Cost', amount: round2(net) },
    { label: 'Reliever / Weekly Off Provision', amount: round2(relieving) },
    { label: 'Total Manpower Cost', amount: round2(subtotal) },
    { label: 'Total Service Value (Before GST)', amount: round2(grand), isTotal: true },
    { label: `Allowance (${(input.rentAllowancePct * 100).toFixed(0)}%)`, amount: round2(rentAllowance), isCommission: true },
    { label: `Management & Administrative Charges (${(input.serviceChargePct * 100).toFixed(0)}%)`, amount: round2(serviceCharge), isCommission: true },
    ...(input.includeGst ? [{ label: 'GST @18% (Applicable)', amount: round2(gst) }] : []),
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
    gratuity: round2(gratuity),
    uniform: round2(uniform),
    net: round2(net),
    relieving: round2(relieving),
    subtotal: round2(subtotal),
    grand: round2(grand),
    rentAllowance: round2(rentAllowance),
    serviceCharge: round2(serviceCharge),
    billedTotal: round2(billedTotal),
    gst: round2(gst),
    totalPerGuard: round2(totalPerGuard),
    lines,
  }
}

export function formatINR(n: number): string {
  return `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
}
