# Bone Health · Arogya Saathi (हड्डी स्वास्थ्य · आरोग्य साथी)

A simple, bilingual (English/Hindi) app for anyone managing bone and knee
health at home: a daily home-exercise routine, a vegetarian bone-health
diet guide, a pain/progress log, and your own profile. Built to be shared
with the wider public, not just one person's device.

**This app gives general wellness information only. It is not medical
advice. Please review any new exercise routine with your doctor or
physiotherapist before starting, especially after a recent diagnosis or a
change in how you walk.**

## What's inside

- **Today** (`/`): a rotating daily Krishna quote, streak/points/badges,
  your profile summary and BMI, and that day's specific exercise routine
  (a different themed set each day of the week, with a tap-to-play video
  for most exercises).
- **Profile** (`/profile`): enter your own height, weight, age, and knee
  report notes in your own words, and optionally attach photos or PDFs of
  reports. Everything is saved only on your device. The app never opens or
  reads attached files; they are stored purely for your own reference. Also
  includes a spot to type in a few key numbers from your yearly report
  (vitamin D, calcium, bone density T-score, hemoglobin), which then show
  up on the Today dashboard with general reference ranges, and a "Tests
  Worth Asking Your Doctor About" section with real, sourced explainer
  videos.
- **Diet** (`/diet`): a plain-language Hindi explainer of why calcium,
  vitamin D, protein, magnesium, and vitamin K all matter together,
  vegetarian Indian foods for each, a vrat/fasting-day friendly foods list
  (makhana, singhara atta, kuttu, til, dahi), a sample day's meals, and a
  supplements section with links to NIH fact sheets (opens in a new tab).
- **Bhakti** (`/bhakti`): a daily Krishna quote (Sanskrit + Hindi +
  English) and a curated list of Hindi kirtans/bhajans grouped by mood,
  each linking to a YouTube search so you can pick your favorite singer's
  version.
- **Fun** (`/fun`): a separate tab with one clean, wholesome video that
  changes every day of the week, played right inside the app (not just a
  search link).
- **Doctors** (`/doctors`): a location-based search, not a fixed list. You
  type your city or area (or share your device location) and the app
  builds live Google Maps, Google Search, and Practo search links for
  orthopedic knee specialists near you, plus a neutral, bilingual explainer
  on total knee replacement: when it's typically recommended, non-surgical
  alternatives, real benefits/risks, a recovery timeline, common fears
  answered honestly, and questions worth asking your doctor before
  deciding.
- **My Progress** (`/log`): a daily pain-level slider, a "walked today"
  checkbox, notes, non-medicine comfort tips (warm/cold compress, rest
  positions, when floor-sitting should be avoided), a "call the doctor if"
  list, and history you can scroll back through.

## Privacy and trust

- There is still no login or account. Each browser is identified only by
  a random, anonymous ID (no name attached) stored in that browser.
- What you type — profile details, health numbers, daily check-ins
  (pain/exercise), and food log entries — is saved to this device first,
  and also synced to a private database (Supabase) so the app owner can
  see how the app is being used and, if you've shared your name, follow
  up with you. It is not publicly visible and is not sold or shared with
  anyone else.
- Uploaded report files (photos or PDFs) stay on your device only, saved
  in your browser's IndexedDB storage. They are never uploaded anywhere,
  and the app never opens, reads, or analyzes them; they're for your own
  reference, the same as a folder on your phone.
- Health numbers (vitamin D, calcium, bone density, hemoglobin) shown on
  the dashboard are only ever what you typed in yourself. The app never
  extracts numbers from an uploaded file.
- Doctor search links point to Google Maps, Google Search, and Practo.
  Always confirm a doctor's qualifications, experience, and reviews
  yourself before booking an appointment.
- Because there's still no login, your data won't follow you to a
  different device or browser — a new device gets a new anonymous ID and
  starts fresh, the same as before.

## Cloud sync setup (Supabase)

Text you enter (profile, health numbers, check-ins, food log) can be
mirrored to a Supabase project so you, the app owner, can see it. This is
optional — if the two environment variables below aren't set, the app
runs exactly as before, saving only on-device.

1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase dashboard, open **SQL Editor → New query**, paste the
   contents of `supabase/schema.sql` from this repo, and run it. This
   creates the tables and locks them down so the public key used in the
   browser can only write new entries, never read other people's data
   back out.
3. In **Project Settings → API**, copy the **Project URL** and the
   **`anon` public key**.
4. Set two environment variables:
   - Locally: create `.env.local` with
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-project-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     ```
   - On Vercel: **Project Settings → Environment Variables**, add the
     same two names/values, then redeploy.
5. To see the data, use the Supabase dashboard's **Table Editor** (signed
   in as yourself — this bypasses the read restriction placed on the
   public anon key).

## Deploy it fast (GitHub connected to Vercel)

```
cd bone-health-arogya-saathi
git init
git add .
git commit -m "Bone Health Arogya Saathi"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Connect that new GitHub repo to a new Vercel project (this is a separate
app from any existing one, so it needs its own repo and its own Vercel
project). Vercel picks up the push within seconds and starts building.

**For every update after that**, from inside the project folder:

```
git add .
git commit -m "describe what changed"
git push
```

That single `git push` is the entire deploy. Vercel rebuilds and publishes
automatically, usually in under a minute.

## Running it locally first (optional, to preview before deploying)

```
npm install
npm run dev
```

Then open `http://localhost:3000` in a browser.

## Making changes later

- Exercise list and instructions: edit `lib/exercises.js`.
- Weekly routine (which exercises show on which day): edit `lib/weeklyPlan.js`.
- Streaks, points, and badges: edit `lib/gamification.js`.
- Diet content: edit `lib/diet.js`.
- Supplements list: edit `lib/supplements.js`.
- Krishna quotes: edit `lib/quotes.js` (add more entries to rotate through).
- Kirtans/bhajans: edit `lib/bhajans.js`.
- Fun tab videos: edit `lib/funnyVideos.js` (add more entries to rotate through).
- Pain-care tips and doctor-call triggers: edit `lib/painCare.js`.
- Profile fields and BMI logic: edit `lib/profileStore.js`.
- Report file storage: edit `lib/fileStore.js`.
- Doctor search link builders: edit `lib/doctorSearch.js`.
- Knee-replacement awareness content: edit `lib/kneeAwareness.js`.
- Test suggestions and their videos: edit `lib/testSuggestions.js`.
- Health number reference ranges: edit `lib/healthNumbers.js`.
- Colors/text size: edit `tailwind.config.js` and `app/globals.css`.
- Text size and contrast toggle: edit `app/components/AccessibilityControls.js`.
