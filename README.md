# PassMyRentCheck

PassMyRentCheck is a beginner-friendly UK rental affordability calculator site built with Next.js, TypeScript, React, and Tailwind CSS.

The site is fully client-side. There is no database, login, payment flow, external API, or backend.

## Features

- Rent referencing calculator
- Guarantor income calculator
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

The production domain is currently configured as `https://www.passmyrentcheck.co.uk`. Update `src/lib/siteConfig.ts`, `public/CNAME`, sitemap, and DNS settings if the domain changes.

## Editing Calculator Thresholds

Affordability multipliers and shared formatting helpers live in:

```text
src/lib/calculations.ts
```

The common example thresholds are `30x`, `36x`, and `40x` monthly rent.

## Adding A New Calculator

1. Create a new page under `src/app`.
2. Create a client calculator component under `src/components/calculators`.
3. Reuse `InputField`, `SelectField`, `ResultCard`, `FAQSection`, `FAQJsonLd`, `DisclaimerBox`, `AdPlaceholder`, and `RelatedTools`.
4. Add the new calculator to `src/lib/site.ts`.
5. Add the public route to `src/lib/siteConfig.ts` so it appears in the sitemap.

## Important Disclaimer

The calculators give rough estimates only. Actual referencing decisions can depend on credit history, employment status, landlord requirements, letting agent rules, savings, guarantors, and other factors.
