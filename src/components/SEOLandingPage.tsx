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
        <section className="grid gap-6 rounded-3xl border border-[#d8e5df] bg-[linear-gradient(135deg,#f8fbf9_0%,#edf6f1_100%)] p-6 shadow-[0_20px_60px_rgba(23,49,43,0.08)] md:grid-cols-[1fr_0.72fr] md:items-center md:p-8">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#b6533f]">
              Rent guide
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-[-0.035em] text-[#17312b] md:text-5xl">
              {page.h1}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#35534c]">
              {page.intro}
            </p>
            <div className="mt-6">
              <Link href={page.primaryLink.href} className="btn-primary">
                {page.primaryLink.label}
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-[#d7e5df] bg-white/88 p-5 shadow-[0_18px_44px_rgba(23,49,43,0.09)]">
            <h2 className="text-lg font-extrabold text-[#17312b]">
              Quick examples
            </h2>
            <div className="mt-4 space-y-3">
              {page.highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-[#e1ece7] bg-[#fbfdfc] p-3"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#5f746f]">
                    {item.label}
                  </p>
                  <p className="mt-1 font-extrabold text-[#17312b]">
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
              {page.sections.map((section) => (
                <section key={section.heading} className="not-prose mb-8 last:mb-0">
                  <h2 className="text-2xl font-extrabold tracking-[-0.02em] text-[#17312b]">
                    {section.heading}
                  </h2>
                  <p className="mt-3 leading-7 text-[#5f746f]">{section.body}</p>
                </section>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-[#d7e5df] bg-[#fbfdfc] p-5">
              <h2 className="text-xl font-extrabold text-[#17312b]">
                Helpful next step
              </h2>
              <p className="mt-2 leading-7 text-[#5f746f]">
                For your own numbers, use the{" "}
                <Link
                  href={page.primaryLink.href}
                  className="font-bold text-[#116a5b] underline-offset-4 hover:underline"
                >
                  relevant RentReadyCheck calculator
                </Link>
                . It can show country-aware estimates and keeps everything in
                your browser.
              </p>
            </div>
            {page.relatedLinks?.length ? (
              <div className="mt-6 rounded-2xl border border-[#d7e5df] bg-white/75 p-5">
                <h2 className="text-lg font-extrabold text-[#17312b]">
                  Related guides
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {page.relatedLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-full border border-[#c7ddd5] bg-[#e8f5ef] px-3 py-1.5 text-sm font-bold text-[#116a5b] transition hover:border-[#116a5b] hover:bg-[#dcefe7]"
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
