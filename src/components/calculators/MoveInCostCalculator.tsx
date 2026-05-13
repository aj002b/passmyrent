"use client";

import { AdPlaceholder } from "@/components/AdPlaceholder";
import { InputField } from "@/components/InputField";
import { ResultCard } from "@/components/ResultCard";
import { SelectField } from "@/components/SelectField";
import { formatCurrency, hasNegativeValue, safeNumber } from "@/lib/calculations";
import { useState } from "react";

export function MoveInCostCalculator() {
  const [monthlyRent, setMonthlyRent] = useState("");
  const [depositWeeks, setDepositWeeks] = useState("5");
  const [firstMonthRequired, setFirstMonthRequired] = useState("yes");
  const [holdingDeposit, setHoldingDeposit] = useState("");
  const [movingVan, setMovingVan] = useState("");
  const [furniture, setFurniture] = useState("");
  const [broadband, setBroadband] = useState("");
  const [otherCosts, setOtherCosts] = useState("");

  const rent = safeNumber(monthlyRent);
  const weeklyRent = (rent * 12) / 52;
  const deposit = weeklyRent * safeNumber(depositWeeks);
  const firstMonth = firstMonthRequired === "yes" ? rent : 0;
  const extras =
    safeNumber(holdingDeposit) +
    safeNumber(movingVan) +
    safeNumber(furniture) +
    safeNumber(broadband) +
    safeNumber(otherCosts);
  const total = deposit + firstMonth + extras;
  const negativeInput = hasNegativeValue([
    monthlyRent,
    holdingDeposit,
    movingVan,
    furniture,
    broadband,
    otherCosts,
  ]);

  const title =
    rent > 0 && !negativeInput
      ? `Estimated upfront cost: ${formatCurrency(total)}`
      : negativeInput
        ? "Please check the numbers"
        : "Enter the monthly rent";
  const description =
    rent > 0 && !negativeInput
      ? "This adds the selected deposit, first month's rent if needed, and your optional moving costs."
      : negativeInput
        ? "Rent and cost fields cannot be negative."
        : "Add the monthly rent to estimate the deposit and first upfront costs.";

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-[#d7e5df] bg-white p-5 shadow-[0_10px_28px_rgba(23,49,43,0.05)]">
        <div className="grid gap-4 md:grid-cols-2">
          <InputField id="monthly-rent" label="Monthly rent" value={monthlyRent} onChange={setMonthlyRent} prefix="£" required />
          <SelectField id="deposit-weeks" label="Deposit weeks" value={depositWeeks} onChange={setDepositWeeks} options={[{ label: "4 weeks", value: "4" }, { label: "5 weeks", value: "5" }, { label: "6 weeks", value: "6" }]} />
          <SelectField id="first-month" label="First month's rent required?" value={firstMonthRequired} onChange={setFirstMonthRequired} options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]} />
          <InputField id="holding-deposit" label="Holding deposit amount" value={holdingDeposit} onChange={setHoldingDeposit} prefix="£" />
          <InputField id="moving-van" label="Moving van cost" value={movingVan} onChange={setMovingVan} prefix="£" />
          <InputField id="furniture" label="Furniture cost" value={furniture} onChange={setFurniture} prefix="£" />
          <InputField id="broadband" label="Broadband setup cost" value={broadband} onChange={setBroadband} prefix="£" />
          <InputField id="other-costs" label="Other costs" value={otherCosts} onChange={setOtherCosts} prefix="£" />
        </div>
      </section>

      <ResultCard title={title} description={description} tone={negativeInput ? "warning" : "neutral"}>
        {rent > 0 && !negativeInput ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <Metric label="Weekly rent estimate" value={formatCurrency(weeklyRent)} />
            <Metric label="Deposit" value={formatCurrency(deposit)} />
            <Metric label="First month's rent" value={formatCurrency(firstMonth)} />
            <Metric label="Holding deposit" value={formatCurrency(safeNumber(holdingDeposit))} />
            <Metric label="Moving van" value={formatCurrency(safeNumber(movingVan))} />
            <Metric label="Furniture" value={formatCurrency(safeNumber(furniture))} />
            <Metric label="Broadband setup" value={formatCurrency(safeNumber(broadband))} />
            <Metric label="Other costs" value={formatCurrency(safeNumber(otherCosts))} />
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
