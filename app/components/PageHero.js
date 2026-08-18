// Clean section header used at the top of every page. Was a colorful
// gradient banner; now a calm white card with an amber emoji chip and slate
// text, matching the modern single-accent system. `data-hero` is kept so
// globals.css can still flatten it in High Contrast mode. The `from`/`to`
// props are accepted but no longer used (kept so callers don't need editing).

export default function PageHero({
  emoji,
  title_en,
  title_hi,
  subtitle_en,
  subtitle_hi,
  from, // eslint-disable-line no-unused-vars
  to, // eslint-disable-line no-unused-vars
  children,
}) {
  return (
    <div
      data-hero
      className="animate-fade-in bg-white border border-slate-200 rounded-3xl p-6 shadow-sm mb-6"
    >
      <div className="flex items-center gap-4">
        <span className="shrink-0 w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-3xl">
          {emoji}
        </span>
        <div className="min-w-0">
          <p className="text-xl font-display font-bold text-slate-800">
            <span className="lang-en">{title_en}</span>
            <span className="lang-hi">{title_hi}</span>
          </p>
          {(subtitle_en || subtitle_hi) && (
            <p className="text-sm text-slate-500 mt-1 leading-relaxed">
              <span className="lang-en">{subtitle_en}</span>
              <span className="lang-hi">{subtitle_hi}</span>
            </p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
