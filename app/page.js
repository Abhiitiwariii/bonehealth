"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Disclaimer from "./components/Disclaimer";
import ProfileCard from "./components/ProfileCard";
import ExerciseVideo from "./components/ExerciseVideo";
import GameStats from "./components/GameStats";
import ShareQuoteButton from "./components/ShareQuoteButton";
import HealthNumbersSummary from "./components/HealthNumbersSummary";
import { exercises, avoidList } from "../lib/exercises";
import { quoteOfTheDay } from "../lib/quotes";
import { todaysPlan } from "../lib/weeklyPlan";

function todayKey() {
  const d = new Date();
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

const gridLinks = [
  { href: "/", emoji: "🦴", label_en: "Today's Exercise", label_hi: "आज का व्यायाम" },
  { href: "/diet", emoji: "🍎", label_en: "Diet", label_hi: "आहार" },
  { href: "/log", emoji: "📊", label_en: "Progress", label_hi: "प्रगति" },
  { href: "/doctors", emoji: "👨‍⚕️", label_en: "Doctors", label_hi: "डॉक्टर" },
];

export default function TodayPage() {
  const [done, setDone] = useState({});
  const [dateKey, setDateKey] = useState("");

  useEffect(() => {
    const key = todayKey();
    setDateKey(key);
    try {
      const saved = JSON.parse(
        localStorage.getItem(`bone-routine-${key}`) || "{}"
      );
      setDone(saved);
    } catch (e) {
      setDone({});
    }
  }, []);

  function toggle(id) {
    const next = { ...done, [id]: !done[id] };
    setDone(next);
    if (dateKey) {
      localStorage.setItem(`bone-routine-${dateKey}`, JSON.stringify(next));
    }
  }

  const plan = todaysPlan();
  const todaysExercises = plan.exerciseIds
    .map((id) => exercises.find((ex) => ex.id === id))
    .filter(Boolean);
  const doneCount = todaysExercises.filter((ex) => done[ex.id]).length;
  const quote = quoteOfTheDay();

  return (
    <div>
      <Disclaimer />

      <div className="grid grid-cols-2 gap-3 mb-6">
        {gridLinks.map((item) => (
          <Link
            key={item.label_en}
            href={item.href}
            className="aspect-square bg-primary text-white rounded-2xl flex flex-col items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform"
          >
            <span className="text-4xl leading-none">{item.emoji}</span>
            <span className="text-card font-semibold text-center px-2 leading-tight">
              <span className="lang-en block">{item.label_en}</span>
              <span className="lang-hi block">{item.label_hi}</span>
            </span>
          </Link>
        ))}
      </div>

      <GameStats refreshKey={doneCount} />

      <ProfileCard />

      <HealthNumbersSummary />

      <div className="bg-white border border-black/10 rounded-xl p-4 mb-6 shadow-sm">
        <p className="text-xs uppercase tracking-wide text-ink/50 mb-1">
          🪷 <span className="lang-en">Today's Krishna Quote</span>
          <span className="lang-hi">आज का श्री कृष्ण वचन</span>
        </p>
        <p className="text-lg leading-relaxed lang-hi">{quote.sanskrit}</p>
        <p className="mt-2 text-base lang-hi">{quote.hindi}</p>
        <p className="mt-1 text-sm text-ink/70 italic lang-en">{quote.english}</p>
        <p className="mt-2 text-xs text-ink/50">{quote.source}</p>
        <ShareQuoteButton quote={quote} />
      </div>

      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">
            <span className="lang-en">{plan.theme_en}</span>
            <span className="lang-hi">{plan.theme_hi}</span>
          </p>
          <p className="text-sm text-ink/60">
            <span className="lang-en">Today's routine</span>
            <span className="lang-hi">आज की दिनचर्या</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">
            {doneCount}/{todaysExercises.length}
          </p>
          <p className="text-xs text-ink/60">
            <span className="lang-en">done</span>
            <span className="lang-hi">पूर्ण</span>
          </p>
        </div>
      </div>

      <ul className="space-y-3">
        {todaysExercises.map((ex) => (
          <li
            key={ex.id}
            className={`rounded-xl border p-4 transition-colors ${
              done[ex.id]
                ? "bg-sage/10 border-sage/40"
                : "bg-white border-black/10"
            }`}
          >
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={!!done[ex.id]}
                onChange={() => toggle(ex.id)}
                className="mt-2 w-6 h-6 accent-primary shrink-0"
              />
              <div className="flex-1">
                <p className="text-lg font-semibold">
                  <span className="lang-en">{ex.name_en}</span>
                  <span className="lang-hi">{ex.name_hi}</span>
                </p>
                <p className="text-sm text-primary font-medium mt-0.5">
                  <span className="lang-en">{ex.reps}</span>
                  <span className="lang-hi">{ex.reps_hi}</span>
                </p>
                <details className="mt-2 text-sm">
                  <summary className="cursor-pointer text-sage font-medium py-1">
                    <span className="lang-en">How to do it</span>
                    <span className="lang-hi">कैसे करें</span>
                  </summary>
                  <p className="mt-1 italic text-ink/70 lang-en">{ex.why_en}</p>
                  <p className="italic text-ink/50 lang-hi">{ex.why_hi}</p>
                  <ol className="list-decimal list-inside mt-2 space-y-1 lang-en">
                    {ex.steps_en.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                  <ol className="list-decimal list-inside mt-2 space-y-1 text-ink/60 lang-hi">
                    {ex.steps_hi.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                  <ExerciseVideo
                    videoId={ex.videoId}
                    videoSource={ex.videoSource}
                    videoSearch={ex.videoSearch}
                  />
                </details>
              </div>
            </label>
          </li>
        ))}
      </ul>

      <div className="mt-6 bg-white rounded-xl border border-black/10 p-4">
        <p className="font-semibold mb-2">
          🚫 <span className="lang-en">Avoid these</span>
          <span className="lang-hi">इनसे बचें</span>
        </p>
        <ul className="space-y-1 text-sm">
          {avoidList.map((a, i) => (
            <li key={i}>
              <span className="text-clay">✕</span>{" "}
              <span className="lang-en">{a.en}</span>
              <span className="lang-hi">{a.hi}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-center text-sm text-ink/50 mt-6 lang-en">
        Go to <span className="font-semibold">My Progress</span> to log
        today's pain level.
      </p>
      <p className="text-center text-sm text-ink/50 mt-6 lang-hi">
        आज का दर्द स्तर दर्ज करने के लिए "प्रगति" पर जाएं।
      </p>
    </div>
  );
}
