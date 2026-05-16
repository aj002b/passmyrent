import type { Metadata } from "next";
import Link from "next/link";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FAQJsonLd } from "@/components/FAQJsonLd";
import { FAQSection } from "@/components/FAQSection";
import { RelatedTools } from "@/components/RelatedTools";
import { MoveInCostCalculator } from "@/components/calculators/MoveInCostCalculator";
import type { FAQItem } from "@/lib/site";

export const metadata: Metadata = {
  title: "Move-In Cost Calculator",
  description:
    "Estimate rental move-in costs by country, including deposit, first rent payment, fees, moving costs, furniture, and setup costs.",
};

const faqs: FAQItem[] = [
  { question: "What costs do renters usually pay before moving in?", answer: "Common upfront costs include a deposit or bond, first rent payment, application or holding fees, moving costs, furniture, and utility or broadband setup." },
  { question: "How is a rental deposit calculated?", answer: "Deposits may be a fixed amount, a number of weeks of rent, or a number of months of rent depending on the country and property." },
  { question: "Is first rent always paid upfront?", answer: "Often yes, but timing can vary. Confirm with the landlord, agent, or property manager before budgeting." },
  { question: "Can holding or application fees be deducted from move-in costs?", answer: "Sometimes a fee or holding payment is put toward rent or deposit, but treatment can vary. Ask how it will be handled." },
  { question: "Does this include every moving cost?", answer: "No. It is a planning estimate, so you may still need to add storage, cleaning, insurance, travel, or other personal costs." },
];

export default function MoveInCostPage() {
  return (
    <>
      <FAQJsonLd items={faqs} />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        <section className="max-w-3xl">
          <p className="text-sm font-bold text-[#0E5F67]">Last updated: May 2026</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-[#0B2F35]">
            Move-In Cost Calculator
          </h1>
          <p className="mt-4 text-lg leading-8 text-[#5D6D75]">
            Estimate the deposit, first month&apos;s rent, and other upfront costs you
            may need before moving into a rental property.
          </p>
        </section>
        <MoveInCostCalculator />
        <section className="prose prose-slate max-w-none space-y-8">
          <div>
            <h2>What costs do renters pay before moving in?</h2>
            <p>
              Before move-in, renters often need enough cash for the tenancy deposit,
              first rent payment, possible fees or holding payments, and practical moving
              costs. If affordability is your first question, start with the{" "}
              <Link href="/rent-referencing-calculator">rent affordability calculator</Link>.
            </p>
          </div>
          <div>
            <h2>How rental deposits, bonds, or security deposits are calculated</h2>
            <p>
              Depending on where you rent, upfront deposits may be described as
              fixed amounts, weeks of rent, or months of rent. This calculator lets
              you choose the deposit type so the estimate better matches your area.
            </p>
          </div>
          <AdPlaceholder />
          <div>
            <h2>Why upfront costs can be higher than expected</h2>
            <p>
              A property that looks affordable month to month may still need a large
              amount upfront. Moving van costs, basic furniture, broadband setup, and
              overlap between homes can all add pressure.
            </p>
          </div>
          <div>
            <h2>Planning with flatmates</h2>
            <p>
              If you are moving with other people, decide early how you will divide
              rent and shared costs. The{" "}
              <Link href="/rent-split-calculator">rent split calculator</Link> can
              help compare fair options.
            </p>
          </div>
        </section>
        <FAQSection items={faqs} />
        <DisclaimerBox />
        <RelatedTools currentPath="/move-in-cost-calculator" />
      </div>
    </>
  );
}
