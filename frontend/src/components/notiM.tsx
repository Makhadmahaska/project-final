type Props = {
  isDarkMode: boolean;
  message?: string;
  type?: "success" | "error";
};

export default function NotificationMessage({
  isDarkMode,
  message,
  type,
}: Props) {
  if (!message) return null;

  const style =
    type === "success"
      ? isDarkMode
        ? "text-green-100 bg-green-900/80"
        : "text-green-800 bg-green-100"
      : isDarkMode
        ? "text-red-100 bg-red-900/80"
        : "text-red-800 bg-red-100";

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 top-6 z-50 px-4 py-2 rounded shadow-lg text-sm font-medium text-center ${style}`}
    >
      {message}
    </div>
  );
}
