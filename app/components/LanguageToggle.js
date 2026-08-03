"use client";

// Switches the whole app between Hindi-only and English-only, by setting
// data-lang on <html>. globals.css hides whichever language isn't picked.
// Saved to localStorage so it's remembered on this device.

import { useEffect, useState } from "react";

const LANG_KEY = "arogya-lang";

export default function LanguageToggle() {
  const [lang, setLang] = useState("hi");

  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY) || "hi";
    setLang(saved);
    document.documentElement.setAttribute("data-lang", saved);
  }, []);

  function choose(value) {
    setLang(value);
    localStorage.setItem(LANG_KEY, value);
    document.documentElement.setAttribute("data-lang", value);
  }

  return (
    <div className="inline-flex rounded-full bg-white/15 p-1 text-sm font-semibold">
      <button
        onClick={() => choose("hi")}
        className={`px-3 py-1 rounded-full ${lang === "hi" ? "bg-white text-clay" : "text-white"}`}
      >
        हिं
      </button>
      <button
        onClick={() => choose("en")}
        className={`px-3 py-1 rounded-full ${lang === "en" ? "bg-white text-clay" : "text-white"}`}
      >
        EN
      </button>
    </div>
  );
}
