import type { FAQItem } from "@/lib/site";

export function FAQSection({ items }: { items: FAQItem[] }) {
  return (
    <section className="space-y-5">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#0F766E]">
          Answers at a glance
        </p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.02em] text-[#0F2E2B]">
          Frequently asked questions
        </h2>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-[#D6E7E1] bg-white shadow-[0_8px_24px_rgba(15,46,43,0.04)] transition hover:-translate-y-0.5 hover:border-[#0F766E]/35 hover:shadow-[0_14px_32px_rgba(15,46,43,0.08)] open:border-[#0F766E]/45 open:bg-[#F7FAF8]"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-base font-extrabold text-[#0F2E2B] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0F766E] [&::-webkit-details-marker]:hidden">
              <span className="leading-6">{item.question}</span>
              <span
                aria-hidden="true"
                className="relative mt-0.5 h-8 w-8 shrink-0 rounded-full border border-[#D6E7E1] bg-[#DFF4EC] text-[#0F766E] transition group-hover:border-[#0F766E] group-open:rotate-180 group-open:bg-[#0F766E] group-open:text-white"
              >
                <span className="absolute left-1/2 top-1/2 h-0.5 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                <span className="absolute left-1/2 top-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition group-open:opacity-0" />
              </span>
            </summary>
            <div className="border-t border-[#D6E7E1] px-5 pb-5 pt-3">
              <p className="max-w-3xl leading-7 text-[#5F726C]">{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
