// A random ID generated once per browser and reused for every save, so
// entries from the same person land under the same rows in Supabase
// without requiring a login or account. This mirrors how the rest of the
// app already treats "this browser" as the unit of identity (localStorage,
// IndexedDB) — it just gives that same identity a stable ID the server can
// also recognize.
//
// Trade-off worth knowing: because there's no real login, this ID doesn't
// follow a person to a new device or browser. If they clear site data, a
// new ID is generated and their cloud history starts fresh under a new
// row, same as their on-device history already does today.

const KEY = "arogya-device-id";

export function getDeviceId() {
  if (typeof window === "undefined") return null;
  try {
    let id = localStorage.getItem(KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(KEY, id);
    }
    return id;
  } catch (e) {
    return null;
  }
}
