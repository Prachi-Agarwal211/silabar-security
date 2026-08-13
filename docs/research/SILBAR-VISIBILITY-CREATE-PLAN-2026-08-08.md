# Silbar Security — Visibility Plan (HAVE vs NEED TO CREATE)
**Date:** 2026-08-08  
**Site:** https://www.silbarsecurity.in  
**Repo:** `silabar security/`  
**Problem you named:** *not appearing anywhere* → this is **authority + entity + local citation**, not missing homepage craft.

---

## Executive decision

| Layer | Status | What to do |
|-------|--------|------------|
| Website craft / URL volume | **Strong** (531 sitemap URLs) | Stop adding thin city pages; fix uniqueness |
| Social accounts | **Mostly exist** | Clean sameAs; fix wrong YT; post weekly |
| Google Business | **Multi-CID exists** (5 Maps profiles) | Optimize + reviews + posts (primary growth lever) |
| Directories / backlinks | **Weak / missing** | **CREATE** IndiaMART, JustDial, Sulekha, trade dirs, PR |
| Brand SERP | **Invisible vs SIS / local agencies** | Citations + unique city proof + GSC |

**Do not** “rebuild the website” as the main fix.  
**Do** create **external presence** (GBP + directories + backlinks + real social activity).

---

## A. What they already HAVE (probed live)

### A1. Website
| Check | Result |
|-------|--------|
| Homepage / about / contact / services / blog | **200** |
| robots / sitemap / llms.txt / ai.txt | **200** |
| Sitemap size | **531 URLs** |
| Host | www.silbarsecurity.in (apex → www) |
| Primary phone | **+91-9982170555** (+ 99831 69555 seen) |
| Email | info@silbarsecurity.in |
| HQ address (schema) | Statesman House, Barakhamba Rd, Connaught Place, New Delhi |
| Founding | 2018 (schema) / foundingPlace Jaipur |
| Claims on site | 4 ISO, PSARA 19 states, 7,000+ staff, 200+ cities |

