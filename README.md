# ZDR Chat Landing Page

The public-facing landing page for [ZDR Chat](https://zdr.chat) — a serene, modern, privacy-first chat app with blog, docs, and SEO optimization.

**Stack:** Astro 6 · Tailwind CSS v4 · MDX · Cloudflare Pages  
**Domain:** [zdr.chat](https://zdr.chat)  
**App:** [app.zdr.chat](https://app.zdr.chat)

## Brand Positioning

**Core message:** Private AI shouldn't require a trust fund or a data sacrifice.

- The app is free. The hosting costs us ~$0/month.
- The only cost is what you pay OpenRouter for tokens — no markup, no subscription, no data mining.
- We're not affiliated with OpenRouter. Independent frontend, built for privacy advocacy, not profit.

## Pricing Philosophy

- **Not affiliated with OpenRouter** — independent frontend, no commissions, no referral fees
- **No monetization** — static PWA, zero server costs, zero incentive to track or sell data
- **Pay OpenRouter directly** — every cent goes to compute, not to us
- **Cost transparency** — status bar shows session cost and remaining credit in real time
- **Start with $1** — as little as $1 in OpenRouter credit lasts a light user weeks

## Content

### Blog Posts

| Slug | Topic |
|------|-------|
| `what-is-zdr-chat` | Intro to the app, problem/solution, how ZDR works |
| `why-bring-your-own-key` | BYOK privacy benefits, cost transparency, no lock-in |
| `zero-data-retention-explained` | Three layers of ZDR (account, guardrail, request) |
| `privacy-isnt-free` | "Free" apps monetize data. ZDR Chat is transparent about costs. |
| `what-a-dollar-gets-you` | Concrete examples of $1 buying power across model tiers |
| `costs-us-next-to-nothing` | Static PWA economics — zero server costs, zero incentive to monetize |
| `agentic-coding-burns-tokens` | Why coding tools cost more, and how to keep conversational chat cheap |

## 🚀 Project Structure

```
src/
├── components/    — Astro components (Header, Footer, Hero, FeatureCard, HowItWorks, PricingSection, etc.)
├── layouts/       — Page layouts (BaseLayout, BlogLayout, DocLayout)
├── pages/         — Route pages (/, /blog, /blog/[slug], /docs, /docs/[slug], /privacy, /404)
├── content/       — Content collections
│   ├── blog/      — Blog posts (MDX)
│   └── docs/      — Documentation pages (MDX)
└── styles/        — Global CSS with Tailwind v4
```

## 🧞 Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build for production to `dist/` |
| `npm run preview` | Preview production build |
| `npm run astro` | Run Astro CLI commands |

## 📄 Pages

- `/` — Landing page (hero, features, pricing section, how it works, privacy pledge, CTA)
- `/blog/` — Blog listing with cards
- `/blog/[slug]` — Individual blog posts
- `/docs/` — Docs overview
- `/docs/[slug]` — Individual docs pages (with sidebar)
- `/privacy/` — Privacy & data handling page
- `/404` — Custom 404 page

## 🌐 Deployment

The site is deployed to **Cloudflare Pages** via GitHub integration — push to `main` triggers an automatic build and deploy. No manual wrangler commands or GitHub Actions workflows needed.

## 🔒 Privacy

This site uses **zero tracking** — no analytics, no scripts, no third-party embeds. Consistent with the ZDR Chat philosophy.