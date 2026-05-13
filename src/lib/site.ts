export type FAQItem = {
  question: string;
  answer: string;
};

export const estimateDisclaimer =
  "This is only an estimate. Actual referencing decisions can depend on credit history, employment status, landlord requirements, letting agent rules, savings, guarantors, and other factors.";

export const tools = [
  {
    title: "Rent Referencing Calculator",
    href: "/rent-referencing-calculator",
    description: "Check if your income may be enough for a rental property.",
  },
  {
    title: "Guarantor Income Calculator",
    href: "/guarantor-income-calculator",
    description: "Estimate how much a guarantor may need to earn.",
  },
  {
    title: "Joint Tenant Calculator",
    href: "/joint-tenant-affordability-calculator",
    description: "Combine incomes for couples, friends, or flatmates.",
  },
  {
    title: "Move-In Cost Calculator",
    href: "/move-in-cost-calculator",
    description: "Estimate deposit, first month's rent, and upfront costs.",
  },
  {
    title: "Rent Split Calculator",
    href: "/rent-split-calculator",
    description: "Split rent equally, by income, or by room size.",
  },
] as const;
