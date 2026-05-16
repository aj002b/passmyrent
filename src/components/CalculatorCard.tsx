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
      className="premium-card group relative flex h-full min-h-[14.25rem] overflow-hidden p-5 transition duration-200 hover:-translate-y-1 hover:border-[#0E5F67]/35 hover:shadow-[0_18px_44px_rgba(11,47,53,0.12)] focus:outline-none focus:ring-2 focus:ring-[#0E5F67] focus:ring-offset-4 sm:p-6"
    >
      <span className="absolute right-4 top-4 h-14 w-14 rounded-full bg-[#E8F3F6]/80 blur-2xl transition group-hover:bg-[#E8F3F6]" />
      <div className="relative flex min-h-full w-full flex-col">
        <div className="flex items-start gap-4">
          {badge ? (
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#D7E5EA] bg-[#E8F3F6] text-sm font-extrabold text-[#0E5F67] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition group-hover:border-[#0E5F67] group-hover:bg-[#E8F3F6]">
              {badge}
            </span>
          ) : null}
          <div className="min-w-0">
            <h3 className="text-base font-extrabold leading-snug tracking-[-0.018em] text-[#0B2F35] sm:text-[1.05rem]">
              {title}
            </h3>
          </div>
        </div>
        <p className="mt-4 min-h-[3rem] text-sm leading-6 text-[#5D6D75]">
          {description}
        </p>
        {bestFor ? (
          <p className="mt-3 min-h-[3.25rem] rounded-xl border border-[#D7E5EA] bg-white/80 px-3 py-2 text-sm leading-5 text-[#5D6D75]">
            <span className="font-extrabold text-[#0B2F35]">Best for:</span>{" "}
            {bestFor}
          </p>
        ) : null}
        <div className="mt-auto pt-4">
          <span className="inline-flex h-10 min-w-40 items-center justify-center rounded-full border border-[#D7E5EA] bg-[#E8F3F6] px-5 text-center text-sm font-extrabold text-[#0B2F35] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] transition group-hover:border-[#0E5F67]/45 group-hover:bg-white group-hover:text-[#0A3F49] group-focus-visible:border-[#0E5F67]">
            {label}
          </span>
        </div>
      </div>
    </Link>
  );
}
