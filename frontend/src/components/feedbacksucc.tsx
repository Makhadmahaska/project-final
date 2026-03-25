import { CheckIcon } from "@heroicons/react/16/solid";
import FeedbackCard from "./feedbackCard";

export default function FeedbackSuccess({
  isDarkMode,
}: {
  isDarkMode: boolean;
}) {
  return (
    <FeedbackCard isDarkMode={isDarkMode}>
      <div className="flex min-h-72 flex-col items-center justify-center text-center">
        <div
          className={`flex h-18 w-18 items-center justify-center rounded-full ${
            isDarkMode ? "bg-emerald-500/15" : "bg-emerald-100"
          }`}
        >
          <CheckIcon className="h-10 w-10 text-emerald-500" />
        </div>

        <h2
          className={`mt-5 text-2xl font-bold ${
            isDarkMode ? "text-white" : "text-slate-900"
          }`}
        >
          Thank you for your feedback!
        </h2>

        <p
          className={`mt-2 max-w-sm text-sm ${
            isDarkMode ? "text-slate-400" : "text-slate-500"
          }`}
        >
          We appreciate your input and will use it to improve our service.
        </p>
      </div>
    </FeedbackCard>
  );
}
