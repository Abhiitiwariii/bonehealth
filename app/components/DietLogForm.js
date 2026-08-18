"use client";

import { useEffect, useState } from "react";
import { todayKey, loadDietHistory, saveDietEntry } from "../../lib/dietLog";

export default function DietLogForm() {
  const [dateKey, setDateKey] = useState("");
  const [foodText, setFoodText] = useState("");
  const [history, setHistory] = useState([]);
  const [saved, setSaved] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  useEffect(() => {
    const key = todayKey();
    setDateKey(key);
    const hist = loadDietHistory();
    setHistory(hist);
    const existing = hist.find((h) => h.date === key);
    if (existing) setFoodText(existing.foodText || "");
  }, []);

  function handleSave() {
    const hist = saveDietEntry(dateKey, foodText);
    setHistory(hist);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-4 shadow-sm">
      <p className="text-lg font-semibold mb-1">
        📝 <span className="lang-en">Today's Food Log (optional)</span>
        <span className="lang-hi">आज का खाना (वैकल्पिक)</span>
      </p>
      <p className="text-sm text-slate-500 mb-3 lang-en">
        Jot down what you ate today, in your own words. Saved on this
        device and synced securely to help track your progress.
      </p>
      <p className="text-sm text-slate-500 mb-3 lang-hi">
        आज आपने क्या खाया, अपने शब्दों में लिखें। यह जानकारी इस डिवाइस पर सेव
        होती है और सुरक्षित रूप से सिंक होती है।
      </p>

      <textarea
        value={foodText}
        onChange={(e) => setFoodText(e.target.value)}
        rows={3}
        className="w-full border border-slate-200 rounded-lg p-2 text-base"
        placeholder="e.g. Dal, roti, palak sabzi, a glass of milk"
      />

      <button
        onClick={handleSave}
        className="mt-3 w-full bg-amber-500 text-white font-semibold py-3 rounded-xl text-lg shadow-md active:scale-[0.98] transition-transform"
      >
        <span className="lang-en">{saved ? "Saved ✓" : "Save Today's Food"}</span>
        <span className="lang-hi">{saved ? "सेव हो गया ✓" : "आज का खाना सेव करें"}</span>
      </button>

      {history.length > 0 && (
        <div className="mt-4 border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={() => setHistoryOpen((v) => !v)}
            className="flex items-center gap-1 text-sm font-semibold text-slate-800"
          >
            <span className="lang-en">Past entries</span>
            <span className="lang-hi">पिछली प्रविष्टियां</span>
            <span
              className={`inline-block transition-transform duration-300 ${historyOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            >
              ▾
            </span>
          </button>
          <div className={`accordion-track ${historyOpen ? "is-open" : ""}`}>
            <div className="accordion-inner">
              <ul className="mt-2 space-y-2 text-sm">
                {history.map((h) => (
                  <li
                    key={h.date}
                    className="border-t border-slate-100 pt-2 first:border-0 first:pt-0"
                  >
                    <span className="font-semibold">{h.date}</span>
                    {h.foodText && (
                      <p className="text-slate-500 mt-0.5">{h.foodText}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
