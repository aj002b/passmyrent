import Link from "next/link";

type CalculatorCardProps = {
  title: string;
  description: string;
  href: string;
  badge?: string;
};

export function CalculatorCard({
  title,
  description,
  href,
  badge,
}: CalculatorCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-[#d7e5df] bg-white p-5 shadow-[0_10px_28px_rgba(23,49,43,0.05)] transition duration-200 hover:-translate-y-1 hover:border-[#0f6b5d] hover:bg-[#fbfdfc] hover:shadow-[0_18px_42px_rgba(23,49,43,0.12)] focus:outline-none focus:ring-2 focus:ring-[#116a5b] focus:ring-offset-4"
    >
      <div className="flex items-start gap-3">
        {badge ? (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#c7ddd5] bg-[#e8f5ef] text-sm font-bold text-[#116a5b] transition group-hover:border-[#116a5b] group-hover:bg-[#dcefe7]">
            {badge}
          </span>
        ) : null}
        <div>
          <h3 className="text-lg font-bold leading-snug text-[#17312b]">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#5f746f]">{description}</p>
        </div>
      </div>
      <span className="mt-5 inline-flex items-center rounded-md border border-[#b7d4ca] bg-[#f3faf7] px-3 py-2 text-sm font-semibold text-[#116a5b] transition group-hover:border-[#116a5b] group-hover:bg-[#116a5b] group-hover:text-white">
        Open tool
        <span aria-hidden="true" className="ml-2 transition group-hover:translate-x-0.5">
          -&gt;
        </span>
      </span>
    </Link>
  );
}
