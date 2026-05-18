import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

const navLinks = [
  { href: "/rent-referencing-calculator", label: "Affordability" },
  { href: "/guarantor-income-calculator", label: "Guarantor / Co-signer" },
  { href: "/joint-tenant-affordability-calculator", label: "Joint Tenants" },
  { href: "/move-in-cost-calculator", label: "Move-In Costs" },
  { href: "/rent-split-calculator", label: "Rent Split" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#D6E7E1]/90 bg-white/95 backdrop-blur-xl">
      <div className="site-container flex flex-col gap-2 py-2.5 md:flex-row md:items-center md:justify-between">
        <Link
          href="/"
          className="shrink-0 text-[1.05rem] font-extrabold tracking-[-0.025em] text-[#0F2E2B] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:ring-offset-4"
        >
          {siteConfig.name}
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap gap-1 text-sm font-bold text-[#5F726C] md:justify-end">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-full px-3 py-1.5 transition hover:bg-[#DFF4EC] hover:text-[#0B5E58] focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
