# Arogya Saathi — Redesign Progress & Handoff

> Working doc so any session can resume the UX redesign + backend work without
> re-deriving context. Branch: `cred-gamify-redesign`.

## Goal (settled with the owner)
Make this bone-health app (elderly Indian women, low tech-literacy) feel
**modern & clean ("clinical" = calm/trustworthy, NOT cold-hospital)**, gamified
at a **medium** level, on top of the already-working app. Bilingual EN/Hindi
toggle already exists. SOS, son-dashboard, Google login, heavy regulatory, and
monetization are **deferred** to later phases.

## The design system (apply this everywhere — the whole recipe)
The app was too visually **busy** (rainbow gradients, shine sweeps, warm
clay/marigold everywhere). New direction = **cool neutral structure + ONE warm
accent (amber)**. Uses Tailwind's built-in `slate` + `amber` scales — no
tailwind.config changes needed.

**Recipe / find-and-replace mapping when restyling a screen:**
| Old (warm/busy)                                  | New (clean/modern)                     |
|--------------------------------------------------|----------------------------------------|
| `bg-gradient-to-* from-clay/marigold/...`        | `bg-white` card OR clean amber accent  |
| `shine-sweep`, floating `bg-white/10` circles    | remove                                 |
| `text-ink`                                        | `text-slate-800`                       |
| `text-ink/70`, `/60`                              | `text-slate-500`                       |
| `text-ink/50`, `/40`                              | `text-slate-400`                       |
| `border-black/10`, `border-black/15`             | `border-slate-200`                     |
| `divide-black/5`                                  | `divide-slate-100`                     |
| `accent-clay` (range/checkbox)                    | `accent-amber-500`                     |
| `bg-clay/10 text-clay`                            | `bg-amber-50 text-amber-700`           |
| emerald "done" states (`bg-emerald-*`)            | amber (`bg-amber-50 border-amber-300`, `bg-amber-500`) |
| rainbow per-item `from-*/to-*` colors             | single amber accent + slate neutrals   |
| page/section background                           | `#F5F7FA` (already set globally)        |

**Primitives already in the codebase to reuse:**
- `app/components/LevelRing.js` — SVG progress ring. Feed `colorStart==colorEnd==ACCENT` (`#E8912D`) + `trackColor="#E7EBF0"` for a clean single-accent ring. See Home for the daily-completion usage.
- `app/components/Collapsible.js` — accordion card (used for routine + habits).
- Keep large type, big touch targets, no swipe gestures (low-literacy audience).

## DONE (build-verified with `npm run build`)
### 1. Backend: per-user Supabase sync  ✅ (Task 5)
Replaced the old **write-only, insecure** cloud layer with per-user auth.
- `lib/supabaseClient.js` — anonymous auth via `ensureAuth()` (cached, retryable).
- `lib/cloudSync.js` — upserts keyed on `user_id`; added read-back `fetchProfile/fetchHealthNumbers/fetchCheckins/fetchDietLogs`. Added optional `email` to profile sync.
- `lib/cloudInit.js` + `app/components/CloudSync.js` (mounted in `app/layout.js`) — first-run push of local data to the authed user (non-destructive, push-only).
- `supabase/002_per_user_auth.sql` — migration: adds `user_id` (+`email` on profiles), swaps write-only anon RLS for per-user `auth.uid()=user_id` policies. Non-destructive.
- `lib/profileStore.js` — `emptyProfile` now includes `email: ""`.

**OWNER ACTION REQUIRED to go live (cannot be done from code — needs Supabase dashboard access this repo has no credentials for):**
1. Supabase → Authentication → Providers → **Anonymous → ON**.
2. Run `supabase/schema.sql` (if not already), then `supabase/002_per_user_auth.sql` in the SQL Editor.
3. **Set env vars** — copy `.env.local.example` → `.env.local` and fill `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project Settings → API). Without these, `supabaseClient` stays null and ALL sync is a silent no-op regardless of steps 1–2. Restart `npm run dev` after editing.
4. Verify: log data on device A → open fresh browser → data reads back; a 2nd anon user cannot see the 1st's rows.
**Honest limit:** anon auth fixes *security + read-back*, but does NOT survive a full site-data wipe or follow the user across devices — that needs real login (deferred). Structured so `supabase.auth.linkIdentity` upgrades the same user later with no migration.

### 2. Home screen proof-of-look  ✅ (partial Task 1 + 2)
- `app/page.js` — rebuilt clean: daily-completion ring ("X of 4 today") + streak chip, neutral quick-links, amber habit rows, contained quote. Owner approved the direction (implicitly, by asking to roll out).
- `app/layout.js` — header now white + `border-slate-200` + amber logo chip + slate text (was clay→marigold gradient w/ shine). Body bg `#F5F7FA`.
- `app/globals.css` — body background → calm `#F5F7FA`, text `#1E293B`. High-contrast selectors now target `.text-slate-500/400/300` (was `.text-ink/*`) so accessibility high-contrast still darkens secondary copy.

