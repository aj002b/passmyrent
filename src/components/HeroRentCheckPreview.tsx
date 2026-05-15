"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
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
      ["Check", "36x monthly rent"],
    ],
    result: "Possible signal",
  },
  US: {
    badge: "US",
    rows: [
      ["Country", "United States"],
      ["Monthly rent", "$1,500"],
      ["Combined income", "$60,000"],
      ["Check", "3x monthly rent"],
    ],
    result: "Strong signal",
  },
  CA: {
    badge: "CA",
    rows: [
      ["Country", "Canada"],
      ["Monthly rent", "$1,800"],
      ["Combined income", "$72,000"],
      ["Check", "30% rent-to-income"],
    ],
    result: "Possible signal",
  },
  AU: {
    badge: "AU",
    rows: [
      ["Country", "Australia"],
      ["Weekly rent", "$550"],
      ["Combined income", "$95,000"],
      ["Check", "30% rent-to-income"],
    ],
    result: "Possible signal",
  },
  ROW: {
    badge: "Other",
    rows: [
      ["Country", "Other / Rest of world"],
      ["Monthly rent", "$1,200"],
      ["Combined income", "$48,000"],
      ["Check", "generic 30% rent-to-income"],
    ],
    result: "Possible signal",
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
      className="premium-card-strong p-3 backdrop-blur"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.32, ease: easeOut, delay: reduceMotion ? 0 : 0.08 }}
    >
      <div className="rounded-[1.1rem] border border-[#d7e5df] bg-[#fbfdfc] p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-extrabold text-[#17312b]">
              Example rent check
            </p>
            <p className="mt-1 text-sm text-[#5f746f]">
              Country-specific assumptions in a simple result card.
            </p>
          </div>
          <span className="rounded-full border border-[#c7ddd5] bg-[#e8f5ef] px-3 py-1 text-xs font-extrabold text-[#116a5b]">
            {example.badge}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#dbe8e2] bg-white/78 px-3 py-2 text-xs font-bold text-[#5f746f]">
          <motion.span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-[#116a5b]"
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
              {showFinalState ? "Estimate ready" : "Checking affordability signal..."}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="mt-5 space-y-3">
          {example.rows.map(([label, value], index) => (
            <motion.div
              key={label}
              className="flex items-center justify-between rounded-xl border border-[#e3eee9] bg-white px-4 py-3 shadow-[0_8px_18px_rgba(23,49,43,0.035)]"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.22,
                ease: easeOut,
                delay: reduceMotion ? 0 : 0.28 + index * 0.14,
              }}
            >
              <span className="text-sm font-semibold text-[#5f746f]">
                {label}
              </span>
              <span className="text-sm font-bold text-[#17312b]">{value}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#e4eee9]">
          <motion.div
            className="h-full rounded-full bg-[linear-gradient(90deg,#116a5b,#9ccfbd)]"
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
              className="mt-5 rounded-2xl border border-[#e9c4ad] bg-[linear-gradient(180deg,#fff7ee_0%,#ffffff_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: reduceMotion ? 0 : 0.24, ease: easeOut }}
            >
              <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-extrabold text-[#b6533f] shadow-sm">
                {example.result}
              </span>
              <p className="mt-4 text-sm leading-6 text-[#6a5148]">
                Results are estimates only. Some landlords may ask for a
                guarantor or co-signer.
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
