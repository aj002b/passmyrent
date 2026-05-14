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
  calculateIncomeMultiple,
  calculateMonthlyIncomeFromAnnualIncome,
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
import { useEffect, useState } from "react";

function Stat({ label, value }: { label: string; value: string }) {
  return <AnimatedStatCard label={label} value={value} />;
}

function getCountryFromQuery(value: string | null): CountryCode | null {
  const normalized = value?.trim().toLowerCase();

  if (!normalized) {
    return null;
  }

  const countryMap: Record<string, CountryCode> = {
    uk: "UK",
    gb: "UK",
    "united-kingdom": "UK",
    us: "US",
    usa: "US",
    "united-states": "US",
    ca: "CA",
    canada: "CA",
    au: "AU",
    australia: "AU",
  };

  return countryMap[normalized] ?? null;
}

export function RentReferencingCalculator() {
  const [countryCode, setCountryCode] = useState<CountryCode>(defaultCountryCode);
  const [rentAmount, setRentAmount] = useState("");
  const [rentFrequency, setRentFrequency] = useState<RentFrequency>("monthly");
  const [income1, setIncome1] = useState("");
  const [income2, setIncome2] = useState("");
  const [income3, setIncome3] = useState("");
  const [income4, setIncome4] = useState("");
  const [debtPayments, setDebtPayments] = useState("");
  const [hasSupportPerson, setHasSupportPerson] = useState("no");
  const [supportPersonIncome, setSupportPersonIncome] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryCountry = getCountryFromQuery(params.get("country"));
    const queryRent = params.get("rent");
    const queryFrequency = params.get("frequency");
    const queryIncome = params.get("income");

    if (queryCountry) {
      setCountryCode(queryCountry);
    }

    if (queryRent && safeNumber(queryRent) >= 0) {
      setRentAmount(queryRent);
    }

    if (queryFrequency === "weekly" || queryFrequency === "monthly") {
      setRentFrequency(queryFrequency);
    }

    if (queryIncome && safeNumber(queryIncome) >= 0) {
      setIncome1(queryIncome);
    }
  }, []);

  const country = getCountryConfig(countryCode);
  const effectiveFrequency = country.code === "AU" ? rentFrequency : "monthly";
  const rent = safeNumber(rentAmount);
  const monthlyRent = normalizeRentToMonthly(rent, effectiveFrequency);
  const applicantIncomes = [income1, income2, income3, income4].map(safeNumber);
  const combinedIncome = applicantIncomes.reduce((sum, income) => sum + income, 0);
  const supportIncome = safeNumber(supportPersonIncome);
  const monthlyDebt = safeNumber(debtPayments);
  const grossMonthlyIncome = calculateMonthlyIncomeFromAnnualIncome(combinedIncome);
  const remainingAfterRent = grossMonthlyIncome - monthlyRent - monthlyDebt;
  const rentPercentage = calculateRentToIncomePercentage(monthlyRent, combinedIncome);
  const incomeMultiple = calculateIncomeMultiple(monthlyRent, combinedIncome);
  const supportPersonLabel = country.supportPersonLabel;
  const negativeInput = hasNegativeValue([
    rentAmount,
    income1,
    income2,
    income3,
    income4,
    debtPayments,
    supportPersonIncome,
  ]);

  let result = getCountryAffordabilityResult(
    country,
    rent,
    effectiveFrequency,
    combinedIncome,
    hasSupportPerson === "yes" ? supportIncome : 0,
  );

  if (negativeInput) {
    result = {
      title: "Please check the numbers",
      description: "Rent, income, and cost fields cannot be negative.",
      tone: "warning",
    };
  } else if (rent <= 0) {
    result = {
      title: "Enter the rent amount",
      description: "Add the advertised rent to calculate example affordability signals.",
      tone: "neutral",
    };
  } else if (combinedIncome <= 0) {
    result = {
      title: "Enter applicant income",
      description:
        "Add at least one applicant's annual income so the calculator can compare it with the selected country's examples.",
      tone: "neutral",
    };
  }

  const showStats = rent > 0 && combinedIncome > 0 && !negativeInput;
  const required30 = calculateAnnualMultiplierRequirement(monthlyRent, 30);
  const required36 = calculateAnnualMultiplierRequirement(monthlyRent, 36);
  const required3x = monthlyRent * 3 * 12;
  const currency = (value: number) => formatCurrencyByCountry(value, country.code);

  return (
    <CalculatorLayout
      form={
        <section className="form-card space-y-4 p-4 sm:p-5">
          <FormSection
            step="Step 1"
            title="Where are you renting?"
            description="This changes the example affordability method, currency, and support-person wording."
            columns="grid-cols-1"
          >
            <CountrySelector country={country} onChange={setCountryCode} />
          </FormSection>

          <FormSection
            step="Step 2"
            title="Rent details"
            description="Add the advertised rent. Debt payments are shown for budgeting only."
          >
            <InputField
              id="rent-amount"
              label={country.code === "AU" ? "Rent amount" : "Monthly rent"}
              value={rentAmount}
              onChange={setRentAmount}
              prefix={country.currencySymbol}
              required
            />
            {country.code === "AU" ? (
              <SelectField
                id="rent-frequency"
                label="Rent frequency"
                value={rentFrequency}
                onChange={(value) => setRentFrequency(value as RentFrequency)}
                options={[
                  { label: "Weekly", value: "weekly" },
                  { label: "Monthly", value: "monthly" },
                ]}
              />
            ) : null}
            <InputField
              id="debt-payments"
              label="Monthly debt payments"
              value={debtPayments}
              onChange={setDebtPayments}
              prefix={country.currencySymbol}
              helpText="Optional budgeting note only. This does not change the example affordability result."
            />
          </FormSection>

          <FormSection
            step="Step 3"
            title="Applicant income"
            description="Add annual income for the people applying for the rental."
          >
            <InputField id="income-1" label="Applicant 1 annual income" value={income1} onChange={setIncome1} prefix={country.currencySymbol} required />
            <InputField id="income-2" label="Applicant 2 annual income" value={income2} onChange={setIncome2} prefix={country.currencySymbol} />
            <InputField id="income-3" label="Applicant 3 annual income" value={income3} onChange={setIncome3} prefix={country.currencySymbol} />
            <InputField id="income-4" label="Applicant 4 annual income" value={income4} onChange={setIncome4} prefix={country.currencySymbol} />
          </FormSection>

          <FormSection
            step="Step 4"
            title="Guarantor / co-signer support"
            description={`Optional. Add this only if a ${supportPersonLabel} is part of the application.`}
          >
            <SelectField
              id="has-support-person"
              label={`Has ${supportPersonLabel}?`}
              value={hasSupportPerson}
              onChange={setHasSupportPerson}
              options={[
                { label: "No", value: "no" },
                { label: "Yes", value: "yes" },
              ]}
            />
            <InputField
              id="support-person-income"
              label={`${supportPersonLabel[0].toUpperCase()}${supportPersonLabel.slice(1)} annual income`}
              value={supportPersonIncome}
              onChange={setSupportPersonIncome}
              prefix={country.currencySymbol}
              helpText={`Optional. Used only if a ${supportPersonLabel} is available.`}
            />
          </FormSection>
        </section>
      }
      result={
        <>
          <ResultCard title={result.title} description={result.description} tone={result.tone} badgeLabel={result.title}>
            {showStats ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <Stat label="Selected country" value={country.name} />
                <Stat label="Monthly rent estimate" value={currency(monthlyRent)} />
                <Stat label="Your combined income" value={currency(combinedIncome)} />
                <Stat label="Gross monthly income" value={currency(grossMonthlyIncome)} />
                <Stat label="Rent as gross income" value={formatPercentage(rentPercentage)} />
                <Stat label="Income multiple" value={`${incomeMultiple.toFixed(2)}x monthly rent`} />
                {country.code === "UK" ? (
                  <>
                    <Stat label="Required income at 30x" value={currency(required30)} />
                    <Stat label="Required income at 36x" value={currency(required36)} />
                    <Stat label="Difference vs 36x" value={`${calculateDifference(combinedIncome, required36) >= 0 ? "Above" : "Below"} by ${currency(Math.abs(calculateDifference(combinedIncome, required36)))}`} />
                  </>
                ) : null}
                {country.code === "US" ? (
                  <Stat label="Required income at 3x" value={currency(required3x)} />
                ) : null}
                {supportPersonIncome ? <Stat label={`${supportPersonLabel} income`} value={currency(supportIncome)} /> : null}
                <Stat label="After rent and debt" value={currency(remainingAfterRent)} />
              </div>
            ) : null}
          </ResultCard>
          <HowEstimateWorks>
            {country.note} Changing the country changes the currency, example
            thresholds, rent-frequency handling, and whether the tool says
            guarantor or co-signer.
          </HowEstimateWorks>
        </>
      }
    >
      <AdPlaceholder />
    </CalculatorLayout>
  );
}
