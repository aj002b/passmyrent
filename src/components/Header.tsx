import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

const navLinks = [
  { href: "/rent-referencing-calculator", label: "Rent Check" },
  { href: "/guarantor-income-calculator", label: "Guarantor Calculator" },
  { href: "/joint-tenant-affordability-calculator", label: "Joint Tenants" },
  { href: "/move-in-cost-calculator", label: "Move-In Costs" },
  { href: "/rent-split-calculator", label: "Rent Split" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="border-b border-[#d7e5df] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <Link
          href="/"
          className="shrink-0 text-lg font-bold text-[#10352f] focus:outline-none focus:ring-2 focus:ring-[#116a5b] focus:ring-offset-4"
        >
          {siteConfig.name}
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap gap-1.5 text-sm font-semibold text-[#35534c] md:justify-end">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-md px-2.5 py-1.5 hover:bg-[#e8f5ef] focus:outline-none focus:ring-2 focus:ring-[#116a5b] sm:px-3"
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
