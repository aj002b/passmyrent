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
  return (
    <>
      <FAQJsonLd items={faqs} />
      <section className="relative overflow-hidden border-b border-[#d8e5df] bg-[radial-gradient(circle_at_18%_0%,rgba(204,231,220,0.9),transparent_32rem),linear-gradient(135deg,#f8fbf9_0%,#edf6f1_54%,#f7fbf8_100%)]">
        <div className="pointer-events-none absolute right-[-8rem] top-[-10rem] h-80 w-80 rounded-full bg-[#cce7dc]/55 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-12rem] left-[42%] h-72 w-72 rounded-full bg-[#eaf3f8]/80 blur-3xl" />
        <div className="site-container relative grid gap-8 py-8 md:grid-cols-[1fr_0.86fr] md:items-center md:py-10">
          <FadeUp>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#b6533f]">
              GLOBAL RENT AFFORDABILITY TOOLS
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-[-0.045em] text-[#17312b] md:text-[2.65rem] md:leading-[1.05]">
              Check if you can afford the rent before you apply
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#35534c] sm:text-lg sm:leading-8">
              Estimate rent affordability, joint tenant income, guarantor or
              co-signer support, move-in costs, and rent splits for your country.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="/rent-referencing-calculator"
                className="btn-primary"
                eventName="homepage_hero_affordability_click"
              >
                Check my rent affordability
              </TrackedLink>
              <TrackedLink
                href="/guarantor-income-calculator"
                className="btn-secondary"
                eventName="homepage_hero_guarantor_click"
              >
                Estimate guarantor income
              </TrackedLink>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["No sign-up", "Free estimate", "Choose your country"].map((pill) => (
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
          </FadeUp>

          <HeroRentCheckPreview />
        </div>
      </section>

      <div className="site-container space-y-12 py-9">
        <HomepageAffordabilityPreview />

        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-[#17312b]">
              Choose your country
            </h2>
            <p className="mt-2 max-w-2xl leading-7 text-[#5f746f]">
              Each country uses its own example affordability method.
            </p>
          </div>
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" delayChildren={0.04}>
            {countries.map((country) => (
              <StaggerItem key={country.code} className="premium-card p-4">
                <h3 className="font-bold text-[#17312b]">{country.name}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5f746f]">
                  {country.disclaimer}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

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

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-[#17312b]">Choose a calculator</h2>
          <Stagger className="grid gap-4 md:grid-cols-2" delayChildren={0.04}>
            {tools.map((tool, index) => (
              <StaggerItem
                key={tool.href}
                className={index === tools.length - 1 ? "md:col-span-2 md:mx-auto md:w-[calc(50%-0.5rem)]" : undefined}
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

        <FAQSection items={faqs} />
        <DisclaimerBox>
          RentReadyCheck is a rough guide only. It does not provide financial,
          legal, tax, housing, or rental approval advice.
        </DisclaimerBox>
      </div>
    </>
  );
}
