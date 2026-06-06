"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Calendar, Users, ChevronDown, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1800&q=90",
    label: "Santorini, Greece",
    tag: "Europe",
  },
  {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=90",
    label: "Swiss Alps",
    tag: "Adventure",
  },
  {
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1800&q=90",
    label: "Maldives",
    tag: "Luxury",
  },
];

const trustBadges = [
  { emoji: "🏆", value: "4.9 / 5", label: "Rating" },
  { emoji: "✈️", value: "120+", label: "Destinations" },
  { emoji: "👥", value: "50 K+", label: "Travelers" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setLoaded(true);
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 7000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goTo = (i: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrent(i);
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 7000);
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden">

      {/* ── Slideshow background ────────────────────────────── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <img
            src={slides[current].image}
            alt={slides[current].label}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Gradient overlays ───────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/75 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-transparent to-transparent z-[1]" />

      {/* ── Slide dots ─────────────────────────────────────── */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? "w-8 bg-accent" : "w-2 bg-white/40 hover:bg-white/70"}`}
          />
        ))}
      </div>

      {/* ── Current location label ──────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
          className="absolute top-28 left-8 lg:left-16 z-10 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-white/80 text-sm font-medium tracking-wide">{slides[current].label}</span>
        </motion.div>
      </AnimatePresence>

      {/* ── Floating trust badges (desktop) ────────────────── */}
      <div className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col gap-4">
        {trustBadges.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, x: 40 }}
            animate={loaded ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.8 + i * 0.15, duration: 0.6 }}
            className="glass-card px-5 py-4 min-w-[148px]"
          >
            <p className="text-2xl mb-1">{b.emoji}</p>
            <p className="text-white text-xl font-bold leading-none mb-0.5">{b.value}</p>
            <p className="text-white/60 text-xs font-medium">{b.label}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Main content ────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-12">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="h-px w-10 bg-accent" />
          <span className="text-accent text-sm font-semibold tracking-[.15em] uppercase">
            Premium Travel Experiences
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-white mb-6 max-w-3xl leading-[1.08]"
          style={{ fontFamily: "var(--font-playfair, 'Playfair Display', Georgia, serif)" }}
        >
          Discover the World&apos;s{" "}
          <span className="italic" style={{ color: "#f4a261" }}>Most Breathtaking</span>
          <br />
          Destinations
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-white/75 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
          style={{ fontFamily: "var(--font-inter, system-ui, sans-serif)", fontWeight: 400 }}
        >
          Handcrafted journeys to 120+ destinations. Expert guides, seamless booking, and memories that last forever.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="flex flex-wrap gap-4 mb-14"
        >
          <Link
            href="/tours"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-semibold text-white text-base bg-gradient-to-r from-accent to-gold shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5 transition-all duration-300"
            style={{ fontFamily: "var(--font-inter, system-ui, sans-serif)" }}
          >
            Explore Tours
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-semibold text-white text-base border border-white/30 hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
            style={{ fontFamily: "var(--font-inter, system-ui, sans-serif)" }}
          >
            View Destinations
          </Link>
        </motion.div>

        {/* ── Search box ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="w-full max-w-4xl"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">

              {/* Destination */}
              <label className="flex items-center gap-3 bg-white/10 hover:bg-white/15 rounded-xl px-4 py-3.5 cursor-pointer group transition-colors sm:col-span-1">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <div className="min-w-0">
                  <p className="text-white/50 text-[11px] font-semibold uppercase tracking-wider mb-0.5">Destination</p>
                  <input
                    type="text"
                    placeholder="Where to?"
                    className="bg-transparent text-white text-sm font-medium placeholder:text-white/40 w-full outline-none"
                    style={{ fontFamily: "inherit" }}
                  />
                </div>
              </label>

              {/* Date */}
              <label className="flex items-center gap-3 bg-white/10 hover:bg-white/15 rounded-xl px-4 py-3.5 cursor-pointer transition-colors sm:col-span-1">
                <Calendar className="w-5 h-5 text-accent shrink-0" />
                <div className="min-w-0 w-full">
                  <p className="text-white/50 text-[11px] font-semibold uppercase tracking-wider mb-0.5">When</p>
                  <input
                    type="date"
                    className="bg-transparent text-white text-sm font-medium outline-none w-full [color-scheme:dark]"
                    style={{ fontFamily: "inherit" }}
                  />
                </div>
              </label>

              {/* Guests */}
              <label className="flex items-center gap-3 bg-white/10 hover:bg-white/15 rounded-xl px-4 py-3.5 cursor-pointer transition-colors sm:col-span-1">
                <Users className="w-5 h-5 text-accent shrink-0" />
                <div className="min-w-0 w-full">
                  <p className="text-white/50 text-[11px] font-semibold uppercase tracking-wider mb-0.5">Guests</p>
                  <select
                    className="bg-transparent text-white text-sm font-medium outline-none w-full"
                    style={{ fontFamily: "inherit" }}
                  >
                    <option className="text-gray-900">1 Person</option>
                    <option className="text-gray-900">2 People</option>
                    <option className="text-gray-900">3–5 People</option>
                    <option className="text-gray-900">6+ People</option>
                  </select>
                </div>
              </label>

              {/* Search btn */}
              <Link
                href="/tours"
                className="flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-semibold text-white text-sm bg-gradient-to-r from-primary to-secondary hover:opacity-90 hover:-translate-y-0.5 transition-all duration-300 sm:col-span-1"
                style={{ fontFamily: "var(--font-inter, system-ui, sans-serif)" }}
              >
                <Search className="w-4 h-4" />
                Search
              </Link>
            </div>
          </div>

          {/* Trending tags */}
          <div className="flex items-center gap-2.5 mt-4 flex-wrap">
            <span className="text-white/40 text-xs font-medium">Trending:</span>
            {["Santorini", "Bali", "Maldives", "Kyoto", "Safari"].map((t) => (
              <Link
                key={t}
                href={`/destinations?search=${t}`}
                className="text-white/70 text-xs font-medium px-3 py-1 rounded-full border border-white/20 hover:border-white/50 hover:text-white transition-colors"
              >
                {t}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Reviews strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.1 }}
          className="flex items-center gap-4 mt-10"
        >
          <div className="flex -space-x-2.5">
            {[
              "photo-1494790108755-2616b612b786",
              "photo-1507003211169-0a1dd7228f2d",
              "photo-1517841905240-472988babdf9",
              "photo-1438761681033-6461ffad8d80",
            ].map((id) => (
              <div key={id} className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow">
                <img src={`https://images.unsplash.com/${id}?w=80&q=80`} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center gap-1 mb-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
              ))}
              <span className="text-white font-semibold text-sm ml-1">4.9</span>
            </div>
            <p className="text-white/50 text-xs">Loved by 2,000+ travelers worldwide</p>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
      >
        <span className="text-white/30 text-[10px] uppercase tracking-[.2em] font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
