"use client";

import { AdPlaceholder } from "@/components/AdPlaceholder";
import { InputField } from "@/components/InputField";
import { ResultCard } from "@/components/ResultCard";
import { SelectField } from "@/components/SelectField";
import { formatCurrency, formatPercentage, hasNegativeValue, safeNumber } from "@/lib/calculations";
import { useState } from "react";

type SplitMethod = "equal" | "income" | "room";

export function RentSplitCalculator() {
  const [monthlyRent, setMonthlyRent] = useState("");
  const [splitMethod, setSplitMethod] = useState<SplitMethod>("equal");
  const [tenantCount, setTenantCount] = useState("2");
  const [names, setNames] = useState(["", "", "", ""]);
  const [incomes, setIncomes] = useState(["", "", "", ""]);
  const [roomScores, setRoomScores] = useState(["1", "1", "1", "1"]);

  const rent = safeNumber(monthlyRent);
  const count = safeNumber(tenantCount);
  const activeNames = names.slice(0, count);
  const activeIncomes = incomes.slice(0, count).map(safeNumber);
  const activeScores = roomScores.slice(0, count).map(safeNumber);
  const negativeInput = hasNegativeValue([monthlyRent, ...activeIncomes, ...activeScores]);
  const totalWeight =
    splitMethod === "income"
      ? activeIncomes.reduce((sum, income) => sum + income, 0)
      : splitMethod === "room"
        ? activeScores.reduce((sum, score) => sum + score, 0)
        : count;

  const rows = Array.from({ length: count }, (_, index) => {
    const weight =
      splitMethod === "income"
        ? activeIncomes[index]
        : splitMethod === "room"
          ? activeScores[index]
          : 1;
    const percentage = totalWeight > 0 ? (weight / totalWeight) * 100 : 0;
    return {
      name: activeNames[index] || `Tenant ${index + 1}`,
      share: totalWeight > 0 ? rent * (percentage / 100) : 0,
      percentage,
    };
  });

  const missingRequiredWeights =
    (splitMethod === "income" && activeIncomes.some((income) => income <= 0)) ||
    (splitMethod === "room" && activeScores.some((score) => score <= 0));

  let title = "Enter rent to split";
  let description = "Add monthly rent and choose a split method to estimate each tenant's share.";
  let tone: "positive" | "warning" | "neutral" = "neutral";

  if (negativeInput) {
    title = "Please check the numbers";
    description = "Rent, income, and room score fields cannot be negative.";
    tone = "warning";
  } else if (rent <= 0) {
    title = "Enter the monthly rent";
  } else if (missingRequiredWeights) {
    title = splitMethod === "income" ? "Add each tenant's income" : "Add each room score";
    description =
      splitMethod === "income"
        ? "Income-based splits need an income for every tenant."
        : "Room-size splits need a positive room score for every tenant.";
    tone = "warning";
  } else {
    title = "Estimated rent split";
    description =
      splitMethod === "equal"
        ? "Each tenant pays the same monthly share."
        : splitMethod === "income"
          ? "Each tenant pays a share based on their share of total income."
          : "Each tenant pays a share based on the room size scores.";
    tone = "positive";
  }

  function updateList(
    setter: (value: string[]) => void,
    current: string[],
    index: number,
    value: string,
  ) {
    const next = [...current];
    next[index] = value;
    setter(next);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-[#d7e5df] bg-white p-5 shadow-[0_10px_28px_rgba(23,49,43,0.05)]">
        <div className="grid gap-4 md:grid-cols-3">
          <InputField id="monthly-rent" label="Monthly rent" value={monthlyRent} onChange={setMonthlyRent} prefix="£" required />
          <SelectField id="split-method" label="Split method" value={splitMethod} onChange={(value) => setSplitMethod(value as SplitMethod)} options={[{ label: "Equal split", value: "equal" }, { label: "Income-based split", value: "income" }, { label: "Room-size split", value: "room" }]} />
          <SelectField id="tenant-count" label="Number of tenants" value={tenantCount} onChange={setTenantCount} options={[{ label: "2 tenants", value: "2" }, { label: "3 tenants", value: "3" }, { label: "4 tenants", value: "4" }]} />
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {Array.from({ length: count }, (_, index) => (
            <div key={index} className="rounded-xl border border-[#d7e5df] bg-[#f7fbf8] p-4">
              <InputField id={`tenant-name-${index}`} label={`Tenant ${index + 1} name`} value={names[index]} onChange={(value) => updateList(setNames, names, index, value)} placeholder={`Tenant ${index + 1}`} type="text" />
              {splitMethod === "income" ? (
                <div className="mt-4">
                  <InputField id={`tenant-income-${index}`} label="Annual income" value={incomes[index]} onChange={(value) => updateList(setIncomes, incomes, index, value)} prefix="£" required />
                </div>
              ) : null}
              {splitMethod === "room" ? (
                <div className="mt-4">
                  <InputField id={`room-score-${index}`} label="Room size score" value={roomScores[index]} onChange={(value) => updateList(setRoomScores, roomScores, index, value)} helpText="Example: small 1, medium 1.25, large 1.5" required />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <ResultCard title={title} description={description} tone={tone}>
        {rent > 0 && !negativeInput && !missingRequiredWeights ? (
          <div className="overflow-x-auto rounded-lg border border-white/80 bg-white/80">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead className="border-b border-[#dbe8e2] text-[#5f746f]">
                <tr>
                  <th className="px-4 py-3">Tenant</th>
                  <th className="px-4 py-3">Monthly share</th>
                  <th className="px-4 py-3">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.name} className="border-b border-[#edf4f1] last:border-0">
                    <td className="px-4 py-3 font-bold text-[#17312b]">{row.name}</td>
                    <td className="px-4 py-3">{formatCurrency(row.share)}</td>
                    <td className="px-4 py-3">{formatPercentage(row.percentage)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </ResultCard>
      <AdPlaceholder />
    </div>
  );
}
