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

type DepositType = "fixed" | "weeks" | "months";

export function MoveInCostCalculator() {
  const [countryCode, setCountryCode] = useState<CountryCode>(defaultCountryCode);
  const [rentAmount, setRentAmount] = useState("");
  const [rentFrequency, setRentFrequency] = useState<RentFrequency>("monthly");
  const [depositType, setDepositType] = useState<DepositType>("weeks");
  const [depositValue, setDepositValue] = useState("5");
  const [firstRentRequired, setFirstRentRequired] = useState("yes");
  const [feeAmount, setFeeAmount] = useState("");
  const [movingCost, setMovingCost] = useState("");
  const [furniture, setFurniture] = useState("");
  const [utilities, setUtilities] = useState("");
  const [otherCosts, setOtherCosts] = useState("");

  const country = getCountryConfig(countryCode);
  const effectiveFrequency = country.code === "AU" ? rentFrequency : "monthly";
  const rent = safeNumber(rentAmount);
  const monthlyRent = normalizeRentToMonthly(rent, effectiveFrequency);
  const weeklyRent = (monthlyRent * 12) / 52;
  const currency = (value: number) => formatCurrencyByCountry(value, country.code);
  const feeLabel =
    country.code === "UK"
      ? "Holding deposit"
      : country.code === "AU"
        ? "Bond/holding deposit"
        : "Application/admin fee";
  const setupCostLabel =
    country.code === "ROW" ? "Setup costs" : "Utilities/broadband setup";
  const deposit =
    depositType === "fixed"
      ? safeNumber(depositValue)
      : depositType === "weeks"
        ? weeklyRent * safeNumber(depositValue)
        : monthlyRent * safeNumber(depositValue);
  const firstRent = firstRentRequired === "yes" ? monthlyRent : 0;
  const extras =
    safeNumber(feeAmount) +
    safeNumber(movingCost) +
    safeNumber(furniture) +
    safeNumber(utilities) +
    safeNumber(otherCosts);
  const total = deposit + firstRent + extras;
  const negativeInput = hasNegativeValue([
    rentAmount,
    depositValue,
    feeAmount,
    movingCost,
    furniture,
    utilities,
    otherCosts,
  ]);

  const title =
    monthlyRent > 0 && !negativeInput
      ? `Estimated upfront cost: ${currency(total)}`
      : negativeInput
        ? "Please check the numbers"
        : "Enter the rent amount";
  const description =
    monthlyRent > 0 && !negativeInput
      ? "This adds the selected deposit, first rent payment if needed, and your optional moving costs."
      : negativeInput
        ? "Rent and cost fields cannot be negative."
        : "Add the rent amount to estimate deposit and first upfront costs.";

  return (
    <CalculatorLayout
      form={
        <section className="form-card space-y-4 p-4 sm:p-5">
          <FormSection
            step="Step 1"
            title="Where are you renting?"
            description="This changes currency, rent-frequency options, and local fee wording."
            columns="grid-cols-1"
          >
            <CountrySelector country={country} onChange={setCountryCode} />
          </FormSection>

          <FormSection
            step="Step 2"
            title="Rent details"
            description="Add the rent and whether the first rent payment is due upfront."
          >
            <InputField id="rent-amount" label={country.code === "AU" ? "Rent amount" : "Monthly rent"} value={rentAmount} onChange={setRentAmount} prefix={country.currencySymbol} required />
            {country.code === "AU" ? (
              <SelectField id="rent-frequency" label="Rent frequency" value={rentFrequency} onChange={(value) => setRentFrequency(value as RentFrequency)} options={[{ label: "Weekly", value: "weekly" }, { label: "Monthly", value: "monthly" }]} />
            ) : null}
            <SelectField id="first-rent" label="First rent payment required?" value={firstRentRequired} onChange={setFirstRentRequired} options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]} />
          </FormSection>

          <FormSection
            step="Step 3"
            title="Deposit"
            description="Choose the deposit style that matches the property listing."
          >
            <SelectField id="deposit-type" label="Deposit type" value={depositType} onChange={(value) => setDepositType(value as DepositType)} options={[{ label: "Fixed amount", value: "fixed" }, { label: "Weeks of rent", value: "weeks" }, { label: "Months of rent", value: "months" }]} />
            <InputField id="deposit-value" label={depositType === "fixed" ? "Deposit amount" : depositType === "weeks" ? "Deposit weeks" : "Deposit months"} value={depositValue} onChange={setDepositValue} prefix={depositType === "fixed" ? country.currencySymbol : undefined} required />
          </FormSection>

          <FormSection
            step="Step 4"
            title="Other upfront costs"
            description="Add any extra costs you want included in the move-in estimate."
          >
            <InputField id="fee-amount" label={`${feeLabel} amount`} value={feeAmount} onChange={setFeeAmount} prefix={country.currencySymbol} />
            <InputField id="moving-cost" label="Moving cost" value={movingCost} onChange={setMovingCost} prefix={country.currencySymbol} />
            <InputField id="furniture" label="Furniture cost" value={furniture} onChange={setFurniture} prefix={country.currencySymbol} />
            <InputField id="utilities" label={setupCostLabel} value={utilities} onChange={setUtilities} prefix={country.currencySymbol} />
            <InputField id="other-costs" label="Other costs" value={otherCosts} onChange={setOtherCosts} prefix={country.currencySymbol} />
          </FormSection>
        </section>
      }
      result={
        <>
          <ResultCard title={title} description={description} tone={negativeInput ? "warning" : "neutral"} badgeLabel={monthlyRent > 0 && !negativeInput ? "Estimated total" : "Add details"}>
            {monthlyRent > 0 && !negativeInput ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <Metric label="Monthly rent estimate" value={currency(monthlyRent)} />
                <Metric label="Weekly rent estimate" value={currency(weeklyRent)} />
                <Metric label="Deposit" value={currency(deposit)} />
                <Metric label="First rent payment" value={currency(firstRent)} />
                <Metric label={feeLabel} value={currency(safeNumber(feeAmount))} />
                <Metric label="Moving cost" value={currency(safeNumber(movingCost))} />
                <Metric label="Furniture" value={currency(safeNumber(furniture))} />
                <Metric label={setupCostLabel} value={currency(safeNumber(utilities))} />
                <Metric label="Other costs" value={currency(safeNumber(otherCosts))} />
              </div>
            ) : null}
          </ResultCard>
          <HowEstimateWorks>
            {country.code === "ROW"
              ? "Move-in costs vary widely by country, city, landlord, and property manager. This is a generic planning estimate only."
              : "The selected country changes the currency, rent frequency support, and wording for fees such as holding deposits, bonds, or application fees. The total is still a rough planning estimate."}
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
