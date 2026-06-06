"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, Search, Plane,
  Landmark, Mountain, Sun, Map, Waves, Gem, TreePine, MapPin, Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Custom logo mark SVG ─────────────────────────────── */
const WanderMark = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Globe ring */}
    <circle cx="16" cy="17" r="11.5" stroke="white" strokeWidth="1.6" strokeOpacity="0.95" />
    {/* Equator */}
    <path d="M4.5 17 H27.5" stroke="white" strokeWidth="1.3" strokeOpacity="0.65" strokeLinecap="round" />
    {/* Left meridian */}
    <path d="M16 5.5 Q11.5 11 11.5 17 Q11.5 23 16 28.5" stroke="white" strokeWidth="1.3" strokeOpacity="0.65" strokeLinecap="round" />
    {/* Right meridian */}
    <path d="M16 5.5 Q20.5 11 20.5 17 Q20.5 23 16 28.5" stroke="white" strokeWidth="1.3" strokeOpacity="0.65" strokeLinecap="round" />
    {/* Upper latitude arc */}
    <path d="M7 12 Q16 9 25 12" stroke="white" strokeWidth="0.9" strokeOpacity="0.4" strokeLinecap="round" />
    {/* Lower latitude arc */}
    <path d="M7 22 Q16 25 25 22" stroke="white" strokeWidth="0.9" strokeOpacity="0.4" strokeLinecap="round" />
    {/* Destination pin — the signature mark */}
    <circle cx="16" cy="4.5" r="2.8" fill="white" />
    <path d="M13.2 4.5 Q13.2 1.5 16 1 Q18.8 1.5 18.8 4.5 Q18.8 7.5 16 9.5 Q13.2 7.5 13.2 4.5Z" fill="white" opacity="0.9" />
  </svg>
);

