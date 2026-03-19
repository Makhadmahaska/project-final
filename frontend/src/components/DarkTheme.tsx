import useDarkMode from "../hooks/userDarkMode";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useDarkMode();

  return (
    <div className="flex items-center gap-3 mt-8">
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {isDarkMode ? "Dark" : "Light"} Mode
      </span>

      <button
        onClick={toggleTheme}
        className="relative inline-flex items-center h-6 w-11 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors focus:outline-none"
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isDarkMode ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>

      <span className="text-sm text-gray-600 dark:text-gray-400">
        {isDarkMode ? "🌙" : "☀️"}
      </span>
    </div>
  );
}