// Best-effort two-way sync with Supabase. Writes are fire-and-forget: the
// on-device save (localStorage/IndexedDB) always happens first and stays the
// source of truth for what the app shows. If the network is down, Supabase
// isn't configured, or anything else goes wrong, we log a warning and move
// on — cloud sync failing must never block or break someone's local save.
//
// Every row is now owned by an authenticated (anonymous) user, so upserts
// key on `user_id` and reads are scoped to the signed-in user by Row Level
// Security. `device_id` is still written for reference/debugging but is no
// longer the identity.

import { supabase, ensureAuth } from "./supabaseClient";
import { getDeviceId } from "./deviceId";

async function upsert(table, row, conflictCols) {
  if (!supabase) return;
  const user = await ensureAuth();
  if (!user) return;
  try {
    const { error } = await supabase
      .from(table)
      .upsert(
        { user_id: user.id, device_id: getDeviceId(), ...row },
        { onConflict: conflictCols }
      );
    if (error) console.warn(`Cloud sync (${table}) failed:`, error.message);
  } catch (e) {
    console.warn(`Cloud sync (${table}) failed:`, e);
  }
}

export function syncProfile(profile) {
  return upsert(
    "profiles",
    {
      name: profile.name || null,
      height_cm: profile.heightCm ? Number(profile.heightCm) : null,
      weight_kg: profile.weightKg ? Number(profile.weightKg) : null,
      age: profile.age ? Number(profile.age) : null,
      gender: profile.gender || null,
      email: profile.email || null,
      notes: profile.notes || null,
      updated_at: new Date().toISOString(),
    },
    "user_id"
  );
}

export function syncHealthNumbers(values) {
  return upsert(
    "health_numbers",
    {
      vitamin_d: values.vitaminD ? Number(values.vitaminD) : null,
      calcium: values.calcium ? Number(values.calcium) : null,
      bmd_tscore: values.bmdTScore ? Number(values.bmdTScore) : null,
      hemoglobin: values.hemoglobin ? Number(values.hemoglobin) : null,
      tested_on: values.testedOn || null,
      updated_at: new Date().toISOString(),
    },
    "user_id"
  );
}

export function syncCheckin(entry) {
  return upsert(
    "checkins",
    {
      date: entry.date,
      pain: entry.pain,
      walked: entry.walked,
      notes: entry.notes || null,
      exercises_done: entry.exercisesDone,
      exercises_total: entry.exercisesTotal,
    },
    "user_id,date"
  );
}

export function syncDietLog(entry) {
  return upsert(
    "diet_logs",
    {
      date: entry.date,
      food_text: entry.foodText || null,
    },
    "user_id,date"
  );
}

// ---- Read-back --------------------------------------------------------
// These are what the old write-only design could not do. Each returns the
// signed-in user's own cloud data (RLS enforces "own rows only"), or a safe
// empty value if cloud sync is off / unauthenticated / errored — so callers
// can always merge without extra guards.

async function selectOwn(table, { single = false } = {}) {
  if (!supabase) return single ? null : [];
  const user = await ensureAuth();
  if (!user) return single ? null : [];
  try {
    let query = supabase.from(table).select("*").eq("user_id", user.id);
    if (single) query = query.maybeSingle();
    const { data, error } = await query;
    if (error) {
      console.warn(`Cloud read (${table}) failed:`, error.message);
      return single ? null : [];
    }
    return data ?? (single ? null : []);
  } catch (e) {
    console.warn(`Cloud read (${table}) failed:`, e);
    return single ? null : [];
  }
}

export function fetchProfile() {
  return selectOwn("profiles", { single: true });
}

export function fetchHealthNumbers() {
  return selectOwn("health_numbers", { single: true });
}

export function fetchCheckins() {
  return selectOwn("checkins");
}

export function fetchDietLogs() {
  return selectOwn("diet_logs");
}
