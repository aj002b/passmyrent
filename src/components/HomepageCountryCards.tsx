"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { countries, defaultCountryCode, type CountryCode } from "@/lib/countries";
import { getDetectedCountry } from "@/lib/detectCountry";

const countryDescriptions: Record<CountryCode, string> = {
  UK: "30x and 36x monthly rent checks",
  US: "2.5x to 3x monthly rent examples",
  CA: "30%, 35%, and 40% rent-to-income",
  AU: "Weekly rent and rent-to-income estimates",
  ROW: "Generic rent-to-income estimate",
};

export function HomepageCountryCards() {
  const [selectedCountry, setSelectedCountry] =
    useState<CountryCode>(defaultCountryCode);

  useEffect(() => {
    setSelectedCountry(getDetectedCountry());
  }, []);

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {countries.map((country) => {
        const isActive = country.code === selectedCountry;

        return (
          <Link
            key={country.code}
            href={`/rent-referencing-calculator?country=${country.code.toLowerCase()}`}
            className={`group rounded-2xl border bg-white p-4 shadow-[0_10px_24px_rgba(15,46,43,0.045)] transition duration-200 hover:-translate-y-1 hover:border-[#0F766E]/45 hover:shadow-[0_18px_40px_rgba(15,46,43,0.1)] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:ring-offset-4 ${
              isActive
                ? "border-[#0F766E]/55 ring-1 ring-[#0F766E]/20"
                : "border-[#D6E7E1]"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#D6E7E1] bg-[#DFF4EC] text-xs font-extrabold text-[#0F766E] transition group-hover:border-[#0F766E]/40">
                {country.code}
              </span>
              {isActive ? (
                <span className="rounded-full bg-[#DFF4EC] px-2.5 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.08em] text-[#0B5E58]">
                  Selected
                </span>
              ) : null}
            </div>
            <h3 className="mt-3 text-sm font-extrabold text-[#0F2E2B]">
              {country.name}
            </h3>
            <p className="mt-1 text-xs leading-5 text-[#5F726C]">
              {countryDescriptions[country.code]}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
