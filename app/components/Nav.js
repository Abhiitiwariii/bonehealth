"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Today", hindi: "आज" },
  { href: "/profile", label: "Profile", hindi: "प्रोफ़ाइल" },
  { href: "/diet", label: "Diet", hindi: "आहार" },
  { href: "/bhakti", label: "Bhakti", hindi: "भक्ति" },
  { href: "/fun", label: "Fun", hindi: "मनोरंजन" },
  { href: "/doctors", label: "Doctors", hindi: "डॉक्टर" },
  { href: "/log", label: "Progress", hindi: "प्रगति" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-black/5 sticky top-0 z-10">
      <div className="max-w-2xl mx-auto flex overflow-x-auto">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`shrink-0 basis-[14.28%] min-w-[76px] text-center py-3 text-base font-medium border-b-4 transition-colors whitespace-nowrap ${
                active
                  ? "border-clay text-clay"
                  : "border-transparent text-ink/60"
              }`}
            >
              {link.label}
              <span className="block text-xs opacity-70">{link.hindi}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
