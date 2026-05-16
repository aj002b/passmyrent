"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { estimateDisclaimer } from "@/lib/site";

type ResultCardProps = {
  title: string;
  description: string;
  tone?: "positive" | "warning" | "neutral";
  badgeLabel?: string;
  children?: React.ReactNode;
};

const toneStyles = {
  positive: "border-[#D6E7E1] bg-[linear-gradient(180deg,#F7FAF8_0%,#ffffff_100%)]",
  warning: "border-[#e7b99e] bg-[linear-gradient(180deg,#fff7ef_0%,#ffffff_100%)]",
  neutral: "border-[#b7d5e3] bg-[linear-gradient(180deg,#f0f8fb_0%,#ffffff_100%)]",
};

const badgeStyles = {
  positive: "border-[#D6E7E1] bg-[#DFF4EC] text-[#0F766E]",
  warning: "border-[#e7b99e] bg-[#fff1e6] text-[#0F766E]",
  neutral: "border-[#b7d5e3] bg-[#eef6fa] text-[#2c6680]",
};

function getSignalBadgeStyle(label: string, tone: "positive" | "warning" | "neutral") {
  const normalized = label.toLowerCase();

  if (normalized.includes("strong")) {
    return "border-[#D6E7E1] bg-[#DFF4EC] text-[#0F766E]";
  }

  if (normalized.includes("possible")) {
    return "border-[#efd58a] bg-[#fff8df] text-[#80611a]";
  }

  if (normalized.includes("borderline")) {
    return "border-[#e9c4ad] bg-[#fff1e6] text-[#a84d37]";
  }

  if (normalized.includes("help")) {
    return "border-[#b7d5e3] bg-[#eef6fa] text-[#2c6680]";
  }

  if (normalized.includes("support") || normalized.includes("check")) {
    return "border-[#efc2bd] bg-[#fff1f0] text-[#a43e35]";
  }

  return badgeStyles[tone];
}

export function ResultCard({
  title,
  description,
  tone = "neutral",
  badgeLabel = "Estimate",
  children,
}: ResultCardProps) {
  const reduceMotion = useReducedMotion();
  const contentKey = `${tone}-${badgeLabel}-${title}-${description}`;
  const duration = reduceMotion ? 0 : 0.24;

  return (
    <section
      aria-live="polite"
      className={`rounded-2xl border p-5 shadow-[0_18px_45px_rgba(15,46,43,0.08)] sm:p-6 ${toneStyles[tone]}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={contentKey}
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
          transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#5F726C]">
              Estimate result
            </p>
            <motion.span
              key={badgeLabel}
              initial={reduceMotion ? false : { scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-full border px-3 py-1 text-xs font-extrabold ${getSignalBadgeStyle(badgeLabel, tone)}`}
            >
              {badgeLabel}
            </motion.span>
          </div>
          <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.02em] text-[#0F2E2B]">
            {title}
          </h2>
          <p className="mt-3 leading-7 text-[#5F726C]">{description}</p>
        </motion.div>
      </AnimatePresence>
      {children ? (
        <motion.div
          key={`stats-${contentKey}`}
          className="mt-5"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: reduceMotion ? 0 : 0.04,
                delayChildren: reduceMotion ? 0 : 0.03,
              },
            },
          }}
        >
          {children}
        </motion.div>
      ) : null}
      <p className="mt-5 rounded-xl border border-[#D6E7E1] bg-white/60 p-4 text-xs leading-6 text-[#5F726C] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
        {estimateDisclaimer}
      </p>
    </section>
  );
}
