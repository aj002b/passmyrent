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
  title: "Rent Affordability Calculator by Country",
  description:
    "Estimate rent affordability by country using example checks for the United Kingdom, United States, Canada, Australia, or a generic rent-to-income estimate.",
};

const faqs: FAQItem[] = [
  { question: "How much income do I need to rent a property?", answer: "It depends on the country and the landlord or property manager. This calculator shows example checks such as UK-style income multiples and rent-to-income percentages used in other countries." },
  { question: "Do all landlords use the same affordability rule?", answer: "No. Requirements can vary by country, state, province, landlord, agent, property manager, and individual application." },
  { question: "Can joint tenants combine income?", answer: "Often, yes. Many applications consider combined household income, but individual circumstances can still matter." },
  { question: "How much does a guarantor or co-signer need to earn?", answer: "That depends on the country and the rule being used. The guarantor and co-signer calculator lets you compare example thresholds." },
  { question: "Does passing this calculator guarantee approval?", answer: "No. Rental decisions can also consider credit history, employment status, savings, references, guarantors or co-signers, and local rules." },
  { question: "What if I am self-employed?", answer: "You may be asked for extra evidence such as accounts, tax records, bank statements, contracts, or proof of ongoing income." },
  { question: "What if I have savings but low income?", answer: "Savings may help in some cases, but not every landlord or property manager treats savings the same way. Ask what evidence they accept before applying." },
];

export default function RentReferencingPage() {
  return (
    <>
      <FAQJsonLd items={faqs} />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        <section className="max-w-3xl">
          <p className="text-sm font-bold text-[#0E5F67]">Last updated: May 2026</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-[#0B2F35]">
            Rent Affordability Calculator
          </h1>
          <p className="mt-4 text-lg leading-8 text-[#5D6D75]">
            Estimate whether your income may meet example rent affordability
            checks in the United Kingdom, United States, Canada, or Australia,
            or use Other / Rest of world as a rough budgeting estimate if your
            country is not listed. You can also estimate whether a guarantor or
            co-signer may help.
          </p>
        </section>

        <RentReferencingCalculator />

        <section className="prose prose-slate max-w-none space-y-8">
          <div>
            <h2>What is a rent affordability check?</h2>
            <p>
              A rent affordability check is part of many rental applications. It
              helps a landlord, letting agent, or property manager decide whether the rent looks
              affordable compared with your income. It is only one part of
              an application, so passing an income benchmark does not guarantee that
              the application will be accepted.
            </p>
          </div>
          <div>
            <h2>How countries can compare rent and income</h2>
            <p>
              Some checks compare annual income with monthly rent, such as 30x
              or 36x monthly rent. Others compare rent with gross monthly income,
              such as 30% or 35%. Choose your country in the calculator to see
              the example method used for that region. Country-specific checks
              vary. If your country is not listed, use Other / Rest of world as
              a rough budgeting estimate only.
            </p>
          </div>
          <AdPlaceholder />
          <div>
            <h2>What if you are applying with other people?</h2>
            <p>
              If you are applying with a partner, friend, or flatmate, combined
              income may be considered. Try the{" "}
              <Link href="/joint-tenant-affordability-calculator">joint tenant calculator</Link>{" "}
              to compare household income with country-specific example checks.
            </p>
          </div>
          <div>
            <h2>When might you need a guarantor or co-signer?</h2>
            <p>
              A guarantor or co-signer may be requested if income is below an
              example threshold, if employment is new or irregular, or if the
              landlord wants extra reassurance. The{" "}
              <Link href="/guarantor-income-calculator">guarantor and co-signer calculator</Link>{" "}
              can help estimate support-person income.
            </p>
          </div>
          <div>
            <h2>What else can affect rental decisions?</h2>
            <p>
              Rental decisions may consider credit history, employment status,
              previous landlord references, savings, local documents, and the
              landlord or property manager&apos;s own requirements. If you are budgeting
              for a move, the{" "}
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
