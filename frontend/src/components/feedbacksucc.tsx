import { CheckIcon } from "@heroicons/react/16/solid";
import FeedbackCard from "./feedbackCard";

export default function FeedbackSuccess() {
  return (
    <FeedbackCard>
      <div className="min-h-48 flex flex-col items-center justify-center">
        <CheckIcon className="text-green-500 w-16 h-16" />

        <h2 className="text-xl text-center font-semibold mt-4">
          Thank you for your feedback!
        </h2>

        <p className="text-sm text-gray-500 mt-1 text-center">
          We appreciate your input and will use it to improve our service.
        </p>
      </div>
    </FeedbackCard>
  );
}