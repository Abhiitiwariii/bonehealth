// Best-effort sync to Supabase. Every function here is fire-and-forget:
// the on-device save (localStorage/IndexedDB) always happens first and is
// the source of truth for what the app shows the person using it. If the
// network is down, Supabase isn't configured, or anything else goes
// wrong, we just log a warning and move on — cloud sync failing should
// never block or break someone's local save.

import { supabase } from "./supabaseClient";
import { getDeviceId } from "./deviceId";

async function upsert(table, row, conflictCols) {
  if (!supabase) return;
  const deviceId = getDeviceId();
  if (!deviceId) return;
  try {
    const { error } = await supabase
      .from(table)
      .upsert({ device_id: deviceId, ...row }, { onConflict: conflictCols });
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
      notes: profile.notes || null,
      updated_at: new Date().toISOString(),
    },
    "device_id"
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
    "device_id"
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
    "device_id,date"
  );
}

export function syncDietLog(entry) {
  return upsert(
    "diet_logs",
    {
      date: entry.date,
      food_text: entry.foodText || null,
    },
    "device_id,date"
  );
}
