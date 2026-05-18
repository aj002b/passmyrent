import type { FAQItem } from "@/lib/site";

export function FAQSection({ items }: { items: FAQItem[] }) {
  return (
    <section className="space-y-5">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#b6533f]">
          Answers at a glance
        </p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.02em] text-[#17312b]">
          Frequently asked questions
        </h2>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-[#d7e5df] bg-white shadow-[0_8px_24px_rgba(23,49,43,0.04)] transition hover:-translate-y-0.5 hover:border-[#b9d5ca] hover:shadow-[0_14px_32px_rgba(23,49,43,0.08)] open:border-[#9bc7ba] open:bg-[#fbfdfc]"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-base font-extrabold text-[#17312b] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#116a5b] [&::-webkit-details-marker]:hidden">
              <span className="leading-6">{item.question}</span>
              <span
                aria-hidden="true"
                className="relative mt-0.5 h-8 w-8 shrink-0 rounded-full border border-[#c7ddd5] bg-[#e8f5ef] text-[#116a5b] transition group-hover:border-[#116a5b] group-open:rotate-180 group-open:bg-[#116a5b] group-open:text-white"
              >
                <span className="absolute left-1/2 top-1/2 h-0.5 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                <span className="absolute left-1/2 top-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition group-open:opacity-0" />
              </span>
            </summary>
            <div className="border-t border-[#e6f0ec] px-5 pb-5 pt-3">
              <p className="max-w-3xl leading-7 text-[#5f746f]">{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
