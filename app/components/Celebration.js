"use client";

// A short, joyful confetti + toast moment for finishing today's full
// routine — the "reward" beat that CRED-style apps lean on to make a
// habit feel worth repeating tomorrow. Pure CSS animation (no canvas),
// auto-dismisses itself, and never blocks interaction with the page
// underneath (pointer-events-none on the confetti layer).

import { useEffect, useMemo } from "react";

const PALETTE = ["#C1543A", "#E8A33D", "#5F8161", "#8A3A3A", "#F59E0B"];

export default function Celebration({
  show,
  onClose,
  message_en = "All done for today!",
  message_hi = "आज का पूरा काम हो गया!",
  duration = 2600,
}) {
  const pieces = useMemo(() => {
    if (!show) return [];
    return Array.from({ length: 26 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.4,
      duration: 1.1 + Math.random() * 0.7,
      size: 6 + Math.random() * 7,
      color: PALETTE[i % PALETTE.length],
      round: Math.random() > 0.5,
    }));
  }, [show]);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(t);
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-start justify-center">
      <div className="absolute inset-0 overflow-hidden">
        {pieces.map((p) => (
          <span
            key={p.id}
            className="confetti-piece"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.round ? "9999px" : "2px",
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="mt-24 animate-float-up pointer-events-auto">
        <div className="flex items-center gap-3 bg-white rounded-2xl shadow-2xl border border-black/10 px-5 py-4 max-w-xs mx-4">
          <span className="text-3xl">🎉</span>
          <div>
            <p className="font-bold text-ink leading-snug">
              <span className="lang-en">{message_en}</span>
              <span className="lang-hi">{message_hi}</span>
            </p>
            <p className="text-sm text-ink/60 mt-0.5">
              <span className="lang-en">Great habit-building today.</span>
              <span className="lang-hi">आज की बहुत अच्छी आदत।</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
