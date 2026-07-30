#!/usr/bin/env node

/**
 * IndexNow URL submission script.
 *
 * Reads the generated sitemap and submits all URLs to IndexNow so search
 * engines discover new / updated pages immediately.
 *
 * Tries local .next output first (works in CI / local builds), then
 * falls back to fetching the live production sitemap (works in post-deploy).
 *
 * ## Safety note for Vercel builds
 *
 * The script always exits with code 0 so it never fails a deployment.
 * If IndexNow verification hasn't propagated yet (chicken-and-egg:
 * key file needs deployment to be live), it simply warns and moves on.
 * Run `npm run indexnow` manually after deployment to retry.
 *
 * ## Env vars
 *
 *   INDEXNOW_KEY         — your IndexNow API key (default: e8a4f2c1...)
 *   NEXT_PUBLIC_SITE_URL — site URL (default: https://www.silbarsecurity.in)
 */

import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = join(__dirname, '..')

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.silbarsecurity.in'
const KEY = process.env.INDEXNOW_KEY || 'e8a4f2c1-9b3d-4a7e-9c5f-2d8b1e6a4c3d'

/**
 * Try to read URLs from local .next build output.
 * Supports both flat sitemaps (old) and segmented sitemap indexes (generateSitemaps).
 */
function readLocalSitemapUrls() {
  // ── Flat sitemap (pre-generateSitemaps format) ──
  const flatCandidates = [
    join(PROJECT_ROOT, '.next', 'server', 'app', 'sitemap.xml', 'body'),
    join(PROJECT_ROOT, '.next', 'server', 'app', 'sitemap.xml'),
  ]

  for (const filePath of flatCandidates) {
    if (!existsSync(filePath)) continue
    try {
      const content = readFileSync(filePath, 'utf-8')
      // If it's a sitemap index, follow children; otherwise extract URLs directly
      if (content.includes('<sitemapindex')) {
        return readLocalSegmented(content)
      }
      const locs = [...content.matchAll(/<loc>\s*(.*?)\s*<\/loc>/gi)].map((m) => m[1].trim())
      if (locs.length > 0) {
        console.log(`[IndexNow] Read ${locs.length} URLs from local sitemap: ${filePath}`)
        return locs
      }
    } catch { /* try next */ }
  }

  // ── Segmented sitemap index (generateSitemaps format) ──
  // Next.js 16.2 outputs: .next/server/app/sitemap/[__metadata_id__]/body
  // where [__metadata_id__] = 'core', 'services', etc.
  const segmentsDir = join(PROJECT_ROOT, '.next', 'server', 'app', 'sitemap')
  if (existsSync(segmentsDir)) {
    try {
      // Try reading sitemap index from .next/server/app/sitemap.xml/body
      const indexPath = join(PROJECT_ROOT, '.next', 'server', 'app', 'sitemap.xml', 'body')
      if (existsSync(indexPath)) {
        const content = readFileSync(indexPath, 'utf-8')
        return readLocalSegmented(content)
      }
    } catch { /* fall through */ }
  }

  return null
}

