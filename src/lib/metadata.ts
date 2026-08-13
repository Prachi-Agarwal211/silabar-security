import type { Metadata } from 'next'

const BASE_URL = 'https://www.silbarsecurity.in'
const SITE_NAME = 'Silbar Security Services Pvt. Ltd.'
/** Layout title template is "%s | Silbar Security" (19-char suffix). */
const TITLE_MAX = 60

export const SEARCH_TITLE_BUDGET = TITLE_MAX - ' | Silbar Security'.length

/** Clamp a page-part title so the template suffix keeps the final <title> ≤60. */
export function seoTitle(title: string, max = SEARCH_TITLE_BUDGET): string {
  const t = title.trim().replace(/\s+/g, ' ')
  if (t.length <= max) return t
  const cut = t.slice(0, max - 1)
  const atSpace = cut.lastIndexOf(' ')
  return (atSpace > 20 ? cut.slice(0, atSpace) : cut).trimEnd() + '…'
}

/** Clamp full branded titles (OG/Twitter append the long brand). */
export function clampFull(title: string): string {
  return seoTitle(`${title} | ${SITE_NAME}`, TITLE_MAX)
}

/** Clamp descriptions to ≤160 rendered chars (HTML-escaped) at a word boundary. */
export function seoDescription(description: string, max = 160): string {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const fits = (s: string) => esc(s).length <= max
  const d = description.trim().replace(/\s+/g, ' ')
  if (fits(d)) return d
  const cut = d.slice(0, max - 1)
  const atSpace = cut.lastIndexOf(' ')
  let base = (atSpace > 80 ? cut.slice(0, atSpace) : cut).trimEnd()
  while (!fits(base + '…')) base = base.slice(0, base.length - 1).trimEnd()
  return base + '…'
}

export function ogMetadata(
  title: string,
  description: string,
  path: string,
  image?: string
): Partial<Metadata> {
  const url = `${BASE_URL}${path}`
  const ogImage = image
    ? `${BASE_URL}${image}`
    : `${BASE_URL}/images/og/default-og.svg`
  const ogTitle = clampFull(title)
  const ogDesc = seoDescription(description)

  return {
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_IN',
      images: [{ url: ogImage, width: 1200, height: 630, alt: 'Silbar Security Services Pvt. Ltd.' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDesc,
      images: [ogImage],
    },
  }
}