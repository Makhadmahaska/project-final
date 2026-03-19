import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import type { Feedback } from "../types/feedback";

const ENV_API_BASE_URL = import.meta.env.VITE_API_URL?.trim();

function getApiUrls() {
  const urls = new Set<string>();

  if (ENV_API_BASE_URL) {
    urls.add(`${ENV_API_BASE_URL}/api/feedback`);
  }

  urls.add("/api/feedback");
  urls.add("http://localhost:5000/api/feedback");

  return [...urls];
}

export default function useFeedback() {
  const [form, setForm] = useState<Feedback>({
    name: "",
    email: "",
    category: "",
    rating: 0,
    message: "",
    notify: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] =
    useState<"success" | "error">("success");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;

      setForm((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: name === "rating" ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setNotificationMessage("");
      let lastError = "Could not connect to the backend";

      for (const url of getApiUrls()) {
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          });

          if (!response.ok) {
            const data = (await response.json().catch(() => null)) as {
              message?: string;
            } | null;

            lastError = data?.message ?? "Request failed";
            continue;
          }

          setShowSuccess(true);
          setNotificationMessage("Feedback sent successfully!");
          setNotificationType("success");

          // reset form
          setForm({
            name: "",
            email: "",
            category: "",
            rating: 0,
            message: "",
            notify: false,
          });

          return;
        } catch {
          lastError = "Could not connect to the backend";
        }
      }

      throw new Error(lastError);
    } catch (error) {
      setNotificationMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
      setNotificationType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    setForm,
    handleChange,
    handleSubmit,
    isSubmitting,
    showSuccess,
    notificationMessage,
    notificationType,
  };
}
