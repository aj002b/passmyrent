import type { Metadata } from "next";
import Link from "next/link";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { CalculatorCard } from "@/components/CalculatorCard";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FAQJsonLd } from "@/components/FAQJsonLd";
import { FAQSection } from "@/components/FAQSection";
import { tools, type FAQItem } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "PassMyRentCheck | UK Rent Affordability & Guarantor Calculators",
  },
  description:
    "Estimate UK rent affordability, guarantor income, joint tenant affordability, move-in costs, and fair rent splits with free client-side calculators.",
};

const faqs: FAQItem[] = [
  {
    question: "Can this website tell me if I will definitely pass referencing?",
    answer:
      "No. PassMyRentCheck gives rough estimates only. Referencing decisions can also depend on credit history, employment status, landlord rules, letting agent policies, savings, and individual circumstances.",
  },
  {
    question: "What income multiple do UK letting agents use?",
    answer:
      "Some checks use examples such as 30 times or 36 times the monthly rent, but there is no single rule used by every landlord or letting agent.",
  },
  {
    question: "Can flatmates combine income for a rental property?",
    answer:
      "Many joint tenant checks look at combined income, but some landlords may also review each person's situation separately.",
  },
  {
    question: "When might I need a guarantor?",
    answer:
      "A guarantor may be requested if income is below the example threshold, your employment is new or irregular, you are a student, or the landlord wants extra reassurance.",
  },
  {
    question: "Are these calculators financial or legal advice?",
    answer:
      "No. They are general estimate tools for renters. You should confirm requirements directly with the landlord, letting agent, referencing company, or a qualified adviser.",
  },
];

