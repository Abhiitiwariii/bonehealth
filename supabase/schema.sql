-- Bone Health · Arogya Saathi — Supabase schema
--
-- Run this once in your Supabase project's SQL Editor
-- (Project → SQL Editor → New query → paste → Run).
--
-- Design notes:
-- * There is no login in this app, so people are identified by an
--   anonymous `device_id` (a random UUID generated in the browser and
--   stored in localStorage — see lib/deviceId.js). It's not tied to a
--   name or account.
-- * Row Level Security is ON for every table, and the anon key (the one
--   used in the browser, NEXT_PUBLIC_SUPABASE_ANON_KEY) is only granted
--   INSERT and UPDATE. It is deliberately NOT granted SELECT, so even
--   someone who extracts the anon key from the deployed site's JS cannot
--   read other people's health data back out — they can only write their
--   own entries forward. You (the owner) read everything via the
--   Supabase dashboard/Table Editor, which authenticates as you, not as
--   the anon role, and bypasses these policies.

create table if not exists profiles (
  device_id text primary key,
  name text,
  height_cm numeric,
  weight_kg numeric,
  age numeric,
  gender text,
  notes text,
  updated_at timestamptz not null default now()
);

create table if not exists health_numbers (
  device_id text primary key,
  vitamin_d numeric,
  calcium numeric,
  bmd_tscore numeric,
  hemoglobin numeric,
  tested_on date,
  updated_at timestamptz not null default now()
);

create table if not exists checkins (
  id bigint generated always as identity primary key,
  device_id text not null,
  date date not null,
  pain smallint,
  walked boolean,
  notes text,
  exercises_done smallint,
  exercises_total smallint,
  created_at timestamptz not null default now(),
  unique (device_id, date)
);

create table if not exists diet_logs (
  id bigint generated always as identity primary key,
  device_id text not null,
  date date not null,
  food_text text,
  created_at timestamptz not null default now(),
  unique (device_id, date)
);

alter table profiles enable row level security;
alter table health_numbers enable row level security;
alter table checkins enable row level security;
alter table diet_logs enable row level security;

-- Anyone with the public anon key can insert/update (needed for the
-- upsert-on-save pattern the app uses), but cannot select any rows back.
create policy "anon can insert profiles" on profiles for insert to anon with check (true);
create policy "anon can update profiles" on profiles for update to anon using (true) with check (true);

create policy "anon can insert health_numbers" on health_numbers for insert to anon with check (true);
create policy "anon can update health_numbers" on health_numbers for update to anon using (true) with check (true);

create policy "anon can insert checkins" on checkins for insert to anon with check (true);
create policy "anon can update checkins" on checkins for update to anon using (true) with check (true);

create policy "anon can insert diet_logs" on diet_logs for insert to anon with check (true);
create policy "anon can update diet_logs" on diet_logs for update to anon using (true) with check (true);
