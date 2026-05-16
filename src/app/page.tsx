import type { Metadata } from "next";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { CalculatorCard } from "@/components/CalculatorCard";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FAQJsonLd } from "@/components/FAQJsonLd";
import { FAQSection } from "@/components/FAQSection";
import { HomepageAffordabilityPreview } from "@/components/HomepageAffordabilityPreview";
import { HeroRentCheckPreview } from "@/components/HeroRentCheckPreview";
import { FadeUp, Stagger, StaggerItem } from "@/components/Motion";
import { TrackedLink } from "@/components/TrackedLink";
import { countries } from "@/lib/countries";
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
      title: "Private by design",
      description:
        "Calculator inputs run in your browser and are not intentionally stored.",
    },
    {
      marker: "F",
      title: "Free renter tools",
      description:
        "Use affordability, guarantor, move-in cost, and rent split calculators.",
    },
  ];

  return (
    <>
      <FAQJsonLd items={faqs} />
      <section className="relative overflow-hidden border-b border-[#d8e5df] bg-[radial-gradient(circle_at_15%_8%,rgba(204,231,220,0.95),transparent_30rem),radial-gradient(circle_at_88%_12%,rgba(234,243,248,0.95),transparent_28rem),linear-gradient(135deg,#f8fbf9_0%,#edf6f1_50%,#f7fbf8_100%)]">
        <div className="pointer-events-none absolute right-[-10rem] top-[-10rem] h-96 w-96 rounded-full bg-[#cce7dc]/50 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-12rem] left-[38%] h-80 w-80 rounded-full bg-white/80 blur-3xl" />
        <div className="site-container relative grid gap-8 py-8 sm:py-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-14">
          <FadeUp>
            <p className="inline-flex rounded-full border border-[#c7ddd5] bg-white/75 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#116a5b] shadow-[0_10px_24px_rgba(23,49,43,0.05)]">
              Global rent affordability tools
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.04] tracking-[-0.055em] text-[#102722] sm:text-5xl lg:text-[4rem]">
              Know what rent you can afford before you apply
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#35534c] sm:text-lg sm:leading-8">
              Estimate rent affordability, joint tenant income, guarantor or
              co-signer support, move-in costs, and rent splits with
              country-aware checks.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="/rent-referencing-calculator"
                className="btn-primary min-h-12"
                eventName="homepage_hero_affordability_click"
              >
                Check affordability now
              </TrackedLink>
              <TrackedLink
                href="/guarantor-income-calculator"
                className="btn-secondary min-h-12"
                eventName="homepage_hero_guarantor_click"
              >
                Estimate guarantor income
              </TrackedLink>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["No sign-up", "Free estimate", "Country-aware checks", "Private & secure"].map((pill) => (
                <span
                  key={pill}
                  className="trust-pill"
                >
                  {pill}
                </span>
              ))}
            </div>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#5f746f]">
              Uses country-specific example checks. Results are estimates only.
            </p>
            <div className="mt-7 grid max-w-xl grid-cols-3 gap-3">
              {trustStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-[#d7e5df] bg-white/68 p-3 shadow-[0_10px_24px_rgba(23,49,43,0.05)]">
                  <p className="text-xl font-extrabold tracking-[-0.03em] text-[#17312b]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-bold leading-4 text-[#5f746f]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>

          <HeroRentCheckPreview />
        </div>
      </section>

      <div className="site-container space-y-12 py-10">
        <section className="grid gap-4 md:grid-cols-[0.7fr_1fr] md:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#b6533f]">
              Trusted by renters globally
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.025em] text-[#17312b]">
              Start with the country you rent in
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {countries.map((country) => (
              <div key={country.code} className="rounded-2xl border border-[#d7e5df] bg-white p-4 shadow-[0_10px_24px_rgba(23,49,43,0.045)]">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#c7ddd5] bg-[#e8f5ef] text-xs font-extrabold text-[#116a5b]">
                  {country.code}
                </span>
                <h3 className="mt-3 text-sm font-extrabold text-[#17312b]">
                  {country.name}
                </h3>
                <p className="mt-1 text-xs leading-5 text-[#5f746f]">
                  {country.affordabilityMethod}
                </p>
              </div>
            ))}
          </div>
        </section>

        <HomepageAffordabilityPreview />

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
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#c7ddd5] bg-[#e8f5ef] text-sm font-extrabold text-[#116a5b]">
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

        <AdPlaceholder />

        <section className="space-y-5">
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#b6533f]">
              Popular calculators
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.03em] text-[#17312b]">
              Choose a calculator
            </h2>
            <p className="mx-auto mt-2 max-w-2xl leading-7 text-[#5f746f]">
              Everything you need to sense-check rent, support options, upfront
              costs, and fair rent shares.
            </p>
          </div>
          <Stagger className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" delayChildren={0.04}>
            {tools.map((tool, index) => (
              <StaggerItem
                key={tool.href}
                className={index === tools.length - 1 ? "xl:col-span-3 xl:mx-auto xl:w-[calc(33.333%-0.75rem)]" : undefined}
              >
                <CalculatorCard badge={`${index + 1}`} {...tool} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        <section className="rounded-2xl border border-[#d5e6ee] bg-[linear-gradient(180deg,#eaf3f8_0%,#f8fbfd_100%)] p-6 shadow-[0_14px_34px_rgba(23,49,43,0.06)]">
          <h2 className="text-3xl font-extrabold tracking-[-0.025em] text-[#17312b]">
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
              <p key={item} className="rounded-lg border border-[#dbe8e2] bg-white p-4 text-sm font-semibold text-[#35534c]">
                {item}
              </p>
            ))}
          </div>
        </section>

        <section className="space-y-5 text-center">
          <div>
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-[#17312b]">
              Why RentReadyCheck?
            </h2>
            <p className="mx-auto mt-2 max-w-2xl leading-7 text-[#5f746f]">
              Built to help renters understand the numbers without making
              promises or collecting personal application details.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {trustReasons.map((item) => (
              <article key={item.title} className="premium-card p-5 text-left">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#c7ddd5] bg-[#e8f5ef] text-sm font-extrabold text-[#116a5b]">
                  {item.marker}
                </span>
                <h3 className="mt-4 font-extrabold text-[#17312b]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#5f746f]">
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
