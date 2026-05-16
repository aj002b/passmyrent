import Link from "next/link";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FAQJsonLd } from "@/components/FAQJsonLd";
import { FAQSection } from "@/components/FAQSection";
import { RelatedTools } from "@/components/RelatedTools";
import type { SEOLandingPage } from "@/lib/seoLandingPages";
import { estimateDisclaimer } from "@/lib/site";

export function SEOLandingPageView({ page }: { page: SEOLandingPage }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: page.h1, href: `/${page.slug}` },
        ]}
      />
      <FAQJsonLd items={page.faqs} />
      <div className="site-container space-y-10 py-10">
        <section className="grid gap-6 rounded-3xl border border-[#D7E5EA] bg-[linear-gradient(135deg,#F6FAFB_0%,#E8F3F6_100%)] p-6 shadow-[0_20px_60px_rgba(11,47,53,0.08)] md:grid-cols-[1fr_0.72fr] md:items-center md:p-8">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#0E5F67]">
              Rent guide
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-[-0.035em] text-[#0B2F35] md:text-5xl">
              {page.h1}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#5D6D75]">
              {page.intro}
            </p>
            <div className="mt-6">
              <Link href={page.primaryLink.href} className="btn-primary">
                {page.primaryLink.label}
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-[#D7E5EA] bg-white/88 p-5 shadow-[0_18px_44px_rgba(11,47,53,0.09)]">
            <h2 className="text-lg font-extrabold text-[#0B2F35]">
              Quick examples
            </h2>
            <div className="mt-4 space-y-3">
              {page.highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-[#D7E5EA] bg-[#F6FAFB] p-3"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#5D6D75]">
                    {item.label}
                  </p>
                  <p className="mt-1 font-extrabold text-[#0B2F35]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1fr_18rem]">
          <article className="premium-card p-6 md:p-8">
            <div className="prose prose-slate max-w-none">
              {page.comparisonRows?.length ? (
                <section className="not-prose mb-8 overflow-hidden rounded-2xl border border-[#D7E5EA] bg-[#F6FAFB]">
                  <div className="border-b border-[#D7E5EA] px-4 py-3 md:px-5">
                    <h2 className="text-xl font-extrabold tracking-[-0.02em] text-[#0B2F35]">
                      Example comparison
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-[#5D6D75]">
                      These figures are rough examples only. Use the full
                      calculator for your country, rent, and income.
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[42rem] text-left text-sm">
                      <thead className="bg-white text-[#5D6D75]">
                        <tr>
                          <th className="px-4 py-3 font-extrabold md:px-5">
                            Example
                          </th>
                          <th className="px-4 py-3 font-extrabold md:px-5">
                            Estimate
                          </th>
                          <th className="px-4 py-3 font-extrabold md:px-5">
                            Note
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#D7E5EA]">
                        {page.comparisonRows.map((row) => (
                          <tr key={row.label}>
                            <td className="px-4 py-3 font-bold text-[#0B2F35] md:px-5">
                              {row.label}
                            </td>
                            <td className="px-4 py-3 text-[#5D6D75] md:px-5">
                              {row.value}
                            </td>
                            <td className="px-4 py-3 text-[#5D6D75] md:px-5">
                              {row.note}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              ) : null}
              {page.sections.map((section) => (
                <section key={section.heading} className="not-prose mb-8 last:mb-0">
                  <h2 className="text-2xl font-extrabold tracking-[-0.02em] text-[#0B2F35]">
                    {section.heading}
                  </h2>
                  <p className="mt-3 leading-7 text-[#5D6D75]">{section.body}</p>
                </section>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-[#D7E5EA] bg-[#F6FAFB] p-5">
              <h2 className="text-xl font-extrabold text-[#0B2F35]">
                Helpful next step
              </h2>
              <p className="mt-2 leading-7 text-[#5D6D75]">
                For your own numbers, use the{" "}
                <Link
                  href={page.primaryLink.href}
                  className="font-bold text-[#0E5F67] underline-offset-4 hover:underline"
                >
                  relevant RentReadyCheck calculator
                </Link>
                . It can show country-aware estimates and keeps everything in
                your browser.
              </p>
            </div>
            {page.relatedLinks?.length ? (
              <div className="mt-6 rounded-2xl border border-[#D7E5EA] bg-white/75 p-5">
                <h2 className="text-lg font-extrabold text-[#0B2F35]">
                  Related guides
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {page.relatedLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-full border border-[#D7E5EA] bg-[#E8F3F6] px-3 py-1.5 text-sm font-bold text-[#0E5F67] transition hover:border-[#0E5F67] hover:bg-[#dcefe7]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </article>

          <aside className="space-y-5">
            <DisclaimerBox>{estimateDisclaimer}</DisclaimerBox>
            <AdPlaceholder />
          </aside>
        </section>

        <FAQSection items={page.faqs} />
        <RelatedTools />
      </div>
    </>
  );
}
