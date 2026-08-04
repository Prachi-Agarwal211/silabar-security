/**
 * Landing-page imagery reused across all state / city pages so every location
 * gets its own visual identity without new assets. Images already exist in
 * /public — they ship with the site and are cached by the CDN.
 */
export const LANDING_HERO_IMAGES = ['/hero-guard.webp', '/why-silbar-bg.webp', '/industries-bg.webp'] as const

/**
 * Pick a hero image for a location by its index in the STATES array.
 * `offset` lets sibling sections (hero vs. image band) use different images
 * on the same page. Falls back to the first image when the index is unknown.
 */
export function locationHeroImage(stateIndex: number, offset = 0): string {
  const n = LANDING_HERO_IMAGES.length
  const idx = ((stateIndex + offset) % n + n) % n
  return LANDING_HERO_IMAGES[idx] ?? LANDING_HERO_IMAGES[0]
}
