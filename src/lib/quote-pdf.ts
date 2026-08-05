import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import {
  computeAdminQuote,
  type AdminQuoteInput,
  type QuoteBreakdown,
} from '@/lib/quote-engine'

/**
 * Single-page branded quotation PDF for Silbar Security Services.
 * Clean, compact, professional layout with zero text overlaps.
 */

const C = {
  cherry: [140, 31, 50] as [number, number, number],
  cherryDeep: [92, 18, 32] as [number, number, number],
  midnight: [11, 14, 20] as [number, number, number],
  gold: [191, 149, 63] as [number, number, number],
  goldLight: [212, 175, 55] as [number, number, number],
  goldPale: [245, 240, 220] as [number, number, number],
  cream: [250, 246, 236] as [number, number, number],
  paper: [250, 248, 244] as [number, number, number],
  ink: [45, 45, 45] as [number, number, number],
  muted: [100, 100, 100] as [number, number, number],
  line: [224, 218, 205] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
}

const CO = {
  name: 'Silbar Security Services Pvt. Ltd.',
  tagline: 'Building Trust Through Professional Security & Compliance',
  regOffice: 'Registered Office: 5th Floor, Statesman House, Plot No. 148, Barakhamba Road, Connaught Place, New Delhi – 110001',
  phone: '+91-99821-70555',
  email: 'info@silbarsecurity.in',
  web: 'www.silbarsecurity.in',
}

function formatINR_PDF(n: number): string {
  return `Rs. ${Math.round(n).toLocaleString('en-IN')}`
}

function lastY(doc: jsPDF): number {
  const t = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable
  return t ? t.finalY : 0
}

async function loadImg(src: string): Promise<string | null> {
  try {
    const res = await fetch(src)
    if (!res.ok) return null
    const blob = await res.blob()
    return await new Promise<string>((ok, fail) => {
      const r = new FileReader()
      r.onload = () => ok(String(r.result))
      r.onerror = fail
      r.readAsDataURL(blob)
    })
  } catch { return null }
}

function goldCorners(doc: jsPDF, x: number, y: number, w: number, h: number, s = 4) {
  doc.setDrawColor(...C.gold)
  doc.setLineWidth(0.35)
  doc.line(x, y + s, x, y); doc.line(x, y, x + s, y)
  doc.line(x + w - s, y + h, x + w, y + h); doc.line(x + w, y + h - s, x + w, y + h)
}

interface PdfMeta {
  input: AdminQuoteInput
  breakdown: QuoteBreakdown
  quoteNumber: string
  issuedDate: string
}

