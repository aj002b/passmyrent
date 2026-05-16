"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { TrackedLink } from "@/components/TrackedLink";
import { getDetectedCountry } from "@/lib/detectCountry";
import type { CountryCode } from "@/lib/countries";

const examples: Record<
  CountryCode,
  {
    badge: string;
    rows: Array<readonly [string, string]>;
    result: string;
  }
> = {
  UK: {
    badge: "UK",
    rows: [
      ["Country", "United Kingdom"],
      ["Monthly rent", "£1,200"],
      ["Combined income", "£42,000"],
    ],
    result: "Borderline",
  },
  US: {
    badge: "US",
    rows: [
      ["Country", "United States"],
      ["Monthly rent", "$1,500"],
      ["Combined income", "$60,000"],
    ],
    result: "Likely affordable",
  },
  CA: {
    badge: "CA",
    rows: [
      ["Country", "Canada"],
      ["Monthly rent", "$1,800"],
      ["Combined income", "$72,000"],
    ],
    result: "Borderline",
  },
  AU: {
    badge: "AU",
    rows: [
      ["Country", "Australia"],
      ["Weekly rent", "$550"],
      ["Combined income", "$95,000"],
    ],
    result: "Borderline",
  },
  ROW: {
    badge: "Other",
    rows: [
      ["Country", "Other / Rest of world"],
      ["Monthly rent", "$1,200"],
      ["Combined income", "$48,000"],
    ],
    result: "Borderline",
  },
};

const easeOut = [0.22, 1, 0.36, 1] as const;

export function HeroRentCheckPreview() {
  const reduceMotion = useReducedMotion();
  const [isReady, setIsReady] = useState(false);
  const [countryCode, setCountryCode] = useState<CountryCode>("ROW");
  const showFinalState = reduceMotion || isReady;
  const example = examples[countryCode];

  useEffect(() => {
    setCountryCode(getDetectedCountry());

    if (reduceMotion) {
      setIsReady(true);
      return;
    }

    const timer = window.setTimeout(() => setIsReady(true), 1550);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <motion.div
      className="premium-card-strong p-2.5 backdrop-blur"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.32, ease: easeOut, delay: reduceMotion ? 0 : 0.08 }}
    >
      <div className="rounded-[1.25rem] border border-[#D6E7E1] bg-[#F7FAF8] p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-extrabold text-[#0F2E2B]">
              Estimated affordability
            </p>
            <p className="mt-1 text-sm text-[#5F726C]">
              Example outcome using country-aware checks.
            </p>
          </div>
          <span className="rounded-full border border-[#D6E7E1] bg-[#DFF4EC] px-3 py-1 text-xs font-extrabold text-[#0F766E]">
            {example.badge}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#D6E7E1] bg-white/78 px-3 py-2 text-xs font-bold text-[#5F726C]">
          <motion.span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-[#0F766E]"
            animate={
              reduceMotion
                ? undefined
                : { scale: [1, 1.35, 1], opacity: [0.55, 1, 0.55] }
            }
            transition={
              reduceMotion
                ? undefined
                : { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
            }
          />
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={showFinalState ? "ready" : "checking"}
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: reduceMotion ? 0 : 0.18, ease: easeOut }}
            >
              {showFinalState ? "Example outcome ready" : "Checking country-aware estimate..."}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="mt-5 grid gap-3">
          {example.rows.map(([label, value], index) => (
            <motion.div
              key={label}
              className="flex items-center justify-between rounded-xl border border-[#D6E7E1] bg-white px-4 py-3 shadow-[0_8px_18px_rgba(15,46,43,0.035)]"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.22,
                ease: easeOut,
                delay: reduceMotion ? 0 : 0.28 + index * 0.14,
              }}
            >
              <span className="text-sm font-semibold text-[#5F726C]">
                {label}
              </span>
              <span className="text-sm font-bold text-[#0F2E2B]">{value}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#D6E7E1]">
          <motion.div
            className="h-full rounded-full bg-[linear-gradient(90deg,#0F766E,#DFF4EC)]"
            initial={reduceMotion ? false : { width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: reduceMotion ? 0 : 0.72,
              ease: easeOut,
              delay: reduceMotion ? 0 : 0.84,
            }}
          />
        </div>

        <AnimatePresence>
          {showFinalState ? (
            <motion.div
              className="mt-5 rounded-2xl border border-[#D6E7E1] bg-[linear-gradient(135deg,#DFF4EC_0%,#ffffff_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: reduceMotion ? 0 : 0.24, ease: easeOut }}
            >
              <span className="inline-flex rounded-full border border-[#D6E7E1] bg-white px-3 py-1 text-xs font-extrabold text-[#0F766E] shadow-sm">
                {example.result}
              </span>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-[#D6E7E1] bg-white/80 p-3">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#5F726C]">
                    Estimate type
                  </p>
                  <p className="mt-1 text-sm font-extrabold text-[#0F2E2B]">
                    Country-aware
                  </p>
                </div>
                <div className="rounded-xl border border-[#D6E7E1] bg-white/80 p-3">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#5F726C]">
                    Example check
                  </p>
                  <p className="mt-1 text-sm font-extrabold text-[#0F2E2B]">
                    Rent vs income
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-[#5F726C]">
                Results are estimates only and may vary by landlord or region.
              </p>
              <TrackedLink
                href="/rent-referencing-calculator"
                eventName="homepage_hero_affordability_click"
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-[#D6E7E1] bg-white px-4 py-3 text-sm font-extrabold text-[#0F2E2B] transition hover:bg-[#DFF4EC] hover:text-[#0B5E58] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:ring-offset-2"
              >
                See full breakdown
              </TrackedLink>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
