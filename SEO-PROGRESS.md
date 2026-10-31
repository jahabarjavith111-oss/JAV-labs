# SEO Progress — JAV Digital Engineering Studio

Live site: https://jav-labs.vercel.app
Last updated: 2026-10-31

## Keyword strategy (added 2026-10-31)

Primary target queries (chosen from what clients actually search):
"freelance web developer", "hire full stack developer", "freelance developer
India", "CRM development / custom CRM software", "SaaS MVP development",
"AI application development", "business website development".

Applied across the site — naturally, no keyword stuffing:

- Titles: homepage → "JAV Digital Engineering Studio — Freelance Web, CRM &
  AI Developer"; /services → "Web & App Development Services"; /work →
  "Work — Web, CRM & AI Case Studies"; /about → "About — Freelance
  Developer"; /contact → "Contact — Hire a Developer"
- Hero copy lists all five service keywords; footer blurb now includes CRM
- FAQ expanded 11 → 14 questions: "Are you a freelancer or an agency?",
  "What technologies do you build with?", "How do I hire you for a project?"
  (these mirror real search queries; FAQPage schema updates automatically)
- Organization schema enriched: keywords, areaServed (US/UK/CA/AU/UAE/IN),
  hasOfferCatalog listing all four services; founder job title "Freelance
  Software Developer"
- Share card subtitle: "Abdul Javid J. · Freelance Web, CRM & AI Developer"

## Technical SEO status (ALL DONE ✅)

- [x] Google site verification — file `public/googled4f91345db5e353e.html` + meta tag
- [x] Sitemap — 10 URLs, processed by Google ✅
- [x] robots.txt — allows all, references sitemap
- [x] Canonical URLs — all 10 pages, og:url matches canonical on every page
- [x] Unique titles + meta descriptions — every page
- [x] `index, follow` on every page — verified live
- [x] JSON-LD — Organization + WebSite + FAQPage (11 questions)
- [x] OG/Twitter share cards — dynamic 1200×630 branded card
- [x] Apple touch icon — 180×180
- [x] Internal linking — 0 broken links, all pages reachable
- [x] Production build + ESLint — clean

## Google Search Console — manual indexing progress

Homepage already indexed. Daily manual-request quota resets ~24h after it is hit
(reported reset around midnight Pacific ≈ 1:30 PM IST next day).

| # | URL | Status |
|---|-----|--------|
| 1 | https://jav-labs.vercel.app/ | ✅ Indexed |
| 2 | https://jav-labs.vercel.app/services | ✅ Indexing requested (2026-10-31) |
| 3 | https://jav-labs.vercel.app/work | ⏳ Pending — quota exceeded |
| 4 | https://jav-labs.vercel.app/work/txnoryx | ⏳ Pending — quota exceeded |
| 5 | https://jav-labs.vercel.app/work/veridex | ⏳ Pending — quota exceeded |
| 6 | https://jav-labs.vercel.app/work/civiq | ⏳ Pending — quota exceeded |
| 7 | https://jav-labs.vercel.app/about | ⏳ Pending — quota exceeded |
| 8 | https://jav-labs.vercel.app/contact | ⏳ Pending — quota exceeded |

(`/privacy` and `/terms` are in the sitemap and will be picked up automatically —
no manual request needed for those.)

### To continue (after quota resets)

1. Open Google Search Console → paste a pending URL in the top search bar → **Inspect**
2. When it loads: click **Request indexing** (once per URL, only if eligible)
3. Move to the next URL. If quota hits again, stop and retry later — do not spam
4. Check **Pages** report in a few days — indexed count should climb toward 10

## Bing / DuckDuckGo / Yandex — IndexNow (instant submission)

All 10 URLs were submitted on 2026-10-31 via the IndexNow API — Bing et al.
crawl them within hours, no quota involved.

- API key: `6b71439dea5f43cc91ead56ff581d826`
- Key file (must stay hosted forever): `public/6b71439dea5f43cc91ead56ff581d826.txt`
  → live at https://jav-labs.vercel.app/6b71439dea5f43cc91ead56ff581d826.txt

### Re-submit after future content changes

PowerShell (run from repo root after deploying):

```powershell
$body = @{
  host         = "jav-labs.vercel.app"
  key          = "6b71439dea5f43cc91ead56ff581d826"
  keyLocation  = "https://jav-labs.vercel.app/6b71439dea5f43cc91ead56ff581d826.txt"
  urlList      = @(
    "https://jav-labs.vercel.app/",
    "https://jav-labs.vercel.app/services",
    "https://jav-labs.vercel.app/work",
    "https://jav-labs.vercel.app/about",
    "https://jav-labs.vercel.app/contact",
    "https://jav-labs.vercel.app/privacy",
    "https://jav-labs.vercel.app/terms",
    "https://jav-labs.vercel.app/work/txnoryx",
    "https://jav-labs.vercel.app/work/veridex",
    "https://jav-labs.vercel.app/work/civiq"
  )
} | ConvertTo-Json -Depth 4
Invoke-RestMethod -Uri "https://api.indexnow.org/indexnow" -Method Post `
  -ContentType "application/json; charset=utf-8" -Body $body
```

`200` = accepted, `202` = received (key verification pending) — both are success.

## Optional next steps (not urgent)

- Set up **Bing Webmaster Tools** (free) — it also surfaces crawl errors and, since
  IndexNow is already configured, keeps URL submissions automatic
- Build backlinks (LinkedIn posts, directories) — authority is what moves rankings
  after technical SEO is complete
- If a custom domain is ever bought: set `NEXT_PUBLIC_SITE_URL` env var in Vercel,
  then re-verify the property in GSC under the new domain
