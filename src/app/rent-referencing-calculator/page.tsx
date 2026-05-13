import type { Metadata } from "next";
import Link from "next/link";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FAQJsonLd } from "@/components/FAQJsonLd";
import { FAQSection } from "@/components/FAQSection";
import { RelatedTools } from "@/components/RelatedTools";
import { RentReferencingCalculator } from "@/components/calculators/RentReferencingCalculator";
import type { FAQItem } from "@/lib/site";

export const metadata: Metadata = {
  title: "UK Rent Referencing Calculator | Check If You Might Pass",
  description:
    "Estimate whether your income may meet common UK rent affordability checks, including 30x and 36x monthly rent examples.",
};

const faqs: FAQItem[] = [
  { question: "How much do I need to earn to rent a property in the UK?", answer: "A common rough guide is annual income of around 30 to 36 times the monthly rent, but different landlords and letting agents can use different checks." },
  { question: "Do all landlords use 30x or 36x rent?", answer: "No. These are example benchmarks only. Some checks may be higher, lower, or based on wider circumstances." },
  { question: "Can joint tenants combine income?", answer: "Often, yes. Many joint applications are assessed on combined income, although individual circumstances may still be reviewed." },
  { question: "How much does a guarantor need to earn?", answer: "Some guarantor checks use a higher example threshold such as 36 times monthly rent. Use the guarantor calculator to compare different multipliers." },
  { question: "Does passing this calculator guarantee I will pass referencing?", answer: "No. Referencing can consider credit history, employment status, landlord rules, savings, guarantors, and other factors." },
  { question: "What if I am self-employed?", answer: "You may be asked for accounts, tax calculations, bank statements, or extra evidence. Requirements vary by referencing company." },
  { question: "What if I have savings but low income?", answer: "Savings may help in some cases, but not every landlord treats savings the same way. Ask the letting agent what evidence they accept." },
];

export default function RentReferencingPage() {
  return (
    <>
      <FAQJsonLd items={faqs} />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        <section className="max-w-3xl">
          <p className="text-sm font-bold text-[#d9654f]">Last updated: May 2026</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-[#17312b]">
            UK rent referencing calculator
          </h1>
          <p className="mt-4 text-lg leading-8 text-[#5f746f]">
            Estimate whether your annual income may meet common UK rent affordability
            checks, and whether a guarantor may help if your income is below an
            example threshold.
          </p>
        </section>

        <RentReferencingCalculator />

        <section className="prose prose-slate max-w-none space-y-8">
          <div>
            <h2>What is a rent affordability check?</h2>
            <p>
              A rent affordability check is part of many rental applications. It
              helps a landlord or letting agent decide whether the rent looks
              affordable compared with your income. It is only one part of
              referencing, so passing an income benchmark does not guarantee that
              the application will be accepted.
            </p>
          </div>
          <div>
            <h2>What does 30x rent mean?</h2>
            <p>
              A 30x check means the applicant&apos;s annual income is compared with 30
              times the monthly rent. For example, a rent of £1,000 per month
              would mean an example income threshold of £30,000 per year.
            </p>
          </div>
          <AdPlaceholder />
          <div>
            <h2>What does 36x rent mean?</h2>
            <p>
              A 36x check is a higher example threshold. Some renters use it as a
              more cautious rough guide before applying. If you are applying with
              other people, try the{" "}
              <Link href="/joint-tenant-affordability-calculator">joint tenant calculator</Link>{" "}
              to estimate combined income.
            </p>
          </div>
          <div>
            <h2>When might you need a guarantor?</h2>
            <p>
              A guarantor may be requested if income is below the example threshold,
              if employment is new or irregular, or if a landlord wants extra
              reassurance. The{" "}
              <Link href="/guarantor-income-calculator">guarantor income calculator</Link>{" "}
              can help estimate a guarantor benchmark.
            </p>
          </div>
          <div>
            <h2>What else can affect referencing?</h2>
            <p>
              Referencing may consider credit history, employment status, previous
              landlord references, savings, visa or right-to-rent checks, and the
              landlord&apos;s own requirements. If you are budgeting for a move, the{" "}
              <Link href="/move-in-cost-calculator">move-in cost calculator</Link>{" "}
              can estimate upfront costs too.
            </p>
          </div>
        </section>

        <FAQSection items={faqs} />
        <DisclaimerBox />
        <RelatedTools currentPath="/rent-referencing-calculator" />
      </div>
    </>
  );
}
