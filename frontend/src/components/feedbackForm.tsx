import type { ChangeEvent } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

import FeedbackCard from "./feedCard";
import FeedbackSuccess from "./feedbacksucc";
import FeedbackFormRating from "./feedbackRat";
import NotificationMessage from "./notiM";
import useFeedbackForm from "../hooks/useFeedback";

export default function FeedbackForm() {
  const {
    form,
    setForm,
    isSubmitting,
    showSuccess,
    notificationMessage,
    notificationType,
    handleSubmit,
  } = useFeedbackForm();

  if (showSuccess) return <FeedbackSuccess />;

  return (
    <>
      <FeedbackCard>
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl text-center font-semibold text-gray-900 dark:text-white">
            Share Your Feedback
          </h2>

          <div className="mt-8 space-y-4">
            <input
              placeholder="Your Name"
              value={form.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full border p-2 rounded-md"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full border p-2 rounded-md"
              required
            />

            <div className="relative">
              <select
                value={form.category}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setForm((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full border p-2 rounded-md appearance-none"
                required
              >
                <option value="">Please select</option>
                <option value="bug">Bug</option>
                <option value="feature">Feature</option>
                <option value="improvement">Improvement</option>
              </select>

              <ChevronDownIcon className="pointer-events-none absolute right-2 top-2 w-5 h-5 text-gray-500" />
            </div>

            <FeedbackFormRating
              value={form.rating}
              onChange={(rating: number) =>
                setForm((prev) => ({ ...prev, rating }))
              }
            />

            <textarea
              rows={3}
              placeholder="Message"
              value={form.message}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setForm((prev) => ({ ...prev, message: e.target.value }))
              }
              className="w-full border p-2 rounded-md"
              required
            />

            <button
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded-md disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Feedback"}
            </button>
          </div>
        </form>
      </FeedbackCard>

      <NotificationMessage
        message={notificationMessage}
        type={notificationType}
      />
    </>
  );
}