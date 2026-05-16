"use client";

import { track } from "@vercel/analytics";
import { useEffect, useRef } from "react";
import type { CountryCode } from "@/lib/countries";

type AnalyticsProperties = {
  calculator_name?: string;
  selected_country?: CountryCode | string;
  page_path?: string;
  result_signal?: string;
};

export function getPagePath() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.location.pathname;
}

export function trackRentReadyEvent(
  eventName: string,
  properties: AnalyticsProperties = {},
) {
  track(eventName, {
    ...properties,
    page_path: properties.page_path ?? getPagePath(),
  });
}

export function useCalculatorResultTracking({
  calculatorName,
  selectedCountry,
  resultSignal,
  enabled,
}: {
  calculatorName: string;
  selectedCountry: CountryCode | string;
  resultSignal: string;
  enabled: boolean;
}) {
  const lastTrackedKey = useRef("");

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const trackingKey = `${calculatorName}:${selectedCountry}:${resultSignal}`;

    if (lastTrackedKey.current === trackingKey) {
      return;
    }

    lastTrackedKey.current = trackingKey;
    trackRentReadyEvent("calculator_result_view", {
      calculator_name: calculatorName,
      selected_country: selectedCountry,
      result_signal: resultSignal,
    });
  }, [calculatorName, enabled, resultSignal, selectedCountry]);
}