/** Parse a sitemap index XML and read child sitemaps from local build output */
function readLocalSegmented(indexXml) {
  const childLocs = [...indexXml.matchAll(/<loc>\s*(.*?)\s*<\/loc>/gi)].map((m) => m[1].trim())
  if (childLocs.length === 0) return null

  console.log(`[IndexNow] Sitemap index with ${childLocs.length} child sitemaps`)
  const allUrls = []

  for (const loc of childLocs) {
    // URL like https://.../sitemap/core.xml → pathname: /sitemap/core.xml
    const urlObj = new URL(loc)
    const pathParts = urlObj.pathname.replace(/^\//, '').replace(/\.xml$/, '')  // → 'sitemap/core'

    // Try read patterns: .next/server/app/sitemap/[__metadata_id__]/body
    // and .next/server/app/sitemap/core.xml/body
    const candidates = [
      join(PROJECT_ROOT, '.next', 'server', 'app', pathParts, 'body'),        // sitemap/core/body
      join(PROJECT_ROOT, '.next', 'server', 'app', `${pathParts}.xml`, 'body'), // sitemap/core.xml/body
    ]

    for (const childPath of candidates) {
      if (!existsSync(childPath)) continue
      try {
        const content = readFileSync(childPath, 'utf-8')
        const urls = [...content.matchAll(/<loc>\s*(.*?)\s*<\/loc>/gi)].map((m) => m[1].trim())
        allUrls.push(...urls)
        break
      } catch { /* try next candidate */ }
    }
  }

  if (allUrls.length > 0) {
    console.log(`[IndexNow] Collected ${allUrls.length} URLs from local segmented sitemaps`)
  }
  return allUrls.length > 0 ? allUrls : null
}

async function fetchRemoteSitemapUrls() {
  try {
    const res = await fetch(`${BASE_URL}/sitemap.xml`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const xml = await res.text()

    // If it's a sitemap index, fetch each child sitemap and aggregate
    if (xml.includes('<sitemapindex')) {
      return fetchRemoteSegmented(xml)
    }

    // Flat sitemap — extract URLs directly
    const locs = [...xml.matchAll(/<loc>\s*(.*?)\s*<\/loc>/gi)].map((m) => m[1].trim())
    if (locs.length > 0) {
      console.log(`[IndexNow] Fetched ${locs.length} URLs from ${BASE_URL}/sitemap.xml`)
    }
    return locs
  } catch (err) {
    console.error('[IndexNow] Could not fetch remote sitemap:', err instanceof Error ? err.message : err)
  }
  return []
}

/** For a sitemap index, fetch each child sitemap and extract all page URLs */
async function fetchRemoteSegmented(xml) {
  const childLocs = [...xml.matchAll(/<loc>\s*(.*?)\s*<\/loc>/gi)].map((m) => m[1].trim())
  console.log(`[IndexNow] Sitemap index → fetching ${childLocs.length} child sitemaps...`)

  const allUrls = []
  for (const loc of childLocs) {
    try {
      const res = await fetch(loc)
      if (!res.ok) continue
      const childXml = await res.text()
      const urls = [...childXml.matchAll(/<loc>\s*(.*?)\s*<\/loc>/gi)].map((m) => m[1].trim())
      allUrls.push(...urls)
    } catch { /* skip failed child */ }
  }

  if (allUrls.length > 0) {
    console.log(`[IndexNow] Aggregated ${allUrls.length} URLs from ${childLocs.length} child sitemaps`)
  }
  return allUrls
}

async function submitBatch(urls) {
  if (urls.length === 0) {
    return { success: true }
  }

  const host = new URL(BASE_URL).host
  const body = {
    host,
    key: KEY,
    keyLocation: `https://${host}/${KEY}.txt`,
    urlList: urls,
  }

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    })

    if (res.ok || res.status === 202) {
      return { success: true, status: res.status, count: urls.length }
    }

    const text = await res.text()
    // 403 SiteVerificationNotCompleted is expected on first deploy — key file needs to be live
    if (res.status === 403 && text.includes('SiteVerificationNotCompleted')) {
      console.warn('[IndexNow] ⚠️ Verification pending. Deploy the key file first, then run:  npm run indexnow')
      return { success: false, status: res.status, error: 'SiteVerificationNotCompleted', pending: true }
    }

    console.error(`[IndexNow] Submission failed [${res.status}]:`, text)
    return { success: false, status: res.status, error: text }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[IndexNow] Network error:', msg)
    return { success: false, error: msg }
  }
}

async function main() {
  // 1. Try local sitemap first (postbuild, CI)
  let allUrls = readLocalSitemapUrls()

  // 2. Fall back to remote fetch (post-deploy hook, manual run)
  if (!allUrls) {
    console.log('[IndexNow] No local sitemap found — trying remote...')
    allUrls = await fetchRemoteSitemapUrls()
  }

  if (!allUrls || allUrls.length === 0) {
    console.log('[IndexNow] No URLs found. Skipping submission.')
    console.log('[IndexNow] Run after deployment with:  npm run indexnow')
    process.exit(0)
  }

  console.log(`[IndexNow] Submitting ${allUrls.length} URLs to ${INDEXNOW_ENDPOINT} ...`)

  // Submit in batches of 10 000 (IndexNow per-request limit)
  const BATCH_SIZE = 10000
  let submitted = 0
  let failed = 0
  let hasPendingVerification = false

  for (let i = 0; i < allUrls.length; i += BATCH_SIZE) {
    const batch = allUrls.slice(i, i + BATCH_SIZE)
    const result = await submitBatch(batch)

    if (result.success) {
      submitted += batch.length
      console.log(`[IndexNow] Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} URLs OK (status ${result.status})`)
    } else {
      failed += batch.length
      if (result.pending) hasPendingVerification = true
      console.error(`[IndexNow] Batch ${Math.floor(i / BATCH_SIZE) + 1}: FAILED —`, result.error)
    }
  }

  console.log(`\n[IndexNow] Done — ${submitted} submitted, ${failed} failed.`)

  if (hasPendingVerification) {
    console.log('[IndexNow] ⚠️ Verification pending — will auto-retry on next deploy once key file is live.')
    console.log('[IndexNow] Run manually after deployment:  npm run indexnow')
  }

  // Always exit 0 — never fail the build for IndexNow
  process.exit(0)
}

main()
