'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Shield,
  Calculator,
  FileDown,
  RotateCcw,
  Building2,
  MapPin,
  Phone,
  CheckCircle2,
} from 'lucide-react'
import {
  computeAdminQuote,
  formatINR,
  QUOTE_DEFAULTS,
  type AdminQuoteInput,
  type QuoteCategory,
} from '@/lib/quote-engine'
import {
  buildQuoteNumber,
  downloadQuotePdf,
  todayISO,
} from '@/lib/quote-pdf'
import { STATES } from '@/data/locations'

export default function AdminQuoteCalculator() {
  // ── Manual inputs ──
  const [stateName, setStateName] = useState('Rajasthan')
  const [category, setCategory] = useState<QuoteCategory>('guard')
  const [wageMode, setWageMode] = useState<'daily' | 'monthly'>('daily')
  const [dailyWage, setDailyWage] = useState(249)
  const [monthlyBasic, setMonthlyBasic] = useState(6474)
  const [daysPerMonth, setDaysPerMonth] = useState<number>(QUOTE_DEFAULTS.defaultDays)
  const [hoursPerShift, setHoursPerShift] = useState<number>(QUOTE_DEFAULTS.defaultHours)
  const [rentAllowancePct, setRentAllowancePct] = useState(15)
  const [serviceChargePct, setServiceChargePct] = useState(10)
  const [includeGst, setIncludeGst] = useState(true)

  // Billing details for the PDF
  const [clientName, setClientName] = useState('')
  const [siteName, setSiteName] = useState('')
  const [city, setCity] = useState('')
  const [guards, setGuards] = useState(1)

  const [quoteNumber] = useState(() => buildQuoteNumber())
  const [issuedDate] = useState(() => todayISO())
  const [downloading, setDownloading] = useState(false)

  const input: AdminQuoteInput = useMemo(() => {
    const basic = wageMode === 'daily' ? Math.round(dailyWage * daysPerMonth) : monthlyBasic
    return {
      stateName,
      category,
      monthlyBasic: basic,
      conveyance: category === 'supervisor' ? QUOTE_DEFAULTS.conveyanceSupervisor : QUOTE_DEFAULTS.conveyanceGuard,
      rentAllowancePct: rentAllowancePct / 100,
      serviceChargePct: serviceChargePct / 100,
      includeGst,
      clientName,
      siteName,
      city,
      guards,
      daysPerMonth,
      hoursPerShift,
    }
  }, [stateName, category, wageMode, dailyWage, monthlyBasic, daysPerMonth, hoursPerShift, rentAllowancePct, serviceChargePct, includeGst, clientName, siteName, city, guards])

  const breakdown = useMemo(() => computeAdminQuote(input), [input])
  const guardsCount = Math.max(1, guards)
  const monthlyTotal = breakdown.totalPerGuard * guardsCount
  const annualTotal = monthlyTotal * 12

  const doDownload = async () => {
    setDownloading(true)
    try {
      await downloadQuotePdf(input, quoteNumber, issuedDate)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#f4f2ee',
        padding: '1.5rem',
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        {/* ── Toolbar ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: 'linear-gradient(135deg,#8C1F32,#5C1220)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Shield size={20} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0B0E14', margin: 0 }}>
                Silbar Quote Tool
              </h1>
              <p style={{ fontSize: '0.78rem', color: '#8a8a8a', margin: 0 }}>
                Internal quotation generator
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <Link href="/" style={{ ...btnGhost }}>← Site home</Link>
            <button
              onClick={doDownload}
              disabled={downloading}
              style={{ ...btnPrimary, display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
            >
              <FileDown size={16} /> {downloading ? 'Generating…' : 'Download PDF Quote'}
            </button>
          </div>
        </div>

        {/* ── Quote number / date strip ── */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '1.25rem',
            background: '#fff',
            borderRadius: 12,
            padding: '0.8rem 1.1rem',
            border: '1px solid #e6e1d6',
          }}
        >
          <Meta label="Quote No." value={quoteNumber} />
          <Meta label="Date" value={issuedDate} />
          <Meta label="Guards" value={String(guardsCount)} />
          <Meta label="Total / month" value={formatINR(monthlyTotal)} highlight />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {/* ── Inputs ── */}
          <section
            style={{
              background: '#fff',
              borderRadius: 14,
              padding: '1.4rem 1.5rem',
              border: '1px solid #e6e1d6',
            }}
          >
            <h2 style={{ ...cardTitle, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calculator size={18} /> Job Details
            </h2>

            <Field label="State / UT">
              <select value={stateName} onChange={(e) => setStateName(e.target.value)} style={inputStyle}>
                {STATES.map((s) => (
                  <option key={s.slug} value={s.name}>{s.name}</option>
                ))}
              </select>
            </Field>

            <Field label="Category">
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {(['guard', 'supervisor'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    style={{
                      flex: 1,
                      padding: '0.55rem 0.6rem',
                      borderRadius: 8,
                      border: `1px solid ${category === c ? '#8C1F32' : '#d8d2c6'}`,
                      background: category === c ? '#8C1F32' : '#fff',
                      color: category === c ? '#fff' : '#444',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                    }}
                  >
                    {c === 'guard' ? 'Guard / Lady Guard' : 'Supervisor'}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Wage entry mode">
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {(['daily', 'monthly'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setWageMode(m)}
                    style={{
                      flex: 1,
                      padding: '0.5rem 0.6rem',
                      borderRadius: 8,
                      border: `1px solid ${wageMode === m ? '#8C1F32' : '#d8d2c6'}`,
                      background: wageMode === m ? '#8C1F32' : '#fff',
                      color: wageMode === m ? '#fff' : '#444',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                    }}
                  >
                    {m === 'daily' ? 'Daily wage × days' : 'Monthly basic'}
                  </button>
                ))}
              </div>
            </Field>

            {wageMode === 'daily' ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <Field label="Daily wage (₹)">
                  <input
                    type="number"
                    value={dailyWage}
                    min={0}
                    onChange={(e) => setDailyWage(Math.max(0, Number(e.target.value) || 0))}
                    style={inputStyle}
                  />
                </Field>
                <Field label="Days / month">
                  <input
                    type="number"
                    value={daysPerMonth}
                    min={1}
                    max={31}
                    onChange={(e) => setDaysPerMonth(Math.max(1, Math.min(31, Number(e.target.value) || 26)))}
                    style={inputStyle}
                  />
                </Field>
              </div>
            ) : (
              <Field label="Monthly basic wage (₹)">
                <input
                  type="number"
                  value={monthlyBasic}
                  min={0}
                  onChange={(e) => setMonthlyBasic(Math.max(0, Number(e.target.value) || 0))}
                  style={inputStyle}
                />
              </Field>
            )}

            <Field label="Shift hours / day">
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[8, 12].map((h) => (
                  <button
                    key={h}
                    onClick={() => setHoursPerShift(h)}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      borderRadius: 8,
                      border: `1px solid ${hoursPerShift === h ? '#8C1F32' : '#d8d2c6'}`,
                      background: hoursPerShift === h ? '#8C1F32' : '#fff',
                      color: hoursPerShift === h ? '#fff' : '#444',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                    }}
                  >
                    {h} hours
                  </button>
                ))}
              </div>
            </Field>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <Field label="Rent Allowance (%)">
                <input
                  type="number"
                  value={rentAllowancePct}
                  min={0}
                  max={100}
                  step={0.5}
                  onChange={(e) => setRentAllowancePct(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                  style={inputStyle}
                />
              </Field>
              <Field label="Service Charges (%)">
                <input
                  type="number"
                  value={serviceChargePct}
                  min={0}
                  max={100}
                  step={0.5}
                  onChange={(e) => setServiceChargePct(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                  style={inputStyle}
                />
              </Field>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <Field label="Number of guards">
                <input
                  type="number"
                  value={guards}
                  min={1}
                  max={500}
                  onChange={(e) => setGuards(Math.max(1, Math.min(500, Number(e.target.value) || 1)))}
                  style={inputStyle}
                />
              </Field>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.6rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={includeGst} onChange={(e) => setIncludeGst(e.target.checked)} style={{ width: 16, height: 16 }} />
              <span style={{ fontSize: '0.85rem', color: '#333', fontWeight: 600 }}>Include GST (18%) on billing</span>
            </label>
          </section>

          {/* ── Billing details ── */}
          <section
            style={{
              background: '#fff',
              borderRadius: 14,
              padding: '1.4rem 1.5rem',
              border: '1px solid #e6e1d6',
            }}
          >
            <h2 style={{ ...cardTitle, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Building2 size={18} /> Client Details (for PDF)
            </h2>
            <Field label="Client / Company name">
              <input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="e.g. ABC Manufacturing Ltd." style={inputStyle} />
            </Field>
            <Field label="Site / Facility name">
              <input value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder="e.g. Plant 2 — Neemrana" style={inputStyle} />
            </Field>
            <Field label="City">
              <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Jaipur" style={inputStyle} />
            </Field>

            <div
              style={{
                marginTop: '1rem',
                background: '#faf7f2',
                borderRadius: 10,
                border: '1px solid #efe8db',
                padding: '0.9rem 1rem',
                fontSize: '0.8rem',
                color: '#666',
                lineHeight: 1.6,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem', color: '#0B0E14', fontWeight: 700 }}>
                <CheckCircle2 size={14} /> How the PDF is built
              </div>
              Excel rate-sheet formula: basic → HRA 50% → gross → PF 13% · ESI 3.25% · Bonus · Leave · Uniform ₹250 → Net → Relieving 16.67% → Service 10% → Grand → +Commission → +GST. Rounded per line like the client&apos;s sheet.
            </div>
            <button
              onClick={doDownload}
              disabled={downloading}
              style={{ ...btnPrimary, width: '100%', marginTop: '1rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              <FileDown size={16} /> {downloading ? 'Generating PDF…' : `Download PDF — ${formatINR(monthlyTotal)}/mo`}
            </button>
          </section>
        </div>

        {/* ── Live breakdown ── */}
        <section
          style={{
            marginTop: '1.25rem',
            background: '#fff',
            borderRadius: 14,
            border: '1px solid #e6e1d6',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg,#0B0E14,#1a1014)',
              padding: '1rem 1.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <h2 style={{ color: '#fff', fontSize: '1rem', fontWeight: 800, margin: 0 }}>
              {stateName} · {category === 'supervisor' ? 'Security Supervisor' : 'Security Guard / Lady Guard'}
            </h2>
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Per guard / mo</div>
                <div style={{ color: '#E6C35A', fontWeight: 800, fontSize: '1.3rem' }}>{formatINR(breakdown.totalPerGuard)}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{guardsCount} guards / mo</div>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.3rem' }}>{formatINR(monthlyTotal)}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Annual</div>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.3rem' }}>{formatINR(annualTotal)}</div>
              </div>
            </div>
          </div>
          <div style={{ padding: '0.75rem 1.4rem 1.2rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <tbody>
                {breakdown.lines.map((l, i) => (
                  <tr key={i}>
                    <td
                      style={{
                        padding: '0.42rem 0',
                        borderBottom: '1px solid #f0ece3',
                        color: l.isTotal ? '#8C1F32' : l.isCommission ? '#5C1220' : '#444',
                        fontWeight: l.isTotal || l.isCommission ? 700 : 400,
                      }}
                    >
                      {l.label}
                    </td>
                    <td
                      style={{
                        padding: '0.42rem 0',
                        borderBottom: '1px solid #f0ece3',
                        textAlign: 'right',
                        fontVariantNumeric: 'tabular-nums',
                        color: l.isTotal ? '#8C1F32' : l.isCommission ? '#5C1220' : '#222',
                        fontWeight: l.isTotal || l.isCommission ? 700 : 500,
                      }}
                    >
                      {formatINR(l.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Contact strip ── */}
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            alignItems: 'center',
            background: '#fff',
            border: '1px solid #e6e1d6',
            borderRadius: 12,
            padding: '0.8rem 1.2rem',
            fontSize: '0.8rem',
            color: '#666',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <Phone size={13} /> +91-99821-70555
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <MapPin size={13} /> Statesman House, Barakhamba Road, New Delhi – 110001
          </span>
          <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <RotateCcw size={13} /> Refresh for a new quote number
          </span>
        </div>
      </div>
    </main>
  )
}

/* ── tiny helper components ── */

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.62rem 0.75rem',
  borderRadius: 8,
  border: '1px solid #d8d2c6',
  fontSize: '0.9rem',
  background: '#fff',
  color: '#1a1a1a',
  outline: 'none',
  boxSizing: 'border-box',
}

const cardTitle: React.CSSProperties = {
  fontSize: '0.95rem',
  fontWeight: 800,
  color: '#0B0E14',
  margin: '0 0 1rem',
}

const btnPrimary: React.CSSProperties = {
  background: 'linear-gradient(135deg,#8C1F32,#a3243c)',
  color: '#fff',
  border: 'none',
  borderRadius: 9,
  padding: '0.62rem 1.1rem',
  fontWeight: 700,
  fontSize: '0.88rem',
  cursor: 'pointer',
  boxShadow: '0 6px 18px rgba(140,31,50,0.25)',
}

const btnGhost: React.CSSProperties = {
  background: 'transparent',
  color: '#8C1F32',
  border: '1px solid #d8c9bd',
  borderRadius: 9,
  padding: '0.5rem 0.9rem',
  fontWeight: 600,
  fontSize: '0.82rem',
  cursor: 'pointer',
  textDecoration: 'none',
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '0.85rem' }}>
      <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#6b6b6b', marginBottom: '0.3rem', letterSpacing: '0.02em' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

function Meta({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#999' }}>{label}</div>
      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: highlight ? '#8C1F32' : '#0B0E14' }}>{value}</div>
    </div>
  )
}
