import type { Metadata } from "next";
import { SEOLandingPageView } from "@/components/SEOLandingPage";
import { getSEOLandingPage } from "@/lib/seoLandingPages";

const page = getSEOLandingPage("canada-rent-affordability-calculator");

export const metadata: Metadata = {
  title: {
    absolute: page.title,
  },
  description: page.description,
};

export default function CanadaRentAffordabilityCalculatorPage() {
  return <SEOLandingPageView page={page} />;
}
