import type { CountryCode } from "@/lib/countries";

export function getCountryFromQueryParam(value: string | null): CountryCode | null {
  const normalized = value?.trim().toLowerCase();

  if (!normalized) {
    return null;
  }

  const countryMap: Record<string, CountryCode> = {
    uk: "UK",
    gb: "UK",
    "united-kingdom": "UK",
    us: "US",
    usa: "US",
    "united-states": "US",
    ca: "CA",
    canada: "CA",
    au: "AU",
    australia: "AU",
    other: "ROW",
    row: "ROW",
    rest: "ROW",
    world: "ROW",
    "rest-of-world": "ROW",
  };

  return countryMap[normalized] ?? "ROW";
}

export function getCountryFromLocale(locale: string): CountryCode {
  const region = locale
    .split("-")
    .at(-1)
    ?.trim()
    .toUpperCase();

  if (region === "GB" || region === "UK") {
    return "UK";
  }

  if (region === "US") {
    return "US";
  }

  if (region === "CA") {
    return "CA";
  }

  if (region === "AU") {
    return "AU";
  }

  return "ROW";
}

export function getDetectedCountry(): CountryCode {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return "ROW";
  }

  const browserLanguages =
    navigator.languages && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language];

  for (const locale of browserLanguages) {
    const country = getCountryFromLocale(locale);

    if (country !== "ROW") {
      return country;
    }
  }

  return "ROW";
}
