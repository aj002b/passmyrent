import type { Metadata } from "next";
import Link from "next/link";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { RelatedTools } from "@/components/RelatedTools";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about PassMyRentCheck, a free UK rental estimate tool site for affordability, guarantor, move-in cost, and rent split calculations.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <section className="max-w-3xl">
        <p className="text-sm font-bold text-[#d9654f]">Last updated: May 2026</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-[#17312b]">
          About PassMyRentCheck
        </h1>
        <p className="mt-4 text-lg leading-8 text-[#5f746f]">
          PassMyRentCheck is a free tool site for UK renters who want a clearer
          rough estimate before applying for a rental property.
        </p>
      </section>
      <section className="prose prose-slate max-w-none space-y-8">
        <div>
          <h2>What the site helps with</h2>
          <p>
            The calculators help estimate rent affordability, guarantor income,
            joint tenant affordability, upfront move-in costs, and fair rent splits.
            A good place to begin is the{" "}
            <Link href="/rent-referencing-calculator">rent referencing calculator</Link>.
          </p>
        </div>
        <div>
          <h2>What the site does not do</h2>
          <p>
            PassMyRentCheck does not provide financial, legal, or referencing
            advice. It does not guarantee that a landlord or letting agent will
            approve an application.
          </p>
        </div>
        <AdPlaceholder />
        <div>
          <h2>Why the tools are estimates</h2>
          <p>
            Letting agents, landlords, and referencing companies can all use
            different rules. Income is only one part of the picture, and individual
            circumstances matter.
          </p>
        </div>
        <div>
          <h2>Always confirm requirements</h2>
          <p>
            Before applying, ask the landlord or letting agent which income multiple,
            guarantor rules, deposit amount, and documents they require.
          </p>
        </div>
      </section>
      <DisclaimerBox />
      <RelatedTools />
    </div>
  );
}
