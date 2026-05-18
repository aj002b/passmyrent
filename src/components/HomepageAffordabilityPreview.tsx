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
import { useEffect, useMemo, useState } from "react";

function getDisplayOutcome(title: string) {
  const normalized = title.toLowerCase();

  if (normalized.includes("strong")) {
    return "Likely affordable";
  }

  if (normalized.includes("guarantor") || normalized.includes("co-signer")) {
    return "May need guarantor";
  }

  if (normalized.includes("support")) {
    return "High rent-to-income ratio";
  }

  if (normalized.includes("borderline") || normalized.includes("possible")) {
    return "Borderline";
  }

  return title;
}

function getSignalStyle(title: string) {
  const normalized = getDisplayOutcome(title).toLowerCase();

  if (normalized.includes("enter")) {
    return "border-[#D6E7E1] bg-white text-[#5F726C]";
  }

  if (normalized.includes("likely")) {
    return "border-[#D6E7E1] bg-[#DFF4EC] text-[#0F766E]";
  }

  if (normalized.includes("borderline")) {
    return "border-[#efd58a] bg-[#fff8df] text-[#80611a]";
  }

  if (normalized.includes("guarantor")) {
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
          "Enter a rent amount and annual income to see a quick affordability estimate.",
      };
  const displayOutcome = getDisplayOutcome(result.title);

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
    <section className="overflow-hidden rounded-[1.8rem] border border-[#D6E7E1] bg-white shadow-[0_24px_70px_rgba(15,46,43,0.08)]">
      <div className="grid gap-0 lg:grid-cols-[0.74fr_1.26fr]">
        <div className="bg-[linear-gradient(180deg,#F7FAF8_0%,#FFFFFF_100%)] p-5 sm:p-7 lg:border-r lg:border-[#D6E7E1]">
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#0F766E]">
            Quick affordability check
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.025em] text-[#0F2E2B]">
            Get a quick rent affordability estimate
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5F726C]">
            Enter the basics here, then open the full calculator for a detailed
            country-aware breakdown.
          </p>
          <p className="mt-5 rounded-2xl border border-[#D6E7E1] bg-white px-4 py-3 text-xs leading-5 text-[#5F726C]">
            Default country is estimated from your browser settings. You can
            change it anytime.
          </p>
        </div>

        <div className="p-5 sm:p-7">
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

        <div className="mt-5 rounded-3xl border border-[#D6E7E1] bg-[linear-gradient(135deg,#F7FAF8_0%,#FFFFFF_100%)] p-4 shadow-[0_12px_28px_rgba(15,46,43,0.055)] sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#5F726C]">
                Estimated affordability
              </p>
              <span
                className={`mt-3 inline-flex rounded-full border px-3 py-1 text-sm font-extrabold ${getSignalStyle(result.title)}`}
              >
                {displayOutcome}
              </span>
            </div>
            <Link
              href={breakdownHref}
              className="btn-primary w-full sm:w-auto"
              onClick={() => {
                trackRentReadyEvent("quick_calculator_full_breakdown_click", {
                  calculator_name: "Homepage quick affordability estimate",
                  selected_country: country.code,
                  result_signal: displayOutcome,
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
            Results are estimates only and may vary by landlord or region.
          </p>
        </div>
        </div>
      </div>
    </section>
  );
}
