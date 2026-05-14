import type { Metadata } from "next";
import Link from "next/link";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FAQJsonLd } from "@/components/FAQJsonLd";
import { FAQSection } from "@/components/FAQSection";
import { RelatedTools } from "@/components/RelatedTools";
import { GuarantorIncomeCalculator } from "@/components/calculators/GuarantorIncomeCalculator";
import type { FAQItem } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guarantor & Co-signer Income Calculator",
  description:
    "Estimate how much a guarantor or co-signer may need to earn using country-specific rent affordability examples.",
};

const faqs: FAQItem[] = [
  { question: "What is a guarantor or co-signer?", answer: "A guarantor or co-signer is someone who may agree to support the rental agreement if the renter cannot meet certain obligations, depending on the agreement." },
  { question: "Why do landlords ask for extra support?", answer: "They may ask when income is low, income is irregular, rental history is limited, or the application needs extra reassurance." },
  { question: "Do guarantors or co-signers need to earn more than renters?", answer: "Sometimes they may be assessed against a higher or stricter example threshold, but requirements vary widely." },
  { question: "Is one threshold always enough?", answer: "No. This calculator uses examples only. Actual requirements can vary by country, landlord, agent, property manager, and individual circumstances." },
  { question: "Can a support person live in another country?", answer: "Some landlords or property managers require a local guarantor or co-signer. You should ask what they accept before applying." },
];

export default function GuarantorPage() {
  return (
    <>
      <FAQJsonLd items={faqs} />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        <section className="max-w-3xl">
          <p className="text-sm font-bold text-[#d9654f]">Last updated: May 2026</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-[#17312b]">
            Guarantor / Co-signer Income Calculator
          </h1>
          <p className="mt-4 text-lg leading-8 text-[#5f746f]">
            Estimate whether a guarantor or co-signer&apos;s annual income may meet
            an example affordability threshold for your selected country.
          </p>
        </section>
        <GuarantorIncomeCalculator />
        <section className="prose prose-slate max-w-none space-y-8">
          <div>
            <h2>What a guarantor or co-signer is</h2>
            <p>
              A guarantor or co-signer is usually a person who agrees to support
              the rental agreement if the renter cannot meet certain obligations.
              The exact commitment depends on the country and the paperwork.
            </p>
          </div>
          <div>
            <h2>Why landlords ask for extra support</h2>
            <p>
              Extra support is often requested where the renter&apos;s income is below
              an example benchmark, where income is irregular, or where the
              applicant has limited rental history. You can compare renter income
              first with the{" "}
              <Link href="/rent-referencing-calculator">rent affordability calculator</Link>.
            </p>
          </div>
          <AdPlaceholder />
          <div>
            <h2>Why support-person income requirements may be higher</h2>
            <p>
              A support person may not be living in the property but may still be
              expected to help if needed. That is why some checks use a stricter
              example income threshold.
            </p>
          </div>
          <div>
            <h2>Common situations where support may be needed</h2>
            <p>
              Support is common for students, renters with a new job, renters
              with self-employed income, and people moving without much local
              rental history. If you are applying with flatmates, the{" "}
              <Link href="/joint-tenant-affordability-calculator">joint tenant calculator</Link>{" "}
              may also help.
            </p>
          </div>
        </section>
        <FAQSection items={faqs} />
        <DisclaimerBox />
        <RelatedTools currentPath="/guarantor-income-calculator" />
      </div>
    </>
  );
}
