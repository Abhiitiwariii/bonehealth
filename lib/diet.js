// General vegetarian Indian bone-health food guidance. Calcium needs vitamin D
// to be absorbed, and protein, magnesium, and vitamin K also matter for bone
// strength, not just dairy. General wellness info, not a prescribed diet.

// Simple Hindi explanation of the basics, for someone with no nutrition
// background, written the way a doctor might explain it in conversation.
export const nutritionBasicsHi = {
  title: "आहार को आसान भाषा में समझें",
  paragraphs: [
    "हड्डी एक ज़िंदा हिस्सा है, चट्टान जैसी नहीं। यह लगातार खुद को बनाती और सुधारती रहती है। इसके लिए शरीर को चार चीज़ें चाहिए: कैल्शियम (हड्डी की ईंट), विटामिन डी (कैल्शियम को खून से हड्डी तक पहुंचाने वाला), प्रोटीन (हड्डी और मांसपेशी की मरम्मत), और मैग्नीशियम व विटामिन के (हड्डी की संरचना मज़बूत बनाने वाले)।",
    "सिर्फ दूध पीने से काम नहीं चलता। अगर शरीर में विटामिन डी कम है, तो कैल्शियम ठीक से सोखा ही नहीं जाता। इसीलिए धूप, सही भोजन और डॉक्टर की सलाह, तीनों साथ में ज़रूरी हैं।",
    "रोज़ाना थोड़ा-थोड़ा हर समूह से खाना, दाल-दही से लेकर हरी सब्ज़ी तक, पूरे दिन में एक बार भारी भोजन से बेहतर है।",
  ],
};

export const vratFriendlyFoods = {
  title_en: "Fasting-day (vrat) friendly foods",
  title_hi: "व्रत के दिनों के लिए उपयुक्त भोजन",
  note_en:
    "If you keep fasts (Ekadashi, Navratri, etc.), bone-friendly nutrition doesn't have to stop. Several vrat foods are naturally rich in calcium and protein.",
  note_hi:
    "यदि आप व्रत रखते हैं (एकादशी, नवरात्रि आदि), तो हड्डी के लिए ज़रूरी पोषण रुकना नहीं चाहिए। कई व्रत के भोजन स्वाभाविक रूप से कैल्शियम और प्रोटीन से भरपूर होते हैं।",
  foods: [
    { en: "Makhana (fox nuts), roasted, a good calcium source", hi: "मखाना, भुना हुआ, कैल्शियम का अच्छा स्रोत" },
    { en: "Singhare ka atta (water chestnut flour) dishes", hi: "सिंघाड़े के आटे के व्यंजन" },
    { en: "Kuttu ka atta (buckwheat flour) roti or puri", hi: "कुट्टू के आटे की रोटी या पूरी" },
    { en: "Curd (dahi) and milk-based sweets", hi: "दही और दूध से बनी मिठाइयां" },
    { en: "Peanuts and til (sesame) chikki", hi: "मूंगफली और तिल की चिक्की" },
    { en: "Sabudana (tapioca pearls) with peanuts", hi: "मूंगफली के साथ साबूदाना" },
  ],
};