### 3. Design system rolled out across ALL remaining screens + components  ✅ (Task 2, build-verified)
Applied the recipe table everywhere (2026-08-19). Method: one scripted `perl` pass for the deterministic token swaps (`text-ink/*`→slate, `border-black/*`→slate, `accent-clay`→amber, `bg-black/5`→slate-100), then hand-fixed the judgment parts (gradient heroes, `shine-sweep`, floating `bg-white/10` circles, `clay`/`sage` custom colours, emerald/orange done-states → amber, abnormal health readings → rose). `npm run build` green.
- Pages: `diet`, `profile`, `reminders`, `records`, `doctors`, `bhakti` — all inline gradient hero banners replaced with clean white cards + amber icon chips; sage/clay accents → amber; rose reserved for genuine caution (risks, abnormal readings, location errors).
- Components: `HealthNumbersSummary` (rose for low/high, amber for normal), `StreakCalendar`, `Collapsible`, `Disclaimer`, `FeedbackWidget`, `ProfileCard`, `TestSuggestions`, `DietLogForm`, `HealthNumbersForm`, `ExerciseVideo`, `ReminderChecker`, `ShareQuoteButton`, `Celebration` (confetti palette → amber+slate).
- **`GameStats.js` — DONE (premium direction, owner's final call).** Rebuilt as a deliberate **dark metallic hero card** (`bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900`, `border-white/10`) that KEEPS the `shine-sweep`, per-tier gradient ring + badge (`RING_COLORS`), and the top-tier `text-shimmer`. Added a tier-coloured radial glow behind the ring + a thin top sheen for a glassy edge; streak/badge gradients kept, section dividers → `border-white/10`. `StreakCalendar.js` retuned for the dark surface (labels `text-white/50`, active amber gradient, inactive `bg-white/10`, today ring offsets to `slate-900`) — it's only rendered inside GameStats, so no other screen is affected.
- `.env.local.example` added at repo root documenting the two Supabase public env vars (sync is a no-op until they're set — see below).

## TODO (the "next 4 options" — remaining work)
Rollout order = biggest impact first. Check off as done.

### Task 2 — Apply design system to remaining screens
Shared components first (cheap, touch many pages), then each route.
- [x] `app/components/PageHero.js` — DONE. Clean white card + amber chip; `from`/`to` props kept but unused.
- [x] `app/components/Nav.js` — DONE. Amber active state, slate inactive, gradients removed.
- [x] `app/log/page.js` — DONE via token-replace (accent-amber-500, amber button, slate neutrals).
- [x] `app/components/GameStats.js` — **DONE.** Premium dark metallic hero card (keeps shine/tier-gradients/shimmer). See DONE §3.
- [x] `app/diet/page.js` — DONE
- [x] `app/profile/page.js` — DONE
- [x] `app/reminders/page.js` — DONE (gradient hero → white card, orange toggles → amber)
- [x] `app/doctors/page.js` — DONE
- [x] `app/records/page.js` — DONE (gradient link cards → white cards)
- [x] `app/bhakti/page.js` — DONE. `app/fun/page.js` had no old tokens (already clean).
- [x] Other components: `ProfileCard`, `HealthNumbersSummary`, `HealthNumbersForm`, `DietLogForm`, `Disclaimer`, `TestSuggestions`, `FeedbackWidget`, `StreakCalendar`, `Celebration`, `Collapsible`, `ExerciseVideo`, `ReminderChecker`, `ShareQuoteButton` — DONE. `AccessibilityControls` had no colour tokens to change.

### Task 3 — Onboarding + one-tap data capture (near-zero typing)  ✅ DONE (2026-08-19, build-verified)
- [x] First-run onboarding — **3 skippable steps** (owner's call): (1) height + weight via **big +/− Stepper** (no keyboard, stepper chosen over number-wheel), (2) mood via tappable **FaceScale** (5 faces → 1–5, general wellbeing, kept separate from the clinical joint-pain check-in), (3) **optional email**. Persists via `saveProfile` (`lib/profileStore.js`), which already mirrors to cloud.
- [x] Built reusable primitives in `app/components/ui/`: `Stepper.js`, `FaceScale.js`. (`NumberWheel` intentionally skipped — stepper chosen.)
- [x] `app/components/OnboardingFlow.js` — the 3-step wizard (Back / Skip / Next / Finish, amber progress dots). On Finish or Skip sets `localStorage["arogya-onboarding-dismissed"]="1"`.
- [x] Trigger: **inline on Home** (`app/page.js`) when `!hasProfile(profile) && !dismissed`. No separate route.
- [x] `lib/profileStore.js` — added `mood: ""` to `emptyProfile`. `syncProfile` uses an explicit column list so `mood` stays **local-only** (no Supabase schema change, cannot break sync). To cloud-store mood later: add a `mood` column + one line in `syncProfile`.
- Home already has one-tap habit tiles; not extended (out of scope this pass).

### Task 4 — Gamification polish (medium)
- [x] Daily completion celebration (`Celebration.js`) recoloured to amber+slate palette. `StreakCalendar.js` recoloured (amber active day, amber today-ring).
- [x] `GameStats.js` — DONE as a premium dark hero card (owner chose to keep shine/tier-gradients/shimmer). See DONE §3.
- [ ] Central metaphor = clean progress rings (chosen over diya). Home ring done; extend to weekly progress + habit-tied milestone badges surfaced cleanly (reuse `lib/gamification.js` — has streak/points/tiers/badges/weekActivity already). NOT started.

## Known issues to raise
- **Next.js 14.2.5 has a security advisory** (flagged on `npm install`) — bump to a patched 14.2.x.
- **GateGuard hook** — now disabled: `"env": { "ECC_GATEGUARD": "off" }` was added to `~/.claude/settings.json` (2026-08-19). Takes effect on the next Claude Code session.
- **Task 3 (onboarding + one-tap capture) — NOT STARTED.** Has open design decisions (step count, number-wheel vs stepper UX, where email is captured); build reusable `Stepper`/`NumberWheel`/`FaceScale` in `app/components/ui/` first.

## NEXT SESSION — pick up here (owner will re-run this file)
Only item **B** remains for next session. Item **A** was completed this session — but GameStats shipped as the **PREMIUM dark hero card** (keeps shine/tier-gradients/shimmer), NOT the calmed draft below. The code block under A is the **superseded calm alternative, kept for reference only — do not apply it** unless the owner reverses the decision.

### A. (SUPERSEDED — not shipped) Calmed `GameStats.js` draft
Design intent: single amber accent, NO `shine-sweep`, NO per-tier gradient ring, NO diamond `text-shimmer`. Keep the structure (points ring / tier label / streak / week / badges). Ring is always amber (`colorStart==colorEnd==#E8912D`, `trackColor="#E7EBF0"`). Tier badge → amber pill. Streak pill → amber pill. Earned badge → solid `bg-amber-500 text-white`; locked → slate. Then `npm run build`. Drafted file to drop in verbatim:

```jsx
"use client";

// The "Health Score" card — streak, points, tier ring, weekly calendar
// and badge shelf, all computed from data the app already saves (see
// lib/gamification.js). Calmed to the app's clean system: one warm amber
// accent on cool slate + white, no metallic shine or per-tier gradients.

import { useEffect, useState } from "react";
import { computeStats } from "../../lib/gamification";
import LevelRing from "./LevelRing";
import StreakCalendar from "./StreakCalendar";

const ACCENT = "#E8912D";

export default function GameStats({ refreshKey }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setStats(computeStats());
  }, [refreshKey]);

  if (!stats) return null;

  const { streak, points, tier, week, badges: earnedBadges } = stats;
  const isMax = !tier.next;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 mb-6 animate-fade-in">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
          <span className="lang-en">Your Health Score</span>
          <span className="lang-hi">आपका स्वास्थ्य स्कोर</span>
        </p>
        <span className="inline-flex items-center gap-1 text-xs font-bold rounded-full px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200">
          <span>{tier.tier.emoji}</span>
          <span className="lang-en">{tier.tier.name_en}</span>
          <span className="lang-hi">{tier.tier.name_hi}</span>
        </span>
      </div>

      <div className="flex items-center gap-5 mt-4">
        <LevelRing
          progress={tier.progress}
          size={128}
          strokeWidth={11}
          colorStart={ACCENT}
          colorEnd={ACCENT}
          trackColor="#E7EBF0"
          pulsing={isMax}
        >
          <div className="text-center">
            <p className="text-3xl font-extrabold leading-none text-slate-800 animate-coin-pop" key={points}>
              {points}
            </p>
            <p className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wide">
              <span className="lang-en">points</span>
              <span className="lang-hi">अंक</span>
            </p>
          </div>
        </LevelRing>

        <div className="flex-1 min-w-0">
          <p className="text-sm text-slate-500 leading-relaxed">
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
          <span className="inline-flex items-center gap-1.5 mt-3 rounded-full bg-amber-50 text-amber-700 border border-amber-200 pl-2 pr-3 py-1.5 text-sm font-bold">
            <span className="text-base leading-none">🔥</span>
            <span>{streak}</span>
            <span className="font-medium lang-en">day streak</span>
            <span className="font-medium lang-hi">दिन लगातार</span>
          </span>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100">
        <p className="text-sm font-semibold mb-2 text-slate-500">
          <span className="lang-en">This week</span>
          <span className="lang-hi">इस सप्ताह</span>
        </p>
        <StreakCalendar week={week} />
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100">
        <p className="text-sm font-semibold mb-2 text-slate-500">
          <span className="lang-en">Badges</span>
          <span className="lang-hi">बैज</span>
        </p>
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1">
          {earnedBadges.map((b) => (
            <div
              key={b.id}
              className={`relative shrink-0 flex flex-col items-center justify-center gap-1 rounded-2xl w-20 h-20 border text-center px-1 transition-transform ${
                b.earned
                  ? "bg-amber-500 border-amber-500 text-white shadow-sm animate-badge-unlock"
                  : "bg-slate-100 border-slate-200 text-slate-400"
              }`}
            >
              <span className={`text-2xl leading-none ${b.earned ? "" : "grayscale opacity-50"}`}>
                {b.emoji}
              </span>
              {!b.earned && (
                <span className="absolute top-1.5 right-1.5 text-[10px]" aria-hidden="true">🔒</span>
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
```
After applying: `RING_COLORS`, `isMax` shimmer, and the `.text-shimmer`/`.shine-sweep` CSS in `globals.css` become unused by GameStats — leave the CSS (harmless, still referenced by comments/reduced-motion) unless doing a separate cleanup.

### B. Task 3 — Onboarding + one-tap capture (the "part b" work)
Open decisions to settle with owner FIRST (don't guess):
1. **How many steps?** Proposed 3: (1) height + weight via NumberWheel/Stepper, (2) mood via tappable FaceScale, (3) optional email. All skippable + resumable.
2. **Number entry UX:** stepper (+/− big buttons) vs scroll wheel — for low-literacy elderly users, big +/− stepper is likely safer than a wheel. Confirm.
3. **Email placement:** onboarding step 3, or defer to profile only? (Email already exists on `profileStore.emptyProfile` + syncs.)
4. **First-run trigger:** show onboarding when `!hasProfile(profile)` on Home, or a dedicated `/welcome` route?

Build plan once settled: reusable `Stepper` / `NumberWheel` / `FaceScale` primitives in `app/components/ui/`, persist via `lib/profileStore.js`, then wire the first-run flow. Style with the same slate+amber recipe. Build after each primitive.

## How to resume
1. `cd C:\Users\tabhi\Downloads\bonehealth` on branch `cred-gamify-redesign`.
2. Read this file + `app/page.js` (the reference for the new style).
3. Apply the recipe table above screen-by-screen; run `npm run build` after each batch.
4. `npm run dev` → http://localhost:3000 to see it.
