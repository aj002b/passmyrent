import type { Metadata } from "next";
import { SEOLandingPageView } from "@/components/SEOLandingPage";
import { getSEOLandingPage } from "@/lib/seoLandingPages";

const page = getSEOLandingPage("what-is-30-times-rent");

export const metadata: Metadata = {
  title: {
    absolute: page.title,
  },
  description: page.description,
};

export default function WhatIs30TimesRentPage() {
  return <SEOLandingPageView page={page} />;
}
