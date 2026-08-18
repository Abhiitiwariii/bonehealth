"use client";

// Invisible bootstrap: on first mount it signs the browser in anonymously
// (if Supabase is configured) and pushes any existing local data up so it
// becomes cloud-owned and readable. Renders nothing; safe no-op when cloud
// sync is off.

import { useEffect } from "react";
import { initCloud } from "../../lib/cloudInit";

export default function CloudSync() {
  useEffect(() => {
    initCloud();
  }, []);
  return null;
}
