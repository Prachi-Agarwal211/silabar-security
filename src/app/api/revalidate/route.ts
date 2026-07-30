import { NextResponse, type NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'
import { submitToIndexNow } from '@/lib/indexnow'

/**
 * POST /api/revalidate
 *
 * On-demand cache revalidation + IndexNow submission.
 *
 * ## Usage (from a CMS webhook, CI/CD, or curl)
 *
 * ```bash
 * curl -X POST https://www.silbarsecurity.in/api/revalidate \
 *   -H "Content-Type: application/json" \
 *   -d '{
 *     "secret": "your-revalidation-secret",
 *     "path": "/blog/[slug]",
 *     "urls": ["/blog/new-post", "/services/industrial-security"]
 *   }'
 * ```
 *
 * ### Fields
 * - `secret` (required) — matches `REVALIDATION_SECRET` env var
 * - `path` (optional) — Next.js revalidatePath path (e.g. `"/blog/[slug]"`)
 * - `urls` (optional) — array of changed URLs to submit to IndexNow
 *
 * ### .env.local
 * ```
 * REVALIDATION_SECRET=your-secure-random-string
 * INDEXNOW_KEY=e8a4f2c1-9b3d-4a7e-9c5f-2d8b1e6a4c3d
 * ```
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { secret, urls, path } = body

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // 1. Revalidate Next.js ISR cache for the given path
    if (path) {
      revalidatePath(path)
    }

    // 2. Submit changed URLs to IndexNow for instant search-engine discovery
    let indexNowResult = null
    if (urls && Array.isArray(urls) && urls.length > 0) {
      indexNowResult = await submitToIndexNow({ urls })
    }

    return NextResponse.json({
      revalidated: !!path,
      indexNow: indexNowResult,
      now: Date.now(),
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ message: 'Error revalidating', error: message }, { status: 500 })
  }
}
