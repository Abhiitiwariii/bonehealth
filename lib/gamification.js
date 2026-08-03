// Streak, points, and badges, computed from what's already saved in
// localStorage (bone-routine-<date> and bone-history). No new storage
// format, just reading what the app already writes.

import { todaysPlan } from "./weeklyPlan";

const POINTS_PER_EXERCISE = 10;
const FULL_DAY_BONUS = 20;
const WALK_BONUS = 10;
const LOG_BONUS = 10;

export const badges = [
  { id: "first-step", threshold: 1, type: "streak", emoji: "🌱", name_en: "First Step", name_hi: "पहला कदम" },
  { id: "three-day", threshold: 3, type: "streak", emoji: "🔥", name_en: "3-Day Spark", name_hi: "3 दिन की लगन" },
  { id: "week-diya", threshold: 7, type: "streak", emoji: "🪔", name_en: "Week's Diya", name_hi: "सप्ताह का दीया" },
  { id: "fortnight", threshold: 14, type: "streak", emoji: "🌸", name_en: "Fortnight", name_hi: "पखवाड़ा" },
  { id: "month-garland", threshold: 30, type: "streak", emoji: "🏵️", name_en: "Month's Garland", name_hi: "महीने की माला" },
  { id: "century", threshold: 100, type: "totalExercises", emoji: "⭐", name_en: "Century", name_hi: "शतक" },
];

function dateKeyFrom(d) {
  return d.toISOString().slice(0, 10);
}

function getRoutineForDate(dateKey) {
  try {
    return JSON.parse(localStorage.getItem(`bone-routine-${dateKey}`) || "{}");
  } catch (e) {
    return {};
  }
}

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem("bone-history") || "[]");
  } catch (e) {
    return [];
  }
}

// A day counts toward the streak if you did at least one exercise that day.
function dayHasActivity(dateKey) {
  const routine = getRoutineForDate(dateKey);
  return Object.values(routine).some(Boolean);
}

export function computeStreak(today = new Date()) {
  let streak = 0;
  let cursor = new Date(today);
  while (true) {
    const key = dateKeyFrom(cursor);
    if (dayHasActivity(key)) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export function computeTotalExercisesCompleted() {
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("bone-routine-")) {
      try {
        const routine = JSON.parse(localStorage.getItem(key) || "{}");
        total += Object.values(routine).filter(Boolean).length;
      } catch (e) {
        // skip unreadable entries
      }
    }
  }
  return total;
}

export function computePoints() {
  let points = 0;
  const dateKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("bone-routine-")) {
      dateKeys.push(key.replace("bone-routine-", ""));
    }
  }

  dateKeys.forEach((dateKey) => {
    const routine = getRoutineForDate(dateKey);
    const doneCount = Object.values(routine).filter(Boolean).length;
    points += doneCount * POINTS_PER_EXERCISE;

    const dayPlan = todaysPlan(new Date(dateKey));
    if (dayPlan && doneCount >= dayPlan.exerciseIds.length && doneCount > 0) {
      points += FULL_DAY_BONUS;
    }
    if (routine["gentle-walk"]) {
      points += WALK_BONUS;
    }
  });

  const history = getHistory();
  points += history.length * LOG_BONUS;

  return points;
}

export function computeEarnedBadges() {
  const streak = computeStreak();
  const totalExercises = computeTotalExercisesCompleted();
  return badges.map((b) => {
    const value = b.type === "streak" ? streak : totalExercises;
    return { ...b, earned: value >= b.threshold };
  });
}

export function computeStats() {
  return {
    streak: computeStreak(),
    points: computePoints(),
    badges: computeEarnedBadges(),
  };
}
