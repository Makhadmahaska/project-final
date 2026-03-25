export default function ThemeToggle({
  isDarkMode,
  toggleTheme,
}: {
  isDarkMode: boolean;
  toggleTheme: () => void;
}) {
  return (
    <div className="mt-7 flex items-center justify-center gap-3">
      <span
        className={`text-sm font-semibold ${
          isDarkMode ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </span>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        aria-pressed={isDarkMode}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/30 ${
          isDarkMode ? "bg-slate-700" : "bg-slate-200"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
            isDarkMode ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>

      <span
        className={`text-base leading-none ${
          isDarkMode ? "text-amber-300" : "text-amber-400"
        }`}
      >
        {isDarkMode ? "🌙" : "☀️"}
      </span>
    </div>
  );
}
