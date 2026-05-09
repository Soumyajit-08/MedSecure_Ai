"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/utils/cn";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/predictions", label: "Predictions" },
  { href: "/chatbot", label: "AI Chatbot" },
  { href: "/appointments", label: "Appointments" },
  { href: "/reports", label: "Reports" }
];

export function AppShell({ title, children }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-transparent text-slate-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[280px_1fr]">
        <aside className="rounded-2xl border border-white/10 bg-[#181818]/95 p-4 shadow-2xl shadow-black/30">
          <Link href="/" className="mb-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <img src="/icon.svg" alt="MedSecure AI" className="h-9 w-9" />
            <div>
              <h2 className="text-base font-bold text-white">MedSecure AI</h2>
              <p className="text-xs text-slate-500">Patient workspace</p>
            </div>
          </Link>
          <nav className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/[0.04] hover:text-white",
                  pathname === link.href && "bg-lime-500/10 text-lime-200 ring-1 ring-lime-400/20"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs text-slate-400">
            <p className="font-semibold text-white">{user?.fullName || "Guest patient"}</p>
            <p className="mb-4 mt-1 capitalize">{user?.role || "Patient account"}</p>
            <button className="text-red-300 transition hover:text-red-200" onClick={logout}>
              Logout
            </button>
          </div>
        </aside>
        <main>
          <header className="mb-6 rounded-2xl border border-white/10 bg-[#181818]/80 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-lime-300">Patient workspace</p>
            <h1 className="mt-2 text-3xl font-bold text-white">{title}</h1>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
