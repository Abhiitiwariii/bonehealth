"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Disclaimer from "./components/Disclaimer";
import ProfileCard from "./components/ProfileCard";
import ExerciseVideo from "./components/ExerciseVideo";
import Collapsible from "./components/Collapsible";
import Celebration from "./components/Celebration";
import LevelRing from "./components/LevelRing";
import ShareQuoteButton from "./components/ShareQuoteButton";
import HealthNumbersSummary from "./components/HealthNumbersSummary";
import OnboardingFlow, { ONBOARDING_DISMISSED_KEY } from "./components/OnboardingFlow";
import { loadProfile, hasProfile } from "../lib/profileStore";
import { exercises, avoidList } from "../lib/exercises";
import { quoteOfTheDay } from "../lib/quotes";
import { todaysPlan } from "../lib/weeklyPlan";
import { loadDietHistory } from "../lib/dietLog";
import { computeStreak } from "../lib/gamification";

// The single warm accent for the whole clean layout. Everything active or
// positive uses this; structure stays cool slate + white so the one warm
// colour actually reads as emphasis rather than noise.
const ACCENT = "#E8912D";

function todayKey() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
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

// Clean, single-accent quick links — replaces the old rainbow gradient
// grid. One neutral card style, the accent used only for the icon, so the
// grid reads calm and every tile looks like it belongs to the same app.
const quickLinks = [
  { key: "exercise", kind: "toggle", label_en: "Exercise", label_hi: "व्यायाम", emoji: null },
  { key: "diet", kind: "link", href: "/diet", label_en: "Diet", label_hi: "आहार", emoji: "🍎" },
  { key: "progress", kind: "link", href: "/log", label_en: "Progress", label_hi: "प्रगति", emoji: "📊" },
  { key: "doctors", kind: "link", href: "/doctors", label_en: "Doctors", label_hi: "डॉक्टर", emoji: "🩺" },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return { en: "Good morning", hi: "सुप्रभात" };
  if (h < 17) return { en: "Good afternoon", hi: "नमस्ते" };
  return { en: "Good evening", hi: "शुभ संध्या" };
}

