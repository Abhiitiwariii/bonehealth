"use client";

import { useEffect, useState } from "react";
import { exercises } from "../../lib/exercises";
import { painTips, whenToCallDoctor } from "../../lib/painCare";

const HISTORY_KEY = "bone-history";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch (e) {
    return [];
  }
}

function loadTodayExerciseCount(dateKey) {
  try {
    const saved = JSON.parse(
      localStorage.getItem(`bone-routine-${dateKey}`) || "{}"
    );
    return Object.values(saved).filter(Boolean).length;
  } catch (e) {
    return 0;
  }
}

export default function LogPage() {
  const [dateKey, setDateKey] = useState("");
  const [pain, setPain] = useState(3);
  const [walked, setWalked] = useState(false);
  const [notes, setNotes] = useState("");
  const [history, setHistory] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const key = todayKey();
    setDateKey(key);
    const hist = loadHistory();
    setHistory(hist);
    const existing = hist.find((h) => h.date === key);
    if (existing) {
      setPain(existing.pain);
      setWalked(existing.walked);
      setNotes(existing.notes || "");
    }
  }, []);

  function handleSave() {
    const exercisesDone = loadTodayExerciseCount(dateKey);
    const entry = {
      date: dateKey,
      pain,
      walked,
      notes,
      exercisesDone,
      exercisesTotal: exercises.length,
    };
    const hist = loadHistory().filter((h) => h.date !== dateKey);
    hist.push(entry);
    hist.sort((a, b) => (a.date < b.date ? 1 : -1));
    localStorage.setItem(HISTORY_KEY, JSON.stringify(hist));
    setHistory(hist);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const painLabels = [
    "No pain",
    "Very mild",
    "Mild",
    "Noticeable",
    "Uncomfortable",
    "Moderate",
    "Quite sore",
    "Very sore",
    "Severe",
    "Very severe",
    "Worst possible",
  ];

  return (
    <div>
      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
        <p className="text-lg font-semibold">📋 Today's Check-In</p>
        <p className="text-sm text-ink/60">आज की जानकारी दर्ज करें</p>
      </div>

      <div className="bg-white rounded-xl border border-black/10 p-4 mb-4">
        <label className="block mb-3">
          <span className="font-semibold">
            Knee / joint pain today (0 = none, 10 = worst)
          </span>
          <br />
          <span className="text-sm text-ink/50">
            आज घुटने/जोड़ में दर्द (0 = बिल्कुल नहीं, 10 = सबसे ज़्यादा)
          </span>
          <div className="flex items-center gap-3 mt-2">
            <input
              type="range"
              min="0"
              max="10"
              value={pain}
              onChange={(e) => setPain(Number(e.target.value))}
              className="flex-1 accent-clay"
            />
            <span className="text-2xl font-bold text-clay w-10 text-center">
              {pain}
            </span>
          </div>
          <p className="text-sm text-ink/60 mt-1">
            {painLabels[pain]}
          </p>
        </label>

        <label className="flex items-center gap-3 mb-3 cursor-pointer">
          <input
            type="checkbox"
            checked={walked}
            onChange={(e) => setWalked(e.target.checked)}
            className="w-5 h-5 accent-clay"
          />
          <span>
            Went for a walk today <span className="text-ink/50">· आज सैर की</span>
          </span>
        </label>

        <label className="block">
          <span className="font-semibold">Notes / टिप्पणी</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full mt-1 border border-black/15 rounded-lg p-2 text-base"
            placeholder="How did you feel today? / आज कैसा महसूस हुआ?"
          />
        </label>

        <button
          onClick={handleSave}
          className="mt-4 w-full bg-clay text-white font-semibold py-3 rounded-lg text-lg"
        >
          {saved ? "Saved ✓ / सेव हो गया" : "Save Today / आज का डेटा सेव करें"}
        </button>
      </div>

      <details className="bg-white rounded-xl border border-black/10 p-4 mb-4">
        <summary className="text-lg font-semibold cursor-pointer">
          🩹 Comfort Tips / आराम के उपाय
        </summary>
        <p className="text-sm text-ink/60 mt-2 mb-3">
          Non-medicine ways to ease pain. Never guess on medicines. Always
          follow your doctor's instructions for those.
        </p>
        <ul className="space-y-3">
          {painTips.map((tip) => (
            <li key={tip.title_en} className="border-l-4 border-sage/40 pl-3">
              <p className="font-semibold">
                {tip.title_en}{" "}
                <span className="text-ink/50 font-normal">· {tip.title_hi}</span>
              </p>
              <p className="text-sm mt-0.5">{tip.text_en}</p>
              <p className="text-sm text-ink/50">{tip.text_hi}</p>
            </li>
          ))}
        </ul>

        <div className="mt-4 bg-clay/10 border border-clay/30 rounded-lg p-3">
          <p className="font-semibold text-clay mb-2">
            📞 Call your doctor if / डॉक्टर को कॉल करें अगर
          </p>
          <ul className="space-y-1 text-sm">
            {whenToCallDoctor.map((w, i) => (
              <li key={i}>
                <span className="text-clay">●</span> {w.en}
                <span className="text-ink/50"> · {w.hi}</span>
              </li>
            ))}
          </ul>
        </div>
      </details>

      <div className="bg-white rounded-xl border border-black/10 p-4">
        <p className="text-lg font-semibold mb-3">
          📊 History / इतिहास
        </p>
        {history.length === 0 ? (
          <p className="text-sm text-ink/50">
            No entries yet. Save today's check-in to start tracking.
            <br />
            अभी कोई प्रविष्टि नहीं। ट्रैकिंग शुरू करने के लिए आज का डेटा सेव करें।
          </p>
        ) : (
          <ul className="space-y-3">
            {history.map((h) => (
              <li
                key={h.date}
                className="border border-black/10 rounded-lg p-3 text-sm"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{h.date}</span>
                  <span className="text-clay font-semibold">
                    Pain {h.pain}/10
                  </span>
                </div>
                <div className="w-full bg-black/5 rounded-full h-2 mt-2">
                  <div
                    className="bg-clay h-2 rounded-full"
                    style={{ width: `${h.pain * 10}%` }}
                  />
                </div>
                <p className="mt-2 text-ink/70">
                  Exercises: {h.exercisesDone}/{h.exercisesTotal} &nbsp;·&nbsp;
                  Walked: {h.walked ? "Yes" : "No"}
                </p>
                {h.notes && <p className="mt-1 italic text-ink/60">"{h.notes}"</p>}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="text-center text-xs text-ink/40 mt-4">
        This history is saved only on this device/browser, not sent anywhere.
        <br />
        यह इतिहास केवल इस डिवाइस पर सेव है, कहीं भेजा नहीं जाता।
      </p>
    </div>
  );
}