export default function Home() {
  return (
    <>
      <FAQJsonLd items={faqs} />
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#f7fbf8_0%,#e8f5ef_56%,#f4faf7_100%)]">
        <div className="relative mx-auto grid max-w-6xl gap-7 px-4 py-8 sm:px-6 md:grid-cols-[1fr_0.86fr] md:items-center md:py-10 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#b6533f]">
              UK RENT AFFORDABILITY TOOLS
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.1] text-[#17312b] md:text-[2.8rem] md:leading-[1.08]">
              Check if you might pass a UK rent affordability check
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#35534c] sm:text-lg">
              Estimate whether your income, joint income, or guarantor income may
              meet common UK rental affordability rules before you apply.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/rent-referencing-calculator"
                className="rounded-md bg-[#116a5b] px-5 py-3 text-center font-semibold text-white shadow-[0_10px_22px_rgba(17,106,91,0.18)] hover:bg-[#0b4c43] focus:outline-none focus:ring-2 focus:ring-[#116a5b] focus:ring-offset-4"
              >
                Start rent check
              </Link>
              <Link
                href="/guarantor-income-calculator"
                className="rounded-md border border-[#9bc7ba] bg-white px-5 py-3 text-center font-semibold text-[#116a5b] hover:bg-[#f7fbf8] focus:outline-none focus:ring-2 focus:ring-[#116a5b] focus:ring-offset-4"
              >
                Try guarantor calculator
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["No sign-up", "Free estimate", "UK-focused"].map((pill) => (
                <span
                  key={pill}
                  className="rounded-md border border-[#c7ddd5] bg-white/85 px-3 py-1.5 text-sm font-semibold text-[#35534c]"
                >
                  {pill}
                </span>
              ))}
            </div>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#5f746f]">
              Uses common example checks such as 30x and 36x monthly rent.
              Results are estimates only.
            </p>
          </div>

          <div className="rounded-xl border border-white/80 bg-white/85 p-3 shadow-[0_22px_55px_rgba(23,49,43,0.12)] backdrop-blur">
            <div className="rounded-xl border border-[#d7e5df] bg-[#fbfdfc] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-[#17312b]">
                    Example rent check
                  </p>
                  <p className="mt-1 text-sm text-[#5f746f]">
                    A quick preview of the calculator result.
                  </p>
                </div>
                <span className="rounded-md bg-[#e8f5ef] px-3 py-1 text-xs font-semibold text-[#116a5b]">
                  36x
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  ["Monthly rent", "£1,200"],
                  ["Combined income", "£42,000"],
                  ["Common check", "36x rent"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-lg border border-[#e3eee9] bg-white px-4 py-3"
                  >
                    <span className="text-sm font-semibold text-[#5f746f]">
                      {label}
                    </span>
                    <span className="text-sm font-bold text-[#17312b]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-[#e9c4ad] bg-[#fff7ee] p-4">
                <span className="inline-flex rounded-md bg-white px-3 py-1 text-xs font-semibold text-[#b6533f]">
                  May pass some checks
                </span>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7f6d60]">
                      Required income
                    </p>
                    <p className="mt-1 text-xl font-bold text-[#17312b]">
                      £43,200
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7f6d60]">
                      Difference
                    </p>
                    <p className="mt-1 text-xl font-bold text-[#17312b]">
                      £1,200 below
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-[#6a5148]">
                  Some landlords may ask for a guarantor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-9 sm:px-6 lg:px-8">
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-[#17312b]">
              What can you check?
            </h2>
            <p className="mt-2 max-w-2xl leading-7 text-[#5f746f]">
              Start with the question that matches your rental application.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                marker: "1",
                title: "Applicant income",
                description:
                  "Compare your income with common 30x and 36x rent checks.",
              },
              {
                marker: "2",
                title: "Joint tenant income",
                description:
                  "Combine incomes for couples, friends, or flatmates applying together.",
              },
              {
                marker: "3",
                title: "Guarantor income",
                description:
                  "Estimate whether a guarantor may meet an example income threshold.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-xl border border-[#d7e5df] bg-white p-4 shadow-[0_10px_28px_rgba(23,49,43,0.05)]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#e8f5ef] text-sm font-semibold text-[#116a5b]">
                  {item.marker}
                </span>
                <div>
                  <h3 className="font-bold text-[#17312b]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#5f746f]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-bold text-[#17312b]">
              A calm first check before you apply
            </h2>
            <p className="mt-4 leading-7 text-[#5f746f]">
              Renting can feel opaque. PassMyRentCheck helps you estimate common
              affordability questions before you speak to an agent, such as
              whether your income may be enough, whether a guarantor could help,
              and what your first moving costs might look like.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[#d7e5df] bg-white p-5 shadow-[0_10px_28px_rgba(23,49,43,0.05)]">
              <h3 className="font-bold text-[#17312b]">No sign-up</h3>
              <p className="mt-2 text-sm leading-6 text-[#5f746f]">
                No account, login, database, or payment screen.
              </p>
            </div>
            <div className="rounded-xl border border-[#d7e5df] bg-white p-5 shadow-[0_10px_28px_rgba(23,49,43,0.05)]">
              <h3 className="font-bold text-[#17312b]">Private by design</h3>
              <p className="mt-2 text-sm leading-6 text-[#5f746f]">
                Calculations run in your browser and are not sent to a backend.
              </p>
            </div>
          </div>
        </section>

        <AdPlaceholder />

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-[#17312b]">Choose a calculator</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, index) => (
              <CalculatorCard key={tool.href} badge={`${index + 1}`} {...tool} />
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-[#d5e6ee] bg-[#eaf3f8] p-6 shadow-[0_10px_28px_rgba(23,49,43,0.05)]">
          <h2 className="text-3xl font-bold text-[#17312b]">
            Common checks renters worry about
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              "Whether one income is enough for the rent",
              "Whether joint tenants can combine earnings",
              "How much a guarantor may need to earn",
              "How much cash is needed before move-in",
              "How to split rent fairly with flatmates",
              "Whether savings or self-employment may change the conversation",
            ].map((item) => (
              <p key={item} className="rounded-lg border border-[#dbe8e2] bg-white p-4 text-sm font-semibold text-[#35534c]">
                {item}
              </p>
            ))}
          </div>
        </section>

        <FAQSection items={faqs} />
        <DisclaimerBox>
          PassMyRentCheck is a rough guide only. It does not provide financial,
          legal, or referencing advice, and it cannot guarantee approval for any
          property.
        </DisclaimerBox>
      </div>
    </>
  );
}
