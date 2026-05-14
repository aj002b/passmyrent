export const siteConfig = {
  name: "RentReadyCheck",
  domain:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://rentreadycheck.com",
  contactEmail: "hello@rentreadycheck.com",
  lastUpdated: "May 2026",
  description:
    "Check if you're ready to rent before you apply.",
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
