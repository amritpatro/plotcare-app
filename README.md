# PlotCare

PlotCare is a Next.js project for land intelligence and land activation. It is designed for owners of idle land who need a clear, trustworthy way to understand what their plot can become before leasing, farming, or production activity begins.

## What The Product Does

- Captures landowner, farmer, and investor interest.
- Explains land activation opportunities such as mushroom cultivation, aquaculture, solar leasing, nursery/herbs, sericulture, beekeeping, and traditional crop matching.
- Shows required conditions like minimum land, temperature, humidity, water access, shade, road access, and partner availability.
- Demonstrates a land locator, land report preview, verified partner flow, and revenue tracking dashboard.
- Keeps the product careful about trust: no guaranteed income claims, suitability before activation, and verification before partner matching.

## Project Workflow

1. Landowner shares plot location, size, water access, road access, and current condition.
2. PlotCare prepares a suitability-first land report.
3. Farmer or operator partners are matched only after verification and use-case fit.
4. Revenue activity is tracked through a dashboard-style owner view.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) while the terminal is running.

## GitHub Pages

This repo includes two Pages-friendly paths:

- `index.html` at the repo root is a polished public project preview for the current **Deploy from branch** Pages setup.
- `.github/workflows/pages.yml` builds the real Next.js app as a static export when Pages is switched to **GitHub Actions**.

To publish the full Next.js app, open **Settings > Pages** in GitHub and set **Build and deployment > Source** to **GitHub Actions**. The workflow builds the static `out` folder with:

- `NEXT_PUBLIC_STATIC_EXPORT=true`
- `PAGES_BASE_PATH=/plotcare-app`

Server features such as `/api/leads` and `/api/ai` do not run on GitHub Pages. For production submissions, connect `NEXT_PUBLIC_LEADS_ENDPOINT` and `NEXT_PUBLIC_AI_ENDPOINT` to external services.

## Checks

```bash
npm run lint
npm run build
```
