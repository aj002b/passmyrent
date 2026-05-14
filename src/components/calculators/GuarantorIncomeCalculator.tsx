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
  calculateDifference,
  formatCurrencyByCountry,
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
import { useState } from "react";

export function GuarantorIncomeCalculator() {
  const [countryCode, setCountryCode] = useState<CountryCode>(defaultCountryCode);
  const [rentAmount, setRentAmount] = useState("");
  const [rentFrequency, setRentFrequency] = useState<RentFrequency>("monthly");
  const [supportPersonIncome, setSupportPersonIncome] = useState("");
  const [applicantIncome, setApplicantIncome] = useState("");
  const [threshold, setThreshold] = useState("36");

  const country = getCountryConfig(countryCode);
  const effectiveFrequency = country.code === "AU" ? rentFrequency : "monthly";
  const monthlyRent = normalizeRentToMonthly(safeNumber(rentAmount), effectiveFrequency);
  const supportIncome = safeNumber(supportPersonIncome);
  const applicant = safeNumber(applicantIncome);
  const selectedThreshold = safeNumber(threshold);
  const currency = (value: number) => formatCurrencyByCountry(value, country.code);
  const negativeInput = hasNegativeValue([rentAmount, supportPersonIncome, applicantIncome]);
  const supportPersonLabel = country.supportPersonLabel;

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
        : country.code === "CA"
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

  const required =
    country.code === "UK"
      ? monthlyRent * selectedThreshold
      : country.code === "US"
        ? monthlyRent * selectedThreshold * 12
        : (monthlyRent * 12) / (selectedThreshold / 100);
  const difference = calculateDifference(supportIncome, required);

  let title = `Add rent and ${supportPersonLabel} income`;
  let description = `Enter rent and ${supportPersonLabel} income to compare against an example threshold.`;
  let tone: "positive" | "warning" | "neutral" = "neutral";
  let badgeLabel = "Add details";

  if (negativeInput) {
    title = "Please check the numbers";
    description = "Rent and income fields cannot be negative.";
    tone = "warning";
    badgeLabel = "Check numbers";
  } else if (monthlyRent <= 0) {
    title = "Enter the rent amount";
    description = `The rent is needed before the ${supportPersonLabel} threshold can be estimated.`;
  } else if (supportIncome <= 0) {
    title = `Enter ${supportPersonLabel} income`;
    description = `Add the ${supportPersonLabel} annual income to see how it compares.`;
  } else if (difference >= 0) {
    title = `${supportPersonLabel[0].toUpperCase()}${supportPersonLabel.slice(1)} may meet this example threshold`;
    description = `The ${supportPersonLabel} income is at or above the selected example threshold.`;
    tone = "positive";
    badgeLabel = "Strong signal";
  } else if (Math.abs(difference) <= required * 0.1) {
    title = `${supportPersonLabel[0].toUpperCase()}${supportPersonLabel.slice(1)} may be borderline`;
    description = `The ${supportPersonLabel} income is close to the selected example threshold.`;
    tone = "neutral";
    badgeLabel = "Borderline signal";
  } else {
    title = `${supportPersonLabel[0].toUpperCase()}${supportPersonLabel.slice(1)} may not meet this example threshold`;
    description = `The ${supportPersonLabel} income is below the selected example threshold.`;
    tone = "warning";
    badgeLabel = "May need support";
  }

  return (
    <CalculatorLayout
      form={
        <section className="form-card space-y-4 p-4 sm:p-5">
          <FormSection
            step="Step 1"
            title="Where are you renting?"
            description="This changes the support-person wording, currency, and example thresholds."
            columns="grid-cols-1"
          >
            <CountrySelector country={country} onChange={setCountryCode} />
          </FormSection>

          <FormSection
            step="Step 2"
            title="Rent details"
            description="Add the rent amount so the example requirement can be estimated."
          >
            <InputField id="rent-amount" label={country.code === "AU" ? "Rent amount" : "Monthly rent"} value={rentAmount} onChange={setRentAmount} prefix={country.currencySymbol} required />
            {country.code === "AU" ? (
              <SelectField id="rent-frequency" label="Rent frequency" value={rentFrequency} onChange={(value) => setRentFrequency(value as RentFrequency)} options={[{ label: "Weekly", value: "weekly" }, { label: "Monthly", value: "monthly" }]} />
            ) : null}
          </FormSection>

          <FormSection
            step="Step 3"
            title="Applicant income"
            description="Optional comparison only. This does not replace the support-person estimate."
            columns="grid-cols-1"
          >
            <InputField id="applicant-income" label="Applicant annual income" value={applicantIncome} onChange={setApplicantIncome} prefix={country.currencySymbol} helpText="Optional comparison only." />
          </FormSection>

          <FormSection
            step="Step 4"
            title="Guarantor / co-signer support"
            description={`Compare the ${supportPersonLabel} income with a selected example threshold.`}
          >
            <InputField id="support-person-income" label={`${supportPersonLabel[0].toUpperCase()}${supportPersonLabel.slice(1)} annual income`} value={supportPersonIncome} onChange={setSupportPersonIncome} prefix={country.currencySymbol} required />
            <SelectField id="threshold" label="Example threshold" value={threshold} onChange={setThreshold} options={thresholdOptions} />
          </FormSection>
        </section>
      }
      result={
        <>
          <ResultCard title={title} description={description} tone={tone} badgeLabel={badgeLabel}>
            {monthlyRent > 0 && supportIncome > 0 && !negativeInput ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <Metric label="Monthly rent estimate" value={currency(monthlyRent)} />
                <Metric label={`Required ${supportPersonLabel} income`} value={currency(required)} />
                <Metric label={`${supportPersonLabel} income`} value={currency(supportIncome)} />
                <Metric label="Difference" value={`${difference >= 0 ? "Above" : "Below"} by ${currency(Math.abs(difference))}`} />
                {applicantIncome ? <Metric label="Applicant income comparison" value={`${currency(applicant)} vs ${currency(required)}`} /> : null}
              </div>
            ) : null}
          </ResultCard>
          <HowEstimateWorks>
            {country.note} The selected country changes the currency and whether
            this tool uses income multiples or rent-to-income examples.
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
