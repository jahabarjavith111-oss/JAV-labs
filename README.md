# Abdul Javid J. — Freelance Developer Website

Premium, conversion-focused personal website for **Abdul Javid J.** — independent developer building business websites, full-stack web applications, AI-powered products, and SaaS MVPs for international clients.

**Core message:** _I turn ideas into digital products that help businesses grow._

## Tech stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (design tokens in `app/globals.css`)
- **lucide-react** icons (+ inline SVGs for brand marks)
- Fonts: **Inter** + **Space Grotesk** via `next/font` (self-hosted)
- **Gmail SMTP** via **nodemailer** (Google App Password) for contact delivery — free
- No database, no authentication, no paid dependencies

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000
```

Other commands:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

## Configuration

All editable content lives in `lib/`:

| File | Controls |
|---|---|
| `lib/site-config.ts` | Name, role, tagline, **email**, LinkedIn link, **site URL** |
| `lib/navigation.ts` | Header + footer links |
| `lib/services.ts` | All service descriptions (homepage previews the first 4) |
| `lib/projects.ts` | The 3 case studies: TXNORYX, VERIDEX, CiVIQ |
| `lib/pricing.ts` | Pricing copy (no published prices — custom quotes) |
| `lib/faqs.ts` | FAQ questions/answers |
| `lib/process.ts` | The 6-step process |

### Environment variables (`.env.local`)

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=jav.digitalstudio2026@gmail.com
SMTP_PASS=               # 16-character Google App Password
CONTACT_NOTIFY_EMAIL=jav.digitalstudio2026@gmail.com
NEXT_PUBLIC_SITE_URL=    # e.g. https://your-domain.com (no trailing slash)
GROQ_API_KEY=            # optional — powers the AI site chat (free at console.groq.com)
```

> ⚠️ Until `SMTP_PASS` is set, the contact form honestly tells the visitor the message was **not** sent and offers a prefilled `mailto:` fallback. It never fakes success.

## AI chat assistant ("Ask JAV")

A floating chat widget (bottom-right, every page) answers visitors about services, pricing, process, and projects — grounded in the site's real content with the same honesty rules (no invented claims or prices; contact via form, email, or the studio's WhatsApp, which is shared only inside the chat).

- **With `GROQ_API_KEY` set:** replies come from Groq's Llama 3.3 70B (free tier), grounded via a system prompt built from `lib/services.ts`, `lib/process.ts`, `lib/projects.ts`, and `lib/faqs.ts`.
- **Without a key (or if Groq fails):** a built-in scripted assistant answers the same questions from the same content — the chat never breaks.

Setup: get a free key at <https://console.groq.com> (API Keys), add `GROQ_API_KEY` in Vercel → Settings → Environment Variables, and redeploy. The key is only read server-side in `app/api/chat/route.ts` (with per-IP rate limiting).

## Contact form setup (Gmail SMTP)

Every submission sends **two emails** (JAV logo embedded in both):

1. **Notification to you** — full client details and message, with reply-to set to the client so you can answer with one click.
2. **Automatic reply to the client** — thank-you email with a summary of their inquiry.

Setup:

1. Enable **2-Step Verification** on the Google account `jav.digitalstudio2026@gmail.com`.
2. Create a **Google App Password** at <https://myaccount.google.com/apppasswords> (name it, e.g., "portfolio website").
3. Put the 16-character password in `.env.local` locally, and in your hosting provider's environment settings in production (never commit it — `.env*` is gitignored).
4. Test a real submission from a device before announcing the site.

The password is only read server-side in `app/api/contact/route.ts`. Spam is mitigated with a honeypot field + server-side validation.

## Deploy (free)

**Vercel (recommended):**

1. Push this folder to a GitHub repository.
2. Import it at <https://vercel.com/new>.
3. Add the environment variables above in **Project → Settings → Environment Variables**.
4. Deploy. Update `NEXT_PUBLIC_SITE_URL` to the final URL (custom domain optional, buy one only when you can afford it).

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## Project structure

```
app/
  page.tsx                 # Homepage (hero, approach, services, work,
                           #   process, pricing, FAQ, final CTA)
  layout.tsx               # Fonts, metadata, navbar, footer
  services/page.tsx        # 8 detailed services
  work/page.tsx            # Portfolio grid
  work/[slug]/page.tsx     # Case studies: txnoryx | veridex | civiq
  about/page.tsx           # Story, experience, technical capabilities
  contact/page.tsx         # Project inquiry (Gmail SMTP)
  privacy/page.tsx         # Privacy policy
  terms/page.tsx           # Terms & conditions
  not-found.tsx            # 404
  api/contact/route.ts     # Contact form endpoint
  sitemap.ts  robots.ts    # SEO
  icon.svg  opengraph-image.tsx
components/
  layout/    navbar, footer
  home/      hero, approach, services-preview, featured-projects,
             process-preview, pricing, faq, final-cta
  shared/    button, section-heading, page-header, service-card,
             project-card, project-image, faq, social-icons
  contact/   contact-form
lib/         site-config, navigation, services, projects,
             pricing, faqs, process, validation
```

## Adding screenshots (Phase 2 prep)

Drop images into `public/images/projects/` and reference them in `lib/projects.ts`:

```ts
images: [
  { src: "/images/projects/txnoryx.png", alt: "TXNORYX risk dashboard" },
  { src: "/images/projects/txnoryx-2.png", alt: "TXNORYX recovery workflow" },
]
```

Until then, every image area shows an honest, clearly labeled slot — no fake screenshots.

- Portrait photo: `public/images/photo.jpg` (used on `/about`)

## Before you publish — checklist

- [ ] Create the Google App Password and test a real form submission
- [ ] Replace/confirm the contact email in `lib/site-config.ts`
- [ ] Set `NEXT_PUBLIC_SITE_URL` for the final domain
- [ ] Add real screenshots for TXNORYX, VERIDEX, CiVIQ
- [ ] Review `privacy/page.tsx` and `terms/page.tsx` for your situation
- [ ] Verify every route on mobile and desktop
- [ ] Deploy and verify the live site
