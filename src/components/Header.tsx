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
    <header className="sticky top-0 z-30 border-b border-[#d8e5df]/90 bg-white/90 backdrop-blur-xl">
      <div className="site-container flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
        <Link
          href="/"
          className="shrink-0 text-[1.05rem] font-extrabold tracking-[-0.025em] text-[#10352f] focus:outline-none focus:ring-2 focus:ring-[#116a5b] focus:ring-offset-4"
        >
          {siteConfig.name}
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap gap-1 text-sm font-bold text-[#35534c] md:justify-end">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-full px-3 py-1.5 transition hover:bg-[#e8f5ef] hover:text-[#0f5f53] focus:outline-none focus:ring-2 focus:ring-[#116a5b]"
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
