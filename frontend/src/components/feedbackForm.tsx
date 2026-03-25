import type { ChangeEvent } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

import FeedbackCard from "./feedbackCard";
import FeedbackSuccess from "./feedbacksucc";
import FeedbackFormRating from "./feedbackRat";
import NotificationMessage from "./notiM";
import useFeedbackForm from "../hooks/useFeedback";


export default function FeedbackForm({ isDarkMode }: { isDarkMode: boolean }) {
  const {
    form,
    handleChange,
    isSubmitting,
    showSuccess,
    notificationMessage,
    notificationType,
    handleSubmit,
  } = useFeedbackForm();

  const inputClass = `w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 ${
    isDarkMode
      ? "border-slate-600 bg-slate-700/40 text-white placeholder:text-slate-500"
      : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
  }`;

  const labelClass = `block text-sm font-semibold ${
    isDarkMode ? "text-slate-100" : "text-slate-800"
  }`;

  if (showSuccess) return <FeedbackSuccess isDarkMode={isDarkMode} />;

  return (
    <>
      <FeedbackCard isDarkMode={isDarkMode}>
        <form onSubmit={handleSubmit} className="space-y-7">
          <header className="space-y-2 text-center">
            <h2
              className={`text-[1.95rem] font-bold tracking-[-0.02em] ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Share Your Feedback
            </h2>

            <p
              className={`text-sm font-medium ${
                isDarkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              We are always looking to improve
            </p>
          </header>

          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className={labelClass}>
                Your Name
              </label>

              <input
                id="name"
                name="name"
                placeholder="What should we call you?"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className={labelClass}>
                Your Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className={labelClass}>
                Category
              </label>

              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={`w-full appearance-none rounded-lg border px-4 py-3 pr-11 text-sm font-medium outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 ${
                    isDarkMode
                      ? "border-slate-600 bg-slate-700/40 text-slate-100"
                      : "border-slate-300 bg-white text-slate-700"
                  }`}
                  required
                >
                  <option value="">Please select</option>
                  <option value="bug">Bug</option>
                  <option value="feature">Feature</option>
                  <option value="improvement">Improvement</option>
                </select>

                <ChevronDownIcon
                  className={`pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 ${
                    isDarkMode ? "text-slate-500" : "text-slate-400"
                  }`}
                />
              </div>
            </div>

            <FeedbackFormRating
              isDarkMode={isDarkMode}
              value={form.rating}
              onChange={(rating: number) =>
                handleChange({
                  target: { name: "rating", value: String(rating), type: "radio" },
                } as ChangeEvent<HTMLInputElement>)
              }
            />

            <div className="space-y-2">
              <label htmlFor="message" className={labelClass}>
                Message
              </label>

              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Share your thoughts..."
                value={form.message}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
                required
              />
            </div>

            <label
              className={`flex items-center gap-3 text-sm font-medium ${
                isDarkMode ? "text-slate-200" : "text-slate-700"
              }`}
            >
              <input
                type="checkbox"
                name="notify"
                checked={form.notify}
                onChange={handleChange}
                className={`h-4 w-4 rounded-sm text-orange-500 focus:ring-orange-500 ${
                  isDarkMode
                    ? "border-slate-500 bg-slate-700"
                    : "border-slate-300"
                }`}
              />
              Email me about updates
            </label>

            <button
              disabled={isSubmitting}
              className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(249,115,22,0.24)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60 dark:shadow-none"
            >
              {isSubmitting ? "Sending..." : "Send Feedback"}
            </button>
          </div>
        </form>
      </FeedbackCard>

      <NotificationMessage
        isDarkMode={isDarkMode}
        message={notificationMessage}
        type={notificationType}
      />
    </>
  );
}
