import type { Metadata } from "next";
import { SEOLandingPageView } from "@/components/SEOLandingPage";
import { getSEOLandingPage } from "@/lib/seoLandingPages";

const page = getSEOLandingPage("how-much-should-i-save-before-moving-out");

export const metadata: Metadata = {
  title: {
    absolute: page.title,
  },
  description: page.description,
};

export default function HowMuchShouldISaveBeforeMovingOutPage() {
  return <SEOLandingPageView page={page} />;
}
