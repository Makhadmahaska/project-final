import type { ReactNode } from "react";

export default function FeedbackCard({
  children,
  isDarkMode,
}: {
  children: ReactNode;
  isDarkMode: boolean;
}) {
  return (
    <div
      className={`rounded-2xl px-6 py-7 transition-colors duration-300 sm:px-8 sm:py-8 ${
        isDarkMode
          ? "border border-slate-700/70 bg-[#1f2937]"
          : "border border-slate-200/80 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
      }`}
    >
      {children}
    </div>
  );
}
