"use client";

import { AdPlaceholder } from "@/components/AdPlaceholder";
import { InputField } from "@/components/InputField";
import { ResultCard } from "@/components/ResultCard";
import { SelectField } from "@/components/SelectField";
import {
  calculateDifference,
  calculateRentPercentage,
  calculateRequiredIncome,
  formatCurrency,
  formatPercentage,
  hasNegativeValue,
  safeNumber,
} from "@/lib/calculations";
import { useState } from "react";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/80 bg-white/80 p-4">
      <p className="text-sm text-[#5f746f]">{label}</p>
      <p className="mt-1 text-lg font-bold text-[#17312b]">{value}</p>
    </div>
  );
}

function formatDifference(value: number) {
  const prefix = value >= 0 ? "above by " : "below by ";
  return `${prefix}${formatCurrency(Math.abs(value))}`;
}

export function RentReferencingCalculator() {
  const [monthlyRent, setMonthlyRent] = useStringState();
  const [income1, setIncome1] = useStringState();
  const [income2, setIncome2] = useStringState();
  const [income3, setIncome3] = useStringState();
  const [income4, setIncome4] = useStringState();
  const [debtPayments, setDebtPayments] = useStringState();
  const [hasGuarantor, setHasGuarantor] = useStringState("no");
  const [guarantorIncome, setGuarantorIncome] = useStringState();

  const rent = safeNumber(monthlyRent);
  const applicantIncomes = [income1, income2, income3, income4].map(safeNumber);
  const combinedIncome = applicantIncomes.reduce((sum, income) => sum + income, 0);
  const guarantor = safeNumber(guarantorIncome);
  const monthlyDebt = safeNumber(debtPayments);
  const required30 = calculateRequiredIncome(rent, 30);
  const required36 = calculateRequiredIncome(rent, 36);
  const requiredGuarantor = calculateRequiredIncome(rent, 36);
  const grossMonthlyIncome = combinedIncome / 12;
  const remainingAfterRent = grossMonthlyIncome - rent - monthlyDebt;
  const rentPercentage = calculateRentPercentage(rent, combinedIncome);
  const negativeInput = hasNegativeValue([
    monthlyRent,
    income1,
    income2,
    income3,
    income4,
    debtPayments,
    guarantorIncome,
  ]);

  let resultTitle = "Add your rent and income";
  let resultDescription =
    "Enter the monthly rent and at least one applicant income to see a rough affordability estimate.";
  let tone: "positive" | "warning" | "neutral" = "neutral";

  if (negativeInput) {
    resultTitle = "Please check the numbers";
    resultDescription = "Rent, income, and cost fields cannot be negative.";
    tone = "warning";
  } else if (rent <= 0) {
    resultTitle = "Enter the monthly rent";
    resultDescription = "Add the advertised monthly rent to calculate example income thresholds.";
  } else if (combinedIncome <= 0) {
    resultTitle = "Enter applicant income";
    resultDescription =
      "Add at least one applicant's annual income so the calculator can compare it with common checks.";
  } else if (combinedIncome >= required36) {
    resultTitle = "Likely to pass many affordability checks";
    resultDescription =
      "Your combined annual income is above 36 times the monthly rent, which is a common benchmark used by some landlords or letting agents.";
    tone = "positive";
  } else if (combinedIncome >= required30) {
    resultTitle = "May pass some affordability checks";
    resultDescription =
      "Your income is above 30 times the monthly rent, but below 36 times. Some landlords may accept this, while others may ask for a guarantor.";
    tone = "neutral";
  } else if (hasGuarantor === "yes" && guarantor >= requiredGuarantor) {
    resultTitle = "You may need a guarantor";
    resultDescription =
      "Your applicant income is below the example affordability threshold, but your guarantor income may meet a common guarantor benchmark.";
    tone = "warning";
  } else {
    resultTitle = "You may struggle to pass without extra support";
    resultDescription =
      "Based on these rough estimates, your income may be below common affordability checks. You may need a guarantor, savings, a lower rent, or a different property.";
    tone = "warning";
  }

  const showStats = rent > 0 && combinedIncome > 0 && !negativeInput;

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-[#d7e5df] bg-white p-5 shadow-[0_10px_28px_rgba(23,49,43,0.05)]">
        <div className="grid gap-4 md:grid-cols-2">
          <InputField id="monthly-rent" label="Monthly rent" value={monthlyRent} onChange={setMonthlyRent} prefix="£" required />
          <InputField id="income-1" label="Applicant 1 annual income" value={income1} onChange={setIncome1} prefix="£" required />
          <InputField id="income-2" label="Applicant 2 annual income" value={income2} onChange={setIncome2} prefix="£" />
          <InputField id="income-3" label="Applicant 3 annual income" value={income3} onChange={setIncome3} prefix="£" />
          <InputField id="income-4" label="Applicant 4 annual income" value={income4} onChange={setIncome4} prefix="£" />
          <InputField id="debt-payments" label="Monthly debt payments" value={debtPayments} onChange={setDebtPayments} prefix="£" helpText="Optional budgeting note only. This does not change the example 30x or 36x affordability result." />
          <SelectField id="has-guarantor" label="Has guarantor?" value={hasGuarantor} onChange={setHasGuarantor} options={[{ label: "No", value: "no" }, { label: "Yes", value: "yes" }]} />
          <InputField id="guarantor-income" label="Guarantor annual income" value={guarantorIncome} onChange={setGuarantorIncome} prefix="£" helpText="Optional. Used only if a guarantor is available." />
        </div>
      </section>

      <ResultCard title={resultTitle} description={resultDescription} tone={tone}>
        {showStats ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Stat label="Required income at 30x" value={formatCurrency(required30)} />
            <Stat label="Required income at 36x" value={formatCurrency(required36)} />
            <Stat label="Your combined income" value={formatCurrency(combinedIncome)} />
            <Stat label="Difference vs 30x" value={formatDifference(calculateDifference(combinedIncome, required30))} />
            <Stat label="Difference vs 36x" value={formatDifference(calculateDifference(combinedIncome, required36))} />
            <Stat label="Required guarantor income" value={formatCurrency(requiredGuarantor)} />
            {guarantorIncome ? <Stat label="Your guarantor income" value={formatCurrency(guarantor)} /> : null}
            <Stat label="Rent as gross income" value={formatPercentage(rentPercentage)} />
            <Stat label="Estimated gross monthly income" value={formatCurrency(grossMonthlyIncome)} />
            <Stat label="Budget estimate after rent and debt" value={formatCurrency(remainingAfterRent)} />
          </div>
        ) : null}
      </ResultCard>

      <AdPlaceholder />
    </div>
  );
}

function useStringState(initialValue = "") {
  return useState(initialValue);
}
