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
    from: "from-indigo-400",
    to: "to-violet-600",
  },
  {
    href: "/diet",
    emoji: "🍎",
    title_en: "Diet Guide",
    title_hi: "आहार मार्गदर्शिका",
    desc_en: "Vegetarian bone-health foods and a sample day.",
    desc_hi: "शाकाहारी हड्डी-स्वास्थ्य भोजन और एक दिन का उदाहरण।",
    from: "from-emerald-400",
    to: "to-green-600",
  },
];

export default function RecordsPage() {
  return (
    <div>
      <p className="text-lg font-display font-bold mb-4 text-slate-800">
        <span className="lang-en">Your Records</span>
        <span className="lang-hi">आपके रिकॉर्ड</span>
      </p>
      <div className="space-y-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-transform"
          >
            <span className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl shrink-0">{c.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-semibold text-slate-800">
                <span className="lang-en">{c.title_en}</span>
                <span className="lang-hi">{c.title_hi}</span>
              </p>
              <p className="text-sm text-slate-500 mt-0.5">
                <span className="lang-en">{c.desc_en}</span>
                <span className="lang-hi">{c.desc_hi}</span>
              </p>
            </div>
            <span className="text-2xl text-slate-300">›</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
