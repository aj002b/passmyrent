import type { Metadata } from "next";
import Link from "next/link";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { estimateDisclaimer } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Renting Guides & Calculators | RentReadyCheck",
  },
  description:
    "Browse RentReadyCheck guides on rent affordability, guarantors, co-signers, move-in costs, rent-to-income ratios, and country-specific rent checks.",
};

const guideSections = [
  {
    title: "Country calculators",
    description:
      "Start with the rent affordability method that best matches where you are renting.",
    links: [
      { href: "/uk-rent-affordability-calculator", label: "UK rent affordability calculator" },
      { href: "/us-rent-affordability-calculator", label: "US rent affordability calculator" },
      { href: "/canada-rent-affordability-calculator", label: "Canada rent affordability calculator" },
      { href: "/australia-rent-affordability-calculator", label: "Australia rent affordability calculator" },
      { href: "/rent-affordability-calculator-rest-of-world", label: "Rent affordability for other countries" },
    ],
  },
  {
    title: "Rent amount guides",
    description:
      "Compare example income signals for common monthly rent amounts.",
    links: [
      { href: "/how-much-income-to-rent-800", label: "How much income to rent 800?" },
      { href: "/how-much-income-to-rent-1000", label: "How much income to rent 1,000?" },
      { href: "/how-much-income-to-rent-1200", label: "How much income to rent 1,200?" },
      { href: "/how-much-income-to-rent-1500", label: "How much income to rent 1,500?" },
      { href: "/how-much-income-to-rent-2000", label: "How much income to rent 2,000?" },
    ],
  },
  {
    title: "Guarantor and co-signer guides",
    description:
      "Understand when extra support may be requested and how income examples can vary.",
    links: [
      { href: "/how-much-does-a-guarantor-need-to-earn", label: "How much does a guarantor need to earn?" },
      { href: "/guarantor-income-calculator", label: "Guarantor / co-signer income calculator" },
    ],
  },
  {
    title: "Move-in cost guides",
    description:
      "Plan for upfront costs such as deposits, bond, first rent payments, moving costs, and setup costs.",
    links: [
      { href: "/how-much-should-i-save-before-moving-out", label: "How much should I save before moving out?" },
      { href: "/move-in-cost-calculator", label: "Move-in cost calculator" },
    ],
  },
  {
    title: "Rent affordability basics",
    description:
      "Learn the common terms behind rental affordability estimates.",
    links: [
      { href: "/rent-to-income-ratio-explained", label: "Rent-to-income ratio explained" },
      { href: "/what-is-30-times-rent", label: "What is 30 times rent?" },
      { href: "/what-is-36-times-rent", label: "What is 36 times rent?" },
      { href: "/can-flatmates-combine-income-for-rent", label: "Can flatmates combine income for rent?" },
      { href: "/rent-referencing-calculator", label: "Rent affordability calculator" },
      { href: "/joint-tenant-affordability-calculator", label: "Joint tenant affordability calculator" },
      { href: "/rent-split-calculator", label: "Rent split calculator" },
    ],
  },
] as const;

export default function GuidesPage() {
  return (
    <div className="site-container space-y-10 py-10">
      <section className="rounded-3xl border border-[#D6E7E1] bg-[linear-gradient(135deg,#F7FAF8_0%,#DFF4EC_100%)] p-6 shadow-[0_20px_60px_rgba(15,46,43,0.08)] md:p-8">
        <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#0F766E]">
          Guide library
        </p>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-[-0.035em] text-[#0F2E2B] md:text-5xl">
          Renting Guides & Calculators
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[#5F726C]">
          Helpful guides and calculators for estimating rent affordability,
          move-in costs, guarantor or co-signer support, and rent splits.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {guideSections.map((section) => (
          <article key={section.title} className="premium-card flex h-full flex-col p-5 md:p-6">
            <h2 className="text-2xl font-extrabold tracking-[-0.02em] text-[#0F2E2B]">
              {section.title}
            </h2>
            <p className="mt-2 leading-7 text-[#5F726C]">{section.description}</p>
            <div className="mt-5 grid gap-2">
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-[#D6E7E1] bg-[#F7FAF8] px-4 py-3 text-sm font-bold text-[#0F766E] transition hover:border-[#0F766E] hover:bg-[#DFF4EC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>

      <DisclaimerBox>{estimateDisclaimer}</DisclaimerBox>
    </div>
  );
}
