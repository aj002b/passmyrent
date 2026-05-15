"use client";

import Link from "next/link";
import { InputField } from "@/components/InputField";
import { SelectField } from "@/components/SelectField";
import {
  formatCurrencyByCountry,
  getCountryAffordabilityResult,
  normalizeRentToMonthly,
  safeNumber,
} from "@/lib/calculations";
import {
  countries,
  defaultCountryCode,
  getCountryConfig,
  type CountryCode,
} from "@/lib/countries";
import { estimateDisclaimer } from "@/lib/site";
import { useMemo, useState } from "react";

function getSignalStyle(signal: string) {
  const normalized = signal.toLowerCase();

  if (normalized.includes("strong")) {
    return "border-[#9ccfbd] bg-[#e8f5ef] text-[#116a5b]";
  }

  if (normalized.includes("possible")) {
    return "border-[#efd58a] bg-[#fff8df] text-[#80611a]";
  }

  if (normalized.includes("borderline")) {
    return "border-[#e9c4ad] bg-[#fff1e6] text-[#a84d37]";
  }

  return "border-[#efc2bd] bg-[#fff1f0] text-[#a43e35]";
}

export function HomepageAffordabilityPreview() {
  const [countryCode, setCountryCode] = useState<CountryCode>(defaultCountryCode);
  const [rentAmount, setRentAmount] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");

  const country = getCountryConfig(countryCode);
  const rent = safeNumber(rentAmount);
  const income = safeNumber(annualIncome);
  const monthlyRent = normalizeRentToMonthly(rent, "monthly");
  const hasEnoughInput = rent > 0 && income > 0;

  const result = hasEnoughInput
    ? getCountryAffordabilityResult(country, rent, "monthly", income)
    : {
        title: "Enter your details",
        description:
          "Enter a rent amount and annual income to see a quick affordability signal.",
      };

  const breakdownHref = useMemo(() => {
    const params = new URLSearchParams();
    params.set("country", country.code.toLowerCase());

    if (rentAmount) {
      params.set("rent", rentAmount);
    }

    if (annualIncome) {
      params.set("income", annualIncome);
    }

    return `/rent-referencing-calculator?${params.toString()}`;
  }, [annualIncome, country.code, rentAmount]);

  return (
    <section className="premium-card-strong grid gap-5 p-5 md:grid-cols-[1fr_0.82fr] md:items-center md:p-6">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#b6533f]">
          Quick affordability check
        </p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.025em] text-[#17312b]">
          Get a quick rent affordability estimate
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5f746f]">
          Enter the basics here, then open the full calculator for the detailed
          country-aware breakdown.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <SelectField
            id="home-country"
            label="Country"
            value={country.code}
            onChange={(value) => setCountryCode(value as CountryCode)}
            options={countries.map((option) => ({
              label: option.name,
              value: option.code,
            }))}
          />
          <InputField
            id="home-rent"
            label="Monthly rent"
            value={rentAmount}
            onChange={setRentAmount}
            prefix={country.currencySymbol}
            placeholder="1200"
          />
          <InputField
            id="home-income"
            label="Annual income"
            value={annualIncome}
            onChange={setAnnualIncome}
            prefix={country.currencySymbol}
            placeholder="42000"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-[#d7e5df] bg-white/82 p-5 shadow-[0_12px_28px_rgba(23,49,43,0.06)]">
        <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#5f746f]">
          Affordability signal
        </p>
        <span
          className={`mt-3 inline-flex rounded-full border px-3 py-1 text-sm font-extrabold ${getSignalStyle(result.title)}`}
        >
          {result.title}
        </span>
        <p className="mt-3 text-sm leading-6 text-[#35534c]">
          {hasEnoughInput
            ? `${formatCurrencyByCountry(monthlyRent, country.code)} monthly rent compared with ${formatCurrencyByCountry(income, country.code)} annual income.`
            : result.description}
        </p>
        <p className="mt-3 text-xs leading-5 text-[#748882]">
          {estimateDisclaimer}
        </p>
        <Link href={breakdownHref} className="btn-primary mt-5 w-full">
          See full breakdown
        </Link>
      </div>
    </section>
  );
}
