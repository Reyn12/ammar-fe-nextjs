import Link from "next/link";

import type { NavItem } from "@/shared/types";

const navItems: NavItem[] = [{ label: "Dashboard", href: "/admin" }];

export function AdminSidebar() {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-slate-100">
      <div className="border-b border-slate-800 px-5 py-5">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
          Admin Panel
        </p>
        <p className="mt-1 text-lg font-semibold">Ammar</p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-900 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