export async function generateQuotePdf(meta: PdfMeta): Promise<jsPDF> {
  const { input, breakdown, quoteNumber, issuedDate } = meta
  const guards = Math.max(1, input.guards ?? 1)
  const monthly = breakdown.totalPerGuard * guards
  const annual = monthly * 12

  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const W = doc.internal.pageSize.getWidth()
  const H = doc.internal.pageSize.getHeight()
  const m = 14 // side margin

  // ── HEADER — midnight band 26mm ──
  doc.setFillColor(...C.midnight)
  doc.rect(0, 0, W, 26, 'F')
  doc.setFillColor(...C.cherry)
  doc.rect(0, 26, W, 0.8, 'F')
  doc.setFillColor(...C.gold)
  doc.rect(0, 26.8, W, 0.3, 'F')

  const logo = await loadImg('/logo.png')
  if (logo) { try { doc.addImage(logo, 'PNG', m, 4, 18, 18) } catch { /* */ } }

  const lx = m + (logo ? 21 : 0)
  doc.setTextColor(...C.cream)
  doc.setFont('helvetica', 'bold'); doc.setFontSize(13)
  doc.text('SILBAR SECURITY', lx, 10)
  doc.setFont('helvetica', 'normal'); doc.setFontSize(7.5)
  doc.setTextColor(...C.goldLight)
  doc.text('SERVICES PVT. LTD.', lx, 15)
  doc.setFontSize(6.5); doc.setTextColor(...C.muted)
  doc.text(CO.tagline, lx, 20)

  doc.setFont('helvetica', 'bold'); doc.setFontSize(11)
  doc.setTextColor(...C.cream)
  doc.text('QUOTATION', W - m, 9, { align: 'right' })
  doc.setFont('helvetica', 'normal'); doc.setFontSize(7)
  doc.setTextColor(...C.goldLight)
  doc.text(quoteNumber, W - m, 14, { align: 'right' })
  doc.text(`Date: ${issuedDate}`, W - m, 18.5, { align: 'right' })
  doc.text('Valid for 30 days', W - m, 23, { align: 'right' })

  // ── TITLE ──
  let y = 33
  doc.setFont('helvetica', 'bold'); doc.setFontSize(11)
  doc.setTextColor(...C.cherry)
  doc.text(`Security Manpower Quotation — ${input.stateName}`, m, y)
  doc.setDrawColor(...C.gold); doc.setLineWidth(0.25)
  doc.line(m, y + 2, m + 65, y + 2)
  y += 6

  // ── CLIENT BOX — brand-card with gold corners ──
  const boxW = W - m * 2, boxH = 20
  doc.setFillColor(...C.paper)
  doc.roundedRect(m, y, boxW, boxH, 1.2, 1.2, 'F')
  doc.setDrawColor(...C.line); doc.setLineWidth(0.25)
  doc.roundedRect(m, y, boxW, boxH, 1.2, 1.2, 'S')
  goldCorners(doc, m, y, boxW, boxH)

  doc.setFont('helvetica', 'bold'); doc.setFontSize(7)
  doc.setTextColor(...C.cherry)
  doc.text('QUOTATION TO', m + 5, y + 5)
  doc.setFont('helvetica', 'bold'); doc.setFontSize(9)
  doc.setTextColor(...C.midnight)
  doc.text(input.clientName || '—', m + 5, y + 10)
  doc.setFont('helvetica', 'normal'); doc.setFontSize(7.5); doc.setTextColor(...C.ink)
  doc.text(`${input.siteName || input.stateName}  |  ${input.city ? input.city + ', ' : ''}${input.stateName}`, m + 5, y + 15.5)

  const rx = W - m - 45
  doc.setFont('helvetica', 'normal'); doc.setFontSize(6.5); doc.setTextColor(...C.muted)
  doc.text('Quote No.', rx, y + 5); doc.text('Date', rx + 28, y + 5)
  doc.setFont('helvetica', 'bold'); doc.setFontSize(7); doc.setTextColor(...C.midnight)
  doc.text(quoteNumber, rx, y + 10)
  doc.text(issuedDate, rx + 28, y + 10)
  y += boxH + 5

  // ── PARAMETERS SUMMARY TABLE (Single unified autoTable call) ──
  const paramHeaders = ['Category', 'Guards', 'Basic Wage', 'Days/Month', 'Shift', 'Allowance', 'Admin Charges']
  const paramValues = [
    input.category === 'supervisor' ? 'Security Supervisor' : 'Security Guard / Lady Guard',
    String(guards),
    formatINR_PDF(input.monthlyBasic),
    String(input.daysPerMonth ?? 26),
    `${input.hoursPerShift ?? 8} hrs`,
    `${(input.rentAllowancePct * 100).toFixed(0)}%`,
    `${(input.serviceChargePct * 100).toFixed(0)}%`,
  ]

  autoTable(doc, {
    startY: y,
    margin: { left: m, right: m },
    head: [paramHeaders],
    body: [paramValues],
    theme: 'plain',
    headStyles: { fontSize: 6.5, fontStyle: 'bold', textColor: C.muted, cellPadding: 1, font: 'helvetica' },
    bodyStyles: { fontSize: 8, fontStyle: 'bold', textColor: C.midnight, cellPadding: 1.5, font: 'helvetica' },
  })

  y = lastY(doc) + 2
  doc.setDrawColor(...C.gold); doc.setLineWidth(0.25)
  doc.line(m, y, W - m, y)
  y += 5

  // ── BREAKDOWN TABLE ──
  doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5)
  doc.setTextColor(...C.cherry)
  doc.text('Cost Breakdown (per guard / month)', m, y)
  y += 3

  const rows = breakdown.lines.map((l) => [l.label, formatINR_PDF(l.amount)])
  autoTable(doc, {
    startY: y, margin: { left: m, right: m },
    head: [['Particulars', 'Amount (INR)']],
    body: rows,
    theme: 'grid',
    headStyles: { fillColor: C.midnight, textColor: C.white, fontSize: 8, fontStyle: 'bold', halign: 'left', cellPadding: 1.2 },
    styles: { fontSize: 7.5, cellPadding: 1.2, textColor: C.ink, lineColor: C.line, lineWidth: 0.12, font: 'helvetica' },
    alternateRowStyles: { fillColor: [252, 250, 246] },
    columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 42, halign: 'right', fontStyle: 'bold' } },
    didParseCell: (data) => {
      const raw = data.cell.raw
      const label = Array.isArray(raw) ? String(raw[0] ?? '') : ''
      if (label.startsWith('Total Service Value')) {
        data.cell.styles.fontStyle = 'bold'; data.cell.styles.fillColor = C.cherry; data.cell.styles.textColor = C.white
      } else if (label.startsWith('Allowance') || label.startsWith('Management')) {
        data.cell.styles.fontStyle = 'bold'; data.cell.styles.fillColor = C.goldPale; data.cell.styles.textColor = C.cherryDeep
      } else if (label.startsWith('GST')) {
        data.cell.styles.fontStyle = 'bold'; data.cell.styles.textColor = C.cherry
      }
    },
  })
  y = lastY(doc) + 4

  // ── TOTALS BOX — right-aligned ──
  const totals = [
    ['Monthly Billing Per Security Guard', formatINR_PDF(breakdown.totalPerGuard)],
    [`Total Monthly Contract Value (${guards} guards)`, formatINR_PDF(monthly)],
    ['Estimated Annual Contract Value', formatINR_PDF(annual)],
  ]
  const tw = 88, tx = W - m - tw
  autoTable(doc, {
    startY: y, margin: { left: tx, right: m },
    head: [[{ content: 'ESTIMATED CONTRACT VALUE', colSpan: 2, styles: { halign: 'center' } }]],
    body: totals,
    theme: 'grid',
    headStyles: { fillColor: C.cherry, textColor: C.white, fontSize: 8, fontStyle: 'bold', cellPadding: 1.5 },
    styles: { fontSize: 7.5, cellPadding: 1.5, textColor: C.ink, lineColor: C.line, lineWidth: 0.12, font: 'helvetica' },
    columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 40, halign: 'right', fontStyle: 'bold', textColor: C.cherry } },
    didParseCell: (data) => {
      if (data.section === 'body' && data.row.index === 0) {
        data.cell.styles.fillColor = [252, 248, 240]; data.cell.styles.fontStyle = 'bold'
      }
    },
  })
  y = lastY(doc) + 5

  // ── NOTES — compact ──
  doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5)
  doc.setTextColor(...C.midnight)
  doc.text('Notes & Terms', m, y)
  doc.setDrawColor(...C.gold); doc.setLineWidth(0.2)
  doc.line(m + 18, y, m + 28, y)
  y += 3.5

  doc.setFont('helvetica', 'normal'); doc.setFontSize(6.2); doc.setTextColor(...C.muted)
  const notes = [
    '1) GST shall be levied as per applicable Government regulations.',
    '2) Rates are based on prevailing statutory Minimum Wages and are subject to revision in accordance with Government notifications.',
    '3) Statutory liabilities including PF, ESI, Bonus, Leave Wages and Gratuity (where applicable) are considered as per applicable labour laws.',
    '4) This quotation is valid for 30 days from the date of issue and is subject to final agreement and deployment requirements.',
    '5) Any revision in statutory wages, taxes or labour law provisions shall be recoverable from the Client with effect from the applicable date.',
  ]
  for (const n of notes) {
    const lines = doc.splitTextToSize(n, W - m * 2)
    doc.text(lines, m, y)
    y += lines.length * 2.6 + 0.4
  }

  // ── PAYMENT TERMS ──
  y += 1.5
  doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5)
  doc.setTextColor(...C.midnight)
  doc.text('Payment Terms', m, y)
  doc.setDrawColor(...C.gold); doc.setLineWidth(0.2)
  doc.line(m + 20, y, m + 30, y)
  y += 3.5

  doc.setFont('helvetica', 'normal'); doc.setFontSize(6.2); doc.setTextColor(...C.muted)
  const paymentTerms = [
    '1) The Client shall ensure that the monthly invoice is paid before the end of each month, as employee salaries are processed on or before the last working day in compliance with applicable labour laws.',
    '2) In case of delayed payments, the Client shall be required to maintain one month\u2019s advance payment throughout the contract period.',
  ]
  for (const t of paymentTerms) {
    const lines = doc.splitTextToSize(t, W - m * 2)
    doc.text(lines, m, y)
    y += lines.length * 2.6 + 0.4
  }

  // ── SIGNATURE ──
  y += 3
  doc.setDrawColor(...C.line); doc.setLineWidth(0.25)
  doc.line(m, y, W - m, y)
  y += 4
  doc.setFont('helvetica', 'bold'); doc.setFontSize(7)
  doc.setTextColor(...C.midnight)
  doc.text('For Silbar Security Services Pvt. Ltd.', m, y)
  doc.setFont('helvetica', 'normal'); doc.setFontSize(6.5)
  doc.setTextColor(...C.muted)
  doc.text('Authorised Signatory', W - m, y, { align: 'right' })

  // ── FOOTER — every page ──
  const pages = doc.getNumberOfPages()
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i)
    doc.setDrawColor(...C.gold); doc.setLineWidth(0.2)
    doc.line(m, H - 12, W - m, H - 12)
    doc.setFont('helvetica', 'normal'); doc.setFontSize(6); doc.setTextColor(...C.muted)
    doc.text(`${CO.name}  ·  ${CO.phone}  ·  ${CO.email}  ·  ${CO.web}`, W / 2, H - 9, { align: 'center' })
    doc.setFontSize(5.5)
    doc.text(CO.regOffice, W / 2, H - 6, { align: 'center' })
    doc.setFont('helvetica', 'bold'); doc.setFontSize(6); doc.setTextColor(...C.cherry)
    doc.text(`${i} / ${pages}`, W - m, H - 9, { align: 'right' })
  }

  return doc
}

export function buildQuoteNumber(): string {
  const yy = new Date().getFullYear()
  const seq = String(Math.floor(1000 + Math.random() * 9000))
  return `SILBAR/QT/${yy}/${seq}`
}

export function todayISO(): string {
  return new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

export async function downloadQuotePdf(input: AdminQuoteInput, quoteNumber: string, issuedDate: string) {
  const breakdown = computeAdminQuote(input)
  const doc = await generateQuotePdf({ input, breakdown, quoteNumber, issuedDate })
  doc.save(`Silbar-Quotation-${input.stateName.replace(/\s+/g, '-')}-${quoteNumber.replace(/[\/]/g, '-')}.pdf`)
}
