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

export function JointTenantCalculator() {
  const [monthlyRent, setMonthlyRent] = useState("");
  const [tenant1, setTenant1] = useState("");
  const [tenant2, setTenant2] = useState("");
  const [tenant3, setTenant3] = useState("");
  const [tenant4, setTenant4] = useState("");
  const [multiplier, setMultiplier] = useState("36");

  const rent = safeNumber(monthlyRent);
  const incomes = [tenant1, tenant2, tenant3, tenant4].map(safeNumber);
  const combinedIncome = incomes.reduce((sum, income) => sum + income, 0);
  const activeTenants = incomes.filter((income) => income > 0).length || 2;
  const required = calculateRequiredIncome(rent, safeNumber(multiplier));
  const difference = calculateDifference(combinedIncome, required);
  const rentPercentage = calculateRentPercentage(rent, combinedIncome);
  const negativeInput = hasNegativeValue([monthlyRent, tenant1, tenant2, tenant3, tenant4]);

  let title = "Add rent and tenant incomes";
  let description = "Enter rent and at least two incomes to estimate joint affordability.";
  let tone: "positive" | "warning" | "neutral" = "neutral";

  if (negativeInput) {
    title = "Please check the numbers";
    description = "Rent and income fields cannot be negative.";
    tone = "warning";
  } else if (rent <= 0) {
    title = "Enter the monthly rent";
    description = "The advertised rent is needed to estimate the joint threshold.";
  } else if (safeNumber(tenant1) <= 0 || safeNumber(tenant2) <= 0) {
    title = "Enter at least two tenant incomes";
    description = "Tenant 1 and Tenant 2 are required for this joint estimate.";
  } else if (difference >= 0) {
    title = "Combined income may pass";
    description = "The combined tenant income is above the selected example threshold.";
    tone = "positive";
  } else if (Math.abs(difference) <= required * 0.1) {
    title = "Combined income may be borderline";
    description = "The combined income is close to the selected example threshold.";
    tone = "neutral";
  } else {
    title = "Combined income may be too low";
    description = "The combined income is below this example threshold.";
    tone = "warning";
  }

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-[#d7e5df] bg-white p-5 shadow-[0_10px_28px_rgba(23,49,43,0.05)]">
        <div className="grid gap-4 md:grid-cols-2">
          <InputField id="monthly-rent" label="Monthly rent" value={monthlyRent} onChange={setMonthlyRent} prefix="£" required />
          <SelectField id="multiplier" label="Affordability multiplier" value={multiplier} onChange={setMultiplier} options={[{ label: "30x monthly rent", value: "30" }, { label: "36x monthly rent", value: "36" }, { label: "40x monthly rent", value: "40" }]} />
          <InputField id="tenant-1" label="Tenant 1 annual income" value={tenant1} onChange={setTenant1} prefix="£" required />
          <InputField id="tenant-2" label="Tenant 2 annual income" value={tenant2} onChange={setTenant2} prefix="£" required />
          <InputField id="tenant-3" label="Tenant 3 annual income" value={tenant3} onChange={setTenant3} prefix="£" />
          <InputField id="tenant-4" label="Tenant 4 annual income" value={tenant4} onChange={setTenant4} prefix="£" />
        </div>
      </section>
      <ResultCard title={title} description={description} tone={tone}>
        {rent > 0 && combinedIncome > 0 && !negativeInput ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <Metric label="Combined income" value={formatCurrency(combinedIncome)} />
            <Metric label="Required income" value={formatCurrency(required)} />
            <Metric label="Difference" value={`${difference >= 0 ? "Above" : "Below"} by ${formatCurrency(Math.abs(difference))}`} />
            <Metric label="Equal monthly share" value={formatCurrency(rent / activeTenants)} />
            <Metric label="Rent as gross income" value={formatPercentage(rentPercentage)} />
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
