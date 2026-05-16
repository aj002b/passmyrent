import type { Metadata } from "next";
import Link from "next/link";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { RelatedTools } from "@/components/RelatedTools";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the RentReadyCheck privacy policy, including how calculator inputs are handled and future analytics or advertising cookie use.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <section className="max-w-3xl">
        <p className="text-sm font-bold text-[#0E5F67]">
          Last updated: {siteConfig.lastUpdated}
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-[#0B2F35]">
          Privacy Policy
        </h1>
        <p className="mt-4 text-lg leading-8 text-[#5D6D75]">
          RentReadyCheck is an informational calculator website for renters.
          This page explains how the site is intended to handle calculator inputs
          and privacy-related questions.
        </p>
      </section>

      <section className="prose prose-slate max-w-none space-y-8">
        <div>
          <h2>No account required</h2>
          <p>
            Users do not need to create an account, log in, or provide a profile to
            use RentReadyCheck. The calculators are designed to be simple estimate
            tools that work directly in the browser.
          </p>
        </div>
        <div>
          <h2>Calculator inputs</h2>
          <p>
            Calculator inputs are processed in the browser. RentReadyCheck does not
            intentionally store calculator inputs, and the site does not use a
            database for calculator results.
          </p>
        </div>
        <AdPlaceholder />
        <div>
          <h2>Cookies and future services</h2>
          <p>
            The site may use analytics and advertising cookies in the future to
            understand usage and support the running of the website. If those tools
            are added, this policy should be updated to explain what is used and why.
          </p>
        </div>
        <div>
          <h2>Privacy questions</h2>
          <p>
            Users can contact the site owner with privacy questions through the{" "}
            <Link href="/contact">Contact page</Link>. Please do not send sensitive
            financial, legal, or referencing documents unless specifically requested
            by an appropriate professional or agency.
          </p>
        </div>
      </section>

      <RelatedTools />
    </div>
  );
}
