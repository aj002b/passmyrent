import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export function Footer() {
  return (
    <footer className="border-t border-[#254a42] bg-[#102722] text-white">
      <div className="site-container grid gap-8 py-10 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-lg font-extrabold tracking-[-0.02em]">{siteConfig.name}</p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#c8ddd6]">
            These calculators give rough estimates only. Rental decisions vary by
            country, region, landlord, property manager, and individual
            circumstances.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm font-bold text-[#c8ddd6] md:justify-end">
          <Link href="/about" className="rounded-full px-2 py-1 hover:bg-white/10 hover:text-white">
            About
          </Link>
          <Link href="/disclaimer" className="rounded-full px-2 py-1 hover:bg-white/10 hover:text-white">
            Disclaimer
          </Link>
          <Link href="/privacy-policy" className="rounded-full px-2 py-1 hover:bg-white/10 hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/contact" className="rounded-full px-2 py-1 hover:bg-white/10 hover:text-white">
            Contact
          </Link>
        </div>
        <p className="text-sm text-[#b7ccc5] md:col-span-2">
          Copyright {new Date().getFullYear()} {siteConfig.name}. Free estimate
          tools for renters.
        </p>
      </div>
    </footer>
  );
}
