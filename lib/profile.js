// Basic profile numbers used for a BMI reference and a knee-load note.
// Not diagnostic, just context to make the app feel personal.

export const profile = {
  heightFeetInches: `4'11"`,
  heightCm: 150,
  weightMinKg: 60,
  weightMaxKg: 65,
};

export function bmiRange() {
  const h = profile.heightCm / 100;
  const min = +(profile.weightMinKg / (h * h)).toFixed(1);
  const max = +(profile.weightMaxKg / (h * h)).toFixed(1);
  return { min, max };
}

export function bmiCategory(bmi) {
  if (bmi < 18.5) return { en: "Underweight", hi: "कम वज़न" };
  if (bmi < 25) return { en: "Normal range", hi: "सामान्य सीमा" };
  if (bmi < 30) return { en: "Overweight", hi: "अधिक वज़न" };
  return { en: "Obese range", hi: "मोटापे की सीमा" };
}
