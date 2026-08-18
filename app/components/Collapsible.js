"use client";

// Reusable expand/collapse card, the one accordion pattern used
// everywhere in the app instead of a mix of raw <details> tags and
// one-off toggle state. Two ways to use it:
//
// 1. Simple (most pages): pass icon/title/subtitle/badge props and it
//    renders a ready-made premium header for you.
//      <Collapsible icon="📖" title_en="..." title_hi="...">...</Collapsible>
//
// 2. Custom header (home page habit cards): pass `renderHeader` and
//    build whatever header you need; Collapsible still owns the
//    open/close state and the smooth-collapse animation.
//      <Collapsible renderHeader={({ open, toggle }) => (...)}>...</Collapsible>
//
// The collapse itself is pure CSS (grid-template-rows 0fr → 1fr, see
// .accordion-track in globals.css) so it animates smoothly with no
// height-measurement JS and no layout jank.

import { useId, useState } from "react";

export default function Collapsible({
  icon,
  title_en,
  title_hi,
  subtitle_en,
  subtitle_hi,
  badge,
  defaultOpen = false,
  open: controlledOpen,
  onToggle,
  renderHeader,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  children,
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const contentId = useId();

  function toggle() {
    const next = !open;
    if (!isControlled) setInternalOpen(next);
    onToggle?.(next);
  }

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-shadow ${
        open ? "shadow-cardLift" : ""
      } ${className}`}
    >
      {renderHeader ? (
        renderHeader({ open, toggle })
      ) : (
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls={contentId}
          className={`w-full flex items-center justify-between gap-3 p-4 text-left active:scale-[0.99] transition-transform ${headerClassName}`}
        >
          <div className="flex items-center gap-3 min-w-0">
            {icon && (
              <span className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-xl shrink-0">
                {icon}
              </span>
            )}
            <div className="min-w-0">
              <p className="text-lg font-semibold truncate">
                <span className="lang-en">{title_en}</span>
                <span className="lang-hi">{title_hi}</span>
              </p>
              {(subtitle_en || subtitle_hi) && (
                <p className="text-sm text-slate-500 truncate">
                  <span className="lang-en">{subtitle_en}</span>
                  <span className="lang-hi">{subtitle_hi}</span>
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {badge != null && (
              <span className="text-sm font-bold text-amber-700 bg-amber-50 rounded-full px-2.5 py-1">
                {badge}
              </span>
            )}
            <span
              className={`inline-flex w-7 h-7 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            >
              ▾
            </span>
          </div>
        </button>
      )}

      <div className={`accordion-track ${open ? "is-open" : ""}`}>
        <div className="accordion-inner" id={contentId}>
          <div className={`p-4 pt-0 ${bodyClassName}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
