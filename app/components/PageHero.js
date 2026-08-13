// Colorful gradient intro banner used at the top of every section page, so
// the app doesn't read as a stack of identical plain white boxes. Each
// section gets its own color pairing (see the `from`/`to` props passed in)
// to help orient a person at a glance about which part of the app they're
// in. `data-hero` lets globals.css flatten this to one solid, accessible
// color when a person turns on High Contrast mode.

export default function PageHero({
  emoji,
  title_en,
  title_hi,
  subtitle_en,
  subtitle_hi,
  from,
  to,
  children,
}) {
  return (
    <div
      data-hero
      className={`animate-fade-in relative overflow-hidden bg-gradient-to-br ${from} ${to} rounded-3xl p-6 text-white shadow-lg shadow-black/10 mb-6`}
    >
      <span className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10" />
      <span className="absolute -left-8 -bottom-10 w-28 h-28 rounded-full bg-white/5" />
      <div className="relative">
        <p className="text-5xl mb-2 drop-shadow-sm">{emoji}</p>
        <p className="text-xl font-display font-bold">
          <span className="lang-en">{title_en}</span>
          <span className="lang-hi">{title_hi}</span>
        </p>
        {(subtitle_en || subtitle_hi) && (
          <p className="text-sm text-white/85 mt-2 leading-relaxed">
            <span className="lang-en">{subtitle_en}</span>
            <span className="lang-hi">{subtitle_hi}</span>
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
