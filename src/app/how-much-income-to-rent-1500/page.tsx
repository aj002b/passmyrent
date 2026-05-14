import type { Metadata } from "next";
import { SEOLandingPageView } from "@/components/SEOLandingPage";
import { getSEOLandingPage } from "@/lib/seoLandingPages";

const page = getSEOLandingPage("how-much-income-to-rent-1500");

export const metadata: Metadata = {
  title: {
    absolute: page.title,
  },
  description: page.description,
};

export default function HowMuchIncomeToRent1500Page() {
  return <SEOLandingPageView page={page} />;
}
