import { estimateDisclaimer } from "@/lib/site";

export function DisclaimerBox({ children }: { children?: React.ReactNode }) {
  return (
    <aside className="rounded-2xl border border-[#e9c4ad] bg-[linear-gradient(180deg,#fff9f2_0%,#ffffff_100%)] p-5 shadow-[0_14px_34px_rgba(15,46,43,0.06)]">
      <h2 className="text-xl font-extrabold tracking-[-0.015em] text-[#0F2E2B]">
        Important disclaimer
      </h2>
      <p className="mt-2 leading-7 text-[#5F726C]">
        {children ?? estimateDisclaimer}
      </p>
    </aside>
  );
}
