"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, DollarSign, Users, User, Globe, LogOut, ChevronRight, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/agent",            label: "Dashboard",   icon: LayoutDashboard, exact: true },
  { href: "/agent/commissions",label: "Commissions", icon: DollarSign },
  { href: "/agent/referrals",  label: "Referrals",   icon: Users },
  { href: "/agent/profile",    label: "Profile",     icon: User },
];

export default function AgentSidebar() {
  const pathname = usePathname();
  const isActive = (href: string, exact = false) => exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0d1117] flex flex-col z-40">
      <div className="px-6 py-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Globe className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-playfair,'Playfair Display',Georgia,serif)" }}>
            Wander<span className="text-accent">Base</span>
          </span>
        </Link>
        <span className="mt-1.5 block text-[11px] font-semibold text-white/40 uppercase tracking-widest flex items-center gap-1.5">
          <Share2 className="w-3 h-3" /> Agent Portal
        </span>
      </div>

      <nav className="flex-1 px-3 py-5 space-y-0.5">
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200", active ? "bg-secondary text-white shadow-lg shadow-secondary/30" : "text-white/60 hover:text-white hover:bg-white/8")}>
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
              {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/8 transition-all mb-1">
          <Globe className="w-4 h-4" /> View Site
        </Link>
        <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-all">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </aside>
  );
}
