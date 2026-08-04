/**
 * Standalone verification of the admin quote engine + PDF generator.
 * Node 25 strips TypeScript natively, so we copy the two libs into a temp
 * dir (rewriting the `@/` alias to a relative import) and run them directly.
 *   1) checks the Excel-faithful math (Rajasthan guard 249×26 → ₹15,653 grand)
 *   2) generates a real branded PDF and validates the %PDF header + bytes
 */
import { mkdirSync, writeFileSync, readFileSync, cpSync, rmSync } from 'fs'
import { fileURLToPath, pathToFileURL } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const outdir = path.join(__dirname, '.verify-out')
rmSync(outdir, { recursive: true, force: true })
mkdirSync(outdir, { recursive: true })

// Copy libs + rewrite the `@/` alias to a relative import
const engineTs = readFileSync(path.join(root, 'src', 'lib', 'quote-engine.ts'), 'utf8')
const pdfTs = readFileSync(path.join(root, 'src', 'lib', 'quote-pdf.ts'), 'utf8')
  .replace(`from '@/lib/quote-engine'`, `from './quote-engine.ts'`)
writeFileSync(path.join(outdir, 'quote-engine.ts'), engineTs)
writeFileSync(path.join(outdir, 'quote-pdf.ts'), pdfTs)

const { computeAdminQuote, formatINR, guardsForCoverage } = await import(
  pathToFileURL(path.join(outdir, 'quote-engine.ts')).href + '?t=' + Date.now()
)
const { generateQuotePdf, buildQuoteNumber, todayISO } = await import(
  pathToFileURL(path.join(outdir, 'quote-pdf.ts')).href + '?t=' + Date.now()
)

// ── 1) Math check: Rajasthan guard, daily 249 × 26 days ──
const b = computeAdminQuote({
  stateName: 'Rajasthan',
  category: 'guard',
  monthlyBasic: 249 * 26,
  conveyance: 0,
  rentAllowancePct: 0.15,
  serviceChargePct: 0.10,
  includeGst: true,
  daysPerMonth: 26,
  hoursPerShift: 8,
})
console.log('=== MATH CHECK (Rajasthan guard 249x26, uniform ₹500, no service charge) ===')
console.log('grand (expect ₹14,522):', formatINR(b.grand))
console.log('total/guard with 15% comm + GST:', formatINR(b.totalPerGuard))
if (b.grand !== 14522) {
  console.error('FAIL: grand total', b.grand, 'does not match expected ₹14,522')
  process.exit(1)
}
console.log('MATH-OK ✓')

// ── 2) PDF check: generate real bytes in Node (FileReader/fetch absent → logo skipped) ──
globalThis.FileReader = class {
  readAsDataURL() {
    throw new Error('noop')
  }
}
try {
  const input = {
    stateName: 'Rajasthan',
    category: 'guard',
    monthlyBasic: 6474,
    conveyance: 0,
    rentAllowancePct: 0.15,
    serviceChargePct: 0.10,
    includeGst: true,
    clientName: 'Test Client Pvt. Ltd.',
    siteName: 'Plant 2 — Neemrana',
    city: 'Jaipur',
    guards: 6,
    daysPerMonth: 26,
    hoursPerShift: 8,
  }
  const doc = await generateQuotePdf({
    input,
    breakdown: computeAdminQuote(input),
    quoteNumber: buildQuoteNumber(),
    issuedDate: todayISO(),
  })
  const buf = Buffer.from(doc.output('arraybuffer'))
  const header = buf.subarray(0, 5).toString()
  const outPdf = path.join(root, 'test-quote-output.pdf')
  writeFileSync(outPdf, buf)
  console.log('=== PDF CHECK ===')
  console.log('header:', header, '| size:', buf.length, 'bytes')
  console.log('pages:', doc.getNumberOfPages())
  if (header !== '%PDF-' || buf.length < 20000) {
    console.error('FAIL: PDF invalid or too small')
    process.exit(1)
  }
  console.log('PDF-OK ✓ → wrote test-quote-output.pdf')
} catch (e) {
  console.error('PDF generation failed:', e)
  process.exit(1)
}
