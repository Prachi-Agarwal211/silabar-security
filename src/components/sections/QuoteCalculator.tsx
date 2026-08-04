'use client'

import { useMemo, useState } from 'react'
import { Calculator, ShieldCheck, MapPin, CheckCircle2, Info } from 'lucide-react'
import { QUOTE_RATES, QuoteCategory } from '@/data/quote-rates'
import {
  computeQuoteBreakdown,
  formatINR,
  buildQuoteMessage,
  guardsForCoverage,
  QUOTE_CONSTANTS,
} from '@/lib/quote'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { CONTACT } from '@/lib/config'

const CATEGORIES: { value: QuoteCategory; label: string }[] = [
  { value: 'guard', label: 'Security Guard' },
  { value: 'lady-guard', label: 'Lady Security Guard' },
  { value: 'supervisor', label: 'Security Supervisor' },
]

const COVERAGE_OPTIONS = [
  { value: '12h', label: '12-hour single shift', sub: '1 guard per post' },
  { value: '24h', label: '24-hour coverage', sub: '2 guards per post (day + night)' },
] as const

const fmt2 = (n: number) =>
  n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

interface QuoteCalculatorProps {
  /** Pre-select a state/UT (slug). Defaults to Rajasthan when omitted. */
  defaultState?: string
  /** Show a compact single-column layout (used on state pages). */
  compact?: boolean
}

export default function QuoteCalculator({ defaultState = 'rajasthan', compact = false }: QuoteCalculatorProps) {
  const [stateSlug, setStateSlug] = useState(defaultState)
  const [category, setCategory] = useState<QuoteCategory>('guard')
  const [coverage, setCoverage] = useState<'12h' | '24h'>('12h')
  const [posts, setPosts] = useState(1)
  const [includeGst, setIncludeGst] = useState(true)
  const [includeEsi, setIncludeEsi] = useState(true)

  const rate = QUOTE_RATES.find((r) => r.slug === stateSlug) ?? QUOTE_RATES[0]!

  const breakdown = useMemo(
    () => computeQuoteBreakdown({ rate, category, coverage, posts, includeGst, includeEsi }),
    [rate, category, coverage, posts, includeGst, includeEsi]
  )

  const guards = guardsForCoverage(coverage, posts)
  const monthlyTotal = breakdown.totalPerGuard * guards
  const annualTotal = monthlyTotal * 12
  const categoryLabel = CATEGORIES.find((c) => c.value === category)!.label

  const whatsappUrl = buildWhatsAppUrl(
    buildQuoteMessage({ rate, category, coverage, posts, includeGst, includeEsi }, breakdown)
  )

  return (
    <div className={`quote-calculator${compact ? ' quote-calculator--compact' : ''}`} id="quote-calculator">
      <div className="quote-calculator__layout">
        {/* ── Inputs ── */}
        <div className="quote-calculator__panel">
          <div className="quote-calculator__panel-title">
            <Calculator size={20} aria-hidden="true" />
            <h2>Estimate Your Guard Cost</h2>
          </div>

          <div className="quote-calc-field">
            <label htmlFor="qc-state">State / UT</label>
            <div className="quote-calc-select-wrap">
              <MapPin size={15} aria-hidden="true" />
              <select
                id="qc-state"
                value={stateSlug}
                onChange={(e) => setStateSlug(e.target.value)}
              >
                {QUOTE_RATES.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
            {!rate.verified && (
              <p className="quote-calc-hint">
                <Info size={13} aria-hidden="true" />
                Indicative rate (VDA-linked minimum wages) — final quote confirmed by our team.
              </p>
            )}
          </div>

          <div className="quote-calc-field">
            <span className="quote-calc-label">Category</span>
            <div className="quote-calc-segmented" role="radiogroup" aria-label="Guard category">
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  role="radio"
                  aria-checked={category === c.value}
                  className={`quote-calc-segment${category === c.value ? ' is-active' : ''}`}
                  onClick={() => setCategory(c.value)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="quote-calc-field">
            <span className="quote-calc-label">Post coverage</span>
            <div className="quote-calc-segmented" role="radiogroup" aria-label="Post coverage">
              {COVERAGE_OPTIONS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  role="radio"
                  aria-checked={coverage === c.value}
                  className={`quote-calc-segment quote-calc-segment--stack${coverage === c.value ? ' is-active' : ''}`}
                  onClick={() => setCoverage(c.value)}
                >
                  {c.label}
                  <small>{c.sub}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="quote-calc-field">
            <label htmlFor="qc-posts">Number of posts</label>
            <input
              id="qc-posts"
              type="number"
              min={1}
              max={500}
              value={posts}
              onChange={(e) => setPosts(Math.max(1, Math.min(500, Number(e.target.value) || 1)))}
            />
            <p className="quote-calc-hint">Guards billed: {guards} ({coverage === '24h' ? '2 per post' : '1 per post'})</p>
          </div>

          <div className="quote-calc-toggles">
            <label className="quote-calc-toggle">
              <input type="checkbox" checked={includeGst} onChange={(e) => setIncludeGst(e.target.checked)} />
              <span>
                <strong>Include GST (18%)</strong>
                <small>Charged extra on total billing as applicable</small>
              </span>
            </label>
            <label className="quote-calc-toggle">
              <input type="checkbox" checked={includeEsi} onChange={(e) => setIncludeEsi(e.target.checked)} />
              <span>
                <strong>Include ESI (3.25%)</strong>
                <small>Applies where ESI coverage is applicable</small>
              </span>
            </label>
          </div>
        </div>

        {/* ── Result ── */}
        <div className="quote-calculator__result">
          <div className="quote-result-header">
            <span className="quote-result-eyebrow">{rate.name} · {categoryLabel}</span>
            <strong className="quote-result-per-guard">
              {formatINR(breakdown.totalPerGuard)}
              <small>/guard/month</small>
            </strong>
          </div>

          <table className="quote-breakdown">
            <tbody>
              {breakdown.lines.map((line, i) => {
                return (
                  <tr key={i} className={line.isTotal ? 'is-total' : ''}>
                    <td>{line.label}</td>
                    <td>₹{fmt2(line.amount)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <div className="quote-result-summary">
            <div>
              <span>Monthly estimate ({guards} guard{guards > 1 ? 's' : ''})</span>
              <strong>{formatINR(monthlyTotal)}</strong>
            </div>
            <div>
              <span>Annual estimate</span>
              <strong>{formatINR(annualTotal)}</strong>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="quote-result-cta"
          >
            Send this estimate on WhatsApp
          </a>

          <p className="quote-result-disclaimer">
            <ShieldCheck size={14} aria-hidden="true" />
            Estimate includes wages, statutory compliances (PF {QUOTE_CONSTANTS.pfRate * 100}%, ESI{' '}
            {(QUOTE_CONSTANTS.esiRate * 100).toFixed(2)}%), bonus, leave, uniform, relieving and
            service charges. Rates are minimum-wage linked (revised periodically) and GST{' '}
            {includeGst ? 'is' : 'is not'} included above. Final quotation is confirmed by our team
            after site scoping.
          </p>
        </div>
      </div>

      <div className="quote-calculator__help">
        <CheckCircle2 size={16} aria-hidden="true" />
        Need a tailored proposal? Call{' '}
        <a href={`tel:${CONTACT.phoneRaw}`}>{CONTACT.phone}</a> or use the form below — our
        consultants respond within 2 business hours.
      </div>
    </div>
  )
}
