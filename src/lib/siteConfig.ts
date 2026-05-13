export const siteConfig = {
  name: "PassMyRentCheck",
  domain:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.passmyrentcheck.co.uk",
  contactEmail: "hello@passmyrentcheck.co.uk",
  lastUpdated: "May 2026",
  description:
    "Free UK rent affordability, guarantor income, move-in cost, and rent split calculators for renters.",
};

export const publicRoutes = [
  "/",
  "/rent-referencing-calculator",
  "/guarantor-income-calculator",
  "/joint-tenant-affordability-calculator",
  "/move-in-cost-calculator",
  "/rent-split-calculator",
  "/about",
  "/disclaimer",
  "/privacy-policy",
  "/contact",
] as const;
