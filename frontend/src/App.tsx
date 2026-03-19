import FeedbackForm from "./component/feedbackForm";
import ThemeToggle from "./component/DarkTheme";
import useDarkMode from "./hooks/userDarkMode";

function App() {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="w-full max-w-xl mx-auto">
        <FeedbackForm />
        <ThemeToggle />
      </div>
    </div>
  );
}

export default App;