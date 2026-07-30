#!/usr/bin/env node

/**
 * IndexNow URL submission script.
 *
 * Reads the generated sitemap and submits all URLs to IndexNow so search
 * engines discover new / updated pages immediately.
 *
 * ## Usage
 *
 *   node scripts/submit-indexnow.mjs
 *
 * Tries local .next output first (works in CI / local builds), then
 * falls back to fetching the live production sitemap (works in post-deploy).
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
 * Try to read URLs from a local generated sitemap file.
 * Next.js sitemaps output to .next/server/app/sitemap.xml/body
 * or .next/static/*sitemap* depending on config.
 */
function readLocalSitemapUrls() {
  const candidates = [
    join(PROJECT_ROOT, '.next', 'server', 'app', 'sitemap.xml', 'body'),
    join(PROJECT_ROOT, '.next', 'server', 'app', 'sitemap.xml'),
  ]

  for (const filePath of candidates) {
    if (!existsSync(filePath)) continue

    try {
      const content = readFileSync(filePath, 'utf-8')
      const locs = [...content.matchAll(/<loc>\s*(.*?)\s*<\/loc>/gi)].map((m) => m[1].trim())
      if (locs.length > 0) {
        console.log(`[IndexNow] Read ${locs.length} URLs from local sitemap: ${filePath}`)
        return locs
      }
    } catch {
      // try next candidate
    }
  }

  return null
}

async function fetchRemoteSitemapUrls() {
  try {
    const res = await fetch(`${BASE_URL}/sitemap.xml`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const xml = await res.text()
    const locs = [...xml.matchAll(/<loc>\s*(.*?)\s*<\/loc>/gi)].map((m) => m[1].trim())
    if (locs.length > 0) {
      console.log(`[IndexNow] Fetched ${locs.length} URLs from ${BASE_URL}/sitemap.xml`)
      return locs
    }
  } catch (err) {
    console.error('[IndexNow] Could not fetch remote sitemap:', err instanceof Error ? err.message : err)
  }
  return []
}

async function submitBatch(urls) {
  if (urls.length === 0) {
    console.log('[IndexNow] No URLs to submit.')
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
    console.log('[IndexNow] If running locally after build, the sitemap may not have been generated yet.')
    console.log('[IndexNow] Run again after deployment or use:  node scripts/submit-indexnow.mjs')
    process.exit(0)
  }

  console.log(`[IndexNow] Submitting ${allUrls.length} URLs to ${INDEXNOW_ENDPOINT} ...`)

  // Submit in batches of 10 000 (IndexNow per-request limit)
  const BATCH_SIZE = 10000
  let submitted = 0
  let failed = 0

  for (let i = 0; i < allUrls.length; i += BATCH_SIZE) {
    const batch = allUrls.slice(i, i + BATCH_SIZE)
    const result = await submitBatch(batch)

    if (result.success) {
      submitted += batch.length
      console.log(`[IndexNow] Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} URLs OK (status ${result.status})`)
    } else {
      failed += batch.length
      console.error(`[IndexNow] Batch ${Math.floor(i / BATCH_SIZE) + 1}: FAILED —`, result.error)
    }
  }

  console.log(`\n[IndexNow] Done — ${submitted} submitted, ${failed} failed.`)

  if (failed > 0) process.exit(1)
}

main()
