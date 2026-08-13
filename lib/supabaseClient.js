// Thin Supabase client wrapper.
//
// If the app isn't configured with a Supabase project (env vars unset),
// `supabase` is null and every sync function in lib/cloudSync.js becomes a
// harmless no-op — the app keeps working purely on-device, exactly as
// before. This makes cloud sync strictly additive, never a hard
// dependency.
//
// The anon key used here is safe to ship in client code by design (see
// supabase/schema.sql): it is only ever granted INSERT/UPDATE rights, not
// SELECT, so a person reading this key out of the browser cannot read
// anyone else's entries back.

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  url && anonKey ? createClient(url, anonKey) : null;

export function isCloudSyncEnabled() {
  return supabase !== null;
}
