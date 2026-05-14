# RentReadyCheck

RentReadyCheck is a beginner-friendly rent affordability calculator site built with Next.js, TypeScript, React, and Tailwind CSS.

The site is fully client-side. There is no database, login, payment flow, external API, or backend.

## Features

- Country-aware rent affordability calculator for the United Kingdom, United States, Canada, and Australia
- Guarantor / co-signer income calculator
- Joint tenant affordability calculator
- Move-in cost calculator
- Rent split calculator
- About, Disclaimer, Privacy Policy, and Contact pages
- FAQ JSON-LD, sitemap, robots, Open Graph metadata, and custom 404 page
- Static export support for GitHub Pages

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

The project is configured with `output: "export"`, so the static site is generated in the `out` folder.
The `start` script serves that exported folder locally for a quick production preview.

## GitHub Pages Deployment

This repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

To deploy:

1. Push the project to GitHub.
2. In the GitHub repo, go to `Settings` -> `Pages`.
3. Set the source to `GitHub Actions`.
4. Push to the `main` branch.

The workflow runs `npm ci`, builds the static site, and deploys the `out` folder.

The GitHub Pages workflow is configured for the production domain:

```text
https://rentreadycheck.com
```

The custom domain is stored in `public/CNAME`. If you deploy to a different domain later, update `public/CNAME`, `NEXT_PUBLIC_SITE_URL` in `.github/workflows/deploy.yml`, and the domain fallback in `src/lib/siteConfig.ts`.

## Editing Calculator Thresholds

Country settings, affordability thresholds, and shared formatting helpers live in:

```text
src/lib/countries.ts
src/lib/calculations.ts
```

Update `src/lib/countries.ts` when you want to change country wording, currencies, or common example thresholds. Update `src/lib/calculations.ts` when you want to change formulas.

## Adding A New Calculator

1. Create a new page under `src/app`.
2. Create a client calculator component under `src/components/calculators`.
3. Reuse `InputField`, `SelectField`, `ResultCard`, `FAQSection`, `FAQJsonLd`, `DisclaimerBox`, `AdPlaceholder`, and `RelatedTools`.
4. Add the new calculator to `src/lib/site.ts`.
5. Add the public route to `src/lib/siteConfig.ts` so it appears in the sitemap.

## Important Disclaimer

The calculators give rough estimates only. Actual rental decisions can depend on credit history, employment status, landlord requirements, property manager rules, savings, guarantors or co-signers, and other factors.
