import type { FAQItem } from "@/lib/site";

export type SEOLandingPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  primaryLink: {
    href: string;
    label: string;
  };
  highlights: Array<{
    label: string;
    value: string;
  }>;
  sections: Array<{
    heading: string;
    body: string;
  }>;
  faqs: FAQItem[];
};

export const seoLandingPages: SEOLandingPage[] = [
  {
    slug: "how-much-income-to-rent-1000",
    title: "How Much Income Do You Need to Rent 1,000? | RentReadyCheck",
    description:
      "Estimate how much income may be needed to rent a 1,000 per month property, with notes for UK, US, Canada, and Australia affordability checks.",
    h1: "How much income do you need to rent 1,000 a month?",
    intro:
      "A 1,000 monthly rent can mean different income targets depending on where you are renting. This guide explains common example checks and links to the calculator for a country-aware estimate.",
    primaryLink: {
      href: "/rent-referencing-calculator",
      label: "Check affordability",
    },
    highlights: [
      { label: "UK-style 30x rent", value: "30,000 annual income" },
      { label: "UK-style 36x rent", value: "36,000 annual income" },
      { label: "US-style 3x rent", value: "3,000 gross monthly income" },
    ],
    sections: [
      {
        heading: "Quick estimate for 1,000 monthly rent",
        body:
          "In a UK-style annual multiplier check, 30x monthly rent would suggest about 30,000 annual income, while 36x monthly rent would suggest about 36,000 annual income. In a US-style monthly income check, a 3x rent example would suggest about 3,000 gross monthly income.",
      },
      {
        heading: "Why the answer changes by country",
        body:
          "Different countries often describe affordability in different ways. The UK often uses annual income compared with monthly rent, the United States often uses monthly income multiples, while Canada and Australia often discuss rent as a percentage of gross income.",
      },
      {
        heading: "Use the calculator before you apply",
        body:
          "If you are comparing properties, use the rent affordability calculator to choose your country, enter your income, and see a rough signal. If income is close to the example threshold, you may also want to check the guarantor or co-signer calculator.",
      },
    ],
    faqs: [
      {
        question: "Is 1,000 rent affordable?",
        answer:
          "It depends on income, country, debts, savings, and the landlord or property manager's rules. As a rough example, some checks may expect rent to be around 25% to 40% of gross income, or income to be a multiple of rent.",
      },
      {
        question: "How much annual income is 30x 1,000 rent?",
        answer:
          "A 30x monthly rent example is 30,000 annual income because 1,000 multiplied by 30 equals 30,000.",
      },
      {
        question: "Does this guarantee rental approval?",
        answer:
          "No. This is only an estimate. Actual decisions can depend on credit history, employment status, landlord requirements, property manager rules, savings, guarantors or co-signers, and other factors.",
      },
    ],
  },
  {
    slug: "how-much-income-to-rent-1200",
    title: "How Much Income Do You Need to Rent 1,200? | RentReadyCheck",
    description:
      "Estimate income for a 1,200 per month rental using common affordability examples, including 30x rent, 36x rent, and monthly income multiples.",
    h1: "How much income do you need to rent 1,200 a month?",
    intro:
      "For a 1,200 monthly rent, affordability estimates depend on the country and the type of check being used. Here are common examples to help you sense-check a property before applying.",
    primaryLink: {
      href: "/rent-referencing-calculator",
      label: "Check affordability",
    },
    highlights: [
      { label: "UK-style 30x rent", value: "36,000 annual income" },
      { label: "UK-style 36x rent", value: "43,200 annual income" },
      { label: "US-style 3x rent", value: "3,600 gross monthly income" },
    ],
    sections: [
      {
        heading: "Quick estimate for 1,200 monthly rent",
        body:
          "Using UK-style examples, 30x monthly rent equals 36,000 annual income and 36x monthly rent equals 43,200 annual income. Using a US-style 3x monthly income example, gross monthly income would be around 3,600.",
      },
      {
        heading: "What if you are close to the threshold?",
        body:
          "Being close to an example threshold does not automatically mean an application will be accepted or refused. A landlord or property manager may also look at employment, credit history, savings, references, and whether a guarantor or co-signer is available.",
      },
      {
        heading: "Check your own situation",
        body:
          "The rent affordability calculator can combine up to four applicant incomes and show country-specific notes. For shared homes, the joint tenant affordability calculator may be a better fit.",
      },
    ],
    faqs: [
      {
        question: "What salary do I need for 1,200 rent?",
        answer:
          "As a rough UK-style example, 30x monthly rent is 36,000 annual income and 36x monthly rent is 43,200 annual income. Other countries may use monthly income ratios or rent-to-income percentages.",
      },
      {
        question: "Can two people combine income for 1,200 rent?",
        answer:
          "Often, joint applicants can combine income, but requirements vary by country, landlord, agent, and property manager.",
      },
      {
        question: "Should I include debt payments?",
        answer:
          "Debt payments can matter for budgeting, but example rent multipliers may not always adjust for them. RentReadyCheck shows debt as a budgeting note rather than changing the example threshold result.",
      },
    ],
  },
  {
    slug: "how-much-income-to-rent-1500",
    title: "How Much Income Do You Need to Rent 1,500? | RentReadyCheck",
    description:
      "Estimate how much income may be needed for a 1,500 monthly rent using country-aware affordability examples.",
    h1: "How much income do you need to rent 1,500 a month?",
    intro:
      "A 1,500 monthly rent is a useful benchmark for checking whether income, joint income, or guarantor support may be enough before applying.",
    primaryLink: {
      href: "/rent-referencing-calculator",
      label: "Check affordability",
    },
    highlights: [
      { label: "UK-style 30x rent", value: "45,000 annual income" },
      { label: "UK-style 36x rent", value: "54,000 annual income" },
      { label: "US-style 3x rent", value: "4,500 gross monthly income" },
    ],
    sections: [
      {
        heading: "Quick estimate for 1,500 monthly rent",
        body:
          "In a UK-style multiplier check, 30x monthly rent would be 45,000 annual income and 36x monthly rent would be 54,000 annual income. In a US-style 3x monthly income example, gross monthly income would be around 4,500.",
      },
      {
        heading: "Joint tenants and higher rent",
        body:
          "For higher rents, joint income can make a big difference. Some landlords and property managers assess the household income together, while others may want each tenant to show income or provide extra support.",
      },
      {
        heading: "Plan beyond the monthly rent",
        body:
          "Affordability is not only about monthly rent. Deposits, bond, application fees, first rent payments, moving costs, and furniture can all affect whether a move is comfortable.",
      },
    ],
    faqs: [
      {
        question: "What is 30 times 1,500 rent?",
        answer:
          "30 times 1,500 monthly rent is 45,000 annual income in a UK-style annual multiplier example.",
      },
      {
        question: "What is 36 times 1,500 rent?",
        answer:
          "36 times 1,500 monthly rent is 54,000 annual income in a UK-style annual multiplier example.",
      },
      {
        question: "What if my income is lower than the example?",
        answer:
          "You may want to consider a lower rent, joint tenant income, savings, or a guarantor or co-signer. The exact options depend on the landlord, property manager, and local rules.",
      },
    ],
  },
  {
    slug: "what-is-30-times-rent",
    title: "What Is 30 Times Rent? | RentReadyCheck",
    description:
      "Learn what 30 times rent means, how to calculate it, and when it may be used as an example rent affordability check.",
    h1: "What is 30 times rent?",
    intro:
      "30 times rent is a simple affordability example that compares annual income with monthly rent. It is commonly discussed in the UK, but it is only one possible way to estimate affordability.",
    primaryLink: {
      href: "/rent-referencing-calculator",
      label: "Check affordability",
    },
    highlights: [
      { label: "Formula", value: "Monthly rent x 30" },
      { label: "Example", value: "1,200 rent = 36,000 income" },
      { label: "Best used as", value: "A rough starting point" },
    ],
    sections: [
      {
        heading: "How 30 times rent works",
        body:
          "To calculate a 30x rent example, multiply the monthly rent by 30. If the rent is 1,200 per month, 1,200 x 30 equals 36,000 annual income.",
      },
      {
        heading: "Is 30x rent used everywhere?",
        body:
          "No. Some UK landlords or letting agents may discuss 30x monthly rent, but other markets use different approaches. The United States often uses monthly income multiples, while Canada and Australia often discuss rent-to-income percentages.",
      },
      {
        heading: "When 30x rent may not be enough",
        body:
          "Some landlords or referencing providers may use a higher example such as 36x rent, especially if they want more income headroom. Credit history, job type, savings, and guarantor or co-signer support can also matter.",
      },
    ],
    faqs: [
      {
        question: "How do I calculate 30 times rent?",
        answer:
          "Multiply the monthly rent by 30. For example, 1,000 monthly rent multiplied by 30 equals 30,000 annual income.",
      },
      {
        question: "Is 30x rent the same as 3x monthly rent?",
        answer:
          "Not exactly. 30x monthly rent compares annual income with monthly rent. A 3x monthly income rule compares gross monthly income with monthly rent and is closer to 36x annual income.",
      },
      {
        question: "Does 30x rent guarantee approval?",
        answer:
          "No. It is only an example benchmark. Actual rental decisions can depend on many other factors.",
      },
    ],
  },
  {
    slug: "what-is-36-times-rent",
    title: "What Is 36 Times Rent? | RentReadyCheck",
    description:
      "Understand 36 times rent, how it compares with 30x rent, and why some rental checks use a higher income benchmark.",
    h1: "What is 36 times rent?",
    intro:
      "36 times rent is an affordability example that compares annual income with monthly rent. It roughly lines up with rent being one third of gross monthly income.",
    primaryLink: {
      href: "/rent-referencing-calculator",
      label: "Check affordability",
    },
    highlights: [
      { label: "Formula", value: "Monthly rent x 36" },
      { label: "Example", value: "1,200 rent = 43,200 income" },
      { label: "Similar to", value: "3x gross monthly income" },
    ],
    sections: [
      {
        heading: "How 36 times rent works",
        body:
          "To calculate a 36x rent example, multiply the monthly rent by 36. If rent is 1,200 per month, 1,200 x 36 equals 43,200 annual income.",
      },
      {
        heading: "Why 36x rent can feel stricter",
        body:
          "36x rent is higher than 30x rent, so it asks for more income for the same property. Some landlords, letting agents, or referencing providers may prefer this because it suggests more headroom after rent.",
      },
      {
        heading: "How this compares globally",
        body:
          "In the United States, people may describe a similar idea as needing gross monthly income around 3x the rent. In Canada and Australia, the conversation may focus more on rent as a percentage of gross income.",
      },
    ],
    faqs: [
      {
        question: "What is 36 times 1,000 rent?",
        answer:
          "36 times 1,000 monthly rent is 36,000 annual income.",
      },
      {
        question: "Is 36x rent stricter than 30x rent?",
        answer:
          "Yes. 36x rent requires a higher annual income than 30x rent for the same monthly rent.",
      },
      {
        question: "Can a guarantor help with 36x rent?",
        answer:
          "Sometimes. A landlord or property manager may ask for a guarantor or co-signer if applicant income is below an example threshold.",
      },
    ],
  },
  {
    slug: "how-much-does-a-guarantor-need-to-earn",
    title: "How Much Does a Guarantor Need to Earn? | RentReadyCheck",
    description:
      "Estimate how much a guarantor or co-signer may need to earn, with country differences for UK, US, Canada, and Australia rental applications.",
    h1: "How much does a guarantor or co-signer need to earn?",
    intro:
      "A guarantor or co-signer income requirement depends on the country, rent amount, and landlord or property manager. This page explains the common examples and links to the calculator.",
    primaryLink: {
      href: "/guarantor-income-calculator",
      label: "Estimate support",
    },
    highlights: [
      { label: "UK example", value: "Often 36x monthly rent" },
      { label: "US example", value: "Often 2.5x to 3.5x rent" },
      { label: "Canada/Australia", value: "Often rent-to-income examples" },
    ],
    sections: [
      {
        heading: "Why guarantor income rules vary",
        body:
          "A guarantor or co-signer is usually there to provide extra reassurance if the applicant's income, employment, or rental history does not meet the landlord's expectations. Because this creates extra risk for the support person, requirements can be stricter.",
      },
      {
        heading: "Common income examples",
        body:
          "In the UK, a guarantor example may use 36x monthly rent. In the United States, a co-signer example may use a monthly income multiple such as 3x rent. Canada and Australia may discuss rent compared with gross income.",
      },
      {
        heading: "What to check before asking someone",
        body:
          "Before asking someone to act as a guarantor or co-signer, confirm whether the landlord or property manager requires income evidence, credit checks, residency status, or a signed legal agreement.",
      },
    ],
    faqs: [
      {
        question: "Is a guarantor the same as a co-signer?",
        answer:
          "The wording and legal effect can vary by country and agreement. In general, both may involve someone supporting the rental application and taking on responsibility if rent is not paid.",
      },
      {
        question: "Can a retired person be a guarantor?",
        answer:
          "Possibly, but it depends on the landlord or property manager's requirements. They may consider pension income, savings, credit history, and local rules.",
      },
      {
        question: "Does the calculator guarantee a guarantor will be accepted?",
        answer:
          "No. It gives a rough estimate only. The final decision depends on the landlord, property manager, referencing provider, and individual circumstances.",
      },
    ],
  },
  {
    slug: "can-flatmates-combine-income-for-rent",
    title: "Can Flatmates Combine Income for Rent? | RentReadyCheck",
    description:
      "Learn when flatmates, housemates, or joint tenants may be able to combine income for a rental affordability check.",
    h1: "Can flatmates combine income for rent?",
    intro:
      "Flatmates, housemates, and joint tenants can often be assessed together, but the exact approach depends on the country, landlord, property manager, and tenancy setup.",
    primaryLink: {
      href: "/joint-tenant-affordability-calculator",
      label: "Check joint income",
    },
    highlights: [
      { label: "Common approach", value: "Combined household income" },
      { label: "Main risk", value: "One tenant leaving" },
      { label: "Useful tool", value: "Joint tenant calculator" },
    ],
    sections: [
      {
        heading: "How combined income may be assessed",
        body:
          "Some landlords and property managers look at the combined income of everyone applying together. This can help when no single tenant earns enough alone, but the household income appears stronger together.",
      },
      {
        heading: "Why the tenancy type matters",
        body:
          "If tenants are jointly responsible for the rent, the landlord may care about whether the group can cover the full rent. If tenants rent separate rooms on separate agreements, each person may be assessed differently.",
      },
      {
        heading: "What if one flatmate earns much more?",
        body:
          "A higher earner can improve combined income, but it can also raise fairness questions when splitting rent. The rent split calculator can compare equal, income-based, and room-size splits.",
      },
    ],
    faqs: [
      {
        question: "Do all tenants need to meet the income requirement separately?",
        answer:
          "Not always. Some applications use combined income, while others may assess each tenant separately or ask for guarantors or co-signers.",
      },
      {
        question: "Can students combine income?",
        answer:
          "Sometimes, but student applications may be handled differently and may require guarantors, proof of funding, or upfront rent depending on local practice.",
      },
      {
        question: "Should flatmates split rent equally?",
        answer:
          "Equal splits are simple, but income-based or room-size splits may feel fairer in some households. The best approach is the one everyone understands and agrees to in writing.",
      },
    ],
  },
  {
    slug: "how-much-should-i-save-before-moving-out",
    title: "How Much Should I Save Before Moving Out? | RentReadyCheck",
    description:
      "Estimate how much to save before moving out, including deposit or bond, first rent payment, moving costs, furniture, setup costs, and a safety buffer.",
    h1: "How much should I save before moving out?",
    intro:
      "Before moving out, it helps to estimate the upfront costs as well as the monthly rent. The right savings target depends on your country, rent amount, deposit or bond rules, and how much furniture or setup you need.",
    primaryLink: {
      href: "/move-in-cost-calculator",
      label: "Estimate costs",
    },
    highlights: [
      { label: "Common costs", value: "Deposit or bond" },
      { label: "Also plan for", value: "First rent and moving costs" },
      { label: "Helpful buffer", value: "Emergency savings if possible" },
    ],
    sections: [
      {
        heading: "Costs to plan before moving",
        body:
          "Typical upfront costs can include a deposit or bond, first rent payment, holding deposit or application fee, moving costs, furniture, utilities, broadband setup, and other household basics.",
      },
      {
        heading: "Why move-in costs vary by country",
        body:
          "The UK may use deposit and holding deposit wording, the United States and Canada may include application or admin fees, and Australia often uses bond terminology. Local rules can also limit or define some fees.",
      },
      {
        heading: "Build a realistic savings target",
        body:
          "A good starting point is to estimate the required upfront costs, then add a buffer for unexpected purchases or delayed income. The move-in cost calculator can help you list each cost in one place.",
      },
    ],
    faqs: [
      {
        question: "Should I save more than the deposit?",
        answer:
          "Usually yes. Deposit or bond is only one part of moving. First rent, moving costs, furniture, utilities, and emergency savings can all matter.",
      },
      {
        question: "How much emergency savings should renters have?",
        answer:
          "There is no single rule that fits everyone. Many people aim for a buffer that could cover at least a few unexpected bills, but the right amount depends on income stability and personal circumstances.",
      },
      {
        question: "Does RentReadyCheck store my moving cost inputs?",
        answer:
          "No. Calculator inputs are processed in your browser and the site does not intentionally store them.",
      },
    ],
  },
];

export function getSEOLandingPage(slug: string): SEOLandingPage {
  const page = seoLandingPages.find((item) => item.slug === slug);

  if (!page) {
    throw new Error(`SEO landing page not found: ${slug}`);
  }

  return page;
}
