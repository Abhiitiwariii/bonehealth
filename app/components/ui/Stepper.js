"use client";

// A big, keyboard-free number control: a large minus button, the current
// value, and a large plus button. Built for low-tech-literacy elderly users —
// no typing, no scroll-wheel precision, big touch targets, and a clear unit.
// Pressing past min/max simply clamps. Values stay whole (rounded to `step`).

const ACCENT_BTN =
  "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold " +
  "shrink-0 transition-transform active:scale-90 select-none";

export default function Stepper({
  value,
  onChange,
  min = 0,
  max = 999,
  step = 1,
  unit = "",
  label_en = "",
  label_hi = "",
}) {
  function clamp(v) {
    return Math.min(max, Math.max(min, v));
  }

  function dec() {
    onChange(clamp(value - step));
  }
  function inc() {
    onChange(clamp(value + step));
  }

  const atMin = value <= min;
  const atMax = value >= max;

  return (
    <div>
      {(label_en || label_hi) && (
        <p className="text-base font-semibold text-slate-700 mb-2 text-center">
          <span className="lang-en">{label_en}</span>
          <span className="lang-hi">{label_hi}</span>
        </p>
      )}
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={dec}
          disabled={atMin}
          aria-label={`Decrease ${label_en || "value"}`}
          className={`${ACCENT_BTN} ${
            atMin
              ? "bg-slate-100 text-slate-300"
              : "bg-amber-500 text-white shadow-sm"
          }`}
        >
          −
        </button>

        <div className="min-w-[7rem] text-center" aria-live="polite">
          <span className="text-5xl font-extrabold text-slate-800 leading-none tabular-nums">
            {value}
          </span>
          {unit && (
            <span className="block text-sm font-semibold text-slate-400 mt-1 uppercase tracking-wide">
              {unit}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={inc}
          disabled={atMax}
          aria-label={`Increase ${label_en || "value"}`}
          className={`${ACCENT_BTN} ${
            atMax
              ? "bg-slate-100 text-slate-300"
              : "bg-amber-500 text-white shadow-sm"
          }`}
        >
          +
        </button>
      </div>
    </div>
  );
}
