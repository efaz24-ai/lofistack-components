# LofiStack Components

My component gallery for the **LofiStack 90 Day Build Challenge** (Track A).

**Live site:** https://efaz24-ai.github.io/lofistack-components/

| Week | Type | Component | Live |
|---|---|---|---|
| 01 | button | Glass Button | [/components/glass-button](https://efaz24-ai.github.io/lofistack-components/components/glass-button/) |
| 01 | card | Animated Pricing Card | [/components/pricing-card](https://efaz24-ai.github.io/lofistack-components/components/pricing-card/) |

## Stack

Next.js (App Router, static export) · TypeScript · Tailwind CSS v4 · GitHub Pages (deployed by GitHub Actions on every push to `main`).

## Adding a component

1. Put the component in `src/components/ui/MyThing.tsx` (typed props, no hardcoded content).
2. Put an interactive demo in `src/components/demos/MyThingDemo.tsx`.
3. Add an entry to `src/lib/registry.ts` and map the demo in `src/app/components/[slug]/page.tsx`.
4. Push to `main` — the page appears at `/components/<slug>/`.

## Run locally

```bash
npm install
npm run dev
```
