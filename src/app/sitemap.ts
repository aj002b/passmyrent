import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = "https://rentreadycheck.com";

const routes = [
  { path: "/", priority: 1 },
  { path: "/rent-referencing-calculator", priority: 0.8 },
  { path: "/guarantor-income-calculator", priority: 0.8 },
  { path: "/joint-tenant-affordability-calculator", priority: 0.8 },
  { path: "/move-in-cost-calculator", priority: 0.8 },
  { path: "/rent-split-calculator", priority: 0.8 },
  { path: "/about", priority: 0.5 },
  { path: "/disclaimer", priority: 0.5 },
  { path: "/privacy-policy", priority: 0.5 },
  { path: "/contact", priority: 0.5 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route.path === "/" ? "" : route.path}`,
    lastModified: new Date("2026-05-01"),
    changeFrequency: route.path === "/" ? "weekly" : "monthly",
    priority: route.priority,
  }));
}
