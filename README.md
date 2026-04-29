# PlotCare

PlotCare is a Next.js app for the PlotCare land intelligence and activation landing page.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## GitHub Pages

This repo includes a GitHub Actions workflow at `.github/workflows/pages.yml`.

On GitHub, open **Settings > Pages** and set **Build and deployment > Source** to **GitHub Actions**. Every push to `master` will build a static export and deploy the `out` folder to Pages.

The GitHub Pages build sets:

- `NEXT_PUBLIC_STATIC_EXPORT=true`
- `PAGES_BASE_PATH=/plotcare-app`

The static export keeps the visual site working on Pages. Server features such as `/api/leads` and `/api/ai` do not run on GitHub Pages; connect `NEXT_PUBLIC_LEADS_ENDPOINT` and `NEXT_PUBLIC_AI_ENDPOINT` to external services if those forms need to submit from the static site.

## Checks

```bash
npm run lint
npm run build
```
