"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const storageKey = "passmyrentcheck-cookie-notice";

export function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsVisible(localStorage.getItem(storageKey) !== "dismissed");
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function dismissNotice() {
    localStorage.setItem(storageKey, "dismissed");
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#d7e5df] bg-white/95 shadow-[0_-12px_32px_rgba(23,49,43,0.12)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p className="max-w-3xl text-sm leading-6 text-[#35534c]">
          PassMyRentCheck does not intentionally store calculator inputs. We may
          add analytics or advertising cookies in the future; read the{" "}
          <Link href="/privacy-policy" className="font-semibold text-[#116a5b] underline underline-offset-2">
            Privacy Policy
          </Link>{" "}
          for details.
        </p>
        <button
          type="button"
          onClick={dismissNotice}
          className="rounded-md bg-[#116a5b] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b4c43] focus:outline-none focus:ring-2 focus:ring-[#116a5b] focus:ring-offset-2"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
