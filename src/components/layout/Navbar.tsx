"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    label: "Destinations",
    href: "/destinations",
    children: [
      { label: "🌍  Europe", href: "/destinations?continent=Europe" },
      { label: "🌏  Asia Pacific", href: "/destinations?continent=Asia" },
      { label: "🌍  Africa", href: "/destinations?continent=Africa" },
      { label: "🌎  Americas", href: "/destinations?continent=Americas" },
    ],
  },
  {
    label: "Tours",
    href: "/tours",
    children: [
      { label: "🏖️  Beach & Island", href: "/tours?category=Beach" },
      { label: "🧗  Adventure", href: "/tours?category=Adventure" },
      { label: "🏛️  Cultural", href: "/tours?category=Cultural" },
      { label: "💎  Luxury", href: "/tours?category=Luxury" },
      { label: "🦁  Wildlife Safari", href: "/tours?category=Wildlife" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navTextColor = scrolled ? "text-gray-800" : "text-white";
  const navHoverBg   = scrolled ? "hover:bg-gray-100 hover:text-primary" : "hover:bg-white/10";

  return (
    <>
      {/* ── Main nav ─────────────────────────────────────── */}
      <motion.header
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "top-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm"
            : "top-0 bg-transparent"
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-[18px] h-[18px] text-white" />
              </div>
              <span
                className={cn("text-[1.3rem] font-bold transition-colors duration-300", scrolled ? "text-primary" : "text-white")}
                style={{ fontFamily: "var(--font-playfair, 'Playfair Display', Georgia, serif)" }}
              >
                Wander<span className="text-accent">Base</span>
              </span>
            </Link>

            {/* Desktop nav links */}
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
                      "flex items-center gap-1 px-3.5 py-2 rounded-xl text-[.875rem] font-medium transition-all duration-200",
                      navTextColor, navHoverBg
                    )}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown
                        className={cn("w-3.5 h-3.5 opacity-60 transition-transform duration-200",
                          activeDropdown === link.label && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.children && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: .97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: .97 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 overflow-hidden"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="flex items-center px-4 py-2.5 text-[.875rem] text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors font-medium"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={cn("p-2.5 rounded-xl transition-all", scrolled ? "text-gray-600 hover:bg-gray-100" : "text-white/80 hover:bg-white/10")}
              >
                <Search className="w-[18px] h-[18px]" />
              </button>
              <Link
                href="/auth/signin"
                className={cn("px-4 py-2 rounded-xl text-[.875rem] font-medium transition-all", scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white/80 hover:bg-white/10")}
              >
                Sign In
              </Link>
              <Link
                href="/tours"
                className="px-5 py-2.5 bg-gradient-to-r from-accent to-gold text-white text-[.875rem] font-semibold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-px transition-all duration-200"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile burger */}
            <button
              className={cn("md:hidden p-2.5 rounded-xl transition-colors", scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10")}
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
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search destinations, tours, experiences…"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
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
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-[300px] bg-white z-50 md:hidden overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <span
                  className="text-xl font-bold text-primary"
                  style={{ fontFamily: "var(--font-playfair, 'Playfair Display', Georgia, serif)" }}
                >
                  Wander<span className="text-accent">Base</span>
                </span>
                <button onClick={() => setMobileOpen(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-4 py-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center px-3 py-3.5 text-gray-800 font-semibold rounded-xl hover:bg-gray-50 hover:text-primary transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="ml-3 mb-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-3 py-2 text-sm text-gray-500 hover:text-primary font-medium"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="px-4 pb-8 flex flex-col gap-3 mt-2">
                <Link
                  href="/auth/signin"
                  className="block text-center py-3 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/tours"
                  className="block text-center py-3 bg-gradient-to-r from-accent to-gold text-white font-semibold rounded-xl shadow-md"
                  onClick={() => setMobileOpen(false)}
                >
                  Book Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
