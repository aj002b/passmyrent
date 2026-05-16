"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  countries,
  defaultCountryCode,
  type CountryCode,
} from "@/lib/countries";
import { getDetectedCountry } from "@/lib/detectCountry";

const countryDescriptions: Record<CountryCode, string> = {
  UK: "30x and 36x monthly rent checks",
  US: "2.5x to 3x monthly rent examples",
  CA: "30%, 35%, and 40% rent-to-income",
  AU: "Weekly rent and rent-to-income estimates",
  ROW: "Generic rent-to-income estimate",
};

export function HomepageCountryCards() {
  const [activeCountry, setActiveCountry] =
    useState<CountryCode>(defaultCountryCode);

  useEffect(() => {
    setActiveCountry(getDetectedCountry());
  }, []);

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {countries.map((country) => {
        const isActive = country.code === activeCountry;

        return (
          <Link
            key={country.code}
            href={`/rent-referencing-calculator?country=${country.code.toLowerCase()}`}
            className={`group flex min-h-[6.2rem] items-start gap-3 rounded-2xl border bg-white p-3.5 shadow-[0_10px_24px_rgba(11,47,53,0.045)] transition duration-200 hover:-translate-y-1 hover:border-[#0E5F67]/45 hover:shadow-[0_18px_40px_rgba(11,47,53,0.1)] focus:outline-none focus:ring-2 focus:ring-[#0E5F67] focus:ring-offset-4 sm:p-4 ${
              isActive
                ? "border-[#0E5F67]/65 shadow-[0_18px_44px_rgba(14,95,103,0.13)] ring-2 ring-[#0E5F67]/10"
                : "border-[#D7E5EA]"
            }`}
          >
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#D7E5EA] bg-[#E8F3F6] text-xs font-extrabold text-[#0E5F67] transition group-hover:border-[#0E5F67]/40 group-hover:bg-white">
              {country.code}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-extrabold leading-5 text-[#0B2F35]">
                {country.name}
              </span>
              <span className="mt-1 block text-sm leading-5 text-[#5D6D75]">
                {countryDescriptions[country.code]}
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
