import { formatCurrency } from "@/lib/calculations";

export function CurrencyDisplay({ value }: { value: number }) {
  return <>{formatCurrency(value)}</>;
}