// One exercise as a clean, calm collapsible: checking it off gives an
// immediate accent-tinted state change, and "How to do it" tucks the
// detailed steps away until wanted.
function ExerciseItem({ ex, checked, onToggle }) {
  const [open, setOpen] = useState(false);

  return (
    <li
      className={`rounded-2xl border overflow-hidden transition-colors ${
        checked ? "bg-amber-50 border-amber-300" : "bg-white border-slate-200"
      }`}
    >
      <div className="flex items-start gap-3 p-4">
        <button
          type="button"
          onClick={() => onToggle(ex.id)}
          aria-pressed={checked}
          aria-label={checked ? `${ex.name_en} done` : `Mark ${ex.name_en} done`}
          className={`mt-0.5 w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all active:scale-90 ${
            checked ? "bg-amber-500 border-amber-500 animate-pop-in" : "bg-white border-slate-300"
          }`}
        >
          {checked && <span className="text-white text-base leading-none">✓</span>}
        </button>
        <button type="button" onClick={() => setOpen((v) => !v)} className="flex-1 text-left">
          <p className="text-lg font-semibold text-slate-800">
            <span className="lang-en">{ex.name_en}</span>
            <span className="lang-hi">{ex.name_hi}</span>
          </p>
          <p className="text-sm text-amber-700 font-medium mt-0.5">
            <span className="lang-en">{ex.reps}</span>
            <span className="lang-hi">{ex.reps_hi}</span>
          </p>
          <p className="text-sm text-slate-500 font-medium mt-1.5 flex items-center gap-1">
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
            <p className="italic text-slate-500 lang-en">{ex.why_en}</p>
            <p className="italic text-slate-400 lang-hi">{ex.why_hi}</p>
            <ol className="list-decimal list-inside mt-2 space-y-1 text-slate-700 lang-en">
              {ex.steps_en.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
            <ol className="list-decimal list-inside mt-2 space-y-1 text-slate-500 lang-hi">
              {ex.steps_hi.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
            <ExerciseVideo videoId={ex.videoId} videoSource={ex.videoSource} videoSearch={ex.videoSearch} />
          </div>
        </div>
      </div>
    </li>
  );
}

function HabitRow({ emoji, label_en, label_hi, done, onAction, actionLabel_en, actionLabel_hi }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <span
        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 transition-colors ${
          done ? "bg-amber-100" : "bg-slate-100"
        }`}
      >
        {done ? "✓" : emoji}
      </span>
      <p className="flex-1 font-medium text-slate-800">
        <span className="lang-en block">{label_en}</span>
        <span className="lang-hi block">{label_hi}</span>
      </p>
      <button
        onClick={onAction}
        className={`text-sm font-semibold rounded-full px-4 py-2 shrink-0 transition-transform active:scale-95 ${
          done ? "bg-slate-100 text-slate-500" : "bg-amber-500 text-white shadow-sm"
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
  const [streak, setStreak] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const exercisePanelRef = useRef(null);
  const wasAllDone = useRef(false);

  useEffect(() => {
    const key = todayKey();
    setDateKey(key);
    try {
      setDone(JSON.parse(localStorage.getItem(`bone-routine-${key}`) || "{}"));
    } catch (e) {
      setDone({});
    }
    try {
      setDietLoggedToday(loadDietHistory().some((h) => h.date === key));
    } catch (e) {
      setDietLoggedToday(false);
    }
    try {
      const checkins = JSON.parse(localStorage.getItem("bone-history") || "[]");
      setCheckedInToday(checkins.some((h) => h.date === key));
    } catch (e) {
      setCheckedInToday(false);
    }
    try {
      setStreak(computeStreak());
    } catch (e) {
      setStreak(0);
    }
    // Show first-run onboarding until the user has a profile or has skipped it.
    try {
      const dismissed = localStorage.getItem(ONBOARDING_DISMISSED_KEY) === "1";
      setShowOnboarding(!hasProfile(loadProfile()) && !dismissed);
    } catch (e) {
      setShowOnboarding(false);
    }
  }, []);

  function toggle(id) {
    const next = { ...done, [id]: !done[id] };
    setDone(next);
    if (dateKey) {
      localStorage.setItem(`bone-routine-${dateKey}`, JSON.stringify(next));
      try {
        setStreak(computeStreak());
      } catch (e) {
        /* keep previous */
      }
    }
  }

  function openExercisePanel() {
    setExerciseOpen(true);
    requestAnimationFrame(() => {
      exercisePanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
  const g = greeting();

  // The daily completion ring: four simple habits, how many are done today.
  const dailyTasks = [allDone, walkDone, dietLoggedToday, checkedInToday];
  const dailyDone = dailyTasks.filter(Boolean).length;
  const dailyTotal = dailyTasks.length;
  const dailyProgress = dailyTotal ? dailyDone / dailyTotal : 0;

  useEffect(() => {
    if (allDone && !wasAllDone.current) setCelebrate(true);
    wasAllDone.current = allDone;
  }, [allDone]);

  return (
    <div>
      <Disclaimer />

      {showOnboarding && (
        <OnboardingFlow onDone={() => setShowOnboarding(false)} />
      )}

      {/* Today card — clean, single-accent daily-completion ring + streak. */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 mb-5 animate-fade-in">
        <div className="flex items-center gap-5">
          <LevelRing
            progress={dailyProgress}
            size={112}
            strokeWidth={12}
            colorStart={ACCENT}
            colorEnd={ACCENT}
            trackColor="#E7EBF0"
          >
            <div className="text-center">
              <p className="text-3xl font-extrabold text-slate-800 leading-none">
                {dailyDone}
                <span className="text-xl text-slate-400 font-bold">/{dailyTotal}</span>
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mt-1">
                <span className="lang-en">today</span>
                <span className="lang-hi">आज</span>
              </p>
            </div>
          </LevelRing>

          <div className="flex-1 min-w-0">
            <p className="text-lg font-bold text-slate-800">
              <span className="lang-en">{g.en}</span>
              <span className="lang-hi">{g.hi}</span>
            </p>
            <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">
              {dailyDone === dailyTotal ? (
                <>
                  <span className="lang-en">All done for today — wonderful! 🎉</span>
                  <span className="lang-hi">आज सब पूरा — बहुत बढ़िया! 🎉</span>
                </>
              ) : (
                <>
                  <span className="lang-en">{dailyDone} of {dailyTotal} done. A little more today.</span>
                  <span className="lang-hi">{dailyTotal} में से {dailyDone} पूरे। थोड़ा और।</span>
                </>
              )}
            </p>
            <span className="inline-flex items-center gap-1.5 mt-3 rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1.5 text-sm font-semibold">
              🔥 <span>{streak}</span>
              <span className="font-medium lang-en">day streak</span>
              <span className="font-medium lang-hi">दिन लगातार</span>
            </span>
          </div>
        </div>
      </section>

      {/* Quick links — one calm neutral card style, accent icons only. */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {quickLinks.map((item) => {
          const cardClass =
            "flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-transform text-left w-full";
          const inner = (
            <>
              <span className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                {item.key === "exercise" ? (
                  <BoneIcon className="w-6 h-6" />
                ) : (
                  <span className="text-2xl leading-none">{item.emoji}</span>
                )}
              </span>
              <span className="min-w-0">
                <span className="block text-base font-bold text-slate-800 leading-tight">
                  <span className="lang-en">{item.label_en}</span>
                  <span className="lang-hi">{item.label_hi}</span>
                </span>
                {item.key === "exercise" && todaysExercises.length > 0 && (
                  <span className="block text-xs font-semibold text-slate-400 mt-0.5">
                    {doneCount}/{todaysExercises.length}
                    <span className="lang-en"> done</span>
                    <span className="lang-hi"> पूरे</span>
                  </span>
                )}
              </span>
            </>
          );
          if (item.kind === "toggle") {
            return (
              <button key={item.key} onClick={openExercisePanel} className={cardClass}>
                {inner}
              </button>
            );
          }
          return (
            <Link key={item.key} href={item.href} className={cardClass}>
              {inner}
            </Link>
          );
        })}
      </div>

      {/* Today's exercise routine */}
      <div ref={exercisePanelRef}>
        <Collapsible
          className="mb-6"
          open={exerciseOpen}
          onToggle={setExerciseOpen}
          renderHeader={({ open, toggle }) => (
            <button
              onClick={toggle}
              aria-expanded={open}
              className="w-full flex items-center justify-between gap-3 p-4 active:scale-[0.99] transition-transform"
            >
              <div className="flex items-center gap-3 text-left">
                <span className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <BoneIcon className="w-6 h-6" />
                </span>
                <div>
                  <p className="text-lg font-bold text-slate-800">
                    <span className="lang-en">{plan.theme_en}</span>
                    <span className="lang-hi">{plan.theme_hi}</span>
                  </p>
                  <p className="text-sm text-slate-500">
                    <span className="lang-en">{allDone ? "All done today!" : "Today's routine"}</span>
                    <span className="lang-hi">{allDone ? "आज पूरा हो गया!" : "आज की दिनचर्या"}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xl font-extrabold text-amber-600">
                  {doneCount}/{todaysExercises.length}
                </span>
                <span
                  className={`text-amber-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
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
            <ul className="space-y-1 text-sm text-slate-700">
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

      {/* Today's habits — one-tap rows */}
      <Collapsible icon="🎯" title_en="Today's Habits" title_hi="आज की आदतें" defaultOpen className="mb-6">
        <div className="divide-y divide-slate-100">
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

      {/* Calm, contained devotional quote — kept, not removed. */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 shadow-sm">
        <p className="text-xs uppercase tracking-wide text-slate-400 mb-1 font-semibold">
          🪷 <span className="lang-en">Today's Krishna Quote</span>
          <span className="lang-hi">आज का श्री कृष्ण वचन</span>
        </p>
        <p className="text-lg leading-relaxed text-slate-800 lang-hi">{quote.sanskrit}</p>
        <p className="mt-2 text-base text-slate-700 lang-hi">{quote.hindi}</p>
        <p className="mt-1 text-sm text-slate-500 italic lang-en">{quote.english}</p>
        <p className="mt-2 text-xs text-slate-400">{quote.source}</p>
        <ShareQuoteButton quote={quote} />
      </div>

      <Celebration show={celebrate} onClose={() => setCelebrate(false)} />
    </div>
  );
}
