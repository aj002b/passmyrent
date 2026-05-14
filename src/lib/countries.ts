export type CountryCode = "UK" | "US" | "CA" | "AU";
export type RentFrequency = "monthly" | "weekly";

export type CountryConfig = {
  code: CountryCode;
  name: string;
  currencyCode: string;
  currencySymbol: string;
  rentFrequencyLabel: string;
  affordabilityMethod: string;
  applicantThresholds: number[];
  guarantorThreshold: number;
  supportPersonLabel: string;
  note: string;
  disclaimer: string;
};

export const countries: CountryConfig[] = [
  {
    code: "UK",
    name: "United Kingdom",
    currencyCode: "GBP",
    currencySymbol: "£",
    rentFrequencyLabel: "monthly",
    affordabilityMethod: "Annual income multiplier",
    applicantThresholds: [30, 36],
    guarantorThreshold: 36,
    supportPersonLabel: "guarantor",
    note: "Uses example UK-style checks such as 30x and 36x monthly rent.",
    disclaimer:
      "Common UK checks may compare annual income against 30x to 36x monthly rent.",
  },
  {
    code: "US",
    name: "United States",
    currencyCode: "USD",
    currencySymbol: "$",
    rentFrequencyLabel: "monthly",
    affordabilityMethod: "Monthly income ratio",
    applicantThresholds: [2.5, 3, 3.5],
    guarantorThreshold: 3,
    supportPersonLabel: "co-signer",
    note: "Uses example US-style checks such as 2.5x to 3x monthly rent.",
    disclaimer:
      "Many US landlords use monthly income requirements such as 2.5x to 3x monthly rent.",
  },
  {
    code: "CA",
    name: "Canada",
    currencyCode: "CAD",
    currencySymbol: "$",
    rentFrequencyLabel: "monthly",
    affordabilityMethod: "Rent-to-income percentage",
    applicantThresholds: [30, 35, 40],
    guarantorThreshold: 30,
    supportPersonLabel: "guarantor/co-signer",
    note: "Uses rent-to-income examples such as 30%, 35%, and 40% of gross income.",
    disclaimer:
      "Canadian affordability is often discussed as rent compared with gross monthly income.",
  },
  {
    code: "AU",
    name: "Australia",
    currencyCode: "AUD",
    currencySymbol: "$",
    rentFrequencyLabel: "weekly or monthly",
    affordabilityMethod: "Rent-to-income percentage",
    applicantThresholds: [25, 30, 35],
    guarantorThreshold: 30,
    supportPersonLabel: "guarantor",
    note: "Uses rent-to-income examples and supports weekly rent.",
    disclaimer:
      "Australian rent is often advertised weekly, so this tool supports weekly or monthly rent input.",
  },
];

export const defaultCountryCode: CountryCode = "UK";

export function getCountryConfig(countryCode: CountryCode): CountryConfig {
  return (
    countries.find((country) => country.code === countryCode) ?? countries[0]
  );
}
