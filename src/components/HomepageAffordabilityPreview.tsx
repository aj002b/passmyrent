"use client";

import Link from "next/link";
import { InputField } from "@/components/InputField";
import { SelectField } from "@/components/SelectField";
import { trackRentReadyEvent } from "@/lib/analytics";
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
import { getDetectedCountry } from "@/lib/detectCountry";
import { estimateDisclaimer } from "@/lib/site";
import { useEffect, useMemo, useState } from "react";

function getSignalStyle(signal: string) {
  const normalized = signal.toLowerCase();

  if (normalized.includes("strong")) {
    return "border-[#D6E7E1] bg-[#DFF4EC] text-[#0F766E]";
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
  const [userChangedCountry, setUserChangedCountry] = useState(false);

  useEffect(() => {
    if (!userChangedCountry) {
      setCountryCode(getDetectedCountry());
    }
  }, [userChangedCountry]);

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
    <section className="overflow-hidden rounded-[1.7rem] border border-[#D6E7E1] bg-[linear-gradient(135deg,#FFFFFF_0%,#F7FAF8_100%)] shadow-[0_22px_60px_rgba(15,46,43,0.08)]">
      <div className="grid gap-0 lg:grid-cols-[0.78fr_1.22fr]">
      <div className="border-b border-[#D6E7E1] bg-[#F7FAF8] p-5 sm:p-6 lg:border-b-0 lg:border-r">
        <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#0F766E]">
          Quick affordability check
        </p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.025em] text-[#0F2E2B]">
          Get a quick rent affordability estimate
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5F726C]">
          Enter the basics here, then open the full calculator for the detailed
          country-aware breakdown.
        </p>
        <div className="mt-5 grid gap-3 text-sm font-bold text-[#5F726C]">
          {["No personal data required", "Private browser calculation", "Works across supported countries"].map((item) => (
            <p key={item} className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#0F766E] shadow-[0_0_0_4px_rgba(15,118,110,0.12)]" />
              {item}
            </p>
          ))}
        </div>
        <p className="mt-5 text-xs leading-5 text-[#5F726C]">
          Default country is estimated from your browser settings. You can change
          it anytime.
        </p>
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <SelectField
            id="home-country"
            label="Country"
            value={country.code}
            onChange={(value) => {
              setUserChangedCountry(true);
              trackRentReadyEvent("country_selector_change", {
                calculator_name: "Homepage quick affordability estimate",
                selected_country: value as CountryCode,
              });
              setCountryCode(value as CountryCode);
            }}
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

        <div className="mt-5 rounded-2xl border border-[#D6E7E1] bg-white p-4 shadow-[0_12px_28px_rgba(15,46,43,0.055)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#5F726C]">
                Affordability signal
              </p>
              <span
                className={`mt-3 inline-flex rounded-full border px-3 py-1 text-sm font-extrabold ${getSignalStyle(result.title)}`}
              >
                {result.title}
              </span>
            </div>
            <Link
              href={breakdownHref}
              className="btn-primary w-full sm:w-auto"
              onClick={() => {
                trackRentReadyEvent("quick_calculator_full_breakdown_click", {
                  calculator_name: "Homepage quick affordability estimate",
                  selected_country: country.code,
                  result_signal: result.title,
                });
              }}
            >
              See full breakdown
            </Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-[#D6E7E1] bg-[#F7FAF8] p-3">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#5F726C]">
                Rent
              </p>
              <p className="mt-1 text-lg font-extrabold text-[#0F2E2B]">
                {hasEnoughInput ? formatCurrencyByCountry(monthlyRent, country.code) : "Add rent"}
              </p>
            </div>
            <div className="rounded-xl border border-[#D6E7E1] bg-[#F7FAF8] p-3">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#5F726C]">
                Income
              </p>
              <p className="mt-1 text-lg font-extrabold text-[#0F2E2B]">
                {hasEnoughInput ? formatCurrencyByCountry(income, country.code) : "Add income"}
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-[#5F726C]">
            {hasEnoughInput
              ? `${formatCurrencyByCountry(monthlyRent, country.code)} monthly rent compared with ${formatCurrencyByCountry(income, country.code)} annual income.`
              : result.description}
          </p>
          <p className="mt-3 text-xs leading-5 text-[#5F726C]">
            {estimateDisclaimer}
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}
