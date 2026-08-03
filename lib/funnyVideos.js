// Real, verified, embeddable videos from official YouTube channels
// (The Pet Collective, America's Funniest Home Videos). Clean, wholesome,
// family-friendly content only. One video is picked per day so it changes
// every day instead of showing the same clip. Index matches
// Date.getDay(): 0 = Sunday, 6 = Saturday.

export const funnyVideos = [
  {
    id: "p_oqFHJ1Ils",
    title_en: "Best Pets Ever, Cute and Funny Videos Compilation",
    title_hi: "सबसे प्यारे पालतू जानवर, मज़ेदार वीडियो",
    source: "The Pet Collective",
  },
  {
    id: "7CUBAbPiEuk",
    title_en: "Pup-tacular Fails, Funny Animals Compilation",
    title_hi: "मज़ेदार जानवरों के वीडियो",
    source: "America's Funniest Home Videos",
  },
  {
    id: "zs1wLZ_LRLc",
    title_en: "Zoomies, the Fastest Pet Compilation of the Year",
    title_hi: "सबसे तेज़ पालतू जानवरों की मस्ती",
    source: "The Pet Collective",
  },
  {
    id: "OQGeoTfR158",
    title_en: "Try Not to Laugh, Kids and Babies Funny Moments",
    title_hi: "बच्चों के मज़ेदार पल",
    source: "America's Funniest Home Videos",
  },
  {
    id: "9lVB1-c69Sw",
    title_en: "The Funniest Pet Videos of the Year",
    title_hi: "साल के सबसे मज़ेदार पालतू जानवरों के वीडियो",
    source: "The Pet Collective",
  },
  {
    id: "Gr-C7tnHOGY",
    title_en: "One Fail After Another, Ultimate Fails Compilation",
    title_hi: "मज़ेदार चूकों का संग्रह",
    source: "America's Funniest Home Videos",
  },
  {
    id: "5D8TBicNIb8",
    title_en: "Funniest Pets, Best Compilation",
    title_hi: "सबसे मज़ेदार पालतू जानवर",
    source: "The Pet Collective",
  },
];

export function todaysFunnyVideo(date = new Date()) {
  return funnyVideos[date.getDay()];
}
