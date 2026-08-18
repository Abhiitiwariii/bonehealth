"use client";

// Persistent bottom navigation bar, 4 items max, always visible. Replaces
// the old horizontal top tab row. Diet/Progress live under Records,
// Bhakti/Fun/settings live under Profile, so every existing route stays
// reachable without a hamburger menu.

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", hindi: "होम", icon: "🏠" },
  { href: "/records", label: "Records", hindi: "रिकॉर्ड", icon: "📊" },
  { href: "/reminders", label: "Reminders", hindi: "रिमाइंडर", icon: "🔔" },
  { href: "/profile", label: "Profile", hindi: "प्रोफ़ाइल", icon: "👤" },
];

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  if (href === "/records") return pathname === "/records" || pathname === "/diet" || pathname === "/log";
  if (href === "/profile") return pathname === "/profile" || pathname === "/bhakti" || pathname === "/fun";
  return pathname === href;
}

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur border-t border-slate-200 shadow-[0_-2px_16px_rgba(0,0,0,0.06)]">
      <div className="max-w-2xl mx-auto grid grid-cols-4">
        {links.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative flex flex-col items-center justify-center gap-0.5 py-2.5 text-sm font-semibold transition-colors ${
                active ? "text-amber-600" : "text-slate-400"
              }`}
            >
              {active && (
                <span className="absolute top-0 w-8 h-1 rounded-full bg-amber-500" />
              )}
              <span
                className={`text-2xl leading-none w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${
                  active ? "bg-amber-100 scale-110" : ""
                }`}
              >
                {link.icon}
              </span>
              <span className="lang-en">{link.label}</span>
              <span className="lang-hi">{link.hindi}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
