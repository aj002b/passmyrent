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
      className="premium-card group relative flex h-full min-h-[13.5rem] overflow-hidden p-5 transition duration-200 hover:-translate-y-1 hover:border-[#0F766E]/35 hover:shadow-[0_18px_44px_rgba(15,46,43,0.12)] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:ring-offset-4"
    >
      <span className="absolute right-4 top-4 h-14 w-14 rounded-full bg-[#DFF4EC]/80 blur-2xl transition group-hover:bg-[#DFF4EC]" />
      <div className="relative flex min-h-full w-full flex-col gap-4">
        <div className="flex items-start gap-4">
          {badge ? (
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#D6E7E1] bg-[#DFF4EC] text-sm font-extrabold text-[#0F766E] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition group-hover:border-[#0F766E] group-hover:bg-[#DFF4EC]">
              {badge}
            </span>
          ) : null}
          <div className="min-w-0">
            <h3 className="text-base font-extrabold leading-snug tracking-[-0.018em] text-[#0F2E2B] sm:text-[1.05rem]">
              {title}
            </h3>
          </div>
        </div>
        <p className="min-h-[3rem] text-sm leading-6 text-[#5F726C]">
          {description}
        </p>
        {bestFor ? (
          <p className="rounded-xl border border-[#D6E7E1] bg-white/80 px-3 py-2 text-sm leading-5 text-[#5F726C]">
            <span className="font-extrabold text-[#0F2E2B]">Best for:</span>{" "}
            {bestFor}
          </p>
        ) : null}
        <div className="mt-auto pt-2">
          <span className="inline-flex h-10 min-w-40 items-center justify-center rounded-2xl border border-[#D6E7E1] bg-[#DFF4EC] px-5 text-center text-sm font-extrabold text-[#0F2E2B] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] transition group-hover:border-[#0F766E]/45 group-hover:bg-[#DFF4EC] group-hover:text-[#0B5E58] group-focus-visible:border-[#0F766E]">
            {label}
          </span>
        </div>
      </div>
    </Link>
  );
}
