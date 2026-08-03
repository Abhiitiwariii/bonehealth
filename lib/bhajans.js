// A short, well-known list of Hindi devotional kirtans/bhajans, grouped by
// mood. Search links go to YouTube search results (not a single fixed video)
// so you can pick your favorite version/singer each time.

function ytSearch(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(
    query
  )}`;
}

export const bhajanGroups = [
  {
    mood_en: "Morning Peace",
    mood_hi: "सुबह की शांति",
    songs: [
      {
        title_hi: "ॐ जय जगदीश हरे",
        title_en: "Om Jai Jagdish Hare (Aarti)",
        note_en: "A classic aarti sung in most Indian homes, gentle and familiar.",
        note_hi: "अधिकतर भारतीय घरों में गाई जाने वाली आरती, शांत और परिचित।",
        search: ytSearch("Om Jai Jagdish Hare aarti"),
      },
      {
        title_hi: "अच्युतम् केशवम् कृष्ण दामोदरम्",
        title_en: "Achyutam Keshavam Krishna Damodaram",
        note_en: "A soft, meditative morning bhajan naming Krishna's many forms.",
        note_hi: "श्री कृष्ण के नामों का सौम्य, ध्यानपूर्ण सुबह का भजन।",
        search: ytSearch("Achyutam Keshavam Krishna Damodaram bhajan"),
      },
    ],
  },
  {
    mood_en: "Joy & Positivity",
    mood_hi: "आनंद और सकारात्मकता",
    songs: [
      {
        title_hi: "श्री कृष्ण गोविन्द हरे मुरारी",
        title_en: "Shri Krishna Govind Hare Murari",
        note_en: "An uplifting, widely loved Krishna kirtan, easy to hum along to.",
        note_hi: "एक उत्साहजनक, बहुत प्रिय कृष्ण कीर्तन, गुनगुनाने में आसान।",
        search: ytSearch("Shri Krishna Govind Hare Murari bhajan"),
      },
      {
        title_hi: "गोविंद बोलो हरि गोपाल बोलो",
        title_en: "Govind Bolo Hari Gopal Bolo",
        note_en: "A cheerful call-and-response kirtan, popular at satsangs.",
        note_hi: "एक आनंदमय कीर्तन, सत्संगों में बहुत लोकप्रिय।",
        search: ytSearch("Govind Bolo Hari Gopal Bolo kirtan"),
      },
      {
        title_hi: "हरे कृष्ण महामंत्र",
        title_en: "Hare Krishna Maha-Mantra",
        note_en: "The simple, repeated chant, calming when hummed slowly.",
        note_hi: "सरल, बार-बार दोहराया जाने वाला मंत्र, धीरे गाने पर बहुत शांत करता है।",
        search: ytSearch("Hare Krishna Hare Rama Maha Mantra kirtan"),
      },
    ],
  },
  {
    mood_en: "Strength Through Devotion",
    mood_hi: "भक्ति से शक्ति",
    songs: [
      {
        title_hi: "पग घुंघरू बांध मीरा नाची",
        title_en: "Pag Ghungroo Baandh (Meera Bhajan)",
        note_en: "Meera's devotion sung through hardship. A reminder that faith carries us through difficult days.",
        note_hi: "मीरा की भक्ति, कठिन समय में भी। यह याद दिलाता है कि श्रद्धा हर कठिनाई में साथ देती है।",
        search: ytSearch("Meera bhajan Pag Ghungroo Baandh"),
      },
      {
        title_hi: "मधुराष्टकम् (अधरं मधुरं)",
        title_en: "Madhurashtakam (Adharam Madhuram)",
        note_en: "A gentle, melodic hymn describing Krishna's sweetness, soothing to listen to while resting.",
        note_hi: "श्री कृष्ण की मधुरता का वर्णन करने वाला सौम्य भजन, आराम करते समय सुनने में शांतिदायक।",
        search: ytSearch("Madhurashtakam Adharam Madhuram bhajan"),
      },
    ],
  },
  {
    mood_en: "Evening Calm",
    mood_hi: "शाम की शांति",
    songs: [
      {
        title_hi: "दामोदराष्टकम्",
        title_en: "Damodarashtakam",
        note_en: "A quiet evening prayer, traditionally sung at dusk.",
        note_hi: "एक शांत सांध्य प्रार्थना, पारंपरिक रूप से शाम को गाई जाती है।",
        search: ytSearch("Damodarashtakam bhajan evening"),
      },
      {
        title_hi: "जय राधा माधव",
        title_en: "Jai Radha Madhav",
        note_en: "A soft, slow kirtan, good for winding down before rest.",
        note_hi: "एक धीमा, कोमल कीर्तन, आराम करने से पहले सुनने के लिए अच्छा।",
        search: ytSearch("Jai Radha Madhav kirtan"),
      },
    ],
  },
];
