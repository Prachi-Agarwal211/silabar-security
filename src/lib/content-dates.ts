/**
 * Google treats future dates in sitemap <lastmod> and Article schema
 * (datePublished / dateModified) as a spam / low-trust signal, which can keep
 * pages stuck as "Discovered — currently not indexed". All content dates go
 * through here so a future date can never leak into structured data.
 */

/**
 * Clamp an ISO date string (YYYY-MM-DD) to never exceed today.
 * Returns the same format. Used by the sitemap and Article/BlogPosting schema.
 */
export function clampToToday(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00.000Z`)
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  if (d.getTime() > today.getTime()) {
    return today.toISOString().slice(0, 10)
  }
  return isoDate
}

/**
 * True when an ISO date (YYYY-MM-DD) is in the future.
 */
export function isFutureDate(isoDate: string): boolean {
  return new Date(`${isoDate}T00:00:00.000Z`).getTime() > Date.now()
}
