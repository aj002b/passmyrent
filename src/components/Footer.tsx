import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export function Footer() {
  return (
    <footer className="border-t border-[#dbe8e2] bg-[#17312b] text-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <p className="text-lg font-bold">{siteConfig.name}</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#d7e8e2]">
            These calculators give rough estimates only. Affordability checks
            vary by landlord, letting agent, referencing company, and individual
            circumstances.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-semibold text-[#d7e8e2]">
          <Link href="/about" className="hover:text-white">
            About
          </Link>
          <Link href="/disclaimer" className="hover:text-white">
            Disclaimer
          </Link>
          <Link href="/privacy-policy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
        </div>
        <p className="text-sm text-[#b7ccc5] md:col-span-2">
          Copyright {new Date().getFullYear()} {siteConfig.name}. Free estimate
          tools for UK renters.
        </p>
      </div>
    </footer>
  );
}
