type Props = {
  isDarkMode: boolean;
  value: number | null;
  onChange: (value: number) => void;
};

export default function FeedbackFormRating({
  isDarkMode,
  value,
  onChange,
}: Props) {
  const ratings = [
    { value: 1, emoji: "😔" },
    { value: 2, emoji: "😐" },
    { value: 3, emoji: "😊" },
    { value: 4, emoji: "😀" },
    { value: 5, emoji: "🤩" },
  ];

  return (
    <fieldset className="space-y-3">
      <legend
        className={`text-sm font-semibold ${
          isDarkMode ? "text-slate-100" : "text-slate-800"
        }`}
      >
        How was your experience?
      </legend>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {ratings.map((rating) => (
          <label
            key={rating.value}
            className={`flex h-[52px] items-center justify-center rounded-lg border text-[1.5rem] cursor-pointer transition-all ${
              value === rating.value
                ? isDarkMode
                  ? "border-2 border-orange-500 bg-orange-500/10 shadow-[0_0_0_1px_rgba(249,115,22,0.14)]"
                  : "border-2 border-orange-500 bg-orange-50 shadow-[0_0_0_1px_rgba(249,115,22,0.14)]"
                : isDarkMode
                  ? "border-slate-600 bg-slate-800/25 hover:border-slate-500"
                  : "border-slate-300 bg-white hover:border-slate-400"
            }`}
          >
            <input
              type="radio"
              value={rating.value}
              checked={value === rating.value}
              onChange={() => onChange(rating.value)}
              className="sr-only"
              required
            />
            {rating.emoji}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
