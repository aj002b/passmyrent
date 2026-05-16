"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackRentReadyEvent } from "@/lib/analytics";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  eventName: string;
  eventProperties?: Parameters<typeof trackRentReadyEvent>[1];
};

export function TrackedLink({
  eventName,
  eventProperties,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackRentReadyEvent(eventName, eventProperties);
        onClick?.(event);
      }}
    />
  );
}
