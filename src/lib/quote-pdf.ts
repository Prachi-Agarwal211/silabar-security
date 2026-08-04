import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import {
  computeAdminQuote,
  formatINR,
  guardsForCoverage,
  type AdminQuoteInput,
  type QuoteBreakdown,
} from '@/lib/quote-engine'

/**
 * Branded quotation PDF — Silbar Security Services Pvt. Ltd.
 * Logo, header band, cost-breakdown table, totals, notes and footer.
 * Runs fully client-side (jsPDF + jspdf-autotable).
 */

const BRAND = {
  cherry: [140, 31, 50] as [number, number, number],
  cherryDeep: [92, 18, 32] as [number, number, number],
  midnight: [11, 14, 20] as [number, number, number],
  goldLight: [230, 195, 90] as [number, number, number],
  cream: [250, 248, 244] as [number, number, number],
  ink: [45, 45, 45] as [number, number, number],
  muted: [110, 110, 110] as [number, number, number],
  line: [224, 218, 205] as [number, number, number],
}

const COMPANY = {
  name: 'Silbar Security Services Pvt. Ltd.',
  regOffice: 'Registered Office: 5th Floor, Statesman House, Plot No. 148, Barakhamba Road, Connaught Place, New Delhi – 110001',
  phone: '+91-99821-70555',
  email: 'info@silbarsecurity.in',
  website: 'www.silbarsecurity.in',
}

function hex(rgb: [number, number, number]): [number, number, number] {
  return rgb
}

/** Final Y position of the last autoTable, with a safe fallback. */
function lastTableY(doc: jsPDF): number {
  const t = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable
  return t ? t.finalY : 0
}

