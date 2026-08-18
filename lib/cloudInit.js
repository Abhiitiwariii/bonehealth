// One-time, first-run cloud migration.
//
// Before anonymous auth existed, data was pushed to Supabase under an
// unauthenticated `device_id` (write-only, unreadable). Now that each
// browser signs in anonymously, this re-pushes whatever is already saved
// locally so it becomes owned by the real `auth.uid()` and is readable back
// under Row Level Security. It runs push-only — it never overwrites local
// data — so it is safe to call on every load; a per-user marker key makes
// it a no-op after the first successful run for that user.

import { ensureAuth } from "./supabaseClient";
import { loadProfile, hasProfile } from "./profileStore";
import { loadHealthNumbers, hasAnyHealthNumbers } from "./healthNumbers";
import { loadDietHistory } from "./dietLog";
import {
  syncProfile,
  syncHealthNumbers,
  syncDietLog,
  syncCheckin,
} from "./cloudSync";

const MIGRATED_KEY = "arogya-cloud-migrated";
const CHECKINS_KEY = "bone-history";

export async function initCloud() {
  const user = await ensureAuth();
  if (!user) return;

  try {
    // Already migrated this local data for this exact user — nothing to do.
    if (localStorage.getItem(MIGRATED_KEY) === user.id) return;

    const profile = loadProfile();
    if (hasProfile(profile)) syncProfile(profile);

    const health = loadHealthNumbers();
    if (hasAnyHealthNumbers(health)) syncHealthNumbers(health);

    loadDietHistory().forEach((entry) => syncDietLog(entry));

    let checkins = [];
    try {
      checkins = JSON.parse(localStorage.getItem(CHECKINS_KEY) || "[]");
    } catch (e) {
      checkins = [];
    }
    checkins.forEach((entry) => syncCheckin(entry));

    localStorage.setItem(MIGRATED_KEY, user.id);
  } catch (e) {
    console.warn("Cloud migration failed:", e);
  }
}
