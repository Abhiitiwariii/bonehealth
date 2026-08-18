"use client";

// Switches the whole app between Hindi-only and English-only, by setting
// data-lang on <html>. globals.css hides whichever language isn't picked.
// Saved to localStorage so it's remembered on this device. Single tap
// icon-style button (shows the language you'll switch TO) rather than two
// separate labels, always visible in the top-right corner.

import { useEffect, useState } from "react";

const LANG_KEY = "arogya-lang";

export default function LanguageToggle() {
  const [lang, setLang] = useState("hi");

  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY) || "hi";
    setLang(saved);
    document.documentElement.setAttribute("data-lang", saved);
  }, []);

  function toggle() {
    const next = lang === "hi" ? "en" : "hi";
    setLang(next);
    localStorage.setItem(LANG_KEY, next);
    document.documentElement.setAttribute("data-lang", next);
  }

  return (
    <button
      onClick={toggle}
      aria-label={lang === "hi" ? "Switch to English" : "हिंदी में बदलें"}
      className="fixed top-3 right-3 z-30 w-11 h-11 rounded-full bg-white border-2 border-slate-200 shadow-sm flex items-center justify-center text-lg font-bold text-slate-800"
    >
      {lang === "hi" ? "अ" : "A"}
    </button>
  );
}
