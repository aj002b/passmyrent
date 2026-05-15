import type { Metadata } from "next";
import { SEOLandingPageView } from "@/components/SEOLandingPage";
import { getSEOLandingPage } from "@/lib/seoLandingPages";

const page = getSEOLandingPage("rent-affordability-calculator-rest-of-world");

export const metadata: Metadata = {
  title: {
    absolute: page.title,
  },
  description: page.description,
};

export default function RestOfWorldRentAffordabilityCalculatorPage() {
  return <SEOLandingPageView page={page} />;
}
