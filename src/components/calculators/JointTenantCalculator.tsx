"use client";

import { AdPlaceholder } from "@/components/AdPlaceholder";
import {
  CalculatorLayout,
  FormSection,
  HowEstimateWorks,
} from "@/components/CalculatorLayout";
import { CountrySelector } from "@/components/CountrySelector";
import { InputField } from "@/components/InputField";
import { AnimatedStatCard } from "@/components/Motion";
import { ResultCard } from "@/components/ResultCard";
import { SelectField } from "@/components/SelectField";
import {
  calculateAnnualMultiplierRequirement,
  calculateDifference,
  calculateRentToIncomePercentage,
  formatCurrencyByCountry,
  formatPercentage,
  getCountryAffordabilityResult,
  hasNegativeValue,
  normalizeRentToMonthly,
  safeNumber,
} from "@/lib/calculations";
import {
  defaultCountryCode,
  getCountryConfig,
  type CountryCode,
  type RentFrequency,
} from "@/lib/countries";
import { getCountryFromQueryParam, getDetectedCountry } from "@/lib/detectCountry";
import { useEffect, useState } from "react";

export function JointTenantCalculator() {
  const [countryCode, setCountryCode] = useState<CountryCode>(defaultCountryCode);
  const [rentAmount, setRentAmount] = useState("");
  const [rentFrequency, setRentFrequency] = useState<RentFrequency>("monthly");
  const [tenant1, setTenant1] = useState("");
  const [tenant2, setTenant2] = useState("");
  const [tenant3, setTenant3] = useState("");
  const [tenant4, setTenant4] = useState("");
  const [threshold, setThreshold] = useState("36");

  const country = getCountryConfig(countryCode);
  const effectiveFrequency = country.code === "AU" ? rentFrequency : "monthly";
  const rent = safeNumber(rentAmount);
  const monthlyRent = normalizeRentToMonthly(rent, effectiveFrequency);
  const incomes = [tenant1, tenant2, tenant3, tenant4].map(safeNumber);
  const combinedIncome = incomes.reduce((sum, income) => sum + income, 0);
  const activeTenants = incomes.filter((income) => income > 0).length || 2;
  const currency = (value: number) => formatCurrencyByCountry(value, country.code);
  const rentPercentage = calculateRentToIncomePercentage(monthlyRent, combinedIncome);
  const negativeInput = hasNegativeValue([rentAmount, tenant1, tenant2, tenant3, tenant4]);

  useEffect(() => {
    const queryCountry = getCountryFromQueryParam(
      new URLSearchParams(window.location.search).get("country"),
    );

    handleCountryChange(queryCountry ?? getDetectedCountry());
  }, []);

  function handleCountryChange(nextCountryCode: CountryCode) {
    setCountryCode(nextCountryCode);
    setThreshold(
      nextCountryCode === "UK"
        ? "36"
        : nextCountryCode === "US"
          ? "3"
          : nextCountryCode === "AU"
            ? "30"
            : "30",
    );
  }

  const thresholdOptions =
    country.code === "UK"
      ? [
          { label: "30x monthly rent", value: "30" },
          { label: "36x monthly rent", value: "36" },
          { label: "40x monthly rent", value: "40" },
        ]
      : country.code === "US"
        ? [
            { label: "2.5x monthly rent", value: "2.5" },
            { label: "3x monthly rent", value: "3" },
            { label: "3.5x monthly rent", value: "3.5" },
          ]
        : country.code === "CA" || country.code === "ROW"
          ? [
              { label: "30% rent-to-income", value: "30" },
              { label: "35% rent-to-income", value: "35" },
              { label: "40% rent-to-income", value: "40" },
            ]
          : [
              { label: "25% rent-to-income", value: "25" },
              { label: "30% rent-to-income", value: "30" },
              { label: "35% rent-to-income", value: "35" },
            ];

  const selectedThreshold = safeNumber(threshold);
  const required =
    country.code === "UK"
      ? calculateAnnualMultiplierRequirement(monthlyRent, selectedThreshold)
      : country.code === "US"
        ? monthlyRent * selectedThreshold * 12
        : (monthlyRent * 12) / (selectedThreshold / 100);
  const difference = calculateDifference(combinedIncome, required);

  let result = getCountryAffordabilityResult(
    country,
    rent,
    effectiveFrequency,
    combinedIncome,
  );

  if (negativeInput) {
    result = {
      title: "Please check the numbers",
      description: "Rent and income fields cannot be negative.",
      tone: "warning",
    };
  } else if (rent <= 0) {
    result = {
      title: "Enter the rent amount",
      description: "The advertised rent is needed to estimate the joint threshold.",
      tone: "neutral",
    };
  } else if (safeNumber(tenant1) <= 0 || safeNumber(tenant2) <= 0) {
    result = {
      title: "Enter at least two tenant incomes",
      description: "Tenant 1 and Tenant 2 are required for this joint estimate.",
      tone: "neutral",
    };
  }

  return (
    <CalculatorLayout
      form={
        <section className="form-card space-y-4 p-4 sm:p-5">
          <FormSection
            step="Step 1"
            title="Where are you renting?"
            description="This changes the example method and currency shown in the estimate."
            columns="grid-cols-1"
          >
            <CountrySelector country={country} onChange={handleCountryChange} />
          </FormSection>

          <FormSection
            step="Step 2"
            title="Rent details"
            description="Add the rent and choose the example threshold you want to compare."
          >
            <InputField id="rent-amount" label={country.code === "AU" ? "Rent amount" : "Monthly rent"} value={rentAmount} onChange={setRentAmount} prefix={country.currencySymbol} required />
            {country.code === "AU" ? (
              <SelectField id="rent-frequency" label="Rent frequency" value={rentFrequency} onChange={(value) => setRentFrequency(value as RentFrequency)} options={[{ label: "Weekly", value: "weekly" }, { label: "Monthly", value: "monthly" }]} />
            ) : null}
            <SelectField id="threshold" label="Example threshold" value={threshold} onChange={setThreshold} options={thresholdOptions} />
          </FormSection>

          <FormSection
            step="Step 3"
            title="Tenant income"
            description="Add annual income for each person applying together."
          >
            <InputField id="tenant-1" label="Tenant 1 annual income" value={tenant1} onChange={setTenant1} prefix={country.currencySymbol} required />
            <InputField id="tenant-2" label="Tenant 2 annual income" value={tenant2} onChange={setTenant2} prefix={country.currencySymbol} required />
            <InputField id="tenant-3" label="Tenant 3 annual income" value={tenant3} onChange={setTenant3} prefix={country.currencySymbol} />
            <InputField id="tenant-4" label="Tenant 4 annual income" value={tenant4} onChange={setTenant4} prefix={country.currencySymbol} />
          </FormSection>
        </section>
      }
      result={
        <>
          <ResultCard title={result.title} description={result.description} tone={result.tone} badgeLabel={result.title}>
            {monthlyRent > 0 && combinedIncome > 0 && !negativeInput ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <Metric label="Combined income" value={currency(combinedIncome)} />
                <Metric label="Required income" value={currency(required)} />
                <Metric label="Difference" value={`${difference >= 0 ? "Above" : "Below"} by ${currency(Math.abs(difference))}`} />
                <Metric label="Equal monthly share" value={currency(monthlyRent / activeTenants)} />
                <Metric label="Rent as gross income" value={formatPercentage(rentPercentage)} />
              </div>
            ) : null}
          </ResultCard>
          <HowEstimateWorks>
            {country.note} The selected country changes the threshold options,
            currency formatting, and how rent is compared with combined income.
            {country.code === "ROW" ? ` ${country.disclaimer}` : ""}
          </HowEstimateWorks>
        </>
      }
    >
      <AdPlaceholder />
    </CalculatorLayout>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <AnimatedStatCard label={label} value={value} />;
}
