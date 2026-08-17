"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Disclaimer from "./components/Disclaimer";
import ProfileCard from "./components/ProfileCard";
import ExerciseVideo from "./components/ExerciseVideo";
import GameStats from "./components/GameStats";
import Collapsible from "./components/Collapsible";
import Celebration from "./components/Celebration";
import ShareQuoteButton from "./components/ShareQuoteButton";
import HealthNumbersSummary from "./components/HealthNumbersSummary";
import { exercises, avoidList } from "../lib/exercises";
import { quoteOfTheDay } from "../lib/quotes";
import { todaysPlan } from "../lib/weeklyPlan";
import { loadDietHistory } from "../lib/dietLog";

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

// One exercise, as its own small collapsible reward card: checking it
// off gives an immediate, satisfying visual change, and "How to do it"
// tucks the detailed steps away until wanted — the collapsible habit
// pattern repeated for every single exercise instead of one long list.
function ExerciseItem({ ex, checked, onToggle }) {
  const [open, setOpen] = useState(false);

  return (
    <li
      className={`rounded-2xl border overflow-hidden transition-colors ${
        checked
          ? "bg-emerald-50 border-emerald-300 shadow-sm"
          : "bg-white border-black/10"
      }`}
    >
      <div className="flex items-start gap-3 p-4">
        <button
          type="button"
          onClick={() => onToggle(ex.id)}
          aria-pressed={checked}
          aria-label={checked ? `${ex.name_en} done` : `Mark ${ex.name_en} done`}
          className={`mt-0.5 w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all active:scale-90 ${
            checked
              ? "bg-emerald-500 border-emerald-500 animate-pop-in"
              : "bg-white border-black/20"
          }`}
        >
          {checked && <span className="text-white text-base leading-none">✓</span>}
        </button>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex-1 text-left"
        >
          <p className="text-lg font-semibold">
            <span className="lang-en">{ex.name_en}</span>
            <span className="lang-hi">{ex.name_hi}</span>
          </p>
          <p className="text-sm text-orange-600 font-medium mt-0.5">
            <span className="lang-en">{ex.reps}</span>
            <span className="lang-hi">{ex.reps_hi}</span>
          </p>
          <p className="text-sm text-sage font-medium mt-1.5 flex items-center gap-1">
            <span className="lang-en">How to do it</span>
            <span className="lang-hi">कैसे करें</span>
            <span
              className={`inline-block transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            >
              ▾
            </span>
          </p>
        </button>
      </div>

      <div className={`accordion-track ${open ? "is-open" : ""}`}>
        <div className="accordion-inner">
          <div className="px-4 pb-4 pl-[4.25rem] text-sm">
            <p className="italic text-ink/70 lang-en">{ex.why_en}</p>
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
          </div>
        </div>
      </div>
    </li>
  );
}

function HabitRow({ emoji, label_en, label_hi, done, onAction, actionLabel_en, actionLabel_hi }) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <span
        className={`w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0 transition-colors ${
          done ? "bg-emerald-100" : "bg-black/5"
        }`}
      >
        {done ? "✅" : emoji}
      </span>
      <p className="flex-1 font-medium">
        <span className="lang-en block">{label_en}</span>
        <span className="lang-hi block">{label_hi}</span>
      </p>
      <button
        onClick={onAction}
        className={`text-sm font-semibold rounded-full px-3 py-1.5 shrink-0 transition-colors ${
          done
            ? "bg-emerald-50 text-emerald-700"
            : "bg-clay/10 text-clay active:scale-95"
        }`}
      >
        {done ? (
          <>
            <span className="lang-en">Done</span>
            <span className="lang-hi">हो गया</span>
          </>
        ) : (
          <>
            <span className="lang-en">{actionLabel_en}</span>
            <span className="lang-hi">{actionLabel_hi}</span>
          </>
        )}
      </button>
    </div>
  );
}

export default function TodayPage() {
  const router = useRouter();
  const [done, setDone] = useState({});
  const [dateKey, setDateKey] = useState("");
  const [exerciseOpen, setExerciseOpen] = useState(false);
  const [dietLoggedToday, setDietLoggedToday] = useState(false);
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const exercisePanelRef = useRef(null);
  const wasAllDone = useRef(false);

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
    try {
      const dietHistory = loadDietHistory();
      setDietLoggedToday(dietHistory.some((h) => h.date === key));
    } catch (e) {
      setDietLoggedToday(false);
    }
    try {
      const checkins = JSON.parse(localStorage.getItem("bone-history") || "[]");
      setCheckedInToday(checkins.some((h) => h.date === key));
    } catch (e) {
      setCheckedInToday(false);
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
  const walkDone = !!done["gentle-walk"];
  const quote = quoteOfTheDay();

  // Fire the confetti/toast moment exactly once, the instant the last
  // exercise for today is checked off — not on every re-render or page
  // load, only on the transition from "not done" to "all done".
  useEffect(() => {
    if (allDone && !wasAllDone.current) {
      setCelebrate(true);
    }
    wasAllDone.current = allDone;
  }, [allDone]);

  return (
    <div>
      <Disclaimer />

      <GameStats refreshKey={`${doneCount}-${dietLoggedToday}-${checkedInToday}`} />

      <div className="grid grid-cols-2 gap-3 mb-6">
        {gridLinks.map((item) => {
          const cardClass = `relative aspect-square bg-gradient-to-br ${item.from} ${item.to} text-white rounded-3xl flex flex-col items-center justify-center gap-2 shadow-cardLift active:scale-[0.96] transition-transform overflow-hidden`;
          const content = (
            <>
              <span className="shine-sweep" aria-hidden="true" />
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

      <div ref={exercisePanelRef}>
        <Collapsible
          className="mb-6"
          open={exerciseOpen}
          onToggle={setExerciseOpen}
          renderHeader={({ open, toggle }) => (
            <button
              onClick={toggle}
              aria-expanded={open}
              className="w-full flex items-center justify-between gap-3 p-4 bg-gradient-to-r from-orange-50 to-amber-50 active:scale-[0.99] transition-transform"
            >
              <div className="flex items-center gap-3 text-left">
                <span className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shrink-0 shadow-sm">
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
                  className={`text-orange-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  ▾
                </span>
              </div>
            </button>
          )}
        >
          <ul className="space-y-3 mt-4">
            {todaysExercises.map((ex) => (
              <ExerciseItem key={ex.id} ex={ex} checked={!!done[ex.id]} onToggle={toggle} />
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
        </Collapsible>
      </div>

      <Collapsible
        icon="🎯"
        title_en="Today's Habits"
        title_hi="आज की आदतें"
        defaultOpen
        className="mb-6"
      >
        <div className="divide-y divide-black/5">
          <HabitRow
            emoji="🦴"
            label_en="Do today's exercises"
            label_hi="आज का व्यायाम करें"
            done={allDone}
            onAction={openExercisePanel}
            actionLabel_en="Start"
            actionLabel_hi="शुरू करें"
          />
          <HabitRow
            emoji="🚶"
            label_en="Take a gentle walk"
            label_hi="हल्की सैर करें"
            done={walkDone}
            onAction={() => toggle("gentle-walk")}
            actionLabel_en="Mark done"
            actionLabel_hi="पूरा हुआ"
          />
          <HabitRow
            emoji="🍎"
            label_en="Log today's food"
            label_hi="आज का खाना दर्ज करें"
            done={dietLoggedToday}
            onAction={() => router.push("/diet")}
            actionLabel_en="Log"
            actionLabel_hi="दर्ज करें"
          />
          <HabitRow
            emoji="📋"
            label_en="Check in for today"
            label_hi="आज की जानकारी दें"
            done={checkedInToday}
            onAction={() => router.push("/log")}
            actionLabel_en="Check in"
            actionLabel_hi="जानकारी दें"
          />
        </div>
      </Collapsible>

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

      <Celebration show={celebrate} onClose={() => setCelebrate(false)} />
    </div>
  );
}
