// User profile, entered by each person about themselves. Saved to this
// browser's local storage first (so the app always works instantly and
// offline), then mirrored to Supabase if cloud sync is configured — see
// lib/cloudSync.js. There is still no login; the profile is identified by
// an anonymous per-browser device ID, not a name or account.

import { syncProfile } from "./cloudSync";

const PROFILE_KEY = "arogya-profile";

export const emptyProfile = {
  name: "",
  heightCm: "",
  weightKg: "",
  age: "",
  gender: "",
  notes: "",
};

export function loadProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROFILE_KEY) || "null");
    return saved ? { ...emptyProfile, ...saved } : { ...emptyProfile };
  } catch (e) {
    return { ...emptyProfile };
  }
}

export function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  syncProfile(profile);
}

export function hasProfile(profile) {
  return Boolean(profile.heightCm && profile.weightKg);
}

export function computeBmi(profile) {
  const h = Number(profile.heightCm) / 100;
  const w = Number(profile.weightKg);
  if (!h || !w) return null;
  return +(w / (h * h)).toFixed(1);
}

export function bmiCategory(bmi) {
  if (bmi === null) return null;
  if (bmi < 18.5) return { en: "Underweight", hi: "कम वज़न" };
  if (bmi < 25) return { en: "Normal range", hi: "सामान्य सीमा" };
  if (bmi < 30) return { en: "Overweight", hi: "अधिक वज़न" };
  return { en: "Obese range", hi: "मोटापे की सीमा" };
}
