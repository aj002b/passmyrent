import type { MetadataRoute } from "next";
import { publicRoutes, siteConfig } from "@/lib/siteConfig";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${siteConfig.domain}${route === "/" ? "" : route}`,
    lastModified: new Date("2026-05-01"),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
