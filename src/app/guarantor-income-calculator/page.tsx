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
  title: "Guarantor Income Calculator UK | Estimate Required Income",
  description:
    "Estimate how much a UK rent guarantor may need to earn using 30x, 36x, or 40x monthly rent examples.",
};

const faqs: FAQItem[] = [
  { question: "What is a rent guarantor?", answer: "A guarantor is someone who agrees to support the tenancy if the tenant cannot meet certain obligations, depending on the agreement." },
  { question: "Why do letting agents ask for guarantors?", answer: "A guarantor can give the landlord extra reassurance if the tenant has low income, irregular income, limited rental history, or student status." },
  { question: "Do guarantors need to earn more than tenants?", answer: "Often they may be assessed against a higher example threshold, but requirements vary widely." },
  { question: "Is 36x monthly rent always enough?", answer: "No. Some checks may use 30x, 36x, 40x, or another rule, and may review other circumstances too." },
  { question: "Can a guarantor live outside the UK?", answer: "Some landlords require a UK-based guarantor. You should ask the letting agent what they accept." },
];

export default function GuarantorPage() {
  return (
    <>
      <FAQJsonLd items={faqs} />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        <section className="max-w-3xl">
          <p className="text-sm font-bold text-[#d9654f]">Last updated: May 2026</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-[#17312b]">
            Guarantor income calculator UK
          </h1>
          <p className="mt-4 text-lg leading-8 text-[#5f746f]">
            Estimate whether a guarantor&apos;s annual income may meet an example
            affordability threshold for a rental property.
          </p>
        </section>
        <GuarantorIncomeCalculator />
        <section className="prose prose-slate max-w-none space-y-8">
          <div>
            <h2>What a guarantor is</h2>
            <p>
              A guarantor is usually a person who agrees to be responsible if the
              tenant cannot meet certain rental obligations. The exact commitment
              depends on the tenancy and guarantor paperwork.
            </p>
          </div>
          <div>
            <h2>Why letting agents ask for guarantors</h2>
            <p>
              Guarantors are often requested where the tenant&apos;s income is below an
              example benchmark, where income is irregular, or where the applicant is
              a student. You can compare tenant income first with the{" "}
              <Link href="/rent-referencing-calculator">rent referencing calculator</Link>.
            </p>
          </div>
          <AdPlaceholder />
          <div>
            <h2>Why guarantor income requirements may be higher</h2>
            <p>
              A guarantor is not living in the property but may be expected to cover
              rent if needed. That is why some landlords use a higher example income
              multiple for guarantors than for tenants.
            </p>
          </div>
          <div>
            <h2>Common situations where a guarantor may be needed</h2>
            <p>
              Guarantors are common for students, renters with a new job, renters
              with self-employed income, and people moving without a long UK rental
              history. If you are applying with flatmates, the{" "}
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
