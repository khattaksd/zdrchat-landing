# ZDR Chat Landing Page

The public-facing landing page for [ZDR Chat](https://zdr.chat) — a serene, modern, privacy-first chat app with blog, docs, and SEO optimization.

**Stack:** Astro 6 · Tailwind CSS v4 · MDX · Cloudflare Pages  
**Domain:** [zdr.chat](https://zdr.chat)  
**App:** [app.zdr.chat](https://app.zdr.chat)

## 🚀 Project Structure

```
src/
├── components/    — Astro components (Header, Footer, Hero, FeatureCard, etc.)
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

- `/` — Landing page (hero, features, how it works, CTA)
- `/blog/` — Blog listing with cards
- `/blog/[slug]` — Individual blog posts
- `/docs/` — Docs overview
- `/docs/[slug]` — Individual docs pages (with sidebar)
- `/privacy/` — Privacy & data handling page
- `/404` — Custom 404 page

## 🌐 Deployment

The site is deployed to **Cloudflare Pages**. The build output goes to `dist/`.

### Setup

1. Connect the GitHub repo to Cloudflare Pages
2. Set **Build command** to `npm run build`
3. Set **Build output** to `dist/`
4. Add custom domain `zdr.chat` in Cloudflare dashboard

## 🔒 Privacy

This site uses **zero tracking** — no analytics, no scripts, no third-party embeds. Consistent with the ZDR Chat philosophy.