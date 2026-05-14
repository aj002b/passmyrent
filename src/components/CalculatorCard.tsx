import Link from "next/link";

type CalculatorCardProps = {
  title: string;
  description: string;
  href: string;
  badge?: string;
  bestFor?: string;
  ctaLabel?: string;
};

export function CalculatorCard({
  title,
  description,
  href,
  badge,
  bestFor,
  ctaLabel,
}: CalculatorCardProps) {
  const isCalculator = href.includes("calculator");
  const label = ctaLabel ?? (isCalculator ? "Open calculator" : "Open tool");

  return (
    <Link
      href={href}
      className="premium-card group relative flex h-full min-h-[15rem] overflow-hidden p-5 transition duration-200 hover:-translate-y-1 hover:border-[#8fc3b4] hover:shadow-[0_22px_48px_rgba(23,49,43,0.12)] focus:outline-none focus:ring-2 focus:ring-[#116a5b] focus:ring-offset-4 sm:p-6"
    >
      <span className="absolute right-4 top-4 h-12 w-12 rounded-full bg-[#e8f5ef]/70 blur-xl transition group-hover:bg-[#cce7dc]" />
      <div className="relative flex min-h-full w-full flex-col">
        <div className="flex min-h-[3.1rem] items-start gap-3">
          {badge ? (
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#c7ddd5] bg-[#e8f5ef] text-sm font-extrabold text-[#116a5b] transition group-hover:border-[#116a5b] group-hover:bg-[#dcefe7]">
              {badge}
            </span>
          ) : null}
          <div className="min-w-0">
            <h3 className="text-[1.05rem] font-extrabold leading-[1.22] tracking-[-0.018em] text-[#17312b]">
              {title}
            </h3>
          </div>
        </div>
        <p className="mt-1.5 min-h-[2.9rem] text-sm leading-6 text-[#5f746f]">
          {description}
        </p>
        {bestFor ? (
          <p className="mt-5 min-h-[52px] rounded-xl border border-[#e1ece7] bg-white/70 px-3 py-2 text-xs leading-5 text-[#5f746f]">
            <span className="font-extrabold text-[#17312b]">Best for:</span>{" "}
            {bestFor}
          </p>
        ) : null}
        <span className="mt-auto inline-flex h-10 min-w-40 items-center justify-center rounded-full border border-[#b7d4ca] bg-[#eef8f3] px-4 text-center text-sm font-extrabold text-[#0b4c43] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] transition group-hover:border-[#8fc3b4] group-hover:bg-[#e1f2ea] group-hover:text-[#083b35] group-focus-visible:border-[#116a5b]">
          {label}
        </span>
      </div>
    </Link>
  );
}
