import type { Metadata } from "next";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { CalculatorCard } from "@/components/CalculatorCard";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FAQJsonLd } from "@/components/FAQJsonLd";
import { FAQSection } from "@/components/FAQSection";
import { HomepageCountryCards } from "@/components/HomepageCountryCards";
import { HomepageAffordabilityPreview } from "@/components/HomepageAffordabilityPreview";
import { HeroRentCheckPreview } from "@/components/HeroRentCheckPreview";
import { FadeUp, Stagger, StaggerItem } from "@/components/Motion";
import { TrackedLink } from "@/components/TrackedLink";
import { tools, type FAQItem } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Rent Affordability Calculator | RentReadyCheck",
  },
  description:
    "Use RentReadyCheck to estimate rent affordability, guarantor or co-signer income, joint tenant affordability, move-in costs, and rent splits by country, or use a generic rent-to-income estimate if your country is not listed.",
};

const faqs: FAQItem[] = [
  {
    question: "Can this website tell me if I will be approved?",
    answer:
      "No. RentReadyCheck gives rough estimates only. Rental decisions can also depend on credit history, employment status, landlord requirements, property manager rules, savings, guarantors or co-signers, and local rules.",
  },
  {
    question: "Which countries does RentReadyCheck support?",
    answer:
      "The calculators currently support the United Kingdom, United States, Canada, and Australia, plus an Other / Rest of world option for a generic rent-to-income estimate.",
  },
  {
    question: "Can joint tenants combine income?",
    answer:
      "Often, joint tenant applications are considered using combined income, but the exact approach can vary by country, landlord, agent, and property manager.",
  },
  {
    question: "When might I need a guarantor or co-signer?",
    answer:
      "A guarantor or co-signer may be requested if income is below an example threshold, employment is new or irregular, or the landlord wants extra reassurance.",
  },
  {
    question: "Are these calculators financial or legal advice?",
    answer:
      "No. They are general estimate tools for renters. You should confirm requirements directly with the landlord, agent, property manager, or a qualified adviser.",
  },
];

