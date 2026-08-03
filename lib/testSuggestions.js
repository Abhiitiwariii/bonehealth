// General, educational suggestions for tests worth discussing with a
// doctor, not a diagnosis or an order to get any test. Sourced from
// USPSTF and Mayo Clinic patient-education guidance, not invented.
// USPSTF (2025): DEXA/bone density screening is a "B" recommendation for
// women 65+, and for women under 65 who are postmenopausal with risk
// factors. Evidence for men is currently insufficient (an "I" statement),
// which is not the same as a recommendation against it, so it's listed
// here as "ask your doctor" rather than "recommended."

export const testCategories = [
  {
    id: "bone-density",
    title_en: "Bone Density Test (DEXA / DXA scan)",
    title_hi: "बोन डेंसिटी टेस्ट (डेक्सा स्कैन)",
    who_en:
      "Recommended for women 65 and older. Also recommended for women under 65 who are past menopause and have risk factors (family history of fracture, low body weight, steroid medicine use, early menopause). For men, evidence is limited, so it's worth asking a doctor rather than assuming it's needed or not needed.",
    who_hi:
      "65 वर्ष और उससे अधिक उम्र की महिलाओं के लिए अनुशंसित। रजोनिवृत्ति के बाद की कम उम्र की महिलाओं के लिए भी, अगर जोखिम कारक हों (फ्रैक्चर का पारिवारिक इतिहास, कम वज़न, स्टेरॉयड दवा, जल्दी रजोनिवृत्ति)। पुरुषों के लिए प्रमाण सीमित हैं, इसलिए डॉक्टर से पूछना बेहतर है।",
    why_en:
      "A painless scan that measures how strong or thin your bones are, and is the standard way osteoporosis is actually confirmed (not just assumed from symptoms).",
    why_hi:
      "एक दर्दरहित स्कैन जो बताता है कि आपकी हड्डियां कितनी मज़बूत या कमज़ोर हैं, और ऑस्टियोपोरोसिस की पुष्टि करने का मानक तरीका है।",
    videoSearch: "DEXA bone density scan explained doctor",
    source: "USPSTF osteoporosis screening recommendation, 2025",
  },
  {
    id: "vitamin-blood-test",
    title_en: "Vitamin D and Calcium blood test",
    title_hi: "विटामिन डी और कैल्शियम ब्लड टेस्ट",
    who_en:
      "Worth asking about if you already have an osteoporosis diagnosis, or have symptoms like bone pain, muscle weakness, or very little sun exposure. Not usually needed as a routine test for everyone.",
    who_hi:
      "अगर पहले से ऑस्टियोपोरोसिस का निदान है, या हड्डी में दर्द, मांसपेशी कमज़ोरी, या बहुत कम धूप मिलती है, तो पूछना उचित है। हर किसी के लिए नियमित जांच ज़रूरी नहीं।",
    why_en:
      "Shows whether low vitamin D or calcium could be part of what's making bones weaker, which changes what a doctor might recommend for diet or supplements.",
    why_hi:
      "बताता है कि क्या कम विटामिन डी या कैल्शियम हड्डी कमज़ोर होने की वजह का हिस्सा है, जिससे डॉक्टर आहार या सप्लीमेंट पर सही सलाह दे सकते हैं।",
    videoSearch: "vitamin D calcium blood test explained",
    source: "Mayo Clinic patient education",
  },
  {
    id: "knee-xray",
    title_en: "Knee X-ray",
    title_hi: "घुटने का एक्स-रे",
    who_en:
      "Worth asking about if you have ongoing knee pain, stiffness, swelling, or a change in how you walk, so a doctor can see how much joint space or cartilage has changed.",
    who_hi:
      "अगर घुटने में लगातार दर्द, अकड़न, सूजन, या चलने के तरीके में बदलाव है, तो पूछना उचित है, ताकि डॉक्टर जोड़ की स्थिति देख सकें।",
    why_en:
      "Shows how much cartilage has worn down and whether bone is rubbing on bone, which is what guides decisions between physiotherapy, injections, or surgery.",
    why_hi:
      "बताता है कि कार्टिलेज कितना घिस गया है और क्या हड्डी आपस में रगड़ रही है, जिससे फिजियोथेरेपी, इंजेक्शन, या सर्जरी के बीच फैसला लेने में मदद मिलती है।",
    videoId: "zKxKet6zmww",
    videoSource: "Mayo Clinic Radio",
    source: "Mayo Clinic patient education",
  },
];

// A light, non-diagnostic nudge based only on age: which category to show
// first. Nothing is hidden, since risk factors vary; this just reorders.
export function orderedTestSuggestions(profile) {
  const age = Number(profile?.age) || 0;
  if (age >= 65) {
    return testCategories;
  }
  if (age >= 45) {
    return [
      testCategories.find((t) => t.id === "knee-xray"),
      testCategories.find((t) => t.id === "bone-density"),
      testCategories.find((t) => t.id === "vitamin-blood-test"),
    ];
  }
  return [
    testCategories.find((t) => t.id === "knee-xray"),
    testCategories.find((t) => t.id === "vitamin-blood-test"),
    testCategories.find((t) => t.id === "bone-density"),
  ];
}
