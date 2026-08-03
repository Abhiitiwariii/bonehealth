// A different, smaller exercise set each day of the week, so the routine
// stays varied instead of repeating the same 10 exercises daily. Index
// matches JavaScript's Date.getDay(): 0 = Sunday, 6 = Saturday.
// gentle-walk is included most days since walking is the simplest,
// safest weight-bearing habit to build.

export const weeklyPlan = [
  {
    theme_en: "Gentle Day",
    theme_hi: "हल्का दिन",
    exerciseIds: ["ankle-pumps", "seated-marching", "gentle-walk"],
  },
  {
    theme_en: "Leg Strength",
    theme_hi: "पैर की ताकत",
    exerciseIds: ["quad-sets", "straight-leg-raise", "chair-squats", "gentle-walk"],
  },
  {
    theme_en: "Balance & Stability",
    theme_hi: "संतुलन",
    exerciseIds: ["balance-hold", "hip-side-raise", "heel-raises", "gentle-walk"],
  },
  {
    theme_en: "Full Body",
    theme_hi: "पूरे शरीर का व्यायाम",
    exerciseIds: ["wall-pushups", "chair-squats", "quad-sets", "gentle-walk"],
  },
  {
    theme_en: "Flexibility & Balance",
    theme_hi: "लचीलापन और संतुलन",
    exerciseIds: ["seated-marching", "hip-side-raise", "ankle-pumps", "gentle-walk"],
  },
  {
    theme_en: "Leg Strength 2",
    theme_hi: "पैर की ताकत, भाग 2",
    exerciseIds: ["straight-leg-raise", "heel-raises", "chair-squats", "gentle-walk"],
  },
  {
    theme_en: "Mix Review",
    theme_hi: "मिश्रित अभ्यास",
    exerciseIds: ["quad-sets", "balance-hold", "wall-pushups", "gentle-walk"],
  },
];

export function todaysPlan(date = new Date()) {
  return weeklyPlan[date.getDay()];
}
