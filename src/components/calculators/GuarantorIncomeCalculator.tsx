"use client";

import { AdPlaceholder } from "@/components/AdPlaceholder";
import { InputField } from "@/components/InputField";
import { ResultCard } from "@/components/ResultCard";
import { SelectField } from "@/components/SelectField";
import {
  calculateDifference,
  calculateRequiredIncome,
  formatCurrency,
  hasNegativeValue,
  safeNumber,
} from "@/lib/calculations";
import { useState } from "react";

export function GuarantorIncomeCalculator() {
  const [monthlyRent, setMonthlyRent] = useState("");
  const [guarantorIncome, setGuarantorIncome] = useState("");
  const [tenantIncome, setTenantIncome] = useState("");
  const [multiplier, setMultiplier] = useState("36");

  const rent = safeNumber(monthlyRent);
  const guarantor = safeNumber(guarantorIncome);
  const tenant = safeNumber(tenantIncome);
  const selectedMultiplier = safeNumber(multiplier);
  const required = calculateRequiredIncome(rent, selectedMultiplier);
  const difference = calculateDifference(guarantor, required);
  const negativeInput = hasNegativeValue([monthlyRent, guarantorIncome, tenantIncome]);

  let title = "Add rent and guarantor income";
  let description =
    "Enter the monthly rent and guarantor income to compare against an example threshold.";
  let tone: "positive" | "warning" | "neutral" = "neutral";

  if (negativeInput) {
    title = "Please check the numbers";
    description = "Rent and income fields cannot be negative.";
    tone = "warning";
  } else if (rent <= 0) {
    title = "Enter the monthly rent";
    description = "The rent is needed before the guarantor threshold can be estimated.";
  } else if (guarantor <= 0) {
    title = "Enter guarantor income";
    description = "Add the guarantor's annual income to see how it compares.";
  } else if (difference >= 0) {
    title = "Guarantor likely meets this example threshold";
    description =
      "The guarantor income is at or above the selected example multiplier.";
    tone = "positive";
  } else if (Math.abs(difference) <= required * 0.1) {
    title = "Guarantor may be borderline";
    description =
      "The guarantor income is close to the selected example threshold, so requirements may depend on the letting agent or landlord.";
    tone = "neutral";
  } else {
    title = "Guarantor may not meet this example threshold";
    description =
      "The guarantor income is below the selected example threshold. A lower rent or different guarantor may be needed.";
    tone = "warning";
  }

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-[#d7e5df] bg-white p-5 shadow-[0_10px_28px_rgba(23,49,43,0.05)]">
        <div className="grid gap-4 md:grid-cols-2">
          <InputField id="monthly-rent" label="Monthly rent" value={monthlyRent} onChange={setMonthlyRent} prefix="£" required />
          <InputField id="guarantor-income" label="Guarantor annual income" value={guarantorIncome} onChange={setGuarantorIncome} prefix="£" required />
          <SelectField id="multiplier" label="Multiplier" value={multiplier} onChange={setMultiplier} options={[{ label: "30x monthly rent", value: "30" }, { label: "36x monthly rent", value: "36" }, { label: "40x monthly rent", value: "40" }]} />
          <InputField id="tenant-income" label="Tenant annual income" value={tenantIncome} onChange={setTenantIncome} prefix="£" helpText="Optional comparison only." />
        </div>
      </section>

      <ResultCard title={title} description={description} tone={tone}>
        {rent > 0 && guarantor > 0 && !negativeInput ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <Metric label="Required guarantor income" value={formatCurrency(required)} />
            <Metric label="Guarantor income" value={formatCurrency(guarantor)} />
            <Metric label="Difference" value={`${difference >= 0 ? "Above" : "Below"} by ${formatCurrency(Math.abs(difference))}`} />
            {tenantIncome ? <Metric label="Tenant income comparison" value={`${formatCurrency(tenant)} vs ${formatCurrency(required)}`} /> : null}
          </div>
        ) : null}
      </ResultCard>
      <AdPlaceholder />
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/80 bg-white/80 p-4">
      <p className="text-sm text-[#5f746f]">{label}</p>
      <p className="mt-1 text-lg font-bold text-[#17312b]">{value}</p>
    </div>
  );
}
