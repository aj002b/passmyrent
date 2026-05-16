import type { Metadata } from "next";
import Link from "next/link";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FAQJsonLd } from "@/components/FAQJsonLd";
import { FAQSection } from "@/components/FAQSection";
import { RelatedTools } from "@/components/RelatedTools";
import { JointTenantCalculator } from "@/components/calculators/JointTenantCalculator";
import type { FAQItem } from "@/lib/site";

export const metadata: Metadata = {
  title: "Joint Tenant Affordability Calculator",
  description:
    "Combine incomes for couples, friends, and flatmates to estimate joint tenant rent affordability by country.",
};

const faqs: FAQItem[] = [
  { question: "Can joint tenants combine income?", answer: "Many landlords, agents, and property managers look at combined income for joint tenants, but the exact approach can vary." },
  { question: "What if one tenant earns much more?", answer: "The combined total may still help, although some landlords may look more closely at individual stability and guarantors." },
  { question: "Do all tenants need guarantors or co-signers?", answer: "Not always. A landlord may ask for one support person, multiple support people, or none depending on the application." },
  { question: "What if one tenant leaves?", answer: "Joint tenants can sometimes be jointly responsible for rent. You should understand the tenancy agreement before signing." },
  { question: "Does this calculator guarantee approval?", answer: "No. It is a rough estimate and does not replace checks by a landlord, agent, or property manager." },
];

export default function JointTenantPage() {
  return (
    <>
      <FAQJsonLd items={faqs} />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        <section className="max-w-3xl">
          <p className="text-sm font-bold text-[#0F766E]">Last updated: May 2026</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-[#0F2E2B]">
            Joint tenant affordability calculator
          </h1>
          <p className="mt-4 text-lg leading-8 text-[#5F726C]">
            Combine annual incomes for couples, friends, or flatmates and compare
            them with example rent affordability checks for your selected country.
          </p>
        </section>
        <JointTenantCalculator />
        <section className="prose prose-slate max-w-none space-y-8">
          <div>
            <h2>Can joint tenants combine income?</h2>
            <p>
              In many joint tenancy applications, combined income is used as a rough
              affordability check. This can help couples and flatmates apply
              together, but the landlord or property manager may still consider
              each applicant&apos;s wider circumstances.
            </p>
          </div>
          <div>
            <h2>What if one tenant earns much more?</h2>
            <p>
              Uneven incomes are common. If the rent itself needs to be split fairly,
              the <Link href="/rent-split-calculator">rent split calculator</Link>{" "}
              can compare equal, income-based, and room-size splits.
            </p>
          </div>
          <AdPlaceholder />
          <div>
            <h2>What if one tenant leaves?</h2>
            <p>
              Joint tenants may have shared responsibilities under the tenancy. This
              calculator only estimates income against rent; it does not explain your
              legal obligations or tenancy terms.
            </p>
          </div>
          <div>
            <h2>Do all tenants need guarantors or co-signers?</h2>
            <p>
              Some landlords ask for extra support when combined income is low or one
              applicant has a more complex situation. The{" "}
              <Link href="/guarantor-income-calculator">guarantor and co-signer calculator</Link>{" "}
              can estimate an example support-person income threshold.
            </p>
          </div>
        </section>
        <FAQSection items={faqs} />
        <DisclaimerBox />
        <RelatedTools currentPath="/joint-tenant-affordability-calculator" />
      </div>
    </>
  );
}
