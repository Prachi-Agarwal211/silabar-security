# Silbar Security Services Pvt. Ltd. — Entity & AI Visibility Checklist

> **Goal:** Make "Silbar Security Services Pvt. Ltd." appear when people ask Google,
> ChatGPT, Perplexity, Gemini or Copilot about the company — and build a real
> Knowledge Panel over time.
>
> **Hard truth:** The website alone can never do this. AI engines and Google's
> Knowledge Graph only trust a company when **independent third-party sources**
> talk about it. Everything below creates that external footprint.
>
> **Realistic timeline:** first AI/Google mentions in 2–3 months, knowledge panel
> in 6–12 months (or faster with press coverage).

---

## Why the company is invisible today (root cause)

| Factor | Status |
|---|---|
| Website, schema.org, llms.txt, ai.txt, robots.txt | ✅ Done, technically clean |
| Google Business Profile | ✅ Exists (CID present) |
| Indexed pages in Google | 🟡 Sitemap submitted, indexing in progress |
| Third-party mentions (news, directories, forums) | ❌ **Zero** |
| Wikidata entity | ❌ **Does not exist** (site referenced a dead QID) |
| Backlinks from other domains | ❌ Zero (new domain) |
| LinkedIn / social footprint | 🟡 Profiles exist, low activity |

**The one-sentence reason:** AI answer engines and Google only cite companies
that have *external* proof of existence — the website is necessary but not
sufficient.

---

## Phase 1 — Fix the broken entity (this week)

- [ ] **Wikidata item** — create a real Wikidata item for the company:
  1. Go to https://www.wikidata.org and sign in (Google/email account).
  2. Click "Create a new item".
  3. Label: `Silbar Security Services Pvt. Ltd.`
  4. Description: `Indian private security agency`
  5. Add statements (use the correct Wikidata properties — there is no generic
     "sameAs" property; link each external profile via its own property):
     - `instance of (P31)` → `business (Q4830453)`
     - `inception (P571)` → `2018` (founding year — keep it matching the website.
       Note: the company was *incorporated* as Pvt. Ltd. in Oct 2025; do NOT add
       2025 as inception — a conflicting date fragments the entity)
     - `official website (P856)` → `https://www.silbarsecurity.in`
     - `headquarters location (P159)` → `New Delhi`
     - `registration country (P17)` → `India`
     - `official name (P1448)` → `Silbar Security Services Private Limited`
     - Aliases (labels tab): add `Silbar Security`, `Silbar Security Services`,
       `Silbar Security India`
     - Social / external profile links (each on its own property):
       - `X / Twitter username (P2002)` → `silbarsecurity`
       - `Instagram username (P2003)` → `silbar_security`
       - `Facebook page ID (P2013)` → the page ID from the share URL
       - `LinkedIn company ID (P4264)` → the numeric company ID
       - `OpenCorporates ID (P1320)` → company CIN lookup on OpenCorporates
       - `email address (P968)` → `info@silbarsecurity.in`
       - `Google Maps / search action`: leave for later — Wikidata does not have
         a direct "Google Maps" property; the CID in the site's schema covers this.
  6. Save the new Q-number, then tell the dev team — the website schema will be
     updated to link the real entity (the dead `Q140635640` reference has been removed).

- [ ] **Verify Google Business Profile** is fully completed:
  - Exact legal name: `Silbar Security Services Pvt. Ltd.`
  - Category: `Security guard service` / `Private security service`
  - Address, phone (+91-99821-70555), website, hours, photos
  - Service area: all 19 states
  - Ask 10–15 real clients for Google reviews (reviews feed AI answers directly)

---

## Phase 2 — Directory footprint (weeks 2–3)

**Rule for ALL directories:** Name, address, phone (NAP) must be **100% identical**
to the website — `Silbar Security Services Pvt. Ltd.` + Registered Office:
Statesman House, Barakhamba Road, Connaught Place, New Delhi 110001.

Create & fully complete profiles on:

- [ ] **Justdial** — business name + category + photos + reviews
- [ ] **IndiaMART** — supplier profile (security services)
- [ ] **Sulekha** — security services provider listing
- [ ] **TradeIndia** — company profile
- [ ] **LinkedIn** — company page completed: description, logo, employees,
      services, and **weekly founder posts** (AI indexes LinkedIn heavily)
- [ ] **Crunchbase / Tracxn** — company profile (helps AI entity resolution)
- [ ] **YellowPages / India business directories** — 5–10 basic citations
- [ ] **Facebook / Instagram / X** — complete bio with NAP + website link

> Directories like Justdial / IndiaMART are actively scraped by LLMs and Google —
> they are the fastest way to get *external* corroboration.

---

## Phase 3 — Digital PR & third-party mentions (weeks 3–6)

AI engines need **independent sources** that mention the company. Priority order:

- [ ] **2–3 feature articles / founder interviews** with Indian business media:
  YourStory, Inc42, MediaNama, CXOToday, or security-industry trade press.
  Angle: "Pan-India PSARA-licensed security agency, 4 ISO certs, 7,000+ guards,
  19 states" — data-driven, not promotional.
- [ ] **Guest posts** on security / facility-management industry blogs.
- [ ] **Industry award entries / directories** that publish winners (announcements
      get cited by AI).
- [ ] **PR/announcement on LinkedIn company page** for every milestone
  (new office, ISO recertification, 500th client, franchise expansion).

---

## Phase 4 — Content that AI engines can quote (ongoing)

- [ ] Keep the blog running (already 30+ posts — good).
- [ ] Publish answer-first titles: "How much does a security guard cost in India?"
      "PSARA license requirements" etc. — AI answers often quote these.
- [ ] Add FAQ schema on every service page (already present on many).
- [ ] Keep **llms.txt / ai.txt** fresh (already in place — they don't *cause*
      citations, but don't hurt).

---

## Phase 5 — Measure (weeks 8–12)

- [ ] Ask ChatGPT / Perplexity / Gemini: "Who is Silbar Security Services Pvt. Ltd.?"
- [ ] Google `site:silbarsecurity.in` — check indexed count growing.
- [ ] Check Search Console → Pages → Indexing over 60 days.
- [ ] Check whether the new Wikidata item now shows on Google (search the QID).

---

## What the dev team has already done (code side)

- ✅ Removed dead Wikidata `Q140635640` reference from schema (entity doesn't exist).
- ✅ llms.txt / ai.txt served and up to date.
- ✅ robots.txt allows all major AI crawlers (GPTBot, Claude, Perplexity, Google-Extended).
- ✅ Full Organization / LocalBusiness / Service / FAQ / Speakable schema.
- ✅ Fixed future blog dates that were suppressing Google indexing.
- ✅ Sitemap uses stable dates (531 URLs submitted, IndexNow auto-run on deploy).

**Remaining work is 90% off-site** — directories, Wikidata, GBP activity, press,
and LinkedIn posting are the actions that make the company appear in AI answers.
