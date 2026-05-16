import type { Metadata } from "next";
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
      <section className="relative overflow-hidden border-b border-[#D7E5EA] bg-[radial-gradient(circle_at_16%_12%,rgba(232,243,246,0.95),transparent_30rem),radial-gradient(circle_at_82%_6%,rgba(214,232,239,0.9),transparent_26rem),linear-gradient(135deg,#F6FAFB_0%,#FFFFFF_48%,#E8F3F6_100%)]">
        <div className="pointer-events-none absolute right-[-12rem] top-[-12rem] h-[30rem] w-[30rem] rounded-full bg-[#E8F3F6]/80 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-14rem] left-[32%] h-96 w-96 rounded-full bg-white/85 blur-3xl" />
        <div className="site-container relative grid gap-8 py-7 sm:py-10 lg:grid-cols-[1.03fr_0.87fr] lg:items-center lg:py-16">
          <FadeUp>
            <p className="inline-flex rounded-full border border-[#D7E5EA] bg-white/75 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#0E5F67] shadow-[0_10px_24px_rgba(11,47,53,0.05)]">
              Global rent affordability tools
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.06em] text-[#0B2F35] sm:text-5xl lg:text-[4.15rem]">
              Know what rent you can afford before you apply
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#5D6D75] sm:text-lg sm:leading-8">
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
                <div key={stat.label} className="rounded-2xl border border-[#D7E5EA] bg-white/68 p-3 shadow-[0_10px_24px_rgba(11,47,53,0.05)]">
                  <p className="text-xl font-extrabold tracking-[-0.03em] text-[#0B2F35]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-bold leading-4 text-[#5D6D75]">
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

        <section className="space-y-5 rounded-[1.75rem] border border-[#D7E5EA] bg-white/80 p-4 shadow-[0_18px_50px_rgba(11,47,53,0.06)] backdrop-blur sm:p-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#0E5F67]">
              Trusted by renters globally
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.025em] text-[#0B2F35]">
              Start with the country you rent in
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#5D6D75]">
              We use browser settings for a helpful default, and you can change
              the country anytime.
            </p>
          </div>
          <HomepageCountryCards />
        </section>

        <section className="space-y-5">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#0E5F67]">
              Plan with confidence
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.03em] text-[#0B2F35]">
              What can you check?
            </h2>
            <p className="mt-2 max-w-2xl leading-7 text-[#5D6D75]">
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
                className="premium-card flex h-full gap-4 p-5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(11,47,53,0.09)]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#D7E5EA] bg-[#E8F3F6] text-sm font-extrabold text-[#0E5F67]">
                  {item.marker}
                </span>
                <div>
                  <h3 className="font-bold text-[#0B2F35]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#5D6D75]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#0E5F67]">
              Popular calculators
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.03em] text-[#0B2F35]">
              Choose a calculator
            </h2>
            <p className="mx-auto mt-2 max-w-2xl leading-7 text-[#5D6D75]">
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

        <section className="rounded-[1.75rem] border border-[#D7E5EA] bg-[linear-gradient(135deg,#FFFFFF_0%,#E8F3F6_100%)] p-5 shadow-[0_18px_50px_rgba(11,47,53,0.06)] sm:p-6">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#0E5F67]">
              Common renter questions
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.025em] text-[#0B2F35]">
              Checks renters worry about
            </h2>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              "Whether income is enough for the rent",
              "Whether joint tenants can combine earnings",
              "How much a guarantor or co-signer may need to earn",
              "How much cash is needed before move-in",
              "How to split rent fairly with housemates",
              "Whether savings or self-employment may change the conversation",
            ].map((item) => (
              <p key={item} className="rounded-2xl border border-[#D7E5EA] bg-white/82 p-4 text-sm font-semibold leading-6 text-[#5D6D75] shadow-[0_8px_22px_rgba(11,47,53,0.04)]">
                {item}
              </p>
            ))}
          </div>
        </section>

        <section className="space-y-5 text-center">
          <div>
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-[#0B2F35]">
              Why RentReadyCheck?
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {trustReasons.map((item) => (
              <article key={item.title} className="premium-card p-5 text-left">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D7E5EA] bg-[#E8F3F6] text-sm font-extrabold text-[#0E5F67]">
                  {item.marker}
                </span>
                <h3 className="mt-4 font-extrabold text-[#0B2F35]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#5D6D75]">
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
