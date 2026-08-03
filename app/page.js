"use client";

import { useEffect, useState } from "react";
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
      <div className="bg-gradient-to-br from-clay to-clay/80 text-white rounded-xl p-4 mb-6 shadow-sm">
        <p className="text-xs uppercase tracking-wide opacity-80 mb-1">
          🪷 Today's Krishna Quote / आज का श्री कृष्ण वचन
        </p>
        <p className="text-lg leading-relaxed">{quote.sanskrit}</p>
        <p className="mt-2 text-base">{quote.hindi}</p>
        <p className="mt-1 text-sm opacity-80 italic">{quote.english}</p>
        <p className="mt-2 text-xs opacity-70">{quote.source}</p>
        <ShareQuoteButton quote={quote} />
      </div>

      <GameStats refreshKey={doneCount} />

      <ProfileCard />

      <HealthNumbersSummary />

      <Disclaimer />

      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">
            {plan.theme_en} <span className="text-ink/50 font-normal">· {plan.theme_hi}</span>
          </p>
          <p className="text-sm text-ink/60">Today's routine · आज की दिनचर्या</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-clay">
            {doneCount}/{todaysExercises.length}
          </p>
          <p className="text-xs text-ink/60">done / पूर्ण</p>
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
                className="mt-2 w-5 h-5 accent-clay shrink-0"
              />
              <div className="flex-1">
                <p className="text-lg font-semibold">
                  {ex.name_en}
                  <span className="text-ink/60 font-normal">
                    {" "}
                    · {ex.name_hi}
                  </span>
                </p>
                <p className="text-sm text-clay font-medium mt-0.5">
                  {ex.reps} <span className="text-ink/50">· {ex.reps_hi}</span>
                </p>
                <details className="mt-2 text-sm">
                  <summary className="cursor-pointer text-sage font-medium">
                    How to do it / कैसे करें
                  </summary>
                  <p className="mt-1 italic text-ink/70">{ex.why_en}</p>
                  <p className="italic text-ink/50">{ex.why_hi}</p>
                  <ol className="list-decimal list-inside mt-2 space-y-1">
                    {ex.steps_en.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                  <ol className="list-decimal list-inside mt-2 space-y-1 text-ink/60">
                    {ex.steps_hi.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                </details>
                <ExerciseVideo
                  videoId={ex.videoId}
                  videoSource={ex.videoSource}
                  videoSearch={ex.videoSearch}
                />
              </div>
            </label>
          </li>
        ))}
      </ul>

      <div className="mt-6 bg-white rounded-xl border border-black/10 p-4">
        <p className="font-semibold mb-2">
          🚫 Avoid these / इनसे बचें
        </p>
        <ul className="space-y-1 text-sm">
          {avoidList.map((a, i) => (
            <li key={i}>
              <span className="text-clay">✕</span> {a.en}
              <span className="text-ink/50"> · {a.hi}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-center text-sm text-ink/50 mt-6">
        Go to <span className="font-semibold">My Progress</span> to log
        today's pain level and save this to history.
        <br />
        आज का दर्द स्तर दर्ज करने के लिए "प्रगति" पर जाएं।
      </p>
    </div>
  );
}