### A2. Social / Maps (real)
| Platform | URL | Live? | Quality note |
|----------|-----|-------|--------------|
| **Instagram** | instagram.com/silbar_security | **200** | Use as primary visual channel |
| **Facebook** | facebook.com/**Silbar01** | **200** (title: Silbar Security Services Pvt. Ltd \| Delhi) | **Real page** |
| **LinkedIn** | linkedin.com/company/silbar-security-services-private-limited/ | **200** | **Real company** |
| **X/Twitter** | x.com/silbarsecurity | **200** | Exists — post or it stays dead-looking |
| **YouTube** | youtube.com/@silbarsecurity | **200 but WRONG** | Resolves to **“NAROTTAM FACTS”** channel — **not Silbar** |
| **GMB / Maps** | 5 CIDs in schema | All **200** | Multi-office entity — good if real; bad if duplicate spam |
| **IndiaMART** | /silbarsecurity guessed | **404** | **Not created / wrong URL** |
| **JustDial** | Search soft-land | Weak | **Need claimed listing** |

Maps CIDs currently on site:
- 7869038594776014797  
- 3300960116722998024  
- 7404208150107816544  
- 14695954397884633275  
- 4837321117134116721  

### A3. What website does well
- Next.js product surface: services, industries, case studies, careers, franchise, calculator, certifications  
- PSARA / ISO messaging + multi-state coverage  
- Organization schema + alternateName (including disambiguation from US silbarsecurity.com)  
- AI crawler files present  

---

## B. What’s WRONG on the website (fix)

| # | Issue | Evidence | Fix |
|---|--------|----------|-----|
| 1 | **Facebook sameAs is a share shortlink** | `facebook.com/share/1GtattxqNp/` | Use clean `https://www.facebook.com/Silbar01` |
| 2 | **YouTube handle is not Silbar** | @silbarsecurity → “NAROTTAM FACTS” | Create **owned** channel or drop YT from sameAs; never link hijacked handle |
| 3 | **sameAs floods duplicate Maps CIDs** | 5 CIDs repeated twice in JSON-LD | One list, unique URLs only |
| 4 | **Thin city pages** | jaipur / mumbai / gurgaon / noida = **same body hash**; only **delhi** looks real | Unique NAP + local proof or noindex/remove thin ones |
| 5 | **Sitemap bloat risk** | 372 `security-services/*` + 56 services + 38 industries | Prefer depth on top cities over 300 near-duplicates |
| 6 | **Calculator not in sitemap** | `/calculator` 200 but absent from sitemap | Add if public lead tool |
| 7 | **Placeholder noise** | Form placeholders `+91 98765 43210`, `rahul@company.com` | Harmless placeholders — not fake company data (OK) |
| 8 | **Reviews on site** | Role/company style quotes, not linked GBP | Prefer embed real Google reviews or label as “client feedback” |
| 9 | **US brand collision** | silbarsecurity.com (US franchise) | Keep India legal name + .in + NAP everywhere |

---

## C. Why they’re “not appearing” (root causes)

1. **No external citation graph** — IndiaMART 404, weak JustDial, few third-party mentions. Google ranks **entities with consistent NAP elsewhere**, not only self-owned pages.  
2. **GBP under-used** — 5 profiles without continuous posts/reviews/photos look like ghosts.  
3. **Thin city SEO** — hundreds of near-duplicate URLs can **hurt** more than help (crawl waste + soft soft-404s).  
4. **Social silence** — accounts exist but algorithms need **posts + engagement**; empty LinkedIn/X don’t build brand queries.  
5. **Competitors own “security agency [city]”** via years of directories + ads + reviews (SIS, local PSARA agencies).  
6. **Backlink zero** — need PR, client logos with links, association pages, guest articles, local chambers.  

Website alone cannot fix rank. **Create off-site presence.**

---

## D. WHAT TO CREATE (priority order)

### P0 — This week (entity cleanup + GMB)

| Action | Owner | Output |
|--------|-------|--------|
| Replace FB sameAs with `facebook.com/Silbar01` | Dev | Deploy |
| Deduplicate Maps CIDs in sameAs | Dev | Deploy |
| Remove / replace wrong YouTube | Client + Dev | New channel OR omit |
| GBP audit for **each real office** | Client | Primary category, website=silbarsecurity.in, phone, hours, services |
| GBP photos (uniform, vehicles, guards, HQ) | Client | 20+ photos / main profile |
| GBP weekly posts (3×) | Client/ops | Quote CTA + city |
| Review ask process (WhatsApp after job) | Ops | 10 real reviews / 30 days on primary profile |
| GSC property + sitemap submit | Dev/SEO | Coverage report |

### P1 — Create directories (citations) — **main “appear anywhere” work**

Create **claimed** listings with **identical NAP**:

| Platform | Why | Status now | Action |
|----------|-----|------------|--------|
| **Google Business** | Local pack | Have multi-CID | Optimize, not recreate blindly |
| **IndiaMART** | B2B security buyers | **404 / missing** | **Create company + products** (manned guarding, CCTV, FM) |
| **JustDial** | Local discovery | Weak | Claim + complete |
| **Sulekha** | Local services | Likely missing | Create |
| **TradeIndia** | B2B | Missing | Create |
| **ExportersIndia / similar** | Optional B2B | Missing | Create if budget |
| **PSARA / industry associations** | Trust | Check | List where legal |
| **Clutch / GoodFirms** | Optional | Missing | Only if B2B international |
| **Crunchbase / Wikidata** | Entity | No Wikidata (code notes dead Q) | Create Wikidata **only with verifiable sources** |

**NAP lock (use everywhere):**
- Legal: Silbar Security Services Pvt. Ltd.  
- Site: https://www.silbarsecurity.in  
- Phone: +91-9982170555  
- Email: info@silbarsecurity.in  
- HQ: 5th Floor, Statesman House, Plot No. 148, Barakhamba Road, Connaught Place, New Delhi 110001  

### P2 — Create backlinks (earned + built)

| Type | Examples | Effort |
|------|----------|--------|
| Client / partner pages | “Security partner” logos with link | Medium |
| Local chambers | Delhi / Jaipur industry associations | Medium |
| Press / news | New office, ISO cert, CSR, major contract (truthful) | High |
| Guest / expert | PSARA compliance explainers on industry blogs | Medium |
| Resource links | Publish free “PSARA state checklist” PDF → others cite | High value |
| Event sponsorships | Local security / facility expos | Paid |
| Reverbex portfolio + case study | reverbex.in + client logos page | Easy |

Target: **20 real referring domains in 90 days**, not spam blog networks.

### P3 — Social that actually exists → make them **alive**

| Platform | Create / fix |
|----------|----------------|
| LinkedIn | Weekly: site security tips, hiring, ISO/PSARA proof, case snippets |
| Instagram | Guard training, site visits (permission), before/after access control |
| Facebook | Same as IG + lead form ads later |
| X | News + hiring or **pause** if no capacity |
| YouTube | **Create official Silbar channel** (not @silbarsecurity if owned by NAROTTAM FACTS); upload: company intro, training, CCTV demo, client (anonymized) stories |
| WhatsApp Business | Catalog + quick replies (already wa.me live) |

### P4 — Site content that supports discovery (after off-site starts)

| Do | Don’t |
|----|-------|
| Make **top 15 cities** unique (local PSARA note, office, phone, 1 case, 1 FAQ) | Keep 300 identical city shells |
| Add `/calculator` to sitemap if public | Index thin soft-404 cities |
| Case studies with city + industry in title | Fake named Google reviewers |
| Certifications page with **certificate images + cert numbers** (if public) | Unverifiable “7000+” without proof on about |
| Branch pages for real offices only | Fake office list |

### P5 — Paid (optional accelerator)

| Channel | Use |
|---------|-----|
| Google Ads | “security agency delhi/jaipur” brand + non-brand |
| Meta | Lead ads → WhatsApp |
| IndiaMART paid | B2B RFQs |

Organic alone is slow when competitors buy inventory.

---

## E. 30 / 60 / 90 day plan

### Days 1–30 — Foundation
1. Code: FB Silbar01, unique sameAs, YT fix/omit  
2. GBP: primary Delhi + Jaipur (or real HQs) fully complete  
3. Create IndiaMART + JustDial + Sulekha  
4. GSC + Bing Webmaster  
5. 15 unique city pages (tier-1 only); noindex rest of thin set  
6. 12 GBP posts + 10 review asks  
7. LinkedIn 8 posts  

### Days 31–60 — Authority
8. TradeIndia + 3 association listings  
9. 2 press or guest pieces  
10. 5 partner/client backlinks  
11. Official YouTube launch (3 videos)  
12. Case study pages for real contracts (anonymized OK)  

### Days 61–90 — Scale
13. Expand unique cities only where ops exist  
14. Review velocity 30+ on primary GBP  
15. First backlink report + GSC brand queries  
16. Optional Ads test ₹10–20k  

---

## F. Sitemap / data actions (dev checklist)

| Item | Action |
|------|--------|
| 531 URLs | Audit which city pages return generic shell (jaipur/mumbai/gurgaon/noida pattern) |
| Thin cities | `noindex,follow` or unique content before indexing |
| `/calculator` | Add to sitemap if meant to rank |
| Privacy/disclaimer | Present; keep low priority |
| sameAs | FB Silbar01, IG, LinkedIn, X, **unique** Maps only, **no wrong YT** |
| llms.txt | Add real socials + NAP; avoid overclaim without proof |
| og-image | Exists (~550KB) — OK; compress if needed |

---

## G. Code fix candidates (when you say “fix Silbar code”)

1. `layout.tsx` sameAs → `https://www.facebook.com/Silbar01`  
2. Dedupe `GOOGLE_REVIEWS` + office map URLs  
3. Drop YouTube until official channel owned  
4. City template: hard fail if no unique body for city  
5. Sitemap: include calculator; exclude noindexed thin cities  

*(Not applied this turn — you asked for research + what to do / create.)*

---

## H. Competitive reality (security India)

| They win on | Silbar needs |
|-------------|--------------|
| Years of JustDial/IndiaMART | Create listings now |
| Hundreds of GBP reviews | Review engine |
| Local “security agency near me” | GBP + unique city NAP |
| Brand search volume | Consistent name + ads later |
| Sales teams cold-calling | Lead OS + WhatsApp speed |

Silbar’s site is **already more advanced** than most agencies. Visibility gap is **off-site**, not Next.js.

---

## I. Bottom line

| Have | Need to create |
|------|----------------|
| Big website (531 URLs) | **Unique** city content (not more shells) |
| IG, FB Silbar01, LinkedIn, X | Weekly content + lead CTAs |
| 5 Maps CIDs | Optimized GBP + reviews + posts |
| PSARA/ISO story | Cert proof + directories |
| Almost no IndiaMART | **Create IndiaMART + JustDial + Sulekha** |
| Wrong YT handle | **Create real YouTube** |
| Few backlinks | PR, partners, associations, resources |
| Brand invisible | Citations + GSC + optional Ads |

**Primary workstream:** citations + GBP + backlinks + social activity.  
**Secondary:** fix sameAs/YT + thin city SEO.  
**Not primary:** redesign homepage.

---

## J. HITL needed from Silbar / you

1. Confirm which of the **5 Maps CIDs** are real offices (names/addresses).  
2. Confirm IndiaMART/JustDial accounts or create logins.  
3. Confirm if any YouTube is owned (current @silbarsecurity is **not** Silbar).  
4. Priority cities for unique pages (suggest: Delhi, Jaipur, Gurugram, Noida, Ahmedabad, Mumbai, Bengaluru).  
5. OK to start code sameAs fix now?  

Full path: `/mnt/c/Users/15anu/OneDrive/文档/code/SILBAR-VISIBILITY-CREATE-PLAN-2026-08-08.md`