/* ─── Nav data with proper icons ────────────────────────── */
const navLinks = [
  {
    label: "Destinations",
    href: "/destinations",
    children: [
      { label: "Europe",       href: "/destinations?continent=Europe",    icon: Landmark, color: "bg-blue-500"    },
      { label: "Asia Pacific", href: "/destinations?continent=Asia",      icon: Mountain, color: "bg-emerald-500" },
      { label: "Africa",       href: "/destinations?continent=Africa",    icon: Sun,      color: "bg-amber-500"   },
      { label: "Americas",     href: "/destinations?continent=Americas",  icon: Map,      color: "bg-violet-500"  },
    ],
  },
  {
    label: "Tours",
    href: "/tours",
    children: [
      { label: "Beach & Island",  href: "/tours?category=Beach",    icon: Waves,    color: "bg-cyan-500"   },
      { label: "Adventure",       href: "/tours?category=Adventure", icon: Mountain, color: "bg-orange-500" },
      { label: "Cultural",        href: "/tours?category=Cultural",  icon: Landmark, color: "bg-rose-500"   },
      { label: "Luxury Escapes",  href: "/tours?category=Luxury",   icon: Gem,      color: "bg-purple-500" },
      { label: "Wildlife Safari", href: "/tours?category=Wildlife",  icon: TreePine, color: "bg-green-500"  },
    ],
  },
  { label: "About",   href: "/about"   },
  { label: "Blog",    href: "/blog"    },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]           = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen]       = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navTextColor = scrolled ? "text-gray-800" : "text-white";

  return (
    <>
      {/* ── Main nav ───────────────────────────────────── */}
      <motion.header
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "top-0 bg-white/96 backdrop-blur-xl border-b border-gray-100 shadow-[0_1px_20px_rgba(0,0,0,0.06)]"
            : "top-0 bg-transparent"
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between h-[70px]">

            {/* ── Logo ──────────────────────────────────── */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              {/* Icon box */}
              <div className="relative w-10 h-10 bg-linear-to-br from-primary via-[#0a6069] to-secondary rounded-[11px] flex items-center justify-center shadow-[0_4px_12px_rgba(0,80,90,0.35)] group-hover:shadow-[0_6px_20px_rgba(0,80,90,0.45)] transition-all duration-300 group-hover:scale-105">
                <WanderMark className="w-[22px] h-[22px]" />
              </div>
              {/* Wordmark */}
              <div className="flex flex-col leading-none">
                <span
                  className={cn(
                    "text-[1.2rem] font-bold tracking-tight leading-none transition-colors duration-300",
                    scrolled ? "text-gray-900" : "text-white"
                  )}
                  style={{ fontFamily: "var(--font-playfair,'Playfair Display',Georgia,serif)" }}
                >
                  Wander<span className={cn(scrolled ? "text-accent" : "text-gold")}>Base</span>
                </span>
                <span className={cn(
                  "text-[9.5px] font-semibold uppercase tracking-[0.2em] mt-0.5 transition-colors duration-300",
                  scrolled ? "text-gray-400" : "text-white/50"
                )}>
                  Travel & Experiences
                </span>
              </div>
            </Link>

            {/* ── Desktop nav ───────────────────────────── */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "group/link relative flex items-center gap-1 px-3.5 py-2 rounded-xl text-[.875rem] font-medium transition-colors duration-200",
                      navTextColor,
                      scrolled ? "hover:text-primary" : "hover:text-white"
                    )}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown
                        className={cn("w-3.5 h-3.5 opacity-50 transition-transform duration-200",
                          activeDropdown === link.label && "rotate-180"
                        )}
                      />
                    )}
                    {/* Animated underline */}
                    <span className={cn(
                      "absolute bottom-1 left-3.5 right-3.5 h-px rounded-full scale-x-0 group-hover/link:scale-x-100 transition-transform duration-200 origin-left",
                      scrolled ? "bg-primary" : "bg-white/60"
                    )} />
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.children && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.97 }}
                        transition={{ duration: 0.16, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-1 w-60 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-100/80 py-2.5 overflow-hidden backdrop-blur-xl"
                      >
                        {/* Subtle top accent line */}
                        <div className="absolute top-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="flex items-center gap-3 px-4 py-2.5 text-[.85rem] text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-150 group/item"
                          >
                            <span className={`w-7 h-7 ${child.color} rounded-lg flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform duration-200`}>
                              <child.icon className="w-3.5 h-3.5 text-white" />
                            </span>
                            <span className="font-medium">{child.label}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* ── Right actions ─────────────────────────── */}
            <div className="hidden md:flex items-center gap-1.5">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={cn(
                  "p-2.5 rounded-xl transition-all duration-200",
                  scrolled
                    ? "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                <Search className="w-[17px] h-[17px]" />
              </button>

              {/* Divider */}
              <div className={cn("w-px h-5 mx-1 rounded-full", scrolled ? "bg-gray-200" : "bg-white/20")} />

              {/* Sign In */}
              <Link
                href="/auth/signin"
                className={cn(
                  "px-4 py-2 rounded-xl text-[.875rem] font-medium transition-all duration-200",
                  scrolled
                    ? "text-gray-700 hover:text-primary hover:bg-primary/5"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                )}
              >
                Sign In
              </Link>

              {/* Book Now CTA */}
              <Link
                href="/tours"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-accent to-gold text-white text-[.875rem] font-semibold rounded-xl shadow-[0_4px_14px_rgba(212,160,23,0.35)] hover:shadow-[0_6px_20px_rgba(212,160,23,0.45)] hover:-translate-y-px transition-all duration-200"
              >
                <Plane className="w-3.5 h-3.5" />
                Book Now
              </Link>
            </div>

            {/* Mobile burger */}
            <button
              className={cn(
                "md:hidden p-2.5 rounded-xl transition-colors",
                scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-gray-100 bg-white"
            >
              <div className="max-w-3xl mx-auto px-5 py-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search destinations, tours, experiences…"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── Mobile drawer ──────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-[300px] bg-white z-50 md:hidden overflow-y-auto shadow-2xl"
            >
              {/* Mobile drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
                  <div className="w-9 h-9 bg-linear-to-br from-primary via-[#0a6069] to-secondary rounded-[10px] flex items-center justify-center shadow-md">
                    <WanderMark className="w-5 h-5" />
                  </div>
                  <span
                    className="text-[1.1rem] font-bold text-gray-900 tracking-tight"
                    style={{ fontFamily: "var(--font-playfair,'Playfair Display',Georgia,serif)" }}
                  >
                    Wander<span className="text-accent">Base</span>
                  </span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <div className="px-3 py-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.055 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center px-3 py-3 text-gray-800 font-semibold rounded-xl hover:bg-gray-50 hover:text-primary transition-colors text-[.9375rem]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="ml-2 mb-1.5 space-y-0.5">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-500 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-medium"
                            onClick={() => setMobileOpen(false)}
                          >
                            <span className={`w-5 h-5 ${child.color} rounded-md flex items-center justify-center shrink-0`}>
                              <child.icon className="w-3 h-3 text-white" />
                            </span>
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTAs */}
              <div className="px-4 pb-8 flex flex-col gap-3 mt-2">
                <Link
                  href="/auth/signin"
                  className="block text-center py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-primary hover:text-primary transition-colors text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/tours"
                  className="flex items-center justify-center gap-2 py-3 bg-linear-to-r from-accent to-gold text-white font-semibold rounded-xl shadow-md text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  <Plane className="w-4 h-4" /> Book Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
