import type { FAQItem } from "@/lib/site";

export function FAQSection({ items }: { items: FAQItem[] }) {
  return (
    <section className="space-y-5">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#0E5F67]">
          Answers at a glance
        </p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.02em] text-[#0B2F35]">
          Frequently asked questions
        </h2>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-[#D7E5EA] bg-white shadow-[0_8px_24px_rgba(11,47,53,0.035)] transition duration-200 hover:-translate-y-0.5 hover:border-[#0E5F67]/35 hover:shadow-[0_14px_32px_rgba(11,47,53,0.07)] open:border-[#0E5F67]/45 open:bg-[#F6FAFB]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-base font-extrabold text-[#0B2F35] outline-none transition hover:text-[#0A3F49] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0E5F67] sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
              <span className="leading-6">{item.question}</span>
              <span
                aria-hidden="true"
                className="relative h-8 w-8 shrink-0 rounded-full border border-[#D7E5EA] bg-[#E8F3F6] text-[#0E5F67] transition duration-200 group-hover:border-[#0E5F67] group-open:rotate-180 group-open:bg-[#0E5F67] group-open:text-white"
              >
                <span className="absolute left-1/2 top-1/2 h-0.5 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                <span className="absolute left-1/2 top-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition group-open:opacity-0" />
              </span>
            </summary>
            <div className="border-t border-[#D7E5EA] px-5 pb-5 pt-3 motion-safe:animate-[faqReveal_180ms_ease-out] sm:px-6">
              <p className="max-w-3xl leading-7 text-[#5D6D75]">{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