/** Load a local public image and return it as a data URL (for jsPDF embedding). */
async function loadImageAsDataUrl(src: string): Promise<string | null> {
  try {
    const res = await fetch(src)
    if (!res.ok) return null
    const blob = await res.blob()
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

interface PdfMeta {
  input: AdminQuoteInput
  breakdown: QuoteBreakdown
  quoteNumber: string
  issuedDate: string
}

export async function generateQuotePdf(meta: PdfMeta): Promise<jsPDF> {
  const { input, breakdown, quoteNumber, issuedDate } = meta
  const guards = guardsForCoverage(input.coverage ?? '12h', input.posts ?? 1)
  const monthlyTotal = breakdown.totalPerGuard * guards
  const annualTotal = monthlyTotal * 12

  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const margin = 14

  // ── Brand header band ──
  doc.setFillColor(...BRAND.midnight)
  doc.rect(0, 0, pageW, 30, 'F')
  doc.setFillColor(...BRAND.cherry)
  doc.rect(0, 30, pageW, 1.2, 'F')

  // Logo (square) on the left of the band
  const logoData = await loadImageAsDataUrl('/logo.png')
  if (logoData) {
    try {
      doc.addImage(logoData, 'PNG', margin, 5, 20, 20)
    } catch {
      // fall through to text-only header if logo can't be embedded
    }
  }
  // Brand title + tagline (shift right of the logo)
  doc.setTextColor(...BRAND.cream)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.text('SILBAR SECURITY', margin + 23, 12)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.setTextColor(...BRAND.goldLight)
  doc.text('SERVICES PVT. LTD.', margin + 23, 18)

  // Quote number + date on the right
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(...BRAND.cream)
  doc.text('QUOTATION', pageW - margin, 10, { align: 'right' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...BRAND.goldLight)
  doc.text(quoteNumber, pageW - margin, 16, { align: 'right' })
  doc.text(`Date: ${issuedDate}`, pageW - margin, 21, { align: 'right' })

  // ── Title + client block ──
  let y = 40
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(...BRAND.cherry)
  doc.text(`Security Manpower Quotation — ${input.stateName}`, margin, y)
  y += 7

  doc.setFillColor(248, 246, 241)
  doc.roundedRect(margin, y, pageW - margin * 2, 26, 1.5, 1.5, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...BRAND.midnight)
  doc.text('Quotation To:', margin + 4, y + 7)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(input.clientName || '—', margin + 4, y + 13)
  doc.text(input.siteName || input.stateName, margin + 4, y + 19)
  doc.text(`${input.city ? input.city + ', ' : ''}${input.stateName}`, margin + 4, y + 25)
  y += 34

  // ── Engagement summary ──
  const summaryLeft: [string, string][] = [
    ['Category', input.category === 'supervisor' ? 'Security Supervisor' : 'Security Guard / Lady Guard'],
    ['Coverage', input.coverage === '24h' ? '24-hour (2 guards / post)' : '12-hour (1 guard / post)'],
    ['Posts', String(input.posts ?? 1)],
    ['Guards billed', String(guards)],
  ]
  const summaryRight: [string, string][] = [
    ['Basic wage (month)', formatINR(input.monthlyBasic)],
    ['Days / month', String(input.daysPerMonth ?? 26)],
    ['Shift hours', String(input.hoursPerShift ?? 8) + ' hrs'],
    ['Commission share', `${(input.commissionPct * 100).toFixed(0)}%`],
  ]

  autoTable(doc, {
    startY: y,
    margin: { left: margin, right: margin },
    body: [
      [...summaryLeft.map((pair) => pair[1]), ...summaryRight.map((pair) => pair[1])],
    ],
    head: [['', '', '', '', '', '', '', '']],
    theme: 'plain',
    styles: { fontSize: 8.5, cellPadding: 1.6, font: 'helvetica' },
  })
  // Overlay the summary labels above the row we just drew
  autoTable(doc, {
    startY: y,
    margin: { left: margin, right: margin },
    head: [[...summaryLeft.map(([k]) => k), ...summaryRight.map(([k]) => k)]],
    theme: 'plain',
    styles: { fontSize: 7.5, fontStyle: 'bold', textColor: hex(BRAND.muted) as [number, number, number], cellPadding: 1.2, font: 'helvetica' },
    columnStyles: Object.fromEntries(Array.from({ length: 8 }, (_, i) => [i, { halign: 'left' }])),
  })
  // Merge the two tables visually: draw a hairline under labels
  const afterSummary = lastTableY(doc)
  doc.setDrawColor(...BRAND.line)
  doc.setLineWidth(0.3)
  doc.line(margin, afterSummary, pageW - margin, afterSummary)
  y = afterSummary + 6

  // ── Breakdown table ──
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(...BRAND.cherry)
  doc.text('Cost Breakdown (per guard / month)', margin, y)
  y += 2

  const rows = breakdown.lines.map((l) => [l.label, formatINR(l.amount)])
  autoTable(doc, {
    startY: y,
    margin: { left: margin, right: margin },
    head: [['Particulars', 'Amount (₹)']],
    body: rows,
    theme: 'grid',
    headStyles: {
      fillColor: BRAND.midnight,
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: 'bold',
      halign: 'left',
    },
    styles: {
      fontSize: 8.5,
      cellPadding: 1.8,
      textColor: BRAND.ink,
      lineColor: BRAND.line,
      lineWidth: 0.2,
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 45, halign: 'right', fontStyle: 'bold' },
    },
    didParseCell: (data) => {
      const cell = data.cell
      const raw = cell.raw
      const label = Array.isArray(raw) ? String(raw[0] ?? '') : ''
      if (label.startsWith('Grand Total')) {
        cell.styles.fontStyle = 'bold'
        cell.styles.fillColor = BRAND.cherry
        cell.styles.textColor = [255, 255, 255]
      } else if (label.startsWith('Commission')) {
        cell.styles.fontStyle = 'bold'
        cell.styles.fillColor = [245, 240, 220]
        cell.styles.textColor = BRAND.cherryDeep
      } else if (label.startsWith('GST')) {
        cell.styles.fontStyle = 'bold'
        cell.styles.textColor = BRAND.cherry
      }
    },
  })
  const afterTable = lastTableY(doc)
  y = afterTable + 7

  // ── Totals block ──
  const totals = [
    { label: `Total per guard / month`, value: formatINR(breakdown.totalPerGuard) },
    { label: `Monthly estimate (${guards} guards)`, value: formatINR(monthlyTotal) },
    { label: 'Annual estimate', value: formatINR(annualTotal) },
  ]

  const totalBoxW = 85
  const totalBoxX = pageW - margin - totalBoxW
  autoTable(doc, {
    startY: y,
    margin: { left: totalBoxX, right: margin },
    head: [[{ content: 'TOTAL BILLING', colSpan: 2, styles: { halign: 'center' } }]],
    body: totals.map((t) => [t.label, t.value]),
    theme: 'grid',
    headStyles: { fillColor: BRAND.cherry, textColor: [255, 255, 255], fontSize: 9.5, fontStyle: 'bold' },
    styles: { fontSize: 8.5, cellPadding: 2.2, textColor: BRAND.ink, lineColor: BRAND.line, lineWidth: 0.2 },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 38, halign: 'right', fontStyle: 'bold', textColor: BRAND.cherry },
    },
    didParseCell: (data) => {
      if (data.section === 'body' && data.row.index === 0) {
        data.cell.styles.fontStyle = 'bold'
        data.cell.styles.fillColor = [252, 248, 240]
      }
    },
  })
  const afterTotals = lastTableY(doc)

  // ── Notes ──
  // Flow naturally; if the notes + signature (~36mm) can't fit on the page,
  // continue on a fresh page instead of clamping over earlier content.
  let notesTop = afterTotals + 8
  if (notesTop + 36 > pageH - 12) {
    doc.addPage()
    notesTop = 22
  }
  y = notesTop
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...BRAND.midnight)
  doc.text('Notes:', margin, y)
  y += 5
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...BRAND.muted)
  const notes = [
    '1) GST shall be charged extra as applicable on the total billing.',
    '2) Rates are linked to minimum wages. Variation in MW will attract a pro rata increase.',
    '3) Leave as applicable would be claimed as actuals.',
    '4) This quotation is indicative until site scoping and confirmation by our team.',
  ]
  for (const n of notes) {
    doc.text(n, margin, y)
    y += 4.5
  }

  // ── Signature block ──
  const sigY = y + 12
  doc.setDrawColor(...BRAND.line)
  doc.setLineWidth(0.3)
  doc.line(margin, sigY, pageW - margin, sigY)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8.5)
  doc.setTextColor(...BRAND.midnight)
  doc.text('For Silbar Security Services Pvt. Ltd.', margin, sigY + 6)
  doc.text('Authorised Signatory', pageW - margin - 40, sigY + 6, { align: 'right' })

  // ── Footer (every page) ──
  const addFooter = () => {
    const pages = doc.getNumberOfPages()
    for (let i = 1; i <= pages; i++) {
      doc.setPage(i)
      const h = doc.internal.pageSize.getHeight()
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(7)
      doc.setTextColor(...BRAND.muted)
      doc.text(`${COMPANY.name} · ${COMPANY.phone} · ${COMPANY.email} · ${COMPANY.website}`, pageW / 2, h - 8, { align: 'center' })
      doc.text(`${COMPANY.regOffice}`, pageW / 2, h - 4.5, { align: 'center' })
      doc.setFontSize(6.5)
      doc.text(`Page ${i} of ${pages}`, pageW - margin, h - 8, { align: 'right' })
    }
  }
  addFooter()

  return doc
}

/** Build a human-readable quote number like SILBAR/QT/2026/0042 */
export function buildQuoteNumber(): string {
  const now = new Date()
  const yy = String(now.getFullYear())
  const seq = Math.floor(1000 + Math.random() * 9000)
  return `SILBAR/QT/${yy}/${seq}`
}

export function todayISO(): string {
  return new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

/** Convenience wrapper: generate + download in one call. */
export async function downloadQuotePdf(input: AdminQuoteInput, quoteNumber: string, issuedDate: string) {
  const breakdown = computeAdminQuote(input)
  const doc = await generateQuotePdf({ input, breakdown, quoteNumber, issuedDate })
  doc.save(`Silbar-Quotation-${input.stateName.replace(/\s+/g, '-')}-${quoteNumber.replace(/[\/]/g, '-')}.pdf`)
}
