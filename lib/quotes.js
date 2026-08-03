// A rotating "quote of the day" drawn from well-known Bhagavad Gita verses
// and Krishna bhakti teachings, for daily encouragement, not medical advice.
// Verses are among the most widely quoted in Gita study and kirtan discourse.

export const quotes = [
  {
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
    hindi:
      "तुम्हारा अधिकार केवल कर्म करने में है, फल में कभी नहीं। अपना काम शांति से करते रहो, परिणाम की चिंता छोड़ दो।",
    english:
      "You have the right to your actions, never to the results. Do your part calmly, and let go of worry about the outcome.",
    source: "Bhagavad Gita 2.47",
  },
  {
    sanskrit:
      "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः। आगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥",
    hindi:
      "सुख-दुख, सर्दी-गर्मी की तरह आते-जाते रहते हैं, ये स्थायी नहीं हैं। धैर्य के साथ इन्हें सहन करो, यह समय भी बीत जाएगा।",
    english:
      "Pleasure and pain come and go, like the seasons. They are not permanent. Bear them patiently; this too shall pass.",
    source: "Bhagavad Gita 2.14",
  },
  {
    sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।",
    hindi:
      "अपने आप को अपने ही प्रयासों से ऊपर उठाओ, स्वयं को कभी निराश मत होने दो। तुम्हारे भीतर ही शक्ति है।",
    english:
      "Lift yourself up by your own efforts; never let yourself feel low. The strength you need is already within you.",
    source: "Bhagavad Gita 6.5",
  },
  {
    sanskrit: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।",
    hindi:
      "मन को स्थिर रखते हुए, बिना किसी आसक्ति के अपना काम करते रहो। यही सच्चा संतुलन है।",
    english:
      "Keep your mind steady, and do your work without attachment to the result. This balance itself is the true practice.",
    source: "Bhagavad Gita 2.48",
  },
  {
    sanskrit: "श्री कृष्ण गोविन्द हरे मुरारे, हे नाथ नारायण वासुदेव।",
    hindi:
      "श्री कृष्ण का नाम लेते रहो, यह मन को शांति और सहारा देता है, हर कठिन समय में।",
    english:
      "Keep taking the name of Shri Krishna. It brings peace and quiet strength to the mind, in every difficult moment.",
    source: "Traditional Krishna Stotra",
  },
  {
    sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज। अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",
    hindi:
      "सब चिंताएं छोड़कर मुझ पर भरोसा रखो। मैं तुम्हें हर कठिनाई से मुक्त करूंगा, शोक मत करो।",
    english:
      "Set aside all your worries and place your trust in me. I will free you from every difficulty. Do not grieve.",
    source: "Bhagavad Gita 18.66",
  },
  {
    sanskrit: "दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः।",
    hindi:
      "जिसका मन दुख में विचलित नहीं होता और सुख में लालायित नहीं होता, वही सच में स्थिर और शांत है।",
    english:
      "One whose mind stays calm in hardship and does not chase after pleasure has found real steadiness and peace.",
    source: "Bhagavad Gita 2.56",
  },
  {
    sanskrit: "न हि कल्याणकृत्कश्चिद् दुर्गतिं तात गच्छति।",
    hindi:
      "जो अच्छे कर्म करता है, उसका कभी बुरा नहीं होता। धैर्य रखो, आगे भलाई ही होगी।",
    english:
      "One who does good is never truly lost. Stay patient. Good things follow good living.",
    source: "Bhagavad Gita 6.40",
  },
  {
    sanskrit: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते। तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥",
    hindi:
      "जो मुझे निरंतर याद रखते हैं और भरोसा करते हैं, उनकी हर ज़रूरत का ध्यान मैं स्वयं रखता हूं।",
    english:
      "For those who remember me constantly and trust in me, I personally look after what they need.",
    source: "Bhagavad Gita 9.22",
  },
  {
    sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।",
    hindi:
      "जब भी कठिन समय आता है, सहायता और संतुलन फिर लौट आता है। यही जीवन का नियम है।",
    english:
      "Whenever times grow hard, support and balance return again. This is the quiet rhythm of life.",
    source: "Bhagavad Gita 4.7",
  },
];

// Deterministic "quote of the day": same quote all day, changes daily.
export function quoteOfTheDay() {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const now = new Date();
  const dayOfYear = Math.floor((now - start) / 86400000);
  return quotes[dayOfYear % quotes.length];
}
