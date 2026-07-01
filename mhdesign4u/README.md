# mhdesign4u — Studio Website

Premium glassmorphism agency site for **mhdesign4u** (Bangalore, est. 2018).
Built with Next.js App Router, vanilla CSS Modules, GSAP, and Lenis smooth
scroll.

## Stack

- **Next.js 14** (App Router)
- **Vanilla CSS Modules** — no Tailwind, no CSS-in-JS runtime
- **GSAP** — kinetic typography, 3D tilt cards, PRIS-M orb, numeric ticker
- **Lenis** — smooth scroll, synced to GSAP's ScrollTrigger

## Project structure

```
app/
  globals.css              design tokens, glass panel, ambient orbs
  layout.js                root shell: cursor, orb field, navbar
  page.js / page.module.css              landing page
  about/                    brand narrative + PRIS-M viewport
  sectors/                  3D tilt sector grid
  services/[slug]/          dynamic service detail template
  calculator/                pricing/scope calculator with GSAP ticker
  components/
    SmoothScrollProvider.jsx     Lenis + GSAP ticker sync
    CustomCursor.jsx             magnetic cursor
    PrismOrb.jsx                  brand character
    TiltCard.jsx                  3D mouse-tilt card
    Navbar.jsx
  lib/
    servicesData.js          single source of truth for services & sectors
```

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Push to GitHub

```bash
cd mhdesign4u
git init
git add .
git commit -m "Initial commit — mhdesign4u studio site"
git branch -M main
git remote add origin https://github.com/<your-username>/mhdesign4u.git
git push -u origin main
```

## Deploy on Vercel

**Option A — Dashboard**
1. Go to vercel.com → **Add New → Project**.
2. Import the `mhdesign4u` GitHub repo.
3. Framework preset: Vercel auto-detects **Next.js** — leave defaults.
4. Click **Deploy**. You'll have a live `*.vercel.app` URL in under a minute.
5. Add your custom domain under **Project → Settings → Domains**.

**Option B — CLI**
```bash
npm i -g vercel
vercel login
vercel        # preview deploy
vercel --prod # production deploy
```

Every subsequent `git push` to `main` triggers an automatic production
deploy; pushes to other branches get their own preview URL.

## Notes for production

- Swap the `mailto:` action in `/calculator` for a real form handler
  (e.g. a Route Handler in `app/api/estimate/route.js`) once you have
  a backend or a service like Resend/Formspree wired up.
- `metadataBase` in `app/layout.js` is set to `https://mhdesign4u.com`
  — update it to your actual production domain before launch.
- Google Fonts are loaded via `@import` in `globals.css` for simplicity;
  swap to `next/font/google` before launch for better performance
  (zero layout shift, self-hosted fonts, no external request).
