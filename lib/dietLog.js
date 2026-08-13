// Simple daily "what did you eat" log. Saved on-device first, same
// pattern as everything else in this app, then mirrored to Supabase if
// cloud sync is configured (see lib/cloudSync.js).

import { syncDietLog } from "./cloudSync";

const KEY = "arogya-diet-log";

export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function loadDietHistory() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch (e) {
    return [];
  }
}

export function saveDietEntry(dateKey, foodText) {
  const hist = loadDietHistory().filter((h) => h.date !== dateKey);
  const entry = { date: dateKey, foodText };
  hist.push(entry);
  hist.sort((a, b) => (a.date < b.date ? 1 : -1));
  localStorage.setItem(KEY, JSON.stringify(hist));
  syncDietLog(entry);
  return hist;
}