export default function Home() {
  const trustStats = [
    { label: "Supported regions", value: "5" },
    { label: "Calculator tools", value: "5" },
    { label: "No account needed", value: "100%" },
  ];

  const trustReasons = [
    {
      marker: "A",
      title: "Country-aware estimates",
      description:
        "Choose the UK, US, Canada, Australia, or a generic Rest of world guide.",
    },
    {
      marker: "P",
      title: "Private browser calculations",
      description:
        "Your inputs are processed on the page without accounts or forms.",
    },
    {
      marker: "F",
      title: "Free renter tools",
      description:
        "Sense-check affordability, support, move-in costs, and rent splits.",
    },
  ];

  return (
    <>
      <FAQJsonLd items={faqs} />
      <section className="relative overflow-hidden border-b border-[#D6E7E1] bg-[radial-gradient(circle_at_15%_8%,rgba(223,244,236,0.95),transparent_30rem),radial-gradient(circle_at_88%_12%,rgba(247,250,248,0.95),transparent_28rem),linear-gradient(135deg,#F7FAF8_0%,#DFF4EC_52%,#F7FAF8_100%)]">
        <div className="pointer-events-none absolute right-[-10rem] top-[-10rem] h-96 w-96 rounded-full bg-[#DFF4EC]/55 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-12rem] left-[38%] h-80 w-80 rounded-full bg-white/80 blur-3xl" />
        <div className="site-container relative grid gap-8 py-7 sm:py-10 lg:grid-cols-[1.02fr_0.88fr] lg:items-center lg:py-16">
          <FadeUp>
            <p className="inline-flex rounded-full border border-[#D6E7E1] bg-white/75 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#0F766E] shadow-[0_10px_24px_rgba(15,46,43,0.05)]">
              Global rent affordability tools
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.06em] text-[#0F2E2B] sm:text-5xl lg:text-[4.15rem]">
              Know what rent you can afford before you apply
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#5F726C] sm:text-lg sm:leading-8">
              Estimate rent affordability, joint tenant income, guarantor or
              co-signer support, move-in costs, and rent splits with
              country-aware checks.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="/rent-referencing-calculator"
                className="btn-primary min-h-12 w-full sm:w-auto"
                eventName="homepage_hero_affordability_click"
              >
                Check affordability now
              </TrackedLink>
              <TrackedLink
                href="/guarantor-income-calculator"
                className="btn-secondary min-h-12 w-full sm:w-auto"
                eventName="homepage_hero_guarantor_click"
              >
                Estimate guarantor income
              </TrackedLink>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["No sign-up", "Free estimate", "Country-aware checks", "Private calculation"].map((pill) => (
                <span
                  key={pill}
                  className="trust-pill"
                >
                  {pill}
                </span>
              ))}
            </div>
            <div className="mt-7 grid max-w-xl grid-cols-3 gap-3">
              {trustStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-[#D6E7E1] bg-white/68 p-3 shadow-[0_10px_24px_rgba(15,46,43,0.05)]">
                  <p className="text-xl font-extrabold tracking-[-0.03em] text-[#0F2E2B]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-bold leading-4 text-[#5F726C]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>

          <HeroRentCheckPreview />
        </div>
      </section>

      <div className="site-container space-y-12 py-10 sm:space-y-14 sm:py-12">
        <HomepageAffordabilityPreview />

        <section className="grid gap-5 md:grid-cols-[0.72fr_1fr] md:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#0F766E]">
              Trusted by renters globally
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.025em] text-[#0F2E2B]">
              Start with the country you rent in
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-[#5F726C]">
              We use browser settings for a helpful default, and you can change
              the country anytime.
            </p>
          </div>
          <HomepageCountryCards />
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-[#0F2E2B]">
              What can you check?
            </h2>
            <p className="mt-2 max-w-2xl leading-7 text-[#5F726C]">
              Start with the question that matches your rental application.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                marker: "1",
                title: "Applicant income",
                description:
                  "Compare income with the selected country's example rent checks.",
              },
              {
                marker: "2",
                title: "Joint tenant income",
                description:
                  "Combine incomes for couples, friends, or flatmates applying together.",
              },
              {
                marker: "3",
                title: "Guarantor or co-signer income",
                description:
                  "Estimate whether extra support may meet an example income threshold.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="premium-card flex gap-4 p-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#D6E7E1] bg-[#DFF4EC] text-sm font-extrabold text-[#0F766E]">
                  {item.marker}
                </span>
                <div>
                  <h3 className="font-bold text-[#0F2E2B]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#5F726C]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <AdPlaceholder />

        <section className="space-y-5">
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#0F766E]">
              Popular calculators
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.03em] text-[#0F2E2B]">
              Choose a calculator
            </h2>
            <p className="mx-auto mt-2 max-w-2xl leading-7 text-[#5F726C]">
              Everything you need to sense-check rent, support options, upfront
              costs, and fair rent shares.
            </p>
          </div>
          <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" delayChildren={0.04}>
            {tools.map((tool, index) => (
              <StaggerItem
                key={tool.href}
              >
                <CalculatorCard badge={`${index + 1}`} {...tool} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        <section className="rounded-2xl border border-[#D6E7E1] bg-[linear-gradient(180deg,#DFF4EC_0%,#F7FAF8_100%)] p-6 shadow-[0_14px_34px_rgba(15,46,43,0.06)]">
          <h2 className="text-3xl font-extrabold tracking-[-0.025em] text-[#0F2E2B]">
            Common checks renters worry about
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              "Whether income is enough for the rent",
              "Whether joint tenants can combine earnings",
              "How much a guarantor or co-signer may need to earn",
              "How much cash is needed before move-in",
              "How to split rent fairly with housemates",
              "Whether savings or self-employment may change the conversation",
            ].map((item) => (
              <p key={item} className="rounded-lg border border-[#D6E7E1] bg-white p-4 text-sm font-semibold text-[#5F726C]">
                {item}
              </p>
            ))}
          </div>
        </section>

        <section className="space-y-5 text-center">
          <div>
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-[#0F2E2B]">
              Why RentReadyCheck?
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {trustReasons.map((item) => (
              <article key={item.title} className="premium-card p-5 text-left">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D6E7E1] bg-[#DFF4EC] text-sm font-extrabold text-[#0F766E]">
                  {item.marker}
                </span>
                <h3 className="mt-4 font-extrabold text-[#0F2E2B]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#5F726C]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <FAQSection items={faqs} />
        <DisclaimerBox>
          RentReadyCheck is a rough guide only. It does not provide financial,
          legal, tax, housing, or rental approval advice.
        </DisclaimerBox>
      </div>
    </>
  );
}
