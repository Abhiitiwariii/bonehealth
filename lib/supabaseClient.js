// Thin Supabase client wrapper.
//
// If the app isn't configured with a Supabase project (env vars unset),
// `supabase` is null and every sync function in lib/cloudSync.js becomes a
// harmless no-op — the app keeps working purely on-device, exactly as
// before. This makes cloud sync strictly additive, never a hard
// dependency.
//
// Identity model (see supabase/schema.sql + supabase/002_per_user_auth.sql):
// each browser signs in with Supabase **Anonymous Auth**, so every row is
// owned by a real `auth.uid()` and Row Level Security guarantees a client
// can only ever read or write its OWN rows. This fixes the earlier
// write-only design (data could be pushed up but never read back, and any
// client could write arbitrary rows). Anonymous auth alone does not follow
// a person across devices or survive a full site-data wipe — that needs a
// real login (email/Google), deliberately deferred to a later phase. When
// that lands, the SAME anonymous user can be upgraded in place via
// supabase.auth.linkIdentity, turning today's data durable without a
// migration.

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          // No email/OAuth redirect flow yet, so nothing to detect in the URL.
          detectSessionInUrl: false,
        },
      })
    : null;

export function isCloudSyncEnabled() {
  return supabase !== null;
}

// Ensures there is a signed-in (anonymous) session and returns the auth
// user, or null if cloud sync is off or sign-in failed. Cached so the many
// fire-and-forget sync calls share a single sign-in instead of racing to
// create one each. On failure the cache is cleared so a later call retries.
let authPromise = null;

export function ensureAuth() {
  if (!supabase) return Promise.resolve(null);
  if (authPromise) return authPromise;

  authPromise = (async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) return session.user;

      const { data, error } = await supabase.auth.signInAnonymously();
      if (error) {
        console.warn("Anonymous sign-in failed:", error.message);
        return null;
      }
      return data?.user ?? null;
    } catch (e) {
      console.warn("Auth init failed:", e);
      return null;
    }
  })();

  // Let a null result (offline / anon sign-ins disabled) be retried later,
  // without re-entering while the first attempt is still in flight.
  authPromise.then((user) => {
    if (!user) authPromise = null;
  });

  return authPromise;
}
