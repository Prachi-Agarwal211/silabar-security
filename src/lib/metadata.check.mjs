import { seoTitle, seoDescription, clampFull } from './metadata.ts'
// ponytail: standalone self-check for title/description clamp helpers.
// Run: node src/lib/metadata.check.mjs
const assert = (cond, msg) => { if (!cond) { console.error('FAIL:', msg); process.exit(1) } }

// seoTitle clamps page-part titles so the "%s | Silbar Security" template suffix
// keeps the final <title> <= 60 chars. Budget = 60 - 17 = 43.
assert(seoTitle('Security Services in Jaipur') === 'Security Services in Jaipur', 'short title untouched')
assert(seoTitle('Security Services in Jaipur Rajasthan India').length <= 43, 'long title clamped to budget')
assert(/…$/.test(seoTitle('Security Services in Jaipur Rajasthan India')), 'clamped title ends with ellipsis')
assert(!/\s+…/.test(seoTitle('Security Services in Jaipur Rajasthan India')), 'clamps at word boundary, no trailing space before ellipsis')
assert(seoTitle('   Many   Spaces   ').length <= 43, 'coalesces whitespace')
assert((seoTitle('About Silbar Security — ISO & PSARA Certified PAN India Security Agency') + ' | Silbar Security').length <= 60, 'final title <= 60')

// seoDescription clamps descriptions to 160 at a word boundary.
assert(seoDescription('x'.repeat(100)) === 'x'.repeat(100), 'short desc untouched')
assert(seoDescription('a '.repeat(150)).length <= 160, 'long desc clamped to 160')
assert(!/\s+…$/.test(seoDescription('a '.repeat(150))), 'desc clamps at word boundary')

// clampFull clamps the branded OG/twitter title to 60.
assert(clampFull('Some Title').endsWith('Silbar Security Services Pvt. Ltd.'), 'brand suffix kept when short')
assert(clampFull('About Silbar Security — ISO & PSARA Certified PAN India Security Agency').length <= 60, 'og title <= 60')

// escaped-aware clamp: '&' -> '&amp;' inflates rendered length; must still be <=160 rendered.
const amp = seoDescription('Security agency in Rajasthan — warehouses & logistics parks, auto components & engineering ' + 'x '.repeat(70))
console.log('amp rendered len', amp.replace(/&/g, '&amp;').length, amp.slice(0, 80))
assert(amp.replace(/&/g, '&amp;').length <= 160, 'desc rendered (escaped) length <= 160')

console.log('metadata clamp self-check OK')