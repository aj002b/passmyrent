import type { Metadata } from "next";
import Link from "next/link";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { RelatedTools } from "@/components/RelatedTools";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Read the PassMyRentCheck disclaimer covering estimates, affordability calculators, financial advice, legal advice, and referencing decisions.",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <section className="max-w-3xl">
        <p className="text-sm font-bold text-[#d9654f]">Last updated: May 2026</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-[#17312b]">
          Disclaimer
        </h1>
        <p className="mt-4 text-lg leading-8 text-[#5f746f]">
          PassMyRentCheck provides rough calculator estimates only. The website
          does not guarantee rental approval and does not provide financial, legal,
          or referencing advice.
        </p>
      </section>
      <section className="prose prose-slate max-w-none space-y-8">
        <div>
          <h2>Calculators are estimates only</h2>
          <p>
            The tools use simple example rules such as income multiples of monthly
            rent. They are designed to help renters understand possible affordability
            questions, not to make decisions for a landlord or letting agent.
          </p>
        </div>
        <div>
          <h2>No guarantee of approval</h2>
          <p>
            Passing a calculator result does not mean you will pass referencing.
            Actual decisions can depend on credit history, employment status,
            savings, guarantors, landlord preferences, letting agent rules, and
            referencing company policies.
          </p>
        </div>
        <AdPlaceholder />
        <div>
          <h2>Not financial or legal advice</h2>
          <p>
            Nothing on this site is financial advice, legal advice, or professional
            referencing advice. You should speak to relevant professionals or
            agencies if you need advice for your circumstances.
          </p>
        </div>
        <div>
          <h2>Check directly before applying</h2>
          <p>
            Always check the exact requirements with the landlord, letting agent, or
            referencing company. You can use the{" "}
            <Link href="/rent-referencing-calculator">rent referencing calculator</Link>{" "}
            as a starting point, but the final decision belongs to the people
            assessing the application.
          </p>
        </div>
      </section>
      <RelatedTools />
    </div>
  );
}
