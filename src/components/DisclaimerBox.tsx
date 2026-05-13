import { estimateDisclaimer } from "@/lib/site";

export function DisclaimerBox({ children }: { children?: React.ReactNode }) {
  return (
    <aside className="rounded-xl border border-[#e9c4ad] bg-[#fff9f2] p-5 shadow-[0_10px_28px_rgba(23,49,43,0.05)]">
      <h2 className="text-xl font-bold text-[#17312b]">Important disclaimer</h2>
      <p className="mt-2 leading-7 text-[#5f746f]">
        {children ?? estimateDisclaimer}
      </p>
    </aside>
  );
}
