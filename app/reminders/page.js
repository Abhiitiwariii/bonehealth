export const metadata = {
  title: "Reminders | रिमाइंडर",
};

export default function RemindersPage() {
  return (
    <div className="bg-white border border-black/10 rounded-xl p-6 text-center">
      <p className="text-5xl mb-3">🔔</p>
      <p className="text-lg font-semibold">
        <span className="lang-en">Reminders coming soon</span>
        <span className="lang-hi">रिमाइंडर जल्द आ रहे हैं</span>
      </p>
      <p className="text-sm text-ink/60 mt-2">
        <span className="lang-en">
          Medicine and exercise reminders aren't available yet. Check My
          Progress and Today's Exercise in the meantime.
        </span>
        <span className="lang-hi">
          दवा और व्यायाम के रिमाइंडर अभी उपलब्ध नहीं हैं। तब तक "प्रगति" और
          "आज का व्यायाम" देखें।
        </span>
      </p>
    </div>
  );
}
