-- Bone Health · Arogya Saathi — Migration 002: per-user auth
--
-- Upgrades the original write-only, device_id-keyed design (schema.sql) to
-- rows owned by an authenticated user via Supabase **Anonymous Auth**, so
-- each client can read AND write only its own data under Row Level Security.
--
-- Run once in the Supabase SQL Editor (Project → SQL Editor → New query →
-- paste → Run), AFTER schema.sql has been applied.
--
-- PREREQUISITE — enable anonymous sign-ins:
--   Authentication → Providers → Anonymous → toggle ON.
-- Without this, the browser cannot sign in and cloud sync stays a no-op
-- (the app still works fully on-device).
--
-- Non-destructive: existing pre-auth rows (user_id IS NULL) are left in
-- place but become invisible under the new policies (auth.uid() = user_id
-- never matches NULL). They can be deleted later from the Table Editor.

-- 1. Ownership column + optional email (captured only if the person has one).
alter table profiles       add column if not exists user_id uuid;
alter table profiles       add column if not exists email   text;
alter table health_numbers add column if not exists user_id uuid;
alter table checkins       add column if not exists user_id uuid;
alter table diet_logs      add column if not exists user_id uuid;

-- 2. Drop the old device-based keys/constraints so a user_id upsert can't
--    collide with a different unique/primary key on the same row.
alter table profiles       drop constraint if exists profiles_pkey;
alter table profiles       alter column device_id drop not null;
alter table health_numbers drop constraint if exists health_numbers_pkey;
alter table health_numbers alter column device_id drop not null;
alter table checkins       drop constraint if exists checkins_device_id_date_key;
alter table diet_logs      drop constraint if exists diet_logs_device_id_date_key;

-- 3. New per-user uniqueness so upserts conflict on the right target.
create unique index if not exists profiles_user_id_key       on profiles       (user_id);
create unique index if not exists health_numbers_user_id_key on health_numbers (user_id);
create unique index if not exists checkins_user_date_key     on checkins       (user_id, date);
create unique index if not exists diet_logs_user_date_key    on diet_logs      (user_id, date);

-- 4. Remove the old write-only anon policies (INSERT/UPDATE, no SELECT).
drop policy if exists "anon can insert profiles"       on profiles;
drop policy if exists "anon can update profiles"       on profiles;
drop policy if exists "anon can insert health_numbers" on health_numbers;
drop policy if exists "anon can update health_numbers" on health_numbers;
drop policy if exists "anon can insert checkins"       on checkins;
drop policy if exists "anon can update checkins"       on checkins;
drop policy if exists "anon can insert diet_logs"      on diet_logs;
drop policy if exists "anon can update diet_logs"      on diet_logs;

-- 5. Per-user policies: an authenticated user (anonymous users ARE in the
--    `authenticated` role) can read/insert/update ONLY their own rows.
create policy "own select profiles" on profiles for select to authenticated using (auth.uid() = user_id);
create policy "own insert profiles" on profiles for insert to authenticated with check (auth.uid() = user_id);
create policy "own update profiles" on profiles for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own select health_numbers" on health_numbers for select to authenticated using (auth.uid() = user_id);
create policy "own insert health_numbers" on health_numbers for insert to authenticated with check (auth.uid() = user_id);
create policy "own update health_numbers" on health_numbers for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own select checkins" on checkins for select to authenticated using (auth.uid() = user_id);
create policy "own insert checkins" on checkins for insert to authenticated with check (auth.uid() = user_id);
create policy "own update checkins" on checkins for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own select diet_logs" on diet_logs for select to authenticated using (auth.uid() = user_id);
create policy "own insert diet_logs" on diet_logs for insert to authenticated with check (auth.uid() = user_id);
create policy "own update diet_logs" on diet_logs for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
