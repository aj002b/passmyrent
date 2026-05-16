import type { Metadata } from "next";
import Link from "next/link";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FAQJsonLd } from "@/components/FAQJsonLd";
import { FAQSection } from "@/components/FAQSection";
import { RelatedTools } from "@/components/RelatedTools";
import { RentSplitCalculator } from "@/components/calculators/RentSplitCalculator";
import type { FAQItem } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rent Split Calculator | Equal, Income-Based & Room Size Split",
  description:
    "Split monthly rent equally, by tenant income, or by room size score for 2, 3, or 4 tenants.",
};

const faqs: FAQItem[] = [
  { question: "What is the fairest way to split rent?", answer: "There is no single fair method. Equal splits are simple, income-based splits consider ability to pay, and room-size splits reflect bedroom differences." },
  { question: "How does an income-based rent split work?", answer: "Each tenant pays a share based on their share of total household income, so higher earners pay more." },
  { question: "How does a room-size split work?", answer: "Each room gets a score, such as 1 for small, 1.25 for medium, and 1.5 for large. Rent is split by those scores." },
  { question: "Should bills be split the same way as rent?", answer: "Some households split bills equally even when rent is split differently. Agree this clearly before moving in." },
  { question: "Can this calculator settle a disagreement?", answer: "It can show options, but flatmates still need to agree what feels fair for their situation." },
];

export default function RentSplitPage() {
  return (
    <>
      <FAQJsonLd items={faqs} />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        <section className="max-w-3xl">
          <p className="text-sm font-bold text-[#0E5F67]">Last updated: May 2026</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-[#0B2F35]">
            Rent split calculator
          </h1>
          <p className="mt-4 text-lg leading-8 text-[#5D6D75]">
            Compare equal, income-based, and room-size rent splits for two, three,
            or four tenants.
          </p>
        </section>
        <RentSplitCalculator />
        <section className="prose prose-slate max-w-none space-y-8">
          <div>
            <h2>Best ways to split rent fairly</h2>
            <p>
              A fair rent split depends on the household. Equal splits are quick and
              easy, while income-based and room-size splits can feel fairer when
              people have very different incomes or bedrooms.
            </p>
          </div>
          <div>
            <h2>Equal split vs income split</h2>
            <p>
              Equal splits are easiest to explain. Income splits can reduce pressure
              on a lower earner, but everyone needs to be comfortable sharing income
              information. If income also affects whether you can apply for a home,
              use the{" "}
              <Link href="/joint-tenant-affordability-calculator">joint tenant calculator</Link>.
            </p>
          </div>
          <AdPlaceholder />
          <div>
            <h2>Room-size split explanation</h2>
            <p>
              Room-size scores are a simple way to account for different bedrooms.
              A small room might be 1, a medium room 1.25, and a large room 1.5.
              The scores do not have to be perfect; they just make the conversation
              more structured.
            </p>
          </div>
          <div>
            <h2>Remember the full moving budget</h2>
            <p>
              Rent is only one part of sharing a home. The{" "}
              <Link href="/move-in-cost-calculator">move-in cost calculator</Link>{" "}
              can help estimate deposit, first month rent, and shared setup costs.
            </p>
          </div>
        </section>
        <FAQSection items={faqs} />
        <DisclaimerBox />
        <RelatedTools currentPath="/rent-split-calculator" />
      </div>
    </>
  );
}
