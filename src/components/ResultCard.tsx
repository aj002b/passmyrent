import { estimateDisclaimer } from "@/lib/site";

type ResultCardProps = {
  title: string;
  description: string;
  tone?: "positive" | "warning" | "neutral";
  children?: React.ReactNode;
};

const toneStyles = {
  positive: "border-[#a8d8c6] bg-[#edf8f3]",
  warning: "border-[#e9c4ad] bg-[#fff7ef]",
  neutral: "border-[#bfd5e3] bg-[#eef6fa]",
};

export function ResultCard({
  title,
  description,
  tone = "neutral",
  children,
}: ResultCardProps) {
  return (
    <section
      aria-live="polite"
      className={`rounded-xl border p-5 shadow-[0_12px_30px_rgba(23,49,43,0.06)] ${toneStyles[tone]}`}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#5f746f]">
        Estimate result
      </p>
      <h2 className="mt-2 text-2xl font-bold text-[#17312b]">{title}</h2>
      <p className="mt-3 leading-7 text-[#35534c]">{description}</p>
      {children ? <div className="mt-5">{children}</div> : null}
      <p className="mt-5 rounded-lg border border-white/80 bg-white/75 p-4 text-sm leading-6 text-[#35534c]">
        {estimateDisclaimer}
      </p>
    </section>
  );
}
