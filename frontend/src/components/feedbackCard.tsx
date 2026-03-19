import type { ReactNode } from "react";
export default function FeedbackCard({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      {children}
    </div>
  );
}