"use client";

import Link from "next/link";
import { trackRentReadyEvent } from "@/lib/analytics";

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
      onClick={() => {
        trackRentReadyEvent("calculator_card_click", {
          calculator_name: title,
        });
      }}
      className="premium-card group relative flex h-full min-h-[13.5rem] overflow-hidden p-5 transition duration-200 hover:-translate-y-1 hover:border-[#8fc3b4] hover:shadow-[0_18px_44px_rgba(23,49,43,0.12)] focus:outline-none focus:ring-2 focus:ring-[#116a5b] focus:ring-offset-4"
    >
      <span className="absolute right-4 top-4 h-14 w-14 rounded-full bg-[#e8f5ef]/80 blur-2xl transition group-hover:bg-[#cce7dc]" />
      <div className="relative flex min-h-full w-full flex-col gap-4">
        <div className="flex items-start gap-4">
          {badge ? (
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#c7ddd5] bg-[#e8f5ef] text-sm font-extrabold text-[#116a5b] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition group-hover:border-[#116a5b] group-hover:bg-[#dcefe7]">
              {badge}
            </span>
          ) : null}
          <div className="min-w-0">
            <h3 className="text-base font-extrabold leading-snug tracking-[-0.018em] text-[#17312b] sm:text-[1.05rem]">
              {title}
            </h3>
          </div>
        </div>
        <p className="min-h-[3rem] text-sm leading-6 text-[#5f746f]">
          {description}
        </p>
        {bestFor ? (
          <p className="rounded-xl border border-[#e1ece7] bg-white/80 px-3 py-2 text-sm leading-5 text-[#5f746f]">
            <span className="font-extrabold text-[#17312b]">Best for:</span>{" "}
            {bestFor}
          </p>
        ) : null}
        <div className="mt-auto pt-2">
          <span className="inline-flex h-10 min-w-40 items-center justify-center rounded-2xl border border-[#b7d4ca] bg-[#eef8f3] px-5 text-center text-sm font-extrabold text-[#0b4c43] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] transition group-hover:border-[#8fc3b4] group-hover:bg-[#e1f2ea] group-hover:text-[#083b35] group-focus-visible:border-[#116a5b]">
            {label}
          </span>
        </div>
      </div>
    </Link>
  );
}
