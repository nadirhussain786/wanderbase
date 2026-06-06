"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, MapPin, Package, Users, UserCheck,
  CalendarCheck, FileText, Star, BookOpen, BarChart3,
  Globe, LogOut, Settings, ChevronRight, Menu, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navSections = [
  {
    label: "Overview",
    items: [
      { href: "/admin",           label: "Dashboard",    icon: LayoutDashboard, exact: true },
      { href: "/admin/analytics", label: "Analytics",    icon: BarChart3 },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/destinations", label: "Destinations", icon: MapPin },
      { href: "/admin/tours",        label: "Tours",         icon: Package },
      { href: "/admin/guidelines",   label: "Guidelines",    icon: BookOpen },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/admin/bookings",  label: "Bookings",  icon: CalendarCheck },
      { href: "/admin/reviews",   label: "Reviews",   icon: Star },
      { href: "/admin/articles",  label: "Articles",  icon: FileText },
    ],
  },
  {
    label: "People",
    items: [
      { href: "/admin/users",  label: "Users",  icon: Users },
      { href: "/admin/agents", label: "Agents", icon: UserCheck },
    ],
  },
];

export default function AdminSidebar() {
  const pathname  = usePathname();
  const [open, setOpen] = useState(false);

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Close on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll on mobile when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname.startsWith(href);

  const SidebarContent = () => (
    <aside className="flex flex-col h-full bg-dark">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-linear-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Globe className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-playfair,'Playfair Display',Georgia,serif)" }}>
            Wander<span className="text-accent">Base</span>
          </span>
        </Link>
        <button onClick={() => setOpen(false)} className="md:hidden p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
      <span className="px-6 mt-2 block text-[11px] font-semibold text-white/30 uppercase tracking-widest">Admin Panel</span>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="px-3 mb-1.5 text-[10px] font-bold text-white/25 uppercase tracking-widest">{section.label}</p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href, item.exact);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                      active
                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                        : "text-white/55 hover:text-white hover:bg-white/8"
                    )}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {item.label}
                    {active && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-70" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10 space-y-0.5">
        <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/55 hover:text-white hover:bg-white/8 transition-all">
          <Settings className="w-4 h-4" /> Settings
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/55 hover:text-red-400 hover:bg-red-400/10 transition-all"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 bg-dark text-white rounded-xl shadow-xl border border-white/10 hover:bg-white/10 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Desktop sidebar (always visible) */}
      <div className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 z-40 flex-col">
        <SidebarContent />
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-72 z-50 flex flex-col"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
