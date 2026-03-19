type Props = {
  message?: string;
  type?: "success" | "error";
};

export default function NotificationMessage({ message, type }: Props) {
  if (!message) return null;

  const style =
    type === "success"
      ? "text-green-800 bg-green-100 dark:bg-green-900/80 dark:text-green-100"
      : "text-red-800 bg-red-100 dark:bg-red-900/80 dark:text-red-100";

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 top-6 z-50 px-4 py-2 rounded shadow-lg text-sm font-medium text-center ${style}`}
    >
      {message}
    </div>
  );
}