export const nutrientGroups = [
  {
    title_en: "Calcium-rich",
    title_hi: "कैल्शियम युक्त",
    why_en: "The main mineral that keeps bones strong and dense.",
    why_hi: "हड्डियों को मज़बूत और घना रखने वाला मुख्य खनिज।",
    foods: [
      { en: "Milk, curd (dahi), paneer", hi: "दूध, दही, पनीर" },
      { en: "Ragi (finger millet), porridge, dosa, or roti", hi: "रागी, दलिया, डोसा या रोटी" },
      { en: "Sesame seeds (til), as chikki or in sabzi", hi: "तिल, चिक्की या सब्ज़ी में" },
      { en: "Makhana (fox nuts), roasted as a snack", hi: "मखाना, भुना हुआ नाश्ते में" },
      { en: "Methi (fenugreek) and other leafy greens", hi: "मेथी और अन्य हरी पत्तेदार सब्ज़ियां" },
      { en: "Soybean and soy products (tofu)", hi: "सोयाबीन और टोफू" },
    ],
  },
  {
    title_en: "Vitamin D (helps absorb calcium)",
    title_hi: "विटामिन डी (कैल्शियम सोखने में मदद)",
    why_en: "Without enough vitamin D, calcium from food is not absorbed well.",
    why_hi: "पर्याप्त विटामिन डी के बिना भोजन का कैल्शियम ठीक से नहीं सोखता।",
    foods: [
      { en: "10 to 15 minutes of gentle morning sunlight (arms/legs exposed). Ask your doctor about safe timing", hi: "सुबह 10-15 मिनट हल्की धूप (हाथ-पैर खुले)। डॉक्टर से सही समय पूछें" },
      { en: "Fortified milk, if available", hi: "फोर्टिफाइड (विटामिन डी युक्त) दूध, यदि उपलब्ध हो" },
      { en: "Mushrooms exposed to sunlight", hi: "धूप में रखे मशरूम" },
      { en: "A doctor may also suggest a vitamin D supplement. Ask at your next visit", hi: "डॉक्टर विटामिन डी सप्लीमेंट भी सुझा सकते हैं। अगली मुलाकात में पूछें" },
    ],
  },
  {
    title_en: "Protein (for bone and muscle repair)",
    title_hi: "प्रोटीन (हड्डी और मांसपेशी की मरम्मत के लिए)",
    why_en: "Bones are partly made of protein, and strong muscles protect joints.",
    why_hi: "हड्डियां आंशिक रूप से प्रोटीन से बनी होती हैं, मज़बूत मांसपेशियां जोड़ों की रक्षा करती हैं।",
    foods: [
      { en: "Dals: moong, masoor, chana, toor", hi: "दालें: मूंग, मसूर, चना, तूर" },
      { en: "Chickpeas (chana) and rajma", hi: "चना और राजमा" },
      { en: "Paneer and curd", hi: "पनीर और दही" },
      { en: "Soybean chunks (soya chunks)", hi: "सोया चंक्स" },
      { en: "Nuts: almonds, walnuts (a small daily handful)", hi: "मेवे: बादाम, अखरोट (रोज़ थोड़ी मुट्ठी भर)" },
    ],
  },
  {
    title_en: "Magnesium & Vitamin K (bone structure)",
    title_hi: "मैग्नीशियम और विटामिन के (हड्डी की संरचना)",
    why_en: "Support the mineral structure of bone alongside calcium.",
    why_hi: "कैल्शियम के साथ हड्डी की संरचना को सहारा देते हैं।",
    foods: [
      { en: "Spinach (palak) and other dark leafy greens", hi: "पालक और अन्य गहरे हरे पत्ते" },
      { en: "Drumstick leaves (moringa/sahjan)", hi: "सहजन (मोरिंगा) के पत्ते" },
      { en: "Broccoli and cabbage", hi: "ब्रोकली और पत्तागोभी" },
      { en: "Whole grains and pulses", hi: "साबुत अनाज और दालें" },
    ],
  },
];

export const sampleDay = [
  {
    meal_en: "Morning",
    meal_hi: "सुबह",
    idea_en: "A glass of milk or curd, a handful of soaked almonds.",
    idea_hi: "एक गिलास दूध या दही, भीगे हुए बादाम की एक मुट्ठी।",
  },
  {
    meal_en: "Breakfast",
    meal_hi: "नाश्ता",
    idea_en: "Ragi porridge or ragi dosa, with a side of curd.",
    idea_hi: "रागी दलिया या रागी डोसा, साथ में दही।",
  },
  {
    meal_en: "Lunch",
    meal_hi: "दोपहर का भोजन",
    idea_en: "Roti/rice, dal, a methi or spinach sabzi, and a small bowl of curd.",
    idea_hi: "रोटी/चावल, दाल, मेथी या पालक की सब्ज़ी, और थोड़ी दही।",
  },
  {
    meal_en: "Evening",
    meal_hi: "शाम",
    idea_en: "Til (sesame) chikki or roasted chana as a snack.",
    idea_hi: "तिल की चिक्की या भुना हुआ चना नाश्ते में।",
  },
  {
    meal_en: "Dinner",
    meal_hi: "रात का खाना",
    idea_en: "Paneer or soya sabzi with roti, and a leafy green vegetable.",
    idea_hi: "पनीर या सोया सब्ज़ी रोटी के साथ, और एक हरी पत्तेदार सब्ज़ी।",
  },
];
