import Link from "next/link";

export const metadata = {
  title: "Records | रिकॉर्ड",
};

const cards = [
  {
    href: "/log",
    emoji: "📊",
    title_en: "My Progress",
    title_hi: "मेरी प्रगति",
    desc_en: "Log today's pain level, walking, and notes.",
    desc_hi: "आज का दर्द स्तर, चलना, और नोट्स दर्ज करें।",
  },
  {
    href: "/diet",
    emoji: "🍎",
    title_en: "Diet Guide",
    title_hi: "आहार मार्गदर्शिका",
    desc_en: "Vegetarian bone-health foods and a sample day.",
    desc_hi: "शाकाहारी हड्डी-स्वास्थ्य भोजन और एक दिन का उदाहरण।",
  },
];

export default function RecordsPage() {
  return (
    <div>
      <p className="text-lg font-semibold mb-4">
        <span className="lang-en">Your Records</span>
        <span className="lang-hi">आपके रिकॉर्ड</span>
      </p>
      <div className="space-y-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="flex items-center gap-4 bg-white border border-black/10 rounded-xl p-4 shadow-sm"
          >
            <span className="text-4xl">{c.emoji}</span>
            <div>
              <p className="text-lg font-semibold">
                <span className="lang-en">{c.title_en}</span>
                <span className="lang-hi">{c.title_hi}</span>
              </p>
              <p className="text-sm text-ink/60 mt-0.5">
                <span className="lang-en">{c.desc_en}</span>
                <span className="lang-hi">{c.desc_hi}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
