import FeedbackForm from "./components/feedbackForm";
import ThemeToggle from "./components/DarkTheme";
import useDarkMode from "./hooks/userDarkMode";

function App() {
  const { isDarkMode, toggleTheme } = useDarkMode();

  return (
    <div
      className={`min-h-screen font-sans flex flex-col items-center justify-center px-4 py-10 transition-colors duration-300 ${
        isDarkMode
          ? "bg-[#111827] text-white"
          : "bg-[#f3f4f6] text-slate-900"
      }`}
    >
      <div className="w-full max-w-[540px] mx-auto">
        <FeedbackForm isDarkMode={isDarkMode} />
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
}

export default App;
