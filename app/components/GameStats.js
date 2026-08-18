"use client";

// The "Health Score" card — streak, points, tier ring, weekly calendar
// and badge shelf, all computed from data the app already saves (see
// lib/gamification.js). This is the deliberate premium centerpiece: a dark
// metallic card (CRED-style) so the glossy shine sweep, per-tier gradient
// ring/badge, and the top-tier shimmer actually read — a bright focal
// point that lifts the quiet daily habits into a score worth chasing.

import { useEffect, useState } from "react";
import { computeStats } from "../../lib/gamification";
import LevelRing from "./LevelRing";
import StreakCalendar from "./StreakCalendar";

const RING_COLORS = {
  bronze: ["#D0854A", "#92400E"],
  silver: ["#E2E8F0", "#64748B"],
  gold: ["#FDE68A", "#D97706"],
  platinum: ["#7DD3FC", "#0284C7"],
  diamond: ["#F0ABFC", "#A21CAF"],
};

export default function GameStats({ refreshKey }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setStats(computeStats());
  }, [refreshKey]);

  if (!stats) return null;

  const { streak, points, tier, week, badges: earnedBadges } = stats;
  const isMax = !tier.next;
  const [ringStart, ringEnd] = RING_COLORS[tier.tier.id] || ["#F59E0B", "#F97316"];

  return (
    <div className="relative overflow-hidden rounded-3xl p-5 mb-6 animate-fade-in text-white border border-white/10 shadow-[0_24px_60px_-24px_rgba(2,6,23,0.75)] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Soft tier-coloured glow behind the ring, so each tier subtly tints
          the whole card without a hard block of colour. */}
      <div
        aria-hidden="true"
        className="absolute -left-12 -top-10 w-56 h-56 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${ringStart}, transparent 70%)` }}
      />
      {/* Thin top sheen for a glassy metallic edge. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
      />
      <div className="shine-sweep" aria-hidden="true" />

      <div className="relative flex items-center justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-widest text-white/50">
          <span className="lang-en">Your Health Score</span>
          <span className="lang-hi">आपका स्वास्थ्य स्कोर</span>
        </p>
        <span
          className={`inline-flex items-center gap-1 text-xs font-bold rounded-full px-3 py-1 bg-gradient-to-r ${tier.tier.from} ${tier.tier.to} text-white shadow-sm ring-1 ring-white/20`}
        >
          <span>{tier.tier.emoji}</span>
          <span className="lang-en">{tier.tier.name_en}</span>
          <span className="lang-hi">{tier.tier.name_hi}</span>
        </span>
      </div>

      <div className="relative flex items-center gap-5 mt-4">
        <LevelRing
          progress={tier.progress}
          size={128}
          strokeWidth={11}
          colorStart={ringStart}
          colorEnd={ringEnd}
          trackColor="rgba(255,255,255,0.12)"
          pulsing={isMax}
        >
          <div className="text-center">
            <p
              className={`text-3xl font-extrabold leading-none animate-coin-pop ${
                isMax ? "text-shimmer" : "text-white"
              }`}
              key={points}
            >
              {points}
            </p>
            <p className="text-[11px] font-semibold text-white/50 mt-1 uppercase tracking-wide">
              <span className="lang-en">points</span>
              <span className="lang-hi">अंक</span>
            </p>
          </div>
        </LevelRing>

        <div className="flex-1 min-w-0">
          <p className="text-sm text-white/75 leading-relaxed">
            {isMax ? (
              <>
                <span className="lang-en">Top tier reached — you're setting the pace! 🏆</span>
                <span className="lang-hi">सर्वोच्च स्तर हासिल — आप मिसाल हैं! 🏆</span>
              </>
            ) : (
              <>
                <span className="lang-en">
                  {tier.pointsToNext} points to {tier.next.name_en} {tier.next.emoji}
                </span>
                <span className="lang-hi">
                  {tier.next.name_hi} {tier.next.emoji} तक {tier.pointsToNext} अंक बाकी
                </span>
              </>
            )}
          </p>
          <span className="inline-flex items-center gap-1.5 mt-3 bg-gradient-to-br from-orange-400 to-amber-500 text-white rounded-full pl-2 pr-3 py-1.5 text-sm font-bold shadow-md ring-1 ring-white/15">
            <span className="text-base leading-none">🔥</span>
            <span>{streak}</span>
            <span className="font-medium opacity-90 lang-en">day streak</span>
            <span className="font-medium opacity-90 lang-hi">दिन लगातार</span>
          </span>
        </div>
      </div>

      <div className="relative mt-5 pt-4 border-t border-white/10">
        <p className="text-sm font-semibold mb-2 text-white/60">
          <span className="lang-en">This week</span>
          <span className="lang-hi">इस सप्ताह</span>
        </p>
        <StreakCalendar week={week} />
      </div>

      <div className="relative mt-5 pt-4 border-t border-white/10">
        <p className="text-sm font-semibold mb-2 text-white/60">
          <span className="lang-en">Badges</span>
          <span className="lang-hi">बैज</span>
        </p>
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1">
          {earnedBadges.map((b) => (
            <div
              key={b.id}
              className={`relative shrink-0 flex flex-col items-center justify-center gap-1 rounded-2xl w-20 h-20 border text-center px-1 transition-transform ${
                b.earned
                  ? "bg-gradient-to-br from-amber-400 to-orange-500 border-transparent text-white shadow-md ring-1 ring-white/15 animate-badge-unlock"
                  : "bg-white/5 border-white/10 text-white/40"
              }`}
            >
              <span className={`text-2xl leading-none ${b.earned ? "" : "grayscale opacity-50"}`}>
                {b.emoji}
              </span>
              {!b.earned && (
                <span className="absolute top-1.5 right-1.5 text-[10px]" aria-hidden="true">
                  🔒
                </span>
              )}
              <span className="text-[10px] font-semibold leading-tight">
                <span className="lang-en block">{b.name_en}</span>
                <span className="lang-hi block">{b.name_hi}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
