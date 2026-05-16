import type { Metadata } from "next";
import Link from "next/link";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { RelatedTools } from "@/components/RelatedTools";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact RentReadyCheck for website questions. The site cannot provide individual financial, legal, tax, housing, or referencing advice.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <section className="max-w-3xl">
        <p className="text-sm font-bold text-[#0E5F67]">
          Last updated: {siteConfig.lastUpdated}
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-[#0B2F35]">
          Contact
        </h1>
        <p className="mt-4 text-lg leading-8 text-[#5D6D75]">
          Have a question about RentReadyCheck or spotted something on the site
          that needs attention? You can use the placeholder contact email below.
        </p>
      </section>

      <section className="rounded-xl border border-[#D7E5EA] bg-white p-6 shadow-[0_10px_28px_rgba(11,47,53,0.05)]">
        <h2 className="text-2xl font-bold text-[#0B2F35]">Email</h2>
        <p className="mt-3 text-lg font-semibold text-[#0E5F67]">
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
        </p>
        <p className="mt-4 max-w-3xl leading-7 text-[#5D6D75]">
          RentReadyCheck cannot provide individual financial, legal, tax,
          housing, or referencing advice. For questions about a specific rental
          application, please speak directly with the landlord, agent, property
          manager, referencing provider, or a qualified adviser.
        </p>
      </section>

      <DisclaimerBox>
        The calculators on this site are rough estimate tools only. They do not
        guarantee approval and should not be treated as financial, legal, tax,
        housing, or referencing advice.
      </DisclaimerBox>

      <section className="prose prose-slate max-w-none">
        <h2>Useful next step</h2>
        <p>
          If your question is about how the site handles calculator inputs, read the{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
      </section>

      <RelatedTools />
    </div>
  );
}
