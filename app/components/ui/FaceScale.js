"use client";

// A tappable row of five mood faces (best → hardest). One tap sets the value
// 1–5; the chosen face fills amber, the rest stay calm slate. Big targets, no
// slider to drag. A bilingual caption names the current choice so the meaning
// is never just an emoji. This is a general "how are you feeling" mood — it is
// deliberately separate from the clinical joint-pain check-in on /log.

const FACES = [
  { value: 5, emoji: "😄", en: "Great", hi: "बहुत अच्छा" },
  { value: 4, emoji: "🙂", en: "Good", hi: "अच्छा" },
  { value: 3, emoji: "😐", en: "Okay", hi: "ठीक" },
  { value: 2, emoji: "😕", en: "Not great", hi: "ठीक नहीं" },
  { value: 1, emoji: "😣", en: "Poorly", hi: "खराब" },
];

export default function FaceScale({ value, onChange }) {
  const selected = FACES.find((f) => f.value === value);

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        {FACES.map((f) => {
          const active = f.value === value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => onChange(f.value)}
              aria-pressed={active}
              aria-label={f.en}
              className={`flex-1 aspect-square max-w-[64px] rounded-2xl border-2 flex items-center justify-center text-3xl transition-all active:scale-90 ${
                active
                  ? "bg-amber-500 border-amber-500 shadow-sm scale-105"
                  : "bg-white border-slate-200"
              }`}
            >
              <span className={active ? "" : "grayscale opacity-70"}>
                {f.emoji}
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-center text-base font-semibold text-slate-600 mt-3 h-6">
        {selected && (
          <>
            <span className="lang-en">{selected.en}</span>
            <span className="lang-hi">{selected.hi}</span>
          </>
        )}
      </p>
    </div>
  );
}
