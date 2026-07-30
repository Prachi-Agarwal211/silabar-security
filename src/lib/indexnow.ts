/**
 * IndexNow protocol — instant search engine indexing.
 *
 * Submits URL changes to api.indexnow.org (global coordinator) which
 * propagates to Bing, Yandex, Seznam.cz, Naver, and other participants.
 *
 * The API key is public (served at `/{key}.txt`) so it is embedded here
 * directly rather than requiring an env var — simpler and guaranteed
 * to stay in sync with the key file in `public/`.
 *
 * If you deploy to a custom domain, update `SITE_URL` below.
 *
 * ## Usage
 *
 * ```ts
 * import { submitToIndexNow } from '@/lib/indexnow'
 * await submitToIndexNow({ urls: ['/contact', '/services/industrial-security'] })
 * ```
 *
 * Batch up to 10 000 URLs per call.
 */

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

// Key file hosted at https://www.silbarsecurity.in/e8a4f2c1-9b3d-4a7e-9c5f-2d8b1e6a4c3d.txt
const KEY = 'e8a4f2c1-9b3d-4a7e-9c5f-2d8b1e6a4c3d'

// Override via SITE_URL env var for preview/staging deployments
const SITE_URL = process.env.SITE_URL || 'https://www.silbarsecurity.in'

export interface IndexNowResult {
  success: boolean
  status?: number
  error?: string
}

/**
 * Submit one or more URLs to IndexNow for immediate indexing.
 * Accepts relative paths (e.g. `/contact`) or absolute URLs.
 */
export async function submitToIndexNow(
  input: { urls: string[] },
): Promise<IndexNowResult> {
  const key = process.env.INDEXNOW_KEY || KEY
  const host = new URL(SITE_URL).host

  // Normalise relative → absolute and de-duplicate
  const urlList = [...new Set(
    input.urls.map((u) => (u.startsWith('http') ? u : `${SITE_URL}${u.startsWith('/') ? '' : '/'}${u}`)),
  )]

  if (urlList.length === 0) {
    return { success: false, error: 'No URLs to submit' }
  }

  const body = {
    host,
    key,
    keyLocation: `https://${host}/${key}.txt`,
    urlList,
  }

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    })

    // 200 = OK, 202 = accepted (async verification)
    if (res.ok || res.status === 202) {
      return { success: true, status: res.status }
    }

    const text = await res.text()
    console.error(`[IndexNow] submission failed [${res.status}]:`, text)
    return { success: false, status: res.status, error: text }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[IndexNow] network error:', msg)
    return { success: false, error: msg }
  }
}
