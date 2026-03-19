type Props = {
  value: number | null;
  onChange: (value: number) => void;
};

export default function FeedbackFormRating({ value, onChange }: Props) {
  const ratings = [
    { value: 1, emoji: "😔" },
    { value: 2, emoji: "😐" },
    { value: 3, emoji: "😊" },
    { value: 4, emoji: "😃" },
    { value: 5, emoji: "🤩" },
  ];

  return (
    <fieldset>
      <legend className="text-sm font-medium text-gray-900 dark:text-white">
        How was your experience?
      </legend>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-5 gap-3">
        {ratings.map((rating) => (
          <label
            key={rating.value}
            className={`flex items-center justify-center p-3 rounded-md text-2xl cursor-pointer outline outline-1 transition-all hover:scale-110 ${
              value === rating.value
                ? "outline-primary outline-2"
                : "outline-gray-300 dark:outline-gray-600"
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