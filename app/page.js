"use client";

import { useEffect, useRef, useState } from "react";
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

// A plain dog-bone shape built from basic shapes, not a font glyph, so it
// stays crisp and recognizable at any size.
function BoneIcon({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      <g transform="rotate(45 50 50)">
        <rect x="27" y="43" width="46" height="14" rx="7" />
        <circle cx="23" cy="38" r="12" />
        <circle cx="23" cy="62" r="12" />
        <circle cx="77" cy="38" r="12" />
        <circle cx="77" cy="62" r="12" />
      </g>
    </svg>
  );
}

const gridLinks = [
  {
    key: "exercise",
    kind: "toggle",
    icon: (props) => <BoneIcon {...props} />,
    label_en: "Today's Exercise",
    label_hi: "आज का व्यायाम",
    from: "from-orange-400",
    to: "to-amber-500",
  },
  {
    key: "diet",
    kind: "link",
    href: "/diet",
    emoji: "🍎",
    label_en: "Diet",
    label_hi: "आहार",
    from: "from-emerald-400",
    to: "to-green-500",
  },
  {
    key: "progress",
    kind: "link",
    href: "/log",
    emoji: "📊",
    label_en: "Progress",
    label_hi: "प्रगति",
    from: "from-indigo-400",
    to: "to-violet-500",
  },
  {
    key: "doctors",
    kind: "link",
    href: "/doctors",
    emoji: "👨‍⚕️",
    label_en: "Doctors",
    label_hi: "डॉक्टर",
    from: "from-pink-400",
    to: "to-rose-500",
  },
];

export default function TodayPage() {
  const [done, setDone] = useState({});
  const [dateKey, setDateKey] = useState("");
  const [exerciseOpen, setExerciseOpen] = useState(false);
  const exercisePanelRef = useRef(null);

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

  function openExercisePanel() {
    setExerciseOpen(true);
    requestAnimationFrame(() => {
      exercisePanelRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  const plan = todaysPlan();
  const todaysExercises = plan.exerciseIds
    .map((id) => exercises.find((ex) => ex.id === id))
    .filter(Boolean);
  const doneCount = todaysExercises.filter((ex) => done[ex.id]).length;
  const allDone = todaysExercises.length > 0 && doneCount === todaysExercises.length;
  const quote = quoteOfTheDay();

  return (
    <div>
      <Disclaimer />

      <div className="grid grid-cols-2 gap-3 mb-6">
        {gridLinks.map((item) => {
          const cardClass = `relative aspect-square bg-gradient-to-br ${item.from} ${item.to} text-white rounded-3xl flex flex-col items-center justify-center gap-2 shadow-lg shadow-black/10 active:scale-[0.96] transition-transform overflow-hidden`;
          const content = (
            <>
              <span className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-white/10" />
              {item.key === "exercise" ? (
                <BoneIcon className="w-11 h-11 drop-shadow" />
              ) : (
                <span className="text-4xl leading-none">{item.emoji}</span>
              )}
              <span className="text-card font-bold text-center px-2 leading-tight drop-shadow-sm">
                <span className="lang-en block">{item.label_en}</span>
                <span className="lang-hi block">{item.label_hi}</span>
              </span>
              {item.key === "exercise" && todaysExercises.length > 0 && (
                <span className="absolute bottom-2 right-2 bg-white/25 rounded-full px-2 py-0.5 text-xs font-bold">
                  {doneCount}/{todaysExercises.length}
                </span>
              )}
            </>
          );

          if (item.kind === "toggle") {
            return (
              <button
                key={item.key}
                data-hero
                onClick={openExercisePanel}
                className={cardClass}
              >
                {content}
              </button>
            );
          }
          return (
            <Link key={item.key} data-hero href={item.href} className={cardClass}>
              {content}
            </Link>
          );
        })}
      </div>

      <GameStats refreshKey={doneCount} />

      <div
        ref={exercisePanelRef}
        className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden mb-6"
      >
        <button
          onClick={() => setExerciseOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-3 p-4 bg-gradient-to-r from-orange-50 to-amber-50"
        >
          <div className="flex items-center gap-3 text-left">
            <span className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shrink-0">
              <BoneIcon className="w-6 h-6 text-white" />
            </span>
            <div>
              <p className="text-lg font-bold">
                <span className="lang-en">{plan.theme_en}</span>
                <span className="lang-hi">{plan.theme_hi}</span>
              </p>
              <p className="text-sm text-ink/60">
                <span className="lang-en">
                  {allDone ? "All done today! 🎉" : "Today's routine"}
                </span>
                <span className="lang-hi">
                  {allDone ? "आज पूरा हो गया! 🎉" : "आज की दिनचर्या"}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-extrabold text-orange-600">
              {doneCount}/{todaysExercises.length}
            </span>
            <span
              className={`text-orange-500 transition-transform ${exerciseOpen ? "rotate-180" : ""}`}
            >
              ▾
            </span>
          </div>
        </button>

        {exerciseOpen && (
          <div className="p-4 pt-0">
            <ul className="space-y-3 mt-4">
              {todaysExercises.map((ex) => (
                <li
                  key={ex.id}
                  className={`rounded-xl border p-4 transition-colors ${
                    done[ex.id]
                      ? "bg-emerald-50 border-emerald-300"
                      : "bg-white border-black/10"
                  }`}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!done[ex.id]}
                      onChange={() => toggle(ex.id)}
                      className="mt-2 w-6 h-6 accent-orange-500 shrink-0"
                    />
                    <div className="flex-1">
                      <p className="text-lg font-semibold">
                        <span className="lang-en">{ex.name_en}</span>
                        <span className="lang-hi">{ex.name_hi}</span>
                      </p>
                      <p className="text-sm text-orange-600 font-medium mt-0.5">
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

            <div className="mt-4 bg-rose-50 rounded-xl border border-rose-100 p-4">
              <p className="font-semibold mb-2 text-rose-700">
                🚫 <span className="lang-en">Avoid these</span>
                <span className="lang-hi">इनसे बचें</span>
              </p>
              <ul className="space-y-1 text-sm">
                {avoidList.map((a, i) => (
                  <li key={i}>
                    <span className="text-rose-500">✕</span>{" "}
                    <span className="lang-en">{a.en}</span>
                    <span className="lang-hi">{a.hi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <ProfileCard />

      <HealthNumbersSummary />

      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-4 mb-6 shadow-sm">
        <p className="text-xs uppercase tracking-wide text-amber-700/70 mb-1 font-semibold">
          🪷 <span className="lang-en">Today's Krishna Quote</span>
          <span className="lang-hi">आज का श्री कृष्ण वचन</span>
        </p>
        <p className="text-lg leading-relaxed lang-hi">{quote.sanskrit}</p>
        <p className="mt-2 text-base lang-hi">{quote.hindi}</p>
        <p className="mt-1 text-sm text-ink/70 italic lang-en">{quote.english}</p>
        <p className="mt-2 text-xs text-ink/50">{quote.source}</p>
        <ShareQuoteButton quote={quote} />
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
