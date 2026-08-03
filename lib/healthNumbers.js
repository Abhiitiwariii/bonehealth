// Health numbers the person types in themselves from their own yearly
// report, so the dashboard can reflect them without the app ever opening
// or reading the uploaded file. Reference ranges are standard, widely
// published ranges (NIH ODS, WHO, common lab reference intervals), not
// invented, but actual lab reference ranges vary slightly by lab, so the
// person's own report should always be the final word.

const KEY = "arogya-health-numbers";

export const emptyHealthNumbers = {
  vitaminD: "",
  calcium: "",
  bmdTScore: "",
  hemoglobin: "",
  testedOn: "",
};

export function loadHealthNumbers() {
  if (typeof window === "undefined") return { ...emptyHealthNumbers };
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
    return { ...emptyHealthNumbers, ...saved };
  } catch (e) {
    return { ...emptyHealthNumbers };
  }
}

export function saveHealthNumbers(values) {
  localStorage.setItem(KEY, JSON.stringify(values));
}

export function hasAnyHealthNumbers(values) {
  return Boolean(
    values.vitaminD || values.calcium || values.bmdTScore || values.hemoglobin
  );
}

// Vitamin D, ng/mL. NIH ODS: deficient below 12, adequate for most people
// from 20, possibly harmful above 50.
export function interpretVitaminD(value) {
  const v = Number(value);
  if (!value || Number.isNaN(v)) return null;
  if (v < 20) {
    return {
      level: "low",
      label_en: "Low",
      label_hi: "कम",
      note_en: "Below the range NIH considers adequate for bone health (20 ng/mL and above). Worth discussing food, sunlight, or a supplement with your doctor.",
      note_hi: "हड्डी स्वास्थ्य के लिए NIH द्वारा पर्याप्त माने जाने वाले स्तर (20 ng/mL या अधिक) से कम। भोजन, धूप, या सप्लीमेंट पर डॉक्टर से बात करें।",
    };
  }
  if (v <= 50) {
    return {
      level: "normal",
      label_en: "In typical range",
      label_hi: "सामान्य दायरे में",
      note_en: "Within the range NIH considers adequate for most people.",
      note_hi: "अधिकतर लोगों के लिए NIH द्वारा पर्याप्त माने जाने वाले दायरे में।",
    };
  }
  return {
    level: "high",
    label_en: "Above typical range",
    label_hi: "सामान्य दायरे से ऊपर",
    note_en: "Higher than the range generally considered necessary. Mention this to your doctor, especially if you're taking a supplement.",
    note_hi: "आमतौर पर ज़रूरी माने जाने वाले दायरे से अधिक। खासकर अगर सप्लीमेंट ले रहे हैं, तो डॉक्टर को बताएं।",
  };
}

// Serum calcium, mg/dL. Common lab reference range roughly 8.6 to 10.2,
// varies slightly by lab.
export function interpretCalcium(value) {
  const v = Number(value);
  if (!value || Number.isNaN(v)) return null;
  if (v < 8.6) {
    return {
      level: "low",
      label_en: "Below typical range",
      label_hi: "सामान्य दायरे से कम",
      note_en: "Below the commonly used reference range (about 8.6 to 10.2 mg/dL). Your lab's own reference range on the report is the most accurate guide.",
      note_hi: "आमतौर पर उपयोग होने वाले दायरे (लगभग 8.6 से 10.2 mg/dL) से कम। रिपोर्ट पर लैब की अपनी सीमा सबसे सटीक है।",
    };
  }
  if (v <= 10.2) {
    return {
      level: "normal",
      label_en: "In typical range",
      label_hi: "सामान्य दायरे में",
      note_en: "Within the commonly used reference range.",
      note_hi: "आमतौर पर उपयोग होने वाले दायरे में।",
    };
  }
  return {
    level: "high",
    label_en: "Above typical range",
    label_hi: "सामान्य दायरे से ऊपर",
    note_en: "Above the commonly used reference range. Worth mentioning to your doctor.",
    note_hi: "आमतौर पर उपयोग होने वाले दायरे से ऊपर। डॉक्टर को बताना उचित रहेगा।",
  };
}

// Bone density T-score. WHO: normal is -1.0 or higher, osteopenia is
// between -1.0 and -2.5, osteoporosis is below -2.5.
export function interpretBmd(value) {
  const v = Number(value);
  if (value === "" || Number.isNaN(v)) return null;
  if (v >= -1.0) {
    return {
      level: "normal",
      label_en: "Normal range (WHO)",
      label_hi: "सामान्य दायरा (WHO)",
      note_en: "A T-score of -1.0 or above is considered normal bone density by WHO criteria.",
      note_hi: "WHO मानदंड के अनुसार -1.0 या उससे अधिक का T-score सामान्य हड्डी घनत्व माना जाता है।",
    };
  }
  if (v >= -2.5) {
    return {
      level: "low",
      label_en: "Osteopenia range (WHO)",
      label_hi: "ऑस्टियोपीनिया दायरा (WHO)",
      note_en: "A T-score between -1.0 and -2.5 is classified as osteopenia (lower than normal bone density, not yet osteoporosis) by WHO criteria.",
      note_hi: "-1.0 से -2.5 के बीच का T-score ऑस्टियोपीनिया (सामान्य से कम घनत्व, अभी ऑस्टियोपोरोसिस नहीं) माना जाता है।",
    };
  }
  return {
    level: "high",
    label_en: "Osteoporosis range (WHO)",
    label_hi: "ऑस्टियोपोरोसिस दायरा (WHO)",
    note_en: "A T-score below -2.5 is classified as osteoporosis by WHO criteria. Worth discussing treatment options with your doctor.",
    note_hi: "-2.5 से कम का T-score WHO मानदंड के अनुसार ऑस्टियोपोरोसिस माना जाता है। उपचार विकल्पों पर डॉक्टर से बात करें।",
  };
}

// Hemoglobin, g/dL. Common reference: women 12-16, men 14-18.
export function interpretHemoglobin(value, gender) {
  const v = Number(value);
  if (!value || Number.isNaN(v)) return null;
  const isMale = gender === "male";
  const low = isMale ? 14 : 12;
  const high = isMale ? 18 : 16;
  if (v < low) {
    return {
      level: "low",
      label_en: "Below typical range",
      label_hi: "सामान्य दायरे से कम",
      note_en: `Below the commonly used reference range (about ${low} to ${high} g/dL). Low hemoglobin can add to fatigue, so it's worth mentioning to your doctor.`,
      note_hi: `आमतौर पर उपयोग होने वाले दायरे (लगभग ${low} से ${high} g/dL) से कम। कम हीमोग्लोबिन थकान बढ़ा सकता है, डॉक्टर को बताएं।`,
    };
  }
  if (v <= high) {
    return {
      level: "normal",
      label_en: "In typical range",
      label_hi: "सामान्य दायरे में",
      note_en: "Within the commonly used reference range.",
      note_hi: "आमतौर पर उपयोग होने वाले दायरे में।",
    };
  }
  return {
    level: "high",
    label_en: "Above typical range",
    label_hi: "सामान्य दायरे से ऊपर",
    note_en: "Above the commonly used reference range. Worth mentioning to your doctor.",
    note_hi: "आमतौर पर उपयोग होने वाले दायरे से ऊपर। डॉक्टर को बताना उचित रहेगा।",
  };
}
