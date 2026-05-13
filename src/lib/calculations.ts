export const AFFORDABILITY_MULTIPLIERS = [30, 36, 40] as const;
export type AffordabilityMultiplier = (typeof AFFORDABILITY_MULTIPLIERS)[number];

export function safeNumber(value: string | number | undefined | null): number {
  const numberValue = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numberValue) ? numberValue : 0;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercentage(value: number): string {
  if (!Number.isFinite(value)) {
    return "0.0%";
  }

  return `${value.toFixed(1)}%`;
}

export function calculateRequiredIncome(
  monthlyRent: number,
  multiplier: number,
): number {
  return monthlyRent * multiplier;
}

export function calculateRentPercentage(
  monthlyRent: number,
  annualIncome: number,
): number {
  if (annualIncome <= 0) {
    return 0;
  }

  return (monthlyRent / (annualIncome / 12)) * 100;
}

export function calculateDifference(actual: number, required: number): number {
  return actual - required;
}

export function hasNegativeValue(values: Array<string | number>): boolean {
  return values.some((value) => safeNumber(value) < 0);
}
