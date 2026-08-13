"use client";

import { useEffect, useState } from "react";
import { exercises } from "../../lib/exercises";
import { painTips, whenToCallDoctor } from "../../lib/painCare";
import { syncCheckin } from "../../lib/cloudSync";
import PageHero from "../components/PageHero";

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
    syncCheckin(entry);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const painLabels_en = [
    "No pain", "Very mild", "Mild", "Noticeable", "Uncomfortable",
    "Moderate", "Quite sore", "Very sore", "Severe", "Very severe", "Worst possible",
  ];
  const painLabels_hi = [
    "दर्द नहीं", "बहुत हल्का", "हल्का", "महसूस होता", "असहज",
    "मध्यम", "काफ़ी दर्द", "बहुत दर्द", "गंभीर", "बहुत गंभीर", "सबसे ज़्यादा",
  ];
  const painFaces = ["😄", "🙂", "🙂", "😐", "😐", "😕", "😕", "😣", "😣", "😖", "😫"];

  return (
    <div>
      <PageHero
        emoji="📋"
        title_en="Today's Check-In"
        title_hi="आज की जानकारी दर्ज करें"
        from="from-indigo-400"
        to="to-violet-600"
      />

      <div className="bg-white rounded-2xl border border-black/10 p-4 mb-4 shadow-sm">
        <label className="block mb-3">
          <span className="font-semibold lang-en">Knee / joint pain today</span>
          <span className="font-semibold lang-hi">आज घुटने/जोड़ में दर्द</span>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-4xl">{painFaces[pain]}</span>
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
          <p className="text-sm text-ink/60 mt-1 lang-en">{painLabels_en[pain]}</p>
          <p className="text-sm text-ink/60 mt-1 lang-hi">{painLabels_hi[pain]}</p>
        </label>

        <label className="flex items-center gap-3 mb-3 cursor-pointer">
          <input
            type="checkbox"
            checked={walked}
            onChange={(e) => setWalked(e.target.checked)}
            className="w-5 h-5 accent-clay"
          />
          <span>
            🚶 <span className="lang-en">Walked today</span>
            <span className="lang-hi">आज सैर की</span>
          </span>
        </label>

        <label className="block">
          <span className="font-semibold lang-en">Notes</span>
          <span className="font-semibold lang-hi">टिप्पणी</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full mt-1 border border-black/15 rounded-lg p-2 text-base"
            placeholder="How did you feel today?"
          />
        </label>

        <button
          onClick={handleSave}
          className="mt-4 w-full bg-gradient-to-r from-clay to-maroon text-white font-semibold py-3 rounded-xl text-lg shadow-md active:scale-[0.98] transition-transform"
        >
          <span className="lang-en">{saved ? "Saved ✓" : "Save Today"}</span>
          <span className="lang-hi">{saved ? "सेव हो गया ✓" : "आज का डेटा सेव करें"}</span>
        </button>
      </div>

      <details className="bg-white rounded-2xl border border-black/10 p-4 mb-4 shadow-sm">
        <summary className="text-lg font-semibold cursor-pointer">
          🩹 <span className="lang-en">Comfort Tips</span>
          <span className="lang-hi">आराम के उपाय</span>
        </summary>
        <p className="text-sm text-ink/60 mt-2 mb-3 lang-en">
          Non-medicine ways to ease pain. Follow your doctor's instructions
          for medicines.
        </p>
        <p className="text-sm text-ink/60 mt-2 mb-3 lang-hi">
          दर्द कम करने के गैर-दवा उपाय। दवाओं के लिए डॉक्टर की सलाह मानें।
        </p>
        <ul className="space-y-3">
          {painTips.map((tip) => (
            <li key={tip.title_en} className="border-l-4 border-sage/40 pl-3">
              <p className="font-semibold">
                <span className="lang-en">{tip.title_en}</span>
                <span className="lang-hi">{tip.title_hi}</span>
              </p>
              <p className="text-sm mt-0.5 lang-en">{tip.text_en}</p>
              <p className="text-sm text-ink/50 lang-hi">{tip.text_hi}</p>
            </li>
          ))}
        </ul>

        <div className="mt-4 bg-clay/10 border border-clay/30 rounded-lg p-3">
          <p className="font-semibold text-clay mb-2">
            📞 <span className="lang-en">Call your doctor if</span>
            <span className="lang-hi">डॉक्टर को कॉल करें अगर</span>
          </p>
          <ul className="space-y-1 text-sm">
            {whenToCallDoctor.map((w, i) => (
              <li key={i}>
                <span className="text-clay">●</span>{" "}
                <span className="lang-en">{w.en}</span>
                <span className="lang-hi">{w.hi}</span>
              </li>
            ))}
          </ul>
        </div>
      </details>

      <div className="bg-white rounded-2xl border border-black/10 p-4 shadow-sm">
        <p className="text-lg font-semibold mb-3">
          📊 <span className="lang-en">History</span>
          <span className="lang-hi">इतिहास</span>
        </p>
        {history.length === 0 ? (
          <>
            <p className="text-sm text-ink/50 lang-en">
              No entries yet. Save today's check-in to start.
            </p>
            <p className="text-sm text-ink/50 lang-hi">
              अभी कोई प्रविष्टि नहीं। आज का डेटा सेव करके शुरू करें।
            </p>
          </>
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
                    {painFaces[h.pain]} {h.pain}/10
                  </span>
                </div>
                <div className="w-full bg-black/5 rounded-full h-2 mt-2">
                  <div
                    className="bg-clay h-2 rounded-full"
                    style={{ width: `${h.pain * 10}%` }}
                  />
                </div>
                <p className="mt-2 text-ink/70">
                  <span className="lang-en">
                    Exercises: {h.exercisesDone}/{h.exercisesTotal} · Walked: {h.walked ? "Yes" : "No"}
                  </span>
                  <span className="lang-hi">
                    व्यायाम: {h.exercisesDone}/{h.exercisesTotal} · सैर: {h.walked ? "हां" : "नहीं"}
                  </span>
                </p>
                {h.notes && <p className="mt-1 italic text-ink/60">"{h.notes}"</p>}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="text-center text-xs text-ink/40 mt-4 lang-en">
        Saved on this device, and synced securely so you can track your
        progress over time.
      </p>
      <p className="text-center text-xs text-ink/40 mt-4 lang-hi">
        यह जानकारी इस डिवाइस पर सेव होती है, और आपकी प्रगति ट्रैक करने के लिए
        सुरक्षित रूप से सिंक होती है।
      </p>
    </div>
  );
}
