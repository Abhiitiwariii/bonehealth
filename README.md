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
  reads attached files; they are stored purely for your own reference.
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

- Nothing you type or upload is sent to any server. There is no login and
  no account.
- Profile details (name, height, weight, age, notes) are saved in your
  browser's local storage, only on the device you're using.
- Uploaded report files (photos or PDFs) are saved in your browser's
  IndexedDB storage, only on that device. The app never opens, reads, or
  analyzes these files; they're for your own reference, the same as a
  folder on your phone.
- Doctor search links point to Google Maps, Google Search, and Practo.
  Always confirm a doctor's qualifications, experience, and reviews
  yourself before booking an appointment.
- If you use this on two different devices, your data won't sync between
  them, since nothing leaves the device it was entered on.

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
- Colors/text size: edit `tailwind.config.js` and `app/globals.css`.
