"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SelectField } from "@/components/SelectField";
import {
  countries,
  type CountryCode,
  type CountryConfig,
} from "@/lib/countries";

type CountrySelectorProps = {
  country: CountryConfig;
  onChange: (countryCode: CountryCode) => void;
};

export function CountrySelector({ country, onChange }: CountrySelectorProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="md:col-span-2">
      <SelectField
        id="country"
        label="Where are you renting?"
        value={country.code}
        onChange={(value) => onChange(value as CountryCode)}
        options={countries.map((option) => ({
          label: option.name,
          value: option.code,
        }))}
      />
      <div className="mt-2 min-h-[3.25rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={country.code}
            className="rounded-lg border border-[#d7e5df] bg-[#f7fbf8] px-3 py-2 text-sm leading-6 text-[#5f746f]"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {country.note}
            {country.code === "ROW" ? (
              <span className="mt-2 block text-xs leading-5 text-[#748882]">
                {country.disclaimer}
              </span>
            ) : null}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
